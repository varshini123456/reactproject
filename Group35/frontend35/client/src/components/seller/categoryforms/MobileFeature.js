import React from 'react'
import { useState, useEffect } from 'react'

import { Autocomplete } from '@mui/material'
import { TextField } from '@material-ui/core'

export default function MobileFeature() {
    //For storing the features of category information based on data from url and updating in {feature: []}
    const [features, setFeatures] = useState({
        feature: []
    })
    const cid ="61cf2fd30236a97a7bc3c4ca" // category id for Mobile
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
                    id="mobileram"
                    name="ram"
                    options={f.RAM} // contains the list of values [4,6,8,16] which displays as options
                   
                    renderInput={(params) => <TextField {...params} label="RAM" name='ram'/>}
                    />
                    <Autocomplete
                    disablePortal
                    id="mobilestorage"
                    name="storage"
                    options={f.STORAGE} // contains the list of values of storage which displays as options
                   
                    renderInput={(params) => <TextField {...params} label="Storage" name="storage"/>}
                    />
                    <Autocomplete
                    disablePortal
                    id="mobilecolor"
                    name="color"
                    options={f.COLOR} // contains the list of values of colour which displays as options
                    
                    renderInput={(params) => <TextField {...params} label="Colour" name="color"/>}
                    />
                    </div>
                    
               
                )
            }
           
        </div>
    )
}
