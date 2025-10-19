# Google Cloud Email Setup

## Option 1: Gmail API with OAuth2 (Recommended)

### Step 1: Enable Gmail API
1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Select project: `healthy-basis-475512-v4`
3. Enable **Gmail API**

### Step 2: Create OAuth2 Credentials
1. Go to **APIs & Services > Credentials**
2. Click **Create Credentials > OAuth 2.0 Client ID**
3. Application type: **Web application**
4. Authorized redirect URIs: `https://developers.google.com/oauthplayground`
5. Copy **Client ID** and **Client Secret**

### Step 3: Get Refresh Token
1. Go to [OAuth2 Playground](https://developers.google.com/oauthplayground)
2. Click settings (⚙️) > Use your own OAuth credentials
3. Enter Client ID and Client Secret
4. Select **Gmail API v1 > https://mail.google.com**
5. Click **Authorize APIs**
6. Click **Exchange authorization code for tokens**
7. Copy **Refresh token**

### Step 4: Update .env
```env
EMAIL_USER=your-email@gmail.com
GMAIL_CLIENT_ID=your-client-id.apps.googleusercontent.com
GMAIL_CLIENT_SECRET=your-client-secret
GMAIL_REDIRECT_URI=https://developers.google.com/oauthplayground
GMAIL_REFRESH_TOKEN=your-refresh-token
```

### Step 5: Install Dependencies
```bash
cd src/backend
npm install googleapis
npm run dev
```

## Option 2: SendGrid (Alternative)

### Step 1: Create SendGrid Account
1. Go to [SendGrid](https://sendgrid.com)
2. Sign up for free (100 emails/day)

### Step 2: Create API Key
1. Go to **Settings > API Keys**
2. Create API Key with **Full Access**
3. Copy the API key

### Step 3: Update email.js
```javascript
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendEmail = async (options) => {
  await sgMail.send({
    to: options.to,
    from: process.env.EMAIL_USER,
    subject: options.subject,
    html: options.html
  });
};
```

### Step 4: Update .env
```env
SENDGRID_API_KEY=your-sendgrid-api-key
EMAIL_USER=noreply@wingshobbies.com
```

### Step 5: Install SendGrid
```bash
npm install @sendgrid/mail
```

## Testing

```bash
# Start backend
npm run dev

# Test registration (sends welcome email)
# Test contact form (sends to admin)
# Test order (sends confirmation)
```

## Troubleshooting

### Gmail API Quota
- Free tier: 1 billion quota units/day
- Sending email: ~25 quota units
- ~40 million emails/day limit

### SendGrid Limits
- Free: 100 emails/day
- Essentials: $19.95/month for 50K emails

## Production Recommendation

Use **SendGrid** for production:
- More reliable
- Better deliverability
- Detailed analytics
- No OAuth complexity
