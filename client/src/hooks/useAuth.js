import {useSelector} from "react-redux"
import { jwtDecode } from "jwt-decode"

const useAuth = ()=>{
    
    const token = localStorage.getItem("token")//useSelector(selectToken)
    let isAdmin = false
    let isUser = false
    if(token){
        const userDecode = jwtDecode(token)
        console.log('userDecode',userDecode);
        const {_id,name,roles,userName,email,phone,address} = userDecode
        isAdmin = roles === "Admin"
        isUser = roles === "User"
        return {_id,userName,name,email,phone,isAdmin,isUser,address}
    }
    return {_id:"",userName:"",name:"",email:"",roles:"",address:"",active:false,isAdmin,isUser}

}
export default useAuth 