# local-storage-helpers 🫙

[![Version](https://img.shields.io/npm/v/local-storage-helpers)](https://www.npmjs.com/package/local-storage-helpers)

A set of useful helper functions for reading from and writing to the browser's local storage, as well as other related tasks.

If you need to (programmatically) find the answer to one of the following questions then this package is for you:

- _"How much space&ast; of local storage does my current browser provide?"_
- _"How much of that is already used?"_
- _"Which item takes how much of that space?"_
- _"Does my browser have space remaining in local storage?"_
- _"I have an item of size x I'd like to store - is there still enough space for it?"_-
- _"Does my browser even support local storage?"_
- etc.

<span style="font-size: 10px;">&ast;) Note how the word "space" refers to the number of characters and not to the actual number of bytes.</span>

## Installation

Via npm:

```bash
npm i local-storage-helpers --save
```

Via yarn:

```bash
yarn add local-storage-helpers
```

## Live Demos

Following soon!

## Usage

```typescript
import { isLocalStorageAvailable } from "local-storage-helpers";

const isAvailable: boolean = isLocalStorageAvailable();

// All the other helper functions can be imported and used in similar ways.
// Below you will find detailed descriptions on various helpers.
```

## Helper Functions - general tools:

### `isLocalStorageAvailable`

| parameters | return value | description                                                                                                                                                                                        |
| ---------- | ------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| -          | `boolean`    | Returns `true` if your browser supports local storage. It does not matter if the storage is already used, full or empty. This is only about the availability of the functionality in your browser. |

## Helper Functions - write operations:

### `insertItem`

| parameters                      | return value | description                                                                                                                                                                                                                                                     |
| ------------------------------- | ------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| keyName: `string`, value: `any` | `void`       | Inserts an item into the storage with the given key. Throws an error if an entry with the given key already exists (!) - use `upsertItem` instead if you want items to be automatically overwritten in such cases. Throws an error if anything else goes wrong. |

### `upsertItem`

| parameters                      | return value | description                                                                                                                                        |
| ------------------------------- | ------------ | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| keyName: `string`, value: `any` | `void`       | Upserts an item into the storage with the given key, meaning, it will overwrite any alread existing entry. Throws an error if anything goes wrong. |

## Helper Functions - read operations:

### `getAllKeys`

| parameters               | return value | description                                                                                                                             |
| ------------------------ | ------------ | --------------------------------------------------------------------------------------------------------------------------------------- |
| keyFilter?: `IKeyFilter` | `string[]`   | Gets all local storage keys for your domain. You can optionally provide filters when retrieving keys - see "key filters" section below. |

### `getAllValues`

Type parameters:
`<T extends any = any, U extends any = T>`

| parameters                                              | return value | description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| ------------------------------------------------------- | ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| keyFilter?: `IKeyFilter`, getOptions?: `IGetOptions<U>` | `(T\|U)[]`   | Gets all local storage values for your domain - already JSON parsed. Meaning, the value `"{}"` for instance will result in a valid JavaScript object `{}`. You can optionally provide filters when retrieving keys - see [Key Filters section](#key-filters) below. Also you can optionally provide options for configuring certain behaviours - see [Get-Options section](#get-options) below. Finally, you can provide type parameters - see [Type Parameters section](#type-parameters) below. |

### `getAllValuesSerialized`

| parameters               | return value | description                                                                                                                                                                                                      |
| ------------------------ | ------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| keyFilter?: `IKeyFilter` | `string[]`   | Gets all local storage values for your domain - in the way they are stored in the storage (serialized). You can optionally provide filters when retrieving keys - see [Key Filters section](#key-filters) below. |

### `getAllRecords`

Type parameters:
`<T extends any = any, U extends any = T>`

| parameters                                              | return value                  | description                                                                                                                                                                             |
| ------------------------------------------------------- | ----------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| keyFilter?: `IKeyFilter`, getOptions?: `IGetOptions<U>` | `ILocalStorageRecord<T, U>[]` | This is the exact same thing as `getAllValues`, but it doesn't return the parsed values only, but rather objects that hold the `key`, the parsed `value` and the serialized `valueRaw`. |

### `getValue`

Type parameters:
`<T extends any = any, U extends any = T>`

| parameters                                       | return value        | description                                                                                                                                                                                                                                                       |
| ------------------------------------------------ | ------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| keyName: `string`, getOptions?: `IGetOptions<U>` | `string\|undefined` | Tries to retrieve the parsed value based on the provided `keyName`. You can configure special options (like what would happen if the desired item cannot be found, etc.) via the optional `getOptions` parameter - see [Get-Options section](#get-options) below. |

### `getValueSerialized`

| parameters        | return value        | description                                                                                                                                                                                                            |
| ----------------- | ------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| keyName: `string` | `string\|undefined` | Tries to retrieve the value based on the provided `keyName` and return it in the way they are stored in the storage (serialized). If no item according to the provided `keyName` exists, this will return `undefined`. |

## Helper Functions - analysis:

### `getSpaceRemaining`

| parameters | return value | description                                                                                                                                                                                                                                                                                            |
| ---------- | ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| -          | `number`     | Analyses the local storage of the current browser and returns the total amount of characters it can store for any given domain. Note: it does not matter if there is already something stored in your local storage, or if it's maybe completely empty or completely full. It won't affect its result. |

### `getSpaceRequired`

Type parameters:
`<T extends any = any>`

| parameters                          | return value | description                                                                                             |
| ----------------------------------- | ------------ | ------------------------------------------------------------------------------------------------------- |
| keyName: `string`, dataToStore: `T` | `number`     | Analyses how much space would be required for storing the given `dataToStore` with the given `keyName`. |

### `getSpaceRequiredAsStatistics`

Type parameters:
`<T extends any = any>`

| parameters                          | return value  | description                                                                                                                                                                                                                                                                                                                                  |
| ----------------------------------- | ------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| keyName: `string`, dataToStore: `T` | `IStatistics` | Same as above, but instead of returning a raw number only, it returns an object of type `IStatistics`, meaning, an object having a `spaceUsed` property (telling you how much space it needs absolutely) and a `spaceUsedPercentage` property (telling you how much space it would need relatively to the total space of the local storage). |

### `getSpaceSummary`

Type parameters:
`<T extends any = any, U extends any = T>`

| parameters | return value    | description                                                                                                                                                                                                                                                                                                              |
| ---------- | --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| -          | `ISpaceSummary` | Analyses your browser's local storage and gives you information about the space - total available, remaining, remaining (percentage), used, used (percentage) - as well as a property `allRecordsWithStatistics` which provides one object in the shape of `ILocalStorageRecordWithStatistics` per item in your storage. |

### `getSpaceTotal`

| parameters | return value | description                                                                                                                                    |
| ---------- | ------------ | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| -          | `number`     | Analyses your browser's local storage and gives you the total amount of space it provides (ignoring how much of it is already used or unused). |

### `getSpaceUsed`

| parameters               | return value | description                                                                                                                                                                                                                                                                                                |
| ------------------------ | ------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| keyFilter?: `IKeyFilter` | `number`     | Analyses your browser's local storage and gives you the total amount of space that is already in use. You can optionally provide filters when retrieving keys - see [Key Filters section](#key-filters) below - in that case it will only tell you the total amount of used space by those filtered items. |

### `getSpaceUsedAsStatistics`

| parameters               | return value  | description                                                                                                                                                                               |
| ------------------------ | ------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| keyFilter?: `IKeyFilter` | `IStatistics` | The same as above, but instead of returning you a raw number, it will give you an object holding both the absolute `spaceUsed` value as well as the relative `spaceUsedPercentage` value. |

### `isSpaceSufficient`

Type parameters:
`<T extends any = any>`

| parameters                          | return value | description                                                                                                                                                                                                                    |
| ----------------------------------- | ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| keyName: `string`, dataToStore: `T` | `boolean`    | Analyses your browser's local storage as well as the size it would need to store your data (based on the provided `keyName` and `dataToStore`=value) and tells you `true` if it fits into the storage - and `false` otherwise. |

## Key Filters

Certain helper functions allow you to provide an optional `IKeyFilter`.

The definition of such an `IKeyFilter` is ` type IKeyFilter = string | IKeyFilterFn[];`.

If you provide a `string`, the function will try to find any key that matches that exactly (at most 1 key of course, since there cannot be multiple keys with the same name).

If you provide an array of `IKeyFilterFn`, the function will execute them one by one and only include the items where every filter function returns `true`.

Example:
Providing the following array will only consider items whose keys start with `A` and end with `Z`:

`[ (s: string) => s.startsWith("A"), (s: string) => s.endsWith("Z") ]`

## Get Options

For some of the getter functions of this library you can provide an optional `IGetOptions` object. Its purpose is to define the function behaviour for edge cases.

Let's first look at its structure:

```typescript
type IGetOptions<U> = {
  actionForKeyNotFound?: IActionOrCustomFunction<U>;
  actionForValueUndefined?: IActionOrCustomFunction<U>;
  actionForParsingFailure?: IActionOrCustomFunction<U>;
  fallbackValue?: U;
  fallbackValueFn?: (keyName: string) => U;
};
```

In principle, it distinguishes between 3 special cases:

1. No item/key can be found for the provided `keyName`.
2. The item/key can be found, but the value is `"undefined"`. A simple JSON.parse of that would result in an error.
3. An arbitrary value parsing error happens.

For all 3 cases you can decide what should happen, and you have the following options for each of them:

1. `"RETURN_FALLBACK"` → it will return a fallback value, that you can define
2. `"CALL_FALLBACK_FN"` → it will call a function, that you can define, in the shape of `(keyName: string) => U`
3. `"RETURN_NULL"` → it will return `null`
4. `"RETURN_UNDEFINED"` → it will return `undefined` - which could especially make sense if the stored value is the string `"undefined"`, which would normally not be JSON.parsed properly!
5. `"THROW_ERROR"` → it will throw an `Error`
6. Call an arbitrary `(keyName: string) => T` function

You can pick them by providing the corresponding value in the `IGetOptions` object, described above.

ℹ️ The difference between 2. and 6. is that the former is referring to one globally defined `fallbackValueFn` which can be re-used across the special cases, while the latter allows you to define functions for the individual cases.

⚠️ Please note:

- if you choose `"RETURN_FALLBACK"` somewhere, you also need to provide a `fallbackValue` that will be returned in such cases
- if you choose `"CALL_FALLBACK_FN"` somewhere, you also need to provide a `fallbackValueFn` that will be called in such cases

## Type Parameters

The library was built with quite some focus on TypeScript usage.

For instance, if you know which kind of type you expect while reading from the local storage, you can define this like so:

```typescript
import { getValue } from "local-storage-helpers";

interface IUser {
  firstName: string;
  lastName: string;
}

const user1: IUser = getValue<IUser>("some-local-storage-key");

// Or - if you are working with fallback values:

interface ISomeOptionalFallbackType {
  nickname: string;
}

const user2: IUser | ISomeOptionalFallbackType = getValue<
  IUser,
  ISomeOptionalFallbackType
>("another-local-storage-key");
```

## Possible Improvements

- Introduce filters for values (current ones are filtering based on key names only)
- Add tests
- Add bulk insert
- Add bulk upsert
- tbc.
