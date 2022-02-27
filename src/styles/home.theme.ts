import { ITheme } from "../utils/intefere";

const Theme: ITheme = {
    primary: "#001317",
    secondary: "#002531",
    tertiary: "#014257",
    outline: "#039ABB",
    endput: "#00C35A",
    enduser: "#02B88C",
    user: "#0095C3",
    button: "#002531",
    text: "#FFFFFF",
    notice: "#FFFFFF33",
    noticeglow: "#0AB3FB",
    success: "##00FF00",
}

export const UITheme = {
     Button: () => (
         { root: { background: Theme.tertiary, padding: '5px 5px 5px 5px' } }
     ), 
        Input: () => (
            { root: { background: Theme.tertiary, padding: '5px 5px 5px 5px' } }
        ),

}


export default Theme;