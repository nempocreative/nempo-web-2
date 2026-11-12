import { graduates } from "@/data/year-book";

export const VOTE_STORAGE_KEY = "nempo-yearbook-votes-v1";
export const voteCategories = [
  { id: "heboh", label: "Teman terheboh" },
  { id: "membantu", label: "Paling membantu" },
  { id: "kangen", label: "Paling ngangenin" },
] as const;
export type VoteCategory = (typeof voteCategories)[number]["id"];
export type Votes = Partial<Record<VoteCategory, string>>;

export function chooseVote(votes: Votes, category: VoteCategory, studentId: string): Votes {
  if (!graduates.some((g) => g.id === studentId)) return votes;
  return { ...votes, [category]: studentId };
}

export function parseVotes(value: string | null): Votes {
  try {
    const parsed: unknown = JSON.parse(value || "{}");
    if (!parsed || typeof parsed !== "object") return {};
    const data = parsed as Record<string, unknown>;
    const votes: Votes = {};
    for (const category of voteCategories) {
      const id = data[category.id];
      if (typeof id === "string" && graduates.some((g) => g.id === id)) votes[category.id] = id;
    }
    return votes;
  } catch { return {}; }
}

export const dreamGroups = [
  { id: "sains", label: "Sains & kesehatan", studentIds: ["rayhan", "aulia", "salma"] },
  { id: "kreatif", label: "Seni & cerita", studentIds: ["kirana", "salsa", "nayla", "dimas", "maya", "gilang"] },
  { id: "dunia", label: "Dunia & usaha", studentIds: ["nadia", "rizky"] },
  { id: "olahraga", label: "Olahraga", studentIds: ["fajar"] },
];

export type QuizQuestion = { studentId: string; clue: string; optionIds: string[] };
export function makeQuiz(random: () => number = Math.random): QuizQuestion[] {
  const shuffle = <T,>(values: T[]): T[] => {
    const result = [...values];
    for (let i = result.length - 1; i > 0; i--) {
      const j = Math.min(i, Math.max(0, Math.floor(random() * (i + 1))));
      const a = result[i]; const b = result[j];
      if (a === undefined || b === undefined) continue;
      result[i] = b; result[j] = a;
    }
    return result;
  };
  return shuffle(graduates).slice(0, 5).map((student, index) => ({
    studentId: student.id,
    clue: index % 2 === 0 ? `Hobiku ${student.hobi.toLowerCase()}. Siapa aku?` : `“${student.quote}” — siapa yang bilang?`,
    optionIds: shuffle([student.id, ...shuffle(graduates.filter((g) => g.id !== student.id)).slice(0, 3).map((g) => g.id)]),
  }));
}
export function quizScore(questions: QuizQuestion[], answers: string[]) {
  return questions.reduce((total, q, i) => total + (answers[i] === q.studentId ? 1 : 0), 0);
}