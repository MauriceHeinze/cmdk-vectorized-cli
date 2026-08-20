# cmdk-vectorized-cli

Self-hosted intent-map CLI for [cmdk-vectorized](https://github.com/MauriceHeinze/cmdk-vectorized). It validates `public/intent-map.json`, installs coding-agent skills, and uploads directly to a Weaviate cluster you operate.

This is not the React palette and it does not call the hosted SupaSearch API.
Runtime search stays in `cmdk-vectorized`.

For hosted multi-tenant search, API keys, dashboard editing, and SupaSearch
ingestion, use [`supasearch`](../cmdk-saas/packages/cli/README.md) instead.

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

`upload` requires `WEAVIATE_URL` and `WEAVIATE_API_KEY` for your own cluster.
SupaSearch credentials are intentionally unsupported here.

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
