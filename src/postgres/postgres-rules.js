const pgp = require('pg-promise')();

const cn = {
    host: '185.224.139.231',
    port: '5432',
    database: 'proposal',
    user: 'postgres',
    password: 'postgres'
}

const db = pgp(cn);

const dataObject = {
    firstName: 'Roger',
    surname: 'Moore',
    age: 90,
    postcode: 'FV1 4HB',
    business: 'Bondino Ltd.'
}

const insertCustomer = async ( { firstName, surname, age, postcode, business } ) => {

    const response = await db.any('INSERT INTO customer VALUES($1, $2, $3, $4, $5)', [firstName, surname, age, postcode, business])

    console.log(response)

}

module.exports = insertCustomer(dataObject)

