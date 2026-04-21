import type { LearningEntry } from "../../types/index"


interface VocabularyCardProps{
    entry: LearningEntry
}

export function VocabularyCard({ entry }: VocabularyCardProps) {
  return (
    <div className="knowledge-card">
      <p>{entry.vocabulary}</p>
    </div>
  )
}
