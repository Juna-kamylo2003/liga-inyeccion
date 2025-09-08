const express = require('express');
const request = require('supertest');
const TemporadaController = require('../src/controllers/temporada.controller');

// Mock TemporadaService
const mockService = {
  getAll: jest.fn().mockResolvedValue([{ id: 1, anio: 2024, liga_id: 1 }]),
  getById: jest.fn().mockResolvedValue({ id: 1, anio: 2024, liga_id: 1 }),
  create: jest.fn().mockResolvedValue({ id: 2, anio: 2025, liga_id: 1 }),
  update: jest.fn().mockResolvedValue({ id: 1, anio: 2024, liga_id: 1 }),
  delete: jest.fn().mockResolvedValue(true),
};

const controller = new TemporadaController(mockService);
const app = express();
app.use(express.json());
app.get('/temporadas', controller.getAll);
app.get('/temporadas/:id', controller.getById);
app.post('/temporadas', controller.create);
app.put('/temporadas/:id', controller.update);
app.delete('/temporadas/:id', controller.delete);

describe('TemporadaController', () => {
  it('GET /temporadas responde con lista', async () => {
    const res = await request(app).get('/temporadas');
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual([{ id: 1, anio: 2024, liga_id: 1 }]);
  });

  it('GET /temporadas/:id responde con una temporada', async () => {
    const res = await request(app).get('/temporadas/1');
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({ id: 1, anio: 2024, liga_id: 1 });
  });

  it('POST /temporadas crea una temporada', async () => {
    const res = await request(app).post('/temporadas').send({ anio: 2025, liga_id: 1 });
    expect(res.statusCode).toBe(201);
    expect(res.body).toEqual({ id: 2, anio: 2025, liga_id: 1 });
  });

  it('PUT /temporadas/:id actualiza una temporada', async () => {
    const res = await request(app).put('/temporadas/1').send({ anio: 2024, liga_id: 1 });
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({ id: 1, anio: 2024, liga_id: 1 });
  });

  it('DELETE /temporadas/:id elimina una temporada', async () => {
    const res = await request(app).delete('/temporadas/1');
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({ message: 'Temporada eliminada' });
  });
});
