async function run() {
  try {
    const res = await fetch('http://localhost:3000/api/email/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        type: 'job',
        data: {
          fullName: 'Test User',
          email: 'test@example.com',
          phone: '123456',
          jobTitle: 'Developer',
          message: 'Test message',
          cvUrl: '/uploads/dummy.pdf'
        }
      })
    });
    const result = await res.json();
    console.log('HTTP Status:', res.status);
    console.log('Result:', result);
  } catch (error) {
    console.error('Fetch error:', error);
  }
}

run();
