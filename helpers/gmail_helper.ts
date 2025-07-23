import { getAccessToken } from 'gmail-getter';

export default async function createAccessToken() {
  const accessToken = await getAccessToken(
    process.env.GMAIL_CLIENT_ID!,
    process.env.GMAIL_CLIENT_SECRET!,
    process.env.GMAIL_REFRESH_TOKEN!
  );
  
  return accessToken;
}
