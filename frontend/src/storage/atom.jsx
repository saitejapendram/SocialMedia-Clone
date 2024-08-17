import { atom, selector, } from "recoil"
import axios from "axios";


export const signinAtom = atom({
    key : "signinAtom",
    default : "signout"
})

export const userIdF = atom({
    key : "userIdF",
    default : ' '
})