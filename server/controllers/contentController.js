import { db } from '../config/firebase.js';
import fs from 'fs';

// Generic Get All
export const getAll = async (req, res) => {
  const { collection } = req.params;
  try {
    const snapshot = await db.collection(collection).get();
    const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.json(data);
  } catch (error) {
    console.error(`Error fetching ${collection}:`, error);
    fs.writeFileSync('error_log.txt', String(error.stack));
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Generic Get One
export const getOne = async (req, res) => {
  const { collection, id } = req.params;
  try {
    const doc = await db.collection(collection).doc(id).get();
    if (!doc.exists) {
      return res.status(404).json({ error: 'Document not found' });
    }
    res.json({ id: doc.id, ...doc.data() });
  } catch (error) {
    console.error(`Error fetching ${collection}/${id}:`, error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Generic Create (Protected)
export const createDoc = async (req, res) => {
  const { collection } = req.params;
  const data = req.body;
  try {
    const newDocRef = db.collection(collection).doc(); // Auto-generate ID
    await newDocRef.set({ ...data, createdAt: new Date().toISOString() });
    res.status(201).json({ id: newDocRef.id, ...data });
  } catch (error) {
    console.error(`Error creating ${collection}:`, error);
    fs.writeFileSync('error_log.txt', String(error.stack));
    res.status(500).json({ error: error.message });
  }
};

// Generic Update (Protected)
export const updateDoc = async (req, res) => {
  const { collection, id } = req.params;
  const data = req.body;
  try {
    await db.collection(collection).doc(id).update({ ...data, updatedAt: new Date().toISOString() });
    res.json({ id, ...data });
  } catch (error) {
    console.error(`Error updating ${collection}/${id}:`, error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Generic Delete (Protected)
export const deleteDoc = async (req, res) => {
  const { collection, id } = req.params;
  try {
    await db.collection(collection).doc(id).delete();
    res.json({ message: 'Document deleted successfully' });
  } catch (error) {
    console.error(`Error deleting ${collection}/${id}:`, error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
