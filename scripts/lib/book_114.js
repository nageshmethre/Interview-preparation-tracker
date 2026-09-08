/**
 * Book 114: Quantitative Aptitude & Mathematics for Placements
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

const book114 = {
  id: 114,
  slug: 'quantitative-aptitude-mathematics',
  title: 'Quantitative Aptitude & Mathematics for Placements',
  subtitle: 'Number Theory, Vedic Shortcuts, Speed Arithmetic, Combinatorics, Bayes Theorem & Data Interpretation',
  description: 'The rigorous mathematical placement handbook designed for engineering campus recruitment and competitive tests (TCS NQT, Infosys, Cognizant, Amazon, Google OA). Master number theory proofs, modular arithmetic, relative motion, alligation mechanics, derangements, conditional probability, and rapid data interpretation.',
  author: 'PrepSpace Engineering Curriculum Group',
  category: 'Quantitative Aptitude & Mathematics for Placements',
  subcategory: 'Placement Mathematics & Speed Arithmetic',
  difficulty: 'INTERMEDIATE',
  pageCount: 380,
  estimatedReadingTime: '9.5 Hours',
  tags: ['Aptitude', 'Mathematics', 'NumberTheory', 'Probability', 'Permutations', 'Combinations', 'Placement'],
  licenseType: 'ORIGINAL',
  copyrightNotice: '© 2026 PrepSpace (stream-in.app). All rights reserved.',
  isPro: true,
  badge: 'Placement Essential',
  rating: 4.93,
  readerCount: 4350,
  icon: 'fa-solid fa-calculator',
  gradient: 'linear-gradient(135deg, #831843, #ec4899)',
  chapters: [
    {
      id: 11401,
      chapterNumber: 1,
      title: 'Number Theory: Modular Arithmetic, Divisibility Rules, GCD/LCM & Prime Factorization',
      subtitle: 'Euclidean GCD algorithm, Fermat Little Theorem, Euler Totient Function, and Chinese Remainder Theorem',
      summary: 'Master foundational number theory for technical assessments: modular equivalence classes, Euclidean algorithm proofs, divisibility rules for base 10, prime factorization, and Fermat Little Theorem.',
      readingTimeMinutes: 28,
      isFreePreview: true,
      sortOrder: 1,
      contentHtml: `
        <h3>1.1 Modular Arithmetic & Divisibility Invariants</h3>
        <p>Number theory forms the mathematical bedrock of algorithmic problem solving, cryptography, and placement aptitude assessments. Two integers \\(a\\) and \\(b\\) are congruent modulo \\(n\\) (written \\(a \\equiv b \\pmod n\\)) if their difference \\(a - b\\) is an integer multiple of \\(n\\).</p>

        ${buildTheorem('Theorem 1.1: Fermat Little Theorem (FLT) & Modular Inverse', `
          Let \\(p\\) be a prime number and \\(a\\) be an integer such that \\(\\gcd(a, p) = 1\\). Then:
          \\[
          a^{p-1} \\equiv 1 \\pmod p
          \\]
          <strong>Corollaries for High-Speed Arithmetic:</strong>
          <ol>
            <li>\\(a^p \\equiv a \\pmod p\\) for all integers \\(a\\).</li>
            <li><strong>Modular Multiplicative Inverse:</strong> The inverse \\(a^{-1} \\pmod p\\) is given by:
              \\[
              a^{-1} \\equiv a^{p-2} \\pmod p
              \\]
              This enables exact division under modulo prime arithmetic in \\(O(\\log p)\\) time via binary exponentiation.
            </li>
          </ol>
        `)}

        <h3>1.2 Architectural Diagram: Euclidean Algorithm GCD Lattice</h3>
        ${buildMemoryDiagram('Euclidean Algorithm Step-by-Step Remainder Cascade', `
GOAL: Compute gcd(252, 105)
Formula: gcd(a, b) = gcd(b, a mod b)

Step 1: 252 = 105 * 2 + 42    --> gcd(252, 105) = gcd(105, 42)
Step 2: 105 =  42 * 2 + 21    --> gcd(105, 42)  = gcd(42, 21)
Step 3:  42 =  21 * 2 +  0    --> gcd(42, 21)   = gcd(21, 0)
Remainder is 0! Terminating condition reached!
RESULT: gcd(252, 105) = 21

LCM FORMULA: lcm(a, b) = (a * b) / gcd(a, b)
lcm(252, 105) = (252 * 105) / 21 = 1260
        `)}

        <h3>1.3 Polyglot Implementation: High-Performance Number Theory</h3>
        <h5>Python 3.12 (Modular Exponentiation & Extended Euclidean Algorithm)</h5>
        ${buildCodeBlock('python', `
def extended_gcd(a: int, b: int) -> tuple[int, int, int]:
    """Returns (gcd, x, y) such that a*x + b*y = gcd(a, b)"""
    if b == 0:
        return a, 1, 0
    g, x1, y1 = extended_gcd(b, a % b)
    x = y1
    y = x1 - (a // b) * y1
    return g, x, y

def modular_inverse(a: int, m: int) -> int:
    """Computes a^(-1) mod m via Extended Euclidean algorithm."""
    g, x, _ = extended_gcd(a, m)
    if g != 1:
        raise ValueError("Modular inverse does not exist (numbers not coprime)")
    return (x % m + m) % m

def power_mod(base: int, exp: int, mod: int) -> int:
    """Binary exponentiation: O(log exp) time complexity."""
    return pow(base, exp, mod)

print("gcd(252, 105) =", extended_gcd(252, 105)[0])
print("17^(-1) mod 1000000007 =", modular_inverse(17, 10**9 + 7))
        `)}

        <h5>Java 21 (Prime Factorization & Euler Totient Function)</h5>
        ${buildCodeBlock('java', `
import java.util.HashMap;
import java.util.Map;

public class NumberTheoryEngine {
    public static Map<Long, Integer> primeFactorization(long n) {
        Map<Long, Integer> factors = new HashMap<>();
        for (long d = 2; d * d <= n; d++) {
            if (n % d == 0) {
                int count = 0;
                while (n % d == 0) {
                    count++;
                    n /= d;
                }
                factors.put(d, count);
            }
        }
        if (n > 1) factors.put(n, 1);
        return factors;
    }

    public static long eulerTotient(long n) {
        long result = n;
        for (long p = 2; p * p <= n; p++) {
            if (n % p == 0) {
                while (n % p == 0) n /= p;
                result -= result / p;
            }
        }
        if (n > 1) result -= result / n;
        return result;
    }
}
        `)}

        <h3>1.4 Rapid Divisibility Rules Cheat Sheet</h3>
        ${buildComplexityTable(
          ['Divisor', 'Divisibility Invariant / Rule', 'Mathematical Proof Basis'],
          [
            ['3 and 9', 'Sum of digits is divisible by 3 or 9', '10^k = (9+1)^k = 1 mod 9'],
            ['4', 'Last two digits form a number divisible by 4', '100 = 0 mod 4'],
            ['7', 'Subtract 2x the last digit from remaining number; result div by 7', '10a + b = 3a + b = 0 mod 7 -> a - 2b = 0 mod 7'],
            ['8', 'Last three digits form a number divisible by 8', '1000 = 0 mod 8'],
            ['11', 'Alternating sum of digits (even pos - odd pos) is divisible by 11', '10^k = (-1)^k mod 11']
          ]
        )}

        <h3>1.5 Real-World Enterprise Case Study</h3>
        ${buildInsight('RSA Public Key Cryptography: Euler Totient & Modular Power', `
          In every secure HTTPS transaction (TLS 1.3), RSA encryption relies on the computational hardness of factoring the product of two large prime numbers \\(n = p \\times q\\). The Euler totient \\(\\phi(n) = (p-1)(q-1)\\) determines the private decryption exponent \\(d \\equiv e^{-1} \\pmod{\\phi(n)}\\). Without knowledge of \\(p\\) and \\(q\\), computing \\(\\phi(n)\\) is mathematically intractable on classical computers, securing global e-commerce.
        `)}

        <h3>1.6 Interview Failure Modes & Gotchas</h3>
        ${buildWarning('Modulo Arithmetic on Negative Integers', `
          In languages like C, C++, and Java, the remainder operator <code>%</code> is truncated toward zero, not true mathematical modulo:
          <code>-7 % 5 = -2</code> (in Java / C++)
          Whereas in mathematics and Python:
          <code>-7 % 5 = 3</code> (since \\(-7 = (-2) \\times 5 + 3\\)).
          In placement coding rounds, always use <code>(a % m + m) % m</code> to ensure positive non-negative remainder results.
        `)}

        <h3>1.7 Practice Workshop Challenge</h3>
        ${buildAlgorithm('Challenge: Find the Last Two Digits of 7^2026', `
          <strong>Problem:</strong> Using Euler Totient theorem and modular arithmetic, determine the last two decimal digits of \\(7^{2026}\\) without a calculator in under 60 seconds.
          <br/><br/>
          <strong>Solution Hint:</strong> Last two digits corresponds to \\(7^{2026} \\pmod{100}\\). Compute \\(\\phi(100) = 40\\). Reduce exponent \\(2026 \\equiv 26 \\pmod{40}\\).
        `)}
      `
    },
    {
      id: 11402,
      chapterNumber: 2,
      title: 'Percentages, Profit & Loss, Discount & Successive Percentage Changes',
      subtitle: 'Multiplying factors, mark-up formulas, fraudulent weight tricks, and successive discounts',
      summary: 'Master commercial arithmetic: converting percentage calculations to rapid decimal multiplying factors, cost price vs selling price relationships, successive percentage discounts, and cheating merchant dishonest balance problems.',
      readingTimeMinutes: 26,
      isFreePreview: false,
      sortOrder: 2,
      contentHtml: `
        <h3>2.1 The Multiplying Factor (MF) Paradigm</h3>
        <p>Speed in competitive aptitude assessments depends on eliminating multi-step fractional arithmetic. Every percentage increase or decrease can be expressed as a single <strong>Multiplying Factor (MF)</strong>:</p>
        <ul>
          <li>\\(P\\%\\) increase \\(\\implies MF = 1 + \\frac{P}{100}\\) (e.g. \\(25\\%\\) increase \\(\\implies \\times 1.25\\) or \\(\\times \\frac{5}{4}\\)).</li>
          <li>\\(P\\%\\) decrease \\(\\implies MF = 1 - \\frac{P}{100}\\) (e.g. \\(20\\%\\) decrease \\(\\implies \\times 0.80\\) or \\(\\times \\frac{4}{5}\\)).</li>
        </ul>

        ${buildTheorem('Theorem 2.1: Successive Percentage Change Invariant', `
          If a value is successively changed by \\(a\\%\\) and then by \\(b\\%\\), the net percentage change \\(N\\) is given by:
          \\[
          N = \\left( a + b + \\frac{a \\times b}{100} \\right)\\%
          \\]
          <strong>Directional Corollary:</strong> If a price is increased by \\(x\\%\\) and subsequently decreased by \\(x\\%\\), the final price is <strong>always less</strong> than the original price by:
          \\[
          \\text{Net Loss} = \\frac{x^2}{100}\\%
          \\]
        `)}

        <h3>2.2 Memory Diagram: Commercial Arithmetic Flow</h3>
        ${buildMemoryDiagram('Commercial Pricing Chain: Cost Price to Net Selling Price', `
+-----------------------+
|  COST PRICE (CP)      | <--------------------+
+-----------|-----------+                      |
            |                                  |
            | Mark-Up (+M%)                    |
            v                                  |
+-----------------------+                      | Overall Profit / Loss:
|  MARKED PRICE (MP)    |                      | Profit % = ((SP - CP) / CP) * 100
+-----------|-----------+                      |
            |                                  |
            | Discount (-D%)                   |
            v                                  |
+-----------------------+                      |
|  SELLING PRICE (SP)   | ---------------------+
+-----------------------+
KEY FORMULA: CP * (1 + M/100) * (1 - D/100) = SP
        `)}

        <h3>2.3 Polyglot Implementation: Placement Speed Arithmetic Engine</h3>
        <h5>Python 3.12 (Dishonest Dealer & Successive Discount Calculator)</h5>
        ${buildCodeBlock('python', `
def calculate_dishonest_merchant_profit(cost_price_claim_pct: float, actual_weight_grams: float) -> float:
    """
    Calculates profit percentage when a merchant claims to sell at cost price
    (or marked up by X%) but uses false weights (e.g. 900g instead of 1000g).
    """
    # True Cost = actual weight dispensed
    # Revenue = 1000g nominal price * (1 + mark_up)
    nominal_weight = 1000.0
    selling_factor = (1.0 + cost_price_claim_pct / 100.0) * nominal_weight
    profit_pct = ((selling_factor - actual_weight_grams) / actual_weight_grams) * 100.0
    return profit_pct

def net_successive_discount(discounts: list[float]) -> float:
    """Computes single equivalent discount from a series of successive discounts."""
    mf = 1.0
    for d in discounts:
        mf *= (1.0 - d / 100.0)
    return (1.0 - mf) * 100.0

print("Successive Discounts [20%, 10%, 5%] Equivalent:", f"{net_successive_discount([20, 10, 5]):.2f}%")
print("Merchant using 800g instead of 1000g profit:", f"{calculate_dishonest_merchant_profit(0, 800):.2f}%")
        `)}

        <h3>2.4 Fractional Equivalents Speed Conversion Table</h3>
        ${buildComplexityTable(
          ['Fraction', 'Percentage Equivalent', 'Multiplying Factor (+)', 'Multiplying Factor (-)'],
          [
            ['1/2', '50.0%', '1.50', '0.50'],
            ['1/3', '33.33%', '1.333', '0.667'],
            ['1/4', '25.0%', '1.25', '0.75'],
            ['1/5', '20.0%', '1.20', '0.80'],
            ['1/6', '16.67%', '1.167', '0.833'],
            ['1/7', '14.28%', '1.143', '0.857'],
            ['1/8', '12.5%', '1.125', '0.875'],
            ['1/9', '11.11%', '1.111', '0.889']
          ]
        )}

        <h3>2.5 Real-World Enterprise Case Study</h3>
        ${buildInsight('E-Commerce Black Friday Dynamic Markdown Margins', `
          During flash sales, Amazon and Flipkart systems dynamically recalculate product pricing. An item marked up 40% above manufacturer wholesale cost (CP) with an advertised 25% "Lightning Deal" discount yields a net margin:
          \\[
          MF = 1.40 \\times 0.75 = 1.05 \\implies +5\\% \\text{ Net Profit}
          \\]
          Automated pricing bots continuously verify that after promotional coupons and payment gateway interchange fees (typically 1.8%), the net multiplying factor remains strictly \\(MF \\ge 1.02\\) to guarantee profitability.
        `)}

        <h3>2.6 Interview Failure Modes & Gotchas</h3>
        ${buildWarning('The Discount on Cost Price Trap', `
          A frequent mistake in aptitude tests is calculating discounts on Cost Price (CP).
          <strong>Rule:</strong>
          <ul>
            <li><strong>Profit / Loss %</strong> is ALWAYS computed on <strong>Cost Price (CP)</strong>.</li>
            <li><strong>Discount %</strong> is ALWAYS computed on <strong>Marked Price (MP)</strong>.</li>
          </ul>
        `)}

        <h3>2.7 Practice Workshop Challenge</h3>
        ${buildAlgorithm('Challenge: The Cheating Merchant Double-Fraud Problem', `
          <strong>Problem:</strong> A dishonest trader cheats by using false weights to take 20% more than the nominal weight while purchasing from a wholesaler, and gives 20% less than the nominal weight while selling to retail customers. If he sells goods at the nominal cost price, calculate his exact total percentage gain.
        `)}
      `
    },
    {
      id: 11403,
      chapterNumber: 3,
      title: 'Time, Speed & Distance: Relative Speed, Trains, Boats & Streams, and Races',
      subtitle: 'Average speed vs harmonic mean, crossing moving bodies, upstream/downstream vectors, and head-start handicaps',
      summary: 'Master Kinematics and speed mathematics for recruitment exams: unit conversions, average speed proofs, relative velocity vectors for trains, river stream drift vectors, and circular track rendezvous points.',
      readingTimeMinutes: 28,
      isFreePreview: false,
      sortOrder: 3,
      contentHtml: `
        <h3>3.1 Foundational Kinematics & Average Speed</h3>
        <p>The fundamental equation of motion is \\(\\text{Distance} = \\text{Speed} \\times \\text{Time}\\). Unit conversion is the first point of failure in speed math: to convert km/h to m/s, multiply by \\(\\frac{5}{18}\\); to convert m/s to km/h, multiply by \\(\\frac{18}{5}\\).</p>

        ${buildTheorem('Theorem 3.1: Average Speed Harmonic Mean Invariant', `
          If an object travels a fixed distance \\(D\\) at speed \\(S_1\\) and returns over the identical distance \\(D\\) at speed \\(S_2\\), the average speed \\(S_{\\text{avg}}\\) is the <strong>Harmonic Mean</strong> of the two speeds, strictly independent of distance \\(D\\):
          \\[
          S_{\\text{avg}} = \\frac{\\text{Total Distance}}{\\text{Total Time}} = \\frac{2D}{\\frac{D}{S_1} + \\frac{D}{S_2}} = \\frac{2 \\cdot S_1 \\cdot S_2}{S_1 + S_2}
          \\]
          <strong>Crucial Pitfall:</strong> Average speed is NEVER the arithmetic mean \\(\\frac{S_1 + S_2}{2}\\) unless travel <em>times</em> (not distances) are identical.
        `)}

        <h3>3.2 Memory Diagram: Relative Speed Vectors</h3>
        ${buildMemoryDiagram('Relative Velocity Vectors: Opposite vs Same Direction', `
CASE 1: OPPOSITE DIRECTIONS (Heading Toward Each Other):
Host A (Speed S_A) --->                 <--- Host B (Speed S_B)
Relative Speed = S_A + S_B (Distance closes rapidly!)
Time to collision / meeting = Initial Distance / (S_A + S_B)

CASE 2: SAME DIRECTION (Overtaking):
Host A (Faster: S_A) ------------>
Host B (Slower: S_B)     ----->
Relative Speed = S_A - S_B (Distance closes slowly)
Time to overtake = Gap / (S_A - S_B)

CASE 3: TRAIN CROSSING A MOVING TRAIN:
Distance to Cover = Length(Train 1) + Length(Train 2)
Time = (L_1 + L_2) / Relative_Speed
        `)}

        <h3>3.3 Polyglot Implementation: Boats & Streams Solver</h3>
        <h5>Python 3.12 (River Kinematics & Circular Track Rendezvous)</h5>
        ${buildCodeBlock('python', `
import math

def boats_and_streams(boat_still_speed: float, stream_speed: float, distance_km: float):
    downstream_speed = boat_still_speed + stream_speed
    upstream_speed = boat_still_speed - stream_speed
    assert upstream_speed > 0, "Boat cannot make headway against river stream!"

    time_down = distance_km / downstream_speed
    time_up = distance_km / upstream_speed
    total_time = time_down + time_up
    return {
        "downstream_speed": downstream_speed,
        "upstream_speed": upstream_speed,
        "round_trip_hours": total_time
    }

def circular_track_first_meeting(track_length_meters: float, speed_a: float, speed_b: float, same_dir: bool):
    rel_speed = abs(speed_a - speed_b) if same_dir else (speed_a + speed_b)
    return track_length_meters / rel_speed

print("Boat (15 km/h in still water, stream 3 km/h, 36 km round-trip):", boats_and_streams(15, 3, 36))
print("Circular Track 400m (Speeds: 5 m/s & 3 m/s, Opposite Dir):", circular_track_first_meeting(400, 5, 3, False), "seconds")
        `)}

        <h3>3.4 TSD Problem Categories Matrix</h3>
        ${buildComplexityTable(
          ['Scenario', 'Total Distance to Cover', 'Applicable Speed', 'Formula'],
          [
            ['Train crosses pole / person', 'Length of train \\(L_t\\)', 'Speed of train \\(S_t\\)', '\\(T = L_t / S_t\\)'],
            ['Train crosses platform / tunnel', 'Length of train + platform \\(L_t + L_p\\)', 'Speed of train \\(S_t\\)', '\\(T = (L_t + L_p) / S_t\\)'],
            ['Downstream (With flow)', 'Distance \\(D\\)', 'Boat + Stream \\(B + S\\)', '\\(T = D / (B + S)\\)'],
            ['Upstream (Against flow)', 'Distance \\(D\\)', 'Boat - Stream \\(B - S\\)', '\\(T = D / (B - S)\\)'],
            ['Races: A beats B by \\(x\\) meters', 'Race length \\(L\\)', 'When A finishes \\(L\\), B has covered \\(L - x\\)', '\\(S_A / S_B = L / (L - x)\\)']
          ]
        )}

        <h3>3.5 Real-World Enterprise Case Study</h3>
        ${buildInsight('Uber ETA & Dispatch Routing: Kinematic Vector Calculations', `
          When calculating ETA, Uber dispatch routing engines do not simply query static highway speed limits. Real-time GPS pings from millions of smartphones running the driver app calculate the current <strong>Harmonic Mean Speed</strong> across individual road segments. Because road congestion exhibits non-linear queuing delays, harmonic mean prevents short high-speed bursts from skewing arrival predictions.
        `)}

        <h3>3.6 Interview Failure Modes & Gotchas</h3>
        ${buildWarning('The km/h to m/s Conversion Omission', `
          The most prevalent blunder in train problems:
          Given a 250-meter train traveling at 72 km/h crossing a platform of 150 meters:
          Dividing \\(400\\) meters directly by \\(72\\) yields completely invalid results!
          <strong>Mandatory First Step:</strong> Convert speed: \\(72 \\times \\frac{5}{18} = 20\\text{ m/s}\\).
          Then: \\(T = \\frac{400}{20} = 20\\text{ seconds}\\).
        `)}

        <h3>3.7 Practice Workshop Challenge</h3>
        ${buildAlgorithm('Challenge: Two Trains Starting Simultaneously (Meeting Time Invariant)', `
          <strong>Problem:</strong> Two trains start at the same moment from stations A and B, traveling toward each other at speeds \\(S_1\\) and \\(S_2\\). After meeting each other halfway, Train 1 takes 4 hours to reach station B, and Train 2 takes 9 hours to reach station A. Prove that \\(\\frac{S_1}{S_2} = \\sqrt{\\frac{T_2}{T_1}}\\) and find their speed ratio.
        `)}
      `
    },
    {
      id: 11404,
      chapterNumber: 4,
      title: 'Time & Work: Man-Days, Work Equivalence, Pipes & Cisterns, and Alternating Shifts',
      subtitle: 'LCM efficiency method, negative work (drain pipes), efficiency ratios, and worker departure mid-way',
      summary: 'Master Time and Work problem solving: the unified LCM total work units technique, man-days equivalence equations, pipes and cisterns with leakages, and alternating turn-based work schedules.',
      readingTimeMinutes: 26,
      isFreePreview: false,
      sortOrder: 4,
      contentHtml: `
        <h3>4.1 The LCM Total Work Units Method</h3>
        <p>Traditional textbook solutions using fractions (e.g. \\(1/A + 1/B\\)) are slow and error-prone under timed placement exam conditions. The optimal strategy is the <strong>LCM Total Units Method</strong>:</p>
        <ol>
          <li>Assume the Total Work \\(W\\) is the <strong>Least Common Multiple (LCM)</strong> of the individual completion days.</li>
          <li>Compute the <strong>Daily Efficiency (Units/Day)</strong> for each worker: \\(E = \\frac{W}{\\text{Days}}\\).</li>
          <li>Sum efficiencies to solve combined work, worker drop-outs, or alternating shifts.</li>
        </ol>

        ${buildTheorem('Theorem 4.1: The Man-Days Work Equivalence Equation', `
          Let \\(M\\) be the number of men, \\(D\\) be the days, \\(H\\) be the daily hours, \\(E\\) be the individual efficiency, and \\(W\\) be the total units of work produced:
          \\[
          \\frac{M_1 \\times D_1 \\times H_1 \\times E_1}{W_1} = \\frac{M_2 \\times D_2 \\times H_2 \\times E_2}{W_2}
          \\]
          This single master equation solves all complex workforce reallocation and project deadline problems.
        `)}

        <h3>4.2 Memory Diagram: Pipes & Cisterns Work Dynamics</h3>
        ${buildMemoryDiagram('LCM Work Unit Method for Pipes & Leakages', `
PROBLEM: Pipe A fills tank in 12 hrs. Pipe B fills in 15 hrs. Leak C empties in 20 hrs.
Total Tank Capacity = LCM(12, 15, 20) = 60 Units.

EFFICIENCIES:
- Pipe A Efficiency: +60 / 12 = +5 Units/hour (Filling)
- Pipe B Efficiency: +60 / 15 = +4 Units/hour (Filling)
- Leak C Efficiency:  -60 / 20 = -3 Units/hour (Emptying / Negative Work)

NET COMBINED RATE WHEN ALL 3 ARE OPEN:
Net Efficiency = (+5) + (+4) + (-3) = +6 Units/hour
Time to fill completely = 60 Units / 6 Units/hr = 10 Hours!
Zero fractions. Instant arithmetic.
        `)}

        <h3>4.3 Polyglot Implementation: Time & Work Simulator</h3>
        <h5>Python 3.12 (Alternating Shift & Mid-Way Worker Departure Solver)</h5>
        ${buildCodeBlock('python', `
import math

def solve_alternating_work(days_a: int, days_b: int) -> float:
    """Calculates days needed if A and B work on alternate days starting with A."""
    total_units = math.lcm(days_a, days_b)
    eff_a = total_units // days_a
    eff_b = total_units // days_b

    two_day_cycle_units = eff_a + eff_b
    full_cycles = total_units // two_day_cycle_units
    units_completed = full_cycles * two_day_cycle_units
    days = full_cycles * 2

    remaining = total_units - units_completed
    if remaining > 0:
        if remaining <= eff_a:
            days += remaining / eff_a
        else:
            days += 1
            remaining -= eff_a
            days += remaining / eff_b

    return days

print("A (10 days), B (15 days) working alternating days starting with A:")
print(f"Total days required: {solve_alternating_work(10, 15)} days")
        `)}

        <h3>4.4 Time & Work Methodologies Matrix</h3>
        ${buildComplexityTable(
          ['Problem Type', 'Core Strategy', 'Mathematical Treatment'],
          [
            ['Standard Shared Work', 'Sum efficiencies', '\\(E_{\\text{total}} = E_A + E_B\\)'],
            ['Pipes & Leakage', 'Treat leaks as negative work', '\\(E_{\\text{net}} = E_{\\text{inlet}} - E_{\\text{drain}}\\)'],
            ['Worker Leaves Mid-Way', 'Subtract work done before departure from total units', '\\(W_{\\text{remaining}} = W_{\\text{total}} - (E_{\\text{both}} \\times t)\\)'],
            ['Alternating Days', 'Group work into 2-day combined cycles', '\\(\\text{Cycle Units} = E_A + E_B\\)'],
            ['Men vs Women vs Boys', 'Convert to uniform equivalent worker units', '\\(1 \\text{ Man} = x \\text{ Women} = y \\text{ Boys}\\)']
          ]
        )}

        <h3>4.5 Real-World Enterprise Case Study</h3>
        ${buildInsight('Apache Spark Core Worker Allocation & Job Completion Modeling', `
          In distributed big data clusters, Apache Spark dynamically allocates worker executors to process partitions of a resilient distributed dataset (RDD). Job completion schedulers model tasks using generalized Man-Days equations: \\(T = \\frac{\\text{Partition Tasks}}{\\text{Executor Cores} \\times \\text{Core Frequency}}\\). If a worker node becomes slow (straggler), speculative execution launches an identical task in parallel on another worker—equivalent to adding a second worker to finish the remaining work units.
        `)}

        <h3>4.6 Interview Failure Modes & Gotchas</h3>
        ${buildWarning('The Alternating Days Last-Day Overshoot Trap', `
          In alternating work problems (e.g. A does 5 units, B does 3 units on alternating days, target 22 units):
          Candidates often divide \\(22 / 8 = 2.75\\) cycles \\(\\times 2 = 5.5\\) days.
          <strong>THIS IS WRONG!</strong>
          After 2 cycles (4 days), 16 units are done. On Day 5, Worker A executes 5 units (total 21 units). Only 1 unit remains for Worker B on Day 6, taking \\(1/3\\) day. Total = \\(5\\frac{1}{3}\\) days. Always simulate the final fractional day explicitly!
        `)}

        <h3>4.7 Practice Workshop Challenge</h3>
        ${buildAlgorithm('Challenge: The Monkey Climbing a Greasy Pole Problem', `
          <strong>Problem:</strong> A monkey climbs a greasy pole 60 meters high. In the first minute, it ascends 3 meters, and in the second minute, it slips down 2 meters. How many minutes will it take for the monkey to touch the top of the pole for the first time?
        `)}
      `
    },
    {
      id: 11405,
      chapterNumber: 5,
      title: 'Ratio, Proportion, Mixtures & Alligation: The Cross-Method Mechanics',
      subtitle: 'Rule of alligation, repeated dilution formula, compounding ratios, and profit-weighted averages',
      summary: 'Master the Rule of Alligation: solving complex weighted averages, mixture replacements, repeated liquid dilutions, and compound ratio transformations in under 45 seconds.',
      readingTimeMinutes: 26,
      isFreePreview: false,
      sortOrder: 5,
      contentHtml: `
        <h3>5.1 The Mathematical Principle of Alligation</h3>
        <p>The <strong>Rule of Alligation</strong> is a modified representation of weighted averages. It calculates the ratio in which two or more ingredients at given prices or concentrations must be blended to produce a mixture at a desired mean price or concentration.</p>

        ${buildTheorem('Theorem 5.1: The Rule of Alligation Invariant', `
          Let \\(C_1\\) and \\(C_2\\) be the values of cheaper and dearer components, and \\(C_m\\) be the mean price:
          \\[
          \\frac{\\text{Quantity of Cheaper (} Q_c \\text{)}}{\\text{Quantity of Dearer (} Q_d \\text{)}} = \\frac{C_2 - C_m}{C_m - C_1}
          \\]
          This relation derives directly from conservation of mass/value:
          \\[
          Q_c \\cdot C_1 + Q_d \\cdot C_2 = (Q_c + Q_d) \\cdot C_m
          \\]
        `)}

        <h3>5.2 Memory Diagram: The Alligation Cross Diagram</h3>
        ${buildMemoryDiagram('The Alligation Cross Method Structure', `
Cheaper Value (C1)                          Dearer Value (C2)
      \\                                           /
       \\                                         /
        \\                                       /
         +------------> Mean Price (Cm) <-------+
        /                                       \\
       /                                         \\
      /                                           \\
(C2 - Cm)                                   (Cm - C1)
Quantity of Cheaper                         Quantity of Dearer

Ratio of Cheaper to Dearer = (C2 - Cm) : (Cm - C1)
        `)}

        <h3>5.3 Polyglot Implementation: Repeated Dilution Engine</h3>
        <h5>Python 3.12 (Repeated Dilution & Replacement Formula)</h5>
        ${buildCodeBlock('python', `
def repeated_dilution(initial_pure_volume: float, replacement_volume: float, operations: int) -> float:
    """
    Computes remaining pure liquid volume after N successive replacement operations:
    Formula: Final = Initial * (1 - x / V)^n
    """
    assert initial_pure_volume > 0 and replacement_volume <= initial_pure_volume
    ratio = 1.0 - (replacement_volume / initial_pure_volume)
    remaining_pure = initial_pure_volume * (ratio ** operations)
    return remaining_pure

# A vessel contains 40 liters of pure milk. 4 liters are withdrawn and replaced with water.
# This operation is repeated 3 times total.
final_milk = repeated_dilution(40, 4, 3)
print(f"Remaining pure milk: {final_milk:.2f} liters")
print(f"Milk to Water ratio: {final_milk:.2f} : {40 - final_milk:.2f}")
        `)}

        <h3>5.4 Alligation Applications Matrix</h3>
        ${buildComplexityTable(
          ['Problem Domain', 'Component 1 (C1)', 'Component 2 (C2)', 'Mean Value (Cm)', 'Resulting Ratio'],
          [
            ['Grain / Commodity Mixing', 'Price of Rice A ($/kg)', 'Price of Rice B ($/kg)', 'Mean Blend Price ($/kg)', 'Weight ratio of Rice A : Rice B'],
            ['Chemical Solutions', 'Acid % in Sol 1', 'Acid % in Sol 2', 'Target Acid %', 'Volume ratio of Sol 1 : Sol 2'],
            ['Commercial Investment', 'Interest Rate 1 (%)', 'Interest Rate 2 (%)', 'Overall Portfolio Yield (%)', 'Capital invested in Scheme 1 : Scheme 2'],
            ['Classroom Exam Marks', 'Boys Average Score', 'Girls Average Score', 'Class Overall Average', 'Headcount ratio of Boys : Girls']
          ]
        )}

        <h3>5.5 Real-World Enterprise Case Study</h3>
        ${buildInsight('Oil Refinery Linear Programming & Gasoline Octane Blending', `
          Modern petroleum refineries produce gasoline grades (Regular 87 Octane, Premium 93 Octane) by blending hundreds of hydrocarbon distillation streams (reformate, alkylate, straight-run naphtha). Because octane rating and Reid Vapor Pressure (RVP) follow non-linear alligation matrices, automated refinery optimization algorithms (using IBM CPLEX / Linear Programming) compute exact millisecond valve blending ratios to minimize expensive high-octane additives while meeting regulatory specs.
        `)}

        <h3>5.6 Interview Failure Modes & Gotchas</h3>
        ${buildWarning('The Selling Price Mean Pitfall in Alligation', `
          If an interviewer states: "The merchant mixes Rice A ($10/kg) and Rice B ($15/kg) and sells the blend at $14.40/kg making a 20% profit", you <strong>CANNOT put $14.40 in the center of the alligation cross</strong>!
          $14.40 is the Selling Price. Alligation components must have uniform units:
          \\[
          \\text{Mean Cost Price } C_m = \\frac{14.40}{1 + 0.20} = \\$12.00
          \\]
          Insert $12.00 into the alligation cross.
        `)}

        <h3>5.7 Practice Workshop Challenge</h3>
        ${buildAlgorithm('Challenge: Milk and Water Mixture Replacement', `
          <strong>Problem:</strong> A container has 80 liters of milk. From this, 8 liters of milk was taken out and replaced by water. This process was further repeated two times. How much milk is now contained by the container?
        `)}
      `
    },
    {
      id: 11406,
      chapterNumber: 6,
      title: 'Permutations & Combinations: Fundamental Counting Principle, Circular Arrangements & Derangements',
      subtitle: 'Subfactorial !n, round-table seating symmetries, inclusion-exclusion, and stars and bars theorem',
      summary: 'Master combinatorial mathematics: permutations (nPr), combinations (nCr), circular table symmetry divisions, derangements (subfactorial !n), and the Stars and Bars partitioning theorem.',
      readingTimeMinutes: 30,
      isFreePreview: false,
      sortOrder: 6,
      contentHtml: `
        <h3>6.1 Fundamental Principles of Counting</h3>
        <p>Combinatorics analyzes discrete selections and arrangements. The <strong>Multiplication Principle</strong> states that if task 1 can be done in \\(n_1\\) ways and task 2 in \\(n_2\\) ways, both can be done in \\(n_1 \\times n_2\\) ways. The <strong>Addition Principle</strong> applies when choices are mutually exclusive.</p>

        ${buildTheorem('Theorem 6.1: Derangements & The Subfactorial Formula', `
          A <strong>derangement</strong> is a permutation of \\(n\\) elements such that no element appears in its original position.
          The number of derangements of \\(n\\) objects (denoted \\(!n\\) or \\(D_n\\)) is given by:
          \\[
          !n = n! \\sum_{k=0}^{n} \\frac{(-1)^k}{k!} = n! \\left( 1 - \\frac{1}{1!} + \\frac{1}{2!} - \\frac{1}{3!} + \\dots + \\frac{(-1)^n}{n!} \\right)
          \\]
          As \\(n \\to \\infty\\), the probability that a random permutation is a derangement converges rapidly to:
          \\[
          \\lim_{n \\to \\infty} \\frac{!n}{n!} = \\frac{1}{e} \\approx 0.367879 \\quad (36.79\\%)
          \\]
        `)}

        <h3>6.2 Architectural Diagram: Stars & Bars Partitioning</h3>
        ${buildMemoryDiagram('Stars and Bars Theorem: Distributing N Identical Items into K Distinct Bins', `
PROBLEM: Distribute 7 identical coins (Stars) among 3 children (Bins).
Formula: C(n + k - 1, k - 1) = C(7 + 3 - 1, 3 - 1) = C(9, 2) = 36 ways.

VISUALIZATION:
Place 7 Stars (*) and 2 Bars (|) in any permutation:
* * * | * * | * *    --> Child 1 gets 3, Child 2 gets 2, Child 3 gets 2
* * * * * | | * *    --> Child 1 gets 5, Child 2 gets 0, Child 3 gets 2
| * * * * * * * |    --> Child 1 gets 0, Child 2 gets 7, Child 3 gets 0

If each child must get AT LEAST 1 coin (Positive Solutions):
Formula: C(n - 1, k - 1) = C(7 - 1, 3 - 1) = C(6, 2) = 15 ways.
        `)}

        <h3>6.3 Polyglot Implementation: Combinatorics Engine</h3>
        <h5>Python 3.12 (Exact nCr, Derangements & Permutations)</h5>
        ${buildCodeBlock('python', `
import math

def nCr(n: int, r: int) -> int:
    return math.comb(n, r)

def nPr(n: int, r: int) -> int:
    return math.perm(n, r)

def derangements(n: int) -> int:
    """Computes subfactorial !n using dynamic programming recurrence: D(n) = (n-1)*(D(n-1) + D(n-2))"""
    if n == 0: return 1
    if n == 1: return 0
    d = [0] * (n + 1)
    d[0], d[1] = 1, 0
    for i in range(2, n + 1):
        d[i] = (i - 1) * (d[i - 1] + d[i - 2])
    return d[n]

def circular_permutations(n: int, flip_symmetric: bool = False) -> int:
    # (n - 1)! for standard round table; (n - 1)! / 2 for necklaces/garlands
    res = math.factorial(n - 1)
    return res // 2 if flip_symmetric else res

print("Derangements of 5 letters into 5 envelopes (!5):", derangements(5)) # 44
print("Seating 6 people at a round table:", circular_permutations(6)) # 120
        `)}

        <h3>6.4 Combinatorial Formulas Reference Matrix</h3>
        ${buildComplexityTable(
          ['Arrangement Type', 'Formula', 'Boundary Conditions'],
          [
            ['Linear Permutation (All distinct)', '\\(n!\\)', 'Ordering matters'],
            ['Linear Permutation with duplicates', '\\(\\frac{n!}{p! \\cdot q! \\cdot r!}\\)', 'Where \\(p, q, r\\) are identical items'],
            ['Combinations (Selection)', '\\(\\binom{n}{r} = \\frac{n!}{r!(n-r)!}\\)', 'Ordering does not matter'],
            ['Circular Permutation (Table)', '\\((n - 1)!\\)', 'Rotationally invariant'],
            ['Circular Permutation (Necklace/Garland)', '\\(\\frac{(n - 1)!}{2}\\)', 'Clockwise and counter-clockwise indistinguishable'],
            ['Derangements (Zero matches)', '\\(!n = (n-1)(!(n-1) + !(n-2))\\)', '\\(!1=0, !2=1, !3=2, !4=9, !5=44\\)']
          ]
        )}

        <h3>6.5 Real-World Enterprise Case Study</h3>
        ${buildInsight('Google Security: Password Entropy & Brute-Force Combinatorics', `
          When generating security tokens or verifying password strength, security algorithms calculate <strong>Information Entropy</strong> based on combinatorial state spaces:
          \\[
          H = L \\times \\log_2(N)
          \\]
          Where \\(L\\) is string length and \\(N\\) is character set size. For a 12-character alphanumeric + symbol password (\\(N = 94\\)), the total combinations are \\(94^{12} \\approx 4.75 \\times 10^{23}\\), requiring over 1,500 years to brute-force at 10 billion hashes/second.
        `)}

        <h3>6.6 Interview Failure Modes & Gotchas</h3>
        ${buildWarning('Circular Permutation Fixed Reference Fallacy', `
          In circular permutations, the number of ways to seat \\(n\\) people is \\((n-1)!\\) because there is no distinguished starting position.
          <strong>CRITICAL GOTCHA:</strong> If <em>one specific person</em> has already taken a seat (e.g. "Host sits facing the door"), <strong>the circular symmetry is broken!</strong>
          All remaining \\(n-1\\) seats are now unique relative to the host, so the remaining \\(n-1\\) people can be seated in \\((n-1)!\\) ways, not \\((n-2)!\\).
        `)}

        <h3>6.7 Practice Workshop Challenge</h3>
        ${buildAlgorithm('Challenge: The Secretary Letter Placement Problem', `
          <strong>Problem:</strong> A secretary types 5 letters and addresses 5 corresponding envelopes. If the letters are randomly inserted into the envelopes, what is the probability that:
          <br/>1. Exactly 3 letters are in their correct envelopes?
          <br/>2. Zero letters are in their correct envelopes (pure derangement)?
        `)}
      `
    },
    {
      id: 11407,
      chapterNumber: 7,
      title: "Probability & Bayes' Theorem: Conditional Probability, Independent Events & Expectation",
      subtitle: 'Total probability theorem, false positive paradox, Bernoulli trials, and geometric distributions',
      summary: "Master probability mathematics: sample spaces, conditional probability P(A|B), Bayes' Theorem inversion, binomial distributions, expected value, and the False Positive Medical Paradox.",
      readingTimeMinutes: 30,
      isFreePreview: false,
      sortOrder: 7,
      contentHtml: `
        <h3>7.1 Foundations of Probability Theory</h3>
        <p>Probability quantifies the likelihood of events within a sample space \\(S\\). For equally likely outcomes, \\(P(A) = \\frac{|A|}{|S|}\\). Two events \\(A\\) and \\(B\\) are <strong>independent</strong> if and only if \\(P(A \\cap B) = P(A) \\times P(B)\\).</p>

        ${buildTheorem("Theorem 7.1: Bayes' Theorem & Posterior Probability", `
          Let \\(A_1, A_2, \\dots, A_k\\) be a partition of the sample space \\(S\\) with \\(P(A_i) > 0\\). For any event \\(B\\) such that \\(P(B) > 0\\):
          \\[
          P(A_i | B) = \\frac{P(B | A_i) \\cdot P(A_i)}{P(B)} = \\frac{P(B | A_i) \\cdot P(A_i)}{\\sum_{j=1}^{k} P(B | A_j) \\cdot P(A_j)}
          \\]
          <ol>
            <li>\\(P(A_i)\\): <strong>Prior Probability</strong> before evidence \\(B\\).</li>
            <li>\\(P(B | A_i)\\): <strong>Likelihood</strong> of observing \\(B\\) given hypothesis \\(A_i\\).</li>
            <li>\\(P(A_i | B)\\): <strong>Posterior Probability</strong> after observing evidence \\(B\\).</li>
          </ol>
        `)}

        <h3>7.2 Architectural Diagram: The False Positive Paradox Tree</h3>
        ${buildMemoryDiagram('Bayesian Medical Test: The False Positive Paradox', `
POPULATION: 10,000 People. Disease Prevalence: 0.1% (10 Sick, 9,990 Healthy)
Test Accuracy: 99% Sensitivity, 99% Specificity (1% False Positive Rate)

                        [10,000 INDIVIDUALS]
                             /        \\
           [10 SICK (0.1%)]            [9,990 HEALTHY (99.9%)]
                |                                 |
         Test 99% Accurate                 Test 1% False Positives
                v                                 v
     [9.9 Positive Results]            [99.9 Positive Results]

TOTAL POSITIVE TESTS = 9.9 + 99.9 = 109.8
PROBABILITY YOU ARE ACTUALLY SICK GIVEN A POSITIVE TEST:
P(Sick | Positive) = 9.9 / 109.8 = 9.01%!
Even with a 99% accurate test, over 90% of positive tests are FALSE POSITIVES!
        `)}

        <h3>7.3 Polyglot Implementation: Bayesian Classifier & Expectation</h3>
        <h5>Python 3.12 (Bayesian Posterior Calculator)</h5>
        ${buildCodeBlock('python', `
def bayes_posterior(prior_a: float, p_b_given_a: float, p_b_given_not_a: float) -> float:
    """Calculates P(A | B) via Bayes Theorem."""
    prior_not_a = 1.0 - prior_a
    total_p_b = (p_b_given_a * prior_a) + (p_b_given_not_a * prior_not_a)
    posterior = (p_b_given_a * prior_a) / total_p_b
    return posterior

# False positive paradox test:
disease_prior = 0.001       # 0.1% prevalence
sensitivity = 0.99          # P(Pos | Sick)
false_positive_rate = 0.01  # P(Pos | Healthy)

p_sick_given_pos = bayes_posterior(disease_prior, sensitivity, false_positive_rate)
print(f"P(Actually Sick | Positive Test) = {p_sick_given_pos * 100:.2f}%")
        `)}

        <h3>7.4 Probability Distributions Matrix</h3>
        ${buildComplexityTable(
          ['Distribution', 'Probability Mass Function (PMF)', 'Expected Value E(X)', 'Variance Var(X)', 'Use Case'],
          [
            ['Bernoulli', '\\(P(X=1)=p, P(X=0)=1-p\\)', '\\(p\\)', '\\(p(1-p)\\)', 'Single coin flip / success test'],
            ['Binomial', '\\(\\binom{n}{k} p^k (1-p)^{n-k}\\)', '\\(n p\\)', '\\(n p (1-p)\\)', '\\(k\\) successes in \\(n\\) independent trials'],
            ['Geometric', '\\((1-p)^{k-1} p\\)', '\\(\\frac{1}{p}\\)', '\\(\\frac{1-p}{p^2}\\)', 'Number of trials until first success'],
            ['Poisson', '\\(\\frac{\\lambda^k e^{-\\lambda}}{k!}\\)', '\\(\\lambda\\)', '\\(\\lambda\\)', 'Arrival events in continuous time window']
          ]
        )}

        <h3>7.5 Real-World Enterprise Case Study</h3>
        ${buildInsight('SpamAssassin & Gmail: Naive Bayes Spam Filtering', `
          Early spam filtering algorithms (Paul Graham's Plan for Spam) deployed <strong>Naive Bayes Classifiers</strong>. Given incoming email text containing words \\(W_1, W_2, \\dots, W_n\\), the classifier computes:
          \\[
          P(\\text{Spam} | W_1, \\dots, W_n) \\propto P(\\text{Spam}) \\prod_{i=1}^{n} P(W_i | \\text{Spam})
          \\]
          Tokens like "Viagra", "Wire Transfer", and "Rolex" possess high likelihood multipliers, allowing real-time classification across millions of emails per second with minimal CPU footprint.
        `)}

        <h3>7.6 Interview Failure Modes & Gotchas</h3>
        ${buildWarning('The Gambler Fallacy in Technical Interviews', `
          "If a fair coin lands on Heads 10 consecutive times, what is the probability that the 11th toss is Tails?"
          <strong>Answer: Exactly 0.50.</strong>
          Coins have no memory. Independent trials never "compensate" for previous sequences. Falling into the <strong>Gambler's Fallacy</strong> is an immediate rejection in quantitative assessment rounds.
        `)}

        <h3>7.7 Practice Workshop Challenge</h3>
        ${buildAlgorithm('Challenge: Monty Hall Problem Mathematical Proof', `
          <strong>Problem:</strong> Prove mathematically using Bayes' Theorem why switching doors in the Monty Hall 3-door game increases your probability of winning the car from \\(\\frac{1}{3}\\) to \\(\\frac{2}{3}\\).
        `)}
      `
    },
    {
      id: 11408,
      chapterNumber: 8,
      title: 'Modern Math & Data Interpretation: Progressions (AP/GP/HP), Logarithms, and Chart Analysis',
      subtitle: 'Summation formulas, logarithmic properties, pie chart degree conversions, and bar/line trend analysis',
      summary: 'Master modern mathematics and Data Interpretation (DI): Arithmetic, Geometric, and Harmonic Progressions, logarithm rules, rapid percentage estimation, pie chart degree projections, and multi-table data synthesis.',
      readingTimeMinutes: 28,
      isFreePreview: false,
      sortOrder: 8,
      contentHtml: `
        <h3>8.1 Mathematical Progressions (AP, GP, HP)</h3>
        <p>Sequences and series model linear and exponential growth patterns across financial and algorithmic systems:</p>
        <ul>
          <li><strong>Arithmetic Progression (AP):</strong> Constant common difference \\(d\\).
            \\[
            a_n = a_1 + (n-1)d, \\quad S_n = \\frac{n}{2} [2a_1 + (n-1)d]
            \\]
          </li>
          <li><strong>Geometric Progression (GP):</strong> Constant common ratio \\(r\\).
            \\[
            a_n = a_1 \\cdot r^{n-1}, \\quad S_n = \\frac{a_1(r^n - 1)}{r - 1} \\quad (r \\neq 1)
            \\]
            For an infinite decreasing GP (\\(|r| < 1\\)): \\(S_\\infty = \\frac{a_1}{1 - r}\\).
          </li>
          <li><strong>Harmonic Progression (HP):</strong> Terms are reciprocal of an AP (\\(1/a_1, 1/a_2, \\dots\\)).</li>
        </ul>

        ${buildTheorem('Theorem 8.1: AM-GM-HM Inequality Invariant', `
          For any set of non-negative real numbers \\(x_1, x_2, \\dots, x_n\\), the Arithmetic Mean (AM), Geometric Mean (GM), and Harmonic Mean (HM) strictly satisfy:
          \\[
          \\text{AM} \\ge \\text{GM} \\ge \\text{HM}
          \\]
          Equality holds if and only if all numbers are identical: \\(x_1 = x_2 = \\dots = x_n\\).
        `)}

        <h3>8.2 Architectural Diagram: Pie Chart Degree-to-Percentage Angle Mapping</h3>
        ${buildMemoryDiagram('Data Interpretation: Pie Chart Degree Mapping Geometry', `
TOTAL CIRCLE ANGLE = 360 Degrees = 100%

RAPID MAPPING BENCHMARKS:
- 360 degrees = 100%
- 180 degrees = 50%
-  90 degrees = 25%
-  36 degrees = 10%
-  18 degrees = 5%
-   3.6 deg   = 1%

CONVERSION FORMULAS:
Value % = (Sector Angle in Degrees / 360) * 100
Sector Angle = (Value % / 100) * 360
        `)}

        <h3>8.3 Polyglot Implementation: Data Interpretation Matrix Processor</h3>
        <h5>Python 3.12 (Pandas-Style Data Synthesis & Compounded Growth Rate)</h5>
        ${buildCodeBlock('python', `
def calculate_cagr(initial_value: float, final_value: float, periods: int) -> float:
    """Calculates Compound Annual Growth Rate (CAGR)."""
    assert periods > 0 and initial_value > 0
    return ((final_value / initial_value) ** (1.0 / periods) - 1.0) * 100.0

def pie_chart_degree_to_value(degree: float, total_budget: float) -> float:
    return (degree / 360.0) * total_budget

cagr = calculate_cagr(100.0, 250.0, 5)
print(f"5-Year Revenue Growth from $100M to $250M CAGR: {cagr:.2f}%")
print(f"Engineering Slice (72 degrees) of $5M Budget: $\\{pie_chart_degree_to_value(72, 5000000):,.2f\\}")
        `)}

        <h3>8.4 Logarithmic Rules Cheat Sheet</h3>
        ${buildComplexityTable(
          ['Logarithmic Identity', 'Formula', 'Core Application'],
          [
            ['Product Rule', '\\(\\log_b(xy) = \\log_b(x) + \\log_b(y)\\)', 'Converting multiplication to addition'],
            ['Quotient Rule', '\\(\\log_b(x/y) = \\log_b(x) - \\log_b(y)\\)', 'Division in decibel / magnitude scales'],
            ['Power Rule', '\\(\\log_b(x^k) = k \\log_b(x)\\)', 'Solving exponential decay and half-life'],
            ['Base Change Rule', '\\(\\log_b(x) = \\frac{\\log_a(x)}{\\log_a(b)}\\)', 'Converting between log2, ln, and log10']
          ]
        )}

        <h3>8.5 Real-World Enterprise Case Study</h3>
        ${buildInsight('Amazon AWS DynamoDB & Exponential Backoff Jitter', `
          When distributed API calls encounter rate throttling (HTTP 429 Too Many Requests), client SDKs implement <strong>Exponential Backoff with Full Jitter</strong> based on Geometric Progressions:
          \\[
          \\text{Wait Time } t = \\text{Uniform}(0, \\min(\\text{MaxCap}, \\text{Base} \\times 2^n))
          \\]
          The geometric progression doubles retry intervals on each iteration, preventing thunderous herds from collapsing recovering backend servers.
        `)}

        <h3>8.6 Interview Failure Modes & Gotchas</h3>
        ${buildWarning('Data Interpretation Absolute vs Percentage Point Trap', `
          In placement aptitude data interpretation charts:
          If an interest rate or market share increases from 20% to 25%:
          <ul>
            <li>The increase is <strong>5 percentage points</strong>.</li>
            <li>The <strong>percentage growth</strong> is \\(\\frac{25 - 20}{20} \\times 100 = 25\\%\\)!</li>
          </ul>
          Selecting "5% increase" instead of "25% increase" is one of the most common traps in recruitment tests!
        `)}

        <h3>8.7 Practice Workshop Challenge</h3>
        ${buildAlgorithm('Challenge: Infinite Bouncing Ball Total Distance', `
          <strong>Problem:</strong> A rubber ball is dropped from a height of 100 meters. Each time it bounces from the ground, it rebounds to \\(\\frac{4}{5}\\) of its previous height. Calculate the total vertical distance traveled by the ball before coming to rest.
          <br/><br/>
          <strong>Solution Hint:</strong> Sum of downward drops + sum of upward bounces using infinite GP formula \\(S_\\infty = \\frac{a}{1-r}\\).
        `)}
      `
    }
  ]
};

module.exports = book114;
