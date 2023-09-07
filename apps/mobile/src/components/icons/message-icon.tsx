import { IconProps } from "./icon-type";
import Icon from "react-native-vector-icons/Ionicons";
import { defaultProps, outlineOrSharp } from "./utils";

export function MessageIcon(props: IconProps) {
    return (
        <Icon
            name={outlineOrSharp("chatbubble", props.isActive)}
            {...defaultProps(props)}
        />
    );
}
