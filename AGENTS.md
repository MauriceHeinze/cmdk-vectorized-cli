# AGENTS.md — cmdk-vectorized-cli

Node CLI and library for **self-hosted intent maps** used with `cmdk-vectorized`.

Not the React palette and not the hosted SupaSearch CLI. Do not add SupaSearch
API keys, hosted ingest routes, dashboard behavior, client hooks, `cmdk` UI, or
search handlers here. Hosted workflows belong to `cmdk-saas/packages/cli` and
the published `supasearch` command.

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
skills/cmdk-intent-map-generator/SKILL.md  init skill (intent map)
skills/cmdk-vectorized-integrator/SKILL.md integrate skill
src/cli.ts                                 npx entry (init / integrate / upload)
src/intent-map.ts                          read + validate public/intent-map.json
src/csv.ts                                 CSV export
src/weaviate.ts                            CmdkIntent schema + batch upload
src/workflows.ts                           install the files from skills/
```

Skill markdown in `skills/` is the source of truth. `init` / `integrate` import those files and write them into the consumer app. Do not duplicate skill bodies in TypeScript.

## Constraints

When generating intent maps via `init`, do **not** generate `llms.txt` files in the consumer app. Do not change app behavior during intent-map generation.

Weaviate object ids stay deterministic from `commandId` so re-upload upserts.
