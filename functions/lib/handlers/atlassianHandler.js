"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleAtlassianSync = handleAtlassianSync;
const logger = require("firebase-functions/logger");
const params_1 = require("firebase-functions/params");
const atlassianApiToken = (0, params_1.defineSecret)("ATLASSIAN_API_TOKEN");
// Domain and Email are not strictly secrets, but good to parameterize. 
// Using process.env for config-like values or defineString if widely available.
// For now, assume these are set in environment configuration.
const DOMAIN = process.env.ATLASSIAN_DOMAIN;
const EMAIL = process.env.ATLASSIAN_EMAIL;
const PROJECT_KEY = process.env.ATLASSIAN_PROJECT_KEY || "AC";
function getAuthHeader() {
    const token = atlassianApiToken.value();
    if (!EMAIL || !token) {
        throw new Error("Missing Atlassian credentials (EMAIL or API TOKEN secret)");
    }
    const str = `${EMAIL}:${token}`;
    return `Basic ${Buffer.from(str).toString('base64')}`;
}
async function updateConfluencePage(pageId, title, contentMarkdown) {
    var _a;
    if (!DOMAIN)
        throw new Error("Missing ATLASSIAN_DOMAIN");
    const url = `https://${DOMAIN}/wiki/api/v2/pages/${pageId}`;
    // Very basic Markdown -> Storage Format conversion (MVP)
    // In production, use an ADF builder or proper converter
    // For now, wrapping in paragraph
    const bodyStorage = `<p>${contentMarkdown.replace(/\n/g, '<br/>')}</p>`;
    const body = {
        id: pageId,
        status: 'current',
        title: title,
        body: {
            representation: 'storage', // or 'atlas_doc_format' if we had ADF
            value: bodyStorage
        },
        version: {
            number: 2, // Ideally fetch current version + 1
            message: 'Auto-synced by Arid Insights Secretariat'
        }
    };
    // First get current version to increment
    const getRes = await fetch(url, {
        headers: { 'Authorization': getAuthHeader() }
    });
    if (!getRes.ok)
        throw new Error(`Failed to fetch page ${pageId}: ${await getRes.text()}`);
    const currentData = await getRes.json();
    body.version.number = (((_a = currentData.version) === null || _a === void 0 ? void 0 : _a.number) || 1) + 1;
    body.title = currentData.title; // Keep existing title if not updating
    const res = await fetch(url, {
        method: 'PUT',
        headers: {
            'Authorization': getAuthHeader(),
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    });
    if (!res.ok) {
        throw new Error(`Confluence Update Failed: ${res.status} ${await res.text()}`);
    }
    logger.info(`Confluence Page ${pageId} updated.`);
    return await res.json();
}
async function createJiraIssue(summary, description, issueType = 'Task') {
    if (!DOMAIN)
        throw new Error("Missing ATLASSIAN_DOMAIN");
    const url = `https://${DOMAIN}/rest/api/3/issue`;
    const body = {
        fields: {
            project: {
                key: PROJECT_KEY
            },
            summary: summary,
            description: {
                type: 'doc',
                version: 1,
                content: [
                    {
                        type: 'paragraph',
                        content: [
                            {
                                type: 'text',
                                text: description
                            }
                        ]
                    }
                ]
            },
            issuetype: {
                name: issueType
            }
        }
    };
    const res = await fetch(url, {
        method: 'POST',
        headers: {
            'Authorization': getAuthHeader(),
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    });
    if (!res.ok) {
        throw new Error(`Jira Create Failed: ${res.status} ${await res.text()}`);
    }
    const data = await res.json();
    logger.info(`Jira Issue Created: ${data.key}`);
    return data;
}
async function handleAtlassianSync(db, jobId, jobData) {
    logger.info(`Handling Atlassian Sync Job ${jobId}`);
    const { syncTarget, pageId, content, issueData } = jobData;
    if (syncTarget === 'CONFLUENCE' || syncTarget === 'ALL') {
        if (pageId && content) {
            await updateConfluencePage(pageId, "Synced Page", content);
        }
        else {
            logger.warn("Skipping Confluence sync: missing pageId or content");
        }
    }
    if (syncTarget === 'JIRA' || syncTarget === 'ALL') {
        if (issueData) {
            await createJiraIssue(issueData.summary, issueData.description, issueData.issueType);
        }
        else if (content) {
            // Fallback: create a task about the sync
            await createJiraIssue("Automated Sync Log", `Sync content length: ${content.length}`);
        }
    }
    return "Atlassian Sync Completed";
}
//# sourceMappingURL=atlassianHandler.js.map