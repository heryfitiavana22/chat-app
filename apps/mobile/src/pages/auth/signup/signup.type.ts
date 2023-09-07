import { UserUI } from "types";

export type UserRegister = Pick<UserUI, "name" | "pseudo"> & {
    password: string;
    confirmPassword: string
};
