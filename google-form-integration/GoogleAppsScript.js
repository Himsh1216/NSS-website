/**
 * Google Apps Script for NSS Website Blog Post Integration
 * This script automatically creates blog posts from Google Form submissions
 * and uploads them to GitHub repository.
 */

// Configuration - Replace these with your actual values
const GITHUB_TOKEN = 'your_github_personal_access_token_here';
const GITHUB_REPO = 'your_username/NSS-website';
const GITHUB_FILE_PATH = 'backend/blogPosts.js';
const NOTIFICATION_EMAIL = 'your-email@example.com';

/**
 * Main function triggered when form is submitted
 * This function is automatically called by Google Forms
 */
function onFormSubmit(e) {
  try {
    console.log('Form submission detected, processing...');

    const responses = e.values;
    console.log('Form responses:', responses);

    // Parse form responses into event data
    const eventData = parseFormResponses(responses);
    console.log('Parsed event data:', eventData);

    // Add the event to GitHub
    const result = addEventToGitHub(eventData);

    if (result.success) {
      console.log('Event successfully added to GitHub');
      sendSuccessNotification(eventData);
    } else {
      throw new Error(result.error);
    }

  } catch (error) {
    console.error('Error in onFormSubmit:', error);
    sendErrorNotification(null, error.toString());
  }
}

/**
 * Parse Google Form responses into structured event data
 */
function parseFormResponses(responses) {
  return {
    title: getResponseValue(responses, 1, 'Untitled Event'),
    date: getResponseValue(responses, 2, new Date().toISOString().split('T')[0]),
    summary: getResponseValue(responses, 3, 'Event summary not provided'),
    content: getResponseValue(responses, 4, 'Event details not provided'),
    image: getResponseValue(responses, 5, '/api/placeholder/400/300'),
    imageAlt: getResponseValue(responses, 6, 'Event image'),
    stats: {
      type: getResponseValue(responses, 7, 'Community Service'),
      participants: parseInt(getResponseValue(responses, 8, '0')) || 0,
      location: getResponseValue(responses, 9, 'IIT Bhubaneswar'),
      duration: getResponseValue(responses, 10, 'Full Day')
    },
    team: parseTeamMembers(getResponseValue(responses, 11, '')),
    tags: parseTags(getResponseValue(responses, 12, '')),
    organizer: getResponseValue(responses, 13, 'NSS IIT BBS'),
    contact: getResponseValue(responses, 14, 'nss@iitbbs.ac.in')
  };
}

/**
 * Safely get response value with fallback
 */
function getResponseValue(responses, index, fallback) {
  if (responses && responses.length > index && responses[index] !== undefined) {
    return responses[index].toString().trim() || fallback;
  }
  return fallback;
}

/**
 * Parse team members from comma-separated string
 */
function parseTeamMembers(teamString) {
  if (!teamString || teamString.trim() === '') return [];
  return teamString.split(',').map(member => member.trim()).filter(member => member);
}

/**
 * Parse tags from comma-separated string
 */
function parseTags(tagsString) {
  if (!tagsString || tagsString.trim() === '') return [];
  return tagsString.split(',').map(tag => tag.trim()).filter(tag => tag);
}

/**
 * Add event to GitHub repository
 */
function addEventToGitHub(eventData) {
  try {
    // Get current file content from GitHub
    const currentContent = getCurrentFileContent();

    // Parse current content
    let blogPosts;
    try {
      // Extract the array from the module.exports
      const arrayMatch = currentContent.match(/module\.exports\s*=\s*(\[[\s\S]*\]);/);
      if (arrayMatch) {
        blogPosts = JSON.parse(arrayMatch[1]);
      } else {
        blogPosts = [];
      }
    } catch (parseError) {
      console.log('Error parsing current content, starting with empty array');
      blogPosts = [];
    }

    // Add new event at the beginning
    blogPosts.unshift(eventData);

    // Generate new file content
    const newContent = generateFileContent(blogPosts);

    // Upload to GitHub
    const uploadResult = uploadToGitHub(newContent);

    return { success: true, data: uploadResult };

  } catch (error) {
    console.error('Error adding event to GitHub:', error);
    return { success: false, error: error.toString() };
  }
}

/**
 * Get current file content from GitHub
 */
