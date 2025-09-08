const UsuarioService = require('../src/services/usuario.service');
const UsuarioRepository = require('../src/repositories/usuario.repository');
const { Usuario } = require('../models');

describe('UsuarioService', () => {
  const repo = new UsuarioRepository(Usuario);
  const service = new UsuarioService(repo);

  it('should create a user', async () => {
    const data = { nombre: 'Test', email: 'test2@example.com', password: '1234' };
    const usuario = await service.createUsuario(data);
    expect(usuario).toHaveProperty('id');
    expect(usuario.nombre).toBe(data.nombre);
    await service.deleteUsuario(usuario.id);
  });

  it('should get all users', async () => {
    const usuarios = await service.getAllUsuarios();
    expect(Array.isArray(usuarios)).toBe(true);
  });
});
