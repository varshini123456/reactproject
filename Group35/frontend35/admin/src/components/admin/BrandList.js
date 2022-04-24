import React from 'react'

import {
  List,
  Datagrid,
  TextField,
  EditButton,
  DeleteButton,
} from 'react-admin'


// displaying the list of brand
const BrandList = (props) => {
    console.log(props);
    
  return (
    <List {...props}>
      <Datagrid>
        <TextField source='id' />
        <TextField source='Name' />
        <TextField source='Category' />
        <EditButton basePath='/brands' />
        <DeleteButton basePath='/brands' />
      </Datagrid>
    </List>
  )
}

export default BrandList
