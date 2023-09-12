import { PropsWithChildren } from "react";
import { StyleSheet, View } from "react-native";
import { borderRadius, fontSizes } from "../ui-utils";
import { COLORS } from "../colors";
import { P } from "../typography";
import { DateHumanizer } from "../../utils"; 

export function ConnectedMark({}: ConnectedMarkProps) {
    return <View style={styles.connected}></View>;
}

type ConnectedMarkProps = PropsWithChildren<{}>;

const styles = StyleSheet.create({
    connected: {
        width: 10,
        height: 10,
        borderRadius: borderRadius.rounded,
        backgroundColor: COLORS.success,
        position: "absolute",
        bottom: 0,
        right: 0,
    },
});
