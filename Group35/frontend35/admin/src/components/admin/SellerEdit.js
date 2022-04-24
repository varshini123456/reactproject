import React from 'react'
import { Edit, SimpleForm, TextInput } from 'react-admin'


// Giving edit option to seller
const SellerEdit = (props) => {
  return (
    <Edit title='Edit Seller' {...props}>
      <SimpleForm>
        <TextInput disabled source='id' />
        <TextInput source='sellername' />
        <TextInput source='email' />
      </SimpleForm>
    </Edit>
  )
}

export default SellerEdit
