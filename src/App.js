import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';
import SignUp from './components/signUp';
import Login from './components/login';
import CreateProduct from './components/createProduct';
import CreateFeatures from './components/createFeatures';
import DisplayProducts from './components/displayProducts';
import DisplayUserProducts from './components/DisplayUserProducts';
import Success from './components/Success';
import Cancel from './components/Cancel';
import Unauthorized from './components/Unauthorized';


function App() {

  const [userRole, setUserRole] = useState('');

  useEffect(() => {
    const getUserRole = async () => {
      const response = await fetch("http://localhost:4000/v1/auth/getRole", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: localStorage.getItem("email") || "" }),
      });
      const data = await response.json();
      if(response.status === 200){
        setUserRole(data);
      }
      else if(response.status === 400){
        setUserRole('');
      }
      console.log(data);
    }
    getUserRole();
  }, []);


  return (
    <div>
      <BrowserRouter>
        <Routes>
            <Route path="/signup" element={<SignUp />}/>
            <Route path="/login" element={<Login />}/>

            {userRole === "admin"?(
            <Route path="/createProduct" element={<CreateProduct/>}/>
            ):(
              <Route path="/createProduct" element={<Unauthorized/>}/>
            )}

            {userRole === "admin"?(
            <Route path="/createFeatures" element={<CreateFeatures/>}/>
            ):(
            <Route path="/createFeatures" element={<Unauthorized/>}/>
            )}

            {userRole === "admin"?(
            <Route path="/displayProducts" element={<DisplayProducts/>}/>
            ):(
              <Route path="/displayProducts" element={<Unauthorized/>}/>
            )}

            <Route path="/displayUserProducts" element={<DisplayUserProducts/>}/>
            <Route path="/success" element={<Success/>}/>
            <Route path="/cancel" element={<Cancel/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
