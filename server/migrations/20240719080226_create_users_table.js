export const up = (knex) => (
		knex.schema.createTable('users', (table) => {
				table.increments('user_id').primary();
				table.string('username', 50).notNullable().unique();
				table.string('email', 100).notNullable().unique();
				table.string('password_hash', 255).notNullable();
				table.timestamps(true, true);
		})
);

export const down = (knex) => knex.schema.dropTable('users');
