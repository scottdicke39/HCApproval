# Linear States Setup Guide

## Overview

Linear states represent the stages of the headcount approval workflow. This guide explains how to set up and configure states in your Linear workspace.

---

## Required States

### Backlog States

**1. Queued for Finance Review**
- **Purpose:** Initial state when request is submitted
- **Description:** Request is waiting for Finance review
- **Assignee:** Finance BP (auto-assigned)

**2. In Review**
- **Purpose:** Finance is actively reviewing the request
- **Description:** Finance is evaluating budget and compensation
- **Assignee:** Finance BP

### Started States

**3. Approved**
- **Purpose:** Request has been approved by Finance
- **Description:** Ready to open in Ashby/Workday
- **Assignee:** Finance BP or Recruiting Ops

**4. Opened in Workday/Ashby**
- **Purpose:** Role has been opened in the ATS
- **Description:** Recruiting team has created the opening
- **Assignee:** Recruiting Manager (auto-assigned)

### Completed States

**5. Hired**
- **Purpose:** Candidate has been hired
- **Description:** Offer accepted, candidate starting
- **Assignee:** Recruiting Manager

**6. Closed - Canceled**
- **Purpose:** Request was withdrawn or canceled
- **Description:** No longer needed or duplicate
- **Assignee:** Original submitter or Finance

---

## Setup Steps

### 1. Create States in Linear

1. Go to your Linear workspace
2. Navigate to **Settings** → **Teams** → **Your Team**
3. Click **"Workflow"** tab
4. Click **"+ Add State"** for each required state

### 2. Configure State Properties

For each state, set:
- **Name:** Use exact names from list above
- **Type:** Backlog, Started, or Completed
- **Color:** Choose appropriate color
- **Description:** Add description (optional)

### 3. Get State IDs

1. After creating states, go to **Settings** → **API**
2. Use Linear API to query states:

```graphql
query {
  team(id: "your-team-id") {
    states {
      nodes {
        id
        name
        type
      }
    }
  }
}
```

Or use the Linear UI:
1. Click on a state in the workflow
2. Copy the ID from the URL or use browser dev tools

### 4. Add to Environment Variables

Add each state ID to your `.env` file:

```bash
LINEAR_STATE_IDS__QUEUED_FOR_REVIEW=state-id-here
LINEAR_STATE_IDS__IN_REVIEW=state-id-here
LINEAR_STATE_IDS__APPROVED=state-id-here
LINEAR_STATE_IDS__OPENED_IN_ASHBY=state-id-here
LINEAR_STATE_IDS__HIRED=state-id-here
LINEAR_STATE_IDS__WITHDRAWN=state-id-here
```

---

## State Transitions

### Normal Flow

```
Queued for Finance Review
    ↓
In Review
    ↓
Approved
    ↓
Opened in Workday/Ashby
    ↓
Hired (or Closed - Canceled)
```

### Auto-Transitions

The system automatically moves issues:
- **Approved → Opened in Ashby:** When Ashby webhook fires
- **Opened in Ashby → Hired:** When candidate hire webhook fires

### Manual Transitions

Finance and Recruiting teams manually move issues:
- **Queued → In Review:** Finance starts review
- **In Review → Approved:** Finance approves
- **Approved → Opened:** Recruiting opens in Ashby

---

## Customization

### Adding Custom States

You can add custom states for your workflow:

1. Create state in Linear
2. Add to environment variables
3. Update code to handle new state
4. Configure auto-transitions if needed

### State Colors

Recommended color scheme:
- **Backlog:** Gray or Blue
- **Started:** Yellow or Orange
- **Completed:** Green (Hired) or Red (Canceled)

---

## Troubleshooting

### Issue: "State not found"
- ✅ Verify state ID is correct
- ✅ Check state exists in Linear
- ✅ Ensure state is in correct team

### Issue: "Cannot transition to state"
- ✅ Check state type (Backlog → Started → Completed)
- ✅ Verify state is not archived
- ✅ Ensure user has permissions

### Issue: "Auto-transition not working"
- ✅ Check webhook is configured correctly
- ✅ Verify state IDs in environment variables
- ✅ Review webhook logs for errors

---

## Best Practices

1. **Keep State Names Consistent**
   - Use exact names as specified
   - Don't change names after setup
   - Document any custom states

2. **Use Appropriate Types**
   - Backlog for pending work
   - Started for active work
   - Completed for finished work

3. **Set Clear Descriptions**
   - Help team understand each state
   - Include next steps
   - Add examples if helpful

4. **Test State Transitions**
   - Verify manual transitions work
   - Test auto-transitions
   - Check webhook handlers

---

**Last Updated:** December 2025
