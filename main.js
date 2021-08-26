const Apify = require('apify');
const imagemin = require('imagemin');
const imageminPngquant = require('imagemin-pngquant');
const imageminJpegtran = require('imagemin-jpegtran');

const { utils: { log } } = Apify;

const createHTML = async (fullName, username, imgUrl) => {
    // Import CSS
    const head = document.getElementsByTagName('HEAD')[0];

    const styleCustom = document.createElement('style');
    // styleCustom.innerHTML = '@font-face {font-family: "Graphik" ;'
    //     + 'src: url("https://apify.com/fonts/Graphik-Medium-Web.woff2") format("woff2");'
    //     + 'font-weight: 500; font-style: normal; font-stretch: normal;}';
    styleCustom.innerHTML = `
        @font-face {
            font-family: 'Graphik';
            src: url('https://apify.com/fonts/Graphik-Regular-Web.woff2') format('woff2');
            font-weight: 400;
            font-style: normal;
            font-stretch: normal;
            font-display: swap;
        }

        @font-face {
            font-family: 'Graphik';
            src: url('https://apify.com/fonts/Graphik-Semibold-Web.woff2') format('woff2');
            font-weight: 600;
            font-style: normal;
            font-stretch: normal;
            font-display: swap;
        }
    `;
    const fontPreLoad = document.createElement('link');
    fontPreLoad.innerHTML = `
        <link rel="preload" href="https://apify.com/fonts/Graphik-Regular-Web.woff2" as="font" crossorigin="anonymous" />
        <link rel="preload" href="https://apify.com/fonts/Graphik-Semibold-Web.woff2" as="font" crossorigin="anonymous" />
    `;

    head.append(styleCustom);
    head.append(fontPreLoad);

    // Create the elements
    const backgroundContainer = document.createElement('div');
    const contentContainer = document.createElement('div');
    const logo = document.createElement('span');
    // Had trouble getting the background image to work on platform, so did this workaround to get the logo
    // eslint-disable-next-line max-len
    logo.innerHTML = '<svg width="152px" height="40px" viewBox="0 0 152 40" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><title>logo-full-gray</title><desc>Created with Sketch.</desc><defs></defs><g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g id="logo-full-gray" fill-rule="nonzero"><path d="M89.597,20.667 L83.92,20.667 L83.92,13.045 L89.599,13.045 C91.697,13.045 93.399,14.752 93.399,16.856 C93.4003269,17.8655873 93.0004736,18.834337 92.2874314,19.5490671 C91.5743892,20.2637971 90.6065876,20.6659398 89.597,20.667 Z M90.171,9 L78.75,9 L78.75,32 L83.919,32 L83.919,24.712 L90.169,24.712 C94.497,24.712 98.005,21.195 98.005,16.856 C98.005,12.517 94.498,9 90.17,9 L90.171,9 Z M110.146,32 L115.313,32 L115.313,23.843 L124.648,23.843 L124.648,19.698 L115.313,19.698 L115.313,13.246 L126.915,13.246 L126.915,9 L110.145,9 L110.145,32 L110.146,32 Z M146.499,9 L140.864,18.46 L140.731,18.46 L135.364,9 L129.496,9 L138.098,23.275 L138.098,32 L143.298,32 L143.298,23.242 L152,9 L146.499,9 Z M101.079,32 L106.247,32 L106.247,9 L101.079,9 L101.079,32 Z M61.269,23.208 L64.469,13.78 L64.602,13.78 L67.736,23.208 L61.268,23.208 L61.269,23.208 Z M61.534,9 L53,32 L58.301,32 L59.901,27.287 L69.103,27.287 L70.703,32 L76.171,32 L67.636,9 L61.535,9 L61.534,9 Z" id="Shape" fill="#212322"></path><path d="M5.309,4.755 C1.939,5.187 -0.411,8.042 0.06,11.133 L3.696,35 L19,3 L5.309,4.755 Z" id="Shape" fill="#97D700"></path><path d="M39.986,23.133 L38.689,5.145 C38.458,1.947 35.545,-0.39 32.342,0.055 L27,0.794 L38.765,27 C39.6490537,25.9132762 40.0853691,24.5302994 39.985,23.133" id="Shape" fill="#71C5E8"></path><path d="M9,39.965 C9.99043651,40.0730706 10.9921479,39.9303619 11.913,39.55 L33,30.886 L22.975,9 L9,39.965 Z" id="Shape" fill="#FF9013"></path></g></g></svg>';

    const imageCircle = document.createElement('span');
    const userImage = document.createElement('img');
    userImage.src = imgUrl;

    const textContainer = document.createElement('div');

    const publicProfileSpan = document.createElement('span');
    publicProfileSpan.innerHTML = 'PUBLIC PROFILE';

    const fullNameSpan = document.createElement('span');
    fullNameSpan.innerHTML = fullName;

    const usernameSpan = document.createElement('span');
    usernameSpan.innerHTML = username;

    // Set styles for the elements
    document.body.setAttribute('style', `
        overflow: hidden;
        padding: 0;
        margin: 0;
    `);

    backgroundContainer.setAttribute('style', `
        background: linear-gradient(128deg, rgba(2,0,36,1) 0%, rgba(240,248,254,1) 0%, rgba(255,255,255,1) 100%);
        padding: 0 0 0 8rem;
        margin: 0;
        background-position: 90% 90%;
        width: 100%;
        height: 100%;
        font-family: 'Graphik', sans-serif;
        font-size: 2rem;
        display: flex;
        align-items: center;
    `);

    contentContainer.setAttribute('style', `
        display: flex;
        align-items: center;
        margin-top: auto;
        margin-bottom: auto;
    `);

    logo.setAttribute('style', `
        position: absolute;
        right: 7rem;
        bottom: 3rem;
        transform: scale(2);
    `);

    imageCircle.setAttribute('style', `
        width: 17rem;
        height: 17rem;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: rgb(255, 255, 255);
        box-shadow: rgba(0, 29, 93, 0.2) 10px 10px 24px -4px;
        overflow: hidden;
    `);

    userImage.setAttribute('style', `
        width: 100%;
        height: 100%;
    `);

    textContainer.setAttribute('style', `
       display: flex;
       flex-direction: column;
       margin-left: 3rem;
    `);

    publicProfileSpan.setAttribute('style', `
       font-weight: 600;
       font-size: 1.8rem;
       margin-bottom: 1rem;
    `);

    fullNameSpan.setAttribute('style', `
       font-weight: 600;
       font-size: 5rem;
    `);

    usernameSpan.setAttribute('style', `
        font-weight: 400;
        font-size: 1.8rem;
    `);

    document.body.appendChild(backgroundContainer);

    textContainer.append(publicProfileSpan, fullNameSpan, usernameSpan);
    imageCircle.append(userImage);
    contentContainer.append(imageCircle, textContainer);
    backgroundContainer.append(contentContainer, logo);
};

