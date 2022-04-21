import type { NextApiRequest, NextApiResponse } from 'next'

const handler = async(req: NextApiRequest, res: NextApiResponse) => {    
    const code = req.query.code;
    if (code) {
        res.redirect("/account?t=" + code);
    } else {
        res.status(400).send("No code provided");
    }
}

export default handler;