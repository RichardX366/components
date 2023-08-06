export const formatPhoneNumber = (
  phoneNumberString?: string | null,
): string => {
  if (!phoneNumberString) return '';
  const cleaned = ('' + phoneNumberString).replace(/\D/g, '');
  const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
  if (match) {
    return '(' + match[1] + ') ' + match[2] + '-' + match[3];
  }
  return phoneNumberString;
};

export const formatNumber = (num?: number | null): string =>
  (num || 0).toLocaleString('en-US');

export const formatCurrency = (num?: number | null): string =>
  (num || 0).toLocaleString('en-us', { style: 'currency', currency: 'USD' });

export const capitalize = (str: string): string =>
  str[0]?.toUpperCase() + str.slice(1).toLowerCase();

export const unCamelCase = (str: string): string =>
  str.replace(/([A-Z]|\d)/g, ' $1').replace(/^./, function (str) {
    return str.toUpperCase();
  });

export const unScreamingSnakeCase = (str: string): string =>
  str.split('_').map(capitalize).join(' ');

export const colorFromHueRange = (
  {
    from,
    to,
    saturation = 100,
    lightness = 40,
  }: {
    from: number;
    to: number;
    saturation?: number;
    lightness?: number;
  },
  value: number,
): string => {
  let hue: number;
  if (from < to) {
    hue = from + value * (to - from);
  } else {
    hue = from - value * (from - to);
  }
  const distanceFromGreen = Math.abs(180 - ((hue + 60) % 360)); // For correcting eye sensitivity to green
  return `hsl(${hue}, ${saturation}%, ${lightness + distanceFromGreen / 18}%)`;
};

/**
 * A function that gets a tint string to tint a specified image in a background-image property
 * @param tintColor The tint's RGB color (if only 1 number is provided all 3 RGB values will be set to it to produce a gray; interpreted as 0-1)
 * @param tintStrength The opacity of the tint (0 - 1)
 * @returns A CSS linear gradient which can be applied to a background-image style as `getTintString(...) url('backgroundImage')`
 */
export const getTintString = (
  tintColor?: number | [number, number, number],
  tintStrength = 0.5,
) => {
  if (tintColor === undefined) return '';
  let tintArray =
    typeof tintColor === 'number'
      ? new Array(3).fill(tintColor * 255)
      : tintColor;
  tintArray.push(tintStrength);
  return `
    linear-gradient(
      rgba(${tintArray.join(',')}),
      rgba(${tintArray.join(',')})
    ),`;
};

export const hexToRGB = (hex: string) => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? [
        parseInt(result[1], 16),
        parseInt(result[2], 16),
        parseInt(result[3], 16),
      ]
    : null;
};

/**
 * Removes duplicate objects/primitives
 * @param list The list of objects/primitives
 * @param key The key that you want remove duplicates by (eg. 'id') (if there is none provided, it requires the list be of primitives eg. strings)
 * @returns A list without duplicate objects/primitives
 */
export const removeListDuplicates = <S,>(list: S[], key?: keyof S): S[] =>
  list.reduce(
    (prev, curr) =>
      (key ? prev.find((item) => item[key] === curr[key]) : prev.includes(curr))
        ? prev
        : prev.concat(curr),
    [] as S[],
  );

export const lean = <T,>(obj: T): T => JSON.parse(JSON.stringify(obj));

/**
 * Replaces all falsey values in an object with '' (for handling forms)
 * @param value The object to replace falsey values with ''
 * @returns The object with all falsey values as ''
 */
export const falseyToEmpty = (obj: any) =>
  Object.fromEntries(
    Object.entries(obj).map(([key, value]) =>
      value ? [key, value as string] : [key, ''],
    ),
  );

export const formatFileSize = (bytes: number) => {
  var i = -1;
  var byteUnits = [' kB', ' MB', ' GB', ' TB', 'PB', 'EB', 'ZB', 'YB'];
  do {
    bytes /= 1000;
    i++;
  } while (bytes > 1000);

  return Math.max(bytes, 0.1).toFixed(1) + byteUnits[i];
};

export const dateTimeInput = (date: Date | string) => {
  const newDate = new Date(date);
  const local = newDate
    .toLocaleDateString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    })
    .split('/');
  const time = newDate
    .toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    })
    .split(':');
  return `${local[2]}-${local[0]}-${local[1]}T${time[0]}:${time[1]}`;
};

export const dateInput = (date: Date | string) => {
  const newDate = new Date(date);
  const local = newDate
    .toLocaleDateString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    })
    .split('/');
  return `${local[2]}-${local[0]}-${local[1]}`;
};

export const wordDate = (date: Date | string) => {
  const newDate = new Date(date);
  return newDate.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

export const numberDate = (date: Date | string) => {
  const newDate = new Date(date);
  return newDate.toLocaleDateString('en-US', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });
};

export const utcTimeToLocal = (utc: string, date: string | Date): string =>
  new Date(
    `${new Date(date).toLocaleDateString()} ${utc} UTC`,
  ).toLocaleTimeString('en-GB', { timeStyle: 'short' });

export const localTimeToUTC = (local: string, date: string | Date): string =>
  new Date(
    `${new Date(date).toLocaleDateString()} ${local}`,
  ).toLocaleTimeString('en-GB', { timeStyle: 'short', timeZone: 'UTC' });

export const mimeAcceptable = (mimeTypes: string[], mimeType: string) => {
  const regexp = new RegExp(
    `^${mimeTypes
      .map((allowedType) =>
        allowedType
          .replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
          .replace(/\\\*/g, '.+'),
      )
      .join('|')}$`,
    'i',
  );
  return regexp.test(mimeType);
};
