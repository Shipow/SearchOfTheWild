# search-of-the-wild

> Zelda BotW Search

![Search of the Wild Logo](http://res.cloudinary.com/hilnmyskv/image/upload/v1507137808/search-of-the-wild/logo.png)

![Search of the Wild Screenshot](http://res.cloudinary.com/hilnmyskv/image/upload/v1507137808/search-of-the-wild/screenshot.png)

## Preview

[Search of the Wild – Preview on Netlify](http://piano-tuner-protection-77534.netlify.com/)

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build
```

## Data

Data is coming from [Airtable – Zelda BotW](https://airtable.com/shrI71ZROtt0PXTtr).
Then data is pushed to Algolia with a node script [data/import.js](https://github.com/Shipow/SearchOfTheWild/blob/master/data/import.js).

## UI

UI is built with [vue-instantsearch](https://github.com/algolia/vue-instantsearch) and [Bulma.io](http://bulma.io/)
You can find all the sprites in .sketch file in the design directory.

![Search of the Wild Assets](http://res.cloudinary.com/hilnmyskv/image/upload/v1507137807/search-of-the-wild/artboard.png)


## vue-loader

For detailed explanation on how things work, consult the [docs for vue-loader](http://vuejs.github.io/vue-loader).
