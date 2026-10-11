# scripts/enrich_aptitude_curriculum.py
import re
import json

APTITUDE_DEEP_CONCEPTS = {
    1: """Number systems form the bedrock of quantitative aptitude and computational complexity. A number is categorized into Natural Numbers N = {1, 2, 3...}, Whole Numbers W = {0, 1, 2...}, Integers Z = {..., -2, -1, 0, 1, 2...}, Rational Numbers Q = {p/q | q ≠ 0}, and Real Numbers R. 

1. Prime Factorization & Fundamental Theorem of Arithmetic:
Every integer greater than 1 can be represented uniquely as a product of prime powers: N = p1^a1 * p2^a2 * ... * pk^ak.
• Total number of factors = (a1 + 1)(a2 + 1)...(ak + 1)
• Sum of factors = [(p1^(a1+1) - 1)/(p1 - 1)] * [(p2^(a2+1) - 1)/(p2 - 1)] * ...
• Number of coprime pairs: Use Euler's Totient function φ(N) = N * (1 - 1/p1) * (1 - 1/p2)...

2. Cyclicity and Unit Digits Engine:
When an integer is raised to power k, its last digit follows a periodic cycle governed by modulo arithmetic.
• Cyclicity 1: Numbers ending in 0, 1, 5, 6 always end in 0, 1, 5, 6 respectively for any positive integer exponent.
• Cyclicity 2: Numbers ending in 4 cycle as (4, 6) for odd/even powers. Numbers ending in 9 cycle as (9, 1).
• Cyclicity 4: Numbers ending in 2 (2, 4, 8, 6), 3 (3, 9, 7, 1), 7 (7, 9, 3, 1), and 8 (8, 4, 2, 6).
Rule of Exponent Modulo: To compute the unit digit of A^B, evaluate B mod 4. If remainder r > 0, unit digit is the r-th element in the cycle. If remainder is 0, unit digit is the 4th element (even power cycle termination).

3. Fast Divisibility Rules & Remainder Theorems:
• Divisibility by 7: Multiply unit digit by 2 and subtract from remaining number; repeat until verifiable.
• Divisibility by 11: Alternating sum |(Sum of odd place digits) - (Sum of even place digits)| must equal 0 or a multiple of 11.
• Divisibility by Composite Numbers (Co-prime Split): To test divisibility by 72, test simultaneously for 8 (last 3 digits divisible by 8) and 9 (sum of all digits divisible by 9).
• Wilson's Theorem: For prime p, (p - 1)! ≡ -1 (mod p).
• Fermat's Little Theorem: If p is prime and gcd(a, p) = 1, then a^(p-1) ≡ 1 (mod p). This reduces colossal exponential remainders in O(1) mental steps.""",

    2: """Highest Common Factor (HCF / GCD) and Least Common Multiple (LCM) are fundamental dual operations that govern modular arithmetic, concurrency synchronizations, and fractional simplifications.

1. Mathematical Definitions & Invariants:
• HCF (Highest Common Factor): The greatest positive integer that divides each given number without remainder. In prime factor terms, HCF takes the minimum power of each common prime base: HCF = ∏ pi^(min(ai, bi)).
• LCM (Least Common Multiple): The smallest positive integer divisible by all given numbers. In prime factor terms, LCM takes the maximum power across all prime bases: LCM = ∏ pi^(max(ai, bi)).
• Fundamental Invariant: For any two numbers A and B: HCF(A, B) * LCM(A, B) = A * B.
(Note: This product identity applies strictly to two numbers; for 3+ numbers, use inclusion-exclusion).

2. Euclidean Algorithm for Ultra-Fast GCD:
The Euclidean division theorem states that GCD(A, B) = GCD(B, A mod B).
This logarithmic reduction algorithm computes GCD in O(log(min(A, B))) steps, vastly outperforming prime factorization for large numbers.

3. Fractions & Decimal HCF / LCM Rules:
• HCF of Fractions = HCF of Numerators / LCM of Denominators
• LCM of Fractions = LCM of Numerators / HCF of Denominators
Before applying fraction formulas, always ensure every fraction is reduced to its simplest irreducible form (coprime numerator and denominator).

4. Real-World Assessment Word-Problem Patterns:
• Ringing Bells / Flashing Traffic Lights Together: Whenever repetitive cyclical events trigger simultaneously, the meeting interval is given by the LCM of their cycle periods.
• Maximum Tile Size / Measuring Jar: When tiling a rectangular room of dimensions L x W with minimum identical square tiles, side of tile = HCF(L, W), and total tiles needed = (L * W) / (HCF^2).
• Remainder Patterns: 
  - Largest number dividing X, Y, Z leaving remainder R in each case = HCF(X - R, Y - R, Z - R).
  - Smallest number which when divided by X, Y, Z leaves remainder R in each case = LCM(X, Y, Z) + R.""",

    3: """Fractions represent exact divisions of the continuum, categorized into Proper fractions (p < q), Improper fractions (p > q), Mixed fractions, and Decimal Fractions where denominators are powers of 10.

1. Terminating vs Recurring Decimals:
A reduced rational fraction p/q terminates if and only if the prime factorization of denominator q contains only powers of 2 and/or 5: q = 2^m * 5^n. If any other prime factor exists (such as 3, 7, 11, 13), the decimal expansion repeats infinitely as a recurring decimal (periodicity / repetend).

2. Converting Recurring Decimals to Rational Fractions (Algebraic Proof & Shortcut):
• Pure Recurring Decimals: 0.aaaa... = a/9. 
  Example: 0.777... = 7/9.
  For multi-digit period: 0.abab... = ab/99, 0.abcabc... = abc/999.
• Mixed Recurring Decimals: 0.a_nonrep bcd_rep...
  Formula: (Full number formed by non-repeating and repeating digits - Non-repeating portion) / (Nines equal to number of repeating digits followed by Zeros equal to number of non-repeating digits).
  Example: 0.47272... = (472 - 4) / 990 = 468 / 990 = 26 / 55.

3. Rapid Fraction Comparison Without Cross-Multiplication:
• Equal Difference Rule: For proper fractions a/b < 1, adding a positive constant k to both numerator and denominator increases the fraction: (a + k)/(b + k) > a/b.
• Percentage Conversion: Mentally convert reciprocal fractions: 1/7 ≈ 14.28%, 1/8 = 12.5%, 1/9 ≈ 11.11%, 1/11 ≈ 9.09%, 1/12 ≈ 8.33%, 1/13 ≈ 7.69%, 1/16 = 6.25%.
• Base 10 Shift Mechanics: Multiplication by 10^k shifts the decimal point k places right; division shifts k places left.""",

    4: """Algebraic simplification transforms complex symbolic and arithmetic expressions into minimal, evaluated forms using strict operational precedence and identity expansions.

1. Order of Operations (VBODMAS Protocol):
• V: Vinculum (Bar bracket, e.g. ‾8 - 3‾ evaluated first)
• B: Brackets in order: Inner Parentheses ( ), Curly Braces { }, Box Brackets [ ]
• O: Orders / Powers / Roots / 'Of' (multiplication precedence over general operators)
• D: Division & M: Multiplication (Evaluated Left-to-Right)
• A: Addition & S: Subtraction (Evaluated Left-to-Right)
Warning: Common trap is evaluating multiplication before division when division appears to the left. 36 ÷ 6 * 3 = 6 * 3 = 18, NOT 36 ÷ 18 = 2!

2. Core Algebraic Identities for Mental Computation:
• (a + b)^2 = a^2 + 2ab + b^2, (a - b)^2 = a^2 - 2ab + b^2
• (a + b)^2 + (a - b)^2 = 2(a^2 + b^2)
• (a + b)^2 - (a - b)^2 = 4ab
• a^2 - b^2 = (a - b)(a + b)
• a^3 + b^3 = (a + b)(a^2 - ab + b^2)
• a^3 - b^3 = (a - b)(a^2 + ab + b^2)
• Master Identity: a^3 + b^3 + c^3 - 3abc = (a + b + c)(a^2 + b^2 + c^2 - ab - bc - ca)
  Key Theorem: If a + b + c = 0, then a^3 + b^3 + c^3 = 3abc! This allows instant simplification of expressions like (28)^3 + (-15)^3 + (-13)^3 = 3 * 28 * (-15) * (-13).

3. Linear and Quadratic Equations:
• Quadratic Roots: For ax^2 + bx + c = 0, roots x = [-b ± √(b^2 - 4ac)] / 2a.
• Sum of roots = -b/a, Product of roots = c/a.
• Surd Simplification: To find √(a + √b), express it in form √(x) + √(y) by solving x + y = a and 4xy = b.""",

    5: """Percentage is a standardized ratio expressed as a fraction of 100. It is the single most heavily tested foundational topic across campus placements, consulting benchmarks, and technical aptitude screens.

1. Multiplier Concept (Decimal Scaling Factor):
Instead of computing percentage and adding/subtracting in two manual steps, use single-step multipliers:
• An increase of P% scales the quantity by (1 + P/100). E.g., +25% => multiply by 1.25 (or 5/4).
• A decrease of P% scales the quantity by (1 - P/100). E.g., -15% => multiply by 0.85 (or 17/20).
• Compounded multi-step changes: Final = Initial * M1 * M2 * M3.

2. Product-Constancy and Compensatory Variations:
If Quantity = Price * Consumption, and Expenditure is kept constant:
• If price increases by a/b, consumption must decrease by a / (a + b) to keep expenditure unchanged.
• If price increases by 25% (1/4), consumption must decrease by 1/(4+1) = 1/5 = 20%.
• If price decreases by a/b, consumption must increase by a / (b - a).
• If price drops by 20% (1/5), consumption increases by 1/(5-1) = 1/4 = 25%.

3. Successive Percentage Change Formula:
When a quantity undergoes two consecutive changes of A% and B%:
Net Percentage Change = [A + B + (A * B) / 100]%
(Preserve positive signs for increase and negative signs for decrease).
Example: A 20% hike followed by a 10% discount gives: +20 - 10 + (20 * -10)/100 = 10 - 2 = +8% net gain.

4. Base Shift Pitfalls:
A percentage change is strictly relative to its initial base. If A is 25% more than B: A = 1.25 B. Then B as a percentage of A is (B / 1.25 B) = 1/1.25 = 80%, which means B is 20% less than A, NOT 25% less!""",

    6: """Profit, Loss, and Discount quantify the financial economics of commercial transactions. They are formulated entirely in terms of Cost Price (CP), Selling Price (SP), and Marked Price (MP / List Price).

1. Foundational Relationships:
• Profit (Gain) = SP - CP (when SP > CP)
• Loss = CP - SP (when CP > SP)
• Profit % = (Profit / CP) * 100 (Profit is always calculated on CP unless stated otherwise)
• Loss % = (Loss / CP) * 100
• SP = CP * (100 + P%) / 100 or CP * (100 - L%) / 100

2. Markup and Discounts:
• Marked Price (MP): The catalogue price tagged onto goods before offering customer discounts.
• Markup % = [(MP - CP) / CP] * 100
• Discount = MP - SP
• Discount % = (Discount / MP) * 100 (Discount is always calculated on Marked Price)
• SP = MP * (100 - D%) / 100
• Master Golden Ratio connecting CP, MP, Profit% and Discount%:
  CP / MP = (100 - Discount%) / (100 + Profit%)

3. Successive Discounts:
When successive trade discounts of d1%, d2%, and d3% are offered on an item:
Net SP = MP * (1 - d1/100) * (1 - d2/100) * (1 - d3/100)
Equivalent Single Discount = [d1 + d2 - (d1 * d2)/100]% for two discounts.
Example: Successive discounts of 20% and 10% yield: 20 + 10 - 2 = 28% net discount, not 30%!

4. Dishonest Shopkeeper & False Weights:
When a trader claims to sell at Cost Price but cheats using a false weight:
Gain % = [Error / (True Value - Error)] * 100
If a merchant uses 900g instead of 1000g: Error = 100g, True - Error = 900g.
Gain % = (100 / 900) * 100 = 11.11%.""",

    7: """Interest represents the time value of capital. It separates into Simple Interest (where interest accrues linearly on the static principal) and Compound Interest (where interest compounds exponentially upon accumulated capital).

1. Simple Interest (SI):
• Formula: SI = (P * R * T) / 100
  Where P = Principal, R = Annual Rate of Interest (%), T = Time in years.
• Total Amount A = P + SI = P * [1 + (R * T)/100].
• Linear Invariant: SI is identical in every individual year. If an investment doubles in 5 years, it earned 100% principal interest in 5 years, so rate R = 100/5 = 20% per year.

2. Compound Interest (CI):
• Annual Compounding: A = P * [1 + R/100]^T
• Semi-Annual (Half-Yearly) Compounding: A = P * [1 + (R/2)/100]^(2T)
• Quarterly Compounding: A = P * [1 + (R/4)/100]^(4T)
• Continuous Compounding: A = P * e^(r*t)
• Compound Interest CI = A - P = P * [(1 + R/100)^T - 1]

3. Difference Between CI and SI (Most Frequently Tested Shortcut):
• For 2 Years: Difference = P * (R / 100)^2
• For 3 Years: Difference = P * (R / 100)^2 * [(300 + R) / 100]

4. Rule of 72 & Doubling Times:
• Doubling Period ≈ 72 / R years under annual compound interest. E.g., at 8% annual return, capital doubles in ~9 years.
• Tripling Period ≈ 114 / R years.
• When a sum quadruples under CI in N years, it doubles in N/2 years because (1 + R/100)^N = 4 = 2^2.""",

    8: """Ratio expresses the relative magnitude of two or more quantities of identical dimension. Proportion denotes the formal equivalence between two independent ratios.

1. Definitions & Ratio Operations:
• If a : b = c : d, then a, b, c, d are in proportion, written a : b :: c : d.
• Product of Extremes = Product of Means: a * d = b * c.
• Fourth Proportional to a, b, c is x = (b * c) / a.
• Third Proportional to a and b is x = b^2 / a.
• Mean Proportional between a and b is √(a * b).
• Compounded Ratio of (a:b) and (c:d) is (a*c) : (b*d).

2. Ratio Scaling & Invertendo/Componendo/Dividendo:
• Invertendo: If a/b = c/d, then b/a = d/c.
• Alternando: If a/b = c/d, then a/c = b/d.
• Componendo & Dividendo: If a/b = c/d, then (a + b) / (a - b) = (c + d) / (c - d).
This property is invaluable for rapidly solving equations such as (√(x+1) + √(x-1)) / (√(x+1) - √(x-1)) = 3.

3. Chain Ratios (Bridging Multiple Variables):
If A : B = 2 : 3 and B : C = 4 : 5:
Find LCM of common term B (LCM of 3 and 4 is 12).
Scale first ratio by 4: A : B = 8 : 12.
Scale second ratio by 3: B : C = 12 : 15.
Consolidated Ratio: A : B : C = 8 : 12 : 15.

4. Direct and Inverse Variation:
• Direct Variation: Y ∝ X => Y1 / X1 = Y2 / X2.
• Inverse Variation: Y ∝ 1/X => Y1 * X1 = Y2 * X2.
• Joint Variation: Z ∝ (X / Y) => (Z1 * Y1) / X1 = (Z2 * Y2) / X2.""",

    9: """Partnership quantitative problems analyze financial business ventures where two or more partners invest capital for variable durations, requiring profit and loss sharing in direct proportion to capital-time weightings.

1. The Fundamental Law of Partnership:
Profit Ratio = (Capital 1 * Time 1) : (Capital 2 * Time 2) : ... : (Capital n * Time n)
If investment durations are identical, profit distribution mirrors capital investments directly: P1 : P2 = C1 : C2.
If investment amounts are identical, profit distribution mirrors investment durations: P1 : P2 = T1 : T2.

2. Active vs Sleeping Partners:
• Working (Active) Partner: A partner who manages daily business operations and receives a fixed salary or commission percentage from total revenue/profit before the remaining profit is distributed.
• Sleeping (Financing) Partner: A partner who only contributes capital and receives returns solely through profit sharing.
• Calculation Flow:
  1. Deduct operational salary/commission: Net Distributable Profit = Total Profit - Active Management Fees.
  2. Distribute the remaining balance among all partners strictly in ratio of (Capital * Time).

3. Dynamic Capital Injection & Withdrawal:
When partners alter their invested capital periodically:
Effective Capital = ∑ (Capital_i * Months_i) for each partner over the fiscal year.
Example: A invests $10,000 for 12 months. B invests $15,000 initially, withdraws $5,000 after 4 months.
Effective Capital A = 10,000 * 12 = 120,000.
Effective Capital B = (15,000 * 4) + (10,000 * 8) = 60,000 + 80,000 = 140,000.
Profit Ratio A : B = 120,000 : 140,000 = 6 : 7.""",

    10: """Problems on Ages are structured linear word problems involving time translations (past, present, future). They test your ability to convert linguistic relationships into precise simultaneous algebraic systems.

1. Core Time Translation Invariant:
• The absolute difference between the ages of two individuals remains invariant across all time.
If Father is 24 years older than Son today, Father will remain exactly 24 years older 10 years in the past or 50 years into the future.
• Let present age be X.
  Age 'N' years ago = (X - N).
  Age 'N' years hence = (X + N).

2. Ratio Scaling Method (Mental Math Without Algebraic Variables):
Suppose the ratio of ages of A and B is 3 : 4 today, and becomes 4 : 5 after 5 years.
• Check the horizontal difference: In 3:4, difference = 1 unit. In 4:5, difference = 1 unit. Differences are already equal!
• Check the vertical step: A goes from 3 to 4 units (+1 unit). B goes from 4 to 5 units (+1 unit).
• 1 unit increase corresponds to the 5-year chronological interval.
• Therefore, 1 unit = 5 years.
• Present age of A = 3 * 5 = 15 years, B = 4 * 5 = 20 years!

3. Handling Unequal Horizontal Differences:
If A : B is 2 : 3 now, and 5 : 7 in 10 years:
Difference in first ratio = 3 - 2 = 1. Difference in second ratio = 7 - 5 = 2.
Multiply the first ratio by 2 to balance differences: 4 : 6 (difference is now 2).
Vertical step: 4 -> 5 (+1 unit) in 10 years.
1 unit = 10 years. Present ages: A = 40, B = 60!""",

    11: """Average (Arithmetic Mean) is the single representative value summarizing a set of numbers, defined as the ratio of total sum of observations to the total number of observations.

1. Definitions & The Deviation Balancing Principle:
• Average = Sum of all observations / Number of observations => Sum = Average * N.
• Deviation Method: Choose an assumed mean A. The sum of algebraic deviations of all items from the true average is always zero: ∑ (Xi - Mean) = 0.
This eliminates calculating huge multi-digit sums. If numbers are 98, 102, 105, 94, 101, choose A = 100. Deviations are (-2, +2, +5, -6, +1) = 0. Mean = 100!

2. Weighted Average:
When combining groups with different counts and individual averages:
Weighted Average = (N1 * A1 + N2 * A2 + ... + Nk * Ak) / (N1 + N2 + ... + Nk).

3. Impact of Universal Transformations:
• If each observation is increased/decreased by k, the new average increases/decreases by k.
• If each observation is multiplied/divided by k (k ≠ 0), the new average is multiplied/divided by k.

4. Replacement & Addition Shortcuts:
• New Item Added: Weight of New Person = Old Average + (New Count * Increase in Average).
• Item Replaced: Weight of New Person = Weight of Replaced Person + (Total Count * Change in Average).
Example: Average weight of 24 students increases by 1 kg when a student weighing 40 kg is replaced.
New Student Weight = 40 + (24 * 1) = 64 kg!""",

    12: """Alligation is a specialized graphical algorithm that reverses weighted averages to determine the exact mixing ratio of two constituent ingredients differing in price, concentration, or quality.

1. The Alligation Cross Rule:
Let C = Cheaper value, D = Dearer (Higher) value, and M = Mean (Desired Mixture) value.
Rule:
(Quantity of Cheaper) / (Quantity of Dearer) = (Dearer Price - Mean Price) / (Mean Price - Cheaper Price) = (D - M) / (M - C)

Diagrammatic Cross Representation:
       Cheaper (C)         Dearer (D)
                 \         /
                   Mean (M)
                 /         \
            (D - M)       (M - C)
Ratio of quantities = (D - M) : (M - C).

2. Critical Rule of Common Reference Base:
All three quantities (C, D, and M) must represent identical metrics computed on the same base:
• If mixing liquids with profit: Mean price MUST be converted to Cost Price before applying alligation!
  If selling price is $120 with 20% profit, CP = 120 / 1.2 = $100. Use M = 100, not 120!

3. Successive Dilution / Replacement Formula:
A vessel initially contains Q units of pure liquid. If x units are withdrawn and replaced with water, and this operation is repeated n times:
Remaining Pure Liquid = Q * [1 - (x / Q)]^n
Ratio of pure liquid to total solution = [1 - (x / Q)]^n.""",

    13: """Time and Work problems model rate-of-work mechanics, where the total work is normalized as a unified task (1 whole unit) or mapped to integer units using LCM for lightning-fast mental resolution.

1. The Inversion Rule and The LCM Method:
• If a worker completes a project in D days, their 1-day work rate is 1/D of the total task.
• Modern LCM Method:
  1. Let Total Work = LCM of individual completion times.
  2. Efficiency (Units/Day) = Total Work Units / Days.
  3. Total Time = Total Work Units / Combined Efficiency.
  Example: A takes 10 days, B takes 15 days. LCM(10, 15) = 30 units.
  A's rate = 3 units/day, B's rate = 2 units/day.
  Together = 3 + 2 = 5 units/day.
  Time taken = 30 / 5 = 6 days!

2. Chain Rule (The Universal Work Equation):
For multi-worker groups with varying hours and days:
(M1 * D1 * H1 * E1) / W1 = (M2 * D2 * H2 * E2) / W2
Where M = Men, D = Days, H = Hours/day, E = Efficiency, W = Work produced (or food consumed).

3. Pipes and Cisterns Mechanics:
• Inlet Pipes do positive work: Rate = +Total Capacity / Time.
• Outlet (Leak) Pipes do negative work: Rate = -Total Capacity / Time.
• Net Filling Rate = ∑ (Inlet Rates) - ∑ (Outlet Rates).
If a leak empties a full tank in 20 hours while inlet fills in 10 hours: Capacity = 20 units. Inlet = +2, Leak = -1. Net = +1 unit/hr. Tank fills in 20 hours.""",

    14: """Time, Speed, and Distance (TSD) form the core physics of kinematic motion applied to aptitude. All variations derive from the fundamental relation: Distance = Speed * Time.

1. Unit Conversions & Proportionality Invariants:
• km/h to m/s: Multiply by 5/18 (since 1000m / 3600s = 5/18).
• m/s to km/h: Multiply by 18/5.
• Constant Distance Invariant: Speed ∝ 1 / Time. If speed increases by 25% (4 -> 5), time taken reduces by 20% (5 -> 4).
• Constant Time Invariant: Distance ∝ Speed.
• Constant Speed Invariant: Distance ∝ Time.

2. Average Speed (Harmonic Mean):
Average Speed = Total Distance Covered / Total Time Taken.
• Equal Distances Scenario: When covering distance D at speed S1 and returning at speed S2:
  Average Speed = (2 * S1 * S2) / (S1 + S2) [Harmonic Mean].
  Warning: It is NEVER the arithmetic average (S1 + S2)/2!
• Equal Times Scenario: If traveling at S1 for T hours and S2 for T hours:
  Average Speed = (S1 + S2) / 2 [Arithmetic Mean].

3. Relative Speed:
• Moving in Opposite Directions (towards or away): Relative Speed = S1 + S2.
• Moving in Same Direction: Relative Speed = |S1 - S2|.
• Meeting Time = Initial Distance Apart / Relative Speed.
• Circular Track:
  - First meeting time = Circumference / Relative Speed.
  - Meeting at starting point = LCM(T1, T2).""",

    15: """Trains, Boats, and Races are high-frequency specialized sub-disciplines of Time, Speed, and Distance featuring physical object dimensions and flowing medium velocities.

1. Train Motion Mechanics:
• Crossing a Stationary Point Object (pole, tree, standing man):
  Distance to cover = Length of Train (L_train). Time = L_train / S_train.
• Crossing a Platform / Bridge / Tunnel of Length L_plat:
  Distance to cover = L_train + L_plat. Time = (L_train + L_plat) / S_train.
• Two Trains Crossing:
  Distance to cover = Length 1 + Length 2.
  Speed = S1 + S2 (opposite direction) or |S1 - S2| (same direction).

2. Boats and Streams (Hydrodynamic Motion):
Let B = Speed of boat in still water, S = Speed of stream/current.
• Downstream Speed (with current): D = B + S.
• Upstream Speed (against current): U = B - S.
• Boat in Still Water B = (Downstream + Upstream) / 2 = (D + U) / 2.
• Stream Speed S = (Downstream - Upstream) / 2 = (D - U) / 2.

3. Linear Races and Head Starts:
• "A beats B by x meters in a 100m race": When A covers 100m, B has covered (100 - x)m.
• "A beats B by t seconds": When A crosses finish line, B requires t more seconds.
• Head Start: If A gives B a start of x meters, B starts from position x while A starts at 0.
  Dead Heat: Both runners reach the finish line simultaneously.""",

    16: """Combinatorics is the branch of discrete mathematics focused on counting, arrangement, and selection. It is governed by two bedrock operational axioms: The Multiplication and Addition Principles.

1. Fundamental Counting Principles:
• Rule of Product (Multiplication): If event A occurs in m ways and independent event B occurs in n ways, both occur in m * n ways.
• Rule of Sum (Addition): If mutually exclusive event A occurs in m ways and B occurs in n ways, either A OR B occurs in m + n ways.

2. Permutations (Order Matters):
• Arrangement of r distinct items selected from n items:
  nPr = n! / (n - r)!
• Identical Items: Distinct permutations of n objects where p are identical of type 1, q of type 2:
  Permutations = n! / (p! * q! * r!).
• Circular Permutations: Arranging n distinct objects in a circle = (n - 1)!.
  For necklaces/garlands (where clockwise and counter-clockwise are indistinguishable) = (n - 1)! / 2.

3. Combinations (Selection Only - Order Irrelevant):
• Selection of r items from n items:
  nCr = n! / [r! * (n - r)!]
• Symmetry Invariant: nCr = nC(n - r).
• Pascal's Identity: nCr + nC(r - 1) = (n + 1)Cr.
• Sum of all subsets: nC0 + nC1 + ... + nCn = 2^n.

4. Advanced Arrangement Techniques:
• Tie-Together (String / Block) Method: When items must always be together, bind them into 1 composite block.
• Gap Method: When no two items of a given type may sit together, arrange remaining items first, then place constrained items in the gaps.""",

    17: """Probability formalizes uncertainty, measuring the likelihood of random events on a real normalized scale [0, 1].

1. Classical Probability Definition:
P(E) = Number of Favorable Outcomes / Total Exhaustive Outcomes in Sample Space = n(E) / n(S).
• Impossible event: P = 0. Certain event: P = 1. Complementary event: P(E') = 1 - P(E).

2. Addition and Multiplication Laws:
• Addition Law (Union): P(A ∪ B) = P(A) + P(B) - P(A ∩ B).
  For mutually exclusive events: P(A ∩ B) = 0 => P(A ∪ B) = P(A) + P(B).
• Multiplication Law (Intersection): P(A ∩ B) = P(A) * P(B|A).
  For independent events: P(A ∩ B) = P(A) * P(B).

3. Standard Benchmark Sample Spaces:
• Coin Tosses: For n fair coins, total outcomes = 2^n.
• Dice Throws: For 2 fair dice, total outcomes = 6^2 = 36.
  Sum distribution for 2 dice: Sum of 7 has maximum probability (6/36 = 1/6).
• Standard 52-Card Deck: 4 suits of 13 cards (Hearts, Diamonds, Clubs, Spades). 26 Red, 26 Black. 12 Face cards (J, Q, K).

4. Conditional Probability & Bayes' Theorem:
• P(A|B) = P(A ∩ B) / P(B) [Probability of A given B has already occurred].
• Bayes' Theorem reverses conditionality to find posterior probability:
  P(A|B) = [P(B|A) * P(A)] / P(B).""",

    18: """Data Interpretation (DI) tests graphical analysis, synthetic trend forecasting, and numerical rapid estimation across tables, bar charts, line graphs, pie charts, and radar maps.

1. Chart Types & Angles in Pie Charts:
• Pie Chart Angular Mechanics: 100% corresponds to 360°.
  1% = 3.6°. Conversely, 1° = 100 / 360 = 5/18%.
  To convert an angle θ° to percentage: % = θ / 3.6.
• Bar and Line Charts: Used for chronological time series, growth rates, and category comparisons.

2. The 4 Essential Calculations in DI:
• Absolute Growth = Value_final - Value_initial.
• Percentage Growth = [(Value_final - Value_initial) / Value_initial] * 100.
• Compounded Annual Growth Rate (CAGR) = (Final / Initial)^(1/t) - 1.
• Share of Total = (Sub-category Value / Total Grand Sum) * 100.

3. Speed Calculation Techniques for DI:
• Approximation & Rounding: Round numbers to 2 or 3 significant digits before computing division (e.g., 47,892 / 121,450 ≈ 48 / 121 ≈ 39.6%).
• Fraction-to-Percentage Recall: Memorize reciprocals 1/2 through 1/16 to convert ratios instantly without pen and paper.
• Visual Inspection: In bar charts, eliminate options by inspecting steepness of slopes rather than calculating every intermediate data point.""",

    19: """Mensuration computes perimeter, surface area, and volume across 2-dimensional plane figures and 3-dimensional solid spatial geometries.

1. 2D Planar Geometries:
• Triangles: Area = 1/2 * base * height.
  Heron's Formula: Area = √[s(s - a)(s - b)(s - c)] where semi-perimeter s = (a + b + c)/2.
  Equilateral Triangle: Area = (√3 / 4) * a^2, Height = (√3 / 2) * a.
• Quadrilaterals:
  Rectangle: Area = l * w, Diagonal = √(l^2 + w^2).
  Rhombus: Area = 1/2 * d1 * d2, Side = 1/2 * √(d1^2 + d2^2).
  Trapezoid: Area = 1/2 * (a + b) * h.
• Circle: Area = πr^2, Circumference = 2πr.
  Sector Area = (θ / 360) * πr^2, Arc Length = (θ / 360) * 2πr.

2. 3D Spatial Geometries:
• Cylinder: Volume = πr^2h, Curved Surface Area = 2πrh, Total Surface Area = 2πr(r + h).
• Cone: Slant Height l = √(r^2 + h^2). Volume = 1/3 * πr^2h, CSA = πrl, TSA = πr(r + l).
• Sphere: Volume = 4/3 * πr^3, Surface Area = 4πr^2.
• Hemisphere: Volume = 2/3 * πr^3, CSA = 2πr^2, TSA = 3πr^2.

3. Melting, Recasting, and Dimensional Scaling:
• When a solid is melted and recast into another shape, Total Volume remains conserved.
• If all linear dimensions of a 3D solid are scaled by factor k:
  Perimeter / Length scales by k.
  Surface Area scales by k^2.
  Volume scales by k^3.""",

    20: """Blood Relations problems model genealogical lineage structures, evaluating kinship connectivity across generational tiers using structured Family Tree Graphs.

1. Standard Family Tree Representation Rules:
• Horizontal Line (—): Sibling relationship (Brother — Sister).
• Double Horizontal Line (=): Marital relationship (Husband = Wife).
• Vertical Line (|): Generational relationship (Parent above, Offspring below).
• Gender Badges: Box [ ] or (+) for Male; Circle ( ) or (-) for Female.

2. Generational Tiers Hierarchy:
• Generation +2: Paternal/Maternal Grandfather, Grandmother.
• Generation +1: Father, Mother, Uncle (paternal/maternal), Aunt.
• Generation 0 (Self): Ego, Brother, Sister, Cousin, Brother-in-law, Sister-in-law.
• Generation -1: Son, Daughter, Nephew, Niece.
• Generation -2: Grandson, Granddaughter.

3. Deciphering "Pointing to a Person" Puzzles:
Always parse the statement backwards from the ego identifier ("my"):
Example: "He is the only son of my father's only daughter."
1. "My father's only daughter" = Myself (if speaker is female) or My sister (if speaker is male).
2. "The only son of myself" = My Son.
Conclusion: The person is the speaker's son.""",

    21: """Direction Sense problems measure spatial navigation, rotational displacement, and trigonometric vectors relative to the standard 8-point compass rose.

1. The 8-Point Compass System:
• Cardinal Directions: North (0°), East (90°), South (180°), West (270°).
• Intercardinal Directions: North-East (45°), South-East (135°), South-West (225°), North-West (315°).
• Right Turn = 90° Clockwise.
• Left Turn = 90° Counter-Clockwise.

2. Vector Coordinates & Pythagorean Theorem:
Treat the starting point as origin (0, 0) on Cartesian plane:
• Walking North increases y (+y); Walking South decreases y (-y).
• Walking East increases x (+x); Walking West decreases x (-x).
• Net Displacement: Shortest straight-line distance d = √(Δx^2 + Δy^2).

3. Shadow Problems (Solar Compass Invariants):
• Morning (Sunrise in East): Shadows always cast towards West.
  If facing North, shadow falls to Left. If facing South, shadow falls to Right.
• Evening (Sunset in West): Shadows always cast towards East.
  If facing North, shadow falls to Right. If facing South, shadow falls to Left.
• Exactly Noon (12 PM): Sun is directly overhead; no horizontal shadow is cast.""",

    22: """Series Completion assesses inductive pattern recognition across numerical sequences, alphabetic strings, and alphanumeric hybrids.

1. Classification of Number Series Patterns:
• Difference Series: Compute 1st and 2nd level differences. If 2nd differences are constant, it is a quadratic sequence an^2 + bn + c.
• Multiplicative & Alternating: Numbers scale by factor k ± c (e.g., *2 + 1, *3 - 2).
• Polynomial & Geometric: Powers of consecutive primes or n^2 ± k, n^3 ± k.
• Fibonacci / Accumulator: Each term is sum of preceding two: x_n = x_(n-1) + x_(n-2).

2. Letter & Alphabetical Series Mechanics:
• Direct Position Codes: A=1, B=2 ... Z=26.
• Reverse Position Codes: Z=1, Y=2 ... A=26 (Formula: Reverse = 27 - Direct).
• Mnemonic "EJOTY": E=5, J=10, O=15, T=20, Y=25 for rapid positional navigation.
• Opposite Letter Pairs (Sum of positions = 27):
  A-Z (AZ), B-Y (BY), C-X (CruX), D-W (Dew), E-V (EVen), F-U (FUll), G-T (GT road), H-S (High School), I-R (Indian Rail), J-Q (Jungle Queen), K-P (KanPur), L-O (LOve), M-N (MaN).""",

    23: """Coding and Decoding transforms plaintext into encrypted cipher text via systematic algebraic shifts, anagram scrambling, or symbol mappings.

1. Cipher Types:
• Caesar / Shift Cipher: Each letter is translated forward or backward by a constant k: C = (P + k) mod 26.
• Reverse & Cross-Pattern Coding: Word is split into halves, and each half is reversed independently (e.g. SYSTEM -> SYS / TEM -> SYSTEM scrambled).
• Substitution & Position Coding: Letters mapped directly to numeric values or symbols.
• Matrix / Sentence Decryption ("Chinese Coding"): Multiple statements share common words. Isolate codes by finding common words across overlapping sentences.""",

    24: """Analogy reasoning tests relational abstraction, identifying the hidden relationship connecting pair A:B and projecting that exact relation onto C:D.

1. Analogy Taxonomy:
• Semantic & Linguistic: Synonyms, Antonyms, Part-to-Whole, Worker-to-Tool, Cause-and-Effect.
• Scientific & Empirical: Instrument to Measurement (Barometer:Pressure :: Ammeter:Current).
• Mathematical & Numerical: Squares, Cubes, Digit sums, Prime intervals (7 : 56 :: 9 : 90 => n : n(n+1)).""",

    25: """Seating Arrangement puzzles test constrained spatial permutations across Linear lines, Parallel rows, and Closed Circular/Polygonal perimeters.

1. Circular Arrangement Invariants:
• Facing Center: Right is Counter-Clockwise; Left is Clockwise.
• Facing Outward: Right is Clockwise; Left is Counter-Clockwise.
• Step 1: Count total entities (N). For even N, opposite pairs sit separated by (N/2 - 1) people.
• Step 2: Anchor definitive statements first (e.g. "A sits 3rd to right of B").
• Step 3: Handle indeterminate clues by branching into 2 parallel hypothetical cases.""",

    26: """Data Arrangement & Complex Puzzles synthesize multiple relational dimensions (names, professions, cities, colors, days) into structured Grid Matrices.

1. Solving Methodology:
• Construct a 2D matrix where static categories (days of week, floors) form columns or rows.
• Use Checkmarks (✓) for confirmed matches and Crosses (✗) for definite negatives.
• Never guess: Propagate deductions using process of elimination.""",

    27: """Clock problems model continuous uniform angular velocities of minute and hour hands revolving around a 360° circular dial.

1. Angular Velocities:
• Minute Hand: Moves 360° in 60 mins = 6° per minute.
• Hour Hand: Moves 360° in 12 hours = 0.5° per minute.
• Relative Speed of Minute hand relative to Hour hand = 6° - 0.5° = 5.5°/min = (11/2)° per minute.

2. Master Angle Formula:
Angle θ between hands at H hours and M minutes:
θ = |30 * H - (11/2) * M|
(If θ > 180°, reflex angle is 360° - θ).

3. Coincidence, Right Angle & Opposite Positions:
• Hands coincide (θ = 0°): 11 times in 12 hours (22 times in 24 hours).
• Hands opposite (θ = 180°): 11 times in 12 hours.
• Hands perpendicular (θ = 90°): 22 times in 12 hours (44 times in 24 hours).""",

    28: """Calendar calculations determine the day of the week for any historical or future date using Gregorian modular arithmetic and "Odd Days".

1. Odd Days Definition:
The remainder when total number of days is divided by 7: Odd Days = Total Days mod 7.
• Ordinary Year (365 days): 52 weeks + 1 odd day.
• Leap Year (366 days): 52 weeks + 2 odd days.
• Leap Year Rule: Divisible by 4, except century years which must be divisible by 400 (e.g., 2000 was leap, 1900 was not).

2. Century Odd Days Invariants:
• 100 Years = 5 odd days.
• 200 Years = (5 * 2) mod 7 = 3 odd days.
• 300 Years = (5 * 3) mod 7 = 1 odd day.
• 400 Years = 0 odd days (Cycles restart completely every 400 years!).
• Day Map: 0=Sun, 1=Mon, 2=Tue, 3=Wed, 4=Thu, 5=Fri, 6=Sat.""",

    29: """Syllogisms deduce formal logical truths from categorical premises using Aristotle's categorical logic or Euler/Venn Diagrams.

1. Categorical Quantifiers:
• Universal Affirmative (A): "All S are P" (100% inclusion).
• Universal Negative (E): "No S are P" (0% inclusion).
• Particular Affirmative (I): "Some S are P" (>0% overlap).
• Particular Negative (O): "Some S are not P".

2. Golden Syllogism Rules:
• Two negative premises yield NO valid conclusion.
• Two particular premises yield NO valid conclusion.
• If one premise is negative, conclusion must be negative.
• "Possibility" conclusions hold true if there exists at least one valid Venn diagram configuration satisfying the premises.""",

    30: """Data Sufficiency evaluates whether given information is mathematically adequate to solve a problem without executing tedious full calculations.

1. Decision Flowchart:
• Statement 1 Alone: Sufficient or Insufficient.
• Statement 2 Alone: Sufficient or Insufficient.
• If neither alone is sufficient, combine Statement 1 + Statement 2.
• Trap: Do not assume unstated properties (e.g. do not assume x is an integer unless explicitly specified!).""",

    31: """Cube cutting and painting problems analyze 3D geometric volumetric dissections of a large cube sliced into n^3 smaller identical unit cubes.

1. Formula Matrix for Painted Cube Cuts:
Let a cube painted on all outer faces be cut into n equal unit cubes along each edge (Total cubes = n^3):
• 3 Faces Painted: Exactly 8 cubes (the 8 corners of the cube, independent of n).
• 2 Faces Painted: Located on edges = 12 * (n - 2).
• 1 Face Painted: Located on face centers = 6 * (n - 2)^2.
• 0 Faces Painted (Unpainted Core): Inner volume = (n - 2)^3.""",

    32: """Visual and Non-Verbal Reasoning tests mental spatial rotation, symmetrical reflections across water and mirror planes, and paper folding dissections.

1. Reflection Invariants:
• Mirror Image (Vertical Axis): Left and Right invert; Top and Bottom remain unchanged.
• Water Image (Horizontal Axis): Top and Bottom invert; Left and Right remain unchanged.
• Paper Folding & Punching: Unfolding is mathematically identical to reflecting across each crease line in reverse order.""",

    33: """Cryptarithmetic puzzles are mathematical alphametic ciphers where alphabetic letters replace numerical digits [0-9] in arithmetic equations.

1. Solving Rules & Invariants:
• Each distinct letter represents a unique digit (0-9).
• The leading digit of a number can NEVER be 0.
• Addition Carry-Over Rule: When adding two single digits, maximum sum is 9 + 9 + 1 (carry) = 19.
  Therefore, any carry-over from adding two columns can ONLY be 1! (e.g., in SEND + MORE = MONEY, M must be 1).""",

    34: """Articles (a, an, the) and Prepositions govern nominal determiners and spatial/temporal relationships in standard English syntax.

1. Indefinite Articles (A / An):
• Chosen strictly by initial phonetic sound, NOT spelling!
  - "An hour", "An honest man" (silent h => vowel sound).
  - "A European", "A university" (consonant 'yu' sound).
2. Definite Article (The): Used for unique entities, superlatives, and previously introduced nouns.
3. Prepositions of Time & Place:
• At: Exact points in time or specific locations (at 5 PM, at the station).
• On: Days, dates, and flat surfaces (on Monday, on the table).
• In: Enclosed spaces, months, years, and long eras (in July, in 2026, in the room).""",

    35: """Tenses and Subject-Verb Agreement constitute the core grammatical rules governing sentence construction in competitive examinations.

1. Subject-Verb Agreement Invariants:
• Singular subject requires singular verb; plural subject requires plural verb.
• Prepositional Phrase Trap: "The quality of the apples [is/are] good" => Subject is 'quality' (singular), so verb is 'is'!
• Either...Or / Neither...Nor: Verb agrees with the nearest subject ("Neither the teacher nor the students were present").
• Indefinite Pronouns: Everyone, somebody, each, neither are grammatically singular.""",

    36: """Voice (Active/Passive) and Speech (Direct/Indirect) evaluate syntax transformation without altering semantic meaning.

1. Active to Passive Voice Rules:
• Subject becomes object, and Object becomes subject.
• Standard form: Subject + Helping Verb + Past Participle (V3) + by + Object.
• Continuous tenses introduce "being": "is repairing" -> "is being repaired".
2. Direct to Indirect Speech:
• Backshift of tenses: Simple Present -> Simple Past; Present Perfect -> Past Perfect.
• Time shifts: "today" -> "that day", "now" -> "then", "yesterday" -> "the previous day".""",

    37: """Error Spotting tests rapid identification of grammatical violations across parallelism, modifiers, and idiomatic expressions.

1. Frequent Exam Traps:
• Dangling Modifiers: "Walking down the street, a car hit him" (car was not walking!). Correct: "While he was walking down the street, a car hit him."
• Faulty Parallelism: Correlative conjunctions (not only... but also) must balance identical grammatical parts of speech.
• Redundancy: "Return back" (return already means go back), "Discuss about".""",

    38: """Vocabulary mastery relies on Etymology (Greek and Latin root words), prefixes, and morphological affixes.

1. High-Yield Root Words:
• 'Mal-' (bad/evil): Malicious, Malevolent, Malignant.
• 'Bene-' (good/well): Benefactor, Benevolent, Beneficial.
• 'Chron-' (time): Chronic, Anachronism, Synchronize.
• 'Loqu- / Locu-' (speak): Loquacious, Eloquent, Circumlocution.
• 'Path-' (feeling): Sympathy, Apathy, Antipathy, Empathy.""",

    39: """Sentence Completion and One-Word Substitution evaluate context clues, tonal direction, and precise lexical substitution.

1. Structural Sentence Clues:
• Contrast Markers (Although, Despite, However, Yet): Second clause contrasts with first.
• Elaboration Markers (Moreover, Furthermore, In addition): Second clause reinforces first.
2. One-Word Substitution Domains:
• Philanthropist (lover of mankind) vs Misanthrope (hater of mankind).
• Omniscient (all-knowing), Omnipotent (all-powerful), Omnipresent (present everywhere).""",

    40: """Para Jumbles (Sentence Rearrangement) and Cloze Tests assess paragraph coherence, discourse continuity, and lexical insertion.

1. Para Jumble Decoding Strategies:
• Identify Mandatory Pairs: Look for Pronoun-Noun references (John... He).
• Chronological & Causal Flow: Cause precedes Effect.
• Acronym Rule: Full form precedes abbreviation (e.g. World Health Organization precedes WHO).
• Concluding Markers: Sentences starting with "Therefore", "Thus", "In conclusion" typically terminate paragraphs.""",

    41: """Reading Comprehension (RC) measures critical reading efficiency, main-idea synthesis, inference deduction, and authorial tone analysis.

1. Passage Navigation Tactics:
• Question-First Strategy: Skim questions first to identify target keywords before reading the passage.
• Topic Sentence Focus: The first and last sentences of each paragraph typically contain 80% of the core argument.
• Tone Identification: Objective, Cynical, Laudatory, Sarcastic, Didactic, Analytical.
• Extreme Option Trap: Eliminate choices containing extreme words ("always", "never", "only", "all") unless explicitly supported by the text.""",

    42: """Critical Reasoning deconstructs logical arguments into Premise, Assumption, and Conclusion to test deductive validity.

1. Anatomy of an Argument:
• Premise: Factual evidence provided by the author.
• Conclusion: The main claim or hypothesis the author seeks to prove.
• Assumption: The unstated bridge connecting Premise to Conclusion (Conclusion = Premise + Assumption).
2. Question Types:
• Strengthen: Add an external fact that validates the unstated assumption.
• Weaken: Add an external fact that breaks the unstated assumption.
• Negation Technique for Assumptions: If negating a statement destroys the argument, that statement is a required assumption!"""
}

