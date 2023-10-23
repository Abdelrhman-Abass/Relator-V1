import { useEffect, useState } from "react"
import {getAuth, updateProfile} from 'firebase/auth'
import { Link, useNavigate } from "react-router-dom"
import { toast } from "react-toastify";
import {FcHome} from 'react-icons/fc'
import {Listing} from '../components'
import { collection, doc, query, updateDoc, where,orderBy, getDocs } from "firebase/firestore";
import { db } from "../firebase.config";

const Profile = () => {
  const navigate = useNavigate();
  const [changeDetail , setChangeDetail] = useState(false);
  const [listings, setListings] = useState(null);
  const [loading, setLoading] = useState(true);
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

  useEffect(()=>{
    async function fetchUserListings(){
      const listingRef = collection(db , "listings");
      const querySnapshot = query(listingRef ,where("userRef","==" , auth.currentUser.uid),
      orderBy("timestamp","desc")
      );
      const querySnap = await getDocs(querySnapshot)
      let listings = [];
      querySnap.forEach((doc)=>{
        return listings.push({
          id:doc.id,
          data:doc.data(),
        });
      });
      setListings(listings)
      setLoading(false)

    }
    fetchUserListings();
  },[auth.currentUser.uid])
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

          <button type="submit" className="w-full bg-blue-600 text-white uppercase px-7 py-3 text-sm font-medium rounded shadow-md hover:bg-blue-800 transition ease-in-out duration-150 hover:shadow-lg active:bg-blue-900">
            <Link to='/create-listing' className="flex justify-center items-center">
              <FcHome className="mr-2 text-3xl bg-red-200 rounded-full p-1 border-2"/>
              Sell or Rent your Home
            </Link> 
          
          </button>
        </div>
      </section>

      <div>
        {!loading && listings.length >0 && (
          <>
            <h2 className="text-2xl text-center font-semibold ">My Listings</h2>
            <ul className="sm:grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
            {listings.map((listing) => (
              // console.log(listing)
                <Listing
                  key={listing.id}
                  id={listing.id}
                  listing={listing.data}
                  // onDelete={() => onDelete(listing.id)}
                  // onEdit={() => onEdit(listing.id)}
                />
              ))}
            </ul>
          </>
        )}
      </div>
    </>
  )
}

export default Profile
