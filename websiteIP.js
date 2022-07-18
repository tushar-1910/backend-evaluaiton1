const express = require('express');
const dns = require('dns');

const app = express();

app.use(express.json());

async function getIP(req,res) {
    let {website_name} = req.body;
    console.log(website_name,req.body)
    await dns.lookup(website_name, (err, address) => {
            console.log(address);
            res.send(address);
        });
}

app.post("/getmeip", getIP);


app.listen(8000, ()=>{
    console.log('listening on port 8000');
});