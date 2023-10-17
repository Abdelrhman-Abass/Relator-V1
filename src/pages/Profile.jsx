import { useState } from "react"
import {getAuth, updateProfile} from 'firebase/auth'
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase.config";

const Profile = () => {
  const navigate = useNavigate();
  const [changeDetail , setChangeDetail] = useState(false);
  const auth = getAuth()
  const [formData , setFormData] = useState({
    name:auth.currentUser.displayName,
    email:auth.currentUser.email
  });
  function onLogout(){
    auth.signOut()
    navigate('/')
  }

  function onChange(e) {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  }

  async function onSubmit(){
    try {
      if(auth.currentUser.displayName !== name){
        // update  dispaly name in firebase authentication 
        await updateProfile(auth.currentUser, {
          displayName:name,
        });
        // update name in the fire store
        const docRef = doc(db , "users", auth.currentUser.uid)
        await updateDoc(docRef , {
          name,
        });

      }
      toast.success("Profile Updated")
    } catch (error) {
      toast.error("Couldn't update  the profile details")
    }
  }
  const {name , email } =formData;
  return (
    <>
      <section className="max-w-6xl mx-auto flex justify-center items-center flex-col">
        <h1 className="text-3xl text-center mt-6  font-bold">My Profile</h1>

        <div className="w-full md:w-[50%] mt-6 px-3">
          <form>
            
            <input
              type="text"
              id="name"
              value={name}
              disabled={!changeDetail}
              onChange={onChange}
              className={`mb-6 w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded transition ease-in-out ${
                changeDetail && "bg-red-200 focus:bg-red-200"
              }`}
            />

            {/* Email Input */}

            <input
              type="email"
              id="email"
              value={email}
              disabled
              className="mb-6 w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded transition ease-in-out"
            />

            <div className="flex justify-between whitespace-nowrap mb-6 text-sm sm:text-lg">
              <p className="flex items-center">Do you want to change your name?
                <span onClick={() => {
                    changeDetail && onSubmit();
                    setChangeDetail((prevState) => !prevState);
                  }}
                  className="text-red-500 hover:text-red-700 cursor-pointer ml-1 transition ease-in-out duration-200">
                  {changeDetail ? "Apply change" : "Edit"}</span>
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
