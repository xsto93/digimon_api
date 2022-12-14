const mongoose = require("mongoose");

const CardSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true
    },
    type: {
      type: String
    },
    color: {
      type: String
    },
    stage: {
      type: String
    },
    digi_type: {
      type: String
    },
    attribute: {
      type: String
    },
    level: {
      type: Number
    },
    play_cost: {
      type: Number
    },
    evolution_cost: {
      type: Number
    },
    cardrarety: {
      type: String
    },
    artist: {
      type: String
    },
    dp: {
      type: Number,
    },
    cardnumber: {
      type: String,
      required: true
    },
    maineffect: {
      type: String
    },
    soureeffect: {
      type: String
    },
    set_name: {
      type: String
    },
    card_sets: {
      type: Array
    },
    image_url: {
      type: String
    },
    quantity: {
      type: Number,
    },
  },{ collection: 'collected-cards' });

  CardSchema.set('toJSON', {
    transform: (_document, returnedObject) => {
      returnedObject.id = returnedObject._id;
      delete returnedObject._id;
      delete returnedObject.__v;
    }
  })
  
  const Card = mongoose.model("Card", CardSchema);
  
  module.exports = Card;