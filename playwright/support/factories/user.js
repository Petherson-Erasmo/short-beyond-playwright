import { faker } from '@faker-js/faker'

export const getUser = () => {
    const firstName = faker.person.firstName()
    const lastName = faker.person.lastName()

    return {
        name: `${firstName} ${lastName}`,
        email: faker.internet.email({ firstName, lastName }), // como o nome das contante são iguais, não preciso passar o valor
        password: 'senha123'
    }
}