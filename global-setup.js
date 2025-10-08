const { cleanupTestData } = require('./playwright/support/database')

module.exports = async () => {
    console.log('Global setup: Limpando dados de teste no banco de dados...')
    await cleanupTestData()
    console.log('Global setup: Dados de teste limpos.')
}