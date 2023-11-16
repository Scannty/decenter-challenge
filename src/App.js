import React from 'react'
import { Web3Connect, initializeContract } from './utils/Web3Client'
import Form from './components/Form'
import Results from './components/Results'

function App() {
  // Connecting the MetaMask Wallet
  React.useEffect(() => {
    Web3Connect()
    initializeContract()
  }, [])

  const [cdps, setCdps] = React.useState([])

  return (
    <React.Fragment>
      <Form setCdps={setCdps} />
      <Results cdps={cdps} />
    </React.Fragment>
  )
}

export default App;
