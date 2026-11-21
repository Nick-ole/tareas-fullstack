const API = import.meta.env.VITE_API_URL || '';

async function cargar() {
  const salud = await fetch(`${API}/api/health`).then(r => r.json());
  document.querySelector('#estado').textContent =
    `API ${salud.status} · versión ${salud.version} · entorno ${salud.entorno}`;
  const tareas = await fetch(`${API}/api/tareas`).then(r => r.json());
  document.querySelector('#lista').innerHTML =
    tareas.map(t => `<li>#${t.id} ${t.titulo}</li>`).join('');
}

document.querySelector('#f').addEventListener('submit', async (e) => {
  e.preventDefault();
  const titulo = document.querySelector('#t').value;
  await fetch(`${API}/api/tareas`, {
    method: 'POST', headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ titulo }),
  });
  document.querySelector('#t').value = '';
  cargar();
});
cargar();
