import { Notif } from "./intefere"
import { useRecoilState } from "recoil"

export const removeNotification = (notifications: Notif[], id: string) => {
    return notifications.filter(notif => notif.id !== id)
}
