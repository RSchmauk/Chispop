document.addEventListener('DOMContentLoaded', () => {
    const video = document.getElementById('preview');
    const player = document.getElementById('player');
    const playButton = document.getElementById('play');
    const pauseButton = document.getElementById('pause');

    const html5QrCode = new Html5Qrcode("preview");

    function handleQRCode(decodedText) {
        if (decodedText.startsWith('https://music.youtube.com/watch')) {
            player.src = decodedText.replace('music.youtube.com', 'www.youtube.com') + '&autoplay=1';
            player.style.display = 'block';
        } else {
            alert('Por favor, escanea un enlace válido de YouTube Music.');
        }
    }

    html5QrCode.start(
        { facingMode: "environment" }, 
        {
            fps: 10, 
            qrbox: { width: 250, height: 250 }
        },
        (decodedText, decodedResult) => {
            handleQRCode(decodedText);
        }
    ).catch(err => {
        console.log(`Error: ${err}`);
    });

    playButton.addEventListener('click', () => {
        player.contentWindow.postMessage('{"event":"command","func":"playVideo","args":""}', '*');
    });

    pauseButton.addEventListener('click', () => {
        player.contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*');
    });
});
