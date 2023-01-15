import { useContext, useEffect, useRef, useState } from "react";
import './tweetsContainer.css'
import TweetForm from "../TweetForm";
import TweetBody from "../tweet-body/TweetBody";
import firebase from "../../firebase-cred/firebase";
import shortid from "shortid";
import { AuthContext } from "../../auth";
import moment from "moment";

export const getKeywords = (str) => {
  var i,
    j,
    result = [];
  for (i = 0; i < str.length; i++) {
    for (j = i + 1; j < str.length + 1; j++) {
      result.push(str.slice(i, j).toLowerCase());
    }
  }
  return result;
};

const TweetsContainer = (props) => {
  const [tweets, setTweets] = useState([]);
  const [totalTweet, setTotalTweet] = useState(null);
  const [showTweets, setShowTweets] = useState(true);

  const ref = firebase.firestore().collection("tweets");
  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    if (currentUser) {
      getTweets();
    }
  }, []);


  // const getDate = () => {
  //   const d = new Date();
  //   const date = d.toISOString().split("T")[0];
  //   const time = d.toTimeString().split(" ")[0].replace(/:/g, "-");
  //   return `${date} ${time}`;
  // };

  const getOtherWayDate = () => {
    const mydate = new Date().toUTCString();
    return mydate;
  };
  const getTweets = () => {
    ref.onSnapshot((querySnapshot) => {
      const tweets = [];
      querySnapshot.forEach((tweet) => tweets.push(tweet.data()));
      setTweets(tweets.sort((a, b) => b.id - a.id));
    });
  };

  const postTweet = async (input) => {
    const numberDate = moment().utc().format("YYYY-MM-DD HH:mm:ss").replace(/\-/g, '').replace(/\:/g, '').split(' ').join('')
    const docId = shortid.generate();
    const newTweet = {
      id: numberDate,
      uid: currentUser.uid,
      content: input,
      username: currentUser.displayName,
      date: getOtherWayDate(),
      photoUrl: currentUser.photoURL,
      docID: docId,
      keywords: getKeywords(input),
      comments: [],
    };
    await ref.doc(docId).set(newTweet);
    setTotalTweet(totalTweet + 1);
  };

  const showTheTweets = () => {
    if (showTweets) {
      return tweets;
    } 
  };
  const deleteTweet = async (id) => {
    await ref.doc(id).delete();
  };

  return (
    <div className='tweet-container'>
      <TweetForm postTweet={postTweet} username={props.username} />
      <div className='all-tweets-area'>
        <TweetBody
          tweets={showTheTweets()}
          deleteTweet={deleteTweet}
          currentPage='homePage'
        />
      </div>
    </div>
  );
};

export default TweetsContainer;
