#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(CDPATH= cd -- "$(dirname -- "$0")" && pwd)"
ROOT_DIR="$(CDPATH= cd -- "$SCRIPT_DIR/../../.." && pwd)"
LOG_DIR="$SCRIPT_DIR/logs"

mkdir -p "$LOG_DIR"
cd "$ROOT_DIR"

./apps/mobile/node_modules/.bin/vue-tsc -p apps/mobile/tsconfig.json --noEmit \
  2>&1 | tee "$LOG_DIR/mobile-typecheck.log"
