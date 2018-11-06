import path from 'path'
import { execSync } from 'child_process'
import { bin } from './common'

const options = {
  cwd: path.resolve(__dirname, '..'),
  stdio: 'inherit',
  env: {
    ...process.env,
    NODE_ENV: 'production',
  },
}

const STATS_FILE = 'webpack.stats.json'

const command = [
  'node -r esm',
  bin('webpack'),
  '--config webpack.prod.js',
  '--progress',
  `--json > ${STATS_FILE}`,
].join(' ')

// Run Production Build
execSync(command, options)

// Analyze Production Build
execSync(`node -r esm ${bin('webpack-bundle-size-analyzer')} ${STATS_FILE}`, options)
