import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { GetApi } from './service/app.service'

export const ConsumoApp = () => {
    const [dataUsers, setDataUsers] = useState([])
    const [error, setError] = useState(false)
    const navegate = useNavigate()

    useEffect(() => {

        const Data = async () => {
            const response = await GetApi()
            if (!response?.success) {
                setError(true)
                console.log("Datos de los usuarios:", response.message.data.results);
            } else {
                setDataUsers(response.message.data.results)
                setError(false)
            }

        }
        Data()
    }, [])
    

    const RotasViewApp = (id) => {
        navegate("/dashboard/APPS/" + id)
    }

    return (
        <>
            <div className="max-w-full p-6 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
                {error ?<div className="flex items-center p-4 mb-4 text-sm text-red-800 border border-red-300 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400 dark:border-red-800" role="alert">
                    <svg className="shrink-0 inline w-4 h-4 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                    </svg>
                    <span className="sr-only">Info</span>
                    <div>
                        <span className="font-medium">Error!</span> No se encontro ningun usuario.
                    </div>
                </div>: ""}

                <div className="relative overflow-x-auto">
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="px-6 py-3">
                                    #
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Nombre
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Estado
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Especie
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Genero
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Imagen
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Botones
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {dataUsers.map((e, i) => (
                                <tr key={i} scope="row" className="g-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
                                    <td className="px-6 py-4">{i + 1} </td>
                                    <td className="px-6 py-4">{e.name} </td>
                                    <td className="px-6 py-4">{e.status === "Alive" ? (<div class="flex items-center"><div class="h-2.5 w-2.5 rounded-full bg-green-500 me-2"></div>{e.status}</div>) : (<div class="flex items-center">{e.status === "Dead" ? (<><div class="h-2.5 w-2.5 rounded-full bg-yellow-500 me-2"></div>Dead</>) : (<><div class="h-2.5 w-2.5 rounded-full bg-red-500 me-2"></div>Not found</>)}</div>)} </td>
                                    <td className="px-6 py-4">{e.species} </td>
                                    <td className="px-6 py-4">{e.gender} </td>
                                    <td className="px-6 py-4">
                                        <div className='p-3'>
                                            <img className="rounded-full w-16 h-16" src={e.image} alt="image description" />
                                        </div>
                                    </td>
                                    <td className="px-6 py-4"><button type="button" onClick={() => RotasViewApp(e.id)} className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Ver</button></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}
