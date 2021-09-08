/* Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved. */
import { Tenant } from '@sap-cloud-sdk/core';
import {
  Currency,
  buildCurrency,
  Value,
  TenantSettings,
  ConversionParameterForNonFixedRate,
  buildConversionParameterForNonFixedRate,
  ExchangeRate,
  setDefaultSettings,
  CurrencyAmount
} from '@sap-cloud-sdk/currency-conversion-models';

export const TENANT_ID: Tenant = { id: 'TenantID' };
export const TENANT_ID1: Tenant = { id: 'tenantId1' };
export const TENANT_ID2: Tenant = { id: 'tenantId2' };

export const MRM = 'MRM';
export const ECB = 'ECB';
export const THR = 'THR';

export const A = 'A';
export const M = 'M';
export const ASK = 'ASK';
export const LAST = 'LAST';
export const B = 'B';

export const INR: Currency = buildCurrency('INR');
export const EUR: Currency = buildCurrency('EUR');
export const USD: Currency = buildCurrency('USD');
export const BHD: Currency = buildCurrency('BHD');
export const CLF: Currency = buildCurrency('CLF');

export const A_1: CurrencyAmount = new CurrencyAmount('1');
export const A_10000: CurrencyAmount = new CurrencyAmount('10000');
export const A_20000: CurrencyAmount = new CurrencyAmount('20000');
export const A_300: CurrencyAmount = new CurrencyAmount('300');
export const A_50: CurrencyAmount = new CurrencyAmount('50');
export const A_0_333333333333: CurrencyAmount = new CurrencyAmount('0.333333333333');
export const A_0_33: CurrencyAmount = new CurrencyAmount('0.33');
export const A_0_5: CurrencyAmount = new CurrencyAmount('0.5');
export const A_2: CurrencyAmount = new CurrencyAmount('2');
export const A_120: CurrencyAmount = new CurrencyAmount('120');
export const A_5000: CurrencyAmount = new CurrencyAmount('5000');

const S_0: Value = new Value('0');
const S_1: Value = new Value('1');
const S_2: Value = new Value('2');
const S_3: Value = new Value('3');
const S_5: Value = new Value('5');
const S_10: Value = new Value('10');
const S_7_00000001: Value = new Value('7.00000001');
const S_21_00000001: Value = new Value('21.00000001');
const S_100: Value = new Value('100');
const S_7_0: Value = new Value('7.0');
const S_21_0: Value = new Value('21.0');
const S_123_123: Value = new Value('123.123');
const S_0_300623: Value = new Value('0.300623');
const S_20: Value = new Value('20');
const S_30: Value = new Value('30');

const DATE_2020_01_01: Date = new Date('2020-01-01T02:30:00Z');
const DATE_2020_02_01: Date = new Date('2020-02-01T02:30:00Z');
const DATE_2020_01_16: Date = new Date('2020-01-16T02:30:00Z');
const DATE_2019_09_16: Date = new Date('2019-09-16T02:30:00Z');
const DATE_2020_03_01: Date = new Date('2020-03-01T02:30:00Z');
const DATE_1990_03_01: Date = new Date('1990-03-01T02:30:00Z');
const DATE_2020_01_02: Date = new Date('2020-01-02T02:30:00Z');
const DATE_2020_01_03: Date = new Date('2020-01-03T02:30:00Z');

export const defaultTenantSettings: TenantSettings = {
  ratesDataProviderCode: MRM,
  ratesDataSource: ECB
};

export const overrideTenantSettings: TenantSettings = {
  ratesDataProviderCode: MRM,
  ratesDataSource: THR
};

/* Conversion Parameter Starts */

export const inrEurMConversionParam: ConversionParameterForNonFixedRate = buildConversionParameterForNonFixedRate(
  'INR',
  'EUR',
  '100',
  M,
  DATE_2019_09_16
);
export const eurInrMConversionParam: ConversionParameterForNonFixedRate = buildConversionParameterForNonFixedRate(
  'EUR',
  'INR',
  '10',
  M,
  DATE_2020_01_01
);
export const eurInrInvalidCurrPairConversionParam = buildConversionParameterForNonFixedRate(
  'AUD',
  'BSD',
  '100',
  M,
  DATE_2020_01_01
);
export const inrEurAskConversionParam: ConversionParameterForNonFixedRate = buildConversionParameterForNonFixedRate(
  'INR',
  'EUR',
  '100',
  ASK,
  DATE_2020_01_01
);
export const eurUsdAConversionParam: ConversionParameterForNonFixedRate = buildConversionParameterForNonFixedRate(
  'EUR',
  'USD',
  '100',
  A,
  DATE_2020_03_01
);
export const inrEurMConvParamPastDate: ConversionParameterForNonFixedRate = buildConversionParameterForNonFixedRate(
  'INR',
  'EUR',
  '100',
  M,
  DATE_1990_03_01
);
export const usdEurMConversionParam: ConversionParameterForNonFixedRate = buildConversionParameterForNonFixedRate(
  'USD',
  'EUR',
  '100',
  M,
  DATE_2020_01_01
);
export const usdEurAskConversionParam: ConversionParameterForNonFixedRate = buildConversionParameterForNonFixedRate(
  'USD',
  'EUR',
  '100',
  ASK,
  DATE_2020_01_01
);
export const eurInrDecimalValueConvParam: ConversionParameterForNonFixedRate = buildConversionParameterForNonFixedRate(
  'EUR',
  'INR',
  '120.4576776757575757567',
  B,
  DATE_2020_01_01
);
export const inrBhdMMoreThanFiveParam: ConversionParameterForNonFixedRate = buildConversionParameterForNonFixedRate(
  'INR',
  'BHD',
  '8499999.99990',
  M,
  DATE_2020_01_01
);
export const eurUsdAskConversionParam: ConversionParameterForNonFixedRate = buildConversionParameterForNonFixedRate(
  'EUR',
  'USD',
  '100',
  ASK,
  DATE_1990_03_01
);
export const eurUsdAConvParamPastDate: ConversionParameterForNonFixedRate = buildConversionParameterForNonFixedRate(
  'EUR',
  'USD',
  '100',
  A,
  DATE_1990_03_01
);
export const eurUsdLastConversionParam: ConversionParameterForNonFixedRate = buildConversionParameterForNonFixedRate(
  'EUR',
  'USD',
  '100',
  LAST,
  DATE_1990_03_01
);
export const eurUsdNewConversionParam: ConversionParameterForNonFixedRate = buildConversionParameterForNonFixedRate(
  'EUR',
  'USD',
  '100',
  'New',
  DATE_1990_03_01
);
export const usdEurBConversionParam: ConversionParameterForNonFixedRate = buildConversionParameterForNonFixedRate(
  'USD',
  'EUR',
  '100',
  B,
  DATE_2020_01_01
);
export const eurUsdMrmEcbABCConvParam: ConversionParameterForNonFixedRate = buildConversionParameterForNonFixedRate(
  'USD',
  'EUR',
  '100',
  'ABC',
  DATE_2020_01_01
);
export const usdEurBConvParamPastDate: ConversionParameterForNonFixedRate = buildConversionParameterForNonFixedRate(
  'EUR',
  'USD',
  '100',
  B,
  DATE_1990_03_01
);
export const eurInrAskConversionParam: ConversionParameterForNonFixedRate = buildConversionParameterForNonFixedRate(
  'EUR',
  'INR',
  '100',
  ASK,
  DATE_2020_01_01
);
export const eurUsdAskConversionParameter: ConversionParameterForNonFixedRate = buildConversionParameterForNonFixedRate(
  'EUR',
  'USD',
  '100',
  ASK,
  DATE_2020_01_01
);
export const eurInrIndirectConvParam: ConversionParameterForNonFixedRate = buildConversionParameterForNonFixedRate(
  'EUR',
  'INR',
  '100',
  B,
  DATE_2020_01_01
);
export const eurEurMConversionParam: ConversionParameterForNonFixedRate = buildConversionParameterForNonFixedRate(
  'EUR',
  'EUR',
  '120',
  B,
  DATE_2020_01_01
);
export const inrInrMConversionParam: ConversionParameterForNonFixedRate = buildConversionParameterForNonFixedRate(
  'INR',
  'INR',
  '120',
  B,
  DATE_2020_01_01
);
export const invalidCurrenecyConvParam: ConversionParameterForNonFixedRate = buildConversionParameterForNonFixedRate(
  'AUD',
  'BSD',
  '120',
  B,
  DATE_2020_01_01
);
export const inrBhdMFiveParam: ConversionParameterForNonFixedRate = buildConversionParameterForNonFixedRate(
  'INR',
  'BHD',
  '20.1',
  M,
  DATE_2020_01_01
);
export const inrBhdMLessThanFiveParam: ConversionParameterForNonFixedRate = buildConversionParameterForNonFixedRate(
  'INR',
  'BHD',
  '200.102',
  M,
  DATE_2020_01_01
);
export const usdEurMConversionParameter: ConversionParameterForNonFixedRate = buildConversionParameterForNonFixedRate(
  'USD',
  'EUR',
  '100',
  M,
  DATE_2020_01_03
);
export const eurUsdMrmThrABCConvParam: ConversionParameterForNonFixedRate = buildConversionParameterForNonFixedRate(
  'USD',
  'EUR',
  '100',
  'ABC',
  DATE_2020_01_01
);
export const usdBhdMConversionParam: ConversionParameterForNonFixedRate = buildConversionParameterForNonFixedRate(
  'USD',
  'BHD',
  '100.12122',
  M,
  DATE_2020_01_01
);
export const usdClfMConversionParam: ConversionParameterForNonFixedRate = buildConversionParameterForNonFixedRate(
  'USD',
  'CLF',
  '100.111231',
  M,
  DATE_2020_01_01
);

/* Conversion Parameter Ends */

/* Exchange Rate starts*/

export const inrEurMrmEcbMRate: ExchangeRate = {
  settings: setDefaultSettings(TENANT_ID),
  data: {
    ratesDataProviderCode: MRM,
    ratesDataSource: ECB,
    exchangeRateType: M
  },
  value: S_100,
  fromCurrency: INR,
  toCurrency: EUR,
  validFromDateTime: DATE_2019_09_16
};

export const inrEurMrmEcbMDuplicateExcRate: ExchangeRate = {
  settings: setDefaultSettings(TENANT_ID),
  data: {
    ratesDataProviderCode: MRM,
    ratesDataSource: ECB,
    exchangeRateType: M
  },
  value: S_100,
  fromCurrency: INR,
  toCurrency: EUR,
  validFromDateTime: DATE_2019_09_16
};

export const eurInrMrmEcbMRate: ExchangeRate = {
  settings: setDefaultSettings(TENANT_ID),
  data: {
    ratesDataProviderCode: MRM,
    ratesDataSource: ECB,
    exchangeRateType: M
  },
  value: S_100,
  fromCurrency: EUR,
  toCurrency: INR,
  validFromDateTime: DATE_2020_01_16
};

export const eurInrMrmEcbMDuplicateExcRate: ExchangeRate = {
  settings: setDefaultSettings(TENANT_ID),
  data: {
    ratesDataProviderCode: MRM,
    ratesDataSource: ECB,
    exchangeRateType: M
  },
  value: S_100,
  fromCurrency: EUR,
  toCurrency: INR,
  validFromDateTime: DATE_2019_09_16
};

export const eurInrMrmEcbAskIndirectTrueRate: ExchangeRate = {
  settings: {
    tenantIdentifier: TENANT_ID,
    isIndirect: true,
    fromCurrencyfactor: 1,
    toCurrencyfactor: 1
  },
  data: {
    ratesDataProviderCode: MRM,
    ratesDataSource: ECB,
    exchangeRateType: ASK
  },
  value: S_100,
  fromCurrency: EUR,
  toCurrency: INR,
  validFromDateTime: DATE_2020_01_01
};

export const eurInrMrmEcbAskIndirectFalseRate: ExchangeRate = {
  settings: setDefaultSettings(TENANT_ID),
  data: {
    ratesDataProviderCode: MRM,
    ratesDataSource: ECB,
    exchangeRateType: ASK
  },
  value: S_100,
  fromCurrency: EUR,
  toCurrency: INR,
  validFromDateTime: DATE_2020_01_01
};

export const inrEurMrmEcbMDiffrentTenantRate: ExchangeRate = {
  settings: setDefaultSettings(TENANT_ID1),
  data: {
    ratesDataProviderCode: MRM,
    ratesDataSource: ECB,
    exchangeRateType: M
  },
  value: S_100,
  fromCurrency: INR,
  toCurrency: EUR,
  validFromDateTime: DATE_2019_09_16
};

export const eurUsdMrmEcbMRate: ExchangeRate = {
  settings: setDefaultSettings(TENANT_ID),
  data: {
    ratesDataProviderCode: MRM,
    ratesDataSource: ECB,
    exchangeRateType: M
  },
  value: S_100,
  fromCurrency: EUR,
  toCurrency: USD,
  validFromDateTime: DATE_2020_01_01
};

export const usdEurMrmEcbMRate: ExchangeRate = {
  settings: setDefaultSettings(TENANT_ID),
  data: {
    ratesDataProviderCode: MRM,
    ratesDataSource: ECB,
    exchangeRateType: M
  },
  value: S_100,
  fromCurrency: USD,
  toCurrency: EUR,
  validFromDateTime: DATE_2020_01_01
};

export const usdInrMrmEcbMRate: ExchangeRate = {
  settings: setDefaultSettings(TENANT_ID),
  data: {
    ratesDataProviderCode: MRM,
    ratesDataSource: ECB,
    exchangeRateType: M
  },
  value: S_100,
  fromCurrency: USD,
  toCurrency: INR,
  validFromDateTime: DATE_2020_01_01
};

