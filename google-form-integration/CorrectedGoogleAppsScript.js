/**
 * Corrected Google Apps Script for NSS Website Blog Post Integration
 * This script removes team, contact, and tags fields and fixes the deletion issue
 */

// Configuration - Replace these with your actual values
const GITHUB_TOKEN = 'your_github_personal_access_token_here';
const GITHUB_REPO = 'your_username/NSS-website';
const GITHUB_FILE_PATH = 'backend/blogPosts.js';
const NOTIFICATION_EMAIL = 'your-email@example.com';

/**
 * Main function triggered when form is submitted
 */
function onFormSubmit(e) {
  try {
    console.log('=== Form Submission Started ===');
    console.log('Event object:', JSON.stringify(e, null, 2));

    // Enhanced response handling
    let responses;
    if (e && e.values) {
      responses = e.values;
    } else if (e && e.namedValues) {
      // Convert named values to indexed array
      responses = Object.values(e.namedValues).map(arr => arr[0]);
    } else {
      throw new Error('No valid form responses found in event object');
    }

    console.log('Raw responses array:', responses);
    console.log('Response count:', responses ? responses.length : 0);

    // Validate we have minimum required responses (reduced to 11 after removing team, contact, tags)
    if (!responses || responses.length < 5) {
      throw new Error(`Insufficient form responses. Got ${responses ? responses.length : 0}, need at least 5`);
    }

    // Parse form responses with enhanced error handling
    const eventData = parseFormResponsesWithValidation(responses);
    console.log('Parsed event data:', JSON.stringify(eventData, null, 2));

    // Add the event to GitHub (with proper merging, not overwriting)
    const result = addEventToGitHub(eventData);

    if (result.success) {
      console.log('=== Success: Event added to GitHub ===');
      sendSuccessNotification(eventData);
    } else {
      throw new Error(result.error);
    }

  } catch (error) {
    console.error('=== Error in onFormSubmit ===');
    console.error('Error name:', error.name);
    console.error('Error message:', error.message);
    console.error('Error stack:', error.stack);

    sendErrorNotification(null, error.toString());

    // Re-throw to ensure it shows up in execution logs
    throw error;
  }
}

/**
 * Enhanced form response parsing with validation (removed team, contact, tags)
 */
function parseFormResponsesWithValidation(responses) {
  console.log('Parsing responses...');

  // Helper function with enhanced error handling
  function getResponseValue(index, fieldName, fallback, required = false) {
    try {
      let value = fallback;

      if (responses && responses.length > index) {
        const rawValue = responses[index];
        if (rawValue !== undefined && rawValue !== null && rawValue !== '') {
          value = rawValue.toString().trim();
        }
      }

      console.log(`Field ${fieldName} (index ${index}): "${value}"`);

      if (required && (!value || value === fallback)) {
        throw new Error(`Required field "${fieldName}" is missing or empty`);
      }

      return value || fallback;
    } catch (error) {
      console.error(`Error processing field ${fieldName}:`, error);
      if (required) throw error;
      return fallback;
    }
  }

  // Parse with field validation (REMOVED team, tags, contact fields)
  const eventData = {
    title: getResponseValue(1, 'Event Title', 'Untitled Event', true),
    date: getResponseValue(2, 'Event Date', new Date().toISOString().split('T')[0], true),
    summary: getResponseValue(3, 'Event Summary', 'Event summary not provided', true),
    content: getResponseValue(4, 'Event Content', 'Event details not provided', true),
    image: getResponseValue(5, 'Image URL', '/api/placeholder/400/300'),
    imageAlt: getResponseValue(6, 'Image Alt Text', 'Event image'),
    stats: {
      type: getResponseValue(7, 'Event Type', 'Community Service'),
      participants: parseNumber(getResponseValue(8, 'Participants', '0')),
      location: getResponseValue(9, 'Location', 'IIT Bhubaneswar'),
      duration: getResponseValue(10, 'Duration', 'Full Day')
    },
    // REMOVED: team, tags, contact fields
    team: [], // Empty array instead of form data
    tags: [], // Empty array instead of form data
    organizer: 'NSS IIT BBS', // Fixed value
    contact: 'nss@iitbbs.ac.in' // Fixed value
  };

  // Additional validation
  if (!eventData.title || eventData.title === 'Untitled Event') {
    throw new Error('Event title is required');
  }

  console.log('Event data parsed successfully');
  return eventData;
}

/**
 * Parse number with error handling
 */
function parseNumber(value) {
  const num = parseInt(value);
  return isNaN(num) ? 0 : num;
}

/**
 * Add event to GitHub with PROPER MERGING (fixed the deletion bug)
 */
function addEventToGitHub(eventData) {
  try {
    console.log('Starting GitHub integration...');

    // Validate GitHub configuration
    if (!GITHUB_TOKEN || GITHUB_TOKEN === 'your_github_personal_access_token_here') {
      throw new Error('GitHub token not configured');
    }

    if (!GITHUB_REPO || GITHUB_REPO === 'your_username/NSS-website') {
      throw new Error('GitHub repository not configured');
    }

    console.log(`Accessing repository: ${GITHUB_REPO}`);
    console.log(`File path: ${GITHUB_FILE_PATH}`);

    // Get current file content
    const currentContent = getCurrentFileContentWithRetry();
    console.log('Retrieved current file content, length:', currentContent.length);

    // Parse current content with BETTER ERROR HANDLING
    let blogPosts = parseCurrentContent(currentContent);
    console.log('Current blog posts count:', blogPosts.length);

    // IMPORTANT: Add new event at the beginning but PRESERVE existing posts
    blogPosts.unshift(eventData);
    console.log('Added new event, total posts:', blogPosts.length);

    // Generate new file content with proper header
    const newContent = generateFileContent(blogPosts);
    console.log('Generated new content, length:', newContent.length);

    // Upload to GitHub
    const uploadResult = uploadToGitHubWithRetry(newContent);
    console.log('Upload successful:', uploadResult.commit ? 'Yes' : 'No');

    return { success: true, data: uploadResult };

  } catch (error) {
    console.error('GitHub integration error:', error);
    return { success: false, error: error.toString() };
  }
}

