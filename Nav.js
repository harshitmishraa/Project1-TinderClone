import logo from '../images/logo.png';

const Nav = ({authToken , setShowModel , showModel, setIsSignUp, showLoginButton}) => {

    const handleClick = () => {
          setShowModel(false)
          setIsSignUp(true)
         
    }
    
    return (
        <nav>

        <div className="logo-container">
            <img className="logo"  src = {logo}  />

        </div>

        {showLoginButton ? (
        <button 
        className="nav-button" 
        onClick={handleClick}
        disabled={showModel}
        > 
        Log In
            </button>
         ):null}
        </nav>
    ) 
}
export default Nav