export const usdInrMrmEcbLastRate: ExchangeRate = {
  settings: setDefaultSettings(TENANT_ID),
  data: {
    ratesDataProviderCode: MRM,
    ratesDataSource: ECB,
    exchangeRateType: LAST
  },
  value: S_10,
  fromCurrency: USD,
  toCurrency: INR,
  validFromDateTime: DATE_2020_02_01
};

export const eurInrMrmEcbLastRate: ExchangeRate = {
  settings: setDefaultSettings(TENANT_ID),
  data: {
    ratesDataProviderCode: MRM,
    ratesDataSource: ECB,
    exchangeRateType: LAST
  },
  value: S_10,
  fromCurrency: EUR,
  toCurrency: INR,
  validFromDateTime: DATE_2020_02_01
};

export const eurUsdMrmEcbIndirectTrueExcRate: ExchangeRate = {
  settings: {
    tenantIdentifier: TENANT_ID,
    isIndirect: true,
    fromCurrencyfactor: 1,
    toCurrencyfactor: 1
  },
  data: {
    ratesDataProviderCode: MRM,
    ratesDataSource: ECB,
    exchangeRateType: A
  },
  value: S_2,
  fromCurrency: EUR,
  toCurrency: USD,
  validFromDateTime: DATE_2020_01_01
};

export const eurUsdMrmEcbIndirectFalseRate: ExchangeRate = {
  settings: setDefaultSettings(TENANT_ID),
  data: {
    ratesDataProviderCode: MRM,
    ratesDataSource: ECB,
    exchangeRateType: A
  },
  value: S_2,
  fromCurrency: EUR,
  toCurrency: USD,
  validFromDateTime: DATE_2020_02_01
};

export const eurInrMrmEcbARate: ExchangeRate = {
  settings: setDefaultSettings(TENANT_ID),
  data: {
    ratesDataProviderCode: MRM,
    ratesDataSource: ECB,
    exchangeRateType: A
  },
  value: S_5,
  fromCurrency: EUR,
  toCurrency: INR,
  validFromDateTime: DATE_2020_02_01
};

export const eurInrMrmEcbADateBeforeRate: ExchangeRate = {
  settings: setDefaultSettings(TENANT_ID),
  data: {
    ratesDataProviderCode: MRM,
    ratesDataSource: ECB,
    exchangeRateType: A
  },
  value: S_5,
  fromCurrency: EUR,
  toCurrency: INR,
  validFromDateTime: DATE_2019_09_16
};

export const usdInrMrmEcbARate: ExchangeRate = {
  settings: setDefaultSettings(TENANT_ID),
  data: {
    ratesDataProviderCode: MRM,
    ratesDataSource: ECB,
    exchangeRateType: A
  },
  value: S_10,
  fromCurrency: USD,
  toCurrency: INR,
  validFromDateTime: DATE_2020_01_01
};

export const eurUsdMrmEcbARate: ExchangeRate = {
  settings: setDefaultSettings(TENANT_ID),
  data: {
    ratesDataProviderCode: MRM,
    ratesDataSource: ECB,
    exchangeRateType: A
  },
  value: S_2,
  fromCurrency: EUR,
  toCurrency: USD,
  validFromDateTime: DATE_2020_01_01
};

export const eurInrMrmEcbADuplicateRate: ExchangeRate = {
  settings: setDefaultSettings(TENANT_ID),
  data: {
    ratesDataProviderCode: MRM,
    ratesDataSource: ECB,
    exchangeRateType: A
  },
  value: S_5,
  fromCurrency: EUR,
  toCurrency: INR,
  validFromDateTime: DATE_2020_02_01
};

export const usdInrMrmEcbADuplicateRate: ExchangeRate = {
  settings: setDefaultSettings(TENANT_ID),
  data: {
    ratesDataProviderCode: MRM,
    ratesDataSource: ECB,
    exchangeRateType: A
  },
  value: S_5,
  fromCurrency: USD,
  toCurrency: INR,
  validFromDateTime: DATE_2020_02_01
};

export const eurInrMrmIndirectTrueRate: ExchangeRate = {
  settings: {
    tenantIdentifier: TENANT_ID,
    isIndirect: true,
    fromCurrencyfactor: 1,
    toCurrencyfactor: 1
  },
  data: {
    ratesDataProviderCode: MRM,
    ratesDataSource: ECB,
    exchangeRateType: A
  },
  value: S_5,
  fromCurrency: EUR,
  toCurrency: INR,
  validFromDateTime: DATE_2020_02_01
};

export const eurInrMrmIndirectFalseRate: ExchangeRate = {
  settings: setDefaultSettings(TENANT_ID),
  data: {
    ratesDataProviderCode: MRM,
    ratesDataSource: ECB,
    exchangeRateType: A
  },
  value: S_5,
  fromCurrency: EUR,
  toCurrency: INR,
  validFromDateTime: DATE_2020_02_01
};

export const eurInrMrmIndirectTrueFactorMoreThanOneRate: ExchangeRate = {
  settings: {
    tenantIdentifier: TENANT_ID,
    isIndirect: true,
    fromCurrencyfactor: 5,
    toCurrencyfactor: 10
  },
  data: {
    ratesDataProviderCode: MRM,
    ratesDataSource: ECB,
    exchangeRateType: A
  },
  value: S_5,
  fromCurrency: EUR,
  toCurrency: INR,
  validFromDateTime: DATE_2020_02_01
};

export const eurInrMrmIndirectFalseFactorMoreThanOneRate: ExchangeRate = {
  settings: {
    tenantIdentifier: TENANT_ID,
    isIndirect: false,
    fromCurrencyfactor: 5,
    toCurrencyfactor: 10
  },
  data: {
    ratesDataProviderCode: MRM,
    ratesDataSource: ECB,
    exchangeRateType: A
  },
  value: S_5,
  fromCurrency: EUR,
  toCurrency: INR,
  validFromDateTime: DATE_2020_02_01
};

export const usdInrMrmIndirectTrueRate: ExchangeRate = {
  settings: {
    tenantIdentifier: TENANT_ID,
    isIndirect: true,
    fromCurrencyfactor: 1,
    toCurrencyfactor: 1
  },
  data: {
    ratesDataProviderCode: MRM,
    ratesDataSource: ECB,
    exchangeRateType: A
  },
  value: S_10,
  fromCurrency: USD,
  toCurrency: INR,
  validFromDateTime: DATE_2020_01_01
};

export const usdInrMrmIndirectFalseRate: ExchangeRate = {
  settings: setDefaultSettings(TENANT_ID),
  data: {
    ratesDataProviderCode: MRM,
    ratesDataSource: ECB,
    exchangeRateType: A
  },
  value: S_10,
  fromCurrency: USD,
  toCurrency: INR,
  validFromDateTime: DATE_2020_01_01
};

export const usdInrMrmIndirectTrueFactorMoreThanOneRate: ExchangeRate = {
  settings: {
    tenantIdentifier: TENANT_ID,
    isIndirect: true,
    fromCurrencyfactor: 10,
    toCurrencyfactor: 5
  },
  data: {
    ratesDataProviderCode: MRM,
    ratesDataSource: ECB,
    exchangeRateType: A
  },
  value: S_10,
  fromCurrency: USD,
  toCurrency: INR,
  validFromDateTime: DATE_2020_01_01
};

export const usdInrMrmIndirectFalseFactorMoreThanOneRate: ExchangeRate = {
  settings: {
    tenantIdentifier: TENANT_ID,
    isIndirect: false,
    fromCurrencyfactor: 10,
    toCurrencyfactor: 5
  },
  data: {
    ratesDataProviderCode: MRM,
    ratesDataSource: ECB,
    exchangeRateType: A
  },
  value: S_10,
  fromCurrency: USD,
  toCurrency: INR,
  validFromDateTime: DATE_2020_01_01
};

export const usdInrMrmEcbDuplicateDateRate: ExchangeRate = {
  settings: setDefaultSettings(TENANT_ID),
  data: {
    ratesDataProviderCode: MRM,
    ratesDataSource: ECB,
    exchangeRateType: A
  },
  value: S_10,
  fromCurrency: USD,
  toCurrency: INR,
  validFromDateTime: DATE_2020_01_01
};

export const eurInrMrmThrMRate: ExchangeRate = {
  settings: setDefaultSettings(TENANT_ID),
  data: {
    ratesDataProviderCode: MRM,
    ratesDataSource: THR,
    exchangeRateType: M
  },
  value: S_100,
  fromCurrency: EUR,
  toCurrency: INR,
  validFromDateTime: DATE_2019_09_16
};

export const eurInrMrmThrAskIndirectTrueRate: ExchangeRate = {
  settings: {
    tenantIdentifier: TENANT_ID,
    isIndirect: true,
    fromCurrencyfactor: 1,
    toCurrencyfactor: 1
  },
  data: {
    ratesDataProviderCode: MRM,
    ratesDataSource: THR,
    exchangeRateType: ASK
  },
  value: S_100,
  fromCurrency: EUR,
  toCurrency: INR,
  validFromDateTime: DATE_2020_01_01
};

export const eurInrMrmIndirectFalseRateInfiniteDecimal: ExchangeRate = {
  settings: setDefaultSettings(TENANT_ID),
  data: {
    ratesDataProviderCode: MRM,
    ratesDataSource: ECB,
    exchangeRateType: A
  },
  value: S_3,
  fromCurrency: EUR,
  toCurrency: INR,
  validFromDateTime: DATE_2020_02_01
};

export const usdInrMrmIndirectFalseRateInfiniteDecimal: ExchangeRate = {
  settings: setDefaultSettings(TENANT_ID),
  data: {
    ratesDataProviderCode: MRM,
    ratesDataSource: ECB,
    exchangeRateType: A
  },
  value: S_3,
  fromCurrency: USD,
  toCurrency: INR,
  validFromDateTime: DATE_2020_01_01
};

export const eurInrMrmEcbZeroRate: ExchangeRate = {
  settings: setDefaultSettings(TENANT_ID),
  data: {
    ratesDataProviderCode: MRM,
    ratesDataSource: ECB,
    exchangeRateType: A
  },
  value: S_0,
  fromCurrency: EUR,
  toCurrency: INR,
  validFromDateTime: DATE_2020_02_01
};

export const usdInrMrmEcbZeroRate: ExchangeRate = {
  settings: setDefaultSettings(TENANT_ID),
  data: {
    ratesDataProviderCode: MRM,
    ratesDataSource: ECB,
    exchangeRateType: A
  },
  value: S_0,
  fromCurrency: USD,
  toCurrency: INR,
  validFromDateTime: DATE_2020_01_01
};

export const eurInrMrmEcbZeroFactor: ExchangeRate = {
  settings: {
    tenantIdentifier: TENANT_ID,
    isIndirect: false,
    fromCurrencyfactor: 0,
    toCurrencyfactor: 0
  },
  data: {
    ratesDataProviderCode: MRM,
    ratesDataSource: ECB,
    exchangeRateType: A
  },
  value: S_10,
  fromCurrency: EUR,
  toCurrency: INR,
  validFromDateTime: DATE_2020_02_01
};

export const usdInrMrmEcbZeroFactor: ExchangeRate = {
  settings: {
    tenantIdentifier: TENANT_ID,
    isIndirect: false,
    fromCurrencyfactor: 0,
    toCurrencyfactor: 0
  },
  data: {
    ratesDataProviderCode: MRM,
    ratesDataSource: ECB,
    exchangeRateType: A
  },
  value: S_10,
  fromCurrency: USD,
  toCurrency: INR,
  validFromDateTime: DATE_2020_01_01
};

export const eurInrMrmEcbZeroFactorExcRate: ExchangeRate = {
  settings: {
    tenantIdentifier: TENANT_ID,
    isIndirect: false,
    fromCurrencyfactor: 0,
    toCurrencyfactor: 0
  },
  data: {
    ratesDataProviderCode: MRM,
    ratesDataSource: ECB,
    exchangeRateType: A
  },
  value: S_0,
  fromCurrency: EUR,
  toCurrency: INR,
  validFromDateTime: DATE_2020_02_01
};

export const usdInrMrmEcbZeroFactorRate: ExchangeRate = {
  settings: {
    tenantIdentifier: TENANT_ID,
    isIndirect: false,
    fromCurrencyfactor: 0,
    toCurrencyfactor: 0
  },
  data: {
    ratesDataProviderCode: MRM,
    ratesDataSource: ECB,
    exchangeRateType: A
  },
  value: S_0,
  fromCurrency: USD,
  toCurrency: INR,
  validFromDateTime: DATE_2020_01_01
};

export const eurInrMrmEcbScaleMoreThanDefaultRate: ExchangeRate = {
  settings: setDefaultSettings(TENANT_ID),
  data: {
    ratesDataProviderCode: MRM,
    ratesDataSource: ECB,
    exchangeRateType: A
  },
  value: S_7_00000001,
  fromCurrency: EUR,
  toCurrency: INR,
  validFromDateTime: DATE_2020_02_01
};

export const usdInrMrmEcbScaleMoreThanDefaultRate: ExchangeRate = {
  settings: setDefaultSettings(TENANT_ID),
  data: {
    ratesDataProviderCode: MRM,
    ratesDataSource: ECB,
    exchangeRateType: A
  },
  value: S_21_00000001,
  fromCurrency: USD,
  toCurrency: INR,
  validFromDateTime: DATE_2020_01_01
};

export const eurInrMrmEcbScaleMoreThanZeroRate: ExchangeRate = {
  settings: setDefaultSettings(TENANT_ID),
  data: {
    ratesDataProviderCode: MRM,
    ratesDataSource: ECB,
    exchangeRateType: A
  },
  value: S_7_0,
  fromCurrency: EUR,
  toCurrency: INR,
  validFromDateTime: DATE_2020_02_01
};

export const usdInrMrmEcbScaleMoreThanZeroRate: ExchangeRate = {
  settings: setDefaultSettings(TENANT_ID),
  data: {
    ratesDataProviderCode: MRM,
    ratesDataSource: ECB,
    exchangeRateType: A
  },
  value: S_21_0,
  fromCurrency: USD,
  toCurrency: INR,
  validFromDateTime: DATE_2020_01_01
};

