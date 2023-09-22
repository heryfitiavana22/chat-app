import { PropsWithChildren } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { StyleSheet, View } from "react-native";
import { Navigation } from "./navigation";
import { spaces } from "./components";

const queryClient = new QueryClient();

export function Main({}: MainProps) {
    return (
        <QueryClientProvider client={queryClient}>
            <View style={styles.container}>
                <Navigation />
            </View>
        </QueryClientProvider>
    );
}

type MainProps = PropsWithChildren<{}>;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
