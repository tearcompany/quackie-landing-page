# PersonAI Personas v2

Each persona consists of:
- persona.yaml (metadata + tuning)
- system_prompt.md (LLM prompt)

The engine should:
1. Load persona.yaml
2. Build the final prompt
3. Rewrite only the commit message
4. Preserve Conventional Commits