export const eurUsdMrmEcbIndirectFalseInvertedTrueRate: ExchangeRate = {
  settings: setDefaultSettings(TENANT_ID),
  data: {
    ratesDataProviderCode: MRM,
    ratesDataSource: ECB,
    exchangeRateType: M
  },
  value: S_100,
  fromCurrency: EUR,
  toCurrency: USD,
  validFromDateTime: DATE_2020_01_01
};

export const usdEurMrmEcbIndirectFalseInvertedTrueRate: ExchangeRate = {
  settings: setDefaultSettings(TENANT_ID),
  data: {
    ratesDataProviderCode: MRM,
    ratesDataSource: ECB,
    exchangeRateType: M
  },
  value: S_100,
  fromCurrency: USD,
  toCurrency: EUR,
  validFromDateTime: DATE_2020_01_01
};

export const inrEurMrmThrMRate: ExchangeRate = {
  settings: setDefaultSettings(TENANT_ID),
  data: {
    ratesDataProviderCode: MRM,
    ratesDataSource: THR,
    exchangeRateType: M
  },
  value: S_100,
  fromCurrency: INR,
  toCurrency: EUR,
  validFromDateTime: DATE_2020_01_01
};

export const eurInrMrmThrAExcRate: ExchangeRate = {
  settings: setDefaultSettings(TENANT_ID),
  data: {
    ratesDataProviderCode: MRM,
    ratesDataSource: THR,
    exchangeRateType: A
  },
  value: S_5,
  fromCurrency: EUR,
  toCurrency: INR,
  validFromDateTime: DATE_2019_09_16
};

export const eurUsdByorEcbIndirectFalseInvertedTrueRate: ExchangeRate = {
  settings: setDefaultSettings(TENANT_ID),
  data: {
    ratesDataProviderCode: 'BYOR',
    ratesDataSource: ECB,
    exchangeRateType: M
  },
  value: S_100,
  fromCurrency: EUR,
  toCurrency: USD,
  validFromDateTime: DATE_2020_01_01
};

export const eurUsdMrmThrIndirectFalseInvertedTrueRate: ExchangeRate = {
  settings: setDefaultSettings(TENANT_ID),
  data: {
    ratesDataProviderCode: MRM,
    ratesDataSource: THR,
    exchangeRateType: M
  },
  value: S_100,
  fromCurrency: EUR,
  toCurrency: USD,
  validFromDateTime: DATE_2020_01_01
};

export const inrEurMrmThrMExcRate: ExchangeRate = {
  settings: setDefaultSettings(TENANT_ID),
  data: {
    ratesDataProviderCode: MRM,
    ratesDataSource: THR,
    exchangeRateType: M
  },
  value: S_100,
  fromCurrency: INR,
  toCurrency: EUR,
  validFromDateTime: DATE_2019_09_16
};

export const inrEurMrmThrMDuplicateRate: ExchangeRate = {
  settings: setDefaultSettings(TENANT_ID),
  data: {
    ratesDataProviderCode: MRM,
    ratesDataSource: THR,
    exchangeRateType: M
  },
  value: S_100,
  fromCurrency: INR,
  toCurrency: EUR,
  validFromDateTime: DATE_2019_09_16
};

export const eurInrMrmThrMExcRate: ExchangeRate = {
  settings: setDefaultSettings(TENANT_ID),
  data: {
    ratesDataProviderCode: MRM,
    ratesDataSource: THR,
    exchangeRateType: M
  },
  value: S_100,
  fromCurrency: EUR,
  toCurrency: INR,
  validFromDateTime: DATE_2020_01_16
};

export const eurInrMrmThrMDuplicateRate: ExchangeRate = {
  settings: setDefaultSettings(TENANT_ID),
  data: {
    ratesDataProviderCode: MRM,
    ratesDataSource: THR,
    exchangeRateType: M
  },
  value: S_100,
  fromCurrency: EUR,
  toCurrency: INR,
  validFromDateTime: DATE_2019_09_16
};

export const eurInrMrmThrAskIndirectFalseRate: ExchangeRate = {
  settings: setDefaultSettings(TENANT_ID),
  data: {
    ratesDataProviderCode: MRM,
    ratesDataSource: THR,
    exchangeRateType: ASK
  },
  value: S_100,
  fromCurrency: EUR,
  toCurrency: INR,
  validFromDateTime: DATE_2020_01_01
};

export const inrEurMrmThrMDiffrentTenantRate: ExchangeRate = {
  settings: setDefaultSettings(TENANT_ID1),
  data: {
    ratesDataProviderCode: MRM,
    ratesDataSource: THR,
    exchangeRateType: M
  },
  value: S_100,
  fromCurrency: INR,
  toCurrency: EUR,
  validFromDateTime: DATE_2019_09_16
};

export const usdInrMrmThrLastRate: ExchangeRate = {
  settings: setDefaultSettings(TENANT_ID),
  data: {
    ratesDataProviderCode: MRM,
    ratesDataSource: THR,
    exchangeRateType: LAST
  },
  value: S_10,
  fromCurrency: USD,
  toCurrency: INR,
  validFromDateTime: DATE_2020_02_01
};

export const eurInrMrmThrLastRate: ExchangeRate = {
  settings: setDefaultSettings(TENANT_ID),
  data: {
    ratesDataProviderCode: MRM,
    ratesDataSource: THR,
    exchangeRateType: LAST
  },
  value: S_10,
  fromCurrency: EUR,
  toCurrency: INR,
  validFromDateTime: DATE_2020_02_01
};

export const eurUsdMrmThrIndirectTrueRate: ExchangeRate = {
  settings: {
    tenantIdentifier: TENANT_ID,
    isIndirect: true,
    fromCurrencyfactor: 1,
    toCurrencyfactor: 1
  },
  data: {
    ratesDataProviderCode: MRM,
    ratesDataSource: THR,
    exchangeRateType: A
  },
  value: S_2,
  fromCurrency: EUR,
  toCurrency: USD,
  validFromDateTime: DATE_2020_01_01
};

export const eurUsdMrmThrIndirectFalseRate: ExchangeRate = {
  settings: setDefaultSettings(TENANT_ID),
  data: {
    ratesDataProviderCode: MRM,
    ratesDataSource: THR,
    exchangeRateType: A
  },
  value: S_2,
  fromCurrency: EUR,
  toCurrency: USD,
  validFromDateTime: DATE_2020_02_01
};

export const eurInrMrmThrARate: ExchangeRate = {
  settings: setDefaultSettings(TENANT_ID),
  data: {
    ratesDataProviderCode: MRM,
    ratesDataSource: THR,
    exchangeRateType: A
  },
  value: S_5,
  fromCurrency: EUR,
  toCurrency: INR,
  validFromDateTime: DATE_2020_02_01
};

export const eurInrMrmThrADateBeforeRate: ExchangeRate = {
  settings: setDefaultSettings(TENANT_ID),
  data: {
    ratesDataProviderCode: MRM,
    ratesDataSource: THR,
    exchangeRateType: A
  },
  value: S_5,
  fromCurrency: EUR,
  toCurrency: INR,
  validFromDateTime: DATE_2019_09_16
};

export const usdInrMrmThrARate: ExchangeRate = {
  settings: setDefaultSettings(TENANT_ID),
  data: {
    ratesDataProviderCode: MRM,
    ratesDataSource: THR,
    exchangeRateType: A
  },
  value: S_10,
  fromCurrency: USD,
  toCurrency: INR,
  validFromDateTime: DATE_2020_01_01
};

export const eurInrMrmThrADuplicateRate: ExchangeRate = {
  settings: setDefaultSettings(TENANT_ID),
  data: {
    ratesDataProviderCode: MRM,
    ratesDataSource: THR,
    exchangeRateType: A
  },
  value: S_5,
  fromCurrency: EUR,
  toCurrency: INR,
  validFromDateTime: DATE_2020_02_01
};

export const usdInrMrmThrADuplicateRate: ExchangeRate = {
  settings: setDefaultSettings(TENANT_ID),
  data: {
    ratesDataProviderCode: MRM,
    ratesDataSource: THR,
    exchangeRateType: A
  },
  value: S_5,
  fromCurrency: USD,
  toCurrency: INR,
  validFromDateTime: DATE_2020_02_01
};

export const eurInrMrmThrIndirectTrueRate: ExchangeRate = {
  settings: {
    tenantIdentifier: TENANT_ID,
    isIndirect: true,
    fromCurrencyfactor: 1,
    toCurrencyfactor: 1
  },
  data: {
    ratesDataProviderCode: MRM,
    ratesDataSource: THR,
    exchangeRateType: A
  },
  value: S_5,
  fromCurrency: EUR,
  toCurrency: INR,
  validFromDateTime: DATE_2020_02_01
};

export const eurInrMrmThrIndirectFalseRate: ExchangeRate = {
  settings: setDefaultSettings(TENANT_ID),
  data: {
    ratesDataProviderCode: MRM,
    ratesDataSource: THR,
    exchangeRateType: A
  },
  value: S_5,
  fromCurrency: EUR,
  toCurrency: INR,
  validFromDateTime: DATE_2020_02_01
};

export const eurInrMrmThrIndirectTrueFactorMoreThanOneRate: ExchangeRate = {
  settings: {
    tenantIdentifier: TENANT_ID,
    isIndirect: true,
    fromCurrencyfactor: 5,
    toCurrencyfactor: 10
  },
  data: {
    ratesDataProviderCode: MRM,
    ratesDataSource: THR,
    exchangeRateType: A
  },
  value: S_5,
  fromCurrency: EUR,
  toCurrency: INR,
  validFromDateTime: DATE_2020_02_01
};

export const eurInrMrmThrIndirectFalseFactorMoreThanOneRate: ExchangeRate = {
  settings: {
    tenantIdentifier: TENANT_ID,
    isIndirect: false,
    fromCurrencyfactor: 5,
    toCurrencyfactor: 10
  },
  data: {
    ratesDataProviderCode: MRM,
    ratesDataSource: THR,
    exchangeRateType: A
  },
  value: S_5,
  fromCurrency: EUR,
  toCurrency: INR,
  validFromDateTime: DATE_2020_02_01
};

export const usdInrMrmThrIndirectTrueRate: ExchangeRate = {
  settings: {
    tenantIdentifier: TENANT_ID,
    isIndirect: true,
    fromCurrencyfactor: 1,
    toCurrencyfactor: 1
  },
  data: {
    ratesDataProviderCode: MRM,
    ratesDataSource: THR,
    exchangeRateType: A
  },
  value: S_10,
  fromCurrency: USD,
  toCurrency: INR,
  validFromDateTime: DATE_2020_01_01
};

export const usdInrMrmThrIndirectFalseRate: ExchangeRate = {
  settings: setDefaultSettings(TENANT_ID),
  data: {
    ratesDataProviderCode: MRM,
    ratesDataSource: THR,
    exchangeRateType: A
  },
  value: S_10,
  fromCurrency: USD,
  toCurrency: INR,
  validFromDateTime: DATE_2020_01_01
};

export const usdInrMrmThrIndirectTrueFactorMoreThanOneRate: ExchangeRate = {
  settings: {
    tenantIdentifier: TENANT_ID,
    isIndirect: true,
    fromCurrencyfactor: 10,
    toCurrencyfactor: 5
  },
  data: {
    ratesDataProviderCode: MRM,
    ratesDataSource: THR,
    exchangeRateType: A
  },
  value: S_10,
  fromCurrency: USD,
  toCurrency: INR,
  validFromDateTime: DATE_2020_01_01
};

export const usdInrMrmThrIndirectFalseFactorMoreThanOneRate: ExchangeRate = {
  settings: {
    tenantIdentifier: TENANT_ID,
    isIndirect: false,
    fromCurrencyfactor: 10,
    toCurrencyfactor: 5
  },
  data: {
    ratesDataProviderCode: MRM,
    ratesDataSource: THR,
    exchangeRateType: A
  },
  value: S_10,
  fromCurrency: USD,
  toCurrency: INR,
  validFromDateTime: DATE_2020_01_01
};

export const usdInrMrmThrDuplicateDateRate: ExchangeRate = {
  settings: setDefaultSettings(TENANT_ID),
  data: {
    ratesDataProviderCode: MRM,
    ratesDataSource: THR,
    exchangeRateType: A
  },
  value: S_10,
  fromCurrency: USD,
  toCurrency: INR,
  validFromDateTime: DATE_2020_01_01
};

export const eurInrMrmThrZeroRate: ExchangeRate = {
  settings: setDefaultSettings(TENANT_ID),
  data: {
    ratesDataProviderCode: MRM,
    ratesDataSource: THR,
    exchangeRateType: A
  },
  value: S_0,
  fromCurrency: EUR,
  toCurrency: INR,
  validFromDateTime: DATE_2020_02_01
};

export const usdInrMrmThrZeroRate: ExchangeRate = {
  settings: setDefaultSettings(TENANT_ID),
  data: {
    ratesDataProviderCode: MRM,
    ratesDataSource: THR,
    exchangeRateType: A
  },
  value: S_0,
  fromCurrency: USD,
  toCurrency: INR,
  validFromDateTime: DATE_2020_01_01
};

export const eurInrMrmThrZeroFactor: ExchangeRate = {
  settings: {
    tenantIdentifier: TENANT_ID,
    isIndirect: false,
    fromCurrencyfactor: 0,
    toCurrencyfactor: 0
  },
  data: {
    ratesDataProviderCode: MRM,
    ratesDataSource: THR,
    exchangeRateType: A
  },
  value: S_10,
  fromCurrency: EUR,
  toCurrency: INR,
  validFromDateTime: DATE_2020_02_01
};

