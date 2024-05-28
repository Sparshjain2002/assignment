// server.js
const express = require('express');
const app = express();
const path = require('path');

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

const vehicles = {
  "Maruti Suzuki Alto": { topSpeed: 140, fuelEfficiency: 22.05, fuelTankCapacity: 35, maxRange: 771.75 },
  "Hyundai i20": { topSpeed: 180, fuelEfficiency: 20.35, fuelTankCapacity: 37, maxRange: 753.05 },
  "Tata Nexon": { topSpeed: 180, fuelEfficiency: 17.57, fuelTankCapacity: 44, maxRange: 772.68 },
  "Honda City": { topSpeed: 180, fuelEfficiency: 17.8, fuelTankCapacity: 40, maxRange: 712.00 },
  "Mahindra Thar": { topSpeed: 155, fuelEfficiency: 15.2, fuelTankCapacity: 57, maxRange: 866.40 },
  "Toyota Innova Crysta": { topSpeed: 179, fuelEfficiency: 11.25, fuelTankCapacity: 55, maxRange: 618.75 },
  "Kia Seltos": { topSpeed: 170, fuelEfficiency: 16.8, fuelTankCapacity: 50, maxRange: 840.00 },
  "Renault Kwid": { topSpeed: 150, fuelEfficiency: 22.3, fuelTankCapacity: 28, maxRange: 624.40 },
  "Ford EcoSport": { topSpeed: 182, fuelEfficiency: 15.9, fuelTankCapacity: 52, maxRange: 826.80 },
  "Tata Tiago": { topSpeed: 150, fuelEfficiency: 23.84, fuelTankCapacity: 35, maxRange: 834.40 }
};

app.get('/vehicles', (req, res) => {
  res.json(vehicles);
});

app.post('/calculate', (req, res) => {
  const { vehicleType, distance } = req.body;
  const vehicle = vehicles[vehicleType];

  if (!vehicle) {
    return res.status(400).json({ error: 'Invalid vehicle type' });
  }

  const time = distance / vehicle.topSpeed;
  const fuelConsumption = distance / vehicle.fuelEfficiency;

  if (distance > vehicle.maxRange) {
    return res.json({ time, fuelConsumption, outOfRange: true });
  }

  res.json({ time, fuelConsumption, outOfRange: false });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
