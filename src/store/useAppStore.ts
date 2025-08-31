import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Message, Extraction, ERPEntry, AuditLog, Budget, CatalogItem, MLModelMeta, UserRole, ClassificationResult } from '../types';

interface AppState {
  // Navigation
  currentTab: 'slack' | 'dashboard' | 'erp' | 'admin';
  setCurrentTab: (tab: 'slack' | 'dashboard' | 'erp' | 'admin') => void;
  
  // Slack connection
  slackConnected: boolean;
  setSlackConnected: (connected: boolean) => void;
  
  // ERP connection
  erpConnected: boolean;
  setErpConnected: (connected: boolean) => void;
  
  // Data collections
  messages: Message[];
  extractions: Extraction[];
  erpEntries: ERPEntry[];
  auditLogs: AuditLog[];
  budgets: Budget[];
  catalog: CatalogItem[];
  mlModels: MLModelMeta[];
  
  // User state
  currentRole: UserRole; // Keep for type compatibility but not used in UI
  
  // Admin settings
  simulateERPFailure: boolean;
  setSimulateERPFailure: (enabled: boolean) => void;
  piiMaskEnabled: boolean;
  setPiiMaskEnabled: (enabled: boolean) => void;
  ocrWorkerReady: boolean;
  setOcrWorkerReady: (ready: boolean) => void;
  
  // Demo persistence
  demoDataTimestamp: number | null;
  setDemoDataTimestamp: (timestamp: number | null) => void;
  sentDemoMessages: string[];
  markDemoMessageSent: (messageId: string) => void;
  