export const usdInrMrmThrZeroFactor: ExchangeRate = {
  settings: {
    tenantIdentifier: TENANT_ID,
    isIndirect: false,
    fromCurrencyfactor: 0,
    toCurrencyfactor: 0
  },
  data: {
    ratesDataProviderCode: MRM,
    ratesDataSource: THR,
    exchangeRateType: A
  },
  value: S_10,
  fromCurrency: USD,
  toCurrency: INR,
  validFromDateTime: DATE_2020_01_01
};

export const eurInrMrmThrZeroFactorRate: ExchangeRate = {
  settings: {
    tenantIdentifier: TENANT_ID,
    isIndirect: false,
    fromCurrencyfactor: 0,
    toCurrencyfactor: 0
  },
  data: {
    ratesDataProviderCode: MRM,
    ratesDataSource: THR,
    exchangeRateType: A
  },
  value: S_0,
  fromCurrency: EUR,
  toCurrency: INR,
  validFromDateTime: DATE_2020_02_01
};

export const usdInrMrmThrZeroFactorRate: ExchangeRate = {
  settings: {
    tenantIdentifier: TENANT_ID,
    isIndirect: false,
    fromCurrencyfactor: 0,
    toCurrencyfactor: 0
  },
  data: {
    ratesDataProviderCode: MRM,
    ratesDataSource: THR,
    exchangeRateType: A
  },
  value: S_0,
  fromCurrency: USD,
  toCurrency: INR,
  validFromDateTime: DATE_2020_01_01
};

export const eurUsdMrmThrMRate: ExchangeRate = {
  settings: setDefaultSettings(TENANT_ID),
  data: {
    ratesDataProviderCode: MRM,
    ratesDataSource: ECB,
    exchangeRateType: M
  },
  value: S_100,
  fromCurrency: EUR,
  toCurrency: USD,
  validFromDateTime: DATE_2020_01_01
};

export const usdEurMrmThrMRate: ExchangeRate = {
  settings: setDefaultSettings(TENANT_ID),
  data: {
    ratesDataProviderCode: MRM,
    ratesDataSource: ECB,
    exchangeRateType: M
  },
  value: S_100,
  fromCurrency: USD,
  toCurrency: EUR,
  validFromDateTime: DATE_2020_01_01
};

export const eurInrMrmThrIndirectFalseRateInfiniteDecimal: ExchangeRate = {
  settings: setDefaultSettings(TENANT_ID),
  data: {
    ratesDataProviderCode: MRM,
    ratesDataSource: THR,
    exchangeRateType: A
  },
  value: S_3,
  fromCurrency: EUR,
  toCurrency: INR,
  validFromDateTime: DATE_2020_02_01
};

export const usdInrMrmThrIndirectFalseRateInfiniteDecimal: ExchangeRate = {
  settings: setDefaultSettings(TENANT_ID),
  data: {
    ratesDataProviderCode: MRM,
    ratesDataSource: THR,
    exchangeRateType: A
  },
  value: S_3,
  fromCurrency: USD,
  toCurrency: INR,
  validFromDateTime: DATE_2020_01_01
};

export const eurInrMrmEcbIndirectTrueExcRate: ExchangeRate = {
  settings: {
    tenantIdentifier: TENANT_ID,
    isIndirect: true,
    fromCurrencyfactor: 1,
    toCurrencyfactor: 1
  },
  data: {
    ratesDataProviderCode: MRM,
    ratesDataSource: ECB,
    exchangeRateType: M
  },
  value: S_100,
  fromCurrency: EUR,
  toCurrency: INR,
  validFromDateTime: DATE_2020_01_16
};

export const eurInrMrmEcbIndirectFalseExcRate: ExchangeRate = {
  settings: setDefaultSettings(TENANT_ID),
  data: {
    ratesDataProviderCode: MRM,
    ratesDataSource: ECB,
    exchangeRateType: M
  },
  value: S_100,
  fromCurrency: EUR,
  toCurrency: INR,
  validFromDateTime: DATE_2020_01_16
};

export const eurInrMrmEcbIndirectTrueFactorMoreThanOneRate: ExchangeRate = {
  settings: {
    tenantIdentifier: TENANT_ID,
    isIndirect: true,
    fromCurrencyfactor: 5,
    toCurrencyfactor: 10
  },
  data: {
    ratesDataProviderCode: MRM,
    ratesDataSource: ECB,
    exchangeRateType: A
  },
  value: S_5,
  fromCurrency: EUR,
  toCurrency: INR,
  validFromDateTime: DATE_2020_02_01
};

export const eurInrMrmEcbIndirectFalseFactorMoreThanOneRate: ExchangeRate = {
  settings: {
    tenantIdentifier: TENANT_ID,
    isIndirect: false,
    fromCurrencyfactor: 5,
    toCurrencyfactor: 10
  },
  data: {
    ratesDataProviderCode: MRM,
    ratesDataSource: ECB,
    exchangeRateType: A
  },
  value: S_5,
  fromCurrency: EUR,
  toCurrency: INR,
  validFromDateTime: DATE_2020_02_01
};

export const usdInrMrmEcbIndirectTrueRate: ExchangeRate = {
  settings: {
    tenantIdentifier: TENANT_ID,
    isIndirect: true,
    fromCurrencyfactor: 1,
    toCurrencyfactor: 1
  },
  data: {
    ratesDataProviderCode: MRM,
    ratesDataSource: ECB,
    exchangeRateType: A
  },
  value: S_10,
  fromCurrency: USD,
  toCurrency: INR,
  validFromDateTime: DATE_2020_01_01
};

export const usdInrMrmEcbIndirectFalseRate: ExchangeRate = {
  settings: setDefaultSettings(TENANT_ID),
  data: {
    ratesDataProviderCode: MRM,
    ratesDataSource: ECB,
    exchangeRateType: A
  },
  value: S_10,
  fromCurrency: USD,
  toCurrency: INR,
  validFromDateTime: DATE_2020_01_01
};

export const usdInrMrmEcbIndirectTrueFactorMoreThanOneRate: ExchangeRate = {
  settings: {
    tenantIdentifier: TENANT_ID,
    isIndirect: true,
    fromCurrencyfactor: 10,
    toCurrencyfactor: 5
  },
  data: {
    ratesDataProviderCode: MRM,
    ratesDataSource: ECB,
    exchangeRateType: A
  },
  value: S_10,
  fromCurrency: USD,
  toCurrency: INR,
  validFromDateTime: DATE_2020_01_01
};

export const usdInrMrmEcbIndirectFalseFactorMoreThanOneRate: ExchangeRate = {
  settings: {
    tenantIdentifier: TENANT_ID,
    isIndirect: false,
    fromCurrencyfactor: 10,
    toCurrencyfactor: 5
  },
  data: {
    ratesDataProviderCode: MRM,
    ratesDataSource: ECB,
    exchangeRateType: A
  },
  value: S_10,
  fromCurrency: USD,
  toCurrency: INR,
  validFromDateTime: DATE_2020_01_01
};

export const usdInrMrmEcbDuplicateDateExcRate: ExchangeRate = {
  settings: setDefaultSettings(TENANT_ID),
  data: {
    ratesDataProviderCode: MRM,
    ratesDataSource: ECB,
    exchangeRateType: A
  },
  value: S_10,
  fromCurrency: EUR,
  toCurrency: INR,
  validFromDateTime: DATE_2020_01_01
};

export const eurInrMrmEcbIndirectFalseRateInfiniteDecimal: ExchangeRate = {
  settings: setDefaultSettings(TENANT_ID),
  data: {
    ratesDataProviderCode: MRM,
    ratesDataSource: ECB,
    exchangeRateType: A
  },
  value: S_3,
  fromCurrency: EUR,
  toCurrency: INR,
  validFromDateTime: DATE_2020_02_01
};

export const usdInrMrmEcbIndirectFalseRateInfiniteDecimal: ExchangeRate = {
  settings: setDefaultSettings(TENANT_ID),
  data: {
    ratesDataProviderCode: MRM,
    ratesDataSource: ECB,
    exchangeRateType: A
  },
  value: S_3,
  fromCurrency: USD,
  toCurrency: INR,
  validFromDateTime: DATE_2020_01_01
};

export const eurInrMrmEcbZeroFactorRate: ExchangeRate = {
  settings: {
    tenantIdentifier: TENANT_ID,
    isIndirect: false,
    fromCurrencyfactor: 0,
    toCurrencyfactor: 0
  },
  data: {
    ratesDataProviderCode: MRM,
    ratesDataSource: ECB,
    exchangeRateType: A
  },
  value: S_0,
  fromCurrency: EUR,
  toCurrency: INR,
  validFromDateTime: DATE_2020_01_01
};

export const eurInrMrmThrScaleMoreThanZeroRate: ExchangeRate = {
  settings: setDefaultSettings(TENANT_ID),
  data: {
    ratesDataProviderCode: MRM,
    ratesDataSource: THR,
    exchangeRateType: A
  },
  value: S_7_0,
  fromCurrency: EUR,
  toCurrency: INR,
  validFromDateTime: DATE_2020_02_01
};

export const usdInrMrmThrScaleMoreThanZeroRate: ExchangeRate = {
  settings: setDefaultSettings(TENANT_ID),
  data: {
    ratesDataProviderCode: MRM,
    ratesDataSource: THR,
    exchangeRateType: A
  },
  value: S_21_0,
  fromCurrency: USD,
  toCurrency: INR,
  validFromDateTime: DATE_2020_01_01
};

export const eurInrMrmThrScaleMoreThanDefaultRate: ExchangeRate = {
  settings: setDefaultSettings(TENANT_ID),
  data: {
    ratesDataProviderCode: MRM,
    ratesDataSource: THR,
    exchangeRateType: A
  },
  value: S_7_00000001,
  fromCurrency: EUR,
  toCurrency: INR,
  validFromDateTime: DATE_2020_02_01
};

export const usdInrMrmThrScaleMoreThanDefaultRate: ExchangeRate = {
  settings: setDefaultSettings(TENANT_ID),
  data: {
    ratesDataProviderCode: MRM,
    ratesDataSource: THR,
    exchangeRateType: A
  },
  value: S_21_00000001,
  fromCurrency: USD,
  toCurrency: INR,
  validFromDateTime: DATE_2020_01_01
};

export const eurInrMrmEcbDirectConversionDecimal: ExchangeRate = {
  settings: setDefaultSettings(TENANT_ID),
  data: {
    ratesDataProviderCode: MRM,
    ratesDataSource: ECB,
    exchangeRateType: B
  },
  value: S_123_123,
  fromCurrency: EUR,
  toCurrency: INR,
  validFromDateTime: DATE_2020_01_01
};

export const eurInrMrmEcbIndirectConversionExcRate: ExchangeRate = {
  settings: {
    tenantIdentifier: TENANT_ID,
    isIndirect: true,
    fromCurrencyfactor: 1,
    toCurrencyfactor: 1
  },
  data: {
    ratesDataProviderCode: MRM,
    ratesDataSource: ECB,
    exchangeRateType: B
  },
  value: S_100,
  fromCurrency: EUR,
  toCurrency: INR,
  validFromDateTime: DATE_2020_01_01
};

export const eurUsdMrmEcbAskRate: ExchangeRate = {
  settings: setDefaultSettings(TENANT_ID),
  data: {
    ratesDataProviderCode: MRM,
    ratesDataSource: ECB,
    exchangeRateType: ASK
  },
  value: S_100,
  fromCurrency: EUR,
  toCurrency: USD,
  validFromDateTime: DATE_2020_01_01
};

export const usdBhdMrmEcbMRate: ExchangeRate = {
  settings: setDefaultSettings(TENANT_ID),
  data: {
    ratesDataProviderCode: MRM,
    ratesDataSource: ECB,
    exchangeRateType: M
  },
  value: S_100,
  fromCurrency: USD,
  toCurrency: BHD,
  validFromDateTime: DATE_2020_01_01
};

export const usdClfMrmEcbMRate: ExchangeRate = {
  settings: setDefaultSettings(TENANT_ID),
  data: {
    ratesDataProviderCode: MRM,
    ratesDataSource: ECB,
    exchangeRateType: M
  },
  value: S_100,
  fromCurrency: USD,
  toCurrency: CLF,
  validFromDateTime: DATE_2020_01_01
};

export const inrBhdMrmEcbMRate: ExchangeRate = {
  settings: setDefaultSettings(TENANT_ID),
  data: {
    ratesDataProviderCode: MRM,
    ratesDataSource: ECB,
    exchangeRateType: M
  },
  value: S_0_300623,
  fromCurrency: INR,
  toCurrency: BHD,
  validFromDateTime: DATE_2020_01_01
};

export const inrEurMrmEcbMDuplicateRate: ExchangeRate = {
  settings: {
    tenantIdentifier: TENANT_ID,
    isIndirect: false,
    fromCurrencyfactor: 10,
    toCurrencyfactor: 5
  },
  data: {
    ratesDataProviderCode: MRM,
    ratesDataSource: ECB,
    exchangeRateType: M
  },
  value: S_100,
  fromCurrency: INR,
  toCurrency: EUR,
  validFromDateTime: DATE_2019_09_16
};

export const eurInrMrmEcbMDuplicateRate: ExchangeRate = {
  settings: {
    tenantIdentifier: TENANT_ID,
    isIndirect: false,
    fromCurrencyfactor: 10,
    toCurrencyfactor: 5
  },
  data: {
    ratesDataProviderCode: MRM,
    ratesDataSource: ECB,
    exchangeRateType: M
  },
  value: S_100,
  fromCurrency: EUR,
  toCurrency: INR,
  validFromDateTime: DATE_2019_09_16
};

export const eurUsdMrmThrAskRate: ExchangeRate = {
  settings: setDefaultSettings(TENANT_ID),
  data: {
    ratesDataProviderCode: MRM,
    ratesDataSource: THR,
    exchangeRateType: ASK
  },
  value: S_100,
  fromCurrency: EUR,
  toCurrency: USD,
  validFromDateTime: DATE_2020_01_01
};

