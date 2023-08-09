import { createContext ,useState, useEffect} from "react";

import {getCategoriesAndDocument} from '../utils/firebase/firebase.utils';

//import SHOP_DATA from '../shop-data.js';

export const CategoriesContext = createContext({
    categoriesMap: {},
})

export const CategoriesProvider = ({children})=>{

    const [categoriesMap,setcategoriesMap] = useState({});
    // adding data to firebase but this is a backend process
    // useEffect(()=>{
    //     addCollectionAndDocument('categories',SHOP_DATA);
    // },[])

    useEffect(()=>{
        const getCategoriesMap = async()=>{
            const categoryMap = await getCategoriesAndDocument();
            console.log(categoryMap);
            setcategoriesMap(categoryMap);
        };
        getCategoriesMap();
    },[]);

    const value = {categoriesMap};
    return (
        <CategoriesContext.Provider value={value}>{children}</CategoriesContext.Provider>
    )
}