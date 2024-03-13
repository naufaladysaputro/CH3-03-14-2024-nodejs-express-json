const fs = require("fs");
const express = require('express') 
 
const app = express() 
const PORT = 8000; 

app.use(express.json())

const customers = JSON.parse(
    fs.readFileSync(`${__dirname}/data/dummy.json`)
);
 
// localhost:8000 
app.get('/', (req, res, next) => { 
    res.send("<h1>halo fsw1</h1>") 
}); 

app.get('/api/v1/customers', (req, res, next) => { 
    res.status(200).json({
        status: "success",
        //lenght
        totalData: customers.length,
        data: {
            customers,
        },
    });
}); 

app.post("/api/v1/customers", (req, res) => {
    const newCustomer = req.body;

    customers.push(req.body);

    fs.writeFile(`${__dirname}/data/dummy.json`, JSON.stringify(customers), err => {
        res.status(201).json({
            status: "success",
            data: {
                customers: newCustomer,
            },
        });
    });
});
 
app.listen(PORT, () => { 
    console.log(`APP runing on port : ${PORT}`) 
});