import Footer from "./Components/footer/Footer";
import Header from "./Components/Header"
import Home from "./Components/Home";
import { Outlet } from "react-router-dom";

function App() {
  return(
    <>
    <Header/>
    <Outlet/>
    <Footer/>
    </>
    
  );

}

export default App
