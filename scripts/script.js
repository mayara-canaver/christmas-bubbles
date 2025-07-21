// Configuração das luzes
const LIGHTS_CONFIG = {
    colors: ['red', 'green', 'blue'],
    notes: [
        { id: 'c_note', file: 'do.wav' },
        { id: 'd_note', file: 're.wav' },
        { id: 'e_note', file: 'mi.wav' },
        { id: 'f_note', file: 'fa.wav' },
        { id: 'g_note', file: 'sol.wav' },
        { id: 'a_note', file: 'la.wav' },
        { id: 'b_note', file: 'si.wav' }
    ],
    ballCount: 12
};

function createBallHTML(color, note, index) {
    return `
        <div class="ball-container" style="animation-delay: ${index * 0.1}s;">
            <div class="circle ${color}" onmouseover="playSound('${note.id}')" onmouseout="stopSound('${note.id}')">
                <div class="stick"></div>
                <div class="line"></div>
                <div class="shine"></div>
                <div class="bright ${color}"></div>
            </div>
            <audio id='${note.id}' src='sounds/${note.file}'></audio>
        </div>
    `;
}

function createCableHTML() {
    return `<div><div class="cable"></div></div>`;
}

function generateLights() {
    const container = document.getElementById('christmas-lights');
    const row = document.createElement('div');
    row.className = 'lights-row';
    
    let html = '';
    
    for (let i = 0; i < LIGHTS_CONFIG.ballCount; i++) {
        const color = LIGHTS_CONFIG.colors[i % LIGHTS_CONFIG.colors.length];
        
        const randomNoteIndex = Math.floor(Math.random() * LIGHTS_CONFIG.notes.length);
        const note = LIGHTS_CONFIG.notes[randomNoteIndex];
        
        const uniqueNote = {
            id: `${note.id}_${i}`,
            file: note.file
        };
        
        html += createBallHTML(color, uniqueNote, i);
        
        if (i < LIGHTS_CONFIG.ballCount - 1) {
            html += createCableHTML();
        }
    }
    
    row.innerHTML = html;
    container.appendChild(row);
}

function playSound(soundId) {
    const audio = document.getElementById(soundId);
    if (audio) audio.play();
}

function stopSound(soundId) {
    const audio = document.getElementById(soundId);
    if (audio) {
        audio.pause();
        audio.currentTime = 0;
    }
}

function turnOn() {
    document.querySelectorAll('.bright').forEach(bright => {
        bright.classList.add('blinking');
    });
}

function turnOff() {
    document.querySelectorAll('.bright').forEach(bright => {
        bright.classList.remove('blinking');
        bright.style.animation = 'none';
        bright.offsetHeight;
        bright.style.transition = 'opacity 2s ease-out';
        bright.style.opacity = '0';
    });
}

function createSnowflake() {
    const snowflake = document.createElement('div');
    snowflake.className = 'snowflake';
    snowflake.style.left = Math.random() * 100 + 'vw';
    snowflake.style.animationDuration = (Math.random() * 8 + 5) + 's';
    snowflake.style.animationDelay = Math.random() * 2 + 's';
    
    document.body.appendChild(snowflake);
    
    setTimeout(() => snowflake.remove(), 20000);
}

function startSnow() {
    createSnowflake();
    setTimeout(startSnow, 300);
}

document.addEventListener('DOMContentLoaded', () => {
    generateLights();
    startSnow();
});
