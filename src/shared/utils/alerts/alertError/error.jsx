import React from "react";
import Swal from "sweetalert2";

const AlertError = (m, t) =>{
    Swal.fire({
        icon: "error",
        title: t,
        text: m,
        showConfirmButton: false,
        timer: 1500
      });
}

export default AlertError;