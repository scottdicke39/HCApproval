# System Architecture

## Overview

The HC Approval system integrates 4 core platforms to create a seamless headcount approval workflow:

1. **Slack/Glean** - User-facing submission interfaces
2. **Linear** - Workflow management and issue tracking
3. **Ashby** - ATS integration for recruiting data
4. **Railway** - Backend automation and webhooks

---

## High-Level Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    USER INTERFACES                          │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ┌──────────────┐   ┌──────────────┐   ┌──────────────┐  │
│  │ Slack Modal  │   │  Glean AI    │   │ CSV Upload   │  │
│  │ /request-    │   │  Agent       │   │ (Bulk)       │  │
│  │ headcount    │   │              │   │              │  │
│  └──────┬───────┘   └──────┬───────┘   └──────┬───────┘  │
│         │                  │                  │           │
└─────────┼──────────────────┼──────────────────┼───────────┘
          │                  │                  │
          ▼                  ▼                  ▼
┌─────────────────────────────────────────────────────────────┐
│                    BACKEND (Railway)                        │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  Node.js + TypeScript Backend                        │  │
│  │  - Slack Bolt (Socket Mode)                          │  │
│  │  - Express HTTP Server                               │  │
│  │  - Linear SDK                                        │  │
│  │  - Ashby API Client                                  │  │
│  └──────────────────────────────────────────────────────┘  │
│                                                             │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  Webhooks                                            │  │
│  │  - /webhooks/glean-agent                            │  │
│  │  - /webhooks/ashby                                  │  │
│  │  - /webhooks/linear                                 │  │
│  └──────────────────────────────────────────────────────┘  │
│                                                             │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  Automation                                          │  │
│  │  - Daily CSV Sync (2 AM PT)                         │  │
│  │  - Issue Description Builder                        │  │
│  │  - Label Management                                 │  │
│  └──────────────────────────────────────────────────────┘  │
│                                                             │
└─────────────┬───────────────────────────────┬───────────────┘
              │                               │
              ▼                               ▼
┌───────────────────────────┐   ┌───────────────────────────┐
│      Linear               │   │      Ashby ATS            │
│  (System of Record)       │   │  (Recruiting Data)        │
├───────────────────────────┤   ├───────────────────────────┤
│                           │   │                           │
│  - Issues (HC Requests)   │   │  - Jobs                   │
│  - Workflow States        │   │  - Openings (P-codes)     │
│  - Labels                 │   │  - Candidates             │
│  - Projects               │   │  - Offers                 │
│  - Webhooks               │◀──┤  - Webhooks               │
│                           │   │                           │
└───────────────────────────┘   └───────────────────────────┘
```

---

## Data Flow

### **1. User Submits Request**

```
User Action (Slack/Glean/CSV)
    ↓
Backend Receives Submission
    ↓
Validate Required Fields
    ↓
Build Beautiful Issue Description
    ↓
Create Linear Issue
    ↓
Apply Labels (Department, Division)
    ↓
Route to Finance Project
    ↓
Send Slack Notification
```

### **2. Finance Review**

```
Finance Opens Linear Issue
    ↓
Reviews Budget & Comp Data
    ↓
Adds FIN ID & Allocated Budget
    ↓
Moves to "Approved to Hire"
    ↓
Slack Notification Sent
```

### **3. Recruiting Opens in Ashby**

```
Recruiting Creates Ashby Opening
    ↓
Copies P-code to Linear Issue
    ↓
Moves to "Opened in Workday/Ashby"
    ↓
Daily CSV Sync Updates Issue with:
    - Recruiter names
    - Date opened
    - Target close date
    - Days open (calculated)
```

### **4. Offer & Hire**

```
Offer Created in Ashby
    ↓
Ashby Webhook → Backend
    ↓
Move Linear Issue to "Pending Offer"
    ↓
Add Candidate Name
    ↓
Slack Notification

Candidate Accepts
    ↓
Ashby Webhook → Backend
    ↓
