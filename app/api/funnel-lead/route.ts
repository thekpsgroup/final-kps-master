import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, businessName, email, phone, city, citySlug } = body;

    // Validate required fields
    if (!name || !businessName || !email || !phone || !city) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: 'Invalid email format' }, { status: 400 });
    }

    // Create lead object
    const lead = {
      name,
      businessName,
      email,
      phone,
      city,
      citySlug,
      source: 'funnel_page',
      timestamp: new Date().toISOString(),
      userAgent: request.headers.get('user-agent'),
      ipAddress:
        request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown',
    };

    // Here you would typically:
    // 1. Save to database (e.g., Supabase, MongoDB, etc.)
    // 2. Send to CRM (HubSpot, Salesforce, etc.)
    // 3. Send notification email
    // 4. Add to marketing automation

    console.log('New funnel lead:', lead);

    // For now, we'll just log it and return success
    // In production, replace this with actual data storage

    return NextResponse.json({
      success: true,
      message: "Thank you for your interest! We'll be in touch soon.",
      lead: {
        name: lead.name,
        businessName: lead.businessName,
        city: lead.city,
      },
    });
  } catch (error) {
    console.error('Funnel lead submission error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
