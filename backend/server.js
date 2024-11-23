const path = require('path');
require('dotenv').config();
const express = require('express');
const sgMail = require('@sendgrid/mail');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Initialize SendGrid
try {
    if (!process.env.SENDGRID_API_KEY) {
        throw new Error('SendGrid API key is missing');
    }
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    console.log('SendGrid initialization successful');
} catch (error) {
    console.error('SendGrid initialization failed:', error.message);
    process.exit(1); // Exit if SendGrid isn't configured properly
}

// Middleware
app.use(cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    methods: ['POST', 'GET'],
    credentials: true
}));

app.use(bodyParser.json({ limit: '10kb' }));

// Request logging middleware
app.use((req, res, next) => {
    console.log(`\n=== ${new Date().toISOString()} ===`);
    console.log(`${req.method} ${req.path}`);
    console.log('Body:', JSON.stringify(req.body, null, 2));
    next();
});

// Health check endpoint
app.get('/health', (req, res) => {
    res.json({
        status: 'OK',
        timestamp: new Date(),
        environment: process.env.NODE_ENV,
        sendgridConfigured: !!process.env.SENDGRID_API_KEY
    });
});

// SendGrid test endpoint
app.get('/test-sendgrid', async (req, res) => {
    try {
        if (!process.env.VERIFIED_SENDER_EMAIL || !process.env.ADMIN_EMAIL) {
            throw new Error('Required email configuration is missing');
        }

        const msg = {
            to: process.env.ADMIN_EMAIL,
            from: {
                email: process.env.VERIFIED_SENDER_EMAIL,
                name: 'NSS IIT BBS System'
            },
            subject: 'SendGrid Test Email',
            text: 'This is a test email from your NSS application',
            html: `
                <div style="padding: 20px; background-color: #f5f5f5;">
                    <h2>SendGrid Test Email</h2>
                    <p>This is a test email sent at: ${new Date().toLocaleString()}</p>
                    <p>If you receive this, your email system is working correctly!</p>
                </div>
            `
        };

        const response = await sgMail.send(msg);
        
        res.json({
            success: true,
            message: 'Test email sent successfully',
            statusCode: response[0].statusCode
        });
    } catch (error) {
        console.error('Test email failed:', error);
        res.status(500).json({
            success: false,
            message: 'Test email failed',
            error: error.message
        });
    }
});

// Registration endpoint
app.post('/api/send-registration', async (req, res) => {
    try {
        const { to, subject, content } = req.body;

        // Validate request
        if (!to || !subject || !content) {
            return res.status(400).json({
                success: false,
                message: 'Missing required fields',
                details: {
                    required: ['to', 'subject', 'content'],
                    received: Object.keys(req.body)
                }
            });
        }

        // Prepare email with enhanced formatting
        const msg = {
            to: to,
            from: {
                email: process.env.VERIFIED_SENDER_EMAIL,
                name: 'NSS IIT BBS Registration'
            },
            subject: subject,
            text: content, // Plain text version
            html: `
                <div style="padding: 20px; background-color: #f5f5f5;">
                    <h2 style="color: #333;">NSS Volunteer Registration</h2>
                    <div style="background-color: white; padding: 15px; border-radius: 5px;">
                        ${content.replace(/\n/g, '<br>')}
                    </div>
                    <p style="color: #666; margin-top: 20px;">
                        Submitted on: ${new Date().toLocaleString()}
                    </p>
                </div>
            `
        };

        // Send email
        const response = await sgMail.send(msg);

        // Send success response
        res.status(200).json({
            success: true,
            message: 'Registration email sent successfully',
            details: {
                statusCode: response[0].statusCode,
                timestamp: new Date().toISOString()
            }
        });

    } catch (error) {
        console.error('Registration failed:', error);
        
        // Send error response
        res.status(500).json({
            success: false,
            message: 'Failed to send registration email',
            error: {
                message: error.message,
                code: error.code,
                details: process.env.NODE_ENV === 'development' ? error.response?.body : undefined
            }
        });
    }
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error('Unhandled error:', err);
    res.status(500).json({
        success: false,
        message: 'Internal server error',
        error: process.env.NODE_ENV === 'development' ? err.message : 'An unexpected error occurred'
    });
});

// Start server
const server = app.listen(PORT, () => {
    console.log(`\n=== Server Started ===`);
    console.log(`Server running on http://localhost:${PORT}`);
    console.log(`Environment: ${process.env.NODE_ENV}`);
    console.log(`CORS origin: ${process.env.FRONTEND_URL || 'http://localhost:3000'}`);
    console.log('===================\n');
});

// Handle server shutdown gracefully
process.on('SIGTERM', () => {
    console.log('SIGTERM received. Shutting down gracefully...');
    server.close(() => {
        console.log('Server closed');
        process.exit(0);
    });
});

process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});

process.on('uncaughtException', (error) => {
    console.error('Uncaught Exception:', error);
    server.close(() => {
        process.exit(1);
    });
});