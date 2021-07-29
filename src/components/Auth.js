import { useHistory } from 'react-router-dom';
import React, { useState } from 'react';
import { Input, Form } from './styled';

function Auth({ setCurrentUser }) {
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [address, setAddress] = useState('');
  const [errors, setErrors] = useState(null);

  const history = useHistory();

  async function handleSubmit(e) {
    e.preventDefault();
    const user = {
      user_name: username,
      password,
      address,
    };
    const res = await fetch(`http://localhost:3001/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ user }),
    });
    const userData = await res.json();
    if (res.ok) {
      console.log(userData);
      setCurrentUser(userData);
      debugger;
      history.push('/');
    } else {
      setErrors(userData.message);
    }
  }

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <h1>Sign up</h1>
        <Input
          type='text'
          placeholder='User Name'
          value={username}
          name='username'
          onChange={(e) => setUserName(e.target.value)}
        ></Input>
        <Input
          type='text'
          placeholder='Password'
          value={password}
          name='password'
          onChange={(e) => setPassword(e.target.value)}
        ></Input>
        <Input
          type='text'
          placeholder='address'
          value={address}
          name='address'
          onChange={(e) => setAddress(e.target.value)}
        ></Input>
        <Input submit type='submit' value='Sign up'></Input>
        {errors ? errors.map((error) => <div>{error}</div>) : null}
      </Form>
    </>
  );
}
export default Auth;
