# hyper-always-on-top
Extension for [Hyper.app](https://hyper.is) to add a menu item to keep application windows always on top.

![Screenshot](https://cloud.githubusercontent.com/assets/4137761/23342457/ed609bea-fc5a-11e6-94a4-9fea87470dcb.png)

## Install

### Using [hpm](https://github.com/zeit/hpm)

```
hpm install hyper-always-on-top
```

### Manually

To install, edit `~/.hyper.js` and add `"hyper-always-on-top"` to `plugins`:

```
plugins: [
  "hyper-always-on-top",
],
```

## Configuration

### Default configuration:
``` js
module.exports = {
  config: {
    // other configs...
    alwaysOnTop: {
      debug: false,
      default: true // enabled on application start
    }
  }
  //...
};
```

## Credits

Originally developed by [@henrikdahl](https://github.com/henrikdahl) as a [pull request](https://github.com/zeit/hyper/pull/1560)

## Licence

[MIT](LICENSE.md)
