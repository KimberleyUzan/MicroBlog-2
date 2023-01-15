import { useState } from "react";
import Button from 'react-bootstrap/Button'
import { Link } from 'react-router-dom'
import "../index.css";

const TweetForm = (props) => {
  const [input, setInput] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    props.postTweet(input);
    setInput("");
  };

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  const disableTweet = () => {
    if(input.length < 1) {
      return true
    } else if (input.length >= 140) {
      return true
    } else {
      return false
    }
  }

  return (
      <>
    <form className="tweet-form" onSubmit={handleSubmit}>
      <textarea value={input} className='textarea-tweet' onChange={handleChange} rows={6} maxLength={140} placeholder="What you have in mind..."></textarea>
      {!props.username && <div className="alert alert-danger max-chars" >ANONYMOUS USER - Please change your user name in <Link to="/profile">profile</Link></div>}
    {input.length >= 140 && <div className="max-chars" >The tweet can't contain more than 140 chars.</div>}
    </form>
    <form className="tweet-form2" onSubmit={handleSubmit}>
    {!disableTweet() && <Button type='submit' className="btn btn-light tweet-button" disabled={disableTweet()}>Tweet</Button>}
    </form>
        </>
  );
};

export default TweetForm;
