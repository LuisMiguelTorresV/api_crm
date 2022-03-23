import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import Formulario from '../components/Formulario'

const EditarClientes = () => {
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
    <>
        <h1 className='font-black text-4xl text-blue-500'>Editar Cliente</h1>
        <p className='mt-3'>Utiliza el formulario para editar el cliente: </p>
        {cliente?.nombre ?(
        <Formulario
            cliente={cliente}
            cargando={cargando}
        />
        ): <p className="uppercase text-center text-bold text-4xl mt-40">Cliente ID no valido</p>}
    </>
)
}

export default EditarClientes