import * as fcl from '@onflow/fcl'
import { useEffect, useState } from 'react'
import ReadHelloWorld from '../cadence/scripts/ReadHelloWorld.cdc'
import UpdateHelloWorld from '../cadence/transactions/UpdateHelloWorld.cdc'
import elementStyles from '../styles/Elements.module.css'
import containerStyles from '../styles/Container.module.css'
import useConfig from '../hooks/useConfig'
import { createExplorerTransactionLink } from '../helpers/links'
import HandlePurchase from '../cadence/scripts/HandlePurchase.cdc'

export default function Container() {
  const [chainGreeting, setChainGreeting] = useState('?')
  const [purchaseAmount, setPurchaseAmount] = useState<number | null>(null)
  const [userGreetingInput, setUserGreetingInput] = useState('')
  const [lastTransactionId, setLastTransactionId] = useState<string>()
  const [transactionStatus, setTransactionStatus] = useState<number>()
  const { network } = useConfig()

  const isEmulator = network => network !== 'mainnet' && network !== 'testnet'
  const isSealed = statusCode => statusCode === 4 // 4: 'SEALED'

  useEffect(() => {
    if (lastTransactionId) {
      console.log('Last Transaction ID: ', lastTransactionId)

      fcl.tx(lastTransactionId).subscribe(res => {
        setTransactionStatus(res.statusString)
  
        // Query for new chain string again if status is sealed
        if (isSealed(res.status)) {
          queryChain()
        }
      })
    }
  }, [lastTransactionId])

  const queryChain = async () => {
    const res = await fcl.query({
      cadence: ReadHelloWorld
    })

    setChainGreeting(res)
  }

  const mutateGreeting = async (event) => {
    event.preventDefault()

    if (!userGreetingInput.length) {
      throw new Error('Please add a new greeting string.')
    }

    const transactionId = await fcl.mutate({
      cadence: UpdateHelloWorld,
      args: (arg, t) => [arg(userGreetingInput, t.String)],
    })

    setLastTransactionId(transactionId)
  }
  
  const handlePurchase = async () => {
    const purchaseAmount = 100.0 // Example purchase amount
  
    await fcl.mutate({
      cadence: HandlePurchase,
      args: (arg, t) => [arg(purchaseAmount, t.UFix64)]
    })
    setPurchaseAmount(purchaseAmount)
  }

  const openExplorerLink = (transactionId, network) => window.open(createExplorerTransactionLink({ network, transactionId }), '_blank')

  return (
    <div className={containerStyles.container}>
      <h3 className={elementStyles.subtitle}>Greeting on Chain</h3>
      <p className={elementStyles.description}>{chainGreeting}</p>
      <button className={elementStyles.button} onClick={queryChain}>
        Query Chain
      </button>
      <hr />
      <h3 className={elementStyles.subtitle}>Purchase Amount</h3>
      {purchaseAmount ? (
        <p className={elementStyles.description}>{purchaseAmount} tokens</p>
      ) : (
        <p className={elementStyles.description}>No purchase made yet</p>
      )}
      <button className={elementStyles.button} onClick={handlePurchase}>
        Handle Purchase
      </button>
      <hr />
      <div>
        <h2>Mutate the Chain</h2>
        {!isEmulator(network) && (
          <h4>Latest Transaction ID: <a className={elementStyles.link} onClick={() => {openExplorerLink(lastTransactionId, network)}}>{ lastTransactionId }</a></h4>
        )}
        <h4>Latest Transaction Status: { transactionStatus }</h4>
        <form onSubmit={mutateGreeting}>
          <label>
            <input
              type='text'
              placeholder='New Greeting'
              value={userGreetingInput}
              onChange={e => setUserGreetingInput(e.target.value)}
              className={elementStyles.input}
            />
          </label>
          <input type='submit' value='Submit' className={elementStyles.button} />
        </form>
      </div>
    </div>
  )
}