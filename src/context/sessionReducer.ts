import type { SessionState, LearningEntry } from '../types/index'

export type SessionAction =
    | {type: 'START_SESSION'}
    | {type: 'SET_ENTRY'; payload: LearningEntry}
    | {type: 'SET_ERROR'; payload: string}
    | {type: 'SET_LOADING'; payload: boolean}
    | {type: 'ADD_ANSWER'; payload: string}
    | {type: 'COMPLETE_SESSION'}
    | {type: 'RESET_SESSION'}

export const initialState: SessionState = {
  status: 'idle',
  message: [],
  currentEntry: undefined,
  profile: {
    level: 'beginner',
    knownConcepts: [],
    totalSessions: 0
  }
}

export function sessionReducer(state: SessionState, action: SessionAction): SessionState {
  switch (action.type) {
    case 'START_SESSION':
        return { ...state, status: 'starting' }
    case 'SET_ENTRY':
        return {...state, status: 'dialog', currentEntry: action.payload}
    case 'SET_ERROR':
        return {...state, status: 'idle'}
    case 'SET_LOADING':
        return {...state, status: 'starting'}
    case 'COMPLETE_SESSION':
        return {...state, status: 'feedback', profile: {...state.profile, totalSessions: state.profile.totalSessions + 1}}
    case 'ADD_ANSWER':
    if (!state.currentEntry) return state
    return {
        ...state,currentEntry: {...state.currentEntry,answers: [...(state.currentEntry.answers ?? []), action.payload]}
    }
    case 'RESET_SESSION':
        return initialState
    default:
        return state
  }
}