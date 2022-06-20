import MeetupDetail from '../../components/meetups/MeetupDetail';
import { MongoClient, ObjectId} from 'mongodb'
import Head from 'next/head'

export default function MeetupDetails (props) {

    return <>
        <Head>
            <title>{props.meetupData.title}</title>
            <meta name="description" content={props.meetupData.description} />
        </Head>
        <MeetupDetail
            image={props.meetupData.image}
            title={props.meetupData.title}
            address={props.meetupData.address}
            description={props.meetupData.description}
        />
    </>
}

export async function getStaticPaths() {
    const client = await MongoClient.connect('mongodb+srv://ander:senha123@cluster0.qm6irpm.mongodb.net/?retryWrites=true&w=majority')
    const db = client.db();

    const meetupsColletions = db.collection('meetups');

    const meetups = await meetupsColletions.find({}, { _id: 1}).toArray();
    client.close()

    return {
        fallback: 'blocking',
        paths: meetups.map(meetup => ({
            params: { meetupId: meetup._id.toString() }
        }))
    }
}

export async function getStaticProps(context) {
    const meetupId = context.params.meetupId;

    const client = await MongoClient.connect('mongodb+srv://ander:senha123@cluster0.qm6irpm.mongodb.net/?retryWrites=true&w=majority')
    const db = client.db();

    const meetupsColletions = db.collection('meetups');

    const selectedMeetup = await meetupsColletions.findOne({_id: ObjectId(meetupId) })

    console.log(selectedMeetup)

    return {
        props: {
            meetupData: {
                id: selectedMeetup._id.toString(),
                image: selectedMeetup.image,
                title: selectedMeetup.title,
                address: selectedMeetup.address,
                description: selectedMeetup.description
            }
        }
    }
}