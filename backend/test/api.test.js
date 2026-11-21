const test = require('node:test');
const assert = require('node:assert');
const { crearApp } = require('../src/app');

let server, base;
const JSON_H =
  { 'Content-Type': 'application/json' };
test.before(() => new Promise(r => {
  server = crearApp({ corsOrigin: '*', version: 'test', entorno: 'test' }).listen(0, () => {
    base = `http://localhost:${server.address().port}`; r();
  });
}));
test.after(() => server.close());

test('GET /api/health responde ok', async () => {
  const res = await fetch(`${base}/api/health`);
  assert.strictEqual(res.status, 200);
  assert.strictEqual((await res.json()).status, 'ok');
});
test('POST /api/tareas crea una tarea', async () => {
  const res = await fetch(`${base}/api/tareas`, {
    method: 'POST', headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ titulo: 'Configurar CI' }) });
  assert.strictEqual(res.status, 201);
});
test('POST /api/tareas sin titulo devuelve 400',
  async () => {
    const res = await fetch(
      `${base}/api/tareas`,
      { method: 'POST',
        headers: JSON_H,
        body: '{}' });
    assert.strictEqual(res.status, 400);
});
