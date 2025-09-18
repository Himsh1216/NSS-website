# Google Form Integration for NSS Website

This system automatically creates blog posts on the NSS website from Google Form submissions using Google Apps Script and GitHub API.

## Setup Instructions

### 1. Create Google Form

Create a Google Form with the following fields in exact order:

1. **Event Title** (Short answer) - Required
2. **Event Date** (Date) - Required
3. **Event Summary** (Short answer) - Required
4. **Event Content** (Paragraph) - Required
5. **Image URL** (Short answer) - Optional
6. **Image Alt Text** (Short answer) - Optional
7. **Event Type** (Multiple choice: Community Service, Education, Environment, Health, Disaster Relief, Awareness) - Required
8. **Number of Participants** (Short answer, number) - Optional
9. **Location** (Short answer) - Optional
10. **Duration** (Short answer) - Optional
11. **Team Members** (Paragraph, comma-separated) - Optional
12. **Tags** (Short answer, comma-separated) - Optional
13. **Organizer** (Short answer) - Optional
14. **Contact Email** (Email) - Optional

### 2. Get GitHub Personal Access Token

1. Go to GitHub Settings > Developer settings > Personal access tokens > Tokens (classic)
2. Click "Generate new token (classic)"
3. Give it a descriptive name like "NSS Website Form Integration"
4. Select expiration (recommend 1 year)
5. Select scopes: `repo` (Full control of private repositories)
6. Click "Generate token"
7. **Copy the token immediately** (you won't see it again)

### 3. Set up Google Apps Script

1. Open your Google Form
2. Click the three dots (...) menu > Script editor
3. Delete any existing code in `Code.gs`
4. Copy the content from `GoogleAppsScript.js` and paste it
5. Update the configuration variables at the top:
   - `GITHUB_TOKEN`: Your GitHub personal access token
   - `GITHUB_REPO`: Your repository name (e.g., "username/NSS-website")
   - `GITHUB_FILE_PATH`: Keep as "backend/blogPosts.js"
   - `NOTIFICATION_EMAIL`: Your email for notifications
6. Save the script (Ctrl+S)

### 4. Set up Form Trigger

1. In the Apps Script editor, click the clock icon (Triggers) on the left
2. Click "+ Add Trigger"
3. Configure:
   - Choose which function to run: `onFormSubmit`
   - Choose which deployment should run: Head
   - Select event source: From form
   - Select event type: On form submit
4. Click "Save"
5. You may need to authorize the script (follow the prompts)

### 5. Test the Integration

1. In the Apps Script editor, run the `testIntegration` function
2. Check your GitHub repository for a new commit
3. Verify the test event appears in your website's blog section
4. Delete the test event if everything works

### 6. Use the Form

1. Share your Google Form link with content creators
2. When someone submits the form, it will automatically:
   - Create a new blog post entry
   - Commit it to your GitHub repository
   - Send you a notification email

## Troubleshooting

### Common Issues

1. **"Cannot read properties of undefined" error**
   - Check that form fields match the expected order
   - Ensure required fields are filled

2. **GitHub API authentication failed**
   - Verify your GitHub token is correct and has `repo` permissions
   - Check that the repository name is correct

3. **File upload failed**
   - Ensure the file path `backend/blogPosts.js` exists in your repository
   - Check that the repository is accessible with your token

4. **Form trigger not working**
   - Verify the trigger is set up correctly in Apps Script
   - Check that the function name is `onFormSubmit`

### Debug Steps

1. Check Apps Script execution logs:
   - In Apps Script editor, click "Executions" on the left
   - Look for error messages in recent runs

2. Test manually:
   - Run the `testIntegration` function in Apps Script
   - Check if it creates a commit in GitHub

3. Verify form responses:
   - Check that form responses are being recorded in the linked spreadsheet

## Form Response Format

The form responses are processed in this order:
- responses[0]: Timestamp (auto-generated)
- responses[1]: Event Title
- responses[2]: Event Date
- responses[3]: Event Summary
- responses[4]: Event Content
- responses[5]: Image URL
- responses[6]: Image Alt Text
- responses[7]: Event Type
- responses[8]: Number of Participants
- responses[9]: Location
- responses[10]: Duration
- responses[11]: Team Members
- responses[12]: Tags
- responses[13]: Organizer
- responses[14]: Contact Email

## Security Notes

- Keep your GitHub token secure and don't share it
- Regularly rotate your GitHub token (every 6-12 months)
- Only give form access to trusted content creators
- Monitor your repository for unexpected commits

## Support

If you encounter issues:
1. Check the troubleshooting section above
2. Review Apps Script execution logs
3. Verify all configuration values
4. Test with the `testIntegration` function