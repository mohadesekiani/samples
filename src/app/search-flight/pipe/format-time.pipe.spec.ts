import { FormatTimePipe } from './format-time.pipe';

describe('SUT: FormatTimePipe', () => {
  let sut: FormatTimePipe;
  beforeEach(() => {
    sut = new FormatTimePipe();
  });
  it('should be created', () => {
    // assert
    expect(sut).toBeTruthy();
  });
  it('transforms minutes to HH:mm format', () => {
    // assert
    expect(sut.transform(90)).toBe('01:30');
    expect(sut.transform(45)).toBe('00:45');
    expect(sut.transform(0)).toBe('00:00');
    expect(sut.transform(120)).toBe('02:00');
    expect(sut.transform(1200)).toBe('20:00');
  });
});
