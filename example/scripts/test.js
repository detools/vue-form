import path from 'path'
import { execSync } from 'child_process'
import { bin } from './common'

const options = {
  cwd: path.resolve(__dirname, '..'),
  stdio: 'inherit',
  env: {
    ...process.env,
    NODE_ENV: 'test',
  },
}

const command = [
  bin('tape'),
  '-r @babel/register',
  '-r @babel/polyfill',
  '-r isomorphic-fetch',
  '-r esm',
  './src/store/__tests__/**/*.test.js',
  `| ${bin('tap-diff')}`,
].join(' ')

// Run Tests
execSync(command, options)
