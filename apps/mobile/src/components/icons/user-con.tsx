import { IconProps } from "./icon-type"
import Icon from "react-native-vector-icons/Ionicons"
import { defaultProps } from "./utils"

export function UserIcon(props: IconProps) {
    return <Icon name="person-outline" {...defaultProps(props)} />
}

export function UserIconAdd(props: IconProps) {
    return <Icon name="person-add-outline" {...defaultProps(props)} />
}
