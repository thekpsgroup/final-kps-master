import critical from 'critical';

async function extractCriticalCSS() {
  try {
    await critical.generate({
      inline: false,
      base: 'out/',
      src: 'index.html',
      target: 'styles/critical.css',
      width: 1300,
      height: 900,
      ignore: ['@font-face', /url\(/],
    });
    console.log('Critical CSS extracted successfully');
  } catch (error) {
    console.error('Error extracting critical CSS:', error);
  }
}

extractCriticalCSS();
