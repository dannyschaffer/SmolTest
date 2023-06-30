const { Builder, By, Key, until } = require('selenium-webdriver');

const selenium = {};

selenium.scrollPage = async function(url) {
    let driver = await new Builder().forBrowser('chrome').build();
    try {
        await driver.get(url);
        await driver.executeScript("window.scrollTo(0, document.body.scrollHeight)");
    } catch (error) {
        console.error(error);
    } finally {
        await driver.quit();
    }
}

module.exports = selenium;