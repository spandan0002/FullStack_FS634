import express from "express";

const app = express();
app.use(express.json());

let seats = Array(10).fill(null); 
let locks = {};
app.get("/seats", (req, res) => {
  res.json(seats.map((seat, i) => ({
    seatNo: i + 1,
    bookedBy: seat
  })));
});
app.post("/lock", (req, res) => {
  const { seatNo, user } = req.body;
  if (seats[seatNo - 1]) return res.status(400).send("Seat already booked");
  if (locks[seatNo]) return res.status(400).send("Seat already locked");

  locks[seatNo] = user;
  res.send(`Seat ${seatNo} locked for ${user}. Confirm within 30s.`);
});
app.post("/confirm", (req, res) => {
  const { seatNo, user } = req.body;
  if (locks[seatNo] !== user) return res.status(400).send("No lock found for you.");

  seats[seatNo - 1] = user;
  delete locks[seatNo];
  res.send(`✅ Seat ${seatNo} confirmed for ${user}`);
});
setInterval(() => {
  for (let seat in locks) {
    console.log(`⏳ Unlocking seat ${seat} due to timeout.`);
    delete locks[seat];
  }
}, 30000);

app.listen(4000, () => console.log("🎟️ Ticket booking on http://localhost:4000"));
