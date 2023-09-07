import { useNavigation } from "@react-navigation/native";
import { PropsWithChildren } from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import { fontSizes, spaces } from "../ui-utils";
import { BackIcon } from "../icons";
import { P } from "../typography";

export function HeaderWithBackButton({
    title,
    children,
}: HeaderWithBackButtonProps) {
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={styles.headerContent}>
                    <TouchableOpacity
                        onPress={() => navigation.goBack()}
                        style={styles.backButton}
                    >
                        <BackIcon />
                    </TouchableOpacity>
                    <P style={styles.title}>{title}</P>
                    <View>{/* view fantome */}</View>
                </View>
            </View>

            <View style={styles.children}>{children}</View>
        </View>
    );
}

type HeaderWithBackButtonProps = PropsWithChildren<{
    title: string;
}>;

const styles = StyleSheet.create({
    container: {},
    header: {
        flexDirection: "row",
        alignItems: "center",
        width: "100%",
        position: "absolute",
        top: 0,
        left: 0,
        zIndex: 111,
    },
    headerContent: {
        flexDirection: "row",
        justifyContent: "space-between",
        padding: spaces.m4,
        width: "100%",
        // borderBottomWidth: 1,
        // borderColor: COLORS.neutral[300],
    },
    backButton: {},
    title: {
        fontWeight: "bold",
        fontSize: fontSizes.large,
    },
    children: {
        maringTop: 56,
        width: "100%",
    },
});
