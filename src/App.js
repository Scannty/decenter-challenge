import React from 'react'
import classes from './App.module.css'
import { Web3Connect, initializeContracts } from './utils/Web3Client'
import Form from './components/Form'
import Results from './components/Results'
import Loading from './components/Loading'

function App() {
  React.useEffect(() => {
    Web3Connect()
    initializeContracts()
  }, [])

  const [cdps, setCdps] = React.useState([])
  const [itemsLoaded, setItemsLoaded] = React.useState(0)
  const [isLoading, setIsLoading] = React.useState(false)
  const [decimals, setDecimals] = React.useState(18)
  const [collateralRate, setCollateralRate] = React.useState(1)

  return (
    <div className={classes.appContainer}>
      <Form
        setCdps={setCdps}
        setIsLoading={setIsLoading}
        setItemsLoaded={setItemsLoaded}
        setDecimals={setDecimals}
        setCollateralRate={setCollateralRate}
      />
      {
        isLoading
          ? <Loading itemsLoaded={itemsLoaded} />
          : <Results
            cdps={cdps}
            decimals={decimals}
            collateralRate={collateralRate}
          />
      }
    </div>
  )
}

export default App;
