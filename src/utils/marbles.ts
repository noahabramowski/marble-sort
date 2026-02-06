type Marble = number;

interface RandomizeMarbleProps {
  uniqueCount: number;
  tubeHeight: number;
}

export const generateStartingMarbles = ({ uniqueCount, tubeHeight }: RandomizeMarbleProps): Marble[][] => {
  const emptyTube: Marble[] = [];
  const filledTubes: Marble[][] = Array.from({ length: uniqueCount }).map((__value, index) =>
    Array.from({ length: tubeHeight }).map(() => index + 1)
  );

  return [...filledTubes, emptyTube];
};

export const getRandomInt = ({ max, min = 0 }: { max: number; min?: number }) => {
  const minCeiled = Math.ceil(min);
  const maxFloored = Math.floor(max);
  return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled);
};

export const getRandomItemFromList = <T>({ list }: { list: T[] }) => {
  const index = getRandomInt({ max: list.length });
  return list[index];
};

export const isEmptyTube = (tube: Marble[]) => {
  return tube.length === 0;
};

export const doesTubeHaveSpace = ({ tube, tubeHeight }: { tube: Marble[]; tubeHeight: number }) => {
  return tube.length !== tubeHeight;
};

export const getTopMarble = (tube: Marble[]) => {
  if (tube.length > 0) {
    const [topMarble] = [...tube].reverse();
    return topMarble;
  }
  throw new Error('No marbles to remove');
};

export const getAvailableIndexesForShuffle = ({
  currentState,
  tubeHeight
}: {
  currentState: Marble[][];
  tubeHeight: number;
}): number[] => {
  return currentState.flatMap((tube, index) => (doesTubeHaveSpace({ tube, tubeHeight }) ? [index] : []));
};

export const getTubeIndexToRemoveMarbleFrom = ({ currentState }: { currentState: Marble[][] }): number => {
  const validTubeIndexes = [...currentState].flatMap((tube, tubeIndex) => (isEmptyTube(tube) ? [] : [tubeIndex]));

  return getRandomItemFromList({ list: validTubeIndexes });
};

export const getTubeWithRemovedTopMarble = (tube: Marble[]): Marble[] => {
  const tubeToUpdate = [...tube];
  if (tube.length > 0) {
    tubeToUpdate.pop();
    return tubeToUpdate;
  }

  throw new Error('No marbles to remove');
};

export const getTubeWithNewMarble = ({
  tube,
  newMarble,
  tubeHeight
}: {
  tube: Marble[];
  newMarble: number;
  tubeHeight: number;
}): Marble[] => {
  const tubeToUpdate = [...tube];
  if (tube.length < tubeHeight) {
    tubeToUpdate.push(newMarble);
    return tubeToUpdate;
  }

  throw new Error('Tube is full');
};

export const shuffleSingleMarble = ({
  currentState,
  tubeHeight
}: {
  currentState: Marble[][];
  tubeHeight: number;
}): Marble[][] => {
  const initialTubeIndex = getTubeIndexToRemoveMarbleFrom({ currentState });

  const availableIndexes = getAvailableIndexesForShuffle({ currentState, tubeHeight });
  const randomDestinationIndex = getRandomItemFromList({ list: availableIndexes });

  return currentState.map((tube, tubeIndex) => {
    if (tubeIndex === initialTubeIndex) {
      return [...getTubeWithRemovedTopMarble(tube)];
    }

    if (tubeIndex === randomDestinationIndex) {
      const marbleToMove = getTopMarble(currentState[initialTubeIndex]);
      if (marbleToMove) {
        return [...getTubeWithNewMarble({ tube, newMarble: marbleToMove, tubeHeight })];
      }
    }

    return [...tube];
  });
};

export const randomizeMarbles = ({ uniqueCount, tubeHeight }: RandomizeMarbleProps): Marble[][] => {
  const startingMarbles = generateStartingMarbles({ uniqueCount, tubeHeight });

  const howManyShuffles = 2; // getRandomInt({ max: 150, min: 60 });

  // Why is eating marbles?
  return Array.from({ length: howManyShuffles }).reduce<Marble[][]>(acc => {
    return shuffleSingleMarble({ currentState: acc, tubeHeight });
  }, startingMarbles);
  // TODO make sure all tubes are filled at end
};

export const countMarbles = ({ currentState }: { currentState: Marble[][] }) => {
  return currentState.reduce((acc, tube) => {
    return acc + tube.length;
  }, 0);
};
