import React, {useReducer} from "react";
import alertaContext from "./alertaContext";
import alertaReducer from './alertaReducer';

import {

} from '../../types/index';


const AlertaState = ({children}) => {



    return(
        <alertaContext.Provider
            value={{
                
            }}
        >
            {children}
        </alertaContext.Provider>
    );
}


export default AlertaState;