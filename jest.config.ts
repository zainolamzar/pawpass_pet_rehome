import nextJest from 'next/jest'
import type { Config } from 'jest'

const createJestConfig = nextJest({
  dir: './', // Path to Next.js app
})

const config: Config = {
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: 'coverage',
  coverageProvider: 'v8',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  testEnvironment: 'jsdom',

  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/$1",
  },
}

export default createJestConfig(config)
