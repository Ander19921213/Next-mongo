import MeetupList from '../components/meetups/MeetupList';
import { MongoClient} from 'mongodb'

export default function Home(props) {
    return  <MeetupList meetups={props.meetups} />
}

export async function getStaticProps () {
    const client = await MongoClient.connect('mongodb+srv://ander:senha123@cluster0.qm6irpm.mongodb.net/?retryWrites=true&w=majority')
    const db = client.db();

    const meetupsColletions = db.collection('meetups');

    const meetups = await meetupsColletions.find().toArray();
    client.close();

    return {
        props: {
            meetups: meetups.map((meetup) => ({
                title: meetup.title,
                image: meetup.image,
                address: meetup.address,
                id: meetup._id.toString()
            }))
        },
        revalidate: 10
    }
}
