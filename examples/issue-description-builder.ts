/**
 * Example: Beautiful Linear Issue Description Builder
 * 
 * This utility creates standardized, professional Linear issue descriptions
 * for HC Approval submissions. All submission methods use this builder.
 */

export interface IssueDescriptionParams {
  // Required fields
  roleTitle: string;
  department: string;
  division: string;
  level: string;
  icOrManager: string;
  location: string;
  employmentType: string;
  reasonForRequest: string;
  priority: string;
  submitterName: string;
  submitterId: string;
  
  // Optional fields
  hiringManagerName?: string;
  finid?: string;
  budgetEstimate?: string;
  jobDescription?: string;
  isConfidential?: boolean;
}

/**
 * Build the beautiful Linear issue description format
 */
export function buildIssueDescription(params: IssueDescriptionParams): string {
  const submittedAt = new Date();
  const submittedDateFormatted = submittedAt.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });
  
  let description = '';
  
  // Header - HC Request Summary
  description += `# 🎟️ HEADCOUNT REQUEST SUMMARY\n`;
  description += `─────────────────────────────\n`;
  description += `**Role:** ${params.roleTitle}\n`;
  description += `**Hiring Manager:** ${params.hiringManagerName || params.submitterName}\n`;
  description += `**Department:** ${params.department}\n`;
  description += `**Division:** ${params.division}\n`;
  description += `**Level:** ${params.level} ${params.icOrManager}\n`;
  description += `**Location:** ${params.location}\n`;
  description += `**Employment:** ${params.employmentType}\n`;
  description += `**Priority:** ${params.priority}\n`;
  
  if (params.isConfidential) {
    description += `\n⚠️ **CONFIDENTIAL ROLE**\n`;
  }
  
  description += `\n---\n\n`;
  
  // Submission Info
  description += `**Submitted by:** ${params.submitterName} <@${params.submitterId}>\n`;
  description += `**Submitted on:** ${submittedDateFormatted}\n`;
  
  description += `\n---\n\n`;
  
  // Finance & Budget Review Section
  description += `## 💰 Finance & Compensation Review\n\n`;
  description += `**👉 Rec Ops:** Add Pave comp range first\n`;
  description += `- **Comp Range - Low:** _[Enter low range]\n`;
  description += `- **Comp Range - Mid:** _[Enter mid range]\n`;
  description += `- **Comp Range - High:** _[Enter high range]\n\n`;
  description += `**👉 Finance:** Review comp range, assign FIN ID\n`;
  description += `- **FIN ID:** ${params.finid ? `**${params.finid}**` : '_[Finance: Enter FIN ID here]_'}\n`;
  if (params.budgetEstimate) {
    description += `- **Budget Estimate:** ${params.budgetEstimate}\n`;
  }
  description += `- **Allocated Budget:** _[Finance: Enter total budget]\n\n`;
  
  description += `\n---\n\n`;
  
  // Recruiting Status Section (auto-updated by CSV sync)
  description += `## 🎯 RECRUITING STATUS\n`;
  description += `─────────────────────────────\n\n`;
  description += `**Current Stage:** Awaiting Approval ⏳\n\n`;
  description += `_This section will be auto-updated when opened in Ashby with:_\n`;
  description += `- Opening ID (P-code)\n`;
  description += `- Recruiter assignment\n`;
  description += `- Date opened\n`;
  description += `- Target close date\n`;
  description += `- Days open (auto-calculated)\n`;
  description += `- Direct Ashby link\n\n`;
  
  description += `\n---\n\n`;
  
  // Request Context
  description += `## 📋 REQUEST CONTEXT\n`;
  description += `─────────────────────────────\n\n`;
  description += `### Reason for Request\n`;
  description += `**Type:** ${params.reasonForRequest}\n\n`;
  
  if (params.jobDescription) {
    description += `## 📝 JOB DESCRIPTION / PROBLEM STATEMENT\n`;
    description += `─────────────────────────────\n\n`;
    description += `${params.jobDescription}\n\n`;
    description += `\n---\n\n`;
  }
  
  // Timeline Section
  description += `## ⏱️ TIMELINE\n`;
  description += `─────────────────────────────\n\n`;
  description += `**📅 Submitted:** ${submittedDateFormatted}\n\n`;
  description += `**Stage History:**\n`;
  description += `- ${submittedDateFormatted} — Submitted\n\n`;
  description += `_Stage transitions are automatically logged below._\n`;
  
  return description;
}

/**
 * Build consistent Linear issue title
 */
export function buildIssueTitle(params: {
  roleTitle: string;
  level: string;
  icOrManager: string;
  department: string;
  employmentType: string;
}): string {
  const contractorPrefix = params.employmentType === 'Contractor' ? '[Contractor] ' : '';
  return `${contractorPrefix}${params.roleTitle} - ${params.level} ${params.icOrManager} - ${params.department}`;
}
