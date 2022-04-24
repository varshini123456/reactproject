import React from 'react'
import { useState, useEffect } from 'react'

import { Autocomplete } from '@mui/material'
import { TextField } from '@material-ui/core'
export default function LaptopFeatures() {
    //For storing the features of category information based on data from url and updating in {feature: []}
    const [features, setFeatures] = useState({
        feature: []
    })
    const cid ="61cf30c10236a97a7bc3c4cf" // category id for Laptop
    const fetchFeature = ()=>{
        return fetch(`http://localhost:5000/categories/${cid}/features`).then((response)=>
            response.json()
        ).then((data)=>{
            console.log(data)
            setFeatures({
                feature: data
            })
        })
    }
    
    useEffect(()=>{
        fetchFeature()
        
    },[])
    const {feature}=features // obect in feature for dispaying the form 
    return (
        <div>
            {
                feature.map((f)=>
                <div>
                    <Autocomplete
                    disablePortal
                    id="Laptopram"
                    options={f.RAM} // contains the list of values [4,6,8,16] which displays as options
                    sx={{ width: 300 }}
                    renderInput={(params) => <TextField {...params} label="RAM"name="ram"/>}
                    />
                    <Autocomplete
                    disablePortal
                    id="laptopstorage"
                    options={f.STORAGE} // contains the list of values of storage which displays as options
                    sx={{ width: 300 }}
                    renderInput={(params) => <TextField {...params} label="Storage" name='storage'/>}
                    />
                    <Autocomplete
                    disablePortal
                    id="laptopstorage"
                    options={f.COLOR} // contains the list of values of storage which displays as options
                    sx={{ width: 300 }}
                    renderInput={(params) => <TextField {...params} label="color" name='color'/>}
                    />
                    
                    
                </div>
                )
            }
           
        </div>
    )
}
