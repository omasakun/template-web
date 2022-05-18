# Template

## Usage

1. Edit `README.md`
2. Append your own license for your work, if needed
3. Edit the license section of `README.md`, if needed
4. Edit the package name in `package.json`
5. Run `pnpm i`
6. Run `pnpm ncu`, if needed
7. Commit `package-lock.json`
8. Run `pnpm dev` in the `repos/client` directory

## Toolchain

- pnpm
- Vite
- TypeScript
- Svelte
- Jest + Svelte Testing Library
- Cypress + Cypress Testing Library
- Husky + Lint Staged
- ESLint
- Prettier

## [Conventional Commits 1.0.0](https://www.conventionalcommits.org/en/v1.0.0/)

Types (based on [gist:joshbuchea/semantic-commit-messages.md](https://gist.github.com/joshbuchea/6f47e86d2510bce28f8e7f42ae84c716)) :

- feat: new feature for the user, not a new feature for build script
- fix: bug fix for the user, not a fix to a build script
- docs: changes to the documentation
- style: formatting, missing semi colons, etc; no production code change
- refactor: refactoring production code, eg. renaming a variable
- test: adding missing tests, refactoring tests; no production code change
- chore: updating grunt tasks etc; no production code change

## License

Licensed under the [MIT License](LICENSE).
