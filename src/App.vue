<template>

  <ais-index
    app-id="T2ZX9HO66V"
    api-key="7119d2f6f1cd95224251ec2e490e824f"
    index-name="zelda_dev">

    <div class="container">
      <div class="columns is-multiline">

        <aside class="column is-3">
          <ais-search-box></ais-search-box>
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

  body
    background: #050F2C
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
