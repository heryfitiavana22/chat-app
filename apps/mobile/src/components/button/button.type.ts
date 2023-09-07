import { PropsWithChildren } from "react"
import { GestureResponderEvent, StyleProp, ViewStyle } from "react-native"
import { borderRadius } from "../ui-utils"

export type ButtonProps = PropsWithChildren<{
    onPress?: (e: GestureResponderEvent) => void
    style?: StyleProp<ViewStyle>
    outline?: boolean
    borderRadiusSize?: keyof typeof borderRadius
    iconLeft?: JSX.Element
    iconRight?: JSX.Element
}>
