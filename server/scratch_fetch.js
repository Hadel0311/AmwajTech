import jwt from 'jsonwebtoken';

async function test() {
  const token = jwt.sign({ userId: '1', role: 'ADMIN' }, 'super-secret-jwt-key-change-in-production');
  
  try {
    const res = await fetch('http://localhost:3000/api/content/settings/email_jobs', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ host: 'mail.amwaj-tech.com', port: 465 })
    });
    
    const text = await res.text();
    console.log('Status:', res.status);
    console.log('Body:', text);
  } catch (error) {
    console.error('Fetch error:', error);
  }
}

test();
