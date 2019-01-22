(function() {
  class Storage {
    constructor(key = 'nodeElements') {
      this.items = {};
      this.key = key;
    }

    get() {
      let items = localStorage.getItem(this.key);

      try {
        this.items = JSON.parse(items);
      } catch(e) {
        console.error(e.message);
      }

      if (!this.items) {
        this.items = {};
      }

      return this.items;
    }

    add(type, id, value) {
      this.items[id] = {
        type,
        id,
        value
      };

      localStorage.setItem(this.key, JSON.stringify(this.items));
    }

    clean() {
      localStorage.removeItem(this.key);
    }
  }

  function init() {
    let storage = new Storage();

    document.addEventListener('blur', (e) => {
      let {
        nodeName,
        id,
        value
      } = e.target;

      storage.add(nodeName, id, value);
    }, true);

    let persistItems = storage.get();

    Object.keys(persistItems).forEach(key => {
      let {type, id, value} = persistItems[key];
      let elem = document.querySelector(`#${id}`);
      if (!elem || elem.nodeName !== type || elem.value) return;
      elem.value = value;
    });
  }

  init();

  window.__initStorage__ = init;
})();

//window.__initStorage__();