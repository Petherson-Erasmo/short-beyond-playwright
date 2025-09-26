import { test, expect } from '@playwright/test'
import { linksService } from '../../support/services/links'
import { authService } from '../../support/services/auth'
import { getUserWithLink } from '../../support/factories/user'
import { title } from 'process'

let login
let link
let token

test.describe('Post /api/links', () => {
    const user = getUserWithLink()

    test.beforeEach(async ({ request }) => {
        login = authService(request)
        link = linksService(request)

        await login.createUser(user)
        token = await login.getToken(user)
    })

    test('Deve encurtar um novo link', async ({ request }) => {
        const response = await link.createLink(user.link, token)

        expect(response.status()).toBe(201)
        const { data, message } = await response.json()
        expect(message).toBe('Link criado com sucesso')
        expect(data).toHaveProperty('id')
        expect(data).toHaveProperty('original_url', user.link.original_url)
        expect(data.short_code).toMatch(/^[a-zA-Z0-9]{5}$/)
        expect(data).toHaveProperty('title', user.link.title)
    })

    test('Não deve encurtar quando a url não é informada', async () => {
        const response = await link.createLink({...user.link, original_url: '', title: ''}, token)

        expect(response.status()).toBe(400)
        const { message } = await response.json()
        expect(message).toBe('O campo \'OriginalURL\' é obrigatório')
    })

    test('Não deve encurtar quando a titulo não é informado', async () => {
        const response = await link.createLink({...user.link, title: '', title: ''}, token)

        expect(response.status()).toBe(400)
        const { message } = await response.json()
        expect(message).toBe('O campo \'Title\' é obrigatório')
    })

    test('Não deve encurtar quando a url original é invalida', async () => {
        const response = await link.createLink({...user.link, original_url: 'teste@urlInvalida.com', title: ''}, token)

        expect(response.status()).toBe(400)
        const { message } = await response.json()
        expect(message).toBe('O campo \'OriginalURL\' deve ser uma URL válida')
    })
})