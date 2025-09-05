const fs = require('fs').promises;
const path = require('path');

const serviceAreaCities = [
  'Dallas',
  'Fort Worth',
  'Arlington',
  'Plano',
  'Frisco',
  'Irving',
  'Garland',
  'McKinney',
  'Denton',
  'Grand Prairie',
  'Richardson',
  'Lewisville',
  'Mesquite',
  'Allen',
  'Grapevine',
  'Carrollton',
  'Keller',
  'Mansfield',
  'Rockwall',
  'Rowlett',
];

async function createCityPages() {
  const appDir = path.join(__dirname, '..', 'app');

  for (const city of serviceAreaCities) {
    const slug = city.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const dirPath = path.join(appDir, slug);
    const filePath = path.join(dirPath, 'page.tsx');

    const content = `import CityPage from '@/components/CityPage';

export default function ${city.replace(/[^a-zA-Z]/g, '')}Page() {
  return <CityPage city="${city}" />;
}`;

    try {
      await fs.mkdir(dirPath, { recursive: true });
      await fs.writeFile(filePath, content);
      console.log(`✓ Created ${slug}/page.tsx`);
    } catch (err) {
      console.error(`✗ Error creating ${slug}/page.tsx:`, err);
    }
  }
}

createCityPages();
