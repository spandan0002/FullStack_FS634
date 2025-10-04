import express from "express";

const app = express();
app.use(express.json());

let cards = [
  { id: 1, suit: "Hearts", value: "Ace" },
  { id: 2, suit: "Spades", value: "King" }
];
app.get("/cards", (req, res) => {
  res.json(cards);
});

app.post("/cards", (req, res) => {
  const { suit, value } = req.body;
  const newCard = { id: cards.length + 1, suit, value };
  cards.push(newCard);
  res.status(201).json(newCard);
});
app.get("/cards/:id", (req, res) => {
  const card = cards.find(c => c.id == req.params.id);
  card ? res.json(card) : res.status(404).send("Card not found");
});
app.delete("/cards/:id", (req, res) => {
  cards = cards.filter(c => c.id != req.params.id);
  res.send("Card deleted if existed");
});

app.listen(3000, () => console.log("Server running on http://localhost:3000"));
