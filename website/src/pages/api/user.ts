import { NextApiRequest, NextApiResponse } from "next";
import Encrypto from "../../utils/encrypter";

const handler = (req: NextApiRequest, res: NextApiResponse) => {
    const encrypto = new Encrypto();
    const token = req.query.token;
    if (token) 
    {
        console.log(token);
        res.send(encrypto.decryptText(token as string))
/*        const decrypted = encrypto.decryptText(token as string);
        if (decrypted) {
            res.status(200).json({ decrypted });
        } else {
            res.status(500).json({ error: "Failed to decrypt token" });
        }*/
    }else{
        res.status(400).send("No code provided");
    }
}

export default handler;