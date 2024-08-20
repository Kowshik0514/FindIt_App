const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

router.get('/users', async (req, res) => {
    const collectionName = 'users'; // Replace with your collection name
  
    try {
      const database =  mongoose.connection.db; // Replace with your database name
      const collection = database.collection(collectionName);
  
      const count = await collection.countDocuments(); // Get the number of documents in the collection
      res.json({ collection: collectionName, size: count });
    } catch (error) {
      res.status(500).json({ error: 'Failed to get collection size' });
    }
  });

  router.get('/foundItems', async (req, res) => {
    const collectionName = 'items'; // Replace with your collection name
  
    try {
      const database =  mongoose.connection.db; // Replace with your database name
      const collection = database.collection(collectionName);
  
      const count = await collection.countDocuments(); // Get the number of documents in the collection
      res.json({ collection: collectionName, size: count });
    } catch (error) {
      res.status(500).json({ error: 'Failed to get collection size' });
    }
  });

  router.get('/lostItems', async (req, res) => {
    const collectionName = 'lost_items'; // Replace with your collection name
  
    try {
      const database =  mongoose.connection.db; // Replace with your database name
      const collection = database.collection(collectionName);
  
      const count = await collection.countDocuments(); // Get the number of documents in the collection
      res.json({ collection: collectionName, size: count });
    } catch (error) {
      res.status(500).json({ error: 'Failed to get collection size' });
    }
  });

module.exports = router;