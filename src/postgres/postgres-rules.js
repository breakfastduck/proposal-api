const pgp = require('pg-promise')();

const cn = {
    host: '185.224.139.231',
    port: '5432',
    database: 'proposal',
    user: 'postgres',
    password: 'halflife'
}

const db = pgp(cn);

const proposalId = '10003'

const selectRules = async (proposalId) => {

    try{
        const data = await db.any("select * from ruleaudit where proposalid = $1;", String(proposalId))
        return data

    } catch (e) {
        return 'help'
    }
    
    
}


console.log(selectRules(proposalId))


// module.exports

