<script>
  import { replace, link } from "svelte-spa-router";
  import api from "../services/api";
  import { user } from "../stores/user";

  let email;
  let password;

  const login = () => {
    api
      .login(email, password)
      .then((res) => {
        user.set(res);
        replace("/search");
      })
      .catch((err) => user.set(null));
  };
</script>

<style>
  .container {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  form {
    max-width: 360px;
    padding: 1rem 1.5rem;
  }
  label {
    font-size: 1rem;
    display: block;
  }
  input.field {
    margin-bottom: 0.7rem;
  }
  input.login {
    margin-top: 1.5rem;
  }
  input {
    display: block;
    width: 100%;
  }
  a {
    display: block;
    margin: auto;
    text-align: center;
  }
</style>

<div class="container">
  <form on:submit|preventDefault={login}>
    <label for="email">email</label>
    <input class="field" id="email" type="text" bind:value={email} />
    <label for="password">password</label>
    <input class="field" id="password" type="password" bind:value={password} />
    <input class="login" type="submit" value="login" />
    <a href="/signup" use:link>create a new account</a>
  </form>
</div>
