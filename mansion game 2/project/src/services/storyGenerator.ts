import { GameStory, Suspect, Difficulty } from '../types';

const settings = [
  {
    name: "Ravenwood Manor",
    description: "A gothic Victorian mansion shrouded in mist",
    atmosphere: "Thunder crashes outside as shadows dance in candlelight"
  },
  {
    name: "The Midnight Express",
    description: "A luxury train speeding through the snowy mountains",
    atmosphere: "The train rocks gently as snow pelts the windows"
  },
  {
    name: "Blackwater Lodge",
    description: "An isolated ski resort during a fierce blizzard",
    atmosphere: "Wind howls through the pines as the fire crackles"
  },
  {
    name: "The Crimson Rose",
    description: "An elegant cruise ship in the middle of the ocean",
    atmosphere: "Waves crash against the hull under a starless sky"
  },
  {
    name: "Ashford Academy",
    description: "A prestigious boarding school during winter break",
    atmosphere: "Empty halls echo with footsteps and whispered secrets"
  }
];

const victims = [
  { name: "Eleanor Sterling", role: "Wealthy Heiress", background: "Known for her ruthless business dealings and family secrets" },
  { name: "Professor Marcus Blackthorne", role: "Renowned Archaeologist", background: "Recently discovered something that could ruin several careers" },
  { name: "Victoria Ashworth", role: "Famous Opera Singer", background: "Her voice could enchant anyone, but her secrets were deadly" },
  { name: "Lord Reginald Pemberton", role: "Aristocratic Collector", background: "His collection included more than just art and antiques" },
  { name: "Dr. Catherine Morse", role: "Brilliant Scientist", background: "Her research into human behavior had dangerous implications" }
];

const suspectTemplates = [
  {
    roles: ["Butler", "Maid", "Chef", "Gardener", "Secretary"],
    motives: ["Financial desperation", "Years of mistreatment", "Blackmail", "Protecting family", "Revenge for humiliation"],
    personalities: ["Nervous and defensive", "Emotional and secretive", "Hot-tempered and proud", "Quiet and observant", "Charming but manipulative"]
  }
];

const names = {
  male: ["Harold", "Marcus", "Felix", "Lucas", "Sebastian", "Theodore", "Vincent", "Alexander", "Nathaniel", "Damien"],
  female: ["Lydia", "Victoria", "Catherine", "Isabella", "Evangeline", "Cordelia", "Seraphina", "Anastasia", "Genevieve", "Ophelia"],
  surnames: ["Blackwood", "Rosewood", "Grimm", "Delacroix", "Ashworth", "Sterling", "Pemberton", "Ravencroft", "Thornfield", "Whitmore"]
};

const avatars = {
  male: ["🧔‍♂️", "👨‍💼", "👨‍🔬", "👨‍🍳", "👨‍🎨", "🕵️‍♂️", "👨‍⚕️", "👨‍🏫"],
  female: ["👩‍🦰", "👩‍💼", "👩‍🔬", "👩‍🍳", "👩‍🎨", "🕵️‍♀️", "👩‍⚕️", "👩‍🏫"]
};

export const generateStory = (difficulty: Difficulty): GameStory => {
  const setting = settings[Math.floor(Math.random() * settings.length)];
  const victim = victims[Math.floor(Math.random() * victims.length)];
  
  return {
    id: `story_${Date.now()}`,
    title: `Murder at ${setting.name}`,
    setting: setting.name,
    victim,
    description: `It was a dark and stormy night at ${setting.name}. ${victim.name}, ${victim.role.toLowerCase()}, was found dead in mysterious circumstances. ${victim.background}`,
    atmosphere: setting.atmosphere,
    keyEvidence: generateKeyEvidence(difficulty)
  };
};

const generateKeyEvidence = (difficulty: Difficulty): string[] => {
  const evidence = [
    "A mysterious letter found in the victim's pocket",
    "Strange marks on the victim's hands",
    "A glass with traces of an unknown substance",
    "Footprints leading to a secret passage",
    "A torn piece of fabric caught on a door handle",
    "An overheard argument from the night before",
    "Missing items from the victim's personal collection",
    "Unusual behavior noticed by staff members"
  ];
  
  const count = difficulty === 'easy' ? 2 : difficulty === 'medium' ? 3 : 4;
  return evidence.sort(() => 0.5 - Math.random()).slice(0, count);
};

