import {} from "@react-navigation/native-stack";

export type RootStackParamList = {
    Login: undefined;
    SignUp: undefined;
    Chatbox: {};
    ChatList: undefined;
};

type A = keyof RootStackParamList;

export const Routes: { [key in keyof RootStackParamList]: key } = {
    Chatbox: "Chatbox",
    ChatList: "ChatList",
    Login: "Login",
    SignUp: "SignUp",
} as const;

declare global {
    namespace ReactNavigation {
        interface RootParamList extends RootStackParamList {}
    }
}
