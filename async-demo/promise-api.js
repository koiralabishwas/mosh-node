// const p = Promise.resolve({id : 1})
const p = Promise.reject(new Error('reason for rejection'))
// better to use Error to reject smt because it return error with call stacks
p.catch(err => console.log(err.message))