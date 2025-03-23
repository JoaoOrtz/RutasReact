import React, { useState } from "react";
import { FormUsers } from "./components/modal/formUsers/fromUsers";

const UsersBoard = () => {
    const [users, setUsers] = useState(()=>{
        const savedUsers = JSON.parse(localStorage.getItem("Usuarios"))
        return savedUsers
    })
    const InsertData = (data) =>{
        const newUsers = [...users, data]
        setUsers(newUsers)
        localStorage.setItem("Usuarios", JSON.stringify(newUsers))
    }
    const getUsers = JSON.parse(localStorage.getItem("Usuarios"))
    
    return (
        <>
            <div className="max-w-full p-6 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
                <div className="relative overflow-x-auto">
                <div className="p-4">
                    <FormUsers InsertData={InsertData} users={users} />    
                </div>
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="px-6 py-3">
                                    #
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Documento
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Nombre
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Apellido
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Telefono
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Correo
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Rol
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Estado
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {getUsers.map((e, i)=>(
                                <tr key={i} scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    <td className="px-6 py-4">{i+1}</td>
                                    <td className="px-6 py-4">{e.document}</td>
                                    <td className="px-6 py-4">{e.name}</td>
                                    <td className="px-6 py-4">{e.lastName}</td>
                                    <td className="px-6 py-4">{e.tel}</td>
                                    <td className="px-6 py-4">{e.email}</td>
                                    <td className="px-6 py-4">{e.selectedRoles === "1" ? (<span className="bg-green-100 text-green-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-sm dark:bg-green-900 dark:text-green-300">Admin</span>):(<span className="bg-blue-100 text-blue-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-sm dark:bg-blue-900 dark:text-blue-300">Usuario</span>)}</td>
                                    <td className="px-6 py-4">{e.state === "true" ? (<span className="bg-green-100 text-green-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-sm dark:bg-green-900 dark:text-green-300">Activo</span>):(<span className="bg-red-100 text-red-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-sm dark:bg-red-900 dark:text-red-300">Inactico</span>)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}

export default UsersBoard;