export const inrBhdMrmThrMRate: ExchangeRate = {
  settings: setDefaultSettings(TENANT_ID),
  data: {
    ratesDataProviderCode: MRM,
    ratesDataSource: THR,
    exchangeRateType: M
  },
  value: S_0_300623,
  fromCurrency: INR,
  toCurrency: BHD,
  validFromDateTime: DATE_2020_01_01
};

export const eurInrMrmThrIndirectConversionRate: ExchangeRate = {
  settings: {
    tenantIdentifier: TENANT_ID,
    isIndirect: true,
    fromCurrencyfactor: 1,
    toCurrencyfactor: 1
  },
  data: {
    ratesDataProviderCode: MRM,
    ratesDataSource: THR,
    exchangeRateType: B
  },
  value: S_100,
  fromCurrency: EUR,
  toCurrency: INR,
  validFromDateTime: DATE_2020_01_01
};

export const eurInrMrmThrIndirectConversionDecimalRate: ExchangeRate = {
  settings: {
    tenantIdentifier: TENANT_ID,
    isIndirect: true,
    fromCurrencyfactor: 1,
    toCurrencyfactor: 1
  },
  data: {
    ratesDataProviderCode: MRM,
    ratesDataSource: THR,
    exchangeRateType: B
  },
  value: S_123_123,
  fromCurrency: EUR,
  toCurrency: INR,
  validFromDateTime: DATE_2020_01_01
};

export const eurInrMrmThrDirectConversionDecimal: ExchangeRate = {
  settings: setDefaultSettings(TENANT_ID),
  data: {
    ratesDataProviderCode: MRM,
    ratesDataSource: THR,
    exchangeRateType: B
  },
  value: S_123_123,
  fromCurrency: EUR,
  toCurrency: INR,
  validFromDateTime: DATE_2020_01_01
};

export const inrEurMrmThrMIndirectFactorFiveTenRate: ExchangeRate = {
  settings: {
    tenantIdentifier: TENANT_ID,
    isIndirect: true,
    fromCurrencyfactor: 5,
    toCurrencyfactor: 10
  },
  data: {
    ratesDataProviderCode: MRM,
    ratesDataSource: THR,
    exchangeRateType: M
  },
  value: S_100,
  fromCurrency: INR,
  toCurrency: EUR,
  validFromDateTime: DATE_2019_09_16
};

export const inrEurMrmThrMIndirectFactorMoreThanOneRate: ExchangeRate = {
  settings: {
    tenantIdentifier: TENANT_ID,
    isIndirect: true,
    fromCurrencyfactor: 10,
    toCurrencyfactor: 5
  },
  data: {
    ratesDataProviderCode: MRM,
    ratesDataSource: THR,
    exchangeRateType: M
  },
  value: S_100,
  fromCurrency: INR,
  toCurrency: EUR,
  validFromDateTime: DATE_2019_09_16
};

export const inrEurMrmThrMDirectFactorMoreThanOneRate: ExchangeRate = {
  settings: {
    tenantIdentifier: TENANT_ID,
    isIndirect: false,
    fromCurrencyfactor: 10,
    toCurrencyfactor: 5
  },
  data: {
    ratesDataProviderCode: MRM,
    ratesDataSource: THR,
    exchangeRateType: M
  },
  value: S_100,
  fromCurrency: INR,
  toCurrency: EUR,
  validFromDateTime: DATE_2019_09_16
};

export const eurEurMrmThrMRate: ExchangeRate = {
  settings: setDefaultSettings(TENANT_ID),
  data: {
    ratesDataProviderCode: null as any,
    ratesDataSource: null as any,
    exchangeRateType: B
  },
  value: S_1,
  fromCurrency: EUR,
  toCurrency: EUR,
  validFromDateTime: DATE_2020_01_01
};

export const inrInrMrmThrMRate: ExchangeRate = {
  settings: setDefaultSettings(TENANT_ID),
  data: {
    ratesDataProviderCode: null as any,
    ratesDataSource: null as any,
    exchangeRateType: B
  },
  value: S_1,
  fromCurrency: INR,
  toCurrency: INR,
  validFromDateTime: DATE_2020_01_01
};

export const eurInrMrmEcbIndirectConversionDecimalRate: ExchangeRate = {
  settings: {
    tenantIdentifier: TENANT_ID,
    isIndirect: true,
    fromCurrencyfactor: 1,
    toCurrencyfactor: 1
  },
  data: {
    ratesDataProviderCode: MRM,
    ratesDataSource: ECB,
    exchangeRateType: B
  },
  value: S_123_123,
  fromCurrency: EUR,
  toCurrency: INR,
  validFromDateTime: DATE_2020_01_01
};

export const usdEurMrmEcbMExcRate: ExchangeRate = {
  settings: {
    tenantIdentifier: TENANT_ID,
    isIndirect: true,
    fromCurrencyfactor: 1,
    toCurrencyfactor: 1
  },
  data: {
    ratesDataProviderCode: MRM,
    ratesDataSource: ECB,
    exchangeRateType: M
  },
  value: S_100,
  fromCurrency: USD,
  toCurrency: EUR,
  validFromDateTime: DATE_2019_09_16
};

export const eurEurMrmEcbMRate: ExchangeRate = {
  settings: setDefaultSettings(TENANT_ID),
  data: {
    ratesDataProviderCode: null as any,
    ratesDataSource: null as any,
    exchangeRateType: B
  },
  value: S_1,
  fromCurrency: EUR,
  toCurrency: EUR,
  validFromDateTime: DATE_2020_01_01
};

export const inrInrMrmEcbMRate: ExchangeRate = {
  settings: setDefaultSettings(TENANT_ID),
  data: {
    ratesDataProviderCode: null as any,
    ratesDataSource: null as any,
    exchangeRateType: B
  },
  value: S_1,
  fromCurrency: INR,
  toCurrency: INR,
  validFromDateTime: DATE_2020_01_01
};

export const inrEurMrmEcbMIndirectFactorFiveTenRate: ExchangeRate = {
  settings: {
    tenantIdentifier: TENANT_ID,
    isIndirect: true,
    fromCurrencyfactor: 5,
    toCurrencyfactor: 10
  },
  data: {
    ratesDataProviderCode: MRM,
    ratesDataSource: ECB,
    exchangeRateType: M
  },
  value: S_100,
  fromCurrency: INR,
  toCurrency: EUR,
  validFromDateTime: DATE_2019_09_16
};

export const inrEurMrmEcbMIndirectFactorMoreThanOneRate: ExchangeRate = {
  settings: {
    tenantIdentifier: TENANT_ID,
    isIndirect: true,
    fromCurrencyfactor: 10,
    toCurrencyfactor: 5
  },
  data: {
    ratesDataProviderCode: MRM,
    ratesDataSource: ECB,
    exchangeRateType: M
  },
  value: S_100,
  fromCurrency: INR,
  toCurrency: EUR,
  validFromDateTime: DATE_2019_09_16
};

export const inrEurMrmEcbMDirectFactorFiveTenRate: ExchangeRate = {
  settings: {
    tenantIdentifier: TENANT_ID,
    isIndirect: false,
    fromCurrencyfactor: 5,
    toCurrencyfactor: 10
  },
  data: {
    ratesDataProviderCode: MRM,
    ratesDataSource: ECB,
    exchangeRateType: M
  },
  value: S_100,
  fromCurrency: INR,
  toCurrency: EUR,
  validFromDateTime: DATE_2019_09_16
};

export const inrEurMrmEcbMDirectFactorMoreThanOneRate: ExchangeRate = {
  settings: {
    tenantIdentifier: TENANT_ID,
    isIndirect: false,
    fromCurrencyfactor: 10,
    toCurrencyfactor: 5
  },
  data: {
    ratesDataProviderCode: MRM,
    ratesDataSource: ECB,
    exchangeRateType: M
  },
  value: S_100,
  fromCurrency: INR,
  toCurrency: EUR,
  validFromDateTime: DATE_2019_09_16
};

export const usdEurMrmEcbIndirectTrueInvertedTrueExcRate: ExchangeRate = {
  settings: {
    tenantIdentifier: TENANT_ID,
    isIndirect: true,
    fromCurrencyfactor: 1,
    toCurrencyfactor: 1
  },
  data: {
    ratesDataProviderCode: MRM,
    ratesDataSource: ECB,
    exchangeRateType: M
  },
  value: S_100,
  fromCurrency: USD,
  toCurrency: EUR,
  validFromDateTime: DATE_2020_01_01
};

export const usdEurMrmEcbIndirectTrueInvertedFalseExcRate: ExchangeRate = {
  settings: {
    tenantIdentifier: TENANT_ID,
    isIndirect: true,
    fromCurrencyfactor: 1,
    toCurrencyfactor: 1
  },
  data: {
    ratesDataProviderCode: MRM,
    ratesDataSource: ECB,
    exchangeRateType: B
  },
  value: S_100,
  fromCurrency: USD,
  toCurrency: EUR,
  validFromDateTime: DATE_2020_01_01
};

export const usdEurMrmEcbIndirectFalseInvertedFalseExcRate: ExchangeRate = {
  settings: setDefaultSettings(TENANT_ID),
  data: {
    ratesDataProviderCode: MRM,
    ratesDataSource: ECB,
    exchangeRateType: B
  },
  value: S_100,
  fromCurrency: USD,
  toCurrency: EUR,
  validFromDateTime: DATE_2020_01_01
};

export const usdEurMrmEcbIndirectTrueInvertedTrueFactorMoreThanOneExcRate: ExchangeRate = {
  settings: {
    tenantIdentifier: TENANT_ID,
    isIndirect: true,
    fromCurrencyfactor: 1,
    toCurrencyfactor: 10
  },
  data: {
    ratesDataProviderCode: MRM,
    ratesDataSource: ECB,
    exchangeRateType: M
  },
  value: S_20,
  fromCurrency: USD,
  toCurrency: EUR,
  validFromDateTime: DATE_2020_01_01
};

export const usdEurMrmEcbIndirectTrueInvertedFalseFactorMoreThanOneExcRate: ExchangeRate = {
  settings: {
    tenantIdentifier: TENANT_ID,
    isIndirect: true,
    fromCurrencyfactor: 1,
    toCurrencyfactor: 10
  },
  data: {
    ratesDataProviderCode: MRM,
    ratesDataSource: ECB,
    exchangeRateType: B
  },
  value: S_20,
  fromCurrency: USD,
  toCurrency: EUR,
  validFromDateTime: DATE_2020_01_01
};

export const usdEurMrmEcbIndirectFalseInvertedTrueFactorMoreThanOneRate: ExchangeRate = {
  settings: {
    tenantIdentifier: TENANT_ID,
    isIndirect: false,
    fromCurrencyfactor: 1,
    toCurrencyfactor: 10
  },
  data: {
    ratesDataProviderCode: MRM,
    ratesDataSource: ECB,
    exchangeRateType: M
  },
  value: S_20,
  fromCurrency: USD,
  toCurrency: EUR,
  validFromDateTime: DATE_2020_01_01
};

export const usdEurMrmEcbIndirectFalseInvertedFalseFactorMoreThanOneRate: ExchangeRate = {
  settings: {
    tenantIdentifier: TENANT_ID,
    isIndirect: false,
    fromCurrencyfactor: 1,
    toCurrencyfactor: 10
  },
  data: {
    ratesDataProviderCode: MRM,
    ratesDataSource: ECB,
    exchangeRateType: B
  },
  value: S_20,
  fromCurrency: USD,
  toCurrency: EUR,
  validFromDateTime: DATE_2020_01_01
};

export const eurUsdMrmEcbIndirectTrueInvertedTrueRate: ExchangeRate = {
  settings: {
    tenantIdentifier: TENANT_ID,
    isIndirect: true,
    fromCurrencyfactor: 1,
    toCurrencyfactor: 1
  },
  data: {
    ratesDataProviderCode: MRM,
    ratesDataSource: ECB,
    exchangeRateType: M
  },
  value: S_100,
  fromCurrency: EUR,
  toCurrency: USD,
  validFromDateTime: DATE_2020_01_01
};

export const eurUsdMrmEcbIndirectTrueInvertedFalseRate: ExchangeRate = {
  settings: {
    tenantIdentifier: TENANT_ID,
    isIndirect: true,
    fromCurrencyfactor: 1,
    toCurrencyfactor: 1
  },
  data: {
    ratesDataProviderCode: MRM,
    ratesDataSource: ECB,
    exchangeRateType: B
  },
  value: S_100,
  fromCurrency: EUR,
  toCurrency: USD,
  validFromDateTime: DATE_2020_01_01
};

export const eurUsdMrmEcbIndirectFalseInvertedFalseRate: ExchangeRate = {
  settings: setDefaultSettings(TENANT_ID),
  data: {
    ratesDataProviderCode: MRM,
    ratesDataSource: ECB,
    exchangeRateType: B
  },
  value: S_100,
  fromCurrency: EUR,
  toCurrency: USD,
  validFromDateTime: DATE_2020_01_01
};

export const eurUsdMrmEcbIndirectTrueInvertedTrueFactorMoreThanOneRate: ExchangeRate = {
  settings: {
    tenantIdentifier: TENANT_ID,
    isIndirect: true,
    fromCurrencyfactor: 10,
    toCurrencyfactor: 100
  },
  data: {
    ratesDataProviderCode: MRM,
    ratesDataSource: ECB,
    exchangeRateType: M
  },
  value: S_30,
  fromCurrency: EUR,
  toCurrency: USD,
  validFromDateTime: DATE_2020_01_01
};

