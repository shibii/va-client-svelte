<script>
  import api from "../services/api";
  import { user } from "../stores/user";

  let email;
  let password;

  const login = () => {
    api
      .login(email, password)
      .then((res) => user.set(res))
      .catch((err) => user.set(null));
  };
</script>

<p>login</p>
<form on:submit|preventDefault={login}>
  <label for="email">email</label>
  <input id="email" type="text" bind:value={email} />
  <label for="password">password</label>
  <input id="password" type="password" bind:value={password} />
  <input type="submit" value="login" />
</form>
