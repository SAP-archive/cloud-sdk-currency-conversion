# SAP Cloud SDK Currency Conversion Library

[![REUSE status](https://api.reuse.software/badge/github.com/SAP/cloud-sdk-currency-conversion)](https://api.reuse.software/info/github.com/SAP/cloud-sdk-currency-conversion)

## The SAP Cloud SDK Currency Conversion Library is deprecated
This repository and the npm packages `@sap-cloud-sdk/currency-conversion-core`, `@sap-cloud-sdk/currency-conversion-data-adapter`, `@sap-cloud-sdk/currency-conversion-models`, `@sap-cloud-sdk/currency-conversion-integration-objects` are deprecated. There will be no major updates, bug fixes, etc.

## Overview
The currency conversion library is an extension to the SAP Cloud SDK. You can use this library to facilitate currency exchange rate conversion.

> The library does not provide any out of the box market data. You must provide the currency exchange rates to the library from your own data sources. You can use the [SAP Market Rates Management](https://www.sap.com/products/market-rates-management.html) service or any other service of your choice.

You can use the library for the following functions:

- Direct one-to-one conversions - from a source currency to a target currency.
- Indirect conversions - uses inverse rates or a "reference currency".
- Fixed rate conversions - you have the exact currency exchange rate that you want to use in your conversion operations.
- Non-fixed rate conversions - unlike the fixed rate, you have a set of exchange rates. The library will pick the "best rate" from the set depending on [various factors](https://sap.github.io/cloud-sdk/docs/java/features/extensions/extension-library/curconv/sap-currency-conversion-extension-library-for-cloud-sdk-for-java/#non-fixed-rate).

The library provides the following modules:

- [Core](packages/core/)
- [Adapter](packages/adapter/)
- [Models](packages/models/)
- [Integration Objects](packages/integration-objects)

## Features

### Convert Currencies

Get currency exchange rates converted from a source currency to a target currency by using the currency conversion library.

#### Get Bulk Conversions

Multiple currency pairs can be converted through a single call. You can use the library methods to get more than one currency pair converted simultaneously.

#### Get Direct and Indirect Conversions

Get direct and indirect currency conversions for your currency pairs. Direct conversions are one-to-one conversions between a source and a target currency. Indirect conversions are performed by using inverse rates or a reference currency.

## Requirements

The currency conversion library requires:

- TypeScript 4.0.2+
- Node.js
- @sap/cds 4.3.0+

## Download and Installation

Install the currency conversion library using npm:

```bash
npm install @sap-cloud-sdk/currency-conversion-core, @sap-cloud-sdk/currency-conversion-data-adapter, @sap-cloud-sdk/currency-conversion-models, @sap-cloud-sdk/currency-conversion-integration-objects
```

## Usage

The following code examples show the various usages of the library:

- [Direct Conversion](packages/core#usage)

- [Non-Fixed Rate Conversion](packages/adapter#usage)

## How to obtain support

The GitHub issue tracker is the preferred channel for reporting bugs, feature requests, or querying.

## License

Copyright 2018-2021 SAP SE or an SAP affiliate company and cloud-sdk-currency-conversion contributors. This project is licensed under Apache 2.0 as noted in the [license file](LICENSE). Detailed information including third-party components and their licensing/copyright information is available [via the REUSE tool](https://api.reuse.software/info/github.com/SAP/cloud-sdk-currency-conversion).
