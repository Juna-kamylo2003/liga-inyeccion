const express = require('express');
const request = require('supertest');
const JugadorController = require('../src/controllers/jugador.controller');

// Mock JugadorService
const mockService = {
  getAll: jest.fn().mockResolvedValue([{ id: 1, nombre: 'Jugador Test', posicion: 'Delantero', edad: 20, equipo_id: 1 }]),
  getById: jest.fn().mockResolvedValue({ id: 1, nombre: 'Jugador Test', posicion: 'Delantero', edad: 20, equipo_id: 1 }),
  create: jest.fn().mockResolvedValue({ id: 2, nombre: 'Nuevo Jugador', posicion: 'Portero', edad: 22, equipo_id: 1 }),
  update: jest.fn().mockResolvedValue({ id: 1, nombre: 'Jugador Editado', posicion: 'Delantero', edad: 20, equipo_id: 1 }),
  delete: jest.fn().mockResolvedValue(true),
};

const controller = new JugadorController(mockService);
const app = express();
app.use(express.json());
app.get('/jugadores', controller.getAll);
app.get('/jugadores/:id', controller.getById);
app.post('/jugadores', controller.create);
app.put('/jugadores/:id', controller.update);
app.delete('/jugadores/:id', controller.delete);

describe('JugadorController', () => {
  it('GET /jugadores responde con lista', async () => {
    const res = await request(app).get('/jugadores');
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual([{ id: 1, nombre: 'Jugador Test', posicion: 'Delantero', edad: 20, equipo_id: 1 }]);
  });

  it('GET /jugadores/:id responde con un jugador', async () => {
    const res = await request(app).get('/jugadores/1');
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({ id: 1, nombre: 'Jugador Test', posicion: 'Delantero', edad: 20, equipo_id: 1 });
  });

  it('POST /jugadores crea un jugador', async () => {
    const res = await request(app).post('/jugadores').send({ nombre: 'Nuevo Jugador', posicion: 'Portero', edad: 22, equipo_id: 1 });
    expect(res.statusCode).toBe(201);
    expect(res.body).toEqual({ id: 2, nombre: 'Nuevo Jugador', posicion: 'Portero', edad: 22, equipo_id: 1 });
  });

  it('PUT /jugadores/:id actualiza un jugador', async () => {
    const res = await request(app).put('/jugadores/1').send({ nombre: 'Jugador Editado', posicion: 'Delantero', edad: 20, equipo_id: 1 });
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({ id: 1, nombre: 'Jugador Editado', posicion: 'Delantero', edad: 20, equipo_id: 1 });
  });

  it('DELETE /jugadores/:id elimina un jugador', async () => {
    const res = await request(app).delete('/jugadores/1');
    expect(res.statusCode).toBe(204);
  });
});
