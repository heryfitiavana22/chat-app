import { PropsWithChildren } from "react";
import {
    Button,
    COLORS,
    HeaderForm,
    Input,
    Loading,
    P,
} from "../../../components";
import { useNavigation } from "@react-navigation/native";
import { useSubmit } from "./hooks";
import { Controller, useForm } from "react-hook-form";
import { UserRegister } from "./signup.type";
import { StyleSheet, TouchableOpacity, View } from "react-native";

export function Signup({}: SignupProps) {
    const navigation = useNavigation();
    const { message, submitting, onSubmit } = useSubmit();
    const { control, handleSubmit } = useForm<UserRegister>();

    return (
        <>
            <HeaderForm title="S'inscrire">
                <Controller
                    control={control}
                    rules={{ required: true }}
                    name="name"
                    render={({ field: { onChange, onBlur, value } }) => (
                        <Input
                            label="Nom :"
                            placeholder="chatapp"
                            value={value}
                            onChangeText={onChange}
                            onBlur={onBlur}
                        />
                    )}
                />
                <Controller
                    control={control}
                    rules={{ required: true }}
                    name="pseudo"
                    render={({ field: { onChange, onBlur, value } }) => (
                        <Input
                            label="Pseudo :"
                            placeholder="pseudo1234"
                            value={value}
                            onChangeText={onChange}
                            onBlur={onBlur}
                        />
                    )}
                />
                <Controller
                    control={control}
                    rules={{ required: true }}
                    name="password"
                    render={({ field: { onChange, onBlur, value } }) => (
                        <Input
                            label="Mot de passe :"
                            placeholder="mot de passe"
                            value={value}
                            onChangeText={onChange}
                            onBlur={onBlur}
                            password
                        />
                    )}
                />
                <Controller
                    control={control}
                    rules={{ required: true }}
                    name="confirmPassword"
                    render={({ field: { onChange, onBlur, value } }) => (
                        <Input
                            label="Confirmation mot de passe :"
                            placeholder="confirmation mot de passe"
                            value={value}
                            onChangeText={onChange}
                            onBlur={onBlur}
                            password
                        />
                    )}
                />
                <Button onPress={handleSubmit(onSubmit)}>S'inscrire</Button>
                {message && <P style={styles.message}>{message}</P>}
                <View style={styles.footer}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <P bold>Se connecter</P>
                    </TouchableOpacity>
                </View>
            </HeaderForm>
            {submitting && <Loading />}
        </>
    );
}

type SignupProps = PropsWithChildren<{}>;

const styles = StyleSheet.create({
    container: {
        rowGap: 16,
    },
    message: {
        textAlign: "center",
        color: COLORS.error,
    },
    footer: {
        flexDirection: "row",
        justifyContent: "center",
    },
});
