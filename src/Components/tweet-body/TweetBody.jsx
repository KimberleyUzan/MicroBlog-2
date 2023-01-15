import { useState, useContext } from "react";
import { AuthContext } from "../../auth";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import './tweetBody.css'

const TweetBody = (props) => {
  const [smShow, setSmShow] = useState(false);
  const [currentDocID, setDocID] = useState("");
  
  const { currentUser } = useContext(AuthContext);

  const handleDeleteTweet = (id) => {
    props.deleteTweet(id);
    setSmShow(false);
  };


  const singleTweet = props.tweets.map((tweet, index) => {
    const theDate = new Date().toISOString()
    const TweetHeader = () => {
      return (
        <div className='tweet-title'>
          <div className='tweet-profile-info'>
              <img
                src={tweet.photoUrl}
                alt=''
                className='profile-miniature'
                width='32'
                height='32'
              />

            <div className='tweet-username'>
              {tweet.username}
            </div>
          </div>
          {tweet.uid === currentUser.uid && props.currentPage === 'homePage' && (
            <svg
              xmlns='http://www.w3.org/2000/svg'
              viewBox='-3 -2 24 24'
              width='24'
              height='24'
              preserveAspectRatio='xMinYMin'
              onClick={() => {
                setDocID(tweet.docID);
                setSmShow(true);
              }}
              className='icon__icon delete-tweet-button'
            >
              <path d='M12 2h5a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1h5V1a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v1zm3.8 6l-.613 9.2a3 3 0 0 1-2.993 2.8H5.826a3 3 0 0 1-2.993-2.796L2.205 8H15.8zM7 9a1 1 0 0 0-1 1v7a1 1 0 0 0 2 0v-7a1 1 0 0 0-1-1zm4 0a1 1 0 0 0-1 1v7a1 1 0 0 0 2 0v-7a1 1 0 0 0-1-1z'></path>
            </svg>
          )}
        </div>
      );
    };
    const TweetFooter = () => {
      return (
        <div className='tweet-bottom'>
            <div className='tweet-date'>{theDate}</div>
        </div>
      );
    };
    const DeleteModal = () => {
      return (
        <Modal
          size='sm'
          show={smShow}
          onHide={() => setSmShow(false)}
          aria-labelledby='example-modal-sizes-title-sm'
        >
          <Modal.Header closeButton>
            <Modal.Title id='example-modal-sizes-title-sm'>
              Are you sure ?
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className='modalContainer'>
              It won't be recoverable !
              <div className='modal-buttons'>
                <Button onClick={() => handleDeleteTweet(currentDocID)}>
                  Yes
                </Button>{" "}
                <Button onClick={() => setSmShow(false)}>No</Button>
              </div>
            </div>
          </Modal.Body>
        </Modal>
      );
    };

    return (
        <div className='tweet-body' key={index} id={index}>
          {TweetHeader()}
          <div className='tweet-content'> {tweet.content} </div>
          {TweetFooter()}
          {DeleteModal()}
        </div>
    );
  });
  return singleTweet;
};

export default TweetBody;
