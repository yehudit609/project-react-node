import { useNavigate } from "react-router-dom"
import Chanut from "../Chanut"

const Bars = () =>{
    const navigate = useNavigate("/Chanut")
    return(
        <>
           
        <Chanut></Chanut>
        </>
    )
}

export default Bars