var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create the schema
var PetSchema = new mongoose.Schema({
    name: { type: String, unique : [true, 'Pet already exists'], required: [true, 'Pet Name is required'], minlength: [3, 'Pet names must contain at least three characters'] },
    type: { type: String, required: [true, 'Specify the pet type'], minlength: [3, 'Specify pet type of at least three characters']},
    description: { type: String, required: [true, 'Describe the pet'], minlength: [3, 'Describe the pet with at least three characters']},
    skills:  { type : Array , default : [] },
    likes : { type : Number, default : 0},
    created_at: { type: Date, default: Date.now() },
    updated_at: { type: Date, default: Date.now() }
});

mongoose.model('Pet',PetSchema);

// var ReviewSchema = new mongoose.Schema({
//     _pet: {type: Schema.Types.ObjectId, ref: 'pet'},
//     customer_name: { type: String,required : [true, 'Customer Name is required'], minlength: [3, 'Customer names must contain at least three characters']},
//     content : { type: String, required : [true, 'Review is required'], minlength: [3, 'Review with at least three characters'] },
//     stars : {type: Number, required : true}
//    }, {timestamps: true });

// petSchema.plugin(autoIncrement.plugin, { model: 'pet', field: 'ID', startAt: 1, incrementBy: 1 });
// mongoose.model('Review',ReviewSchema);


