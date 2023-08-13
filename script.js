const puppeteer = require('puppeteer');
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

    // Comment on Tim's post
        
    await page.goto("https://www.linkedin.com/in/tim-cai/recent-activity/all/");
    await new Promise((resolve) => setTimeout(resolve, 2000));
        
    var likeButtonSelector = ".artdeco-button.artdeco-button--muted.artdeco-button--4.artdeco-button--tertiary.ember-view.social-actions-button.react-button__trigger";
    var ariaLabel = await page.$eval(likeButtonSelector, (element) => element.getAttribute("aria-label"));

    if (ariaLabel == "React Like to Tim Cai’s post") {
            
        await page.click(likeButtonSelector);
        await new Promise((resolve) => setTimeout(resolve, 2000));

        var quote = await page.$eval(".update-components-text.relative.feed-shared-update-v2__commentary", text => text.innerText);
            
        await page.type(".ql-editor.ql-blank", "Thanks Tim! This has motivated me as well to " + quote.trim().substring(5, quote.length));
        await new Promise((resolve) => setTimeout(resolve, 2000));
        await page.click(".comments-comment-box__submit-button.mt3.artdeco-button.artdeco-button--1.artdeco-button--primary.ember-view");
        await new Promise((resolve) => setTimeout(resolve, 2000));
        await page.screenshot({path: 'linkedin.png'});
        await new Promise((resolve) => setTimeout(resolve, 2000));
    }
    await browser.close();
}

run();