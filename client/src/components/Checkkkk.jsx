import { Divider } from "primereact/divider"
import BasketDesign from "./BasketDesign"
import HomePage from "./HomePage"
import { Button } from "primereact/button"
import { InputText } from "primereact/inputtext"
import PaymentRightSide from "./PaymentRightSide"
import PaymentLeftSide from "./PaymentLeftSide"


const Checkkkk = () => {
    return (
        <>

            <div className="card">
                
                <div   className="flex flex-column md:flex-row">
                    <div className="w-full md:w-5 flex flex-column align-items-center justify-content-center gap-3 py-5">
                        <div style={{flexDirection: "column"}} className="flex flex-wrap justify-content-center align-items-center gap-2">
                            <span>פרטי ההזמנה</span><br/>
                            <PaymentLeftSide></PaymentLeftSide> 
                        </div>

                    </div>
                    {/* <div className="w-full md:w-2"> */}
                        <Divider layout="vertical" className="hidden md:flex"></Divider>
                 {/* </div> */}
                 
                    <div style={{flexDirection: "column"}} className="w-full md:w-5 flex align-items-center justify-content-center py-5" >
                        <span>פרטי לקוח</span><br/>
                        <PaymentRightSide ></PaymentRightSide>
                    </div>
                </div>
            </div>

        </>)
}

export default Checkkkk