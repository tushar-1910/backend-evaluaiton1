const express = require('express');
const fs = require('fs');

const app = express();

app.use(express.json());


//get all products
async function getProducts(req,res) {
    let products = await fs.readFileSync('products.json');
    products = JSON.parse(products);
    res.send(products.products);
}

//create product
async function addProduct(req,res) {
    let products = await fs.readFileSync('products.json');
    products = JSON.parse(products);
    let newProduct = req.body;
    products.products.push(newProduct);
    await fs.writeFileSync('products.json', JSON.stringify(products));
    res.send(products.products);
}

//update product by id
async function updateProduct(req,res) {
    let products = await fs.readFileSync('products.json');
    products = JSON.parse(products);
    let productId = req.params.id;
    let product = req.body;
    console.log(products)
    productId = products.products.findIndex(product => product.id == productId);
    products.products[productId] = product;
    await fs.writeFileSync('products.json', JSON.stringify(products));
    res.send(products.products);
}

//delete product by id
async function deleteProduct(req,res) {
    let products = await fs.readFileSync('products.json');
    products = JSON.parse(products);
    let productId = req.params.id;
    productId = products.products.findIndex(product => product.id == productId);
    products.products.splice(productId,1);
    await fs.writeFileSync('products.json', JSON.stringify(products));
    res.send(products.products);
}


app.get("/products",getProducts);
app.post("/products",addProduct);
app.patch("/products/:id",updateProduct);
app.delete("/products/:id",deleteProduct);

app.listen(8080, ()=>{
    console.log('listening on port 8080');
});