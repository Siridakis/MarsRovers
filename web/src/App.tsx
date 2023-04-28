import './App.css'
import { InputForm } from './components/InputForm'
import './styles/global.css'

function App() {

  return (
    <div className='Mars h-screen'>
      <h1 className='text-center text-lg font-bold mb-4 pt-4'> MARS ROVERS </h1>
      <div className='mx-8'>
        <InputForm/>
      </div>
    </div>
  )
}

export default App
