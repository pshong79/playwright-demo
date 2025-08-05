import { getAccessToken } from 'gmail-getter';

export default async function getGmailAccessToken() {
  const accessToken = await getAccessToken(
    process.env.GMAIL_CLIENT_ID!,
    process.env.GMAIL_CLIENT_SECRET!,
    process.env.GMAIL_REFRESH_TOKEN!
  );

  return accessToken;
}
