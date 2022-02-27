export type ITheme = {
    primary: string;
    secondary: string;
    tertiary: string;
    outline: string;
    endput: string;
    enduser: string;
    user: string;
    button: string;
    text: string;
    notice: string;
    noticeglow: string;
    success: string;
    
}


export type NotifProfile = {
    id: string;
    name: string;
    profile_pic : string
}

export type Notif = {
    id: string;
    content : string;
    idOfSender : string;
    type : string;
    profile : NotifProfile
    time : string;
    [key: string]: any;
}