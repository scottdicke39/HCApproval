/**
 * Example: Slack Command Handler
 * 
 * This demonstrates how to handle Slack slash commands for headcount requests.
 * In production, this integrates with Linear to create issues.
 */

import { App } from '@slack/bolt';
import { buildIssueDescription, buildIssueTitle } from '../server/utils/issue-description-builder.js';

/**
 * Register the /request-headcount command
 */
export function registerSlackCommands(app: App) {
  app.command('/request-headcount', async ({ ack, body, client }) => {
    // Acknowledge the command immediately
    await ack();
    
    try {
      // Open a modal for the user to fill out
      await client.views.open({
        trigger_id: body.trigger_id,
        view: {
          type: 'modal',
          callback_id: 'headcount_request_modal',
          title: {
            type: 'plain_text',
            text: 'Request Headcount'
          },
          submit: {
            type: 'plain_text',
            text: 'Submit'
          },
          close: {
            type: 'plain_text',
            text: 'Cancel'
          },
          blocks: [
            {
              type: 'input',
              block_id: 'role_title',
              label: {
                type: 'plain_text',
                text: 'Job Title'
              },
              element: {
                type: 'plain_text_input',
                action_id: 'role_title_input',
                placeholder: {
                  type: 'plain_text',
                  text: 'e.g., Senior Software Engineer'
                }
              }
            },
            {
              type: 'input',
              block_id: 'department',
              label: {
                type: 'plain_text',
                text: 'Department'
              },
              element: {
                type: 'static_select',
                action_id: 'department_select',
                options: [
                  { text: { type: 'plain_text', text: 'Engineering' }, value: 'Engineering' },
                  { text: { type: 'plain_text', text: 'Product' }, value: 'Product' },
                  { text: { type: 'plain_text', text: 'Sales' }, value: 'Sales' },
                  { text: { type: 'plain_text', text: 'Marketing' }, value: 'Marketing' }
                ]
              }
            },
            {
              type: 'input',
              block_id: 'level',
              label: {
                type: 'plain_text',
                text: 'Level'
              },
              element: {
                type: 'static_select',
                action_id: 'level_select',
                options: [
                  { text: { type: 'plain_text', text: 'L5 IC' }, value: 'L5 IC' },
                  { text: { type: 'plain_text', text: 'L6 IC' }, value: 'L6 IC' },
                  { text: { type: 'plain_text', text: 'M3 Manager' }, value: 'M3 Manager' }
                ]
              }
            }
            // ... more fields
          ]
        }
      });
    } catch (error) {
      console.error('Error opening modal:', error);
      await client.chat.postEphemeral({
        channel: body.channel_id,
        user: body.user_id,
        text: '❌ Error opening form. Please try again.'
      });
    }
  });
  
  // Handle modal submission
  app.view('headcount_request_modal', async ({ ack, body, view, client }) => {
    await ack();
    
    try {
      // Extract form values
      const values = view.state.values;
      const roleTitle = values.role_title.role_title_input.value || '';
      const department = values.department.department_select.selected_option?.value || '';
      const level = values.level.level_select.selected_option?.value || '';
      
      // Build issue description using the centralized builder
      const description = buildIssueDescription({
        roleTitle,
        department,
        division: 'Core', // Default or from form
        level: level.split(' ')[0], // Extract L5, L6, etc.
        icOrManager: level.split(' ')[1] || 'IC',
        location: 'Remote',
        employmentType: 'FTE',
        reasonForRequest: 'Net New',
        priority: 'Medium',
        submitterName: body.user.name,
        submitterId: body.user.id
      });
      
      // Create Linear issue (example - use your Linear client)
      // const issue = await createLinearIssue({
      //   title: buildIssueTitle({ roleTitle, level, icOrManager, department, employmentType: 'FTE' }),
      //   description,
      //   teamId: process.env.LINEAR_TEAM_ID
      // });
      
      // Send confirmation
      await client.chat.postEphemeral({
        channel: body.user.id,
        user: body.user.id,
        text: `✅ Headcount request submitted!\n\nLinear Issue: HEA-123\nStatus: Queued for Finance Review`
      });
    } catch (error) {
      console.error('Error processing submission:', error);
      await client.chat.postEphemeral({
        channel: body.user.id,
        user: body.user.id,
        text: '❌ Error submitting request. Please try again or contact support.'
      });
    }
  });
}
