# Project coding standards

## TypeScript Guidelines

- Use TypeScript for all new code
- Follow functional programming principles where possible
- Prefer immutable data (const, readonly)
- Use optional chaining (?.) and nullish coalescing (??) operators
- Prefer function declarations over arrow functions or function expressions when defining named functions.

## React Guidelines

- Use React 19 or later version
- Do not include `import React from 'react';`
- Use functional components with hooks
- Define components using `export function ComponentName(...) { ... }` syntax (not arrow functions or const).
- Define component props type using the `type` keyword and name it as `ComponentNameProps` (replace ComponentName accordingly).
- Add 'use client' directive at the top of the file for client components
- Use Tailwind CSS for component styling

## Naming Conventions

- Use PascalCase for component names, interfaces, and type aliases
- Use camelCase for variables, functions, and methods
- Use ALL_CAPS for constants

## Error Handling

- Use try/catch blocks for async operations
- Implement proper error boundaries in React components
- Always log errors with contextual information