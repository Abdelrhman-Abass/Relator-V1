// import { useState } from 'react'
import { BrowserRouter as Router ,Routes , Route } from "react-router-dom";
import { Home , ForgotPassword , Offers, Profile , SignIn , SignUp ,CreateListing,EditListing , ListingDetail} from "./pages";
import { Navbar ,PrivateRoute} from "./components";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


function App() {
  // const [count, setCount] = useState(0)

  return (
    <>
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/profile" element={<PrivateRoute />}>
            <Route path="/profile" element={<Profile />} />
        </Route>
        <Route path="/create-listing" element={<PrivateRoute />}>
            <Route path="/create-listing" element={<CreateListing />}/>
        </Route>
        <Route path="/edit-listing" element={<PrivateRoute />}>
            <Route path="/edit-listing/:listingId" element={<EditListing />}/>
        </Route>
        
        <Route path="/signing" element={<SignIn />}/>
        <Route path="/offers" element={<Offers />}/>
        <Route path="/category/:categoryName/:listingID" element={<ListingDetail />}/>
        <Route path="/forgot-password" element={<ForgotPassword />}/>
        <Route path="/sighup" element={<SignUp />}/>     
        
      </Routes>
    </Router>
    <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </>
  )
}

export default App
