const Customer = require('../models/Customer');
const auth = require('../auth');

module.exports = function(app){
 
 app.get('/customers', async (req, res, next) => {
     
    var reqToken = req.get('Authorization');
     try {
        const authToken = await auth.verifyToken(reqToken);
     } catch(err){
        res.sendStatus(403);
        //return next to stop execution (prevents "set headers after they are sent" error)
        return next();
     }


     try {
        const customers = await Customer.find({});
        res.send(customers);
     } catch(err) {
         console.log(err);
     }
  })

  //Get single customer
  app.get('/customers/:id', async (req, res, next) => {

    var reqToken = req.get('Authorization');
    try {
       const authToken = await auth.verifyToken(reqToken);
    } catch(err){
       res.sendStatus(403);
       //return next to stop execution (prevents "set headers after they are sent" error)
       return next();
    }

    try {
       const customer = await Customer.findById(req.params.id);
       res.send(customer);
    } catch(err) {
        console.log(err);
    }
 })

  //Add customer
  app.post('/customers', async (req, res, next) => {

    var reqToken = req.get('Authorization');
    try {
       const authToken = await auth.verifyToken(reqToken);
    } catch(err){
       res.sendStatus(403);
       //return next to stop execution (prevents "set headers after they are sent" error)
       return next();
    }

    //Check for json
    if(!req.is('application/json')) {
        console.log("Wrong content type");
    }

    const { name, email, balance } = req.body;

    const customer = new Customer({
        name,
        email,
        balance
    });

    try {
        const newCustomer = await customer.save();
        res.sendStatus(201);
    } catch(err){
        console.log(err);
    }

  })

  //Update customer
  app.put('/customers/:id', async (req, res, next) => {

    var reqToken = req.get('Authorization');
    try {
       const authToken = await auth.verifyToken(reqToken);
    } catch(err){
       res.sendStatus(403);
       //return next to stop execution (prevents "set headers after they are sent" error)
       return next();
    }

    //Check for json
    if(!req.is('application/json')) {
        console.log("Wrong content type");
    }

    try {
        const updatedCustomer = await Customer.findOneAndUpdate({_id: req.params.id}, req.body);
        res.sendStatus(200);
    } catch(err) {
        console.log(err);
    }

  })

  //Delete customer
  app.delete('/customers/:id', async (req, res, next) => {

    var reqToken = req.get('Authorization');
    try {
       const authToken = await auth.verifyToken(reqToken);
    } catch(err){
       res.sendStatus(403);
       //return next to stop execution (prevents "set headers after they are sent" error)
       return next();
    }

      try {
        const updatedCustomer = await Customer.findOneAndRemove({_id: req.params.id});
        res.sendStatus(204)
      } catch(err) {
        console.log(err);
      }
  })

}
