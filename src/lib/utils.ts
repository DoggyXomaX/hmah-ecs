type TNamed = { name: string };
type TTyped = { type: string };

const clone = <T>(obj: T): T => JSON.parse(JSON.stringify(obj));

const findByNameFast = <T extends TNamed>(arr: T[], name: string): T | undefined => {
  const count = arr.length;
  for (let i = 0; i < count; i++) {
    const element = arr[i];
    if (element.name === name) {
      return element;
    }
  }

  return undefined;
};
const findByTypeFast = <T extends TTyped>(arr: T[], type: string) => {
  const count = arr.length;
  for (let i = 0; i < count; i++) {
    const element = arr[i];
    if (element.type === type) {
      return element;
    }
  }

  return undefined;
};

const findAllByNameFast = <T extends TNamed>(arr: T[], name: string): T[] => {
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
const findAllByTypeFast = <T extends TTyped>(arr: T[], type: string): T[] => {
  const outArray: T[] = [];

  const count = arr.length;
  for (let i = 0; i < count; i++) {
    const element = arr[i];
    if (element.type === type) {
      outArray.push(element);
    }
  }

  return outArray;
};

const findAllByNameArrayFast = <T extends TNamed>(arr: T[], names: string[]) => {
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
const findAllByTypeArrayFast = <T extends TTyped>(arr: T[], types: string[]) => {
  const outArray: T[] = [];

  const count = arr.length;
  const typesCount = types.length;
  for (let i = 0; i < typesCount; i++) {
    const type = types[i];
    for (let j = 0; j < count; j++) {
      const element = arr[j];
      if (element.type === type) {
        outArray.push(element);
      }
    }
  }

  return outArray;
};

const hasNameFast = <T extends TNamed>(arr: T[], name: string) => {
  const count = arr.length;
  for (let i = 0; i < count; i++) {
    if (arr[i].name === name) {
      return true;
    }
  }
  return false;
}
const hasTypeFast = <T extends TTyped>(arr: T[], type: string) => {
  const count = arr.length;
  for (let i = 0; i < count; i++) {
    if (arr[i].type === type) {
      return true;
    }
  }
  return false;
};

const removeNameFast = <T extends TNamed>(arr: T[], name: string) => {
  const count = arr.length;
  for (let i = 0; i < count; i++) {
    if (arr[i].name === name) {
      arr.splice(i, 1);
      return;
    }
  }
};
const removeTypeFast = <T extends TTyped>(arr: T[], type: string) => {
  const count = arr.length;
  for (let i = 0; i < count; i++) {
    if (arr[i].type === type) {
      arr.splice(i, 1);
      return;
    }
  }
};

export {
  clone,

  findByNameFast,
  findByTypeFast,

  findAllByNameArrayFast,
  findAllByTypeArrayFast,

  findAllByNameFast,
  findAllByTypeFast,

  hasNameFast,
  hasTypeFast,

  removeNameFast,
  removeTypeFast,
};
