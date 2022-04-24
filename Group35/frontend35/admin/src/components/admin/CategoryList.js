import React from 'react'
import {
  List,
  Datagrid,
  TextField,
  DateField,
  EditButton,
  DeleteButton,
} from 'react-admin'
 
// displaying category list
const CategoryList = (props) => {
  return (
    <List {...props}>
      <Datagrid>
        <TextField source='id' />
        <TextField source='Name' />
        <EditButton basePath='/categories' />
        <DeleteButton basePath='/categories' />
      </Datagrid>
    </List>
  )
}

export default CategoryList
