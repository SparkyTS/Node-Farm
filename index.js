str = 'hello world'
console.log(str)

const fs = require('fs');

const textIn = fs.readFileSync('./txt/input.txt', 'utf-8')
console.log(textIn)

fs.writeFileSync('./txt/output.txt', `Last updated date : ${new Date()}`)
console.log('file written')