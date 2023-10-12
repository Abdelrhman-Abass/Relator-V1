// import { useState } from 'react'
import { BrowserRouter as Router ,Routes , Route } from "react-router-dom";
import { Home , ForgotPassword , Offers, Profile , SignIn , SignUp } from "./pages";


function App() {
  // const [count, setCount] = useState(0)

  return (
    <>
    <Router>
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/profile" element={<Profile />}/>
        <Route path="/signIn" element={<SignIn />}/>
        <Route path="/offers" element={<Offers />}/>
        <Route path="/forgotPassword" element={<ForgotPassword />}/>
        <Route path="/signUp" element={<SignUp />}/>
      </Routes>
    </Router>
    </>
  )
}

export default App
