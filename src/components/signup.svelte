<script>
  import { replace } from "svelte-spa-router";
  import api from "../services/api";
  import { user } from "../stores/user";

  let email;
  let password;

  const signup = () => {
    api
      .signup(email, password)
      .then((res) => {
        user.set(res);
        replace("/search");
      })
      .catch((err) => user.set(null));
  };
</script>

<style>
  form {
    width: 50%;
  }
  label {
    font-size: medium;
    display: block;
  }
  input {
    display: block;
    width: 100%;
    margin-bottom: 1rem;
  }
</style>

<form on:submit|preventDefault={signup}>
  <label for="email">email</label>
  <input id="email" type="text" bind:value={email} />
  <label for="password">password</label>
  <input id="password" type="password" bind:value={password} />
  <input type="submit" value="sign up" />
</form>
