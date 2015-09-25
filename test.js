import Microbial from './Microbial'
import chai from 'chai'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'

const expect = chai.expect

chai.use(sinonChai)

describe('Microbial', () => {
  let mb

  before(() => {
    mb = new Microbial([1, 1], 1, 1)
  })

  describe('#constructor', () => {
    it('returns an instance of Microbial', () => {
      expect(mb).to.be.instanceOf(Microbial)
      expect(mb.boxes).to.eql([1, 1])
      expect(mb.population).to.have.length(20)
    })
  })

  describe('#crossover', () => {
    it('it modifies loser but not winner', () => {
      mb.crossover(0, 1)
      expect(mb.population[0]).to.be.eql(mb.population[0])
      expect(mb.population[1]).to.be.eql(mb.population[0])
    })
  })

  describe('#mutate', () => {
    before(() => {
      mb.population[0] = [0, 0]
    })

    it('it inverts the genome', () => {
      mb.mutate(0)

      expect(mb.population[0]).to.be.eql([1, 1])
    })
  })

  describe('#fitness', () => {
    before(() => {
      mb.population[0] = [0, 1]
    })

    it('returns how well fit is the genome', () => {
      expect(mb.fitness(0)).to.be.eql(0)
    })
  })

  describe('#run', () => {
    let crossover = sinon.spy()
    let mutate = sinon.spy()

    before(() => {
      sinon.stub(Microbial.prototype, 'crossover', crossover)
      sinon.stub(Microbial.prototype, 'mutate', mutate)
      sinon.stub(Microbial.prototype, 'fitness', () => 0)
    })

    after(() => {
      Microbial.prototype.crossover.restore()
      Microbial.prototype.mutate.restore()
      Microbial.prototype.fitness.restore()
    })

    it('gets the fittest in the population', () => {
      let answer = mb.run()

      expect(crossover).to.have.been.calledOnce
      expect(mutate).to.have.been.calledOnce
      expect(answer).to.have.length(2)
      expect(mb.iterations).to.eql(1)
    })
  })
})
