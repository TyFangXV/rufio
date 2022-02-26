import {atom} from 'recoil'
import { Notif } from '../intefere'


export const notifications = atom<Notif[]>({
    key: 'notifications',
    default: [
        {
            id: "1",
            content: 'You have a new friend request from John Doe',
            type : "request",
            idOfSender : "21",
            time: '1 hour ago',
            profile : {
              name : 'John Doe',
              profile_pic : 'https://i1.sndcdn.com/avatars-twM1pq6gSk4YzN4F-N4zKuw-t500x500.jpg',
              id : '1'
            }
          },
          {
            id: "2",
            type : "message",
            idOfSender : "221",
            content: 'You have a new friend request from John Doe',
            time: '1 hour ago',
            profile : {
              name : 'John Doe',
              profile_pic : 'https://i1.sndcdn.com/avatars-twM1pq6gSk4YzN4F-N4zKuw-t500x500.jpg',
              id : "2"
            }
          },
    ],
})


export const showNotification = atom({
    key: 'showNotification',
    default: false,
})



