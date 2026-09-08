/**
 * Book 107: Web Development: Modern Frontend Architecture (HTML5, CSS3, ESNext)
 */

const {
  buildTheorem,
  buildMemoryDiagram,
  buildCodeBlock,
  buildComplexityTable,
  buildInsight,
  buildWarning,
  buildAlgorithm
} = require('./utils');

const book107 = {
  id: 107,
  slug: 'frontend-architecture-mastery',
  title: 'Web Development: Modern Frontend Architecture',
  subtitle: 'Critical Rendering Path, CSS Grid, Performance, Accessibility, Core Web Vitals & Web Security',
  description: 'The definitive architectural guide to modern frontend systems. Master browser internals, layout reflow pipelines, CSS containment, responsive container queries, Web Workers, Core Web Vitals optimization, and browser security hardening.',
  author: 'PrepSpace Engineering Curriculum Group',
  category: 'Web Development: Frontend (HTML, CSS, Modern JS)',
  subcategory: 'Frontend Architecture',
  difficulty: 'INTERMEDIATE',
  pageCount: 360,
  estimatedReadingTime: '9 Hours',
  tags: ['Frontend', 'HTML5', 'CSS3', 'Performance', 'CoreWebVitals', 'A11y', 'WebWorkers', 'Security'],
  licenseType: 'ORIGINAL',
  copyrightNotice: '© 2026 PrepSpace (stream-in.app). All rights reserved.',
  isPro: true,
  badge: 'Frontend Core',
  rating: 4.93,
  readerCount: 3180,
  icon: 'fa-solid fa-palette',
  gradient: 'linear-gradient(135deg, #059669, #10b981)',
  chapters: [
    {
      id: 10701,
      chapterNumber: 1,
      title: 'The Critical Rendering Path: DOM, CSSOM & The Render Pipeline',
      subtitle: 'HTML parsing, CSSOM construction, render tree calculation, layout geometry, and compositing layers',
      summary: 'Deep dive into browser rendering: byte streams to tokenization, render tree generation, layout reflow, paint rasterization, and GPU compositor layers.',
      readingTimeMinutes: 24,
      isFreePreview: true,
      sortOrder: 1,
      contentHtml: `
        <h3>1.1 The Critical Rendering Path Pipeline</h3>
        <p>The <strong>Critical Rendering Path (CRP)</strong> is the sequence of steps a web browser executes to convert raw HTML, CSS, and JavaScript bytes into pixels rendered on a physical screen display.</p>

        ${buildTheorem('Theorem 1.1: Render-Blocking Resources Rule', `
          By default, <strong>CSS is treated as a render-blocking resource</strong>: the browser constructs the DOM progressively, but halts the Render Tree and Layout phases until the CSSOM is completely downloaded and parsed.
          Synchronous JavaScript is <strong>parser-blocking</strong>: encountering a <code>&lt;script&gt;</code> tag without <code>defer</code> or <code>async</code> stops DOM construction immediately.
        `)}

        <h3>1.2 Architectural & In-Memory Mechanics</h3>
        ${buildMemoryDiagram('The 5-Step Critical Rendering Path', `
Raw Bytes ===> Tokens ===> DOM Tree Nodes
                           +=================> Render Tree (Computed Styles)
Raw CSS Bytes ==> CSSOM Tree Nodes                 |
                                                   v
Layout / Reflow (Compute exact pixel geometry: x, y, width, height)
                                                   |
                                                   v
Paint / Rasterization (Fill pixels: text, colors, shadows into bitmaps)
                                                   |
                                                   v
Composite Layers (GPU merges layers via transform/opacity without repainting!)
        `)}

        <h3>1.3 Polyglot Implementation: Non-Blocking Script & CSS Loading</h3>
        <h6>HTML5 Architecture</h6>
        ${buildCodeBlock('html', `
<!-- 1. Preconnect to critical third-party CDNs -->
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>

<!-- 2. Preload critical above-the-fold hero image -->
<link rel="preload" as="image" href="/assets/hero.webp" fetchpriority="high">

<!-- 3. Defer non-critical scripts to prevent parser blocking -->
<script src="/assets/js/bundle.js" defer></script>
        `)}

        <h6>TypeScript (Dynamic Loader)</h6>
        ${buildCodeBlock('typescript', `
export function loadScriptAsync(src: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = src;
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error(\`Failed to load script \${src}\`));
    document.head.appendChild(script);
  });
}
        `)}

        <h6>Java 21 (HTML Resource Optimizer)</h6>
        ${buildCodeBlock('java', `
public class ResourceHints {
    public static String buildPreloadHeader(String assetUrl) {
        return "</" + assetUrl + ">; rel=preload; as=script";
    }
}
        `)}

        <h6>Python 3.12 (HTML Compressor)</h6>
        ${buildCodeBlock('python', `
def inject_critical_css(html: str, css: str) -> str:
    """Inlines critical CSS into <head> to eliminate round-trip latency."""
    return html.replace("</head>", f"<style>{css}</style></head>")
        `)}

        <h3>1.4 Asymptotic Complexity & Trade-Off Matrix</h3>
        ${buildComplexityTable(
          ['Browser Phase', 'Triggers', 'CPU / GPU Cost', 'Performance Impact'],
          [
            ['Layout / Reflow', 'Geometry changes (width, height, margin, fontSize)', 'Severe (Recalculates entire render tree)', 'Causes frame drops below 60fps'],
            ['Paint / Repaint', 'Visual changes (color, background, visibility)', 'Moderate (Re-rasters pixel bitmaps)', 'Increases CPU utilization'],
            ['Composite', 'Hardware transforms (transform: translate3d, opacity)', 'Minimal (Offloaded directly to GPU)', 'Silky smooth 60fps / 120fps animations']
          ]
        )}

        <h3>1.5 Real-World Enterprise & FAANG Case Studies</h3>
        ${buildInsight('Google Search & Amazon 100ms Latency Metric', `
          Amazon reported that every 100ms of additional rendering latency reduced overall retail sales by 1%. Google Search aggressively inlines critical CSS directly into the initial HTML document payload, guaranteeing First Contentful Paint (FCP) renders on the very first 14KB TCP transmission window.
        `)}

        <h3>1.6 High-Yield Interview Failure Modes & Gotchas</h3>
        ${buildWarning('Layout Thrashing (Forced Synchronous Layout)', `
          Reading a layout property immediately after mutating it in a loop: <code>for (let el of items) { el.style.width = '100px'; const h = el.offsetHeight; }</code> forces the browser to synchronously recalculate layout on EVERY iteration! This turns an <code>O(N)</code> render pass into catastrophic <code>O(N^2)</code> layout thrashing. ALWAYS batch reads first, then batch writes!
        `)}

        <h3>1.7 Practice Workshop Challenge & Solution</h3>
        ${buildAlgorithm('Challenge 1.1: Fast DOM Batching with requestAnimationFrame', `
          <pre><code class="language-javascript">
function updateElementsBatch(elements, newWidth) {
    // Phase 1: Read all layout geometries first (Zero reflow!)
    const currentHeights = elements.map(el => el.clientHeight);

    // Phase 2: Batch all DOM mutations inside a single animation frame:
    requestAnimationFrame(() => {
        elements.forEach((el, i) => {
            el.style.width = newWidth + 'px';
            el.style.height = (currentHeights[i] * 1.1) + 'px';
        });
    });
}
          </code></pre>
        `)}
      `
    },
    {
      id: 10702,
      chapterNumber: 2,
      title: 'Modern Semantic HTML5 & Web Accessibility (WCAG / a11y)',
      subtitle: 'Accessibility tree, ARIA roles/states, keyboard navigation, and screen reader affordances',
      summary: 'Master semantic HTML5 architecture: Accessibility (a11y) tree mapping, WCAG 2.2 AAA standards, ARIA landmark roles, focus rings, and screen reader optimizations.',
      readingTimeMinutes: 22,
      isFreePreview: false,
      sortOrder: 2,
      contentHtml: `
        <h3>2.1 The Accessibility Tree & Semantic Landmarks</h3>
        <p>Browsers parse HTML into two parallel data structures: the visual DOM Tree and the <strong>Accessibility Tree (a11y Tree)</strong>. Assistive technologies (screen readers, braille displays) navigate the a11y tree. Semantic elements (<code>&lt;main&gt;</code>, <code>&lt;nav&gt;</code>, <code>&lt;article&gt;</code>) provide native keyboard and speech landmarks without requiring custom JavaScript.</p>

        ${buildTheorem('Theorem 2.1: The First Rule of ARIA (W3C Standard)', `
          <em>"If you can use a native HTML element or attribute with the semantics and behavior you require already built-in, then do so."</em>
          Do not add <code>role="button" tabindex="0"</code> to a <code>&lt;div&gt;</code> when a native <code>&lt;button&gt;</code> provides focusability, Space/Enter activation, and accessibility contracts for free.
        `)}

        <h3>2.2 Architectural & In-Memory Mechanics</h3>
        ${buildMemoryDiagram('DOM Tree to Accessibility Tree Translation', `
DOM Node: <button class="btn">Submit</button>
                    |
Accessibility Node:
- Role: button
- Name (Accessible Label): "Submit"
- Focusable: true
- States: [ disabled: false, pressed: false ]
Screen reader speaks: "Submit, button"
        `)}

        <h3>2.3 Polyglot Implementation: Accessible Modal Dialog</h3>
        <h6>HTML5 + Modern Vanilla JS</h6>
        ${buildCodeBlock('html', `
<!-- Modern Native Dialog with built-in focus trap and ESC dismissal -->
<dialog id="fav-dialog" aria-labelledby="dialog-title" class="p-4 rounded-3">
  <form method="dialog">
    <h2 id="dialog-title" class="fs-5 fw-bold">Confirm Account Deletion</h2>
    <p class="text-muted">This action is permanent and cannot be reversed.</p>
    <div class="d-flex justify-content-end gap-2 mt-4">
      <button value="cancel" class="btn btn-secondary">Cancel</button>
      <button value="confirm" class="btn btn-danger">Confirm Delete</button>
    </div>
  </form>
</dialog>
        `)}

        <h6>TypeScript (Accessible Dialog Trigger)</h6>
        ${buildCodeBlock('typescript', `
export function openModal(dialogId: string): void {
  const dialog = document.getElementById(dialogId) as HTMLDialogElement | null;
  if (dialog) {
    // Native showModal() activates backdrop, traps focus, and listens for ESC:
    dialog.showModal();
  }
}
        `)}

        <h6>Java 21 (Template Renderer)</h6>
        ${buildCodeBlock('java', `
public class A11yHelper {
    public static String button(String label, boolean isPro) {
        return "<button aria-label='" + label + "'>" + label + "</button>";
    }
}
        `)}

        <h6>Python 3.12 (A11y Validator)</h6>
        ${buildCodeBlock('python', `
import re

def check_img_alt(html: str) -> list[str]:
    """Catches images missing alt accessibility attributes."""
    return re.findall(r'<img(?!.*?alt=)[^>]*>', html)
        `)}

        <h3>2.4 Asymptotic Complexity & Trade-Off Matrix</h3>
        ${buildComplexityTable(
          ['Accessibility Pattern', 'Implementation Effort', 'Keyboard Trap Safe?', 'Screen Reader Support'],
          [
            ['Native <dialog> Tag', 'Minimal (Zero JS focus loop)', 'Yes (Native browser focus trap)', '100% WCAG AAA Compliant'],
            ['Custom <div> Modal', 'High (Requires manual focus locking)', 'High bug probability', 'Requires complex ARIA attributes'],
            ['Native <button>', 'Zero', 'Yes (Built-in Tab/Enter/Space)', 'Flawless'],
            ['Custom <div onclick="">', 'Poor', 'No (Inaccessible to keyboard)', 'Completely broken for blind users']
          ]
        )}

        <h3>2.5 Real-World Enterprise & FAANG Case Studies</h3>
        ${buildInsight('Target Corporation & Domino Pizza a11y Lawsuits', `
          Federal courts ruled under ADA Title III that commercial websites must be fully accessible to screen reader users. Target paid $6 million in damages for inaccessible checkout flows. Modern enterprise frontend CI/CD pipelines enforce automated accessibility audits via <strong>axe-core</strong> and Google Lighthouse.
        `)}

        <h3>2.6 High-Yield Interview Failure Modes & Gotchas</h3>
        ${buildWarning('Removing CSS Focus Outlines (outline: none)', `
          Writing <code>*:focus { outline: none; }</code> to remove the default browser focus ring makes the entire application completely invisible and unusable for motor-impaired keyboard navigators! Always provide an accessible replacement: <code>:focus-visible { outline: 2px solid #3b82f6; outline-offset: 2px; }</code>.
        `)}

        <h3>2.7 Practice Workshop Challenge & Solution</h3>
        ${buildAlgorithm('Challenge 2.1: Keyboard Accessible Focus Trap', `
          <pre><code class="language-javascript">
function trapFocus(modalElement) {
    const focusable = modalElement.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    modalElement.addEventListener('keydown', (e) => {
        if (e.key !== 'Tab') return;
        if (e.shiftKey) { // Shift + Tab
            if (document.activeElement === first) {
                last.focus();
                e.preventDefault();
            }
        } else { // Tab
            if (document.activeElement === last) {
                first.focus();
                e.preventDefault();
            }
        }
    });
}
          </code></pre>
        `)}
      `
    },
    {
      id: 10703,
      chapterNumber: 3,
      title: 'Advanced CSS Layouts: Flexbox Deep Dive & In-Depth CSS Grid',
      subtitle: 'Flex basis vs width, formatting contexts, grid template areas, and subgrid mechanics',
      summary: 'Master modern CSS layout engines: Flexbox cross/main axis calculations, CSS Grid auto-fit vs auto-fill, CSS Subgrid, and aspect-ratio responsiveness.',
      readingTimeMinutes: 22,
      isFreePreview: false,
      sortOrder: 3,
      contentHtml: `
        <h3>3.1 Flexbox vs CSS Grid Architecture</h3>
        <p>Modern CSS layout engines operate along distinct geometric paradigms:
        1. <strong>Flexbox:</strong> One-dimensional layout (either a row OR a column). Ideal for component alignment and micro-layouts.
        2. <strong>CSS Grid:</strong> Two-dimensional layout (rows AND columns simultaneously). Ideal for full-page macro-scaffolding.</p>

        ${buildTheorem('Theorem 3.1: The flex-basis Calculation Hierarchy', `
          When computing an item's initial size in a flex container:
          <code>content size &rarr; width property &rarr; flex-basis property &rarr; min-width constraints</code>.
          Setting <code>flex: 1 1 0%</code> forces the flex engine to disregard intrinsic item width, distributing remaining container space with exact mathematical equality.
        `)}

        <h3>3.2 Architectural & In-Memory Mechanics</h3>
        ${buildMemoryDiagram('CSS Grid Auto-Fit vs Auto-Fill Behavior', `
auto-fill: Fills row with as many column tracks as possible (even if empty!)
[ Card 1 ] [ Card 2 ] [ Empty Slot ] [ Empty Slot ]

auto-fit: Expands existing items to occupy the entire track width!
[ ===== Card 1 (Stretched) ===== ] [ ===== Card 2 (Stretched) ===== ]
        `)}

        <h3>3.3 Polyglot Implementation: Responsive 12-Column Grid</h3>
        <h6>Modern CSS3</h6>
        ${buildCodeBlock('css', `
/* 1. Responsive Auto-Fitting Grid without Media Queries */
.responsive-card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
}

/* 2. Holy Grail Layout via Named Grid Areas */
.app-layout {
  display: grid;
  grid-template-areas:
    "header header"
    "sidebar main"
    "footer footer";
  grid-template-columns: 240px 1fr;
  grid-template-rows: 60px 1fr 40px;
  min-height: 100vh;
}
        `)}

        <h6>TypeScript (Dynamic Grid Styler)</h6>
        ${buildCodeBlock('typescript', `
export function setDynamicGridCols(el: HTMLElement, colWidthPx: number): void {
  el.style.gridTemplateColumns = \`repeat(auto-fit, minmax(\${colWidthPx}px, 1fr))\`;
}
        `)}

        <h6>Java 21 Equivalent</h6>
        ${buildCodeBlock('java', `
// Generating responsive grid markup dynamically in templates:
public class GridBuilder {
    public static String gridClass(int minPx) {
        return "grid grid-cols-[repeat(auto-fit,minmax(" + minPx + "px,1fr))]";
    }
}
        `)}

        <h6>Python 3.12 Equivalent</h6>
        ${buildCodeBlock('python', `
def generate_grid_css(min_px=250):
    return f"display: grid; grid-template-columns: repeat(auto-fit, minmax({min_px}px, 1fr));"
        `)}

        <h3>3.4 Asymptotic Complexity & Trade-Off Matrix</h3>
        ${buildComplexityTable(
          ['Layout Engine', 'Dimension', 'Reflow Calculation Cost', 'Best Suited For'],
          [
            ['CSS Flexbox', '1D (Row or Column)', 'Low (Single-pass layout)', 'Navbars, toolbars, buttons, centering'],
            ['CSS Grid', '2D (Rows & Columns)', 'Moderate (Matrix track computation)', 'Application shells, dashboard card grids'],
            ['CSS Subgrid', 'Inherited 2D tracks', 'Low (Shares parent tracks)', 'Aligning card headers/footers across rows'],
            ['Legacy Floats', 'Manual clearfixes', 'High (Complex float clearing)', 'DEPRECATED - Never use!']
          ]
        )}

        <h3>3.5 Real-World Enterprise & FAANG Case Studies</h3>
        ${buildInsight('Figma Web Canvas & Auto-Layout Engine', `
          Figma's revolutionary UI design tool models its core layout system directly on CSS Flexbox and Grid. When designers configure "Auto-Layout", Figma's C++ WebAssembly engine calculates pixel bounds using the exact mathematical flex algorithms defined in the W3C CSS Flexible Box specification.
        `)}

        <h3>3.6 High-Yield Interview Failure Modes & Gotchas</h3>
        ${buildWarning('The flex-shrink: 1 Unintended Text Squeezing', `
          By default, flex items have <code>flex-shrink: 1</code>. If a flex child contains an icon or timestamp, it will collapse and wrap tightly when parent width shrinks! Always set <code>flex-shrink: 0</code> on fixed badges, avatars, and icons.
        `)}

        <h3>3.7 Practice Workshop Challenge & Solution</h3>
        ${buildAlgorithm('Challenge 3.1: True Dynamic Centering Without Absolute Hacks', `
          <pre><code class="language-css">
/* The 2-line absolute center standard: */
.perfect-center {
    display: grid;
    place-items: center;
    min-height: 100vh;
}
          </code></pre>
        `)}
      `
    },
    {
      id: 10704,
      chapterNumber: 4,
      title: 'CSS Performance: Hardware Acceleration & The contain Property',
      subtitle: 'GPU layers, will-change property, sub-pixel rendering, and CSS containment optimization',
      summary: 'Master high-performance CSS: GPU layer promotion (transform: translateZ), will-change hazards, CSS containment (contain: layout paint), and eliminating jank.',
      readingTimeMinutes: 20,
      isFreePreview: false,
      sortOrder: 4,
      contentHtml: `
        <h3>4.1 GPU Layer Promotion & Hardware Acceleration</h3>
        <p>When animating properties that alter geometry (like <code>top</code>, <code>left</code>, <code>margin</code>), the CPU triggers layout reflow on every single 16ms animation tick. Transforming via <strong>GPU-accelerated properties (transform, opacity)</strong> promotes the element to a dedicated hardware compositor layer, executing silky smooth 60fps animations entirely on the GPU.</p>

        ${buildTheorem('Theorem 4.1: The CSS contain Property Optimization', `
          The CSS <code>contain</code> property informs the browser's render engine that an element's subtree is mathematically independent of the rest of the document:
          <ul>
            <li><code>contain: layout</code>: Internal changes never invalidate outside layout.</li>
            <li><code>contain: paint</code>: Descendants cannot display outside bounds; browser skips off-screen painting.</li>
            <li><code>contain: content</code>: Combines layout and paint, drastically reducing reflow latency in long lists.</li>
          </ul>
        `)}

        <h3>4.2 Architectural & In-Memory Mechanics</h3>
        ${buildMemoryDiagram('Layer Promotion & Compositing Pipeline', `
Element with: transform: translate3d(0, 0, 0); or will-change: transform
                      |
Browser promotes element to separate Compositor Texture in GPU VRAM
                      |
Animation: Matrix coordinate multiplied directly on GPU hardware!
CPU Main Thread is 100% UNTOUCHED! (Zero Layout, Zero Paint)
        `)}

        <h3>4.3 Polyglot Implementation: High-Performance Animations</h3>
        <h6>CSS3 Architecture</h6>
        ${buildCodeBlock('css', `
/* High-performance hardware accelerated drawer animation: */
.animated-drawer {
  transform: translateX(-100%);
  transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  will-change: transform; /* Signals GPU pre-allocation */
  contain: content;      /* Isolates reflow scope */
}

.animated-drawer.active {
  transform: translateX(0); /* Pure GPU composite! */
}
        `)}

        <h6>TypeScript (Containment Checker)</h6>
        ${buildCodeBlock('typescript', `
export function isolateRenderSubtree(element: HTMLElement): void {
  element.style.contain = 'content';
  element.style.willChange = 'transform';
}
        `)}

        <h6>Java 21 Equivalent</h6>
        ${buildCodeBlock('java', `
public class CSSPerformanceHeaders {
    public static String getSecurityHeaders() {
        return "X-Content-Type-Options: nosniff";
    }
}
        `)}

        <h6>Python 3.12 Equivalent</h6>
        ${buildCodeBlock('python', `
def verify_css_performance(css: str) -> list[str]:
    """Warns if animations use slow non-composited properties."""
    import re
    return re.findall(r'transition:\s*(top|left|width|height)', css)
        `)}

        <h3>4.4 Asymptotic Complexity & Trade-Off Matrix</h3>
        ${buildComplexityTable(
          ['Animated Property', 'Browser Pipeline Triggered', '60 FPS Feasible?', 'Battery Impact'],
          [
            ['transform / opacity', 'Composite Only (GPU)', 'Yes (Flawless 60-120 fps)', 'Low'],
            ['background-color / color', 'Paint + Composite', 'Usually (Depends on element count)', 'Medium'],
            ['top / left / margin', 'Layout + Paint + Composite', 'No (Causes severe frame drops)', 'High (Constant CPU crunch)'],
            ['filter: blur()', 'Paint (Heavy shader math)', 'Challenging on low-end mobile', 'High GPU drain']
          ]
        )}

        <h3>4.5 Real-World Enterprise & FAANG Case Studies</h3>
        ${buildInsight('Twitter (X) Infinite Feed Virtualization', `
          When users scroll through millions of tweets, the DOM tree would normally balloon to tens of thousands of nodes, grinding the browser to a halt. Twitter applies <code>content-visibility: auto</code> and <code>contain-intrinsic-size</code> to off-screen tweets: the browser skips layout and rendering entirely for off-screen tweets, reducing initial render time by 70%!
        `)}

        <h3>4.6 High-Yield Interview Failure Modes & Gotchas</h3>
        ${buildWarning('The will-change Memory Exhaustion Trap', `
          Overusing <code>* { will-change: transform; }</code> forces the browser to allocate a separate VRAM GPU backing store for every single element. On mobile devices with unified memory, this exhausts GPU RAM instantly, causing browser tab crashes or severe battery drain. Only apply <code>will-change</code> right before an interaction starts, and remove it when the animation completes.
        `)}

        <h3>4.7 Practice Workshop Challenge & Solution</h3>
        ${buildAlgorithm('Challenge 4.1: Fast GPU-Accelerated Accordion Toggle', `
          <pre><code class="language-css">
/* Fast height animation via grid-template-rows: 0fr -> 1fr (No JS height measuring!) */
.accordion-wrapper {
    display: grid;
    grid-template-rows: 0fr;
    transition: grid-template-rows 0.3s ease-out;
}
.accordion-wrapper.open {
    grid-template-rows: 1fr;
}
.accordion-inner {
    overflow: hidden;
}
          </code></pre>
        `)}
      `
    },
    {
      id: 10705,
      chapterNumber: 5,
      title: 'Responsive Web Design: Container Queries & Fluid Typography',
      subtitle: 'Viewport units, CSS clamp(), media queries vs container queries, and responsive design systems',
      summary: 'Master modern responsive design: viewport vs container queries (@container), mathematical fluid scaling with clamp(), and modular component design systems.',
      readingTimeMinutes: 20,
      isFreePreview: false,
      sortOrder: 5,
      contentHtml: `
        <h3>5.1 The Evolution of Responsive Design</h3>
        <p>Historically, responsive layouts relied on <strong>Media Queries</strong> (<code>@media (min-width: 768px)</code>), which evaluate strictly against the global browser viewport width. In modern component architectures, a component must adapt based on the size of its <strong>parent container</strong>, leading to the introduction of <strong>CSS Container Queries</strong>.</p>

        ${buildTheorem('Theorem 5.1: Mathematical Fluid Typography Scaling', `
          The CSS <code>clamp(MIN, VAL, MAX)</code> function computes responsive dimensions smoothly without stepping through rigid media query breakpoints:
          <br><code>font-size: clamp(1rem, 0.8rem + 1vw, 2.5rem);</code>
          This guarantees typography scales linearly with viewport growth, strictly bounded between 16px and 40px without any JavaScript listeners.
        `)}

        <h3>5.2 Architectural & In-Memory Mechanics</h3>
        ${buildMemoryDiagram('Media Query vs Container Query Architecture', `
Media Query: Checks window.innerWidth (Viewport)
- Widget in full-width main view: Wide layout
- Exact same widget squeezed into 300px sidebar: BREAKS because viewport is wide!

Container Query (@container): Checks parent container width!
- Widget adapts gracefully anywhere it is placed in the application tree!
        `)}

        <h3>5.3 Polyglot Implementation: Container Query Component</h3>
        <h6>Modern CSS3</h6>
        ${buildCodeBlock('css', `
/* 1. Define Container Context */
.card-container-wrapper {
  container-type: inline-size;
  container-name: userCard;
}

/* 2. Style Based on Parent Container Width */
@container userCard (max-width: 400px) {
  .user-card {
    flex-direction: column;
    text-align: center;
  }
  .user-avatar {
    width: 60px;
    height: 60px;
  }
}

@container userCard (min-width: 401px) {
  .user-card {
    flex-direction: row;
    text-align: left;
  }
}
        `)}

        <h6>TypeScript (ResizeObserver Fallback)</h6>
        ${buildCodeBlock('typescript', `
export function observeContainerWidth(el: HTMLElement, onResize: (w: number) => void): () => void {
  const ro = new ResizeObserver(entries => {
    for (const entry of entries) {
      onResize(entry.contentRect.width);
    }
  });
  ro.observe(el);
  return () => ro.disconnect();
}
        `)}

        <h6>Java 21 Equivalent</h6>
        ${buildCodeBlock('java', `
public class FluidCalculator {
    public static double computeClamp(double min, double val, double max) {
        return Math.max(min, Math.min(val, max));
    }
}
        `)}

        <h6>Python 3.12 Equivalent</h6>
        ${buildCodeBlock('python', `
def clamp(min_val, val, max_val):
    return max(min_val, min(val, max_val))
        `)}

        <h3>5.4 Asymptotic Complexity & Trade-Off Matrix</h3>
        ${buildComplexityTable(
          ['Responsive Technique', 'Context Evaluated', 'Component Reusability', 'Browser Support'],
          [
            ['Media Queries (@media)', 'Global browser viewport', 'Low (Breaks when embedded in sidebars)', 'Universal (All browsers)'],
            ['Container Queries (@container)', 'Immediate parent container', 'Maximum (True standalone components)', 'Modern standard (95%+ browsers)'],
            ['clamp() Fluid Math', 'Formulaic interpolation', 'High (Zero breakpoints)', 'Universal'],
            ['JavaScript Resize Listeners', 'DOM element bounding rect', 'Moderate', 'Incurs layout recalculation overhead']
          ]
        )}

        <h3>5.5 Real-World Enterprise & FAANG Case Studies</h3>
        ${buildInsight('GitHub & Shopify Dashboard Micro-Frontends', `
          Design systems at GitHub (Primer) and Shopify (Polaris) embed components inside customizable modular dashboards. Container queries enable widgets (such as pull request reviewers or order summaries) to render identically whether docked inside a narrow notification rail or expanded across the primary canvas.
        `)}

        <h3>5.6 High-Yield Interview Failure Modes & Gotchas</h3>
        ${buildWarning('Forgetting container-type on Container Query Parents', `
          Attempting to write <code>@container (min-width: 500px)</code> without declaring <code>container-type: inline-size</code> on an ancestor element fails silently! The container query will never trigger because the browser does not know which parent element defines the container boundary.
        `)}

        <h3>5.7 Practice Workshop Challenge & Solution</h3>
        ${buildAlgorithm('Challenge 5.1: Zero-Media-Query Fluid Navbar', `
          <pre><code class="language-css">
.fluid-nav {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
    padding: clamp(0.5rem, 2vw, 1.5rem);
    gap: 1rem;
}
.nav-links {
    display: flex;
    flex-wrap: wrap;
    gap: clamp(0.5rem, 1.5vw, 2rem);
}
          </code></pre>
        `)}
      `
    },
    {
      id: 10706,
      chapterNumber: 6,
      title: 'Modern Web APIs: IntersectionObserver, ResizeObserver & Web Workers',
      subtitle: 'Passive event listeners, offloading heavy computations, and asynchronous DOM observers',
      summary: 'Master modern Web APIs: lazy loading with IntersectionObserver, element monitoring with ResizeObserver, and background multi-threading via Web Workers.',
      readingTimeMinutes: 24,
      isFreePreview: false,
      sortOrder: 6,
      contentHtml: `
        <h3>6.1 Asynchronous DOM Observation vs Scroll Events</h3>
        <p>Historically, detecting whether an element was visible required attaching listeners to the window <code>scroll</code> event and calling <code>getBoundingClientRect()</code>. This triggered severe layout thrashing on every pixel scrolled. Modern browsers solve this via <strong>IntersectionObserver</strong>, which computes visibility asynchronously off the main thread.</p>

        ${buildTheorem('Theorem 6.1: Web Worker Multi-Threading Bound', `
          JavaScript on the browser main thread is strictly single-threaded.
          <strong>Web Workers</strong> execute code on an independent OS thread with an isolated memory heap.
          Communication occurs via asynchronous message passing (<code>postMessage</code>) or high-speed zero-copy memory transfers (<code>ArrayBuffer</code> transferables), preventing heavy computations from freezing the UI.
        `)}

        <h3>6.2 Architectural & In-Memory Mechanics</h3>
        ${buildMemoryDiagram('Main Thread vs Web Worker Architecture', `
Main UI Thread:
[ DOM Updates ] ===> [ User Clicks ] ===> [ 60fps Rendering Loop ]
       |                                          ^
       | postMessage(data, [buffer]) (Zero-Copy)  | onmessage(result)
       v                                          |
Web Worker Thread (Core 2):
[ Heavy Data Crunching / 10MB JSON Parse / Image Encryption ]
        `)}

        <h3>6.3 Polyglot Implementation: High-Speed Image Lazy Loader</h3>
        <h6>JavaScript / TypeScript</h6>
        ${buildCodeBlock('typescript', `
export function setupLazyImages(): void {
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target as HTMLImageElement;
        const src = img.dataset.src;
        if (src) {
          img.src = src;
          img.removeAttribute('data-src');
        }
        obs.unobserve(img); // Stop observing once loaded!
      }
    });
  }, { rootMargin: '200px 0px' }); // Preload 200px before scrolling into view!

  document.querySelectorAll('img[data-src]').forEach(img => observer.observe(img));
}
        `)}

        <h6>Web Worker Implementation (worker.js)</h6>
        ${buildCodeBlock('javascript', `
// Dedicated background thread worker:
self.onmessage = function(e) {
  const numbers = e.data;
  // Compute intensive sorting off the main thread:
  const sorted = numbers.sort((a, b) => a - b);
  self.postMessage(sorted);
};
        `)}

        <h6>Java 21 Equivalent (Worker Thread)</h6>
        ${buildCodeBlock('java', `
import java.util.concurrent.*;

public class BackgroundTask {
    private final ExecutorService worker = Executors.newSingleThreadExecutor();
    public void runHeavyTask(Runnable task) { worker.submit(task); }
}
        `)}

        <h6>Python 3.12 Equivalent</h6>
        ${buildCodeBlock('python', `
import threading

def run_in_background(task):
    t = threading.Thread(target=task)
    t.start()
        `)}

        <h3>6.4 Asymptotic Complexity & Trade-Off Matrix</h3>
        ${buildComplexityTable(
          ['Web API', 'Thread of Execution', 'CPU Cost', 'Primary Use Case'],
          [
            ['IntersectionObserver', 'Compositor / Background thread', 'Near zero (GPU computed intersections)', 'Infinite scroll, image lazy loading, ad impressions'],
            ['ResizeObserver', 'Post-layout phase', 'Low (Batched notification)', 'Responsive UI components, canvas redraws'],
            ['MutationObserver', 'Microtask queue', 'Low', 'Monitoring third-party DOM injection'],
            ['Web Worker', 'Dedicated OS background thread', 'Independent multi-core execution', 'PDF generation, cryptography, video processing']
          ]
        )}

        <h3>6.5 Real-World Enterprise & FAANG Case Studies</h3>
        ${buildInsight('Google Docs Canvas Engine & Web Workers', `
          Google Docs completely rewrote its document rendering engine, moving from DOM nodes to HTML5 Canvas rendered via Web Workers using <code>OffscreenCanvas</code>. All layout calculations and font metrics crunch in background worker threads, rendering flawless 120fps pagination even on 1,000-page enterprise documents.
        `)}

        <h3>6.6 High-Yield Interview Failure Modes & Gotchas</h3>
        ${buildWarning('Forgetting to Disconnect Observers Causing Memory Leaks', `
          Attaching an <code>IntersectionObserver</code> to elements inside a React component without calling <code>observer.disconnect()</code> in the cleanup hook retains DOM node references inside browser native tables, causing permanent detached DOM memory leaks when navigating between routes.
        `)}

        <h3>6.7 Practice Workshop Challenge & Solution</h3>
        ${buildAlgorithm('Challenge 6.1: Infinite Scroll Trigger with Sentinel Element', `
          <pre><code class="language-javascript">
function initInfiniteScroll(sentinelElement, loadMoreCallback) {
    const observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
            loadMoreCallback();
        }
    }, { threshold: 0.1 });
    observer.observe(sentinelElement);
}
          </code></pre>
        `)}
      `
    },
    {
      id: 10707,
      chapterNumber: 7,
      title: 'Web Performance Optimization: Core Web Vitals (LCP, INP, CLS)',
      subtitle: 'Largest Contentful Paint, Interaction to Next Paint, Cumulative Layout Shift, and Chrome UX Report metrics',
      summary: 'Master Google Core Web Vitals: LCP optimization, the new INP responsiveness metric (replacing FID), CLS stability, and real-user monitoring (RUM).',
      readingTimeMinutes: 24,
      isFreePreview: false,
      sortOrder: 7,
      contentHtml: `
        <h3>7.1 The Core Web Vitals Specification</h3>
        <p>Google evaluates web performance and SEO ranking using <strong>Core Web Vitals</strong>, three user-centric performance metrics measured across millions of Chrome users in the Chrome User Experience Report (CrUX):</p>

        ${buildTheorem('Theorem 7.1: The Three Core Web Vitals Thresholds (Google 2026)', `
          <ol>
            <li><strong>LCP (Largest Contentful Paint) &le; 2.5s:</strong> Measures loading speed. The time when the largest visible text block or image finishes rendering in the viewport.</li>
            <li><strong>INP (Interaction to Next Paint) &le; 200ms:</strong> Measures UI responsiveness. Replaced FID in March 2024. Measures the latency of every single user click, tap, and keypress throughout the session.</li>
            <li><strong>CLS (Cumulative Layout Shift) &le; 0.1:</strong> Measures visual stability. Quantifies unexpected visual movement of layout elements.</li>
          </ol>
        `)}

        <h3>7.2 Architectural & In-Memory Mechanics</h3>
        ${buildMemoryDiagram('The 4 Sub-parts of LCP Optimization', `
Total LCP Time (Target <= 2.5s):
1. Time to First Byte (TTFB): Server response & CDN latency (< 800ms)
2. Resource Load Delay: Time until browser discovers LCP asset (< 200ms)
3. Resource Load Duration: Network download of LCP image/font (< 1000ms)
4. Element Render Delay: Time from download to painting on screen (< 500ms)
        `)}

        <h3>7.3 Polyglot Implementation: Core Web Vitals Observer</h3>
        <h6>JavaScript / TypeScript</h6>
        ${buildCodeBlock('typescript', `
export function monitorCoreWebVitals(): void {
  // 1. Observe Layout Shifts (CLS)
  new PerformanceObserver((entryList) => {
    for (const entry of entryList.getEntries()) {
      if (!(entry as any).hadRecentInput) {
        console.log(\`CLS Shift Value: \${(entry as any).value}\`);
      }
    }
  }).observe({ type: 'layout-shift', buffered: true });

  // 2. Observe Largest Contentful Paint (LCP)
  new PerformanceObserver((entryList) => {
    const entries = entryList.getEntries();
    const lastEntry = entries[entries.length - 1];
    console.log(\`LCP Element: \${lastEntry.startTime}ms\`);
  }).observe({ type: 'largest-contentful-paint', buffered: true });
}
        `)}

        <h6>HTML5 Architecture (CLS Mitigation)</h6>
        ${buildCodeBlock('html', `
<!-- ALWAYS provide explicit width and height on images to prevent CLS! -->
<img src="/assets/banner.webp" 
     width="800" 
     height="450" 
     alt="Tech Conference Banner"
     style="aspect-ratio: 16/9; width: 100%; height: auto;">
        `)}

        <h6>Java 21 Equivalent</h6>
        ${buildCodeBlock('java', `
public class CacheControlHelper {
    public static String getStaticAssetHeaders() {
        return "Cache-Control: public, max-age=31536000, immutable";
    }
}
        `)}

        <h6>Python 3.12 Equivalent</h6>
        ${buildCodeBlock('python', `
def calculate_cls(impact_fraction, distance_fraction):
    return impact_fraction * distance_fraction
        `)}

        <h3>7.4 Asymptotic Complexity & Trade-Off Matrix</h3>
        ${buildComplexityTable(
          ['Metric', 'Good Target', 'Needs Improvement', 'Primary Culprit & Fix'],
          [
            ['LCP (Loading)', '&le; 2.5s', '2.5s - 4.0s', 'Unoptimized hero images -> Use WebP/AVIF + fetchpriority="high"'],
            ['INP (Responsiveness)', '&le; 200ms', '200ms - 500ms', 'Long tasks blocking main thread -> Break up with scheduler.yield()'],
            ['CLS (Stability)', '&le; 0.1', '0.1 - 0.25', 'Images/Ads without aspect-ratio dimensions -> Reserve layout space'],
            ['TTFB (Server)', '&le; 800ms', '800ms - 1800ms', 'Slow database queries, missing edge CDN caching']
          ]
        )}

        <h3>7.5 Real-World Enterprise & FAANG Case Studies</h3>
        ${buildInsight('Vodafone & Rakuten SEO Impact of Web Vitals', `
          Vodafone optimized its LCP by 31%, resulting in an 8% increase in overall sales conversions and a 15% increase in lead generation. Rakuten optimized Core Web Vitals across its e-commerce platforms, seeing a 53% increase in session duration and a 33% increase in revenue per user.
        `)}

        <h3>7.6 High-Yield Interview Failure Modes & Gotchas</h3>
        ${buildWarning('Lazy Loading the Above-The-Fold Hero Image', `
          Adding <code>loading="lazy"</code> to your largest above-the-fold hero image is a devastating anti-pattern! The browser delays loading the hero image until after layout calculation, adding 1 to 2 seconds of unnecessary delay to LCP! Always set <code>fetchpriority="high"</code> and NEVER lazy-load above-the-fold images.
        `)}

        <h3>7.7 Practice Workshop Challenge & Solution</h3>
        ${buildAlgorithm('Challenge 7.1: Yielding Long Tasks to the Main Thread (INP Optimization)', `
          <pre><code class="language-javascript">
async function processLargeDataset(items) {
    for (let i = 0; i < items.length; i++) {
        processItem(items[i]);
        // Yield execution to allow user clicks and keypresses to execute:
        if (i % 100 === 0) {
            await (window.scheduler?.yield ? scheduler.yield() : new Promise(r => setTimeout(r, 0)));
        }
    }
}
          </code></pre>
        `)}
      `
    },
    {
      id: 10708,
      chapterNumber: 8,
      title: 'Frontend Security: XSS, CSRF, CSP, CORS & Cookie Directives',
      subtitle: 'DOM-based XSS, Content Security Policy, Cross-Origin Resource Sharing, SameSite cookies, and SRI',
      summary: 'Master enterprise browser security: Cross-Site Scripting (XSS) prevention, strict Content Security Policy (CSP), CORS preflight headers, Subresource Integrity (SRI), and HttpOnly/SameSite cookies.',
      readingTimeMinutes: 26,
      isFreePreview: false,
      sortOrder: 8,
      contentHtml: `
        <h3>8.1 The Browser Security Architecture</h3>
        <p>The foundation of browser security is the <strong>Same-Origin Policy (SOP)</strong>: scripts running on origin <code>https://app.com</code> cannot access DOM nodes or read cookies belonging to origin <code>https://bank.com</code> unless explicitly permitted via standard protocols.</p>

        ${buildTheorem('Theorem 8.1: Defense-in-Depth Content Security Policy (CSP)', `
          A strict <strong>Content Security Policy (CSP)</strong> HTTP response header instructs the browser to reject unauthorized scripts, styles, and inline code:
          <br><code>Content-Security-Policy: default-src 'self'; script-src 'self' 'nonce-random123'; object-src 'none';</code>
          Even if an attacker successfully injects a malicious <code>&lt;script&gt;</code> payload via an XSS vulnerability, the browser's CSP engine refuses to execute it because it lacks the valid cryptographic nonce.
        `)}

        <h3>8.2 Architectural & In-Memory Mechanics</h3>
        ${buildMemoryDiagram('CORS Preflight (OPTIONS) Handshake Architecture', `
Client (Browser at https://stream-in.app)
  |
  +--- OPTIONS /v1/api (Preflight Request) ---> [ Server ]
  |    Origin: https://stream-in.app
  |    Access-Control-Request-Method: POST
  |
  <--- HTTP 204 OK (Access-Control-Allow-Origin: https://stream-in.app)
  |
  +--- POST /v1/api (Actual Authenticated Request) ---> [ Server ]
        `)}

        <h3>8.3 Polyglot Implementation: Enterprise Security Headers</h3>
        <h6>HTTP Response Headers</h6>
        ${buildCodeBlock('http', `
Content-Security-Policy: default-src 'self'; script-src 'self' https://cdn.jsdelivr.net; frame-ancestors 'none';
X-Content-Type-Options: nosniff
X-Frame-Options: DENY
Referrer-Policy: strict-origin-when-cross-origin
Set-Cookie: token=xyz; Secure; HttpOnly; SameSite=Strict; Path=/;
        `)}

        <h6>TypeScript (DOM Sanitization)</h6>
        ${buildCodeBlock('typescript', `
export function safeSetHtml(element: HTMLElement, userHtml: string): void {
  // In modern browsers, Sanitize API eliminates innerHTML XSS injection:
  if ('setHTML' in element) {
    (element as any).setHTML(userHtml);
  } else {
    // Fallback: Safe textContent assignment
    element.textContent = userHtml;
  }
}
        `)}

        <h6>Java 21 Equivalent (Spring Security Config)</h6>
        ${buildCodeBlock('java', `
import org.springframework.security.config.annotation.web.builders.HttpSecurity;

public void configureSecurity(HttpSecurity http) throws Exception {
    http.headers(headers -> headers
        .contentSecurityPolicy(csp -> csp.policyDirectives("default-src 'self'"))
        .frameOptions(frame -> frame.deny())
    );
}
        `)}

        <h6>Python 3.12 (FastAPI Middleware)</h6>
        ${buildCodeBlock('python', `
from fastapi import FastAPI, Response

app = FastAPI()

@app.middleware("http")
async def add_security_headers(request, call_next):
    response: Response = await call_next(request)
    response.headers["X-Content-Type-Options"] = "nosniff"
    response.headers["X-Frame-Options"] = "DENY"
    return response
        `)}

        <h3>8.4 Asymptotic Complexity & Trade-Off Matrix</h3>
        ${buildComplexityTable(
          ['Attack Vector', 'Mechanism', 'Primary Defense', 'Secondary Defense'],
          [
            ['Stored / Reflected XSS', 'Malicious JavaScript injected into DOM', 'Context-aware escaping / textContent', 'Strict Content-Security-Policy (CSP)'],
            ['DOM-based XSS', 'Sink APIs (innerHTML, eval) execute untrusted data', 'Avoid innerHTML / use DOMPurify', 'Trusted Types API'],
            ['CSRF (Cross-Site Request Forgery)', 'Unauthorized commands sent from trusted user', 'SameSite=Strict cookie attribute', 'Anti-CSRF synchronizer tokens'],
            ['Clickjacking', 'Malicious site embeds your app in hidden <iframe>', 'X-Frame-Options: DENY', 'CSP frame-ancestors none']
          ]
        )}

        <h3>8.5 Real-World Enterprise & FAANG Case Studies</h3>
        ${buildInsight('British Airways $26 Million Magecart XSS Breach', `
          Attackers breached British Airways by injecting 22 lines of malicious JavaScript into a third-party script. The script harvested 380,000 credit cards silently via DOM listeners. Modern enterprise frontends prevent third-party script tampering using <strong>Subresource Integrity (SRI)</strong> hashes (<code>integrity="sha384-..."</code>).
        `)}

        <h3>8.6 High-Yield Interview Failure Modes & Gotchas</h3>
        ${buildWarning('Storing JWT Auth Tokens in localStorage', `
          A pervasive security disaster is storing access tokens in <code>localStorage</code> or <code>sessionStorage</code>. Any third-party npm package, analytics script, or XSS flaw can access <code>localStorage.getItem('token')</code> and exfiltrate credentials. ALWAYS store session tokens in <strong>HttpOnly, Secure, SameSite cookies</strong>, which JavaScript cannot read!
        `)}

        <h3>8.7 Practice Workshop Challenge & Solution</h3>
        ${buildAlgorithm('Challenge 8.1: Subresource Integrity (SRI) Tag Generator', `
          <pre><code class="language-html">
<!-- Validated cryptographic hash guarantees CDN script was not compromised: -->
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"
        integrity="sha384-C6RzsynM9kWDrMNeT87bh95OGNyZPhcTNXj1NW7RuBCsyN/o0jlpcV8Qyq46cDfL"
        crossorigin="anonymous"></script>
          </code></pre>
        `)}
      `
    }
  ]
};

module.exports = book107;
