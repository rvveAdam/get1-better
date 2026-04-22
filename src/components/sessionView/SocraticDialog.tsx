import { useSession } from "../../context/SessionContext"
import { useState } from "react"
import type { Message } from "../../types"

export interface SocraticDialogProps {
    messages: Message[]
    sendAnswer: (answer: string) => void
}

export function SocraticDialog({ messages, sendAnswer }: SocraticDialogProps) {

    const { dispatch } = useSession()
    const [ textInput, setTextInput ] = useState<string>('')

    async function handleSubmit() {
        await sendAnswer(textInput)
        setTextInput('')
    }

    return (
        <div className="socratic-dialog">
            {messages.map((message) => (
                <p key={message.id}>{message.content}</p>
            ))}
            <input onChange={(e) => setTextInput(e.target.value)} value={textInput}/>
            <button onClick={() => handleSubmit()}>Wyślij</button>
            <button onClick={() => dispatch({ type: 'COMPLETE_SESSION' })}>Idź do feedbacku</button>
        </div>
    )
}