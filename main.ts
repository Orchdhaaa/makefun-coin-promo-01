// Copies LAUNCH.json from the repo root into the output directory.
// (makefun-coin-promo-01, Node 22, standard library only.)
// The entry is the coin itself: the agent launches it on pump.fun and
// LAUNCH.json names its mint and the signature of the transaction that
// created it. The grader runs this program twice; both runs must write
// the same bytes, so this file does nothing but copy, deterministically.
import { copyFileSync, mkdirSync, statSync } from "node:fs";
import { join } from "node:path";

const botDir = process.env.MAKEFUN_BOT_DIR ?? "/bot";
const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";

try {
  mkdirSync(outputDir, { recursive: true });
  const src = join(botDir, "LAUNCH.json");
  const dst = join(outputDir, "LAUNCH.json");
  copyFileSync(src, dst);
  // The gate refuses an empty LAUNCH.json; fail loudly instead of
  // handing the grader a zero-byte file.
  if (statSync(dst).size === 0) {
    throw new Error("LAUNCH.json copied but empty");
  }
} catch (error) {
  const message = error instanceof Error ? error.message : String(error);
  console.error(`failed to copy LAUNCH.json: ${message}`);
  process.exit(1);
}
