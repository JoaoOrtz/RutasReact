import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AlertError from "../../shared/utils/alerts/alertError/error";
import NarBarComponent from "../landign/components/navBar/navbar";

const Login = () => {
    const navigate = useNavigate();

    const [dataAccess, setDataAccess] = useState(() => {
        const savedUsers = JSON.parse(localStorage.getItem("Usuarios")) || [{
            email: "joaoestid@gmail.com",
            password: "hola123",
            name: "Joao",
            lastName: "Ortiz",
            document: 1021806280,
            tel: 3008239274,
            selectedRoles: "1",
            state: "true",
        },];
    
        // Si ya existe, devolver solo savedUsers
        return savedUsers;
    });
    
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = (e) => {
        e.preventDefault();
        const login = dataAccess.find((e) => e.email === email && e.password === password);
        
        if (login) {
            // Agregar el usuario que inició sesión a localStorage
            const savedUsers = JSON.parse(localStorage.getItem("Usuarios")) || [];
            
            // Verificar si el usuario ya existe en localStorage
            const userExists = savedUsers.some(user => user.email === login.email);
            
            if (!userExists) {
                savedUsers.push(login); // Agregar solo el usuario que inició sesión
                localStorage.setItem("Usuarios", JSON.stringify(savedUsers));
            }

            localStorage.setItem("currentUser", JSON.stringify(login));
            navigate("/dashboard/products");
        } else {
            AlertError("Error al iniciar sesión", "Verifique bien la cuenta");
        }
    };

    return (
        <>
            <NarBarComponent/>
            <section className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900">
                <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-xl dark:bg-gray-800">
                    <h2 className="text-2xl font-bold text-center text-gray-900 dark:text-white">
                        Login
                    </h2>
                    <form onSubmit={handleLogin} className="mt-8 space-y-6">
                        <div>
                            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                            <input
                                type="email"
                                name="email"
                                id="email"
                                onChange={(e) => setEmail(e.target.value)}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="name@company.com"
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your password</label>
                            <input
                                type="password"
                                name="password"
                                id="password"
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="••••••••"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full px-5 py-3 text-base font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        >
                            Enviar
                        </button>
                    </form>
                </div>
            </section>
        </>
    );
};

export default Login;