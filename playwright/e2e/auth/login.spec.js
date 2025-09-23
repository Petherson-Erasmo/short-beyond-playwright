import { test, expect } from '@playwright/test'
import { getUser } from '../../support/factories/user'
import { authService } from '../../support/services/auth'

let auth

test.describe('Post /auth/login', () => {
    test.beforeEach(({ request }) => {
        auth = authService(request)
    })

    test('Deve fazer login com sucesso', async () => {
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

    test('Não deve fazer login com senha incorreta', async () => {
        const user = getUser()
        const respCreateUser = await auth.createUser(user)
        expect(respCreateUser.status()).toBe(201)

        const response = await auth.login({ ...user, password: 'senhaerrada' })

        expect(response.status()).toBe(401)
        const responseBody = await response.json()
        expect(responseBody).toHaveProperty('message', 'Credenciais inválidas')
    })

    test('Não deve fazer login com email incorreto', async () => {
        const user = {
            email: 'emailErrado@example.com',
            password: 'senha123'
        }

        const response = await auth.login(user)
        expect(response.status()).toBe(401)
        const responseBody = await response.json()
        expect(responseBody).toHaveProperty('message', 'Credenciais inválidas')
    })

    test('Não deve fazer login quando o email não é informado', async () => {
        const user = {
            password: 'senha123'
        }

        const response = await auth.login(user)
        expect(response.status()).toBe(400)
        const responseBody = await response.json()
        expect(responseBody).toHaveProperty('message', 'O campo \'Email\' é obrigatório')
    })

    test('Não deve fazer login quando a senha não é informada', async () => {
        const user = {
            email: 'email@example.com'
        }

        const response = await auth.login(user)
        expect(response.status()).toBe(400)
        const responseBody = await response.json()
        expect(responseBody).toHaveProperty('message', 'O campo \'Password\' é obrigatório')
    })
})