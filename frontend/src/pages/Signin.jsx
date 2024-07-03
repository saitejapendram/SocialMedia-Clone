import { ButtonBox } from "../components/ButtonBox"
import { Heading } from "../components/Heading"
import { InputBox } from "../components/InputBox"
import { SubHeading } from "../components/SubHeading"
import { WarningBox } from "../components/WarningBox"

export const Signin = () => {

    const handleSubmit = () => {

    }
    return (
        <div>
            <div>
                <div>
                    <Heading label={"Sign in"}/>
                    <SubHeading label={"Enter your credentials to Sing in"}/>
                    <InputBox label={"Email"} placeholder={"Doncic@gmail.com"}/>
                    <InputBox label={"Password"} placeholder={"12345@123"}/>
                    <ButtonBox label={"Sign in"} onClick={handleSubmit}/>
                    <WarningBox label={"You don't have Account?"} to={"/signin"} buttonText={"Sign up"}/>
                </div>
            </div>
        </div>
    )
}