import React from 'react'
import {Route,Routes as RouteDom} from 'react-router-dom'
import Login from './components/Login'
import Register from './components/Register'


function Routes() {
  return (
    <RouteDom>
        <Route path='/' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
    </RouteDom>
  )
}

export default Routes