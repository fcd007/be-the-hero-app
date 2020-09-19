const request = require('supertest');
const app = require('../../src/app');
const connection = require('../../src/database/connection');

//executar as migrations
describe('ONG', () => {
    beforeEach( async () => {
       await connection.migrate.rollback();
       await connection.migrate.latest();
    });
    //desfazer a conexão com o banco de dados
    afterAll(async () => {
       await connection.destroy();
    });
    //parâmetros para validação dos teste entidade ONG.
    it('Should be able to create a new ONG', async () => {
        const response = await request(app).post('/ongs').send({
            name: "UFERSA_ACTS",
            //.set('authorization','id'), //para enviar id header.
            email: "apae@apae.org",
            whatsapp: "55849999999",
            city: "Natal",
            uf: "RN"
        });
        //o que esperamos testar
        expect(response.body).toHaveProperty('id');
        expect(response.body.id).toHaveLength(8);
        //console.log(response.body);
    });
});