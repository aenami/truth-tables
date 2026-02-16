import { FiActivity  } from "react-icons/fi"
import { NavItems } from "./NavegationItems"
import "../styles/navbar.css"

export function Navbar(){
    return <div id="navBar">
        <div className="itemsContainer">
            <FiActivity size={35}/>
            <h1>Simulador Tabla de verdad</h1>
        </div>
        
        <div className="itemsContainer"> 
            <NavItems title="Home"/>
            <NavItems title="About"/>
        </div>
    </div>
}