import Icon from "react-native-vector-icons/Ionicons"
import { IconProps } from "./icon-type"
import { defaultProps } from "./utils"

export const EyeIcon = (props: IconProps) => (
    <Icon name="eye-outline" {...defaultProps(props)} />
)
