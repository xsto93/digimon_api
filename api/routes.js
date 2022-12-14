const express = require("express");
const { default: mongoose } = require("mongoose");
const digimon = require('./mock/digimon.json');
const notFound = require('./middlewares/notFound')
const error = require('./middlewares/error')
let CardModel = require("./model/model");

const app = express();
app.use(express.json());

app.get("/api/cards", async (request, response, next) => {
  const { limit } = request.query;
  try {
    const cards = await CardModel.find({}).limit(limit || 50);
    response.json(cards);
  } catch (error) {
    next(error);
  }
});

app.get("/api/card/:cardnumber", async (request, response, next) => {
  try {  
    const { cardnumber } = request.params;
    const card = await CardModel.findOne({ cardnumber: cardnumber });
    if (card) response.json(card);
    next();
  } catch (error) {
    next(error);
  }
});

app.post("/api/card", async (request, response, next) => {
  const card = new CardModel(request.body);
  try {
    await card.save();
    response.send(card);
  } catch (error) {
    next(error);
  }
});

app.put("/api/card/:id", async (request, response, next) => {
  const { id } = request.params;
  const card = request.body;
  const newCardInfo = {
    quantity: card.quantity,
    cardnumber: card.cardnumber,
  };

  try {
    const updatedCard = await CardModel.findByIdAndUpdate(id, newCardInfo, {
      new: true,
    });
    response.status(200).json(updatedCard);
  } catch (error) {
    next(error);
  }
});

app.delete("/api/card/:id", async (request, response, next) => {
  const { id } = request.params;
  try {
    await CardModel.findOneAndDelete(id);
    response
      .status(204)
      .send("Todo Ok");
  } catch (error) {
    next();
  }
});

app.post("/api/add_all_cards", async (_request, response, next) => {
  const cards = digimon;

  try {
    cards.map(async card => {
      card.quantity = 0;
      const newCard = new CardModel(card);
      await newCard.save();
    })
    
    response.send(cards);
  } catch (error) {
    next(error);
  }
});

app.delete("/api/delete_all", async (_request, response, next) => {
  console.log('entra en delete all');
  
  try {
    CardModel.deleteMany();
    response.status(204).end()
  } catch (error) {
    next(error);
  }
});

app.use(notFound);
app.use(error);

module.exports = app;
