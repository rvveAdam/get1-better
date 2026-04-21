import { useSession } from "../../context/SessionContext"

export function FeedbackPanel() {

    const { dispatch } = useSession()

  return (
    <div className="feedback-panel">
        <button onClick={() => dispatch({ type: 'RESET_SESSION' })}>😊</button>
        <button onClick={() => dispatch({ type: 'RESET_SESSION' })}>🙁</button>
        <button onClick={() => dispatch({ type: 'RESET_SESSION' })}>😐</button>
    </div>
  )
}