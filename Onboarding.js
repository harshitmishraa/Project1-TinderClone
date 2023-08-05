import { useState } from "react"
import Nav from "../components/Nav.js"
import { useCookies } from 'react-cookie'
import { useNavigate } from "react-router-dom"
import axios from "axios"

const Onboarding = () => { 
      const [ cookies, setCookie, removeCookie] = useCookies(['user'])
    const [formData,setformData] = useState({
        user_id: cookies.userId,
        first_name: "",
        dob_day: "",
        dob_month: "",
        dob_year: "",
        show_gender: false,
        gender_identity: 'man',
        gender_interest: 'woman',
        url: "",
        about: "",
        matches: []

    })

    let navigate = useNavigate()

    const handleSubmit = async (e) => {
       
        console.log('submitted')
        e.preventDefault()
        try{
            const response =   await axios.put('http://localhost:8000/user', { formData })
            const success = response.status === 200
            if(success) navigate('/Dashboard')
        }
        catch(err){
              console.log(err)
        }
    }


    const handleChange = (e) => {
      const { name, value, type } = e.target;
      
      if (type === 'file') {
        // Handle file input for profile picture
        const file = e.target.files[0];
        const imageURL = URL.createObjectURL(file);
    
        setformData((prevState) => ({
          ...prevState,
          [name]: imageURL,
        }));
      } else {
        // Handle other form inputs
        const updatedValue = type === 'checkbox' ? e.target.checked : value;
        
        setformData((prevState) => ({
          ...prevState,
          [name]: updatedValue,
        }));
      }
    }
   
      
 
    
     return ( 
    <div >
      <Nav 
      setShowModel={() => {}} 
      showModel={false} 
      authToken={false} 
      showLoginButton={false} 
      />

      <div className="onboarding">
          <h2> CREATE ACCOUNT </h2>

          <form onSubmit={handleSubmit}>
              <section>
                  <label htmlFor ="first_name"> FIRST NAME </label>
                  <input
                        id = "first_name"
                        type = "text"
                        name = "first_name"
                        placeholder = "FIRST NAME"
                        required={true}
                        value = {formData.first_name}
                        onChange = {handleChange} 
                        autoComplete="first_name"
                  />

                  <label> BIRTHDAY </label>
                  <div className= "multiple-input-container">
                  <input
                        id = "dob_day"
                        type = "number"
                        name = "dob_day"
                        placeholder = "DD"
                        required={true}
                        value = {formData.dob_day}
                        onChange = {handleChange} 
                        
                  />
                   <input
                        id = "dob_month"
                        type = "number"
                        name = "dob_month"
                        placeholder = "MM"
                        required={true}
                        value = {formData.dob_month}
                        onChange = {handleChange} 
                  />
                  <input
                        id = "dob_year"
                        type = "number"
                        name = "dob_year"
                        placeholder = "YYYY"
                        required={true}
                        value = {formData.dob_year} 
                        onChange = {handleChange} 
                  />
                  </div>
                  <label> GENDER  </label>
                  <div className= "multiple-input-container">
                  <input
                        id = "man-gender-id"
                        type = "radio" 
                        name = "gender_identity"
                        required={true}
                        value = "man"
                        onChange = {handleChange} 
                        checked={formData.gender_identity === 'man'}
                  />
                  <label htmlFor ="man-gender-id"> MAN </label>

                    <input
                        id = "woman-gender-id"
                        type = "radio" 
                        name = "gender_identity"
                        
                        required={true}
                        value = "woman"
                        onChange = {handleChange} 
                        checked={formData.gender_identity === 'woman'}
                  />
                      <label htmlFor ="woman-gender-id"> WOMAN </label>
                   <input
                        id = "more-gender-id"
                        type = "radio" 
                        name = "gender_identity"                       
                        required={true}
                        value = "more"
                        onChange = {handleChange} 
                        checked={formData.gender_identity === 'more'}
                  />
                    <label htmlFor ="more-gender-id"> MORE </label>
                  </div>

                  <label htmlFor ="show-gender"> Show Gender on my Profile </label>
                  <input
                        id = "show-gender"
                        type = "checkbox" 
                        name = "show_gender"
                        onChange = {handleChange} 
                        checked={formData.show_gender}
                  /> 

                 <label > Show Me </label> 
                 <div className = "multiple-input-container">
                 <input
                        id = "man-gender-interest"
                        type = "radio" 
                        name = "gender_interest"                  
                        value = "man"
                        onChange = {handleChange} 
                        checked={formData.gender_interest === 'man'}
                  />
                  <label htmlFor ="man-gender-interest"> MAN </label>

                    <input
                        id = "woman-gender-interest"
                        type = "radio" 
                        name = "gender_interest"
                        value = "woman"
                        onChange = {handleChange} 
                        checked={formData.gender_interest === 'woman'}
                  />
                      <label htmlFor ="woman-gender-interest"> WOMAN </label>
                   <input
                        id = "everyone-gender-interest"
                        type = "radio" 
                        name = "gender_interest"                       
                        value = "everyone"
                        onChange = {handleChange} 
                        checked={formData.gender_interest === 'everyone'}
                  />
                    <label htmlFor ="everyone-gender-interest"> EVERYONE </label>

                  </div> 

                  <label htmlFor="about"> About Me</label>
                  <input
                        id = "about"
                        type = "text"
                        name = "about"
                        required= {true}
                        placeholder = "I Like Long Walks..."
                        value={formData.about}
                        onChange = {handleChange}

                    />
                    <input 
                           type = "submit"
                    />

              </section>

              <section>
              <label htmlFor="url">Profile Photo</label>
              <input
                    type= "file"
                    name= "url"
                    id = "url"
                    onChange={handleChange}
                    required={true}

              
              />
              <div className="photo-container">
              {formData.url && <img src = {formData.url} alt = "profile pic preview"/>}
                   

              </div>
                      

              </section>

          </form>

      </div>

    </div>
        
       
    )
}
export default Onboarding 

