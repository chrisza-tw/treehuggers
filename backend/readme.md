1. npm install

2. npm install -D concurrently nodemon

3. Obtain Serivce key and add the path of the service key to the serivceAccKeyPath constant in index.ts.
*Key must NOT be commited to github*

3. npm run dev

4. if there are any missing packages identified, they need to be installed. 


## Homebrew (for macOS users)
`brew install git-secrets`

# Warning
You're not done yet! You MUST install the git hooks for every repo that you wish to use with git secrets --install.

Here's a quick example of how to ensure a git repository is scanned for secrets on each commit:

`cd /path/to/my/repo`
`git secrets --install`
`git secrets --register-aws`

use `git secrets --scan` to manually scan files, 