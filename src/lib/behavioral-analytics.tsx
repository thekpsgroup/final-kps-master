"use client";
import React from "react";

interface UserBehavior {
  sessionId: string;
  userId?: string;
  pageViews: PageView[];
  interactions: Interaction[];
  formBehavior: FormBehavior;
  deviceInfo: DeviceInfo;
  trafficSource: TrafficSource;
  engagementScore: number;
  conversionProbability: number;
}

interface PageView {
  url: string;
  timestamp: number;
  timeOnPage: number;
  scrollDepth: number;
  exitPage: boolean;
  referrer: string;
}

interface Interaction {
  type: 'click' | 'hover' | 'scroll' | 'focus' | 'form_field_interaction';
  element: string;
  timestamp: number;
  coordinates?: { x: number; y: number };
  value?: string;
  duration?: number;
}

interface FormBehavior {
  fieldsVisited: string[];
  fieldCompletionTimes: Record<string, number>;
  errorCount: number;
  hesitationPoints: string[];
  abandonmentStage: string | null;
  completionProbability: number;
}

interface DeviceInfo {
  isMobile: boolean;
  isTablet: boolean;
  browser: string;
  os: string;
  screenResolution: string;
}

interface TrafficSource {
  source: string;
  medium: string;
  campaign?: string;
  referrer: string;
}

interface MouseMovement {
  x: number;
  y: number;
  timestamp: number;
  velocity: number;
}

interface ScrollBehavior {
  depth: number;
  timestamp: number;
  direction: 'up' | 'down';
}

class BehavioralAnalytics {
  private behavior: UserBehavior;
  private heatmapData: Map<string, number> = new Map();
  private scrollBehavior: ScrollBehavior[] = [];
  private mouseMovements: MouseMovement[] = [];
  private fieldFocusStartTimes: Map<string, number> = new Map();

  constructor() {
    this.behavior = this.initializeBehavior();
    this.startTracking();
  }

  private initializeBehavior(): UserBehavior {
    return {
      sessionId: this.generateSessionId(),
      pageViews: [],
      interactions: [],
      formBehavior: {
        fieldsVisited: [],
        fieldCompletionTimes: {},
        errorCount: 0,
        hesitationPoints: [],
        abandonmentStage: null,
        completionProbability: 0.5
      },
      deviceInfo: this.getDeviceInfo(),
      trafficSource: this.getTrafficSource(),
      engagementScore: 0,
      conversionProbability: 0.5
    };
  }

  private startTracking() {
    // Mouse movement tracking
    document.addEventListener('mousemove', this.trackMouseMovement.bind(this));

    // Scroll behavior tracking
    window.addEventListener('scroll', this.trackScrollBehavior.bind(this));

    // Click heatmap tracking
    document.addEventListener('click', this.trackClick.bind(this));

    // Form field focus tracking
    document.addEventListener('focusin', this.trackFormFocus.bind(this));

    // Hesitation detection
    this.startHesitationDetection();

    // Engagement scoring
    this.startEngagementScoring();
  }

  private trackMouseMovement(e: MouseEvent) {
    this.mouseMovements.push({
      x: e.clientX,
      y: e.clientY,
      timestamp: Date.now(),
      velocity: this.calculateVelocity(e)
    });

    // Keep only last 100 movements for performance
    if (this.mouseMovements.length > 100) {
      this.mouseMovements.shift();
    }

    // Detect mouse hesitation (slow movement in form areas)
    this.detectMouseHesitation(e);
  }

  private trackScrollBehavior() {
    const scrollDepth = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;

    this.scrollBehavior.push({
      depth: scrollDepth,
      timestamp: Date.now(),
      direction: this.getScrollDirection()
    });

    // Update engagement score based on scroll behavior
    this.updateEngagementScore('scroll', scrollDepth);
  }

