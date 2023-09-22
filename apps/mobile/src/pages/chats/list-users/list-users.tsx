import { useQuery } from "@tanstack/react-query";
import { PropsWithChildren } from "react";
import { getData } from "repository";
import { UserUI } from "types";
import { BG_MAIN, CloseIcon, Loading, P, spaces } from "../../../components";
import {
    FlatList,
    Image,
    StyleSheet,
    TouchableOpacity,
    View,
} from "react-native";
import { ServerFormater } from "functions";
import { useNavigation } from "@react-navigation/native";
import { Routes } from "../../../navigation";
import { User } from "./components";

export function ListUsers({ onClose, userConnected }: ListUsersProps) {
    const navigation = useNavigation();
    const { data: response } = useQuery({
        queryKey: ["listusers to message"],
        queryFn: () => getData<UserUI>("users"),
    });
    if (!response) return <Loading />;
    const usersWithoutUserConnected = response.data.filter(
        (user) => userConnected.id !== user.id
    );

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={onClose}>
                <CloseIcon size={40} />
            </TouchableOpacity>
            <FlatList
                data={usersWithoutUserConnected}
                renderItem={({ item }) => (
                    <User user={item} onClose={onClose} />
                )}
                keyExtractor={(item) => item.id.toString()}
            />
        </View>
    );
}

type ListUsersProps = PropsWithChildren<{
    onClose: () => void;
    userConnected: UserUI;
}>;

const styles = StyleSheet.create({
    container: {
        position: "absolute",
        top: 0,
        left: 0,
        zIndex: 999,
        width: "100%",
        height: "100%",
        backgroundColor: BG_MAIN,
        padding: spaces.m2,
    },
    userContainer: {
        flexDirection: "row",
        gap: spaces.m3,
        paddingVertical: spaces.m3,
    },
    imageUser: {
        width: 50,
        height: 50,
    },
});
