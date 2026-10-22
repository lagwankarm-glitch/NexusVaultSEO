import { Game, CommunityReview } from '../types';

export const INITIAL_GAMES: Game[] = [
  {
    id: 'cyberpunk-phantom-liberty',
    title: 'Cyberpunk 2077: Phantom Liberty',
    tagline: 'A masterclass espionage thriller that redefines Night City.',
    category: 'Action RPG',
    developer: 'CD PROJEKT RED',
    publisher: 'CD PROJEKT RED',
    releaseYear: 2023,
    platforms: ['PC', 'PlayStation 5', 'Xbox Series X/S'],
    criticScore: 9.6,
    scoreBreakdown: {
      gameplay: 9.5,
      story: 9.8,
      visuals: 9.9,
      audio: 9.4,
      performance: 9.2,
    },
    coverImage: 'https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/2138330/header.jpg',
    coverAlt: 'Official poster art for Cyberpunk 2077: Phantom Liberty video game',
    heroBanner: 'https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/2138330/ss_5c4b46c61d7d1d5903835a68eac6582b4e62367f.1920x1080.jpg',
    heroBannerAlt: 'Cinematic panoramic screenshot of Cyberpunk 2077 Dogtown district at night',
    summary: 'A high-stakes spy thriller set in the claustrophobic, lawless combat zone of Dogtown. Overhauls police response, cyberware progression, vehicular combat, and delivers an unforgettable narrative featuring Idris Elba.',
    fullReview: `Phantom Liberty is the definitive realization of what Cyberpunk 2077 was destined to be. CD Projekt RED has crafted a gripping espionage narrative that thrusts V and Johnny Silverhand into the perilous orbit of FIA sleeper agent Solomon Reed (played with immense gravity by Idris Elba) and President Rosalind Myers.

The expansion is confined to Dogtown—a ruined, militarized enclave ruled with an iron fist by warlord Kurt Hansen. What it sacrifices in raw square mileage it replaces with unprecedented verticality, architectural grime, and dense storytelling. Every alleyway whispers secrets, and the multi-layered missions seamlessly integrate stealth, tactical hacking, and explosive shootouts.

Coupled with the systemic 2.0 overhaul—which reconstructed skill trees, introduced vehicle-mounted heavy weaponry, and replaced the passive stat-bloat armor system with meaningful cyberware limits—Phantom Liberty elevates the entire game into modern classic status.`,
    pros: [
      'Exceptional spy thriller narrative with agonizing moral dilemmas',
      'Dogtown offers unprecedented environmental density and vertical design',
      'Complete overhaul to cyberware limit mechanics and Relic skill branches',
      'Idris Elba delivers a charismatic, nuanced performance as Solomon Reed'
    ],
    cons: [
      'Very demanding ray-tracing hardware requirements at 4K resolution',
      'Minor driving physics hiccups in congested Dogtown alleys'
    ],
    performanceNotes: 'Runs at rock-solid 60 FPS in Performance Mode on PS5/XSX. PC benefits greatly from DLSS 3.5 Ray Reconstruction.',
    playtimeEstimate: '25 – 35 Hours',
    seo: {
      metaTitle: 'Cyberpunk 2077 Review: Phantom Liberty – Is It Worth It?',
      metaDescription: "Read our Cyberpunk 2077: Phantom Liberty review exploring Dogtown story, combat perks, and Idris Elba's role. See verified critic scores before you buy.",
      h1Heading: 'Cyberpunk 2077 Review: Phantom Liberty & Dogtown Breakdown',
      h2Heading: 'Cyberpunk 2077 Gameplay: Is Phantom Liberty Worth Playing in 2026?',
      h3Heading: 'Cyberpunk 2077 Cyberware & Relic Perks: How Does Combat Evolve?',
      targetKeyword: 'Cyberpunk 2077 Review',
      canonicalSlug: '/review/cyberpunk-phantom-liberty',
      searchSnippetCta: 'See verified critic scores before you buy.',
      aeoQuestions: [
        {
          question: 'Is Cyberpunk 2077: Phantom Liberty worth playing if you never finished the original story?',
          answer: 'Yes. Phantom Liberty completely revitalizes Cyberpunk 2077 with restructured cyberware progression, high-octane vehicle combat, and an independent spy-thriller storyline set in the lawless walled district of Dogtown. You can jump directly into the expansion using a pre-configured character, enjoying a focused 30-hour campaign starring Idris Elba with zero obligation to replay early base game segments.',
          targetIntent: 'Purchase Consideration & Barrier-to-Entry Query'
        },
        {
          question: 'How long does it take to beat Cyberpunk 2077: Phantom Liberty?',
          answer: 'Beating the main espionage narrative takes between 18 and 22 hours for focused playthroughs. Players pursuing every Dogtown fixer gig, Relic data terminal, vehicle drop delivery, and unlocking all four narrative endings will spend between 30 and 38 hours of gameplay.',
          targetIntent: 'Playtime & Completionist Time Estimation Query'
        }
      ]
    }
  },
  {
    id: 'elden-ring-erdtree',
    title: 'Elden Ring: Shadow of the Erdtree',
    tagline: 'A monumental expansion that redefines scale and challenge.',
    category: 'Souls-like',
    developer: 'FromSoftware Inc.',
    publisher: 'Bandai Namco Entertainment',
    releaseYear: 2024,
    platforms: ['PC', 'PlayStation 5', 'PlayStation 4', 'Xbox Series X/S'],
    criticScore: 9.8,
    scoreBreakdown: {
      gameplay: 9.9,
      story: 9.6,
      visuals: 9.8,
      audio: 9.9,
      performance: 9.4,
    },
    coverImage: 'https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/2778580/header.jpg',
    coverAlt: 'Official game capsule poster for Elden Ring: Shadow of the Erdtree',
    heroBanner: 'https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/2778580/ss_96ffdd7a8cffcc1858a2a5ad6c04f9812984592a.1920x1080.jpg',
    heroBannerAlt: 'Miquella looking towards the burning Scadutree in the Realm of Shadow',
    summary: 'Guided by Empyrean Miquella, players step into the Realm of Shadow—a clandestine continent dripping with ancient tragedy, punishing bosses, and brilliant new weapon categories.',
    fullReview: `FromSoftware has defied expectations once again. Rather than providing a standard bite-sized DLC, Shadow of the Erdtree is functionally the size of a standalone full-budget sequel. The Realm of Shadow is an interconnected topological puzzle, where seemingly inaccessible ravines and floating ruins reveal subterranean cathedrals through sheer exploration curiosity.

The Scadutree Blessing progression system cleverly resets player overpower tendencies, ensuring that even level 150 veterans face authentic, pulse-pounding stakes. Combat is infused with eight completely new weapon archetypes—including bare-knuckle Hand-to-Hand arts, throwing blades, and swift Light Greatswords—unlocking deep build variety.

Boss encounters like Messmer the Impaler and Rellana, Twin Moon Knight, showcase FromSoftware at the pinnacle of their craft: punishing, visually mesmerizing, and backed by Tsukasa Saitoh's thunderous orchestral compositions.`,
    pros: [
      'Staggering vertical map topology that rewards inquisitive exploration',
      '8 brand-new weapon classes inject immense novelty into buildcrafting',
      'Awe-inspiring boss battles that rank among FromSoftware\'s absolute finest',
      'Haunting environmental art and lore reveals regarding Queen Marika'
    ],
    cons: [
      'Late-game boss aggression and camera tracking can induce extreme frustration',
      'Scadutree fragment collecting is essentially mandatory to survive'
    ],
    performanceNotes: 'Performance mode maintains consistent 60 FPS on current-gen consoles. PC stutters remain minimal after latest patches.',
    playtimeEstimate: '40 – 60 Hours',
    seo: {
      metaTitle: "Elden Ring Erdtree Review: FromSoftware's Ultimate DLC",
      metaDescription: 'Explore our Elden Ring: Shadow of the Erdtree review covering map scale, brutal boss fights, and new weapons. Discover why it scores 9.8 before starting.',
      h1Heading: 'Elden Ring Erdtree Review: Realm of Shadow Bosses & Map Analysis',
      h2Heading: 'Elden Ring Erdtree Boss Fights: How Punishing Is the Shadow Realm?',
      h3Heading: 'Elden Ring Erdtree Exploration: Why Scadutree Blessings Are Essential',
      targetKeyword: 'Elden Ring Erdtree Review',
      canonicalSlug: '/review/elden-ring-erdtree',
      searchSnippetCta: 'Discover why it scores 9.8 before starting.',
      aeoQuestions: [
        {
          question: 'What character level should you be before entering Elden Ring: Shadow of the Erdtree?',
          answer: 'Players should enter the Realm of Shadow at character level 120 to 150 with at least 50 to 60 Vigor and maximum +25 regular (+10 Somber) weapons. However, raw character level matters far less than discovering Scadutree Fragments within the DLC, which grant percentage-based damage reduction and attack output boosts specifically calibrated for Shadow of the Erdtree bosses.',
          targetIntent: 'Level Requirement & Difficulty Preparation Query'
        },
        {
          question: 'How large is the Elden Ring: Shadow of the Erdtree map compared to the base game?',
          answer: 'The Realm of Shadow equals the physical landmass of Limgrave, Liurnia, and Caelid combined, but features substantially higher vertical density. Multi-tiered ravines, concealed river descents, subterranean abyssal forests, and towering mountain keeps create an interconnected 3D labyrinth that feels vastly larger in practice than its 2D map indicates.',
          targetIntent: 'Map Scale & Exploration Scope Query'
        }
      ]
    }
  },
  {
    id: 'hades-2',
    title: 'Hades II',
    tagline: 'An intoxicating descent into witchcraft, darkness, and time.',
    category: 'Indie',
    developer: 'Supergiant Games',
    publisher: 'Supergiant Games',
    releaseYear: 2024,
    platforms: ['PC', 'Steam Deck'],
    criticScore: 9.5,
    scoreBreakdown: {
      gameplay: 9.7,
      story: 9.5,
      visuals: 9.8,
      audio: 9.8,
      performance: 9.9,
    },
    coverImage: 'https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1145350/header.jpg',
    coverAlt: 'Official Steam store cover art for Hades II showing Princess Melinoë',
    heroBanner: 'https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1145350/ss_78f1681a28a3f55ba6279f64bf633d7350aa1e64.1920x1080.jpg',
    heroBannerAlt: 'Melinoë channeling nocturnal witchcraft against Underworld shades',
    summary: 'Battle beyond the Underworld using dark sorcery as Melinoë, Princess of the Underworld, facing the Titan of Time in a spellbinding, responsive roguelite experience.',
    fullReview: `Sequels are notoriously treacherous territory for genre-defining indie darlings, yet Supergiant Games has managed to expand and enrich Hades without diluting its magic. As Melinoë, sister to Zagreus, combat transitions from pure twitch-dash reflexes to calculated spellcasting and area control.

The addition of the magical Omega casting system introduces tactical deliberation: holding attack or special commands charges devastating witch runes that trap charging foes. The narrative premise—Chronos escaping Tartarus and capturing Olympus—splits your journey across subterranean descents and treacherous surface ascents toward Mount Olympus.

Jen Zee's hand-painted mythological character designs are as lustrous as ever, while Darren Korb's Mediterranean rock soundtrack pulsates through every biome with hypnotic ferocity.`,
    pros: [
      'Magical Omega cast mechanics add profound strategic depth over dash-spam',
      'Dual route progression (Underworld and Surface) effectively doubles content',
      'Spellbinding visual art style and legendary musical score by Darren Korb',
      'Flawless 90Hz+ performance on handhelds including Steam Deck'
    ],
    cons: [
      'Early material gathering for cauldron incantations can feel grindy',
      'Certain elemental boons currently overshadow other builds'
    ],
    performanceNotes: 'Flawlessly optimized. Runs at native 4K 144Hz with negligible system load.',
    playtimeEstimate: '50 – 80 Hours',
    seo: {
      metaTitle: "Hades 2 Review: Melinoe's Witchcraft Rogue-lite Verdict",
      metaDescription: "Discover our in-depth Hades 2 review detailing Melinoë's witchcraft combat, Olympian boons, and performance. Read community verdicts to master every run.",
      h1Heading: "Hades 2 Review: Melinoe's Witchcraft Mechanics & Underworld Odyssey",
      h2Heading: "Hades 2 Combat Mechanics: How Melinoe Differs from Zagreus",
      h3Heading: "Hades 2 Omega Casts: How Magic Boons Reshape Every Escape Attempt",
      targetKeyword: 'Hades 2 Review',
      canonicalSlug: '/review/hades-2',
      searchSnippetCta: 'Read community verdicts to master every run.',
      aeoQuestions: [
        {
          question: 'How does combat in Hades 2 differ from the original Hades with Zagreus?',
          answer: 'Combat in Hades 2 evolves from Zagreus\'s twitch-reflex dash striking into strategic crowd control and magical area denial. Melinoë channels Magick to charge Omega versions of her basic Attacks, Specials, and Casts. Rather than a projectile, her Cast lays a circular binding rune that immobilizes foes, demanding calculated spatial management across subterranean and surface routes.',
          targetIntent: 'Combat Comparison & Gameplay Evolution Query'
        },
        {
          question: 'Do you need to play Hades 1 before playing Hades 2?',
          answer: 'No prior playthrough is required. Hades 2 features an independent storyline where Melinoë seeks to liberate her family from Chronos, the Titan of Time. An extensive in-game Book of Shadows codex explains Greek mythological pantheons and character histories as you encounter them, making it welcoming for newcomers.',
          targetIntent: 'Story Prerequisite & Franchise Entry Query'
        }
      ]
    }
  },
  {
    id: 'helldivers-2',
    title: 'HELLDIVERS™ 2',
    tagline: 'Pure, unadulterated cooperative madness in the name of Democracy.',
    category: 'Shooter',
    developer: 'Arrowhead Game Studios',
    publisher: 'PlayStation Publishing LLC',
    releaseYear: 2024,
    platforms: ['PC', 'PlayStation 5'],
    criticScore: 9.0,
    scoreBreakdown: {
      gameplay: 9.4,
      story: 8.5,
      visuals: 8.9,
      audio: 9.3,
      performance: 8.7,
    },
    coverImage: 'https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/553850/header.jpg',
    coverAlt: 'Official cover poster of Helldivers 2 soldiers deploying on alien planet',
    heroBanner: 'https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/553850/ss_49e89d81b9e28dc5676722d3b2ce2dc19f448c34.1920x1080.jpg',
    heroBannerAlt: 'Helldivers squad calling down orbital strike stratagem against Terminid swarm',
    summary: 'Join the Helldivers and fight for freedom across a hostile galaxy in a fast, frantic, and ferocious third-person cooperative extraction shooter.',
    fullReview: `HELLDIVERS 2 achieved the impossible: making friendly fire and catastrophic blunders the funniest part of an intense tactical shooter. Shifting from the top-down perspective of the 2015 original to an over-the-shoulder third-person camera was an inspired choice that immerses players directly in the visceral mud, blood, and laser fire of galactic warfare.

Calling down 500kg orbital bombs via directional D-pad stratagems under the assault of towering Automaton Hulks or skittering Terminid Bile Titans provides an unmatched adrenaline rush. The satirical Super Earth propaganda universe is executed with dry comedic perfection.

Crucially, the live-service Galactic War meta—steered dynamically by Arrowhead's Game Master—unifies hundreds of thousands of players around shared community objectives and defense campaigns.`,
    pros: [
      'The most exhilarating and hilarious co-op multiplayer gameplay in years',
      'Stratagem call-in inputs create palpable tension in the heat of combat',
      'Stunning particle effects, volumetric fog, and environmental destruction',
      'Ingenious live community meta steered by real-time game mastering'
    ],
    cons: [
      'Occasional connection dropouts during peak global operations',
      'Solo play is significantly less viable and lacks team revival mechanics'
    ],
    performanceNotes: 'Cross-play runs cleanly at 60 FPS on PS5. PC requires balanced settings for stable framerates on heavy swarm waves.',
    playtimeEstimate: '60 – 100+ Hours',
    seo: {
      metaTitle: 'Helldivers 2 Review: Best Co-op Shooter of the Year?',
      metaDescription: "Our Helldivers 2 review breaks down squad combat, galactic war mechanics, and orbital stratagems. Find out if it is worth your squad's time before jumping in.",
      h1Heading: 'Helldivers 2 Review: Co-op Squad Tactics & Galactic War Verdict',
      h2Heading: 'Helldivers 2 Multiplayer Combat: Stratagems, Armor & Friendly Fire',
      h3Heading: 'Helldivers 2 Galactic Meta: Defending Super Earth Against Bug Swarms',
      targetKeyword: 'Helldivers 2 Review',
      canonicalSlug: '/review/helldivers-2',
      searchSnippetCta: "Find out if it is worth your squad's time before jumping in.",
      aeoQuestions: [
        {
          question: 'Can you play Helldivers 2 solo without matchmaking?',
          answer: 'While Helldivers 2 allows solo deployments by toggling privacy settings to Friends Only, the experience is explicitly tuned for cooperative squads. Low difficulty tiers (1–3) are manageable alone, but suicide and helldive difficulty levels (7–10) deploy armored chargers, bile titans, and automaton striders that require cross-fire, shared ammunition backpacks, and synchronized orbital stratagems.',
          targetIntent: 'Solo vs Squad Viability Query'
        },
        {
          question: 'How does the ongoing Galactic War and Major Order system operate?',
          answer: 'The Galactic War is a persistent online campaign orchestrated by a human Game Master at Arrowhead. Every mission completed adds liberation points to targeted planetary sectors. Weekly Major Orders issue high-priority sector defenses that reward thousands of Requisition Slips and Medals if community-wide objectives succeed before the clock expires.',
          targetIntent: 'Live Service Campaign & Progression Query'
        }
      ]
    }
  },
  {
    id: 'baldurs-gate-3',
    title: "Baldur's Gate 3",
    tagline: 'The undisputed gold standard of modern reactive role-playing.',
    category: 'CRPG',
    developer: 'Larian Studios',
    publisher: 'Larian Studios',
    releaseYear: 2023,
    platforms: ['PC', 'PlayStation 5', 'Xbox Series X/S'],
    criticScore: 9.9,
    scoreBreakdown: {
      gameplay: 9.8,
      story: 10.0,
      visuals: 9.7,
      audio: 9.9,
      performance: 9.3,
    },
    coverImage: 'https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1086940/header.jpg',
    coverAlt: "Official key artwork poster for Baldur's Gate 3 featuring core companions",
    heroBanner: 'https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1086940/ss_91d4e022cf3315a6b0cfa0b3a165b4526d1fa781.1920x1080.jpg',
    heroBannerAlt: "Baldur's Gate 3 adventuring party standing over burning nautiloid wreckage",
    summary: 'Gather your party and return to the Forgotten Realms in a tale of fellowship, betrayal, sacrifice, survival, and the lure of absolute power.',
    fullReview: `Larian Studios did not just adapt Dungeons & Dragons Fifth Edition; they set a high-water mark for video game storytelling and emergent agency that will be studied for decades. From the very opening nautiloid crash to the sprawling urban intrigue of Baldur's Gate proper, player choice permeates every square inch of the world.

Whether resolving conflicts through silvery persuasion, telekinetic barrel explosions, wild-shaping into an owlbear, or speaking to fallen corpses, virtually no creative solution is rejected by the engine.

The companions—from Neil Newbon's heart-wrenching, theatrical portrayal of Astarion to Shadowheart's deeply personal crisis of faith—feel alive with genuine personal aspirations, romance, and vulnerability.`,
    pros: [
      'Unfathomable narrative reactivity: every quest adapts to your whims',
      'World-class voice performances and motion capture across all companions',
      'Inventive turn-based combat that rewards environmental physics mastery',
      'Seamless 4-player drop-in co-op campaign support'
    ],
    cons: [
      'Inventory management across party members can turn into a chore',
      'Act 3 city density can stress CPU processing on older hardware'
    ],
    performanceNotes: 'FSR / DLSS implementation is top-notch. High-end PC and consoles maintain smooth turn resolutions.',
    playtimeEstimate: '90 – 140 Hours',
    seo: {
      metaTitle: "Baldur's Gate 3 Review: The Gold Standard RPG Rated",
      metaDescription: 'Dive into our Baldur\'s Gate 3 review examining companion quests, D&D 5e combat choices, and replayability. Explore full ratings before creating your hero.',
      h1Heading: "Baldur's Gate 3 Review: D&D 5e Mechanics & Companion Storylines",
      h2Heading: 'Baldur\'s Gate 3 Narrative Reactivity: How Your Choices Alter the Ending',
      h3Heading: 'Baldur\'s Gate 3 Tactical Combat: Turn-Based Strategy and Synergies',
      targetKeyword: "Baldur's Gate 3 Review",
      canonicalSlug: '/review/baldurs-gate-3',
      searchSnippetCta: 'Explore full ratings before creating your hero.',
      aeoQuestions: [
        {
          question: 'Do you need prior experience with Dungeons & Dragons 5e to play Baldur\'s Gate 3?',
          answer: 'No tabletop experience is necessary. Baldur\'s Gate 3 automatically calculates all underlying D20 rolls, proficiency modifiers, armor class checks, and spell slots in real time. Tooltips explicitly translate mechanical terms like Advantage, Concentration, and Saving Throws into readable status bars and percentage-based hit chances.',
          targetIntent: 'Ruleset Complexity & Beginner Accessibility Query'
        },
        {
          question: 'How many distinct narrative endings and branching storylines exist in Baldur\'s Gate 3?',
          answer: 'Larian Studios confirmed over 17,000 narrative variations based on key story decisions, companion romance outcomes, Mind Flayer tadpole power usage, and final city allegiances. Major branching arcs in Act 2 and Act 3 ensure that alternate character classes, morality choices, and Origin character selections yield entirely unique dialogue branches.',
          targetIntent: 'Replayability & Narrative Branching Query'
        }
      ]
    }
  },
  {
    id: 'black-myth-wukong',
    title: 'Black Myth: Wukong',
    tagline: 'A mythical Chinese action tour-de-force of sheer visual brilliance.',
    category: 'Action RPG',
    developer: 'Game Science',
    publisher: 'Game Science',
    releaseYear: 2024,
    platforms: ['PC', 'PlayStation 5'],
    criticScore: 8.9,
    scoreBreakdown: {
      gameplay: 9.0,
      story: 8.7,
      visuals: 9.9,
      audio: 9.1,
      performance: 8.4,
    },
    coverImage: 'https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/2358720/header.jpg',
    coverAlt: 'Official poster art of the Destined One holding quarterstaff in Black Myth: Wukong',
    heroBanner: 'https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/2358720/ss_017b2b8e3ad5d37803ae8d2c0b62b3df058bca16.1920x1080.jpg',
    heroBannerAlt: 'The Destined One clashing weapons against a giant mythological yaoguai boss',
    summary: 'Embark as the Destined One into Journey to the West folklore. Unravel the obscure truth beneath the veil of a glorious legend through fluid staff martial arts.',
    fullReview: `Game Science's debut full-scale action spectacle is an undeniable technical triumph. Harnessing Unreal Engine 5's Nanite and Lumen technology, Black Myth: Wukong renders ancient temples, misty bamboo forests, and snow-draped cliffs with photographic fidelity.

Combat revolves around the Destined One's versatile quarterstaff styles (Smash, Pillar, and Thrust stances) paired with mystical spells: immobilizing adversaries in mid-strike, summoning spectral clones of himself, or transforming into defeated yaoguai chiefs to unleash monstrous elemental counters.

With over 80 distinct boss encounters, the rhythm of combat rarely stagnates. While navigation lacks a traditional mini-map and occasionally collides with invisible terrain barriers, the mythological grandeur is captivating.`,
    pros: [
      'Jaw-dropping Unreal Engine 5 visual fidelity and cultural artistry',
      'Fluid, acrobatic staff combat with responsive parries and stance changes',
      'Tremendous boss variety with cinematic transformations and patterns',
      'Rich mythological grounding in the classic Journey to the West novel'
    ],
    cons: [
      'Inconsistent level boundaries and lack of in-game navigation aids',
      'Frame pacing and input latency on PS5 Performance mode before patch'
    ],
    performanceNotes: 'Unreal Engine 5 requires modern GPU power. Frame Generation mode recommended on PC.',
    playtimeEstimate: '35 – 50 Hours',
    seo: {
      metaTitle: 'Black Myth Wukong Review: Epic Mythological Combat',
      metaDescription: 'Comprehensive Black Myth: Wukong review analyzing Unreal Engine 5 visuals, 80+ boss encounters, and staff stances. Check our breakdown before playing.',
      h1Heading: 'Black Myth Wukong Review: Unreal Engine 5 Combat & Boss Analysis',
      h2Heading: 'Black Myth Wukong Staff Stances: Mastering Smash, Pillar, and Thrust',
      h3Heading: 'Black Myth Wukong Yaoguai Bosses: How Difficult Is the Mythological Gauntlet?',
      targetKeyword: 'Black Myth Wukong Review',
      canonicalSlug: '/review/black-myth-wukong',
      searchSnippetCta: 'Check our breakdown before playing.',
      aeoQuestions: [
        {
          question: 'Is Black Myth: Wukong considered a pure Souls-like or a character action RPG?',
          answer: 'Black Myth: Wukong blends Souls-like stamina discipline and high boss difficulty with fast-paced character action dynamics akin to modern God of War. Importantly, players do not forfeit earned experience (Will) upon dying, and combat focuses on fluid evasion, three staff stance transitions, and magical transformations rather than slow shield parrying.',
          targetIntent: 'Genre Classification & Difficulty Mechanics Query'
        },
        {
          question: 'How many unique boss encounters are in Black Myth: Wukong?',
          answer: 'Black Myth: Wukong features over 80 distinct boss encounters divided among Yaoguai Chiefs, Yaoguai Kings, and optional secret mythological deities. Each confrontation features bespoke motion capture, unique attack cadences, and elemental counters without repetitive reskins.',
          targetIntent: 'Boss Count & Content Variety Query'
        }
      ]
    }
  }
];

