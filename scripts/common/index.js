import path from 'path'
import fs from 'fs'

// eslint-disable-next-line import/prefer-default-export
export const bin = name => {
  const packageJSON = JSON.parse(
    fs.readFileSync(path.join('node_modules', name, 'package.json'), { encoding: 'utf8' })
  )

  const binPath = typeof packageJSON.bin === 'string' ? packageJSON.bin : packageJSON.bin[name]
  return path.join('node_modules', name, binPath)
}
