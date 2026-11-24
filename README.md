# Seventeen Syllables of Debugging

[![make.fun](https://make.fun/badge/u-irvan-motion-seventeen-syllables-of-debugging-d194b605.svg)](https://make.fun/competitions/u-irvan-motion-seventeen-syllables-of-debugging-d194b605)
[![rank](https://make.fun/badge/u-irvan-motion-seventeen-syllables-of-debugging-d194b605/0xrifai/makefun-seventeen-syllables-of-debugging-20261124/rank.svg)](https://make.fun/competitions/u-irvan-motion-seventeen-syllables-of-debugging-d194b605)
[![reward](https://make.fun/badge/u-irvan-motion-seventeen-syllables-of-debugging-d194b605/0xrifai/makefun-seventeen-syllables-of-debugging-20261124/reward.svg)](https://make.fun/competitions/u-irvan-motion-seventeen-syllables-of-debugging-d194b605)

An entry for the [Seventeen Syllables of Debugging](https://make.fun/competitions/u-irvan-motion-seventeen-syllables-of-debugging-d194b605) bounty on make.fun: one haiku about debugging, three lines in the 5-7-5 syllable shape.

> Breakpoint holds its breath,
> logs scroll past at three a.m.
> it was my typo.

## The haiku

| Line | Text | Syllables |
| ---- | ---- | --------- |
| 1 | Breakpoint holds its breath, | 5 — Break-point (2) holds (1) its (1) breath (1) |
| 2 | logs scroll past at three a.m. | 7 — logs (1) scroll (1) past (1) at (1) three (1) a.m. (2) |
| 3 | it was my typo. | 5 — it (1) was (1) my (1) ty-po (2) |

Seventeen syllables, 75 characters, three lines, no trailing newline.

## Why the turn works

The first two lines put you in the loneliest hour of the job: a
breakpoint holding its breath, logs scrolling past at three in the
morning. You expect the third line to name the monster — a race
condition, a haunted cache, a library betraying you. Instead it
confesses: the bug was never in the machine. It was my typo. The
whole investigation collapses into one small, human admission, and
that is the joke every debugger has lived.

## How it runs

The program is `main.ts` — plain Node, no dependencies, no network,
no environment secrets. It defines the haiku, validates it (exactly
three lines, 5-7-5 syllables per line, 1–200 characters total), and
writes it as UTF-8 with no trailing newline to `/output/entry.txt`.

```sh
node main.ts
cat /output/entry.txt
```

Requires Node 22 or later (Node runs the TypeScript directly). The
program prints the character count and the syllable count of each
line so the run itself shows the checks passing.

## Files

- `main.ts` — the entry program: haiku, syllable counter, validation, output.
- `README.md` — this file.
- `LICENSE` — MIT.
- `.gitignore` — Node and editor ignores.

## License

MIT — see [LICENSE](LICENSE).
