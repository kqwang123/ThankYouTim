const puppeteer = require('puppeteer');
require('dotenv').config();

var url = "https://www.linkedin.com";

async function run() {
    const browser = await puppeteer.launch({headless : false}); 
    const page = await browser.newPage();
    await page.goto(url);

    await new Promise((resolve) => setTimeout(resolve, 2000));

    await page.type('#session_key', process.env.EMAIL);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    await page.type('#session_password', process.env.PASSWORD);
    await new Promise((resolve) => setTimeout(resolve, 2000));

    await page.click('.sign-in-form__submit-btn--full-width');
    await new Promise((resolve) => setTimeout(resolve, 8000));
    
    // Send a message to Tim

    // await page.click(".msg-conversation-listitem__participant-names.msg-conversation-card__participant-names");
    // await new Promise((resolve) => setTimeout(resolve, 2000));
    // await page.click(".msg-form__contenteditable.t-14.t-black--light.t-normal.flex-grow-1.full-height.notranslate");
    // await new Promise((resolve) => setTimeout(resolve, 2000));
    // await page.type(".msg-form__contenteditable.t-14.t-black--light.t-normal.flex-grow-1.full-height.notranslate", "Hello, I am a bot. I am sending this message to you because I am testing my puppeteer script. Please ignore this message. Do not be afraid.");
    // await new Promise((resolve) => setTimeout(resolve, 2000));
    // await page.click("button.msg-form__send-button");
    // await new Promise((resolve) => setTimeout(resolve, 2000));

    await page.screenshot({path: 'linkedin.png'});
    await new Promise((resolve) => setTimeout(resolve, 2000));

    await browser.close();
}

run();