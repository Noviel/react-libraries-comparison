# Server Side Rendering Functions

WIP: SSR with Firebase Functions and Next.js.

## Strategy

1. Include third-party dependency of other workspace packages to functions package or add it to bundle's whitelist
1. Compile Next.js application and store it in `/next` folder
1. Compile Functions with Webpack: include in the bundle all workspace packages

## Caveats

- Workspace packages (like `@project/web`) can not be resolved as a dependencies in `package.json, so any dependencies must be specified in functions.