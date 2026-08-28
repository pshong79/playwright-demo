import { type Config, type Scenario } from 'artillery';
import { loadPage } from '../helpers/artillery_helper';

export const config: Config = {
  target: 'https://www.saucedemo.com',
  engines: {
    playwright: {
      trace: {
        enabled: true
      }
    }
  },
  phases: [{
    name: 'Example Artillery Test Phase',
    duration: 60,
    arrivalRate: 5
  }]
};

export const scenarios: Scenario[] = [{
  engine: 'playwright',
  testFunction: loadPage
}];
