import { useEffect } from "react";
import {
    Main,
    initSocket,
    setUserToConnected,
    setUserToDisconnected,
} from "./src";
import { AppState } from "react-native";
initSocket();

function App() {
    useEffect(() => {
        console.log(JSON.stringify(AppState));
        AppState.addEventListener("change", (e) => {
            console.log("chage state");
            console.log(e);
            if (e == "active") return setUserToConnected();
            if (e == "background" || e == "inactive" || e == "unknown")
                setUserToDisconnected();
        });
    });

    return <Main />;
}

export default App;
