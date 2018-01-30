var mongoose = require('mongoose');
// var review = mongoose.model('Review');
var pet = mongoose.model('Pet');

module.exports = {
    display: function (req, res) {
        console.log("Server Display All data")
        pet.find({}).sort({ type: 1 }).exec(function (err, pets) {
            // pet.find({}, function (err, pets) {
            if (err) {
                console.log("Server Display All data Error", err)
                res.json({ message: 'error', data: err.errors });
            } else {
                console.log("Server Display All data Success", pets)
                res.json({ message: 'success', data: pets });
            }
        })
    },

    create: function (req, res) {
        console.log("Server Create new data")
        var new_pet = new pet({
            name: req.body.name,
            type: req.body.type,
            description: req.body.description,
            skills: req.body.skills
        });
        console.log("Server Create new data - body", new_pet)
        new_pet.save(function (err) {
            if (err) {
                console.log("Server Create new data - Error", err)
                if (err.code == 11000) {
                    err.message = "pet name already exists"
                }
                res.json({ message: 'error', data: err });
            } else {
                console.log("Server Create new data - Success")
                res.json({ message: 'success' });
            }
        })
    },

    show: function (req, res) {
        console.log("Server get data by ID", req.params.id)
        // pet.findOne({ _id: req.params.id })
        // .populate({ path: 'reviews', options: { sort: { 'stars': -1 } } })
        // .exec(function (err, pet) {
        pet.findOne({ _id: req.params.id }, function (err, pet) {
            // pet.findOne({ID : req.params.id},  function(err, pet) {
            if (err) {
                console.log("Server get data by ID - Error", err)
                res.json({ message: 'error', data: err.errors });
            } else {
                console.log("Server get data by ID - success", pet)
                res.json({ message: 'success', data: pet });
            }
        })
    },

    edit: function (req, res) {
        console.log("Server update find data by ID", req.params.id)
        pet.findOne({ _id: req.params.id }, function (err, pet) {
            if (err) {
                console.log("Server update find data by ID - Error", err)
                res.json({ message: 'error', data: err });
            } else {
                pet.name = req.body.name;
                pet.type = req.body.type;
                pet.description = req.body.description;
                pet.skills = req.body.skills;
                pet.likes = req.body.likes;

                pet.save(function (err) {
                    if (err) {
                        console.log('Server update restaurant data by ID - Error', err);
                        res.json({ message: 'error', data: err });
                    } else {
                        console.log('Server update restaurant data by ID - success');
                        res.json({ message: 'success' });
                    }
                });
            }
        })
    },

    destroy: function (req, res) {
        console.log("Server delete data by ID", req.params.id)
        pet.remove({ _id: req.params.id }, function (err) {
            if (err) {
                console.log("Server delete data by ID - Error", err)
                res.json({ message: 'error', 'data': err.message });
            }
            else {
                console.log("Server delete data by ID - Success")
                res.json({ message: 'success', data: "deleted" });
            }
        })
    }
}