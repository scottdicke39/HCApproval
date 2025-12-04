# CSV Bulk Upload Guide

## Overview

The CSV bulk upload feature allows you to import multiple headcount requests at once, perfect for:
- Backfilling existing openings
- Importing from spreadsheets
- Bulk updates from other systems

---

## CSV Template

### Required Columns

```csv
role_title,department,division,level,ic_or_manager,location,employment_type,reason_for_request,priority,hiring_manager_name,job_description
Senior Software Engineer,Engineering,Core,L6,IC,Remote,FTE,Net New,High,Jane Smith,We need a senior engineer to lead...
Product Manager,Product,Core,L5,IC,San Francisco,FTE,Backfill,Medium,John Doe,Backfilling for departing PM...
```

### Column Descriptions

| Column | Required | Description | Example |
|--------|----------|-------------|---------|
| `role_title` | ✅ | Job title | "Senior Software Engineer" |
| `department` | ✅ | Department name | "Engineering" |
| `division` | ✅ | Division (Core/HAI/Both) | "Core" |
| `level` | ✅ | Level (L2-L11, M3-M6) | "L6" |
| `ic_or_manager` | ✅ | IC or Manager | "IC" or "Manager" |
| `location` | ✅ | Location | "Remote", "San Francisco", "NYC" |
| `employment_type` | ✅ | FTE or Contractor | "FTE" |
| `reason_for_request` | ✅ | Net New or Backfill | "Net New" |
| `priority` | ✅ | Priority level | "High", "Medium", "Low" |
| `hiring_manager_name` | ✅ | Hiring manager name | "Jane Smith" |
| `job_description` | ❌ | Job description | "We need..." |

---

## How to Upload

### Method 1: Slack File Upload

1. **Prepare your CSV file**
   - Use the template above
   - Save as `.csv` file
   - Ensure all required columns are present

2. **Upload to Slack**
   - Go to your Slack workspace
   - Navigate to the channel where the bot is active
   - Upload the CSV file
   - The bot will automatically detect and process it

3. **Monitor Progress**
   - Bot will send a confirmation message
   - Check for any errors in the response
   - Verify issues were created in Linear

### Method 2: Direct API Call

```bash
curl -X POST https://your-domain.com/api/csv-upload \
  -H "Content-Type: multipart/form-data" \
  -F "file=@headcount-requests.csv" \
  -F "api_key=your-api-key"
```

---

## Validation

The system validates each row before creating issues:

### Required Field Checks
- ✅ All required columns present
- ✅ No empty required fields
- ✅ Valid level format (L2-L11, M3-M6)
- ✅ Valid employment type (FTE/Contractor)
- ✅ Valid reason (Net New/Backfill)

### Data Validation
- ✅ Department exists in system
- ✅ Division is valid (Core/HAI/Both)
- ✅ Location is recognized
- ✅ Priority is valid (High/Medium/Low)

### Error Handling

If validation fails:
- ❌ Row is skipped
- 📝 Error message logged
- 📧 Summary sent to uploader

**Example Error Response:**
```
✅ Processed: 8 rows
❌ Errors: 2 rows

Row 3: Missing required field "level"
Row 7: Invalid department "InvalidDept"
```

---

## Best Practices

### Before Uploading
- ✅ Review CSV for typos
- ✅ Verify all required fields
- ✅ Check department names match exactly
- ✅ Ensure levels are correct format
- ✅ Test with 1-2 rows first

### CSV Formatting
- ✅ Use UTF-8 encoding
- ✅ Include header row
- ✅ Use commas as delimiters
- ✅ Escape quotes in text fields
- ✅ No trailing commas

### After Uploading
- ✅ Verify issues created in Linear
- ✅ Check for any error messages
- ✅ Review issue descriptions
- ✅ Confirm stakeholders are assigned

---

## Example CSV

```csv
role_title,department,division,level,ic_or_manager,location,employment_type,reason_for_request,priority,hiring_manager_name,job_description
Senior Software Engineer,Engineering,Core,L6,IC,Remote,FTE,Net New,High,Jane Smith,"We need a senior engineer to lead our new payments team. This role will be critical for..."
Product Manager,Product,Core,L5,IC,San Francisco,FTE,Backfill,Medium,John Doe,"Backfilling for departing PM. This role will own the roadmap for..."
Engineering Manager,Engineering,Core,M4,Manager,Remote,FTE,Net New,High,Bob Johnson,"New team lead needed for expanding engineering team. Will manage 5-7 engineers."
```

---

## Troubleshooting

### Common Issues

**Issue: "Missing required field"**
- ✅ Check that all required columns are present
- ✅ Verify no empty cells in required columns
- ✅ Ensure header row matches exactly

**Issue: "Invalid department"**
- ✅ Check department name spelling
- ✅ Verify department exists in system
- ✅ Use exact department name (case-sensitive)

**Issue: "Invalid level format"**
- ✅ Use format: L2-L11 or M3-M6
- ✅ No spaces in level (e.g., "L6" not "L 6")
- ✅ Include IC or Manager designation

**Issue: "File not processed"**
- ✅ Check file is valid CSV format
- ✅ Verify file size is reasonable (< 10MB)
- ✅ Ensure bot has file read permissions

---

## Support

If you encounter issues:
1. Check the error message for specific details
2. Review your CSV format against the template
3. Test with a single row first
4. Contact support with error details

---

**Last Updated:** December 2025
