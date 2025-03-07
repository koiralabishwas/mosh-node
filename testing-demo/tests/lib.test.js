const lib = require('../lib')


describe('absoloute', () => {
  it('absolute - should return positive if input is positive', () => { 
    const result = lib.absolute(1)
    expect(result).toBe(1)
  })
  
  it('absolute - should return negative if input is negative', () => { 
    const result = lib.absolute(-1)
    expect(result).toBe(1)
  })
  
  it('absolute - should return 0 if input is 0', () => { 
    const result = lib.absolute(0)
    expect(result).toBe(0)
  })
}) 
