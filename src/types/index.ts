// Core data types
export interface Message {
  id: string;
  source: 'slack' | 'teams' | 'email';
  text: string;
  attachments: Attachment[];
  timestamp: string;
  created_by: string;
  convergo_command: boolean;
  classificationResult?: ClassificationResult;
}

export interface Attachment {
  filename: string;
  content_type: string;
  size: number;
  url?: string;
}

export interface ClassificationResult {
  type: 'expense' | 'procurement' | 'approval' | 'leave' | 'reimbursement' | 'unknown';
  confidence: number;
  description: string;
  extracted_amount?: string;
  rules_fired: string[];
  tfidf_score: number;
  extracted_fields?: Record<string, any>;
}

export interface Extraction {
  id: string;
  message_id: string;
  type: 'expense' | 'procurement' | 'approval' | 'leave' | 'reimbursement';
  fields: Record<string, any>;
  confidence: number;
  status: 'pending' | 'confirmed' | 'rejected';
  provenance: {
    rules_fired: string[];
    tfidf_score: number;
    vendor_mappings: Record<string, string>;
  };
  anomaly_flag?: {
    reason: string;
    score: number;
    threshold: number;
  };
}

export interface ERPEntry {
  id: string;
  type: 'expense' | 'procurement' | 'approval' | 'leave' | 'reimbursement';
  normalized_fields: Record<string, any>;
  status: 'pending' | 'approved' | 'rejected';
  mock_erp_id: string;
  idempotency_key: string;
  created_at: string;
  approved_by?: string;
  approved_at?: string;
  anomaly_flag?: {
    reason: string;
    score: number;
    threshold: number;
  };
}

export interface AuditLog {
  id: string;
  entity_type: 'extraction' | 'erp_entry' | 'message';
  entity_id: string;
  action: 'create' | 'update' | 'approve' | 'reject' | 'classify';
  actor: string;
  timestamp: string;
  json_patch: Array<{
    op: 'add' | 'remove' | 'replace';
    path: string;
    value?: any;
  }>;
  prev_hash: string;
  hash: string;
}

export interface Budget {
  dept: string;
  period_start: string;
  period_end: string;
  budget_amount: number;
  actual_amount: number;
}

export interface CatalogItem {
  sku: string;
  name: string;
  unit_cost: number;
  vendor: string;
}

export interface MLModelMeta {
  model_name: string;
  trained_on_count: number;
  coefficients: Record<string, number>;
  last_trained_ts: string;
}

export type UserRole = 'employee' | 'approver' | 'admin';