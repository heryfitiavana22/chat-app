import { StyleSheet, View } from "react-native"
import { COLORS } from "../colors"
import { P } from "../typography"

export function Loading({}: LoadingProps) {
    return (
        <View style={styles.container}>
            <P>Loading...</P>
        </View>
    )
}

type LoadingProps = {}

const styles = StyleSheet.create({
    container: {
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        zIndex: 10000,
        backgroundColor: COLORS.neutral[200],
    },
})
