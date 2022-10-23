import Toastify from 'toastify-js'
import "toastify-js/src/toastify.css"

export function ToastifyMessage(message, type){
    Toastify({
        text: message,
        duration: type === "success" ? 2000 : 2000,
        close: true,
        className: "info",
        offset: {
            y: 70 // vertical axis - can be a number or a string indicating unity. eg: '2em'
          },
        gravity: "bottom", 
        position: "center", 
        style: {
          background: type === "success" ?  "green" :  "red",
          borderRadius: "10px",
          width: "max-content"
          
        }
      }).showToast();
}
