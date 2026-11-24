/**
 * Seventeen Syllables of Debugging — make.fun entry program.
 *
 * A tiny, dependency-free Node program. It holds one haiku about
 * debugging, checks that the haiku is exactly three lines in the
 * 5-7-5 syllable shape, and writes it — with no trailing newline —
 * to /output/entry.txt, where the make.fun harness reads it.
 *
 * No network, no environment secrets, no reading from anywhere else:
 * everything the program needs is in this file.
 */

import { mkdirSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

// ---------------------------------------------------------------------------
// The haiku
// ---------------------------------------------------------------------------
//
// Line 1 — 5 syllables: Break-point (2) holds (1) its (1) breath (1)
// Line 2 — 7 syllables: logs (1) scroll (1) past (1) at (1) three (1) a.m. (2)
// Line 3 — 5 syllables: it (1) was (1) my (1) ty-po (2)
//
// The picture is the loneliest hour of the job: a breakpoint holding
// its breath while the logs scroll past at three in the morning. The
// turn lands in the last line — after all that staring, the bug was
// never in the machine. It was my typo.

const HAIKU_LINES = [
  "Breakpoint holds its breath,",
  "logs scroll past at three a.m.",
  "it was my typo.",
] as const;

const EXPECTED_SYLLABLES = [5, 7, 5] as const;
const OUTPUT_PATH = "/output/entry.txt";
const MAX_CHARS = 200;

// ---------------------------------------------------------------------------
// Syllable counting
// ---------------------------------------------------------------------------
//
// A small, deterministic counter for the plain English words this haiku
// uses. It counts vowel groups, then applies the usual corrections:
// a silent trailing "e" drops a syllable, "-ed" after a consonant that
// is not pronounced as its own syllable drops one too, and a handful of
// words whose spelling hides their sound get an explicit table entry.
// Every word in the haiku is covered by the table, so the counter's
// result for this text is exact, not an approximation.

const KNOWN_COUNTS: Readonly<Record<string, number>> = {
  breakpoint: 2,
  holds: 1,
  its: 1,
  breath: 1,
  logs: 1,
  scroll: 1,
  past: 1,
  at: 1,
  three: 1,
  "a.m.": 2,
  it: 1,
  was: 1,
  my: 1,
  typo: 2,
};

function stripPunctuation(word: string): string {
  return word.toLowerCase().replace(/^[^a-z0-9.]+|[^a-z0-9.]+$/g, "");
}

function countSyllablesInWord(raw: string): number {
  const word = stripPunctuation(raw);
  if (word.length === 0) return 0;
  const known = KNOWN_COUNTS[word];
  if (known !== undefined) return known;

  // Fallback for any word outside the table: count vowel groups.
  const cleaned = word.replace(/[^a-z]/g, "");
  if (cleaned.length === 0) return 0;
  const groups = cleaned.match(/[aeiouy]+/g) ?? [];
  let count = groups.length;
  if (cleaned.endsWith("e") && count > 1) count -= 1;
  if (/[^aeiou]ed$/.test(cleaned) && count > 1) count -= 1;
  return Math.max(count, 1);
}

function countSyllablesInLine(line: string): number {
  return line
    .split(/\s+/)
    .filter((word) => word.length > 0)
    .reduce((total, word) => total + countSyllablesInWord(word), 0);
}

// ---------------------------------------------------------------------------
// Validation
// ---------------------------------------------------------------------------

function fail(message: string): never {
  console.error(`error: ${message}`);
  process.exit(1);
}

function validateHaiku(lines: readonly string[]): string {
  if (lines.length !== 3) {
    fail(`haiku must have exactly 3 lines, got ${lines.length}`);
  }

  lines.forEach((line, index) => {
    const counted = countSyllablesInLine(line);
    const expected = EXPECTED_SYLLABLES[index];
    if (counted !== expected) {
      fail(
        `line ${index + 1} has ${counted} syllables, expected ${expected}: ${JSON.stringify(line)}`,
      );
    }
  });

  const text = lines.join("\n");

  if (text.length === 0 || text.trim().length === 0) {
    fail("haiku must not be empty or only whitespace");
  }
  if (text.length > MAX_CHARS) {
    fail(`haiku is ${text.length} characters, over the ${MAX_CHARS} limit`);
  }
  if (text.endsWith("\n")) {
    fail("haiku must not end with a trailing newline");
  }

  return text;
}

// ---------------------------------------------------------------------------
// Entry point
// ---------------------------------------------------------------------------

function main(): void {
  const text = validateHaiku(HAIKU_LINES);

  mkdirSync(dirname(OUTPUT_PATH), { recursive: true });
  writeFileSync(OUTPUT_PATH, text, "utf8");

  console.log(`wrote ${text.length} characters to ${OUTPUT_PATH}`);
  HAIKU_LINES.forEach((line, index) => {
    console.log(
      `line ${index + 1}: ${countSyllablesInLine(line)} syllables — ${line}`,
    );
  });
}

main();
