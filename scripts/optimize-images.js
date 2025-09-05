const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const PUBLIC_DIR = path.join(__dirname, '..', 'public');
const BRANDS = [
  'kps-group',
  'modern-brands',
  'modern-consulting',
  'modern-ledger',
  'modern-pay',
  'modern-stack'
];

// Image formats to generate
const FORMATS = ['webp', 'avif'];

// Quality settings
const QUALITY = {
  webp: 85,
  avif: 80
};

function optimizeImage(inputPath, outputPath, format) {
  const quality = QUALITY[format];
  const command = `magick "${inputPath}" -quality ${quality} "${outputPath}"`;

  try {
    execSync(command);
    console.log(`✅ Generated ${format.toUpperCase()}: ${outputPath}`);
  } catch (error) {
    console.error(`❌ Failed to generate ${format.toUpperCase()}: ${outputPath}`);
    console.error(error.message);
  }
}

function generateResponsiveVariants(inputPath, baseName, dir) {
  const variants = [
    { suffix: '@2x', size: '200%' },
    { suffix: '@3x', size: '300%' }
  ];

  variants.forEach(({ suffix, size }) => {
    FORMATS.forEach(format => {
      const outputPath = path.join(dir, `${baseName}${suffix}.${format}`);
      const command = `magick "${inputPath}" -resize ${size} -quality ${QUALITY[format]} "${outputPath}"`;

      try {
        execSync(command);
        console.log(`✅ Generated responsive ${format.toUpperCase()}: ${outputPath}`);
      } catch (error) {
        console.error(`❌ Failed to generate responsive ${format.toUpperCase()}: ${outputPath}`);
        console.error(error.message);
      }
    });
  });
}

function processDirectory(dirPath) {
  console.log(`\n🔍 Processing directory: ${dirPath}`);

  if (!fs.existsSync(dirPath)) {
    console.log(`⚠️  Directory not found: ${dirPath}`);
    return;
  }

  const files = fs.readdirSync(dirPath);

  files.forEach(file => {
    const filePath = path.join(dirPath, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      // Recursively process subdirectories
      processDirectory(filePath);
    } else if (stat.isFile()) {
      const ext = path.extname(file).toLowerCase();
      const baseName = path.basename(file, ext);

      // Process PNG, JPG, JPEG files
      if (['.png', '.jpg', '.jpeg'].includes(ext)) {
        console.log(`\n📸 Processing: ${file}`);

        // Generate WebP and AVIF versions
        FORMATS.forEach(format => {
          const outputPath = path.join(dirPath, `${baseName}.${format}`);
          optimizeImage(filePath, outputPath, format);
        });

        // Generate responsive variants for logos and small images
        if (baseName.includes('logo') || baseName.includes('icon') || stat.size < 100000) {
          generateResponsiveVariants(filePath, baseName, dirPath);
        }
      }
    }
  });
}

function generateImageReport() {
  const report = {
    processed: 0,
    generated: 0,
    errors: 0,
    savings: 0
  };

  console.log('\n📊 Image Optimization Report');
  console.log('==============================');

  BRANDS.forEach(brand => {
    const brandDir = path.join(PUBLIC_DIR, brand);
    if (fs.existsSync(brandDir)) {
      const files = fs.readdirSync(brandDir);
      const optimizedFiles = files.filter(file =>
        file.includes('.webp') || file.includes('.avif')
      );

      console.log(`\n${brand}:`);
      console.log(`  Original files: ${files.length - optimizedFiles.length}`);
      console.log(`  Optimized files: ${optimizedFiles.length}`);
      console.log(`  Optimization ratio: ${((optimizedFiles.length / files.length) * 100).toFixed(1)}%`);
    }
  });

  console.log('\n✅ Image optimization complete!');
  console.log('\n💡 Tips for best results:');
  console.log('  - Use WebP format for modern browsers');
  console.log('  - Use AVIF for maximum compression');
  console.log('  - Use responsive images with srcset');
  console.log('  - Enable lazy loading for below-the-fold images');
}

// Main execution
console.log('🚀 Starting image optimization...');

BRANDS.forEach(brand => {
  const brandDir = path.join(PUBLIC_DIR, brand);
  processDirectory(brandDir);
});

// Process team directory
processDirectory(path.join(PUBLIC_DIR, 'team'));

// Generate report
generateImageReport();