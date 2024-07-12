import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  moduleFileExtensions: ['js', 'json', 'ts'],
  rootDir: '../.',
  testRegex: '.*\\.spec\\.ts$',
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  collectCoverageFrom: [
    '**/*.(t|j)s',
    '!**/node_modules/**',
    '!**/dist/**',
    '!**/src/main.ts',
    '!**/src/app.module.ts',
  ],
  coveragePathIgnorePatterns: [
    '/node_modules/',
    '/dist/',
    '/src/config/',
    '/src/database/',
    '/src/modules/produto/entity/',
    '/src/modules/produto/dto/',
    '/src/modules/produto/produto.module.ts',
    '/src/modules/loja/entity/',
    '/src/modules/loja/dto/',
    '/src/modules/loja/loja.module.ts',
    '/src/modules/produtoloja/entity/',
    '/src/modules/produtoloja/dto/',
    '/src/modules/produtoloja/produtoloja.module.ts',
    '/src/app.module.ts',
    '/src/main.ts',
  ],
  coverageDirectory: '../coverage',
  testEnvironment: 'node',
};

export default config;
