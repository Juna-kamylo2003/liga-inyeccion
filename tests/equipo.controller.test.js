const express = require('express');
const request = require('supertest');
const EquipoController = require('../src/controllers/equipo.controller');

// Mock EquipoService
const mockService = {
  getAll: jest.fn().mockResolvedValue([{ id: 1, nombre: 'Equipo Test', ciudad: 'Ciudad', temporada_id: 1 }]),
  getById: jest.fn().mockResolvedValue({ id: 1, nombre: 'Equipo Test', ciudad: 'Ciudad', temporada_id: 1 }),
  create: jest.fn().mockResolvedValue({ id: 2, nombre: 'Nuevo Equipo', ciudad: 'Otra', temporada_id: 1 }),
  update: jest.fn().mockResolvedValue({ id: 1, nombre: 'Equipo Editado', ciudad: 'Ciudad', temporada_id: 1 }),
  delete: jest.fn().mockResolvedValue(true),
};

const controller = new EquipoController(mockService);
const app = express();
app.use(express.json());
app.get('/equipos', controller.getAll);
app.get('/equipos/:id', controller.getById);
app.post('/equipos', controller.create);
app.put('/equipos/:id', controller.update);
app.delete('/equipos/:id', controller.delete);

describe('EquipoController', () => {
  it('GET /equipos responde con lista', async () => {
    const res = await request(app).get('/equipos');
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual([{ id: 1, nombre: 'Equipo Test', ciudad: 'Ciudad', temporada_id: 1 }]);
  });

  it('GET /equipos/:id responde con un equipo', async () => {
    const res = await request(app).get('/equipos/1');
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({ id: 1, nombre: 'Equipo Test', ciudad: 'Ciudad', temporada_id: 1 });
  });

  it('POST /equipos crea un equipo', async () => {
    const res = await request(app).post('/equipos').send({ nombre: 'Nuevo Equipo', ciudad: 'Otra', temporada_id: 1 });
    expect(res.statusCode).toBe(201);
    expect(res.body).toEqual({ id: 2, nombre: 'Nuevo Equipo', ciudad: 'Otra', temporada_id: 1 });
  });

  it('PUT /equipos/:id actualiza un equipo', async () => {
    const res = await request(app).put('/equipos/1').send({ nombre: 'Equipo Editado', ciudad: 'Ciudad', temporada_id: 1 });
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({ id: 1, nombre: 'Equipo Editado', ciudad: 'Ciudad', temporada_id: 1 });
  });

  it('DELETE /equipos/:id elimina un equipo', async () => {
    const res = await request(app).delete('/equipos/1');
    expect(res.statusCode).toBe(204);
  });
});
