console.log("Welcome to Spotify");

//Initiliaze the variables
let songIndex = 0;
let audioElement = new Audio('songs/1.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let masterSongName = document.getElementById('masterSongName');
let gif = document.getElementById('gif');
let songItems = Array.from(document.getElementsByClassName('songItem'));
let songs = [
    { songName: "Warriyo - Mortals", filePath: "songs/1.mp3", coverPath: "covers/1.jpg" },
    { songName: "Cielo - Huma-Huma", filePath: "songs/2.mp3", coverPath: "covers/2.jpg" },
    { songName: "MAFIA", filePath: "songs/3.mp3", coverPath: "covers/3.jpg" },
    { songName: "Coffin Dance", filePath: "songs/4.mp3", coverPath: "covers/4.jpg" },
    { songName: "Janji - Heroes Tonight", filePath: "songs/5.mp3", coverPath: "covers/5.jpg" },
    { songName: "Sugar & Brownies", filePath: "songs/6.mp3", coverPath: "covers/6.jpg" },
    { songName: "Eyes Of You", filePath: "songs/7.mp3", coverPath: "covers/7.jpg" },
    { songName: "Love your voice", filePath: "songs/8.mp3", coverPath: "covers/8.jpg" },
    { songName: "Serhat Durmus", filePath: "songs/9.mp3", coverPath: "covers/9.jpg" }
]

let audioElements = [];
songItems.forEach((element, i) => {
    element.getElementsByTagName("img")[0].src = songs[i].coverPath;
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
    audioElements.push(new Audio(songs[i].filePath));
});

function pad(num, size) {
    num = parseInt(num);
    var s = num + '';
    while (s.length < size) {
        s = '0' + s;
    }
    return s;
}

function format_seconds(secs) {
    return '0' + Math.floor(secs / 60) + ':' + (pad(secs % 60, 2));
}

window.addEventListener('load', () => {
    songItems.forEach((element, i) => {
        element.getElementsByClassName("songLength")[0].innerText = format_seconds(audioElements[i].duration);
    });
});


//Handle play pause click
masterPlay.addEventListener('click', () => {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        audioElement.play();
        document.getElementById("masterPlay").src = "icons/pause-white.svg";
        gif.style.opacity = 1;
        document.getElementById(`${songIndex}`).src = "icons/pause-black.svg";
    }
    else {
        audioElement.pause();
        document.getElementById("masterPlay").src = "icons/play-white.svg";
        gif.style.opacity = 0;
        makeAllPlays();
    }
})

//Listen to events'
audioElement.addEventListener('timeupdate', () => {
    //update seekbar
    progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
    myProgressBar.value = progress;
})

myProgressBar.addEventListener('change', () => {
    audioElement.currentTime = (myProgressBar.value * audioElement.duration) / 100;
})

const makeAllPlays = () => {
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
        element.src = "icons/play-black.svg";
    });
}

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
    element.addEventListener('click', (e) => {
        var currentIndex = songIndex;
        songIndex = parseInt(e.target.id);
        makeAllPlays();

        if (currentIndex === songIndex) {
            if (audioElement.paused || audioElement.currentTime <= 0 ) {
                audioElement.play();
                e.target.src = "icons/pause-black.svg";
                document.getElementById("masterPlay").src = "icons/pause-white.svg";
                gif.style.opacity = 1;
            }
            else {
                audioElement.pause();
                e.target.src = "icons/play-black.svg";
                document.getElementById("masterPlay").src = "icons/play-white.svg";
                gif.style.opacity = 0;
            }
        }
        else {
            masterSongName.innerHTML = songs[songIndex].songName;
            e.target.src = "icons/pause-black.svg";
            audioElement.src = `songs/${songIndex + 1}.mp3`;
            audioElement.currentTime = 0;
            audioElement.play();
            document.getElementById("masterPlay").src = "icons/pause-white.svg";
            gif.style.opacity = 1;
        }
    })
})

// Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
//     element.addEventListener('click', (e) => {
//         if (audioElement.paused || audioElement.currentTime <= 0) {
//             makeAllPlays();
//             songIndex = parseInt(e.target.id);
//             masterSongName.innerHTML = songs[songIndex].songName;
//             e.target.src = "icons/pause-black.svg";
//             audioElement.src = `songs/${songIndex + 1}.mp3`;
//             audioElement.currentTime = 0;
//             audioElement.play();
//             document.getElementById("masterPlay").src = "icons/pause-white.svg";
//             gif.style.opacity = 1;
//         }
//         else {
//             makeAllPlays();
//             audioElement.pause();
//             document.getElementById("masterPlay").src = "icons/play-white.svg";
//             gif.style.opacity = 0;
//         }

//     })
// })

document.getElementById('next').addEventListener('click', () => {
    if (songIndex == 8) {
        songIndex = 0;
    }
    else {
        songIndex++;
    }
    masterSongName.innerHTML = songs[songIndex].songName;
    audioElement.src = `songs/${songIndex + 1}.mp3`;
    audioElement.currentTime = 0;
    audioElement.play();
    document.getElementById("masterPlay").src = "icons/pause-white.svg";
    gif.style.opacity = 1;
    makeAllPlays();
    document.getElementById(`${songIndex}`).src = "icons/pause-black.svg";
})


document.getElementById('previous').addEventListener('click', () => {
    if (songIndex == 0) {
        songIndex = 8;
    }
    else {
        songIndex--;
    }
    masterSongName.innerHTML = songs[songIndex].songName;
    audioElement.src = `songs/${songIndex + 1}.mp3`;
    audioElement.currentTime = 0;
    audioElement.play();
    document.getElementById("masterPlay").src = "icons/pause-white.svg";
    gif.style.opacity = 1;
    makeAllPlays();
    document.getElementById(`${songIndex}`).src = "icons/pause-black.svg";
})

//on audio end
audioElement.addEventListener('ended', () => {
    if (songIndex == 8) {
        songIndex = 0;
    }
    else {
        songIndex++;
    }
    masterSongName.innerHTML = songs[songIndex].songName;
    audioElement.src = `songs/${songIndex + 1}.mp3`;
    audioElement.currentTime = 0;
    audioElement.play();
    document.getElementById("masterPlay").src = "icons/pause-white.svg";
    gif.style.opacity = 1;
    makeAllPlays();
    document.getElementById(`${songIndex}`).src = "icons/pause-black.svg";
})