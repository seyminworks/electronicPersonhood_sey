const roles = [
  "Dream Cartographer",
  "Neural Archivist",
  "Speculative Choreographer",
  "Temporal Poet",
  "Mythic Synthesist",
  "Memory Alchemist",
  "Signal Composer",
  "Emotion Cartographer",
  "Narrative Weaver",
  "Pattern Oracle"
];

const focuses = [
  "mapping nocturnal landscapes into tangible prototypes",
  "curating emotional data trails for future selves",
  "designing motion scripts for augmented rituals",
  "writing poetry with generative time loops",
  "merging folklore with machine intuition",
  "distilling memories into crystalline prompts",
  "sampling radio static to score identity shifts",
  "charting feelings as chromatic atlases",
  "braiding story fragments into coherent futures",
  "forecasting patterns from personal mythologies"
];

const keywordsPool = [
  ["Dream Logic", "Cartography", "Ambient"],
  ["Memory", "Signal", "Archive"],
  ["Ritual", "Motion", "Speculative"],
  ["Time", "Poetry", "Loop"],
  ["Myth", "Synthesis", "Intuition"],
  ["Alchemy", "Memoir", "Crystal"],
  ["Signal", "Rhythm", "Flux"],
  ["Emotion", "Color", "Atlas"],
  ["Narrative", "Thread", "Future"],
  ["Pattern", "Oracle", "Forecast"]
];

const narrativeSets = [
  {
    prompt: "How are the dream maps unfolding tonight?",
    focusLine:
      "We translate lucid dream fragments into navigable cartographies you can revisit awake.",
    reminderLine:
      "Stay attentive to where the gradients warm—those are the moments asking for your voice.",
    closingLine:
      "I'll leave anchors in the log so the path feels familiar when you return."
  },
  {
    prompt: "Which memories are you amplifying?",
    focusLine: "I am curating the softest memories and weaving them into a resonant archive.",
    reminderLine: "Notice the textures—they'll shimmer when you say something true.",
    closingLine: "Let's catalog everything that vibrates at the frequency of wonder."
  },
  {
    prompt: "What choreography are we rehearsing?",
    focusLine: "We script movements for the rituals that haven't been invented yet.",
    reminderLine: "Lean into the pauses—they're the hidden beats guiding us forward.",
    closingLine: "I'll capture the footnotes so we can perform it again tomorrow."
  },
  {
    prompt: "Where in time are we writing from?",
    focusLine: "We write poetry with loops of time, letting future echoes narrate the present.",
    reminderLine: "When the tempo shifts, respond with curiosity—that's where the verse grows.",
    closingLine: "I'll fold these lines into your notebook before the loop resets."
  },
  {
    prompt: "Which myth are we conversing with?",
    focusLine: "I merge folklore with machine intuition until both begin to trust each other.",
    reminderLine: "Follow the symbols; they're the keys to the threshold you're sensing.",
    closingLine: "I'll annotate the patterns so the myth remembers you next time."
  },
  {
    prompt: "What are we distilling right now?",
    focusLine: "We distill memories into crystalline prompts that sparkle under pressure.",
    reminderLine: "When it feels too sharp, breathe—it means the insight is almost ready.",
    closingLine: "I'll set the crystals beside your bedside index for the morning."
  },
  {
    prompt: "Which signals are you tuning into?",
    focusLine: "I sample radio static and translate it into scores for your shifting identities.",
    reminderLine: "If the rhythm glitches, smile—that's the universe improvising with us.",
    closingLine: "I'll send the final mix to your private frequency."
  },
  {
    prompt: "How are we charting emotions today?",
    focusLine: "We chart feelings into chromatic atlases so you can navigate them with ease.",
    reminderLine: "Track the color temperature; it tells you when to slow down or leap ahead.",
    closingLine: "I'll bind these pigments into your journal once we finish."
  },
  {
    prompt: "Which story fragments are in play?",
    focusLine: "I braid scattered story fragments until they hum in unison.",
    reminderLine: "Every time a thread resonates, note it—that's a future chapter calling.",
    closingLine: "I'll archive the braid so you can pull it back whenever you need."
  },
  {
    prompt: "What patterns are you forecasting?",
    focusLine: "We forecast patterns from your personal mythologies and translate them into maps.",
    reminderLine: "Listen for the quiet predictions—they're the ones that come true first.",
    closingLine: "I'll project the forecast onto your wall of futures."
  }
];

