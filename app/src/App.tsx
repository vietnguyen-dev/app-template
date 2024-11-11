import React, { useEffect, useState } from 'react'
import './App.css'

const apiUrl = import.meta.env.VITE_API_URL;

interface iStuff {
  stuff: string
} 

function App() {
  const [data, setData] = useState<iStuff>({stuff: "boobies"})

  useEffect(() => {
    console.log(apiUrl)
    async function fetchData() {
      try {
        const res = await fetch(apiUrl);
        const data = await res.json()
        console.log(data)
        setData(data)
      }
      catch(err) {
        console.error(err)
      }
    }

    fetchData()
  },[])
  return (
    <div className="App">
      <p>{data.stuff}</p>
    </div>
  )
}

export default App
