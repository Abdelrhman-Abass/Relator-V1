// import { useState } from 'react'
import { BrowserRouter as Router ,Routes , Route } from "react-router-dom";
import { Home , ForgotPassword , Offers, Profile , SignIn , SignUp } from "./pages";
import { Navbar } from "./components";

function App() {
  // const [count, setCount] = useState(0)

  return (
    <>
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/profile" element={<Profile />}/>
        <Route path="/signing" element={<SignIn />}/>
        <Route path="/offers" element={<Offers />}/>
        <Route path="/forgot-password" element={<ForgotPassword />}/>
        <Route path="/sighup" element={<SignUp />}/>
      </Routes>
    </Router>
    </>
  )
}

export default App
