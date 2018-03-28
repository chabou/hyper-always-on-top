const merge = require('lodash.merge');

const defaultConfig = {
  debug: false,
  default: true
};

let config = defaultConfig;
let isActive = config.default;
let firstLoad = true;

const debug = function() {
  if (config.debug) {
    [].unshift.call(arguments, '|HYPER-ALWAYS-ON-TOP|');
    console.log.apply(this, arguments);
  }
};

let app_;

function setActive(newState) {
  if (isActive === newState) {
    return;
  }
  debug('setActive', newState);
  isActive = newState;
  if (app_) {
    debug('setActive on windows', newState);
    app_.getWindows().forEach(win => win.setAlwaysOnTop(isActive));
  }
}

exports.decorateConfig = globalConfig => {
  if (globalConfig.alwaysOnTop) {
    debug('load config', globalConfig.alwaysOnTop);
    config = merge(JSON.parse(JSON.stringify(defaultConfig)), globalConfig.alwaysOnTop);
    if (firstLoad) {
      setActive(config.default);
      firstLoad = false;
    }
  }

  return globalConfig;
};

exports.onApp = app => {
  debug('onApp', isActive);
  app_ = app;
  app_.getWindows().forEach(win => win.setAlwaysOnTop(isActive));
};

exports.onWindow = win => {
  debug('onWindow', isActive);
  win.setAlwaysOnTop(isActive);
};

exports.decorateMenu = menu => {
  debug('decorateMenu isActive', isActive);
  return menu.map(menuItem => {
    if (menuItem.label !== 'View') {
      return menuItem;
    }

    const newMenuItem = Object.assign({}, menuItem);
    newMenuItem.submenu = [...newMenuItem.submenu];

    newMenuItem.submenu.push({
      type: 'separator'
    });

    newMenuItem.submenu.push({
      label: 'Float on Top',
      type: 'checkbox',
      checked: isActive,
      click: item => {
        setActive(item.checked);
      }
    });

    return newMenuItem;
  });
};
