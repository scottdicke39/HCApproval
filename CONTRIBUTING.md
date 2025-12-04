# Contributing to HC Approval

Thank you for your interest in contributing! This guide will help you get started.

---

## 🚀 Quick Start

1. **Fork the repository**
   ```bash
   git clone https://github.com/your-username/HCApproval.git
   cd HCApproval
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp env.example .env
   # Edit .env with your test credentials
   ```

4. **Create a branch**
   ```bash
   git checkout -b your-name/feature-name
   # Example: git checkout -b jane/add-csv-validation
   ```

5. **Make your changes**

6. **Test your changes**
   ```bash
   npm run build
   npm run dev  # Run in development mode
   ```

7. **Commit and push**
   ```bash
   git add .
   git commit -m "Add: Description of your changes"
   git push origin your-name/feature-name
   ```

8. **Create a Pull Request**
   - Go to the GitHub repository
   - Click "New Pull Request"
   - Fill out the PR template
   - Request review

---

## ✅ What You Can Contribute

### Code Contributions
- ✅ Bug fixes
- ✅ New features
- ✅ Performance improvements
- ✅ Documentation updates
- ✅ Test coverage

### Documentation
- ✅ Setup guides
- ✅ API documentation
- ✅ User guides
- ✅ Code examples

### Examples
- ✅ Example integrations
- ✅ Sample configurations
- ✅ Use case demonstrations

---

## 📝 Code Style

### TypeScript
- Use TypeScript for all new code
- Follow existing code style
- Use meaningful variable names
- Add JSDoc comments for public functions

### Formatting
- Use 2 spaces for indentation
- Use single quotes for strings
- Add trailing commas in objects/arrays
- Use semicolons

### Example:
```typescript
/**
 * Creates a Linear issue for a headcount request
 */
export async function createHeadcountIssue(
  params: IssueParams
): Promise<LinearIssue> {
  // Implementation
}
```

---

## 🧪 Testing

### Before Submitting
- ✅ Test your changes locally
- ✅ Verify no TypeScript errors (`npm run build`)
- ✅ Test with sample data
- ✅ Check that webhooks work correctly

### Manual Testing Checklist
- [ ] Slack command works
- [ ] Linear issue created correctly
- [ ] Webhook handlers respond properly
- [ ] Error handling works
- [ ] No console errors

---

## 📋 Pull Request Guidelines

### PR Title Format
- `Add: Feature name` - New features
- `Fix: Bug description` - Bug fixes
- `Update: What changed` - Updates to existing features
- `Docs: Documentation update` - Documentation only

### PR Description Template
```markdown
## What Changed
- Description of changes

## Why
- Reason for the change

## Testing
- How you tested the changes

## Screenshots (if applicable)
- Add screenshots for UI changes
```

---

## 🐛 Reporting Bugs

### Before Reporting
- Check existing issues
- Verify it's not already fixed
- Test with latest version

### Bug Report Template
```markdown
## Description
Clear description of the bug

## Steps to Reproduce
1. Step one
2. Step two
3. Step three

## Expected Behavior
What should happen

## Actual Behavior
What actually happens

## Environment
- Node.js version:
- OS:
- Version:

## Logs
Relevant error messages or logs
```

---

## 💡 Feature Requests

### Before Requesting
- Check if feature already exists
- Search existing issues
- Consider if it fits the project scope

### Feature Request Template
```markdown
## Feature Description
Clear description of the feature

## Use Case
Why this feature would be useful

## Proposed Solution
How you think it should work

## Alternatives Considered
Other approaches you've thought about
```

---

## 🔒 Security

### Important Guidelines
- ❌ **Never commit secrets or API keys**
- ❌ **Never commit `.env` files**
- ✅ **Use environment variables for all secrets**
- ✅ **Sanitize any example data**
- ✅ **Report security issues privately**

### Reporting Security Issues
If you find a security vulnerability, please:
1. **Do NOT** open a public issue
2. Email the maintainer directly
3. Include steps to reproduce
4. Wait for confirmation before disclosing

---

## 📚 Documentation

### When to Update Docs
- ✅ Adding new features
- ✅ Changing existing behavior
- ✅ Fixing bugs that affect usage
- ✅ Adding new environment variables

### Documentation Style
- Use clear, concise language
- Include code examples
- Add screenshots for UI changes
- Keep setup guides up to date

---

## 🎯 Project Goals

### What We're Building
- Automated headcount approval workflows
- Beautiful, professional Linear issue formatting
- Multiple submission methods (Slack, Glean, CSV)
- Smart automation and routing

### What We're NOT Building
- Full ATS replacement
- HRIS system
- Payroll system

---

## 🤝 Code of Conduct

### Be Respectful
- Use welcoming and inclusive language
- Be respectful of differing viewpoints
- Gracefully accept constructive criticism
- Focus on what is best for the community

### Be Professional
- Keep discussions professional
- No personal attacks
- No harassment of any kind
- Help others learn and grow

---

## 📞 Getting Help

### Resources
- **Documentation:** Check `docs/` folder
- **Examples:** Check `examples/` folder
- **Issues:** Search existing GitHub issues
- **Discussions:** Use GitHub Discussions

### Questions?
- Open a GitHub Discussion
- Ask in an issue (tagged as "question")
- Check existing documentation first

---

## 🙏 Thank You!

Your contributions make this project better for everyone. Thank you for taking the time to contribute!

---

**Happy coding! 🚀**
