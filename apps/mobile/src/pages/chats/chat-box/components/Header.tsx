import { PropsWithChildren } from "react";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import {
    BackIcon,
    ConnectedMark,
    P,
    borderRadius,
    fontSizes,
    spaces,
} from "../../../../components";
import { COLORS } from "../../../../components";
import { UserUI } from "types";
import { useNavigation } from "@react-navigation/native";
import { Routes } from "../../../../navigation";
import { DateHumanizer } from "../../../../utils";
import { ServerFormater } from "functions";

export function Header({ userToChat }: HeaderProps) {
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
                <BackIcon />
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.row}
                // onPress={() =>
                //     navigation.navigate(Routes.profile, {
                //         idUser: userToChat.id.toString(),
                //         userType: userToChat.type,
                //     })
                // }
            >
                <View style={styles.imageContainer}>
                    <Image
                        source={{
                            uri: ServerFormater.defaultImagePath(
                                userToChat.imageURL
                            ),
                        }}
                        style={styles.userImg}
                    />
                    {userToChat.isConnected && <ConnectedMark />}
                </View>
                <View>
                    <P style={styles.username} bold>
                        {userToChat.name}
                    </P>
                    {!userToChat.isConnected && (
                        <P style={styles.lastConnection}>
                            {DateHumanizer.fromNow(userToChat.lastConnection)}
                        </P>
                    )}
                </View>
            </TouchableOpacity>
        </View>
    );
}

type HeaderProps = PropsWithChildren<{
    userToChat: UserUI;
}>;

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        gap: spaces.m3,
        position: "absolute",
        top: 0,
        left: 0,
        backgroundColor: COLORS.neutral[200],
        padding: spaces.m3,
        width: "100%",
        zIndex: 11,
    },
    imageContainer: {
        position: "relative",
        width: 40,
        height: 40,
    },
    userImg: {
        width: "100%",
        height: "100%",
        borderRadius: borderRadius.extraLarge,
    },
    username: {
        fontSize: fontSizes.large,
    },
    row: {
        flexDirection: "row",
        alignItems: "center",
        gap: spaces.m3,
    },
    lastConnection: {
        fontSize: fontSizes.small,
        color: COLORS.neutral[600],
    },
});
