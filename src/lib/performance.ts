import { gtmEvent } from './gtm';

export function reportWebVitals(metric: { name: string; value: number; id: string }) {
  gtmEvent('web_vitals', {
    event_category: 'performance',
    metric_name: metric.name,
    metric_value: Math.round(metric.value),
    metric_id: metric.id,
  });

  // Log performance issues
  if (metric.name === 'LCP' && metric.value > 2500) {
    gtmEvent('performance_issue', {
      event_category: 'performance',
      issue_type: 'slow_lcp',
      value: Math.round(metric.value)
    });
  }

  if (metric.name === 'FID' && metric.value > 100) {
    gtmEvent('performance_issue', {
      event_category: 'performance',
      issue_type: 'slow_fid',
      value: Math.round(metric.value)
    });
  }
}
