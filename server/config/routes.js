var pet = require('../controllers/pets.js');
var path = require('path');

module.exports = function (app) {
    //=========================='GET' root route======================================//
    app.get('/', function (req, res) {
        res.send("Welcome to my pets API")
    })
    //=========================='GET' all data ======================================//
    app.get('/pets', function (req, res) {
        pet.display(req, res);
    })
    //=========================='GET' data by _id ===================================//
    app.get("/pets/:id", function (req, res) {
        pet.show(req, res);
    })
    //========================='POST' New pet ===================================//
    app.post("/pets", function (req, res) {
        pet.create(req, res);
    })
    //========================='PUT' Update pet by _id =========================//
    app.put("/pets/:id", function (req, res) {
        pet.edit(req, res);
    })
    //========================='DELETE' Delete pet by _id=======================//
    app.delete('/pets/:id', function (req, res) {
        pet.destroy(req, res);
    })
    //==================='ALL other routes' route back to client===================//
    app.all("*", (req, res, next) => {
        res.sendFile(path.resolve("./client/dist/index.html"))
    });
}