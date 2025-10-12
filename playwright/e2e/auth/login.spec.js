import { test, expect } from '../../support/fixtures'
import { getUser } from '../../support/factories/user'

test.describe('Post /auth/login', () => {
    test('Deve fazer login com sucesso', async ({ auth }) => {
        const user = getUser()
        const respCreateUser = await auth.createUser(user)
        expect(respCreateUser.status()).toBe(201)

        const response = await auth.login(user)

        expect(response.status()).toBe(200)
        const responseBody = await response.json()
        expect(responseBody).toHaveProperty('message', 'Login realizado com sucesso')
        expect(responseBody.data).toHaveProperty('token')
        expect(responseBody.data.user).toHaveProperty('id')
        expect(responseBody.data.user).toHaveProperty('name', user.name)
        expect(responseBody.data.user).toHaveProperty('email', user.email)
        expect(responseBody.data.user).not.toHaveProperty('password')
    })

    test('Não deve fazer login com senha incorreta', async ({ auth }) => {
        const user = getUser()
        const respCreateUser = await auth.createUser(user)
        expect(respCreateUser.status()).toBe(201)

        const response = await auth.login({ ...user, password: 'senhaerrada' })

        expect(response.status()).toBe(401)
        const responseBody = await response.json()
        expect(responseBody).toHaveProperty('message', 'Credenciais inválidas')
    })

    test('Não deve fazer login com email incorreto', async ({ auth }) => {
        const user = {
            email: 'emailErrado@example.com',
            password: 'senha123'
        }

        const response = await auth.login(user)
        expect(response.status()).toBe(401)
        const responseBody = await response.json()
        expect(responseBody).toHaveProperty('message', 'Credenciais inválidas')
    })

    test('Não deve fazer login quando o email não é informado', async ({ auth }) => {
        const user = {
            password: 'senha123'
        }

        const response = await auth.login(user)
        expect(response.status()).toBe(400)
        const responseBody = await response.json()
        expect(responseBody).toHaveProperty('message', 'O campo \'Email\' é obrigatório')
    })

    test('Não deve fazer login quando a senha não é informada', async ({ auth }) => {
        const user = {
            email: 'email@example.com'
        }

        const response = await auth.login(user)
        expect(response.status()).toBe(400)
        const responseBody = await response.json()
        expect(responseBody).toHaveProperty('message', 'O campo \'Password\' é obrigatório')
    })
})