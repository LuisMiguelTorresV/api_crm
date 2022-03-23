import { useNavigate } from "react-router-dom"

const Cliente = ({cliente,handleEliminar}) => {

const{nombre, empresa, id, email, telefono, notas}= cliente

const navigate = useNavigate()

return (
    <tr className='border hover:bg-blue-400'>
        <td className='p-3'>{nombre}</td>
        <td className='p-3'>
            <p><span className='text-gray-800 uppercase font-bold'>Correo: </span>{email}</p>
            <p><span className='text-gray-800 uppercase font-bold'>Telefono: </span>{telefono}</p>
        </td>
        <td className='p-3'>{empresa}</td>
        <td className='p-3'>
            <button type='button'
                className='bg-green-600 hover:bg-green-800 rounded-lg font-bold uppercase
                p-2 text-white block w-full'
                onClick={()=>navigate(`/cliente/${id}`)}>
                Ver
            </button>
            <button type='button'
                className='bg-blue-600 hover:bg-blue-800 rounded-lg font-bold uppercase
                p-2 mt-1 text-white block w-full'
                onClick={()=>navigate(`/cliente/editar/${id}`)}>
                Editar
            </button>
            <button type='button'
                className='bg-red-600 hover:bg-red-800 rounded-lg font-bold uppercase
                p-2 mt-1 text-white block w-full'
                onClick={()=>handleEliminar(id)}>
                Eliminar
            </button>
        </td>
    </tr>
)
}

export default Cliente