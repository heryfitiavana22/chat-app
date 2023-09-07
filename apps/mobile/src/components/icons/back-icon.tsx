import Icon from "react-native-vector-icons/Ionicons"
import { IconProps } from "./icon-type"
import { defaultProps } from "./utils"

export const BackIcon = (props: IconProps) => (
    <Icon name="return-up-back" {...defaultProps(props)} />
)
