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
http = require('http');
url = require('url');
fs = require('fs');

const replaceTemplate = (temp, product) => {
    let output = temp.replace(/{%ID%}/g, product.id);
    output = output.replace(/{%PRODUCT_NAME%}/g, product.productName);
    output = output.replace(/{%IMAGE%}/g, product.image);
    output = output.replace(/{%PRICE%}/g, product.price);
    output = output.replace(/{%FROM%}/g, product.from);
    output = output.replace(/{%NUTRIENTS%}/g, product.nutrients);
    output = output.replace(/{%QUANTITY%}/g, product.quantity);
    output = output.replace(/{%DESCRIPTION%}/g, product.description);

    if(!product.organic) output = output.replace(/{%NOT_ORGANIC%}/g, 'not-organic');
    return output;
}

const tempOverView = fs.readFileSync(`${__dirname}/templates/template-overview.html`, 'utf-8');
const tempCard = fs.readFileSync(`${__dirname}/templates/template-card.html`, 'utf-8');
const tempProduct = fs.readFileSync(`${__dirname}/templates/template-product.html`, 'utf-8');

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8');
const dataObj = JSON.parse(data);

const server = http.createServer((req, res) => {
    const pathName = req.url;

    switch (pathName) {
        //Overview Page
        case '/':
        case '/overview':
            res.writeHead(200, {'Content-Type': 'text/html'});

            const cardsHtml = dataObj.map(el => replaceTemplate(tempCard, el)).join('');
            res.end(tempOverView.replace('{%PRODUCT_CARDS%}', cardsHtml));
            break

        //Product Page
        case '/product':
            res.end('This is the porduct');
            break;

        //API
        case '/api':
            res.writeHead(200, {
                'Content-Type': 'application/json'
            })
            res.end(data);
            break;

        //Not found
        default:
            res.writeHead(404, {
                'Content-type': 'text/html',
                'my-own-header': 'hello-world'
            });
            res.end('<h1>Page not found!</h1>');
    }
});

server.listen(8000, 'localhost', ()=>{
    console.log('Listening to request on port 8000');
});