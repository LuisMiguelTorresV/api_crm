import { useState } from 'react'
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Layout from './layout/Layout'
import Inicio from './paginas/Inicio'
import NuevoCliente from './paginas/NuevoCliente'
import EditarClientes from './paginas/EditarClientes'
import VerCliente from './paginas/VerCliente'

function App() {


  return (
    <BrowserRouter>
      <Routes>

        <Route path='/cliente' element={<Layout />}>
          <Route index element={<Inicio />}/>
          <Route path='nuevo' element={<NuevoCliente />}/>
          <Route path='editar/:id' element={<EditarClientes />}/>
          <Route path=':id' element={<VerCliente />}/>
        </Route>

      </Routes>
    </BrowserRouter>
  )
}

export default App
