# AGENTS.md — cmdk-vectorized-cli

Node CLI and library for **intent maps** used with `cmdk-vectorized`.

Not the React palette. Do not add client hooks, `cmdk` UI, or search handlers here.

## Commands

| Command | Purpose |
|---------|---------|
| `npx cmdk-vectorized-cli integrate` | Install integration skill for coding agents |
| `npx cmdk-vectorized-cli init` | Install intent-map generator skill; produces `public/intent-map.json` |
| `npx cmdk-vectorized-cli upload` | Validate intent map and upload to Weaviate |

Upload requires `WEAVIATE_URL` and `WEAVIATE_API_KEY`.

## Imports

```ts
import {
  installAgentWorkflows,
  installIntegrationSkill,
  uploadIntentMap,
  validateIntentMap,
} from "cmdk-vectorized-cli";
```

## Layout

```txt
src/cli.ts                 npx entry (init / integrate / upload)
src/intent-map.ts          read + validate public/intent-map.json
src/csv.ts                 CSV export
src/weaviate.ts            CmdkIntent schema + batch upload
src/workflows.ts           write agent skill files
src/workflow-templates.ts  skill bodies
```

## Constraints

When generating intent maps via `init`, do **not** generate `llms.txt` files in the consumer app. Do not change app behavior during intent-map generation.

Weaviate object ids stay deterministic from `commandId` so re-upload upserts.
