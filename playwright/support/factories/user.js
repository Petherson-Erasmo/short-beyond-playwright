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

export const getUserWithLink = () => {
    const firstName = faker.person.firstName()
    const lastName = faker.person.lastName()

    return {
        name: `${firstName} ${lastName}`,
        email: faker.internet.email({ firstName, lastName }),
        password: 'senha123',
        link: {
            original_url: faker.internet.url(),
            title: faker.music.songName()
        }
    }
}