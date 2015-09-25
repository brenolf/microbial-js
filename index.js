'use strict'

import Microbial from './Microbial'

const BOXES = [1, 2, 5, 3, 2, 1]
const CROSSOVER_RATE = 0.5
const MUTATION_RATE = 0.2

let alg = new Microbial(BOXES, CROSSOVER_RATE, MUTATION_RATE)

console.log(BOXES)

console.log(alg.run(), 'after', alg.iterations, 'iterations')
