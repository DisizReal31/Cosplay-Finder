export interface IdentifiedItem {
  id: string;
  name: string;
  category: string;
  color: string;
  description: string;
  searchKeywords: string;
}

export interface AnalysisResult {
  items: IdentifiedItem[];
}

export enum AppState {
  IDLE = 'IDLE',
  ANALYZING = 'ANALYZING',
  RESULTS = 'RESULTS',
  ERROR = 'ERROR',
}
