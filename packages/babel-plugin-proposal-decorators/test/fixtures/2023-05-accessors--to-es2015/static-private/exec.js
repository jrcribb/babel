function dec({ get, set }, context) {
  context.addInitializer(function() {
    this[context.name + 'Context'] = context;
  });

  return {
    get() {
      return get.call(this) + 1;
    },

    set(v) {
      set.call(this, v + 1);
    },

    init(v) {
      return v ? v : 1;
    }
  }
}

class Foo {
  @dec
  static accessor #a;

  @dec
  static accessor #b = 123;
}

const aContext = Foo['#aContext'];
const bContext = Foo['#bContext'];

expect(aContext.access.has(Foo)).toBe(true);
expect(aContext.access.has({})).toBe(false);
expect(aContext.access.has(Object.create(Foo))).toBe(false);

expect(aContext.access.get(Foo)).toBe(2);
expect(() => aContext.access.get({})).toThrow(TypeError);
aContext.access.set(Foo, 123);
expect(aContext.access.get(Foo)).toBe(125);
expect(() => aContext.access.set({}, 456)).toThrow(TypeError);
expect(aContext.access.get(Foo)).toBe(125);
expect(aContext.name).toBe('#a');
expect(aContext.kind).toBe('accessor');
expect(aContext.static).toBe(true);
expect(aContext.private).toBe(true);
expect(typeof aContext.addInitializer).toBe('function');

expect(bContext.access.get(Foo)).toBe(124);
bContext.access.set(Foo, 123);
expect(bContext.access.get(Foo)).toBe(125);
expect(bContext.name).toBe('#b');
expect(bContext.kind).toBe('accessor');
expect(bContext.static).toBe(true);
expect(bContext.private).toBe(true);
expect(typeof bContext.addInitializer).toBe('function');