// ./migrations/[timestamp]_create_users_table.js

exports.up = async function (knex) {
    await knex.schema.createTable('users', function (table) {
        table.increments('id');
        table.string('name').notNullable();
        table.string('email').notNullable().unique();
        table.string('password').notNullable();
        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.boolean('verified').defaultTo(false);
    })
    await knex.schema.createTable('invites', function (table) {
        table.increments('id');
        table.integer('invitee').unsigned().notNullable();
        table.integer('invitor').unsigned().notNullable();
        table.jsonb('permissions').notNullable();
        table.enu('status', ['pending', 'accepted', 'rejected']).defaultTo('pending');
        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.foreign('invitee').references('id').inTable('users').onDelete('CASCADE');
        table.foreign('invitor').references('id').inTable('users').onDelete('CASCADE');
    })
};

exports.down = async function (knex) {
    await knex.schema.dropTable('users');   // Drop the users table if rolling back
};
