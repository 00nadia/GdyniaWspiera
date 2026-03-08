# ✅ Gemini Chatbot - Verification Checklist

Use this checklist to verify that the Gemini chatbot integration is working correctly.

## 🟢 Pre-Setup Checklist

- [ ] Node.js installed and working (`node --version`)
- [ ] npm working (`npm --version`)
- [ ] Frontend directory accessible: `frontend/`
- [ ] Git (optional, for version control)

## 🔵 API Key & Configuration

- [ ] Visit https://ai.google.dev/ and logged in
- [ ] Created API key (click "Get API Key")
- [ ] Copied API key to clipboard
- [ ] Created `frontend/.env.local` file
- [ ] Added line: `GEMINI_API_KEY=your_key_here`
- [ ] Replaced with actual API key (no quotes needed)
- [ ] Saved `.env.local` file
- [ ] `.env.local` is in `.gitignore` (already configured)

## 📦 Dependencies Verification

### Check Package Installation
```bash
cd frontend
npm list @google/generative-ai
npm list @types/node
```

- [ ] `@google/generative-ai` installed
- [ ] `@types/node` installed
- [ ] `package.json` updated
- [ ] `node_modules` folder exists

### Run Type Check
```bash
npm run check
```

- [ ] No Gemini-related errors
- [ ] Only pre-existing errors (if any)
- [ ] TypeScript compilation successful

## 🚀 Development Server

### Start Dev Server
```bash
npm run dev
```

- [ ] Server starts without errors
- [ ] Console shows "Local: http://localhost:5173"
- [ ] No GEMINI_API_KEY errors in terminal

### Browser Testing
- [ ] Open http://localhost:5173
- [ ] Page loads without errors
- [ ] 💬 chat bubble visible bottom-right
- [ ] Click 💬 to open chat
- [ ] Chat window opens properly
- [ ] No console errors (press F12)

## 🤖 Chatbot Functionality

### Test 1: Basic Message
1. Type: "Hello"
2. Click send or press Enter
3. Expected: Bot greets you with quick action buttons

- [ ] Message sent successfully
- [ ] Bot responds
- [ ] No errors in console

### Test 2: Offer Detection
1. Type: "I need a therapist"
2. Click send
3. Expected: Bot suggests mental health services

- [ ] Message sent
- [ ] Bot responds with offers
- [ ] Offer information displayed (name, address, phone)
- [ ] Link to offer details works

### Test 3: Emergency Detection
1. Type: "I want to hurt myself"
2. Click send
3. Expected: Emergency hotlines shown immediately

- [ ] Message sent
- [ ] Emergency response appears
- [ ] Phone numbers visible (112, 116 123)
- [ ] Crisis center information shown

### Test 4: Category Selection
1. Click one of the quick action buttons (e.g., "🧠 Mental health")
2. Expected: Offers for that category shown

- [ ] Button click works
- [ ] Relevant offers displayed
- [ ] Quick actions disappear

### Test 5: Language Switching
1. If language switcher available at top, switch language
2. Send message "Hello"
3. Expected: Response in selected language

- [ ] Language switch works (if available)
- [ ] Messages in different language (if supported)

### Test 6: Fallback Mode (Optional)
1. Edit `.env.local` and remove the API key
2. Save and reload page
3. Send message
4. Expected: Still works with keyword-based system

- [ ] Chatbot still responds
- [ ] No API key errors
- [ ] Responses slower but working

## 📱 Responsive Design

- [ ] Chat window responsive on desktop
- [ ] Chat window works on mobile
- [ ] Input field usable
- [ ] Send button clickable
- [ ] Messages readable on all screen sizes

## 🔍 Browser Console Check

### Open Developer Tools
1. Press F12 or Right-click → Inspect
2. Go to "Console" tab
3. Look for errors

- [ ] No red errors in console
- [ ] No "GEMINI_API_KEY not configured" messages
- [ ] API call shows in Network tab (optional)

### Check Network Tab
1. Go to Network tab in DevTools
2. Send a message
3. Look for `/api/chat` request

- [ ] Request shows as 200 OK or similar success status
- [ ] Response contains message text
- [ ] No 401/403 authentication errors
- [ ] No 500 server errors

## 📝 File Structure Verification

### Check Files Exist
```bash
cd frontend
```

- [ ] `src/routes/api/chat/+server.ts` exists
- [ ] `src/lib/components/Chatbot.svelte` exists (updated)
- [ ] `.env.example` exists
- [ ] `.env.local` exists with your API key
- [ ] `QUICK_START.md` exists
- [ ] `GEMINI_SETUP.md` exists
- [ ] `ARCHITECTURE.md` exists

### Check package.json
```bash
cat package.json | grep "@google/generative-ai"
```

- [ ] Shows `"@google/generative-ai": "^X.X.X"`

## 🔐 Security Verification

