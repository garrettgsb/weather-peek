import React, { useState, useRef } from 'react';
import { signup, login } from '../api.js';

const Authenticate = ({ account, setAccount, setToken, persistCityList }) => {
  const [error, setError] = useState(null);
  const nameRef = useRef();
  const passwordRef = useRef();
  const newAccountRef = useRef();

  const onSubmit = async e => {
    e.preventDefault();
    const isNewAccount = newAccountRef.current ? newAccountRef.current.checked : null;
    const name = nameRef.current ? nameRef.current.value : null;
    const password = passwordRef.current ? passwordRef.current.value : null;
    if (!name || !password) return;

    let retrievedAccount;
    if (isNewAccount) {
      retrievedAccount = await signup(name, password);
    } else {
      retrievedAccount = await login(name, password);
    }

    console.log(retrievedAccount);
    if (retrievedAccount.error) {
      setError(retrievedAccount.error);
      return;
    }

    if (retrievedAccount.token) setToken(retrievedAccount.token);
    if (retrievedAccount.tokens) setToken(retrievedAccount.tokens[0]);
    if (retrievedAccount.name) setAccount(retrievedAccount);
  }


  if (account && account.name) {
    return (
      <aside className='logged-in'>
        <span>Logged in as {account.name}</span>
        <button onClick={() => setToken(null)}>Logout</button>
      </aside>
    )
  }

  return (
    <aside className='authenticate'>
      { error && <p onClick={() => setError(null)}>{error}</p>}
      <form onSubmit={onSubmit}>
        <input ref={nameRef} type='text' placeholder='Account name...' />
        <input ref={passwordRef} type='password' placeholder='Password...' />
        <div>
          <input ref={newAccountRef} id='signup' type='checkbox' />
          <label htmlFor='signup'>This is a new account</label>
        </div>
        <button type='submit'>Authenticate</button>
      </form>
    </aside>
  );
};

export default Authenticate;
