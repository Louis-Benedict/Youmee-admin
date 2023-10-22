const nextJest = require('next/jest')
const { pathsToModuleNameMapper } = require('ts-jest')
const { compilerOptions } = require('./tsconfig')

const createJestConfig = nextJest({
    dir: './',
})

const customJestConfig = {
    moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths),
    setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
    modulePaths: ['<rootDir>/app'],
    testEnvironment: 'jest-environment-jsdom',
    testPathIgnorePatterns: ['/node_modules', '/__tests__/utils'],
    verbose: true,
}

module.exports = createJestConfig(customJestConfig)