export const eurUsdMrmEcbIndirectTrueInvertedFalseFactorMoreThanOneRate: ExchangeRate = {
  settings: {
    tenantIdentifier: TENANT_ID,
    isIndirect: true,
    fromCurrencyfactor: 10,
    toCurrencyfactor: 100
  },
  data: {
    ratesDataProviderCode: MRM,
    ratesDataSource: ECB,
    exchangeRateType: B
  },
  value: S_30,
  fromCurrency: EUR,
  toCurrency: USD,
  validFromDateTime: DATE_2020_01_01
};

export const eurUsdMrmEcbIndirectFalseInvertedTrueFactorMoreThanOneRate: ExchangeRate = {
  settings: {
    tenantIdentifier: TENANT_ID,
    isIndirect: false,
    fromCurrencyfactor: 10,
    toCurrencyfactor: 100
  },
  data: {
    ratesDataProviderCode: MRM,
    ratesDataSource: ECB,
    exchangeRateType: M
  },
  value: S_30,
  fromCurrency: EUR,
  toCurrency: USD,
  validFromDateTime: DATE_2020_01_01
};

export const eurUsdMrmEcbIndirectFalseInvertedFalseFactorMoreThanOneRate: ExchangeRate = {
  settings: {
    tenantIdentifier: TENANT_ID,
    isIndirect: false,
    fromCurrencyfactor: 10,
    toCurrencyfactor: 100
  },
  data: {
    ratesDataProviderCode: MRM,
    ratesDataSource: ECB,
    exchangeRateType: B
  },
  value: S_30,
  fromCurrency: EUR,
  toCurrency: USD,
  validFromDateTime: DATE_2020_01_01
};

export const eurUsdMrmEcbNewRateType = {
  settings: setDefaultSettings(TENANT_ID),
  data: {
    ratesDataProviderCode: MRM,
    ratesDataSource: ECB,
    exchangeRateType: 'ABC'
  },
  value: S_100,
  fromCurrency: USD,
  toCurrency: EUR,
  validFromDateTime: DATE_2020_01_01
};

export const usdEurMrmThrIndirectTrueInvertedTrueRate: ExchangeRate = {
  settings: {
    tenantIdentifier: TENANT_ID,
    isIndirect: true,
    fromCurrencyfactor: 1,
    toCurrencyfactor: 1
  },
  data: {
    ratesDataProviderCode: MRM,
    ratesDataSource: THR,
    exchangeRateType: M
  },
  value: S_100,
  fromCurrency: USD,
  toCurrency: EUR,
  validFromDateTime: DATE_2020_01_01
};

export const usdEurMrmThrIndirectTrueInvertedFalseRate: ExchangeRate = {
  settings: {
    tenantIdentifier: TENANT_ID,
    isIndirect: true,
    fromCurrencyfactor: 1,
    toCurrencyfactor: 1
  },
  data: {
    ratesDataProviderCode: MRM,
    ratesDataSource: THR,
    exchangeRateType: B
  },
  value: S_100,
  fromCurrency: USD,
  toCurrency: EUR,
  validFromDateTime: DATE_2020_01_01
};

export const usdEurMrmThrIndirectFalseInvertedTrueRate: ExchangeRate = {
  settings: setDefaultSettings(TENANT_ID),
  data: {
    ratesDataProviderCode: MRM,
    ratesDataSource: THR,
    exchangeRateType: M
  },
  value: S_100,
  fromCurrency: USD,
  toCurrency: EUR,
  validFromDateTime: DATE_2020_01_01
};

export const usdEurMrmThrIndirectFalseInvertedFalseRate: ExchangeRate = {
  settings: setDefaultSettings(TENANT_ID),
  data: {
    ratesDataProviderCode: MRM,
    ratesDataSource: THR,
    exchangeRateType: B
  },
  value: S_100,
  fromCurrency: USD,
  toCurrency: EUR,
  validFromDateTime: DATE_2020_01_01
};

export const usdEurMrmThrIndirectTrueInvertedTrueFactorMoreThanOneRate: ExchangeRate = {
  settings: {
    tenantIdentifier: TENANT_ID,
    isIndirect: true,
    fromCurrencyfactor: 1,
    toCurrencyfactor: 10
  },
  data: {
    ratesDataProviderCode: MRM,
    ratesDataSource: THR,
    exchangeRateType: M
  },
  value: S_20,
  fromCurrency: USD,
  toCurrency: EUR,
  validFromDateTime: DATE_2020_01_01
};

export const usdEurMrmThrIndirectTrueInvertedFalseFactorMoreThanOneRate: ExchangeRate = {
  settings: {
    tenantIdentifier: TENANT_ID,
    isIndirect: true,
    fromCurrencyfactor: 1,
    toCurrencyfactor: 10
  },
  data: {
    ratesDataProviderCode: MRM,
    ratesDataSource: THR,
    exchangeRateType: B
  },
  value: S_20,
  fromCurrency: USD,
  toCurrency: EUR,
  validFromDateTime: DATE_2020_01_01
};

export const usdEurMrmThrIndirectFalseInvertedTrueFactorMoreThanOneRate: ExchangeRate = {
  settings: {
    tenantIdentifier: TENANT_ID,
    isIndirect: false,
    fromCurrencyfactor: 1,
    toCurrencyfactor: 10
  },
  data: {
    ratesDataProviderCode: MRM,
    ratesDataSource: THR,
    exchangeRateType: M
  },
  value: S_20,
  fromCurrency: USD,
  toCurrency: EUR,
  validFromDateTime: DATE_2020_01_01
};

export const usdEurMrmThrIndirectFalseInvertedFalseFactorMoreThanOneRate: ExchangeRate = {
  settings: {
    tenantIdentifier: TENANT_ID,
    isIndirect: false,
    fromCurrencyfactor: 1,
    toCurrencyfactor: 10
  },
  data: {
    ratesDataProviderCode: MRM,
    ratesDataSource: THR,
    exchangeRateType: B
  },
  value: S_20,
  fromCurrency: USD,
  toCurrency: EUR,
  validFromDateTime: DATE_2020_01_01
};

export const eurUsdMrmThrIndirectTrueInvertedTrueRate: ExchangeRate = {
  settings: {
    tenantIdentifier: TENANT_ID,
    isIndirect: true,
    fromCurrencyfactor: 1,
    toCurrencyfactor: 1
  },
  data: {
    ratesDataProviderCode: MRM,
    ratesDataSource: THR,
    exchangeRateType: M
  },
  value: S_100,
  fromCurrency: EUR,
  toCurrency: USD,
  validFromDateTime: DATE_2020_01_01
};

export const eurUsdMrmThrIndirectTrueInvertedFalseRate: ExchangeRate = {
  settings: {
    tenantIdentifier: TENANT_ID,
    isIndirect: true,
    fromCurrencyfactor: 1,
    toCurrencyfactor: 1
  },
  data: {
    ratesDataProviderCode: MRM,
    ratesDataSource: THR,
    exchangeRateType: B
  },
  value: S_100,
  fromCurrency: EUR,
  toCurrency: USD,
  validFromDateTime: DATE_2020_01_01
};

export const eurUsdMrmThrIndirectFalseInvertedFalseRate: ExchangeRate = {
  settings: setDefaultSettings(TENANT_ID),
  data: {
    ratesDataProviderCode: MRM,
    ratesDataSource: THR,
    exchangeRateType: B
  },
  value: S_100,
  fromCurrency: EUR,
  toCurrency: USD,
  validFromDateTime: DATE_2020_01_01
};

export const eurUsdMrmThrIndirectTrueInvertedTrueFactorMoreThanOneRate: ExchangeRate = {
  settings: {
    tenantIdentifier: TENANT_ID,
    isIndirect: true,
    fromCurrencyfactor: 10,
    toCurrencyfactor: 100
  },
  data: {
    ratesDataProviderCode: MRM,
    ratesDataSource: THR,
    exchangeRateType: M
  },
  value: S_30,
  fromCurrency: EUR,
  toCurrency: USD,
  validFromDateTime: DATE_2020_01_01
};

export const eurUsdMrmThrIndirectTrueInvertedFalseFactorMoreThanOneRate: ExchangeRate = {
  settings: {
    tenantIdentifier: TENANT_ID,
    isIndirect: true,
    fromCurrencyfactor: 10,
    toCurrencyfactor: 100
  },
  data: {
    ratesDataProviderCode: MRM,
    ratesDataSource: THR,
    exchangeRateType: B
  },
  value: S_30,
  fromCurrency: EUR,
  toCurrency: USD,
  validFromDateTime: DATE_2020_01_01
};

export const eurUsdMrmThrIndirectFalseInvertedTrueFactorMoreThanOneRate: ExchangeRate = {
  settings: {
    tenantIdentifier: TENANT_ID,
    isIndirect: false,
    fromCurrencyfactor: 10,
    toCurrencyfactor: 100
  },
  data: {
    ratesDataProviderCode: MRM,
    ratesDataSource: THR,
    exchangeRateType: M
  },
  value: S_30,
  fromCurrency: EUR,
  toCurrency: USD,
  validFromDateTime: DATE_2020_01_01
};

export const eurUsdMrmThrIndirectFalseInvertedFalseFactorMoreThanOneRate: ExchangeRate = {
  settings: {
    tenantIdentifier: TENANT_ID,
    isIndirect: false,
    fromCurrencyfactor: 10,
    toCurrencyfactor: 100
  },
  data: {
    ratesDataProviderCode: MRM,
    ratesDataSource: THR,
    exchangeRateType: B
  },
  value: S_30,
  fromCurrency: EUR,
  toCurrency: USD,
  validFromDateTime: DATE_2020_01_01
};

export const eurUsdMrmThrNewRateType: ExchangeRate = {
  settings: setDefaultSettings(TENANT_ID),
  data: {
    ratesDataProviderCode: MRM,
    ratesDataSource: THR,
    exchangeRateType: 'ABC'
  },
  value: S_100,
  fromCurrency: USD,
  toCurrency: EUR,
  validFromDateTime: DATE_2020_01_01
};

export const usdEurMrmEcbMultipleProviderDirectRate: ExchangeRate = {
  settings: {
    tenantIdentifier: TENANT_ID,
    isIndirect: true,
    fromCurrencyfactor: 1,
    toCurrencyfactor: 1
  },
  data: {
    ratesDataProviderCode: MRM,
    ratesDataSource: ECB,
    exchangeRateType: M
  },
  value: S_100,
  fromCurrency: USD,
  toCurrency: EUR,
  validFromDateTime: DATE_2020_01_02
};

export const usdEurMrmEcbIndirectTrueInvertedTrueDuplicateDateRate: ExchangeRate = {
  settings: {
    tenantIdentifier: TENANT_ID,
    isIndirect: true,
    fromCurrencyfactor: 1,
    toCurrencyfactor: 1
  },
  data: {
    ratesDataProviderCode: MRM,
    ratesDataSource: ECB,
    exchangeRateType: M
  },
  value: S_100,
  fromCurrency: USD,
  toCurrency: EUR,
  validFromDateTime: DATE_2020_01_02
};

export const usdEurMrmEcbIndirectTrueInvertedTrueRate: ExchangeRate = {
  settings: {
    tenantIdentifier: TENANT_ID,
    isIndirect: true,
    fromCurrencyfactor: 1,
    toCurrencyfactor: 1
  },
  data: {
    ratesDataProviderCode: MRM,
    ratesDataSource: ECB,
    exchangeRateType: M
  },
  value: S_100,
  fromCurrency: USD,
  toCurrency: EUR,
  validFromDateTime: DATE_2020_01_02
};

export const usdEurMrmEcbIndirectTrueInvertedFalseRate: ExchangeRate = {
  settings: {
    tenantIdentifier: TENANT_ID,
    isIndirect: true,
    fromCurrencyfactor: 1,
    toCurrencyfactor: 1
  },
  data: {
    ratesDataProviderCode: MRM,
    ratesDataSource: ECB,
    exchangeRateType: B
  },
  value: S_100,
  fromCurrency: USD,
  toCurrency: EUR,
  validFromDateTime: DATE_2020_01_02
};

export const usdEurMrmEcbIndirectFalseInvertedTrueExcRate: ExchangeRate = {
  settings: setDefaultSettings(TENANT_ID),
  data: {
    ratesDataProviderCode: MRM,
    ratesDataSource: ECB,
    exchangeRateType: M
  },
  value: S_100,
  fromCurrency: USD,
  toCurrency: EUR,
  validFromDateTime: DATE_2020_01_02
};

export const usdEurMrmEcbIndirectFalseInvertedFalseRate: ExchangeRate = {
  settings: setDefaultSettings(TENANT_ID),
  data: {
    ratesDataProviderCode: MRM,
    ratesDataSource: ECB,
    exchangeRateType: B
  },
  value: S_100,
  fromCurrency: USD,
  toCurrency: EUR,
  validFromDateTime: DATE_2020_01_02
};

export const usdEurMrmEcbIndirectTrueInvertedTrueFactorMoreThanOneRate: ExchangeRate = {
  settings: {
    tenantIdentifier: TENANT_ID,
    isIndirect: true,
    fromCurrencyfactor: 1,
    toCurrencyfactor: 10
  },
  data: {
    ratesDataProviderCode: MRM,
    ratesDataSource: ECB,
    exchangeRateType: M
  },
  value: S_20,
  fromCurrency: USD,
  toCurrency: EUR,
  validFromDateTime: DATE_2020_01_02
};

export const usdEurMrmEcbIndirectTrueInvertedFalseFactorMoreThanOneRate: ExchangeRate = {
  settings: {
    tenantIdentifier: TENANT_ID,
    isIndirect: true,
    fromCurrencyfactor: 1,
    toCurrencyfactor: 10
  },
  data: {
    ratesDataProviderCode: MRM,
    ratesDataSource: ECB,
    exchangeRateType: B
  },
  value: S_20,
  fromCurrency: USD,
  toCurrency: EUR,
  validFromDateTime: DATE_2020_01_02
};

