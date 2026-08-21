---
name: cmdk-intent-map-generator
description: Generate cmdk-vectorized intent-map artifacts for the current app.
---

# cmdk-intent-map-generator

Inspect the app and write:

- public/intent-map.json
- public/intent-map.csv

## Discovery

Read route definitions, navigation, pages, command palettes, forms, tabs, buttons, selects, toggles, and explicit settings metadata. Capture tasks a user can actually perform. Prefer source metadata over inference and omit optional values you cannot verify.

## JSON contract

Each array item must contain recordType, section, commandId, label, phrases, keywords, description, and actionType. It may also contain path, setValue, or stateKey. Phrases and keywords are string arrays; all other fields are strings.

Command IDs must be stable and unique. Paths must resolve to real app routes. Action records must describe an implemented interaction, not a hypothetical feature.

## CSV contract

Use these columns in order:

recordType,section,commandId,label,path,phrases,keywords,setValue,description,actionType,stateKey

Join phrases and keywords with ` | ` and escape CSV cells correctly.

## Constraints

- Do not change application behavior or source code.
- Do not create llms.txt files.
- Do not upload anything.
- Validate both files against the contract before finishing.
