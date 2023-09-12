import { PropsWithChildren } from "react";
import { StyleSheet, Text, View } from "react-native";
import { borderRadius, spaces } from "../../../../components";
import { DateHumanizer } from "../../../../utils";
import { ChatUI, UserUI } from "types";

export function Message({ chat, userConnected }: MessageProps) {
    const isMyMessage = userConnected.id == chat.fromUser.id;

    return (
        <View
            style={[
                styles.View,
                {
                    backgroundColor: isMyMessage ? "#f2994a" : "#d9d9d9",
                    alignSelf: isMyMessage ? "flex-end" : "flex-start",
                },
            ]}
        >
            <Text
                style={[
                    styles.text,
                    {
                        color: isMyMessage ? "white" : "#404040",
                    },
                ]}
            >
                {chat.content}
            </Text>
            <Text style={styles.time}>
                {" "}
                {DateHumanizer.fromNow(chat.createdAt)}{" "}
            </Text>
        </View>
    );
}

type MessageProps = PropsWithChildren<{
    chat: ChatUI;
    userConnected: UserUI;
}>;

const styles = StyleSheet.create({
    View: {
        flexDirection: "column-reverse",
        margin: 10,
        padding: spaces.m4,
        borderRadius: borderRadius.fourXL,
        maxWidth: "80%",
    },
    text: {},
    time: {
        color: "#737373",
        alignSelf: "flex-end",
        fontSize: 13,
    },
});