  private trackClick(e: MouseEvent) {
    const element = e.target as HTMLElement;
    const elementPath = this.getElementPath(element);

    // Update heatmap
    this.heatmapData.set(elementPath, (this.heatmapData.get(elementPath) || 0) + 1);

    // Track interaction
    this.behavior.interactions.push({
      type: 'click',
      element: elementPath,
      timestamp: Date.now(),
      coordinates: { x: e.clientX, y: e.clientY }
    });

    // Analyze click patterns for conversion prediction
    this.analyzeClickPattern(element);
  }

  private trackFormFocus(e: FocusEvent) {
    const element = e.target as HTMLElement;
    if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA' || element.tagName === 'SELECT') {
      const fieldName = element.getAttribute('name') || element.id;

      if (!this.behavior.formBehavior.fieldsVisited.includes(fieldName)) {
        this.behavior.formBehavior.fieldsVisited.push(fieldName);
      }

      // Start timing field completion
      this.startFieldTimer(fieldName);

      // Update conversion probability based on field progression
      this.updateConversionProbability();
    }
  }

  private startHesitationDetection() {
    // Detect form field hesitation
    setInterval(() => {
      const activeElement = document.activeElement as HTMLElement;
      if (activeElement && (activeElement.tagName === 'INPUT' || activeElement.tagName === 'TEXTAREA')) {
        const fieldName = activeElement.getAttribute('name') || activeElement.id;
        const focusTime = Date.now() - (this.fieldFocusStartTimes.get(fieldName) || Date.now());

        // If user has been focused on field for >30 seconds without typing much
        if (focusTime > 30000 && (activeElement as HTMLInputElement).value.length < 3) {
          this.behavior.formBehavior.hesitationPoints.push(fieldName);
          this.triggerHesitationAssistance(fieldName);
        }
      }
    }, 5000);
  }

  private updateConversionProbability() {
    const { formBehavior, interactions, deviceInfo } = this.behavior;

    let probability = 0.5; // Base probability

    // Form progression factor
    const expectedFields = ['name', 'email', 'phone', 'interest', 'notes'];
    const completionRate = formBehavior.fieldsVisited.length / expectedFields.length;
    probability += completionRate * 0.3;

    // Engagement factor
    probability += Math.min(this.behavior.engagementScore / 100, 0.2);

    // Device factor (mobile users typically have lower conversion)
    if (deviceInfo.isMobile) probability -= 0.1;

    // Error factor
    probability -= formBehavior.errorCount * 0.05;

    // Hesitation factor
    probability -= formBehavior.hesitationPoints.length * 0.03;

    // Time on page factor
    const timeOnPage = Date.now() - this.behavior.pageViews[0]?.timestamp || 0;
    if (timeOnPage > 120000) probability += 0.1; // 2+ minutes indicates serious interest

    this.behavior.conversionProbability = Math.max(0, Math.min(1, probability));

    // Trigger interventions based on probability
    if (this.behavior.conversionProbability < 0.3) {
      this.triggerConversionAssistance();
    }
  }

  private triggerHesitationAssistance(fieldName: string) {
    // Show contextual help for struggling users
    const helpMessages = {
      name: "Just your first and last name works great!",
      email: "We'll never share your email with anyone - promise!",
      phone: "Optional - for faster response. You can skip this if you prefer.",
      interest: "Not sure? 'Modern Consulting' covers general business optimization.",
      notes: "Even a few words help! Like 'need help with payroll' or 'website isn't working'"
    };

    this.showInlineHelp(fieldName, helpMessages[fieldName as keyof typeof helpMessages] || "Need help? We're here to assist!");
  }

  private triggerConversionAssistance() {
    // Show exit-intent popup, offer help, etc.
    this.showConversionBooster();
  }

  // Public API
  getBehaviorData(): UserBehavior {
    return this.behavior;
  }

  getHeatmapData(): Record<string, number> {
    return Object.fromEntries(this.heatmapData);
  }

  getConversionProbability(): number {
    return this.behavior.conversionProbability;
  }

  // Export data for analysis
  exportBehaviorData() {
    return {
      ...this.behavior,
      heatmap: this.getHeatmapData(),
      scrollBehavior: this.scrollBehavior,
      mouseMovements: this.mouseMovements.slice(-50) // Last 50 movements
    };
  }

  // Utility methods
  private generateSessionId(): string {
    return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  private getDeviceInfo(): DeviceInfo {
    const ua = navigator.userAgent;
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(ua);
    const isTablet = /iPad|Android(?=.*\bMobile\b)|Tablet/i.test(ua);

    return {
      isMobile,
      isTablet,
      browser: this.getBrowser(),
      os: this.getOS(),
      screenResolution: `${window.screen.width}x${window.screen.height}`
    };
  }

  private getBrowser(): string {
    const ua = navigator.userAgent;
    if (ua.includes('Chrome')) return 'Chrome';
    if (ua.includes('Firefox')) return 'Firefox';
    if (ua.includes('Safari')) return 'Safari';
    if (ua.includes('Edge')) return 'Edge';
    return 'Unknown';
  }

  private getOS(): string {
    const ua = navigator.userAgent;
    if (ua.includes('Windows')) return 'Windows';
    if (ua.includes('Mac')) return 'macOS';
    if (ua.includes('Linux')) return 'Linux';
    if (ua.includes('Android')) return 'Android';
    if (ua.includes('iOS')) return 'iOS';
    return 'Unknown';
  }

  private getTrafficSource(): TrafficSource {
    const referrer = document.referrer;
    const urlParams = new URLSearchParams(window.location.search);

    return {
      source: urlParams.get('utm_source') || this.inferSource(referrer),
      medium: urlParams.get('utm_medium') || 'direct',
      campaign: urlParams.get('utm_campaign') || undefined,
      referrer: referrer || ''
    };
  }

  private inferSource(referrer: string): string {
    if (!referrer) return 'direct';
    if (referrer.includes('google')) return 'google';
    if (referrer.includes('facebook')) return 'facebook';
    if (referrer.includes('linkedin')) return 'linkedin';
    return 'referral';
  }

  private calculateVelocity(e: MouseEvent): number {
    if (this.mouseMovements.length < 2) return 0;

    const current = this.mouseMovements[this.mouseMovements.length - 1];
    const previous = this.mouseMovements[this.mouseMovements.length - 2];

    const distance = Math.sqrt(
      Math.pow(current.x - previous.x, 2) + Math.pow(current.y - previous.y, 2)
    );
    const timeDiff = current.timestamp - previous.timestamp;

    return distance / timeDiff;
  }

  private getScrollDirection(): 'up' | 'down' {
    if (this.scrollBehavior.length < 2) return 'down';

    const current = this.scrollBehavior[this.scrollBehavior.length - 1];
    const previous = this.scrollBehavior[this.scrollBehavior.length - 2];

    return current.depth > previous.depth ? 'down' : 'up';
  }

  private getElementPath(element: HTMLElement): string {
    const path = [];
    let current = element;

    while (current && current !== document.body) {
      let selector = current.tagName.toLowerCase();

      if (current.id) {
        selector += `#${current.id}`;
      } else if (current.className) {
        selector += `.${current.className.split(' ').join('.')}`;
      } else if (current.getAttribute('name')) {
        selector += `[name="${current.getAttribute('name')}"]`;
      }

      path.unshift(selector);
      current = current.parentElement!;
    }

    return path.join(' > ');
  }

  private detectMouseHesitation(e: MouseEvent) {
    // Simple hesitation detection - slow movement near form elements
    const velocity = this.calculateVelocity(e);
    if (velocity < 0.1) { // Very slow movement
      const element = document.elementFromPoint(e.clientX, e.clientY) as HTMLElement;
      if (element && (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA' || element.closest('form'))) {
        this.updateEngagementScore('hesitation', velocity);
      }
    }
  }

  private analyzeClickPattern(element: HTMLElement) {
    // Analyze click patterns to predict intent
    if (element.closest('[data-lead-form]')) {
      this.updateEngagementScore('form_interaction', 1);
    } else if (element.closest('[data-pricing]')) {
      this.updateEngagementScore('pricing_interest', 1);
    } else if (element.closest('[data-demo]')) {
      this.updateEngagementScore('demo_interest', 1);
    }
  }

  private startFieldTimer(fieldName: string) {
    this.fieldFocusStartTimes.set(fieldName, Date.now());
  }

  private updateEngagementScore(action: string, value: number) {
    const actionWeights = {
      'scroll': value * 0.1,
      'click': 2,
      'form_interaction': 5,
      'pricing_interest': 8,
      'demo_interest': 10,
      'hesitation': -1
    };

    const weight = actionWeights[action as keyof typeof actionWeights] || 1;
    this.behavior.engagementScore = Math.min(100, Math.max(0, this.behavior.engagementScore + weight));
  }

  private startEngagementScoring() {
    // Periodic engagement updates
    setInterval(() => {
      const timeOnPage = Date.now() - (this.behavior.pageViews[0]?.timestamp || Date.now());
      if (timeOnPage > 60000) { // 1 minute
        this.updateEngagementScore('time_engagement', Math.floor(timeOnPage / 60000));
      }
    }, 30000); // Every 30 seconds
  }

  private showInlineHelp(fieldName: string, message: string) {
    // Create and show inline help message
    const field = document.querySelector(`[name="${fieldName}"]`) as HTMLElement;
    if (!field) return;

    const helpDiv = document.createElement('div');
    helpDiv.className = 'inline-help-message';
    helpDiv.textContent = message;
    helpDiv.style.cssText = `
      position: absolute;
      background: #3b82f6;
      color: white;
      padding: 8px 12px;
      border-radius: 6px;
      font-size: 14px;
      z-index: 1000;
      box-shadow: 0 4px 12px rgba(0,0,0,0.15);
      animation: fadeInUp 0.3s ease-out;
    `;

    const fieldRect = field.getBoundingClientRect();
    helpDiv.style.top = `${fieldRect.bottom + 8}px`;
    helpDiv.style.left = `${fieldRect.left}px`;

    document.body.appendChild(helpDiv);

    // Remove after 5 seconds
    setTimeout(() => {
      if (helpDiv.parentNode) {
        helpDiv.parentNode.removeChild(helpDiv);
      }
    }, 5000);
  }

  private showConversionBooster() {
    // Create exit-intent style popup
    const popup = document.createElement('div');
    popup.className = 'conversion-popup';
    popup.innerHTML = `
      <div style="
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: white;
        padding: 24px;
        border-radius: 12px;
        box-shadow: 0 20px 60px rgba(0,0,0,0.3);
        z-index: 10000;
        max-width: 400px;
        text-align: center;
      ">
        <h3 style="margin: 0 0 12px 0; color: #1f2937;">Wait! Don't Leave Yet</h3>
        <p style="margin: 0 0 20px 0; color: #6b7280;">
          Complete your form and get a free business assessment worth $200!
        </p>
        <button style="
          background: #3b82f6;
          color: white;
          border: none;
          padding: 12px 24px;
          border-radius: 8px;
          cursor: pointer;
          font-weight: 600;
        " onclick="this.parentElement.parentElement.remove()">Claim My Free Assessment</button>
      </div>
    `;

    document.body.appendChild(popup);
  }
}

export const behavioralAnalytics = new BehavioralAnalytics();

// React hook
export function useBehavioralAnalytics() {
  const [conversionProbability, setConversionProbability] = React.useState(0.5);
  const [engagementScore, setEngagementScore] = React.useState(0);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setConversionProbability(behavioralAnalytics.getConversionProbability());
      setEngagementScore(behavioralAnalytics.getBehaviorData().engagementScore);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return {
    conversionProbability,
    engagementScore,
    behaviorData: behavioralAnalytics.getBehaviorData(),
    exportData: behavioralAnalytics.exportBehaviorData
  };
}