Move Linear Issue to "Hired"
    ↓
Add Start Date
    ↓
Slack Notification
```

---

## Components

### **Backend (Node.js + TypeScript)**

**File Structure:**
```
server/
├── index.ts                          # Main entry point, Slack app
├── ashby/
│   └── webhook.ts                    # Ashby webhook handler
├── glean/
│   └── webhook.ts                    # Glean AI webhook handler
├── linear/
│   ├── state-change-notifications.ts # Slack notifications
│   └── auto-fix.ts                   # Issue formatting
├── slack/
│   └── file-upload-handler.ts        # CSV processing
├── utils/
│   ├── issue-description-builder.ts  # Format builder
│   ├── csv-bulk-upload.ts            # CSV validator
│   └── linear-error-handler.ts       # Retry logic
└── cron/
    └── daily-sync.ts                 # Scheduled jobs
```

### **Slack Integration**

**Features:**
- Socket Mode (no public webhook needed)
- Slash command: `/request-headcount`
- Interactive modal with validation
- File upload listener for CSV import
- Notification messages

**Key APIs:**
- `app.command('/request-headcount')` - Modal trigger
- `app.view('headcount_request_modal')` - Submission handler
- `app.event('file_shared')` - CSV upload detection

### **Glean AI Integration**

**Features:**
- Conversational submission flow
- Branch logic (submission vs. questions vs. recruiting)
- Webhook action with OpenAPI 3.0 spec
- Same validation as Slack

**Workflow:**
```
User: "I need to submit a headcount request"
    ↓
Glean: "Great! Are you the hiring manager?"
    ↓
User: "Yes"
    ↓
Glean: "What's the job title?"
    ↓
... (continues through all fields)
    ↓
Glean: "Review and confirm?"
    ↓
User: "Submit"
    ↓
Webhook POST to /webhooks/glean-agent
    ↓
Linear Issue Created
```

### **Linear Integration**

**Features:**
- Issue creation with beautiful formatting
- State management (9 workflow states)
- Label management (department, division, FIN ID, recruiter)
- Project routing (auto-assign to finance approver)
- Webhooks for state changes

**Workflow States:**
1. Triage
2. Queued for Finance
3. Todo
4. Finance Review
5. Approved to Hire
6. Opened in Workday/Ashby
7. Pending Offer
8. Hired
9. Closed/Rejected

### **Ashby Integration**

**Features:**
- Daily CSV export (2 AM PT)
- Real-time webhooks (offer created, candidate hired)
- P-code mapping (Opening ID)
- Recruiter/coordinator assignment

**CSV Sync Process:**
```
2 AM PT: Ashby emails/Slacks CSV
    ↓
Bot detects file upload
    ↓
Parse CSV (P-codes only, ignore M-codes)
    ↓
Match to Linear issues (by P-code or title)
    ↓
Update descriptions with beautiful format
    ↓
Add recruiter labels
    ↓
Post summary to Slack
```

---

## Automation Features

### **Beautiful Issue Formatting**

Every HC Approval issue uses a standardized, professional format:

```markdown
# 🎟️ HEADCOUNT REQUEST SUMMARY
─────────────────────────────
**Role:** Senior Software Engineer
**Hiring Manager:** Jane Smith
**Department:** Engineering
**Level:** L5 IC
**Location:** Remote

---

## 💰 Finance & Compensation Review
[Comp ranges, FIN ID, budget]

## 🎯 RECRUITING STATUS
[Auto-updated from Ashby CSV]

## 📋 REQUEST CONTEXT
[Backfill/Net New details]

## 📝 JOB DESCRIPTION
[Problem statement]

## 👥 STAKEHOLDERS
[Table with hiring manager, finance, HRBP]

## ⏱️ TIMELINE
[Stage history]

## ✅ HIRE DETAILS
[Candidate name, start date when hired]

