import { useState } from "react";
import {
    View,
    TextInput,
    StyleSheet,
    NativeSyntheticEvent,
    TextInputSubmitEditingEventData,
    TextInputFocusEventData,
    TouchableOpacity,
} from "react-native";
import { borderRadius, spaces } from "../ui-utils";
import { EyeIcon, EyeSlashIcon } from "../icons";
import { COLORS } from "../colors";
import { P } from "../typography";

export function Input({
    type,
    label,
    placeholder,
    value,
    password = false,
    onSubmit,
    onChangeText,
    optional = false,
    borderRadiusSize = "large",
}: InputProps) {
    const [hide, setHide] = useState(true);

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <P style={styles.label}>{label}</P>
                {optional && <P style={styles.optional}>(facultatif)</P>}
            </View>
            <View
                style={[
                    styles.inputContainer,
                    { borderRadius: borderRadius[borderRadiusSize] },
                ]}
            >
                <TextInput
                    style={styles.input}
                    placeholder={placeholder}
                    value={value}
                    inputMode={type}
                    secureTextEntry={password && hide}
                    onChangeText={onChangeText}
                    onSubmitEditing={onSubmit}
                    onBlur={(e) => e}
                    placeholderTextColor={COLORS.neutral[400]}
                />
                {password && (
                    <TouchableOpacity
                        style={styles.eye}
                        onPress={(e) => setHide(!hide)}
                    >
                        {hide ? (
                            <EyeIcon color={COLORS.neutral[500]} />
                        ) : (
                            <EyeSlashIcon color={COLORS.neutral[500]} />
                        )}
                    </TouchableOpacity>
                )}
            </View>
        </View>
    );
}

type InputProps = {
    label?: string;
    placeholder?: string;
    value: string;
    password?: boolean;
    optional?: boolean;
    type?:
        | "decimal"
        | "email"
        | "none"
        | "numeric"
        | "search"
        | "tel"
        | "text"
        | "url";
    onSubmit?: (
        value: NativeSyntheticEvent<TextInputSubmitEditingEventData>
    ) => void;
    onChangeText: (value: string) => void;
    onBlur?: (e: NativeSyntheticEvent<TextInputFocusEventData>) => void;
    borderRadiusSize?: keyof typeof borderRadius;
};

const styles = StyleSheet.create({
    container: {
        rowGap: 8,
    },
    header: {
        flexDirection: "row",
    },
    label: {},
    optional: {
        marginLeft: spaces.m1,
    },
    inputContainer: {
        position: "relative",
        flexDirection: "row",
        width: "100%",
        justifyContent: "space-between",
        backgroundColor: COLORS.neutral[200],
    },
    input: {
        paddingVertical: spaces.m3,
        paddingHorizontal: spaces.m4,
        width: "90%",
        color: COLORS.neutral[800],
    },
    eye: {
        position: "relative",
        top: spaces.m3,
        right: spaces.m2,
        width: 28,
        height: 28,
    },
});
