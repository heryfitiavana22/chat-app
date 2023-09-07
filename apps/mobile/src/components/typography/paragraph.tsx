import { StyleSheet, Text, TextProps } from "react-native"
import { COLORS } from "../colors" 

export function P(props: PProps) {
    return (
        <Text
            {...props}
            style={[
                styles.text,
                { fontWeight: props.bold ? "bold" : "normal" },
                props.style,
            ]}
        />
    )
}

type PProps = TextProps & {
    bold?: boolean
}

const styles = StyleSheet.create({
    text: {
        color: COLORS.neutral[700],
    },
})
