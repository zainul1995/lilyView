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
      swal('success', 'Logged in successfully!', 'success');
      window.setTimeout(() => {
        location.assign('/dashboard');
      }, 1500);
    }
  } catch (err) {
    swal(`${err.response.data.status}`, `${err.response.data.message}`, "error");
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
            
            window.setTimeout(() => {
              location.assign('/dashboard');
            }, 15000);
          }

    } catch(err) {
        swal(`${err.response.data.status}`, `${err.response.data.message}`, "error");
        // console.log('error', err.response.data.message);
    }
}
