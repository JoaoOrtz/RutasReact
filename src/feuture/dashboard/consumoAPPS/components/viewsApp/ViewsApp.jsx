import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { GetOneApi } from '../../service/app.service'

export const ViewsApp = () => {

    const { id } = useParams()
    const navegate = useNavigate()
    const [dataUser, setDataUser] = useState()
    const [error, setError] = useState()

    useEffect(() => {
        const Data = async () => {
            const response = await GetOneApi(id)

            if (!response?.success) {
                setError(true)
                console.log("Datos de los usuarios:", response.message);
            } else {
                setDataUser(response.message)
                setError(false)
            }

        }
        Data()
    }, [id])

    const Exit = () => {
        navegate('/dashboard/APPS/')
    }

    return (
        <>
            <button type="button" onClick={Exit} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center me-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 5H1m0 0l4 4M1 5l4-4" />
                </svg>
                <span className="sr-only">Icon description</span>
            </button>
            <div className='flex items-center justify-center'>
                {error ? <div className="flex items-center p-4 mb-4 text-sm text-red-800 border border-red-300 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400 dark:border-red-800" role="alert">
                    <svg className="shrink-0 inline w-4 h-4 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                    </svg>
                    <span className="sr-only">Info</span>
                    <div>
                        <span className="font-medium">Error!</span> No se encontro ningun usuario.
                    </div>
                </div> : ""}
                {dataUser && (
                    <div className="max-w-md bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700 overflow-hidden">
                        <img
                            className="w-full h-22 object-cover"
                            src={dataUser.image}
                            alt={dataUser.name}
                        />

                        <div className="p-5">
                            <h5 className="mb-3 text-2xl font-bold text-gray-900 dark:text-white">
                                {dataUser.name}
                            </h5>

                            <div className="space-y-2 text-gray-700 dark:text-gray-300">
                                <div className="flex items-center">
                                    <span className="font-semibold w-24">Status:</span>
                                    <span>{dataUser.status}</span>
                                </div>
                                <div className="flex items-center">
                                    <span className="font-semibold w-24">Species:</span>
                                    <span>{dataUser.species}</span>
                                </div>
                                <div className="flex items-center">
                                    <span className="font-semibold w-24">Gender:</span>
                                    <span>{dataUser.gender}</span>
                                </div>
                                {dataUser.type && (
                                    <div className="flex items-center">
                                        <span className="font-semibold w-24">Type:</span>
                                        <span>{dataUser.type}</span>
                                    </div>
                                )}
                                <div className="flex items-center">
                                    <span className="font-semibold w-24">Origin:</span>
                                    <span>{dataUser.origin.name}</span>
                                </div>
                                <div className="flex items-center">
                                    <span className="font-semibold w-24">Location:</span>
                                    <span>{dataUser.location.name}</span>
                                </div>
                                <div className="flex items-center">
                                    <span className="font-semibold w-24">Episodes:</span>
                                    <span>{dataUser.episode.length}</span>
                                </div>
                                <div className="flex items-center">
                                    <span className="font-semibold w-24">Created:</span>
                                    <span>{new Date(dataUser.created).toLocaleDateString()}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    )
}
