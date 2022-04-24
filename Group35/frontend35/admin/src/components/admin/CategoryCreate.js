import React from 'react'
import { Create, SimpleForm, TextInput, DateInput } from 'react-admin'

// creating a new category

const CategoryCreate = (props) => {
  return (
    <Create title='Create a Category' {...props}>
      <SimpleForm>
        <TextInput source='Name' />
        
      </SimpleForm>
    </Create>
  )
}

export default CategoryCreate
