document.addEventListener('DOMContentLoaded', function() {
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

    const palabrasMaquina = ["jazz", "blues", "rock", "Ovovivíparo", "Caleidoscopio", "rugby", "Desoxirribonucleico", "inteligencia artificial", "sevedol", "corazon","gimnasio","casa de barbie","baseball","musica country","raton","computador","alcohol","elefante","automovil","cuadernillo","proteina","carnaval","ventilador","adn","samurai"];

    function seleccionarPalabraMaquina() {
        return palabrasMaquina[Math.floor(Math.random() * palabrasMaquina.length)];
    }

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


    function registrarIntento(letra, posicion, solucionActual) {
        const intento = document.createElement('div');
        intento.classList.add('intento');
        intento.textContent = `Letra: ${letra}, Posición: ${posicion}, Solución Actual: ${solucionActual}`;
        registroIntentos.appendChild(intento);
    }

    function verificarVictoria() {
        if (solucion.join('') === enemigo) {
            const mensajeVictoria = document.createElement('div');
            mensajeVictoria.textContent = '¡Felicidades! Has ganado.';
            mensajeVictoria.classList.add('mensaje-victoria');
            registroIntentos.appendChild(mensajeVictoria);
            mostrarMensajeVictoria();
        }
    }

    function actualizarAcido() {
        const relleno = document.getElementById('relleno');
        const porcentaje = (letrasIncorrectas / 10) * 100;
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

    function reiniciarJuego() {
        letrasIncorrectas = 0;
        document.getElementById('relleno').style.width = '0%';
        document.getElementById('mensajeDerrota').style.display = 'none';
        document.getElementById('mensajeVictoria').style.display = 'none';
        inputPosicion.disabled = true;
        const registros = document.querySelectorAll('#registroIntentos');
        registros.forEach(registro => {
            registro.innerHTML = '';
        });
        enemigo = '';
        solucion = [];
        botonesLetra.forEach(boton => {
            boton.disabled = true;
        });
        botonIniciar.disabled = false; // Habilitar el botón de iniciar
    }

    function intentarLetra(letra, posicion) {
        if (enemigo.includes(letra) && enemigo[posicion] !== letra) {
            // Letra correcta pero en posición incorrecta
        } else if (!enemigo.includes(letra)) {
            letrasIncorrectas++;
            actualizarAcido();
        }

        solucion[posicion] = letra;
        let solucionActual = solucion.join("");

        registrarIntento(letra, posicion, solucionActual);

        if (solucionActual === enemigo) {
            verificarVictoria();
        }
    }

    botonIniciar.addEventListener('click', function() {
        enemigo = seleccionarPalabraMaquina();
        solucion = Array(enemigo.length).fill('_');
        botonIniciar.disabled = true;
        inputPosicion.disabled = false;
        inputPosicion.max = enemigo.length - 1;
        botonesLetra.forEach(boton => {
            boton.disabled = false;
        });
        imagen.classList.add('autoRotate'); // Agregar la clase de animación
    });

    botonesLetra.forEach(boton => {
        boton.addEventListener('click', function() {
            const letra = boton.textContent;
            let posicion = inputPosicion.value.trim();

            if (posicion === '' || isNaN(posicion) || posicion < 0 || posicion >= enemigo.length) {
                alert('Por favor, ingresa una posición válida.');
                return;
            }

            posicion = parseInt(posicion, 10);
            intentarLetra(letra, posicion);
        });
    });

    document.getElementById('botonReiniciar').addEventListener('click', function() {
        reiniciarJuego();
    });

    document.getElementById('botonReiniciarVictoria').addEventListener('click', function() {
        reiniciarJuego();
    });
});