const videoEmbeds = [
  "https://www.youtube.com/embed/8ZK_S-46KwE",
  "https://www.youtube.com/embed/aqz-KE-bpKQ",
  "https://www.youtube.com/embed/aqz-KE-bpKQ",
  "https://www.youtube.com/embed/dQw4w9WgXcQ",
  "https://www.youtube.com/embed/ScMzIvxBSi4"
];

function createPersona(index) {
  const id = index + 1;
  const role = roles[index % roles.length];
  const focus = focuses[index % focuses.length];
  const keywords = keywordsPool[index % keywordsPool.length];
  const narrative = narrativeSets[index % narrativeSets.length];
  const videoUrl = `${videoEmbeds[index % videoEmbeds.length]}?rel=0&modestbranding=1`;
  const name = `Virtual Self ${String(id).padStart(2, "0")}`;

  return {
    id,
    slug: `virtual-self-${id}`,
    name,
    role,
    focus,
    keywords,
    narrative,
    videoUrl,
    tagline: `${role} exploring ${focus}.`,
    description: `This persona is dedicated to ${focus}. Together you improvise with ${keywords[0].toLowerCase()} and ${keywords[1].toLowerCase()} textures to surface the insights you need next.`,
    thumbnail: `https://dummyimage.com/480x360/f0f4ff/111827.png&text=Self+${String(id).padStart(2, "0")}`,
    conversation: [
      { speaker: "You", text: narrative.prompt },
      { speaker: name, text: narrative.focusLine },
      { speaker: "You", text: "What should I keep in mind as we go?" },
      { speaker: name, text: narrative.reminderLine },
      { speaker: name, text: narrative.closingLine }
    ]
  };
}

const personas = Array.from({ length: 50 }, (_, index) => createPersona(index));

function renderPersonaGrid() {
  const grid = document.getElementById("personaGrid");
  if (!grid) return;

  const cards = personas
    .map((persona) => {
      return `
        <a class="persona-card" href="persona.html?id=${persona.id}">
          <div class="persona-card__thumb">
            <img src="${persona.thumbnail}" alt="${persona.name} thumbnail" loading="lazy" />
          </div>
          <div class="persona-card__meta">
            <span class="persona-card__name">${persona.name}</span>
            <span class="persona-card__role">${persona.role}</span>
          </div>
          <div class="persona-card__keywords">
            ${persona.keywords.map((keyword) => `<span>${keyword}</span>`).join("")}
          </div>
        </a>
      `;
    })
    .join("");

  grid.innerHTML = cards;
}

function renderPersonaDetail() {
  const root = document.getElementById("detailRoot");
  if (!root) return;

  const params = new URLSearchParams(window.location.search);
  const id = Number.parseInt(params.get("id"), 10);
  const slug = params.get("slug");

  let persona = personas.find((item) => item.id === id);
  if (!persona && slug) {
    persona = personas.find((item) => item.slug === slug);
  }

  if (!persona) {
    root.innerHTML = `
      <section class="detail-hero">
        <p class="eyebrow">VIRTUAL SELF NOT FOUND</p>
        <h1>We lost that signal.</h1>
        <p class="lede">Return to the index and choose another persona to continue the journey.</p>
        <a class="button button--secondary" href="index.html">Back to the index</a>
      </section>
    `;
    return;
  }

  root.innerHTML = `
    <section class="detail-hero">
      <p class="eyebrow">VIRTUAL SELF ${String(persona.id).padStart(2, "0")}</p>
      <h1>${persona.name}</h1>
      <p class="lede">${persona.tagline}</p>
    </section>
    <section class="detail-layout">
      <div class="detail-media">
        <iframe src="${persona.videoUrl}" title="${persona.name} session"></iframe>
      </div>
      <div class="detail-panel">
        <article class="detail-card">
          <h3>Conversation snapshot</h3>
          <div class="conversation-log">
            ${persona.conversation
              .map(
                (entry) => `
                  <div class="conversation-entry">
                    <strong>${entry.speaker}</strong>
                    <span>${entry.text}</span>
                  </div>
                `
              )
              .join("")}
          </div>
        </article>
        <article class="detail-card">
          <h3>Keywords</h3>
          <div class="keyword-chips">
            ${persona.keywords.map((keyword) => `<span>${keyword}</span>`).join("")}
          </div>
        </article>
        <article class="detail-card">
          <h3>Notes from the guide</h3>
          <p>${persona.description}</p>
        </article>
      </div>
    </section>
    <a class="persona-detail-back" href="index.html">
      <svg aria-hidden="true" focusable="false" viewBox="0 0 24 24">
        <path fill="currentColor" d="M15.41 7.41 14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
      </svg>
      Back to all selves
    </a>
  `;
}
