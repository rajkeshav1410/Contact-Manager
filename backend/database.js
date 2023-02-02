const { MongoClient, ServerApiVersion } = require('mongodb');

const path = require('path');
require('dotenv').config({
    path: path.resolve(__dirname, `${process.env.NODE_ENV}.env`)
});

var client, database;

exports.init = async() => {
    const uri = `mongodb+srv://${process.env.user}:${process.env.password}@fstack-activity.gwxw9iu.mongodb.net/?retryWrites=true&w=majority`;
    console.log(uri);

    client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

    try {
        await client.connect();
        database = await client.db('activity').collection('contact')
    } catch (err) {
        console.error(err);
    }
}

exports.getAllDatabases = async() => {
    const databaseList = await client.db().admin().listDatabases();
    console.log(databaseList);
    databaseList.databases.forEach(db => console.log('- ' + db.name));
}

exports.createUser = async(user) => {
    console.log('creating user');
    await database.insertOne({
            userid: user.id,
            name: user.name,
            email: user.email,
            password: user.password,
            contacts: []
        }).then((res) => console.log(`New user created with id ${res.insertedId}`))
        .catch((err) => console.log(err));
}

exports.createContact = async(userid, contacts) => {
    await database.updateOne({
        userid: userid
    }, { $push: { contacts: contacts } })
}

exports.fetchContact = async(userid) => {
    const cursor = await database.find({ userid: userid })
    if (await cursor.hasNext()) {
        const data = await cursor.next();
        return data.contacts;
    } else {
        console.log('User not found')
    }
    await cursor.close()
}

exports.findContact = async(userid, cid) => {
    const cursor = await database.find({ userid: userid })
    if (await cursor.hasNext()) {
        const data = await cursor.next();
        for (contact of data.contacts) {
            if (contact.cid == cid)
                return contact;
        }
    } else {
        console.log('User not found')
    }
    await cursor.close()
}

async function main() {
    await init()

    // createUser({
    // 	id: 'vahsekjar',
    // 	name: 'Keshav Raj',
    // 	email: 'www.keshav.mars@gmail.com',
    // 	password: 'keshav929'
    // })

    // await createContact('vahsekjar', {
    //     name: { firstName: 'Rishabh', lastName: 'Rathore' },
    //     email: '1da19is042.is@drait.edu.in',
    //     phone: [
    //         { number: '1234567891', label: 'primary' },
    //         { number: '1234567892', label: 'work' }
    //     ]
    // })

    console.log(await fetchContact('vahsekjar'));

    client.close();
}