import { PropsWithChildren, useState } from "react";
import { StyleSheet, TextInput, TouchableOpacity, View } from "react-native";
import { ShareIcon, borderRadius, spaces } from "../../../../components";
import { COLORS } from "../../../../components";

export function InputMessage({ onSent }: InputMessageProps) {
    const [message, setMessage] = useState("");
    const onSubmit = () => {
        onSent(message);
        setMessage("");
    };

    return (
        <View style={styles.container}>
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Entrez un message"
                    placeholderTextColor={COLORS.neutral[500]}
                    value={message}
                    onChangeText={(e) => setMessage(e)}
                    onSubmitEditing={onSubmit}
                />
                <TouchableOpacity
                    style={[styles.customCenter, styles.send]}
                    onPress={onSubmit}
                >
                    <ShareIcon isActive />
                </TouchableOpacity>
            </View>
        </View>
    );
}

type InputMessageProps = PropsWithChildren<{
    onSent: (message: string) => void;
}>;

const styles = StyleSheet.create({
    container: {
        padding: spaces.m2,
        position: "absolute",
        bottom: 0,
        width: "100%",
    },
    inputContainer: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: spaces.m2,
        paddingHorizontal: spaces.m3,
        backgroundColor: COLORS.neutral[200],
        borderRadius: borderRadius.fourXL,
        gap: spaces.m2,
    },
    customCenter: {
        width: 38,
        height: 38,
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row",
    },
    input: {
        flex: 1,
        borderRadius: 50,
        paddingHorizontal: spaces.m1,
        color: COLORS.neutral[800],
        height: 38,
    },
    send: {},
});