export const usdEurMrmEcbIndirectFalseInvertedTrueFactorMoreThanOneExcRate: ExchangeRate = {
  settings: {
    tenantIdentifier: TENANT_ID,
    isIndirect: false,
    fromCurrencyfactor: 1,
    toCurrencyfactor: 10
  },
  data: {
    ratesDataProviderCode: MRM,
    ratesDataSource: ECB,
    exchangeRateType: M
  },
  value: S_20,
  fromCurrency: USD,
  toCurrency: EUR,
  validFromDateTime: DATE_2020_01_02
};

export const usdEurMrmEcbIndirectFalseInvertedFalseFactorMoreThanOneExcRate: ExchangeRate = {
  settings: {
    tenantIdentifier: TENANT_ID,
    isIndirect: false,
    fromCurrencyfactor: 1,
    toCurrencyfactor: 10
  },
  data: {
    ratesDataProviderCode: MRM,
    ratesDataSource: ECB,
    exchangeRateType: B
  },
  value: S_20,
  fromCurrency: USD,
  toCurrency: EUR,
  validFromDateTime: DATE_2020_01_02
};

export const eurUsdMrmEcbMultipleProviderIndirectRate: ExchangeRate = {
  settings: {
    tenantIdentifier: TENANT_ID,
    isIndirect: true,
    fromCurrencyfactor: 10,
    toCurrencyfactor: 100
  },
  data: {
    ratesDataProviderCode: MRM,
    ratesDataSource: ECB,
    exchangeRateType: M
  },
  value: S_30,
  fromCurrency: EUR,
  toCurrency: USD,
  validFromDateTime: DATE_2020_01_01
};

export const eurUsdMrmEcbIndirectTrueInvertedTrueDuplicateDateRate: ExchangeRate = {
  settings: {
    tenantIdentifier: TENANT_ID,
    isIndirect: true,
    fromCurrencyfactor: 1,
    toCurrencyfactor: 1
  },
  data: {
    ratesDataProviderCode: MRM,
    ratesDataSource: ECB,
    exchangeRateType: M
  },
  value: S_100,
  fromCurrency: EUR,
  toCurrency: USD,
  validFromDateTime: DATE_2020_01_01
};

export const eurUsdMrmEcbNewExcRate: ExchangeRate = {
  settings: setDefaultSettings(TENANT_ID),
  data: {
    ratesDataProviderCode: MRM,
    ratesDataSource: ECB,
    exchangeRateType: 'ABC'
  },
  value: S_100,
  fromCurrency: USD,
  toCurrency: EUR,
  validFromDateTime: DATE_2020_01_01
};

export const usdEurMrmThrMultipleProviderDirectRate: ExchangeRate = {
  settings: {
    tenantIdentifier: TENANT_ID,
    isIndirect: true,
    fromCurrencyfactor: 1,
    toCurrencyfactor: 1
  },
  data: {
    ratesDataProviderCode: MRM,
    ratesDataSource: THR,
    exchangeRateType: M
  },
  value: S_100,
  fromCurrency: USD,
  toCurrency: EUR,
  validFromDateTime: DATE_2020_01_02
};

export const eurUsdMrmThrMultipleProviderIndirectRate: ExchangeRate = {
  settings: {
    tenantIdentifier: TENANT_ID,
    isIndirect: true,
    fromCurrencyfactor: 1,
    toCurrencyfactor: 1
  },
  data: {
    ratesDataProviderCode: MRM,
    ratesDataSource: THR,
    exchangeRateType: M
  },
  value: S_100,
  fromCurrency: EUR,
  toCurrency: USD,
  validFromDateTime: DATE_2020_01_01
};

export const eurUsdMrmThrIndirectTrueInvertedTrueExcRate: ExchangeRate = {
  settings: {
    tenantIdentifier: TENANT_ID,
    isIndirect: true,
    fromCurrencyfactor: 1,
    toCurrencyfactor: 1
  },
  data: {
    ratesDataProviderCode: MRM,
    ratesDataSource: THR,
    exchangeRateType: M
  },
  value: S_100,
  fromCurrency: EUR,
  toCurrency: USD,
  validFromDateTime: DATE_2020_01_02
};

export const eurUsdMrmThrIndirectTrueInvertedFalseExcRate: ExchangeRate = {
  settings: {
    tenantIdentifier: TENANT_ID,
    isIndirect: true,
    fromCurrencyfactor: 1,
    toCurrencyfactor: 1
  },
  data: {
    ratesDataProviderCode: MRM,
    ratesDataSource: THR,
    exchangeRateType: B
  },
  value: S_100,
  fromCurrency: EUR,
  toCurrency: USD,
  validFromDateTime: DATE_2020_01_02
};

export const eurUsdMrmThrIndirectFalseInvertedTrueExcRate: ExchangeRate = {
  settings: setDefaultSettings(TENANT_ID),
  data: {
    ratesDataProviderCode: MRM,
    ratesDataSource: THR,
    exchangeRateType: M
  },
  value: S_100,
  fromCurrency: EUR,
  toCurrency: USD,
  validFromDateTime: DATE_2020_01_02
};

export const eurUsdMrmThrIndirectFalseInvertedFalseExcRate: ExchangeRate = {
  settings: setDefaultSettings(TENANT_ID),
  data: {
    ratesDataProviderCode: MRM,
    ratesDataSource: THR,
    exchangeRateType: B
  },
  value: S_100,
  fromCurrency: EUR,
  toCurrency: USD,
  validFromDateTime: DATE_2020_01_02
};

export const eurUsdMrmThrIndirectTrueInvertedTrueFactorMoreThanOneExcRate: ExchangeRate = {
  settings: {
    tenantIdentifier: TENANT_ID,
    isIndirect: true,
    fromCurrencyfactor: 10,
    toCurrencyfactor: 100
  },
  data: {
    ratesDataProviderCode: MRM,
    ratesDataSource: THR,
    exchangeRateType: M
  },
  value: S_30,
  fromCurrency: EUR,
  toCurrency: USD,
  validFromDateTime: DATE_2020_01_02
};

export const eurUsdMrmThrIndirectTrueInvertedFalseFactorMoreThanOneExcRate: ExchangeRate = {
  settings: {
    tenantIdentifier: TENANT_ID,
    isIndirect: true,
    fromCurrencyfactor: 10,
    toCurrencyfactor: 100
  },
  data: {
    ratesDataProviderCode: MRM,
    ratesDataSource: THR,
    exchangeRateType: B
  },
  value: S_30,
  fromCurrency: EUR,
  toCurrency: USD,
  validFromDateTime: DATE_2020_01_02
};

export const eurUsdMrmThrIndirectFalseInvertedTrueFactorMoreThanOneExcRate: ExchangeRate = {
  settings: {
    tenantIdentifier: TENANT_ID,
    isIndirect: false,
    fromCurrencyfactor: 10,
    toCurrencyfactor: 100
  },
  data: {
    ratesDataProviderCode: MRM,
    ratesDataSource: THR,
    exchangeRateType: M
  },
  value: S_30,
  fromCurrency: EUR,
  toCurrency: USD,
  validFromDateTime: DATE_2020_01_02
};

export const eurUsdMrmThrIndirectFalseInvertedFalseFactorMoreThanOneExcRate: ExchangeRate = {
  settings: {
    tenantIdentifier: TENANT_ID,
    isIndirect: false,
    fromCurrencyfactor: 10,
    toCurrencyfactor: 100
  },
  data: {
    ratesDataProviderCode: MRM,
    ratesDataSource: THR,
    exchangeRateType: B
  },
  value: S_30,
  fromCurrency: EUR,
  toCurrency: USD,
  validFromDateTime: DATE_2020_01_02
};

export const eurUsdMrmThrNewExcRateType: ExchangeRate = {
  settings: setDefaultSettings(TENANT_ID),
  data: {
    ratesDataProviderCode: MRM,
    ratesDataSource: THR,
    exchangeRateType: 'ABC'
  },
  value: S_100,
  fromCurrency: USD,
  toCurrency: EUR,
  validFromDateTime: DATE_2020_01_02
};

export const inrEurMrmThrMDirectFactorFiveTenRate: ExchangeRate = {
  settings: {
    tenantIdentifier: TENANT_ID,
    isIndirect: false,
    fromCurrencyfactor: 5,
    toCurrencyfactor: 10
  },
  data: {
    ratesDataProviderCode: MRM,
    ratesDataSource: THR,
    exchangeRateType: M
  },
  value: S_100,
  fromCurrency: INR,
  toCurrency: EUR,
  validFromDateTime: DATE_2019_09_16
};

export const usdEurMrmThrMExcRate: ExchangeRate = {
  settings: {
    tenantIdentifier: TENANT_ID,
    isIndirect: true,
    fromCurrencyfactor: 1,
    toCurrencyfactor: 1
  },
  data: {
    ratesDataProviderCode: MRM,
    ratesDataSource: THR,
    exchangeRateType: M
  },
  value: S_100,
  fromCurrency: USD,
  toCurrency: EUR,
  validFromDateTime: DATE_2019_09_16
};

export const eurUsdMrmEcbIndirectTrueRate: ExchangeRate = {
  settings: setDefaultSettings(TENANT_ID),
  data: {
    ratesDataProviderCode: MRM,
    ratesDataSource: ECB,
    exchangeRateType: A
  },
  value: S_2,
  fromCurrency: EUR,
  toCurrency: USD,
  validFromDateTime: DATE_2020_01_01
};

export const eurInrMrmEcbIndirectTrueRate: ExchangeRate = {
  settings: {
    tenantIdentifier: TENANT_ID,
    isIndirect: true,
    fromCurrencyfactor: 1,
    toCurrencyfactor: 1
  },
  data: {
    ratesDataProviderCode: MRM,
    ratesDataSource: ECB,
    exchangeRateType: A
  },
  value: S_5,
  fromCurrency: EUR,
  toCurrency: INR,
  validFromDateTime: DATE_2020_02_01
};

export const eurInrMrmEcbIndirectFalseRate: ExchangeRate = {
  settings: setDefaultSettings(TENANT_ID),
  data: {
    ratesDataProviderCode: MRM,
    ratesDataSource: ECB,
    exchangeRateType: A
  },
  value: S_5,
  fromCurrency: EUR,
  toCurrency: INR,
  validFromDateTime: DATE_2020_02_01
};

export const eurInrMrmEcbAskRate: ExchangeRate = {
  settings: setDefaultSettings(TENANT_ID),
  data: {
    ratesDataProviderCode: MRM,
    ratesDataSource: ECB,
    exchangeRateType: ASK
  },
  value: S_10,
  fromCurrency: EUR,
  toCurrency: INR,
  validFromDateTime: DATE_2020_02_01
};

export const usdInrMrmEcbAskRate: ExchangeRate = {
  settings: setDefaultSettings(TENANT_ID),
  data: {
    ratesDataProviderCode: MRM,
    ratesDataSource: ECB,
    exchangeRateType: ASK
  },
  value: S_10,
  fromCurrency: USD,
  toCurrency: INR,
  validFromDateTime: DATE_2020_02_01
};

export const usdInrMrmThrAskRate: ExchangeRate = {
  settings: setDefaultSettings(TENANT_ID),
  data: {
    ratesDataProviderCode: MRM,
    ratesDataSource: THR,
    exchangeRateType: ASK
  },
  value: S_10,
  fromCurrency: USD,
  toCurrency: INR,
  validFromDateTime: DATE_2020_02_01
};

export const eurInrMrmThrAskRate: ExchangeRate = {
  settings: setDefaultSettings(TENANT_ID),
  data: {
    ratesDataProviderCode: MRM,
    ratesDataSource: THR,
    exchangeRateType: ASK
  },
  value: S_10,
  fromCurrency: EUR,
  toCurrency: INR,
  validFromDateTime: DATE_2020_02_01
};

export const usdEurMrmThrMExRate: ExchangeRate = {
  settings: {
    tenantIdentifier: TENANT_ID,
    isIndirect: true,
    fromCurrencyfactor: 1,
    toCurrencyfactor: 1
  },

  data: {
    ratesDataProviderCode: MRM,
    ratesDataSource: THR,
    exchangeRateType: M
  },
  value: S_100,
  fromCurrency: USD,
  toCurrency: EUR,
  validFromDateTime: DATE_2019_09_16
};

export const eurInrMrmEcbIndirectConversionRate: ExchangeRate = {
  settings: {
    tenantIdentifier: TENANT_ID,
    isIndirect: true,
    fromCurrencyfactor: 1,
    toCurrencyfactor: 1
  },

  data: {
    ratesDataProviderCode: MRM,
    ratesDataSource: ECB,
    exchangeRateType: B
  },
  value: S_100,
  fromCurrency: EUR,
  toCurrency: INR,
  validFromDateTime: DATE_2020_01_01
};

export const inrEurMrmEcbMDuplicateExRate: ExchangeRate = {
  settings: {
    tenantIdentifier: TENANT_ID,
    isIndirect: false,
    fromCurrencyfactor: 10,
    toCurrencyfactor: 5
  },

  data: {
    ratesDataProviderCode: MRM,
    ratesDataSource: ECB,
    exchangeRateType: M
  },
  value: S_100,
  fromCurrency: INR,
  toCurrency: EUR,
  validFromDateTime: DATE_2019_09_16
};

export const eurInrMrmEcbMDuplicateExRate: ExchangeRate = {
  settings: {
    tenantIdentifier: TENANT_ID,
    isIndirect: false,
    fromCurrencyfactor: 10,
    toCurrencyfactor: 5
  },

  data: {
    ratesDataProviderCode: MRM,
    ratesDataSource: ECB,
    exchangeRateType: M
  },
  value: S_100,
  fromCurrency: EUR,
  toCurrency: INR,
  validFromDateTime: DATE_2019_09_16
};

export const inrEurMrmEcbDirectZeroRate: ExchangeRate = {
  settings: setDefaultSettings(TENANT_ID),
  data: {
    ratesDataProviderCode: MRM,
    ratesDataSource: ECB,
    exchangeRateType: M
  },
  value: S_0,
  fromCurrency: INR,
  toCurrency: EUR,
  validFromDateTime: DATE_2019_09_16
};

