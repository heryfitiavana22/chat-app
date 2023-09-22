import { PropsWithChildren } from "react";
import { StyleSheet, Text, View } from "react-native";
import { COLORS, P, borderRadius, spaces } from "../../../../components";
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
            <P
                style={[
                    styles.time,
                    {
                        color: isMyMessage
                            ? COLORS.neutral[300]
                            : COLORS.neutral[500],
                        alignSelf: isMyMessage ? "flex-end" : "flex-start",
                    },
                ]}
            >
                {DateHumanizer.fromNow(chat.createdAt)}{" "}
            </P>
            <P
                style={[
                    {
                        color: isMyMessage ? "white" : COLORS.neutral[700],
                    },
                ]}
            >
                {chat.content}
            </P>
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
    time: {
        fontSize: 13,
    },
});
