# Data Vault

A DataVault contract is used to store arbitrary data on-chain on any EVM compatible blockchain. A subgraph can then read all the calldata sent to a particular contract, decode it and update the subgraph state accordingly.

The DataVault accepts any function call by using a fallback function that will not revert. It is up to the implementor to define the calldata format as well as how to decode it.

### Additional Considerations

- Fallback is not payable to avoid anyone sending ETH by mistake as the main purpose is to store calldata.
- Contract is ownable as it can help with initial validation for who can send a payload

# Deploying

Setup a `.env` file with the keys you want to use for deployments. You can use `.env.sample` as a guide.
Deploy a `DataVault` contract by running `yarn deploy -- --network <network-name>`

# Copyright

Copyright &copy; 2022 The Graph Foundation

Licensed under [GPL license](LICENSE).