function getCurrentFileContent() {
  const url = `https://api.github.com/repos/${GITHUB_REPO}/contents/${GITHUB_FILE_PATH}`;

  const response = UrlFetchApp.fetch(url, {
    method: 'GET',
    headers: {
      'Authorization': `token ${GITHUB_TOKEN}`,
      'Accept': 'application/vnd.github.v3+json',
      'User-Agent': 'NSS-Website-Integration'
    }
  });

  if (response.getResponseCode() === 404) {
    // File doesn't exist, return empty content
    return 'module.exports = [];';
  }

  if (response.getResponseCode() !== 200) {
    throw new Error(`GitHub API error: ${response.getResponseCode()} - ${response.getContentText()}`);
  }

  const data = JSON.parse(response.getContentText());
  return Utilities.newBlob(Utilities.base64Decode(data.content)).getDataAsString();
}

/**
 * Generate new file content with updated blog posts
 */
function generateFileContent(blogPosts) {
  return `// Auto-generated blog posts file
// Last updated: ${new Date().toISOString()}

module.exports = ${JSON.stringify(blogPosts, null, 2)};
`;
}

/**
 * Upload updated content to GitHub
 */
function uploadToGitHub(content) {
  // First, get the current file SHA if it exists
  let sha = null;
  try {
    const getUrl = `https://api.github.com/repos/${GITHUB_REPO}/contents/${GITHUB_FILE_PATH}`;
    const getResponse = UrlFetchApp.fetch(getUrl, {
      method: 'GET',
      headers: {
        'Authorization': `token ${GITHUB_TOKEN}`,
        'Accept': 'application/vnd.github.v3+json',
        'User-Agent': 'NSS-Website-Integration'
      }
    });

    if (getResponse.getResponseCode() === 200) {
      const data = JSON.parse(getResponse.getContentText());
      sha = data.sha;
    }
  } catch (error) {
    console.log('File might not exist, creating new file');
  }

  // Prepare upload payload
  const payload = {
    message: `Add new NSS event: ${new Date().toISOString()}`,
    content: Utilities.base64Encode(content),
    branch: 'main'
  };

  if (sha) {
    payload.sha = sha;
  }

  // Upload to GitHub
  const url = `https://api.github.com/repos/${GITHUB_REPO}/contents/${GITHUB_FILE_PATH}`;
  const response = UrlFetchApp.fetch(url, {
    method: 'PUT',
    headers: {
      'Authorization': `token ${GITHUB_TOKEN}`,
      'Accept': 'application/vnd.github.v3+json',
      'Content-Type': 'application/json',
      'User-Agent': 'NSS-Website-Integration'
    },
    payload: JSON.stringify(payload)
  });

  if (response.getResponseCode() !== 200 && response.getResponseCode() !== 201) {
    throw new Error(`GitHub upload failed: ${response.getResponseCode()} - ${response.getContentText()}`);
  }

  return JSON.parse(response.getContentText());
}

/**
 * Send success notification email
 */
function sendSuccessNotification(eventData) {
  const subject = 'NSS Event Successfully Added to Website';
  const body = `
Hello,

A new NSS event has been successfully added to the website:

Event Title: ${eventData.title}
Date: ${eventData.date}
Type: ${eventData.stats.type}

The event is now live on the NSS website blog section.

Best regards,
NSS Website Integration System
  `;

  MailApp.sendEmail(NOTIFICATION_EMAIL, subject, body);
}

/**
 * Send error notification email
 */
function sendErrorNotification(eventData, error) {
  const subject = 'Error Adding NSS Event to Website';
  const body = `
Hello,

There was an error adding the NSS event to the website:

Error: ${error}

Please check the Google Apps Script logs for more details and try submitting the form again.

Best regards,
NSS Website Integration System
  `;

  MailApp.sendEmail(NOTIFICATION_EMAIL, subject, body);
}

/**
 * Test function to verify the integration works
 * Run this manually to test the setup
 */
function testIntegration() {
  const testEvent = {
    title: 'Test Event - Delete Me',
    date: '2024-01-01',
    summary: 'This is a test event created by the integration system',
    content: 'This is test content. You can delete this event after verifying the integration works.',
    image: '/api/placeholder/400/300',
    imageAlt: 'Test event image',
    stats: {
      type: 'Test',
      participants: 10,
      location: 'IIT Bhubaneswar',
      duration: '2 hours'
    },
    team: ['Test Coordinator'],
    tags: ['test', 'integration'],
    organizer: 'NSS IIT BBS',
    contact: 'test@iitbbs.ac.in'
  };

  const result = addEventToGitHub(testEvent);
  console.log('Test result:', result);

  if (result.success) {
    console.log('Integration test successful!');
  } else {
    console.error('Integration test failed:', result.error);
  }
}