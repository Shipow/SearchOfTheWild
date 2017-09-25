<template>

  <ais-index
    app-id="T2ZX9HO66V"
    api-key="7119d2f6f1cd95224251ec2e490e824f"
    index-name="zelda_dev">

    <svg xmlns="http://www.w3.org/2000/svg" style="display:none">
      <symbol xmlns="http://www.w3.org/2000/svg" id="sbx-icon-search-8" viewBox="0 0 40 40">
        <path d="M16 32c8.835 0 16-7.165 16-16 0-8.837-7.165-16-16-16C7.162 0 0 7.163 0 16c0 8.835 7.163 16 16 16zm0-5.76c5.654 0 10.24-4.586 10.24-10.24 0-5.656-4.586-10.24-10.24-10.24-5.656 0-10.24 4.584-10.24 10.24 0 5.654 4.584 10.24 10.24 10.24zM28.156 32.8c-1.282-1.282-1.278-3.363.002-4.643 1.282-1.284 3.365-1.28 4.642-.003l6.238 6.238c1.282 1.282 1.278 3.363-.002 4.643-1.283 1.283-3.366 1.28-4.643.002l-6.238-6.238z"
        fill-rule="evenodd" />
      </symbol>
      <symbol xmlns="http://www.w3.org/2000/svg" id="sbx-icon-clear-3" viewBox="0 0 20 20">
        <path d="M8.114 10L.944 2.83 0 1.885 1.886 0l.943.943L10 8.113l7.17-7.17.944-.943L20 1.886l-.943.943-7.17 7.17 7.17 7.17.943.944L18.114 20l-.943-.943-7.17-7.17-7.17 7.17-.944.943L0 18.114l.943-.943L8.113 10z" fill-rule="evenodd" />
      </symbol>
    </svg>


    <div class="container">
      <div class="columns is-multiline">

        <aside class="column is-3">
          <div class="spacer16"></div>
          <ais-search-box>
            <form novalidate="novalidate" onsubmit="return false;" class="searchbox sbx-vue-searchbox">
              <div role="search" class="sbx-vue-searchbox__wrapper">
                <ais-input type="search" name="search" placeholder="Search items" autocomplete="off" required="required" class="sbx-vue-searchbox__input"></ais-input>
                <button type="submit" title="Submit your search query." class="sbx-vue-searchbox__submit">
                  <svg role="img" aria-label="Search">
                    <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#sbx-icon-search-8"></use>
                  </svg>
                </button>
                <ais-clear type="reset" title="Clear the search query." class="sbx-vue-searchbox__reset" :clears-facets="false">
                  <svg role="img" aria-label="Reset">
                    <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#sbx-icon-clear-3"></use>
                  </svg>
                </ais-clear>
              </div>
            </form>
          </ais-search-box>
          <div class="spacer16"></div>
          <ais-tree-menu :attributes="['class','lvl1']" >
            <template scope="{ value, active, count }">
              <span class="menu-class" :data-content="value">{{ value }}</span>
            </template>
          </ais-tree-menu>

          <!-- <h3>Tags</h3>
          <ais-refinement-list attribute-name="effect_cooked" operator="and"></ais-refinement-list> -->

        </aside>

        <main class="column is-9">

          <ais-results :results-per-page="100" class="hits-wrapper columns is-multiline">
            <template scope="{ result }">
              <div class="column is-3" :class="result.Type">
                <div class="hit-wrapper">

                  <div class="columns">
                    <div class="column is-4 has-no-padding-bottom">
                      <img :src="result.image" width=48 >
                    </div>
                    <div class="column is-8 has-text-right has-no-padding-bottom">
                      <hp-meter :hp="result.hp" icon-width="20px"></hp-meter>
                      <div v-if="result.strength" class="stat"><span class="stat-label">STR</span> <span class="stat-value">{{ result.strength }}</span></div>
                      <div v-if="result.durability" class="stat"><span class="stat-label">DUR</span> <span class="stat-value">{{ result.durability }}</span></div>
                      <div v-if="result.defense" class="stat"><span class="stat-label">DEF</span> <span class="stat-value">{{ result.defense }}</span></div>
                      <div v-if="result.range" class="stat"><span class="stat-label">RNG</span> <span class="stat-value">{{ result.range }}</span></div>
                      <div v-if="result.hp" class="stat"><span class="stat-label">Raw</span> <span class="stat-value">{{ result.hp }}</span><span class="stat-label"> HP</span></div>
                      <div v-if="result.selling_price" class="stat"><img class="icon-price-rupee" src="src/assets/icons/icon-rupee.svg" width="20px"><span class="stat-value">{{ result.selling_price}}</span></div>
                    </div>
                  </div>

                  <h2><ais-highlight :result="result" attribute-name="name"></ais-highlight></h2>
                  <div class="item-categorie">
                    {{result.class}}
                    <span v-if="result.subclass"> / {{result.subclass}}</span>

                  </div>

                  <p>{{result.description}}</p>

                  <div class="spacer16"></div>

                  <section v-if="result.hp_cooked || result.effect_cooked || result.duration_bonus_cooked" class="cooking">
                    <div class="stat-label">Bonus when Cooked</div>
                    <div class="spacer8"></div>
                    <hp-meter v-if="result.hp_cooked" class="tag" :hp="result.hp_cooked" icon-width="16px"></hp-meter>
                    <effect-meter v-if="result.effect_cooked" :effect="result.effect_cooked" :potential="result.potential" icon-width="16px"></effect-meter>
                    <span v-if="result.duration_bonus_cooked" class="tag" v-for="time in result.duration_bonus_cooked "><img src="src/assets/icons/icon-time.svg" width="16px"> {{ time }}</span>
                    <span v-if="result.subclass === 'Monster Part' || result.subclass === 'Critter'">
                      <span class="tag">
                        <img src="src/assets/icons/icon-monster.svg" width=16>
                      </span>
                    </span>
                    <div class="spacer8"></div>
                  </section>

                  <section v-if="result.food_recipe" class="cooking">
                    <div class="spacer16"></div>
                    <div class="stat-label">Recipes</div>
                    <div class="spacer8"></div>
                    <ul class="related-hits">
                      <li v-for="recipe in result.food_recipe ">
                        <img :src="recipe.img" width="20px"> {{ recipe.name }}
                      </li>
                    </ul>
                    <div class="spacer8"></div>
                  </section>

                  <section v-if="result.ingredients" class="cooking">
                    <div class="spacer16"></div>
                    <div class="stat-label">Ingredients</div>
                    <div class="spacer8"></div>
                    <ul class="related-hits">
                      <li v-for="material in result.ingredients ">
                        <img :src="material.img" width="20px"> {{ material.name }}
                      </li>
                    </ul>
                    <div class="spacer8"></div>
                  </section>

                  <div v-if="result.bonus"><span class="tag">{{ result.bonus }}</span></div>
                  <div v-if="result.bonus_set"><span class="tag">{{ result.bonus_set }} – Set Bonus</span></div>

                  <section v-if="result.armor_upgrade" class="armor">
                    <div class="spacer16"></div>
                    <div class="stat-label">Fairy Enhancement</div>
                    <div class="spacer8"></div>
                    <ul class="related-hits">
                      <li v-for="material in result.armor_upgrade ">
                        <img :src="material.img" width="20px"> {{ material.name }}
                      </li>
                    </ul>
                    <div class="spacer8"></div>
                  </section>

                </div>
              </div>
            </template>
          </ais-results>
        </main>
      </div>
    </div>
  </ais-index>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

