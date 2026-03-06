const express = require('express');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

// Security middleware
app.use(helmet());
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true
}));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // limit each IP to 10 requests per windowMs
  message: 'Too many form submissions, please try again later.'
});

app.use('/api/', limiter);
app.use(express.json({ limit: '10mb' }));

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// HighLevel contact creation endpoint
app.post('/api/contacts', async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      fullName,
      email,
      phone,
      projectDetails,
      customFields
    } = req.body;

    // Validate required fields
    if (!firstName || !email) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields: firstName and email are required'
      });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid email format'
      });
    }

    // Get HighLevel credentials from environment
    const token = process.env.HIGHLEVEL_TOKEN;
    const locationId = process.env.HIGHLEVEL_LOCATION_ID;

    if (!token || !locationId) {
      console.error('Missing HighLevel credentials');
      return res.status(500).json({
        success: false,
        error: 'Server configuration error'
      });
    }

    // Prepare payload for HighLevel API
    const payload = {
      firstName,
      lastName: lastName || '',
      name: fullName || `${firstName} ${lastName || ''}`.trim(),
      email,
      phone: phone || '',
      locationId,
      customFields: [
        ...(customFields || []),
        ...(projectDetails ? [{
          key: 'project_details',
          field_value: projectDetails
        }] : []),
        {
          key: 'lead_source',
          field_value: 'Form4Design Website'
        },
        {
          key: 'submission_date',
          field_value: new Date().toISOString()
        }
      ],
      tags: ['Website Lead', 'Form4Design', 'Quote Request'],
      source: 'Form4Design Website - Backend Proxy'
    };

    console.log('Creating contact in HighLevel:', {
      ...payload,
      locationId: '[REDACTED]'
    });

    // Make request to HighLevel API
    const response = await fetch('https://services.leadconnectorhq.com/contacts/', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
        'Version': '2021-07-28',
        'Accept': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error('HighLevel API Error:', {
        status: response.status,
        statusText: response.statusText,
        error: errorData
      });

      return res.status(response.status).json({
        success: false,
        error: errorData.message || `HighLevel API error: ${response.statusText}`
      });
    }

    const result = await response.json();
    console.log('Contact created successfully:', result.contact?.id || 'Unknown ID');

    res.json({
      success: true,
      contact: result.contact || result,
      message: 'Contact created successfully'
    });

  } catch (error) {
    console.error('Server error:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({
    success: false,
    error: 'Internal server error'
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    error: 'Endpoint not found'
  });
});

app.listen(PORT, () => {
  console.log(`HighLevel proxy server running on port ${PORT}`);
  console.log(`Health check: http://localhost:${PORT}/health`);
});
