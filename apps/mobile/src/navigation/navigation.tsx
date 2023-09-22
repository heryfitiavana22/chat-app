import {
    DefaultTheme,
    NavigationContainer,
    Theme,
} from "@react-navigation/native";
import { PropsWithChildren } from "react";
import { COLORS } from "../components";
import { RootStackParamList, Routes } from "./routes";
import { createStackNavigator } from "@react-navigation/stack";
import { ChatList, Login, Signup } from "../pages";
import { ChatBox } from "../pages/chats/chat-box";

const customTheme: Theme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        background: "transparent",
        primary: COLORS.BRAND_COLOR,
        text: COLORS.neutral[800],
    },
};

const Stack = createStackNavigator<RootStackParamList>();

export function Navigation({}: NavigationProps) {
    return (
        <NavigationContainer theme={customTheme}>
            <Stack.Navigator
                initialRouteName={Routes.Login}
                screenOptions={{ header: () => null }}
                screenListeners={{
                    transitionEnd: () => {
                        // stopLoading()
                        // console.log("end")
                    },
                    blur: () => {
                        // runLoading()
                        // console.log("blur")
                    },
                }}
            >
                <Stack.Screen name={Routes.SignUp} component={Signup} />
                <Stack.Screen name={Routes.Login} component={Login} />
                <Stack.Screen name={Routes.ChatList} component={ChatList} />
                <Stack.Screen name={Routes.Chatbox} component={ChatBox} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

type NavigationProps = PropsWithChildren<{}>;
