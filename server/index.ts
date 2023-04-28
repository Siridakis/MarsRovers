import express from "express"
import cors from 'cors'

interface Plateau {
  x: number,
  y: number
}

interface Rover {
  x: number,
  y: number,
  facing: string,
  mov_sequence: string
}

interface marsRoverInput {
  plateau: Plateau,
  rover1: Rover,
  rover2: Rover
}

const app = express()
app.use(express.json())
app.set("Content-Security-Policy", "default-src 'self'");
app.use(cors({origin: 'http://localhost:5173'}));





let logs = [{}]

let people = [
    {
      name: "Hannah Rickard",
      number: "06-51-99-56-83",
      id: 1
    },
    {
      name: "Persona 5",
      number: "10987654",
      id: 2
    },
    {
      name: "Courtney Martinez",
      number: "3691215",
      id: 3
    }
  ]

  function determineOutput({plateau, rover1, rover2}:marsRoverInput) {
    const max_X = plateau.x - 1;
    const max_Y = plateau.y - 1;

    if ((rover1.x > max_X) || (rover1.y > max_Y)) {
      return 'Rover 1 landing position exceeds the plateau size'
    }
    
    
    if ((rover2.x > max_X) || (rover2.y > max_Y)) {
      return 'Rover 2 landing position exceeds the plateau size'
    }

    let rover1_pos = rover1;
    let rover2_pos = rover2;

    let log1 = [{x: rover1_pos.x, y: rover1_pos.y, facing: rover1_pos.facing}]
    let log2 = [{x: rover2_pos.x, y: rover2_pos.y, facing: rover2_pos.facing}]

    console.log([...rover1.mov_sequence])
    for (let i = 0; i < [...rover1.mov_sequence].length; i++) {
      let command = [...rover1.mov_sequence][i]
      console.log(command)
      switch (command) {
        case 'M': rover1_pos = moveRover(rover1_pos); break;
        case 'L': rover1_pos = turnRover(rover1_pos,'L'); break;
        case 'R': rover1_pos = turnRover(rover1_pos,'R'); break;
        default: return `Invalid command in rover 1 movement sequence`
      }
      log1.push({x: rover1_pos.x, y: rover1_pos.y, facing: rover1_pos.facing})
    }

    console.log([...rover2.mov_sequence])
    for (let i = 0; i < [...rover2.mov_sequence].length; i++) {
      let command = [...rover2.mov_sequence][i]
      console.log(command)
      switch (command) {
        case 'M': rover2_pos = moveRover(rover2_pos); break;
        case 'L': rover2_pos = turnRover(rover2_pos,'L'); break;
        case 'R': rover2_pos = turnRover(rover2_pos,'R'); break;
        default: return 'Invalid command in rover 2 movement sequence'
      }
      log2.push({x: rover2_pos.x, y: rover2_pos.y, facing: rover2_pos.facing})
    }

    if (log1.find(element => (element.x == rover2.x && element.y == rover2.y))) {
      return 'Movement sequence for rover 1 will result in collision with rover 2'
    }

    if (log1.find(element => (element.x > max_X || element.x < 0 || element.y > max_Y || element.y < 0))) {
      return 'Rover 1 movement sequence will lead it out of the plateau'
    }

    if (log2.find(element => (element.x == rover1_pos.x && element.y == rover1_pos.y))) {
      return 'Movement sequence for rover 2 will result in collision with rover 1'
    }

    if (log2.find(element => (element.x > max_X || element.x < 0 || element.y > max_Y || element.y < 0))) {
      return 'Rover 2 movement sequence will lead it out of the plateau'
    }

    console.log(log1)
    console.log(log2)

    return `
      Rover 1 final position is x: ${rover1_pos.x} y: ${rover1_pos.y} facing: ${rover1_pos.facing} 
      Rover 2 final position is x: ${rover2_pos.x} y: ${rover2_pos.y} facing: ${rover2_pos.facing}
      `
  }

  function moveRover(rover: Rover) {
    switch (rover.facing) {
      case 'N': rover.y += 1; break;
      case 'E': rover.x += 1; break;
      case 'S': rover.y -= 1; break;
      case 'W': rover.x -= 1; break;
      default: console.log('ERROR')
    }
    return rover
  }

  function turnRover(rover: Rover, command: string) {
    const directions = ['N','E','S','W']
    let directionIndex = directions.indexOf(rover.facing)
    console.log('directionIndex',directionIndex)
    if (command == 'L') {
      console.log((directionIndex + 3) % 4)
      rover.facing = directions[(directionIndex + 3) % 4]
    }
    if (command == 'R') {
      console.log((directionIndex + 1) % 4)
      rover.facing = directions[(directionIndex + 1) % 4]
    }
    return rover
  }

  app.get('/', (request, response) => {
      response.send('<h1>Phonebook</h1>')
  })

  app.get('/api/people', (request, response) => {
      response.json(people)
  })

  app.post('/api/logs', (request, response) => {
    const output = determineOutput(request.body)
    response.json(output)
})

  const PORT = 3001
  app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`)
  })

