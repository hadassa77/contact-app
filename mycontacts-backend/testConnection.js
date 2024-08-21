const { MongoClient } = require('mongodb');

async function run() {
    const uri = "mongodb+srv://marumudihadassa:hadassa@pagecluster.qcvx9.mongodb.net/?retryWrites=true&w=majority&appName=pagecluster";
    const client = new MongoClient(uri, {
        tlsAllowInvalidCertificates: true // Allow invalid certificates
    });

    try {
        await client.connect();
        console.log("Connected");

        const dbName = "mycontacts-backend";
        const collectionName = "contacts";
        const database = client.db(dbName);
        const collection = database.collection(collectionName);

        try {
            const findOneResult = await collection.findOne({});
            if (findOneResult === null) {
                console.log("Couldn't find any documents.\n");
            } else {
                console.log(`Found a document:\n${JSON.stringify(findOneResult)}\n`);
            }
        } catch (err) {
            console.error(`Something went wrong trying to find one document: ${err}\n`);
        }
    } catch (err) {
        console.error(`Error connecting to MongoDB: ${err}\n`);
    } finally {
        await client.close();
    }
}

run();