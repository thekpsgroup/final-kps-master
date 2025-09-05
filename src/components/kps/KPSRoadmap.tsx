'use client';

import { useState } from 'react';

// KPS Brand Colors
const NAVY = '#00438c';
const GOLD = '#cab068';

// Workstream Groups
const GROUPS = [
  { id: 'ledger', label: 'Modern Ledger', color: '#1E6B4E' },
  { id: 'pay', label: 'Modern Pay', color: '#2BAA9C' },
  { id: 'brands', label: 'Modern Brands', color: '#6A5ACD' },
  { id: 'consulting', label: 'Modern Consulting', color: '#C7A252' },
  { id: 'stack', label: 'Modern Stack', color: '#0881C2' },
];

// Sample Roadmap Items organized by quarters
const ROADMAP_QUARTERS = [
  {
    quarter: 'Q1 2024',
    items: [
      {
        id: 1,
        group: 'ledger',
        title: 'QBO Integration Expansion',
        status: 'completed',
        description:
          'Expanded QuickBooks Online integration capabilities with advanced reporting and automated reconciliation.',
      },
      {
        id: 2,
        group: 'pay',
        title: 'Multi-State Payroll Launch',
        status: 'in-progress',
        description:
          'Comprehensive multi-state payroll processing with automated tax filings and worker classification.',
      },
      {
        id: 3,
        group: 'brands',
        title: 'Conversion Optimization Suite',
        status: 'in-progress',
        description:
          'Advanced conversion optimization tools including A/B testing framework and heatmap analytics.',
      },
    ],
  },
  {
    quarter: 'Q2 2024',
    items: [
      {
        id: 4,
        group: 'consulting',
        title: 'Operations Playbook v2.0',
        status: 'planned',
        description:
          'Complete overhaul of operations documentation with standardized SOPs and process automation guides.',
      },
      {
        id: 5,
        group: 'stack',
        title: 'MSP Service Expansion',
        status: 'planned',
        description:
          'Expand managed service offerings with advanced security, cloud migration, and 24/7 monitoring.',
      },
    ],
  },
  {
    quarter: 'Q3 2024',
    items: [
      {
        id: 7,
        group: 'ledger',
        title: 'Historical Cleanup Automation',
        status: 'planned',
        description:
          'Automate historical bookkeeping cleanup processes with AI-powered categorization.',
      },
    ],
  },
];

type RoadmapItem = {
  id: number;
  group: string;
  title: string;
  status: 'completed' | 'in-progress' | 'planned';
  description: string;
};

