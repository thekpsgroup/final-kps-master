import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, company, need, brand, source, _honey } = body;

    // Basic validation
    if (!name || !email) {
      return NextResponse.json(
        { error: 'Name and email are required' },
        { status: 400 }
      );
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Honeypot check (basic spam protection)
    if (_honey) {
      return NextResponse.json(
        { error: 'Spam detected' },
        { status: 400 }
      );
    }

    // Create lead object
    const lead = {
      id: crypto.randomUUID(),
      name: name.trim(),
      email: email.toLowerCase().trim(),
      company: company?.trim() || '',
      need: need?.trim() || '',
      brand: brand || 'Unknown',
      source: source || 'website',
      timestamp: new Date().toISOString(),
      ip: request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown',
      userAgent: request.headers.get('user-agent') || 'unknown'
    };

    // For now, just log to console (replace with your CRM/database later)
    console.log('🎯 New Lead Captured:', {
      ...lead,
      // Don't log sensitive data in production
      ip: lead.ip === 'unknown' ? 'unknown' : '[REDACTED]',
      userAgent: '[REDACTED]'
    });

    // In production, you would:
    // 1. Save to database
    // 2. Send to CRM (HubSpot, Salesforce, etc.)
    // 3. Send notification email
    // 4. Add to email marketing list

    // For demo purposes, we'll just return success
    return NextResponse.json({
      success: true,
      message: 'Lead captured successfully',
      leadId: lead.id
    });

  } catch (error) {
    console.error('Lead capture error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// Handle OPTIONS for CORS
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}
