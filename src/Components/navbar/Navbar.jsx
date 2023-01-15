import "./navbar.css";
import { Link } from 'react-router-dom'
import firebase from '../../firebase-cred/firebase'
import 'firebase/auth'
import {AuthContext} from '../../auth'
import { useContext, useState } from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'

const Navbar = (props) => {
  const [smShow, setSmShow] = useState(false);

  const {currentUser} = useContext(AuthContext)

  const logout = () => {
    setSmShow(false)
    firebase.auth().signOut()
  }
  return (
    <nav className="my-nav">
      <div className='nav-links'> 
      <ul >
        <li>
        <Link to="/"> Home </Link>
        </li>
        {currentUser && <li>
        <Link to="/profile">Profile</Link> 
        </li>}
        {currentUser && <li>
        <Link to="/"><div onClick={() => setSmShow(true)}>Logout</div></Link>
        </li>}
      </ul>
      </div>
      <Modal
          size='sm'
          show={smShow}
          onHide={() => setSmShow(false)}
          aria-labelledby='example-modal-sizes-title-sm'
        >
          <Modal.Body>
            <div className='modalContainer'>
            Logout ?
              <div className='logout-buttons'>
                <Button onClick={() => logout()}>
                  Logout
                </Button>{" "}
                <Button onClick={() => setSmShow(false)}>Cancel</Button>
              </div>
            </div>
          </Modal.Body>
        </Modal>
    </nav>
  );
};

export default Navbar;
