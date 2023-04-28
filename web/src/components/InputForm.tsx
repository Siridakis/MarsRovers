import { FormEvent, useState } from "react"

export function InputForm() {
  
  const [roverInput, setRoverInput] = useState({
    plateau: {
      x: 2,
      y: 2
    },
    rover1: {
      x: 0,
      y: 0,
      facing: 'N',
      mov_sequence:''
    },
    rover2: {
      x: 1,
      y: 1,
      facing: 'N',
      mov_sequence:''
    }
  })

  const [output, setOutput] = useState('')

  async function fetchSimulationData(event: FormEvent) {
    event.preventDefault()
    const response = await fetch("http://localhost:3001/api/logs", {
        method: 'POST',
        headers: {
          'content-type': 'application/json;charset=UTF-8',
        },
        body: JSON.stringify(roverInput)
        })
    const jsonData = await response.json()
    console.log(jsonData)
    setOutput(jsonData)
    return
  }

  const roverNumbers:[1,2] = [1,2]

  return (
    <>
    <form onSubmit={event => fetchSimulationData(event)} className=" w-auto flex flex-col mt-6">
      <div className="w-auto flex mx-4 justify-between">
        <div className="p-2 rounded-lg bg-white bg-opacity-50">
          <h1 className="font-semibold text-lg mb-4">Plateau Size</h1>
          <div className="flex content-center h-6 mb-2">
            <label htmlFor="plateauH" className="font-medium text-black leading-tight block align-middle w-36">
              Horizontal length:
            </label>
            <input className="ms-2 ps-4 rounded-lg w-24 text-center border border-black"
              type="number"
              min="2"
              id="plateauH"
              defaultValue={2}
              onChange={event => setRoverInput(prevState => ({...prevState, plateau: {...prevState.plateau, x: parseInt(event.target.value)}}))}
            />
          </div>
          <div className="flex content-center h-6 mb-2">
            <label htmlFor="plateauV" className="font-medium text-black leading-tight block align-middle w-36">
              Vertical length:
            </label>
            <input className="ms-2 ps-4 rounded-lg w-24 text-center border border-black"
              type="number"
              min="2"
              id="plateauV"
              defaultValue={2}
              onChange={event => setRoverInput(prevState => ({...prevState, plateau: {...prevState.plateau, y: parseInt(event.target.value)}}))}
            />
          </div>
        </div>
        {roverNumbers.map(num => {
          return (
        <div className="p-2 rounded-lg bg-white bg-opacity-50">
          <h1 className="font-semibold text-lg mb-4">Rover {num}</h1>
          <h2 className="font-medium mb-2 align-middle">Landing position</h2>
          <div className="flex content-center h-6 my-2">
            <label htmlFor={`rover${num}X`} className="font-medium text-black leading-tight block align-middle w-4">
              X: 
            </label>
            <input className="mx-2 ps-4 rounded-lg w-16 text-center border border-black"
              type="number"
              min="0"
              defaultValue={roverInput[`rover${num}`].x}
              id={`rover${num}X`}
              onChange={event => setRoverInput(prevState => ({...prevState, [`rover${num}`]: {...prevState[`rover${num}`], x: parseInt(event.target.value)}}))}
            />
            <label htmlFor={`rover${num}Y`} className="font-medium text-black leading-tight block align-middle w-4">
              Y: 
            </label>
            <input className="mx-2 ps-4 rounded-lg w-16 text-center border border-black"
              type="number"
              min="0"
              defaultValue={roverInput[`rover${num}`].y}
              id={`rover${num}Y`}
              onChange={event => setRoverInput(prevState => ({...prevState, [`rover${num}`]: {...prevState[`rover${num}`], y: parseInt(event.target.value)}}))}
            />
            <label htmlFor={`rover${num}D`} className="font-medium text-black leading-tight block align-middle w-32">
              Facing direction: 
            </label>
            <input className="mx-2 rounded-lg w-16 text-center border border-black"
              type="text"
              pattern="^[NESW]$"
              maxLength={1}
              defaultValue={roverInput[`rover${num}`].facing}
              id={`rover${num}D`}
              onChange={event => setRoverInput(prevState => ({...prevState, [`rover${num}`]: {...prevState[`rover${num}`], facing: event.target.value}}))}
            />
          </div>
          <div className="flex content-center h-6 my-2">
            <label htmlFor={`rover${num}seq`} className="font-medium text-black leading-tight block align-middle w-40">
              Movement sequence: 
            </label>
            <input className="mx-2 rounded-lg w-56 text-center border border-black"
              type="text"
              pattern="[LRM]*"
              id={`rover${num}seq`}
              onChange={event => setRoverInput(prevState => ({...prevState, [`rover${num}`]: {...prevState[`rover${num}`], mov_sequence: event.target.value}}))}
            />
          </div>
        </div>
        )
        })}
      </div>
      <input
        type="submit"
        value="Submit"
        className="ms-4 my-8 rounded-lg w-24 text-center font-semibold border border-black bg-white hover:border-2 hover:bg-slate-300"
        autoFocus
        />
    </form>
    <div className=" w-auto mx-4 p-2 rounded-lg bg-white bg-opacity-50">
      <h1 className="font-semibold text-lg">Output: {output}</h1>
    </div>
    </>
  )
}