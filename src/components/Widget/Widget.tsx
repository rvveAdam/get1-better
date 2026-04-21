import { useAnthropicChat } from "../../hooks/useAnthropicChat"
import { KnowledgeCard } from "../sessionView/KnowledgeCard"
import { VocabularyCard } from "../sessionView/VocabularyCard"
import { useSession } from "../../context/SessionContext"
import { SocraticDialog } from "../sessionView/SocraticDialog"
import { FeedbackPanel } from "../sessionView/FeedbackPanel"

export function Widget() {

    const {error, startSession } = useAnthropicChat()
    const { state } = useSession()

  return (
    <div className="widget">
        <button onClick={startSession}>Start Sesji</button>
        {state.status === 'starting' && <p>Ładowanie...</p>}
        {error && <p>{error}</p>}
        {state.currentEntry && <div><KnowledgeCard entry={state.currentEntry} /><VocabularyCard entry={state.currentEntry}/></div>}
        {state.currentEntry && <SocraticDialog/>}
        {state.status === 'feedback' && <FeedbackPanel/>}
    </div>
  )
}
