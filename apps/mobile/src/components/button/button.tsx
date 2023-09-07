import { Pressable, StyleSheet, TouchableOpacity, View } from "react-native";
import { borderRadius, spaces } from "../ui-utils";
import { COLORS } from "../colors";
import { ButtonProps } from "./button.type";
import { P } from "../typography";

export function Button({
    children,
    style,
    borderRadiusSize = "large",
    onPress,
}: ButtonProps) {
    return (
        <TouchableOpacity onPress={onPress} style={style}>
            <View
                style={[
                    styles.button,
                    {
                        borderRadius: borderRadius[borderRadiusSize],
                    },
                ]}
            >
                <P style={styles.text}>{children}</P>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        padding: spaces.m3,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: COLORS.brandColor,
    },
    text: {
        color: "#fff",
    },
});
