import React from 'react'
import { Create, SimpleForm, TextInput, ReferenceInput,SelectInput,required,AutocompleteInput} from 'react-admin'

// used for creating a brand

const BrandCreate = (props) => {
  return (
    <Create title='Create a Brand' {...props}>
      <SimpleForm>
        <TextInput source='Name' validate={[required()]}/>
        <ReferenceInput label="Categoy" source="Category" reference="categories" validate={[required()]}>
        <SelectInput optionText="Name" />
        </ReferenceInput>
        
      </SimpleForm>
    </Create>
  )
}

export default BrandCreate
