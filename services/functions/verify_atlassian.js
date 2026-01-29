
const fs = require('fs');
const path = require('path');

// Load .env manually
const envPath = path.join(__dirname, '.env');
if (fs.existsSync(envPath)) {
    console.log("Loading .env file...");
    const envContent = fs.readFileSync(envPath, 'utf8');
    envContent.split('\n').forEach(line => {
        const [key, value] = line.split('=');
        if (key && value) {
            process.env[key.trim()] = value.trim();
        }
    });
}

const DOMAIN = process.env.ATLASSIAN_DOMAIN;
const EMAIL = process.env.ATLASSIAN_EMAIL;
const API_TOKEN = process.env.ATLASSIAN_API_TOKEN;
const PROJECT_KEY = process.env.ATLASSIAN_PROJECT_KEY || "AC";

function getAuthHeader() {
    if (!EMAIL || !API_TOKEN) {
        console.error("Missing credentials.");
        return "";
    }
    // Trim to ensure no whitespace issues
    const safeEmail = EMAIL.trim();
    const safeToken = API_TOKEN.trim();

    console.log(`Authenticating as: ${safeEmail}`);
    console.log(`Token length: ${safeToken.length}`);

    const str = `${safeEmail}:${safeToken}`;
    return `Basic ${Buffer.from(str).toString('base64')}`;
}

async function verifyJira() {
    console.log(`Connecting to https://${DOMAIN}...`);
    const url = `https://${DOMAIN}/rest/api/3/myself`;
    try {
        const res = await fetch(url, {
            headers: {
                'Authorization': getAuthHeader(),
                'Accept': 'application/json'
            }
        });

        console.log(`Status: ${res.status} ${res.statusText}`);

        if (res.ok) {
            const data = await res.json();
            console.log("SUCCESS! Authenticated as:", data.displayName);
        } else {
            console.error("FAILED. Response body:", await res.text());
        }
    } catch (e) {
        console.error("Network/Script Error:", e);
    }
}

verifyJira();
