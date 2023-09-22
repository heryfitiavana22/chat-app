import { useNavigation } from "@react-navigation/native";
import { PropsWithChildren } from "react";
import { Image, StyleSheet, TouchableOpacity } from "react-native";
import { P, borderRadius, spaces } from "../../../../components";
import { ServerFormater } from "functions";
import { UserUI } from "types";
import { Routes } from "../../../../navigation";

export function User({ user, onClose }: UserProps) {
    const navigation = useNavigation();

    return (
        <TouchableOpacity
            style={styles.userContainer}
            onPress={() => {
                onClose();
                navigation.navigate(Routes.Chatbox, {
                    userIdToChat: user.id,
                });
            }}
        >
            <Image
                source={{
                    uri: ServerFormater.staticPath(user.imageURL),
                }}
                style={styles.imageUser}
            />
            <P>{user.name}</P>
        </TouchableOpacity>
    );
}

type UserProps = PropsWithChildren<{
    user: UserUI;
    onClose: () => void;
}>;

const styles = StyleSheet.create({
    userContainer: {
        flexDirection: "row",
        gap: spaces.m3,
        paddingVertical: spaces.m3,
        alignItems: "center",
    },
    imageUser: {
        width: 40,
        height: 40,
        borderRadius: borderRadius.rounded,
    },
});