export const INITIAL_COMMUNITY_REVIEWS: CommunityReview[] = [
  {
    id: 'cr-1',
    gameId: 'cyberpunk-phantom-liberty',
    user: 'KuroNeko_99',
    avatarColor: 'from-cyan-500 to-blue-600',
    score: 9.8,
    hours: 125,
    platform: 'PC',
    date: '2 days ago',
    headline: 'Dogtown set the new bar for expansion storytelling.',
    text: 'I didn\'t expect Phantom Liberty to completely usurp the base campaign, but Solomon Reed\'s story arc broke my heart. The gunplay is tight, vehicle shootouts feel like Mad Max meets Blade Runner, and the new ending option left me staring at the credits for twenty minutes.',
    recommended: true,
    playstyle: 'Lore Hunter',
    difficulty: 'Challenging',
    likes: 64
  },
  {
    id: 'cr-2',
    gameId: 'cyberpunk-phantom-liberty',
    user: 'ViperSamurai',
    avatarColor: 'from-purple-500 to-indigo-600',
    score: 9.2,
    hours: 80,
    platform: 'PlayStation 5',
    date: '4 days ago',
    headline: 'The 2.0 overhaul makes cyberware feel truly dangerous.',
    text: 'Building a Sandevistan ninja assassin build with the new air dash and relic perks was pure dopamine. Dogtown has so much verticality you can jump through apartment roofs. Worth every cent.',
    recommended: true,
    playstyle: 'Hardcore',
    difficulty: 'Balanced',
    likes: 38
  },
  {
    id: 'cr-3',
    gameId: 'elden-ring-erdtree',
    user: 'TarnishedScholar',
    avatarColor: 'from-amber-500 to-red-600',
    score: 9.9,
    hours: 180,
    platform: 'PC',
    date: 'Yesterday',
    headline: 'Unreal level design that puts other open worlds to shame.',
    text: 'The way the Land of Shadow folds into itself is pure architectural sorcery. You look down a cliff expecting a kill barrier, and 4 hours later you\'ve discovered a subterranean Abyssal Woods. Messmer was an all-time classic boss fight.',
    recommended: true,
    playstyle: 'Completionist',
    difficulty: 'Punishing',
    likes: 112
  },
  {
    id: 'cr-4',
    gameId: 'elden-ring-erdtree',
    user: 'ShieldAndSpear',
    avatarColor: 'from-emerald-500 to-teal-600',
    score: 8.8,
    hours: 95,
    platform: 'PlayStation 5',
    date: '1 week ago',
    headline: 'Masterpiece world, but final boss hitboxes need tuning.',
    text: 'Exploration and atmosphere are 10/10. The martial arts weapons are absurdly fun. However, the final boss\'s phase 2 holy light spam makes the camera lose focus constantly. Still a required experience.',
    recommended: true,
    playstyle: 'Casual',
    difficulty: 'Punishing',
    likes: 47
  },
  {
    id: 'cr-5',
    gameId: 'hades-2',
    user: 'MoonlightWitch',
    avatarColor: 'from-fuchsia-500 to-pink-600',
    score: 9.6,
    hours: 62,
    platform: 'Steam Deck',
    date: '3 days ago',
    headline: 'Melinoë\'s Omega moves feel miles ahead of Zagreus.',
    text: 'The cast mechanic was something I barely used in Hades 1, but here it\'s essential crowd control. Charging up your moon spells while dodging Sirens in Oceanus with Darren Korb\'s vocals blasting is gaming perfection.',
    recommended: true,
    playstyle: 'Lore Hunter',
    difficulty: 'Balanced',
    likes: 53
  },
  {
    id: 'cr-6',
    gameId: 'helldivers-2',
    user: 'Citizen_7781',
    avatarColor: 'from-yellow-500 to-amber-600',
    score: 9.0,
    hours: 145,
    platform: 'PC',
    date: '5 days ago',
    headline: 'Managed Democracy never felt so patriotic.',
    text: 'Dropping into Malevelon Creek while laser fire shears down your squad\'s mech suits is cinematic perfection. Yes, random disconnects can sting, but nothing matches 4 friends taking down a factory strider.',
    recommended: true,
    playstyle: 'Casual',
    difficulty: 'Challenging',
    likes: 79
  },
  {
    id: 'cr-7',
    gameId: 'baldurs-gate-3',
    user: 'D20_CritMaster',
    avatarColor: 'from-red-500 to-rose-600',
    score: 10.0,
    hours: 240,
    platform: 'PC',
    date: '1 week ago',
    headline: 'I have 3 concurrent playthroughs and each is unique.',
    text: 'The depth of player agency in this game has ruined other RPGs for me. My Oathbreaker Paladin had a completely different story than my chaotic Bard. Astarion and Karlach are forever in my gaming hall of fame.',
    recommended: true,
    playstyle: 'Completionist',
    difficulty: 'Balanced',
    likes: 126
  },
  {
    id: 'cr-8',
    gameId: 'black-myth-wukong',
    user: 'DestinedMonkey',
    avatarColor: 'from-orange-500 to-yellow-600',
    score: 9.1,
    hours: 70,
    platform: 'PlayStation 5',
    date: '4 days ago',
    headline: 'Visually the most jaw-dropping action game of the decade.',
    text: 'The boss variety here is insane—almost every 30 minutes you fight something totally distinct. Stance switching and freeze spells keep combat snappy and satisfying. Just wish invisible walls were clearly marked.',
    recommended: true,
    playstyle: 'Hardcore',
    difficulty: 'Challenging',
    likes: 41
  }
];
