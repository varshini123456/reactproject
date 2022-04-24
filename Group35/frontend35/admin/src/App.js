import React from 'react'
import { Admin, Resource } from 'react-admin'
import restProvider from 'ra-data-simple-rest'
import CategoryList from './components/admin/CategoryList'
import CategoryCreate from './components/admin/CategoryCreate'
import CategoryEdit from './components/admin/CategoryEdit';
import UserList from './components/admin/UserList'
import UserCreate from './components/admin/UserCreate'
import UserEdit from './components/admin/UserEdit';
import BrandList from './components/admin/BrandList';
import BrandCreate from './components/admin/BrandCreate';
import BrandEdit from './components/admin/BrandEdit';
import SellerList from './components/admin/SellerList';
import SellerCreate from './components/admin/SellerCreate';
import SellerEdit from './components/admin/SellerEdit';
import OrdersList from './components/admin/OrdersList'
function App() {
  return (
    //React admin Component which runs on the localhost:3001  
    // Resourse is component for accessing each Model
    // parameters for Resourse list - Component for listing items the of particular model
    //create- Component for creating the object for a particul model
    //edit- Component for edting the object for a particul model
    <Admin dataProvider={restProvider('http://localhost:3001')}>
        
         <Resource
        name='categories'
        list={CategoryList}
        create={CategoryCreate}
        edit={CategoryEdit}
      />
      <Resource
        name='brands'
        list={BrandList}
        create={BrandCreate}
        edit={BrandEdit}
      />
      <Resource
        name='users'
        list={UserList}
        create={UserCreate}
        edit={UserEdit}
      />
      <Resource
        name="sellers"
        list={SellerList}
        create={SellerCreate}
        edit={SellerEdit}
      />
      <Resource
        name="orders"
        list={OrdersList}
      />
    </Admin>
   
  );
}

export default App;
