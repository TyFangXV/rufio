import Request from '../notification/request';
import React from 'react';
import { Notif } from '../../utils/intefere';
import Message from '../notification/message';
import AnimationContainer from '../notification/animationContainer';

type dataProps = {
  data: Notif[];
  onClick: (id: string) => void;
};

const Notification: React.FC<dataProps> = ({ data, onClick }) => {
  return (
    <div>
      {data.map((item, index) => {
        switch (item.type) {
          case 'request':
            return (
              <AnimationContainer>
                <Request
                  onclick={onClick}
                  key={index}
                  profile={item.profile}
                  content={item.content}
                  time={item.time}
                  id={item.id}
                  type={''}
                  idOfSender={item.idOfSender}
                />
              </AnimationContainer>
            );
          case 'message':
            return (
              <AnimationContainer>
                <Message
                  onclick={onClick}
                  key={index}
                  profile={item.profile}
                  content={item.content}
                  time={item.time}
                  id={item.id}
                  idOfSender={item.idOfSender}
                  type={''}
                />
              </AnimationContainer>
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
