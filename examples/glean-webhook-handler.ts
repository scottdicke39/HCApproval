/**
 * Example: Glean AI Agent Webhook Handler
 * 
 * This demonstrates how to handle webhook requests from Glean AI Agent
 * when users submit headcount requests via conversational interface.
 */

import express, { Request, Response } from 'express';
import { buildIssueDescription, buildIssueTitle } from '../server/utils/issue-description-builder.js';

const router = express.Router();

/**
 * Handle Glean AI Agent webhook
 * 
 * Glean sends a POST request with the collected form data after
 * the conversational workflow completes.
 */
router.post('/webhooks/glean-agent', express.json(), async (req: Request, res: Response) => {
  try {
    const payload = req.body;
    
    // Extract data from Glean payload
    const {
      roleTitle,
      department,
      division,
      level,
      icOrManager,
      location,
      employmentType,
      reasonForRequest,
      priority,
      submitterName,
      submitterId,
      hiringManagerName,
      jobDescription,
      // ... other fields
    } = payload;
    
    // Validate required fields
    if (!roleTitle || !department || !level) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields: roleTitle, department, level'
      });
    }
    
    // Build issue description using centralized builder
    const description = buildIssueDescription({
      roleTitle,
      department,
      division: division || 'Core',
      level: level.split(' ')[0], // Extract L5, L6, etc.
      icOrManager: level.split(' ')[1] || 'IC',
      location: location || 'Remote',
      employmentType: employmentType || 'FTE',
      reasonForRequest: reasonForRequest || 'Net New',
      priority: priority || 'Medium',
      submitterName: submitterName || 'Unknown',
      submitterId: submitterId || 'U000000',
      hiringManagerName,
      jobDescription
    });
    
    // Build issue title
    const title = buildIssueTitle({
      roleTitle,
      level: level.split(' ')[0],
      icOrManager: level.split(' ')[1] || 'IC',
      department,
      employmentType: employmentType || 'FTE'
    });
    
    // Create Linear issue (example - use your Linear client)
    // const issue = await createLinearIssue({
    //   title,
    //   description,
    //   teamId: process.env.LINEAR_TEAM_ID,
    //   stateId: process.env.LINEAR_STATE_IDS__QUEUED_FOR_REVIEW
    // });
    
    // Return success response to Glean
    res.json({
      success: true,
      message: 'Headcount request submitted successfully',
      linearIssue: {
        identifier: 'HEA-123', // Would be actual issue identifier
        url: 'https://linear.app/your-workspace/issue/HEA-123'
      }
    });
    
  } catch (error) {
    console.error('Error processing Glean webhook:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
});

/**
 * Example Glean payload structure:
 * {
 *   "roleTitle": "Senior Software Engineer",
 *   "department": "Engineering",
 *   "division": "Core",
 *   "level": "L6 IC",
 *   "location": "Remote",
 *   "employmentType": "FTE",
 *   "reasonForRequest": "Net New",
 *   "priority": "High",
 *   "submitterName": "Jane Smith",
 *   "submitterId": "U123456",
 *   "hiringManagerName": "Jane Smith",
 *   "jobDescription": "We need a senior engineer to lead..."
 * }
 */

export default router;
