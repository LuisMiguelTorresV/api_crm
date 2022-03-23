import React from 'react'

const Alerta = ({children}) => {
return (
    <div className='bg-red-700 uppercase rounded-xl
        text-center p-3 text-white font-bold mt-2' >
        {children}
    </div>
)
}

export default Alerta