# Linear Issue Format

## Overview

Every HC Approval request creates a beautiful, professional Linear issue with a standardized format.

This format ensures:
- ✅ **Scannability** - Easy to find key information
- ✅ **Consistency** - All issues look the same
- ✅ **Completeness** - No missing data
- ✅ **Professional** - Polished appearance

---

## Complete Example

Here's a full example of an HC Approval Linear issue (with fake data):

```markdown
# 🎟️ HEADCOUNT REQUEST SUMMARY
─────────────────────────────
**Role:** Senior Software Engineer
**Hiring Manager:** Jane Smith
**Department:** Engineering
**Division:** Core
**Level:** L5 IC
**Location:** Remote (US)
**Employment:** FTE
**Priority:** High

---

**Submitted by:** John Doe <john.doe@example.com>
**Submitted on:** October 23, 2025, 2:30 PM PDT

---

## 💰 Finance & Compensation Review

**👉 Rec Ops (Callista/Erica):** Add Pave comp range first
- **Comp Range - Low:** _[Enter low range, e.g., 150000]_
- **Comp Range - Mid:** _[Enter mid range, e.g., 175000]_
- **Comp Range - High:** _[Enter high range, e.g., 200000]_
- **Base Pay Benchmark (from Pave):** _[Enter Pave market rate, e.g., 165000]_

**👉 Finance (@sander.french):** Review comp range, assign FIN ID, and set allocated budget
- **FIN ID:** _[Finance: Enter FIN ID here, e.g., FY25-ENG-045]_
- **Allocated Budget (Total):** _[Finance: Enter total budget including salary, sign-on, immigration, relocation, etc., e.g., $225,000]_

_Note: FIN ID and budget allocation are required before position can be opened in Ashby._

---

## 🎯 RECRUITING STATUS
─────────────────────────────

**Current Stage:** Awaiting Approval ⏳

_This section will be auto-updated when the position is opened in Ashby with:_
- Opening ID (P-code)
- Recruiter assignment
- Date opened
- Target close date
- Days open (auto-calculated)
- Direct Ashby link

---

## 📋 REQUEST CONTEXT
─────────────────────────────

### Reason for Request
**Type:** Net New

### Net New Details
- **In Headcount Plan:** Yes
- **Requested by Executive:** Sarah Johnson (VP Engineering)
- **Area/Coverage:** Backend infrastructure team
- **Reason for Opening:** Current team is at capacity with 150% sprint velocity. Need additional senior engineer to lead new microservices architecture initiative for Q1 2026.

### Compensation Details
- **Comp Location:** SF (Zone 1)

---

## 📝 JOB DESCRIPTION / PROBLEM STATEMENT
─────────────────────────────────

We need a Senior Software Engineer to lead our microservices migration initiative. This role will:

- Design and implement scalable microservices architecture
- Lead technical discussions with engineering team (8 engineers)
- Own backend infrastructure roadmap for Q1-Q2 2026
- Mentor 2-3 mid-level engineers
- Work with DevOps team on deployment automation

**Key Requirements:**
- 5+ years backend engineering experience
- Strong microservices and distributed systems knowledge
- Experience with Kubernetes, Docker, AWS
- Python and/or Go proficiency
- Track record of leading technical initiatives

**Impact:** This role unlocks our ability to scale to 10M users (currently at 2M). Without this hire, we'll bottleneck at current architecture and miss Q2 product launches.

---

## 👥 STAKEHOLDERS
─────────────────────────────

| Role | Name |
|------|------|
| **Hiring Manager** | Jane Smith |
| **Finance Partner** | @sander.french |
| **HRBP** | @elise.capadonna |
| **Strategy/CoS** | @hans.bjornavold |

---

## ⏱️ TIMELINE
─────────────────────────────

**📅 Submitted:** October 23, 2025, 2:30 PM PDT

**Stage History:**
- October 23, 2025, 2:30 PM — Submitted

_Stage transitions are automatically logged below as the request moves through approval._

---

## ✅ HIRE DETAILS
─────────────────────────────

_This section will be filled in when a candidate is hired:_
- **Candidate Name:** _[Recruiter: Add name when hired]_
- **Start Date:** _[Recruiter: Add start date]_
- **Final Title:** _Senior Software Engineer_

---

## 🗒️ ADDITIONAL NOTES
─────────────────────────────

_Space for manual notes, updates, or special instructions..._
```

---

## After Ashby Sync (Auto-Updated)

Once the role is opened in Ashby and the daily CSV sync runs, the **Recruiting Status** section updates automatically:

