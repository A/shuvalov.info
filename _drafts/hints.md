1. ~arr.indexOf(item)
2. condition
  ? do()
  : doOther();
3. Конструктор с приватностью
var Constr = function () {
  this._transports = {
    console: console
  };
  return {
    // Только эти методы будут доступны.
    info: this._log.bind(this, ‘info’),
    error: this._log.bind(this, ‘error’),
    debug: this._log.bind(this, ‘debug’)
  };
};
Constr.prototype._log = function (method) {
  this._transports.forEach(function (transport) {
    transport.hasOwnProperty(method)
      && transport.apply(this, args.split(1));
  })
};
4. Каррирование — `this._log.bind(this, ‘info’);`