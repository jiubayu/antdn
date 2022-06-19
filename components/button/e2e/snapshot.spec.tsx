import React from 'react';
import ReactDOMServer from 'react-dom/server';
// eslint-disable-next-line import/no-extraneous-dependencies
import { configureToMatchImageSnapshot } from 'jest-image-snapshot';
import Button from '..';
// eslint-disable-next-line import/no-extraneous-dependencies
import 'jest-environment-puppeteer';

const toMatchSnapshot = configureToMatchImageSnapshot({
  customSnapshotsDir: `${process.cwd()}/snapshots`,
  customDiffDir: `${process.cwd()}/diffSnapshots`,
});

expect.extend({ toMatchSnapshot });
describe('Button Snapshot', () => {
  it('screenshot should correct', async () => {
    await jestPuppeteer.resetPage();
    await page.goto(`file//${process.cwd()}/tests/indexedDB.html`);
    const html = ReactDOMServer.renderToString(<Button>按钮</Button>);
    await page.evaluate((innerHTML: string) => {
      document.querySelector('#root')!.innerHTML = innerHTML;
    }, html);
    const screenshot = await page.screenshot();
    expect(screenshot).toMatchSnapshot();
  });
});
