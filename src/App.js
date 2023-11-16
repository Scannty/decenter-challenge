import React from 'react'
import classes from './App.module.css'
import { Web3Connect, initializeContract } from './utils/Web3Client'
import Form from './components/Form'
import Results from './components/Results'
import Loading from './components/Loading'

function App() {
  React.useEffect(() => {
    Web3Connect()
    initializeContract()
  }, [])

  const [cdps, setCdps] = React.useState([])
  const [itemsLoaded, setItemsLoaded] = React.useState(0)
  const [isLoading, setIsLoading] = React.useState(false)

  return (
    <div className={classes.appContainer}>
      <Form
        setCdps={setCdps}
        setIsLoading={setIsLoading}
        setItemsLoaded={setItemsLoaded}
      />
      {
        isLoading ? <Loading itemsLoaded={itemsLoaded} /> : <Results cdps={cdps} />
      }
    </div>
  )
}

export default App;
