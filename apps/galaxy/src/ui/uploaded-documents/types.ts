import { Metadata } from "@/types";

interface Documents {
  id?: number;
  resourceMetadata?: Metadata;
  documentId?: string; 
  documentType: string;
  fileName?: string;
  patientId: number;
  appointmentId: number;
}

export type { Documents };    
