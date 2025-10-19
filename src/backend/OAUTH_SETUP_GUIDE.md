# OAuth2 Playground Setup - Step by Step

## Step 1: Enable Gmail API

1. Go to [Google Cloud Console](https://console.cloud.google.com/apis/library)
2. Make sure project **healthy-basis-475512-v4** is selected (top left)
3. Search for **Gmail API**
4. Click **ENABLE**

## Step 2: Create OAuth2 Credentials

1. Go to [Credentials](https://console.cloud.google.com/apis/credentials?project=healthy-basis-475512-v4)
2. Click **+ CREATE CREDENTIALS** → **OAuth client ID**
3. If prompted, configure OAuth consent screen:
   - User Type: **External**
   - App name: **Wings Hobbies**
   - User support email: Your email
   - Developer contact: Your email
   - Click **SAVE AND CONTINUE** (skip scopes and test users)
4. Back to Create OAuth client ID:
   - Application type: **Web application**
   - Name: **Wings Hobbies Backend**
   - Authorized redirect URIs: Add `https://developers.google.com/oauthplayground`
   - Click **CREATE**
5. **COPY** Client ID and Client Secret (save them)

## Step 3: Get Refresh Token from OAuth Playground

1. Go to [OAuth2 Playground](https://developers.google.com/oauthplayground)

2. Click **Settings** icon (⚙️ top right)
   - Check ☑ **Use your own OAuth credentials**
   - Paste **OAuth Client ID** from Step 2
   - Paste **OAuth Client secret** from Step 2
   - Click **Close**

3. In left panel, scroll to **Gmail API v1**
   - Expand it
   - Check ☑ **https://mail.google.com/** (full access)

4. Click **Authorize APIs** button (bottom left)
   - Sign in with your Google account
   - Click **Allow** to grant permissions

5. Click **Exchange authorization code for tokens** button
   - You'll see **Refresh token** and **Access token**
   - **COPY the Refresh token** (starts with `1//`)

## Step 4: Update Backend .env File

Open `src/backend/.env` and update:

```env
# Email Configuration (Gmail OAuth2)
EMAIL_USER=your-actual-email@gmail.com
GMAIL_CLIENT_ID=your-client-id.apps.googleusercontent.com
GMAIL_CLIENT_SECRET=your-client-secret
GMAIL_REDIRECT_URI=https://developers.google.com/oauthplayground
GMAIL_REFRESH_TOKEN=1//your-refresh-token-here
```

## Step 5: Install Dependencies & Test

```bash
cd src/backend
npm install googleapis
npm run dev
```

Test by:
- Registering a new user (sends welcome email)
- Submitting contact form (sends to admin)
- Creating an order (sends confirmation)

## Troubleshooting

### Error: redirect_uri_mismatch
- Make sure `https://developers.google.com/oauthplayground` is in Authorized redirect URIs
- Wait 5 minutes for changes to propagate

### Error: invalid_grant
- Refresh token expired
- Go back to OAuth Playground and get a new refresh token

### Error: insufficient permissions
- Make sure you selected `https://mail.google.com/` scope
- Not just `gmail.send` or `gmail.readonly`

### Emails not sending
- Check console for errors
- Verify EMAIL_USER matches the Google account used in OAuth Playground
- Make sure Gmail API is enabled

## Quick Links

- [Google Cloud Console](https://console.cloud.google.com/apis/credentials?project=healthy-basis-475512-v4)
- [OAuth2 Playground](https://developers.google.com/oauthplayground)
- [Gmail API](https://console.cloud.google.com/apis/library/gmail.googleapis.com?project=healthy-basis-475512-v4)

## Production Notes

For production, consider:
- **SendGrid** (easier, 100 emails/day free)
- **AWS SES** ($0.10 per 1000 emails)
- **Mailgun** (5000 emails/month free)

Gmail API is great for development but has complexity for production.