## 🗒️ ADDITIONAL NOTES
[Manual updates]
```

**Implementation:** `server/utils/issue-description-builder.ts`

### **Label Management**

**Auto-applied labels:**
- `Department-{Name}` - From submission
- `Division-HAI` / `Division-Core` - From submission
- `FIN-ID-Yes` / `FIN-ID-No` - After Finance review
- `Recruiter-{Name}` - From Ashby CSV
- `Coordinator-{Name}` - From Ashby CSV

### **Project Routing**

**Logic:**
```typescript
if (department includes 'Engineering' or 'Product') {
  assign to Sander French's project
} else if (department includes 'Handshake AI') {
  assign to Quinn Thomas's project
} else if (department includes 'General & Administrative') {
  assign to Patricia Flores's project
}
```

### **Notifications**

**Slack notifications sent for:**
- Finance review requested
- Approved to hire
- Opened in Ashby
- Offer extended
- Candidate hired

**Format:**
```
🎉 Headcount Request Approved!

Role: Senior Software Engineer
Hiring Manager: @jane.smith
Finance: @sander.french

Next: Recruiting will open in Ashby

View in Linear: [link]
```

---

## API Specifications

### **Glean AI Webhook**

**Endpoint:** `POST /webhooks/glean-agent`

**Request Body:**
```json
{
  "userEmail": "user@example.com",
  "userName": "John Doe",
  "department": "Engineering",
  "division": "Core",
  "roleTitle": "Senior Software Engineer",
  "quantity": 1,
  "level": "L5",
  "icOrManager": "IC",
  "location": "Remote (US)",
  "employmentType": "FTE",
  "reasonForRequest": "Net New",
  "priority": "High",
  "compLocation": "sf",
  "jobDescription": "Build scalable backend systems..."
}
```

**Response:**
```json
{
  "success": true,
  "issueId": "issue-uuid",
  "issueUrl": "https://linear.app/company/issue/HEA-123",
  "issueIdentifier": "HEA-123"
}
```

### **Ashby Webhook**

**Endpoint:** `POST /webhooks/ashby`

**Events:**
- `offerCreate` - Offer extended to candidate
- `candidateHire` - Candidate accepted offer

**Request Headers:**
```
X-Ashby-Signature: sha256-hash
Content-Type: application/json
```

---

## Deployment

### **Railway Configuration**

**Auto-deploy on push to `main`**

**Build Command:**
```bash
npm install && npm run build
```

**Start Command:**
```bash
npm start
```

**Environment Variables:** See [SETUP.md](SETUP.md)

---

## Security

### **API Key Management**
- All keys stored in environment variables
- Never committed to git
- Rotated quarterly

### **Webhook Verification**
- Ashby: HMAC signature validation
- Glean: Bearer token authentication
- Linear: API key in headers

### **Data Privacy**
- No PII stored in logs
- Compensation data restricted to Finance
- Confidential role flag supported

---

## Monitoring

### **Health Checks**
- `GET /health` - Returns 200 OK if healthy

### **Logs**
- Railway logs all requests
- Error tracking with stack traces
- Performance metrics

### **Metrics to Track**
- Submission success rate
- Webhook delivery success
- CSV sync completion
- Average approval time

---

## Scalability

**Current Limits:**
- 200 Linear issues per query (paginated if needed)
- 100 CSV rows per import
- Unlimited Slack/Glean submissions

**Future Optimizations:**
- Redis caching for Linear queries
- Queue-based webhook processing
- Horizontal scaling on Railway

---

## Error Handling

### **Retry Logic**
- Linear API: 3 retries with exponential backoff
- Ashby API: 2 retries with 1s delay
- Slack API: Built-in retry in Bolt

### **Graceful Degradation**
- If Linear is down: Queue submissions
- If Ashby is down: Continue with manual sync
- If Slack is down: Store notifications for retry

---

**See also:**
- [SETUP.md](SETUP.md) - Deployment guide
- [WORKFLOW.md](WORKFLOW.md) - HC approval process
- [API.md](API.md) - Complete API reference

