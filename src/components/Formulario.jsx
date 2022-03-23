import React from 'react'
import { Formik, Form, Field } from 'formik'
import { useNavigate } from 'react-router-dom'
import * as Yup from "yup"
import Alerta from './Alerta'
import Spinner from "../components/Spinner"

const Formulario = ({cliente,cargando}) => {

    const navigate = useNavigate()

    const nuevoClienteSchema = Yup.object().shape({
        nombre: Yup.string().required("El nombre del cliente es obligatorio").
            min(3,"El nombre es muy corto"),
        empresa: Yup.string().required("El nombre de la empresa es necesario"),
        email: Yup.string().required("El Correo es obligatorio").email("Correo no valido"),
        telefono: Yup.number().typeError("Numero no valido").positive("Numero invalido").
            integer("Numero invalido"),
    })

    const handleSubmit= async (valores)=>{
        try{
            let respuesta
            if(cliente.id){
                const url = `http://localhost:4000/clientes/${cliente.id}`

                respuesta = await fetch(url,{
                    method:"PUT",
                    body: JSON.stringify(valores),
                    headers: {
                        "Content-Type": "application/json"
                    }
                })
            }else{
                //Nuevo Registro
            const url = "http://localhost:4000/clientes"

            respuesta = await fetch(url,{
                method:"POST",
                body: JSON.stringify(valores),
                headers: {
                    "Content-Type": "application/json"
                }
            })
        }
        console.log(respuesta)
        const resultado = await respuesta.json()
        console.log(resultado)
        navigate("/cliente")
        }catch(error){
            console.log(error)
        }
    }

return (
    cargando?<Spinner/>:(
    <div className='bg-blue-300 mt-10 px-5 py-10 rounded-xl shadow-2xl md:w-3/4 mx-auto'>
        <h1 className='text-gray-600 font-bold text-xl text-center uppercase'>
            {cliente?.nombre?"Editar Cliente":"Agregar Cliente"}
        </h1>

        <Formik
            initialValues={{
                nombre: cliente?.nombre ??"",
                empresa: cliente?.empresa??"",
                email: cliente?.email??"",
                telefono:cliente?.telefono??"",
                notas:cliente?.notas??""
            }}
            enableReinitialize={true}
            onSubmit={async (values,{resetForm})=>{
                await handleSubmit(values)
                resetForm()
            }}
            validationSchema={nuevoClienteSchema}
        >
            {({errors})=>{
                //console.log(data)
                return(
            <Form className='mt-10'>
                <div className='mb-4'>
                    <label
                        className='text-gray-800'
                        htmlFor='nombre'
                        >Nombre: </label>
                    <Field
                        id="nombre"
                        type="text"
                        className="mt-2 block w-full p-3 bg-gray-50 rounded-xl"
                        placeholder="Nombre del cliente"
                        name="nombre"
                    />
                    {errors.nombre ? (
                        <Alerta>{errors.nombre}</Alerta>
                    ):null}
                </div>
                <div className='mb-4'>
                    <label
                        className='text-gray-800'
                        htmlFor='empresa'
                        >Empresa: </label>
                    <Field
                        id="empresa"
                        type="text"
                        className="mt-2 block w-full p-3 bg-gray-50 rounded-xl"
                        placeholder="Empresa del cliente"
                        name="empresa"
                    />
                    {errors.empresa ? (
                        <Alerta>{errors.empresa}</Alerta>
                    ):null}
                </div>
                <div className='mb-4'>
                    <label
                        className='text-gray-800'
                        htmlFor='email'
                        >Correo: </label>
                    <Field
                        id="email"
                        type="email"
                        className="mt-2 block w-full p-3 bg-gray-50 rounded-xl"
                        placeholder="Correo del cliente"
                        name="email"
                    />
                    {errors.email ? (
                        <Alerta>{errors.email}</Alerta>
                    ):null}
                </div>
                <div className='mb-4'>
                    <label
                        className='text-gray-800'
                        htmlFor='telefono'
                        >Telefono: </label>
                    <Field
                        id="telefono"
                        type="tel"
                        className="mt-2 block w-full p-3 bg-gray-50 rounded-xl"
                        placeholder="Telefono del cliente"
                        name="telefono"
                    />
                    {errors.telefono ? (
                        <Alerta>{errors.telefono}</Alerta>
                    ):null}
                </div>
                <div className='mb-4'>
                    <label
                        className='text-gray-800'
                        htmlFor='notas'
                        >Notas: </label>
                    <Field
                        as="textarea"
                        id="notas"
                        type="text"
                        className="mt-2 block w-full p-3 bg-gray-50 rounded-2xl"
                        placeholder="Notas del cliente"
                        name="notas"
                    />
                </div>
                <input
                    type="submit"
                    value={cliente?.nombre ? "Guardar Cambios":"Añadir Cliente"}
                    className='mt-4 p-5 w-full bg-blue-900 rounded-2xl uppercase text-white text-lg'
                />
            </Form>
            )}}
        </Formik>
    </div>
))
}

Formulario.defaultProps={
    cliente:{},
    cargando:false
}

export default Formulario