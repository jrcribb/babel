var _computedKey, _initStatic, _class;
const dec = () => {};
_computedKey = 'b';
class Foo {
  static get a() {
    return this.value;
  }
  static get [_computedKey]() {
    return this.value;
  }
}
_class = Foo;
(() => {
  [_initStatic] = babelHelpers.applyDecs2305(_class, [[dec, 11, "a"], [dec, 11, _computedKey]], []).e;
  _initStatic(_class);
})();
babelHelpers.defineProperty(Foo, "value", 1);