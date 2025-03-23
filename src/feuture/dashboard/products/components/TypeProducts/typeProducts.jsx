import React, { useState } from "react";
import FormTypeProducts from "../modal/formTypeProducts/fromTypeProducts";

const TypeProducts = () => {
    const [guy, setGuy] = useState(()=>{
        const savedGuy = JSON.parse(localStorage.getItem("TipoProductos")) || []
        return savedGuy
    })
    
    const InsertData = (data) =>{
        const newGuy = [...guy, data]
        setGuy(newGuy)
        localStorage.setItem("TipoProductos", JSON.stringify(newGuy))
    }

    // Obtener el usuario actual desde localStorage
    const currentUser = JSON.parse(localStorage.getItem("currentUser")) || null;

    // Verificar si el usuario actual es admin (rol "1")
    const isAdmin = currentUser && currentUser.selectedRoles === "1";
    return(
        <>
            <div className="max-w-full p-6 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
                

                <div className="relative overflow-x-auto">
                <div className="p-4">
                    {isAdmin && <FormTypeProducts InsertData={InsertData} guy={guy} />}
                </div>
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="px-6 py-3">
                                    #
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Tipo de producto
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {guy.map((e,i)=>(
                                <tr key={i} scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    <td className="px-6 py-4">{i+1}</td>
                                    <td className="px-6 py-4">{e.name}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}

export default TypeProducts;