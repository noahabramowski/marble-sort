import {
  countMarbles,
  doesTubeHaveSpace,
  generateStartingMarbles,
  getAvailableIndexesForShuffle,
  getRandomItemFromList,
  getTopMarble,
  getTubeIndexToRemoveMarbleFrom,
  getTubeWithNewMarble,
  getTubeWithRemovedTopMarble,
  isEmptyTube,
  randomizeMarbles,
  shuffleSingleMarble
} from './marbles';

describe('generateStartingMarbles', () => {
  it('should generate 2 unique colors', () => {
    const result = generateStartingMarbles({ uniqueCount: 2, tubeHeight: 4 });
    expect(result).toStrictEqual([[1, 1, 1, 1], [2, 2, 2, 2], []]);
  });

  it('should generate 3 unique colors', () => {
    const result = generateStartingMarbles({ uniqueCount: 3, tubeHeight: 4 });
    expect(result).toStrictEqual([[1, 1, 1, 1], [2, 2, 2, 2], [3, 3, 3, 3], []]);
  });
  it('should generate 4 unique colors', () => {
    const result = generateStartingMarbles({ uniqueCount: 4, tubeHeight: 4 });
    expect(result).toStrictEqual([[1, 1, 1, 1], [2, 2, 2, 2], [3, 3, 3, 3], [4, 4, 4, 4], []]);
  });
});
describe('getRandomItemFromList', () => {
  it('should get random item from a list', () => {
    jest.spyOn(Math, 'random').mockReturnValue(0.8);
    const result = getRandomItemFromList({ list: [1, 2, 3] });
    expect(result).toBe(3);
  });
});
describe('isEmptyTube', () => {
  it('should return true if tube is empty', () => {
    const result = isEmptyTube([]);
    expect(result).toBe(true);
  });
  it('should false if tube is not empty', () => {
    const result = isEmptyTube([1, 2]);
    expect(result).toBe(false);
  });
});
describe('doesTubeHaveSpace', () => {
  it('should return true if tube has space', () => {
    const result = doesTubeHaveSpace({ tube: [1], tubeHeight: 2 });
    expect(result).toBe(true);
  });

  it('should return false if tube is full', () => {
    const result = doesTubeHaveSpace({ tube: [1, 2], tubeHeight: 2 });
    expect(result).toBe(false);
  });
});
describe('getTopMarble', () => {
  it.each([
    { list: [1], expectedValue: 1 },
    { list: [1, 2], expectedValue: 2 },
    { list: [1, 2, 3], expectedValue: 3 }
  ])('should get index of top marble for list of length $list.length', ({ list, expectedValue }) => {
    const result = getTopMarble(list);
    expect(result).toBe(expectedValue);
  });
  it('should throw error if no marbles to remove', () => {
    expect(() => getTopMarble([])).toThrow('No marbles to remove');
  });
});
describe('getAvailableIndexesForShuffle', () => {
  it('should get available indexes', () => {
    const result = getAvailableIndexesForShuffle({
      currentState: [[0, 0], [1, 1, 1, 1], [2, 2, 2], [3, 3, 3, 3], []],
      tubeHeight: 4
    });
    expect(result).toStrictEqual([0, 2, 4]);
  });
});
describe('getTubeIndexToRemoveMarbleFrom', () => {
  it('should get tube index of non-empty list', () => {
    const result = getTubeIndexToRemoveMarbleFrom({ currentState: [[], [], [], [1], [], [], [], [], []] });
    expect(result).toBe(3);
  });
});
describe('getTubeWithRemovedTopMarble', () => {
  it('should return tube without top marble', () => {
    const result = getTubeWithRemovedTopMarble([1, 2, 3]);
    expect(result).toStrictEqual([1, 2]);
  });
  it('should throw error if no marble to remove', () => {
    expect(() => getTubeWithRemovedTopMarble([])).toThrow('No marbles to remove');
  });
});
describe('getTubeWithNewMarble', () => {
  it('should return tube with new top marble', () => {
    const result = getTubeWithNewMarble({ tube: [1], newMarble: 1, tubeHeight: 2 });
    expect(result).toStrictEqual([1, 1]);
  });
  it('should throw an error if no room to add a marble', () => {
    expect(() => getTubeWithNewMarble({ tube: [1, 2], newMarble: 1, tubeHeight: 2 })).toThrow('Tube is full');
  });
});

describe('shuffleSingleMarble', () => {
  it('shuffle marble to empty tube', () => {
    jest.spyOn(Math, 'random').mockReturnValue(0.2);
    const result = shuffleSingleMarble({
      currentState: [[1, 1, 1, 1], [2, 2, 2, 2], [3, 3, 3, 3], [4, 4, 4, 4], []],
      tubeHeight: 4
    });
    expect(result).toStrictEqual([[1, 1, 1], [2, 2, 2, 2], [3, 3, 3, 3], [4, 4, 4, 4], [1]]);
  });
  it('shuffle marble to empty tube with different random value', () => {
    jest.spyOn(Math, 'random').mockReturnValue(0.6);
    const result = shuffleSingleMarble({
      currentState: [[1, 1, 1, 1], [2, 2, 2, 2], [3, 3, 3, 3], [4, 4, 4, 4], []],
      tubeHeight: 4
    });
    expect(result).toStrictEqual([[1, 1, 1, 1], [2, 2, 2, 2], [3, 3, 3], [4, 4, 4, 4], [3]]);
  });
});

describe('randomizeMarbles', () => {
  it('should generate 2 unique colors', () => {
    const result = randomizeMarbles({ uniqueCount: 2, tubeHeight: 4 });
    expect(countMarbles({ currentState: result })).toBe(8);
    // expect(result).toStrictEqual([]);
  });

  it('should generate 3 unique colors', () => {
    const result = randomizeMarbles({ uniqueCount: 3, tubeHeight: 4 });
    expect(countMarbles({ currentState: result })).toBe(12);
    // expect(result).toStrictEqual([]);
  });
  it('should generate 4 unique colors', () => {
    // TRY hard coded list of random values
    const result = randomizeMarbles({ uniqueCount: 4, tubeHeight: 4 });
    expect(countMarbles({ currentState: result })).toBe(16);
    // expect(result).toStrictEqual([]);
  });
});
