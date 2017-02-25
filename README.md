# react-classnamePrefix-loader

A Webpack loader that prefixes classes with custom prefix in React components

#### install

###### via npm
```
npm install react-cnpl --save-dev
```

###### via yarn
```
yarn add react-cnpl --dev
```

Very simple configuration module loader example:

```js
...

module: {
    loaders: [{
      ...
    }, {
        test: /\.jsx$/,
        exclude: [/node_modules/],
        loader: "react-cnpl",
        query: {
            prefixname:'<prefixname>--'
        }
    }]
}

...

```

#### ignore : Object

ignoring classNames and elements

```js
...

module: {
    loaders: [{
      ...
    }, {
        test: /\.jsx$/,
        exclude: [/node_modules/],
        loader: "react-cnpl",
        query: {
            prefixname:'<prefixname>--',
            ignore:{
              // ignoring elements using array
              elements:['div','pre','i'],
              // ignoring classname using array
              className:['x','y','z']
            }
        }
    }]
}

...

```
