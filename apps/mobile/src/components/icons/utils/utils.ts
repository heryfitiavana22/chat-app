import { COLORS } from "../../colors" 
import { IconProps } from "../icon-type"

export const defaultColor = COLORS.neutral[700]

export const defaultProps = (props: IconProps): IconProps => ({
    size: props.size || 24,
    color: props.color || COLORS.neutral[500],
})

export const defaultSize = (size?: number) => size || 24

export const outlineOrSharp = (name: string, active = false) =>
    active ? `${name}-sharp` : `${name}-outline`
