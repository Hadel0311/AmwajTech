

async function test() {
  const applicationData = {
    jobId: 'general',
    jobTitle: 'General Application',
    fullName: 'Test Applicant',
    email: 'test@example.com',
    phone: '1234567890',
    message: 'Testing fire and forget email.'
  };

  console.log('Submitting application...');
  const res = await fetch('http://localhost:3000/api/content/applicants', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(applicationData)
  });

  const text = await res.text();
  console.log('Status:', res.status);
  console.log('Response:', text);
}

test();
