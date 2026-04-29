import { useAnthropicChat } from "../../hooks/useAnthropicChat"
import { KnowledgeCard } from "../sessionView/KnowledgeCard"
import { VocabularyCard } from "../sessionView/VocabularyCard"
import { useSession } from "../../context/SessionContext"
import { SocraticDialog } from "../sessionView/SocraticDialog"
import { FeedbackPanel } from "../sessionView/FeedbackPanel"
import type { UserProfile } from "../../types"

export interface WidgetProps{
    profile: UserProfile,
    setProfile: (profile: UserProfile) => void
}

export function Widget({ profile, setProfile }: WidgetProps) {
    const {error, startSession, sendAnswer, messages } = useAnthropicChat()
    const { state } = useSession()

  return (
    <div className="widget">
        <p>Poziom: {profile.level}</p>
        <button onClick={startSession}>Start Sesji</button>
        {state.status === 'starting' && <p>Ładowanie...</p>}
        {error && <p>{error}</p>}
        {state.currentEntry && <div><KnowledgeCard entry={state.currentEntry} /><VocabularyCard entry={state.currentEntry}/></div>}
        {state.status === 'dialog' && <SocraticDialog messages={messages} sendAnswer={sendAnswer}/>}
        {state.status === 'feedback' && <FeedbackPanel/>}
    </div>
  )
}