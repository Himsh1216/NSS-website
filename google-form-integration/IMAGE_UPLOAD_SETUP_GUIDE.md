# 📸 Google Form Image Upload Setup Guide

This guide will help you add PNG image upload functionality to your NSS website Google Form integration.

## 🚀 Quick Setup Steps

### 1. Update Google Form Structure

Your Google Form should have these fields **in this exact order**:

1. **Timestamp** (automatically added by Google Forms)
2. **Event Title** (Short answer) - *Required*
3. **Event Date** (Date) - *Required* 
4. **Event Summary** (Paragraph) - *Required*
5. **Event Content** (Paragraph) - *Required*
6. **📷 Event Image** (File upload) - *Allow PNG files only*
7. **Image Description** (Short answer) - *Optional*
8. **Event Type** (Multiple choice: Community Service, Environmental, Healthcare, etc.)
9. **Number of Participants** (Number)
10. **Location** (Short answer)
11. **Duration** (Short answer)

### 2. Configure File Upload Settings

In your Google Form:
1. Click on the **File upload** question
2. Set **File types**: ✅ Image files only
3. Set **Maximum file size**: 10 MB (recommended)
4. Set **Maximum number of files**: 1
5. ✅ Check "Require sign-in to upload files"

### 3. Update Google Apps Script

1. Open Google Apps Script (script.google.com)
2. Replace your current script with the enhanced version from:
   `/google-form-integration/GoogleAppsScript_WithImageUpload.js`
3. **Configure these variables** at the top:

```javascript
const GITHUB_TOKEN = 'ghp_your_actual_token_here';
const GITHUB_REPO = 'yourusername/NSS-website';
const GITHUB_IMAGES_PATH = 'public/events_photos'; // Where images will be stored
const NOTIFICATION_EMAIL = 'your-email@domain.com';
```

### 4. Set Up GitHub Repository

Ensure your repository has this folder structure:
```
NSS-website/
├── public/
│   └── events_photos/     ← Images will be uploaded here
│       ├── event_2024-01-15.png
│       └── event_2024-01-16.png
└── backend/
    └── blogPosts.js       ← Blog data will be updated here
```

### 5. Configure Script Permissions

1. In Google Apps Script, go to **Triggers**
2. Add a trigger:
   - **Choose function**: `onFormSubmit`
   - **Event source**: From form
   - **Event type**: On form submit
3. **Authorize permissions** when prompted:
   - ✅ Google Drive (to access uploaded files)
   - ✅ Gmail (for notifications)
   - ✅ External services (for GitHub API)

## 🔧 Advanced Configuration

### Image Processing Settings

The script automatically:
- ✅ Validates file type (images only)
- ✅ Generates unique filenames with timestamps
- ✅ Uploads to GitHub in the specified folder
- ✅ Updates blog posts with correct image paths
- ✅ Provides fallback if image upload fails

### File Naming Convention

Uploaded images follow this pattern:
```
event_2024-10-05T14-30-00-000Z.png
```

### Error Handling

The script includes comprehensive error handling for:
- Invalid file types
- File access permission issues  
- GitHub API failures
- Network timeouts
- Large file sizes

## 🧪 Testing Your Setup

### 1. Test Image Upload Function

In Google Apps Script editor:
```javascript
// Run this function to test image upload
function testImageUpload() {
  // This will test the GitHub upload functionality
}
```

### 2. Test Form Submission

1. Fill out your Google Form with a test event
2. Upload a PNG image (recommended: under 2MB)
3. Submit the form
4. Check:
   - ✅ Email notification received
   - ✅ Image appears in GitHub repository
   - ✅ Blog post updated with correct image path
   - ✅ Website displays the new post with image

## 📋 Form Field Reference

| Field Position | Field Name | Type | Required | Notes |
|---|---|---|---|---|
| 0 | Timestamp | Auto | ✅ | Added automatically |
| 1 | Event Title | Text | ✅ | Main headline |
| 2 | Event Date | Date | ✅ | When event occurred |
| 3 | Event Summary | Paragraph | ✅ | Brief description |
| 4 | Event Content | Paragraph | ✅ | Full event details |
| 5 | **Event Image** | **File Upload** | ❌ | **PNG files only** |
| 6 | Image Description | Text | ❌ | Alt text for accessibility |
| 7 | Event Type | Choice | ❌ | Default: Community Service |
| 8 | Participants | Number | ❌ | Number of people involved |
| 9 | Location | Text | ❌ | Default: IIT Bhubaneswar |
| 10 | Duration | Text | ❌ | Default: Full Day |

## 🚨 Troubleshooting

### Common Issues

**❌ "Permission denied" error**
- Solution: Re-authorize Google Apps Script permissions

**❌ "File not found" error**  
- Solution: Ensure file upload question allows PNG files
- Check that form respondents are signed in to Google

**❌ "GitHub API error"**
- Solution: Verify GitHub token has repository write permissions
- Check repository name is correct

**❌ Image not displaying on website**
- Solution: Verify image path starts with `/public/events_photos/`
- Check that image was actually uploaded to GitHub

### Debug Information

The script logs detailed information to help troubleshoot:
- Form response parsing
- File upload processing  
- GitHub API interactions
- Error messages with stack traces

Check **Google Apps Script > Executions** for detailed logs.

## 🎯 Best Practices

### For Form Users
- ✅ Use high-quality PNG images
- ✅ Keep file sizes under 5MB
- ✅ Use descriptive filenames
- ✅ Provide meaningful image descriptions

### For Administrators  
- ✅ Monitor script execution logs regularly
- ✅ Set up email notifications for errors
- ✅ Test form submission monthly
- ✅ Keep GitHub token secure and rotate periodically

## 🔐 Security Notes

- Form responses require Google sign-in for file uploads
- GitHub token should have minimal required permissions
- Images are publicly accessible once uploaded to GitHub
- Consider implementing file size limits to prevent abuse

## 📈 Monitoring & Maintenance

### Regular Checks
- Monthly: Test form submission with image upload
- Weekly: Check GitHub repository for proper image organization
- Daily: Monitor email notifications for any errors

### Backup Strategy
- GitHub automatically provides version history
- Consider setting up automated backups of the blog posts file
- Keep a local copy of form responses

---

**Need Help?** Check the Google Apps Script execution logs for detailed error information, or refer to the enhanced error notifications sent via email.