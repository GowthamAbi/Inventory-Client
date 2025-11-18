import { createContext, useState } from "react";

export const DataContext=createContext()

export const DataProvider=({children})=>{
   const[selectData,setSelectData]= useState([])
   const[fabric,setFabric]= useState([])
    return(
        <DataContext.Provider value={{selectData,setSelectData,fabric,setFabric}}>
                {children}
        </DataContext.Provider>
    );
};




