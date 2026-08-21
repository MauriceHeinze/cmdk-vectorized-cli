# cmdk-vectorized-cli

Self-hosted intent tooling for [cmdk-vectorized](https://github.com/MauriceHeinze/cmdk-vectorized). It installs coding-agent skills, validates the generated intent map, and uploads it to your Weaviate cluster.

Requires Node.js 20+, a React app, Codex/Claude/OpenCode, and a Weaviate instance with `text2vec-openai` and its model-provider credentials configured.

## Quick start

The examples use `npx`. To pin the CLI in the application first:

```bash
npm install -D cmdk-vectorized-cli
```

### 1. Generate the intent map

```bash
npx cmdk-vectorized-cli init
```

`init` only installs the skill. Then give your coding agent a prompt such as:

```text
Use the cmdk-intent-map-generator skill. Inspect this app and create
public/intent-map.json and public/intent-map.csv. Include only real routes and
implemented actions, keep command IDs stable and unique, and do not change the
app or upload anything.
```

Review both generated files before continuing.

### 2. Upload to Weaviate

```bash
WEAVIATE_URL="https://example.weaviate.cloud" \
WEAVIATE_API_KEY="..." \
npx cmdk-vectorized-cli upload
```

This validates the JSON, regenerates the CSV, creates the `CmdkIntent` collection if needed, and uploads deterministic objects keyed by `commandId`.

### 3. Integrate the application

```bash
npx cmdk-vectorized-cli integrate
```

Then prompt your coding agent:

```text
Use the cmdk-vectorized-integrator skill to connect this app to my self-hosted
Weaviate CmdkIntent collection. Preserve its existing command palette if it has
one; otherwise use AICommandPalette. Implement the server-side
GET /api/command-search route, keep Weaviate credentials on the server, return
navigation results with href and action results with actionKey, disable local
cmdk filtering, and verify typed search, navigation, and actions.
```

The application must implement the actual Weaviate query. `createCommandSearchHandler` parses `q` and `limit` and wraps the results, but its `search` function is supplied by your server.

### 4. Verify

Start the app and call the route directly:

```bash
curl "http://localhost:3000/api/command-search?q=settings&limit=5"
```

It must return `{ "results": [...] }`. Verify that the palette preserves backend ranking, navigation opens the right route, actions call the right handler, and optional voice input uses the same endpoint.

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
