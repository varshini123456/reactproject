import React from 'react'
import { Create, SimpleForm, TextInput } from 'react-admin'

// Creating a seller by taking in the required fields

const SellerCreate = (props) => {
  return (
    <Create title='Create a Seller' {...props}>
      <SimpleForm>
        <TextInput source='sellername' />
        <TextInput source="gst" />
        <TextInput source='email' />
        <TextInput source='password' />
      </SimpleForm>
    </Create>
  )
}

export default SellerCreate
