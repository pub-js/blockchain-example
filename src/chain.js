import { writeFile, readFile, stat } from 'fs'
import { generateHash, makeInitBlock } from './block.js'

const BC_FILE_NAME = './blockchain.json'

const read = () =>
  new Promise((res, rej) =>
    // try to find stored file
    stat(BC_FILE_NAME, (err, _) => {
      // if file not found, create new blockchain
      if (err) {
        // create some initial block for beginning
        console.info('New blockchain created')
        res([makeInitBlock()])
      } else {
        // or read it from file
        readFile(BC_FILE_NAME, 'utf8', (e, data) => {
          e ? rej(e) : res(JSON.parse(data))
        })
      }
    })
  )

const save = () =>
  writeFile(BC_FILE_NAME, JSON.stringify(chain, null, 2), err => {
    if (err) console.error(err)
  })

const getLastBlock = () => chain.at(chain.length - 1)

const pushBlock = block => {
  block.prevHash = getLastBlock().hash
  chain.push(block)
}

const verify = () => {
  for (let i = 1; i < chain.length; i++) {
    const block = chain[i]
    const prevBlock = chain[i - 1]

    const expectedHash = generateHash(block)
    const valid = expectedHash === block.hash && block.prevHash === prevBlock.hash
    console.info(`Block ${block.idx} is ${valid ? 'valid' : 'invalid'}`)
    if (!valid) return false
  }
  return true
}

const chain = await read()

export { save, pushBlock, verify, getLastBlock, chain }
