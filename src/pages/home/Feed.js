import React, { useEffect, useState } from 'react'
import './Feed.css'
import CreateIcon from '@mui/icons-material/Create';
import InputOption from '../../InputOption';
import ImageIcon from '@mui/icons-material/Image';
import SubscriptionsIcon from '@mui/icons-material/Subscriptions';
import EventNoteIcon from '@mui/icons-material/Event';
import CalendarViewDaySharpIcon from '@mui/icons-material/CalendarViewDaySharp';
import Posts from '../../Posts';
import firebase from 'firebase/compat/app';
import { db } from '../../firebase';
import { useSelector } from 'react-redux';
import { selectUser } from '../../features/userSlice';
import FlipMove from 'react-flip-move';

function Feed() {
  const user = useSelector(selectUser);
  const [input, setInput] = useState('');
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    db.collection('posts').orderBy("timestamp", "desc").onSnapshot((snapshot) => 
      setPosts(snapshot.docs.map((doc) => ({
        id:doc.id,
        data:doc.data(),
      }))
      )
    );
  }, []);


const sendPost = e => {
  e.preventDefault();

  db.collection('posts').add({
    name: user.displayName,
    description: user.email,
    message:input,
    photoUrl: user.photoUrl || "",
    timestamp: firebase.firestore.FieldValue.serverTimestamp(),
  });

  setInput("");
};

  return (
    <div className='feed'>
        <div className='feed_inputContainer'>
            <div className='feed_input'>
                <CreateIcon />
                <form>
                    <input value={input} onChange={e => setInput(e.target.value)} type='text' />
                    <button onClick={sendPost} type='submit'>send</button>
                </form>

            </div>
            <div className='feed_inputoptions'>
              <InputOption Icon={ImageIcon} title="Photo" color="#70B5F9" />
              <InputOption Icon={SubscriptionsIcon} title="Video" color="#E7A33E" />
              <InputOption Icon={EventNoteIcon} title="Event" color="#C0CBCD" />
              <InputOption Icon={CalendarViewDaySharpIcon} title="Write article" color="#7FCI5E" />
            </div>

        </div>
        {/* Posts */}
        <FlipMove>
        {posts.map(({id, data: {name, description,message,photoUrl}}) => (
          <Posts
             key={id}
             name={name}
             description={description}
             message={message}
             photoUrl={photoUrl}
          
          />
        ))}
        </FlipMove>
        
    </div>
  )
}

export default Feed