export default function KPSRoadmap() {
  const [selectedItem, setSelectedItem] = useState<RoadmapItem | null>(null);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return '#10B981'; // green
      case 'in-progress':
        return '#F59E0B'; // yellow
      case 'planned':
        return '#6B7280'; // gray
      default:
        return '#6B7280';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return '✓';
      case 'in-progress':
        return '○';
      case 'planned':
        return '□';
      default:
        return '□';
    }
  };

  return (
    <div className="w-full">
      <style jsx global>{`
        .roadmap-card {
          background: white;
          border-radius: 12px;
          border: 1px solid #e5e7eb;
          padding: 20px;
          margin-bottom: 16px;
          transition: all 0.3s ease;
        }
        .roadmap-card:hover {
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }
        .status-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 4px 12px;
          border-radius: 20px;
          font-size: 12px;
          font-weight: 600;
        }
        .roadmap-modal {
          position: fixed;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(0, 4, 56, 0.8);
          z-index: 60;
          backdrop-filter: blur(4px);
        }
        .roadmap-modal-content {
          width: min(600px, 90vw);
          background: white;
          border-radius: 16px;
          border: 1px solid #e5e7eb;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.2);
          padding: 24px;
        }
      `}</style>

      <div
        style={{
          background: '#f8fafc',
          padding: '24px',
          borderRadius: '16px',
          border: '1px solid #e5e7eb',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            gap: '16px',
            marginBottom: '20px',
          }}
        >
          <div style={{ fontWeight: 700, color: NAVY, letterSpacing: '0.2px', fontSize: '20px' }}>
            KPS Product Roadmap
          </div>

          {/* Status Legend */}
          <div style={{ display: 'flex', gap: '12px', marginLeft: 'auto' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '14px' }}>
              <span>✓</span>
              <span style={{ color: '#6B7280' }}>Completed</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '14px' }}>
              <span>○</span>
              <span style={{ color: '#6B7280' }}>In Progress</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '14px' }}>
              <span>□</span>
              <span style={{ color: '#6B7280' }}>Planned</span>
            </div>
          </div>
        </div>

        {/* Roadmap Timeline */}
        <div style={{ display: 'grid', gap: '32px' }}>
          {ROADMAP_QUARTERS.map((quarter) => (
            <div key={quarter.quarter}>
              <div
                style={{
                  fontSize: '18px',
                  fontWeight: 600,
                  color: NAVY,
                  marginBottom: '16px',
                  paddingBottom: '8px',
                  borderBottom: `2px solid ${GOLD}`,
                }}
              >
                {quarter.quarter}
              </div>

              <div style={{ display: 'grid', gap: '16px' }}>
                {quarter.items.map((item) => {
                  const group = GROUPS.find((g) => g.id === item.group);
                  return (
                    <div
                      key={item.id}
                      className="roadmap-card"
                      style={{ cursor: 'pointer' }}
                      onClick={() => setSelectedItem(item as RoadmapItem)}
                    >
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          marginBottom: '12px',
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                          <div
                            style={{
                              width: '12px',
                              height: '12px',
                              borderRadius: '50%',
                              backgroundColor: group?.color || NAVY,
                            }}
                          />
                          <span style={{ fontWeight: 600, color: NAVY }}>{group?.label}</span>
                        </div>
                        <div
                          className="status-badge"
                          style={{
                            backgroundColor: `${getStatusColor(item.status)}15`,
                            color: getStatusColor(item.status),
                          }}
                        >
                          <span>{getStatusIcon(item.status)}</span>
                          {item.status.replace('-', ' ').replace(/\b\w/g, (l) => l.toUpperCase())}
                        </div>
                      </div>

                      <h3
                        style={{
                          fontSize: '16px',
                          fontWeight: 600,
                          color: '#1f2937',
                          marginBottom: '8px',
                        }}
                      >
                        {item.title}
                      </h3>

                      <p style={{ color: '#6b7280', fontSize: '14px', lineHeight: '1.5' }}>
                        {item.description.length > 120
                          ? `${item.description.substring(0, 120)}...`
                          : item.description}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal for detailed view */}
      {selectedItem && (
        <div className="roadmap-modal" onClick={() => setSelectedItem(null)}>
          <div className="roadmap-modal-content" onClick={(e) => e.stopPropagation()}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '16px',
              }}
            >
              <h2 style={{ fontSize: '24px', fontWeight: 700, color: NAVY }}>
                {selectedItem.title}
              </h2>
              <button
                onClick={() => setSelectedItem(null)}
                style={{
                  border: 'none',
                  background: 'transparent',
                  color: NAVY,
                  fontSize: '24px',
                  cursor: 'pointer',
                  padding: '4px',
                }}
              >
                ×
              </button>
            </div>

            <div
              style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}
            >
              <div
                style={{
                  width: '16px',
                  height: '16px',
                  borderRadius: '50%',
                  backgroundColor: GROUPS.find((g) => g.id === selectedItem.group)?.color || NAVY,
                }}
              />
              <span style={{ fontWeight: 600, color: NAVY }}>
                {GROUPS.find((g) => g.id === selectedItem.group)?.label}
              </span>
              <div
                className="status-badge"
                style={{
                  backgroundColor: `${getStatusColor(selectedItem.status)}15`,
                  color: getStatusColor(selectedItem.status),
                }}
              >
                <span>{getStatusIcon(selectedItem.status)}</span>
                {selectedItem.status.replace('-', ' ').replace(/\b\w/g, (l) => l.toUpperCase())}
              </div>
            </div>

            <div style={{ marginBottom: '20px' }}>
              <h3
                style={{ fontSize: '16px', fontWeight: 600, color: '#374151', marginBottom: '8px' }}
              >
                Description
              </h3>
              <p style={{ color: '#6b7280', lineHeight: '1.6' }}>{selectedItem.description}</p>
            </div>

            <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
              <button
                onClick={() => setSelectedItem(null)}
                style={{
                  padding: '8px 16px',
                  border: `1px solid ${NAVY}`,
                  background: 'white',
                  color: NAVY,
                  borderRadius: '8px',
                  fontWeight: 500,
                  cursor: 'pointer',
                }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
