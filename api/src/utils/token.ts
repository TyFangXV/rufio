import * as uuid from 'uuid';
import tokenSchema from './schema/token';


/* 
   function to save and generate the token that 
   will be used to authenticate all requests send by the user
*/

const generateToken = async(user_id:string) => {
    try {
        const data = {
            _id : user_id,
            token : uuid.v4(),
            expiration : Date.now() + 1000 * 60 * 60 * 48
        }

        //check if the token exists
        const tokenExists = await tokenSchema.findById(user_id);
        if(tokenExists !== null)
        {
            //check if the token is expired
            if(tokenExists.expiration > new Date().getSeconds())
            {
                await tokenSchema.findByIdAndUpdate(user_id, data);
                return data;
            }else{
                return tokenExists;
            }
        }
        else
        {
            const token = new tokenSchema(data)
            await token.save();
            return token;            
        }
    } catch (error) {
        throw error;
    }
}


export default generateToken;