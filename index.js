function cambiarTexto (){
    document.getElementById("titulo").textContent = "¡Texto cambiado!"
}

let elementos = document.getElementsByClassName("parrafo");
console.log(elementos);
console.log(elementos[0].textContent); //no me sale el texto

// let parrafos = document.getElementsByTagName("p");
// console.log(parrafos);
// console.log(parrafos[0].textContent); //no me sale el texto

// let boton = document.querySelector(".botonRojo");
// console.log(boton); // el log imprime un null
// // boton.style.backgroundColor = "red"; // no cambia nada

// let botones = document.querySelectorAll("button");
// botones.forEach(boton => boton.style.backgroundColor = "green")  // solo esta seleccionando el primer boton
// console.log(botones);

// let div = document.getElementById("contenedor");    
// // console.log(div)
// // // div.textContent = "Hola mundo"; //no pasa nada
// div.innerHTML = "<h1>Hola mundo</h1>"; // no funciona

let botonRojo = document.getElementById("boton");

botonRojo.addEventListener("click",function() {
    alert("¡presionaste el boton!");
})
