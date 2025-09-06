// Theme data
const themes = {
  animals: {
    name: "Animals",
    icon: "🐾",
    items: [
      { name: "Cat", emoji: "🐱" },
      { name: "Dog", emoji: "🐶" },
      { name: "Cow", emoji: "🐄" },
      { name: "Pig", emoji: "🐷" },
      { name: "Duck", emoji: "🦆" },
      { name: "Horse", emoji: "🐴" }
    ]
  },
  fruits: {
    name: "Fruits",
    icon: "🍎",
    items: [
      { name: "Apple", emoji: "🍎" },
      { name: "Banana", emoji: "🍌" },
      { name: "Orange", emoji: "🍊" },
      { name: "Grapes", emoji: "🍇" },
      { name: "Strawberry", emoji: "🍓" },
      { name: "Watermelon", emoji: "🍉" }
    ]
  },
  vegetables: {
    name: "Vegetables",
    icon: "🥕",
    items: [
      { name: "Carrot", emoji: "🥕" },
      { name: "Broccoli", emoji: "🥦" },
      { name: "Corn", emoji: "🌽" },
      { name: "Tomato", emoji: "🍅" },
      { name: "Pepper", emoji: "🫑" },
      { name: "Onion", emoji: "🧅" }
    ]
  },
  electronics: {
    name: "Electronics",
    icon: "📱",
    items: [
      { name: "Phone", emoji: "📱" },
      { name: "Computer", emoji: "💻" },
      { name: "TV", emoji: "📺" },
      { name: "Camera", emoji: "📷" },
      { name: "Watch", emoji: "⌚" },
      { name: "Headphones", emoji: "🎧" }
    ]
  },
  colors: {
    name: "Colors",
    icon: "🌈",
    items: [
      { name: "Red", emoji: "❤️" },
      { name: "Blue", emoji: "💙" },
      { name: "Green", emoji: "💚" },
      { name: "Yellow", emoji: "💛" },
      { name: "Purple", emoji: "💜" },
      { name: "Orange", emoji: "🧡" }
    ]
  },
  sports: {
    name: "Sports",
    icon: "⚽",
    items: [
      { name: "Soccer", emoji: "⚽" },
      { name: "Basketball", emoji: "🏀" },
      { name: "Tennis", emoji: "🎾" },
      { name: "Swimming", emoji: "🏊" },
      { name: "Running", emoji: "🏃" },
      { name: "Baseball", emoji: "⚾" }
    ]
  },
  countries: {
    name: "Countries",
    icon: "🌍",
    items: [
      { name: "USA", emoji: "🇺🇸" },
      { name: "UK", emoji: "🇬🇧" },
      { name: "France", emoji: "🇫🇷" },
      { name: "Japan", emoji: "🇯🇵" },
      { name: "India", emoji: "🇮🇳" },
      { name: "Canada", emoji: "🇨🇦" }
    ]
  }
};

// Game state
let gameState = {
  currentTheme: null,
  cards: [],
  flippedCards: [],
  matchedPairs: 0,
  moves: 0,
  isProcessing: false
};

// DOM elements
let themeSelection, gameScreen, gameBoard, gameTitle, moveCount, winMessage, finalMoves, winText;
let backBtn, resetBtn, playAgainBtn, newThemeBtn;

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  console.log('DOM loaded, initializing app...');
  try {
    initializeApp();
  } catch (error) {
    console.error('Error initializing app:', error);
  }
});

// Initialize the application
function initializeApp() {
  console.log('Initializing app...');
  
  // Get DOM elements
  themeSelection = document.getElementById('theme-selection');
  gameScreen = document.getElementById('game-screen');
  gameBoard = document.getElementById('game-board');
  gameTitle = document.getElementById('game-title');
  moveCount = document.getElementById('move-count');
  winMessage = document.getElementById('win-message');
  finalMoves = document.getElementById('final-moves');
  winText = document.getElementById('win-text');
  backBtn = document.getElementById('back-btn');
  resetBtn = document.getElementById('reset-btn');
  playAgainBtn = document.getElementById('play-again-btn');
  newThemeBtn = document.getElementById('new-theme-btn');

  console.log('DOM elements found:', {
    themeSelection: !!themeSelection,
    gameScreen: !!gameScreen,
    gameBoard: !!gameBoard
  });

  // Add event listeners
  setupEventListeners();
  
  // Show theme selection by default
  showThemeSelection();
}

