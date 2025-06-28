import { test, expect } from '@playwright/test';

test('GET /forecast', { tag: ['@smoke', '@api'] }, async ({ request }) => {
  console.log('Running GET /forecast test');
  // Location: Minneapolis, MN
  const GRID_ID = 'MPX';
  const GRID_X = 112;
  const GRID_Y = 70;

  const response = await request.get(`https://api.weather.gov/gridpoints/${GRID_ID}/${GRID_X},${GRID_Y}/forecast`, {
    params: {}
  });

  await expect(response.ok()).toBeTruthy();
  await expect(response.status()).toBe(200);
});

test('GET /api/v2/facts/505ffc40da0c14f4023aefedcd837131', async ({ request }) => {
  console.log('Running GET /api/v2/facts/505ffc40da0c14f4023aefedcd837131 test');
  const response = await request.get('https://uselessfacts.jsph.pl/api/v2/facts/505ffc40da0c14f4023aefedcd837131');

  await expect(response.ok()).toBeTruthy();
  await expect(response.status()).toBe(200);
  const data = await response.json();
  await expect(data).toEqual({
    id: '505ffc40da0c14f4023aefedcd837131',
    text: 'Weatherman Willard Scott was the first original Ronald McDonald.',
    source: 'djtech.net',
    source_url: 'http://www.djtech.net/humor/useless_facts.htm',
    language: 'en',
    permalink: 'https://uselessfacts.jsph.pl/api/v2/facts/505ffc40da0c14f4023aefedcd837131'
  });
});

test('POST /users', { tag: '@api' }, async ({ request }) => {
  console.log('Running POST /users test');
  const response = await request.post('https://reqres.in/api/users', {
    // NOTE: The header values can be set globally in playwright.config.ts or here, within the individual test.
    //       If set globally, they will apply to all API tests unless overridden in the individual test files.
    //       The header value below are set here because these header value only applies to this test.
    headers: {
      'x-api-key': 'reqres-free-v1'
    },
    data: {
      name: 'Test User',
      email: 'demo.user@test.com'
    }
  });
  
  await expect(response.ok()).toBeTruthy();
  await expect(response.status()).toBe(201); 

  const data = await response.json();
  await expect(data).toEqual({
    id: expect.any(String),
    name: 'Test User',
    email: 'demo.user@test.com',
    createdAt: expect.any(String)
  });
});
