import { test, expect } from '../../support/fixtures'
import { getUserWithMultipleLinks } from '../../support/factories/user'

test.describe('Get /api/links', () => {
    test('Deve retornar uma lista de links pré-encurtados', async ({ auth, links }) => {
        const user = await getUserWithMultipleLinks(5)

        await auth.createUser(user)
        const token = await auth.getToken(user)

        for (const link of user.links) {
            await links.createLink(link, token)
        }
        const response = await links.getLinks(token)

        expect(response.status()).toBe(200)
        const responseBody = await response.json()
        expect(responseBody.message).toBe('Links Encurtados')
        expect(responseBody.count).toBe(user.links.length)
        expect(Array.isArray(responseBody.data)).toBe(true)

        for (const [index, link] of responseBody.data.entries()) {
            expect(link).toHaveProperty('id')
            expect(link).toHaveProperty('original_url', user.links[index].original_url)
            expect(link).toHaveProperty('short_code')
            expect(link.short_code).toMatch(/^[a-zA-Z0-9]{5}$/)
            expect(link).toHaveProperty('title', user.links[index].title)
        }
    })

    test('Deve retornar uma lista vazia', async ({ auth, links }) => {
        const user = getUserWithMultipleLinks(0)

        await auth.createUser(user)
        const token = await auth.getToken(user)

        const response = await links.getLinks(token)
        expect(response.status()).toBe(200)
        const responseBody = await response.json()
        expect(responseBody.message).toBe('Links Encurtados')
        expect(responseBody.count).toBe(0)
        expect(responseBody.data).toHaveLength(0)
    })
})