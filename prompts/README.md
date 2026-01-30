# Prompt Catalog & Registry

This directory contains the central repository of system prompts, agent directives, and operational playbooks used in this project.

## Structure

- **`/catalog`**: Human-readable documentation of prompts, organized by function. Use this to find *what* to run.
- **`/registry`**: Machine-readable (YAML) definitions of prompts, versioned and structured. Use this for *automation*.
- **`/discovery`**: Output of automated scans finding "prompt-like" content in the codebase.
- **`/templates`**: Standard templates for adding new entries.

## How to Contribute

1. **Discovery**: Run `scripts/prompt_discovery.sh` to find new candidates.
2. **Curate**: Move valid candidates from `discovery/discovered_prompts_raw` to `discovery/discovered_prompts_curated`.
3. **Register**: Create a YAML file in `registry/<category>/<id>.yaml` using the template.
4. **Catalog**: Create a Markdown entry in `catalog/<category>.md` linking to the registry.

## Categories
- **Build**: CI/CD build steps, Dockerfiles, Cloud Build configs.
- **Deploy**: Cloud Run, Firebase deploy commands.
- **Verify**: Post-deployment health checks, smoke tests.
- **Debug**: investigation guides, log analysis.
- **Agents**: System instructions for AI agents.
- **Strategy**: Strategic planning and architectural decisions.
