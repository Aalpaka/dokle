#!/bin/sh
# Vercel build: migracije i seed samo za produkciju (preview dijeli bazu, ali je ne mijenja).
set -e
if [ "$VERCEL_ENV" = "production" ]; then
  npx drizzle-kit migrate
  npx tsx scripts/seed.ts
fi
npx next build
