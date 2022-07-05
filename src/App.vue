<template>
<b-overlay :show="$store.state.show" opacity="0.3" rounded="lg">
  <div id="app">
    
    <router-view/>
    
  </div>
  </b-overlay>
</template>