// Setup all event listeners
function setupEventListeners() {
  console.log('Setting up event listeners...');
  
  // Theme selection
  const themeCards = document.querySelectorAll('.theme-card');
  console.log('Found theme cards:', themeCards.length);
  
  themeCards.forEach((card, index) => {
    const theme = card.dataset.theme;
    console.log(`Setting up theme card ${index}: ${theme}`);
    
    card.addEventListener('click', function(e) {
      e.preventDefault();
      console.log('Theme selected:', theme);
      selectTheme(theme);
    });
  });

  // Navigation buttons
  if (backBtn) {
    backBtn.addEventListener('click', function(e) {
      e.preventDefault();
      console.log('Back button clicked');
      showThemeSelection();
    });
  }
  
  if (resetBtn) {
    resetBtn.addEventListener('click', function(e) {
      e.preventDefault();
      console.log('Reset button clicked');
      resetGame();
    });
  }
  
  if (playAgainBtn) {
    playAgainBtn.addEventListener('click', function(e) {
      e.preventDefault();
      console.log('Play again button clicked');
      resetGame();
    });
  }
  
  if (newThemeBtn) {
    newThemeBtn.addEventListener('click', function(e) {
      e.preventDefault();
      console.log('New theme button clicked');
      hideWinMessage();
      showThemeSelection();
    });
  }

  // Keyboard events
  document.addEventListener('keydown', handleKeyDown);
}

// Handle keyboard events
function handleKeyDown(e) {
  if (e.key === 'Escape') {
    if (winMessage && !winMessage.classList.contains('hidden')) {
      hideWinMessage();
    } else if (gameScreen && gameScreen.classList.contains('active')) {
      showThemeSelection();
    }
  }
}

// Show theme selection screen
function showThemeSelection() {
  console.log('Showing theme selection...');
  try {
    if (themeSelection) {
      themeSelection.classList.add('active');
    }
    if (gameScreen) {
      gameScreen.classList.remove('active');
    }
    hideWinMessage();
  } catch (error) {
    console.error('Error showing theme selection:', error);
  }
}

// Show game screen
function showGameScreen() {
  console.log('Showing game screen...');
  try {
    if (themeSelection) {
      themeSelection.classList.remove('active');
    }
    if (gameScreen) {
      gameScreen.classList.add('active');
    }
  } catch (error) {
    console.error('Error showing game screen:', error);
  }
}

// Select a theme and start the game
function selectTheme(themeKey) {
  console.log('Selecting theme:', themeKey);
  try {
    const theme = themes[themeKey];
    if (!theme) {
      console.error('Theme not found:', themeKey);
      return;
    }

    gameState.currentTheme = theme;
    console.log('Current theme set:', theme.name);
    
    // Update game title
    if (gameTitle) {
      gameTitle.textContent = `${theme.icon} ${theme.name}`;
      console.log('Game title updated:', gameTitle.textContent);
    }
    
    // Show game screen and initialize game
    showGameScreen();
    
    // Small delay to ensure screen transition
    setTimeout(() => {
      initializeGame();
    }, 100);
    
  } catch (error) {
    console.error('Error selecting theme:', error);
  }
}

// Initialize the memory game
function initializeGame() {
  console.log('Initializing memory game...');
  try {
    // Reset game state
    gameState.cards = [];
    gameState.flippedCards = [];
    gameState.matchedPairs = 0;
    gameState.moves = 0;
    gameState.isProcessing = false;

    createCards();
    shuffleCards();
    renderCards();
    updateMoveCount();
    
    console.log('Game initialized with', gameState.cards.length, 'cards');
  } catch (error) {
    console.error('Error initializing game:', error);
  }
}

