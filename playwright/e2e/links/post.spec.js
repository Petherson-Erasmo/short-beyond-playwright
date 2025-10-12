import { test, expect } from '@playwright/test'
import { linksService } from '../../support/services/links'
import { authService } from '../../support/services/auth'
import { getUserWithLink } from '../../support/factories/user'

test.describe('Post /api/links', () => {
    test('Deve encurtar um novo link', async ({ request }) => {
        const login = authService(request)
        const link = linksService(request)

        const user = getUserWithLink()

        await login.createUser(user) // Pré-condição: ter um usuário cadastrado
        const token = await login.getToken(user)
        const response = await link.createLink(user.link, token)

        expect(response.status()).toBe(201)
        const { data, message } = await response.json()
        expect(message).toBe('Link criado com sucesso')
        expect(data).toHaveProperty('id')
        expect(data).toHaveProperty('original_url', user.link.original_url)
        expect(data.short_code).toMatch(/^[a-zA-Z0-9]{5}$/)
        expect(data).toHaveProperty('title', user.link.title)

    })
})