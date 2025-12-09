import { join } from 'path'
import { existsSync, readFileSync } from 'fs'
import env from '@next/env'

const { loadEnvConfig } = env

const projectDir = join(process.cwd(), '../../')

loadEnvConfig(projectDir)

const envLocalPath = join(projectDir, '.env.local')
if (existsSync(envLocalPath)) {
  const content = readFileSync(envLocalPath, 'utf8')
  content.split('\n').forEach((line) => {
    const match = line.match(/^\s*([\w_]+)\s*=\s*(.*)?\s*$/)
    if (match) {
      const key = match[1]
      let value = match[2] || ''
      if (value.startsWith('"') && value.endsWith('"')) {
        value = value.slice(1, -1)
      }

      if (!process.env[key]) {
        process.env[key] = value
      }
    }
  })
}
