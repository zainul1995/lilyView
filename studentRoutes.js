/* eslint-disable*/
const express = require('express');
const Student = require('./StudentModel');
const { promisify } = require('util');
const jwt = require('jsonwebtoken');

const studentRouter = express.Router();

const adder = async(req, res, next) => {
      const doc = await Student.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      rollNo: req.body.rollNo,
      passwordConfirm: req.body.passwordConfirm
      });
     createSendToken(doc, 201, req, res);  
        
}

let token;
const signToken = id => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN
    });
  };
  
  const createSendToken = (user, statusCode, req, res) => {
    token = signToken(user._id);
    console.log(token);
    res.cookie('jwt', token,{
          expires: new Date(
                Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
              ),
            httpOnly: true,
            secure: req.secure || req.headers['x-forwarded-proto'] === 'https'
    });
        
        // Remove password from output
        user.password = undefined;

        

        res.status(statusCode).json({
            status: 'success',
            token,
            data: {
                user
            }
        });
        
    };

    const isLoggedIn = async (req, res, next) => {
        console.log(req.cookies.jwt);
        if (req.cookies.jwt) {
            console.log('happy');
          try {
            // 1) verify token
            console.log('happy');
            const decoded = await promisify(jwt.verify)(req.cookies.jwt, process.env.JWT_SECRET);
            
           console.log(decoded);
            //  async function(err, decoded){ 
                const currentUser = await Student.findById(decoded.id);
                console.log(currentUser);
                if (!currentUser) {
                  return next();
                }
          
                // 3) Check if user changed password after the token was issued
                // if (currentUser.changedPasswordAfter(decoded.iat)) {
                //   return next();
                // }
          
                // THERE IS A LOGGED IN USER
                res.locals.user = currentUser;
                req.user = currentUser;
                // res.status(200).json({
                //     status: 'success',
                //     token,
                //     data: {
                //         currentUser
                //     }
                // });
               next();
            } catch (err) {
            return next();
          }
        }else next();
        
      };
      
    
    const logger = (req, res, next) => {
        console.log(req.query);
        // res.send('happy from server side');
        next();
    }
    


    const output = async (req, res) => {        
        const data = req.user;
        // const data = res.locals.user;
        res.status(401).json({
            status: 'successful',
            message: 'authorRequest',
            data:{
                data
                 }
        });
    };




    
    studentRouter.route('/').get(output).post(adder);


    const loginForm = async(req,res,next) => {
        console.log(req.params);
        const token = req.cookies.jwt;
        if (!token){
            const {email, passWord} = await req.body;
            console.log(email,passWord);
            const data = await Student.findOne({email}).select('+password');
            
            if(await data.correctPassword(passWord, data.password)){
                console.log('password is correct');
                createSendToken(data, 201, req, res);
               
              } else { console.log('password is incorrect');
                          next();
                    }

        } else {
          next();
        }
    }
    
    studentRouter.route('/Login').post(loginForm, isLoggedIn, output);       
            
    //     res.status(401).json({
    //         status: 'successful',
    //         message: 'authorRequest',
    //         data:{
    //             data
    //             // name: 'zainul',
    //             // roll: 27,
    //             // property: 'king'
    //         }
    // })

module.exports = studentRouter;