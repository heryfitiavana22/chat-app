import Icon from "react-native-vector-icons/Ionicons";
import { IconProps } from "./icon-type";
import { defaultProps } from "./utils";

export const EditIcon = (props: IconProps) => {
    return <Icon name="create-outline" {...defaultProps(props)} />;
};
