/**
 * PrepSpace Technical Library - Authoring Utilities & HTML Formatters
 */

function escapeHtml(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function buildTheorem(title, content) {
  return `
    <div class="book-callout-theorem">
      <h5><i class="fa-solid fa-square-root-variable me-2"></i>${title}</h5>
      <div>${content}</div>
    </div>
  `;
}

function buildMemoryDiagram(caption, asciiArt) {
  return `
    <div class="my-3">
      <div class="text-info fs-8 fw-semibold mb-1"><i class="fa-solid fa-microchip me-1.5"></i>${caption}</div>
      <pre><code>${escapeHtml(asciiArt.trim())}</code></pre>
    </div>
  `;
}

function buildCodeBlock(language, code) {
  return `<pre><code class="language-${language}">${escapeHtml(code.trim())}</code></pre>`;
}

function buildComplexityTable(headers, rows) {
  const thead = headers.map(h => `<th>${h}</th>`).join('');
  const tbody = rows.map(r => `<tr>${r.map(cell => `<td>${cell}</td>`).join('')}</tr>`).join('');
  return `
    <div class="table-responsive my-4">
      <table class="table table-bordered table-dark align-middle">
        <thead>
          <tr class="table-primary text-dark font-monospace fs-9">
            ${thead}
          </tr>
        </thead>
        <tbody class="fs-8">
          ${tbody}
        </tbody>
      </table>
    </div>
  `;
}

function buildInsight(title, content) {
  return `
    <div class="book-callout-insight">
      <h5><i class="fa-solid fa-lightbulb me-2"></i>${title}</h5>
      <div>${content}</div>
    </div>
  `;
}

function buildWarning(title, content) {
  return `
    <div class="book-callout-warning">
      <h5><i class="fa-solid fa-triangle-exclamation me-2"></i>${title}</h5>
      <div>${content}</div>
    </div>
  `;
}

function buildAlgorithm(title, content) {
  return `
    <div class="book-callout-algorithm">
      <h5><i class="fa-solid fa-code me-2"></i>${title}</h5>
      <div>${content}</div>
    </div>
  `;
}

module.exports = {
  escapeHtml,
  buildTheorem,
  buildMemoryDiagram,
  buildCodeBlock,
  buildComplexityTable,
  buildInsight,
  buildWarning,
  buildAlgorithm
};
