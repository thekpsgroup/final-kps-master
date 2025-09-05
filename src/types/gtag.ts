export interface GtagConfig {
  page_path?: string;
  custom_map?: {
    dimension1: string;
    dimension2: string;
    dimension3: string;
    dimension4: string;
  };
  [key: string]: unknown;
}

export interface GtagEvent {
  action: string;
  category?: string;
  label?: string;
  value?: number;
  [key: string]: unknown;
}

export type GtagFunction = {
  (command: 'js', timestamp: Date): void;
  (command: 'config', targetId: string, config?: GtagConfig): void;
  (command: 'event', action: string, params?: GtagEvent): void;
}
