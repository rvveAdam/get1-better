import { Widget } from "./components/Widget/Widget";
import { SessionProvider } from "./context/SessionContext";

export function App(){
    return (
        <SessionProvider> <Widget/> </SessionProvider>
    )
}