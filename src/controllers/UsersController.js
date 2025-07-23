const AppError = require("../utils/AppError")
const { hash, compare } = require("bcrypt")

const UserRepository = require('../repositories/UserRepository')

class UsersController {
  async create(req, res) {
    const { name, email, password } = req.body; //Para a comunicação via JSON

    const userRepository = UserRepository()

    const checkUserExists = await userRepository.findByEmail( email )

    if(checkUserExists) {
      throw new AppError("Este e-mail já está cadastrado!")
    }

    const hashedPassword = await hash(password, 8)

    await userRepository.create({ name, email, password: hashedPassword })

    return res.status(201).json()
  }

  async update(req, res) {
    const { name, email, password, old_password } = req.body
    // Quem define o valor na requisição abaixo é o middleware de requisição
    const id = req.user_id

    const userRepository = UserRepository()

    const checkUserExists = await userRepository.findById( id )
    if(!checkUserExists) 
      throw new AppError("Usuário não encontrado")

    const checkEmailExists = await userRepository.findByEmail( email )
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
    
    await userRepository.update({ name, email, password, user: checkUserExists })
    
    return res.json()
  }
}

module.exports = UsersController;