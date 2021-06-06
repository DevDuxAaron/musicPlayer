const musicContainer = document.querySelector('.music-container')
const playBtn = document.querySelector('#play')
const prevBtn = document.querySelector('#prev')
const nextBtn = document.querySelector('#next')
const audio = document.querySelector('#audio')
const progress = document.querySelector('.progress')
const progressContainer = document.querySelector('.progress-container')
const title = document.querySelector('#title')
const cover = document.querySelector('#cover')

const songs = ['couple', 'card', 'deck']

let songIndex = 0

const loadSong = (song) => {
    title.innerText = song
    audio.src = `music/${song}.m4a`
    cover.src = `images/${song}.jpg`
}

const playSong = () => {
    musicContainer.classList.add('play')
    updateView('fa-pause', 'fa-play')

    audio.play()
}
const pauseSong = () => {
    musicContainer.classList.toggle('play')
    updateView('fa-play', 'fa-pause')

    audio.pause()
}
const updateView = (add, remove) => {
    playBtn.querySelector('i.fas').classList.remove(remove)
    playBtn.querySelector('i.fas').classList.add(add)
}
const prevSong = () => {
    songIndex--
    if (songIndex < 0) {
        songIndex = songs.length
    }
    loadSong(songs[songIndex])
    playSong()
}
const nextSong = () => {
    songIndex = (songIndex + 1) % songs.length
    loadSong(songs[songIndex])
    playSong()
}

const updateProgress = (e) => {
    // console.log(e.srcElement.currentTime);
    // console.log(e.srcElement.duration);
    const {duration, currentTime} = e.srcElement
    const progressPercent = (currentTime / duration) * 100
    progress.style.width = `${progressPercent}%`
}

function setProgress (e) {
    const width = this.clientWidth
    const clickX = e.offsetX
    const duration = audio.duration

    audio.currentTime = (clickX / width) * duration
}

playBtn.addEventListener('click', () => {
    const isPlaying = musicContainer.classList.contains('play')

    if (isPlaying) {
        pauseSong()
    } else {
        playSong()
    }
})

nextBtn.addEventListener('click', nextSong)
prevBtn.addEventListener('click', prevSong)

audio.addEventListener('timeupdate', updateProgress)

progressContainer.addEventListener('click', setProgress)

audio.addEventListener('ended', nextSong)