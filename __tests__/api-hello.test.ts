import { GET } from '../app/api/hello/route';

describe('API /api/hello', () => {
  it('GETリクエストでJSONレスポンスを返す', async () => {
    const response = await GET();
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data).toEqual({ name: 'Hello!' });
  });

  it('レスポンスが正しいステータスコードを返す', async () => {
    const response = await GET();

    expect(response.status).toBe(200);
  });
});
