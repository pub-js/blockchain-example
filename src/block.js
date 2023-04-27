const { createHash } = await import('node:crypto')
import { getLastBlock } from './chain.js'

const DIFFICULTY = 5

const createBlock = data => {
  const prevBlock = getLastBlock()
  const block = {
    idx: prevBlock.idx + 1,
    ts: new Date().getTime(),
    prevHash: prevBlock.hash,
    nonce: 0,
    data
  }
  console.info(`Mining block #${block.idx}`)
  const startTime = new Date()
  block.hash = generateHash(block)
  proofOfWork(block)
  console.info(`Block #${block.idx} mined by ${(new Date() - startTime) / 1000} seconds. Nonce: ${block.nonce}`)
  return block
}

const makeInitBlock = () => {
  const block = {
    idx: 0,
    ts: new Date().getTime(),
    prevHash: '',
    data: { author: 'root' }
  }
  block.hash = generateHash(block)
  return block
}

const generateHash = block =>
  createHash('sha256')
    .update(block.idx + block.ts + block.prevHash + block.nonce + JSON.stringify(block.data))
    .digest('hex')

const proofOfWork = block => {
  while (block.hash.substring(0, DIFFICULTY) !== Array(DIFFICULTY + 1).join('0')) {
    block.nonce++
    block.hash = generateHash(block)
  }
}

export { createBlock, generateHash, makeInitBlock }
