
// mis variables con las que trabajaré 

const carrito = document.querySelector('#carrito')
const listaCursos = document.querySelector('#lista-cursos')
const vaciarCarrito = document.querySelector('#vaciar-carrito')
const tbody = document.querySelector('tbody')
const existeClassAgregar = document.querySelector('.agregar-carrito')
let articulosCarrito = []

//!==

// vamos a registrar todos los eventos en una sola funcion

registrarEventos()

function registrarEventos() {
    //agregaremos un evento a todos los botones que agregan los cursos 
    listaCursos.addEventListener('click', agregarAlCarrito)

    //agregamos un evento para poder eliminar los cursos del carrito
    carrito.addEventListener('click', eliminarCurso)

    //vaciamos todos los cursos 
    vaciarCarrito.addEventListener('click', () => {
        limpiarHTML()
    })


}


//escribiremos funciones que se conectaran con la funcion de registrarEventos()

function agregarAlCarrito(e) {

   e.preventDefault()

   if (existeClassAgregar) {
     const cursoSeleccionado = e.target.parentElement.parentElement
     leerCurso(cursoSeleccionado)
   }

  
}


//eliminamos los cursos del carrito de compras si ya no lo queremos

function eliminarCurso(e) {
   
   if (e.target.classList.contains('borrar-curso')) {
      const dataID = e.target.getAttribute('data-id')

      //eliminamos el curso seleccionado
      articuloEliminar = articulosCarrito.find(curso => curso.id === dataID )
      
      if (articuloEliminar.cantidad > 1 ) {
          articuloEliminar.cantidad--
          articuloEliminar.precio = articuloEliminar.cantidad * articuloEliminar.precioBase
        } else {
            articulosCarrito = articulosCarrito.filter(curso => curso.id !== dataID)
        }
        
      mostrarHTML()
      
   }
    
}




//vamos a leer en consola el curso que estamos presionando al hacer click 

function leerCurso(curso) {

    
  //creamos un objeto para extraer la informacion de los cursos 

  const infoCursos = {
      imagen: curso.querySelector('img').src,
      titulo: curso.querySelector('h4').textContent,
      precio: parseInt(curso.querySelector('span').textContent.substr(1)),
      id: curso.querySelector('a').getAttribute('data-id'),
      cantidad: 1,
      precioBase: parseInt(curso.querySelector('.precio span').textContent.substr(1)),
  }


  const existe = articulosCarrito.some((curso) => curso.id === infoCursos.id)

   if (existe) {

       const cursoSeleccionado = articulosCarrito.forEach(curso => {
            
          if (curso.id === infoCursos.id) {
              curso.cantidad++
              curso.precio = curso.precioBase * curso.cantidad
          } else {
              curso.precio = curso.precioBase - curso.cantidad
          } 
       })

   } else {

       articulosCarrito.push(infoCursos)

  }


  console.log(articulosCarrito)
 
  mostrarHTML()

}




//vamos a mostrar el HTML en el carrito para que se puedan visualizar los cursos que seleccionemos 

function mostrarHTML() {

    limpiarHTML()
    
    articulosCarrito.forEach(curso => {
        const lista = document.createElement('tr')

        lista.innerHTML = `
          <img src ='${curso.imagen}' width = '100'>
          <td>${curso.titulo}</td>
          <td>$${curso.precio}</td>
          <td>${curso.cantidad}</td>
          <td>
            <a href= '#' class='borrar-curso' data-id='${curso.id}'> X </a>
          </td>
        `
         tbody.appendChild(lista)

    })
}




function limpiarHTML() {

    //forma mas lenta para limpiar el HTML 
    //tbody.innerHTML = ''


    //la forma mas rapida y que mejora el performance es utilizar un while para mi es preferible
    while (tbody.firstChild) {
        tbody.removeChild(tbody.firstChild)
    }

}
