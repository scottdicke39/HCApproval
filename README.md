# 🎯 HC Approval System

**A comprehensive, automated headcount approval workflow system**

Integrates Slack, Linear, Ashby, Glean AI, and Notion to streamline the entire hiring lifecycle from initial request through hire.

---

## 🌟 Key Features

### **Multiple Submission Methods**
- ✅ **Slack Commands** - Interactive `/request-headcount` modal
- ✅ **Glean AI Agent** - Conversational submissions via chat
- ✅ **CSV Bulk Upload** - Import multiple requests at once
- ✅ **Notion Forms** - Web-based form submissions
- All methods route identically with same field validation and consistent Linear issue format

### **Automated Workflows**
- ✅ **Auto-assignment** - Finance BPs auto-assigned based on department
- ✅ **Auto-subscription** - Stakeholders (HRBP, Rec Ops, Strategy/CoS) auto-subscribed
- ✅ **Auto-labeling** - Employment type, department, location, priority labels
- ✅ **Timeline tracking** - Automatic stage history and time-in-stage tracking
- ✅ **Smart re-assignment** - Recruiting Managers assigned when opened in ATS
- ✅ **Auto-fix formatting** - Standardizes issue descriptions and adds missing sections

### **Beautiful Linear Format**
- ✅ **Professional issue layout** - Scannable, organized sections
- ✅ **Auto-updating sections** - Recruiting status syncs from Ashby
- ✅ **Visual hierarchy** - Clear separators, emojis, tables
- ✅ **Stakeholder visibility** - Finance, HRBP, Recruiting clearly identified

### **Integrations**
- ✅ **Slack** - Interactive modals, notifications, commands
- ✅ **Linear** - Issue tracking, webhooks, automation
- ✅ **Ashby** - ATS sync, recruiter/coordinator labeling, P-code/M-code tracking
- ✅ **Glean AI** - Conversational AI agent for submissions and questions
- ✅ **Notion** - Knowledge base sync, capacity tracking
- ✅ **Pinecone** - Compensation data auto-fill (optional)

### **Advanced Features**
- ✅ **Capacity Tracker** - Month-over-month headcount planning
- ✅ **Compensation Auto-fill** - Pave data integration via Pinecone
- ✅ **Executive Projects** - Division-based project organization
- ✅ **Channel-based Routing** - Auto-routing based on Slack channel
- ✅ **Confidential Requests** - Secure handling for sensitive roles
- ✅ **Weekly Active Jobs** - Automated posting to #hiring channels

---

## 🏗️ Architecture

```
┌─────────────────┐
│  Slack User     │
│  /request-hc    │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  Slack Bot      │
│  (Bolt.js)      │
└────────┬────────┘
         │
         ▼
┌─────────────────┐       ┌──────────────┐
│  Linear API     │◄─────►│  Webhooks    │
│  (Issue Mgmt)   │       │  Auto-fix    │
└────────┬────────┘       │  Auto-label  │
         │                └──────────────┘
         ▼
┌─────────────────┐
│  Ashby API      │
│  (ATS Sync)     │
└─────────────────┘
```

**Key Principles:**
- **Linear as Source of Truth** - All request data lives in Linear issues
- **Event-Driven Architecture** - Webhooks trigger automated actions
- **Smart Automation** - Business rules drive auto-assignment and labeling

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- Slack workspace with admin access
- Linear workspace
- Ashby account (optional, for ATS integration)
- Glean workspace (optional, for AI agent)

### Installation

