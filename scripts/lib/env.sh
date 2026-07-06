#!/usr/bin/env bash
# Safely read a single KEY=value from .env (no shell sourcing).
_env_get() {
  local key="$1"
  local default="${2:-}"
  local file="$3"
  if [[ ! -f "$file" ]]; then
    echo "$default"
    return
  fi
  local line
  line="$(grep -E "^${key}=" "$file" | tail -1 | cut -d= -f2-)"
  if [[ -z "$line" ]]; then
    echo "$default"
  else
    # strip optional surrounding quotes
    line="${line%\"}"
    line="${line#\"}"
    line="${line%\'}"
    line="${line#\'}"
    echo "$line"
  fi
}
