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

  async function placeholderFun(event: FormEvent) {
    event.preventDefault()
    // console.log(roverInput)
    const response = await fetch("http://localhost:3001/api/logs", {
        method: 'POST',
        headers: {
          'content-type': 'application/json;charset=UTF-8',
        },
        body: JSON.stringify(roverInput)
        })
    const jsonData = await response.json()
    console.log(jsonData)
    return
  }

  return (
    <form onSubmit={event => placeholderFun(event)} className=" w-auto flex flex-col mt-6">
      <div className="w-auto flex mx-4 justify-between">
        <div>
          <h1 className="font-semibold text-lg mb-4">Plateau Size</h1>
          <div className="flex content-center h-6 mb-2">
            <label htmlFor="plateauH" className="font-medium text-black leading-tight block align-middle w-36">
              Horizontal length:
            </label>
            <input
              type="number"
              min="2"
              id="plateauH"
              placeholder=""
              className="ms-2 ps-4 rounded-lg w-24 text-center border border-black"
              autoFocus
              onChange={event => setRoverInput(prevState => ({...prevState, plateau: {...prevState.plateau, x: parseInt(event.target.value)}}))}
            />
          </div>
          <div className="flex content-center h-6 mb-2">
            <label htmlFor="plateauV" className="font-medium text-black leading-tight block align-middle w-36">
              Vertical length:
            </label>
            <input
              type="number"
              min="2"
              id="plateauV"
              placeholder=""
              className="ms-2 ps-4 rounded-lg w-24 text-center border border-black"
              autoFocus
              onChange={event => setRoverInput(prevState => ({...prevState, plateau: {...prevState.plateau, y: parseInt(event.target.value)}}))}
            />
          </div>
        </div>
        <div>
          <h1 className="font-semibold text-lg mb-4">Rover 1</h1>
          <h2 className="font-medium mb-2 align-middle">Landing position</h2>
          <div className="flex content-center h-6 my-2">
            <label htmlFor="rover1X" className="font-medium text-black leading-tight block align-middle w-4">
              X: 
            </label>
            <input
              type="number"
              min="0"
              id="rover1X"
              placeholder=""
              className="mx-2 ps-4 rounded-lg w-16 text-center border border-black"
              autoFocus
              onChange={event => setRoverInput(prevState => ({...prevState, rover1: {...prevState.rover1, x: parseInt(event.target.value)}}))}
            />
            <label htmlFor="rover1Y" className="font-medium text-black leading-tight block align-middle w-4">
              Y: 
            </label>
            <input
              type="number"
              min="0"
              id="rover1Y"
              placeholder=""
              className="mx-2 ps-4 rounded-lg w-16 text-center border border-black"
              autoFocus
              onChange={event => setRoverInput(prevState => ({...prevState, rover1: {...prevState.rover1, y: parseInt(event.target.value)}}))}
            />
            <label htmlFor="rover1D" className="font-medium text-black leading-tight block align-middle w-32">
              Facing direction: 
            </label>
            <input
              type="text"
              pattern="^[NnEeSsWw]$"
              maxLength={1}
              id="rover1D"
              placeholder=""
              className="mx-2 rounded-lg w-16 text-center border border-black"
              autoFocus
              onChange={event => setRoverInput(prevState => ({...prevState, rover1: {...prevState.rover1, facing: event.target.value}}))}
            />
          </div>
          <div className="flex content-center h-6 my-2">
            <label htmlFor="rover1seq" className="font-medium text-black leading-tight block align-middle w-40">
              Movement sequence: 
            </label>
            <input
              type="text"
              pattern="[LlRrMm]*"
              id="rover1seq"
              placeholder=""
              className="mx-2 rounded-lg w-56 text-center border border-black"
              autoFocus
              onChange={event => setRoverInput(prevState => ({...prevState, rover1: {...prevState.rover1, mov_sequence: event.target.value}}))}
            />
          </div>
        </div>
        <div>
          <h1 className="font-semibold text-lg mb-4">Rover 2</h1>
          <h2 className="font-medium mb-2 align-middle">Landing position</h2>
          <div className="flex content-center h-6 my-2">
            <label htmlFor="rover2X" className="font-medium text-black leading-tight block align-middle w-4">
              X: 
            </label>
            <input
              type="number"
              min="0"
              id="rover2X"
              placeholder=""
              className="mx-2 ps-4 rounded-lg w-16 text-center border border-black"
              autoFocus
              onChange={event => setRoverInput(prevState => ({...prevState, rover2: {...prevState.rover2, x: parseInt(event.target.value)}}))}
            />
            <label htmlFor="rover2Y" className="font-medium text-black leading-tight block align-middle w-4">
              Y: 
            </label>
            <input
              type="number"
              min="0"
              id="rover2Y"
              placeholder=""
              className="mx-2 ps-4 rounded-lg w-16 text-center border border-black"
              autoFocus
              onChange={event => setRoverInput(prevState => ({...prevState, rover2: {...prevState.rover2, y: parseInt(event.target.value)}}))}
            />
            <label htmlFor="rover2D" className="font-medium text-black leading-tight block align-middle w-32">
              Facing direction: 
            </label>
            <input
              type="text"
              pattern="^[NnEeSsWw]$"
              maxLength={1}
              id="rover2D"
              placeholder=""
              className="mx-2 rounded-lg w-16 text-center border border-black"
              autoFocus
              onChange={event => setRoverInput(prevState => ({...prevState, rover2: {...prevState.rover2, facing: event.target.value}}))}
            />
          </div>
          <div className="flex content-center h-6 my-2">
            <label htmlFor="rover2seq" className="font-medium text-black leading-tight block align-middle w-40">
              Movement sequence: 
            </label>
            <input
              type="text"
              pattern="[LlRrMm]*"
              id="rover2seq"
              placeholder=""
              className="mx-2 rounded-lg w-56 text-center border border-black"
              autoFocus
              onChange={event => setRoverInput(prevState => ({...prevState, rover2: {...prevState.rover2, mov_sequence: event.target.value}}))}
            />
          </div>
        </div>
      </div>
      <input
        type="submit"
        value="Submit"
        className="ms-4 my-8 rounded-lg w-24 text-center font-semibold border border-black bg-white hover:border-2 hover:bg-slate-300"
        autoFocus
        />
    </form>
  )
}