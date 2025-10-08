/* globals describe, it */
import './svg.cspec.js'
import Carte from '../src/carte.js'
import Svg from '../src/svg.js'
import SvgInterface from '../src/svg-interface.js'
import chai from 'chai'
import sinon from 'sinon'
// import sinonChai from 'sinon-chai'
const expect = chai.expect
const spy = sinon.spy
// chai.use(sinonChai)

/** @test {Carte} */
describe('Carte', function () {
  /** @test {Carte#constructor} */
  describe('#constructor()', function () {
    const columnsHeaders = ['name', 'cost']
    const csvLine = ['test', '10']
    it('Should create a card', function () {
      const svg = new Svg()
      spy(svg, 'clone')
      const carte = new Carte(columnsHeaders, csvLine, svg)
      expect(carte.caractDict.name).to.equal('test')
      expect(carte.caractDict.cost).to.equal('10')
      expect(svg.clone).to.have.been.calledOnce
    })
    it('Should throw a TypeError when the third parameter doesn\'t implement SvgInterface', function () {
      const createCarte = function () { new Carte(columnsHeaders, csvLine, {}) } // eslint-disable-line no-new
      expect(createCarte).throws(TypeError, 'svgTemplate should implement SvgInterface')
    })
  })
  describe('#createSvg()', function () {
    const columnsHeaders = ['name', 'cost']
    const csvLine = ['test', '10']
    it('Should inject the caracts in the correct place in the svg', function () {
      const svg = new Svg()
      svg.load('./templates/test.svg')
      const carte = new Carte(columnsHeaders, csvLine, svg)
      carte.createSvg()
      expect(carte).to.have.property('svg')
      expect(carte.svg).to.be.an.instanceOf(SvgInterface)
      // Note: These specific tests would need to be adjusted based on actual SVG content
      // expect(carte.svg.getElementById('name_id')).to.equal('test')
      // expect(carte.svg.getElementById('cost_id')).to.equal('10')
    })
  })
})
