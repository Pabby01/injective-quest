// Game state management using localStorage

export interface PlayerState {
  walletAddress: string | null;
  ninjaName: string;
  score: number;
  completedChapters: number[];
  chapterScores: { [chapterId: number]: number };
  questStarted: boolean;
}

const STORAGE_KEY = 'injective-ninja-quest';

const defaultState: PlayerState = {
  walletAddress: null,
  ninjaName: "Guest Ninja",
  score: 0,
  completedChapters: [],
  chapterScores: {},
  questStarted: false
};

export function getPlayerState(): PlayerState {
  if (typeof window === 'undefined') return defaultState;
  
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) return defaultState;
  
  try {
    return { ...defaultState, ...JSON.parse(stored) };
  } catch {
    return defaultState;
  }
}

export function savePlayerState(state: Partial<PlayerState>): PlayerState {
  const current = getPlayerState();
  const updated = { ...current, ...state };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  return updated;
}

export function startQuest(walletAddress?: string): PlayerState {
  return savePlayerState({
    walletAddress: walletAddress || null,
    ninjaName: walletAddress ? `Ninja ${walletAddress.slice(-6)}` : "Guest Ninja",
    questStarted: true
  });
}

export function completeChapter(chapterId: number, score: number): PlayerState {
  const current = getPlayerState();
  const completedChapters = current.completedChapters.includes(chapterId)
    ? current.completedChapters
    : [...current.completedChapters, chapterId];
  
  const previousChapterScore = current.chapterScores[chapterId] || 0;
  const scoreDiff = Math.max(0, score - previousChapterScore);
  
  return savePlayerState({
    completedChapters,
    chapterScores: { ...current.chapterScores, [chapterId]: Math.max(previousChapterScore, score) },
    score: current.score + scoreDiff
  });
}

export function resetGame(): PlayerState {
  localStorage.removeItem(STORAGE_KEY);
  return defaultState;
}

export function shortenAddress(address: string): string {
  if (!address) return "";
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}

// Leaderboard with simulated NPC scores
export interface LeaderboardEntry {
  rank: number;
  name: string;
  score: number;
  isPlayer: boolean;
}

const npcNames = [
  "ShadowNinja_99",
  "CosmosWarrior",
  "DeFiMaster",
  "ChainSamurai",
  "CryptoRonin",
  "BlockBuilder",
  "TendermintPro",
  "StakingKing",
  "IBCExplorer",
  "NinjaLegend"
];

export function getLeaderboard(): LeaderboardEntry[] {
  const player = getPlayerState();
  
  // Generate consistent NPC scores based on a seed
  const npcScores: LeaderboardEntry[] = npcNames.map((name, index) => ({
    rank: 0,
    name,
    score: Math.max(0, 150 - (index * 12) - (index % 3 * 5)),
    isPlayer: false
  }));
  
  // Add player to the mix
  const allEntries = [
    ...npcScores,
    {
      rank: 0,
      name: player.ninjaName,
      score: player.score,
      isPlayer: true
    }
  ];
  
  // Sort by score descending
  allEntries.sort((a, b) => b.score - a.score);
  
  // Assign ranks
  return allEntries.map((entry, index) => ({
    ...entry,
    rank: index + 1
  }));
}
