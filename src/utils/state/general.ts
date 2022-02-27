import {atom} from 'recoil'
import { Notif } from '../intefere'






export const notifications = atom<Notif[]>({
    key: 'notifications',
    default: [
    {
        id: '1',
        content: 'COME DOWN U FOOL',
        idOfSender: '12',
        type: 'message',
        profile: {
            id: '12',
            name: 'John',
            profile_pic: 'https://static.wikia.nocookie.net/ba0628fe-3bc1-42c3-9c0c-aa91ba24f03c/scale-to-width/370'
        },
        time: '1:00'
    },
    {
        id: '2',
        content: 'YOOO, I AM THE BEST',
        idOfSender: '13',
        type: 'message',
        profile: {
            id: '13',
            name: 'John',
            profile_pic : "https://img.wattpad.com/02a5e95b305100adc5724e6f8e7466e8c063d7a1/68747470733a2f2f73332e616d617a6f6e6177732e636f6d2f776174747061642d6d656469612d736572766963652f53746f7279496d6167652f433678763444773679366f6d46413d3d2d3732363137313438342e3135396130396439363930313961396439303032353135393939302e6a7067?s=fit&w=720&h=720"
        },
        time: '1:00'
    },
    {
        id: '3',
        content: 'ADD ME U FOOL',
        idOfSender: '14',
        type: 'request',
        profile: {
            id: '14',
            name: 'John',
            profile_pic: 'https://static.wikia.nocookie.net/ba0628fe-3bc1-42c3-9c0c-aa91ba24f03c/scale-to-width/370'
        },
        time: '1:00'
    },
    ],
})


export const showNotification = atom({
    key: 'showNotification',
    default: false,
})


export const showFriendRequestTab = atom({
    key: 'showFriendRequestTab',
    default: false,
})


