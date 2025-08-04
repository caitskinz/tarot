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
    document.getElementById('results').innerHTML = '';
    document.getElementById('shuffleStatus').textContent = 'Shuffling the deck...';
    disableDrawButtons(true);
    deck = [];

    const scatterContainer = document.getElementById('deckContainer');
    const stackContainer = document.getElementById('deckStack');
    scatterContainer.innerHTML = '';
    stackContainer.innerHTML = '';

    const cardCount = 30;
    const restackStartTime = 3500;
    const restackDuration = 2000;

    const cards = [];

    for (let i = 0; i < cardCount; i++) {
      const card = document.createElement('div');
      card.className = 'card';
      scatterContainer.appendChild(card);
      cards.push(card);

      setTimeout(() => {
        card.classList.add('animate');
        card.style.transform = `translate(-50%, -50%) translate(${Math.random() * 200 - 100}px, ${Math.random() * 40 - 20}px) rotate(${Math.random() * 60 - 30}deg)`;
      }, i * 80);
    }

    setTimeout(() => {
      cards.forEach((card, i) => {
        setTimeout(() => {
          card.classList.add('restack');
        }, i * 20);
      });
    }, restackStartTime);

    setTimeout(() => {
      scatterContainer.innerHTML = '';

      for (let i = 0; i < 8; i++) {
        const card = document.createElement('div');
        card.className = 'deck-card';
        card.style.zIndex = i;
        card.style.top = `${i * 1.5}px`;
        stackContainer.appendChild(card);
      }

      document.getElementById('shuffleStatus').textContent = 'Deck is ready! ✨';
      disableDrawButtons(false);
    }, restackStartTime + restackDuration);
  }

  function generateDeck() {
    for (let i = 0; i < TOTAL_OPTIONS; i++) {
      const isSpecial = Math.random() < SPECIAL_PROBABILITY;
      deck[i] = { id: i + 1, name: optionNames[i], isSpecial };
    }
  }

  function drawOptions(count) {
    generateDeck();
    const shuffled = [...deck].sort(() => 0.5 - Math.random());
    const drawn = shuffled.slice(0, count);

    let output = `<h2>Results (${count} card spread):</h2><ul>`;
    let specialCount = 0;

    drawn.forEach(opt => {
      const label = opt.isSpecial ? ` - <span class="special">✨INVERTED✨</span>` : '';
      if (opt.isSpecial) specialCount++;
      output += `<li>${opt.name}${label}</li>`;
    });

    output += `</ul><p>✨ Inverted cards drawn: <strong>${specialCount}</strong> out of ${count}</p>`;
    document.getElementById('results').innerHTML = output;
  }

  function disableDrawButtons(disable) {
    document.querySelectorAll('.draw-button').forEach(btn => btn.disabled = disable);
  }
