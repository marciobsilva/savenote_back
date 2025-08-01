exports.up = knex => knex.schema.createTable('tags', table => {
    table.increments('id').primary()
    table.text('name')

    table.integer('note_id').references('id').inTable('notes').onDelete("CASCADE")
    table.integer('user_id').references('id').inTable('users')
})

exports.down = knex => knex.schema.dropTable('tags')