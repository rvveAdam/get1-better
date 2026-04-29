
import { useState, useEffect } from 'react'
import type { UserProfile } from '../types'

const STORAGE_KEY = 'userProfile'

const defaultProfile: UserProfile = {
    level: 'beginner',
    knownConcepts: [],
    totalSessions: 0
}


export function useUserProfile() {
    function readLocalStorage(){
        const savedProfile = localStorage.getItem(STORAGE_KEY)
        if(savedProfile === null){
            return defaultProfile
        }else{
            return JSON.parse(savedProfile)
        }
    }
    const [profile, setProfile] = useState<UserProfile>(readLocalStorage())

    useEffect(() => {localStorage.setItem(STORAGE_KEY, JSON.stringify(profile))}, [profile])
    return { profile, setProfile }
}