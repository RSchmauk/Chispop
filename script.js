import QrScanner from 'https://cdnjs.cloudflare.com/ajax/libs/qr-scanner/1.4.1/qr-scanner.umd.min.js';

const video = document.getElementById('preview');
const player = document.getElementById('player');
const playButton = document.getElementById('play');
const pauseButton = document.getElementById('pause');

QrScanner.WORKER_PATH = 'https://cdnjs.cloudflare.com/ajax/libs/qr-scanner/1.4.1/qr-scanner-worker.min.js';

const scanner = new QrScanner(video, result => handleQRCode(result));

scanner.start();

function handleQRCode(result) {
    if (result.startsWith('https://music.youtube.com/watch')) {
        player.src = result.replace('music.youtube.com', 'www.youtube.com') + '&autoplay=1';
        player.style.display = 'block';
    } else {
        alert('Por favor, escanea un enlace válido de YouTube Music.');
    }
}

playButton.addEventListener('click', () => {
    player.contentWindow.postMessage('{"event":"command","func":"playVideo","args":""}', '*');
});

pauseButton.addEventListener('click', () => {
    player.contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*');
});
