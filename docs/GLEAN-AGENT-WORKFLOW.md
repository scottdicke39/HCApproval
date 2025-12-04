# Glean AI Agent - Workflow Diagram

**Agent URL:** https://your-company.glean.com/chat/agents/YOUR_AGENT_ID

---

## Visual Workflow

```
                                    START
                                      ↓
                        ┌─────────────────────────────┐
                        │  0. 📨 Trigger              │
                        │                             │
                        │  Agent starts when user     │
                        │  sends a chat message       │
                        └─────────────────────────────┘
                                      ↓
                        ┌─────────────────────────────┐
                        │  1. 🔀 Branch               │
                        │                             │
                        │  Agent decides which        │
                        │  branch to follow           │
                        └─────────────────────────────┘
                                      ↓
                    ┌─────────────────┴─────────────────┐
                    ↓                                   ↓
    ┌───────────────────────────────┐   ┌───────────────────────────────┐
    │ Person would like to request  │   │ Person has questions about    │
    │ a backfill or net new role    │   │ HC Approval process           │
    └───────────────────────────────┘   └───────────────────────────────┘
                    ↓                                   ↓
    ┌───────────────────────────────┐   ┌───────────────────────────────┐
    │  2. 💬 Respond                │   │  3. 🔍 Company search         │
    │                               │   │                               │
    │  Agent Name: HC Approval      │   │  Search through confluence    │
    │  Request                      │   │  regarding HCApproval         │
    │  Type: Conversational         │   │  process. Be helpful and      │
    │  Workflow Assistant           │   │  provide clear guidance       │
    └───────────────────────────────┘   └───────────────────────────────┘
                    ↓
    ┌───────────────────────────────┐
    │  5. 🎫 Create Headcount       │
    │     Request                   │
    │                               │
    │  After collecting all         │
    │  required information from    │
    │  the user through             │
    │  conversation, create a       │
    │  Linear issue in the HC       │
    │  Approval workflow            │
    └───────────────────────────────┘
                    ↓
              Linear Issue
              Created ✅
```

---

## Workflow Breakdown

### **0. Trigger - Chat Message**
- **Event:** User sends a message to the agent
- **Examples:**
  - "I need to hire a Senior Engineer"
  - "How long does Finance review take?"
  - "Help me submit a headcount request"

---

### **1. Branch - Intent Detection**
Agent uses AI to classify the user's intent into one of three paths:

1. **HC Approval Request** (left path)
2. **HC Approval Questions** (middle path)  
3. **General Recruiting Questions** (right path - fallback)

---

## Branch 1: HC Approval Request (Conversational Workflow)

### **2. Respond - Conversational Collection**
**Agent Type:** HC Approval Request - Conversational Workflow Assistant

**What happens:**
- Agent starts a conversation to collect all required fields
- Asks questions one at a time
- Validates responses in real-time
- Provides guidance and examples
- Remembers context throughout conversation

**Example conversation flow:**
```
Agent: "I'll help you submit a headcount request. 
        Are you the hiring manager for this role?"

User: "Yes"

Agent: "Great! What's the job title?"

User: "Senior Software Engineer"

Agent: "Perfect. Which department?"

User: "Engineering"

... (continues through all required fields)
```

---

### **5. Create Headcount Request**
**Action:** 🎫 Create Headcount Request

**What happens:**
- After collecting all required information
- Agent calls webhook: `POST /webhooks/glean-agent`
- Creates Linear issue in Headcount Approvals team
- Applies appropriate labels (Department, Division, etc.)
- Routes to correct Finance project
- Triggers Slack notifications

**Output:**
```
✅ Success! Your headcount request has been submitted.

Linear Issue: HEA-123
Title: Senior Software Engineer
Status: Finance Review
URL: https://linear.app/your-workspace/issue/HEA-123

You'll receive Slack notifications as it progresses through:
- Finance Review (1-3 days)
- Approved to Hire
- Opened in Ashby
- Pending Offer
- Hired
```

---

## Key Features

### 🎯 **Smart Intent Detection**
- AI automatically routes to correct workflow
- No need for users to specify "I want to submit" vs. "I have a question"
- Context-aware throughout conversation

### 💬 **Conversational Experience**
- Feels natural, not like filling out a form
- Agent asks clarifying questions
- Provides examples and guidance inline
- Remembers previous answers

### ✅ **Real-time Validation**
- Checks levels (L2-L11, M3-M6)
- Validates departments against cost centers
- Ensures division is correct
- Confirms priority levels are appropriate

### 🔗 **Fully Integrated**
- Creates Linear issues automatically
- Triggers Slack notifications
- Connects to Confluence knowledge base
- Real-time workflow updates

---

## Setup

See `docs/GLEAN-AI-AGENT-SETUP.md` for detailed setup instructions.

---

**Last Updated:** December 2025  
**Agent Version:** 2.0
