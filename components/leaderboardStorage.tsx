import * as FileSystem from "expo-file-system/legacy";

const fileUri = FileSystem.documentDirectory + "leaderboardDatabase.txt";

export async function recordWinByName(winnerName: string) {
  const line = `${winnerName} Win\n`;

  try {
    const info = await FileSystem.getInfoAsync(fileUri);
    let existing = "";

    if (info.exists) {
      existing = await FileSystem.readAsStringAsync(fileUri);
    }

    await FileSystem.writeAsStringAsync(fileUri, existing + line);
  } catch (e) {
    console.warn("Error writing leaderboard file:", e);
  }
}

export type LeaderboardEntry = {
  name: string;
  wins: number;
};

export async function getFullLeaderboard(): Promise<LeaderboardEntry[]> {
  const counts: Record<string, number> = {};

  try {
    const info = await FileSystem.getInfoAsync(fileUri);
    if (!info.exists) return [];

    const content = await FileSystem.readAsStringAsync(fileUri);
    const lines = content
      .split("\n")
      .map((l) => l.trim())
      .filter(Boolean);

    for (const line of lines) {
      const [namePart] = line.split(" Win");
      const name = namePart?.trim();
      if (!name) continue;

      if (!counts[name]) counts[name] = 0;
      counts[name] += 1;
    }

    const entries = Object.entries(counts).map(([name, wins]) => ({
      name,
      wins,
    }));

    entries.sort((a, b) => b.wins - a.wins);

    return entries;
  } catch (e) {
    console.warn("Error reading leaderboard file:", e);
    return [];
  }
}
