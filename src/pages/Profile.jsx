import { useState } from "react"
import {getAuth} from 'firebase/auth'
import { useNavigate } from "react-router-dom"

const Profile = () => {
  const navigate = useNavigate();
  const auth = getAuth()
  const [formData , setFormData] = useState({
    name:auth.currentUser.displayName,
    email:auth.currentUser.email
  });
  function onLogout(){
    auth.signOut()
    navigate('/')

  }
  const {name , email } =formData;
  return (
    <>
      <section className="max-w-6xl mx-auto flex justify-center items-center flex-col">
        <h1 className="text-3xl text-center mt-6  font-bold">My Profile</h1>

        <div className="w-full md:w-[50%] mt-6 px-3">
          <form>
            <input type="text" id="name" value={name} disabled className="w-full px-4 py-2 text-xl text-gray-700 bg-white border mb-6 border-gray-300 rounded transition ease-in-out"/>
            
            <input type="text" id="email" value={email} disabled className="w-full px-4 py-2 text-xl text-gray-700 bg-white border mb-6 border-gray-300 rounded transition ease-in-out"/>

            <div className="flex justify-between whitespace-nowrap mb-6 text-sm sm:text-lg">
              <p className="flex items-center">Do you want to change your name?
                <span className="text-red-500 hover:text-red-700 cursor-pointer ml-1 transition ease-in-out duration-200">Edit?</span>
              </p>
              <p onClick={onLogout} className="text-blue-600 hover:text-blue-800 cursor-pointer ml-1 transition ease-in-out duration-200">Sign Out</p>
            </div>
          </form>
        </div>
      </section>
    </>
  )
}

export default Profile
