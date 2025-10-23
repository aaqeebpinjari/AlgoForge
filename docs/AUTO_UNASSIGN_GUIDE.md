# Auto-Unassign Stale Issues - Implementation Guide

## Overview

This automation helps maintain project velocity by automatically unassigning contributors from issues when no progress is made within 7 days.

## How It Works

### 1. Daily Monitoring
- Runs every day at 12:00 UTC via GitHub Actions
- Can also be triggered manually from the Actions tab

### 2. Smart Detection Process
1. **Fetches all open issues** with assignees
2. **Checks assignment history** using GitHub Events API
3. **Searches for related PRs** using multiple strategies:
   - Direct issue number references (`#123`)
   - Closing keywords (`closes #123`, `fixes #123`, `resolves #123`)
   - Title matching between issues and PRs
4. **Evaluates timing**: Only considers issues assigned >7 days ago
5. **Preserves active work**: Skips issues with related PRs created after assignment

### 3. Gentle Unassignment
When an issue qualifies for unassignment:
- Removes all assignees from the issue
- Adds a friendly explanatory comment
- Provides clear instructions for reassignment
- Keeps the issue open and available

## Example Comment

```markdown
🕐 **Auto-unassignment Notice**

This issue has been automatically unassigned because:
- It was assigned more than 7 days ago (assigned on Sep 19, 2025)
- No pull request has been opened to address this issue

**What's next?**
- If you're still working on this issue, please comment below and reassign yourself
- If you've opened a PR for this issue, please reference this issue number in your PR description
- This issue remains open and available for new contributors

Thank you for your understanding! 🙏
```

## Configuration

The workflow can be easily customized by modifying these values in the YAML file:

```yaml
# Change the unassignment threshold (currently 7 days)
const DAYS_BEFORE_UNASSIGN = 7;

# Change the schedule (currently daily at 12:00 UTC)
cron: '0 12 * * *'
```

## Benefits

- **Maintains project velocity**: Prevents issues from being blocked indefinitely
- **Fair to contributors**: Provides clear communication and reassignment opportunities  
- **Respects active work**: Won't unassign if there's a related PR
- **Transparent process**: Detailed logging and clear notifications
- **Flexible timing**: Easy to adjust thresholds based on project needs

## Testing

The workflow has been tested with multiple scenarios:
- ✅ Stale issues without PRs (correctly unassigns)
- ✅ Stale issues with related PRs (correctly preserves)
- ✅ Recently assigned issues (correctly ignores)
- ✅ Edge cases (no assignment events, etc.)

## Monitoring

Check the Actions tab in GitHub to monitor workflow runs and troubleshoot any issues. The workflow provides detailed console output for each decision made.