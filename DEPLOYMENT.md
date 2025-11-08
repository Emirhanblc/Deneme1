# Deployment Guide for Next.js + Prisma + Stripe

This guide covers deploying your Next.js application with Prisma and Stripe integration to Vercel or Render.

## Prerequisites

- PostgreSQL database (hosted on Vercel Postgres, Render, Supabase, or similar)
- Stripe account with API keys
- NextAuth configuration

## Environment Variables

Set the following environment variables in your deployment platform:

### Required Variables

```env
# Database
DATABASE_URL=postgresql://user:password@host:port/database?schema=public

# NextAuth
NEXTAUTH_SECRET=your-secret-key-here
NEXTAUTH_URL=https://your-domain.com

# Stripe
STRIPE_SECRET_KEY=sk_live_... or sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...

# Stripe Price IDs (optional, but required for checkout)
STRIPE_MONTHLY_PRICE_ID=price_...
STRIPE_ANNUAL_PRICE_ID=price_...
STRIPE_LIFETIME_PRICE_ID=price_...

# OAuth Providers (optional)
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
GITHUB_CLIENT_ID=your-github-client-id
GITHUB_CLIENT_SECRET=your-github-client-secret
```

## Deployment Steps

### Vercel

1. **Connect your repository** to Vercel
2. **Set environment variables** in Vercel Dashboard:
   - Go to Project Settings → Environment Variables
   - Add all required variables listed above
   - Ensure they're set for Production, Preview, and Development environments as needed
3. **Configure build settings**:
   - Build Command: `npm run build` (already configured in package.json)
   - Output Directory: `.next` (default)
   - Install Command: `npm install` (default)
4. **Deploy**: Vercel will automatically run `postinstall` script which generates Prisma client

### Render

1. **Create a new Web Service** in Render
2. **Connect your repository**
3. **Set environment variables** in Render Dashboard
4. **Configure build settings**:
   - Build Command: `npm run build`
   - Start Command: `npm start`
5. **Add PostgreSQL database**:
   - Create a new PostgreSQL database in Render
   - Copy the internal database URL
   - Set `DATABASE_URL` environment variable
6. **Run database migrations**:
   - Add a build script or use Render's post-deploy hook:
     ```bash
     npx prisma migrate deploy
     ```

## Database Setup

### Running Migrations

After deploying, run Prisma migrations to set up your database schema:

```bash
# For production
npx prisma migrate deploy

# Or for development
npx prisma migrate dev
```

### Generating Prisma Client

The `postinstall` script in `package.json` automatically runs `prisma generate` after `npm install`, ensuring the Prisma client is always generated during builds.

## Stripe Webhook Configuration

1. **Create a webhook endpoint** in Stripe Dashboard:
   - URL: `https://your-domain.com/api/webhooks/stripe`
   - Events to listen for:
     - `checkout.session.completed`
     - `customer.subscription.updated`
     - `customer.subscription.deleted`
     - `invoice.payment_succeeded`
     - `invoice.payment_failed`

2. **Copy the webhook signing secret** and set it as `STRIPE_WEBHOOK_SECRET` in your environment variables

## Troubleshooting

### "Prisma client not initialized" error

- Ensure `DATABASE_URL` is set correctly
- Verify `postinstall` script runs: Check build logs for `prisma generate` output
- Manually run `npx prisma generate` if needed

### Build errors on Vercel

- Check that all environment variables are set in Vercel Dashboard
- Verify `DATABASE_URL` is accessible from Vercel's build environment
- Ensure Prisma schema is valid: `npx prisma validate`

### Stripe webhook errors

- Verify `STRIPE_WEBHOOK_SECRET` matches the webhook endpoint secret in Stripe Dashboard
- Check that the webhook URL is correctly configured
- Ensure the webhook route is using Node.js runtime (configured in `route.ts`)

### Database connection errors

- Verify `DATABASE_URL` is correct and accessible
- Check database firewall settings (allow connections from Vercel/Render IPs)
- For Render, use the internal database URL for better performance

## Post-Deployment Checklist

- [ ] All environment variables are set
- [ ] Database migrations are run
- [ ] Prisma client is generated (automatic via postinstall)
- [ ] Stripe webhook endpoint is configured
- [ ] Test authentication flow
- [ ] Test Stripe checkout flow
- [ ] Verify webhook events are being received

## Notes

- The application uses Node.js runtime for API routes (required for Prisma)
- Prisma client is automatically generated via `postinstall` script
- Build script includes `prisma generate` to ensure client is available during build
- Environment variables are validated at runtime with helpful error messages

