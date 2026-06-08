#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(CDPATH= cd -- "$(dirname -- "$0")" && pwd)"
ROOT_DIR="$(CDPATH= cd -- "$SCRIPT_DIR/../../.." && pwd)"

cd "$ROOT_DIR/apps/admin"
./node_modules/.bin/vite --host 127.0.0.1 --port 4174
