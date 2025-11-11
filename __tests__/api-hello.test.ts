import { GET } from '../app/api/hello/route';

describe('API /api/hello', () => {
  it('GETリクエストでJSONレスポンスを返す', async () => {
    const request = {} as Request;
    const response = await GET(request);
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data).toEqual({ name: 'Hello!' });
  });

  it('レスポンスが正しいステータスコードを返す', async () => {
    const request = {} as Request;
    const response = await GET(request);

    expect(response.status).toBe(200);
  });
});