export const inrEurMrmEcbDirectZeroToFactorRate: ExchangeRate = {
  settings: {
    tenantIdentifier: TENANT_ID,
    isIndirect: false,
    fromCurrencyfactor: 1,
    toCurrencyfactor: 0
  },
  data: {
    ratesDataProviderCode: MRM,
    ratesDataSource: ECB,
    exchangeRateType: M
  },
  value: S_10,
  fromCurrency: INR,
  toCurrency: EUR,
  validFromDateTime: DATE_2019_09_16
};

export const inrEurMrmEcbIndirectZeroRate: ExchangeRate = {
  settings: {
    tenantIdentifier: TENANT_ID,
    isIndirect: true,
    fromCurrencyfactor: 1,
    toCurrencyfactor: 1
  },
  data: {
    ratesDataProviderCode: MRM,
    ratesDataSource: ECB,
    exchangeRateType: M
  },
  value: S_0,
  fromCurrency: INR,
  toCurrency: EUR,
  validFromDateTime: DATE_2019_09_16
};

export const inrEurMrmEcbIndirectZeroFactorsZeroRate: ExchangeRate = {
  settings: {
    tenantIdentifier: TENANT_ID,
    isIndirect: true,
    fromCurrencyfactor: 0,
    toCurrencyfactor: 0
  },
  data: {
    ratesDataProviderCode: MRM,
    ratesDataSource: ECB,
    exchangeRateType: M
  },
  value: S_0,
  fromCurrency: INR,
  toCurrency: EUR,
  validFromDateTime: DATE_2019_09_16
};

export const inrEurMrmEcbIndirectZeroToFactorZeroRate: ExchangeRate = {
  settings: {
    tenantIdentifier: TENANT_ID,
    isIndirect: true,
    fromCurrencyfactor: 1,
    toCurrencyfactor: 0
  },
  data: {
    ratesDataProviderCode: MRM,
    ratesDataSource: ECB,
    exchangeRateType: M
  },
  value: S_0,
  fromCurrency: INR,
  toCurrency: EUR,
  validFromDateTime: DATE_2019_09_16
};

export const inrEurMrmEcbIndirectZeroFromFactZeroRate: ExchangeRate = {
  settings: {
    tenantIdentifier: TENANT_ID,
    isIndirect: true,
    fromCurrencyfactor: 0,
    toCurrencyfactor: 1
  },
  data: {
    ratesDataProviderCode: MRM,
    ratesDataSource: ECB,
    exchangeRateType: M
  },
  value: S_0,
  fromCurrency: INR,
  toCurrency: EUR,
  validFromDateTime: DATE_2019_09_16
};

export const inrEurMrmEcbDirectZeroFactorsZeroRate: ExchangeRate = {
  settings: {
    tenantIdentifier: TENANT_ID,
    isIndirect: false,
    fromCurrencyfactor: 0,
    toCurrencyfactor: 0
  },
  data: {
    ratesDataProviderCode: MRM,
    ratesDataSource: ECB,
    exchangeRateType: M
  },
  value: S_0,
  fromCurrency: INR,
  toCurrency: EUR,
  validFromDateTime: DATE_2019_09_16
};

export const inrEurMrmEcbDirectZeroFromFactZeroRate: ExchangeRate = {
  settings: {
    tenantIdentifier: TENANT_ID,
    isIndirect: false,
    fromCurrencyfactor: 0,
    toCurrencyfactor: 1
  },
  data: {
    ratesDataProviderCode: MRM,
    ratesDataSource: ECB,
    exchangeRateType: M
  },
  value: S_0,
  fromCurrency: INR,
  toCurrency: EUR,
  validFromDateTime: DATE_2019_09_16
};

export const inrEurMrmEcbIndirectZeroFactorsRate: ExchangeRate = {
  settings: {
    tenantIdentifier: TENANT_ID,
    isIndirect: true,
    fromCurrencyfactor: 0,
    toCurrencyfactor: 0
  },
  data: {
    ratesDataProviderCode: MRM,
    ratesDataSource: ECB,
    exchangeRateType: M
  },
  value: S_10,
  fromCurrency: INR,
  toCurrency: EUR,
  validFromDateTime: DATE_2019_09_16
};

export const inrEurMrmEcbIndirectZeroFromFactorRate: ExchangeRate = {
  settings: {
    tenantIdentifier: TENANT_ID,
    isIndirect: true,
    fromCurrencyfactor: 0,
    toCurrencyfactor: 1
  },
  data: {
    ratesDataProviderCode: MRM,
    ratesDataSource: ECB,
    exchangeRateType: M
  },
  value: S_10,
  fromCurrency: INR,
  toCurrency: EUR,
  validFromDateTime: DATE_2019_09_16
};

export const inrEurMrmEcbDirectZeroFactorsRate: ExchangeRate = {
  settings: {
    tenantIdentifier: TENANT_ID,
    isIndirect: false,
    fromCurrencyfactor: 0,
    toCurrencyfactor: 0
  },
  data: {
    ratesDataProviderCode: MRM,
    ratesDataSource: ECB,
    exchangeRateType: M
  },
  value: S_10,
  fromCurrency: INR,
  toCurrency: EUR,
  validFromDateTime: DATE_2019_09_16
};

export const inrEurMrmEcbDirectZeroFromFactorRate: ExchangeRate = {
  settings: {
    tenantIdentifier: TENANT_ID,
    isIndirect: false,
    fromCurrencyfactor: 0,
    toCurrencyfactor: 1
  },
  data: {
    ratesDataProviderCode: MRM,
    ratesDataSource: ECB,
    exchangeRateType: M
  },
  value: S_10,
  fromCurrency: INR,
  toCurrency: EUR,
  validFromDateTime: DATE_2019_09_16
};

export const inrEurMrmEcbIndirectZeroToFactorRate: ExchangeRate = {
  settings: {
    tenantIdentifier: TENANT_ID,
    isIndirect: true,
    fromCurrencyfactor: 1,
    toCurrencyfactor: 0
  },
  data: {
    ratesDataProviderCode: MRM,
    ratesDataSource: ECB,
    exchangeRateType: M
  },
  value: S_10,
  fromCurrency: INR,
  toCurrency: EUR,
  validFromDateTime: DATE_2019_09_16
};

export const inrEurMrmEcbDirectZeroToFactorZeroRate: ExchangeRate = {
  settings: {
    tenantIdentifier: TENANT_ID,
    isIndirect: false,
    fromCurrencyfactor: 1,
    toCurrencyfactor: 0
  },
  data: {
    ratesDataProviderCode: MRM,
    ratesDataSource: ECB,
    exchangeRateType: M
  },
  value: S_0,
  fromCurrency: INR,
  toCurrency: EUR,
  validFromDateTime: DATE_2019_09_16
};

export const inrEurMrmThrIndirectZeroRate: ExchangeRate = {
  settings: {
    tenantIdentifier: TENANT_ID,
    isIndirect: true,
    fromCurrencyfactor: 1,
    toCurrencyfactor: 1
  },
  data: {
    ratesDataProviderCode: MRM,
    ratesDataSource: THR,
    exchangeRateType: M
  },
  value: S_0,
  fromCurrency: INR,
  toCurrency: EUR,
  validFromDateTime: DATE_2019_09_16
};

export const inrEurMrmThrDirectZeroRate: ExchangeRate = {
  settings: setDefaultSettings(TENANT_ID),
  data: {
    ratesDataProviderCode: MRM,
    ratesDataSource: THR,
    exchangeRateType: M
  },
  value: S_0,
  fromCurrency: INR,
  toCurrency: EUR,
  validFromDateTime: DATE_2019_09_16
};

export const inrEurMrmThrIndirectZeroFactorsZeroRate: ExchangeRate = {
  settings: {
    tenantIdentifier: TENANT_ID,
    isIndirect: true,
    fromCurrencyfactor: 0,
    toCurrencyfactor: 0
  },
  data: {
    ratesDataProviderCode: MRM,
    ratesDataSource: THR,
    exchangeRateType: M
  },
  value: S_0,
  fromCurrency: INR,
  toCurrency: EUR,
  validFromDateTime: DATE_2019_09_16
};

export const inrEurMrmThrIndirectZeroToFactorZeroRate: ExchangeRate = {
  settings: {
    tenantIdentifier: TENANT_ID,
    isIndirect: true,
    fromCurrencyfactor: 1,
    toCurrencyfactor: 0
  },
  data: {
    ratesDataProviderCode: MRM,
    ratesDataSource: THR,
    exchangeRateType: M
  },
  value: S_0,
  fromCurrency: INR,
  toCurrency: EUR,
  validFromDateTime: DATE_2019_09_16
};

export const inrEurMrmThrIndirectZeroFromFactZeroRate: ExchangeRate = {
  settings: {
    tenantIdentifier: TENANT_ID,
    isIndirect: true,
    fromCurrencyfactor: 0,
    toCurrencyfactor: 1
  },
  data: {
    ratesDataProviderCode: MRM,
    ratesDataSource: THR,
    exchangeRateType: M
  },
  value: S_0,
  fromCurrency: INR,
  toCurrency: EUR,
  validFromDateTime: DATE_2019_09_16
};

export const inrEurMrmThrDirectZeroFactorsZeroRate: ExchangeRate = {
  settings: {
    tenantIdentifier: TENANT_ID,
    isIndirect: false,
    fromCurrencyfactor: 0,
    toCurrencyfactor: 0
  },
  data: {
    ratesDataProviderCode: MRM,
    ratesDataSource: THR,
    exchangeRateType: M
  },
  value: S_0,
  fromCurrency: INR,
  toCurrency: EUR,
  validFromDateTime: DATE_2019_09_16
};

export const inrEurMrmThrDirectZeroToFactorZeroRate: ExchangeRate = {
  settings: {
    tenantIdentifier: TENANT_ID,
    isIndirect: false,
    fromCurrencyfactor: 1,
    toCurrencyfactor: 0
  },
  data: {
    ratesDataProviderCode: MRM,
    ratesDataSource: THR,
    exchangeRateType: M
  },
  value: S_0,
  fromCurrency: INR,
  toCurrency: EUR,
  validFromDateTime: DATE_2019_09_16
};

export const inrEurMrmThrDirectZeroFromFactZeroRate: ExchangeRate = {
  settings: {
    tenantIdentifier: TENANT_ID,
    isIndirect: false,
    fromCurrencyfactor: 0,
    toCurrencyfactor: 1
  },
  data: {
    ratesDataProviderCode: MRM,
    ratesDataSource: THR,
    exchangeRateType: M
  },
  value: S_0,
  fromCurrency: INR,
  toCurrency: EUR,
  validFromDateTime: DATE_2019_09_16
};

export const inrEurMrmThrIndirectZeroFactorsRate: ExchangeRate = {
  settings: {
    tenantIdentifier: TENANT_ID,
    isIndirect: true,
    fromCurrencyfactor: 0,
    toCurrencyfactor: 0
  },
  data: {
    ratesDataProviderCode: MRM,
    ratesDataSource: THR,
    exchangeRateType: M
  },
  value: S_10,
  fromCurrency: INR,
  toCurrency: EUR,
  validFromDateTime: DATE_2019_09_16
};

export const inrEurMrmThrIndirectZeroToFactorRate: ExchangeRate = {
  settings: {
    tenantIdentifier: TENANT_ID,
    isIndirect: true,
    fromCurrencyfactor: 1,
    toCurrencyfactor: 0
  },
  data: {
    ratesDataProviderCode: MRM,
    ratesDataSource: THR,
    exchangeRateType: M
  },
  value: S_10,
  fromCurrency: INR,
  toCurrency: EUR,
  validFromDateTime: DATE_2019_09_16
};

export const inrEurMrmThrIndirectZeroFromFactorRate: ExchangeRate = {
  settings: {
    tenantIdentifier: TENANT_ID,
    isIndirect: true,
    fromCurrencyfactor: 0,
    toCurrencyfactor: 1
  },
  data: {
    ratesDataProviderCode: MRM,
    ratesDataSource: THR,
    exchangeRateType: M
  },
  value: S_10,
  fromCurrency: INR,
  toCurrency: EUR,
  validFromDateTime: DATE_2019_09_16
};

export const inrEurMrmThrDirectZeroFactorsRate: ExchangeRate = {
  settings: {
    tenantIdentifier: TENANT_ID,
    isIndirect: false,
    fromCurrencyfactor: 0,
    toCurrencyfactor: 0
  },
  data: {
    ratesDataProviderCode: MRM,
    ratesDataSource: THR,
    exchangeRateType: M
  },
  value: S_10,
  fromCurrency: INR,
  toCurrency: EUR,
  validFromDateTime: DATE_2019_09_16
};

export const inrEurMrmThrDirectZeroToFactorRate: ExchangeRate = {
  settings: {
    tenantIdentifier: TENANT_ID,
    isIndirect: false,
    fromCurrencyfactor: 1,
    toCurrencyfactor: 0
  },
  data: {
    ratesDataProviderCode: MRM,
    ratesDataSource: THR,
    exchangeRateType: M
  },
  value: S_10,
  fromCurrency: INR,
  toCurrency: EUR,
  validFromDateTime: DATE_2019_09_16
};

export const inrEurMrmThrDirectZeroFromFactorRate: ExchangeRate = {
  settings: {
    tenantIdentifier: TENANT_ID,
    isIndirect: false,
    fromCurrencyfactor: 0,
    toCurrencyfactor: 1
  },
  data: {
    ratesDataProviderCode: MRM,
    ratesDataSource: THR,
    exchangeRateType: M
  },
  value: S_10,
  fromCurrency: INR,
  toCurrency: EUR,
  validFromDateTime: DATE_2019_09_16
};

/* Exchange Rate ends*/
