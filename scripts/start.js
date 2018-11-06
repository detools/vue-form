import path from 'path'
import { execSync } from 'child_process'
import { bin } from './common'

const options = {
  cwd: path.resolve(__dirname, '..'),
  stdio: 'inherit',
}

const command = [
  'node -r esm',
  bin('webpack-dev-server'),
  '--config example/webpack.config.js',
  '--inline',
  '--hot',
].join(' ')

// Run Development Server
execSync(command, options)
