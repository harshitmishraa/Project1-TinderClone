import { useCookies } from "react-cookie"

const ChatHeader = ({ user }) => {
    
    const [ cookies , setCookie, removeCookie] = useCookies(['user'])

    

    const logout = () =>{
        removeCookie('UserId', cookies.UserId)
        removeCookie('AuthToken' , cookies.AuthToken)
        window.location.reload()
    }

    return (
       
        <div className="chatContainerHeader">
            <div className="profile">
                <div className="imageContainer">
                    < img src = { user.url } alt ={"Photo of " + user.first_name}/> 
                </div>
                <h3>
                    {user.first_name}
                </h3>
            </div>
            <i className="logoutIcon" onClick={logout}>⬅️</i>
            
        </div>
        
    )
}
export default ChatHeader