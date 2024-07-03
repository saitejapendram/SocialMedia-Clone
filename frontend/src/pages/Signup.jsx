import { ButtonBox } from "../components/ButtonBox"
import { Heading } from "../components/Heading"
import { InputBox } from "../components/InputBox"
import { SubHeading } from "../components/SubHeading"
import { WarningBox } from "../components/WarningBox"

export const Signup = () => {

    const handleSubmit = () => {
        
    }
    return (<div>
        <div>
            <div>
                <Heading label={"Sign up"}/>
                <SubHeading label={"Enter your credentials to sign up"}/>
                <InputBox label={"Email"} placeholder={"doncic@gmail.com"}/>
                <InputBox label={"Username"} placeholder={"Doncic"}/>
                <InputBox label={"Password"} placeholder={"12345@123"}/>
                <InputBox label={"Occupation"} placeholder={"Developer"}/>
                <InputBox label={"Location"} placeholder={"Chennai"}/>
                <ButtonBox label={"Sign up"} onClick={handleSubmit}/>
                <WarningBox label={"Already you have Account?"} to={"/signin"} buttonText={"Sign in"}/>
            </div>
        </div>
    </div>
        
    )
}