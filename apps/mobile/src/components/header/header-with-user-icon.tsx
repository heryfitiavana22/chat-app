import { View, StyleSheet, TouchableOpacity } from "react-native";
import { borderRadius, spaces } from "../ui-utils";
import { ChevronDown, ChevronUp, UserIcon } from "../icons";
import { COLORS } from "../colors";
import { useNavigation } from "@react-navigation/native";
import { UserUI } from "types";
import { PropsWithChildren, useState } from "react";
import { P } from "../typography";
import { ChatAppLogo } from "../chat-app-logo";

export function HeaderWithUserIcon({
    children,
    user,
    onSignOut,
}: HeaderWithUserIconProps) {
    const navigation = useNavigation();
    const [open, setOpen] = useState(false);

    return (
        <>
            <View style={styles.header}>
                <View style={styles.logo}>
                    <ChatAppLogo />
                    <TouchableOpacity
                        style={styles.toggleDropdown}
                        onPress={() => setOpen(!open)}
                    >
                        {open ? <ChevronUp /> : <ChevronDown />}
                    </TouchableOpacity>
                    {open && (
                        <View style={styles.dropdown}>
                            <TouchableOpacity
                                onPress={onSignOut}
                                activeOpacity={0.4}
                            >
                                <P>Déconnecter</P>
                            </TouchableOpacity>
                        </View>
                    )}
                </View>
                <TouchableOpacity style={styles.icon}>
                    <UserIcon />
                </TouchableOpacity>
            </View>
            <View style={styles.children}>{children}</View>
        </>
    );
}

const styles = StyleSheet.create({
    header: {
        paddingVertical: spaces.m4,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: spaces.m2,
    },
    logo: {
        flexDirection: "row",
        alignItems: "center",
    },
    toggleDropdown: {
        width: 30,
        height: 30,
        marginLeft: spaces.m3,
        alignItems: "center",
        justifyContent: "center",
    },
    icon: {
        width: 36,
        height: 36,
        backgroundColor: `${COLORS.primary[50]}50`,
        borderRadius: borderRadius.medium,
        justifyContent: "center",
        alignItems: "center",
    },
    dropdown: {
        position: "absolute",
        top: 60,
        left: 0,
        padding: spaces.m3,
        width: "100%",
        backgroundColor: COLORS.neutral[100]
    },
    children: {
        marginBottom: 128,
        marginTop: spaces.m3,
        paddingHorizontal: spaces.m2,
    },
});

type HeaderWithUserIconProps = PropsWithChildren<{
    user: UserUI;
    onSignOut: () => void;
}>;
