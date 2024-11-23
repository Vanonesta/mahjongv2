const symbols = ["🍒", "🍋", "🍉", "⭐", "🔔"];
const creditsDisplay = document.getElementById("credits");
const totalBetDisplay = document.getElementById("totalBet");
const betAmountSelector = document.getElementById("betAmount");
const spinButton = document.getElementById("spinButton");
const maxBetButton = document.getElementById("maxBetButton");
const autoSpinButton = document.getElementById("autoSpinButton");
const toggleMusicButton = document.getElementById("toggleMusic");
const message = document.getElementById("message");
const backgroundMusic = document.getElementById("backgroundMusic");
const spinSound = document.getElementById("spinSound");
const winSound = document.getElementById("winSound");

let credits = 500;
let autoSpin = false;

// Update Credits
function updateCredits(amount) {
  credits += amount;
  creditsDisplay.textContent = credits;
}

// Spin the reels
function spinReels() {
  if (credits <= 0) {
    message.textContent = "Tidak cukup kredit!";
    return;
  }

  const betAmount = parseInt(betAmountSelector.value);
  if (credits < betAmount) {
    message.textContent = "Kredit tidak cukup untuk taruhan!";
    return;
  }

  updateCredits(-betAmount);

  // Spin the reels
  const reel1 = document.getElementById("reel1");
  const reel2 = document.getElementById("reel2");
  const reel3 = document.getElementById("reel3");
  spinSound.play();

  const results1 = spinReel(reel1);
  const results2 = spinReel(reel2);
  const results3 = spinReel(reel3);

  // Check for wins
  setTimeout(() => {
    const final1 = results1[1];
    const final2 = results2[1];
    const final3 = results3[1];
    if (final1 === final2 && final2 === final3) {
      message.textContent = "🎉 Anda Menang!";
      winSound.play();
      updateCredits(betAmount * 10);
    } else {
      message.textContent = "Coba lagi!";
    }
  }, 1000);
}

// Spin animation
function spinReel(reel) {
  const results = [
    symbols[Math.floor(Math.random() * symbols.length)],
    symbols[Math.floor(Math.random() * symbols.length)],
    symbols[Math.floor(Math.random() * symbols.length)],
  ];

  reel.innerHTML = results.map(symbol => `<div>${symbol}</div>`).join("");
  return results;
}

// Max Bet
maxBetButton.addEventListener("click", () => {
  betAmountSelector.value = "50";
  spinReels();
});

// Auto Spin
autoSpinButton.addEventListener("click", () => {
  autoSpin = !autoSpin;
  if (autoSpin) {
    message.textContent = "Auto Spin Aktif!";
    spinReels();
  }
});