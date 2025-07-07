const AppError = require("../utils/AppError")
const { hash, compare } = require("bcrypt")

const sqliteConnection = require('../database/sqlite')

class UsersController {
  async create(req, res) {
    const { name, email, password } = req.body; //Para a comunicação via JSON

    const database = await sqliteConnection()

    const checkUserExists = await database.get("SELECT * FROM users WHERE email = (?)", [email])

    if(checkUserExists) {
      throw new AppError("Este e-mail já está cadastrado!")
    }

    const hashedPassword = await hash(password, 8)

    await database.run(
      "INSERT INTO users(name, email, password) VALUES (?, ?, ?)",
       [name, email, hashedPassword]
    )

    return res.status(201).json()
  }

  async update(req, res) {
    const { name, email, password, old_password } = req.body
    const { id } = req.params

    const database = await sqliteConnection()

    const checkUserExists = await database.get("SELECT * FROM users WHERE id = ?", [id])
    if(!checkUserExists) 
      throw new AppError("Usuário não encontrado")

    const checkEmailExists = await database.get("SELECT * FROM users WHERE email = ?", [email])
    if(checkEmailExists && id != checkEmailExists.id) 
      throw new AppError("Email já cadastrado")

    if( password && !old_password) {
      throw new AppError("Senha antiga obrigatória para atualizar a senha")
    }

    if(password && old_password) {
      const checkOldPassword = await compare(old_password, checkUserExists.password)

      if(!checkOldPassword) {
        throw new AppError("Senha antiga não confere")
      }
      
    }
    
    await database.run("UPDATE users SET name=?, email=?, password=?, updated_at=DATETIME('now') WHERE id=?", 
      [
        name ?? checkUserExists.name, 
        email ?? checkUserExists.email, 
        password ? await hash(password, 8) : checkUserExists.password, 
        id
      ]
    )
    
    return res.json()
  }
}

module.exports = UsersController;