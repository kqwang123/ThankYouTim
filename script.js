const puppeteer = require('puppeteer');

import { initializeApp } from "firebase/app";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyArTdbp4Ud5SJg0AP2cuhZLfSBkjNl6Bzc",
  authDomain: "thank-you-tim.firebaseapp.com",
  projectId: "thank-you-tim",
  storageBucket: "thank-you-tim.appspot.com",
  messagingSenderId: "811183987813",
  appId: "1:811183987813:web:f27f97a6360aff4435fa8c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

require('dotenv').config();

async function run() {
    const browser = await puppeteer.launch({headless : false}); 
    const page = await browser.newPage();
    await page.goto("https://www.linkedin.com");

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

    // Comment on Tim's post

    await page.goto("https://www.linkedin.com/in/tim-cai-a9b285221/recent-activity/all/");
    await new Promise((resolve) => setTimeout(resolve, 2000));
    await page.click(".artdeco-button.artdeco-button--muted.artdeco-button--4.artdeco-button--tertiary.ember-view.social-actions-button.react-button__trigger");
    await new Promise((resolve) => setTimeout(resolve, 2000));
    var quote = await page.$eval(".update-components-text.relative.feed-shared-update-v2__commentary", text => text.innerText);
    
    await page.type(".ql-editor.ql-blank", "Thanks Tim! This has motivated me as well to " + quote.trim().substring(5, quote.length));
    await new Promise((resolve) => setTimeout(resolve, 2000));
    await page.click(".comments-comment-box__submit-button.mt3.artdeco-button.artdeco-button--1.artdeco-button--primary.ember-view");
    await new Promise((resolve) => setTimeout(resolve, 2000));

    await page.screenshot({path: 'linkedin.png'});
    await new Promise((resolve) => setTimeout(resolve, 2000));

    await browser.close();
}

run();