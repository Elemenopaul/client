// pages/api/savePeople.js
import { savePeople } from '../../src/savePeople';

export default async function handler(req, res) {
  try {
    // The people to save should be in the request body
    const peopleToSave = req.body;

    // Call the savePeople function to save the people to the database
    const savedPeople = await savePeople(peopleToSave);

    // Send a success response back to the client
    res.json({ message: 'People saved successfully', savedPeople });
  } catch (error) {
    console.error('Error in /api/savePeople:', error);

    // Send an error response back to the client
    res.status(500).json({ error: 'An error occurred while saving people' });
  }
}