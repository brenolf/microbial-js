'use strict'

const N = 20

export default class Microbial {
  constructor (boxes, crossrate, mutationrate) {
    this.population = []

    this.boxes = boxes

    this.CROSS = crossrate

    this.MUTATION = mutationrate

    for (let i = 0; i < N; i++) {
      let genome = boxes.map(() => ~~(Math.random() * 2))

      this.population.push(genome)
    }
  }

  crossover (winner, loser) {
    winner = this.population[winner]
    loser  = this.population[loser]

    for (let i = 0; i < this.boxes.length; i++) {
      if (Math.random() < this.CROSS) {
        loser[i] = winner[i]
      }
    }
  }

  mutate (index) {
    let genome = this.population[index]

    for (let i = 0; i < this.boxes.length; i++) {
      if (Math.random() < this.MUTATION) {
        genome[i] ^= 1
      }
    }
  }

  fitness (index) {
    let genome = this.population[index]

    let stack = [0, 0]

    genome.forEach((elm, i) => {
      stack[elm] += this.boxes[i]
    })

    return Math.abs(stack[0] - stack[1])
  }

  run () {
    this.iterations = 0

    while (true) {
      this.iterations++

      let winner = ~~(Math.random() * N)
      let loser  = ~~(Math.random() * N)

      if (this.fitness(loser) < this.fitness(winner)) {
        winner ^= loser
        loser ^= winner
        winner ^= loser
      }

      this.crossover(winner, loser)

      this.mutate(loser)

      if (this.fitness(loser) === 0) {
        return this.population[loser]
      }
    }
  }
}
