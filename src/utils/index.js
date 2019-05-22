/*eslint-env node*/
import ReactGA from 'react-ga';

export function trackGA(page) {
  if (process.env.NODE_ENV === 'production') {
    ReactGA.pageview(window.location.pathname + page);
  }
}