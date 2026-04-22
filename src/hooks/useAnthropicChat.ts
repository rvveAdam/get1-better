import { useState } from "react";
import type { Message } from "../types/index";
import { sendMessage } from "../lib/anthropic";
import { useSession } from "../context/SessionContext";
import systemPrompt from '../../instructions/zachowanie-modelu-llm.md?raw'

export function useAnthropicChat() {
    const [messages, setMessages] = useState<Message[]>([])
    const [error, setError] = useState<string | null>(null)
    const { dispatch } = useSession()

    async function startSession() {
        try {
            dispatch({ type: 'START_SESSION' })
            setError(null)

            const startMessage: Message = {
                id: 1,
                role: 'user',
                content: 'Siema, zaczynamy sesję!',
                timestamp: Date.now()
            }

            setMessages([startMessage])
            const responseText = await sendMessage([startMessage], systemPrompt)

            const assistantMessage: Message = {
                id: messages.length + 1,
                role: 'assistant',
                content: responseText,
                timestamp: Date.now()
            }
            setMessages(prev => [...prev, assistantMessage])
            dispatch({type: 'SET_STATUS', payload: 'dialog'})

        } catch (error) {
            if (error instanceof Error) {
                dispatch({ type: 'SET_ERROR', payload: error.message })
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

            const updatedMessages = [...messages, userMessage]
            setMessages(updatedMessages)

            const responseText = await sendMessage(updatedMessages, systemPrompt)

            const assistantMessage: Message = {
                id: messages.length + 1,
                role: 'assistant',
                content: responseText,
                timestamp: Date.now()
            }
            setMessages(prev => [...prev, assistantMessage])

        } catch (error) {
            if (error instanceof Error) {
                dispatch({ type: 'SET_ERROR', payload: error.message })
            }
        }
    }

    return { messages, error, startSession, sendAnswer }
}