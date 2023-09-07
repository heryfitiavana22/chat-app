import { PropsWithChildren } from "react"
import { Text } from "react-native"

export function ChatBox({}: ChatBoxProps) {
    return <Text>ChatBox</Text>
}

type ChatBoxProps = PropsWithChildren<{}>
