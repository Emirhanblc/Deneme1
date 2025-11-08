# Quick Start: Update Your Site Information

After the cleanup and UX improvements, there's **ONE file** you need to update with your real information.

## Single File to Update: `lib/siteConfig.ts`

Open `lib/siteConfig.ts` and replace these TODO values:

### 1. Contact Information

```typescript
contact: {
  email: 'your.real.email@example.com', // ← Replace with your real email
  linkedin: 'https://www.linkedin.com/in/yourprofile', // ← Replace with your LinkedIn
  github: 'https://github.com/yourusername', // ← Replace with your GitHub username
},
```

### 2. Project Repository URLs

```typescript
projects: {
  kubernetesMonitoring: 'https://github.com/yourusername/kubernetes-monitoring', // ← Replace
  vmwareBackup: 'https://github.com/yourusername/vmware-backup', // ← Replace
  firewallManager: 'https://github.com/yourusername/firewall-manager', // ← Replace
},
```

## What Happens After You Update?

Once you replace these values:

### Your GitHub Links Will Appear:

- ✅ Home page "Side Project" section will show the GitHub button
- ✅ Projects page will show GitHub buttons for each project
- ✅ Projects page footer will show your GitHub profile link

### Your Contact Links Are Ready:

- Email, LinkedIn, and GitHub values are centralized
- Any component importing from `lib/contactInfo.ts` will automatically use your new values

## That's It!

The system is smart:

- **Before you update**: Placeholder links are hidden automatically
- **After you update**: Real links appear automatically

No need to edit multiple files. Everything is centralized in `lib/siteConfig.ts`.

---

## Optional: Environment Variables

The `.env.local` file was created with dummy values to allow builds.

If you're deploying to production, update these in your hosting environment:

- `NEXTAUTH_SECRET`
- `DATABASE_URL`
- Stripe keys (if using Stripe)

For local development, you can update `.env.local` with your real values.
