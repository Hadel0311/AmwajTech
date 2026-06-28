

async function test() {
  console.log('Testing login...');
  const res = await fetch('http://localhost:3000/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'admin@amwajtech.com', password: 'adminpassword' }) // Assuming default admin credentials
  });
  const data = await res.json();
  if (!res.ok) {
    console.error('Login failed', data);
    return;
  }
  
  console.log('Login successful. Access Token:', data.token.slice(0, 15) + '...');
  console.log('Refresh Token:', data.refreshToken.slice(0, 15) + '...');
  
  console.log('Testing refresh...');
  const refreshRes = await fetch('http://localhost:3000/api/auth/refresh', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ refreshToken: data.refreshToken })
  });
  const refreshData = await refreshRes.json();
  if (!refreshRes.ok) {
    console.error('Refresh failed', refreshData);
    return;
  }
  
  console.log('Refresh successful. New Access Token:', refreshData.token.slice(0, 15) + '...');
  
  console.log('Testing logout...');
  const logoutRes = await fetch('http://localhost:3000/api/auth/logout', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ refreshToken: data.refreshToken })
  });
  const logoutData = await logoutRes.json();
  if (!logoutRes.ok) {
    console.error('Logout failed', logoutData);
    return;
  }
  console.log('Logout successful:', logoutData);
  
  console.log('Testing refresh again (should fail)...');
  const refreshRes2 = await fetch('http://localhost:3000/api/auth/refresh', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ refreshToken: data.refreshToken })
  });
  const refreshData2 = await refreshRes2.json();
  if (!refreshRes2.ok) {
    console.log('Refresh correctly failed after logout:', refreshData2);
  } else {
    console.error('Refresh succeeded after logout! This is a bug.');
  }
}

test();
