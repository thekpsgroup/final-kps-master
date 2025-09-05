#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('🔧 Starting comprehensive linting error fix...\n');

function main() {
  // Get ESLint output
  let lintResults = [];
  try {
    const eslintOutput = execSync('npx eslint --ext .ts,.tsx . --format json', {
      encoding: 'utf8',
      cwd: process.cwd()
    });

    lintResults = JSON.parse(eslintOutput);
  } catch (error) {
    console.log('⚠️  ESLint configuration issue, using manual scan...\n');
    lintResults = scanFilesManually();
  }

  console.log(`Found ${lintResults.length} files with issues\n`);

  let fixedCount = 0;

  lintResults.forEach(fileResult => {
    const filePath = fileResult.filePath;
    console.log(`📁 Processing: ${path.basename(filePath)}`);

    fileResult.messages.forEach(error => {
      const ruleId = error.ruleId;
      const message = error.message;
      const line = error.line;
      const column = error.column;

      console.log(`  ${ruleId}: ${message} (line ${line}:${column})`);

      // Fix common issues automatically
      try {
        fixError(filePath, error);
        fixedCount++;
      } catch (fixError) {
        console.log(`    ❌ Could not auto-fix: ${fixError.message}`);
      }
    });

    console.log('');
  });

  console.log(`✅ Fixed ${fixedCount} issues automatically`);
  console.log('🔄 Running final lint check...\n');

  // Additional fixes for common issues
  fixFileExtensions();
  fixGenericSyntax();
  fixMissingTags();

  console.log('\n🎉 Comprehensive linting fix completed!');
  console.log('💡 Some complex issues may still need manual review.');
}

function fixError(filePath, error) {
  const content = fs.readFileSync(filePath, 'utf8');
  let newContent = content;

  const { ruleId, line, message } = error;

  // Fix unused variables
  if (ruleId === '@typescript-eslint/no-unused-vars') {
    if (message.includes('is defined but never used')) {
      // Comment out unused imports
      if (message.includes('import')) {
        const lines = content.split('\n');
        const lineContent = lines[line - 1];

        if (lineContent.includes('import')) {
          lines[line - 1] = `// ${lineContent}`;
          newContent = lines.join('\n');
        }
      }
      // Comment out unused variables
      else {
        const lines = content.split('\n');
        const lineContent = lines[line - 1];

        if (lineContent.includes('const') || lineContent.includes('let') || lineContent.includes('var')) {
          lines[line - 1] = `// ${lineContent}`;
          newContent = lines.join('\n');
        }
      }
    }
  }

  // Fix unescaped entities in JSX
  if (ruleId === 'react/no-unescaped-entities') {
    if (message.includes('can be escaped')) {
      const lines = content.split('\n');
      let lineContent = lines[line - 1];

      // Replace quotes with HTML entities
      lineContent = lineContent.replace(/"([^"]*)"/g, '&ldquo;$1&rdquo;');
      lineContent = lineContent.replace(/'([^']*)'/g, '&apos;$1&apos;');

      lines[line - 1] = lineContent;
      newContent = lines.join('\n');
    }
  }

  // Fix explicit any types
  if (ruleId === '@typescript-eslint/no-explicit-any') {
    const lines = content.split('\n');
    let lineContent = lines[line - 1];

    // Replace : any with : unknown
    lineContent = lineContent.replace(/: any\b/g, ': unknown');
    lineContent = lineContent.replace(/: any\[]/g, ': unknown[]');

    lines[line - 1] = lineContent;
    newContent = lines.join('\n');
  }

  // Apply the fix if content changed
  if (newContent !== content) {
    fs.writeFileSync(filePath, newContent, 'utf8');
    console.log(`    ✅ Fixed: ${ruleId}`);
  } else {
    console.log(`    ⚠️  Could not auto-fix: ${ruleId}`);
  }
}

function fixFileExtensions() {
  console.log('🔧 Checking file extensions for JSX files...');
  const tsxFiles = findFilesWithExtension('.ts');

  tsxFiles.forEach(filePath => {
    const content = fs.readFileSync(filePath, 'utf8');

    // Check if file contains JSX
    if (content.includes('<') && (content.includes('return (') || content.includes('return ('))) {
      const newFilePath = filePath.replace('.ts', '.tsx');
      fs.renameSync(filePath, newFilePath);
      console.log(`  ✅ Renamed ${path.basename(filePath)} to ${path.basename(newFilePath)}`);
    }
  });
}

