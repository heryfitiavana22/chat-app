import { IconProps } from "./icon-type";
import Icon from "react-native-vector-icons/Ionicons";
import { defaultProps, outlineOrSharp } from "./utils";

export function SearchIcon(props: IconProps) {
    return (
        <Icon
            name={outlineOrSharp("search", props.isActive)}
            {...defaultProps(props)}
        />
    );
}
