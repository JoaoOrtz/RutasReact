import React, { useState } from "react";

const FormProducts = ({ InsertData }) => {
    // Variable y funcion para abrir el modal
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setErro("")
    };

    //Variable del producto
    const [name, setName] = useState("")
    const [price, setPrice] = useState("")
    const [guy, setGuy] = useState("0")
    const [IVA, setIVA] = useState(0.19)
    const [descuento, setDescuento] = useState(0)
    const [total, setTotal] = useState()
    const [isCheckbox, setIsCheckbox] = useState(false)
    const [error, setErro] = useState()

    //Abrir el checkbox
    const handleCheckbox = () => setIsCheckbox(!isCheckbox)
    
    //Calcular descuento
    const PrecioDescuento = () => {
        const descuentoI = parseFloat(price) * (parseFloat(descuento) / 100)
        const ValorDescuento = parseFloat(price) - descuentoI
        return {descuentoI, ValorDescuento}
    }

    //Calculo de IVA
    const PrecioIVA = () => PrecioDescuento().ValorDescuento * IVA 

    //Calcular valor total 
    const ValorTotal = () => PrecioDescuento().ValorDescuento + PrecioIVA()

    //Funcion para guardar el producto
    const Guardar = (e) => {
        e.preventDefault()

        //Validar el formulario antes de guardar
        if (!Validacion()) {
            return
        }
        InsertData({ name, price, guy, descuento: PrecioDescuento().descuentoI, total: ValorTotal() })
        setName("")
        setPrice("")
        setGuy("")
        setDescuento(0)
        setIsCheckbox(false)
        setIsModalOpen(false)
    }

    // Validacion si estan lleno los campos
    const Validacion = () =>{ 
        if (name.trim() === "") {
            setErro("Ingrese un producto")
            return false
        }else if(price.trim() === ""){
            setErro("Ingrese un precio")
            return false
        }else if (guy === "0") {
            setErro("Ingrese un tipo de producto")
            return false
        } else{
            setErro("")
            return true
        }
    }

    const getTypeProducts = JSON.parse(localStorage.getItem("TipoProductos")) || []

    return (
        <>
            {/* Botón para abrir el modal */}
            <button
                onClick={openModal}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
                Ingresar producto
            </button>

            {/* Modal */}
            {isModalOpen  && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
                        <h2 className="text-xl font-bold xl-4">Formulario de Productos</h2>
                        {/* Mensaje de error */}
                        {error && (
                            <div class="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                                <span class="font-medium">Error:</span> {error}.
                            </div>
                        )}
                        <form onSubmit={Guardar}>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">Nombre del Producto</label>
                                <input type="text" id="name" onChange={(e) => setName(e.target.value)} value={name} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="Nombre del Producto" />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="price">Precio</label>
                                <input type="number" id="price" onChange={(e) => setPrice(e.target.value)} value={price} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="Precio" />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="type">Tipo de producto</label>
                                <select id="countries" onChange={(e) => setGuy(e.target.value)} value={guy} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" >
                                    <option key={0} value="0" selected>selecione un tipo de producto</option>
                                    {getTypeProducts.map((e, i) => (
                                        <option key={i + 1} value={e.name}>{e.name}</option>
                                    ))}

                                </select>
                            </div>
                            <div className="flex items-center mb-4">
                                <input id="default-checkbox" checked={isCheckbox} onChange={handleCheckbox} type="checkbox" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                <label for="default-checkbox" class="ms-2 text-sm font-medium ">Descuento</label>
                            </div>
                            {isCheckbox && <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="descuento">Descuento</label>
                                <input type="number" id="descuento" onChange={(e) => setDescuento(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="Descuento" />
                            </div>}
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
};

export default FormProducts;