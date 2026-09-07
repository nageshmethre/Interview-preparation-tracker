package com.interviewtracker.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.*;

@RestController
@RequestMapping("/api/v1/aptitude")
public class AptitudeController {

    @GetMapping("/topics")
    public ResponseEntity<List<Map<String, Object>>> getAptitudeTopics() {
        List<Map<String, Object>> chapters = new ArrayList<>();

        chapters.add(Map.of(
            "id", 1,
            "chapterNumber", "01",
            "title", "Number Systems & Divisibility Hacks",
            "category", "Quantitative Aptitude",
            "readTime", "8 min read",
            "formulas", List.of(
                "Sum of first N natural numbers = N(N + 1) / 2",
                "Sum of squares of first N numbers = N(N + 1)(2N + 1) / 6",
                "Divisibility by 7: Subtract twice the last digit from the rest. Result must be divisible by 7.",
                "Divisibility by 11: (Sum of digits at odd places) - (Sum of digits at even places) = 0 or multiple of 11."
            ),
            "concepts", "Number systems form the foundation of technical assessment aptitude. The unit digit of a number raised to power follows cyclicity (e.g., 2^n cycles in periods of 4: 2, 4, 8, 6). HCF and LCM satisfy: Product of two numbers = HCF × LCM.",
            "examples", List.of(
                Map.of(
                    "question", "Find the unit digit of 7^95 - 3^58.",
                    "stepByStep", "1. Unit digit of 7 has cyclicity of 4 (7, 9, 3, 1). 95 mod 4 = 3, so unit digit of 7^95 = unit digit of 7^3 = 3.\n2. Unit digit of 3 has cyclicity of 4 (3, 9, 7, 1). 58 mod 4 = 2, so unit digit of 3^58 = 3^2 = 9.\n3. Subtracting with carry: (13 - 9) = 4.",
                    "answer", "4"
                )
            )
        ));

        chapters.add(Map.of(
            "id", 2,
            "chapterNumber", "02",
            "title", "Percentages & Profit-Loss Shortcuts",
            "category", "Quantitative Aptitude",
            "readTime", "10 min read",
            "formulas", List.of(
                "Net % change for successive changes of a% and b% = a + b + (a × b)/100",
                "Profit % = (Profit / Cost Price) × 100",
                "Selling Price = Cost Price × (100 + Gain%) / 100",
                "Discount % = (Marked Price - Selling Price) / Marked Price × 100"
            ),
            "concepts", "Whenever price increases by x%, consumption must decrease by [x / (100 + x)] × 100% to keep expenditure constant. If cost price of X items equals selling price of Y items, Gain % = [(X - Y) / Y] × 100.",
            "examples", List.of(
                Map.of(
                    "question", "If the price of sugar rises by 25%, by how much percent must a family reduce sugar consumption to not increase budget?",
                    "stepByStep", "Formula: Reduction = [r / (100 + r)] × 100 = [25 / 125] × 100 = 1/5 × 100 = 20%.",
                    "answer", "20%"
                )
            )
        ));

        chapters.add(Map.of(
            "id", 3,
            "chapterNumber", "03",
            "title", "Time, Work & Pipes Formulae",
            "category", "Quantitative Aptitude",
            "readTime", "9 min read",
            "formulas", List.of(
                "If A does a work in X days and B in Y days, together they take (X × Y) / (X + Y) days.",
                "Total Work = LCM(Individual times). Efficiency = Total Work / Time.",
                "Man-Day Formula: (M1 × D1 × H1) / W1 = (M2 × D2 × H2) / W2",
                "Inlet pipe fills in X hrs, outlet pipe empties in Y hrs (Y > X). Net fill rate = (Y - X) / (X × Y)."
            ),
            "concepts", "Efficiency is inversely proportional to time taken. If A is twice as good a workman as B, ratio of time taken by A and B is 1 : 2.",
            "examples", List.of(
                Map.of(
                    "question", "A can complete a project in 12 days and B in 16 days. Working together with C, they finish in 4 days. In how many days can C alone complete it?",
                    "stepByStep", "Let total work = LCM(12, 16, 4) = 48 units.\nA's 1-day work = 48/12 = 4 units.\nB's 1-day work = 48/16 = 3 units.\n(A + B + C)'s 1-day work = 48/4 = 12 units.\nC's work = 12 - (4 + 3) = 5 units/day.\nTime for C alone = 48 / 5 = 9.6 days.",
                    "answer", "9.6 days"
                )
            )
        ));

        chapters.add(Map.of(
            "id", 4,
            "chapterNumber", "04",
            "title", "Speed, Time, Distance & Trains",
            "category", "Quantitative Aptitude",
            "readTime", "11 min read",
            "formulas", List.of(
                "Speed in m/s = Speed in km/h × (5 / 18)",
                "Average Speed for equal distance = 2xy / (x + y)",
                "Relative speed (opposite direction) = Speed1 + Speed2",
                "Relative speed (same direction) = |Speed1 - Speed2|",
                "Time to cross platform of length L by train of length T = (T + L) / Speed"
            ),
            "concepts", "When two objects move in opposite directions, their relative speed is additive. When moving in the same direction, relative speed is the difference between speeds.",
            "examples", List.of(
                Map.of(
                    "question", "A 180m long train crosses a 320m long bridge in 20 seconds. What is the speed of the train in km/h?",
                    "stepByStep", "Total distance = 180 + 320 = 500 meters.\nSpeed = Distance / Time = 500 / 20 = 25 m/s.\nConvert to km/h: 25 × (18 / 5) = 90 km/h.",
                    "answer", "90 km/h"
                )
            )
        ));

        chapters.add(Map.of(
            "id", 5,
            "chapterNumber", "05",
            "title", "Syllogisms & Venn Logic Rules",
            "category", "Logical Reasoning",
            "readTime", "7 min read",
            "formulas", List.of(
                "Universal Affirmative (All A are B) implies Some B are A.",
                "Universal Negative (No A are B) implies No B are A and Some A are not B.",
                "Particular Affirmative (Some A are B) implies Some B are A.",
                "Complementary pairs for Either/Or: (All + Some Not) OR (Some + No)."
            ),
            "concepts", "Syllogisms test formal deductive logic. Never assume real-world plausibility. Check conclusions against the minimal Venn diagram and all alternate possible overlapping diagrams.",
            "examples", List.of(
                Map.of(
                    "question", "Statements: All cats are pets. All pets are animals. Conclusions: I. All cats are animals. II. Some animals are pets.",
                    "stepByStep", "Cats ⊂ Pets ⊂ Animals.\nI. Cats is a complete subset of Animals -> True.\nII. Since Pets is a subset of Animals, Some animals are definitely pets -> True.",
                    "answer", "Both Conclusion I and II follow"
                )
            )
        ));

        chapters.add(Map.of(
            "id", 6,
            "chapterNumber", "06",
            "title", "Blood Relations & Family Tree Maps",
            "category", "Logical Reasoning",
            "readTime", "6 min read",
            "formulas", List.of(
                "Use standard tree notation: Male = [+], Female = [-], Spouses = [=], Siblings = [-], Generations = [|]",
                "Maternal relations relate to mother's side (Maternal uncle = Mother's brother)",
                "Paternal relations relate to father's side (Paternal aunt = Father's sister)",
                "'Only son of my grandfather' = Father (if paternal) or Maternal Uncle."
            ),
            "concepts", "Break down chain relationships from the end of the sentence to the beginning. Always verify gender before asserting sibling or cousin relationship.",
            "examples", List.of(
                Map.of(
                    "question", "Pointing to a photograph, a woman says: 'He is the only son of the wife of my husband.' How is the man in the photo related to the woman?",
                    "stepByStep", "'Wife of my husband' = The woman herself.\n'Only son of the wife of my husband' = The woman's own son.",
                    "answer", "Son"
                )
            )
        ));

        return ResponseEntity.ok(chapters);
    }

