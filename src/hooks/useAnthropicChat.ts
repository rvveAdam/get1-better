import { useState } from "react";
import type { Message } from "../types/index";
import { sendMessage } from "../lib/anthropic";
import { parseResponse } from "../lib/parseResponse";
import { useSession } from "../context/SessionContext";

export function useAnthropicChat() {

    const [messages, setMessages] = useState<Message[]>([])
    const [error, setError] = useState<string | null>(null)

    const { dispatch } = useSession()

    async function startSession() {
        try{
            dispatch({ type: 'START_SESSION' }) 
            setError(null)

            const startMessage: Message = {
                id: 1,
                role: 'user',
                content: 'Rozpocznij sesję',
                timestamp: Date.now()
            }

            setMessages([startMessage])
            const responseText = await sendMessage([startMessage], 'Odpowiedz WYŁĄCZNIE w formacie JSON, bez żadnego dodatkowego tekstu. Format: {"knowledge": "tekst wiedzy po polsku", "vocabulary": "jedno słówko", "questions": ["pytanie 1", "pytanie 2"]}. Przedstaw jedno ciekawe zjawisko z fizyki lub matematyki. Za każdym razem wybierz inny, losowy temat z fizyki, matematyki lub technologii.')

            
            dispatch({type: 'SET_ENTRY', payload: parseResponse(responseText)})

        }catch (error) {
            if (error instanceof Error) {
                dispatch({type: 'SET_ERROR', payload: error.message})
            }
        }
    }
    async function sendAnswer(answer: string) {
        try {
            const userMessage: Message = {
                id: messages.length + 1,
                role: 'user',
                content: answer,
                timestamp: Date.now()
            }

            setMessages(prev => [...prev, userMessage])

            const claudeResponse = await sendMessage([...messages, userMessage], 'Jesteś mentorem. Oceń odpowiedź ucznia w 1-2 zdaniach po polsku. Nie zadawaj nowego pytania.')

            const assistantMessage: Message = {
                id: messages.length + 1,
                role: 'assistant',
                content: claudeResponse,
                timestamp: Date.now()
            }

            setMessages(prev => [...prev, assistantMessage])

            dispatch({type: 'ADD_ANSWER', payload: answer})

        } catch (error) {
            if (error instanceof Error) {
            dispatch({ type: 'SET_ERROR', payload: error.message })
            }
        }
    }

    return { messages, error, startSession, sendAnswer }
}
