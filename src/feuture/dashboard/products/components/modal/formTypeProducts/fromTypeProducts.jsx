import React, { useState } from "react";

const FormTypeProducts = ({ InsertData, guy }) => {
    // Variable y funcion para abrir el modal
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    //Variable del producto
    const [name, setName] = useState()
    const [error, setError] = useState()

    //Funcion para guardar el producto
    const Guardar = (e) => {
        e.preventDefault()

        if (!validacion()) {
            return
        }

        InsertData({ name })
        setName("")
        setIsModalOpen(false)
    }

    const validacion = () => {
        const validacionName = guy.some((e)=>e.name === name)
        
        if (validacionName) {
            setError("No puede ver dos tipos de productos iguales")
            return false
        }else{
            setError("")
            return true
        }
    }

    return (
        <>
            {/* Botón para abrir el modal */}
            <button onClick={openModal} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Ingreso de tipo de productos</button>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
                        <h2 className="text-xl font-bold xl-4 p-4">Formulario de tipo de productos</h2>
                        {error && (
                            <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                                <span className="font-medium">Error:</span> {error}.
                            </div>
                        )}
                        <form onSubmit={Guardar}>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">Tipo de productos</label>
                                <input type="text" id="name" onChange={(e) => setName(e.target.value)} onBlur={validacion} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="Nombre del Producto" required />
                            </div>
                            <div className="flex justify-end">
                                <button type="button" onClick={closeModal} className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 mr-2">Cerrar</button>
                                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Guardar</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
}

export default FormTypeProducts;
