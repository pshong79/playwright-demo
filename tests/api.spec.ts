import { test, expect } from '@playwright/test';
import { z } from 'zod';

test('GET /forecast', { tag: ['@smoke', '@api'] }, async ({ request }) => {
  console.log('Running GET /forecast test');
  // Location: Minneapolis, MN
  const GRID_ID = 'MPX';
  const GRID_X = 112;
  const GRID_Y = 70;

  const response = await request.get(`https://api.weather.gov/gridpoints/${GRID_ID}/${GRID_X},${GRID_Y}/forecast`, {
    params: {}
  });

  expect(response.ok()).toBeTruthy();
  expect(response.status()).toBe(200);
});

test('GET /api/v2/facts/505ffc40da0c14f4023aefedcd837131', async ({ request }) => {
  console.log('Running GET /api/v2/facts/505ffc40da0c14f4023aefedcd837131 test');
  const response = await request.get('https://uselessfacts.jsph.pl/api/v2/facts/505ffc40da0c14f4023aefedcd837131');

  expect(response.ok()).toBeTruthy();
  expect(response.status()).toBe(200);
  
  const data = await response.json();
  expect(data).toEqual({
    id: '505ffc40da0c14f4023aefedcd837131',
    text: 'Weatherman Willard Scott was the first original Ronald McDonald.',
    source: 'djtech.net',
    source_url: 'http://www.djtech.net/humor/useless_facts.htm',
    language: 'en',
    permalink: 'https://uselessfacts.jsph.pl/api/v2/facts/505ffc40da0c14f4023aefedcd837131'
  });
});

// FIXME: This test is currently skipped because the x-api-key header value returns a 401 Unauthorized error.
test.skip('POST /users', { tag: '@api' }, async ({ request }) => {
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

  expect(response.ok()).toBeTruthy();
  expect(response.status()).toBe(201); 

  const data = await response.json();
  expect(data).toEqual({
    id: expect.any(String),
    name: 'Test User',
    email: 'demo.user@test.com',
    createdAt: expect.any(String)
  });

  expect(data.name).toBe('Test User');
  expect(data.email).toBe('demo.user@test.com');
});

test.describe('zod schema validation example', async () => {
  const responseSchema = z.object({
    id: z.string(),
    text: z.string(),
    source: z.string(),
    source_url: z.url(),
    language: z.string(),
    permalink: z.url()
  });

  const franchiseTeamTotalsSchema = z.object({
    id: z.number(),
    activeFranchise: z.number(),
    activeTeam: z.boolean(),
    cups: z.number().nullable(),
    firstSeasonId: z.number(),
    franchiseId: z.number(),
    gameTypeId: z.number(),
    gameWinPctg: z.number(),
    gamesPlayed: z.number(),
    goalsAgainst: z.number(),
    goalsFor: z.number(),
    homeLosses: z.number(),
    homeOvertimeLosses: z.number(),
    homeTies: z.number().nullable(),
    homeWins: z.number(),
    lastSeasonId: z.number().nullable(),
    losses: z.number(),
    overtimeLosses: z.number(),
    penaltyMinutes: z.number(),
    playoffSeasons: z.number(),
    pointPctg: z.number(),
    points: z.number(),
    roadLosses: z.number(),
    roadOvertimeLosses: z.number(),
    roadTies: z.number().nullable(),
    roadWins: z.number(),
    seriesLosses: z.number(),
    seriesPlayed: z.number(),
    seriesWinPctg: z.number(),
    seriesWins: z.number(),
    shootoutLosses: z.number(),
    shootoutWins: z.number(),
    shutouts: z.number(),
    teamId: z.number(),
    teamName: z.string(),
    ties: z.number().nullable(),
    triCode: z.string(),
    wins: z.number()
  });

  test('GET', async ({ request }) => {
    console.log('Running GET test');
    const response = await request.get('https://uselessfacts.jsph.pl/api/v2/facts/505ffc40da0c14f4023aefedcd837131');

    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);

    const data = await response.json();
    expect(() => responseSchema.parse(data)).not.toThrow();
  });

  // https://gitlab.com/dword4/nhlapi/-/blob/master/records-api.md
  test('GET /franchise-team-totals', async ({ request }) => {
    console.log('Running GET /franchise-team-totals test');
    const response = await request.get('https://records.nhl.com/site/api/franchise-team-totals?cayenneExp=franchiseId=18');

    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);

    const data = await response.json();
    expect(() => z.array(franchiseTeamTotalsSchema).parse(data.data)).not.toThrow();
  })

  test('GET /name/{name}', async ({ request }) => {
    console.log('Running GET /name/{name} test');
    const COUNTRY_NAME = 'United States of America';

    const response = await request.get(`https://restcountries.com/v3.1/name/${COUNTRY_NAME}`);

    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);
  });
});

