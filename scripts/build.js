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

const command = [
  'node -r esm',
  bin('webpack'),
  '--config example/webpack.config.js',
  '--progress',
  '--mode production',
].join(' ')

// Run Production Build
execSync(command, options)
