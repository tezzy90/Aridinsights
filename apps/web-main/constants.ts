import { StepItem } from "./types";

export const APP_NAME = "AridInsights";

export const POLICY_LAST_UPDATED = 'January 3, 2026';

export const EMAILS = {
  INFO: 'info@aridinsights.com',
  SUPPORT: 'support@aridinsights.com',
  PRIVACY: 'privacy@aridinsights.com',
  LEGAL: 'legal@aridinsights.com',
  FOUNDER: 'cortez@aridinsights.com'
};

export const HOW_IT_WORKS_STEPS: StepItem[] = [
  {
    number: 1,
    title: "Collect and Structure",
    description: "We analyze each district’s rules, deadlines, required forms, and workflow dependencies. Everything is standardized into a single structured framework."
  },
  {
    number: 2,
    title: "Automate the Heavy Lifting",
    description: "WellFlow automates the tasks that slow consultants down: reminders, required documentation, rule lookups, permit tracking, change-of-ownership workflows, and district-specific submissions."
  },
  {
    number: 3,
    title: "Reduce Risk with Clean Data",
    description: "Users get consistent data across districts. No switching formats, no digging through PDFs, and no second-guessing requirements."
  },
  {
    number: 4,
    title: "Deliver a Clear Path to Compliance",
    description: "Users follow one process. The platform handles district differences behind the scenes so teams can move faster with fewer surprises."
  },
  {
    number: 5,
    title: "Expand and Evolve",
    description: "As districts update rules or add notices, the platform evolves. The long-term roadmap includes broader multi-state coverage and deeper analytics."
  }
];