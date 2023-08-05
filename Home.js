import  Nav from '../components/Nav'
import {useState} from 'react'
import AuthModel from '../components/AuthModel'
import {useCookies} from 'react-cookie'


const Home = () => {   
const [showModel , setShowModel] = useState(false)
const [isSignUp, setIsSignUp] = useState(true) 
const [ cookies , setCookie, removeCookie] = useCookies(['user'])


const authToken = cookies.AuthToken    

const handleClick = () => {
  if (authToken){
    removeCookie('UserId', cookies.UserId)
    removeCookie('AuthToken', cookies.AuthToken)
    window.location.reload()
    return
  }
setShowModel(true) 
setIsSignUp(true) 
}

const handleLoginClick = () => {
  setShowModel(true)
  setIsSignUp(false) // Set the mode to login
}


const handleCloseModel = () => {
setShowModel(false)

}

    return ( 
        <div className="overlay">
        <Nav 
             authToken={authToken}
             setShowModel={setShowModel} 
             showModel={showModel} 
             setIsSignUp = {setIsSignUp}
             showLoginButton={authToken}
            />

        <div className = "Home">
          <h1 className="primary-title">Swipe Right™ </h1> 
          {authToken ? (
          <button className="primaryButton" onClick={handleClick}>
            SignOut
          </button>
        ) : (
          <>
          <button className="primaryButton" onClick={handleClick}>
            Create Account
          </button>
          <button className="secondary-button" onClick={handleLoginClick}>
                            Log In
          </button>
          </>
        )}

 
        {showModel && (
            <AuthModel setShowModel = {setShowModel}  isSignUp={isSignUp }/>
        )}


        </div>
        </div>    
    )
}
export default Home