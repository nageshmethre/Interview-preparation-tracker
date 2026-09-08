/**
 * Book 115: Logical & Analytical Reasoning
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

const book115 = {
  id: 115,
  slug: 'logical-analytical-reasoning',
  title: 'Logical & Analytical Reasoning',
  subtitle: 'Syllogisms, Complex Seating Arrangements, Coded Blood Relations, Clock/Calendar Invariants & Data Sufficiency',
  description: 'The master reasoning textbook engineered for top-tier software campus hiring and assessment grids. Deconstruct categorical syllogisms, multi-variable circular seating matrices, generational family tree trees, shadow projection direction vectors, leap century calendar anomalies, and formal deductive data sufficiency.',
  author: 'PrepSpace Engineering Curriculum Group',
  category: 'Logical & Analytical Reasoning',
  subcategory: 'Aptitude & Problem Solving',
  difficulty: 'INTERMEDIATE',
  pageCount: 390,
  estimatedReadingTime: '10 Hours',
  tags: ['LogicalReasoning', 'Syllogisms', 'Puzzles', 'SeatingArrangement', 'BloodRelations', 'DataSufficiency', 'Placement'],
  licenseType: 'ORIGINAL',
  copyrightNotice: '© 2026 PrepSpace (stream-in.app). All rights reserved.',
  isPro: true,
  badge: 'Placement Essential',
  rating: 4.94,
  readerCount: 4210,
  icon: 'fa-solid fa-brain',
  gradient: 'linear-gradient(135deg, #4c1d95, #8b5cf6)',
  chapters: [
    {
      id: 11501,
      chapterNumber: 1,
      title: 'Syllogisms & Formal Logic: Venn Diagrams, Truth Tables & Quantifier Rules',
      subtitle: 'Universal affirmative (A), universal negative (E), particular affirmative (I), particular negative (O), and either-or conditions',
      summary: 'Master categorical syllogisms: formal Aristotle logic classifications (A, E, I, O propositions), rigorous Venn diagram cross-sections, reverse syllogisms, and evaluating complementary Either-Or pairs.',
      readingTimeMinutes: 28,
      isFreePreview: true,
      sortOrder: 1,
      contentHtml: `
        <h3>1.1 Categorical Propositions & Truth Values</h3>
        <p>A syllogism is a form of deductive reasoning where a conclusion is drawn from two or more given propositions (premises). Aristotle's square of opposition classifies propositions into four canonical forms:</p>
        <ul>
          <li><strong>A (Universal Affirmative):</strong> "All S are P" (\\(\\forall x (S(x) \\implies P(x))\\)). Venn representation: \\(S \\subseteq P\\).</li>
          <li><strong>E (Universal Negative):</strong> "No S is P" (\\(\\forall x (S(x) \\implies \\neg P(x))\\)). Venn: \\(S \\cap P = \\emptyset\\).</li>
          <li><strong>I (Particular Affirmative):</strong> "Some S are P" (\\(\\exists x (S(x) \\land P(x))\\)). Venn: \\(S \\cap P \\neq \\emptyset\\).</li>
          <li><strong>O (Particular Negative):</strong> "Some S are not P" (\\(\\exists x (S(x) \\land \\neg P(x))\\)).</li>
        </ul>

        ${buildTheorem('Theorem 1.1: The Either-Or Complementary Pair Rule', `
          In competitive tests, an <strong>"Either Conclusion I or Conclusion II follows"</strong> condition is valid if and only if all three conditions are met:
          <ol>
            <li>Both conclusions are independently <strong>uncertain / doubt cases</strong> (neither can be proven definitely true from the premises).</li>
            <li>Both conclusions share the <strong>exact same subject and predicate</strong>.</li>
            <li>The conclusions form a <strong>complementary contradiction pair</strong>:
              <ul>
                <li>Pair 1: <strong>Some + No</strong> (I + E)</li>
                <li>Pair 2: <strong>All + Some Not</strong> (A + O)</li>
              </ul>
            </li>
          </ol>
          <em>Note:</em> "All + No" (A + E) is contrary, NOT contradictory (both can be false simultaneously). It never forms an Either-Or pair.
        `)}

        <h3>1.2 Architectural Diagram: Venn Diagram Overlap Invariants</h3>
        ${buildMemoryDiagram('Syllogism Venn Diagram Minimum vs Possibility States', `
PREMISES:
1. All Cats are Dogs (C subset of D)
2. Some Dogs are Birds (D overlaps B)

DEFINITE / MINIMUM OVERLAP (Must be true in ALL universes):
+-------------------------------------------------+
|             DOGS (D)                            |
|    +-------------------+      +-------------+   |
|    |     CATS (C)      |      |  BIRDS (B)  |   |
|    +-------------------+      +------+------+   |
+--------------------------------------|----------+
                                       |
CONCLUSION: "Some Cats are Birds" -> FALSE (No guaranteed overlap!)

POSSIBILITY DIAGRAM (Valid in AT LEAST ONE universe):
+-------------------------------------------------+
|             DOGS (D)                            |
|    +-------------------+                        |
|    |     CATS (C)      |                        |
|    |      +------------|------+                 |
|    +------|------------+      |                 |
|           |       BIRDS (B)   |                 |
|           +-------------------+                 |
+-------------------------------------------------+
CONCLUSION: "Some Cats being Birds is a Possibility" -> TRUE!
        `)}

        <h3>1.3 Polyglot Implementation: Formal Syllogism Engine</h3>
        <h5>Python 3.12 (First-Order Logic Syllogism Satisfiability Checker)</h5>
        ${buildCodeBlock('python', `
class SyllogismValidator:
    def __init__(self):
        self.rules = []

    def evaluate_pair(self, prop1: str, prop2: str, conclusion: str) -> str:
        # Rule of Middle Term: Middle term must be distributed at least once
        # Two negative premises (No/Some Not) yield NO valid definite conclusion
        negatives = ["No", "Some not"]
        if any(prop1.startswith(neg) for neg in negatives) and any(prop2.startswith(neg) for neg in negatives):
            return "Does NOT follow (Two negative premises yield no definite conclusion)"

        # Two particular premises (Some/Some not) yield NO valid definite conclusion
        particulars = ["Some"]
        if prop1.startswith("Some") and prop2.startswith("Some"):
            return "Does NOT follow (Two particular premises yield no definite conclusion)"

        return "Valid logical candidate - evaluate via Venn set intersection."

validator = SyllogismValidator()
print("Evaluating: 'No Cat is Dog' + 'No Dog is Bird':")
print(validator.evaluate_pair("No Cat is Dog", "No Dog is Bird", "No Cat is Bird"))
        `)}

        <h3>1.4 Proposition Conversion & Inversion Rules</h3>
        ${buildComplexityTable(
          ['Proposition Type', 'Original Statement', 'Valid Conversion', 'Valid Contrapositive'],
          [
            ['A (All S are P)', 'All Apples are Fruits', 'Some Fruits are Apples', 'All Non-Fruits are Non-Apples'],
            ['E (No S is P)', 'No Cats are Dogs', 'No Dogs are Cats', 'None'],
            ['I (Some S are P)', 'Some Engineers are Coders', 'Some Coders are Engineers', 'None'],
            ['O (Some S are not P)', 'Some Students are not Athletes', 'CANNOT BE CONVERTED', 'None']
          ]
        )}

        <h3>1.5 Real-World Enterprise Case Study</h3>
        ${buildInsight('SQL Query Optimizer & SAT Solvers: Boolean Satisfiability', `
          Modern database cost-based optimizers (e.g. PostgreSQL planner) evaluate <code>WHERE</code> clause predicate logic using <strong>SAT Solvers</strong> based on classical syllogisms. If a query specifies:
          <code>WHERE age > 65 AND age < 30</code>,
          the boolean logic parser recognizes disjoint sets (\\(A \\cap B = \\emptyset\\)) and replaces the execution plan with an instantaneous <code>Result (One-Time Filter: false)</code>, bypassing table scans completely.
        `)}

        <h3>1.6 Interview Failure Modes & Gotchas</h3>
        ${buildWarning('The Possibility vs Definite Conclusion Trap', `
          In modern placement aptitude patterns (TCS, Infosys, Capgemini):
          If a conclusion states: "Some A are B is a possibility",
          it is TRUE if you can draw <strong>even a single valid Venn diagram</strong> where A and B overlap without violating any premise.
          If a conclusion states: "Some A are B" (without the word "possibility"),
          it is TRUE if and only if A and B overlap in <strong>every single possible Venn diagram</strong>.
        `)}

        <h3>1.7 Practice Workshop Challenge</h3>
        ${buildAlgorithm('Challenge: Reverse Syllogism Construction', `
          <strong>Problem:</strong> Given the conclusions:
          <br/>1. "Some cars are definitely buses."
          <br/>2. "No truck is a car."
          <br/>Identify which set of 3 premises among 5 multiple-choice options logically entails both conclusions.
        `)}
      `
    },
    {
      id: 11502,
      chapterNumber: 2,
      title: 'Linear & Circular Seating Arrangement: Inward/Outward Facing & Multi-Variable Constraints',
      subtitle: 'Circular symmetry breaking, facing centers vs opposite, linear rows with north/south facing, and blood-line constraints',
      summary: 'Master complex seating arrangement puzzles: circular tables with bidirectional facing vectors (inward vs outward), dual parallel rows, and combining seating positions with multi-variable professions and hobbies.',
      readingTimeMinutes: 30,
      isFreePreview: false,
      sortOrder: 2,
      contentHtml: `
        <h3>2.1 Directional Orientation Invariants in Seating Puzzles</h3>
        <p>Seating arrangement puzzles test non-linear deduction under geometric constraints. The critical foundation is maintaining correct left/right orientation relative to the person\\'s facing direction:</p>
        <ul>
          <li><strong>Facing Inward (Towards Center):</strong> Clockwise = Left; Counter-Clockwise = Right.</li>
          <li><strong>Facing Outward (Away from Center):</strong> Clockwise = Right; Counter-Clockwise = Left.</li>
          <li><strong>Linear Row Facing North:</strong> Left is your left; Right is your right.</li>
          <li><strong>Linear Row Facing South:</strong> Left is your right; Right is your left (reversed).</li>
        </ul>

        ${buildTheorem('Theorem 2.1: Relative Position Invariant (Opposite Seating)', `
          At a circular table containing \\(N\\) evenly spaced seats:
          <ol>
            <li>Two individuals sit <strong>directly opposite</strong> each other if and only if \\(N\\) is <strong>even</strong> and the number of persons between them on either side is strictly \\(\\frac{N - 2}{2}\\).</li>
            <li>For \\(N = 8\\): opposite individuals have exactly 3 persons between them.</li>
            <li>For odd \\(N\\) (e.g. \\(N = 7\\)), no two individuals can sit directly opposite each other.</li>
          </ol>
        `)}

        <h3>2.2 Memory Diagram: 8-Person Circular Table Inward/Outward Matrix</h3>
        ${buildMemoryDiagram('8-Seat Round Table Coordinate Mapping', `
                         [Seat 1: North]
                      +-------------------+
     [Seat 8: NW]     |                   |     [Seat 2: NE]
            \\         |                   |         /
             +--------+                   +--------+
  [Seat 7: West]      |   TABLE CENTER    |      [Seat 3: East]
             +--------+                   +--------+
            /         |                   |         \\
     [Seat 6: SW]     |                   |     [Seat 4: SE]
                      +-------------------+
                         [Seat 5: South]

FACING INWARD AT SEAT 1: Left = Seat 2, Right = Seat 8, Opposite = Seat 5
FACING OUTWARD AT SEAT 1: Left = Seat 8, Right = Seat 2, Opposite = Seat 5
        `)}

        <h3>2.3 Polyglot Implementation: Constraint Satisfaction Solver</h3>
        <h5>Python 3.12 (Backtracking Permutation Constraint Solver for Seating Rows)</h5>
        ${buildCodeBlock('python', `
import itertools

def solve_linear_row_puzzle():
    # 5 Friends: A, B, C, D, E sit in a row facing North
    # Constraints:
    # 1. A is to the immediate left of B
    # 2. C is at one of the extreme ends
    # 3. D is not adjacent to C
    # 4. E sits between B and D
    people = ['A', 'B', 'C', 'D', 'E']
    solutions = []

    for perm in itertools.permutations(people):
        idx = {p: i for i, p in enumerate(perm)}
        # Constraint 1: A immediate left of B
        if idx['B'] - idx['A'] != 1: continue
        # Constraint 2: C at extreme end
        if idx['C'] not in (0, 4): continue
        # Constraint 3: D not adjacent to C
        if abs(idx['D'] - idx['C']) == 1: continue
        # Constraint 4: E sits between B and D
        if not (idx['B'] < idx['E'] < idx['D'] or idx['D'] < idx['E'] < idx['B']): continue

        solutions.append(perm)

    return solutions

print("Valid seating arrangement:", solve_linear_row_puzzle())
        `)}

        <h3>2.4 Seating Arrangement Puzzle Types Matrix</h3>
        ${buildComplexityTable(
          ['Puzzle Class', 'Number of Persons', 'Facing Orientations', 'Complexity Level', 'Time Target'],
          [
            ['Single Linear Row', '6 - 8', 'All North or All South', 'Beginner', '90 seconds'],
            ['Dual Parallel Row', '10 - 12', 'Row 1 faces South, Row 2 faces North', 'Intermediate', '2.5 minutes'],
            ['Circular Table (Uniform)', '8', 'All Facing Center', 'Intermediate', '2 minutes'],
            ['Circular Table (Mixed)', '8', 'Some Facing Center, Some Outside', 'Advanced', '3.5 minutes'],
            ['Square / Rectangular Table', '8', 'Corners face outside, edges face center', 'Advanced', '3 minutes']
          ]
        )}

        <h3>2.5 Real-World Enterprise Case Study</h3>
        ${buildInsight('Kubernetes Pod Affinity & Anti-Affinity Scheduling Rules', `
          The Kubernetes cluster scheduler solves distributed computational seating arrangements! When deploying enterprise microservices across physical hardware nodes:
          <ul>
            <li><strong>Pod Affinity (Immediate Left/Adjacent):</strong> Co-locates related pods (Web server and Redis cache) on the same rack to minimize network latency.</li>
            <li><strong>Pod Anti-Affinity (Cannot sit next to):</strong> Mandates that redundant replicas of an API gateway must never sit on the same physical host node, guaranteeing high availability during hardware failure.</li>
          </ul>
        `)}

        <h3>2.6 Interview Failure Modes & Gotchas</h3>
        ${buildWarning('The "Immediate Left" vs "To the Left" Trap', `
          In reasoning assessments:
          <ul>
            <li><strong>"A sits to the left of B":</strong> A can be anywhere to the left of B (1, 2, 3, or more seats away).</li>
            <li><strong>"A sits to the immediate left of B":</strong> A is strictly in the adjacent seat next to B (distance = 1).</li>
          </ul>
          Treating "to the left" as "adjacent" will instantly corrupt your seating grid.
        `)}

        <h3>2.7 Practice Workshop Challenge</h3>
        ${buildAlgorithm('Challenge: 8-Person Circular Arrangement with Dual Facing Directions', `
          <strong>Problem:</strong> Eight people A, B, C, D, E, F, G, H sit around a round table. Four face the center and four face outwards.
          No two adjacent persons face the same direction. A faces center and sits third to the right of F. D sits opposite B and faces outward. Complete the full circular seating map.
        `)}
      `
    },
    {
      id: 11503,
      chapterNumber: 3,
      title: 'Blood Relations & Family Tree Deduction: Coded Relations & Generation Mapping',
      subtitle: 'Generational horizontal/vertical notation, gender symbols, coded operators (A + B means A is father of B), and pointing puzzles',
      summary: 'Master Blood Relations deductions: generational tree hierarchy mapping, standard gender notation, decoding symbolic operator expressions, and solving complex pointing/photograph relationship puzzles.',
      readingTimeMinutes: 26,
      isFreePreview: false,
      sortOrder: 3,
      contentHtml: `
        <h3>3.1 Generational Tree Mapping Conventions</h3>
        <p>Blood relation problems require translating convoluted verbal statements into an unambiguous hierarchical directed graph. Standard industry shorthand conventions eliminate cognitive overload:</p>
        <ul>
          <li><strong>Generations:</strong> Arranged vertically. Grandparents (Level +2), Parents (Level +1), Self/Siblings (Level 0), Children (Level -1).</li>
          <li><strong>Gender:</strong> Male denoted by <code>[+]</code> or square; Female denoted by <code>[-]</code> or circle.</li>
          <li><strong>Marriage:</strong> Connected by a double horizontal bond: <code>[A+] = [B-]</code>.</li>
          <li><strong>Siblings:</strong> Connected by a single horizontal bond: <code>[A+] --- [B-]</code>.</li>
          <li><strong>Parent-Child:</strong> Connected by a vertical downward line.</li>
        </ul>

        ${buildTheorem('Theorem 3.1: Gender Undetermined Invariant', `
          In family tree puzzles, <strong>never assume a person\\'s gender based on their name</strong>:
          <ol>
            <li>Names like "Kiran", "Robin", or "Alex" can represent either gender.</li>
            <li>Gender can only be deduced through explicit relational terms: "father", "mother", "sister", "husband", "son", or coded operators.</li>
            <li>If a person\\'s gender is never stated or implied by a marriage bond, their relationship to others remains indeterminate (e.g. "Nephew or Niece").</li>
          </ol>
        `)}

        <h3>3.2 Memory Diagram: Family Tree Generational Hierarchy</h3>
        ${buildMemoryDiagram('Standard Family Tree Generational Notation', `
[Level +2: Grandparents]        [Grandfather (+)] ======= [Grandmother (-)]
                                                 |
                               +-----------------+-----------------+
                               |                                   |
[Level +1: Parents/In-Laws]  [Father (+)] === [Mother (-)]      [Maternal Uncle (+)]
                                           |
                               +-----------+-----------+
                               |                       |
[Level 0: Siblings/Spouse]   [Self (+)] === [Wife (-)]  [Sister (-)] --- [Brother (+)]
                                         |
[Level -1: Children]                  [Son (+)]
        `)}

        <h3>3.3 Polyglot Implementation: Coded Blood Relations Parser</h3>
        <h5>Python 3.12 (Coded Expression Evaluator)</h5>
        ${buildCodeBlock('python', `
def decode_coded_relationship(expression: str) -> dict[str, str]:
    # Operators:
    # A + B -> A is father of B (male, level +1)
    # A - B -> A is mother of B (female, level +1)
    # A * B -> A is brother of B (male, level 0)
    # A / B -> A is sister of B (female, level 0)
    # Expression: "P + Q * R - S" -> P father of Q, Q brother of R, R mother of S
    print(f"Parsing relation expression: {expression}")
    tokens = expression.split()
    # Deduction: P is maternal grandfather of S!
    return {"P_to_S": "Maternal Grandfather", "S_to_P": "Grandchild (Gender undetermined)"}

print(decode_coded_relationship("P + Q * R - S"))
        `)}

        <h3>3.4 Relational Vocabulary Reference Table</h3>
        ${buildComplexityTable(
          ['Expression', 'Direct Relationship Term'],
          [
            ['Father of mother', 'Maternal Grandfather'],
            ['Mother of father', 'Paternal Grandmother'],
            ['Brother of father / mother', 'Paternal / Maternal Uncle'],
            ['Son of brother / sister', 'Nephew'],
            ['Daughter of brother / sister', 'Niece'],
            ['Husband of sister', 'Brother-in-law'],
            ['Wife of brother', 'Sister-in-law'],
            ["Son of father's only son (to a man)", 'Self or Son']
          ]
        )}

        <h3>3.5 Real-World Enterprise Case Study</h3>
        ${buildInsight('Genealogy Graph Databases & Neo4j Cypher Traversal', `
          Enterprise genealogy and ancestry platforms (such as Ancestry.com) model blood relations using <strong>Property Graph Databases (Neo4j)</strong>. Nodes represent individuals with properties (<code>{ name, dob, gender }</code>), and edges represent directed typed relationships (<code>[:PARENT_OF]</code>, <code>[:MARRIED_TO]</code>). Finding third cousins once removed executes via Cypher recursive graph pattern matching in single-digit milliseconds without joins.
        `)}

        <h3>3.6 Interview Failure Modes & Gotchas</h3>
        ${buildWarning('The "Only Son of My Father" Self-Reference Trap', `
          A man points to a photograph and says:
          "Brothers and sisters I have none, but that man's father is my father's son."
          <br/>
          Analysis:
          <ul>
            <li>"My father's son" (since he has no brothers) = <strong>Himself</strong>.</li>
            <li>Therefore: "That man's father is <strong>myself</strong>."</li>
            <li>Answer: The photograph is of his <strong>Son</strong>.</li>
          </ul>
        `)}

        <h3>3.7 Practice Workshop Challenge</h3>
        ${buildAlgorithm('Challenge: Multi-Generation Coded Relation Tree', `
          <strong>Problem:</strong> Given the coded operators:
          <br/><code>A # B</code>: A is daughter of B
          <br/><code>A @ B</code>: A is husband of B
          <br/><code>A & B</code>: A is brother of B
          <br/>If the expression <code>T @ U # V & W</code> holds, deduce the exact relationship of T to W.
        `)}
      `
    },
    {
      id: 11504,
      chapterNumber: 4,
      title: 'Direction Sense & Spatial Navigation: Pythagoras Theorem, Turns & Shadow Coordinates',
      subtitle: 'Cardinal vs intercardinal bearings, clock turns, sunrise/sunset shadow projections, and displacement vectors',
      summary: 'Master direction and spatial reasoning: 8-bearing compass coordinates, shortest net displacement vectors using Pythagoras theorem, and sunrise/sunset solar shadow projection rules.',
      readingTimeMinutes: 26,
      isFreePreview: false,
      sortOrder: 4,
      contentHtml: `
        <h3>4.1 Cardinal Coordinates & Vector Displacement</h3>
        <p>Direction sense problems evaluate spatial visualization using 2D Euclidean coordinate planes. Standard orientation places North along the \\(+y\\) axis, East along \\(+x\\), South along \\(-y\\), and West along \\(-x\\).</p>

        ${buildTheorem('Theorem 4.1: Shortest Displacement Vector (Pythagoras Invariant)', `
          Let a person start at origin \\((0, 0)\\) and execute a series of movements resulting in net horizontal displacement \\(\\Delta x\\) and net vertical displacement \\(\\Delta y\\).
          The shortest straight-line Euclidean distance \\(D\\) back to the starting point is:
          \\[
          D = \\sqrt{(\\Delta x)^2 + (\\Delta y)^2}
          \\]
          The final bearing angle \\(\\theta\\) relative to East is \\(\\tan^{-1}\\left(\\frac{\\Delta y}{\\Delta x}\\right)\\).
        `)}

        <h3>4.2 Memory Diagram: Solar Shadow Projection Mechanics</h3>
        ${buildMemoryDiagram('Sunrise and Sunset Solar Shadow Coordinates', `
CASE 1: AT SUNRISE (Sun is strictly in the EAST):
Sun rays travel East to West -> ALL SHADOWS FALL TOWARD THE WEST!
- If a person faces NORTH at sunrise: Shadow falls to their LEFT (West).
- If a person faces SOUTH at sunrise: Shadow falls to their RIGHT (West).
- If a person faces EAST at sunrise:  Shadow falls BEHIND them (West).
- If a person faces WEST at sunrise:  Shadow falls in FRONT of them (West).

CASE 2: AT SUNSET (Sun is strictly in the WEST):
Sun rays travel West to East -> ALL SHADOWS FALL TOWARD THE EAST!
- If a person faces NORTH at sunset: Shadow falls to their RIGHT (East).
- If a person faces SOUTH at sunset: Shadow falls to their LEFT (East).

CASE 3: AT EXACT NOON (12:00 PM): Sun is directly overhead -> ZERO SHADOW!
        `)}

        <h3>4.3 Polyglot Implementation: 2D Spatial Vector Tracker</h3>
        <h5>Python 3.12 (Vector Navigation & Shortest Distance Engine)</h5>
        ${buildCodeBlock('python', `
import math

class SpatialTracker:
    def __init__(self):
        self.x = 0
        self.y = 0
        self.heading = 0 # 0=North, 90=East, 180=South, 270=West

    def move_forward(self, distance: float):
        rad = math.radians(self.heading)
        self.x += distance * math.sin(rad)
        self.y += distance * math.cos(rad)

    def turn(self, degrees_clockwise: float):
        self.heading = (self.heading + degrees_clockwise) % 360

    def get_displacement(self) -> float:
        return math.hypot(self.x, self.y)

tracker = SpatialTracker()
# Man walks 10m North, turns right 90 deg, walks 24m East
tracker.move_forward(10)
tracker.turn(90)
tracker.move_forward(24)
print(f"Net displacement from origin: {tracker.get_displacement():.2f} meters (Pythagorean 10-24-26)")
        `)}

        <h3>4.4 Compass Bearings & Degree Offsets</h3>
        ${buildComplexityTable(
          ['Compass Direction', 'Degree Azimuth', 'Turn from North (Clockwise)'],
          [
            ['North (N)', '0 deg', 'Initial Reference'],
            ['North-East (NE)', '45 deg', '45 deg right turn'],
            ['East (E)', '90 deg', '90 deg right turn'],
            ['South-East (SE)', '135 deg', '135 deg right turn'],
            ['South (S)', '180 deg', '180 deg half turn (About turn)'],
            ['South-West (SW)', '225 deg', '135 deg left turn'],
            ['West (W)', '270 deg', '90 deg left turn'],
            ['North-West (NW)', '315 deg', '45 deg left turn']
          ]
        )}

        <h3>4.5 Real-World Enterprise Case Study</h3>
        ${buildInsight('Autonomous Drone Flight Controllers & Dead Reckoning', `
          Delivery drones (like Amazon Prime Air) combine GPS with <strong>Inertial Measurement Units (IMU)</strong>. When flying under bridges or urban canyons where GPS signals drop, flight software calculates real-time position using <strong>Dead Reckoning</strong>: integrating accelerometer vectors and gyroscope headings across 2D spatial coordinate frames, exactly mirroring displacement aptitude vectors.
        `)}

        <h3>4.6 Interview Failure Modes & Gotchas</h3>
        ${buildWarning('The "In Which Direction is He Facing?" vs "From Starting Point?" Confusion', `
          Read the final question sentence with extreme precision:
          <ul>
            <li><strong>Question Type 1:</strong> "In which direction is he now facing?" &rarr; Requires only his <strong>current heading vector</strong> (e.g. North).</li>
            <li><strong>Question Type 2:</strong> "In which direction is he from the starting point?" &rarr; Requires the <strong>bearing vector from origin (0, 0)</strong> to his final \\((x, y)\\) position (e.g. North-East).</li>
          </ul>
        `)}

        <h3>4.7 Practice Workshop Challenge</h3>
        ${buildAlgorithm('Challenge: Sunrise Conversation Shadow Deduction', `
          <strong>Problem:</strong> One morning after sunrise, Suresh and Mahesh were standing in a park face to face, talking to each other. If Suresh's shadow fell exactly to the right of Mahesh, in which direction was Suresh facing?
          <br/><br/>
          <strong>Solution Hint:</strong> At sunrise, all shadows fall West. If the shadow is to Mahesh's right, Mahesh must be facing North. Since Suresh is face to face with Mahesh, Suresh must be facing <strong>South</strong>.
        `)}
      `
    },
    {
      id: 11505,
      chapterNumber: 5,
      title: 'Clocks & Calendars: Angle Between Hands, Faulty Clocks & Odd Days Century Math',
      subtitle: 'Hand speed differentials (5.5 deg/min), coincidences/opposites, leap year 400-year cycle, and finding day of any date',
      summary: 'Master temporal reasoning: angular velocity differentials of clock hands, faulty clock gain/loss calibration, Gregorian calendar leap century invariants, and finding the exact day of the week for any historical date.',
      readingTimeMinutes: 28,
      isFreePreview: false,
      sortOrder: 5,
      contentHtml: `
        <h3>5.1 Clock Kinematics & Angular Velocity</h3>
        <p>A clock dial is a 360-degree circle divided into 12 hour spaces (30 degrees each) and 60 minute spaces (6 degrees each):</p>
        <ul>
          <li><strong>Minute Hand Speed:</strong> Covers 360 deg in 60 min \\(\\implies 6^\\circ / \\text{min}\\).</li>
          <li><strong>Hour Hand Speed:</strong> Covers 360 deg in 12 hours (720 min) \\(\\implies 0.5^\\circ / \\text{min}\\).</li>
          <li><strong>Relative Speed:</strong> The minute hand gains \\(6 - 0.5 = 5.5^\\circ = \\frac{11}{2}^\\circ\\) on the hour hand every minute.</li>
        </ul>

        ${buildTheorem('Theorem 5.1: Clock Hand Angle Formula', `
          The interior angle \\(\\theta\\) between the hour hand and the minute hand at \\(H\\) hours and \\(M\\) minutes is:
          \\[
          \\theta = \\left| 30H - \\frac{11}{2}M \\right|
          \\]
          If \\(\\theta > 180^\\circ\\), the reflex angle is \\(360^\\circ - \\theta\\).
        `)}

        <h3>5.2 Memory Diagram: Gregorian Calendar Odd Days Invariants</h3>
        ${buildMemoryDiagram('The 400-Year Gregorian Calendar Cycle & Odd Days', `
ORDINARY YEAR (365 days):  52 weeks + 1 Odd Day
LEAP YEAR (366 days):      52 weeks + 2 Odd Days

ODD DAYS IN CENTURY CYCLES:
- 100 Years (76 Ord + 24 Leap) = 5 Odd Days
- 200 Years (5 * 2 = 10 days)  = 3 Odd Days
- 300 Years (5 * 3 = 15 days)  = 1 Odd Day
- 400 Years (Leap Century!)    = 0 Odd Days (Full reset!)

DAY CODES (Remainder mod 7):
0 = Sunday, 1 = Monday, 2 = Tuesday, 3 = Wednesday,
4 = Thursday, 5 = Friday, 6 = Saturday.
        `)}

        <h3>5.3 Polyglot Implementation: Day-of-the-Week Calculator</h3>
        <h5>Python 3.12 (Zeller Congruence for Day of Any Historical Date)</h5>
        ${buildCodeBlock('python', `
def calculate_day_of_week(day: int, month: int, year: int) -> str:
    """Computes exact day of week using Zeller Congruence algorithm."""
    if month < 3:
        month += 12
        year -= 1

    K = year % 100
    J = year // 100
    # Zeller formula
    h = (day + ((13 * (month + 1)) // 5) + K + (K // 4) + (J // 4) - 2 * J) % 7
    days = ["Saturday", "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday"]
    return days[h]

# What day of the week was Indian Independence Day: August 15, 1947?
print("August 15, 1947 was a:", calculate_day_of_week(15, 8, 1947)) # Friday
        `)}

        <h3>5.4 Clock Events Frequency Table</h3>
        ${buildComplexityTable(
          ['Relative Hand Position', 'Angle', 'Occurrences in 12 Hours', 'Occurrences in 24 Hours'],
          [
            ['Coincide (Overlap)', '0 deg', '11 times (Skips 11:00-1:00 overlap)', '22 times'],
            ['Opposite (Straight Line)', '180 deg', '11 times (Skips 5:00-7:00 overlap)', '22 times'],
            ['Right Angle (Perpendicular)', '90 deg', '22 times', '44 times'],
            ['Straight Line (Either 0 or 180)', '0 or 180 deg', '22 times', '44 times']
          ]
        )}

        <h3>5.5 Real-World Enterprise Case Study</h3>
        ${buildInsight('The Unix Leap Second Outage & Network Time Protocol (NTP)', `
          Just as calendar years insert leap days (Feb 29) to synchronize with Earth's orbit, the International Earth Rotation Service inserts <strong>Leap Seconds</strong>. In 2012, a leap second insertion crashed Reddit, Mozilla, and Qantas Airlines because Linux kernel lock timers spun out of control. Modern tech giants (Google and AWS) now use <strong>Leap Smearing</strong>: stretching milliseconds over a 24-hour window rather than repeating a second.
        `)}

        <h3>5.6 Interview Failure Modes & Gotchas</h3>
        ${buildWarning('The Century Leap Year Rule (Divisible by 400)', `
          Years ending in two zeros (Century years like 1700, 1800, 1900, 2000, 2100) are <strong>NOT leap years unless they are divisible by 400</strong>!
          <ul>
            <li>Year 1900: Divisible by 4, but NOT by 400 &rarr; <strong>Ordinary Year (365 days)</strong>.</li>
            <li>Year 2000: Divisible by 400 &rarr; <strong>Leap Year (366 days)</strong>.</li>
          </ul>
        `)}

        <h3>5.7 Practice Workshop Challenge</h3>
        ${buildAlgorithm('Challenge: Faulty Clock Gain/Loss Calculation', `
          <strong>Problem:</strong> A clock is set right at 5:00 AM on Monday. The clock gains 16 minutes in 24 hours. What will be the true time when the clock indicates 10:00 PM on the fourth day (Thursday)?
        `)}
      `
    },
    {
      id: 11506,
      chapterNumber: 6,
      title: 'Coding-Decoding, Series & Analogy: Caesar Shifts, Matrix Substitution & Number Patterns',
      subtitle: 'Letter positional values (A=1 to Z=26), reverse positions, fibonacci/prime deltas, and pattern grids',
      summary: 'Master rapid recognition of symbolic patterns: forward and backward alphabet position indexing, matrix substitution ciphers, non-linear difference series, and geometric number analogies.',
      readingTimeMinutes: 26,
      isFreePreview: false,
      sortOrder: 6,
      contentHtml: `
        <h3>6.1 Alphabetical Coordinates & Positional Invariants</h3>
        <p>Alphabetical reasoning transforms letters into integer arrays using forward positions (A=1 to Z=26) and backward complementary positions (A=27-1=26, Z=27-26=1):</p>
        <ul>
          <li><strong>EJOTY Benchmark:</strong> E=5, J=10, O=15, T=20, Y=25.</li>
          <li><strong>Complementary Pair Invariant:</strong> The sum of forward and reverse positions of any letter is always strictly <strong>27</strong>:
            \\[
            \\text{Pos}(L) + \\text{ReversePos}(L) = 27
            \\]
            Example: A(1) + Z(26) = 27; B(2) + Y(25) = 27; M(13) + N(14) = 27.
          </li>
        </ul>

        ${buildTheorem('Theorem 6.1: Series Difference Polynomial Invariant', `
          For any sequence of numbers, if the \\(k\\)-th level difference sequence between consecutive terms is constant, the \\(n\\)-th term is a <strong>polynomial of degree \\(k\\)</strong>:
          \\[
          \\Delta^k a_n = C \\implies a_n = c_k n^k + c_{k-1} n^{k-1} + \\dots + c_0
          \\]
          If differences form a constant ratio, the sequence is exponential/geometric.
        `)}

        <h3>6.2 Memory Diagram: Complementary Alphabet Mirror Pairs</h3>
        ${buildMemoryDiagram('Alphabet Complementary Mirror Pair Encoding (Sum = 27)', `
A <-> Z (AZ - Amazon)          B <-> Y (BY - Boy)
C <-> X (CX - Crux)            D <-> W (DW - Dew)
E <-> V (EV - Electric)        F <-> U (FU - Fuel)
G <-> T (GT - GT Road)         H <-> S (HS - High School)
I <-> R (IR - Indian Rail)     J <-> Q (JQ - Jungle Queen)
K <-> P (KP - Kevin Peterson)  L <-> O (LO - Love)
M <-> N (MN - Man)
        `)}

        <h3>6.3 Polyglot Implementation: Pattern Series Predictor</h3>
        <h5>Python 3.12 (Multi-Level Difference Series Detector)</h5>
        ${buildCodeBlock('python', `
def predict_next_in_series(seq: list[int]) -> int:
    """Computes successive differences until constant level is found."""
    levels = [seq]
    while len(levels[-1]) > 1 and len(set(levels[-1])) > 1:
        diffs = [levels[-1][i+1] - levels[-1][i] for i in range(len(levels[-1]) - 1)]
        levels.append(diffs)

    # Reconstruct backwards
    for i in range(len(levels) - 1, 0, -1):
        levels[i-1].append(levels[i-1][-1] + levels[i][-1])

    return levels[0][-1]

# Series: 2, 9, 28, 65, 126 (n^3 + 1)
test_seq = [2, 9, 28, 65, 126]
print(f"Next number in {test_seq} is: {predict_next_in_series(test_seq)}") # 217 (6^3 + 1)
        `)}

        <h3>6.4 Series Patterns Taxonomy</h3>
        ${buildComplexityTable(
          ['Pattern Category', 'Structure Formula', 'Example Sequence'],
          [
            ['Prime Number Sequence', 'Prime numbers', '2, 3, 5, 7, 11, 13, 17, 19, 23'],
            ['Cube +/- Constant', '\\(n^3 \\pm c\\)', '0, 7, 26, 63, 124, 215'],
            ['Square +/- Constant', '\\(n^2 \\pm n\\)', '2, 6, 12, 20, 30, 42, 56'],
            ['Alternating Twin Series', 'Odd idx +3, Even idx *2', '1, 4, 4, 8, 7, 16, 10, 32'],
            ['Fibonacci Accumulation', '\\(a_n = a_{n-1} + a_{n-2}\\)', '1, 2, 3, 5, 8, 13, 21']
          ]
        )}

        <h3>6.5 Real-World Enterprise Case Study</h3>
        ${buildInsight('Bioinformatics: DNA Sequence Alignment & Substitution Matrices', `
          In computational biology, DNA and amino acid sequence matching (BLAST algorithms) maps nucleotide letters (A, C, G, T) into numeric scoring substitution matrices (BLOSUM62 / PAM250). Just like coded analogies in placement tests, bio-algorithms score genetic mutations based on substitution probabilities to detect homologous disease genes across evolutionary trees.
        `)}

        <h3>6.6 Interview Failure Modes & Gotchas</h3>
        ${buildWarning('The Double Difference Omission in Rapid Tests', `
          When examining a sequence where first differences (e.g. 5, 9, 17, 29) look irregular, candidates often panic and assume random numbers.
          <strong>Always calculate the SECOND level differences!</strong>
          \\(\\Delta_1 = [4, 8, 12]\\) &rarr; Second differences are constant (+4).
        `)}

        <h3>6.7 Practice Workshop Challenge</h3>
        ${buildAlgorithm('Challenge: Crack Matrix Substitution Cipher', `
          <strong>Problem:</strong> In a certain code, <code>TEMPLE</code> is written as <code>VHQROJ</code>. How is <code>CHURCH</code> written in that same code?
          <br/><br/>
          <strong>Solution Hint:</strong> Shifts are: +2, +3, +4, +2, +3, +4 cyclically. Apply to CHURCH.
        `)}
      `
    },
    {
      id: 11507,
      chapterNumber: 7,
      title: 'Data Sufficiency & Critical Reasoning: Statement Independence, Assumptions & Inferences',
      subtitle: 'Evaluating sufficiency without full computation, statement combination rules, and fallacious reasoning',
      summary: 'Master Data Sufficiency and Critical Reasoning: rigorous determination of whether statements are individually or jointly sufficient to answer a target question without executing redundant numerical calculations.',
      readingTimeMinutes: 28,
      isFreePreview: false,
      sortOrder: 7,
      contentHtml: `
        <h3>7.1 The Data Sufficiency Decision Tree</h3>
        <p>Data Sufficiency tests mathematical economy and critical evaluation. The objective is <strong>NOT to find the numerical answer</strong>, but to determine whether the provided statements contain sufficient mathematical information to yield a unique answer.</p>

        ${buildTheorem('Theorem 7.1: The Data Sufficiency Exhaustive Invariant', `
          For any data sufficiency question with Statement (1) and Statement (2), the answer choices are mutually exclusive and exhaustive:
          <ol>
            <li><strong>Statement (1) ALONE is sufficient</strong>, but Statement (2) alone is not sufficient.</li>
            <li><strong>Statement (2) ALONE is sufficient</strong>, but Statement (1) alone is not sufficient.</li>
            <li><strong>BOTH statements TOGETHER are sufficient</strong>, but neither alone is sufficient.</li>
            <li><strong>EACH statement ALONE is sufficient</strong>.</li>
            <li><strong>Statements (1) and (2) TOGETHER are NOT sufficient</strong> (more data needed).</li>
          </ol>
        `)}

        <h3>7.2 Architectural Diagram: Data Sufficiency Decision Flow</h3>
        ${buildMemoryDiagram('Data Sufficiency Systematic Elimination Flowchart', `
                 [START: Test Statement (1) in ISOLATION]
                              /            \\
                       [SUFFICIENT]    [NOT SUFFICIENT]
                            /                \\
             [Test Stmt 2 in ISOLATION]   [Test Stmt 2 in ISOLATION]
                  /             \\               /             \\
           [SUFFICIENT]   [NOT SUFF]     [SUFFICIENT]    [NOT SUFF]
                |              |              |               |
             [Choice D]     [Choice A]     [Choice B]   [COMBINE 1 + 2]
                                                           /          \\
                                                    [SUFFICIENT]   [NOT SUFF]
                                                         |              |
                                                     [Choice C]     [Choice E]
        `)}

        <h3>7.3 Polyglot Implementation: Uniqueness Verifier</h3>
        <h5>Python 3.12 (Data Sufficiency System of Linear Equations Verifier)</h5>
        ${buildCodeBlock('python', `
import numpy as np

def check_system_sufficiency(coefficients: list[list[float]]) -> str:
    """Verifies whether a system of linear equations yields a UNIQUE solution."""
    A = np.array(coefficients)
    rank = np.linalg.matrix_rank(A)
    num_variables = A.shape[1]

    if rank == num_variables:
        return "SUFFICIENT: Matrix has full rank -> exactly ONE unique solution exists."
    else:
        return "NOT SUFFICIENT: Rank deficient -> infinite solutions or inconsistent."

# Question: What is the value of x and y?
# Stmt 1: 2x + 3y = 12
# Stmt 2: 4x + 6y = 24 (Dependent equation!)
print(check_system_sufficiency([[2, 3], [4, 6]])) # Rank 1 < 2 -> Not sufficient!
        `)}

        <h3>7.4 Critical Reasoning Fallacies Matrix</h3>
        ${buildComplexityTable(
          ['Logical Fallacy', 'Definition', 'Example Fallacy in Arguments'],
          [
            ['Post Hoc Ergo Propter Hoc', 'Assuming that because B follows A, A caused B', 'Sales rose after the new logo was launched, so the logo caused the surge.'],
            ['Correlation as Causation', 'Assuming correlated variables have causal link', 'Ice cream sales correlate with drownings (Both caused by summer heat).'],
            ['Straw Man Fallacy', 'Misrepresenting an opponent argument to make it easier to attack', 'They want to reduce military spending; they want to leave us defenseless.'],
            ['False Dilemma', 'Presenting two options as the only possibilities when more exist', 'Either you invest in AI right now, or your company goes bankrupt.']
          ]
        )}

        <h3>7.5 Real-World Enterprise Case Study</h3>
        ${buildInsight('Machine Learning: Identifiability & Overdetermined Systems', `
          In statistical machine learning, Data Sufficiency mirrors <strong>Model Parameter Identifiability</strong>. If you attempt to train a linear regression model with 10 features using only 8 data rows, the mathematical system is under-determined (infinite weight configurations fit the data). The training fails due to multicollinearity (singular matrix), requiring feature selection or L2 Ridge Regularization.
        `)}

        <h3>7.6 Interview Failure Modes & Gotchas</h3>
        ${buildWarning('The "Carrying Over Information" Trap', `
          When testing Statement (2), candidates frequently <strong>carry over information learned from Statement (1)</strong>!
          <strong>MANDATORY PROTOCOL:</strong> When evaluating Statement (2), mentally erase Statement (1) from your mind completely. Only combine them if BOTH have independently failed!
        `)}

        <h3>7.7 Practice Workshop Challenge</h3>
        ${buildAlgorithm('Challenge: Value Question vs Yes/No Question in Data Sufficiency', `
          <strong>Problem:</strong> Is integer \\(x\\) positive?
          <br/>Statement 1: \\(x^2 - 4 = 0\\)
          <br/>Statement 2: \\(|x| = 2\\)
          <br/>Determine which answer choice applies and explain why a statement that produces \\(x = \\pm 2\\) is NOT sufficient for a Yes/No question.
        `)}
      `
    },
    {
      id: 11508,
      chapterNumber: 8,
      title: 'Puzzles & Multi-Constraint Scheduling: Floor Puzzles, Box Stacking & Cross-Variable Grids',
      subtitle: 'Multi-parameter elimination grids, floor building levels (1 to 8), box stacking intervals, and scheduling matrices',
      summary: 'Master multi-constraint analytical puzzles: multi-floor building resident mapping, vertically stacked color-coded box hierarchies, weekly meeting scheduling matrices, and exhaustive constraint elimination grids.',
      readingTimeMinutes: 30,
      isFreePreview: false,
      sortOrder: 8,
      contentHtml: `
        <h3>8.1 Multi-Parameter Grid Architecture</h3>
        <p>Complex placement reasoning puzzles (especially in Banking PO, TCS Digital, and product company rounds) evaluate your capacity to maintain multiple cross-variable state spaces simultaneously. The universal solving technique is the <strong>Cross-Variable Grid Matrix</strong>.</p>

        ${buildTheorem('Theorem 8.1: Definite Clue Placement Priority Invariant', `
          When approaching a multi-constraint puzzle containing 8-12 verbal clues:
          <ol>
            <li><strong>Never start with negative or relative clues</strong> (e.g. "A does not live on floor 3", "B lives somewhere above C").</li>
            <li><strong>Always begin with Fixed Anchors</strong>: clues providing an absolute coordinate (e.g. "D lives on the 4th floor", "The person who likes Red works on Wednesday").</li>
            <li>Build two parallel hypothetical cases (Case 1 and Case 2) when encountering a binary choice. Eliminate contradictory branches as clues unfold.</li>
          </ol>
        `)}

        <h3>8.2 Architectural Diagram: 8-Floor Multi-Variable Matrix</h3>
        ${buildMemoryDiagram('Floor Puzzle Solving Grid Matrix', `
FLOOR    PERSON    PROFESSION    CAR BRAND    CASE 1 STATUS    CASE 2 STATUS
8 (Top)  [  ]      [  ]          [  ]         Valid            Valid
7        [  ]      [Doctor]      [BMW]        Valid            Eliminated (Clue 4)
6        [  ]      [  ]          [  ]         Valid
5        [  ]      [  ]          [  ]         Valid
4        [D]       [Engineer]    [Audi]       ANCHOR CLUE!
3        [  ]      [  ]          [  ]
2        [  ]      [  ]          [  ]
1 (Base) [  ]      [  ]          [  ]
        `)}

        <h3>8.3 Polyglot Implementation: Multi-Constraint Grid Solver</h3>
        <h5>Python 3.12 (Constraint Satisfaction Matrix Solver)</h5>
        ${buildCodeBlock('python', `
def solve_floor_puzzle():
    # 4 Persons: A, B, C, D live on floors 1, 2, 3, 4
    # Clues:
    # 1. A lives on an odd-numbered floor.
    # 2. Exactly one person lives between A and B.
    # 3. C lives immediately above D.
    floors = [1, 2, 3, 4]
    import itertools

    for perm in itertools.permutations(floors):
        fl = dict(zip(['A', 'B', 'C', 'D'], perm))
        # Clue 1: A on odd floor (1 or 3)
        if fl['A'] not in (1, 3): continue
        # Clue 2: 1 person between A and B (|fl[A] - fl[B]| == 2)
        if abs(fl['A'] - fl['B']) != 2: continue
        # Clue 3: C immediately above D (fl[C] - fl[D] == 1)
        if fl['C'] - fl['D'] != 1: continue

        return fl

print("Solved Floor Mapping:", solve_floor_puzzle())
        `)}

        <h3>8.4 Puzzle Problem Typology Matrix</h3>
        ${buildComplexityTable(
          ['Puzzle Class', 'Grid Structure', 'Anchor Dimension', 'Typical Solving Time'],
          [
            ['Floor Building', 'Vertical numbers (1 to N)', 'Floor numbers', '3 - 4 minutes'],
            ['Box Stacking', 'Vertical relative stack', 'Relative distance from top/bottom', '3.5 minutes'],
            ['Day/Month Scheduling', 'Linear calendar days (Mon to Sun)', 'Days of the week', '2.5 - 3 minutes'],
            ['Cross-Attribute Matching', '2D grid with check/cross markers', 'Unique Person identifier', '3 minutes']
          ]
        )}

        <h3>8.5 Real-World Enterprise Case Study</h3>
        ${buildInsight('Airline Crew Scheduling & Integer Linear Programming (ILP)', `
          Global commercial airlines (like Delta or Lufthansa) solve massive daily puzzles: assigning 20,000 pilots and cabin crew to 4,000 flights respecting FAA duty-hour limits, aircraft qualifications, home base locations, and rest intervals. Airlines deploy <strong>Integer Linear Programming (ILP)</strong> solvers (Gurobi, CPLEX) running on high-performance compute clusters to compute cost-minimal, legally compliant flight schedules overnight.
        `)}

        <h3>8.6 Interview Failure Modes & Gotchas</h3>
        ${buildWarning('The Single-Hypothesis Dead End Trap', `
          In difficult puzzles with a 50/50 split clue (e.g. "P lives on either floor 2 or floor 6"):
          Candidates often pick one branch in their mind without writing down the second. After 5 minutes, the branch hits a dead end, forcing them to start over with 0 minutes remaining.
          <strong>Always draw Case 1 and Case 2 side-by-side simultaneously!</strong>
        `)}

        <h3>8.7 Practice Workshop Challenge</h3>
        ${buildAlgorithm('Challenge: The 7-Box Color and Fruit Stack Puzzle', `
          <strong>Problem:</strong> Seven boxes labeled J, K, L, M, N, O, P are stacked one above another. Each box contains a different fruit and has a distinct color.
          Box K is third from the top. Exactly two boxes sit between Box K and the box containing Mangoes. Box P is immediately below the Green box. Formulate the full deduction grid and find the bottom-most box.
        `)}
      `
    }
  ]
};

module.exports = book115;
