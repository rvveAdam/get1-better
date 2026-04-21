import type { LearningEntry } from "../types/index";

export function parseResponse(text: string): LearningEntry {

    try{
        const cleaned = text.replace(/```json\n?|\n?```/g, '').trim()
        const data = JSON.parse(cleaned)


    if (typeof data.knowledge !== 'string') {
        throw new Error('Brak pola knowledge w odpowiedzi')
    }

    if (typeof data.vocabulary !== 'string') {
        throw new Error('Brak pola vocabulary w odpowiedzi')
    }

    if (!Array.isArray(data.questions)){
        throw new Error('Brak pola questions w odpowiedzi')
    }

    return{
        knowledge: data.knowledge,
        vocabulary: data.vocabulary,
        questions: data.questions
    }

    }catch (error) {throw new Error (`Nie udało się sparsować odpowiedzi Claude`)}
}
