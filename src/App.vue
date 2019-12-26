<template>
  <div>
    <notifications position="top right" classes="notification" group="notifications" />
    <router-view />
  </div>
</template>

<style>
.text-abbey-light {
  color: rgb(250, 235, 215);
}

.text-abbey-dark {
  color: #b09348;
}

.bg-abbey-light {
  background-color: rgb(250, 235, 215);
}

.bg-abbey-dark {
  background-color: #b09348;
}

.bg-abbey-darker {
  background-color: #5e4f27;
}

.btn-abbey {
  background-color: #b09348;
  color: rgb(250, 235, 215);
}

.btn-abbey:hover,
.btn-abbey:active,
.btn-abbey:focus {
  background-color: rgb(250, 235, 215);
  color: #b09348;
  box-shadow: none;
}

.btn-abbey.router-link-active {
  background-color: rgb(250, 235, 215);
  color: #b09348;
  box-shadow: none;
}
</style>
