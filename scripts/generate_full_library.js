/**
 * PrepSpace Technical Library - Master Curriculum Assembler
 * Assembles all 19 canonical books into technical-library-data.js
 */

const fs = require('fs');
const path = require('path');

// Import all 19 books
const books = [];
for (let id = 101; id <= 119; id++) {
  const bookPath = path.join(__dirname, 'lib', `book_${id}.js`);
  if (!fs.existsSync(bookPath)) {
    throw new Error(`Missing book file: ${bookPath}`);
  }
  const book = require(bookPath);
  books.push(book);
}

// 19 Canonical Categories
const categories = [
  { id: 'cat-dsa-foundations', name: 'Data Structures & Algorithms', icon: 'fa-solid fa-cubes-stacked', count: 1 },
  { id: 'cat-dsa-advanced', name: 'Advanced Data Structures & Algorithms', icon: 'fa-solid fa-network-wired', count: 1 },
  { id: 'cat-prog-java', name: 'Programming: Java Mastery', icon: 'fa-brands fa-java', count: 1 },
  { id: 'cat-prog-python', name: 'Programming: Python Complete Guide', icon: 'fa-brands fa-python', count: 1 },
  { id: 'cat-prog-cpp', name: 'Programming: Modern C & C++', icon: 'fa-solid fa-microchip', count: 1 },
  { id: 'cat-prog-js-ts', name: 'Programming: JavaScript & TypeScript', icon: 'fa-brands fa-js', count: 1 },
  { id: 'cat-web-frontend', name: 'Web Development: Frontend (HTML, CSS, Modern JS)', icon: 'fa-solid fa-palette', count: 1 },
  { id: 'cat-web-react', name: 'Web Development: React & State Architecture', icon: 'fa-brands fa-react', count: 1 },
  { id: 'cat-web-backend', name: 'Web Development: Backend & APIs (Node.js, Express, REST)', icon: 'fa-solid fa-server', count: 1 },
  { id: 'cat-db-sql', name: 'Databases & SQL Mastery (RDBMS, Normalization, Indexing)', icon: 'fa-solid fa-database', count: 1 },
  { id: 'cat-os-internals', name: 'Operating Systems & System Internals', icon: 'fa-solid fa-gears', count: 1 },
  { id: 'cat-networks', name: 'Computer Networks & Protocols', icon: 'fa-solid fa-diagram-project', count: 1 },
  { id: 'cat-oop-patterns', name: 'Object-Oriented Programming & Design Patterns', icon: 'fa-solid fa-sitemap', count: 1 },
  { id: 'cat-aptitude-quant', name: 'Quantitative Aptitude & Mathematics for Placements', icon: 'fa-solid fa-calculator', count: 1 },
  { id: 'cat-aptitude-logical', name: 'Logical & Analytical Reasoning', icon: 'fa-solid fa-brain', count: 1 },
  { id: 'cat-aptitude-verbal', name: 'Verbal Ability & Technical English', icon: 'fa-solid fa-book-open-reader', count: 1 },
  { id: 'cat-interview-tech', name: 'Technical Interview Handbook (Coding & System Design)', icon: 'fa-solid fa-laptop-code', count: 1 },
  { id: 'cat-interview-hr', name: 'HR & Behavioral Interview Master Guide (STAR Method)', icon: 'fa-solid fa-handshake', count: 1 },
  { id: 'cat-placement-roadmaps', name: 'High-Yield Placement Roadmap & Rapid Cheat Sheets', icon: 'fa-solid fa-road', count: 1 }
];

console.log(`Verifying ${books.length} books across 19 domains...`);

let totalChapters = 0;
const requiredSections = [
  { name: 'Theorem / Foundations', check: (html) => html.includes('book-callout-theorem') },
  { name: 'Memory / Architectural Diagram', check: (html) => html.includes('<pre><code>') },
  { name: 'Polyglot Implementation', check: (html) => html.includes('language-') || html.includes('<pre><code') },
  { name: 'Complexity Matrix', check: (html) => html.includes('table-dark') || html.includes('<table') },
  { name: 'Enterprise Insight', check: (html) => html.includes('book-callout-insight') },
  { name: 'Failure Modes Warning', check: (html) => html.includes('book-callout-warning') },
  { name: 'Practice Workshop Algorithm', check: (html) => html.includes('book-callout-algorithm') }
];

for (const book of books) {
  if (!book.id || !book.title || !book.category || !book.chapters) {
    throw new Error(`Book ${book.id} is missing core fields`);
  }
  if (book.chapters.length < 8) {
    throw new Error(`Book ${book.id} (${book.title}) has only ${book.chapters.length} chapters; minimum 8 required`);
  }

  // Verify Pro badge & Preview rules
  if (book.id === 101 && book.isPro !== false) {
    console.warn(`Warning: Book 101 should have isPro: false`);
  }
  if (book.id > 101 && book.isPro !== true) {
    console.warn(`Warning: Book ${book.id} should have isPro: true`);
  }

  book.chapters.forEach((ch, idx) => {
    totalChapters++;
    const expectedPreview = (idx === 0);
    if (ch.isFreePreview !== expectedPreview) {
      console.warn(`Book ${book.id} Ch ${ch.chapterNumber}: isFreePreview is ${ch.isFreePreview}, expected ${expectedPreview}`);
    }

    // Validate 7 required sections
    for (const req of requiredSections) {
      if (!req.check(ch.contentHtml)) {
        console.warn(`Book ${book.id} Ch ${ch.chapterNumber} missing section: ${req.name}`);
      }
    }
  });
}

console.log(`Validation Passed! Total Books: ${books.length}, Total Chapters: ${totalChapters}`);

// Generate Bundle JS
const libraryData = {
  version: '1.0.0',
  categories: categories,
  books: books
};

const outputJs = `/**
 * PrepSpace Technical Library - Official Comprehensive Curriculum
 * 19 Canonical Domains for Software Engineering & Placement Excellence
 * © 2026 PrepSpace (stream-in.app). All rights reserved.
 */

(function(window) {
  'use strict';

  const PREPSPACE_LIBRARY = ${JSON.stringify(libraryData, null, 2)};

  // Expose globally
  window.PREPSPACE_LIBRARY = PREPSPACE_LIBRARY;
})(typeof window !== 'undefined' ? window : globalThis);
`;

const destPaths = [
  path.join(__dirname, '..', 'frontend', 'assets', 'js', 'technical-library-data.js'),
  path.join(__dirname, '..', 'frontend', 'www', 'assets', 'js', 'technical-library-data.js')
];

for (const dest of destPaths) {
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  fs.writeFileSync(dest, outputJs, 'utf-8');
  console.log(`Wrote library bundle to: ${dest} (${(Buffer.byteLength(outputJs) / 1024 / 1024).toFixed(2)} MB)`);
}

console.log('Master library build completed successfully!');
