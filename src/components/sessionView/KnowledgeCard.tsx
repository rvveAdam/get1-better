import type { LearningEntry } from "../../types/index"


interface KnowledgeCardProps{
    entry: LearningEntry
}

export function KnowledgeCard({ entry }: KnowledgeCardProps) {
  return (
    <div className="knowledge-card">
      <p>{entry.knowledge}</p>
    </div>
  )
}