<style lang="sass" src="bulma"></style>

<style lang="sass">

  $text-color: #E3E5C9
  //@import url("assets/fonts/font-calamity") // bug: parsed by css :/

  html, body
    height: 100%
    background: #050F2C

  body
    color: $text-color
    font-family: Calamity, sans-serif

  //Bulma override
  .hits-wrapper > .column
    padding: 4px

  .hit-wrapper
    background: rgba(black,.4)
    border-radius: 6px
    padding: 16px
    height: 100%
    h2
      font-size: 16px
      font-weight: bold
      margin-bottom: 4px
      em
        color: #B97433
        font-style: normal
    .tag
      border-radius: 20px
      border: solid 1px rgba($text-color,.1)
      background: none
      color: $text-color
      font-size: 12px
      letter-spacing: .5px
      font-weight: bold
      padding: 0 8px
    .stat
      margin-bottom: 4px
    .stat-value
      font-size: 14px
      font-weight: bold
    .stat-label
      font-size: 10px
      font-weight: bold
      color: rgba($text-color,.7)
      text-transform: uppercase
    p
      font-size: 12px
      color: rgba($text-color,.5)

    .icon-price-rupee
      vertical-align: middle
      position: relative
      top: -2px

    .icon-effect
      margin-right: 4px

    .item-categorie
      font-size: 11px
      text-transform: uppercase
      font-weight: bold
      color: rgba(#2CDD9B,.6)
      margin-bottom: 8px

    .related-hits
      font-size: 12px
      color: rgba($text-color,.5)
      li
        margin-bottom: 4px
      img
        vertical-align: middle

  .menu-class
    position: relative
    color: $text-color
    display: block
    font-size: 16px
    font-weight: bold
    &::before
      content: ''
      display: inline-block
      width: 28px
      height: 28px
      position: relative
      top: 8px
      margin-right: 8px

    &[data-content="Armor"]::before
      background: url('../src/assets/icons/icon-armor.svg') no-repeat
      background-size: 100%
    &[data-content="Bow"]::before
      background: url('../src/assets/icons/icon-bow.svg') no-repeat
      background-size: 100%
    &[data-content="Food"]::before
      background: url('../src/assets/icons/icon-food.svg') no-repeat
      background-size: 100%
    &[data-content="Material"]::before
      background: url('../src/assets/icons/icon-material.svg') no-repeat
      background-size: 100%
    &[data-content="Shield"]::before
      background: url('../src/assets/icons/icon-shield.svg') no-repeat
      background-size: 100%
    &[data-content="Weapon"]::before
      background: url('../src/assets/icons/icon-weapon.svg') no-repeat
      background-size: 100%

  .ais-tree-menu__list
    .ais-tree-menu__item--active .menu-class
      color: #2CDD9B
      &::before
    ul
      margin-bottom: 12px
      .menu-class.menu-class
        font-size: 13px
        font-weight: bold
        color: $text-color
        &::before
          background: url('../src/assets/icons/icon-bullet-right.svg') no-repeat
          background-size: 100%

      .ais-tree-menu__item--active .menu-class
        color: #2CDD9B

  //helpers
  .has-no-padding-top
    padding-top: 0 !important
  .has-no-padding-bottom
    padding-bottom: 0 !important
  .spacer8
    height: 8px
  .spacer16
    height: 16px

</style>

<style lang="scss">

  $custom:(
  	input-width: 200px,
  	input-height: 38px,
  	border-width: 2px,
  	border-radius: 19px,
  	input-border-color: white,
  	input-focus-border-color: #00D1B2,
  	input-background: rgba(white,0),
  	input-focus-background: rgba(white,0),
  	font-size: 14px,
  	placeholder-color: #BBBBBB,
  	icon: sbx-icon-search-8,
  	icon-size: 12px,
  	icon-position: right,
  	icon-color: #00D1B2,
  	icon-background-opacity: 0,
  	icon-clear: sbx-icon-clear-3,
  	icon-clear-size: 10px
  );

  @function even-px($value) {
    @if type-of($value) == 'number' {
      @if (unitless($value)) {
        $value: $value * 1px;
      } @else if unit($value) == 'em' {
        $value: ($value / 1em * 16px);
      } @else if unit($value) == 'pts' {
        $value: $value * 1.3333 * 1px;
      } @else if unit($value) == '%' {
        $value: $value * 16 / 100% * 1px;
      };
      $value: round($value);
      @if ($value % 2 != 0) {
        $value: $value + 1;
      }
      @return $value;
    }
  }

  @mixin searchbox(
    $font-size: 90%,
    $font-color: white,
    $input-width: 350px,
    $input-height: $font-size * 2.4,
    $border-width: 1px,
    $border-radius: $input-height / 2,
    $input-border-color: #ccc,
    $input-focus-border-color: #1ec9ea,
    $input-background: #f8f8f8,
    $input-focus-background: #fff,
    $placeholder-color: #aaa,
    $icon: 'sbx-icon-search-1',
    $icon-size: $input-height / 1.6,
    $icon-position: left,
    $icon-color: #888,
    $icon-background: $input-focus-border-color,
    $icon-background-opacity: .1,
    $icon-clear: 'sbx-icon-clear-1',
    $icon-clear-size: $font-size / 1.1
  ) {
    display: inline-block;
    position: relative;
    width: $input-width;
    height: even-px($input-height);
    white-space: nowrap;
    box-sizing: border-box;
    font-size: $font-size;

    &__wrapper {
      width: 100%;
      height: 100%;
    }

    &__input {
      display: inline-block;
      transition: box-shadow .4s ease, background .4s ease;
      border: 0;
      border-radius: even-px($border-radius);
      box-shadow: inset 0 0 0 $border-width $input-border-color;
      background: $input-background;
      padding: 0;
      padding-right: if($icon-position == 'right', even-px($input-height) + even-px($icon-clear-size) + 8px, even-px($input-height * .8))
                + if($icon-background-opacity == 0, 0, even-px($font-size));
      padding-left: if($icon-position == 'right',
                even-px($font-size / 2) + even-px($border-radius / 2),
                even-px($input-height) + if($icon-background-opacity == 0, 0, even-px($font-size * 1.2)));
      width: 100%;
      height: 100%;
      vertical-align: middle;
      white-space: normal;
      color: $font-color;
      font-size: inherit;
      appearance: none;

      &::-webkit-search-decoration,
      &::-webkit-search-cancel-button,
      &::-webkit-search-results-button,
      &::-webkit-search-results-decoration {
        display: none;
      }

      &:hover {
        box-shadow: inset 0 0 0 $border-width darken($input-border-color, 10%);
      }

      &:focus,
      &:active {
        outline: 0;
        box-shadow: inset 0 0 0 $border-width $input-focus-border-color;
        background: $input-focus-background;
      }

      &::placeholder {
        color: $placeholder-color;
      }
    }

    &__submit {
      position: absolute;
      top: 0;
      @if $icon-position == 'right' {
        right: 0;
        left: inherit;
      } @else {
        right: inherit;
        left: 0;
      }
      margin: 0;
      border: 0;
      border-radius: if($icon-position == 'right', 0 $border-radius $border-radius 0, $border-radius 0 0 $border-radius);
      background-color: rgba($icon-background, $icon-background-opacity);
      padding: 0;
      width: even-px($input-height) + if($icon-background-opacity == 0, 0, even-px($font-size / 2));
      height: 100%;
      vertical-align: middle;
      text-align: center;
      font-size: inherit;
      user-select: none;

      // Helper for vertical alignement of the icon
      &::before {
        display: inline-block;
        margin-right: -4px;
        height: 100%;
        vertical-align: middle;
        content: '';
      }

      &:hover,
      &:active {
        cursor: pointer;
      }

      &:focus {
        outline: 0;
      }

      svg {
        width: even-px($icon-size);
        height: even-px($icon-size);
        vertical-align: middle;
        fill: $icon-color;
      }
    }

    &__reset {
      display: none;
      position: absolute;
      top: (even-px($input-height) - even-px($icon-clear-size)) / 2 - 4px;
      right: if($icon-position == 'right',
        even-px($input-height) + if($icon-background-opacity == 0, 0 , even-px($font-size)),
        (even-px($input-height) - even-px($icon-clear-size)) / 2 - 4px);
      margin: 0;
      border: 0;
      background: none;
      cursor: pointer;
      padding: 0;
      font-size: inherit;
      user-select: none;
      fill: rgba(#FFF, .5);

      &:focus {
        outline: 0;
      }

      svg {
        display: block;
        margin: 4px;
        width: even-px($icon-clear-size);
        height: even-px($icon-clear-size);
      }
    }

    &__input:valid ~ &__reset {
      display: block;
      animation-name: sbx-reset-in;
      animation-duration: .15s;
    }

    @at-root{
      @keyframes sbx-reset-in {
        0% {
          transform: translate3d(-20%, 0, 0);
          opacity: 0;
        }

        100% {
          transform: none;
          opacity: 1;
        }
      }
    }
  }

  .sbx-vue-searchbox{
  	@include searchbox($custom...);
  }

</style>
