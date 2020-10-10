'use strict'

const Link = use('App/Models/Link')
//const User = use('App/Models/User')
const Database = use('Database')

class LinkController {

  async index({ params }){
    //const links = await User.query().with('userLinks').fetch()
    const links = await Database.from('links').where({ user_id: params.id })
    return links

  }

  async show({ params }){
    const link = await Link.findOrFail(params.id)
    return link
  }

  async store({ request, auth }){
    const data = request.only(['title','url'])
    const linkCreated = await Link.create({ user_id: auth.user.id, ...data })
    return linkCreated
  }

  async update({ request, response, params, auth }){
    const data = await request.only(['title','url'])
    const link = await Link.findOrFail(params.id)

    //if(params.id !== auth.user.id){
    //  return response.status(401).send({ error: 'Not authorized' })
    //}

    await link.merge(data)
    await link.save()

    return response.send({ message: 'Link atualizado com sucesso!' })
  }

  async destroy({ response, params, auth }){
    const link = await Link.findOrFail(params.id)

    if(link.user_id !== auth.user.id){
      return response.status(401).send({ error: 'Not authorized' })
    }

    await link.delete()
    return response.send({ message: 'Link deletado...' })
  }

}

module.exports = LinkController
