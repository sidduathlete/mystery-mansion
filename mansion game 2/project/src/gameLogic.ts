import { Suspect, GameState, Difficulty } from './types';
import { generateStory, generateSuspects } from './services/storyGenerator';

export const createGame = (difficulty: Difficulty) => {
  const story = generateStory(difficulty);
  const suspects = generateSuspects(difficulty, story);
  
  return { story, suspects };
};

export const generateSuspectResponse = (suspect: Suspect, question: string, interactionNumber: number): string => {
  // Enhanced AI response generation based on suspect personality and killer status
  const baseResponses = {
    nervous: [
      "I... I don't know what you're implying, Detective.",
      "Why would you ask me that? I've done nothing wrong!",
      "Please, I've told you everything I know already.",
      "This is all very overwhelming. I just want this to be over.",
      "I can't think straight with all these accusations flying around."
    ],
    defensive: [
      "That's a ridiculous question! I would never do such a thing.",
      "You're barking up the wrong tree, Detective.",
      "I resent the implication in your question.",
      "My reputation speaks for itself. I don't need to defend it.",
      "You should be looking elsewhere for your culprit."
    ],
    evasive: [
      "I'm not sure I understand what you're getting at.",
      "That's an interesting question, but I don't see how it's relevant.",
      "I prefer not to speculate about such matters.",
      "Perhaps you should ask someone else about that.",
      "I think you're reading too much into things, Detective."
    ],
    emotional: [
      "*tears up* This whole situation is just terrible...",
      "I can't believe someone would do such a horrible thing!",
      "The victim didn't deserve this, no matter what anyone says.",
      "I'm sorry, this is all just so overwhelming for me.",
      "Please understand, I'm just trying to cope with all of this."
    ]
  };

  // Determine response style based on personality
  let responseStyle = 'defensive';
  if (suspect.personality.includes('nervous')) responseStyle = 'nervous';
  else if (suspect.personality.includes('evasive') || suspect.personality.includes('calculating')) responseStyle = 'evasive';
  else if (suspect.personality.includes('emotional') || suspect.personality.includes('tears')) responseStyle = 'emotional';

  const responses = baseResponses[responseStyle as keyof typeof baseResponses];
  let response = responses[Math.min(interactionNumber - 1, responses.length - 1)];

  // Add killer-specific behavior
  if (suspect.isKiller) {
    const killerModifiers = [
      " *avoids eye contact*",
      " *fidgets with hands*",
      " *voice wavers slightly*",
      " *pauses before answering*",
      " *seems unusually tense*"
    ];
    
    if (interactionNumber >= 3) {
      response += killerModifiers[Math.floor(Math.random() * killerModifiers.length)];
    }
    
    // Killer becomes more defensive as questions continue
    if (interactionNumber >= 4) {
      response = "Look, I've answered enough questions. " + response;
    }
  }

  // Add clue revelation
  if (interactionNumber <= suspect.clues.length) {
    const clueHints = [
      " Though I did notice something odd earlier...",
      " Actually, now that you mention it...",
      " I probably shouldn't say this, but...",
      " Between you and me, Detective...",
      " I wasn't going to bring this up, but..."
    ];
    
    if (Math.random() > 0.3) { // 70% chance to give a clue hint
      response += clueHints[Math.floor(Math.random() * clueHints.length)];
    }
  }

  return response;
};

export const calculateScore = (gameState: GameState): number => {
  const timeElapsed = Date.now() - gameState.gameStartTime;
  const timeInMinutes = timeElapsed / 60000;
  
  // Base scoring
  let score = 0;
  
  // Accuracy bonus (most important)
  const isCorrect = gameState.playerAccusation === gameState.suspects.find(s => s.isKiller)?.id;
  if (isCorrect) {
    score += 50;
  }
  
  // Clue bonus
  score += gameState.cluesFound.length * 10;
  
  // Time bonus (decreases over time)
  const maxTimeBonus = 30;
  const timeBonus = Math.max(0, maxTimeBonus - Math.floor(timeInMinutes * 2));
  score += timeBonus;
  
  // Efficiency bonus (fewer questions used)
  const totalPossibleQuestions = gameState.suspects.reduce((sum, s) => sum + s.maxInteractions, 0);
  const questionsUsed = gameState.suspects.reduce((sum, s) => sum + s.interactionCount, 0);
  const efficiencyRatio = 1 - (questionsUsed / totalPossibleQuestions);
  score += Math.floor(efficiencyRatio * 20);
  
  // Difficulty multiplier
  const difficultyMultiplier = gameState.difficulty === 'easy' ? 1 : gameState.difficulty === 'medium' ? 1.2 : 1.5;
  score = Math.floor(score * difficultyMultiplier);
  
  return Math.min(100, Math.max(0, score));
};

export const getVictimStory = (story: any): string => {
  return `${story.victim.name}, ${story.victim.role.toLowerCase()}, was found dead at ${story.setting}. ${story.description}`;
};

// Enhanced suspect interaction tracking
export const updateSuspectInteraction = (suspect: Suspect, question: string, response: string): Suspect => {
  return {
    ...suspect,
    interactionCount: suspect.interactionCount + 1,
    responses: [...suspect.responses, response],
    suspicionLevel: Math.min(5, suspect.suspicionLevel + (suspect.isKiller ? 0.3 : 0.1))
  };
};

// Multiplayer specific functions
export const switchPlayer = (currentPlayer: 1 | 2): 1 | 2 => {
  return currentPlayer === 1 ? 2 : 1;
};

export const canMakeAccusation = (gameState: GameState): boolean => {
  if (gameState.gameMode === 'solo') {
    return gameState.totalQuestions >= Math.floor(gameState.maxQuestions * 0.5); // At least 50% of questions used
  } else {
    // Multiplayer: both players need to have had some turns
    return gameState.totalQuestions >= 4; // At least 2 questions per player
  }
};

export const validateMultiplayerAccusation = (player1Accusation: string | null, player2Accusation: string | null): boolean => {
  return player1Accusation === player2Accusation && player1Accusation !== null;
};