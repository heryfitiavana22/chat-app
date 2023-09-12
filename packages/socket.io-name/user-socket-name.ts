export class UserSocketName {
    static emitConnected() {
        return "emit connected" as const
    }

    static emitDeconnected() {
        return " deconnected" as const
    }
}
