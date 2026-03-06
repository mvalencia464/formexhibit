# Image Upload Experiment - HighLevel Media Library Integration

**Status**: 🧪 EXPERIMENTAL - Testing image upload to HighLevel media library

## What We're Testing

### New Features Added:
1. **Image Upload Field** - Optional project image upload in the form
2. **Media Library Integration** - Upload images to HighLevel's media library
3. **Image URL Storage** - Store uploaded image URL in contact custom fields
4. **File Validation** - Validate image type and size before upload

### Technical Implementation:
- **API Endpoint**: `POST /medias/upload-file`
- **Required Scope**: `medias.write` (needs to be added to Private Integration)
- **File Types**: JPEG, PNG, GIF, WebP
- **Max Size**: 10MB
- **Storage**: Image URL saved as custom field `project_image_url`

## Testing Steps

### 1. Update HighLevel Private Integration Scopes
**IMPORTANT**: You need to add the media scope to your existing integration:

1. Go to Settings → Other Settings → Private Integrations
2. Edit your "Form4Design Website" integration
3. Add the scope: `medias.write`
4. Save the integration

### 2. Test Image Upload
1. **Visit the form**: http://localhost:5173
2. **Scroll to the new "Project Image" section**
3. **Upload a test image**:
   - Click the upload area
   - Select a small image file (< 5MB recommended for testing)
   - Verify the file preview appears
4. **Fill out the rest of the form** with test data
5. **Submit the form**

### 3. Expected Behavior
**If Successful:**
- ✅ Loading spinner shows during upload
- ✅ Success message appears
- ✅ Contact created in HighLevel
- ✅ Image appears in HighLevel Media Library
- ✅ Contact has custom field `project_image_url` with image URL

**If Failed:**
- ❌ Error message about media upload
- ❌ Contact may still be created (without image)
- ❌ Console shows API error details

## Potential Issues

### 1. Scope Permission Error
```
Error: Failed to upload file to HighLevel: Insufficient permissions
```
**Solution**: Add `medias.write` scope to Private Integration

### 2. API Endpoint Not Found
```
Error: Failed to upload file to HighLevel: HTTP 404: Not Found
```
**Possible Causes**:
- Media upload API not available in your HighLevel plan
- Endpoint URL incorrect
- API version incompatibility

### 3. File Size/Type Error
```
Error: Please upload a valid image file (JPEG, PNG, GIF, or WebP)
```
**Solution**: Use supported file types under 10MB

## Fallback Strategy

**If image upload doesn't work:**
1. The form will still create contacts successfully
2. Only the image upload will fail
3. Contact creation continues normally
4. We can revert to the working checkpoint

## Revert Instructions

**If experiment fails, revert using:**

```bash
# Restore working QuoteForm
git checkout HEAD~1 -- src/components/QuoteForm.tsx

# Restore working useHighLevel hook  
git checkout HEAD~1 -- src/hooks/useHighLevel.ts

# Restore working validation
git checkout HEAD~1 -- src/utils/formValidation.ts

# Restart dev server
npm run dev
```

**Or manually restore from checkpoint:**
- Copy files from `CHECKPOINT_WORKING_INTEGRATION.md`
- Remove image upload UI and logic
- Test basic contact creation still works

## Success Criteria

**Experiment is successful if:**
1. ✅ Image uploads to HighLevel media library
2. ✅ Image URL is stored in contact custom field
3. ✅ Contact creation still works reliably
4. ✅ Form validation handles image errors properly
5. ✅ No breaking changes to existing functionality

**Experiment should be reverted if:**
1. ❌ Image upload consistently fails
2. ❌ Contact creation is broken
3. ❌ Form becomes unreliable
4. ❌ API errors prevent form submission

## Next Steps

**If successful:**
- Document the working image upload configuration
- Add image preview in HighLevel contact view
- Consider adding multiple image support
- Update production deployment guide

**If unsuccessful:**
- Revert to working checkpoint
- Document what didn't work
- Consider alternative approaches (base64 encoding, external storage)
- Focus on core contact creation functionality
