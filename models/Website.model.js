var mongoose = require('mongoose');
var searchPlugin = require('mongoose-search-plugin');
var Schema = mongoose.Schema;

var WebsiteSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  submittedBy: {
    id: {
      type: Schema.ObjectId, //linking it to user
      ref: 'User'
    }
  },
  url: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  created_at: {
    type: Date,
    default: Date.now
  }
});


// refernce plugin
WebsiteSchema.plugin(searchPlugin, {
	// array of properties defined according to schema
	// plugin will create keywords that will be related to model that we can search for
	fields: ['title', 'url', 'description']
})

module.exports = mongoose.model('Website', WebsiteSchema);
