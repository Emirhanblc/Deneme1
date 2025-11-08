# Deployment Fixes Applied

This document summarizes the fixes applied to resolve deployment issues on Vercel/Render.

## Issues Fixed

### 1. Prisma Client Not Initialized
**Problem**: Prisma client was not being generated during build time.

**Solution**:
- Added `postinstall` script to `package.json` to automatically run `prisma generate` after `npm install`
- Updated build script to include `prisma generate` before `next build`
- Improved Prisma client initialization in `lib/prisma.ts` with better error handling

### 2. Stripe Webhook Build Errors
**Problem**: Webhook route was failing during build with "Prisma client not initialized" error.

**Solution**:
- Configured webhook route to use Node.js runtime (not Edge runtime) - Prisma requires Node.js
- Added `export const runtime = 'nodejs'` to `app/api/webhooks/stripe/route.ts`
- Added `export const dynamic = 'force-dynamic'` to ensure proper webhook handling
- Added environment variable validation in webhook route

### 3. Import Order Issues
**Problem**: Prisma import was at the bottom of `lib/stripe.ts`, causing initialization issues.

**Solution**:
- Moved Prisma import to the top of the file
- Fixed import order to ensure proper initialization sequence

### 4. Environment Variable Validation
**Problem**: Missing environment variables were causing runtime errors without clear error messages.

**Solution**:
- Added environment variable validation in `lib/auth.ts` for `NEXTAUTH_SECRET`
- Added environment variable validation in `lib/stripe.ts` for `STRIPE_SECRET_KEY`
- Added runtime validation in webhook route for both `STRIPE_SECRET_KEY` and `STRIPE_WEBHOOK_SECRET`
- Added helpful error messages when environment variables are missing

### 5. Runtime Configuration
**Problem**: API routes using Prisma need Node.js runtime, but were defaulting to Edge runtime.

**Solution**:
- Added `export const runtime = 'nodejs'` to all API routes that use Prisma:
  - `app/api/webhooks/stripe/route.ts`
  - `app/api/stripe/checkout/route.ts`
  - `app/api/dashboard/route.ts`
  - `app/api/auth/[...nextauth]/route.ts`

## Files Modified

1. **package.json**
   - Added `postinstall` script: `prisma generate`
   - Updated `build` script: `prisma generate && next build`

2. **lib/prisma.ts**
   - Improved Prisma client initialization
   - Added better logging configuration

3. **lib/stripe.ts**
   - Fixed import order (moved Prisma import to top)
   - Added environment variable validation
   - Improved error handling

4. **lib/auth.ts**
   - Removed unused React import
   - Added environment variable validation
   - Fixed password authentication logic (disabled until password field is added to schema)
   - Added `secret` configuration to authOptions

5. **app/api/webhooks/stripe/route.ts**
   - Added Node.js runtime configuration
   - Added dynamic route configuration
   - Added environment variable validation
   - Improved error handling

6. **app/api/stripe/checkout/route.ts**
   - Added Node.js runtime configuration

7. **app/api/dashboard/route.ts**
   - Added Node.js runtime configuration

8. **app/api/auth/[...nextauth]/route.ts**
   - Added Node.js runtime configuration

## Required Environment Variables

Ensure these are set in your deployment platform (Vercel/Render):

### Required
- `DATABASE_URL` - PostgreSQL connection string
- `NEXTAUTH_SECRET` - Secret for NextAuth (generate with `openssl rand -base64 32`)
- `NEXTAUTH_URL` - Your application URL (e.g., `https://your-domain.com`)
- `STRIPE_SECRET_KEY` - Stripe secret key (starts with `sk_`)
- `STRIPE_WEBHOOK_SECRET` - Stripe webhook signing secret (starts with `whsec_`)

### Optional (but recommended)
- `STRIPE_MONTHLY_PRICE_ID` - Monthly subscription price ID
- `STRIPE_ANNUAL_PRICE_ID` - Annual subscription price ID
- `STRIPE_LIFETIME_PRICE_ID` - Lifetime subscription price ID
- `GOOGLE_CLIENT_ID` - Google OAuth client ID
- `GOOGLE_CLIENT_SECRET` - Google OAuth client secret
- `GITHUB_CLIENT_ID` - GitHub OAuth client ID
- `GITHUB_CLIENT_SECRET` - GitHub OAuth client secret

## Deployment Checklist

Before deploying, ensure:

- [ ] All environment variables are set in Vercel/Render dashboard
- [ ] Database is accessible from deployment platform
- [ ] Prisma migrations are run (or will be run post-deployment)
- [ ] Stripe webhook endpoint is configured in Stripe Dashboard
- [ ] `DATABASE_URL` includes connection pooler if using serverless (recommended for Vercel)

## Testing

After deployment:

1. **Test Database Connection**:
   - Verify database connection works
   - Check that Prisma client is generated correctly

2. **Test Authentication**:
   - Try signing in with OAuth providers
   - Verify sessions are created correctly

3. **Test Stripe Integration**:
   - Create a test checkout session
   - Verify webhook events are received
   - Check that subscriptions are updated in database

4. **Test API Routes**:
   - Verify all API routes respond correctly
   - Check error handling for missing environment variables

## Common Issues and Solutions

### Issue: "Prisma client not initialized"
**Solution**: Ensure `DATABASE_URL` is set and `postinstall` script runs during build. Check build logs for `prisma generate` output.

### Issue: "Stripe webhook signature verification failed"
**Solution**: Verify `STRIPE_WEBHOOK_SECRET` matches the webhook endpoint secret in Stripe Dashboard. Ensure the webhook URL is correct.

### Issue: "Environment variable not set"
**Solution**: Check that all required environment variables are set in your deployment platform's dashboard. For Vercel, ensure they're set for the correct environment (Production, Preview, Development).

### Issue: Build fails on Vercel
**Solution**: 
- Check build logs for specific errors
- Verify `DATABASE_URL` is accessible from Vercel's build environment
- Ensure Prisma schema is valid: run `npx prisma validate` locally
- Check that all dependencies are listed in `package.json`

## Next Steps

1. Deploy to Vercel/Render with environment variables set
2. Run database migrations: `npx prisma migrate deploy`
3. Configure Stripe webhook endpoint
4. Test all functionality
5. Monitor logs for any errors

## Notes

- The application now uses Node.js runtime for all API routes (required for Prisma)
- Prisma client is automatically generated via `postinstall` script
- Environment variables are validated at runtime with helpful error messages
- Build should now succeed on Vercel/Render with proper environment variable configuration

