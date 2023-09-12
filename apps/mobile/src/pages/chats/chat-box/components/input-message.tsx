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
                {/* <View style={[styles.customCenter, styles.plus]}>
                    <PlusIcon isActive />
                </View> */}
                <TextInput
                    style={styles.input}
                    placeholder="entrer votre message"
                    placeholderTextColor={"#808080"}
                    value={message}
                    onChangeText={(e) => setMessage(e)}
                    onSubmitEditing={onSubmit}
                />
                <TouchableOpacity
                    style={[styles.customCenter, styles.send]}
                    onPress={onSubmit}
                >
                    <ShareIcon />
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
        bottom: 12,
        width: "100%",
        // flex: 1
    },
    inputContainer: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: spaces.m2,
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
    plus: {
        marginRight: spaces.m2,
        paddingLeft: spaces.m2,
    },
    input: {
        flex: 1,
        padding: 0,
        borderRadius: 50,
        fontSize: 15,
        paddingHorizontal: spaces.m1,
        color: COLORS.neutral[800],
        height: 38,
    },
    send: {
        position: "relative",
        right: 10,
    },
});
