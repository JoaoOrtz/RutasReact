import React from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";

const Layout = () => {
    const navegate = useNavigate();
    // Obtener el usuario actual desde localStorage
    const currentUser = JSON.parse(localStorage.getItem("currentUser")) || null;

    // Verificar si el usuario actual es admin (rol "1")
    const isAdmin = currentUser && currentUser.selectedRoles === "1";

    console.log("Usuario actual:", currentUser);
    console.log("¿Es admin?:", isAdmin);

    const Exit = () => {
        localStorage.removeItem("currentUser"); // Eliminar el usuario actual
        navegate("/");
    };

    return (
        <>
            <div className="flex min-h-screen">
                {/* Sidebar */}
                <nav className="bg-blue-600 text-white w-64 p-4 flex flex-col">

                    {/* Enlaces */}
                    <ul className="space-y-4">
                        <li>
                            <Link to="/dashboard/products" className="block py-2 px-4 hover:bg-blue-700 rounded">Productos</Link>
                        </li>
                        <li>
                            <Link to="/dashboard/typeProducts" className="block py-2 px-4 hover:bg-blue-700 rounded">Tipo de productos</Link>
                        </li>
                        <li>
                            {isAdmin && <Link to="/dashboard/users" className="block py-2 px-4 hover:bg-blue-700 rounded">Usuarios</Link>}
                        </li>
                    </ul>
                </nav>

                {/* Contenido principal */}
                <div className="flex-grow flex flex-col">
                    {/* Navbar superior */}
                    <div className="bg-gray-100 p-4 flex justify-between items-center">
                        <p className="text-lg font-semibold">Bienvenido {currentUser.name} {currentUser.lastName}</p>
                        <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" onClick={Exit}>
                            Salir
                        </button>
                    </div>

                    {/* Contenido iterativo (Outlet) */}
                    <div className="p-4 flex-grow">
                        <Outlet/>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Layout;