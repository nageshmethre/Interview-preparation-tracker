/**
 * Book 116: Verbal Ability & Technical English
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

const book116 = {
  id: 116,
  slug: 'verbal-ability-technical-english',
  title: 'Verbal Ability & Technical English',
  subtitle: 'Grammar Invariants, Reading Comprehension, Para Jumbles, Critical Reasoning & Technical Documentation',
  description: 'The definitive verbal and professional communication textbook for software engineers. Master subject-verb agreement invariants, Greek/Latin etymology root trees, high-speed reading comprehension skimming, para jumble paragraph coherence links, architectural decision records (ADRs), and group discussion strategies.',
  author: 'PrepSpace Engineering Curriculum Group',
  category: 'Verbal Ability & Technical English',
  subcategory: 'Communication & Verbal Aptitude',
  difficulty: 'BEGINNER',
  pageCount: 360,
  estimatedReadingTime: '9 Hours',
  tags: ['VerbalAbility', 'English', 'Grammar', 'ReadingComprehension', 'ParaJumbles', 'TechnicalWriting', 'Placement'],
  licenseType: 'ORIGINAL',
  copyrightNotice: '© 2026 PrepSpace (stream-in.app). All rights reserved.',
  isPro: true,
  badge: 'Placement Essential',
  rating: 4.91,
  readerCount: 3650,
  icon: 'fa-solid fa-book-open-reader',
  gradient: 'linear-gradient(135deg, #065f46, #10b981)',
  chapters: [
    {
      id: 11601,
      chapterNumber: 1,
      title: 'Advanced English Grammar & Sentence Correction Rules',
      subtitle: 'Subject-verb agreement, modifier placement (dangling/misplaced), parallel construction, and pronoun ambiguity',
      summary: 'Master the high-yield grammar rules tested in recruitment exams: non-adjacent subject-verb agreement, identifying dangling and misplaced modifiers, strict parallelism, and eliminating pronoun antecedent ambiguity.',
      readingTimeMinutes: 28,
      isFreePreview: true,
      sortOrder: 1,
      contentHtml: `
        <h3>1.1 Subject-Verb Agreement Invariants</h3>
        <p>In formal English syntax, the grammatical subject of a sentence must agree in number (singular vs plural) with its principal verb. Errors frequently arise when parenthetical clauses or prepositional phrases intervene between the subject and the verb.</p>

        ${buildTheorem('Theorem 1.1: Intervening Prepositional Phrase Invariant', `
          The true grammatical subject of a clause is <strong>never located inside an intervening prepositional phrase</strong> (e.g. phrases beginning with <em>along with, as well as, in addition to, accompanied by, of</em>):
          \\[
          \\text{Subject (Singular)} + [\\text{as well as } \\dots] + \\text{Verb (Singular)}
          \\]
          <strong>Example:</strong>
          <br/><em>Incorrect:</em> "The lead architect, as well as the senior engineers, <strong>were</strong> present."
          <br/><em>Correct:</em> "The lead architect, as well as the senior engineers, <strong>was</strong> present."
          <br/>The true subject is "architect" (singular); "engineers" sits inside a non-restrictive prepositional modifier.
        `)}

        <h3>1.2 Architectural Diagram: Dangling Modifier Structural Flaw</h3>
        ${buildMemoryDiagram('Dangling Modifier vs Corrected Syntax Tree', `
INCORRECT (Dangling Modifier):
"Walking into the server room, the buzzing sound overwhelmed Alice."
+------------------------------------+------------------------------------+
| Modifier Phrase:                   | Subject of Main Clause:            |
| "Walking into the server room"     | "the buzzing sound"                |
+------------------------------------+------------------------------------+
LITERAL MEANING: The buzzing sound was walking into the server room! (Absurd)

CORRECT (Proper Agent Attribution):
"Walking into the server room, Alice was overwhelmed by the buzzing sound."
+------------------------------------+------------------------------------+
| Modifier Phrase:                   | Subject of Main Clause:            |
| "Walking into the server room"     | "Alice" (Agent who walks!)         |
+------------------------------------+------------------------------------+
        `)}

        <h3>1.3 Polyglot Implementation: Automated Grammar Linter Rule</h3>
        <h5>Python 3.12 (Regex-Based Passive Voice & Modifier Detector)</h5>
        ${buildCodeBlock('python', `
import re

def detect_passive_voice(text: str) -> list[str]:
    # Common passive auxiliary verbs followed by past participles
    passive_pattern = re.compile(
        r'\\b(is|am|are|was|were|be|been|being)\\s+([a-z]+ed|written|done|seen|found|made)\\b',
        re.IGNORECASE
    )
    matches = [m.group(0) for m in passive_pattern.finditer(text)]
    return matches

def check_subject_verb_distance(sentence: str):
    # Flags long intervening clauses that increase cognitive strain
    words = sentence.split()
    if len(words) > 35:
        print("Warning: Sentence exceeds 35 words; consider refactoring for technical clarity.")

sample = "The distributed transaction was committed by the primary database node."
print("Passive constructions detected:", detect_passive_voice(sample))
        `)}

        <h3>1.4 High-Yield Sentence Correction Rules Matrix</h3>
        ${buildComplexityTable(
          ['Grammar Rule', 'Incorrect Pattern', 'Correct Pattern'],
          [
            ['Subject-Verb Agreement', 'Neither of the servers are responding.', 'Neither of the servers IS responding.'],
            ['Parallel Construction', 'She likes coding, designing, and to deploy.', 'She likes coding, designing, and DEPLOYING.'],
            ['Dangling Modifier', 'Having completed the sprint, the release went live.', 'Having completed the sprint, WE launched the release.'],
            ['Pronoun Ambiguity', 'When the disk crashed the server, it rebooted.', 'When the disk crashed, THE SERVER rebooted.'],
            ['Correlative Conjunctions', 'Not only he passed, but also excelled.', 'He NOT ONLY passed, BUT ALSO excelled.']
          ]
        )}

        <h3>1.5 Real-World Enterprise Case Study</h3>
        ${buildInsight('Google Technical Documentation Style Guide: Active Voice Mandate', `
          Google's official developer documentation guidelines strictly enforce <strong>Active Voice over Passive Voice</strong>:
          <br/><em>Passive:</em> "The cache is invalidated when a TTL expiration is triggered by the worker."
          <br/><em>Active:</em> "The worker invalidates the cache when the TTL expires."
          Active voice clearly designates the acting computational agent, reduces token count by 20%, and prevents ambiguous enterprise bug reports where nobody knows which service failed.
        `)}

        <h3>1.6 Interview Failure Modes & Gotchas</h3>
        ${buildWarning('The "Each / Either / Neither" Plural Fallacy', `
          Words like <strong>Each, Every, Either, Neither, Everyone, Somebody, Nobody</strong> are grammatically <strong>SINGULAR</strong>:
          <ul>
            <li>"Each of the candidates <strong>has</strong> submitted their code" (Correct).</li>
            <li>"Each of the candidates <strong>have</strong> submitted their code" (INCORRECT!).</li>
          </ul>
          Never let plural nouns inside prepositional phrases ("candidates") deceive you into using a plural verb!
        `)}

        <h3>1.7 Practice Workshop Challenge</h3>
        ${buildAlgorithm('Challenge: Identify the Error in Parallel Structure', `
          <strong>Problem:</strong> Identify the grammatical error in the following sentence:
          <br/><em>"The chief security officer evaluated the cryptographic vulnerability, prepared a comprehensive mitigation report, and then the patch was deployed immediately."</em>
          <br/><br/>
          <strong>Solution:</strong> The third predicate shifts from active past tense verbs (<em>evaluated, prepared</em>) to a passive clause (<em>and then the patch was deployed</em>). Correct to: <em>"...and deployed the patch immediately."</em>
        `)}
      `
    },
    {
      id: 11602,
      chapterNumber: 2,
      title: 'Vocabulary Building, Etymology, Roots, Prefixes & Suffixes',
      subtitle: 'Latin and Greek roots (chron, bene, mal, morph), word connotation nuance, and context clues',
      summary: 'Master rapid vocabulary expansion through classical etymology: decomposing polysyllabic English words into Latin and Greek root morphemes, prefixes, and suffixes to deduce definitions without memorization.',
      readingTimeMinutes: 26,
      isFreePreview: false,
      sortOrder: 2,
      contentHtml: `
        <h3>2.1 The Morphemic Root Decomposition Method</h3>
        <p>Rote memorization of thousands of dictionary definitions fails under exam stress. By mastering approximately 50 foundational <strong>Greek and Latin root morphemes</strong>, you can deduce the precise meanings of over 10,000 advanced English words:</p>
        <ul>
          <li><strong>Prefix:</strong> Modifies the trajectory or polarity of the root (e.g. <em>anti-</em> [against], <em>syn-/sym-</em> [together], <em>mal-</em> [bad]).</li>
          <li><strong>Root:</strong> Carries the core semantic weight (e.g. <em>chron</em> [time], <em>path</em> [feeling], <em>voc/vok</em> [call]).</li>
          <li><strong>Suffix:</strong> Determines grammatical part of speech (e.g. <em>-tion</em> [noun], <em>-ous</em> [adjective], <em>-ify</em> [verb]).</li>
        </ul>

        ${buildTheorem('Theorem 2.1: Semantic Derivation Invariant', `
          Consider the word <strong>ANACHRONISM</strong>:
          \\[
          \\text{ana-} (\\text{backwards / against}) + \\text{chron} (\\text{time}) + \\text{-ism} (\\text{condition})
          \\]
          Deduction: Something placed out of its proper chronological or historical time period.
        `)}

        <h3>2.2 Memory Diagram: Classical Morphemic Word Tree</h3>
        ${buildMemoryDiagram('Etymological Root Branching: The "VERT / VERS" Root (To Turn)', `
                              [ROOT: VERT / VERS = To Turn]
                                     /      |      \\
             +----------------------+       |       +----------------------+
             |                              |                              |
      [Prefix: A-]                   [Prefix: IN-]                  [Prefix: CON-]
       (Away from)                    (Not / Opposite)               (Completely with)
             |                              |                              |
             v                              v                              v
       AVERT (Verb)                   INVERT (Verb)                  CONVERT (Verb)
    (To turn away from)           (To turn upside down)           (To turn or change)
             |                              |                              |
       AVERSE (Adj)                   INVERSE (Noun/Adj)             CONVERSION (Noun)
(Having strong dislike)       (The direct opposite state)    (Act of transforming)
        `)}

        <h3>2.3 Polyglot Implementation: Etymology Root Decomposition Engine</h3>
        <h5>Python 3.12 (Morpheme Root Parser)</h5>
        ${buildCodeBlock('python', `
def analyze_etymology(word: str) -> dict[str, str]:
    ROOTS = {
        "chron": "time (Greek)",
        "bene": "good / well (Latin)",
        "mal": "bad / evil (Latin)",
        "path": "feeling / suffering (Greek)",
        "voc": "call / voice (Latin)",
        "luc": "light / clear (Latin)"
    }
    word_lower = word.lower()
    for root, meaning in ROOTS.items():
        if root in word_lower:
            return {"word": word, "detected_root": root, "root_meaning": meaning}
    return {"word": word, "detected_root": "unknown"}

print(analyze_etymology("Benevolent"))
print(analyze_etymology("Chronic"))
print(analyze_etymology("Elucidate"))
        `)}

        <h3>2.4 High-Yield Greek and Latin Roots Table</h3>
        ${buildComplexityTable(
          ['Root Morpheme', 'Origin & Meaning', 'Example High-Frequency Words'],
          [
            ['CHRON', 'Greek: Time', 'Chronological, Synchronous, Anachronism, Chronic'],
            ['BENE / BON', 'Latin: Good', 'Benefactor, Benevolent, Benign, Bonus'],
            ['MAL', 'Latin: Bad, Evil', 'Malevolent, Malicious, Malignant, Malfunction'],
            ['PATH', 'Greek: Emotion, Feeling', 'Empathy, Sympathy, Apathy, Antipathy, Pathological'],
            ['LUC / LUM', 'Latin: Light, Clear', 'Lucid, Elucidate, Luminous, Translucent'],
            ['OMNI', 'Latin: All, Everywhere', 'Omnipotent, Omniscient, Omnipresent, Omnivorous']
          ]
        )}

        <h3>2.5 Real-World Enterprise Case Study</h3>
        ${buildInsight('Domain-Driven Architecture: Ubiquitous Language Vocabulary', `
          In software engineering, Eric Evans' Domain-Driven Design mandates establishing an unambiguous <strong>Ubiquitous Language</strong>. Precision in word choice prevents catastrophic architectural misunderstandings. For example, distinguishing between <em>"Authenticate"</em> (verifying who you are) and <em>"Authorize"</em> (verifying what you are allowed to access) prevents critical security bugs in enterprise IAM services.
        `)}

        <h3>2.6 Interview Failure Modes & Gotchas</h3>
        ${buildWarning('The False Friends / Connotation Confusion Trap', `
          Do not confuse denotation (literal meaning) with <strong>connotation</strong> (emotional tone):
          <ul>
            <li><strong>Frugal vs Miserly:</strong> Both mean saving money, but <em>Frugal</em> has a positive connotation (prudent), while <em>Miserly / Stingy</em> is derogatory.</li>
            <li><strong>Childlike vs Childish:</strong> <em>Childlike</em> denotes innocent wonder; <em>Childish</em> denotes immature, petulant behavior.</li>
          </ul>
        `)}

        <h3>2.7 Practice Workshop Challenge</h3>
        ${buildAlgorithm('Challenge: Deduce Meaning of Obscure Etymological Compound', `
          <strong>Problem:</strong> Decompose the word <strong>SOMNAMBULIST</strong> into its constituent Latin morphemes (<em>somn-</em> and <em>ambul-</em>) to deduce its precise definition without consulting a dictionary.
          <br/><br/>
          <strong>Solution:</strong> <em>Somn</em> = sleep; <em>ambul</em> = to walk (as in ambulance/ambulatory); <em>-ist</em> = one who practices. Definition: A sleepwalker.
        `)}
      `
    },
    {
      id: 11603,
      chapterNumber: 3,
      title: 'Reading Comprehension: Speed Reading, Tone Detection & Inference Extraction',
      subtitle: 'Skimming vs scanning, identifying author tone (cynical, laudatory, pragmatic), and direct vs inferential questions',
      summary: 'Master technical reading comprehension: skimming strategies for long passages, identifying main ideas and thesis statements, deducing author tone, and differentiating explicit facts from implicit logical inferences.',
      readingTimeMinutes: 30,
      isFreePreview: false,
      sortOrder: 3,
      contentHtml: `
        <h3>3.1 The Active Reading Protocol</h3>
        <p>In competitive placement exams (CAT, TCS Digital, Infosys, GMAT), reading comprehension passages are designed with dense academic prose to induce cognitive fatigue. Passive reading (reading word-by-word like a novel) guarantees time failure. You must deploy <strong>Active Structural Reading</strong>:</p>
        <ol>
          <li><strong>Read the First and Last Sentences of Every Paragraph:</strong> 80% of academic and scientific passages follow deductive essay structure where the topic sentence opens the paragraph and a transition closes it.</li>
          <li><strong>Track Pivot Signal Words:</strong> Contrast connectors (<em>However, Nevertheless, In contrast, On the contrary</em>) signal a reversal in author position. Causality words (<em>Therefore, Consequently, Hence</em>) signal concluding theses.</li>
          <li><strong>Read Questions Before the Full Passage:</strong> Familiarize yourself with keywords to execute targeted scanning.</li>
        </ol>

        ${buildTheorem('Theorem 3.1: The Inference Invariant', `
          An <strong>Inference</strong> is a proposition that is <strong>not explicitly stated in the text</strong>, but must be mathematically or logically true based on what is stated:
          \\[
          \\text{Passage Premises} \\implies \\text{Inference (100\\% Necessary Truth)}
          \\]
          <strong>The Extreme Word Rule:</strong> In multiple-choice questions, answer choices containing extreme absolute qualifiers (<em>always, never, all, completely, impossible</em>) are almost always incorrect. Robust academic authors use tempered qualifiers (<em>likely, tends to, predominantly, often</em>).
        `)}

        <h3>3.2 Memory Diagram: Reading Comprehension Structure Map</h3>
        ${buildMemoryDiagram('Passage Structural Decomposition Map', `
+-------------------------------------------------------------------------+
| PARAGRAPH 1: THE PHENOMENON / THESIS                                    |
| Topic Sentence: "Generative AI is reshaping enterprise software..."     |
| [Presents Status Quo and Problem Statement]                             |
+------------------------------------+------------------------------------+
                                     |
                                     v Pivot Word: "HOWEVER..."
+-------------------------------------------------------------------------+
| PARAGRAPH 2: THE COUNTER-ARGUMENT / COMPLICATION                        |
| "However, code hallucination rates pose severe reliability hazards..."   |
| [Presents Evidence, Benchmarks, Empirical Studies]                      |
+------------------------------------+------------------------------------+
                                     |
                                     v Concluding Connector: "THEREFORE..."
+-------------------------------------------------------------------------+
| PARAGRAPH 3: AUTHOR CONCLUSION & RECOMMENDATION                         |
| "Therefore, automated verification pipelines must become mandatory..."  |
| [Author's Core Thesis & Strategic Recommendation]                        |
+-------------------------------------------------------------------------+
        `)}

        <h3>3.3 Polyglot Implementation: Text Readability Index Calculator</h3>
        <h5>Python 3.12 (Flesch-Kincaid Grade Level Analyzer)</h5>
        ${buildCodeBlock('python', `
import re

def compute_flesch_reading_ease(text: str) -> float:
    """Computes Flesch Reading Ease score: Higher score = Easier to read."""
    sentences = re.split(r'\\.|\\?|!', text)
    sentences = [s for s in sentences if s.strip()]
    words = re.findall(r'\\b[a-zA-Z]+\\b', text)
    if not sentences or not words: return 0.0

    total_syllables = sum(count_syllables(w) for w in words)
    score = 206.835 - 1.015 * (len(words) / len(sentences)) - 84.6 * (total_syllables / len(words))
    return round(score, 2)

def count_syllables(word: str) -> int:
    word = word.lower()
    count = len(re.findall(r'[aeiouy]+', word))
    if word.endswith('e') and not word.endswith('le') and count > 1:
        count -= 1
    return max(1, count)

sample = "Operating systems enforce isolation between processes via hardware privilege rings."
print("Readability Score:", compute_flesch_reading_ease(sample))
        `)}

        <h3>3.4 Author Tone Classifications Matrix</h3>
        ${buildComplexityTable(
          ['Author Tone', 'Characteristics', 'Keywords in Text'],
          [
            ['Objective / Analytical', 'Neutral, evidence-based, balanced presentation', 'data indicates, empirical studies demonstrate'],
            ['Skeptical / Cynical', 'Doubts claims, highlights hidden motives, pessimistic', 'purported benefits, dubious, questionable assertion'],
            ['Laudatory / Eulogistic', 'Highly praising, enthusiastic endorsement', 'remarkable achievement, pioneering breakthrough'],
            ['Didactic / Pedagogical', 'Instructive, educational, explaining fundamentals', 'we must examine, let us consider, the reader should note'],
            ['Pragmatic / Utilitarian', 'Practical, outcome-focused, balancing trade-offs', 'cost-effective, feasible implementation, operational reality']
          ]
        )}

        <h3>3.5 Real-World Enterprise Case Study</h3>
        ${buildInsight('Amazon 6-Page Narrative Memos: Eliminating PowerPoint', `
          Jeff Bezos famously banned PowerPoint slide presentations at Amazon executive meetings, replacing them with <strong>6-page narrative prose memos</strong>. Every executive meeting begins with 30 minutes of absolute silence where attendees read the memo. Writing narrative memos forces authors to articulate logical causal chains, anticipate counter-arguments, and present unambiguous evidence—mirroring advanced reading comprehension structure.
        `)}

        <h3>3.6 Interview Failure Modes & Gotchas</h3>
        ${buildWarning('The "Outside Knowledge" Distortion', `
          In reading comprehension questions:
          If the passage discusses Quantum Computing and makes a statement that contradicts a scientific fact you learned in your university physics class:
          <strong>YOU MUST ANSWER STRICTLY ACCORDING TO THE PASSAGE!</strong>
          Bringing personal outside knowledge into RC questions is a fatal error. The test evaluates your capacity to comprehend the author's specific argument, not your general trivia.
        `)}

        <h3>3.7 Practice Workshop Challenge</h3>
        ${buildAlgorithm('Challenge: Identify True Inference vs Direct Paraphrase', `
          <strong>Problem:</strong> Passage excerpt:
          <em>"While cloud migration promises elastic scalability, 62% of enterprise migrations exceed their initial cloud budgets due to unmonitored egress bandwidth costs."</em>
          <br/>Which of the following is a valid logical inference?
          <br/>A) Cloud computing is financially inferior to on-premises data centers.
          <br/>B) Monitoring egress network bandwidth can help organizations adhere closer to their initial migration budgets.
          <br/>C) All cloud migrations fail.
        `)}
      `
    },
    {
      id: 11604,
      chapterNumber: 4,
      title: 'Para Jumbles, Sentence Rearrangement & Coherence Flow',
      subtitle: 'Mandatory pairs, pronoun-antecedent links, chronologies, acronym expansion, and opening sentence anchors',
      summary: 'Master Para Jumbles and sentence rearrangement: identifying opening sentences, discovering mandatory pairs via pronoun antecedents and contrast conjunctions, acronym expansions, and chronological event progression.',
      readingTimeMinutes: 26,
      isFreePreview: false,
      sortOrder: 4,
      contentHtml: `
        <h3>4.1 Sentence Coherence & Structural Flow</h3>
        <p>Para Jumbles (Sentence Rearrangement) present a set of 4 to 6 scrambled sentences from a coherent paragraph. The task is to identify the logical, grammatical sequence. Trying all permutations (\\(5! = 120\\) possibilities) is impossible under exam time limits; you must solve via <strong>Mandatory Pairs and Elimination</strong>.</p>

        ${buildTheorem('Theorem 4.1: The Opening Sentence Invariant', `
          An opening sentence of an independent paragraph must be <strong>autonomous and self-contained</strong>:
          <ol>
            <li>It introduces a novel topic, concept, or agent for the first time.</li>
            <li>It <strong>CANNOT begin with</strong>:
              <ul>
                <li>Third-person pronouns without antecedents (<em>He, She, They, It</em>).</li>
                <li>Conjunctions or transition connectors (<em>However, Therefore, Moreover, Thus, Consequently</em>).</li>
                <li>Demonstrative adjectives pointing backwards (<em>These findings, This problem, Such practices</em>).</li>
              </ul>
            </li>
          </ol>
        `)}

        <h3>4.2 Architectural Diagram: Mandatory Pair Coupling Mechanics</h3>
        ${buildMemoryDiagram('Mandatory Pair Identification Strategies', `
PAIR TYPE 1: NOUN -> PRONOUN LINK
[Sentence A]: "Alan Turing proposed a universal computing machine in 1936."
[Sentence C]: "He demonstrated that certain mathematical problems were undecidable."
-> MANDATORY PAIR: [A must precede C]

PAIR TYPE 2: FULL ACRONYM -> ABBREVIATION LINK
[Sentence B]: "The Domain Name System (DNS) maps human hostnames to IP addresses."
[Sentence D]: "Without DNS, web navigation would rely on raw numeric coordinates."
-> MANDATORY PAIR: [B must precede D] (Full expansion precedes bare acronym!)

PAIR TYPE 3: GENERAL PRINCIPLE -> CONCRETE EXAMPLE
[Sentence E]: "Distributed databases face fundamental network trade-offs."
[Sentence F]: "For instance, Apache Cassandra sacrifices strict consistency for availability."
-> MANDATORY PAIR: [E precedes F]
        `)}

        <h3>4.3 Polyglot Implementation: Para Jumble Permutation Evaluator</h3>
        <h5>Python 3.12 (Graph-Based Mandatory Pair Solver)</h5>
        ${buildCodeBlock('python', `
import itertools

def solve_para_jumble(sentences: dict[str, str], mandatory_pairs: list[tuple[str, str]], opening_candidate: str):
    keys = list(sentences.keys())
    valid_sequences = []

    for perm in itertools.permutations(keys):
        if perm[0] != opening_candidate:
            continue
        # Verify all mandatory pairs
        is_valid = True
        for first, second in mandatory_pairs:
            idx1 = perm.index(first)
            idx2 = perm.index(second)
            if idx2 < idx1: # second must follow first
                is_valid = False
                break
        if is_valid:
            valid_sequences.append("".join(perm))

    return valid_sequences

# Example: A, B, C, D with opening A, mandatory pairs (A, C) and (B, D)
sentences = {"A": "Intro", "B": "General", "C": "Pronoun", "D": "Example"}
print("Permitted sequences:", solve_para_jumble(sentences, [("A", "C"), ("B", "D")], "A"))
        `)}

        <h3>4.4 Para Jumble Structural Connectors Matrix</h3>
        ${buildComplexityTable(
          ['Connector Category', 'Transition Words', 'Positional Implication in Sequence'],
          [
            ['Contrast / Reversal', 'However, Nevertheless, Yet, Conversely, On the other hand', 'Follows immediately after the opposing thesis'],
            ['Cause & Effect', 'Consequently, Therefore, As a result, Hence, Thus', 'Follows the causal event / observation'],
            ['Elaboration / Addition', 'Furthermore, Moreover, In addition, Additionally', 'Continues the same sentiment without direction change'],
            ['Chronology Markers', 'Initially, Subsequently, Later, Eventually, Finally', 'Follows strict temporal order of events']
          ]
        )}

        <h3>4.5 Real-World Enterprise Case Study</h3>
        ${buildInsight('Automated Text Summarization & BERT Paragraph Reconstruction', `
          Modern Natural Language Processing (NLP) models (such as Google BERT and Transformer decoders) train using <strong>Next Sentence Prediction (NSP)</strong> and Sentence Ordering tasks. By learning how coherence vectors and pronoun references bind adjacent paragraphs, language models detect disconnected technical prose and automatically generate coherent executive summaries from engineering design documents.
        `)}

        <h3>4.6 Interview Failure Modes & Gotchas</h3>
        ${buildWarning('The Chronology Trap: Flashbacks in Biographies', `
          When arranging biographical paragraphs:
          Do not assume dates are always strictly chronological if the first sentence introduces a retrospective framing device:
          "Looking back at his tenure in 2026, the CEO recalled his humble beginnings in 2010."
          Here, the 2026 reflection sentence serves as the primary opening frame, followed by the chronological 2010 sequence.
        `)}

        <h3>4.7 Practice Workshop Challenge</h3>
        ${buildAlgorithm('Challenge: Rearrange 4-Sentence Technical Para Jumble', `
          <strong>Problem:</strong> Order the four sentences into a coherent paragraph:
          <br/>A: <em>This mechanism ensures that thread execution does not saturate the memory bus.</em>
          <br/>B: <em>When multiple threads contend for shared resources, cache coherency protocols trigger cache line invalidations.</em>
          <br/>C: <em>Consequently, modern runtime architectures implement lock backoff delays.</em>
          <br/>D: <em>This phenomenon, known as cache line bouncing, severely degrades throughput.</em>
          <br/><br/>
          <strong>Solution:</strong> B introduces the phenomenon. D names the phenomenon ("This phenomenon..."). C gives consequence ("Consequently..."). A explains the mechanism of lock backoff. Correct order: <strong>B &rarr; D &rarr; C &rarr; A</strong>.
        `)}
      `
    },
    {
      id: 11605,
      chapterNumber: 5,
      title: 'Critical Reasoning: Evaluating Arguments, Assumptions, Strengthen & Weaken',
      subtitle: 'Premise, Conclusion, Unstated Assumption, alternate explanations, and causality testing',
      summary: "Master Critical Reasoning: breaking arguments into premises and conclusions, identifying implicit unstated assumptions, formulating statements that strengthen or weaken an author's thesis, and eliminating confounding variables.",
      readingTimeMinutes: 28,
      isFreePreview: false,
      sortOrder: 5,
      contentHtml: `
        <h3>5.1 The Anatomy of an Argument</h3>
        <p>Critical reasoning forms the core of management consulting cases and engineering leadership assessments. Every logical argument consists of three components:</p>
        \\[
        \\text{Argument} = \\text{Premise (Stated Fact)} + \\text{Assumption (Unstated Bridge)} \\implies \\text{Conclusion (Claim)}
        \\]
        <ul>
          <li><strong>Premise:</strong> Explicit evidence, empirical data, or observed facts accepted as given truth.</li>
          <li><strong>Conclusion:</strong> The primary claim, recommendation, or hypothesis that the author attempts to prove.</li>
          <li><strong>Assumption:</strong> The missing, unstated logical link necessary for the conclusion to follow from the premise.</li>
        </ul>

        ${buildTheorem('Theorem 5.1: The Assumption Negation Test', `
          To mathematically verify if a candidate statement is a true <strong>Unstated Assumption</strong> of an argument:
          <ol>
            <li><strong>Negate the candidate statement</strong> (turn it into its logical opposite).</li>
            <li>If the negation of the statement <strong>completely shatters or destroys the argument's conclusion</strong>, then the statement is an indispensable assumption.</li>
            <li>If the conclusion survives even when the statement is negated, the statement is not an assumption.</li>
          </ol>
        `)}

        <h3>5.2 Memory Diagram: Strengthening vs Weakening Mechanics</h3>
        ${buildMemoryDiagram('Critical Reasoning: Strengthening vs Weakening Mechanics', `
                             [PREMISE: Stated Facts]
                                       |
                                       v
                     +-----------------------------------+
                     | ASSUMPTION: The Unstated Bridge   |
                     +-----------------------------------+
                                       |
                                       v
                            [CONCLUSION: Final Claim]

HOW TO WEAKEN AN ARGUMENT:
1. Break the unstated bridge: Show that the assumption is false.
2. Introduce an ALTERNATE CAUSE for the observed premise.
3. Show that cause occurs without effect, or effect without cause.

HOW TO STRENGTHEN AN ARGUMENT:
1. Validate the assumption with independent supporting data.
2. Eliminate potential alternative explanations / confounding variables.
3. Show that when cause is absent, the effect is also absent.
        `)}

        <h3>5.3 Polyglot Implementation: Argument Evaluation Engine</h3>
        <h5>Python 3.12 (Logical Argument Decomposition & Assumption Checker)</h5>
        ${buildCodeBlock('python', `
class ArgumentEvaluator:
    def __init__(self, premise: str, conclusion: str):
        self.premise = premise
        self.conclusion = conclusion

    def test_assumption_negation(self, assumption: str, negated_assumption: str, destroys_conclusion: bool) -> str:
        if destroys_conclusion:
            return f"VALID ASSUMPTION: Negating '{negated_assumption}' completely invalidates conclusion: '{self.conclusion}'"
        else:
            return f"INVALID ASSUMPTION: Negation does not destroy conclusion."

evaluator = ArgumentEvaluator(
    premise="Engineers who sleep 8 hours produce 40% fewer syntax bugs.",
    conclusion="Mandating 8 hours of sleep will drastically improve code quality."
)

res = evaluator.test_assumption_negation(
    assumption="Better rested engineers are more attentive (sleep directly caused bug reduction).",
    negated_assumption="Senior experienced engineers naturally sleep more because they work faster, and their experience caused lower bugs.",
    destroys_conclusion=True
)
print(res)
        `)}

        <h3>5.4 Critical Reasoning Question Types Matrix</h3>
        ${buildComplexityTable(
          ['Question Type', 'Core Objective', 'Winning Strategy'],
          [
            ['Find the Assumption', 'Identify the necessary unstated premise', 'Apply the Negation Test'],
            ['Weaken the Argument', 'Undermine the conclusion', 'Introduce an alternate cause or show sample bias'],
            ['Strengthen the Argument', 'Support the author reasoning', 'Eliminate a rival hypothesis or validate premise causality'],
            ['Inference / Must be True', 'Extract factual deduction', 'Pick choice that follows 100% without extra assumptions'],
            ['Paradox / Discrepancy', 'Reconcile two seemingly contradictory facts', 'Find a third fact that explains both phenomena']
          ]
        )}

        <h3>5.5 Real-World Enterprise Case Study</h3>
        ${buildInsight('A/B Testing & Confounding Variables at Netflix', `
          When Netflix experiments with a new UI layout, engineers frequently observe: "Users with the new layout stream 15% more movies (Premise); therefore, the new layout improves engagement (Conclusion)."
          Critical reasoning requires evaluating the <strong>Unstated Assumption</strong>: that the test and control cohorts had identical distribution of weekend vs weekday usage. If the test cohort launched during a holiday weekend, <strong>the holiday was a confounding variable</strong>, completely invalidating the conclusion.
        `)}

        <h3>5.6 Interview Failure Modes & Gotchas</h3>
        ${buildWarning('Attacking the Premise in Weaken Questions', `
          In Critical Reasoning "Weaken the Argument" questions:
          <strong>NEVER dispute the truth of the stated premise!</strong>
          You must accept the author's stated factual premise as 100% true. Your job is to attack <em>the reasoning bridge between the premise and the conclusion</em>, not argue whether the data itself was fabricated.
        `)}

        <h3>5.7 Practice Workshop Challenge</h3>
        ${buildAlgorithm('Challenge: Reconciling the Corporate Remote Work Paradox', `
          <strong>Problem:</strong>
          <em>Fact 1:</em> Company X reported that employees logged 25% more software code commits after shifting to full remote work.
          <em>Fact 2:</em> In that same period, the average time required to complete feature releases increased by 30%.
          <br/>Explain the paradox by identifying the missing variable.
          <br/><br/>
          <strong>Solution:</strong> Remote engineers committed smaller, fragmented code chunks more frequently (inflating commit counts), but increased asynchronous communication delays slowed overall integration and code review throughput.
        `)}
      `
    },
    {
      id: 11606,
      chapterNumber: 6,
      title: 'Idioms, Phrasal Verbs & Precision Business Vocabulary',
      subtitle: 'Collocations, prepositional idioms, professional email phrasing, and eliminating wordy redundancies',
      summary: 'Master idiomatic English and corporate communication: high-frequency phrasal verbs, standard prepositional collocations, professional escalation vocabulary, and eliminating redundant corporate fluff.',
      readingTimeMinutes: 26,
      isFreePreview: false,
      sortOrder: 6,
      contentHtml: `
        <h3>6.1 Phrasal Verbs & Prepositional Collocations</h3>
        <p>A <strong>Phrasal Verb</strong> combines a verb with a preposition or adverb, creating an idiomatic semantic unit whose meaning cannot be deduced from the individual words (e.g. <em>call off</em> = cancel, <em>put up with</em> = tolerate). In technical and corporate environments, incorrect prepositions (e.g. "complied to" instead of "complied with") signal linguistic carelessness.</p>

        ${buildTheorem('Theorem 6.1: Strict Collocation Invariant', `
          Certain adjectives and verbs require <strong>invariant prepositions</strong>:
          <ul>
            <li><strong>Comply WITH</strong> (never <em>comply to</em>)</li>
            <li><strong>Different FROM</strong> (never <em>different than</em> in formal prose)</li>
            <li><strong>Capable OF</strong> (never <em>capable to</em>)</li>
            <li><strong>Abide BY</strong> (never <em>abide with</em>)</li>
            <li><strong>Responsible FOR</strong> (never <em>responsible of</em>)</li>
          </ul>
        `)}

        <h3>6.2 Memory Diagram: Eliminating Wordy Redundancies</h3>
        ${buildMemoryDiagram('Redundancy Pruning: Modern Concise Corporate Writing', `
WORDY & REDUNDANT                              CONCISE & IMPACTFUL
"At this point in time..."              -->    "Currently..." / "Now..."
"Due to the fact that..."               -->    "Because..."
"In the near future..."                 -->    "Soon..."
"Revert back with your feedback..."     -->    "Reply with your feedback..."
"End result of the deployment..."       -->    "The result..."
"Collaborate together on the API..."    -->    "Collaborate on the API..."
"Basic fundamentals of networking..."   -->    "Fundamentals of networking..."
        `)}

        <h3>6.3 Polyglot Implementation: Redundancy Checker</h3>
        <h5>Python 3.12 (Automated Fluff and Jargon Pruner)</h5>
        ${buildCodeBlock('python', `
REDUNDANCIES = {
    "revert back": "reply",
    "at this point in time": "currently",
    "due to the fact that": "because",
    "collaborate together": "collaborate",
    "past history": "history",
    "future plans": "plans",
    "end result": "result",
    "in order to": "to"
}

def prune_corporate_fluff(text: str) -> str:
    cleaned = text
    for verbose, concise in REDUNDANCIES.items():
        pattern = re.compile(re.escape(verbose), re.IGNORECASE)
        cleaned = pattern.sub(concise, cleaned)
    return cleaned

raw = "In order to collaborate together, please revert back due to the fact that past history matters."
print("Pruned Output:", prune_corporate_fluff(raw))
        `)}

        <h3>6.4 High-Yield Corporate Idioms Table</h3>
        ${buildComplexityTable(
          ['Idiom / Phrasal Verb', 'Corporate Meaning', 'Example in Enterprise Context'],
          [
            ['Touch base', 'Briefly connect or confer with someone', "Let's touch base after the sprint demo."],
            ['Circle back', 'Revisit a topic after gathering more data', 'I will circle back once telemetry logs finish processing.'],
            ['Boil the ocean', 'Attempting an impossibly large or impractical task', "We only need an MVP; don't try to boil the ocean."],
            ['Move the needle', 'Make a measurable, significant impact', 'Refactoring that query will actually move the needle on latency.'],
            ['Bite the bullet', 'Endure an inevitable unpleasant task', 'We must bite the bullet and migrate off the deprecated API.']
          ]
        )}

        <h3>6.5 Real-World Enterprise Case Study</h3>
        ${buildInsight('Stripe Technical Writing: Clarity as a Core Value', `
          Stripe's internal engineering culture is famously documented in their technical writing handbook: <em>"Clear writing leads to clear thinking."</em> Stripe software engineers write concise, unambiguous pull request descriptions and documentation, deliberately banning filler phrases and corporate jargon. This clarity enables thousands of engineers to ship high-stakes financial infrastructure changes asynchronously without synchronous meetings.
        `)}

        <h3>6.6 Interview Failure Modes & Gotchas</h3>
        ${buildWarning('The "Revert Back" Indian English Colloquialism', `
          In Indian professional environments, writing <em>"Please revert back at the earliest"</em> is commonplace.
          However, in international technical interviews and global enterprise documentation:
          <strong>"Revert" means to return to a previous state</strong> (e.g. <code>git revert</code>). Saying "revert back" is both redundant and grammatically flawed.
          <strong>Use: "Please reply" or "Please respond."</strong>
        `)}

        <h3>6.7 Practice Workshop Challenge</h3>
        ${buildAlgorithm('Challenge: Professional Email Escalation Refactoring', `
          <strong>Problem:</strong> Refactor an emotional, verbose customer escalation email into a professional, assertive 4-sentence executive communication detailing the root cause, immediate mitigation, and SLA timeline.
        `)}
      `
    },
    {
      id: 11607,
      chapterNumber: 7,
      title: 'Technical Writing & Documentation: RFCs, Architectural Decision Records (ADRs) & API Specs',
      subtitle: 'RFC proposals, ADR format (Context, Decision, Consequences), OpenAPI specs, and self-documenting code',
      summary: 'Master enterprise technical writing: authoring Request for Comments (RFCs), structuring Architectural Decision Records (ADRs), producing OpenAPI 3.0 specifications, and writing maintainable engineering documentation.',
      readingTimeMinutes: 30,
      isFreePreview: false,
      sortOrder: 7,
      contentHtml: `
        <h3>7.1 The Request for Comments (RFC) Engineering Protocol</h3>
        <p>In world-class software engineering organizations (Google, Meta, Amazon, Stripe), major systems are never built on a whim. Senior engineers author an <strong>RFC (Request for Comments)</strong> or Design Document to solicit peer review, align stakeholders, and identify architectural bottlenecks before writing code.</p>

        ${buildTheorem('Theorem 7.1: The Architectural Decision Record (ADR) Invariant', `
          An <strong>Architectural Decision Record (ADR)</strong> is an immutable, version-controlled document that captures a significant architectural decision along with its context and consequences.
          <br/><br/>
          Every standard ADR contains four mandatory sections:
          <ol>
            <li><strong>Status:</strong> Proposed, Accepted, Rejected, Deprecated, or Superseded.</li>
            <li><strong>Context:</strong> The technical, business, or operational forces driving the decision.</li>
            <li><strong>Decision:</strong> The architectural choice made and the explicit rationale.</li>
            <li><strong>Consequences:</strong> The positive impacts, negative trade-offs, and technical debt incurred.</li>
          </ol>
        `)}

        <h3>7.2 Architectural Diagram: RFC Lifecycle Workflow</h3>
        ${buildMemoryDiagram('Enterprise RFC Engineering Lifecycle', `
[PROBLEM IDENTIFICATION] -> Author draft design doc (Context, Alternatives, Trade-offs)
                                  |
                                  v
[PEER REVIEW / RFC PHASE] -> Cross-functional review (Security, Infrastructure, Product)
                                  |
               +------------------+------------------+
               |                                     |
      [Feedback & Iteration]                [Consensus Reached]
               ^                                     |
               |                                     v
               +---------------------------- [ADR COMMITTED TO REPO]
                                                     |
                                                     v
                                          [IMPLEMENTATION SPRINT]
        `)}

        <h3>7.3 Polyglot Implementation: Complete ADR Template</h3>
        <h5>Markdown / Engineering Architecture (Production ADR Blueprint)</h5>
        ${buildCodeBlock('markdown', `
# ADR-042: Migration from REST to gRPC for Internal Microservices

## Status
Accepted

## Context
Our core checkout workflow involves 8 microservice hops. Under peak Black Friday traffic:
- JSON over HTTP/1.1 REST serialization creates 45ms p99 latency overhead.
- Schema drift between team interfaces caused 3 production outages last quarter.
- Microservice CPU is consumed by JSON string parsing rather than business logic.

## Decision
We will adopt **gRPC over HTTP/2** with Protocol Buffers for all internal microservice-to-microservice RPC communication. External client-facing APIs will remain OpenAPI REST via an Envoy reverse proxy gateway.

## Consequences
### Positive:
- Binary protobuf serialization cuts payload sizes by 65%.
- Strict schemas enforce backwards-compatible API contracts across repositories.
- HTTP/2 multiplexing reduces connection counts and handshakes.

### Negative / Trade-Offs:
- Internal RPC endpoints are no longer directly debuggable via raw curl.
- Requires continuous training for frontend engineers debugging via BloomRPC/Postman.
- Envoy gateway adds one network hop at the perimeter.
        `)}

        <h3>7.4 Technical Documentation Artifacts Matrix</h3>
        ${buildComplexityTable(
          ['Document Type', 'Primary Audience', 'Longevity', 'Key Objective'],
          [
            ['RFC / Design Doc', 'Engineering peers, architects, security', 'Transient (Guides implementation)', 'Achieve consensus on technical approach'],
            ['ADR (Arch Decision Record)', 'Future engineers, audit teams', 'Permanent (Historical record)', 'Document why a decision was made'],
            ['OpenAPI / Swagger Spec', 'API consumers, frontend devs', 'Live (Tracks API changes)', 'Define machine-readable API contracts'],
            ['Runbook / Playbook', 'On-call SREs during outages', 'Live (Updated after post-mortems)', 'Step-by-step mitigation instructions']
          ]
        )}

        <h3>7.5 Real-World Enterprise Case Study</h3>
        ${buildInsight('The IETF RFC Process: How the Internet Was Documented', `
          In 1969, Steve Crocker authored RFC 1 ("Host Software"), establishing the <strong>Request for Comments (RFC)</strong> model. The humble title was chosen to invite collaboration without claiming authority. Over five decades, this precise written culture produced the foundational standards of the modern world: RFC 791 (IPv4), RFC 793 (TCP), RFC 2616 (HTTP/1.1), and RFC 9000 (QUIC).
        `)}

        <h3>7.6 Interview Failure Modes & Gotchas</h3>
        ${buildWarning('The Missing Trade-Offs Section Flaw', `
          When candidates write design documents or answer system design questions:
          They often present their chosen architecture as "perfect with zero downsides".
          <strong>Experienced staff engineers know that all architectures are trade-offs.</strong>
          An RFC that fails to document negative consequences, failure modes, and migration debt will be rejected by senior reviewers immediately.
        `)}

        <h3>7.7 Practice Workshop Challenge</h3>
        ${buildAlgorithm('Challenge: Write OpenAPI 3.0 Endpoint Specification', `
          <strong>Problem:</strong> Write a valid YAML OpenAPI 3.0 specification for an endpoint <code>POST /api/v1/transfer</code> that accepts <code>fromAccountId</code>, <code>toAccountId</code>, and <code>amountCents</code>, including 200 OK, 400 Bad Request, and 409 Insufficient Funds responses.
        `)}
      `
    },
    {
      id: 11608,
      chapterNumber: 8,
      title: 'Group Discussions (GD) & Professional Communication for Placements',
      subtitle: 'Initiating, summarizing, handling conflicts, body language, and structuring arguments via PREP framework',
      summary: 'Master campus recruitment Group Discussions (GD): the PREP (Point, Reason, Example, Point) framework, strategies for initiation and moderation, steering aggressive group dynamics, and impactful summary delivery.',
      readingTimeMinutes: 28,
      isFreePreview: false,
      sortOrder: 8,
      contentHtml: `
        <h3>8.1 The Group Discussion Evaluation Matrix</h3>
        <p>In corporate hiring (TCS, Deloitte, Mu Sigma, Amazon), a Group Discussion is not a debate to be won; it is a collaborative simulation of a corporate project meeting. Evaluators score candidates across four primary dimensions:</p>
        <ol>
          <li><strong>Content & Domain Knowledge:</strong> Substance of ideas, structured arguments, and factual evidence.</li>
          <li><strong>Communication & Clarity:</strong> Articulation, pace, voice modulation, and listening skills.</li>
          <li><strong>Group Dynamics & Leadership:</strong> Encouraging silent peers, de-escalating conflicts, and keeping the discussion on track.</li>
          <li><strong>Critical Reasoning:</strong> Synthesizing disparate perspectives into a constructive consensus.</li>
        </ol>

        ${buildTheorem('Theorem 8.1: The PREP Communication Framework', `
          When presenting an argument in a high-pressure GD, structure your contribution using the <strong>PREP Framework</strong> (under 45 seconds):
          \\[
          \\text{PREP} = \\text{Point} \\to \\text{Reason} \\to \\text{Example} \\to \\text{Point (Restated)}
          \\]
          <ol>
            <li><strong>P (Point):</strong> State your clear, concise thesis in one sentence.</li>
            <li><strong>R (Reason):</strong> Explain the fundamental logic or causality behind your point.</li>
            <li><strong>E (Example):</strong> Provide a concrete real-world data point, company case study, or metric.</li>
            <li><strong>P (Point):</strong> Conclude by reinforcing your core thesis.</li>
          </ol>
        `)}

        <h3>8.2 Architectural Diagram: GD Seating Dynamics & Eye Contact</h3>
        ${buildMemoryDiagram('Semi-Circular GD Layout & Eye Contact Triangle', `
                               [EVALUATOR / HR TABLE]
                           (NEVER look directly at HR!)

                        [Candidate 4]       [Candidate 5]
                  [Candidate 3]                   [Candidate 6]
              [Candidate 2]                           [Candidate 7]
          [Candidate 1]                                   [Candidate 8]

EYE CONTACT TRIANGLE:
Maintain 120-degree rotating eye contact with ALL fellow candidates across the circle!
Looking at the evaluator signals that you are performing for marks rather than collaborating!
        `)}

        <h3>8.3 Polyglot Implementation: GD Intervention Script Frameworks</h3>
        <h5>Professional Verbal Intervention Scripts</h5>
        ${buildCodeBlock('text', `
1. HOW TO INITIATE (When you know the topic well):
"Good morning everyone. The topic given to us today is 'Artificial Intelligence: A Threat or an Catalyst for Employment'. Let us begin by defining the scope: AI does not merely replace manual labor; historically, every industrial transition displaced specific tasks while creating entirely new specialized disciplines. I look forward to hearing your insights."

2. HOW TO STEER A FISH MARKET (When everyone is yelling simultaneously):
"Friends, if we all speak over each other, none of our valid points will be heard. Let us take turns speaking for 30 seconds each so that everyone contributes constructively."

3. HOW TO INVITE A SILENT PEER:
"We have heard several perspectives on cloud security from this side of the table. Candidate 6 has been trying to speak; let us give him an opportunity to share his thoughts."

4. HOW TO DISAGREE PROFESSIONALLY:
"I acknowledge Candidate 3's point regarding short-term implementation costs. However, if we examine the 5-year total cost of ownership (TCO), automated pipelines drastically reduce maintenance overhead."
        `)}

        <h3>8.4 GD Performance Roles Matrix</h3>
        ${buildComplexityTable(
          ['Role', 'Action Profile', 'Risk Level', 'Scoring Potential'],
          [
            ['The Initiator', 'Opens the discussion with definitions and frameworks', 'High (Failing to set correct context penalizes heavily)', 'Highest (Demonstrates leadership and courage)'],
            ['The Moderator', 'Prevents chaos, keeps time, ensures equal participation', 'Medium', 'Very High (Demonstrates emotional intelligence)'],
            ['The Content Contributor', 'Introduces fresh data, statistics, and domain insights', 'Low', 'High (Demonstrates depth of knowledge)'],
            ['The Summarizer', 'Synthesizes both sides of the debate into a balanced conclusion', 'Medium-High', 'High (Must be completely neutral and comprehensive)']
          ]
        )}

        <h3>8.5 Real-World Enterprise Case Study</h3>
        ${buildInsight('Amazon Leadership Principles: "Have Backbone; Disagree and Commit"', `
          Amazon's 14 Leadership Principles state: <em>"Leaders are obligated to respectfully challenge decisions when they disagree, even when doing so is uncomfortable or exhausting. Leaders have conviction and are tenacious. They do not compromise for the sake of social cohesion. Once a decision is determined, they commit wholly."</em>
          In placement GDs, evaluators look for this exact maturity: candidates who voice respectful disagreement based on data, but actively work towards team alignment rather than petty obstinacy.
        `)}

        <h3>8.6 Interview Failure Modes & Gotchas</h3>
        ${buildWarning('The "Looking at the Evaluator" Fatal Error', `
          The fastest way to fail a Group Discussion is to look at the HR evaluator while speaking!
          The evaluator is an invisible observer. Addressing the evaluator confirms you lack team awareness.
          <strong>Address your fellow candidates exclusively.</strong> Use open body language, nod when others make valid points, and never cross your arms defensively.
        `)}

        <h3>8.7 Practice Workshop Challenge</h3>
        ${buildAlgorithm('Challenge: Synthesize a 60-Second Balanced GD Summary', `
          <strong>Problem:</strong> You are in a GD on the topic: <em>"Moonlighting in the IT Industry: Ethical Violation or Professional Freedom?"</em>
          Deliver a neutral, 60-second summary synthesizing the employer perspective (IP theft, productivity drain, conflict of interest) and the employee perspective (upskilling, economic inflation, off-hours autonomy).
        `)}
      `
    }
  ]
};

module.exports = book116;