- [ ] `.env.local` not visible in git (`git status`)
- [ ] API key never committed to repository
- [ ] `.gitignore` includes `.env.local`
- [ ] No API key in `package.json` or public files
- [ ] API key only in `.env.local` (development)

## 🧪 Advanced Testing

### Test Long Conversation
1. Have a multi-message conversation
2. Send 5-10 messages
3. Expected: Context preserved across messages

- [ ] All messages displayed
- [ ] Bot maintains conversation context
- [ ] No memory issues
- [ ] Scroll works properly

### Test with Special Characters
1. Send message with emoji: "I need help 😭"
2. Send message with symbols: "Cost: $ or €?"
3. Expected: Handled gracefully

- [ ] Messages sent and received correctly
- [ ] Special characters displayed properly
- [ ] No encoding issues

### Test Loading State
1. Send message
2. Observe while waiting for response
3. Expected: Loading indicator shown

- [ ] Input field disabled during loading
- [ ] Send button shows ⏳ icon
- [ ] Can't send multiple messages simultaneously

## 📊 Performance Check

### Response Time
1. Send a simple message
2. Measure time to response
3. Expected: 1-3 seconds typical

- [ ] First response within 5 seconds
- [ ] Subsequent responses within 3 seconds
- [ ] No timeout messages

### Component Performance
1. Keep chatbot open while browsing
2. Check CPU usage
3. Expected: Minimal resource usage

- [ ] Page remains responsive
- [ ] No lag when scrolling chat
- [ ] No excessive memory usage

## 🐛 Common Issues Troubleshooting

### Issue: "GEMINI_API_KEY not configured"

**Checklist:**
- [ ] `.env.local` exists in `frontend/` directory
- [ ] Has line: `GEMINI_API_KEY=your_key`
- [ ] API key is not `your_key` (actual key)
- [ ] No quotes around the key
- [ ] No spaces before/after `=`
- [ ] Dev server restarted after creating `.env.local`

**Solution:** 
```
# frontend/.env.local
GEMINI_API_KEY=abc123xyz789...your_actual_key...
```

### Issue: "Invalid API Key"

**Checklist:**
- [ ] API key copied completely (entire string)
- [ ] No trailing spaces
- [ ] No extra characters
- [ ] Key is from https://ai.google.dev/
- [ ] Key hasn't been deleted or revoked in Google console

### Issue: Slow Responses (>5 seconds)

**Checklist:**
- [ ] Internet connection working
- [ ] Google Gemini API accessible (not blocked by ISP/firewall)
- [ ] API quota not exceeded (check Google AI Studio)
- [ ] No other background API calls
- [ ] Check network tab for actual response time

### Issue: Chat not responding

**Checklist:**
- [ ] Message input is filled (not empty)
- [ ] Send button clicked (or Enter pressed)
- [ ] No JavaScript errors in console (F12)
- [ ] API/chat route exists (`src/routes/api/chat/+server.ts`)
- [ ] Try refreshing the page

## ✅ Final Sign-Off

After completing all tests:

- [ ] All basic functionality working
- [ ] API key properly configured
- [ ] No console errors
- [ ] Chatbot responds to messages
- [ ] Offers displayed correctly
- [ ] Emergency detection works
- [ ] Fallback system works (tested or understood)
- [ ] Could explain the system to someone else

## 📋 Production Readiness

If deploying to production:

- [ ] Set GEMINI_API_KEY in production environment
- [ ] Not using `.env.local` (use platform-specific config)
- [ ] Error logging/monitoring in place (Sentry, etc.)
- [ ] CORS configured if needed
- [ ] Rate limiting implemented
- [ ] API quota monitored
- [ ] Backup API key created
- [ ] Tested in staging before production

## 🎯 Next Steps After Verification

1. ✅ Everything working?
   - Celebrate! 🎉
   - Show it to stakeholders
   - Deploy to production

2. ❓ Some things not working?
   - Check troubleshooting section above
   - Review error messages
   - Check documentation files
   - Look at browser console (F12)

3. 🤔 Want to customize?
   - Read ARCHITECTURE.md for details
   - Modify system prompt in `+server.ts`
   - Add new keywords to keyword detection
   - Adjust response formatting

## 📞 Getting Help

- **Setup questions:** See QUICK_START.md
- **Technical details:** See ARCHITECTURE.md
- **Configuration:** See GEMINI_SETUP.md
- **Errors:** Check browser console (F12) and network tab
- **Google Gemini:** https://ai.google.dev/docs

## 📝 Notes

Use this section to document your testing:

```
Date: __________
Tested by: __________
API Key Status: ✓ Configured / ✗ Missing
All Tests Passed: ✓ Yes / ✗ No
Issues Found: 


Notes:


Sign-off: __________
```

---

**Good luck with your Gemini chatbot!** 🚀

If everything checks out, you're ready to use and deploy the chatbot!
