const express = require('express');
const request = require('supertest');
const LigaController = require('../src/controllers/liga.controller');

// Mock LigaService
const mockService = {
  getAll: jest.fn().mockResolvedValue([{ id: 1, nombre: 'Liga Test', pais: 'CO' }]),
  getById: jest.fn().mockResolvedValue({ id: 1, nombre: 'Liga Test', pais: 'CO' }),
  create: jest.fn().mockResolvedValue({ id: 2, nombre: 'Nueva Liga', pais: 'MX' }),
  update: jest.fn().mockResolvedValue({ id: 1, nombre: 'Liga Editada', pais: 'CO' }),
  delete: jest.fn().mockResolvedValue(true),
};

const controller = new LigaController(mockService);
const app = express();
app.use(express.json());
app.get('/ligas', controller.getAll);
app.get('/ligas/:id', controller.getById);
app.post('/ligas', controller.create);
app.put('/ligas/:id', controller.update);
app.delete('/ligas/:id', controller.delete);

describe('LigaController', () => {
  it('GET /ligas responde con lista', async () => {
    const res = await request(app).get('/ligas');
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual([{ id: 1, nombre: 'Liga Test', pais: 'CO' }]);
  });

  it('GET /ligas/:id responde con una liga', async () => {
    const res = await request(app).get('/ligas/1');
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({ id: 1, nombre: 'Liga Test', pais: 'CO' });
  });

  it('POST /ligas crea una liga', async () => {
    const res = await request(app).post('/ligas').send({ nombre: 'Nueva Liga', pais: 'MX' });
    expect(res.statusCode).toBe(201);
    expect(res.body).toEqual({ id: 2, nombre: 'Nueva Liga', pais: 'MX' });
  });

  it('PUT /ligas/:id actualiza una liga', async () => {
    const res = await request(app).put('/ligas/1').send({ nombre: 'Liga Editada', pais: 'CO' });
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({ id: 1, nombre: 'Liga Editada', pais: 'CO' });
  });

  it('DELETE /ligas/:id elimina una liga', async () => {
    const res = await request(app).delete('/ligas/1');
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({ message: 'Liga eliminada' });
  });
});
