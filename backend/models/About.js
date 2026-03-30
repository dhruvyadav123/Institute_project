const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    default: 'New Card'
  },
  description: {
    type: String,
    required: true,
    default: 'Card description'
  },
  image: {
    type: String,
    default: '/uploads/default-card.jpg'
  },
  category: {
    type: String,
    default: 'General'
  },
  order: {
    type: Number,
    default: 0
  }
});

const statSchema = new mongoose.Schema({
  label: String,
  value: String,
  icon: String
});

const aboutSchema = new mongoose.Schema({
  collegeName: {
    type: String,
    required: true,
    default: 'CollegeName'
  },
  heading: {
    type: String,
    required: true,
    default: 'CollegeName focuses on quality education, innovation, and shaping future leaders with strong values.'
  },
  mission: {
    type: String,
    required: true,
    default: 'Our mission is to empower students with skills, confidence, and knowledge to succeed globally.'
  },
  cards: [cardSchema],
  stats: [statSchema],
  isActive: {
    type: Boolean,
    default: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

aboutSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('About', aboutSchema);