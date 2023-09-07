import { PropsWithChildren } from "react";
import { Image, StyleSheet } from "react-native";

export function ChatAppLogo({}: ChatAppLogoProps) {
    return <Image source={require("./chat-app.jpg")} style={styles.logo} />;
}

type ChatAppLogoProps = PropsWithChildren<{}>;

const styles = StyleSheet.create({
    logo: {
        width: 64,
        height: 60,
        objectFit: "contain",
    },
});
