# System Architecture

## Overview

The HC Approval system integrates multiple platforms to create a seamless headcount approval workflow:

1. **Slack/Glean** - User-facing submission interfaces
2. **Linear** - Workflow management and issue tracking
3. **Ashby** - ATS integration for recruiting data
4. **Railway** - Backend automation and webhooks

---

## Data Flow

### Request Creation Flow

```
User submits via:
  ├─ Slack (/request-headcount)
  ├─ Glean AI Agent (conversational)
  └─ CSV Bulk Upload
         │
         ▼
  Server processes request
         │
         ├─ Validates fields
         ├─ Builds issue description
         └─ Creates Linear issue
         │
         ▼
  Linear Webhook fires
         │
         ├─ Auto-fix formatting
         ├─ Auto-assign Finance BP
         ├─ Auto-label (dept, location, etc.)
         └─ Auto-subscribe stakeholders
         │
         ▼
  Slack notification sent
```

### Approval Flow

```
Finance reviews in Linear
         │
         ▼
  Moves to "Approved" state
         │
         ▼
  Linear Webhook fires
         │
         ├─ Updates timeline tracking
         └─ Sends Slack notification
         │
         ▼
  Recruiting opens in Ashby
         │
         ▼
  Ashby Webhook fires
         │
         ├─ Updates Linear with P-code
         ├─ Adds recruiter/coordinator
         ├─ Creates labels
         └─ Moves to "Opened in Ashby"
```

### Daily Sync Flow

```
Ashby exports CSV (2 AM PT)
         │
         ▼
  CSV uploaded to Slack
         │
         ▼
  Server processes CSV
         │
         ├─ Matches by P-code
         ├─ Updates Linear issues
         ├─ Updates recruiting status
         └─ Upgrades old format issues
```

---

## Components

### 1. Slack Bot (`server/slack-app.ts`)

**Purpose:** User interface and notifications

**Features:**
- Slash commands (`/request-headcount`)
- Interactive modals
- File upload handling (CSV)
- Notifications at every stage

**Technology:**
- Slack Bolt.js framework
- Socket Mode for development
- Web API for production

---

### 2. Linear Integration (`server/linear/`)

**Purpose:** Issue tracking and workflow management

**Components:**
- `client.ts` - Linear API client
- `auto-fix.ts` - Auto-fix issue descriptions
- `smart-automation.ts` - Auto-assignment, labeling
- `config.ts` - Configuration and constants

**Features:**
- Issue creation with beautiful formatting
- Webhook handling for automation
- State management
- Project assignment
- Label management

---

### 3. Ashby Integration (`server/ashby/`)

**Purpose:** ATS sync and recruiter assignment

**Components:**
- `client.ts` - Ashby API client
- `webhook.ts` - Webhook handler

**Features:**
- Opening creation events
- Candidate hire events
- P-code/M-code tracking
- Recruiter/coordinator assignment

---

### 4. Glean AI Agent (`server/glean/`)

**Purpose:** Conversational submission interface

**Components:**
- `webhook.ts` - Webhook handler
- `interactive-intake-webhook.ts` - Interactive intake

**Features:**
- Intent detection
- Conversational field collection
- Real-time validation
- Knowledge base integration

---

### 5. Issue Description Builder (`server/utils/issue-description-builder.ts`)

**Purpose:** Centralized issue formatting

**Features:**
- Beautiful, professional layout
- Consistent across all entry points
- Auto-updating sections
- Timeline tracking

**Key Functions:**
- `buildIssueDescription()` - Creates full description
- `buildIssueTitle()` - Creates consistent title
- `formatDate()` - Human-readable dates

---

### 6. CSV Processor (`scripts/import-ashby-csv.ts`)

**Purpose:** Daily sync from Ashby

**Features:**
- CSV parsing and validation
- P-code matching
- Issue updates
- Format upgrades

---

## Automation Rules

### Auto-Assignment

**Finance BP Assignment:**
- Triggered on issue creation
- Only if issue is unassigned
- Based on department mapping

**Recruiting Manager Assignment:**
- Triggered when moved to "Opened in Ashby"
- Based on department (Tech vs GTM)

### Auto-Labeling

**Labels Applied:**
- Employment Type (FTE/Contractor)
- Department
- Location
- Priority
- Recruiter (when assigned)
- Coordinator (when assigned)

### Auto-Subscription

**Always Subscribed:**
- Rec Ops (Erica, Callista)
- Finance BP (from form)
- HRBP (from form)
- Strategy/CoS (for HAI, from form)

---

## Security

### Authentication
- **Slack:** Bot token + signing secret
- **Linear:** API key + webhook secret (HMAC)
- **Ashby:** API key + webhook secret
- **Glean:** Webhook endpoint (no auth required, validate payload)

### Data Protection
- All secrets in environment variables
- Webhook signature verification
- No sensitive data in logs
- Sanitized example code

---

## Scalability

### Current Scale
- ~150 headcount requests/year
- ~10 Finance reviewers
- <1 second response time

### Bottlenecks
- Linear API: 1000 requests/hour
- Slack API: 50 requests/minute
- Webhook processing: Serial for Linear, async for Slack

### Optimization Strategies
- Caching: Linear user IDs, team IDs
- Batching: Slack notifications if >10 subscribers
- Queueing: Bull/BullMQ for webhook processing (if needed)

---

## Deployment

### Railway (Recommended)
- Automatic deploys on git push
- Environment variables via dashboard
- Custom domains supported
- Logs available in dashboard

### Self-Hosted
```bash
npm run build
NODE_ENV=production PORT=3000 node dist/server/index.js
```

### Docker
```bash
docker build -t hc-approval .
docker run -p 3000:3000 --env-file .env hc-approval
```

---

## Monitoring

### Logs
- Railway logs (stdout)
- Linear webhook logs
- Slack command logs

### Alerts
- Railway deployment failures
- Webhook authentication failures
- API rate limit warnings

### Metrics
- Request volume (Slack commands)
- Approval time (Linear state changes)
- Integration health (Ashby sync success rate)

---

## Future Enhancements

1. **Zapier Integration** - Daily audit for missing data
2. **Pave API** - Auto-fill comp ranges
3. **Sub-issues** - Link multiple roles to same initiative
4. **Analytics Dashboard** - Time-to-fill, approvals by division
5. **AI Suggestions** - Recommend level/comp based on job description
