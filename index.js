///////////////////////////////////////////////////////
//FILES
///////////////////////////////////////////////////////
//Blocking, Synchronous way
/*
const fs = require('fs');

const textIn = fs.readFileSync('./txt/input.txt', 'utf-8')
console.log(textIn)
fs.writeFileSync('./txt/output.txt', `Last updated date : ${new Date()}`)
console.log('file written')*/

//Non-blocking , Asynchronous way
/*
fs.readFile( './txt/startr.txt', 'utf-8', (err, data1) => {
    if(err) return console.log('error 💥')
    fs.readFile( `./txt/${data1}.txt`, 'utf-8', (err, data2) => {
        console.log(data2)
        fs.readFile( `./txt/append.txt`, 'utf-8', (err, data3) => {
            console.log(data3);
            fs.writeFile('./txt/final.txt', `${data2}\n${data3}`, 'utf-8', err => {
                console.log('Data has been written')
            })
        })
    })
})
console.log('will read file!')*/

///////////////////////////////////////////////////////
//SERVER
///////////////////////////////////////////////////////
http = require('http')

const server = http.createServer((req, res) => {
    console.log(req);
    res.end('Hello from the server!');
});

server.listen(8000, 'localhost', ()=>{
    console.log('Listening to request on port 8000');
});