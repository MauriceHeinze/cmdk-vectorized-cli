# cmdk-vectorized-cli

Intent-map CLI for [cmdk-vectorized](https://github.com/MauriceHeinze/cmdk-vectorized). Validates `public/intent-map.json`, installs coding-agent skills, and uploads intents to Weaviate.

This is not the React palette. Runtime search stays in `cmdk-vectorized`.

## Install

```bash
npx cmdk-vectorized-cli --help
```

Or add it to a project:

```bash
npm install -D cmdk-vectorized-cli
```

## Commands

```bash
npx cmdk-vectorized-cli integrate
npx cmdk-vectorized-cli init
WEAVIATE_URL="..." WEAVIATE_API_KEY="..." npx cmdk-vectorized-cli upload
```

| Command | Purpose |
|---------|---------|
| `integrate` | Install the cmdk-vectorized integration skill for Codex, Claude, and OpenCode |
| `init` | Install the intent-map generator skill; produces `public/intent-map.json` |
| `upload` | Validate `public/intent-map.json`, write `public/intent-map.csv`, upload to Weaviate |

`upload` requires `WEAVIATE_URL` and `WEAVIATE_API_KEY`.

## Programmatic API

```ts
import {
  installAgentWorkflows,
  installIntegrationSkill,
  uploadIntentMap,
  validateIntentMap,
  intentMapToCsv,
} from "cmdk-vectorized-cli";
```

## Development

```bash
pnpm install
pnpm check
```
