import React from 'react'
import { Edit, SimpleForm, TextInput, DateInput } from 'react-admin'

// Editing the categories

const CategoryEdit = (props) => {
  return (
    <Edit title='Edit Category' {...props}>
      <SimpleForm>
        <TextInput disabled source='id' />
        <TextInput source='Name' />
      </SimpleForm>
    </Edit>
  )
}

export default CategoryEdit
