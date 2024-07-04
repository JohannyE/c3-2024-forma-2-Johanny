import request from 'supertest'
import { server, app } from '../../../src/index'
import { body } from 'koa/lib/response'
/**
 * El objetivo de este test de integración es probar
 * el endpoint para evaluar si la aplicación responde
 */
describe('GET /health', () => {
    afterAll(() => {
        server.close()
    })

    test('should respond ok message', async () => {
        const response = await request(app.callback()).get('/health')
        expect(response.status).toBe(200)
        expect(response.body).toEqual({ message: 'ok' })
    })


})

describe('GET /api/history/:ocurrence', () => {
    afterAll(async () => {
        await server.close();
    });

    test('Eventos "ac" ordenados desde el más antiguo al más nuevo', async () => {
        const ocurrence = 'ac'; // Valor para esta prueba
        const response = await request(app.callback()).get(`/api/history/${ocurrence}`)
        expect(response.status).toBe(200)
        expect(response.body).toEqual("")

        // Ordenador más antiguo al más nuevo
        const events = response.body;
        let previousDate = Number.NEGATIVE_INFINITY;
        for (let event of events) {
            expect(event.date).toBeLessThanOrEqual(0); // Fecha <= 0
            expect(event.date).toBeGreaterThanOrEqual(previousDate); // Orden
            previousDate = event.date;
        }
    });

    test('Eventos "dc" ordenados del más antiguo al más nuevo', async () => {
        const ocurrence = 'dc';
        const response = await request(app.callback()).get(`/api/history/${ocurrence}`)
        expect(response.status).toBe(200)
        expect(response.body).toEqual("")

        // Desde el más antiguo al más nuevo y date > 0
        const events = response.body;
        let previousDate = Number.NEGATIVE_INFINITY;
        for (let event of events) {
            const eventDate = parseInt(event.date); // Convertir event.date a número
            expect(eventDate).toBeGreaterThan(0); // La fecha debe ser > 0
            expect(eventDate).toBeGreaterThanOrEqual(previousDate);
            previousDate = eventDate;
        }
    })

    test('Error 400 si contiene caracteres numéricos', async () => {
        const ocurrence = 'a1'; // contiene caracteres numéricos
        const response = await request(app.callback()).get(`/api/history/${ocurrence}`)
        expect(response.status).toBe(400)
        expect(response.body).toEqual({ message: 'Solo se aceptan caracteres no numéricos' });
    })

    test('Error 400 si no tiene longitud 2', async () => {
        const ocurrence = 'afsd'; //longitud != 2
        const response = await request(app.callback()).get(`/api/history/${ocurrence}`)
        expect(response.status).toBe(400)
        expect(response.body).toEqual({ message: 'El input debe ser ac o dc'});
    })

});

