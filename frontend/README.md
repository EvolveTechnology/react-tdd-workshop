# Buy me a coffee

Hello there!

This project will use:

- react

- testing-library
- enzyme

- rebass
- styled-components

- stripe

- apollo-graphql
- redux + react-redux
- react-router-dom

- Graphical content in the assets folder exist thanks to [icons8](https://icons8.com/).

- And the backend project on this repository :)

No more buzzwords!

## On Testing tools

> We have a lot of tests that the routes work when the location changes, so you probably don’t need to test this stuff. [react-router-dom](https://reacttraining.com/react-router/web/guides/testing#testing-navigating)

Enzyme tests often fall just short of actually testing the UI you are building.They rather, test that you are passing the right prop, or that react does update the state. React does update the state, do not doubt that.

Also these kind of tests, disconnect you from the UI you are actually rendering. Instead of thinking of the content your UI renders, you think of the components that will do that.

```jsx
describe("Fabs", () => {
  const fabs = shallow(<Fabs />);

  fabs.setState({ show: true });
  fabs.update();

  it("renders", () => {
    expect(fabs).toBeDefined();
    expect(fabs.find(Button)).toHaveLength(1);
  });
});
```

> The more your tests resemble the way your software is used, the more confidence they can give you [https://github.com/testing-library/react-testing-library#this-solution](testing-library)

## On Styling

The aim of this project is to focus on testing. However, as front end developers, we want a good looking UI. To cut corners, one can use a component library. The great thing with React, and modern web development in general, is that there're tons out there. Each with a different paradigm, mantra, beliefs, style guide, etc.

I searched around for one and found [this list.](https://github.com/brillout/awesome-react-components#ui-frameworks) From it I randomly picked `rebass`.

## On Dependencies

Even though not all libraries installed are used across all branches and even in the final build, it is good to have them all installed once and forget about it. From `master`, run yarn on this directory.

## .env

Create .env file with:

```
REACT_APP_BACKEND_URL="http://localhost:8080"
REACT_APP_STRIPE_PUBLIC_KEY="your key"
```
