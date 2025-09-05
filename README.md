# The KPS Group Website

A beautiful, professional website for The KPS Group showcasing the Modern Suite of services.

## Features

- **Modern Design**: Clean, premium aesthetic with generous whitespace and subtle animations
- **Brand Hub**: Parent site for five Modern brands (Pay, Ledger, Brands, Consulting, Stack)
- **SEO Optimized**: Complete meta tags, sitemap, robots.txt, and structured data
- **Accessible**: WCAG 2.1 AA compliant with proper focus states and labels
- **Performance**: Built with Next.js 14, TypeScript, and Tailwind CSS
- **Lead Generation**: FormSubmit integration with honeypot protection

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Forms**: FormSubmit
- **Deployment**: Vercel-ready

## Getting Started

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Run development server**:
   ```bash
   npm run dev
   ```

3. **Open browser**:
   ```
   http://localhost:3000
   ```

## Environment Variables

Create a `.env.local` file with:

```env
# Optional: Calendar booking URL
NEXT_PUBLIC_BOOKING_URL=https://your-calendar-embed-url

# Optional: Google Analytics
NEXT_PUBLIC_GA_ID=G-XXXXXXX
```

## Project Structure

```
├── app/                    # Next.js App Router pages
│   ├── [slug]/            # Dynamic brand pages
│   ├── consultation/      # Booking page
│   ├── privacy/           # Privacy policy
│   ├── terms/             # Terms of service
│   ├── thank-you/         # Form success page
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Home page
│   ├── robots.txt/        # SEO robots
│   └── sitemap.ts         # SEO sitemap
├── src/
│   ├── components/        # Reusable components
│   │   └── BrandLogo.tsx  # Logo component
│   └── config/            # Configuration
│       └── brandsConfig.ts # Brand data
├── public/                # Static assets
│   └── brands/            # Brand logos and images
└── package.json           # Dependencies
```

## Brand Configuration

The site uses a centralized brand configuration in `src/config/brandsConfig.ts`:

- **KPS_PARENT**: Parent brand (square logo)
- **brandsConfig**: Five Modern brands with detailed information
- Each brand includes: pains, outcomes, services, FAQs, and SEO data

## Deployment

The site is optimized for deployment on Vercel:

1. Connect your repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

## Performance

- Lighthouse score: ≥95 (mobile)
- Time to Interactive: <2.5s
- Optimized images and fonts
- Minimal JavaScript bundle

## Accessibility

- WCAG 2.1 AA compliant
- Proper heading hierarchy
- Focus states and keyboard navigation
- Screen reader friendly
- Color contrast ratios

## SEO

- Complete meta tags for all pages
- Open Graph images (1200x630)
- Structured data (FAQ schema)
- XML sitemap
- Robots.txt
- Clean URL structure

## Contact

For questions or support, contact sales@thekpsgroup.com
# final-kps-master
