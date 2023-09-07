import { IconProps } from "./icon-type"
import Icon from "react-native-vector-icons/Ionicons"
import { defaultProps } from "./utils"

export function ChevronDown(props: IconProps) {
    return <Icon name="chevron-down-outline" {...defaultProps(props)} />
}

export function ChevronUp(props: IconProps) {
    return <Icon name="chevron-up-outline" {...defaultProps(props)} />
}
