'use strict';

const { app, assert } = require('egg-mock/bootstrap');

describe('test/app/controller/notes.test.js', () => {
  before(async () => {
    await app.model.Note.deleteMany();
  });

  it('get notes', async () => {
    const res = await app.httpRequest()
      .get('/api/v1/notes')
      .expect(200);
    assert(res.body.status === 'ok');
    assert(res.body.result.notes.length === 0);
  });

  it('create note', async () => {
    let res = await app.httpRequest()
      .post('/api/v1/notes')
      .send({
        title: 'test',
        content: 'test',
      })
      .expect(200);
    assert(typeof (res.body.result.id) === 'string');
    assert(res.body.status === 'ok');

    res = await app.httpRequest()
      .get('/api/v1/notes')
      .expect(200);
    assert(res.body.status === 'ok');
    assert(res.body.result.notes.length === 1);
    assert(res.body.result.notes[0].title === 'test');
    assert(res.body.result.notes[0].content === 'test');
  });

  it('update note', async () => {
    let res = await app.httpRequest()
      .post('/api/v1/notes')
      .send({
        title: 'test',
        content: 'test',
      });
    assert(typeof (res.body.result.id) === 'string');
    assert(res.body.status === 'ok');

    const id = res.body.result.id;
    res = await app.httpRequest()
      .put(`/api/v1/notes/${id}`)
      .send({
        title: 'test updated',
        content: 'test',
      });
    assert(res.body.status === 'ok');
    assert(res.body.result.count === 1);

    res = await app.httpRequest()
      .get(`/api/v1/notes/${id}`);
    assert(res.body.status === 'ok');
    assert(res.body.result.title === 'test updated');
    assert(res.body.result.content === 'test');
  });

  it('delete note', async () => {
    let res = await app.httpRequest()
      .post('/api/v1/notes')
      .send({
        title: 'delete',
        content: 'delete',
      });
    assert(typeof (res.body.result.id) === 'string');
    assert(res.body.status === 'ok');

    const id = res.body.result.id;
    res = await app.httpRequest()
      .delete(`/api/v1/notes/${id}`);
    assert(res.body.status === 'ok');
    assert(res.body.result.count === 1);
  });

  it('body valid', async () => {
    const res = await app.httpRequest()
      .post('/api/v1/notes')
      .send({
        _title: 'delete',
        _content: 'delete',
      });
    assert(res.status === 422);
  });

  it('authority', async () => {
    const { _id: id } = await app.model.Note.create({
      title: 'no authority',
      content: 'no authority',
      user_id: 'other',
    });
    const res = await app.httpRequest()
      .get(`/api/v1/notes/${id}`);
    assert(res.status === 401);
    assert(res.body.status === 'error');
    assert(res.body.result.message === 'No authority.');
  });
});
