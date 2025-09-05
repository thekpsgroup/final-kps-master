/// <reference types="node" />

declare global {
  interface Window {
    dataLayer: unknown[][];
    gtag: {
      (command: 'js', target: Date): void;
      (command: 'config', targetId: string, config?: Record<string, unknown>): void;
      (command: 'event', eventName: string, params?: Record<string, unknown>): void;
    };
  }
}

// This export is needed for .d.ts files to be treated as modules
export {};
}
