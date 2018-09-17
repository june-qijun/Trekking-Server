'use strict';

const { app, assert } = require('egg-mock/bootstrap');

describe('test/app/controller/map.test.js', () => {
  before(async () => {
    await app.model.Map.deleteMany();
  });

  it('get maps', async () => {
    const res = await app.httpRequest()
      .get('/api/v1/maps');
    assert(res.status === 200);
    assert(res.body.status === 'ok');
    assert(res.body.result.maps.length === 0);
  });

  it('create map', async () => {
    let res = await app.httpRequest()
      .post('/api/v1/maps')
      .send({
        parentId: '0',
        title: 'origin',
        description: 'origin',
      });
    assert(res.status === 200);
    assert(res.body.status === 'ok');
    assert(res.body.result.id);

    const id = res.body.result.id;
    res = await app.httpRequest()
      .get('/api/v1/maps');
    assert(res.status === 200);
    assert(res.body.status === 'ok');
    assert(res.body.result.maps.length === 1);
    assert(res.body.result.maps[0]._id === id);
  });

  it('update map', async () => {
    let res = await app.httpRequest()
      .post('/api/v1/maps')
      .send({
        parentId: '0',
        title: 'origin',
        description: 'origin',
      });
    assert(res.status === 200);
    assert(res.body.status === 'ok');
    assert(res.body.result.id);

    const id = res.body.result.id;
    res = await app.httpRequest()
      .put(`/api/v1/maps/${id}`)
      .send({
        parentId: '0',
        title: 'origin update',
        description: 'origin',
      });
    assert(res.status === 200);
    assert(res.body.status === 'ok');
    assert(res.body.result.count === 1);

    res = await app.httpRequest()
      .get(`/api/v1/maps/${id}`);
    assert(res.status === 200);
    assert(res.body.status === 'ok');
    assert(res.body.result.map.title === 'origin update');
    assert(res.body.result.map.description === 'origin');
  });
});
