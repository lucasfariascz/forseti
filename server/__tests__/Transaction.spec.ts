import request from 'supertest';
import { isUuid } from 'uuidv4';
import app from '../src/app';

describe('transanction', () => {
  it('should be able to create a new transaction', async () => {
    // faz uma requisição POST para rota de transacition e verifica se o Uuid é valido
    const response = await request(app).post('/transactions').send({
      title: 'Loan',
      type: 'income',
      value: 1200,
    });

    expect(isUuid(response.body.id)).toBe(true);

    // varifica se os objectos passado no metodo POST são iguais
    expect(response.body).toMatchObject({
      title: 'Loan',
      type: 'income',
      value: 1200,
    });
  });

  it('should be able to list the transactipons', async () => {
    await request(app).post('/transactions').send({
      title: 'Salary',
      type: 'income',
      value: 3000,
    });

    await request(app).post('/transactions').send({
      title: 'Bicyle',
      type: 'outcome',
      value: 1500,
    });

    const response = await request(app).get('/transactions');
    expect(response.body.transactions).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: expect.any(String),
          title: 'Salary',
          type: 'income',
          value: 3000,
        }),

        expect.objectContaining({
          id: expect.any(String),
          title: 'Bicyle',
          type: 'outcome',
          value: 1500,
        }),

        expect.objectContaining({
          id: expect.any(String),
          title: 'Loan',
          type: 'income',
          value: 1200,
        }),
      ]),
    );
    expect(response.body.balance).toMatchObject({
      income: 4200,
      outcome: 1500,
      total: 2700,
    });
  });

  // it('should not be able to create outcome transaction without a valid balance', async () => {
  //   const response = await request(app).post('/');
  // });
});
