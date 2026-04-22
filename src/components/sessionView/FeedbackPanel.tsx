import { useSession } from "../../context/SessionContext"
import { useState } from "react"

type FeedbackOption = 'too_easy' | 'just_right' | 'too_hard' | 'wrong_topic'

const FEEDBACK_OPTIONS: { value: FeedbackOption; label: string }[] = [
    { value: 'too_easy', label: 'Za łatwa' },
    { value: 'just_right', label: 'W sam raz' },
    { value: 'too_hard', label: 'Za trudna' },
    { value: 'wrong_topic', label: 'Nie mój temat' },
]

export function FeedbackPanel() {
    const { dispatch } = useSession()
    const [selectedFeedback, setSelectedFeedback] = useState<FeedbackOption | null>(null)

    return (
        <div className="feedback-panel">
            <p>Jak oceniasz dzisiejszą sesję?</p>

            {FEEDBACK_OPTIONS.map((option) => (
                <label key={option.value}>
                    <input 
                        type="radio"
                        value={option.value}
                        onChange={() => setSelectedFeedback(option.value)}
                    />
                    {option.label}
                </label>
            ))}
            {selectedFeedback !== null && 
              <div>
                <button onClick={() => dispatch({ type: 'RESET_SESSION' })}>Nowa sesja</button>
                <button onClick={() => dispatch({ type: 'RESET_SESSION' })}>Zakończ</button> 
              </div>
            }
        </div>
    )
}