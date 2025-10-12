import { test, expect } from '../../support/fixtures'
import { getUserWithLink } from '../../support/factories/user'

let token

test.describe('Post /api/links', () => {
    const user = getUserWithLink()

    test.beforeEach(async ({ auth }) => {
        await auth.createUser(user)
        token = await auth.getToken(user)
    })

    test('Deve encurtar um novo link', async ({ links }) => {
        const response = await links.createLink(user.link, token)

        expect(response.status()).toBe(201)
        const { data, message } = await response.json()
        expect(message).toBe('Link criado com sucesso')
        expect(data).toHaveProperty('id')
        expect(data).toHaveProperty('original_url', user.link.original_url)
        expect(data.short_code).toMatch(/^[a-zA-Z0-9]{5}$/)
        expect(data).toHaveProperty('title', user.link.title)
    })

    test('Não deve encurtar quando a url não é informada', async ({ links }) => {
        const response = await links.createLink({...user.link, original_url: '', title: ''}, token)

        expect(response.status()).toBe(400)
        const { message } = await response.json()
        expect(message).toBe('O campo \'OriginalURL\' é obrigatório')
    })

    test('Não deve encurtar quando a titulo não é informado', async ({ links }) => {
        const response = await links.createLink({...user.link, title: '', title: ''}, token)

        expect(response.status()).toBe(400)
        const { message } = await response.json()
        expect(message).toBe('O campo \'Title\' é obrigatório')
    })

    test('Não deve encurtar quando a url original é invalida', async ({ links }) => {
        const response = await links.createLink({...user.link, original_url: 'teste@urlInvalida.com', title: ''}, token)

        expect(response.status()).toBe(400)
        const { message } = await response.json()
        expect(message).toBe('O campo \'OriginalURL\' deve ser uma URL válida')
    })
})