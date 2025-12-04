/**
 * Example: Linear Webhook Handler
 * 
 * This demonstrates how to handle Linear webhooks for automated actions
 * like auto-fixing issue descriptions and smart automation.
 */

import express, { Request, Response } from 'express';
import crypto from 'crypto';

const router = express.Router();

/**
 * Verify Linear webhook signature
 */
function verifyLinearSignature(
  body: string,
  signature: string,
  secret: string
): boolean {
  const hmac = crypto.createHmac('sha256', secret);
  const digest = hmac.update(body).digest('hex');
  return crypto.timingSafeEqual(
    Buffer.from(signature),
    Buffer.from(digest)
  );
}

/**
 * Handle Linear webhook events
 */
router.post('/webhooks/linear', express.raw({ type: 'application/json' }), async (req: Request, res: Response) => {
  try {
    // Verify webhook signature
    const signature = req.headers['linear-signature'] as string;
    const secret = process.env.LINEAR_WEBHOOK_SECRET!;
    
    if (!verifyLinearSignature(req.body.toString(), signature, secret)) {
      return res.status(401).json({ error: 'Invalid signature' });
    }
    
    const event = JSON.parse(req.body.toString());
    const { action, data } = event;
    
    // Handle different event types
    if (action === 'create' && data.type === 'Issue') {
      await handleIssueCreate(data);
    } else if (action === 'update' && data.type === 'Issue') {
      await handleIssueUpdate(data);
    }
    
    res.status(200).json({ received: true });
  } catch (error) {
    console.error('Error processing Linear webhook:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

/**
 * Handle issue creation
 */
async function handleIssueCreate(issue: any) {
  console.log(`New issue created: ${issue.identifier}`);
  
  // Auto-fix formatting if needed
  await autoFixIssueDescription(issue);
  
  // Run smart automation (auto-assignment, auto-labeling)
  await handleSmartAutomation(issue, 'create');
}

/**
 * Handle issue updates (state changes, assignments, etc.)
 */
async function handleIssueUpdate(issue: any) {
  console.log(`Issue updated: ${issue.identifier}`);
  
  const oldState = issue.previousState?.name;
  const newState = issue.state?.name;
  
  // Auto-fix formatting if needed
  await autoFixIssueDescription(issue);
  
  // Run smart automation
  await handleSmartAutomation(issue, 'update', oldState, newState);
  
  // Update timeline tracking on state changes
  if (oldState !== newState) {
    await updateTimelineTracking(issue, newState);
  }
}

/**
 * Auto-fix issue description formatting
 */
async function autoFixIssueDescription(issue: any) {
  // Check if description has required sections
  const description = issue.description || '';
  
  if (!description.includes('💰 Finance')) {
    // Add Finance section if missing
    // Implementation would add the Finance section
  }
  
  if (!description.includes('⏱️ TIMELINE')) {
    // Add Timeline section if missing
    // Implementation would add the Timeline section
  }
}

/**
 * Smart automation: auto-assignment, auto-labeling, etc.
 */
async function handleSmartAutomation(
  issue: any,
  action: 'create' | 'update',
  oldState?: string,
  newState?: string
) {
  // Auto-assign Finance BP if unassigned
  if (action === 'create' && !issue.assignee) {
    const financeBP = getFinanceBPForDepartment(issue);
    if (financeBP) {
      // await linearClient.updateIssue(issue.id, { assigneeId: financeBP });
    }
  }
  
  // Auto-label based on issue content
  const labels = extractLabelsFromIssue(issue);
  if (labels.length > 0) {
    // await linearClient.updateIssue(issue.id, { labelIds: labels });
  }
  
  // Re-assign Recruiting Manager when moved to "Opened in Ashby"
  if (newState === 'Opened in Ashby') {
    const recruitingManager = getRecruitingManagerForDepartment(issue);
    if (recruitingManager) {
      // await linearClient.updateIssue(issue.id, { assigneeId: recruitingManager });
    }
  }
}

/**
 * Update timeline tracking section
 */
async function updateTimelineTracking(issue: any, newState: string) {
  const timestamp = new Date().toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });
  
  const timelineEntry = `- ${timestamp} — Moved to ${newState}`;
  
  // Append to Timeline section in description
  // Implementation would update the issue description
}

// Helper functions
function getFinanceBPForDepartment(issue: any): string | null {
  // Logic to determine Finance BP based on department
  return null;
}

function extractLabelsFromIssue(issue: any): string[] {
  // Extract labels based on issue content (department, location, etc.)
  return [];
}

function getRecruitingManagerForDepartment(issue: any): string | null {
  // Logic to determine Recruiting Manager based on department
  return null;
}

export default router;
