import express from 'express';


//to empty cookie
const router = express.Router();

router.post('/api/users/signout',(req,res)=>{
    req.session = null;
    res.send({});

});

export {router as signoutRouter}