  // Actions
  addMessage: (message: Omit<Message, 'id'>, classificationResult?: ClassificationResult) => string;
  addExtraction: (extraction: Omit<Extraction, 'id'>) => void;
  updateExtraction: (id: string, updates: Partial<Extraction>) => void;
  addERPEntry: (entry: Omit<ERPEntry, 'id'>) => void;
  updateERPEntry: (id: string, updates: Partial<ERPEntry>) => void;
  addAuditLog: (log: Omit<AuditLog, 'id' | 'hash'>) => void;
  clearAllData: () => void;
  isDemoDataExpired: () => boolean;
}

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      // Initial state
      currentTab: 'slack',
      slackConnected: false,
      erpConnected: false,
      currentRole: 'employee',
      simulateERPFailure: false,
      piiMaskEnabled: false,
      ocrWorkerReady: false,
      demoDataTimestamp: null,
      sentDemoMessages: [],
      
      messages: [],
      extractions: [],
      erpEntries: [
        {
          id: 'erp_001',
          type: 'procurement',
          normalized_fields: {
            amount: 10000,
            department: 'Engineering',
            description: 'Office furniture purchase for new team members',
            vendor: 'Steelcase'
          },
          status: 'approved',
          mock_erp_id: 'ERP-2024-001',
          idempotency_key: 'proc_001_2024_01_15',
          created_at: '2024-01-15T10:30:00Z',
          approved_by: 'john.doe',
          approved_at: '2024-01-15T11:15:00Z'
        },
        {
          id: 'erp_002',
          type: 'reimbursement',
          normalized_fields: {
            amount: 450,
            department: 'Marketing',
            description: 'Team lunch reimbursement for client meeting',
            vendor: 'Local Restaurant'
          },
          status: 'approved',
          mock_erp_id: 'ERP-2024-002',
          idempotency_key: 'reimb_002_2024_01_14',
          created_at: '2024-01-14T14:20:00Z',
          approved_by: 'jane.smith',
          approved_at: '2024-01-14T15:45:00Z'
        },
        {
          id: 'erp_003',
          type: 'expense',
          normalized_fields: {
            amount: 2500,
            department: 'Sales',
            description: 'Client entertainment expense for Q4 deal',
            vendor: 'High-end Restaurant'
          },
          status: 'pending',
          mock_erp_id: 'ERP-2024-003',
          idempotency_key: 'exp_003_2024_01_16',
          created_at: '2024-01-16T09:15:00Z'
        },
        {
          id: 'erp_004',
          type: 'leave',
          normalized_fields: {
            department: 'HR',
            description: 'Annual leave request for wedding',
            reason: 'Wedding',
            date: '15 December'
          },
          status: 'approved',
          mock_erp_id: 'ERP-2024-004',
          idempotency_key: 'leave_004_2024_01_13',
          created_at: '2024-01-13T16:30:00Z',
          approved_by: 'hr.manager',
          approved_at: '2024-01-14T10:00:00Z'
        },
        {
          id: 'erp_005',
          type: 'reimbursement',
          normalized_fields: {
            amount: 200,
            department: 'Finance',
            description: 'Lunch expense from local restaurant',
            vendor: 'Local Restaurant'
          },
          status: 'approved',
          mock_erp_id: 'ERP-2024-005',
          idempotency_key: 'reimb_005_2024_01_12',
          created_at: '2024-01-12T12:45:00Z',
          approved_by: 'finance.lead',
          approved_at: '2024-01-12T14:20:00Z'
        },
        {
          id: 'erp_006',
          type: 'procurement',
          normalized_fields: {
            amount: 5000,
            department: 'IT',
            description: 'Software license renewal for development tools',
            vendor: 'JetBrains'
          },
          status: 'pending',
          mock_erp_id: 'ERP-2024-006',
          idempotency_key: 'proc_006_2024_01_17',
          created_at: '2024-01-17T11:00:00Z'
        },
        {
          id: 'erp_007',
          type: 'expense',
          normalized_fields: {
            amount: 150,
            department: 'Operations',
            description: 'Coffee and snacks for team meeting',
            vendor: 'Starbucks'
          },
          status: 'rejected',
          mock_erp_id: 'ERP-2024-007',
          idempotency_key: 'exp_007_2024_01_11',
          created_at: '2024-01-11T15:30:00Z',
          approved_by: 'ops.manager',
          approved_at: '2024-01-12T09:00:00Z'
        },
        {
          id: 'erp_008',
          type: 'reimbursement',
          normalized_fields: {
            amount: 300,
            department: 'Engineering',
            description: 'Team dinner after successful sprint completion',
            vendor: 'Pizza Place'
          },
          status: 'approved',
          mock_erp_id: 'ERP-2024-008',
          idempotency_key: 'reimb_008_2024_01_10',
          created_at: '2024-01-10T19:00:00Z',
          approved_by: 'tech.lead',
          approved_at: '2024-01-11T10:30:00Z'
        }
      ],
      auditLogs: [],
      budgets: [
        {
          dept: 'Engineering',
          period_start: '2025-01-01',
          period_end: '2025-01-31',
          budget_amount: 50000,
          actual_amount: 32500
        },
        {
          dept: 'Marketing',
          period_start: '2025-01-01',
          period_end: '2025-01-31',
          budget_amount: 25000,
          actual_amount: 18750
        },
        {
          dept: 'Sales',
          period_start: '2025-01-01',
          period_end: '2025-01-31',
          budget_amount: 35000,
          actual_amount: 28900
        },
        {
          dept: 'Operations',
          period_start: '2025-01-01',
          period_end: '2025-01-31',
          budget_amount: 20000,
          actual_amount: 15600
        }
      ],
      catalog: [
        { sku: 'LAP001', name: 'MacBook Pro 16"', unit_cost: 2499, vendor: 'Apple' },
        { sku: 'MON001', name: 'Dell UltraSharp 27"', unit_cost: 399, vendor: 'Dell' },
        { sku: 'CHR001', name: 'Herman Miller Chair', unit_cost: 1200, vendor: 'Herman Miller' },
        { sku: 'DSK001', name: 'Standing Desk', unit_cost: 899, vendor: 'Steelcase' },
        { sku: 'PHN001', name: 'iPhone 15 Pro', unit_cost: 999, vendor: 'Apple' }
      ],
      mlModels: [
        {
          model_name: 'message_classifier_v1',
          trained_on_count: 47,
          coefficients: {
            'expense': 0.42,
            'procurement': 0.38,
            'approval': 0.28,
            'receipt': 0.65,
            'order': 0.44,
            'vendor': 0.33,
            'amount': 0.58
          },
          last_trained_ts: new Date().toISOString()
        }
      ],
      
      // Setters
      setCurrentTab: (tab) => set({ currentTab: tab }),
      setSlackConnected: (connected) => set({ slackConnected: connected }),
      setErpConnected: (connected) => set({ erpConnected: connected }),
      setSimulateERPFailure: (enabled) => set({ simulateERPFailure: enabled }),
      setPiiMaskEnabled: (enabled) => set({ piiMaskEnabled: enabled }),
      setOcrWorkerReady: (ready) => set({ ocrWorkerReady: ready }),
      setDemoDataTimestamp: (timestamp) => set({ demoDataTimestamp: timestamp }),
      markDemoMessageSent: (messageId) => set((state) => {
        try {
          const currentMessages = Array.isArray(state.sentDemoMessages) ? state.sentDemoMessages : [];
          if (!currentMessages.includes(messageId)) {
            return {
              sentDemoMessages: [...currentMessages, messageId]
            };
          }
          return state;
        } catch (error) {
          console.error('Error marking demo message as sent:', error);
          return {
            sentDemoMessages: [messageId]
          };
        }
      }),
      
      // Actions
      addMessage: (message, classificationResult) => {
        const newMessage = { 
          ...message, 
          id: `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
          classificationResult 
        };
        set((state) => ({ 
          messages: [...state.messages, newMessage],
          demoDataTimestamp: Date.now() // Set timestamp when demo data is added
        }));
        
        // Create extraction record if classification exists (including low confidence for demo purposes)
        if (classificationResult) {
          const { addExtraction, addAuditLog } = get();
          
          addExtraction({
            message_id: newMessage.id,
            type: classificationResult.type,
            fields: classificationResult.extracted_fields || {},
            confidence: classificationResult.confidence,
            status: 'pending',
            provenance: {
              rules_fired: classificationResult.rules_fired,
              tfidf_score: classificationResult.tfidf_score,
              vendor_mappings: {}
            },
            anomaly_flag: classificationResult.confidence < 0.7 ? {
              reason: 'Low confidence classification',
              score: classificationResult.confidence,
              threshold: 0.7
            } : undefined
          });

          // Add audit log
          addAuditLog({
            entity_type: 'extraction',
            entity_id: newMessage.id,
            action: 'classify',
            actor: 'ai_classifier',
            timestamp: new Date().toISOString(),
            json_patch: [{ op: 'add', path: '/', value: { type: classificationResult.type, confidence: classificationResult.confidence, fields: classificationResult.extracted_fields } }]
          });
        }
        
        return newMessage.id;
      },
      
      addExtraction: (extraction) => {
        const newExtraction = { ...extraction, id: `ext_${Date.now()}_${Math.random().toString(36).substr(2, 9)}` };
        set((state) => ({ extractions: [...state.extractions, newExtraction] }));
      },
      
      updateExtraction: (id, updates) => {
        set((state) => ({
          extractions: state.extractions.map(ext => 
            ext.id === id ? { ...ext, ...updates } : ext
          )
        }));
      },
      
      addERPEntry: (entry) => {
        const newEntry = { ...entry, id: `erp_${Date.now()}_${Math.random().toString(36).substr(2, 9)}` };
        set((state) => ({ erpEntries: [...state.erpEntries, newEntry] }));
      },
      
      updateERPEntry: (id, updates) => {
        set((state) => ({
          erpEntries: state.erpEntries.map(entry => 
            entry.id === id ? { ...entry, ...updates } : entry
          )
        }));
      },
      
      addAuditLog: (log) => {
        const state = get();
        const prevHash = state.auditLogs.length > 0 
          ? state.auditLogs[state.auditLogs.length - 1].hash 
          : '';
        
        const hashInput = prevHash + JSON.stringify(log.json_patch) + log.actor + log.timestamp;
        const hash = btoa(hashInput).replace(/[+/=]/g, '').substring(0, 16);
        
        const newLog = { 
          ...log, 
          id: `audit_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
          prev_hash: prevHash,
          hash 
        };
        
        set((state) => ({ auditLogs: [...state.auditLogs, newLog] }));
      },
      
      clearAllData: () => {
        set({
          messages: [],
          extractions: [],
          erpEntries: [],
          auditLogs: [],
          demoDataTimestamp: null,
          sentDemoMessages: []
        });
      },
      
      isDemoDataExpired: () => {
        const state = get();
        if (!state.demoDataTimestamp) return true;
        
        const now = Date.now();
        const tenMinutes = 10 * 60 * 1000; // 10 minutes in milliseconds
        return (now - state.demoDataTimestamp) > tenMinutes;
      }
    }),
    {
      name: 'convergo-app-storage',
      version: 1,
      migrate: (persistedState, version) => {
        // Handle migration from older versions
        try {
          const state = persistedState as any;
          
          // Ensure all required fields exist
          const migratedState = {
            currentTab: 'slack',
            slackConnected: false,
            erpConnected: false,
            currentRole: 'employee',
            simulateERPFailure: false,
            piiMaskEnabled: false,
            ocrWorkerReady: false,
            demoDataTimestamp: null,
            sentDemoMessages: [],
            messages: [],
            extractions: [],
            erpEntries: [],
            auditLogs: [],
            budgets: [],
            catalog: [],
            mlModels: [],
            ...state
          };
          
          // Ensure sentDemoMessages is an array
          if (state.sentDemoMessages) {
            if (Array.isArray(state.sentDemoMessages)) {
              migratedState.sentDemoMessages = state.sentDemoMessages;
            } else {
              migratedState.sentDemoMessages = [];
            }
          }
          
          // Ensure demoDataTimestamp is a valid number or null
          if (migratedState.demoDataTimestamp && typeof migratedState.demoDataTimestamp !== 'number') {
            migratedState.demoDataTimestamp = null;
          }
          
          return migratedState as AppState;
        } catch (error) {
          console.error('Error migrating persisted state:', error);
          // Return default state if migration fails
          return {
            currentTab: 'slack',
            slackConnected: false,
            erpConnected: false,
            currentRole: 'employee',
            simulateERPFailure: false,
            piiMaskEnabled: false,
            ocrWorkerReady: false,
            demoDataTimestamp: null,
            sentDemoMessages: [],
            messages: [],
            extractions: [],
            erpEntries: [],
            auditLogs: [],
            budgets: [],
            catalog: [],
            mlModels: []
          } as AppState;
        }
      },
      partialize: (state) => ({
        slackConnected: state.slackConnected,
        erpConnected: state.erpConnected,
        messages: state.messages,
        extractions: state.extractions,
        erpEntries: state.erpEntries,
        auditLogs: state.auditLogs,
        piiMaskEnabled: state.piiMaskEnabled,
        simulateERPFailure: state.simulateERPFailure,
        demoDataTimestamp: state.demoDataTimestamp,
        sentDemoMessages: state.sentDemoMessages
      })
    }
  )
);