const carrito=document.querySelector('#carrito');
const cursos=document.querySelector('#lista-cursos')
const listaCursos=document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn=document.querySelector('#vaciar-carrito')

cargarEventListeners();

function cargarEventListeners(){
    cursos.addEventListener('click',comprarCurso);

    carrito.addEventListener('click',eliminarCurso);

    vaciarCarritoBtn.addEventListener('click',vaciarCarrito);

    document.addEventListener('DOMContentLoaded',leerLocalStorage);

}

function comprarCurso(e){
    e.preventDefault();
    // console.log(e.target.classList);
    if(e.target.classList.contains('agregar-carrito')){
        // console.log('Si');
        const curso=e.target.parentElement.parentElement;
        leerDatosCurso(curso);
    }
}
function leerDatosCurso(curso){

    const infoCurso={
        imagen:curso.querySelector('img').src,
        titulo: curso.querySelector('h4').textContent,
        precio: curso.querySelector('.precio span').textContent,
        id: curso.querySelector('a').getAttribute('data-id')
    }
    insertarCarrito(infoCurso);
    // console.log(infoCurso);
}

function insertarCarrito(curso){
    const row=document.createElement('tr');
    row.innerHTML=`
        <td> 
            <img src="${curso.imagen}" width=100>
        </td>
        <td>${curso.titulo}</td>
        <td>${curso.precio}</td>
        <td>
            <a href="#" class="borrar-curso" data-id="${curso.id}">X</a>
        </td>
    `;
    listaCursos.appendChild(row);
    guardarCursosLocalStorage(curso);
}
function eliminarCurso(e){
    e.preventDefault();

    let curso,
        cursoId;

    if(e.target.classList.contains('borrar-curso')){
        e.target.parentElement.parentElement.remove();
    curso=e.target.parentElement.parentElement;
        cursoId=curso.querySelector('a').getAttribute('data-id');
    }
    // console.log('Eliminado');
    eliminarCursoLocalStorage(cursoId);
}
function vaciarCarrito(){

    // listaCursos.innerHTML='';
    

    while(listaCursos.firstChild){
        listaCursos.removeChild(listaCursos.firstChild);
    }
    vaciarLocalStorage();
    return false;

}
function guardarCursosLocalStorage(curso){
    let cursos;
    cursos=obtenerCursosLocalStorage();
    cursos.push(curso);
    localStorage.setItem('cursos',JSON.stringify(cursos));
}

function obtenerCursosLocalStorage(){
    let cursosLS;
    if(localStorage.getItem('cursos')===null){
        cursosLS=[];
    }else{
        cursosLS=JSON.parse(localStorage.getItem('cursos'));
    }
    return cursosLS;
}
function leerLocalStorage(){
    let cursosLS
    
    cursosLS=obtenerCursosLocalStorage();

    console.log(cursosLS);
    cursosLS.forEach(curso => {
        const row=document.createElement('tr');
        row.innerHTML=`
            <td> 
                <img src="${curso.imagen}" width=100>
            </td>
            <td>${curso.titulo}</td>
            <td>${curso.precio}</td>
            <td>
                <a href="#" class="borrar-curso" data-id="${curso.id}">X</a>
            </td>
        `;
        listaCursos.appendChild(row);
    });
}
function eliminarCursoLocalStorage(curso){
    // console.log(curso);
    let cursosLS;
    cursosLS=obtenerCursosLocalStorage();

    cursosLS.forEach((cursoLS,index) => {
        if(cursoLS.id===curso){
            cursosLS.splice(index,1);
        }
    });
    console.log(cursosLS);
    localStorage.setItem('cursos',JSON.stringify(cursosLS));
}
function vaciarLocalStorage(){
    localStorage.clear();
}