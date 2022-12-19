import { async } from '@firebase/util';
import { collection, doc, getDoc, getDocs, query,serverTimestamp,setDoc,updateDoc,where } from 'firebase/firestore';
import React, { useContext, useState } from 'react';
import { db } from '../firebase';
import { AuthContext } from '../hoc/AuthContext';

export const Search = () => {
  const [userName, setUserName] = useState('');
  const [user, setUser] = useState(null);
  const [err, setErr] = useState(false);

  const {currentUser} = useContext(AuthContext)

  const handleSearch = async() => {
    const q = query(
      collection(db, 'users'),
      where('displayName', '==', userName)
    );

    try {
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        setUser(doc.data())
      })
      
    } catch (error) {
      setErr(true);
    }
  }

  const handleSelect = async () => {
    const combinedId =
      currentUser.uid > user.uid
        ? currentUser.uid + user.uid
        : user.uid + currentUser.uid;
        try {
          const res = await getDoc(doc(db, 'chats', combinedId));
          if(!res.exists()) {
            await setDoc(doc(db, 'chats', combinedId),{messages: []});

            await updateDoc(doc(db, 'userChats', currentUser.uid), {
              [combinedId + '.userInfo']: {
                uid:user.uid,
                displayName: user.displayName,
                photoURL: user.photoURL
              },
              [combinedId + '.date']: serverTimestamp()
            });
                   await updateDoc(doc(db, 'userChats', user.uid), {
              [combinedId+'.userInfo']: {
                uid:currentUser.uid,
                displayName: currentUser.displayName,
                photoURL: currentUser.photoURL
              },
              [combinedId+'.date']: serverTimestamp()
            });
            
           
          }
        } catch (error) {
          
        }
  }

  const handleKey = (e) => {
    e.code == 'Enter' && handleSearch();
  }
  return (
    <div className='search'>
        <input onChange={e=>setUserName(e.target.value)} onKeyDown={handleKey} type="search_text" placeholder='Find user ?'/>
       {err && <span>User not found !</span>}
       {user && <div className="search_user" onClick={handleSelect}>
            <img className='search_avatar' src={user.photoURL} alt="" />
            <span className="search_name">{user.displayName}</span>
        </div>}
        
    </div>
  )
}
