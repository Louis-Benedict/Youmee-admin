const nextJest = require('next/jest')
const { pathsToModuleNameMapper } = require('ts-jest')
const { compilerOptions } = require('./tsconfig')
import type { Config } from 'jest'

const createJestConfig = nextJest({
    dir: './',
})

const customJestConfig: Config = {
    moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths),
    setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
    modulePaths: ['<rootDir>/app'],
    testEnvironment: 'jest-environment-jsdom',
    testPathIgnorePatterns: ['/node_modules', '/__tests__/utils', '/app'],
    verbose: true,
    collectCoverageFrom: [
        '<rootDir>/app/components/*.{ts,tsx}',
        '<rootDir>/app/(**)/*.{ts,tsx}',
    ],
    coverageThreshold: {
        global: {
            branches: 50,
            functions: 50,
            lines: 50,
            statements: 50,
        },
    },
}

module.exports = createJestConfig(customJestConfig)
