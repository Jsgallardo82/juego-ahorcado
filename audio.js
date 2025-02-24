document.addEventListener('DOMContentLoaded', () => {
    const clickSound = document.getElementById('clickSound');
    const botonesLetra = document.querySelectorAll('.botonLetra');
    const links = document.querySelectorAll('.linkFooter');
    const backgroundMusic = document.getElementById('backgroundMusic');
    const volumeSlider = document.getElementById('volumeSlider');
    const toggleSoundButton = document.getElementById('toggleSound');

    // Reproduce el sonido al hacer clic en los botones de letra
    botonesLetra.forEach(boton => {
        boton.addEventListener('click', () => {
            clickSound.currentTime = 0; // Reinicia el sonido
            clickSound.play(); // Reproduce el sonido
        });
    });

    // Reproduce el sonido al hacer clic en los enlaces con la clase linkFooter
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            clickSound.currentTime = 0; // Reinicia el sonido
            clickSound.play(); // Reproduce el sonido
        });
    });

    // Control de volumen para la música de fondo
    if (volumeSlider) {
        volumeSlider.addEventListener('input', (e) => {
            backgroundMusic.volume = e.target.value;
        });
    }

    // Alternar el sonido de fondo
    toggleSoundButton.addEventListener('click', () => {
        if (backgroundMusic.paused) {
            backgroundMusic.play();
            toggleSoundButton.textContent = '🔊';
        } else {
            backgroundMusic.pause();
            toggleSoundButton.textContent = '🔇';
        }
    });
});