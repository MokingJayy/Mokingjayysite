// Gestion du lecteur audio global
class AudioPlayer {
  constructor() {
    this.audio = null;
    this.currentAudio = null;
    this.initialize();
  }

  initialize() {
    // Créer l'élément audio s'il n'existe pas
    this.audio = new Audio();
    this.audio.volume = 0.5;
    
    // Gestion des événements globaux
    document.addEventListener('click', (e) => {
      // Détection des clics sur les boutons de lecture
      if (e.target.closest('.play-button')) {
        const button = e.target.closest('.play-button');
        const audioSrc = button.dataset.audioSrc;
        this.togglePlay(audioSrc);
      }
    });

    // Mise à jour de l'interface utilisateur lors de la lecture
    this.audio.addEventListener('play', this.updatePlayButtons.bind(this));
    this.audio.addEventListener('pause', this.updatePlayButtons.bind(this));
    this.audio.addEventListener('ended', this.handleAudioEnded.bind(this));
  }

  togglePlay(audioSrc) {
    if (this.currentAudio === audioSrc && !this.audio.paused) {
      this.audio.pause();
    } else {
      if (this.currentAudio !== audioSrc) {
        this.audio.src = audioSrc;
        this.currentAudio = audioSrc;
      }
      this.audio.play();
    }
  }

  updatePlayButtons() {
    const allPlayButtons = document.querySelectorAll('.play-button');
    const isCurrentPlaying = !this.audio.paused;

    allPlayButtons.forEach(button => {
      const buttonAudio = button.dataset.audioSrc;
      
      if (buttonAudio === this.currentAudio) {
        button.innerHTML = isCurrentPlaying ? 
          // Icône pause
          `<svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>` : 
          // Icône lecture
          `<svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>`;
      } else {
        // Remettre toutes les autres icônes en état de lecture
        button.innerHTML = 
          `<svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>`;
      }
    });
  }

  handleAudioEnded() {
    this.currentAudio = null;
    this.updatePlayButtons();
  }
}

// Initialisation du lecteur audio au chargement de la page
document.addEventListener('DOMContentLoaded', () => {
  window.audioPlayer = new AudioPlayer();
});
