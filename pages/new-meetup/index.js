import { useRouter } from 'next/router'
import Head from 'next/head'

import NewMeetupForm from '../../components/meetups/NewMeetupForm';

export default function NewMeetup() {
    const router = useRouter();

    async function addMeetupHandler(enteredMeetupData) {
        const response = await fetch('/api/new-meetup', {
          method: 'POST',
          body: JSON.stringify(enteredMeetupData),
          headers: {
            'Content-Type': 'application/json',
          },
        });
    
        const data = await response.json();
    
        router.push('/')

      }

    return <>
      <Head>
        <title>React Meetups</title>
        <meta name="description" content="browse a huge list of highly active react meetups"/>
      </Head>
      <NewMeetupForm onAddMeetup={addMeetupHandler} />
    </>
}