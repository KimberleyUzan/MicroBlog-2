import "./profile.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useRef, useState, useEffect, useContext } from "react";
import firebase from "../../firebase-cred/firebase";
import "firebase/storage";
import { AuthContext } from "../../auth";

const Profile = (props) => {
  const [username, setUsername] = useState("");
  const [isUserEditable, setUserEditable] = useState(true);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showEmpty, setShowEmpty] = useState(false);
  const [profilePic, setProfilePic] = useState("");

  const { currentUser } = useContext(AuthContext);
  const [target, setTarget] = useState(null);

  const getUserName = () => {
    const user = firebase.auth().currentUser;
    const name = {};
    if (user != null) {
      name.username = user.displayName;
      setUsername(getUserInfo().name);
    }
  };

  const getUserInfo = () => {
    const user = firebase.auth().currentUser;
    const userInfos = {};

    if (user != null) {
      userInfos.name = user.displayName;
      userInfos.email = user.email;
      userInfos.photoUrl = user.photoURL;
      userInfos.emailVerified = user.emailVerified;
      userInfos.uid = user.uid;
    }
    return userInfos;
  };

  useEffect(() => {
    getUserName();

  }, [currentUser]);

  const handleSaveUsername = (e) => {
    e.preventDefault()
    if (username.length === 0) {
      setShowEmpty(!showEmpty);
      setTarget(e.target);
    } else {
      setTarget(e.target);
      setShowSuccess(!showSuccess);
      setTimeout(() => {
        setUserEditable(!isUserEditable);
        setShowSuccess(showSuccess);
      }, 1000);
      props.changeUsername(username);
    }
  };

  const handleUsernameChange = (e) => {
    e.preventDefault()
    setUsername(e.target.value);
  };

  const handleEditUsername = () => {
    setUserEditable(!isUserEditable);
  };

  const handleImageUpload = () => {
    document.querySelector("#custom-file").click();
  };

  const uploadImage = async (e) => {
    const image = e.target.files[0];
    const storage = firebase.storage();
    const storageRef = storage.ref(`profilePic/${getUserInfo().uid}.jpg`);
    const userDB = firebase.firestore().collection('users')
    const tweetsRef = firebase.firestore().collection("tweets");
    await storageRef.put(image);
    console.log("uploaded");
    const photoURL = await storageRef.getDownloadURL();
    await currentUser.updateProfile({
      photoURL: photoURL,
    });
    await userDB.doc(currentUser.uid).get().then(user => {
      if (user) {
        const usersBatch = userDB.firestore.batch();
      if(user.data().photoUrl !== photoURL) {
        usersBatch.update(user.ref,{"photoUrl":photoURL})
        usersBatch.commit();
      }
    }
    })
    await tweetsRef.where('uid', '==', currentUser.uid).get().then((querySnapshot) => {
      if(querySnapshot){
        const tweetBatch = tweetsRef.firestore.batch();
        querySnapshot.docs.forEach((doc) => {
          if(doc.data().photoUrl !== photoURL) {
            tweetBatch.update(doc.ref,{"photoUrl":photoURL})
            tweetBatch.commit();
          }
        });
      }
    });
    setProfilePic(photoURL);
  };

  return (
    <>
     <div className='profile-container'>
      <div className='image-profile-container'>
        <div className='setting-image-container'>
        {/* <img
          src={getUserInfo().photoUrl}
          className='profile-image'
          alt=''
          width='96'
          height='96'
        /> */}
        {/* No work */}
          <img
          src="src/Components/profile/e.jpg"
          className='profile-image'
          alt=''
          width='96'
          height='96'
        />
        </div>
        <Button
          className='edit-profile-image-button'
          onClick={handleImageUpload}
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            viewBox='-2 -4 24 24'
            width='24'
            height='24'
            preserveAspectRatio='xMinYMin'
            className='icon__icon'
          >
            <path d='M4.126 3C4.57 1.275 6.136 0 8 0h4a4.002 4.002 0 0 1 3.874 3H16a4 4 0 0 1 4 4v5a4 4 0 0 1-4 4H4a4 4 0 0 1-4-4V7a4 4 0 0 1 4-4h.126zM10 13a4 4 0 1 0 0-8 4 4 0 0 0 0 8zm6-5a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm-6 3a2 2 0 1 1 0-4 2 2 0 0 1 0 4z'></path>
          </svg>
        </Button>
      </div>
      <Button type='submit' className='edit-button btn btn-light' onClick={() => {
          handleEditUsername()
          }}>
          Tap to edit
        </Button>
      <h3 className='profile-title'> Username </h3>
      <Form className='form-container'>
        <Form.Select
          className='edit-profile-image'
          id='custom-file'
          label='Custom file input'
          
          onChange={uploadImage}
        />
          <Form.Control
            type='text'
            className='username-input'
            onChange={handleUsernameChange}
            value={username}
            disabled={isUserEditable}
          />

        <Button
              type='submit'
              className='save-button btn btn-light'
              onClick={handleSaveUsername}
            >
              Save
            </Button>
            <h3 className='profile-title'>Email</h3>
        <Form.Control
          type='text'
          className='email-input'
          value={getUserInfo().email}
          disabled={true}
        />
      </Form>
    </div>
    
    </>
  );
};

export default Profile;
