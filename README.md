<!-- hook DB -->
"pretest:e2e": "npm run db:test:restart",
<!-- e2d test -->
"test:e2e": "dotenv -e .env.test -- jest --watch --no-cache --config ./test/jest-e2e.json"

