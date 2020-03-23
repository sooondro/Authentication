<template>
  <div>
    <h1>Sign up</h1>
    <form>
      <div class="form-group">
        <label for="username">Username</label>
        <input
        type="text"
        class="form-control"
        id="username"
        aria-describedby="usernameHelp"
        placeholder="Enter a username" required>
        <p id="usernameHelp" class="form-text text-muted">
          Username must be longer than two charactes and shorter than 30.
          Username can only contain alfanumeric characters and under_scores.
        </p>
      </div>
      <div class="form-row">
        <div class="form-group col-md-6">
          <label for="password">Password</label>
          <input
          type="password"
          class="form-control"
          id="password"
          placeholder="Password"
          aria-describedby="passwordHelp" required>
          <p id="passwordHelp" class="form-text text-muted">
            Password must contain 8 or more characters.
          </p>
        </div>
        <div class="form-group col-md-6">
          <label for="confirmPassword">Confirm Password</label>
          <input
          type="password"
          class="form-control"
          id="confirmPassword"
          placeholder="Password"
          aria-describedby="confirmPasswordHelp" required>
          <p id="confirmPasswordHelp" class="form-text text-muted">
            Please confirm password
          </p>
        </div>
      </div>
      <button type="submit" class="btn btn-primary">Signup</button>
    </form>
  </div>
</template>

<script>

export default {

};
</script>

<style>

</style>
