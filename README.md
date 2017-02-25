# react-classnamePrefix-loader

A Webpack loader that prefixes classes with custom prefix in React components.

> This loader is an Improvement over [react-classname-prefix-loader](https://github.com/vezetvsem/react-classname-prefix-loader)

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

```jsx
class MyComponent extends React.Component {
  render () {
    return (
      <div className="block">
        <div className="block inner">
          <h1 className="block inner title_name_">Title</h1>
        </div>
      </div>
    )
  }
}
```

##### output will be

```html
<div className="prefixname--block">
  <div className="prefixname--block prefixname--inner">
    <h1 className="prefixname--block prefixname--inner prefixname--title_name_">Title</h1>
  </div>
</div>
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

#### Recommendation

Use it with [postcss-class-prefix](https://github.com/thompsongl/postcss-class-prefix) for css files
