'use strict'

const User = use('App/Models/User')
const Database = use('Database')

class UserController {

  async index({ auth }){
    const users = await Database.from('users').where({ id: auth.user.id })
    return users
  }

  async show({ params }){
    const user = await Database.from('users').where({ id: params.id })
    return user
  }

  async store({ request, response }){
    const data = await request.only(['username', 'email', 'password', 'avatar'])
    await User.create(data)
    return response.send({ message: 'Usuário criado com sucesso!' })
  }

  async update({ request, response, params }){
    const data = await request.only(['username', 'email', 'password'])
    const user = await User.findOrFail(params.id)

    if(user.id !== auth.user.id){
      return response.status(401).send({ error: 'Not authorized' })
    }

    await user.merge(data)
    await user.save()

    return response.send({ message: 'Usuário atualizado com sucesso!' })
  }

  async destroy({ request, response, params, auth }){
    const user = await User.findOrFail(params.id)

    if(user.id !== auth.user.id){
      return response.status(401).send({ error: 'Not authorized' })
    }

    await user.delete()
    return response.send({ message: 'Usuário deletado...' })
  }

}

module.exports = UserController
