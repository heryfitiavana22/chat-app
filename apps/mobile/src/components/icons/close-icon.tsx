import { IconProps } from "./icon-type"
import Icon from "react-native-vector-icons/Ionicons"
import { defaultProps } from "./utils"

export const CloseIcon = (props: IconProps) => (
    <Icon name="close-outline" {...defaultProps(props)} />
)
