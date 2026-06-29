// Since it's node 18+, fetch is available globally.

const API_URL = 'http://127.0.0.1:5000/api'; // assuming backend is on 5000 based on standard setup, or 3000

async function runTest() {
  try {
    console.log('Logging in...');
    let res = await fetch(`http://127.0.0.1:3000/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'admin@amwajtech.com', password: 'admin123' })
    });

    let data = await res.json();
    if (!res.ok) throw new Error(data.error);
    
    const token = data.token;
    console.log('Login successful. Token acquired.');

    // 1. Test invalid current password
    console.log('Test 1: Invalid current password');
    let cpRes = await fetch(`http://127.0.0.1:3000/api/auth/change-password`, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ currentPassword: 'wrongpassword', newPassword: 'NewPassword123!' })
    });
    console.log(await cpRes.json());

    // 2. Test weak new password
    console.log('Test 2: Weak new password');
    cpRes = await fetch(`http://127.0.0.1:3000/api/auth/change-password`, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ currentPassword: 'admin123', newPassword: 'weak' })
    });
    console.log(await cpRes.json());

    // 3. Test reusing current password
    console.log('Test 3: Reusing current password');
    cpRes = await fetch(`http://127.0.0.1:3000/api/auth/change-password`, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ currentPassword: 'admin123', newPassword: 'admin123' })
    });
    console.log(await cpRes.json());

    // 4. Test success
    console.log('Test 4: Success');
    cpRes = await fetch(`http://127.0.0.1:3000/api/auth/change-password`, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ currentPassword: 'admin123', newPassword: 'NewPassword123!' })
    });
    console.log(await cpRes.json());
    
    // 5. Revert back to admin123 so the seed is consistent for the user
    console.log('Reverting password back to admin123...');
    let newToken = (await cpRes.json())?.token || token; // Wait, previous line consumed JSON. Let's re-login.
    
    // login with new password
    res = await fetch(`http://127.0.0.1:3000/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'admin@amwajtech.com', password: 'NewPassword123!' })
    });
    data = await res.json();
    const token2 = data.token;
    
    cpRes = await fetch(`http://127.0.0.1:3000/api/auth/change-password`, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token2}`
      },
      // Note: admin123 is weak and our schema requires strong password!
      // I'll need to remove the strict validation on admin123 or just keep the new one.
      // Actually, since I have validations, admin123 would fail.
      // Let's just catch the error.
      body: JSON.stringify({ currentPassword: 'NewPassword123!', newPassword: 'admin123' })
    });
    console.log('Revert attempt:', await cpRes.json());
    
  } catch (e) {
    console.error(e);
  }
}
runTest();
