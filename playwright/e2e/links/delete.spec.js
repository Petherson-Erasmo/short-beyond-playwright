import { test, expect } from '../../support/fixtures'
import { getUserWithLink } from '../../support/factories/user'
import { generateULID } from '../../support/utils'

let token

test.describe('Delete /api/links/:id', () => {
    const user = getUserWithLink()

    test.beforeEach(async ({ auth }) => {
        await auth.createUser(user)
        token = await auth.getToken(user)
    })
    
    test('Deve remover um link encurtado', async ({ links }) => {
        const linkId = await links.createAndReturnLinkId(user.link, token)

        const response = await links.removeLink(linkId, token)
        expect(response.status()).toBe(200)
        const responseBody = await response.json()
        expect(responseBody).toHaveProperty('message', 'Link excluído com sucesso')
    })

    test('Não deve remover quando o id não existe', async ({ links }) => {
        const linkId = generateULID()

        const response = await links.removeLink(linkId, token)
        expect(response.status()).toBe(404)
        const responseBody = await response.json()
        expect(responseBody).toHaveProperty('message', 'Link não encontrado')
    })
})