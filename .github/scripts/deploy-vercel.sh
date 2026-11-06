#!/usr/bin/env bash

set -euo pipefail

target="${1:-preview}"

# Pin by setting VERCEL_CLI_VERSION (e.g. repository variable), defaults to latest.
# One value is used for all three calls so a deploy never mixes CLI versions.
vercel_cli="vercel@${VERCEL_CLI_VERSION:-latest}"

if [[ -z "${VERCEL_TOKEN:-}" ]]; then
  echo "VERCEL_TOKEN is required" >&2
  exit 1
fi

case "$target" in
  production)
    environment="production"
    prod_flags=(--prod)
    ;;
  preview)
    environment="preview"
    prod_flags=()
    ;;
  *)
    echo "unknown deployment target: $target" >&2
    exit 1
    ;;
esac

echo "using $vercel_cli"

# ${arr[@]+"${arr[@]}"} expands an empty array safely under `set -u`,
# also in bash < 4.4 (macOS).
pnpm dlx "$vercel_cli" pull --yes --environment="$environment" --token="$VERCEL_TOKEN"
SKIP_NEXT_BUILD_CHECKS=true pnpm dlx "$vercel_cli" build ${prod_flags[@]+"${prod_flags[@]}"} --token="$VERCEL_TOKEN"

deployment_output="$(
  pnpm dlx "$vercel_cli" deploy \
    --prebuilt \
    --archive=tgz \
    ${prod_flags[@]+"${prod_flags[@]}"} \
    --token="$VERCEL_TOKEN"
)"

echo "$deployment_output"

deployment_url="$(printf "%s\n" "$deployment_output" | awk '/^https:\/\// { url = $0 } END { print url }')"

if [[ -z "$deployment_url" ]]; then
  echo "could not find deployment url in Vercel output" >&2
  exit 1
fi

if [[ -n "${GITHUB_OUTPUT:-}" ]]; then
  echo "deployment_url=$deployment_url" >> "$GITHUB_OUTPUT"
fi
