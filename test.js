const { MongoClient } = require('mongodb');

// Read the credentials from environment variables so that you do not accidentally check in your credentials

const password = process.env.password;

async function main() {
  // Connect to the database cluster
  const url = `mongodb+srv://${"sariba"}:${password}@${"cluster0.gyes5ym.mongodb.net/"}`;
  const client = new MongoClient(url);
  const collection = client.db('rental').collection('house');

  // Insert a document
  const house = {
    name: 'Beachfront views',
    summary: 'From your bedroom to the beach, no shoes required',
    property_type: 'Condo',
    beds: 1,
  };
  await collection.insertOne(house);

  // Query the documents
  const query = { property_type: 'Condo', beds: { $lt: 2 } };
  const options = {
    sort: { score: -1 },
    limit: 10,
  };

  const cursor = collection.find(query, options);
  const rentals = await cursor.toArray();
  rentals.forEach((i) => console.log(i));
}

main().catch(console.error);