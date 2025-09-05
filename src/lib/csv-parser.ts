import fs from 'fs';
import path from 'path';

export interface CSVRow {
  [key: string]: string;
}

export interface LocationKeyword {
  keyword: string;
  city: string;
  state?: string;
  baseKeyword: string;
  fullKeyword: string;
}

export class CSVParser {
  private static parseCSVLine(line: string): string[] {
    const result: string[] = [];
    let current = '';
    let inQuotes = false;

    for (let i = 0; i < line.length; i++) {
      const char = line[i];
      const nextChar = line[i + 1];

      if (char === '"') {
        if (inQuotes && nextChar === '"') {
          // Escaped quote
          current += '"';
          i++; // Skip next quote
        } else {
          // Toggle quote state
          inQuotes = !inQuotes;
        }
      } else if (char === ',' && !inQuotes) {
        // Field separator
        result.push(current.trim());
        current = '';
      } else {
        current += char;
      }
    }

    // Add the last field
    result.push(current.trim());
    return result;
  }

  static parseCSV(csvContent: string): CSVRow[] {
    const lines = csvContent
      .split('\n')
      .map(line => line.trim())
      .filter(line => line && !line.startsWith('#'));

    if (lines.length === 0) return [];

    const headers = this.parseCSVLine(lines[0]);
    const rows: CSVRow[] = [];

    for (let i = 1; i < lines.length; i++) {
      const values = this.parseCSVLine(lines[i]);

      if (values.length === headers.length) {
        const row: CSVRow = {};
        headers.forEach((header, index) => {
          row[header] = values[index] || '';
        });
        rows.push(row);
      }
    }

    return rows;
  }

  static loadCSVFromFile(filePath: string): CSVRow[] {
    try {
      const fullPath = path.isAbsolute(filePath) ? filePath : path.join(process.cwd(), filePath);
      const content = fs.readFileSync(fullPath, 'utf-8');
      return this.parseCSV(content);
    } catch (error) {
      console.error(`Error loading CSV file ${filePath}:`, error);
      return [];
    }
  }

  // Specialized parser for location-based keywords
  static parseLocationKeywords(csvPath: string): LocationKeyword[] {
    try {
      const fullPath = path.join(process.cwd(), csvPath);
      const content = fs.readFileSync(fullPath, 'utf-8');
      const lines = content.split('\n').filter(line => line.trim() && !line.startsWith('#'));

      return lines.map(line => {
        const keyword = line.trim();

        // Parse location-based keywords like "ADP payroll alternatives Chicago"
        const parts = keyword.split(' ');
        const baseKeyword = parts.slice(0, -1).join(' '); // Everything except the last part (city)
        const location = parts[parts.length - 1]; // Last part (city or city state)

        // Handle city-state combinations like "Athens GA"
        let city = location;
        let state: string | undefined;

        if (location.includes(' ')) {
          const locationParts = location.split(' ');
          city = locationParts[0];
          state = locationParts[1];
        }

        return {
          keyword,
          city,
          state,
          baseKeyword,
          fullKeyword: keyword
        };
      });
    } catch (error) {
      console.error(`Error parsing location keywords from ${csvPath}:`, error);
      return [];
    }
  }

  // Load keywords in chunks for memory efficiency
  static loadKeywordsInChunks(csvPath: string, chunkSize: number = 1000): LocationKeyword[][] {
    const allKeywords = this.parseLocationKeywords(csvPath);
    const chunks: LocationKeyword[][] = [];

    for (let i = 0; i < allKeywords.length; i += chunkSize) {
      chunks.push(allKeywords.slice(i, i + chunkSize));
    }

    return chunks;
  }
}
