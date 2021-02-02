import Knex from 'knex';

export async function up(knex: Knex) {
    return knex.schema.createTable('users', table => {
        table.increments('id').primary();
        table.string('image').notNullable();
        table.string('name').notNullable();
        table.string('phone').notNullable();
        table.string('cellphone').notNullable();
        table.string('street').notNullable();
        table.string('city').notNullable();
        table.string('uf', 2).notNullable();
        table.string('role').notNullable();
        table.string('email').notNullable();
        table.string('password').notNullable();
    });
}

export async function down(knex: Knex) {
    return knex.schema.dropTable('users');
}