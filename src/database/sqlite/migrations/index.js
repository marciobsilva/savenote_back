const sqliteConnection = require("../../sqlite")
const createUsers = require("./createUsers")

async function migrationRun() {
    const schema = [
        createUsers
    ].join('')

    await sqliteConnection().then( db => {
        db.exec(schema)
    }).catch(error => {
        console.error(error)
    })
}

module.exports = migrationRun