import { WeatherPipe } from './weather.pipe';

describe('WeatherPipe', () => {
  it('create an instance', () => {
    const pipe = new WeatherPipe();
    expect(pipe).toBeTruthy();
  });
});
