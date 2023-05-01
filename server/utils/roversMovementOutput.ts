import { Rover, MarsRoverInput} from '../types/marsRoversInterfaces'
import cloneDeep from 'lodash/cloneDeep';


export function roversMovementOutput({plateau, rover1, rover2}:MarsRoverInput) {
  const max_X = plateau.x - 1;
  const max_Y = plateau.y - 1;

  if ((rover1.x > max_X) || (rover1.y > max_Y)) {
    return 'Rover 1 landing position exceeds the plateau size'
  }
  
  if ((rover2.x > max_X) || (rover2.y > max_Y)) {
    return 'Rover 2 landing position exceeds the plateau size'
  }

  let rover1_pos = cloneDeep(rover1);
  let rover2_pos = cloneDeep(rover2);

  const rover2_initial_x = rover2.x;
  const rover2_initial_y = rover2.y;

  let log1 = [{x: rover1_pos.x, y: rover1_pos.y, facing: rover1_pos.facing}]
  let log2 = [{x: rover2_pos.x, y: rover2_pos.y, facing: rover2_pos.facing}]

  console.log([...rover1.mov_sequence])
  for (let i = 0; i < [...rover1.mov_sequence].length; i++) {
    let command = [...rover1.mov_sequence][i]
    switch (command.toUpperCase()) {
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
    switch (command.toUpperCase()) {
      case 'M': rover2_pos = moveRover(rover2_pos); break;
      case 'L': rover2_pos = turnRover(rover2_pos,'L'); break;
      case 'R': rover2_pos = turnRover(rover2_pos,'R'); break;
      default: return 'Invalid command in rover 2 movement sequence'
    }
    log2.push({x: rover2_pos.x, y: rover2_pos.y, facing: rover2_pos.facing})
  }

  if (log1.find(element => (element.x == rover2_initial_x && element.y == rover2_initial_y))) {
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
  switch (rover.facing.toUpperCase()) {
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
  if (command == 'L') {
    rover.facing = directions[(directionIndex + 3) % 4]
  }
  if (command == 'R') {
    rover.facing = directions[(directionIndex + 1) % 4]
  }
  return rover
}