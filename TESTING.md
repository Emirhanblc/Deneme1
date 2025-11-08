# Testing & CI Setup

This document describes the testing infrastructure and CI/CD pipeline for the BlogSayfam2 project.

## Testing Framework

### Stack

- **Jest** - Test runner and assertion library
- **ts-jest** - TypeScript support for Jest
- **@testing-library/react** - React component testing utilities
- **@testing-library/jest-dom** - Custom Jest matchers for DOM

### Configuration

#### Jest Configuration (`jest.config.js`)

- **Test Environment**: jsdom (for React components)
- **Transform**: ts-jest for TypeScript files
- **Module Mapping**: Supports `@/*` path aliases
- **Coverage**: Tracks coverage for `app/`, `components/`, and `lib/` directories
- **Ignore**: Excludes `.next/` and `node_modules/`

#### Test Files Location

Tests are located in the `__tests__/` directory:

```
__tests__/
├── healthcheck.test.ts       # Basic environment tests
├── api-health.test.ts        # Health API endpoint tests
└── siteConfig.test.ts        # Site configuration tests
```

## Running Tests

### Run all tests

```bash
npm run test
```

### Run tests in watch mode

```bash
npm run test:watch
```

### Run tests with coverage

```bash
npm run test -- --coverage
```

## Current Test Coverage

### Test Suites

- ✅ **Healthcheck** - Verifies test environment is working
- ✅ **API Health** - Tests health endpoint response structure
- ✅ **Site Configuration** - Validates siteConfig exports and helpers

### Test Results

```
Test Suites: 3 passed, 3 total
Tests:       15 passed, 15 total
```

## CI/CD Pipeline

### GitHub Actions Workflow

The CI workflow (`.github/workflows/ci.yml`) runs automatically on:

- Push to `main` branch
- Pull requests targeting `main` branch

### Workflow Steps

1. **Checkout Repository** - Uses `actions/checkout@v4`
2. **Setup Node.js** - Installs Node.js 20.x with npm caching
3. **Install Dependencies** - Runs `npm ci` for clean install
4. **Run Linter** - Executes `npm run lint` (continues on error)
5. **Run Tests** - Executes `npm run test` with test environment variables
6. **Build Project** - Runs `npm run build` to verify production build
7. **Report Status** - Outputs workflow completion status

### Environment Variables

The CI workflow sets these environment variables for tests and builds:

- `NODE_ENV`: test/production
- `NEXTAUTH_SECRET`: test-secret-for-ci-only
- `NEXTAUTH_URL`: http://localhost:3000
- `DATABASE_URL`: postgresql://test:test@localhost:5432/test
- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`: pk_test_dummy
- `STRIPE_SECRET_KEY`: sk_test_dummy
- `STRIPE_WEBHOOK_SECRET`: whsec_dummy

## Adding New Tests

### 1. Create a test file in `__tests__/`

```typescript
// __tests__/example.test.ts

describe('Example Test Suite', () => {
  it('should pass', () => {
    expect(true).toBe(true);
  });
});
```

### 2. For API route tests

```typescript
import { NextResponse } from 'next/server';

describe('API Route Test', () => {
  it('should validate response structure', () => {
    const mockResponse = {
      status: 'ok',
      data: {},
    };

    expect(mockResponse).toHaveProperty('status');
    expect(mockResponse).toHaveProperty('data');
  });
});
```

### 3. For component tests

```typescript
import { render, screen } from '@testing-library/react';
import MyComponent from '@/components/MyComponent';

describe('MyComponent', () => {
  it('should render correctly', () => {
    render(<MyComponent />);
    expect(screen.getByText('Hello')).toBeInTheDocument();
  });
});
```

## Best Practices

### ✅ Do

- Write tests for critical business logic
- Test API route response structures
- Validate configuration and utilities
- Keep tests isolated and independent
- Use descriptive test names

### ❌ Don't

- Test third-party library internals
- Make tests dependent on external services without mocking
- Write overly complex tests
- Test implementation details instead of behavior

## CI Badge

Add this badge to your README to show CI status:

```markdown
![CI](https://github.com/Emirhanblc/Deneme1/workflows/CI/badge.svg)
```

## Troubleshooting

### Tests fail locally but pass in CI

- Check your Node.js version (CI uses 20.x)
- Verify environment variables are set
- Clear node_modules and reinstall: `rm -rf node_modules && npm install`

### Build fails in CI

- Ensure all environment variables are set in workflow
- Check for TypeScript errors: `npm run build` locally
- Verify all dependencies are in package.json (not just devDependencies)

### Tests are slow

- Use `jest --maxWorkers=4` to limit parallel workers
- Mock expensive operations (DB queries, API calls)
- Use `jest.setTimeout()` to increase timeout if needed

## Future Improvements

- [ ] Add integration tests for API routes with database mocking
- [ ] Add E2E tests with Playwright or Cypress
- [ ] Set up test coverage thresholds
- [ ] Add visual regression testing
- [ ] Implement snapshot testing for components
- [ ] Add performance testing for critical paths

## Resources

- [Jest Documentation](https://jestjs.io/)
- [Testing Library](https://testing-library.com/)
- [GitHub Actions](https://docs.github.com/en/actions)
- [Next.js Testing](https://nextjs.org/docs/testing)
