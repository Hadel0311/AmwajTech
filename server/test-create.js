// using native fetch

async function test() {
  // Login
  const loginRes = await fetch('http://localhost:3000/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'admin@amwajtech.com', password: 'admin123' }) // I need the actual admin credentials. I'll just use the seed credentials.
  });
  const loginData = await loginRes.json();
  console.log('Login:', loginData);
  
  if (!loginData.token) return;

  // Create Service
  const createServiceRes = await fetch('http://localhost:3000/api/content/services', {
    method: 'POST',
    headers: { 
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${loginData.token}`
    },
    body: JSON.stringify({ title: 'Test Service', description: 'Test', icon: 'Network', order: 0 })
  });
  console.log('Create Service Status:', createServiceRes.status);
  console.log('Create Service Body:', await createServiceRes.text());
}

test();
