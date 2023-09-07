import Icon from "react-native-vector-icons/Ionicons"
import { IconProps } from "./icon-type"
import { defaultProps } from "./utils"

export const EyeSlashIcon = (props: IconProps) => (
    <Icon name="eye-off-outline" {...defaultProps(props)} />
)
