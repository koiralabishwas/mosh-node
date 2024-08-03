const p = new Promise((() => 1 ,() => new Error('false') ))

console.log(p)