def enrich_aptitude():
    print("Reading frontend/assets/js/aptitude-curriculum.js...")
    with open("frontend/assets/js/aptitude-curriculum.js", "r", encoding="utf-8") as f:
        content = f.read()

    # Extract JSON array
    match = re.search(r"window\.APTITUDE_TRIAD_CURRICULUM\s*=\s*(\[[\s\S]*\]);", content)
    if not match:
        print("Error: Could not locate APTITUDE_TRIAD_CURRICULUM array.")
        return

    data = json.loads(match.group(1))
    print(f"Loaded {len(data)} aptitude modules.")

    updated_count = 0
    for mod in data:
        mod_id = mod.get("id")
        if mod_id in APTITUDE_DEEP_CONCEPTS:
            old_len = len(mod.get("concepts", ""))
            mod["concepts"] = APTITUDE_DEEP_CONCEPTS[mod_id]
            mod["readTime"] = "15-20 min read"
            new_len = len(mod["concepts"])
            print(f"Module {mod_id} ({mod['title'][:30]}): expanded concepts from {old_len} to {new_len} chars.")
            updated_count += 1

    # Format JSON
    out_json = json.dumps(data, indent=2, ensure_ascii=False)
    new_file_content = f"// Autogenerated PrepSpace Aptitude Triad 42-Module Digitized Textbook\nwindow.APTITUDE_TRIAD_CURRICULUM = {out_json};\n"

    with open("frontend/assets/js/aptitude-curriculum.js", "w", encoding="utf-8") as f:
        f.write(new_file_content)

    print(f"Successfully enriched {updated_count} modules in aptitude-curriculum.js! New file size: {len(new_file_content)} bytes.")

if __name__ == "__main__":
    enrich_aptitude()
