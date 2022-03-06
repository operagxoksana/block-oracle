import { ethers } from 'hardhat'
import '@nomiclabs/hardhat-ethers'
import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers'

import { DataVault__factory, DataVault } from '../build/types'
import { expect } from 'chai'

const { getContractFactory, getSigners } = ethers
const { id, hexConcat, randomBytes, hexlify, defaultAbiCoder } = ethers.utils

describe('DataVault', () => {
  let vault: DataVault
  let me: SignerWithAddress

  beforeEach(async () => {
    ;[me] = await getSigners()

    const factory = (await getContractFactory('DataVault', me)) as DataVault__factory
    vault = await factory.deploy()
    await vault.deployed()
  })

  describe('submit data', async () => {
    it('post any arbitrary data as selector', async () => {
      // virtual function call
      const txRequest = {
        data: '0x123123',
        to: vault.address,
      }
      // send transaction
      const tx = await me.sendTransaction(txRequest)
      const rx = await tx.wait()
      // transaction must work - it just stores data
      expect(rx.status).eq(1)
    })

    it('post long calldata', async () => {
      // virtual function call
      const selector = id('setEpochBlocksPayload(bytes)').slice(0, 10)
      // calldata payload
      const messageBlocks = hexlify(randomBytes(1000))
      const txCalldata = defaultAbiCoder.encode(['bytes'], [messageBlocks]) // we abi encode to allow the subgraph to decode it properly
      const txData = hexConcat([selector, txCalldata])
      // craft full transaction
      const txRequest = {
        data: txData,
        to: vault.address,
      }
      // send transaction
      const tx = await me.sendTransaction(txRequest)
      const rx = await tx.wait()
      // transaction must work - it just stores data
      expect(rx.status).eq(1)
    })
  })
})