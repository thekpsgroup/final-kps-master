export function GET() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.thekpsgroup.com';
  const body = `User-agent: *
Allow: /
Sitemap: ${baseUrl}/sitemap.xml`;

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain",
    },
  });
}
