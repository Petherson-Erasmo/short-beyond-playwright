import { test, expect } from '@playwright/test'
import { getUser } from '../../support/factories/user'
import { authService } from '../../support/services/auth'

let register

test.describe('Post /auth/register', () => {
    test.beforeEach(({ request }) => {
        register = authService(request)
    })
    
    test('Deve cadastrar um novo usuário', async () => {
        // Preparação
        const user = getUser()
        // Ação
        const response = await register.createUser(user)
        // Resultado esperado
        expect(response.status()).toBe(201)
        const responseBody = await response.json()
        expect(responseBody.message).toBe('Usuário cadastrado com sucesso!') // Em caso de erro retorna Undefined
        expect(responseBody).toHaveProperty('message', 'Usuário cadastrado com sucesso!') // Em caso de erro retorna que o campo não foi retornado
        expect(responseBody.user).toHaveProperty('id')
        expect(responseBody.user).toHaveProperty('name', user.name)
        expect(responseBody.user).toHaveProperty('email', user.email)
        expect(responseBody.user).not.toHaveProperty('password')
    })

    test('Não deve cadastrar usuário com email já estiver em uso', async () => {
        const user = getUser()

        const preCondition = await register.createUser(user)

        expect(preCondition.status()).toBe(201)
        const response = await register.createUser(user)
        expect(response.status()).toBe(400)
        const responseBody = await response.json()
        expect(responseBody).toHaveProperty('message', 'Este e-mail já está em uso. Por favor, tente outro.')
    })

    test('Não deve cadastrar usuário quando email é inválido', async () => {
        const user = {
            name: 'Test User',
            email: 'email&invalido.com',
            password: 'senha123'
        }

        const response = await register.createUser(user)

        expect(response.status()).toBe(400)
        const responseBody = await response.json()
        expect(responseBody).toHaveProperty('message', 'O campo \'Email\' deve ser um email válido')
    })

    test('Não deve cadastrar usuário quando o nome não é informado', async () => {
        const user = {
            email: 'email&invalido.com',
            password: 'senha123'
        }
    
        const response = await register.createUser(user)

        expect(response.status()).toBe(400)
        const responseBody = await response.json()
        expect(responseBody).toHaveProperty('message', 'O campo \'Name\' é obrigatório')
    })

    test('Não deve cadastrar usuário quando o email não é informado', async () => {
        const user = {
            name: 'Test User',
            password: 'senha123'
        }
    
        const response = await register.createUser(user)

        expect(response.status()).toBe(400)
        const responseBody = await response.json()
        expect(responseBody).toHaveProperty('message', 'O campo \'Email\' é obrigatório')
    })

    test('Não deve cadastrar usuário quando a senha não é informada', async () => {
        const user = {
            name: 'Test User',
            email: 'email@valido.com'            
        }
    
        const response = await register.createUser(user)

        expect(response.status()).toBe(400)
        const responseBody = await response.json()
        expect(responseBody).toHaveProperty('message', 'O campo \'Password\' é obrigatório')
    })
})