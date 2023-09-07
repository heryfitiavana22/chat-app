import { IconProps } from "./icon-type";
import Icon from "react-native-vector-icons/Ionicons";
import { defaultProps } from "./utils";

export function ShareIcon(props: IconProps) {
    return <Icon name="navigate-sharp" {...defaultProps(props)} />;
}
