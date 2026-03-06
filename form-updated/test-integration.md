# HighLevel Integration Test Checklist

## ✅ Pre-Test Setup
- [ ] Development server running on http://localhost:5173
- [ ] Environment variables configured in `.env`
- [ ] HighLevel Private Integration created
- [ ] Form displays correctly on the page

## 🧪 Test Cases

### 1. Form Validation Tests
- [ ] **Empty form submission** - Should show validation errors
- [ ] **Invalid email format** - Should show email validation error
- [ ] **Short name (1 character)** - Should show name length error
- [ ] **Long project details (>2000 chars)** - Should show length error
- [ ] **Invalid phone number** - Should show phone validation error
- [ ] **Missing consent checkbox** - Should show consent error

### 2. Successful Submission Tests
- [ ] **Valid form data** - Should submit successfully
- [ ] **Loading state** - Button should show spinner during submission
- [ ] **Success message** - Should display thank you message
- [ ] **Form reset** - Form should clear after successful submission
- [ ] **HighLevel contact creation** - Check HighLevel for new contact

### 3. Error Handling Tests
- [ ] **Invalid API token** - Should show API error message
- [ ] **Network failure** - Should handle network errors gracefully
- [ ] **Rate limiting** - Should handle rate limit responses

## 📝 Test Data

### Valid Test Contact
```
Name: John Doe
Email: john.doe@example.com
Phone: (555) 123-4567
Project Details: Need a 10x10 booth for upcoming trade show in Las Vegas. Budget is $5,000-$10,000. Event date is March 15, 2024.
Consent: ✓ Checked
```

### Invalid Test Cases
```
Name: J (too short)
Email: invalid-email (no @ or domain)
Phone: 123 (too short)
Project Details: [2000+ character string]
Consent: ✗ Unchecked
```

## 🔍 What to Check in HighLevel

After successful submission, verify in HighLevel:
- [ ] **Contact created** with correct name and email
- [ ] **Phone number** formatted correctly
- [ ] **Custom fields** populated:
  - `project_details` contains the form message
  - `lead_source` = "Form4Design Website"
  - `submission_date` has current timestamp
- [ ] **Tags applied**: "Website Lead", "React Form", "Quote Request"
- [ ] **Source** = "Custom React Form - Form4Design Website"

## 🐛 Common Issues to Watch For

### Frontend Issues
- [ ] TypeScript compilation errors
- [ ] Console errors in browser
- [ ] Form validation not working
- [ ] Loading states not displaying
- [ ] Success/error messages not showing

### API Integration Issues
- [ ] CORS errors (if using direct integration)
- [ ] 401 Unauthorized (invalid token)
- [ ] 400 Bad Request (invalid data format)
- [ ] 500 Server Error (HighLevel API issues)
- [ ] Network timeout errors

### HighLevel Issues
- [ ] Contact not created
- [ ] Missing custom fields
- [ ] Incorrect tags
- [ ] Duplicate contacts

## 📊 Success Criteria

The integration is successful if:
1. ✅ Form validates input correctly
2. ✅ Loading states work properly
3. ✅ Success/error messages display
4. ✅ Contact is created in HighLevel
5. ✅ All custom fields are populated
6. ✅ Tags are applied correctly
7. ✅ No console errors
8. ✅ Form resets after submission

## 🚀 Next Steps After Testing

If all tests pass:
1. **Update environment variables** with production credentials
2. **Deploy backend proxy** for production security
3. **Set up HighLevel workflows** for lead follow-up
4. **Configure email notifications** for new leads
5. **Add analytics tracking** for form conversions
