import { UserUI } from "types";
import {SenderAndReceiver} from "./common-types"

export class ChatSocketName {
    static chatJoin() {
        return "chat join";
    }

    static chatEmit() {
        return "chat emit";
    }

    static chatListener() {
        return "chat listener";
    }

    static chatRoom({ receiver, sender }: SenderAndReceiver) {
        return "chat between" + receiver.id + " and " + sender.id;
    }

    static chatSeenAllMessage() {
        return "chatSeenAllMessage"
    }

    static chatListenerSeenAllMessage() {
        return "chatSeenAllMessage"
    }

    static chatLeave() {
        return "chat leave"
    }
}

export class ChatListSocketName {
    static chatList() {
        return "chat list";
    }

    static emitChatListRefetch() {
        return "emit chatList refetch";
    }

    static chatListJoin() {
        return "chatList join";
    }

    static chatListRefetch() {
        return "chatList refetch";
    }

    static chatListRoom(user: UserUI) {
        return "chatList room" + user.id;
    }

    static chatListLeave() {
        return "chatList leave";
    }
}

