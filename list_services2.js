import { db } from './server/config/firebase.js';

const run = async () => {
  const snapshot = await db.collection('services').get();
  snapshot.forEach(doc => {
    console.log(doc.id, '=>', doc.data().title);
  });
};

run().catch(console.error);
