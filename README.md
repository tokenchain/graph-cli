# The Graph CLI (graph-cli)

[![npm (scoped)](https://img.shields.io/npm/v/@rsc/graph-cli.svg)](https://www.npmjs.com/package/@rsc/graph-cli)
[![Build Status](https://travis-ci.org/graphprotocol/graph-cli.svg?branch=master)](https://travis-ci.org/graphprotocol/graph-cli)

## The Graph Command Line Interface

As of today, the command line interface supports the following commands:

- `graph init` — Creates a new subgraph project from an example or an existing contract.
- `graph create` — Registers a subgraph name with a Graph Node.
- `graph remove` — Unregisters a subgraph name with a Graph Node.
- `graph codegen` — Generates AssemblyScript types for smart contract ABIs and the subgraph schema.
- `graph build` — Compiles a subgraph to WebAssembly.
- `graph deploy` — Deploys a subgraph to a [Graph Node](https://github.com/graphprotocol/graph-node).
- `graph auth` — Stores a [Graph Node](https://github.com/graphprotocol/graph-node) access token in the system's keychain.
- `graph local` — Runs tests against a [Graph Node](https://github.com/graphprotocol/graph-node) test environment (using Ganache by default).
- `graph test` — Downloads and runs the [Matchstick](https://github.com/LimeChain/matchstick) rust binary in order to test a subgraph.

## How It Works

The Graph CLI takes a subgraph manifest (defaults to `subgraph.yaml`) with references to:

- A GraphQL schema,
- Smart contract ABIs, and
- Mappings written in AssemblyScript.

It compiles the mappings to WebAssembly, builds a ready-to-use version of the subgraph saved to IPFS or a local directory for debugging, and deploys the subgraph to a [Graph Node](https://github.com/graphprotocol/graph-node).

## Installation

The Graph CLI can be installed with `npm` or `yarn`:

```sh
# NPM
npm install -g @rsc/graph-cli

# Yarn
yarn global add @rsc/graph-cli
```

### On Linux

`libsecret` is used for storing access tokens, so you may need to install it before getting started. Use one of the following commands depending on your distribution:

- Debian/Ubuntu: `sudo apt-get install libsecret-1-dev`
- Red Hat: `sudo yum install libsecret-devel`
- Arch Linux: `sudo pacman -S libsecret`

## Getting Started

The Graph CLI can be used with a local or self-hosted [Graph Node](https://github.com/graphprotocol/graph-node) or with the [Hosted Service](https://thegraph.com/explorer/). To help you get going, there are [quick start guides](https://thegraph.com/docs/quick-start) available for both.

If you are ready to dive into the details of building a subgraph from scratch, there is a [detailed walkthrough](https://thegraph.com/docs/define-a-subgraph) for that as well, along with API documentation for the [AssemblyScript API](https://thegraph.com/docs/assemblyscript-api).

## Release process

The steps to create a new version of the `graph-cli` are:

1. Decide which version number you'll be rolling out. You can check the differences between the current `master` branch and the latest release.
2. Create a PR with the commit generated by `npm version <VERSION> [<PREID>]`.
3. Once that's approved and merged to `master`, you can publish it to `npm` and push the git tags as well.
4. Last but not least, create a Github Release refering to the pushed git tag, linking to the PRs involved.

Helpful links:

- [Semver official docs](https://semver.org/)
- [`npm version` docs](https://docs.npmjs.com/cli/v7/commands/npm-version)
- [`npm publish` docs](https://docs.npmjs.com/cli/v7/commands/npm-publish)
- [`npm unpublish` docs](https://docs.npmjs.com/cli/v7/commands/npm-unpublish)
- [`npm deprecate` docs](https://docs.npmjs.com/cli/v7/commands/npm-deprecate)

### Stable release example

Current version: `0.34.9`.
Desired release: `0.35.0`.

To create the PR:
```
git checkout -b <BRANCH>

npm version minor

git push --set-upstream <REMOTE> <BRANCH>
```

Once that's approved and merged, you can update your local `master` and:

```
npm publish

npm push --tags
```

### Alpha release example

Current version: `0.29.2`.
Desired release: `0.30.0-alpha.0`.

To create the PR:
```
git checkout -b <BRANCH>

npm version preminor --preid alpha

git push --set-upstream <REMOTE> <BRANCH>
```

Once that's approved and merged, you can update your local `master` and:

```
npm publish --tag alpha

npm push --tags
```

### Alpha pre-release example

Current version: `0.30.0-alpha.0`.
Desired release: `0.30.0-alpha.1`.

To create the PR:
```
git checkout -b <BRANCH>

npm version prerelease --preid alpha

git push --set-upstream <REMOTE> <BRANCH>
```

Once that's approved and merged, you can update your local `master` and:

```
npm publish --tag alpha

npm push --tags
```

## License

Copyright &copy; 2018-2019 Graph Protocol, Inc. and contributors.

The Graph CLI is dual-licensed under the [MIT license](LICENSE-MIT) and the [Apache License, Version 2.0](LICENSE-APACHE).

Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either expressed or implied. See the License for the specific language governing permissions and limitations under the License.
