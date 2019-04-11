# Functions package

WIP: SSR with Firebase Functions and Next.js.

## Caveats

Because of Firebase Functions deploy mechanism any used packages must be specified inside function's package.json.
Other approach is to create a bundle with all dependencies and use it inside functions package.

Typescript *paths* options is not replacing paths in the output code. So webpack or babel should be used.