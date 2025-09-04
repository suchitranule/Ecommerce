#!/bin/bash

echo "🔧 Setting up Husky, lint-staged, and commitlint (Node 22 friendly)..."

# 1. Install dependencies
npm install husky lint-staged @commitlint/config-conventional @commitlint/cli --save-dev

# 2. Enable husky
npx husky install
npm set-script prepare "husky install"

# 3. Add hooks
npx husky add .husky/pre-commit "npx lint-staged"
npx husky add .husky/pre-push "npm run test -- --watch=false --browsers=ChromeHeadless --code-coverage"
npx husky add .husky/commit-msg "npx --no-install commitlint --edit \$1"

# 4. Make hooks executable
chmod +x .husky/*

# 5. Configure lint-staged in package.json (without git add)
npx json -I -f package.json -e '
  this["lint-staged"] = {
    "src/**/*.ts": ["eslint --fix", "prettier --write"],
    "src/**/*.scss": ["prettier --write"],
    "src/**/*.html": ["prettier --write"]
  }'

# 6. Create commitlint config (CJS for Node 22)
cat <<EOL > commitlint.config.cjs
module.exports = {
  extends: ["@commitlint/config-conventional"]
};
EOL

echo "Husky setup complete!"
echo "Try: git add . && git commit -m 'feat: husky setup'"
