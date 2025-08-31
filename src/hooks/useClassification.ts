import { useCallback } from 'react';
import { Attachment, ClassificationResult } from '../types';

export function useClassification() {
  const classifyMessage = useCallback((text: string, attachments: Attachment[]): ClassificationResult => {
    const rules: string[] = [];
    const lowerText = text.toLowerCase();
    
    // Rule-based classification
    if (/(receipt|reimburs|expense|submit|purchase|bought|paid|cost|lunch|subsidy)/i.test(text) || attachments.length > 0) {
      rules.push('hasReceiptOrExpenseKeyword');
    }
    
    if (/\b(approve|deny|approved|rejected)\b/i.test(text) && /#\w+/i.test(text)) {
      rules.push('hasApprovalKeywordWithRef');
    }
    
    if (/(order|procurement|requisition|vendor|supplier|buy|need|request|assets|furniture)/i.test(text)) {
      rules.push('hasProcurementKeyword');
    }
    
    if (/(asset|equipment|laptop|computer|monitor|chair|desk|furniture)/i.test(text)) {
      rules.push('hasAssetKeyword');
    }

    // Extract amount - handle both $ and BDT
    const amountMatch = text.match(/(\d+(?:,\d{3})*(?:\.\d{2})?)\s*(?:BDT|\$)|(?:BDT|\$)\s*(\d+(?:,\d{3})*(?:\.\d{2})?)/i);
    const extractedAmount = amountMatch ? parseFloat((amountMatch[1] || amountMatch[2]).replace(/,/g, '')) : undefined;

    // Mock TF-IDF scoring
    const keywords = ['expense', 'purchase', 'order', 'approve', 'receipt', 'cost', 'buy', 'lunch', 'assets', 'furniture', 'subsidy'];
    const tfidfScore = keywords.reduce((score, keyword) => {
      return score + (lowerText.includes(keyword) ? 0.15 : 0);
    }, 0);

    // Determine type and confidence
    let type: ClassificationResult['type'] = 'unknown';
    let confidence = 0.5;
    let description = 'Unknown intent';

    // Check for leave requests first
    if (/(leave|annual leave|vacation|holiday|wedding|personal|time off)/i.test(text)) {
      type = 'leave';
      confidence = Math.min(0.93, 0.82 + tfidfScore);
      description = 'Leave request detected';
    }
    // Check for reimbursement requests (lunch, food, receipt attachments)
    else if (/(lunch|food|reimbursement|receipt|team lunch|pizza)/i.test(text) || attachments.length > 0) {
      type = 'reimbursement';
      confidence = Math.min(0.91, 0.75 + tfidfScore + (attachments.length > 0 ? 0.12 : 0));
      description = 'Reimbursement request detected';
    }
    // Check for procurement/asset purchases
    else if (rules.includes('hasProcurementKeyword') || rules.includes('hasAssetKeyword')) {
      type = 'procurement';
      confidence = Math.min(0.95, 0.68 + tfidfScore + (rules.includes('hasAssetKeyword') ? 0.18 : 0));
      description = 'Procurement or asset purchase request';
    }
    // Check for general expenses
    else if (rules.includes('hasReceiptOrExpenseKeyword')) {
      type = 'expense';
      confidence = Math.min(0.89, 0.65 + tfidfScore);
      description = 'Expense request detected';
    }
    // Check for approval requests
    else if (rules.includes('hasApprovalKeywordWithRef')) {
      type = 'approval';
      confidence = Math.min(0.92, 0.78 + tfidfScore);
      description = 'Approval request with reference number';
    }
    // Check for meme/joke content (very low confidence)
    else if (/(😂|😅|😆|🤣|meme|joke|funny|haha|lol|rofl)/i.test(text) || text.includes('😊') || text.includes('😄')) {
      type = 'expense'; // Still classify as expense but with very low confidence
      confidence = Math.min(0.35, 0.2 + tfidfScore * 0.1);
      description = 'Possible joke/meme content detected - low confidence classification';
    }

    // Extract structured fields based on type
    const extracted_fields: Record<string, any> = {};
    
    if (type === 'expense' || type === 'procurement' || type === 'reimbursement') {
      if (extractedAmount) {
        extracted_fields.amount = extractedAmount;
      }
      
      // Extract department mention
      const deptMatch = text.match(/(engineering|marketing|sales|finance|hr|operations|it)\s+(team|department|dept)?/i);
      if (deptMatch) {
        extracted_fields.department = deptMatch[1].charAt(0).toUpperCase() + deptMatch[1].slice(1);
      } else {
        extracted_fields.department = 'Finance'; // default
      }
      
      // Extract description
      const cleanText = text.replace(/@convergo\s*/i, '').trim();
      extracted_fields.description = cleanText.length > 100 ? cleanText.substring(0, 100) + '...' : cleanText;
      
      // Extract vendor if mentioned
      const vendorMatch = text.match(/(?:from|at|vendor|supplier)\s+([A-Za-z]+(?:\s+[A-Za-z]+)*)/i);
      if (vendorMatch) {
        extracted_fields.vendor = vendorMatch[1];
      } else if (text.toLowerCase().includes('macdonals') || text.toLowerCase().includes('mcdonald')) {
        extracted_fields.vendor = 'McDonalds';
      }
    }
    
    if (type === 'leave') {
      // Extract leave details
      const cleanText = text.replace(/@convergo\s*/i, '').trim();
      extracted_fields.description = cleanText.length > 100 ? cleanText.substring(0, 100) + '...' : cleanText;
      
      // Extract date if mentioned
      const dateMatch = text.match(/(\d{1,2})(?:st|nd|rd|th)?\s+(january|february|march|april|may|june|july|august|september|october|november|december)/i);
      if (dateMatch) {
        extracted_fields.date = `${dateMatch[1]} ${dateMatch[2]}`;
      }
      
      // Extract reason if mentioned
      if (text.toLowerCase().includes('wedding')) {
        extracted_fields.reason = 'Wedding';
      } else if (text.toLowerCase().includes('personal')) {
        extracted_fields.reason = 'Personal';
      } else {
        extracted_fields.reason = 'Annual Leave';
      }
    }

    const result: ClassificationResult = {
      type,
      confidence,
      description,
      extracted_amount: extractedAmount ? `${extractedAmount} ${text.includes('BDT') ? 'BDT' : '$'}` : undefined,
      rules_fired: rules,
      tfidf_score: tfidfScore,
      extracted_fields
    };

    return result;
  }, []);

  return { classifyMessage };
}