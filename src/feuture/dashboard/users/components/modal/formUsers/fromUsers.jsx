import React, { useState } from "react";

export const FormUsers = ({InsertData, users}) =>{
    // Variable para el modal
    const [isModalOpen, setIsModalOpen] = useState(false)

    // Funciones para cerrar y abrir modal
    const OpenModal = () => setIsModalOpen(true)

    const CloseModal = () => {
        setIsModalOpen(false)
        setError("")
    }

    // Variable de usario
    const [document, setDocument] = useState("")
    const [name, setName] = useState("")
    const [lastName, setLastName] = useState("")
    const [tel, setTel] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [selectedRoles, setSelectedRoles] = useState("")
    const [state, setState] = useState("")
    const [error, setError] = useState()

    const roles = [{index: 1,name: "Admin"},{index: 2,name: "Usuario"}]


    const Save = (e) =>{
        e.preventDefault()
        //Validar el formulario antes de guardar
        if (!ValidacionBasio()) {
            return
        }

        if (!validacionExistente()) {
            return
        }

        InsertData({document, name, lastName, tel, email, password, selectedRoles, state})
        setDocument("")
        setName("")
        setLastName("")
        setTel("")
        setEmail("")
        setPassword("")
        setSelectedRoles("")
        setState("")
        setIsModalOpen(false)
    }

    // Validacion si estan lleno los campos
    const ValidacionBasio = () =>{
        if (document === 0) {
            setError("Ingrese el documento")
            return false
        }else if(name.trim() === ""){
            setError("Ingrese el nombre del usuario")
            return false
        }else if(lastName.trim() === ""){
            setError("Ingrese el apellido del usuario")
            return false
        }else if(tel === 0) {
            setError("Ingrese el telefono del usuario")
            return false
        }else if(email.trim() === ""){
            setError("Ingrese el correo electronico del usuario")
            return false
        }else if (password.trim() === "") {
            setError("Ingrese la contraseña del usuario")
            return false
        }else if(roles === 0){
            setError("Ingrese el rol del usuario")
            return false
        }else if(state === 0){
            setError("Ingrese el estado del usuario")
            return false
        }else{
            setError("")
            return true
        }
    }

    const validacionExistente = () =>{
        const validacionEmail = users.some((e)=> e.email === email)
        const validacionTel = users.some((e)=> e.tel === parseInt(tel))
        const validacionDocument = users.some((e)=> e.document === parseInt(document) )
        
        if (validacionDocument || validacionTel || validacionEmail) {
            setError("No se pueden el mismo usuario")
            return false
        }else {
            setError("")
            return true
        }
    }

    return(
        <>
            {/* Botón para abrir el modal */}
            <button
                onClick={OpenModal}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
                Ingresar Usuario
            </button>

            {/* Modal */}
            {isModalOpen  && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-2/3">
                        <h2 className="text-xl font-bold xl-4">Formulario de Productos</h2>
                        {/* Mensaje de error */}
                        {error && (
                            <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                                <span className="font-medium">Error:</span> {error}.
                            </div>
                        )}
                        <form onSubmit={Save}>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="document">Numero de documento</label>
                                <input type="number" id="document" onChange={(e) => setDocument(e.target.value)} onBlur={validacionExistente} value={document} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="Numero de documento" />
                            </div>
                            <div className="grid gap-6 mb-6 md:grid-cols-2">
                                <div className="mb-4">
                                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="price">Nombre</label>
                                    <input type="text" id="name" onChange={(e) => setName(e.target.value)} value={name} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="Nombre del usuario" />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="lastName">Apellido</label>
                                    <input type="text" id="lastName" onChange={(e) => setLastName(e.target.value)} value={lastName} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="Apellido del usuario" />
                                </div>
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="tel">Numero telefonico</label>
                                <input type="tel" id="tel" onChange={(e) => setTel(e.target.value)} value={tel} onBlur={validacionExistente} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="Numero telefonico del usuario" />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">Correo electronico</label>
                                <input type="email" id="email" onChange={(e) => setEmail(e.target.value)} value={email} onBlur={validacionExistente} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="Correo electronico del usuario" />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">Contraseña</label>
                                <input type="password" id="password" onChange={(e) => setPassword(e.target.value)} onBlur={validacionExistente} value={password} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="Contraseña del usuario" />
                            </div>
                            <div className="grid gap-6 mb-6 md:grid-cols-2">
                                <div className="mb-4">
                                    <label className="block text-gray-700 text-sm font-bold mb-2">Rol del usuario</label>
                                    <select id="Rol" onChange={(e) => setSelectedRoles(e.target.value)} value={selectedRoles} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" >
                                        <option key={0} value={0} >selecione un rol</option>
                                        {roles.map((e, i) => (
                                            <option key={e.index} value={e.index}>{e.name}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="mb-4">
                                    <label className="block text-gray-700 text-sm font-bold mb-2" >Estado</label>
                                    <select id="state" onChange={(e) => setState(e.target.value)} value={state} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" >
                                        <option key={0} value={0} >selecione un estado del usuario</option>
                                            <option key={1} value={true}>Activo</option>
                                            <option key={2} value={false}>Inactivo</option>
                                    </select>
                                </div>
                            </div>
                            <div className="flex justify-end">
                                <button type="button" onClick={CloseModal} className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 mr-2">Cerrar</button>
                                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Guardar</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    )
}