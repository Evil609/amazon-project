import {formatCurrency} from "../../scripts/utils/money.js"

describe('test suit: Formate currency' ,()=>{
  it('convert cents to dollars',()=>{
    expect(formatCurrency(2095)).toEqual('20.95')
  })
  it('work with 0',()=>{
    expect(formatCurrency(0)).toEqual('0.00')
  })
  describe('Rounds', ()=>{
    it('round up to the nearest cents',()=>{
      expect(formatCurrency(2000.5)).toEqual('20.01')
    })
    it('roun down to the nearest cents',()=>{
      expect(formatCurrency(2000.4)).toEqual('20.00')
    })
  })
})