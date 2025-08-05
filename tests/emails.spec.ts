import { test, expect } from '@playwright/test';
import { checkInbox, fetchEmailsList, fetchEmailById, parseHtmlFromEmail } from 'gmail-getter';
import getGmailAccessToken from '../helpers/gmail_helper';

test.describe('email', async () => {
  test.describe('gmail', async () => {
    let accessToken: string,
        fromEmail: string,
        subject: string,
        queryString: string;

    test.beforeAll(async () => {
      accessToken = await getGmailAccessToken();
    });

    test('check inbox - find by query string', async ({ page }) => {
      console.log('gmail - check inbox test');

      // NOTE: I am unsure how fromEmail is used in the queryString.
      //       'peter' returns the first email (even though both names are 'peter hong' or 'Peter Hong').
      //       The email address is 'pshong@domain.com`.
      //       'peterh' returns the second email - the email address is 'peterh@domain.com'.
      fromEmail = 'peterh';
      // fromEmail = 'pshong@gmail.com';

      // NOTE: The subject does not seem to be used in the queryString.
      // subject = 'Automation Test Email';
      // queryString = `from:${fromEmail} subject:${subject}`;
      queryString = `from:${fromEmail}`;

      const email = await checkInbox({ token: accessToken!, query: queryString });
      const html = parseHtmlFromEmail(email!);
      await page.setContent(html);

      // TODO: Add assertions to verify the email content.
      // For example, check if the email contains a specific text.
    });

    test('get email list', async () => {
      console.log('get email list test');

      const emailList = await fetchEmailsList({ token: accessToken });
      expect(emailList).toBeDefined();
      expect(emailList.length).toBeGreaterThan(0);

      /* Returns:
      Email list: [
        { id: '192e08ab5bbf519a', threadId: '192e08ab5bbf519a' },
        { id: '18f53be23e78c08b', threadId: '18f53be23e78c08b' }
      ]
      */

      // for (const email of emailList) {
      //   expect(email.id).toBeDefined();
      //   expect(email.threadId).toBeDefined();
      //   console.log(`Email ID: ${email.id}, Snippet: ${email.threadId}`);
      // }
      /* Returns:
      Email ID: 192e08ab5bbf519a, Snippet: 192e08ab5bbf519a
      Email ID: 18f53be23e78c08b, Snippet: 18f53be23e78c08b
      */
    });

    test('get email by id', async () => {
      console.log('get email by id test');

      const emailList = await fetchEmailsList({ token: accessToken });
      expect(emailList).toBeDefined();
      expect(emailList.length).toBeGreaterThan(0);

      const emailId = emailList[0].id;

      const email = await fetchEmailById(emailId, accessToken);
      expect(email).toBeDefined();
      expect(email.id).toBe(emailId);
    });

    test('delete email by id', async () => {
      console.log('delete email by id test');
      // TODO: Create a test to delete email by id.
      //       This includes creating an email, fetching its ID, and then deleting it.
    });
  });
});



// Everything below will eventually be deleted.
/*
    test('delete based on queryString', async ({ request }) => {
      email = new Email();

    let authToken = process.env.GMAIL_AUTH_TOKEN;
    let emailList;
    let queryString = 'Some string';
    const listOfEmailIDs = [];

    emailList = await email.getEmailList(accessToken, queryString);
    // console.log('emailList = ' + JSON.stringify(emailList));
    for (let i=0; i < emailList.messages.length; i++) {
      listOfEmailIDs.push(emailList.messages[i].id);
    }
    // console.log('listOfEmailIDs = ' + listOfEmailIDs);

    const responseBody = await request.post("https://gmail.googleapis.com/gmail/v1/users/peterh.emergent@gmail.com/messages/batchDelete", {
      headers: {
        // Token was created using Postman and copied here
        "Authorization": authToken
      },
      data: {
        "ids": listOfEmailIDs
      }
    });
    await expect(responseBody.status()).toBe(204);
    })
  })
})
*/