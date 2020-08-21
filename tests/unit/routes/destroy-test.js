import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | destroy', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:destroy');
    assert.ok(route);
  });
});
