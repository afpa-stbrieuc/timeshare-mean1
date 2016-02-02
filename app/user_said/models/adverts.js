/*  ../models/adverts.js*/

var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var advertSchema   = new Schema({
	type: {type: String, enum: ['Offre de service', 'Demande'], required: true},
        author : {type: String, required: true},//{type: Schema.Types.ObjectId, ref: 'user' },
        title: String,
        content: String,
        media : String,
        loc: String,
        work_date : {type: Date},
        work_duration_estimated : Number,
        created_at: {type: Date},
        updated_at: {type: Date},
        published: Boolean,
        answered: Boolean,    
        confirmed: Boolean,
        helper : String,//{type: Schema.Types.ObjectId, ref: 'user' },
        work_duration_real : Number
        },
        { 
            collection : 'adverts'
        });
        
 advertSchema.pre('save', function(next){
  now = new Date();
  this.updated_at = now;
  if ( !this.created_at ) {
    this.created_at = now;
  }
  next();
});       

module.exports = mongoose.model('kaka', advertSchema);


