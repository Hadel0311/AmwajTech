import { db, storage } from '../firebase/config.js';
import { collection, getDocs, doc, getDoc, addDoc, updateDoc, deleteDoc, writeBatch } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

export const api = {
  // Public Data Fetching
  getAll: async (collectionName) => {
    const colRef = collection(db, collectionName);
    const snapshot = await getDocs(colRef);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  },
  getOne: async (collectionName, id) => {
    const docRef = doc(db, collectionName, id);
    const snapshot = await getDoc(docRef);
    if (!snapshot.exists()) {
      throw new Error('Document not found');
    }
    return { id: snapshot.id, ...snapshot.data() };
  },
  
  // File Upload
  uploadFile: async (path, file) => {
    if (!storage) throw new Error('Firebase storage not initialized');
    const storageRef = ref(storage, path);
    await uploadBytes(storageRef, file);
    return await getDownloadURL(storageRef);
  },

  // Protected Admin Methods
  create: async (collectionName, data) => {
    const colRef = collection(db, collectionName);
    const docRef = await addDoc(colRef, { ...data, createdAt: new Date().toISOString() });
    return { id: docRef.id, ...data };
  },
  update: async (collectionName, id, data) => {
    const docRef = doc(db, collectionName, id);
    await updateDoc(docRef, { ...data, updatedAt: new Date().toISOString() });
    return { id, ...data };
  },
  updateBatch: async (collectionName, updates) => {
    const batch = writeBatch(db);
    updates.forEach(({ id, data }) => {
      const docRef = doc(db, collectionName, id);
      batch.update(docRef, { ...data, updatedAt: new Date().toISOString() });
    });
    await batch.commit();
    return { message: 'Batch update successful' };
  },
  delete: async (collectionName, id) => {
    const docRef = doc(db, collectionName, id);
    await deleteDoc(docRef);
    return { message: 'Document deleted successfully' };
  }
};
