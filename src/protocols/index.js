const immutable = require('immutable')
const ArweaveSubgraph = require('./arweave/subgraph')
const EthereumTypeGenerator = require('./ethereum/type-generator')
const EthereumTemplateCodeGen = require('./ethereum/codegen/template')
const EthereumABI = require('./ethereum/abi')
const EthereumSubgraph = require('./ethereum/subgraph')
const NearSubgraph = require('./near/subgraph')
const CosmosSubgraph = require('./cosmos/subgraph')
const EthereumContract = require('./ethereum/contract')
const NearContract = require('./near/contract')
const EthereumManifestScaffold = require('./ethereum/scaffold/manifest')
const NearManifestScaffold = require('./near/scaffold/manifest')
const CosmosManifestScaffold = require('./cosmos/scaffold/manifest')
const ArweaveMappingScaffold = require('./arweave/scaffold/mapping')
const EthereumMappingScaffold = require('./ethereum/scaffold/mapping')
const NearMappingScaffold = require('./near/scaffold/mapping')
const CosmosMappingScaffold = require('./cosmos/scaffold/mapping')

module.exports = class Protocol {
  static fromDataSources(dataSourcesAndTemplates) {
    const firstDataSourceKind = dataSourcesAndTemplates[0].kind
    return new Protocol(firstDataSourceKind)
  }

  constructor(name) {
    this.name = this.normalizeName(name)
  }

  static availableProtocols() {
    return immutable.fromJS({
      // `ethereum/contract` is kept for backwards compatibility.
      // New networks (or protocol perhaps) shouldn't have the `/contract` anymore (unless a new case makes use of it).
      ethereum: ['ethereum', 'ethereum/contract'],
      near: ['near'],
      tendermint: ['tendermint'],
    })
  }

  static availableNetworks() {
    return immutable.fromJS({
      ethereum: [
        'ethereum',
        'kovan',
        'rinkeby',
        'ropsten',
        'goerli',
        'poa-core',
        'poa-sokol',
        'xdai',
        'matic',
        'mumbai',
        'fantom',
        'bsc',
        'chapel',
        'clover',
        'avalanche',
        'fuji',
        'celo',
        'celo-alfajores',
        'fuse',
        'mbase',
        'arbitrum-one',
        'arbitrum-rinkeby',
        'optimism',
        'optimism-kovan',
        'oasis',
        'rsc',
        'aurora',
        'aurora-testnet',
      ],
      near: ['near-mainnet', 'near-testnet'],
      tendermint: [
        'cosmoshub-4',
        'theta-testnet-001',
        'osmosis-1',
        'osmo-test-4',
      ],
    })
  }

  static normalizeName(name) {
    return Protocol.availableProtocols().findKey(possibleNames =>
      possibleNames.includes(name),
    )
  }

  displayName() {
    switch (this.name) {
      case 'arweave':
        return 'Arweave'
      case 'ethereum':
        return 'Ethereum'
      case 'near':
        return 'NEAR'
      case 'cosmos':
        return 'Cosmos'
    }
  }

  // Receives a data source kind, and checks if it's valid
  // for the given protocol instance (this).
  isValidKindName(kind) {
    return Protocol.availableProtocols()
      .get(this.name, immutable.List())
      .includes(kind)
  }

  hasABIs() {
    switch (this.name) {
      case 'arweave':
        return false
      case 'ethereum':
        return true
      case 'near':
        return false
      case 'tendermint':
        return false
      case 'cosmos':
        return false
      default:
        return false
    }
  }

  hasContract() {
    switch (this.name) {
      case 'arweave':
        return false
      case 'ethereum':
        return true
      case 'near':
        return true
      case 'cosmos':
        return false
    }
  }

  hasEvents() {
    switch (this.name) {
      case 'arweave':
        return false
      case 'ethereum':
        return true
      case 'near':
        return false
      case 'cosmos':
        return false
    }
  }

  hasTemplates() {
    switch (this.name) {
      case 'arweave':
        return false
      case 'ethereum':
        return true
      case 'near':
        return false
      case 'cosmos':
        return false
    }
  }

  getTypeGenerator(options) {
    switch (this.name) {
      case 'arweave':
        return null
      case 'ethereum':
        return new EthereumTypeGenerator(options)
      case 'near':
        return null
      case 'cosmos':
        return null
    }
  }


  getTemplateCodeGen(template) {
    if (!this.hasTemplates()) {
      throw new Error(
        `Template data sources with kind '${this.name}' are not supported yet`,
      )
    }

    switch (this.name) {
      case 'ethereum':
        return new EthereumTemplateCodeGen(template)
      default:
        throw new Error(`Template data sources with kind '${this.name}' is unknown`)
    }
  }

  getABI() {
    switch (this.name) {
      case 'arweave':
        return null
      case 'ethereum':
        return EthereumABI
      case 'near':
        return null
      case 'cosmos':
        return null
    }
  }


  getSubgraph(options = {}) {
    const optionsWithProtocol = { ...options, protocol: this }

    switch (this.name) {
      case 'arweave':
        return new ArweaveSubgraph(optionsWithProtocol)
      case 'ethereum':
        return new EthereumSubgraph(optionsWithProtocol)
      case 'near':
        return new NearSubgraph(optionsWithProtocol)
      case 'cosmos':
        return new CosmosSubgraph(optionsWithProtocol)
      default:
        throw new Error(`Data sources with kind '${this.name}' are not supported yet`)
    }

  }

  getContract() {
    switch (this.name) {
      case 'arweave':
        return null
      case 'ethereum':
        return EthereumContract
      case 'near':
        return NearContract
      case 'cosmos':
        return null
    }
  }

  getManifestScaffold() {
    switch (this.name) {
      case 'arweave':
        return ArweaveMappingScaffold
      case 'ethereum':
        return EthereumManifestScaffold
      case 'near':
        return NearManifestScaffold
      case 'cosmos':
        return CosmosManifestScaffold
    }
  }

  getMappingScaffold() {
    switch (this.name) {
      case 'arweave':
        return ArweaveMappingScaffold
      case 'ethereum':
        return EthereumMappingScaffold
      case 'near':
        return NearMappingScaffold
      case 'cosmos':
        return CosmosMappingScaffold
    }
  }
}
