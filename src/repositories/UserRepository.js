const sqliteConnection = require('../database/sqlite')

class UserRepository {
    async findByEmail( email ) {
        const database = await sqliteConnection()
        const user = await database.get("SELECT * FROM users WHERE email = (?)", [email])

        return user
    }

    async findById( id ) {
        const database = await sqliteConnection()
        const user = await database.get("SELECT * FROM users WHERE id = ?", [user_id])

        return user
    }

    async create( {name, email, password} ) {
        const database = await sqliteConnection()
        const userId = await database.run(
            "INSERT INTO users(name, email, password) VALUES (?, ?, ?)",
            [name, email, password]
        )

        return {id: userId}
    }

    async update({ name, email, password, user }){
        const database = await sqliteConnection()

        const userUpdated = await database.run("UPDATE users SET name=?, email=?, password=?, updated_at=DATETIME('now') WHERE id=?", 
            [
                name ?? user.name, 
                email ?? user.email, 
                password ? await hash(password, 8) : user.password, 
                user_id
            ]
        )

        return userUpdated
    }
}

module.exports = UserRepository