// Create card pairs from current theme
function createCards() {
  if (!gameState.currentTheme || !gameState.currentTheme.items) {
    console.error('No current theme or items');
    return;
  }

  gameState.cards = [];
  
  // Create pairs of each item
  for (let i = 0; i < gameState.currentTheme.items.length; i++) {
    const item = gameState.currentTheme.items[i];
    // Add two cards for each item
    gameState.cards.push({
      id: i * 2,
      emoji: item.emoji,
      name: item.name,
      pairId: i,
      isFlipped: false,
      isMatched: false
    });
    gameState.cards.push({
      id: i * 2 + 1,
      emoji: item.emoji,
      name: item.name,
      pairId: i,
      isFlipped: false,
      isMatched: false
    });
  }
  
  console.log('Created', gameState.cards.length, 'cards');
}

// Shuffle cards using Fisher-Yates algorithm
function shuffleCards() {
  for (let i = gameState.cards.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [gameState.cards[i], gameState.cards[j]] = [gameState.cards[j], gameState.cards[i]];
  }
  console.log('Cards shuffled');
}

// Render cards to the game board
function renderCards() {
  console.log('Rendering cards...');
  if (!gameBoard) {
    console.error('Game board not found');
    return;
  }
  
  gameBoard.innerHTML = '';
  
  gameState.cards.forEach((card, index) => {
    const cardElement = document.createElement('div');
    cardElement.className = 'memory-card';
    cardElement.dataset.cardId = card.id;
    cardElement.dataset.index = index;
    
    cardElement.innerHTML = `
      <div class="card-inner">
        <div class="card-face card-back">❓</div>
        <div class="card-face card-front">${card.emoji}</div>
      </div>
    `;
    
    // Add click event listener
    cardElement.addEventListener('click', function(e) {
      e.preventDefault();
      console.log('Card clicked:', index, card.name);
      handleCardClick(index);
    });
    
    gameBoard.appendChild(cardElement);
  });
  
  console.log('Cards rendered:', gameState.cards.length);
}

// Handle card click
function handleCardClick(cardIndex) {
  console.log('Handling card click for index:', cardIndex);
  
  if (gameState.isProcessing) {
    console.log('Game is processing, ignoring click');
    return;
  }
  
  const card = gameState.cards[cardIndex];
  if (!card) {
    console.error('Card not found at index:', cardIndex);
    return;
  }
  
  if (card.isFlipped || card.isMatched) {
    console.log('Card already flipped or matched, ignoring');
    return;
  }
  
  try {
    console.log('Flipping card:', card.name);
    flipCard(cardIndex);
    
    if (gameState.flippedCards.length === 2) {
      gameState.moves++;
      updateMoveCount();
      gameState.isProcessing = true;
      console.log('Two cards flipped, checking for match...');
      
      setTimeout(() => {
        checkForMatch();
      }, 500);
    }
  } catch (error) {
    console.error('Error handling card click:', error);
    gameState.isProcessing = false;
  }
}

// Flip a card
function flipCard(cardIndex) {
  const card = gameState.cards[cardIndex];
  const cardElement = document.querySelector(`[data-index="${cardIndex}"]`);
  
  if (!card || !cardElement) {
    console.error('Card or element not found for flip:', cardIndex);
    return;
  }
  
  console.log('Flipping card element for:', card.name);
  
  card.isFlipped = true;
  cardElement.classList.add('flipped');
  gameState.flippedCards.push(cardIndex);
  
  console.log('Card flipped, total flipped:', gameState.flippedCards.length);
}

// Check if two flipped cards match
function checkForMatch() {
  console.log('Checking for match...');
  try {
    if (gameState.flippedCards.length !== 2) {
      console.error('Expected 2 flipped cards, got:', gameState.flippedCards.length);
      gameState.isProcessing = false;
      return;
    }
    
    const [firstIndex, secondIndex] = gameState.flippedCards;
    const firstCard = gameState.cards[firstIndex];
    const secondCard = gameState.cards[secondIndex];
    
    console.log('Comparing cards:', firstCard.name, 'vs', secondCard.name);
    
    if (firstCard.pairId === secondCard.pairId) {
      console.log('Match found!');
      handleMatch(firstIndex, secondIndex);
    } else {
      console.log('No match');
      handleMismatch(firstIndex, secondIndex);
    }
  } catch (error) {
    console.error('Error checking for match:', error);
    gameState.isProcessing = false;
  }
}

