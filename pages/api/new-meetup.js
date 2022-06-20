import { MongoClient} from 'mongodb'

export default async function handler(req, res) {
    if (req.method === 'POST') {
      const data = req.body;

      const client = await MongoClient.connect('mongodb+srv://ander:senha123@cluster0.qm6irpm.mongodb.net/?retryWrites=true&w=majority')
      const db = client.db();

      const meetupsColletions = db.collection('meetups');

      const result = await meetupsColletions.insertOne(data)

      client.close();

      res.status(201).json({message: 'Meetip inseted!'})
    }
}
