import React from "react";
import { Route, Routes } from 'react-router-dom'
import Landign from "../../feuture/landign/landign";
import Login from "../../feuture/auth/login";
import Product from "../../feuture/landign/components/product/product";
import Error_404 from "../../feuture/errors/error_404/error_404";
import Layout from "../../feuture/dashboard/layout";
import ProductsBoard from "../../feuture/dashboard/products/products";
import UsersBoard from "../../feuture/dashboard/users/users";
import TypeProducts from "../../feuture/dashboard/products/components/TypeProducts/typeProducts";
import { ConsumoApp } from "../../feuture/dashboard/consumoAPPS/ConsumoApp";
import { ViewsApp } from "../../feuture/dashboard/consumoAPPS/components/viewsApp/ViewsApp";

const RouteComponent = () => {
    
    return (
        <Routes>
            {/* Ruta raiz */}
            <Route path='/' element={<Landign/>} />
            {/* Ruta Productos */}
            <Route path='/product' element={<Product/>} />
            {/* Ruta login */}
            <Route path='/access' element={<Login/>} />

            {/* Ruta de dashboard */}
            <Route path='/dashboard' element={<Layout/>}>
                <Route path='products' element={<ProductsBoard/>}/>
                <Route path='typeProducts' element={<TypeProducts/>}/>
                <Route path='APPS' element={<ConsumoApp/>}/>
                <Route path='APPS/:id' element={<ViewsApp />}/>
                <Route path='users' element={<UsersBoard/>}/>
            </Route>

            {/* Ruta de error */}
            <Route path='*' element={<Error_404/>} />

        </Routes>
      )
}

export default RouteComponent;