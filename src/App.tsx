import { useUserProfile } from "./hooks/useUserProfile";
import { Widget } from "./components/Widget/Widget";
import { SessionProvider } from "./context/SessionContext";

export function App(){
    const {profile, setProfile } = useUserProfile()
    return (
        <SessionProvider>
            <Widget profile={profile} setProfile={setProfile} />
        </SessionProvider>
    )
}