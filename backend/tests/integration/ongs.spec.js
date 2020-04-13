const request = require('supertest')
const app = require('../../src/app')
const connection = require('../../src/database/connection')


describe('ONG', () => {
    
    beforeEach( async () => {
        await connection.migrate.rollback();//limpa o banco
        await connection.migrate.latest();//inicia o banco
    })
    
    afterAll( async () => {
        await connection.destroy();
    })

    it('aqui vai fazer os teste de criação de ongs', async () => {
        const response = await request(app)
                .post('/ongs')
                .send({
                    name: "aaaaaaaa",
                    email: "qwe@xz.com",
                    whatsapp: "88997866679",
                    city: "Parambu",
                    uf: "CE"
                })

    expect(response.body).toHaveProperty('id')
    expect(response.body.id).toHaveLength(8)

    });
});