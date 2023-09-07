import { useNavigation } from "@react-navigation/native";
import { useCallback, useState } from "react";
import { SubmitErrorHandler, SubmitHandler } from "react-hook-form";
import { Routes } from "../../../../navigation";
import { createData } from "repository";
import { saveUserInStorage } from "../../../../user-connected";
import { LoginValue } from "../login.type";
import { UserUI } from "types";

export function useSubmit() { 
    return useCallback(() => {
        const [message, setMessage] = useState("");
        const [submitting, setSubmitting] = useState(false);
        const navigation = useNavigation();

        const onSubmit: SubmitHandler<LoginValue> = async (data) => {
            setSubmitting(true);
            console.log(JSON.stringify(data));
            const response = await createData<UserUI>(
                "userIsValid",
                data as any
            );

            setSubmitting(false);
            if (response.status == "error")
                return setMessage("Pseudo ou mot de passe incorrect !");
            await saveUserInStorage(response.data);
            navigation.navigate(Routes.ChatList);
        };

        const onSubmitError: SubmitErrorHandler<LoginValue> = (error) => {
            setSubmitting(false);
            if (error.pseudo || error.password)
                setMessage("Renseigner tous les champs");
        };
        return {
            message,
            submitting,
            onSubmit,
            onSubmitError,
        };
    }, [])();
}
