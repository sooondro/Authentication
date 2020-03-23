<template>
  <div class="home text-center">
    <div class="jumbotron">
      <h1 class="display-3">Auth for Newbs</h1>
      <p class="lead">Learning auth online!</p>
      <hr class="my-4">
      <p>Slow and steady wins the race!</p>
      <p class="lead">
        <router-link class="btn btn-primary btn-lg" :to="{name:'signup'}" role="button">
          Sign up
        </router-link>
      </p>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Home',
};
</script>
