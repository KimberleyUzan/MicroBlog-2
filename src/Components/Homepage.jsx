import Login from './Login'

const Homepage = (props) => {
    return (
        <div className="profile-container">
        <h1> WELCOME !</h1>
        <div className="homepage-content">
            <h4> PLEASE LOGIN </h4>
        </div>
        <Login/>
        </div>
    )
}

export default Homepage