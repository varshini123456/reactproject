import React from 'react'
import { Edit, SimpleForm, TextInput } from 'react-admin'


// Editing the brand name
const BrandEdit = (props) => {
    
  return (
    <Edit title='Edit Brand' {...props}>
      <SimpleForm>
        <TextInput disabled source='id' />
        <TextInput source='Name' />
      </SimpleForm>
    </Edit>
  )
}

export default BrandEdit
