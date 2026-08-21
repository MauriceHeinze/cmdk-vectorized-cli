import { mkdir, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";

import intentSkill from "../skills/cmdk-intent-map-generator/SKILL.md";
import integrationSkill from "../skills/cmdk-vectorized-integrator/SKILL.md";
import type { InstallAgentWorkflowsOptions } from "./types";

type WorkflowFile = { path: string; content: string };

const INTENT_FILES: WorkflowFile[] = [
  { path: join(".codex", "skills", "cmdk-intent-map-generator", "SKILL.md"), content: intentSkill },
  { path: join(".opencode", "skills", "cmdk-intent-map-generator", "SKILL.md"), content: intentSkill },
  { path: join(".claude", "commands", "cmdk-intent-map-generator.md"), content: intentSkill },
];

const INTEGRATION_FILES: WorkflowFile[] = [
  { path: join(".codex", "skills", "cmdk-vectorized-integrator", "SKILL.md"), content: integrationSkill },
  { path: join(".opencode", "skills", "cmdk-vectorized-integrator", "SKILL.md"), content: integrationSkill },
  {
    path: join(".claude", "commands", "cmdk-vectorized-integrator.md"),
    content: withoutFrontmatter(integrationSkill),
  },
];

function withoutFrontmatter(markdown: string): string {
  return markdown.replace(/^---\r?\n[\s\S]*?\r?\n---\r?\n*/, "");
}

async function installFiles(options: InstallAgentWorkflowsOptions, files: WorkflowFile[]) {
  const written: string[] = [];
  for (const file of files) {
    const target = join(options.cwd, file.path);
    await mkdir(dirname(target), { recursive: true });
    await writeFile(target, file.content, "utf8");
    written.push(file.path);
  }
  return written;
}

export function installAgentWorkflows(options: InstallAgentWorkflowsOptions) {
  return installFiles(options, INTENT_FILES);
}

export function installIntegrationSkill(options: InstallAgentWorkflowsOptions) {
  return installFiles(options, INTEGRATION_FILES);
}
