document.addEventListener('DOMContentLoaded', function() {
    const inputPalabraEnemiga = document.getElementById('palabraEnemiga');
    const botonIngresarEnemigo = document.getElementById('ingresarEnemigo');
    const botonIniciar = document.getElementById('botonIniciar');
    const botonesLetra = document.querySelectorAll('.botonLetra');
    const inputPosicion = document.querySelector('.inputposicion');
    const registroIntentos = document.getElementById('registroIntentos');
    const mensajeDerrota = document.getElementById('mensajeDerrota');
    const mensajeVictoria = document.getElementById('mensajeVictoria');

    let enemigo = '';
    let solucion = [];
    let letrasCorrectasFueraDePosicion = 0; // Contador para letras correctas fuera de posición
    let letrasIncorrectas = 0; // Contador para letras incorrectas

    

    document.getElementById('botonReiniciar').addEventListener('click', function() {
        reiniciarJuego();
    });

    document.getElementById('botonIniciar').addEventListener('click', function() {
        document.getElementById('imagen').classList.add('autoRotate');
    });

    document.getElementById('botonReiniciar').addEventListener('click', function() {
        document.getElementById('imagen').classList.remove('autoRotate');
    });

    document.getElementById('botonReiniciarVictoria').addEventListener('click', function() {
        document.getElementById('imagen').classList.remove('autoRotate');
    });


    botonIngresarEnemigo.addEventListener('click', function() {
        if (inputPalabraEnemiga.value.trim() !== '') {
            enemigo = inputPalabraEnemiga.value.trim();
            inputPalabraEnemiga.value = '';
            inputPalabraEnemiga.disabled = true; // Desactivar el input aquí
            botonIniciar.disabled = false;
            solucion = Array(enemigo.length).fill('_'); // Inicializar la solución con guiones bajos
        } else {
            alert('Por favor, ingresa una palabra.');
        }
    });

    function registrarIntento(letra, posicion, solucionActual) {
        const intento = document.createElement('div'); // Cambiar de 'span' a 'div'
        intento.classList.add('intento'); // Añadir la clase 'intento'
        intento.textContent = `Letra: ${letra}, Posición: ${posicion}, Solución Actual: ${solucionActual}`;
        registroIntentos.appendChild(intento);
    }

    function verificarVictoria() {
        if (solucion.join('') === enemigo) {
            const mensajeVictoria = document.createElement('div');
            mensajeVictoria.textContent = '¡Felicidades, salvaste al prisionero de su muerte!';
            // mensajeVictoria.style.color = 'green';
            mensajeVictoria.classList.add('mensaje-victoria'); // Añadir la clase 'mensaje-victoria'
            registroIntentos.appendChild(mensajeVictoria);
        }
    }

    botonIniciar.addEventListener('click', function() {
        botonIniciar.disabled = true; // Desactivar el botón de iniciar también
        inputPosicion.disabled = false; // Habilitar el input de posición
        inputPosicion.max = enemigo.length - 1;
        botonesLetra.forEach(boton => {
            boton.disabled = false; // Habilitar los botones de letras
        });
        ahorcado(enemigo);
    });

    botonesLetra.forEach(boton => {
        boton.addEventListener('click', function() {
            const letra = boton.textContent;
            let posicion = inputPosicion.value.trim();
            
              
            // Validar la posición
            if (posicion === '' || isNaN(posicion) || posicion < 0 || posicion >= enemigo.length) {
                alert('Por favor, ingresa una posición válida.');
                return;
            }
    
            // Convertir la posición a un número entero
            posicion = parseInt(posicion, 10);
    
            // Intentar la letra en la posición dada
            intentarLetra(letra, posicion);
        });
    });

    function actualizarAcido() {
        const relleno = document.getElementById('relleno');
        const porcentaje = (letrasIncorrectas / 10) * 100; // Asumiendo 10 errores máximos
        relleno.style.width = porcentaje + '%';
    
        if (letrasIncorrectas >= 10) {
            mostrarMensajeDerrota();
        }
    }

    function mostrarMensajeDerrota() {
        if (mensajeDerrota) {
            mensajeDerrota.querySelector('p').textContent = 'El prisionero fue sometido a la pena capital.';
            mensajeDerrota.style.display = 'block';
        }
        inputPalabraEnemiga.disabled = true;
        botonIniciar.disabled = true;
        inputPosicion.disabled = true;
        botonesLetra.forEach(boton => {
            boton.disabled = true;
        });
    }

    function mostrarMensajeVictoria() {
        if (mensajeVictoria) {
            mensajeVictoria.querySelector('p').textContent = '¡Felicidades, salvaste al prisionero de su muerte!';
            mensajeVictoria.style.display = 'block';
        }
        inputPalabraEnemiga.disabled = true;
        botonIniciar.disabled = true;
        inputPosicion.disabled = true;
        botonesLetra.forEach(boton => {
            boton.disabled = true;
        });
    }
    
    document.getElementById('botonReiniciarVictoria').addEventListener('click', function() {
        reiniciarJuego();
    });

    function reiniciarJuego() {
        letrasIncorrectas = 0;
        document.getElementById('relleno').style.width = '0%';
        document.getElementById('mensajeDerrota').style.display = 'none';
        document.getElementById('mensajeVictoria').style.display = 'none';
        document.getElementById('palabraEnemiga').disabled = false;
        document.getElementById('botonIniciar').disabled = false;
        inputPosicion.disabled = true;
        const registros = document.querySelectorAll('#registroIntentos');
        registros.forEach(registro => {
            registro.innerHTML = '';
        });

        // Reiniciar la palabra a adivinar
        enemigo = ''; // Asigna una nueva palabra o deja en blanco para que se asigne una nueva
        solucion = []; // Reinicia la solución parcial

        botonesLetra.forEach(boton => {
            boton.disabled = true;
        });
        // Reiniciar otros elementos del juego según sea necesario
    }
    // Llama a esta función cada vez que aumente letrasIncorrectas
    // letrasIncorrectas++;
    // actualizarAcido();

    function intentarLetra(letra, posicion) {
        if (enemigo.includes(letra) && enemigo[posicion] !== letra) {
            letrasCorrectasFueraDePosicion++;
            // console.log(letrasCorrectasFueraDePosicion)
        } else if (!enemigo.includes(letra)) {
            letrasIncorrectas++;
            actualizarAcido();
            // console.log(letrasIncorrectas)
        }
    
        solucion[posicion] = letra; // Actualizar la solución parcial
        let solucionActual = solucion.join("");
    
        registrarIntento(letra, posicion, solucionActual);
    
        if (solucionActual === enemigo) {
            console.log("felicidades ganaste");
            verificarVictoria();
            mostrarMensajeVictoria();
            document.getElementById('palabraEnemiga').disabled = false; // Reactivar el input
            document.getElementById('botonIniciar').disabled = false; // Reactivar el botón de iniciar
            inputPosicion.disabled = true; // Desactivar el input de posición
            botonesLetra.forEach(boton => {
                boton.disabled = true; // Desactivar los botones de letras
            });
        }
    }
});

