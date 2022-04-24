import React from 'react'

import {
  List,
  Datagrid,
  TextField,
  EditButton,
  DeleteButton,
} from 'react-admin'


// displaying the list of orders
const OrdersList = (props) => {
    console.log(props);
    
  return (
    <List {...props}>
      <Datagrid>
        <TextField source='id' />
        <TextField source='sellername' />
        <TextField source='productname' />
        <TextField source='productbrand' />
        <TextField source='productprice' />
        <TextField source='cid' />
        <TextField source='productId' />
        <TextField source='cartQuantity' />
        <TextField source='sellername' />
        <DeleteButton basePath='/orders' />
      </Datagrid>
    </List>
  )
}

export default OrdersList
