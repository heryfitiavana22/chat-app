import { PropsWithChildren } from "react";
import { ServerFormater } from "functions";
import { useNavigation } from "@react-navigation/native";
import { ChatListUI, UserUI } from "types";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import {
    COLORS,
    ConnectedMark,
    P,
    borderRadius,
    fontSizes,
    spaces,
} from "../../../../components";
import { Routes } from "../../../../navigation";
import { DateHumanizer } from "../../../../utils";

export function ChatListItem({ chatItem, userConnected }: ChatListItemProps) {
    const navigation = useNavigation();
    const isLastMessageMine = userConnected.id == chatItem.lastChat.idUser;
    const isSeenByConnected = isLastMessageMine
        ? true
        : chatItem.lastChat.isSeenByReceiver;

    return (
        <TouchableOpacity
            onPress={() =>
                navigation.navigate(Routes.Chatbox, {
                    userIdToChat: chatItem.user.id,
                })
            }
            style={styles.container}
        >
            <View style={styles.imageContainer}>
                <Image
                    source={{
                        uri: ServerFormater.staticPath(chatItem.user.imageURL),
                    }}
                    style={styles.image}
                />
                {chatItem.user.isConnected ? (
                    <ConnectedMark />
                ) : (
                    <P style={styles.lastconnection}>
                        {DateHumanizer.lastConnection(
                            chatItem.user.lastConnection
                        )}
                    </P>
                )}
            </View>
            <View style={styles.content}>
                <View style={styles.row}>
                    <P numberOfLines={1} style={styles.name}>
                        {chatItem.user.name}
                    </P>
                    <P style={styles.subTitle}>
                        {DateHumanizer.messageDate(chatItem.lastChat.createdAt)}
                    </P>
                </View>
                <View style={styles.rowMessage}>
                    <P
                        numberOfLines={1}
                        style={[
                            isSeenByConnected
                                ? {}
                                : { color: COLORS.neutral[900] },
                        ]}
                        bold={!isSeenByConnected}
                    >
                        {isLastMessageMine && "vous :"}{" "}
                        {chatItem.lastChat.content}
                    </P>
                    {isLastMessageMine &&
                        chatItem.lastChat.isSeenByReceiver && (
                            <Image
                                source={{
                                    uri: ServerFormater.staticPath(
                                        chatItem.user.imageURL
                                    ),
                                }}
                                style={styles.miniImage}
                            />
                        )}
                </View>
            </View>
        </TouchableOpacity>
    );
}

type ChatListItemProps = PropsWithChildren<{
    chatItem: ChatListUI;
    userConnected: UserUI;
}>;

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        gap: spaces.m3,
        marginBottom: spaces.m4,
    },
    imageContainer: {
        width: 55,
        height: 55,
        position: "relative",
    },
    image: {
        width: "100%",
        height: "100%",
        borderRadius: borderRadius.rounded,
        objectFit: "contain",
    },
    lastconnection: {
        position: "absolute",
        bottom: -6,
        left: "70%",
        fontSize: fontSizes.extraSmall,
        backgroundColor: COLORS.neutral[300],
        paddingHorizontal: 2,
        borderRadius: borderRadius.medium,
    },
    content: {
        flex: 1,
    },
    row: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 4,
        marginTop: 4,
    },
    name: {
        fontWeight: "bold",
        color: COLORS.neutral[700],
        fontSize: fontSizes.large,
    },
    subTitle: {
        color: COLORS.neutral[400],
    },
    rowMessage: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        gap: spaces.m2,
    },
    miniImage: {
        width: 15,
        height: 15,
        borderRadius: borderRadius.rounded,
    },
});
