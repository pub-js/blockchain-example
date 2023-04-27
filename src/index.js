import { chain, pushBlock, save, verify } from './chain.js'
import { createBlock } from './block.js'

pushBlock(
  createBlock({
    author: 'Bart',
    money: '$100'
  })
)

pushBlock(
  createBlock({
    author: 'Lisa',
    money: '$150'
  })
)

pushBlock(
  createBlock({
    author: 'Marge',
    money: '$180'
  })
)

pushBlock(
  createBlock({
    author: 'Homer',
    money: '$130'
  })
)

pushBlock(
  createBlock({
    author: 'Maggie',
    money: '$500'
  })
)

save()

console.info('Verification:', verify())

chain[chain.length - 1].data.money = '$1000'

console.info('Verification2:', verify())

console.info(chain)
