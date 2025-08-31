import { useState, useEffect, useCallback } from 'react';
import Tesseract from 'tesseract.js';

interface OCRResult {
  text: string;
  confidence: number;
  words: any[];
  blocks: any[];
}

interface ExtractedData {
  vendor?: string;
  amount?: number;
  date?: string;
  description?: string;
}

export function useOCR() {
  const [worker, setWorker] = useState<Tesseract.Worker | null>(null);
  const [isReady, setIsReady] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    const initWorker = async () => {
      try {
        const tesseractWorker = await Tesseract.createWorker({
          workerPath: 'https://unpkg.com/tesseract.js@5/dist/worker.min.js',
          langPath: 'https://tessdata.projectnaptha.com/4.0.0',
          corePath: 'https://unpkg.com/tesseract.js-core@5/tesseract-core.wasm.js'
        });
        await tesseractWorker.loadLanguage('eng');
        await tesseractWorker.initialize('eng');
        setWorker(tesseractWorker);
        setIsReady(true);
      } catch (error) {
        console.error('Failed to initialize OCR worker:', error);
      }
    };

    initWorker();

    return () => {
      if (worker) {
        worker.terminate();
      }
    };
  }, []);

  const extractDataFromText = useCallback((text: string): ExtractedData => {
    const extracted: ExtractedData = {};

    // Extract amount patterns
    const amountPatterns = [
      /total[:\s]*\$?([\d,]+\.?\d*)/i,
      /amount[:\s]*\$?([\d,]+\.?\d*)/i,
      /\$\s*([\d,]+\.?\d*)/g,
      /([\d,]+\.?\d*)\s*USD/i
    ];

    for (const pattern of amountPatterns) {
      const match = text.match(pattern);
      if (match) {
        const amount = parseFloat(match[1].replace(/,/g, ''));
        if (amount > 0) {
          extracted.amount = amount;
          break;
        }
      }
    }

    // Extract vendor/merchant
    const vendorPatterns = [
      /merchant[:\s]*([A-Za-z\s]+?)(?:\n|\s{2,})/i,
      /vendor[:\s]*([A-Za-z\s]+?)(?:\n|\s{2,})/i,
      /^([A-Z][A-Za-z\s&]+?)(?:\n|\s+\d)/m
    ];

    for (const pattern of vendorPatterns) {
      const match = text.match(pattern);
      if (match) {
        extracted.vendor = match[1].trim();
        break;
      }
    }

    // Extract date
    const datePatterns = [
      /(\d{1,2}\/\d{1,2}\/\d{2,4})/,
      /(\d{1,2}-\d{1,2}-\d{2,4})/,
      /(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)[a-z]*\s+\d{1,2},?\s+\d{2,4}/i
    ];

    for (const pattern of datePatterns) {
      const match = text.match(pattern);
      if (match) {
        extracted.date = match[0];
        break;
      }
    }

    // Extract description (first meaningful line)
    const lines = text.split('\n').map(line => line.trim()).filter(line => line.length > 3);
    if (lines.length > 0) {
      extracted.description = lines[0].substring(0, 50);
    }

    return extracted;
  }, []);

  const processImage = useCallback(async (imageFile: File): Promise<{ ocrResult: OCRResult; extractedData: ExtractedData }> => {
    if (!worker || !isReady) {
      throw new Error('OCR worker not ready');
    }

    setIsProcessing(true);

    try {
      const result = await worker.recognize(imageFile);
      
      const ocrResult: OCRResult = {
        text: result.data.text,
        confidence: result.data.confidence,
        words: result.data.words,
        blocks: result.data.blocks
      };

      const extractedData = extractDataFromText(result.data.text);

      return { ocrResult, extractedData };
    } finally {
      setIsProcessing(false);
    }
  }, [worker, isReady, extractDataFromText]);

  return {
    isReady,
    isProcessing,
    processImage,
    extractDataFromText
  };
}