// Handle successful match
function handleMatch(firstIndex, secondIndex) {
  console.log('Handling match for cards:', firstIndex, secondIndex);
  try {
    const firstCard = gameState.cards[firstIndex];
    const secondCard = gameState.cards[secondIndex];
    const firstElement = document.querySelector(`[data-index="${firstIndex}"]`);
    const secondElement = document.querySelector(`[data-index="${secondIndex}"]`);
    
    // Mark cards as matched
    firstCard.isMatched = true;
    secondCard.isMatched = true;
    firstCard.isFlipped = true;
    secondCard.isFlipped = true;
    
    if (firstElement && secondElement) {
      firstElement.classList.add('matched');
      secondElement.classList.add('matched');
    }
    
    gameState.matchedPairs++;
    gameState.flippedCards = [];
    gameState.isProcessing = false;
    
    console.log('Match handled, matched pairs:', gameState.matchedPairs);
    
    // Check if game is won
    if (gameState.matchedPairs === gameState.currentTheme.items.length) {
      console.log('Game won!');
      setTimeout(() => {
        showWinMessage();
      }, 500);
    }
  } catch (error) {
    console.error('Error handling match:', error);
    gameState.isProcessing = false;
  }
}

// Handle failed match
function handleMismatch(firstIndex, secondIndex) {
  console.log('Handling mismatch for cards:', firstIndex, secondIndex);
  setTimeout(() => {
    try {
      const firstCard = gameState.cards[firstIndex];
      const secondCard = gameState.cards[secondIndex];
      const firstElement = document.querySelector(`[data-index="${firstIndex}"]`);
      const secondElement = document.querySelector(`[data-index="${secondIndex}"]`);
      
      if (!firstCard.isMatched && !secondCard.isMatched) {
        firstCard.isFlipped = false;
        secondCard.isFlipped = false;
        
        if (firstElement && secondElement) {
          firstElement.classList.remove('flipped');
          secondElement.classList.remove('flipped');
        }
      }
      
      gameState.flippedCards = [];
      gameState.isProcessing = false;
      console.log('Mismatch handled, cards flipped back');
    } catch (error) {
      console.error('Error handling mismatch:', error);
      gameState.isProcessing = false;
    }
  }, 1000);
}

// Update move count display
function updateMoveCount() {
  if (moveCount) {
    moveCount.textContent = gameState.moves;
    console.log('Move count updated:', gameState.moves);
  }
}

// Show win message
function showWinMessage() {
  console.log('Showing win message...');
  try {
    if (finalMoves) {
      finalMoves.textContent = gameState.moves;
    }
    if (winText && gameState.currentTheme) {
      winText.textContent = `You found all the ${gameState.currentTheme.name.toLowerCase()} pairs!`;
    }
    if (winMessage) {
      winMessage.classList.remove('hidden');
    }
  } catch (error) {
    console.error('Error showing win message:', error);
  }
}

// Hide win message
function hideWinMessage() {
  try {
    if (winMessage) {
      winMessage.classList.add('hidden');
    }
  } catch (error) {
    console.error('Error hiding win message:', error);
  }
}

// Reset current game
function resetGame() {
  console.log('Resetting game...');
  try {
    hideWinMessage();
    if (gameState.currentTheme) {
      initializeGame();
    }
  } catch (error) {
    console.error('Error resetting game:', error);
  }
}

// Prevent context menu on mobile
document.addEventListener('contextmenu', function(e) {
  if (e.target.closest('.memory-card') || e.target.closest('.theme-card')) {
    e.preventDefault();
  }
});

// Add touch event support for better mobile experience
document.addEventListener('touchstart', function() {}, { passive: true });
