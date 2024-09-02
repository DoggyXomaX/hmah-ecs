type TNamed = { name: string };

const clone = <T>(obj: T): T => JSON.parse(JSON.stringify(obj));

const findFast = <T extends TNamed>(arr: T[], name: string): T | undefined => {
  const count = arr.length;
  for (let i = 0; i < count; i++) {
    const element = arr[i];
    if (element.name === name) {
      return element;
    }
  }

  return undefined;
};

const findAllFast = <T extends TNamed>(arr: T[], name: string): T[] => {
  const outArray: T[] = [];

  const count = arr.length;
  for (let i = 0; i < count; i++) {
    const element = arr[i];
    if (element.name === name) {
      outArray.push(element);
    }
  }

  return outArray;
};

const findAllArrayFast = <T extends TNamed>(arr: T[], names: string[]) => {
  const outArray: T[] = [];

  const count = arr.length;
  const namesCount = names.length;
  for (let i = 0; i < namesCount; i++) {
    const name = names[i];
    for (let j = 0; j < count; j++) {
      const element = arr[j];
      if (element.name === name) {
        outArray.push(element);
      }
    }
  }

  return outArray;
};

const hasFast = <T extends TNamed>(arr: T[], name: string) => {
  const count = arr.length;
  for (let i = 0; i < count; i++) {
    if (arr[i].name === name) {
      return true;
    }
  }
  return false;
}

const removeFast = <T extends TNamed>(arr: T[], name: string) => {
  const count = arr.length;
  for (let i = 0; i < count; i++) {
    if (arr[i].name === name) {
      arr.splice(i, 1);
      return;
    }
  }
};

export { clone, findFast, findAllArrayFast, findAllFast, hasFast, removeFast };