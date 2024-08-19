const express = require('express');
const router = express.Router();
const Item = require('../models/Item'); // Assuming you have an Item model

// POST endpoint to create a new item
router.post('/', async (req, res) => {
  try {
    const newItem = new Item(req.body);
    console.log(req.body);
    await newItem.save();
    res.status(201).json(newItem);
  } catch (error) {
    res.status(500).json({ message: 'Failed to add item', error });
  }
});

// GET endpoint to retrieve all items
router.get('/', async (req, res) => {
  try {
    const items = await Item.find();
    res.status(200).json(items);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch items', error });
  }
});

module.exports = router;