1. **Clone the repo**
   ```bash
   git clone https://github.com/scottdicke39/HCApproval.git
   cd HCApproval
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   ```bash
   cp env.example .env
   # Edit .env with your actual values
   ```

4. **Set up Slack App**
   - Create new Slack app at https://api.slack.com/apps
   - Enable Socket Mode
   - Add bot scopes: `chat:write`, `commands`, `users:read`, `channels:read`, `files:read`
   - Create slash command: `/request-headcount`
   - Install app to workspace

5. **Set up Linear**
   - Create team for headcount approvals
   - Get API key from Settings → API
   - Create webhook pointing to your server
   - Set up workflow states (see `docs/setup/LINEAR-STATES-SETUP.md`)

6. **Build and run**
   ```bash
   npm run build
   npm start
   ```

---

## 📚 Documentation

### Setup & Configuration
- [Railway Deployment](docs/setup/RAILWAY-DEPLOYMENT.md)
- [Linear Setup](docs/setup/LINEAR-CUSTOM-FIELDS-SETUP.md)
- [Linear States Setup](docs/setup/LINEAR-STATES-SETUP.md)
- [Linear Webhooks](docs/setup/LINEAR-WEBHOOK-SETUP.md)
- [Ashby Webhooks](docs/setup/ASHBY-WEBHOOK-SETUP.md)
- [Glean AI Agent Setup](docs/GLEAN-AI-AGENT-SETUP.md)
- [Security Hardening](docs/setup/SECURITY-HARDENING.md)

### User Guides
- [CSV Bulk Upload Guide](docs/guides/CSV-BULK-UPLOAD.md)
- [Confidential Workflow](docs/guides/CONFIDENTIAL-WORKFLOW.md)
- [Linear Views Recommended](docs/guides/LINEAR-VIEWS-RECOMMENDED.md)
- [HAI Swap Workflow](docs/guides/HAI-SWAP-WORKFLOW.md)

### Technical Documentation
- [Architecture Overview](docs/technical/ARCHITECTURE.md)
- [Glean Agent Workflow](docs/GLEAN-AGENT-WORKFLOW.md)
- [Beautiful Format Rollout](docs/NEW-FORMAT-ROLLOUT.md)
- [Ashby Integration](docs/technical/ASHBY-INTEGRATION.md)

---

## 🛠️ Tech Stack

- **Runtime**: Node.js 18+ with TypeScript
- **Framework**: Slack Bolt.js (Socket Mode)
- **APIs**: 
  - Linear SDK (`@linear/sdk`)
  - Ashby REST API
  - Slack Web API
  - Notion API (`@notionhq/client`)
  - Pinecone (optional, for comp data)
- **Deployment**: Railway, Render, or any Node.js host
- **Database**: None (stateless, uses Linear as source of truth)

---

## 📦 Project Structure

```
HCApproval/
├── server/
│   ├── index.ts                 # Main server and Slack commands
│   ├── slack-app.ts             # Slack bot initialization
│   ├── slack-commands.ts        # Slash command handlers
│   ├── linear/
│   │   ├── client.ts            # Linear API client
│   │   ├── auto-fix.ts         # Auto-fix formatting on webhooks
│   │   ├── smart-automation.ts  # Auto-labeling and assignment
│   │   └── config.ts           # Linear configuration
│   ├── ashby/
│   │   ├── client.ts           # Ashby API client
│   │   └── webhook.ts          # Ashby webhook handler
│   ├── glean/
│   │   ├── webhook.ts          # Glean AI agent webhook
│   │   └── interactive-intake-webhook.ts
│   ├── notion/
│   │   └── playbook-sync.ts    # Notion knowledge base sync
│   ├── utils/
│   │   ├── issue-description-builder.ts  # Beautiful format builder
│   │   ├── csv-bulk-upload.ts  # CSV processing
│   │   ├── compensation-auto-fill.ts     # Pave data integration
│   │   └── capacity-tracker.ts # Capacity planning
│   └── cron/
│       ├── daily-sync.ts       # Daily Ashby CSV sync
│       └── weekly-jobs-sync.ts # Weekly active jobs posting
├── scripts/
│   ├── import-ashby-csv.ts     # CSV import processor
│   └── sync-linear-to-notion.ts
├── docs/                       # Documentation
│   ├── setup/                  # Setup guides
│   ├── guides/                 # User guides
│   └── technical/              # Technical docs
├── examples/                   # Example code
├── .env.example                # Environment variable template
├── package.json
├── tsconfig.json
└── railway.json                # Railway deployment config
```

---

## 🔐 Security

- All API keys stored in environment variables
- Webhook signature verification for Linear and Ashby
- Slack signing secret validation
- No sensitive data committed to git
- Pinecone API keys secured (optional feature)

---

## 📊 Features in Detail

### Beautiful Linear Format

Every HC Approval request creates a professional, scannable Linear issue with:

- **Header Summary** - Role, hiring manager, department, level, location
- **Finance Section** - FINID, budget estimates, compensation ranges
- **Recruiting Status** - Auto-updates from Ashby (P-code, recruiter, dates)
- **Request Context** - Backfill vs Net New, justification
- **Stakeholders Table** - Finance, HRBP, Recruiting clearly identified
- **Timeline Tracking** - Automatic stage history logging
- **Hire Details** - Candidate name, start date (when hired)

See `docs/NEW-FORMAT-ROLLOUT.md` for full details.

### Glean AI Agent

Conversational interface for submitting headcount requests:

- **Intent Detection** - Automatically routes to submission vs. questions
- **Conversational Collection** - Natural language collection of all fields
- **Real-time Validation** - Validates levels, departments, divisions
- **Knowledge Base** - Answers HC Approval and recruiting questions
- **Fully Integrated** - Creates Linear issues automatically

See `docs/GLEAN-AGENT-WORKFLOW.md` for workflow details.

### CSV Bulk Upload

Import multiple headcount requests at once:

- **Template-based** - Use provided CSV template
- **Validation** - Checks all required fields
- **Batch Processing** - Creates multiple Linear issues efficiently
- **Error Handling** - Reports any issues with specific rows

See `docs/guides/CSV-BULK-UPLOAD.md` for usage.

### Capacity Tracker

Month-over-month headcount planning:

- **Executive Capacity** - Track executive team capacity
- **Position Capacity** - Track role-level capacity
- **Notion Integration** - Syncs to Notion databases
- **Waterfall Views** - Visual capacity planning

See `docs/CAPACITY-TRACKER-GUIDE.md` for setup.

---

## 🚀 Deployment

### Railway (Recommended)

1. Connect GitHub repo to Railway
2. Add environment variables (see `env.example`)
3. Railway auto-deploys on push to `main`

See `docs/setup/RAILWAY-DEPLOYMENT.md` for detailed instructions.

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

## 🤝 Contributing

Contributions welcome! This is a showcase project, but feel free to:

- Report issues
- Suggest improvements
- Submit PRs
- Fork for your own use

See `CONTRIBUTING.md` for guidelines.

---

## 📄 License

MIT License - Feel free to use this for your own company!

---

## 🙏 Credits

Built to streamline headcount approvals across a 500+ person organization.

**Key Achievements:**
- Reduced approval time from 4 weeks → 2 weeks
- Eliminated 90% of manual data entry
- Centralized headcount visibility for Finance and Executive teams
- Automated recruiter/coordinator assignment
- Real-time Slack notifications at every stage
- Beautiful, professional Linear issue formatting

---

## 📧 Contact

Questions? Reach out via [GitHub Issues](https://github.com/scottdicke39/HCApproval/issues).

---

**Last Updated:** December 2025  
**Version:** 2.0
