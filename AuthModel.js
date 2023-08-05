import React from 'react'
import { set } from 'lodash'
import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useCookies } from 'react-cookie'

const AuthModel = ({ setShowModel , isSignUp }) => {
    const [ email, setEmail] = useState(null)
    const [ password, setPassword] = useState(null)
    const [ confirmPassword, setConfirmPassword] = useState(null)
    const [ Error , setError] = useState(null)
    const [ cookies, setCookie, removeCookie] = useCookies(['user'])

    let navigate = useNavigate()
 

 
  
  const handleClick = () => {
    setShowModel(false)
  }
 
  const handleSubmit = async (e) => {
      e.preventDefault()
      try {
          if(isSignUp && (password !== confirmPassword)){
              setError( 'Passwords need to match')
              return
          }

          const response = await axios.post(`http://localhost:8000/${isSignUp ? 'signup' : 'login'}`, {email, password})

         // setCookie('Email', response.data.email )  
          setCookie('userId', response.data.userId ) 
          setCookie('AuthToken', response.data.token )


          const success = response.status === 201

          if(success && isSignUp) {navigate
             ('/Onboarding')}

          else if(success && !isSignUp) {
            navigate ('/Dashboard')}
          
      } catch(Error) {
          console.log(Error)
      }
    } 



  return (
    <div className= "auth-model">
      <div className="close-icon" onClick={handleClick}> ⊗ </div>
      <h2>{isSignUp ? 'CREATE ACCOUNT' : 'LOG IN'}</h2>
      <p>By Clicking Login you agree to our Terms and Condition</p>
      <form onSubmit={handleSubmit}>
          <input
          type="email"
          id = "email"
          name = "email"
          placeholder = "email" 
          required={true}
          onChange={(e)=> setEmail(e.target.value)}

          />

          <input
          type="password"
          id = "password"
          name = "password"
          placeholder = "password" 
          required={true}
          onChange={(e)=> setPassword(e.target.value)}

          />

          {isSignUp && <input
          type="password"
          id = "password-check"
          name = "password-check"
          placeholder = "confirm-password" 
          required={true}
          onChange={(e)=> setConfirmPassword(e.target.value)}

          />}

          <input className="secondary-button" type="submit"/>
          <p>{Error}</p>
      </form>
      <hr/>
      <h2>GET THE APP</h2>
    </div>
  )
}

export default AuthModel
