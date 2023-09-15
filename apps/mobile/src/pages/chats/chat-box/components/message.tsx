import { PropsWithChildren } from "react";
import { StyleSheet, Text, View } from "react-native";
import { COLORS, borderRadius, spaces } from "../../../../components";
import { DateHumanizer } from "../../../../utils";
import { ChatUI, UserUI } from "types";

export function Message({ chat, userConnected }: MessageProps) {
    const isMyMessage = userConnected.id == chat.fromUser.id;

    return (
        <View
            style={[
                styles.view,
                {
                    backgroundColor: isMyMessage
                        ? COLORS.brandColor
                        : COLORS.neutral[200],
                    alignSelf: isMyMessage ? "flex-end" : "flex-start",
                },
            ]}
        >
            <Text
                style={[
                    styles.time,
                    {
                        color: isMyMessage
                            ? COLORS.neutral[300]
                            : COLORS.neutral[500],
                    },
                ]}
            >
                {DateHumanizer.fromNow(chat.createdAt)}{" "}
            </Text>
            <Text
                style={[
                    styles.text,
                    {
                        color: isMyMessage ? "white" : COLORS.neutral[700],
                    },
                ]}
            >
                {chat.content}
            </Text>
        </View>
    );
}

type MessageProps = PropsWithChildren<{
    chat: ChatUI;
    userConnected: UserUI;
}>;

const styles = StyleSheet.create({
    view: {
        margin: spaces.m2,
        padding: spaces.m4,
        borderRadius: borderRadius.twoXL,
        maxWidth: "80%",
    },
    text: {},
    time: {
        alignSelf: "flex-end",
        fontSize: 13,
    },
});
