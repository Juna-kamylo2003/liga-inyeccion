const express = require('express');
const request = require('supertest');
const PartidoController = require('../src/controllers/partido.controller');

// Mock PartidoService
const mockService = {
  getAll: jest.fn().mockResolvedValue([{ id: 1, fecha: '2024-08-15', equipo_local: 5, equipo_visitante: 6, temporada_id: 1 }]),
  getById: jest.fn().mockResolvedValue({ id: 1, fecha: '2024-08-15', equipo_local: 5, equipo_visitante: 6, temporada_id: 1 }),
  create: jest.fn().mockResolvedValue({ id: 2, fecha: '2024-08-20', equipo_local: 7, equipo_visitante: 8, temporada_id: 2 }),
  update: jest.fn().mockResolvedValue({ id: 1, fecha: '2024-08-15', equipo_local: 5, equipo_visitante: 6, temporada_id: 1 }),
  delete: jest.fn().mockResolvedValue(true),
};

const controller = new PartidoController(mockService);
const app = express();
app.use(express.json());
app.get('/partidos', controller.getAll);
app.get('/partidos/:id', controller.getById);
app.post('/partidos', controller.create);
app.put('/partidos/:id', controller.update);
app.delete('/partidos/:id', controller.delete);

describe('PartidoController', () => {
  it('GET /partidos responde con lista', async () => {
    const res = await request(app).get('/partidos');
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual([{ id: 1, fecha: '2024-08-15', equipo_local: 5, equipo_visitante: 6, temporada_id: 1 }]);
  });

  it('GET /partidos/:id responde con un partido', async () => {
    const res = await request(app).get('/partidos/1');
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({ id: 1, fecha: '2024-08-15', equipo_local: 5, equipo_visitante: 6, temporada_id: 1 });
  });

  it('POST /partidos crea un partido', async () => {
    const res = await request(app).post('/partidos').send({ fecha: '2024-08-20', equipo_local: 7, equipo_visitante: 8, temporada_id: 2 });
    expect(res.statusCode).toBe(201);
    expect(res.body).toEqual({ id: 2, fecha: '2024-08-20', equipo_local: 7, equipo_visitante: 8, temporada_id: 2 });
  });

  it('PUT /partidos/:id actualiza un partido', async () => {
    const res = await request(app).put('/partidos/1').send({ fecha: '2024-08-15', equipo_local: 5, equipo_visitante: 6, temporada_id: 1 });
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({ id: 1, fecha: '2024-08-15', equipo_local: 5, equipo_visitante: 6, temporada_id: 1 });
  });

  it('DELETE /partidos/:id elimina un partido', async () => {
    const res = await request(app).delete('/partidos/1');
    expect(res.statusCode).toBe(204);
  });
});
