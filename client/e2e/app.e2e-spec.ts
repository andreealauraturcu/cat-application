import { AppPage } from './app.po';

describe('client App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Login in the application. You can add, edit and delete cat queries.');
  });
});
