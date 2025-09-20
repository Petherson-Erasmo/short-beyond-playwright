import { test, expect } from '@playwright/test'
import { faker } from '@faker-js/faker'

test.describe('Post /auth/register', () => {
    test('Deve cadastrar um novo usuário', async ({ request }) => {
        const firstName = faker.person.firstName()
        const lastName = faker.person.lastName()
        
        const user = {
            name: `${firstName} ${lastName}`,
            email: faker.internet.email({ firstName, lastName}), // como o nome das contante são iguais, não preciso passar o valor
            password: 'senha123'
        }
        const response = await request.post('http://localhost:3333/api/auth/register', {
            data: user
        })
        expect(response.status()).toBe(201)

        const responseBody = await response.json()

        expect(responseBody.message).toBe('Usuário cadastrado com sucesso!') // Em caso de erro retorna Undefined
        expect(responseBody).toHaveProperty('message', 'Usuário cadastrado com sucesso!') // Em caso de erro retorna que o campo não foi retornado
        expect(responseBody.user).toHaveProperty('id')
        expect(responseBody.user).toHaveProperty('name', user.name)
        expect(responseBody.user).toHaveProperty('email', user.email)
        expect(responseBody.user).not.toHaveProperty('password')

    })
})