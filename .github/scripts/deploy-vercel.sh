#!/usr/bin/env bash

set -euo pipefail

target="${1:-preview}"

if [[ -z "${VERCEL_TOKEN:-}" ]]; then
  echo "VERCEL_TOKEN is required" >&2
  exit 1
fi

case "$target" in
  production)
    environment="production"
    build_flags=(--prod)
    deploy_flags=(--prod)
    ;;
  preview)
    environment="preview"
    build_flags=()
    deploy_flags=()
    ;;
  *)
    echo "unknown deployment target: $target" >&2
    exit 1
    ;;
esac

pnpm dlx vercel@latest pull --yes --environment="$environment" --token="$VERCEL_TOKEN"
SKIP_NEXT_BUILD_CHECKS=true pnpm dlx vercel@latest build "${build_flags[@]}" --token="$VERCEL_TOKEN"

deployment_output="$(
  pnpm dlx vercel@latest deploy \
    --prebuilt \
    --archive=tgz \
    "${deploy_flags[@]}" \
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
