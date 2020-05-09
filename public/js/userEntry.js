/*eslint-disable*/

import axios from 'axios';
export const login = async (email, password) => {
  try {
    const res = await axios({
      method: 'POST',
      url: '/api/v1/user/login',
      data: {
        email,
        password
      }
    });
    
    if (res.data.status === 'success') {
      console.log('success', 'Logged in successfully!');
      window.setTimeout(() => {
        location.assign('/dashboard');
      }, 1500);
    }
  } catch (err) {
    console.log('error', err.response.data.message);
  }
};

export const signup = async (name,email,password,passwordConfirm) => {
    try {
        const res = await axios({
            method: 'POST',
            url: '/api/v1/user/signup',
            data: {
              name,
              email,
              password,
              passwordConfirm
            }
          });
      
          if (res.data.status === 'success') {
            console.log(res.data);
            window.setTimeout(() => {
              location.assign('/dashboard');
            }, 15000);
          }

    } catch(err) {
        console.log('error', err.response.data.message);
    }
}
