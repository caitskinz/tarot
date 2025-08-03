const TOTAL_OPTIONS = 78;
    const SPECIAL_PROBABILITY = 0.05;
    let deck = [];

    const optionNames = [
      "The Fool", "The Magician", "The High Priestess", "The Empress", "The Emperor",
      "The Hierophant", "The Lovers", "The Chariot", "Strength", "The Hermit",
      "Wheel of Fortune", "Justice", "The Hanged Man", "Death", "Temperance",
      "The Devil", "The Tower", "The Star", "The Moon", "The Sun",
      "Judgement", "The World",
      "Ace of Wands", "Two of Wands", "Three of Wands", "Four of Wands", "Five of Wands",
      "Six of Wands", "Seven of Wands", "Eight of Wands", "Nine of Wands", "Ten of Wands",
      "Page of Wands", "Knight of Wands", "Queen of Wands", "King of Wands",
      "Ace of Cups", "Two of Cups", "Three of Cups", "Four of Cups", "Five of Cups",
      "Six of Cups", "Seven of Cups", "Eight of Cups", "Nine of Cups", "Ten of Cups",
      "Page of Cups", "Knight of Cups", "Queen of Cups", "King of Cups",
      "Ace of Swords", "Two of Swords", "Three of Swords", "Four of Swords", "Five of Swords",
      "Six of Swords", "Seven of Swords", "Eight of Swords", "Nine of Swords", "Ten of Swords",
      "Page of Swords", "Knight of Swords", "Queen of Swords", "King of Swords",
      "Ace of Pentacles", "Two of Pentacles", "Three of Pentacles", "Four of Pentacles", "Five of Pentacles",
      "Six of Pentacles", "Seven of Pentacles", "Eight of Pentacles", "Nine of Pentacles", "Ten of Pentacles",
      "Page of Pentacles", "Knight of Pentacles", "Queen of Pentacles", "King of Pentacles"
    ];

    function shuffleDeck() {
      // Reset results
      document.getElementById('results').innerHTML = '';
      document.getElementById('shuffleStatus').textContent = 'Shuffling';
      disableDrawButtons(true);
      deck = [];

      // Fake shuffling animation
      let dots = 0;
      const anim = setInterval(() => {
        document.getElementById('shuffleStatus').textContent = 'Shuffling' + '.'.repeat(dots % 4);
        dots++;
      }, 300);

      // Simulate shuffling delay
      setTimeout(() => {
        clearInterval(anim);
        generateDeck();
        document.getElementById('shuffleStatus').textContent = 'Deck is ready! ✨';
        disableDrawButtons(false);
      }, 1800);
    }

    function generateDeck() {
      for (let i = 0; i < TOTAL_OPTIONS; i++) {
        const isSpecial = Math.random() < SPECIAL_PROBABILITY;
        const name = optionNames[i];
        deck[i] = { id: i + 1, name, isSpecial };
      }
    }

    function drawOptions(count) {
      const shuffled = [...deck].sort(() => 0.5 - Math.random());
      const drawn = shuffled.slice(0, count);

      let output = `<h2>Results (${count} drawn):</h2><ul>`;
      let specialCount = 0;

      drawn.forEach(opt => {
        const label = opt.isSpecial ? ` - <span class="special">SPECIAL</span>` : '';
        if (opt.isSpecial) specialCount++;
        output += `<li>${opt.name}${label}</li>`;
      });

      output += `</ul><p>✨ Special cards drawn: <strong>${specialCount}</strong> out of ${count}</p>`;
      document.getElementById('results').innerHTML = output;
    }

    function disableDrawButtons(disable) {
      document.querySelectorAll('.draw-button').forEach(btn => btn.disabled = disable);
    }
