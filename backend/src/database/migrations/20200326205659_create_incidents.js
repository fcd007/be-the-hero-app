
exports.up = function(knex) {
    return knex.schema.createTable('incidents', function (table) {
        table.increments(); // id incremental
        //atributos da tabela
        table.string('title').notNullable();
        table.string('description').notNullable();
        table.decimal('value').notNullable();
        //criando o relacionamento com a chame estrangeira
        table.string('ong_id').notNullable();
        // referenciando a chave primária, coluna e tabela
        table.foreign('ong_id').references('id').inTable('ongs');
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('incidents');
};
