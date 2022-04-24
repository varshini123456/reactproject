import React from 'react'
import {
  List,
  Datagrid,
  TextField,
  EmailField,
  EditButton,
  DeleteButton,
} from 'react-admin'


// displaying list of sellers
const SellerList = (props) => {
  return (
    <List {...props}>
      <Datagrid>
        <TextField source='id' />
        <TextField source='sellername' />
        <TextField source='gst'/>
        <EmailField source='email' />
        <EditButton basePath='/sellers' />
        <DeleteButton basePath='/selers' />
      </Datagrid>
    </List>
  )
}

export default SellerList
