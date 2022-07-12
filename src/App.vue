<template>
  <div id="app">
    <b-overlay
      :show="$store.state.show"
      opacity="0"
      variant="info"
      rounded="lg"
      spinner-variant="success"
    >
      <router-view />
    </b-overlay>
  </div>
</template>


