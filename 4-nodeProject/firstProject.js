const fs = require("fs");
const http = require("http");
const url = require("url");
const replaceTemplate = require("./modules/replaceTemplate");
// const slugify = require('slugify');

// slugify('some string') // some-string
// if you prefer something other than '-' as separator
// slugify('some string', '_')  // some_string

// const replaceTemplate = (temp, obj) => {
//     let output = temp.replaceAll('{%PRODUCTNAME%}', obj.productName);
//     output = output.replaceAll('{%IMAGE%}', obj.image);
//     output = output.replaceAll('{%FROM%}', obj.from);
//     output = output.replaceAll('{%NUTRIENTS%}', obj.nutrients);
//     output = output.replaceAll('{%QUANTITY%}', obj.quantity);
//     output = output.replaceAll('{%PRICE%}', obj.price);
//     output = output.replaceAll('{%ID%}', obj.id);
//     output = output.replaceAll('{%DESCRIPTION%}', obj.description);
//     if (!obj.organic) output = output.replaceAll('{%NOT_ORGANIC%}', 'not-organic');
//     return output
// }

const tempOverview = fs.readFileSync(
  `${__dirname}/templates/template-overview.html`,
  "utf-8"
);
const tempcard = fs.readFileSync(
  `${__dirname}/templates/template-card.html`,
  "utf-8"
);
const tempProduct = fs.readFileSync(
  `${__dirname}/templates/template-product.html`,
  "utf-8"
);

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, "utf-8");
const dataObj = JSON.parse(data);

// const slugs = dataObj.map((data) => slugify(data.productName, { lower: true }));
// console.log(slugs);

const server = http.createServer((req, res) => {
  // const pathname = req.url
  const { query, pathname } = url.parse(req.url, true);
  console.log(url.parse(req.url, true));

  // Overview page
  if (pathname === "/" || pathname === "/overview") {
    res.writeHead(200, { "content-type": "text/html" });

    const cardHtml = dataObj.map((data) => replaceTemplate(tempcard, data));
    // console.log(cardHtml)
    const output = tempOverview.replace("{%PRODUCT_CARDS%}", cardHtml);

    res.end(output);

    // Products page
  } else if (pathname === "/product") {
    const product = dataObj[query.id];
    const output = replaceTemplate(tempProduct, product);
    res.end(output);

    // API
  } else if (pathname === "/api") {
    res.writeHead(200, { "content-type": "application/json" });
    res.end(data);

    // Not Found
  } else {
    res.writeHead(400, {
      "content-type": "text/html",
    });
    res.end("<h1>PAGE NOT FOUND...</h1>");
  }
});
server.listen(8000, "127.0.0.1", () => {
  console.log("First Web Server, Listening to requests on port 8000");
});

//created package.json using 'npm init' command in terminal