export const generateSuspects = (difficulty: Difficulty, story: GameStory): Suspect[] => {
  const suspectCount = difficulty === 'easy' ? 3 : difficulty === 'medium' ? 4 : 5;
  const maxInteractions = difficulty === 'easy' ? 6 : difficulty === 'medium' ? 5 : 4;
  
  const roles = ["Butler", "Maid", "Chef", "Secretary", "Gardener", "Doctor", "Lawyer", "Business Partner"];
  const motives = [
    "Financial desperation and mounting debts",
    "Years of mistreatment and humiliation",
    "Blackmail and dark secrets exposed",
    "Protecting family from scandal",
    "Revenge for past betrayals",
    "Inheritance and greed",
    "Professional rivalry and jealousy",
    "Forbidden love affair gone wrong"
  ];
  
  const suspects: Suspect[] = [];
  const usedRoles = new Set<string>();
  const usedNames = new Set<string>();
  
  for (let i = 0; i < suspectCount; i++) {
    let role = roles[Math.floor(Math.random() * roles.length)];
    while (usedRoles.has(role)) {
      role = roles[Math.floor(Math.random() * roles.length)];
    }
    usedRoles.add(role);
    
    const isMale = Math.random() > 0.5;
    const firstName = isMale 
      ? names.male[Math.floor(Math.random() * names.male.length)]
      : names.female[Math.floor(Math.random() * names.female.length)];
    const lastName = names.surnames[Math.floor(Math.random() * names.surnames.length)];
    const fullName = `${firstName} ${lastName}`;
    
    while (usedNames.has(fullName)) {
      const newFirstName = isMale 
        ? names.male[Math.floor(Math.random() * names.male.length)]
        : names.female[Math.floor(Math.random() * names.female.length)];
      const newLastName = names.surnames[Math.floor(Math.random() * names.surnames.length)];
      const newFullName = `${newFirstName} ${newLastName}`;
      if (!usedNames.has(newFullName)) {
        usedNames.add(newFullName);
        break;
      }
    }
    usedNames.add(fullName);
    
    const avatar = isMale 
      ? avatars.male[Math.floor(Math.random() * avatars.male.length)]
      : avatars.female[Math.floor(Math.random() * avatars.female.length)];
    
    const motive = motives[Math.floor(Math.random() * motives.length)];
    
    suspects.push({
      id: `suspect_${i}`,
      name: fullName,
      role: `The ${role}`,
      avatar,
      background: generateBackground(role, story.setting),
      lastSeen: generateLastSeen(role, story.setting),
      motive,
      alibi: generateAlibi(role),
      personality: generatePersonality(),
      isKiller: false,
      interactionCount: 0,
      maxInteractions,
      responses: [],
      clues: generateClues(role, motive, difficulty),
      suspicionLevel: Math.floor(Math.random() * 3) + 1
    });
  }
  
  // Randomly select killer
  const killerIndex = Math.floor(Math.random() * suspects.length);
  suspects[killerIndex].isKiller = true;
  suspects[killerIndex].suspicionLevel = Math.floor(Math.random() * 2) + 2; // Killers are slightly more suspicious
  
  return suspects;
};

const generateBackground = (role: string, setting: string): string => {
  const backgrounds = {
    Butler: `Has served at ${setting} for over a decade, knows all the secrets`,
    Maid: `Young and observant, notices everything that happens in ${setting}`,
    Chef: `Temperamental culinary artist who takes pride in their work`,
    Secretary: `Handles all correspondence and knows everyone's business`,
    Gardener: `Quiet groundskeeper who sees everything from the shadows`,
    Doctor: `Family physician with access to dangerous substances`,
    Lawyer: `Handles the family's legal affairs and knows about the will`,
    "Business Partner": `Has significant financial interests with the victim`
  };
  
  return backgrounds[role] || `Works closely with the household at ${setting}`;
};

const generateLastSeen = (role: string, setting: string): string => {
  const locations = {
    Butler: "Near the wine cellar organizing inventory",
    Maid: "Upstairs cleaning the guest bedrooms",
    Chef: "In the kitchen preparing late-night refreshments",
    Secretary: "In the study organizing important documents",
    Gardener: "Outside checking the greenhouse despite the weather",
    Doctor: "In the library reading medical journals",
    Lawyer: "In the drawing room reviewing legal papers",
    "Business Partner": "On the terrace making urgent phone calls"
  };
  
  return locations[role] || "Somewhere in the main building";
};

const generateAlibi = (role: string): string => {
  const alibis = {
    Butler: "Claims to have been polishing silverware in the pantry",
    Maid: "Says she was doing laundry in the basement",
    Chef: "Insists they were cleaning the kitchen after dinner",
    Secretary: "Claims to have been filing documents until late",
    Gardener: "Says they were securing plants from the storm",
    Doctor: "Claims to have been reading in their room",
    Lawyer: "Says they were on an important conference call",
    "Business Partner": "Claims to have been reviewing contracts"
  };
  
  return alibis[role] || "Claims to have been in their room all evening";
};

const generatePersonality = (): string => {
  const personalities = [
    "Nervous and defensive when questioned",
    "Charming but evasive about details",
    "Hot-tempered and quick to anger",
    "Quiet and calculating, chooses words carefully",
    "Emotional and prone to dramatic outbursts",
    "Intellectual and speaks in riddles",
    "Formal and maintains professional distance",
    "Friendly but hides something important"
  ];
  
  return personalities[Math.floor(Math.random() * personalities.length)];
};

const generateClues = (role: string, motive: string, difficulty: Difficulty): string[] => {
  const baseClues = [
    `Has access to areas others don't`,
    `Was seen acting suspiciously earlier`,
    `Their alibi has inconsistencies`,
    `Found with evidence linking them to the crime`
  ];
  
  const roleSpecificClues = {
    Butler: ["Has keys to every room", "Knows the victim's daily routine"],
    Maid: ["Discovered personal secrets while cleaning", "Has access to private areas"],
    Chef: ["Has knowledge of poisons and toxins", "Controls what everyone eats"],
    Secretary: ["Handles all communications", "Knows about financial troubles"],
    Gardener: ["Has access to dangerous chemicals", "Knows all the hiding spots"],
    Doctor: ["Has medical knowledge and drugs", "Understands how to kill quietly"],
    Lawyer: ["Knows about the will and inheritance", "Has motive for financial gain"],
    "Business Partner": ["Stands to benefit financially", "Has been arguing with victim"]
  };
  
  const clues = [...baseClues];
  if (roleSpecificClues[role]) {
    clues.push(...roleSpecificClues[role]);
  }
  
  const clueCount = difficulty === 'easy' ? 3 : difficulty === 'medium' ? 4 : 5;
  return clues.slice(0, clueCount);
};