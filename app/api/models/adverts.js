/*  ../models/adverts.js*/

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

<<<<<<< HEAD
var advertSchema   = new Schema({
	type: {type: String, enum: ['offre', 'demande'], required: true},
        author : {type: String, required: true},//{type: Schema.Types.ObjectId, ref: 'user' },
        title: String,
        content: String,
        media : String,
        loc: String,
        regions : {type: String, enum: ['auvergne-rhone-alpes','bretagne','bourgogne-franche-comte','centre-val-de-loire',
                'corse','grand-est','ile-de-france', 'nord','normandie','pays-de-la-loire','paca','sud-ouest-atlantique' ]},
        categories :{type: String, enum: ['aidePersonne', 'beauté', 'bricolage', 'demenagement', 'cours',
            'loisirs', 'maison', 'mecanique', 'transport', 'travail' ]}, 
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

module.exports = mongoose.model('advertSchema', advertSchema);
=======
var advertSchema = new Schema({
    type: {
        type: String,
        enum: ['offre', 'demande'],
        required: true
    },
    author: {
        type: String,
        required: true
    }, //{type: Schema.Types.ObjectId, ref: 'user' },
    title: String,
    content: String,
    media: String,
    loc: String,
    regions: {
        type: String,
        enum: ['auvergne-rhone-alpes', 'bretagne', 'bourgogne-franche-comte', 'centre-val-de-loire',
            'corse', 'grand-est', 'ile-de-france', 'nord', 'normandie', 'pays-de-la-loire', 'paca', 'sud-ouest-atlantique'
        ]
    },
    categories: {
        type: String,
        enum: ['aidePersonne', 'beauté', 'bricolage', 'demenagement', 'cours',
            'loisirs', 'maison', 'mecanique', 'transport', 'travail'
        ]
    },
    work_date: {
        type: Date
    },
    work_duration_estimated: Number,
    created_at: {
        type: Date
    },
    updated_at: {
        type: Date
    },
    published: Boolean,
    answered: Boolean,
    confirmed: Boolean,
    helper: String, //{type: Schema.Types.ObjectId, ref: 'user' },
    work_duration_real: Number
}, {
    collection: 'adverts'
});
>>>>>>> 135b185a022da516d0fea0f51211b249b99f1ac4

advertSchema.pre('save', function(next) {
    now = new Date();
    this.updated_at = now;
    if (!this.created_at) {
        this.created_at = now;
    }
    next();
});

module.exports = mongoose.model('advertSchema', advertSchema);