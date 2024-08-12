import { CustomUpperCasePipe } from './custom-upper-case.pipe';

describe('CustomUpperCasePipe', () => {

  const customUpperCasePipe = new CustomUpperCasePipe();

  it("should return 'ANGULAR TEST'", () => {
    const textTransformed = customUpperCasePipe.transform('angular test');
    expect(textTransformed).toEqual('ANGULAR TEST');
  });

  it("should return 'ANGULAR 16'", () => {
    const textTransformed = customUpperCasePipe.transform('ANGULAR 16');
    expect(textTransformed).toEqual('ANGULAR 16');
  });
  
});
