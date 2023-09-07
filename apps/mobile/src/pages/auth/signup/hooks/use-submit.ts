import { useNavigation } from "@react-navigation/native";
import { useCallback, useState } from "react";
import { SubmitHandler } from "react-hook-form";
import { Routes } from "../../../../navigation";
import { UserRegister } from "../signup.type";
import { createData } from "repository";
import { saveUserInStorage } from "../../../../user-connected";
import { UserUI } from "types";

export function useSubmit() {
    return useCallback(() => {
        const [message, setMessage] = useState("");
        const [submitting, setSubmitting] = useState(false);
        const navigation = useNavigation();

        const onSubmit: SubmitHandler<UserRegister> = async (data) => {
            if (data.password !== data.confirmPassword)
                return setMessage(
                    "Les deux mots de passe ne sont pas identiques"
                );

            setSubmitting(true);
            const { confirmPassword, ...info } = data;
            const user = {
                id: 0,
                name: data.name,
                pseudo: data.pseudo,
                password: data.password,
                imageURL: null
            };
            const response = await createData<UserUI>("user", user as any);
            setSubmitting(false);
            if (response.status == "error")
                return setMessage("Pseudo déjà existant");
            saveUserInStorage(response.data);
            navigation.navigate(Routes.ChatList);
        };

        return {
            message,
            submitting,
            onSubmit,
        };
    }, [])();
}
