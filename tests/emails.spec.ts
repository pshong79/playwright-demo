import { test, expect } from '@playwright/test';
import { checkInbox, parseHtmlFromEmail } from 'gmail-getter';
import createAccessToken from '../helpers/gmail_helper';

test.describe('email', async () => {
  test.describe('gmail', async () => {
    let accessToken: string | undefined,
        fromEmail: string,
        subject: string,
        queryString: string;

    test.beforeAll(async () => {
      accessToken = await createAccessToken();
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
    });
  });
});



// Everything below will eventually be deleted.
/*

    test('get email based on query string', async ({ page }) => {
      // Google documentation on refining search results:
      // https://support.google.com/mail/answer/7190#
      let queryString = 'Automation Test Email';
      let messageId, parsedMessageId, messageBody, parsedEmail;

      email = new Email();

      messageId = await email.getMessageId(accessToken, queryString);
      parsedMessageId = JSON.parse(messageId);

      messageBody = await email.getEmailMessage(accessToken, parsedMessageId);

      console.log('messageId = ' + messageId);
      console.log('parsedMessageId ' + parsedMessageId);

      parsedEmail = await email.parseEmailIntoHtml(messageBody);
      await page.setContent(parsedEmail);

      // await email.assertOrderNumber('Order Number: 40023032');
      await expect(page.locator('div.WordSection1')).toContainText('Order Number: 24680');
    })

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