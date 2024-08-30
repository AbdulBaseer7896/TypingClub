import React, {  useState } from 'react';

const Register = ({ openLogin }) => {
    console.log("this si the register fuction")
  const [formData, setFormData] = useState({
    name: '',
    userName: '',
    email: '',
    number: '',
    password: '',
    conformedP: ''
  });

  const getValue = (event) => {
    console.log("this isthe get value funtion")
    const { name, value } = event.target;
    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: value
    }));
  };

  const saveData = (event) => {
    console.log("this is the save data funtion")
    event.preventDefault();

    if (formData.password !== formData.conformedP) {
      alert("Passwords do not match");
      return;
    }

    fetch('http://127.0.0.1:5000/SignUp', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })
      .then(response => response.json())
      .then(responseData => {
        console.log('Success:', responseData);
        if (responseData.message !== 'Email, Username, or Number already exists!'  && responseData.message !== 'An error occurred: Unread result found') {
          alert("Your account is registered successfully");
          openLogin();
          setFormData({
            name: '',
            userName: '',
            email: '',
            number: '',
            password: '',
            conformedP: ''
          });
        } else {
          alert(responseData.message);
        }
      })
      .catch(error => console.error('Error:', error));
  };

  return (
    <div>
      <h2 className='text-2xl font-bold mb-4'>Sign Up</h2>
      <form onSubmit={saveData}>
        <div className='mb-4'>
          <label className='block text-gray-700' htmlFor="">Name</label>
          <input
            value={formData.name}
            onChange={getValue}
            required
            name="name"
            className='w-full px-3 py-2 border'
            type="text"
            placeholder='Enter Name'
          />
        </div>
        <div className='mb-4'>
          <label className='block text-gray-700' htmlFor="">User Name</label>
          <input
            value={formData.userName}
            onChange={getValue}
            required
            name="userName"
            className='w-full px-3 py-2 border'
            type="text"
            placeholder='Enter User Name'
          />
        </div>
        <div className='mb-4'>
          <label className='block text-gray-700' htmlFor="">Email</label>
          <input
            value={formData.email}
            onChange={getValue}
            required
            name="email"
            className='w-full px-3 py-2 border'
            type="email"
            placeholder='Enter Email'
          />
        </div>
        <div className='mb-4'>
          <label className='block text-gray-700' htmlFor="">Number</label>
          <input
            minLength={11}
            maxLength={11}
            value={formData.number}
            onChange={getValue}
            required
            name="number"
            className='w-full px-3 py-2 border'
            type="text"
            placeholder='Enter Number'
          />
        </div>
        <div className='mb-4'>
          <label className='block text-gray-700' htmlFor="">Password</label>
          <input
            minLength={8}
            maxLength={15}
            value={formData.password}
            onChange={getValue}
            required
            name="password"
            className='w-full px-3 py-2 border'
            type="password"
            placeholder='Enter Password'
          />
        </div>
        <div className='mb-4'>
          <label className='block text-gray-700' htmlFor="">Confirm Password</label>
          <input
            minLength={8}
            maxLength={15}
            value={formData.conformedP}
            onChange={getValue}
            required
            name="conformedP"
            className='w-full px-3 py-2 border'
            type="password"
            placeholder='Enter Password Again'
          />
        </div>
        <div className='mb-4'>
          <button
            type="submit"
            className='w-full bg-red-600 text-white py-2'
          >
            Sign Up
          </button>
        </div>
      </form>
      <div className='text-center'>
        <span className='text-gray-700'>Already have an Account?</span>
        <button
          type="button"
          className='text-red-800'
          onClick={openLogin}
        >
          Login
        </button>
      </div>
    </div>
  );
}

export default Register;