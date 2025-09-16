import { camelCase } from 'lodash';

export const deeplyCamelize = <T, U>(obj: T): T | U | T[] | U[] => {
  if (!obj || typeof obj !== 'object') {
    return obj;
  }

  if (obj instanceof Date || obj instanceof RegExp || obj instanceof Error) {
    return obj;
  }

  if (Array.isArray(obj)) {
    const array: U[] = [];
    obj.forEach((item) => {
      array.push(deeplyCamelize(item));
    });

    return array;
  }

  const returns: Record<string, unknown> = {};

  Object.keys(obj).forEach((key) => {
    const _case: string = camelCase(key);
    returns[_case] = deeplyCamelize((obj as Record<string, unknown>)[key]);
  });

  return returns as T | U;
}