# Bug Report - Marc Torrelles Website

## Critical Issues

### 1. Memory Leak in Router Event Listener (`pages/_app.tsx`)

**Location:** `pages/_app.tsx:108-114`
**Severity:** High
**Description:** Router event listener is added on every `componentDidUpdate` call but never removed, causing memory leaks.

```typescript
componentDidUpdate(prevProps: Readonly<{ router: Router }>) {
  prevProps.router.events.on("routeChangeComplete", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  })
}
```

**Impact:** Memory accumulation over time, potential performance degradation
**Fix:** Remove event listener in `componentWillUnmount` and only add it once

### 2. Global Timer Variable Memory Leak (`components/ClapButton/index.tsx`)

**Location:** `components/ClapButton/index.tsx:81`
**Severity:** Medium
**Description:** Timer variable is declared globally, causing potential memory leaks and race conditions between components.

```typescript
let timer: NodeJS.Timeout
```

**Impact:** Multiple ClapButton instances could interfere with each other
**Fix:** Move timer to component state or use `useRef`

### 3. Font Provider Timeout Memory Leak (`styles/FontProvider.tsx`)

**Location:** `styles/FontProvider.tsx:23`
**Severity:** Medium
**Description:** Global timeout variable without proper cleanup when component unmounts.

```typescript
let timeout: NodeJS.Timeout
```

**Impact:** Memory leak if FontProvider unmounts before timeout completes
**Fix:** Use `useRef` and cleanup in `useEffect` return function

## Security Issues

### 4. Missing Rate Limiting (`pages/api/clap.ts`)

**Location:** `pages/api/clap.ts`
**Severity:** Medium
**Description:** API endpoint lacks rate limiting, allowing unlimited clap requests.

**Impact:** Potential abuse, inflated clap counts
**Fix:** Implement rate limiting middleware

### 5. Missing CSRF Protection (`pages/api/clap.ts`)

**Location:** `pages/api/clap.ts`
**Severity:** Medium
**Description:** POST endpoint lacks CSRF protection.

**Impact:** Cross-site request forgery attacks
**Fix:** Implement CSRF token validation

## Type Safety Issues

### 6. TypeScript Strict Mode Disabled (`tsconfig.json`)

**Location:** `tsconfig.json:7`
**Severity:** Medium
**Description:** `"strict": false` disables TypeScript's strict type checking.

```json
{
  "strict": false
}
```

**Impact:** Potential runtime errors from type-related bugs
**Fix:** Enable strict mode and fix resulting type errors

### 7. Missing Component Prop Types (`pages/_app.tsx`)

**Location:** `pages/_app.tsx:55-60`
**Severity:** Low
**Description:** `PageContent` component props are not properly typed.

```typescript
const PageContent = ({
  Component,
  pageProps,
  router,
  font,
  shouldHideName,
}) => {
```

**Impact:** No IntelliSense, potential prop mismatches
**Fix:** Add proper TypeScript interface

## Accessibility Issues

### 8. Missing Accessibility Attributes (`components/Link.tsx`)

**Location:** `components/Link.tsx:100-102`
**Severity:** Low
**Description:** Clickable elements with `onClick` lack accessibility attributes.

```typescript
{onClick ? (
  <a onClick={() => onClick()}>{children}</a>
) : 
```

**Impact:** Poor accessibility for screen readers and keyboard navigation
**Fix:** Add `role="button"`, `tabIndex="0"`, and keyboard event handlers

### 9. Missing href for onClick Links (`components/Link.tsx`)

**Location:** `components/Link.tsx:100-102`
**Severity:** Low
**Description:** Links with `onClick` don't have `href` attribute, breaking right-click context menu.

**Impact:** Poor user experience, no "open in new tab" option
**Fix:** Add `href="#"` or proper URL

## Performance Issues

### 10. useEffect Missing Dependencies (`components/ClapButton/index.tsx`)

**Location:** `components/ClapButton/index.tsx:93-94`
**Severity:** Low
**Description:** useEffect has missing dependencies that could cause stale closures.

```typescript
useEffect(() => {
  if (counterRef.current && counterWidth === undefined && claps) {
    setCounterWidth(counterRef.current.offsetWidth)
  }
}, [counterRef.current, claps]) // Missing 'counterWidth' dependency
```

**Impact:** Potential stale state references
**Fix:** Add missing dependencies or use callback refs

### 11. Potential Double API Calls (`components/ClapButton/index.tsx`)

**Location:** `components/ClapButton/index.tsx:98-115`
**Severity:** Low
**Description:** No cleanup for ongoing fetch requests when component unmounts.

**Impact:** Potential setState calls on unmounted components
**Fix:** Use AbortController to cancel pending requests

## Code Quality Issues

### 12. Inconsistent Error Handling (`pages/api/clap.ts`)

**Location:** `pages/api/clap.ts:33-36`
**Severity:** Low
**Description:** GET request returns 200 status even on errors.

```typescript
} catch (error) {
  console.error("Error fetching claps:", error)
  res.status(200).json({ message: "Success", claps: 0 })
}
```

**Impact:** Misleading success responses for failed operations
**Fix:** Return appropriate error status codes

## Summary

- **Critical Issues:** 3 (Memory leaks)
- **Security Issues:** 2 (Rate limiting, CSRF)
- **Type Safety Issues:** 2 (Strict mode, missing types)
- **Accessibility Issues:** 2 (Missing attributes, href)
- **Performance Issues:** 2 (Dependencies, API cleanup)
- **Code Quality Issues:** 1 (Error handling)

**Total Issues:** 12

These issues range from critical memory leaks to minor code quality improvements. The memory leaks should be addressed first as they can cause performance degradation over time.