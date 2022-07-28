// DESARROLLO DE UNA PLATAFORMA DE ALQUILER DE MOTOS.

var clientsList = [];
var nombre1 = ""
var correo1 = ""
var weeksEntry = ""

function show(){
      
        // Capturamos los datos del cliente y la reserva
        var nombre1 = document.getElementById("nombre1").value;
        var correo1 = document.getElementById("correo1").value;
        var bikes = parseInt(document.getElementById("selectBike").value);
        var weeksEntry = parseInt(document.getElementById("rentTime").value);
        var geoLoc = ("Palma de Mallorca");
        var extraHelmet = document.getElementById("helmet").value;
        
    if (nombre1 != "" && correo1 != "" && weeksEntry != ""){
    
  async function getMoto (){
  
    const motos = await fetch ('databaseMotos.json');
    const data = await motos.json();

    // Asignacion del objeto moto a la eleccion del cliente
    if (bikes === 1){
       var moto = (data[0]);
    } else if (bikes === 2){
       moto = (data[1]);
    } else if (bikes === 3){
       moto = (data[2]);
    } else if (bikes === 4){
       moto = (data[3]);
    } else if (bikes === 5){
       moto = (data[4]);
    }

    class Cliente {
     constructor (nombre, correo){
         this.nombre = nombre;
         this.correo = correo;
         this.newMoto = null;

         this.addMoto = () => {
                    this.newMoto = moto;
                }
            
         this.informeInterno = () => {
                 console.log(`INFORMACION ALQUILER
                 DATOS CLIENTE

                 Nombre: ${nombre1}
                 Correo electronico: ${correo1}
                 
                 DATOS VEHICULO
                 
                 Marca: ${this.newMoto.marca}
                 Modelo: ${this.newMoto.modelo}
                 Cilindrada: ${this.newMoto.cilindrada} cc
                 Fecha de alquiler: ${fechaHoy}
                 Fecha devolucion: ${devolucion}`)
             }
          }
       }
      
   const cliente1 = new Cliente(nombre1, correo1);
   
      // const dataCliente = { nombre: 'nombre1',
      //                    correo: 'correo1'}
        
      //      fetch ("databaseClientes.json", {

      //      method: 'POST',
      //      body: JSON.stringify(dataCliente),
      //      headers: {
      //        'Content-type': 'application/json;charset=UTF-8',
      //     },
      //   })
      //   .then((response) => response.json())
      //   .then((data) => console.log(data))

    // Asignamos valor a la variable "extraHelmet" usando un operador ternario
    extraHelmet === ("si") ? extraHelmet = 10 : extraHelmet = 0;

    // obtenemos las fechas de alquiler y devolucion de la moto mediante libreria Luxon
    DateTime = luxon.DateTime;
    var fechaHoy = DateTime.now()
    fechaHoy = (fechaHoy.toFormat('dd LLL yyyy'));
    var devolucion = (DateTime.now().plus({ days: (weeksEntry * 7) }));
    devolucion = (devolucion.toFormat('dd LLL yyyy'));
    devolucion = devolucion.toLocaleString();
   
    //-----------------------------------------------------
    cliente1.addMoto();
    cliente1.informeInterno();
    //-----------------------------------------------------
    
    // Mostramos el resumen de la reserva.
    var finalText = document.getElementById("returnFinalPrice");
    finalText.innerText = `¡Felicitaciones! 

     Has alquilado la moto ${cliente1.newMoto.marca} ${cliente1.newMoto.modelo} ${cliente1.newMoto.cilindrada}cc por ${weeksEntry} semana/s, en la ciudad de ${geoLoc}. El precio final es : $${((cliente1.newMoto.precio * weeksEntry) + extraHelmet)}`
    
    // Almacenamiento del objeto 'cliente' en localStorage.
 
    var alqCliente = {"nombre": cliente1.nombre, "correo": cliente1.correo, "motoMarca": cliente1.newMoto.marca, "motoCilindrada": cliente1.newMoto.cilindrada, "fecha": devolucion, "precio": cliente1.newMoto.precio + extraHelmet}
    var alqClienteJsonSt = JSON.stringify(alqCliente)
    localStorage.setItem("cliente1", alqClienteJsonSt);
    localStorage.setItem("listaClientes", alqClienteJsonSt);

    var listaRecu = localStorage.getItem("listaClientes");
    
    var alqClienteJsonPar = JSON.parse(listaRecu);
    
    // Agregamos los alquileres de localStorage a un array de informacion de alquiler

    clientsList.push(alqClienteJsonPar);
    
    // Reemplazamos el texto del estado de la reserva
    var clienteStr = localStorage.getItem("cliente1");
    var clienteStr1 = JSON.parse(clienteStr);
    var estadoReserva = document.getElementById("estadoReserva");
    estadoReserva.innerText = (`Tu reserva es: 

    Nombre y Apellido: ${clienteStr1.nombre} 
    Correo:  ${clienteStr1.correo} 
    MOTO
    Marca: ${clienteStr1.motoMarca} 
    Cilindrada: ${ clienteStr1.motoCilindrada} 
    Fecha devolución: ${ clienteStr1.fecha}
    Precio: $${clienteStr1.precio * weeksEntry}`);
  }
  getMoto();
    // Mensaje de error con SweetAlerts
  } else { 
        swal({
            title: "Error!",
            text: "Debes completar todos los campos para continuar.",
            icon: "error",
          });
    
  }
}
 
// Creamos un mensaje con la libreria Toastify que invite al usuario a ver el resumen de su reserva haciendo click en el boton 'volver arriba'
const tostado = document.getElementById("boton");
tostado.addEventListener("click", () => {
   Toastify({
       text: `Clickeá en el boton 'Volver arriba' 
        para ver el resumen de tu reserva`,
       gravity: "bottom",
       duration: 3000,
       style: {
           background: "light blue",
       }
   }).showToast();
})

// Evento de teclado. ejecutamos la función 'show' con la tecla 'enter'
document.addEventListener("keydown", function(event){
    const pressedEnter = event.key;
   (pressedEnter == 'Enter') && show();
  }
)

// Botón 'volver arriba'
const subir = document.getElementById("arribaBtn");
subir.addEventListener("click", window.onload = () => {
    const elevador = new Elevator ({
    element : document.querySelector("#arribaBtn"),
    duration: 800
  })
})

