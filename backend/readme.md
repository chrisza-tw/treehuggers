# Local Development

## Getting Started
1. Run `npm install`

2. Obtain the firebase service key from your peers and add it to `/config`

3. Use the `.env.template` file, rename the file to `.env` and add the path of the firebase service key to the respective environment variable (*Note: Key must NOT be commited to repository)*

4. Run `npm run dev`

## Hints

If there are any missing packages identified, kindly install them.

# Homebrew (for macOS users)
`brew install git-secrets`

# Warning
You're not done yet! You MUST install the git hooks for every repo that you wish to use with git secrets --install.

Here's a quick example of how to ensure a git repository is scanned for secrets on each commit:

`cd /path/to/my/repo`
`git secrets --install`
`git secrets --register-aws`

use `git secrets --scan` to manually scan files, 