import axios from "axios";
import React from "react";
import { useParams } from "react-router-dom";

export default function StorageTypes() {
    
    const {typeId} = useParams();

    //function, that fetches listings based on the storage type
    const fetchListings = async(typeId) => {
        const response = await axios.get("url");
        const data = response.data;
        console.log(data);
    }
    
    return "haha";
}