import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import Spinner from "../components/Spinner"

const VerCliente = () => {
    const [cliente, setCliente]=useState({})

    const [cargando, setCargando]=useState(true)

    const {id} =useParams()

    useEffect(()=>{
        const obtenerClienteAPI =async()=>{
            try{
                const url =`http://localhost:4000/clientes/${id}`
                const respuesta = await fetch(url)
                const resultado = await respuesta.json()
                setCliente(resultado)
            }catch (error) {
                console.log(error)
            }
            setCargando(!cargando)
        }
        obtenerClienteAPI()
    },[])

return (

    cargando? <Spinner/>:
    Object.keys(cliente).length === 0 ?
        <p className="font-bold text-5xl text-center mt-40">No hay Resultados</p>:(

    <div>
        <h1 className='font-black text-5xl text-blue-500'>Ver Cliente {cliente.nombre}</h1>
        <p className="mt-3 font-bold text-3xl">Informacion del Cliente </p>
        <p className="text-2xl text-gray-500 mt-4">
            <span className="uppercase font-bold text-gray-900">Cliente: </span>
            {cliente.nombre}
        </p>
        <p className="text-2xl text-gray-500 mt-4">
            <span className="uppercase font-bold text-gray-900">Empresa: </span>
            {cliente.empresa}
        </p>
        {cliente.telefono &&(
            <p className="text-2xl text-gray-500 mt-4">
            <span className="uppercase font-bold text-gray-900">Telefono: </span>
            {cliente.telefono}
        </p>
        )}
        <p className="text-2xl text-gray-500 mt-4">
            <span className="uppercase font-bold text-gray-900">Correo: </span>
            {cliente.email}
        </p>
        {cliente.notas && (
        <p className="text-2xl text-gray-500 mt-4">
            <span className="uppercase font-bold text-gray-900">Notas: </span>
            {cliente.notas}
        </p>
        )}
    </div>
))
}

export default VerCliente