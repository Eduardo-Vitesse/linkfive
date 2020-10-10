'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class LinkSchema extends Schema {
  up () {
    this.create('links', (table) => {
      table.increments()
      table.string('title').notNullable()
      table.string('url').notNullable()
      table.integer('user_id')
        .unsigned()
        .references('id')
        .inTable('users')
        .onDelete('CASCADE')
        .onUpdate('CASCADE')
      table.timestamps()
    })
  }

  down () {
    this.drop('links')
  }
}

module.exports = LinkSchema
