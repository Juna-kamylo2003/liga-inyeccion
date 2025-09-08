const UsuarioRepository = require('../src/repositories/usuario.repository');
const { Usuario } = require('../models');

describe('UsuarioRepository', () => {
  const repo = new UsuarioRepository(Usuario);

  it('should create a user', async () => {
    const data = { nombre: 'Test', email: 'test@example.com', password: '1234' };
    const usuario = await repo.create(data);
    expect(usuario).toHaveProperty('id');
    expect(usuario.nombre).toBe(data.nombre);
    await repo.delete(usuario.id);
  });

  it('should find all users', async () => {
  const usuarios = await repo.findAll();
    expect(Array.isArray(usuarios)).toBe(true);
  });
});
