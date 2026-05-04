# Aridinsights (LEGACY — ARCHIVED 2026-05-03)

> **This repository is archived (read-only).** It was the initial AridInsights website attempt from February 2026 (commit timestamps show last activity 2026-02-10), pre-dating the current Arid Insights venture infrastructure. It is preserved as historical reference only.

## Current canonical repositories

The current Arid Insights ecosystem lives under `tezzy90/arid-*`:

| Purpose | Current canonical repo |
|---|---|
| BigQuery schema authority | [`tezzy90/arid-schemas`](https://github.com/tezzy90/arid-schemas) (private) |
| Public web surface (aridinsights.com, fieldsofthought.com) | [`tezzy90/arid-insights-web`](https://github.com/tezzy90/arid-insights-web) (private) |
| Authority docs, agents, skills, workflows, semantic layer | [`tezzy90/arid-insights-platform`](https://github.com/tezzy90/arid-insights-platform) (private) |
| Terraform IaC, IAM, GCP project config | [`tezzy90/arid-infra`](https://github.com/tezzy90/arid-infra) (private) |
| Cross-repo coordination docs | [`tezzy90/arid-ecosystem`](https://github.com/tezzy90/arid-ecosystem) (private) |
| Pre-consolidation microservices (slated to consolidate into monorepo `arid` per CHANGE-003) | `tezzy90/arid-extractor`, `arid-checker`, `arid-arbiter`, `arid-commit`, `arid-packet-gen`, `arid-dd-api`, `arid-insights-ops` |

Per the Build Plan (May 2026), the target topology is **monorepo `arid` + `arid-schemas` standalone**. See [CHANGE-003](https://github.com/tezzy90/arid-ecosystem/blob/main/CHANGE_LOG.md) for the consolidation workstream.

## Why this is archived

This repo predates the Arid Insights LLC formation (March 1, 2026) and the post-refocus product set (GAB + FUM, FL-only, two-layer strategy). Its content is not consulted as current authority.

Per CLEANSING_PLAN.md D8 (founder decision 2026-05-03): archived in place; do not delete.
