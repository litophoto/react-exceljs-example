import { useState } from 'react'
import './App.css'
// import ExcelOutputSample from './excel/OutputSample'
import ExcelOutputSample from './excel/OutputSampleWithBasicExcel'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <ExcelOutputSample />
    </div>
  )
}

export default App
