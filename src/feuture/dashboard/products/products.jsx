import React, { useState } from "react";
import FormPoducts from "./components/modal/fromProducts/formProducts";

const ProductsBoard = () => {
    const [productos, setProductos] = useState(() => {
        const savedProductos = JSON.parse(localStorage.getItem("Productos")) || []
        return savedProductos
    })
    
    
    const InsertData = (data) =>{
        const newProducst = [...productos, data]
        setProductos(newProducst)
        localStorage.setItem("Productos", JSON.stringify(newProducst))
    }

    // Obtener el usuario actual desde localStorage
    const currentUser = JSON.parse(localStorage.getItem("currentUser")) || null;

    // Verificar si el usuario actual es admin (rol "1")
    const isAdmin = currentUser && currentUser.selectedRoles === "1";

    return (
        <>
            <div className="max-w-full p-6 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
                

                <div className="relative overflow-x-auto">
                <div className="p-4">
                    {isAdmin && <FormPoducts InsertData={InsertData}/>}    
                </div>
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="px-6 py-3">
                                    #
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Producto
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Precio
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Descuento
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Valor total del producto
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Tipo de producto
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {productos.map((e,i)=>(
                                <tr key={i} scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    <td className="px-6 py-4">{i+1}</td>
                                    <td className="px-6 py-4">{e.name}</td>
                                    <td className="px-6 py-4">{e.price}$</td>
                                    <td className="px-6 py-4">{e.descuento == 0 ? "No hay descuento" : e.descuento+"$"}</td>
                                    <td className="px-6 py-4">{e.total}$</td>
                                    <td className="px-6 py-4">{e.guy}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}

export default ProductsBoard;