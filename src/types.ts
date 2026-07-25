export type ThemeMode = 'dark' | 'light';

export interface AttackInfo {
  id: string;
  name: string;
  shortName: string;
  category: string;
  severity: 'Critical' | 'High' | 'Medium' | 'Low';
  description: string;
  explanation: string;
  realWorldExample: string;
  vulnerableCode: {
    language: string;
    code: string;
    explanation: string;
  };
  preventedCode: {
    language: string;
    code: string;
    explanation: string;
  };
  preventionMethods: string[];
  impact: string[];
}

export interface SecurityTypeInfo {
  id: string;
  title: string;
  iconName: string;
  shortDesc: string;
  fullDesc: string;
  keyActivities: string[];
  whenToPerform: string;
  targetAudience: string;
  bestTools: string[];
}

export interface SecurityTool {
  id: string;
  name: string;
  category: 'Scanner' | 'Proxy' | 'Network' | 'Framework' | 'Sniffer';
  logoIcon: string;
  description: string;
  primaryUse: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  sampleCommand?: string;
  keyFeatures: string[];
  officialUrl: string;
}

export interface ProcessPhase {
  stepNumber: number;
  phaseName: string;
  shortDesc: string;
  detailedDesc: string;
  keyTasks: string[];
  deliverables: string[];
  iconName: string;
}

export interface BestPracticeItem {
  id: string;
  title: string;
  category: 'Authentication' | 'Data Protection' | 'Input Handling' | 'Infrastructure' | 'Auditing';
  description: string;
  impactLevel: 'Critical' | 'High' | 'Medium';
  implementationTip: string;
  isCompleted?: boolean;
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  topic: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
}

export interface SearchItem {
  id: string;
  title: string;
  type: 'Attack' | 'Tool' | 'Topic' | 'Type' | 'Practice';
  description: string;
  sectionId: string;
}
