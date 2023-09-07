import { PropsWithChildren, useEffect } from "react";
import {
    Button,
    COLORS,
    HeaderForm,
    Input,
    Loading,
    P,
} from "../../../components";
import { useSubmit } from "./hooks";
import { useNavigation } from "@react-navigation/native";
import { Controller, useForm } from "react-hook-form";
import { LoginValue } from "./login.type";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Routes } from "../../../navigation";
import { useUserConnected } from "../../../user-connected";

export function Login({}: LoginProps) {
    const { message, submitting, onSubmit, onSubmitError } = useSubmit();
    const navigation = useNavigation();
    const { control, handleSubmit } = useForm<LoginValue>();
    const { isConnected } = useUserConnected();

    useEffect(() => {
        if (isConnected) navigation.navigate(Routes.ChatList);
    }, []);

    return (
        <>
            <HeaderForm title="Login">
                <Controller
                    control={control}
                    rules={{ required: true }}
                    name="pseudo"
                    render={({ field: { onBlur, onChange, value } }) => (
                        <Input
                            label="Pseudo :"
                            value={value}
                            placeholder="pseudo"
                            onChangeText={onChange}
                            onBlur={onBlur}
                        />
                    )}
                />
                <Controller
                    control={control}
                    rules={{ required: true }}
                    name="password"
                    render={({ field: { onBlur, onChange, value } }) => (
                        <Input
                            label="Mot de passe :"
                            value={value}
                            placeholder="mot de passe"
                            onChangeText={onChange}
                            onBlur={onBlur}
                            password
                        />
                    )}
                />
                <Button onPress={handleSubmit(onSubmit, onSubmitError)}>
                    Se connecter
                </Button>
                {message && <P style={styles.message}>{message}</P>}
                <View style={styles.footer}>
                    <TouchableOpacity
                        onPress={() => navigation.navigate(Routes.SignUp)}
                    >
                        <P bold>S'inscrire</P>
                    </TouchableOpacity>
                </View>
            </HeaderForm>
            {submitting && <Loading />}
        </>
    );
}

type LoginProps = PropsWithChildren<{}>;

const styles = StyleSheet.create({
    message: {
        textAlign: "center",
        color: COLORS.error,
    },
    footer: {
        justifyContent: "center",
        alignItems: "center",
        gap: 12,
    },
});