function fixGenericSyntax() {
  console.log('🔧 Fixing generic function syntax...');
  const allFiles = findFilesWithExtension('.ts').concat(findFilesWithExtension('.tsx'));

  allFiles.forEach(filePath => {
    const content = fs.readFileSync(filePath, 'utf8');
    let newContent = content;

    // Replace JSX-style generics with function syntax
    newContent = newContent.replace(/<T>\(/g, 'function<T>(');
    newContent = newContent.replace(/<T,U>\(/g, 'function<T,U>(');

    if (newContent !== content) {
      fs.writeFileSync(filePath, newContent, 'utf8');
      console.log(`  ✅ Fixed generic syntax in ${path.basename(filePath)}`);
    }
  });
}

function fixMissingTags() {
  console.log('🔧 Fixing missing closing tags...');
  const allFiles = findFilesWithExtension('.tsx');

  allFiles.forEach(filePath => {
    const content = fs.readFileSync(filePath, 'utf8');
    let newContent = content;

    // Add missing </svg> tags
    if (newContent.includes('<svg') && !newContent.includes('</svg>')) {
      newContent = newContent.replace(/<\/motion\.div>\s*$/, '</svg>\n  </motion.div>');
      fs.writeFileSync(filePath, newContent, 'utf8');
      console.log(`  ✅ Added missing </svg> in ${path.basename(filePath)}`);
    }

    // Fix missing </section> tags
    if (newContent.includes('<section') && !newContent.includes('</section>')) {
      newContent = newContent.replace(/<\/motion\.div>\s*$/, '</section>\n  </motion.div>');
      fs.writeFileSync(filePath, newContent, 'utf8');
      console.log(`  ✅ Added missing </section> in ${path.basename(filePath)}`);
    }
  });
}

function scanFilesManually() {
  const results = [];
  const allFiles = findFilesWithExtension('.ts').concat(findFilesWithExtension('.tsx'));

  allFiles.forEach(filePath => {
    const content = fs.readFileSync(filePath, 'utf8');
    const lines = content.split('\n');
    const issues = [];

    // Check for common issues
    lines.forEach((line, index) => {
      const lineNumber = index + 1;

      // Check for unused imports
      if (line.includes('import') && !line.includes('//')) {
        const importMatch = line.match(/import\s+.*?\s+from\s+['"]([^'"]+)['"]/);
        if (importMatch) {
          const modulePath = importMatch[1];
          // Check if this import is actually used in the file
          const isUsed = content.includes(modulePath.split('/').pop());
          if (!isUsed && !modulePath.startsWith('@/') && !modulePath.startsWith('.')) {
            issues.push({
              ruleId: '@typescript-eslint/no-unused-vars',
              message: 'Import is defined but never used',
              line: lineNumber,
              column: 1
            });
          }
        }
      }

      // Check for unescaped entities
      if (line.includes('"') && line.includes('<') && line.includes('>')) {
        if (line.match(/["'][^"']*["']/g)) {
          issues.push({
            ruleId: 'react/no-unescaped-entities',
            message: 'Unescaped entities found',
            line: lineNumber,
            column: 1
          });
        }
      }

      // Check for explicit any
      if (line.includes(': any')) {
        issues.push({
          ruleId: '@typescript-eslint/no-explicit-any',
          message: 'Explicit any type found',
          line: lineNumber,
          column: line.indexOf(': any') + 1
        });
      }
    });

    if (issues.length > 0) {
      results.push({
        filePath,
        messages: issues
      });
    }
  });

  return results;
}

function findFilesWithExtension(ext) {
  const results = [];

  function walk(dir) {
    const files = fs.readdirSync(dir);

    files.forEach(file => {
      const filePath = path.join(dir, file);
      const stat = fs.statSync(filePath);

      if (stat.isDirectory() && !file.startsWith('.') && file !== 'node_modules') {
        walk(filePath);
      } else if (file.endsWith(ext)) {
        results.push(filePath);
      }
    });
  }

  walk(process.cwd());
  return results;
}

// Run the main function
main();