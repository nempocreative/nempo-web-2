import { describe, expect, it } from "vitest";
import { graduates } from "@/data/year-book";
import { chooseVote, dreamGroups, makeQuiz, parseVotes, quizScore } from "./yearbook-personal";

describe("personal yearbook", () => {
  it("keeps one choice per category and replaces rather than adds votes", () => {
    const votes = chooseVote(chooseVote({}, "heboh", "nadia"), "heboh", "dimas");
    expect(votes).toEqual({ heboh: "dimas" });
    expect(chooseVote(votes, "membantu", "salma")).toEqual({ heboh: "dimas", membantu: "salma" });
    expect(chooseVote(votes, "heboh", "unknown")).toEqual(votes);
  });
  it("restores valid votes and ignores invalid stored data", () => {
    expect(parseVotes('{"heboh":"nadia","kangen":"unknown","membantu":42}')).toEqual({ heboh: "nadia" });
    expect(parseVotes("bad json")).toEqual({});
  });
  it("maps all 12 students once using their existing dreams", () => {
    const ids = dreamGroups.flatMap((g) => g.studentIds);
    expect(ids).toHaveLength(12);
    expect(new Set(ids).size).toBe(12);
    expect([...ids].sort()).toEqual(graduates.map((g) => g.id).sort());
  });
  it("creates five distinct questions with four choices including the answer", () => {
    const quiz = makeQuiz(() => 0.4);
    expect(quiz).toHaveLength(5);
    expect(new Set(quiz.map((q) => q.studentId)).size).toBe(5);
    for (const q of quiz) {
      expect(q.optionIds).toHaveLength(4);
      expect(new Set(q.optionIds).size).toBe(4);
      expect(q.optionIds).toContain(q.studentId);
    }
  });
  it("scores correct and incorrect answers", () => {
    const quiz = makeQuiz(() => 0.2);
    expect(quizScore(quiz, quiz.map((q) => q.studentId))).toBe(5);
    expect(quizScore(quiz, quiz.map((q) => q.optionIds.find((id) => id !== q.studentId) || ""))).toBe(0);
  });
});