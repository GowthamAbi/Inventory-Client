import { createContext, useState } from "react";

export const DataContext=createContext()

export const DataProvider=({children})=>{
   const[selectData,setSelectData]= useState([])
    return(
        <DataContext.Provider value={{selectData,setSelectData}}>
                {children}
        </DataContext.Provider>
    );
};




