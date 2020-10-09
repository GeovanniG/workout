import React, { useState } from 'react';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('')

    const signUp = () => {
        return true;
    }

    const checkPassword = (e) => {
        const password = e.target.value;
        if (password.length < 4) return
    }

    return (
        <form>
            <label htmlFor="email">Email: </label>
            <input id="email" type="email" value={email} onChange={((e) => setEmail(e.target.value))} />
            <label htmlFor="password">Password: </label>
            <input id="password" type="password" value={password} onChange={checkPassword} aria-describedby="password-hint" />
            <p id="password-hint">Your password must be at least 8 characters in length. 
                It must contain a mixture of upper and lower case letters, numbers and punctuation marks.</p>
            <p>Google</p>
            <p>Facebook</p>
            <button type='button' onSubmit={signUp}>Sign up</button>
        </form>
    )
}

export default Login;