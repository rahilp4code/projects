const name = 'First Node Script BABY!';
// console.log(name);

const fs = require('fs');
const http = require('http');
const url = require('url');

////////////////////////////////////////////////////////////////////////////////////
// FILES

// //blocking Synchronous Way
// //reading file
// const text = fs.readFileSync('1.Intro/txt/first.txt', 'utf-8')
// console.log(text)
// //writing file
// fs.writeFileSync('1.Intro/txt/second.txt', 'File Second Written')
// console.log('FILE WRITTEN')

// non-Blocking Asynchronous way

// fs.readFile('1.Intro/txt/third.txt', 'utf-8', (err, data1) => {
//     if (err) return console.log('Error💥')
//     fs.readFile(`1.Intro/txt/${data1}.txt`, 'utf-8', (err, data2) => {
//         console.log(data2)
//         fs.readFile('1.Intro/txt/first.txt', 'utf-8', (err, data3) => {
//             console.log(data3)
//             fs.writeFile('1.Intro/txt/first.txt', `${data2}\n${data3}`, 'utf-8', err => {
//                 console.log('Done')
//             });
//         });
//     });
// });
// console.log('Its Asynchronous');


////////////////////////////////////////////////////////////////////////////////////
// SERVER

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8')
const dataObj = JSON.parse(data)

const server = http.createServer((req, res) => {
    // console.log(req)
    console.log(req.url) //logs the url name and shows favicon error lel

    const pathname = req.url
    if (pathname === '/') {
        res.end('Hellow from the server Dev!') // response on the web server
    } else if (pathname === '/overview') {
        res.end('Overview')
    } else if (pathname === '/api') {
        res.writeHead(200, { 'content-type': 'application/json' });
        res.end(data)
    } else {
        res.writeHead(400, {
            'content-type': 'text/html'
        });
        res.end('<h1>PAGE NOT FOUND...</h1>')
    }
})
server.listen(8000, '127.0.0.1', () => {
    console.log('First Web Server, Listening to rwquests on port 8000')
})

//Look after running this code the code didnt exit terminal its running it means its active and can take requests and send responses. To exit use ctrl+C
//🍩🍪🎂🍰🧁


////////////////////////////////////////////////////////////////////////////
