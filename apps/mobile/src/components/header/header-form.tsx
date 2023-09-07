import { View, StyleSheet, ScrollView } from "react-native";
import { fontSizes, spaces } from "../ui-utils";
import { P } from "../typography";
import { PropsWithChildren } from "react";
import { ChatAppLogo } from "../chat-app-logo";

export function HeaderForm({ title, children }: HeaderFormProps) {
    return (
        <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.container}>
                <View style={styles.header}>
                    <ChatAppLogo />
                    <P style={styles.title}>{title}</P>
                </View>
                <View style={styles.content}>
                    <View style={styles.children}>{children}</View>
                </View>
            </View>
        </ScrollView>
    );
}

type HeaderFormProps = PropsWithChildren<{ title: string }>;

const styles = StyleSheet.create({
    container: {},
    header: {
        alignItems: "center",
        gap: spaces.m3,
        marginTop: spaces.m9,
    },
    title: {
        fontSize: fontSizes.threeXL,
        textAlign: "center",
        marginTop: spaces.m3,
    },
    content: {
        marginTop: spaces.m9,
        marginBottom: spaces.m5,
        paddingHorizontal: spaces.m5,
    },
    children: {
        rowGap: spaces.m4,
    },
});
