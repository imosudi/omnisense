
export interface ResearchItem {
  id: string;
  url: string;
  title: string;
  summary: string;
  extractedData: any;
  timestamp: number;
  type: 'web' | 'visual' | 'comparison';
}

export interface Alert {
  id: string;
  message: string;
  severity: 'low' | 'medium' | 'high';
  timestamp: number;
  sourceId: string;
}

export interface ExtractionSchema {
  fields: {
    name: string;
    description: string;
    type: 'string' | 'number' | 'array' | 'boolean';
  }[];
}

export enum AppSection {
  DASHBOARD = 'DASHBOARD',
  RESEARCH = 'RESEARCH',
  HISTORY = 'HISTORY',
  ALERTS = 'ALERTS'
}
