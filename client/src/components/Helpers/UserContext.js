import { createContext } from "react";

const userContext = createContext({
    user : {
        id: null,
        name:null,
        email : null,
        password : null
    },
});

export default userContext; 