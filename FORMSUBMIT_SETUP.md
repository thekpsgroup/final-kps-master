# FormSubmit Setup Instructions

## How to Set Up FormSubmit for Your Funnel Pages

### 1. Sign Up for FormSubmit

1. Go to [https://formsubmit.co](https://formsubmit.co)
2. Sign up for a free account (or use their free tier)

### 2. Get Your FormSubmit URL

- After signing up, you'll get a URL like: `https://formsubmit.co/your-email@example.com`
- Or you can use their custom domain feature

### 3. Update the Form Action

In `/app/funnel/[city]/page.tsx`, the form action is already configured:

```tsx
action = 'https://formsubmit.co/sales@thekpsgroup.com';
```

**✅ Already Done!** Your email is already configured in the form.

### 4. Configure FormSubmit Settings (Optional)

You can customize these settings in your FormSubmit dashboard:

- **Email Template**: Currently set to "table" format
- **Subject Line**: Dynamic based on city
- **Auto-response**: Custom thank you message
- **Redirect URL**: Currently set to `/thank-you`
- **Captcha**: Disabled for better UX

### 5. Test the Form

1. Visit any funnel page (e.g., `/funnel/frisco`)
2. Fill out and submit the form
3. Check your email for the submission

### 6. FormSubmit Features Included

- ✅ **Email Notifications**: Instant delivery to your inbox
- ✅ **Spam Protection**: Built-in spam filtering
- ✅ **File Attachments**: Support for file uploads (if needed)
- ✅ **Custom Redirects**: After submission redirect
- ✅ **Auto-responses**: Automatic reply to form submitter
- ✅ **Data Export**: CSV export of all submissions

### 7. What You'll Receive

Each form submission includes:

- **Contact Info**: Name, Business Name, Email, Phone
- **Location Data**: City and City Slug
- **Source Tracking**: Identifies it came from funnel page
- **Timestamp**: When the lead was captured
- **User Agent**: Basic browser information

### 8. Pro Tips

- **Custom Domain**: Upgrade to use your own domain
- **Email Templates**: Create branded email templates
- **Integrations**: Connect with Zapier, Google Sheets, etc.
- **Analytics**: Track form performance

### 9. Security & Privacy

- FormSubmit handles GDPR compliance
- No data stored on your server
- Secure HTTPS transmission
- Spam protection included

---

**Need Help?** Check FormSubmit's documentation at [https://formsubmit.co/documentation](https://formsubmit.co/documentation)
