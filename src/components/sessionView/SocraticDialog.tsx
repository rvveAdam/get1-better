import { useSession } from "../../context/SessionContext" 
import { useState } from "react"
import { useAnthropicChat } from "../../hooks/useAnthropicChat"

export function SocraticDialog() {

    const { state, dispatch } = useSession()
    const { sendAnswer, messages } = useAnthropicChat()
    const [ textInput, setTextInput ] = useState<string>('')
    const [ question, setQuestions ] = useState<number>(0)

    async function handleSubmit() {

        await sendAnswer(textInput)
        setTextInput('')
        const questions = state.currentEntry?.questions
        if (!questions) return
        if (question === questions.length - 1) {
            dispatch({ type: 'COMPLETE_SESSION' }) 
        } else {
            setQuestions(question + 1)
        }
    }


    return (
        <div className="socratic-dialog">
            <p>{state.currentEntry?.questions[question]}</p>
            {messages.map((message) => (
                <p key={message.id}>{message.content}</p>
            ))}
            <input onChange={(e) => setTextInput(e.target.value)} value={textInput}/>
            <button onClick={ () => handleSubmit()}>Wyślij</button>
        </div>
    )
}