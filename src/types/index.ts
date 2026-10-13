export type EventType = 'GOAL' | 'SAVE' | 'DISTRIBUTION' | 'POSITIONING' | 'INTERCEPTION';

export interface HighlightEvent {
  id: string;
  matchId: string;
  playerId: string;
  type: EventType;
  startTime: number; // in seconds
  endTime: number; // in seconds
  label: string;
  isConfirmed: boolean;
  confidence: number; // AI confidence 0-1
  coordinates?: { x: number; y: number }[]; // For heatmaps/tracking
}

export interface Match {
  id: string;
  date: string;
  opponent: string;
  videoUrl: string;
  duration: number;
}

export interface Player {
  id: string;
  name: string;
  role: 'GOALKEEPER' | 'DEFENDER' | 'MIDFIELDER' | 'FORWARD';
}

export interface TechnicalStandard {
  id: string;
  category: 'POSITIONING' | 'HANDS' | 'TORSO' | 'FOOTWORK' | 'JUMP';
  parameter: string; // e.g., "Angle of torso", "Hand height"
  idealValue: number;
  tolerance: number;
  unit: 'degrees' | 'meters' | 'seconds' | 'count';
  description: string;
}

export interface TechnicalBlueprint {
  id: string;
  coachId: string;
  name: string;
  standards: TechnicalStandard[];
  updatedAt: string;
}

export interface BiomechanicalFrame {
  timestamp: number;
  pose: {
    joint: string;
    x: number;
    y: number;
    z?: number;
  }[];
  metrics: {
    parameterId: string;
    value: number;
    status: 'CORRECT' | 'ERROR' | 'WARNING';
  }[];
}

export interface VideoClip {
  id: string;
  eventId: string;
  startTime: number;
  endTime: number;
  status: 'CORRECT' | 'WARNING' | 'ERROR';
  label: string;
}

export interface VideoReel {
  id: string;
  title: string;
  type: 'STRENGTHS' | 'WEAKNESSES' | 'WORK_IN_PROGRESS';
  clips: VideoClip[];
  exportUrl?: string;
}

export interface TrainingDrill {
  id: string;
  parameterId: string; // Linked to TechnicalStandard
  title: string;
  description: string;
  difficulty: 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED';
  videoReference?: string;
}
