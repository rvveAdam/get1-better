export type SessionStatus = 'idle' | 'starting' | 'generate_knowledge' | 'generate_word' | 'dialog' | 'feedback' | 'saving' 

export interface Message {
  id: number
  role: 'user' | 'assistant'
  content: string
  timestamp: number
}

export interface UserFeedback {
  difficultyPerceived: 'too_easy' | 'just_right' | 'too_hard'
  comment: string
}

export interface LearningEntry {
    knowledge: string
    vocabulary: string
    questions: string[]
    feedback?: UserFeedback
    answers?: string[]
} 

export interface FlashCard{
    type: 'basic' | 'cloze'
    front: string
    back: string
    tags: string[]
}

export interface UserProfile{
    level: 'beginner' | 'intermediate' | 'advanced'
    knownConcepts: string[]
    totalSessions: number
}

export interface SessionState{
    status: SessionStatus
    message: Message[]
    currentEntry?: LearningEntry
    profile: UserProfile
}
