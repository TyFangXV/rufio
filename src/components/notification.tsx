import Request from './notification/request';
import React from 'react';
import { Notif } from '../utils/intefere';
import Message from './notification/message';

type dataProps = {
  data: Notif[];
};

const Notification: React.FC<dataProps> = ({ data }) => {
  return (
    <div>
      {data.map((item, index) => {
        switch (item.type) {
          case 'request':
            return (
              <Request
                key={index}
                profile={item.profile}
                content={item.content}
                time={item.time}
                id={item.id}
                type={''}
                idOfSender={item.idOfSender}
              />
            );
          case 'message':
            return (
              <Message
                key={index}
                profile={item.profile}
                content={item.content}
                time={item.time}
                id={item.id}
                idOfSender={item.idOfSender}
                type={''}
              />
            );
          default:
            return (
              <div>
                <div>{item.content}</div>
                <div>{item.time}</div>
              </div>
            );
        }
      })}
    </div>
  );
};

export default Notification;
