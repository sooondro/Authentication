<template>
  <div>
    <h1>Sign up</h1>
    <div class="alert alert-dismissible alert-danger" v-if="errorMessage">
      {{ errorMessage }}
    </div>
    <form @submit.prevent="signup">
      <div class="form-group">
        <label for="username">Username</label>
        <input
        v-model="user.username"
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
          v-model="user.password"
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
          v-model="user.confirmPassword"
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
import Joi from 'joi';

const schema = Joi.object().keys({
  username: Joi.string().regex(/(^[a-zA-Z0-9_]+$)/).min(2).max(30)
    .required(),
  password: Joi.string().trim().min(8).required(),
  confirmPassword: Joi.string().trim().min(8).required(),
});

export default {
  data: () => ({
    errorMessage: '',
    user: {
      username: '',
      password: '',
      confirmPassword: '',
    },
  }),
  watch: {
    user: {
      handler() {
        this.errorMessage = '';
      },
      deep: true,
    },
  },
  methods: {
    signup() {
      this.errorMessage = '';
      if (this.validUser()) {
        console.log('Valid');
      }
    },
    validUser() {
      if (this.user.password !== this.user.confirmPassword) {
        this.errorMessage = 'Passwords must match';
        return false;
      }
      const result = Joi.validate(this.user, schema);
      if (result.error === null) {
        return true;
      }
      if (result.error.message.includes('username')) {
        this.errorMessage = 'Invalid username';
      } else {
        this.errorMessage = 'Password invalid';
      }
      return false;
    },
  },
};
</script>

<style>

</style>
