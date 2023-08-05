import ChatHeader from "./ChatHeader"
import MatchesDisplay from "./MatchesDisplay"
import ChatsDisplay from "./ChatsDisplay"
import { useState } from "react"


const ChatContainer = ({ user }) => {

    const [clickedUser, setClickedUser] = useState(null)

    return (
        <div className="chatContainer">
            <ChatHeader user = { user }/>
             <div>
                <button className="option" onClick={() => setClickedUser(null)}>Matches</button>
                <button className="option" disabled={!clickedUser}>Chats</button>
             </div>
             {!clickedUser && <MatchesDisplay matches={user.matches} setClickedUser={setClickedUser }/> }

             {clickedUser && <ChatsDisplay user ={user} clickedUser={clickedUser }/>}

        </div>
    )
}
export default ChatContainer