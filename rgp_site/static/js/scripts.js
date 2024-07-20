let isLogin = true;

function toggleForm() {
  isLogin = !isLogin;
  document.getElementById('auth-button').innerText = isLogin ? 'Login' : 'Register';
  document.getElementById('toggle-link').innerHTML = isLogin ?
    'Não tem uma conta? <a href="#" onclick="toggleForm()">Registre-se aqui</a>' :
    'Já tem uma conta? <a href="#" onclick="toggleForm()">Faça login aqui</a>';
}

document.getElementById('auth-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;
  const endpoint = isLogin ? 'login' : 'register';

  const response = await fetch(`http://localhost:3000/auth/${endpoint}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, password }),
  });

  const data = await response.json();
  if (response.ok) {
    if (isLogin) {
      localStorage.setItem('token', data.token);
      alert('Login successful!');
      window.location.href = 'rpg-content.html';
    } else {
      alert('User registered successfully!');
      toggleForm();
    }
  } else {
    alert(`${isLogin ? 'Login' : 'Registration'} failed: ${data.message}`);
  }
});
