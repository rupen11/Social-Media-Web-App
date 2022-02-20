import axios from "axios";
import { useState } from "react";
import SocialContext from "./socialContext";

const SocialState = (props) => {

    const getUserData = async () => {
        try {
            const token = localStorage.getItem("AuthToken");
            if (!token) {
                return false;
            }
            const res = await axios.get("/users/fetchUser/" + token);
            if (res.status === 200) {
                return res;
            }
        }
        catch (error) {
            console.log(error);
        }
    }

    return (
        <SocialContext.Provider value={{ getUserData }}>
            {props.children}
        </SocialContext.Provider>
    )
}

export default SocialState