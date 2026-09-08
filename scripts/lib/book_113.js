/**
 * Book 113: Object-Oriented Programming & Design Patterns
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

const book113 = {
  id: 113,
  slug: 'oop-design-patterns-lld',
  title: 'Object-Oriented Programming & Design Patterns',
  subtitle: 'SOLID Foundations, GoF Creational/Structural/Behavioral Patterns, and Enterprise Low-Level Design',
  description: 'The definitive guide to object-oriented software engineering and low-level system design. Master encapsulation and polymorphism invariants, SOLID architectural principles, Gang of Four (GoF) design patterns, and complete enterprise LLD blueprints including Parking Lot, LRU Cache, and Multi-Car Elevator scheduling.',
  author: 'PrepSpace Engineering Curriculum Group',
  category: 'Object-Oriented Programming & Design Patterns',
  subcategory: 'Software Architecture & Low-Level Design',
  difficulty: 'INTERMEDIATE',
  pageCount: 420,
  estimatedReadingTime: '11 Hours',
  tags: ['OOP', 'SOLID', 'DesignPatterns', 'LLD', 'CleanCode', 'GoF', 'LowLevelDesign', 'SystemArchitecture'],
  licenseType: 'ORIGINAL',
  copyrightNotice: '© 2026 PrepSpace (stream-in.app). All rights reserved.',
  isPro: true,
  badge: 'Core Curriculum',
  rating: 4.98,
  readerCount: 4120,
  icon: 'fa-solid fa-sitemap',
  gradient: 'linear-gradient(135deg, #7c2d12, #ea580c)',
  chapters: [
    {
      id: 11301,
      chapterNumber: 1,
      title: 'OOP Core Pillars & SOLID Principles: In-Depth Mathematical & Architectural Foundations',
      subtitle: 'Liskov Substitution Principle (LSP), Open-Closed Principle (OCP), and dependency inversion',
      summary: 'Explore object-oriented fundamentals: encapsulation invariants, virtual method table (vtable) dispatch, and deep architectural analysis of the five SOLID engineering principles.',
      readingTimeMinutes: 28,
      isFreePreview: true,
      sortOrder: 1,
      contentHtml: `
        <h3>1.1 The Four Core Pillars of Object-Oriented Programming</h3>
        <p>Object-Oriented Programming (OOP) models computational systems as interacting networks of stateful entities (objects) that communicate via message passing:</p>
        <ol>
          <li><strong>Encapsulation:</strong> Bundling internal state with mutating methods while concealing implementation details behind an inviolable public interface.</li>
          <li><strong>Abstraction:</strong> Exposing essential semantic behaviors while suppressing extraneous operational mechanisms.</li>
          <li><strong>Inheritance:</strong> Reusing and extending taxonomic contracts and code structures across generalized and specialized types.</li>
          <li><strong>Polymorphism:</strong> The ability of distinct concrete types to respond polymorphically to uniform interface invocations.</li>
        </ol>

        ${buildTheorem('Theorem 1.1: The Liskov Substitution Principle (LSP)', `
          Let \\(\\phi(x)\\) be a property provable about objects \\(x\\) of type \\(T\\). Then \\(\\phi(y)\\) must be true for objects \\(y\\) of type \\(S\\) where \\(S\\) is a subtype of \\(T\\).
          <br/><br/>
          <strong>Contractual Invariants:</strong>
          <ul>
            <li><strong>Preconditions:</strong> Subtypes cannot strengthen preconditions (cannot require more restrictive inputs than parent).</li>
            <li><strong>Postconditions:</strong> Subtypes cannot weaken postconditions (must guarantee at least what parent promised).</li>
            <li><strong>Class Invariants:</strong> Subtypes must preserve all state constraints defined by the supertype.</li>
          </ul>
        `)}

        <h3>1.2 Architectural Diagram: Virtual Method Table (vtable) Dispatch</h3>
        ${buildMemoryDiagram('Hardware Memory Layout: Virtual Method Table (vtable) Resolution', `
OBJECT IN HEAP MEMORY:
+-------------------------------------------------------------------------+
| [Object Instance: Dog]                                                  |
| Offset 0x00: vptr (8-byte pointer) --------------------------------+    |
| Offset 0x08: age: int = 4                                          |    |
| Offset 0x0C: breedId: int = 12                                     |    |
+--------------------------------------------------------------------|----+
                                                                     v
VIRTUAL METHOD TABLE (vtable in Read-Only Data Section):
+-------------------------------------------------------------------------+
| Slot 0: Dog::makeSound() -> Address 0x55AA1040 (Code: "Bark!")          |
| Slot 1: Animal::sleep()  -> Address 0x55AA0880 (Code: Base Sleep)       |
| Slot 2: Dog::destructor() -> Address 0x55AA1200                         |
+-------------------------------------------------------------------------+
Dynamic Dispatch: animal->makeSound() executes: (*(animal->vptr[0]))(animal);
Cost: Exactly 1 extra pointer indirection (~2 CPU cycles).
        `)}

        <h3>1.3 Polyglot Implementation: SOLID Principles in Practice</h3>
        <h5>Java 21 (Dependency Inversion & Open-Closed Payment Processor)</h5>
        ${buildCodeBlock('java', `
// 1. Dependency Inversion: Depend on abstraction, not concrete implementations
public interface PaymentGateway {
    PaymentResult process(PaymentRequest request);
}

// 2. Open-Closed Principle: Open for extension (new gateways), closed for modification
public class StripeGateway implements PaymentGateway {
    @Override
    public PaymentResult process(PaymentRequest request) {
        // Concrete Stripe API integration
        return new PaymentResult(true, "STRIPE-TX-9981");
    }
}

public class PayPalGateway implements PaymentGateway {
    @Override
    public PaymentResult process(PaymentRequest request) {
        // Concrete PayPal API integration
        return new PaymentResult(true, "PAYPAL-TX-1044");
    }
}

// Client service decouples entirely from provider details
public class CheckoutService {
    private final PaymentGateway gateway;

    public CheckoutService(PaymentGateway gateway) {
        this.gateway = Objects.requireNonNull(gateway);
    }

    public void checkoutOrder(Order order) {
        PaymentRequest req = new PaymentRequest(order.totalAmountCents(), order.currency());
        PaymentResult res = gateway.process(req);
        if (!res.success()) throw new PaymentFailedException(res.errorMessage());
        order.markPaid(res.transactionId());
    }
}
        `)}

        <h5>TypeScript (Interface Segregation Principle - ISP)</h5>
        ${buildCodeBlock('typescript', `
// BAD: Fat interface forcing clients to implement unused methods
// interface Worker { work(): void; eat(): void; sleep(): void; }

// GOOD: Segregated fine-grained interfaces
export interface Workable {
  work(): void;
}

export interface Feedable {
  eat(): void;
}

export interface Restable {
  sleep(): void;
}

export class HumanEngineer implements Workable, Feedable, Restable {
  work(): void { console.log('Writing clean scalable code'); }
  eat(): void { console.log('Enjoying meal'); }
  sleep(): void { console.log('Resting for next sprint'); }
}

export class AutomatedBotWorker implements Workable {
  work(): void { console.log('Executing automated pipeline tasks 24/7'); }
  // Bot does not eat or sleep, zero dummy method stubs needed!
}
        `)}

        <h3>1.4 SOLID Principles Architectural Matrix</h3>
        ${buildComplexityTable(
          ['Principle', 'Core Invariant', 'Violation Symptom', 'Refactoring Remedy'],
          [
            ['S - Single Responsibility', 'A class should have only one reason to change', 'God classes (1,000+ lines mixing DB, UI, business logic)', 'Extract Class, Delegate patterns'],
            ['O - Open/Closed', 'Open for extension, closed for modification', 'Cascading switch/case or if-else statements across codebase', 'Polymorphism, Strategy Pattern'],
            ['L - Liskov Substitution', 'Subtypes must be substitutable for base types', 'Throwing UnsupportedOperationException in subclass', 'Interface extraction, Composition over inheritance'],
            ['I - Interface Segregation', 'Clients should not depend on interfaces they do not use', 'Empty stub method implementations with TODO comments', 'Split into focused, single-purpose interfaces'],
            ['D - Dependency Inversion', 'High-level modules must depend on abstractions', 'Direct new ConcreteClass() instantiations inside services', 'Dependency Injection, Factory Pattern']
          ]
        )}

        <h3>1.5 Real-World Enterprise Case Study</h3>
        ${buildInsight('Spring Framework & Dependency Injection Container', `
          In legacy enterprise systems, business services tightly coupled themselves to data access objects: <code>OrderDao dao = new OracleOrderDao();</code>. Migrating from Oracle to PostgreSQL required modifying thousands of source files.
          The Spring Framework revolutionized enterprise Java by applying the <strong>Dependency Inversion Principle (DIP)</strong> via <strong>Inversion of Control (IoC)</strong>. Services declare dependencies on interfaces (<code>OrderRepository</code>); the Spring IoC container injects concrete implementations at runtime based on configuration profiles (<code>@Profile("prod")</code> vs <code>@Profile("test")</code>).
        `)}

        <h3>1.6 Interview Failure Modes & Gotchas</h3>
        ${buildWarning('The Classic Rectangle / Square LSP Trap', `
          In technical interviews, you will often be asked: "Should <code>Square</code> inherit from <code>Rectangle</code>?"
          <strong>Answer: NO!</strong>
          If <code>Square</code> extends <code>Rectangle</code> with <code>setWidth(w)</code> and <code>setHeight(h)</code>, a client method that receives a <code>Rectangle r</code> and executes:
          <code>r.setWidth(5); r.setHeight(4); assert(r.getArea() == 20);</code>
          will fail if passed a <code>Square</code> (where setting height mutates width to 4, making area 16). <code>Square</code> violates the <strong>Liskov Substitution Principle</strong>!
        `)}

        <h3>1.7 Practice Workshop Challenge</h3>
        ${buildAlgorithm('Challenge: Refactor God Class to Strict SOLID Design', `
          <strong>Problem:</strong> Given a monolithic <code>UserManager</code> class that handles user validation, SQL password encryption, database saving, PDF invoice generation, and SMTP email sending, decompose it into 5 decoupled, single-responsibility classes adhering to DIP.
        `)}
      `
    },
    {
      id: 11302,
      chapterNumber: 2,
      title: 'Creational Design Patterns: Singleton (Thread-Safe), Factory Method, Abstract Factory, Builder & Prototype',
      subtitle: 'Double-checked locking, Bill Pugh singleton, reflection attack protection, and fluent builder validation',
      summary: 'Master Gang of Four creational patterns: robust thread-safe Singleton variants, Factory Method, Abstract Factory for families of objects, Builder with fluent validation, and Prototype object cloning.',
      readingTimeMinutes: 30,
      isFreePreview: false,
      sortOrder: 2,
      contentHtml: `
        <h3>2.1 Creational Patterns Overview</h3>
        <p>Creational design patterns abstract the instantiation process. They decouple systems from how their objects are created, composed, and represented, encapsulating knowledge about concrete classes behind uniform interfaces.</p>

        ${buildTheorem('Theorem 2.1: Double-Checked Locking Volatile Invariant', `
          In Java and C++, the Double-Checked Locking pattern requires the instance reference to be declared <strong>volatile</strong>:
          \\[
          \\text{Thread A: } \\text{instance} = \\text{new Singleton}();
          \\]
          At the CPU/compiler level, <code>new</code> executes 3 non-atomic instructions:
          <ol>
            <li>Allocate memory heap block.</li>
            <li>Execute constructor to initialize fields.</li>
            <li>Assign allocated memory address to <code>instance</code> pointer.</li>
          </ol>
          Without <code>volatile</code>, the compiler or CPU may reorder steps (1 &rarr; 3 &rarr; 2). Thread B can observe a <strong>non-null pointer to an uninitialized object</strong>, causing catastrophic null-pointer exceptions! <code>volatile</code> introduces a memory fence preventing instruction reordering.
        `)}

        <h3>2.2 Architectural Diagram: Abstract Factory vs Builder</h3>
        ${buildMemoryDiagram('Abstract Factory vs Fluent Builder Architecture', `
ABSTRACT FACTORY PATTERN (Families of Products):
             [GUIFactory Interface]
             + createButton(): Button
             + createCheckbox(): Checkbox
                     |
         +-----------+-----------+
         |                       |
[WindowsFactory]          [MacFactory]
- WinButton               - MacButton
- WinCheckbox             - MacCheckbox

FLUENT BUILDER PATTERN (Step-by-Step Construction):
[HTTPClient.Builder]
  .withBaseUrl("https://api.stream-in.app")
  .withTimeout(Duration.ofSeconds(5))
  .withBearerToken("eyJhbGciOi...")
  .withMaxRetries(3)
  .build(); ---> Validates Invariants & Instantiates Immutable HttpClient!
        `)}

        <h3>2.3 Polyglot Implementation: Enterprise Creational Patterns</h3>
        <h5>Java 21 (Bill Pugh Lazy Singleton & Fluent Builder)</h5>
        ${buildCodeBlock('java', `
// Bill Pugh Singleton: Lazy loaded, thread-safe, zero synchronization overhead
public class DatabaseConnectionPool {
    private DatabaseConnectionPool() {
        if (Holder.INSTANCE != null) {
            throw new IllegalStateException("Reflection attack detected: already initialized!");
        }
    }

    private static class Holder {
        private static final DatabaseConnectionPool INSTANCE = new DatabaseConnectionPool();
    }

    public static DatabaseConnectionPool getInstance() {
        return Holder.INSTANCE;
    }
}

// Immutable Entity with Fluent Builder & Invariant Validation
public final class DatabaseConfig {
    private final String host;
    private final int port;
    private final int maxConnections;

    private DatabaseConfig(Builder builder) {
        this.host = builder.host;
        this.port = builder.port;
        this.maxConnections = builder.maxConnections;
    }

    public static class Builder {
        private String host = "localhost";
        private int port = 5432;
        private int maxConnections = 10;

        public Builder host(String host) { this.host = host; return this; }
        public Builder port(int port) { this.port = port; return this; }
        public Builder maxConnections(int max) { this.maxConnections = max; return this; }

        public DatabaseConfig build() {
            if (port < 1 || port > 65535) throw new IllegalArgumentException("Invalid port: " + port);
            if (maxConnections <= 0) throw new IllegalArgumentException("maxConnections must be positive");
            return new DatabaseConfig(this);
        }
    }
}
        `)}

        <h5>TypeScript (Factory Method Pattern)</h5>
        ${buildCodeBlock('typescript', `
export interface NotificationService {
  send(recipient: string, message: string): Promise<void>;
}

export class EmailNotificationService implements NotificationService {
  async send(recipient: string, message: string): Promise<void> {
    console.log(\`[Email] Sending to \${recipient}: \${message}\`);
  }
}

export class SmsNotificationService implements NotificationService {
  async send(recipient: string, message: string): Promise<void> {
    console.log(\`[SMS] Sending to \${recipient}: \${message}\`);
  }
}

export class NotificationFactory {
  public static createService(channel: 'EMAIL' | 'SMS'): NotificationService {
    switch (channel) {
      case 'EMAIL': return new EmailNotificationService();
      case 'SMS': return new SmsNotificationService();
      default: throw new Error(\`Unsupported notification channel: \${channel}\`);
    }
  }
}
        `)}

        <h3>2.4 Creational Patterns Comparison Matrix</h3>
        ${buildComplexityTable(
          ['Pattern', 'Intent', 'Complexity', 'Key Advantage', 'Drawback'],
          [
            ['Singleton', 'Ensure exactly one class instance with global point of access', 'Low', 'Shared state / resource management (e.g. ConnectionPool)', 'Difficult to unit test, hidden dependencies'],
            ['Factory Method', 'Delegate object creation to subclass implementations', 'Medium', 'Decouples creator from concrete product types', 'Class explosion for every new product type'],
            ['Abstract Factory', 'Create families of related or dependent objects without specifying concrete classes', 'High', 'Ensures consistency across related products', 'Rigid: adding new product type modifies interface'],
            ['Builder', 'Separate construction of a complex object from its representation', 'Medium', 'Step-by-step construction of immutable objects', 'Requires verbose boilerplate code'],
            ['Prototype', 'Create new objects by cloning an existing configured instance', 'Medium', 'Avoids expensive constructor initialization', 'Cloning complex cyclical object graphs is difficult']
          ]
        )}

        <h3>2.5 Real-World Enterprise Case Study</h3>
        ${buildInsight('Google Protocol Buffers (Protobuf) & Java Builder Pattern', `
          In Google Protobuf, all data transfer objects (DTOs) generated from <code>.proto</code> schema files are strictly immutable and constructible only via the <strong>Builder Pattern</strong>. This prevents partially constructed or corrupted RPC messages from traversing the network. Furthermore, Protobuf builders implement bitfields (bitmasks) internally to track which fields have been set, enabling efficient serialization that skips unset default fields.
        `)}

        <h3>2.6 Interview Failure Modes & Gotchas</h3>
        ${buildWarning('Singleton Serialization & Reflection Vulnerability', `
          In Java interviews, naive Singletons can be bypassed via:
          <ol>
            <li><strong>Reflection:</strong> <code>constructor.setAccessible(true)</code> instantiates private constructors.</li>
            <li><strong>Serialization:</strong> Deserializing a Singleton creates a brand new instance unless <code>readResolve()</code> is implemented.</li>
            <li><strong>Enum Singleton:</strong> Joshua Bloch recommends using an <code>enum</code> with a single instance: JVM guarantees 100% thread safety, reflection immunity, and serialization safety automatically!</li>
          </ol>
        `)}

        <h3>2.7 Practice Workshop Challenge</h3>
        ${buildAlgorithm('Challenge: Implement Thread-Safe Abstract Factory for Cross-Platform UI Engine', `
          <strong>Problem:</strong> Create an Abstract Factory that supports creating dark-mode and light-mode UI components (Buttons, Modals, Dropdowns) across Web, iOS, and Android platforms, with comprehensive unit tests verifying that dark-mode components are never paired with light-mode containers.
        `)}
      `
    },
    {
      id: 11303,
      chapterNumber: 3,
      title: 'Structural Patterns: Adapter, Bridge, Composite, Decorator, Facade, Flyweight & Proxy',
      subtitle: 'Dynamic proxies, transparent middleware wrapping, memory reduction via Flyweight, and composite trees',
      summary: 'Explore structural design patterns: Adapter legacy bridging, Decorator stream piping, Dynamic Proxy caching/security interception, Flyweight memory compaction, and Composite hierarchical trees.',
      readingTimeMinutes: 30,
      isFreePreview: false,
      sortOrder: 3,
      contentHtml: `
        <h3>3.1 Structural Patterns Overview</h3>
        <p>Structural patterns concern how classes and objects are composed to form larger, more flexible structures. They ensure that if one part of a system changes, the entire structure does not need to change.</p>

        ${buildTheorem('Theorem 3.1: The Decorator Composition Invariant', `
          The <strong>Decorator Pattern</strong> attaches additional responsibilities to an object dynamically without subclassing.
          <br/><br/>
          <strong>Structural Invariant:</strong> The Decorator <em>implements</em> the target component interface AND <em>has-a</em> reference to another instance of that same interface:
          \\[
          \\text{Decorator } D \\text{ conforms to Interface } I \\land D.\\text{wrapped} \\in I
          \\]
          This enables transparent recursive wrapping (onion-skin architecture), e.g.:
          <code>new GzipDecorator(new EncryptionDecorator(new FileOutputStream()))</code>.
        `)}

        <h3>3.2 Memory Diagram: Flyweight Pattern Object Sharing</h3>
        ${buildMemoryDiagram('Flyweight Pattern: Intrinsic vs Extrinsic State Separation', `
WITHOUT FLYWEIGHT (1,000,000 Forest Trees):
[Tree 1: {x: 10, y: 20, Texture: 5MB Mesh, Shader: 1MB}] -> 6 MB RAM
[Tree 2: {x: 12, y: 25, Texture: 5MB Mesh, Shader: 1MB}] -> 6 MB RAM
Total Memory: 6 Terabytes of duplicate graphics RAM!

WITH FLYWEIGHT:
[INTRINSIC SHARED STATE (Cached in FlyweightFactory)]:
+-------------------------------------------------------------------------+
| TreeModel: [OakTexture: 5MB Mesh, OakShader: 1MB] (Instantiated ONCE!)  |
+-------------------------------------------------------------------------+
                                   ^
             +---------------------+---------------------+
             |                                           |
[EXTRINSIC STATE (Lightweight)]:            [EXTRINSIC STATE]:
Tree #1: {x: 10, y: 20, modelRef}           Tree #2: {x: 12, y: 25, modelRef}
Memory: 16 bytes per tree instance! Total Memory reduced from 6TB to 22MB!
        `)}

        <h3>3.3 Polyglot Implementation: Proxy & Decorator Patterns</h3>
        <h5>Java 21 (Dynamic InvocationHandler Proxy for Caching & Telemetry)</h5>
        ${buildCodeBlock('java', `
import java.lang.reflect.*;
import java.util.concurrent.ConcurrentHashMap;

public class CachingInvocationHandler implements InvocationHandler {
    private final Object target;
    private final ConcurrentHashMap<String, Object> cache = new ConcurrentHashMap<>();

    public CachingInvocationHandler(Object target) {
        this.target = target;
    }

    @SuppressWarnings("unchecked")
    public static <T> T createProxy(T target, Class<T> iface) {
        return (T) Proxy.newProxyInstance(
            iface.getClassLoader(),
            new Class<?>[]{ iface },
            new CachingInvocationHandler(target)
        );
    }

    @Override
    public Object invoke(Object proxy, Method method, Object[] args) throws Throwable {
        if (method.getName().startsWith("get") && args != null && args.length == 1) {
            String key = method.getName() + ":" + args[0];
            return cache.computeIfAbsent(key, k -> {
                try {
                    return method.invoke(target, args);
                } catch (Exception e) {
                    throw new RuntimeException(e);
                }
            });
        }
        return method.invoke(target, args);
    }
}
        `)}

        <h5>TypeScript (Decorator Pattern for HTTP Request Retries)</h5>
        ${buildCodeBlock('typescript', `
export interface HttpClient {
  fetchData(url: string): Promise<string>;
}

export class BasicHttpClient implements HttpClient {
  async fetchData(url: string): Promise<string> {
    // Basic network call
    return \`HTTP payload from \${url}\`;
  }
}

export class RetryHttpDecorator implements HttpClient {
  constructor(
    private readonly wrapped: HttpClient,
    private readonly maxRetries: number = 3
  ) {}

  async fetchData(url: string): Promise<string> {
    let attempt = 0;
    while (attempt < this.maxRetries) {
      try {
        return await this.wrapped.fetchData(url);
      } catch (err) {
        attempt++;
        if (attempt >= this.maxRetries) throw err;
        console.warn(\`Retrying \${url} (attempt \${attempt})...\`);
      }
    }
    throw new Error('Retries exhausted');
  }
}
        `)}

        <h3>3.4 Structural Patterns Comparison Matrix</h3>
        ${buildComplexityTable(
          ['Pattern', 'Primary Intent', 'Interface Change?', 'Object Wrapped'],
          [
            ['Adapter', 'Convert the interface of an existing class into another interface clients expect', 'Yes (Adapts incompatible interface)', 'Single existing legacy object'],
            ['Decorator', 'Add responsibilities dynamically without modifying underlying interface', 'No (Same interface)', 'Single object recursively'],
            ['Proxy', 'Provide a surrogate or placeholder to control access to another object', 'No (Same interface)', 'Single subject (Lazy load / Security)'],
            ['Facade', 'Provide a simplified high-level interface to a complex subsystem', 'Yes (Creates new simple API)', 'Entire complex subsystem'],
            ['Composite', 'Compose objects into tree structures to represent part-whole hierarchies', 'No (Uniform node interface)', 'Tree of leaf and composite nodes'],
            ['Flyweight', 'Use sharing to support huge numbers of fine-grained objects efficiently', 'No', 'Pool of shared immutable instances']
          ]
        )}

        <h3>3.5 Real-World Enterprise Case Study</h3>
        ${buildInsight('Java IO Streams: The Canonical Decorator Architecture', `
          The standard Java <code>java.io</code> package is one of the most famous enterprise implementations of the Decorator pattern:
          <code>new BufferedReader(new InputStreamReader(new GZIPInputStream(new FileInputStream("data.gz"))))</code>
          Each layer adds behavior transparently: <code>FileInputStream</code> reads raw disk bytes; <code>GZIPInputStream</code> decompresses them; <code>InputStreamReader</code> decodes UTF-8 characters; <code>BufferedReader</code> buffers reads into memory blocks. None of the classes know about each other\\'s internal implementations.
        `)}

        <h3>3.6 Interview Failure Modes & Gotchas</h3>
        ${buildWarning('Adapter vs Proxy vs Decorator Confusion', `
          Candidates frequently mix up these three wrapper patterns:
          <ul>
            <li><strong>Adapter:</strong> Changes the interface to make two incompatible classes work together.</li>
            <li><strong>Decorator:</strong> Keeps the same interface, but enhances behavior dynamically.</li>
            <li><strong>Proxy:</strong> Keeps the same interface, but controls access (caching, security, lazy loading, remote RPC).</li>
          </ul>
        `)}

        <h3>3.7 Practice Workshop Challenge</h3>
        ${buildAlgorithm('Challenge: Build a File System Composite Tree with Visitor Calculation', `
          <strong>Problem:</strong> Implement a File System hierarchy using the <strong>Composite Pattern</strong> where <code>File</code> and <code>Directory</code> implement a shared <code>FileSystemNode</code> interface. Add a method <code>calculateTotalSize()</code> that recursively computes disk utilization across arbitrarily nested directory trees.
        `)}
      `
    },
    {
      id: 11304,
      chapterNumber: 4,
      title: 'Behavioral Patterns: Strategy, Observer, Command, Chain of Responsibility, State & Iterator',
      subtitle: 'Loose coupling, event-driven architectures, undoable command pipelines, and state machine transitions',
      summary: 'Master behavioral patterns: dynamic algorithm encapsulation with Strategy, reactive decoupled pub-sub with Observer, transactional undo/redo with Command, and finite state machines with State.',
      readingTimeMinutes: 30,
      isFreePreview: false,
      sortOrder: 4,
      contentHtml: `
        <h3>4.1 Behavioral Patterns Overview</h3>
        <p>Behavioral patterns are concerned with algorithms and the assignment of responsibilities between objects. They characterize complex control flow that is difficult to trace at runtime, shifting focus from control flow to the patterns of interconnection between objects.</p>

        ${buildTheorem('Theorem 4.1: The Strategy Invariant (Decoupled Algorithms)', `
          The <strong>Strategy Pattern</strong> defines a family of algorithms, encapsulates each one, and makes them interchangeable.
          <br/><br/>
          Let \\(A\\) be a context class and \\(S\\) be the strategy interface. The context \\(A\\) delegates algorithmic computation to an instance \\(s \\in S\\):
          \\[
          A.\\text{execute}() \\implies s.\\text{algorithm}()
          \\]
          This eliminates complex conditional branching (<code>if/else</code> or <code>switch</code> cascades) and adheres strictly to the <strong>Open-Closed Principle</strong>: new algorithms can be introduced without modifying the context class.
        `)}

        <h3>4.2 Architectural Diagram: Observer vs Chain of Responsibility</h3>
        ${buildMemoryDiagram('Observer (1-to-Many PubSub) vs Chain of Responsibility (1-to-1 Handling)', `
OBSERVER PATTERN (Broadcast Notification):
                [Publisher / Subject]
               (orderPlacedEvent fired)
                 /        |        \\
                /         |         \\
               v          v          v
     [EmailService] [StockService] [AnalyticsService]
     (All active observers execute in parallel or sequence)

CHAIN OF RESPONSIBILITY (Pipelined Filtering):
[Incoming HTTP Request]
         |
         v
+------------------+     Next
| AuthMiddleware   | ----------> +------------------+     Next
| (Passes or halts)|             | RateLimiter      | ----------> +------------------+
+------------------+             | (Passes or halts)|             | RequestValidator |
                                 +------------------+             +------------------+
        `)}

        <h3>4.3 Polyglot Implementation: Strategy & Command with Undo</h3>
        <h5>Java 21 (Transactional Command Pattern with Undo Stack)</h5>
        ${buildCodeBlock('java', `
import java.util.Stack;

public interface TextCommand {
    void execute();
    void undo();
}

public class TextEditor {
    private final StringBuilder content = new StringBuilder();
    private final Stack<TextCommand> undoStack = new Stack<>();

    public void append(String text) {
        content.append(text);
    }

    public void delete(int length) {
        int start = content.length() - length;
        content.delete(start, content.length());
    }

    public String getText() { return content.toString(); }

    public void executeCommand(TextCommand command) {
        command.execute();
        undoStack.push(command);
    }

    public void undo() {
        if (!undoStack.isEmpty()) {
            TextCommand cmd = undoStack.pop();
            cmd.undo();
        }
    }
}

public class InsertTextCommand implements TextCommand {
    private final TextEditor editor;
    private final String textToInsert;

    public InsertTextCommand(TextEditor editor, String text) {
        this.editor = editor;
        this.textToInsert = text;
    }

    @Override
    public void execute() { editor.append(textToInsert); }

    @Override
    public void undo() { editor.delete(textToInsert.length()); }
}
        `)}

        <h5>TypeScript (Strategy Pattern with Routing Engine)</h5>
        ${buildCodeBlock('typescript', `
export interface PricingStrategy {
  calculatePrice(distanceKm: number, durationMinutes: number): number;
}

export class RegularPricingStrategy implements PricingStrategy {
  calculatePrice(distanceKm: number, durationMinutes: number): number {
    return 5.00 + (distanceKm * 1.50) + (durationMinutes * 0.25);
  }
}

export class SurgePricingStrategy implements PricingStrategy {
  constructor(private readonly surgeMultiplier: number) {}

  calculatePrice(distanceKm: number, durationMinutes: number): number {
    const base = 5.00 + (distanceKm * 1.50) + (durationMinutes * 0.25);
    return base * this.surgeMultiplier;
  }
}

export class RideFareCalculator {
  constructor(private strategy: PricingStrategy) {}

  public setStrategy(strategy: PricingStrategy): void {
    this.strategy = strategy;
  }

  public getFare(distance: number, duration: number): number {
    return this.strategy.calculatePrice(distance, duration);
  }
}
        `)}

        <h3>4.4 Behavioral Patterns Comparison Matrix</h3>
        ${buildComplexityTable(
          ['Pattern', 'Intent', 'Communication Flow', 'Primary Beneficiary'],
          [
            ['Strategy', 'Encapsulate interchangeable algorithms behind an interface', '1-to-1 direct delegation', 'Context algorithm swappability'],
            ['Observer', 'Notify multiple subscribers automatically upon state changes', '1-to-Many broadcast', 'Decoupled event-driven updates'],
            ['Command', 'Encapsulate a request as an object with undo/redo capability', 'Sender &rarr; Command &rarr; Receiver', 'Task queues, macro recorders, transactions'],
            ['State', 'Allow an object to alter its behavior when internal state changes', 'Internal state machine dispatch', 'Eliminating complex state enum switch cases'],
            ['Chain of Responsibility', 'Pass requests along a chain of potential handlers', 'Sequential pipeline traversal', 'HTTP middlewares, authorization pipelines'],
            ['Iterator', 'Access elements of an aggregate object sequentially without exposing underlying representation', 'Sequential cursor access', 'Collections (Trees, Lists, Graphs)']
          ]
        )}

        <h3>4.5 Real-World Enterprise Case Study</h3>
        ${buildInsight('AWS SDK & Middleware Pipeline: Chain of Responsibility', `
          When invoking an AWS SDK client (e.g. <code>s3.putObject()</code>), the request does not immediately transmit over HTTP. It passes through a robust <strong>Chain of Responsibility pipeline</strong>:
          <ol>
            <li><strong>RetryMiddleware:</strong> Injects exponential backoff retry logic.</li>
            <li><strong>SigningMiddleware (SigV4):</strong> Computes HMAC-SHA256 authorization signatures from AWS credentials.</li>
            <li><strong>EndpointResolutionMiddleware:</strong> Resolves regional endpoints and dual-stack IPv6 hostnames.</li>
            <li><strong>SerializationMiddleware:</strong> Serializes JSON/XML payload into HTTP wire format.</li>
          </ol>
          Each middleware can inspect, modify, or short-circuit the request.
        `)}

        <h3>4.6 Interview Failure Modes & Gotchas</h3>
        ${buildWarning('Observer Memory Leaks (Lapsed Listener Problem)', `
          In languages with garbage collection (Java, C#, JavaScript), if an Observer subscribes to a long-lived Publisher (e.g. a static event bus) but forgets to unsubscribe when destroyed:
          The Publisher retains a strong reference to the Observer, <strong>preventing the garbage collector from reclaiming the Observer instance</strong>.
          Mitigation: Use <code>WeakReference</code> for listener subscriptions or implement explicit lifecycle cleanup (<code>AutoCloseable</code>).
        `)}

        <h3>4.7 Practice Workshop Challenge</h3>
        ${buildAlgorithm('Challenge: Implement Finite State Machine (State Pattern) for Vending Machine', `
          <strong>Problem:</strong> Model a Vending Machine using the <strong>State Pattern</strong> supporting states: <code>NoCoinState</code>, <code>HasCoinState</code>, <code>DispensingState</code>, <code>SoldOutState</code> with actions <code>insertCoin()</code>, <code>ejectCoin()</code>, <code>turnCrank()</code>, <code>dispense()</code>. Prove that invalid transitions (e.g. ejecting coin during dispensing) are safely prevented.
        `)}
      `
    },
    {
      id: 11305,
      chapterNumber: 5,
      title: 'Low-Level Design (LLD): Parking Lot System Design (Class Models & Concurrency)',
      subtitle: 'Multi-floor parking allocation, spot sizing, ticket lifecycle, and thread-safe spot locking',
      summary: 'Architect a complete production-grade Parking Lot system: domain class models, spot allocation algorithms for compact vs large vehicles, hourly ticket billing, and concurrent atomic spot reservation.',
      readingTimeMinutes: 32,
      isFreePreview: false,
      sortOrder: 5,
      contentHtml: `
        <h3>5.1 Requirements & System Boundary</h3>
        <p>The Parking Lot LLD is a canonical FAANG low-level design interview challenge. The system must support:</p>
        <ul>
          <li>Multiple floors, each containing multiple parking spots of different sizes (Motorcycle, Compact, Large, Handicapped, EV).</li>
          <li>Vehicles of different types (Motorbike, Car, Truck, EV) mapping to eligible spot categories.</li>
          <li>Automated entry gates issuing time-stamped tickets and exit gates computing dynamic hourly parking fees.</li>
          <li>Thread-safe concurrent spot allocation to prevent race conditions during peak entry rushes.</li>
        </ul>

        ${buildTheorem('Theorem 5.1: Spot Allocation Invariant', `
          Let \\(V\\) be a vehicle of size class \\(S_v\\). A parking spot \\(P\\) of size class \\(S_p\\) is eligible for allocation if and only if:
          \\[
          \\text{Size}(S_p) \\ge \\text{Size}(S_v) \\land P.\\text{isOccupied} = \\text{false}
          \\]
          To maximize capacity, the allocator must apply the <strong>Best-Fit Strategy</strong>: allocate the smallest eligible spot first so that large spots remain available for trucks.
        `)}

        <h3>5.2 Architectural Diagram: Parking Lot Domain Class Model</h3>
        ${buildMemoryDiagram('Parking Lot Unified Class Diagram (UML Representation)', `
+-------------------------------------------------------------------------+
|                              ParkingLot                                 |
| - floors: List<ParkingFloor>                                            |
| - entryGates: List<EntryGate>                                           |
| - exitGates: List<ExitGate>                                             |
| + parkVehicle(v: Vehicle): Ticket                                       |
| + exitVehicle(t: Ticket): PaymentReceipt                                |
+------------------------------------+------------------------------------+
                                     | 1..*
                                     v
+-------------------------------------------------------------------------+
|                             ParkingFloor                                |
| - floorNumber: int                                                      |
| - spots: Map<SpotType, PriorityQueue<ParkingSpot>>                      |
| + findAvailableSpot(type: VehicleType): Optional<ParkingSpot>           |
+------------------------------------+------------------------------------+
                                     | 1..*
                                     v
+-------------------------------------------------------------------------+
|                             ParkingSpot                                 |
| - spotId: String                                                        |
| - spotType: SpotType [MOTORCYCLE | COMPACT | LARGE | EV]                |
| - isAvailable: AtomicBoolean                                            |
| - currentVehicle: Vehicle                                               |
| + assignVehicle(v: Vehicle): boolean                                    |
| + vacate(): void                                                        |
+-------------------------------------------------------------------------+
        `)}

        <h3>5.3 Polyglot Implementation: Complete Thread-Safe Parking Lot</h3>
        <h5>Java 21 (Thread-Safe Parking Allocation Engine)</h5>
        ${buildCodeBlock('java', `
import java.time.Duration;
import java.time.Instant;
import java.util.*;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.atomic.AtomicBoolean;

public class ParkingLotSystem {

    public enum VehicleType { MOTORCYCLE, CAR, TRUCK }
    public enum SpotType { MOTORCYCLE, COMPACT, LARGE }

    public record Vehicle(String licensePlate, VehicleType type) {}

    public static class ParkingSpot {
        private final String spotId;
        private final SpotType spotType;
        private final AtomicBoolean isOccupied = new AtomicBoolean(false);
        private volatile Vehicle vehicle;

        public ParkingSpot(String id, SpotType type) {
            this.spotId = id;
            this.spotType = type;
        }

        public boolean tryAssign(Vehicle v) {
            if (isOccupied.compareAndSet(false, true)) {
                this.vehicle = v;
                return true;
            }
            return false;
        }

        public void vacate() {
            this.vehicle = null;
            this.isOccupied.set(false);
        }

        public String getSpotId() { return spotId; }
        public SpotType getSpotType() { return spotType; }
    }

    public record Ticket(String ticketId, String licensePlate, ParkingSpot spot, Instant entryTime) {}

    public static class ParkingLot {
        private final List<ParkingSpot> spots = new ArrayList<>();
        private final Map<String, Ticket> activeTickets = new ConcurrentHashMap<>();

        public void addSpot(ParkingSpot spot) { spots.add(spot); }

        public synchronized Ticket parkVehicle(Vehicle vehicle) {
            SpotType required = mapVehicleToSpot(vehicle.type());
            
            for (ParkingSpot spot : spots) {
                if (spot.getSpotType() == required && spot.tryAssign(vehicle)) {
                    Ticket ticket = new Ticket(UUID.randomUUID().toString(), vehicle.licensePlate(), spot, Instant.now());
                    activeTickets.put(ticket.ticketId(), ticket);
                    return ticket;
                }
            }
            throw new IllegalStateException("Parking lot full for vehicle type: " + vehicle.type());
        }

        public double vacate(String ticketId) {
            Ticket ticket = activeTickets.remove(ticketId);
            if (ticket == null) throw new IllegalArgumentException("Invalid ticket ID");

            ticket.spot().vacate();
            long hours = Math.max(1, Duration.between(ticket.entryTime(), Instant.now()).toHours());
            return hours * 5.0; // $5.00 per hour
        }

        private SpotType mapVehicleToSpot(VehicleType vType) {
            return switch (vType) {
                case MOTORCYCLE -> SpotType.MOTORCYCLE;
                case CAR -> SpotType.COMPACT;
                case TRUCK -> SpotType.LARGE;
            };
        }
    }
}
        `)}

        <h3>5.4 Spot Allocation Complexity & Design Trade-Offs</h3>
        ${buildComplexityTable(
          ['Allocation Strategy', 'Search Time', 'Space Overhead', 'Fragmentation Risk', 'Concurrency Contention'],
          [
            ['Linear Floor Scan', 'O(N) spots', 'O(1) minimal', 'High (Scattered empty spots)', 'High lock contention on global spot list'],
            ['PriorityQueue (Nearest Entrance)', 'O(log N) pick', 'O(N) heap storage', 'Low (Always packs tightly)', 'Requires synchronized queue lock'],
            ['Lock-Free Atomic BitSet', 'O(N / 64) bitwise scan', '1 bit per spot', 'Medium', 'Ultra-low (CAS on 64-bit integer words)']
          ]
        )}

        <h3>5.5 Real-World Enterprise Case Study</h3>
        ${buildInsight('Heathrow Airport Automated Parking: License Plate Recognition (LPR)', `
          Modern enterprise parking architectures (such as Heathrow Terminal 5) eliminate paper tickets entirely. Entrance gates use high-speed <strong>ANPR (Automated Number Plate Recognition)</strong> cameras to capture license plates, creating a database entry keyed by plate number and assigning a designated bay via dynamic LED roadway signs. Payment kiosks query the plate number directly via REST APIs.
        `)}

        <h3>5.6 Interview Failure Modes & Gotchas</h3>
        ${buildWarning('The Race Condition on the Last Parking Spot', `
          If two cars arrive at Entry Gate 1 and Entry Gate 2 simultaneously when only 1 spot remains:
          A non-atomic check: <code>if (spot.isAvailable()) { spot.occupy(); }</code>
          will cause <strong>both gates to assign the same parking spot to two different drivers</strong>!
          In an interview, always demonstrate thread safety using <strong>AtomicBoolean CAS (compareAndSet)</strong> or database pessimistic locks (<code>SELECT FOR UPDATE</code>).
        `)}

        <h3>5.7 Practice Workshop Challenge</h3>
        ${buildAlgorithm('Challenge: Dynamic Surge Pricing Strategy for Parking Garages', `
          <strong>Problem:</strong> Extend the Parking Lot system by applying the <strong>Strategy Pattern</strong> to support dynamic pricing: standard hourly rate when occupancy &lt; 70%, 1.5x surge rate when occupancy &ge; 70%, and 2.5x surge rate during major events.
        `)}
      `
    },
    {
      id: 11306,
      chapterNumber: 6,
      title: 'Low-Level Design (LLD): Cache System (LRU / LFU with Eviction Policies)',
      subtitle: 'Doubly linked list + HashMap, frequency buckets, O(1) eviction, and thread-safe Striped Locks',
      summary: 'Design an industrial-strength in-memory cache system: implementing O(1) LRU (Least Recently Used) and O(1) LFU (Least Frequently Used) eviction policies with fine-grained lock striping.',
      readingTimeMinutes: 30,
      isFreePreview: false,
      sortOrder: 6,
      contentHtml: `
        <h3>6.1 Cache Design Requirements & Eviction Invariants</h3>
        <p>An in-memory cache must provide strict bounded capacity while supporting ultra-fast reads and writes. When cache capacity is reached, the eviction policy determines which key-value pair is evicted:</p>
        <ul>
          <li><strong>LRU (Least Recently Used):</strong> Evicts the item that has not been accessed for the longest duration.</li>
          <li><strong>LFU (Least Frequently Used):</strong> Evicts the item with the minimum access frequency count.</li>
        </ul>

        ${buildTheorem('Theorem 6.1: O(1) LRU Cache Complexity Invariant', `
          To achieve strict <strong>O(1) time complexity</strong> for both <code>get(key)</code> and <code>put(key, val)</code>:
          \\[
          \\text{LRU} = \\text{Hash Map (Key } \\to \\text{ Node Reference)} + \\text{Doubly Linked List (Recency Ordering)}
          \\]
          <ol>
            <li><strong>Hash Map:</strong> Guarantees \\(O(1)\\) pointer lookup to any arbitrary node.</li>
            <li><strong>Doubly Linked List:</strong> Guarantees \\(O(1)\\) node removal and re-insertion at the head without shifting array elements.</li>
          </ol>
        `)}

        <h3>6.2 Memory Diagram: O(1) LFU Frequency Bucket Doubly Linked List</h3>
        ${buildMemoryDiagram('LFU O(1) Architecture: Frequency Buckets & Node Chains', `
Key Table: [Key "A" -> Node A]  [Key "B" -> Node B]  [Key "C" -> Node C]

FREQUENCY BUCKET LIST (Ordered by frequency count):
+-------------------------------------------------------------------------+
| Bucket (Freq = 1):  [Head] <-> [Node C] <-> [Node D] <-> [Tail]         |
+-------------------------------------------------------------------------+
       |
       v
+-------------------------------------------------------------------------+
| Bucket (Freq = 2):  [Head] <-> [Node A] <-> [Tail]                      |
+-------------------------------------------------------------------------+
       |
       v
+-------------------------------------------------------------------------+
| Bucket (Freq = 5):  [Head] <-> [Node B] <-> [Tail]                      |
+-------------------------------------------------------------------------+
minFrequency pointer = 1.
When evicting: Poll oldest node from Bucket[minFrequency] in O(1) time!
        `)}

        <h3>6.3 Polyglot Implementation: Complete O(1) Thread-Safe LRU Cache</h3>
        <h5>Java 21 (O(1) LRU Cache with ReentrantReadWriteLock)</h5>
        ${buildCodeBlock('java', `
import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.locks.ReentrantReadWriteLock;

public class ThreadSafeLRUCache<K, V> {
    private static class Node<K, V> {
        K key;
        V value;
        Node<K, V> prev, next;
        Node(K key, V value) { this.key = key; this.value = value; }
    }

    private final int capacity;
    private final Map<K, Node<K, V>> map = new HashMap<>();
    private final Node<K, V> head = new Node<>(null, null);
    private final Node<K, V> tail = new Node<>(null, null);
    private final ReentrantReadWriteLock rwLock = new ReentrantReadWriteLock();

    public ThreadSafeLRUCache(int capacity) {
        this.capacity = capacity;
        head.next = tail;
        tail.prev = head;
    }

    public V get(K key) {
        rwLock.writeLock().lock(); // Write lock needed because LRU order mutates on read
        try {
            Node<K, V> node = map.get(key);
            if (node == null) return null;
            moveToHead(node);
            return node.value;
        } finally {
            rwLock.writeLock().unlock();
        }
    }

    public void put(K key, V value) {
        rwLock.writeLock().lock();
        try {
            Node<K, V> node = map.get(key);
            if (node != null) {
                node.value = value;
                moveToHead(node);
            } else {
                if (map.size() >= capacity) {
                    removeTail();
                }
                Node<K, V> newNode = new Node<>(key, value);
                map.put(key, newNode);
                addToHead(newNode);
            }
        } finally {
            rwLock.writeLock().unlock();
        }
    }

    private void addToHead(Node<K, V> node) {
        node.next = head.next;
        node.prev = head;
        head.next.prev = node;
        head.next = node;
    }

    private void removeNode(Node<K, V> node) {
        node.prev.next = node.next;
        node.next.prev = node.prev;
    }

    private void moveToHead(Node<K, V> node) {
        removeNode(node);
        addToHead(node);
    }

    private void removeTail() {
        Node<K, V> victim = tail.prev;
        removeNode(victim);
        map.remove(victim.key);
    }
}
        `)}

        <h5>TypeScript (Map-Based O(1) LRU Implementation)</h5>
        ${buildCodeBlock('typescript', `
export class TypeScriptLRU<K, V> {
  private readonly cache = new Map<K, V>();

  constructor(private readonly capacity: number) {}

  public get(key: K): V | undefined {
    if (!this.cache.has(key)) return undefined;
    const value = this.cache.get(key)!;
    // Map in JS maintains insertion order: re-insert to move to MRU
    this.cache.delete(key);
    this.cache.set(key, value);
    return value;
  }

  public put(key: K, value: V): void {
    if (this.cache.has(key)) {
      this.cache.delete(key);
    } else if (this.cache.size >= this.capacity) {
      // First key in iterator is oldest (LRU victim)
      const oldestKey = this.cache.keys().next().value;
      if (oldestKey !== undefined) this.cache.delete(oldestKey);
    }
    this.cache.set(key, value);
  }
}
        `)}

        <h3>6.4 Eviction Policies Comparison Matrix</h3>
        ${buildComplexityTable(
          ['Eviction Algorithm', 'Lookup Time', 'Insertion Time', 'Eviction Time', 'Scan Resistance'],
          [
            ['LRU (Least Recently Used)', 'O(1)', 'O(1)', 'O(1)', 'Poor (One-time large table scan evicts entire cache)'],
            ['LFU (Least Frequently Used)', 'O(1) with bucket lists', 'O(1)', 'O(1)', 'High (Frequently accessed items survive)'],
            ['ARC (Adaptive Replacement Cache)', 'O(1)', 'O(1)', 'O(1)', 'Exceptional (Self-tunes between recency and frequency)'],
            ['W-TinyLFU (Caffeine Cache)', 'O(1)', 'O(1)', 'O(1)', 'Maximum achievable hit-ratio in enterprise Java']
          ]
        )}

        <h3>6.5 Real-World Enterprise Case Study</h3>
        ${buildInsight('Ben Manes Caffeine Cache & Window TinyLFU', `
          In modern Java enterprise architectures, <strong>Caffeine Cache</strong> replaced Guava Cache across Cassandra, Spring Boot, and Kafka. Caffeine implements <strong>Window TinyLFU</strong>:
          <ol>
            <li>New entries enter a small admission window using LRU.</li>
            <li>When evicted from the window, entries compete against the main cache victim based on a 4-bit Count-Min Sketch frequency estimation.</li>
            <li>If the new item has a higher estimated historical access frequency than the victim, it is admitted; otherwise, it is immediately discarded.</li>
          </ol>
        `)}

        <h3>6.6 Interview Failure Modes & Gotchas</h3>
        ${buildWarning('The Global Mutex Bottleneck on LRU Reads', `
          Because reading a key in an LRU cache mutates the recency linked list, naive implementations place a global <code>synchronized</code> lock on <code>get()</code>. Under high-throughput multi-core workloads, all CPU cores contend on the same lock, collapsing read scalability.
          Solution: Use <strong>Lock Striping</strong> (segmenting the cache into 16 or 32 independent shards) or an asynchronous event ring buffer (like Caffeine's Disruptor queue).
        `)}

        <h3>6.7 Practice Workshop Challenge</h3>
        ${buildAlgorithm('Challenge: Design Time-To-Live (TTL) Passive + Active Expiration in LRU', `
          <strong>Problem:</strong> Extend the LRU Cache to support per-key TTL expiration (e.g. <code>put(key, value, ttlMillis)</code>). Implement both passive expiration (checking expiry on <code>get()</code>) and active background sampling (sweeping expired keys periodically) without locking the entire cache.
        `)}
      `
    },
    {
      id: 11307,
      chapterNumber: 7,
      title: 'Low-Level Design (LLD): Elevator System & Dispatch Scheduling',
      subtitle: 'LOOK / SCAN elevator scheduling algorithms, multi-car coordination, emergency stops, and door state machines',
      summary: 'Architect a complete multi-car elevator control system: the LOOK disk-scheduling elevator dispatch algorithm, internal and external request queues, door finite state machines, and high-efficiency dispatching.',
      readingTimeMinutes: 30,
      isFreePreview: false,
      sortOrder: 7,
      contentHtml: `
        <h3>7.1 Elevator System Requirements & Scheduling Dynamics</h3>
        <p>A multi-car elevator controller manages \\(N\\) elevator cars servicing \\(M\\) building floors. The system must process two distinct categories of requests:</p>
        <ul>
          <li><strong>Internal Requests:</strong> Passengers inside car \\(i\\) press a destination floor button.</li>
          <li><strong>External (Hall) Requests:</strong> Users on floor \\(k\\) press an UP or DOWN direction button.</li>
        </ul>

        ${buildTheorem('Theorem 7.1: The LOOK / SCAN Dispatch Invariant', `
          The <strong>LOOK Algorithm</strong> (derived from disk arm scheduling) guarantees starvation-free motion while minimizing energy expenditure and passenger wait time:
          <ol>
            <li>The elevator continues moving in its current direction (UP or DOWN) as long as requests exist in that direction.</li>
            <li>It stops at all intermediate floors requested in the same direction.</li>
            <li>When no more requests exist in the current direction, the elevator reverses direction if requests exist behind it; otherwise, it enters the IDLE state.</li>
          </ol>
        `)}

        <h3>7.2 Architectural Diagram: Elevator State Machine</h3>
        ${buildMemoryDiagram('Elevator Finite State Machine (Door & Motion States)', `
                +---------------------------------------+
                |                 IDLE                  |
                +-------------------+-------------------+
                                    |
            [Request Arrives]       |       [Request Arrives]
            [Destination > Curr]    |       [Destination < Curr]
                                    v
+------------------+     Floor Reached      +------------------+
|    MOVING_UP     | ---------------------> |   DOORS_OPENING  |
+------------------+                        +--------+---------+
         ^                                           |
         |                                           v
         | Timer Expired                    +------------------+
         +--------------------------------- |    DOORS_OPEN    |
         |                                  +--------+---------+
         |                                           |
         v Floor Reached                    +--------v---------+
+------------------+                        |   DOORS_CLOSING  |
|   MOVING_DOWN    | ---------------------> +------------------+
+------------------+
        `)}

        <h3>7.3 Polyglot Implementation: Multi-Car Elevator Controller</h3>
        <h5>Java 21 (Elevator Controller with LOOK Scheduling Algorithm)</h5>
        ${buildCodeBlock('java', `
import java.util.TreeSet;

public class ElevatorCar {
    public enum Direction { UP, DOWN, IDLE }
    public enum DoorState { OPEN, CLOSED }

    private final int id;
    private int currentFloor = 1;
    private Direction direction = Direction.IDLE;
    private DoorState doorState = DoorState.CLOSED;

    // Ordered floor destination sets
    private final TreeSet<Integer> upRequests = new TreeSet<>();
    private final TreeSet<Integer> downRequests = new TreeSet<>();

    public ElevatorCar(int id) { this.id = id; }

    public synchronized void addDestination(int floor) {
        if (floor > currentFloor) upRequests.add(floor);
        else if (floor < currentFloor) downRequests.add(floor);
        if (direction == Direction.IDLE) {
            direction = (floor > currentFloor) ? Direction.UP : Direction.DOWN;
        }
    }

    public synchronized void step() {
        if (direction == Direction.UP) {
            Integer next = upRequests.ceiling(currentFloor);
            if (next != null) {
                currentFloor++;
                if (currentFloor == next) {
                    upRequests.remove(next);
                    openDoors();
                }
            } else if (!downRequests.isEmpty()) {
                direction = Direction.DOWN;
            } else {
                direction = Direction.IDLE;
            }
        } else if (direction == Direction.DOWN) {
            Integer next = downRequests.floor(currentFloor);
            if (next != null) {
                currentFloor--;
                if (currentFloor == next) {
                    downRequests.remove(next);
                    openDoors();
                }
            } else if (!upRequests.isEmpty()) {
                direction = Direction.UP;
            } else {
                direction = Direction.IDLE;
            }
        }
    }

    private void openDoors() {
        doorState = DoorState.OPEN;
        // Simulating passenger boarding
        doorState = DoorState.CLOSED;
    }

    public int getCurrentFloor() { return currentFloor; }
    public Direction getDirection() { return direction; }
    public int getId() { return id; }
}
        `)}

        <h3>7.4 Dispatch Algorithms Comparison Matrix</h3>
        ${buildComplexityTable(
          ['Algorithm', 'Average Wait Time', 'Power Consumption', 'Starvation Resilience', 'Optimal Scenario'],
          [
            ['FCFS (First-Come First-Served)', 'Catastrophic', 'Maximum (Continuous full traversal)', 'Zero (Strict queue order)', 'Single elevator in small 2-floor residence'],
            ['SSTF (Shortest Seek Time First)', 'Low', 'Moderate', 'Poor (Distant floors starve)', 'Low traffic buildings'],
            ['LOOK / SCAN (Elevator Algorithm)', 'Very Low', 'Optimized (Smooth directional sweeps)', 'High (Starvation-free)', 'Standard commercial office buildings'],
            ['Destination Dispatch (Modern KONE/Otis)', 'Minimum Possible', 'Lowest (Optimally groups passengers by floor)', '100% Starvation-free', 'Skyscrapers (50+ floors, high peak traffic)']
          ]
        )}

        <h3>7.5 Real-World Enterprise Case Study</h3>
        ${buildInsight('Otis Compass & Destination Dispatch Systems', `
          In traditional buildings, passengers press UP, enter the first elevator that arrives, and then press their floor buttons inside the car, resulting in an elevator stopping at 12 floors consecutively.
          Modern high-rises deploy <strong>Destination Dispatch</strong>: passengers enter their target floor on a touch keypad in the building lobby <em>before</em> boarding. The central dispatch algorithm runs real-time integer programming optimizations, assigning passenger groups heading to adjacent floors (e.g. floors 30-35) to Car A, while Car B handles floors 40-45, increasing skyscraper passenger handling capacity by over 50%.
        `)}

        <h3>7.6 Interview Failure Modes & Gotchas</h3>
        ${buildWarning('The Emergency Stop State Transition Violation', `
          When designing the Elevator State Machine, interview candidates often allow transitions directly from <code>MOVING_UP</code> to <code>DOORS_OPEN</code> without intermediate states.
          Always model:
          <code>MOVING &rarr; STOPPING &rarr; LEVELING &rarr; DOORS_OPENING &rarr; DOORS_OPEN</code>.
          Furthermore, an <code>EMERGENCY_STOP</code> button must immediately halt motor drives, lock mechanical friction brakes, and disable automated door opening until maintenance keys authenticate.
        `)}

        <h3>7.7 Practice Workshop Challenge</h3>
        ${buildAlgorithm('Challenge: Design Multi-Car Supervisory Dispatcher', `
          <strong>Problem:</strong> Implement an <code>ElevatorDispatcher</code> that coordinates 4 elevator cars. When an external hall call <code>(floor, direction)</code> is received, select the optimal car using the <strong>Figure of Merit (FOM)</strong> calculation based on current car location, movement direction, and load capacity.
        `)}
      `
    },
    {
      id: 11308,
      chapterNumber: 8,
      title: 'Enterprise Design Patterns: Domain-Driven Design (DDD), CQRS, Unit of Work & Event Sourcing',
      subtitle: 'Entities, Value Objects, Aggregates, Event Store append-only logs, and read/write separation',
      summary: 'Explore advanced enterprise architectural patterns: Domain-Driven Design (DDD) aggregates and bounded contexts, Command Query Responsibility Segregation (CQRS), Unit of Work transaction boundaries, and Event Sourcing.',
      readingTimeMinutes: 32,
      isFreePreview: false,
      sortOrder: 8,
      contentHtml: `
        <h3>8.1 Domain-Driven Design (DDD) Tactical Building Blocks</h3>
        <p>Enterprise software systems fail when code architectures diverge from business domain realities. Eric Evans' <strong>Domain-Driven Design (DDD)</strong> establishes clear semantic models to isolate core business rules from infrastructure mechanisms:</p>
        <ul>
          <li><strong>Entity:</strong> An object defined not by its attributes, but by a persistent thread of <strong>unique identity</strong> (e.g. <code>User</code>, <code>Order</code>).</li>
          <li><strong>Value Object:</strong> An immutable object with <strong>no conceptual identity</strong>, defined purely by its attribute values (e.g. <code>Money { amount: 50, currency: "USD" }</code>). Equality is structural.</li>
          <li><strong>Aggregate & Aggregate Root:</strong> A cluster of associated objects treated as a single unit for data changes. External objects may hold references <em>only</em> to the Aggregate Root.</li>
        </ul>

        ${buildTheorem('Theorem 8.1: The Aggregate Transactional Invariant', `
          An Aggregate defines an inviolable consistency boundary:
          <ol>
            <li>All domain state modifications inside an Aggregate must be coordinated strictly through its <strong>Aggregate Root</strong>.</li>
            <li>A single database transaction must mutate <strong>at most one Aggregate instance</strong>.</li>
            <li>Cross-aggregate eventual consistency is achieved asynchronously via <strong>Domain Events</strong> and transactional outbox patterns.</li>
          </ol>
        `)}

        <h3>8.2 Architectural Diagram: CQRS & Event Sourcing Architecture</h3>
        ${buildMemoryDiagram('CQRS (Command Query Responsibility Segregation) & Event Sourcing', `
COMMAND PATH (Write Model - ACID / Invariant Enforcement):
[Client: PlaceOrder] -> [Command Handler] -> [Order Aggregate Root]
                                                   |
                                                   v
                         [APPEND-ONLY EVENT STORE: Kafka / EventStoreDB]
                         - Event 1: OrderCreatedEvent
                         - Event 2: ItemAddedEvent
                         - Event 3: OrderPaidEvent
                                                   |
                   +-------------------------------+-------------------------------+
                   v (Event Stream)                                                v (Event Stream)
QUERY PATH (Read Model - Denormalized / ElasticSearch / PostgreSQL Read View):
[OrderSummary Projector]                                        [Inventory Projector]
Updates: order_read_view table                                  Updates: inventory_view table
                   |                                                               |
                   +-------------------------------+-------------------------------+
                                                   v
[Client: GET /orders/summary/101] -> Reads directly from fast read view without joins!
        `)}

        <h3>8.3 Polyglot Implementation: DDD Aggregate & Event Sourcing</h3>
        <h5>Java 21 (Event-Sourced Bank Account Aggregate)</h5>
        ${buildCodeBlock('java', `
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

public class BankAccountAggregate {

    // Domain Events
    public sealed interface AccountEvent permits AccountCreated, FundsDeposited, FundsWithdrawn {}
    public record AccountCreated(UUID id, String owner) implements AccountEvent {}
    public record FundsDeposited(UUID id, long amountCents) implements AccountEvent {}
    public record FundsWithdrawn(UUID id, long amountCents) implements AccountEvent {}

    private UUID id;
    private long balanceCents;
    private final List<AccountEvent> uncommittedEvents = new ArrayList<>();

    public BankAccountAggregate() {}

    // Command: Withdraw
    public void withdraw(long amountCents) {
        if (amountCents <= 0) throw new IllegalArgumentException("Withdrawal must be positive");
        if (this.balanceCents < amountCents) throw new IllegalStateException("Insufficient funds");

        applyChange(new FundsWithdrawn(this.id, amountCents));
    }

    // Event Sourcing replay: Mutates state based on historical events
    public void apply(AccountEvent event) {
        switch (event) {
            case AccountCreated e -> { this.id = e.id(); this.balanceCents = 0; }
            case FundsDeposited e -> { this.balanceCents += e.amountCents(); }
            case FundsWithdrawn e -> { this.balanceCents -= e.amountCents(); }
        }
    }

    private void applyChange(AccountEvent event) {
        apply(event);
        uncommittedEvents.add(event);
    }

    public List<AccountEvent> getUncommittedEvents() { return uncommittedEvents; }
}
        `)}

        <h3>8.4 Enterprise Patterns Architectural Matrix</h3>
        ${buildComplexityTable(
          ['Pattern', 'Core Purpose', 'Consistency Model', 'Complexity Overhead'],
          [
            ['Domain-Driven Design (DDD)', 'Align software boundaries with business subdomains', 'Strong inside Aggregates, Eventual across Aggregates', 'Medium-High'],
            ['CQRS', 'Separate read and write data models for asymmetric scaling', 'Eventual consistency on read views', 'High (Requires projection sync)'],
            ['Event Sourcing', 'Persist entity state as an immutable sequence of state-change events', '100% complete historical audit trail', 'High (Requires snapshots / schema versioning)'],
            ['Unit of Work', 'Maintain a list of business objects affected by a transaction', 'ACID transaction batch commit', 'Medium (Built into Hibernate/Entity Framework)']
          ]
        )}

        <h3>8.5 Real-World Enterprise Case Study</h3>
        ${buildInsight('Netflix & Uber: Event Sourcing for Trip Auditing & Billing', `
          In Uber ride hail lifecycles, disputes frequently arise: did the driver arrive on time? When did the passenger cancel? Traditional databases that overwrite row state (<code>status = 'CANCELLED'</code>) lose complete temporal fidelity.
          Uber built an <strong>Event Sourced Trip Engine</strong>. Every lifecycle change (<code>DriverDispatched</code>, <code>RiderPickedUp</code>, <code>RouteRerouted</code>, <code>TripCompleted</code>) is persisted as an immutable event in an append-only log. The current state is simply a projection of the event stream, enabling exact time-travel replay and deterministic financial billing audits.
        `)}

        <h3>8.6 Interview Failure Modes & Gotchas</h3>
        ${buildWarning('The Entity vs Value Object Mutation Pitfall', `
          A classic junior architecture error is treating <code>Money</code> or <code>Address</code> as a mutable Entity with an <code>id</code>.
          If two customers share <code>Address { street: "123 Main St" }</code> as a mutable entity, updating customer A's address accidentally mutates customer B's address!
          Value objects must be <strong>strictly immutable</strong>: changes produce a brand new instance.
        `)}

        <h3>8.7 Practice Workshop Challenge</h3>
        ${buildAlgorithm('Challenge: Implement Aggregate Root Snapshotting Engine', `
          <strong>Problem:</strong> When an Event Sourced entity has 50,000 historical events, replaying the entire stream on every load creates unacceptable latency. Implement a snapshotting manager that saves a snapshot every 100 events and loads state by restoring the latest snapshot followed by replaying only subsequent delta events.
        `)}
      `
    }
  ]
};

module.exports = book113;