```markdown
## 🎯 RECRUITING STATUS
─────────────────────────────

| Field | Value |
|-------|-------|
| **📌 Opening ID** | `P101853` |
| **👤 Recruiter** | Doran Ingalls, Luke Losin |
| **📅 Date Opened** | October 25, 2025 |
| **🎯 Target Close Date** | December 15, 2025 |
| **⏱️ Days Open** | 13 days |
| **🔗 Ashby Link** | [View Requisition](https://app.ashbyhq.com/admin/requisitions/P101853) |

> **Current Stage:** Active Recruiting 🔵
```

And the **Timeline** section updates:

```markdown
## ⏱️ TIMELINE
─────────────────────────────

**📅 Submitted:** October 23, 2025, 2:30 PM PDT

**Stage History:**
- October 23, 2025, 2:30 PM — Submitted
- October 24, 2025, 10:15 AM — Finance Review
- October 24, 2025, 3:45 PM — Approved to Hire
- October 25, 2025, 9:00 AM — Opened in Ashby

_Stage transitions are automatically logged by the system._
```

---

## After Offer Extended (Auto-Updated)

When an offer is extended in Ashby, the **Hire Details** section updates:

```markdown
## ✅ HIRE DETAILS
─────────────────────────────

- **Candidate Name:** Alex Rodriguez
- **Offer Extended:** November 15, 2025
- **Start Date:** _[Pending acceptance]_
- **Final Title:** Senior Software Engineer
```

---

## After Candidate Hired (Auto-Updated)

When the candidate accepts and is hired:

```markdown
## ✅ HIRE DETAILS
─────────────────────────────

- **Candidate Name:** Alex Rodriguez
- **Offer Extended:** November 15, 2025
- **Offer Accepted:** November 18, 2025
- **Start Date:** December 2, 2025
- **Final Title:** Senior Software Engineer

🎉 **Candidate hired successfully!**
```

---

## Section Breakdown

### **🎟️ Headcount Request Summary**
- Quick overview of key details
- Always at the top
- Most important fields for at-a-glance understanding

### **💰 Finance & Compensation Review**
- Finance team's workspace
- Comp ranges from Pave
- FIN ID and budget allocation
- Required before approval

### **🎯 Recruiting Status**
- Auto-updated from Ashby CSV sync
- Shows recruiter, P-code, dates
- Direct link to Ashby
- Auto-calculates days open

### **📋 Request Context**
- Why this role is needed (Backfill vs. Net New)
- Detailed justification
- Business impact
- Risk if not filled

### **📝 Job Description**
- Problem statement
- Key responsibilities
- Requirements
- Impact on business

### **👥 Stakeholders**
- Who's involved
- Finance partner, HRBP, Strategy
- Table format for easy scanning

### **⏱️ Timeline**
- When submitted
- Stage history (auto-logged)
- Shows progression through workflow

### **✅ Hire Details**
- Candidate name (when hired)
- Start date
- Final title
- Auto-updated from Ashby webhooks

### **🗒️ Additional Notes**
- Manual updates
- Special instructions
- Not auto-overwritten

---

## Format Builder Implementation

The format is generated by `server/utils/issue-description-builder.ts`:

```typescript
export function buildIssueDescription(params: IssueDescriptionParams): string {
  // Build header summary
  // Build finance section
  // Build recruiting status (placeholder)
  // Build request context
  // Build job description
  // Build stakeholders table
  // Build timeline
  // Build hire details
  // Build additional notes
  
  return description;
}
```

**Key features:**
- Centralized formatting logic
- Consistent across all submission methods (Slack, Glean, CSV)
- Easy to maintain and update
- Supports all HC Approval fields

---

## Benefits

### **For Hiring Managers:**
- ✅ Easy to read and understand
- ✅ Clear action items
- ✅ Professional appearance
- ✅ Timeline tracking visible

### **For Finance:**
- ✅ Clear finance review section
- ✅ Comp range fields organized
- ✅ Budget allocation prominent
- ✅ FIN ID clearly marked

### **For Recruiting:**
- ✅ Recruiting status auto-updates
- ✅ Recruiter visible
- ✅ Days open auto-calculated
- ✅ Direct Ashby link
- ✅ Candidate details when hired

### **For Everyone:**
- ✅ Consistent format across all requests
- ✅ Scannable with clear sections
- ✅ Professional and polished
- ✅ Auto-updated with real-time data

---

**See also:**
- [ARCHITECTURE.md](ARCHITECTURE.md) - System design
- [WORKFLOW.md](WORKFLOW.md) - HC approval process
- Example implementation in `/examples` folder

