export interface Plateau {
  x: number,
  y: number
}

export interface Rover {
  x: number,
  y: number,
  facing: string,
  mov_sequence: string
}

export interface MarsRoverInput {
  plateau: Plateau,
  rover1: Rover,
  rover2: Rover
}