const imagesHaveLoaded = () => { return Array.from(document.images).every((i) => i.complete); };

Apify.main(async () => {
    const { fullName, username, imgUrl, debug, type } = await Apify.getInput();

    // Start the browser
    log.info('Opening the browser.');
    const browser = await Apify.launchPuppeteer({
        launchOptions: {
            headless: true,
        },
    });

    // Generate HTML for the screenshot
    log.info('Generating HTML');
    const resultPage = await browser.newPage();
    await resultPage.evaluate(createHTML, fullName, username, imgUrl);
    await resultPage.waitForFunction(imagesHaveLoaded, { timeout: 5000 });

    // Capture the screenshot
    log.info('Capturing screenshot.');
    const screenshot = await resultPage.screenshot({ type });

    if (debug) {
        // slow down
        await Apify.utils.sleep(1000);
        await resultPage.evaluateHandle('document.fonts.ready');
        // store html for debug
        const pageHtml = await resultPage.evaluate(async () => {
            return document.documentElement.innerHTML;
        });
        await Apify.setValue('testHtml', pageHtml, { contentType: 'text/html' });
    }

    // Optimize image
    log.info('Optimizing the image');
    const imagminPlugins = type === 'png'
        ? [imageminPngquant({ quality: [0.8, 0.95] })]
        : [imageminJpegtran()];
    const image = await imagemin.buffer(screenshot, {
        plugins: imagminPlugins,
    });

    // Add a message to dataset to show that process was successful
    await Apify.pushData({ status: 'Success! The image is in the run\'s key-value store.' });
    // Save the screenshot to the default key-value store
    await Apify.setValue('OUTPUT', image, { contentType: `image/${type}` });

    // Close Puppeteer
    log.info('Done.');
    await browser.close();
});