/**
 * IMPROVED: Parse current file content with better error handling
 */
function parseCurrentContent(content) {
  try {
    console.log('Attempting to parse existing blog posts...');
    
    // Remove comments and extract the module.exports array
    const cleanContent = content.replace(/\/\/.*$/gm, '').replace(/\/\*[\s\S]*?\*\//g, '');
    
    // Try multiple patterns to extract the array
    const patterns = [
      /module\.exports\s*=\s*(\[[\s\S]*?\]);?\s*$/,
      /module\.exports\s*=\s*(\[[\s\S]*\])/,
      /exports\s*=\s*(\[[\s\S]*\])/,
      /=\s*(\[[\s\S]*\])\s*;?\s*$/
    ];

    for (let pattern of patterns) {
      const match = cleanContent.match(pattern);
      if (match) {
        console.log('Found array pattern, parsing...');
        const parsed = JSON.parse(match[1]);
        console.log(`Successfully parsed ${parsed.length} existing blog posts`);
        return Array.isArray(parsed) ? parsed : [];
      }
    }

    console.log('No existing blog posts found, starting with empty array');
    return [];

  } catch (parseError) {
    console.log('Error parsing existing content:', parseError.message);
    console.log('Content preview:', content.substring(0, 200) + '...');
    console.log('Starting with empty array');
    return [];
  }
}

/**
 * Get current file content with retry logic
 */
function getCurrentFileContentWithRetry(maxRetries = 3) {
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      return getCurrentFileContent();
    } catch (error) {
      console.log(`Attempt ${attempt} failed:`, error.message);
      if (attempt === maxRetries) throw error;
      Utilities.sleep(1000 * attempt); // Progressive delay
    }
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
    console.log('File does not exist, will create new');
    return 'module.exports = [];';
  }

  if (response.getResponseCode() !== 200) {
    throw new Error(`GitHub API error: ${response.getResponseCode()} - ${response.getContentText()}`);
  }

  const data = JSON.parse(response.getContentText());
  return Utilities.newBlob(Utilities.base64Decode(data.content)).getDataAsString();
}

/**
 * Upload to GitHub with retry logic
 */
function uploadToGitHubWithRetry(content, maxRetries = 3) {
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      return uploadToGitHub(content);
    } catch (error) {
      console.log(`Upload attempt ${attempt} failed:`, error.message);
      if (attempt === maxRetries) throw error;
      Utilities.sleep(1000 * attempt); // Progressive delay
    }
  }
}

/**
 * Generate new file content with proper formatting
 */
function generateFileContent(blogPosts) {
  const timestamp = new Date().toISOString();
  return `// Auto-generated blog posts file
// Last updated: ${timestamp}
// Total posts: ${blogPosts.length}
// Generated by: NSS Website Google Form Integration

module.exports = ${JSON.stringify(blogPosts, null, 2)};
`;
}

/**
 * Upload updated content to GitHub
 */
function uploadToGitHub(content) {
  // Get current file SHA
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
      console.log('Got existing file SHA:', sha.substring(0, 8) + '...');
    }
  } catch (error) {
    console.log('Could not get existing file SHA (might be new file):', error.message);
  }

  // Prepare upload payload
  const timestamp = new Date().toLocaleString();
  const payload = {
    message: `Add new NSS event: "${timestamp}" via Google Form`,
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

  const responseCode = response.getResponseCode();
  const responseText = response.getContentText();

  if (responseCode !== 200 && responseCode !== 201) {
    throw new Error(`GitHub upload failed: ${responseCode} - ${responseText}`);
  }

  return JSON.parse(responseText);
}

/**
 * Enhanced success notification
 */
function sendSuccessNotification(eventData) {
  try {
    const subject = `✅ NSS Event Successfully Added: "${eventData.title}"`;
    const body = `
Hello,

A new NSS event has been successfully added to the website:

📅 Event Title: ${eventData.title}
📍 Date: ${eventData.date}
🏷️ Type: ${eventData.stats.type}
👥 Participants: ${eventData.stats.participants}
📍 Location: ${eventData.stats.location}

The event is now live on the NSS website blog section and will appear automatically.

Best regards,
NSS Website Integration System
    `;

    MailApp.sendEmail(NOTIFICATION_EMAIL, subject, body);
  } catch (error) {
    console.error('Failed to send success notification:', error);
  }
}

/**
 * Enhanced error notification
 */
function sendErrorNotification(eventData, error) {
  try {
    const subject = '❌ Error Adding NSS Event to Website';
    const body = `
Hello,

There was an error adding the NSS event to the website:

🚨 Error Details:
${error}

🔧 Troubleshooting Steps:
1. Check that all required form fields are filled
2. Verify GitHub token and repository configuration
3. Review the Google Apps Script execution logs
4. Try submitting the form again

📋 Debug Information:
- Timestamp: ${new Date().toISOString()}
- Event Data: ${eventData ? JSON.stringify(eventData, null, 2) : 'Not available'}

Please check the Google Apps Script logs for more details.

Best regards,
NSS Website Integration System
    `;

    MailApp.sendEmail(NOTIFICATION_EMAIL, subject, body);
  } catch (mailError) {
    console.error('Failed to send error notification:', mailError);
  }
}