let copyVideo = false;

function setupVideo(url) {
    const video = document.createElement('video');
    
    let playing = false;
    let timeupdate = false;
    video.playsInline = true;
    video.muted = true;
    video.loop = true;

    video.addEventListener('playing', function() {
        playing = true;
        checkReady();
    }
    , false);
    video.addEventListener('timeupdate', function() {
        timeupdate = true;
        checkReady();
    }
    , false);
    video.src = url;
    video.play();

    
    function checkReady() {
        if (playing && timeupdate) {
            copyVideo = true;
        }
    }

    return video;
}

export {
    setupVideo,
    copyVideo,
}