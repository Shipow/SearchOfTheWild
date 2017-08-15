import Vue from 'vue'
import App from './App.vue'
import InstantSearch from 'vue-instantsearch';

Vue.use(InstantSearch);

new Vue({
  el: '#app',
  render: h => h(App)
})

Vue.component('hp-meter', {
  template: '<span v-html="hearth"></span>',
  props: ['hp', 'icon-width'],
  computed: {
    hearth() {
      var hearth = "";
      var width = this.iconWidth;
      var hp = parseFloat(this.hp) * 4;

      if (hp) {
        var hp_icons = [20,4,3,2,1];
        while (hp !== 0){
          hp_icons.forEach(
            function(hp_icon){
              if (hp / hp_icon >= 1){
                var n = parseInt(hp / hp_icon);
                hp = hp - (n * hp_icon);
                for (var i = 0; i < n; i++){
                  hearth += '<img src="src/assets/icons/icon-hp' + hp_icon + '.svg" width="' + width + '">';
                }
              }
            }
          )
        }
      }
      return hearth;
    }
  }
})

Vue.component('effect-meter', {
  template: '<span class="tag" v-html="x"></span>',
  props: ['effect', 'potential', 'icon-width'],
  computed: {
    x() {

      if (this.effect) {

        var width = this.iconWidth;
        var potential = parseFloat(this.potential) || false;
        var effect = this.effect.toLowerCase();
        var x = '<img src="src/assets/icons/icon-effect-' + effect + '.svg" width="' + width + '">&nbsp;' + this.effect;

        var effects_config = {
          energizing: {
            short: "sta",
            steps: [5,4,3,2,1]
          },
          hearty: {
            short: "extraHp",
            steps: [1]
          },
          enduring: {
            short: "extraSta",
            steps: [5,4,3,2,1,.5]
          },
          default: {
            short: "lvl",
            steps: [3,2,1]
          }
        };

        if (effect === "energizing" || effect === "hearty" || effect === "enduring") {
            effect = effects_config[effect];
        } else {
            effect = effects_config.default;
        }

        if (potential){
          while (potential !== 0){
            effect.steps.forEach(
              function(effect_icon){
                if (potential / effect_icon >= 1){
                  var n = parseInt(potential / effect_icon);
                  potential = potential - (n * effect_icon);
                  for (var i = 0; i < n; i++){
                    x += '&nbsp;<img src="src/assets/icons/icon-' + effect.short + effect_icon + '.svg" width="' + width + '">';
                  }
                }
              }
            )
          }
        }
      }
      return x;
    }
  }
})
