import React from "react";
import NavBarComponent from "../navBar/navbar";

const Product = () => {
    const products = JSON.parse(localStorage.getItem("Productos")) || [];

    return (
        <>
            <NavBarComponent />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 p-4">
                {products.map((product, index) => (
                    <div key={index} className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                        <h2 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{product.name}</h2>
                        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Tipo de producto: {product.guy}</p>
                        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Precio: {product.total}$</p>
                    </div>
                ))}
            </div>
        </>
    );
};

export default Product;