    @GetMapping("/questions")
    public ResponseEntity<List<Map<String, Object>>> getAptitudeQuestions(
            @RequestParam(required = false) String category,
            @RequestParam(required = false) String company
    ) {
        List<Map<String, Object>> questions = new ArrayList<>();

        questions.add(Map.of(
            "id", 1,
            "question", "A train 240 m long passes a pole in 24 seconds. How long will it take to pass a platform 650 m long?",
            "options", List.of("65 seconds", "89 seconds", "100 seconds", "75 seconds"),
            "correctIndex", 1,
            "category", "Quantitative Aptitude",
            "topic", "Speed, Time & Distance",
            "difficulty", "MEDIUM",
            "company", "TCS, Infosys, Wipro",
            "explanation", "Speed of the train = Length of train / Time = 240 / 24 = 10 m/s.\nDistance to cross platform = 240 + 650 = 890 meters.\nTime required = Distance / Speed = 890 / 10 = 89 seconds.",
            "shortcut", "Time ratio = (Train + Platform) / Train = (240 + 650) / 240 = 890 / 240 = 3.708. 24 × 3.708 = 89s."
        ));

        questions.add(Map.of(
            "id", 2,
            "question", "If A is 30% more efficient than B, how much time will they together take to complete a task which A alone can finish in 23 days?",
            "options", List.of("11 days", "13 days", "15 days", "17 days"),
            "correctIndex", 1,
            "category", "Quantitative Aptitude",
            "topic", "Time & Work",
            "difficulty", "MEDIUM",
            "company", "Amazon, Cognizant",
            "explanation", "Let B's efficiency = 10 units/day, then A's efficiency = 13 units/day.\nTotal work = A's days × A's efficiency = 23 × 13 = 299 units.\nCombined efficiency = 13 + 10 = 23 units/day.\nDays together = 299 / 23 = 13 days.",
            "shortcut", "Days = (A's efficiency / Total efficiency) × A's days = (130 / 230) × 23 = 13 days."
        ));

        questions.add(Map.of(
            "id", 3,
            "question", "Statements: Some actors are singers. All singers are dancers. Conclusions: I. Some actors are dancers. II. No singer is an actor.",
            "options", List.of("Only Conclusion I follows", "Only Conclusion II follows", "Either I or II follows", "Neither follows"),
            "correctIndex", 0,
            "category", "Logical Reasoning",
            "topic", "Syllogisms",
            "difficulty", "EASY",
            "company", "Capgemini, Accenture, TCS",
            "explanation", "Singers is a subset of Dancers. Since some actors are singers, those specific actors are inside the dancers circle. Hence, Conclusion I definitely follows. Conclusion II directly contradicts the premise.",
            "shortcut", "Some + All = Some. 'Some actors are dancers' is guaranteed."
        ));

        questions.add(Map.of(
            "id", 4,
            "question", "Pointing to a man, a woman said: 'His mother is the only daughter of my mother.' How is the woman related to the man?",
            "options", List.of("Grandmother", "Mother", "Sister", "Aunt"),
            "correctIndex", 1,
            "category", "Logical Reasoning",
            "topic", "Blood Relations",
            "difficulty", "EASY",
            "company", "Infosys, Wipro",
            "explanation", "Only daughter of the woman's mother is the woman herself. So, his mother is the woman herself. Therefore, the woman is the man's mother.",
            "shortcut", "Deconstruct from end: 'Only daughter of my mother' = Myself."
        ));

        questions.add(Map.of(
            "id", 5,
            "question", "Find the missing number in the series: 4, 18, 48, 100, 180, ?",
            "options", List.of("294", "280", "312", "264"),
            "correctIndex", 0,
            "category", "Logical Reasoning",
            "topic", "Number Series",
            "difficulty", "HARD",
            "company", "Google, Amazon, TCS Digital",
            "explanation", "Pattern is n^3 - n^2 or n^2 × (n - 1):\n2^3 - 2^2 = 8 - 4 = 4\n3^3 - 3^2 = 27 - 9 = 18\n4^3 - 4^2 = 64 - 16 = 48\n5^3 - 5^2 = 125 - 25 = 100\n6^3 - 6^2 = 216 - 36 = 180\n7^3 - 7^2 = 343 - 49 = 294.",
            "shortcut", "n^2 × (n - 1) formula for fast mental calculation."
        ));

        questions.add(Map.of(
            "id", 6,
            "question", "In an election between two candidates, the winner got 58% of total valid votes and won by a majority of 4,000 votes. What was the total number of valid votes?",
            "options", List.of("25,000", "20,000", "30,000", "24,000"),
            "correctIndex", 0,
            "category", "Quantitative Aptitude",
            "topic", "Percentages",
            "difficulty", "EASY",
            "company", "TCS, Tech Mahindra",
            "explanation", "Winner = 58%, Loser = 100 - 58 = 42%.\nDifference in % = 58% - 42% = 16%.\n16% of Total = 4,000.\nTotal Votes = 4,000 × (100 / 16) = 25,000.",
            "shortcut", "Total = (Vote Difference / % Difference) × 100 = (4000 / 16) × 100 = 25,000."
        ));

        questions.add(Map.of(
            "id", 7,
            "question", "Choose the antonym of CANDID:",
            "options", List.of("Frank", "Blunt", "Deceitful", "Honest"),
            "correctIndex", 2,
            "category", "Verbal Ability",
            "topic", "Vocabulary & Antonyms",
            "difficulty", "EASY",
            "company", "TCS, Cognizant, Wipro",
            "explanation", "'Candid' means truthful, straightforward, and sincere. Its exact antonym is 'Deceitful' or 'Guarded'.",
            "shortcut", "Candid = Open & Frank. Opposite = Deceitful / Secretive."
        ));

        questions.add(Map.of(
            "id", 8,
            "question", "In a college of 1200 students, 65% like cricket and 45% like football. If each student likes at least one sport, how many students like both?",
            "options", List.of("120", "150", "180", "200"),
            "correctIndex", 0,
            "category", "Data Interpretation",
            "topic", "Set Theory & Venn Diagrams",
            "difficulty", "MEDIUM",
            "company", "Amazon, Infosys",
            "explanation", "n(A ∪ B) = n(A) + n(B) - n(A ∩ B)\n100% = 65% + 45% - Both%\nBoth% = 110% - 100% = 10%.\nNumber of students who like both = 10% of 1200 = 120.",
            "shortcut", "Overlapping % = (65 + 45) - 100 = 10%. 10% of 1200 = 120."
        ));

        return ResponseEntity.ok(questions);
    }

    @PostMapping("/submit")
    public ResponseEntity<Map<String, Object>> submitAptitudeScore(@RequestBody Map<String, Object> payload) {
        int score = (int) payload.getOrDefault("score", 0);
        int total = (int) payload.getOrDefault("total", 0);
        int xpEarned = score * 15;

        Map<String, Object> response = new HashMap<>();
        response.put("status", "SUCCESS");
        response.put("score", score);
        response.put("total", total);
        response.put("xpEarned", xpEarned);
        response.put("percentage", total > 0 ? (score * 100.0 / total) : 0);
        response.put("message", "Aptitude evaluation recorded successfully!");

        return ResponseEntity.ok(response);
    }
}
