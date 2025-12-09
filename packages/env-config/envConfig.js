import { join } from 'path'
import env from '@next/env'

const { loadEnvConfig } = env

const projectDir = join(process.cwd(), '../../')
loadEnvConfig(projectDir)
