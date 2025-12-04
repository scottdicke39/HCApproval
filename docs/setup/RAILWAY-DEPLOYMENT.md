# 🚂 Railway Deployment Guide

## Step-by-Step Deployment:

### 1. Create New Project in Railway

1. Go to [Railway Dashboard](https://railway.app/dashboard)
2. Click **"+ New Project"**
3. Select **"Deploy from GitHub repo"**
4. Choose your **HCApproval** repository
5. Click **"Deploy Now"**

Railway will automatically:
- Detect it's a Node.js app
- Run `npm install`
- Run `npm run build` (from `railway.json`)
- Start with `npm start`

---

### 2. Add Environment Variables

In Railway dashboard:

1. Click on your deployed service
2. Go to **"Variables"** tab
3. Click **"+ New Variable"**
4. Add each variable from your `.env` file:

**Required Variables:**
```
SLACK_BOT_TOKEN=xoxb-...
SLACK_APP_TOKEN=xapp-...
LINEAR_API_KEY=lin_api_...
LINEAR_TEAM_ID=your-team-id
LINEAR_WEBHOOK_SECRET=your-webhook-secret
ASHBY_API_KEY=your-ashby-key
ASHBY_WEBHOOK_SECRET=your-ashby-webhook-secret
```

**State IDs:**
```
LINEAR_STATE_IDS__QUEUED_FOR_REVIEW=state-id
LINEAR_STATE_IDS__IN_REVIEW=state-id
LINEAR_STATE_IDS__APPROVED=state-id
LINEAR_STATE_IDS__OPENED_IN_ASHBY=state-id
LINEAR_STATE_IDS__HIRED=state-id
LINEAR_STATE_IDS__WITHDRAWN=state-id
```

**Project IDs (optional):**
```
LINEAR_PROJECT_ID_ENGINEERING_HIRING=project-id
LINEAR_PROJECT_ID_PRODUCT_HIRING=project-id
# ... etc
```

---

### 3. Set Up Webhooks

#### Linear Webhook

1. Go to Linear Settings → Integrations → Webhooks
2. Click **"+ New Webhook"**
3. **URL:** `https://your-app-name.up.railway.app/webhooks/linear`
4. **Secret:** Use the same value as `LINEAR_WEBHOOK_SECRET`
5. **Events:** Select `Issue.create` and `Issue.update`
6. Click **"Create Webhook"**

#### Ashby Webhook (Optional)

1. Go to Ashby Settings → Webhooks
2. Click **"+ New Webhook"**
3. **URL:** `https://your-app-name.up.railway.app/webhooks/ashby?secret=YOUR_SECRET`
4. **Events:** Select `opening.created` and `candidateHire.created`
5. Click **"Create Webhook"**

---

### 4. Verify Deployment

1. Check Railway logs for successful startup
2. Test Slack command: `/request-headcount`
3. Verify Linear webhook is receiving events
4. Check that issues are being created correctly

---

### 5. Custom Domain (Optional)

1. In Railway, go to your service
2. Click **"Settings"** → **"Domains"**
3. Click **"+ New Domain"**
4. Enter your custom domain
5. Follow DNS setup instructions

---

## Troubleshooting

### Build Fails
- Check that all dependencies are in `package.json`
- Verify Node.js version (18+)
- Check Railway logs for specific errors

### Webhooks Not Working
- Verify webhook URLs are correct
- Check that secrets match
- Review Railway logs for incoming requests
- Test webhook endpoints with curl

### Environment Variables Missing
- Double-check all required vars are set
- Verify no typos in variable names
- Check Railway logs for "undefined" errors

---

**Deployment URL:** `https://your-app-name.up.railway.app`

**Webhook Endpoints:**
- Linear: `https://your-app-name.up.railway.app/webhooks/linear`
- Ashby: `https://your-app-name.up.railway.app/webhooks/ashby?secret=YOUR_SECRET`
