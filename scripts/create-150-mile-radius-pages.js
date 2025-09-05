const fs = require('fs').promises;
const path = require('path');
const cityData = require('./cityData.cjs');

async function createCityPages() {
  const appDir = path.join(__dirname, '..', 'app');
  
  // Get cities within 150 miles of Royse City
  const citiesInRange = cityData.getCitiesWithinRadius('Royse City', 150);
  console.log(`\nFound ${citiesInRange.length} cities within 150 miles of Royse City:\n`);
  citiesInRange.forEach(city => console.log(`- ${city}`));
  
  console.log('\nGenerating city pages...\n');

  for (const city of citiesInRange) {
    const slug = cityData.slugifyCity(city);
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
