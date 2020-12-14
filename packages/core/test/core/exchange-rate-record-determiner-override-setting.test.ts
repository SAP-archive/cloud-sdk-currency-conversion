/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */
import { Tenant } from '@sap-cloud-sdk/core';
import {
  buildCurrency,
  ConversionParametersForNonFixedRate,
  ExchangeRateTypeDetail,
  ExchangeRate,
  ExchangeRateValue,
  Currency,
  TenantSettings
} from '@sap-cloud-sdk/currency-conversion-models';
import { ExchangeRateRecordDeterminer } from '../../src/core/exchange-rate-record-determiner';
import { ConversionError } from '../../src/constants/conversion-error';

const TENANT_ID: Tenant = { id: 'TenantID' };
const TENANT_ID1: Tenant = { id: 'tenantId1' };

const MRM = 'MRM';
const ECB = 'ECB';
const THR = 'THR';

const A = 'A';
const M = 'M';
const ASK = 'ASK';
const LAST = 'LAST';

const INR: Currency = buildCurrency('INR');
const EUR: Currency = buildCurrency('EUR');
const USD: Currency = buildCurrency('USD');

const S_0: ExchangeRateValue = new ExchangeRateValue('0');
const S_0_5: ExchangeRateValue = new ExchangeRateValue('0.5');
const S_1: ExchangeRateValue = new ExchangeRateValue('1');
const S_2: ExchangeRateValue = new ExchangeRateValue('2');
const S_3: ExchangeRateValue = new ExchangeRateValue('3');
const S_50: ExchangeRateValue = new ExchangeRateValue('50');
const S_5: ExchangeRateValue = new ExchangeRateValue('5');
const S_8: ExchangeRateValue = new ExchangeRateValue('8');
const S_10: ExchangeRateValue = new ExchangeRateValue('10');
const S_0_02: ExchangeRateValue = new ExchangeRateValue('0.02');
const S_0_08: ExchangeRateValue = new ExchangeRateValue('0.08');
const S_7_00000001: ExchangeRateValue = new ExchangeRateValue('7.00000001');
const S_21_00000001: ExchangeRateValue = new ExchangeRateValue('21.00000001');
const S_100: ExchangeRateValue = new ExchangeRateValue('100');
const S_200: ExchangeRateValue = new ExchangeRateValue('200');
const S_7_0: ExchangeRateValue = new ExchangeRateValue('7.0');
const S_21_0: ExchangeRateValue = new ExchangeRateValue('21.0');
const S_0_33333333333333: ExchangeRateValue = new ExchangeRateValue('0.33333333333333');

const S_2020_01_01T02_30_00Z: Date = new Date('2020-01-01T02:30:00Z');
const S_2020_02_01T02_30_00Z: Date = new Date('2020-02-01T02:30:00Z');
const S_2020_01_16T02_30_00Z: Date = new Date('2020-01-16T02:30:00Z');
const S_2019_09_16T02_30_00Z: Date = new Date('2019-09-16T02:30:00Z');
const S_2020_03_01T02_30_00Z: Date = new Date('2020-03-01T02:30:00Z');
const S_1990_03_01T02_30_00Z: Date = new Date('1990-03-01T02:30:00Z');

const overrideTenantSettings: TenantSettings = new TenantSettings(MRM, THR);

const inrEurMConversionParam: ConversionParametersForNonFixedRate = new ConversionParametersForNonFixedRate(
  'INR',
  'EUR',
  '100',
  M,
  S_2019_09_16T02_30_00Z
);
const eurInrMConversionParam: ConversionParametersForNonFixedRate = new ConversionParametersForNonFixedRate(
  'EUR',
  'INR',
  '10',
  M,
  S_2020_01_01T02_30_00Z
);
const eurInrInvalidCurrPairConversionParam = new ConversionParametersForNonFixedRate(
  'AUD',
  'BSD',
  '100',
  M,
  S_2020_01_01T02_30_00Z
);
const inrEurAskConversionParam: ConversionParametersForNonFixedRate = new ConversionParametersForNonFixedRate(
  'INR',
  'EUR',
  '100',
  ASK,
  S_2020_01_01T02_30_00Z
);
const usdEurAskConversionParam: ConversionParametersForNonFixedRate = new ConversionParametersForNonFixedRate(
  'USD',
  'EUR',
  '100',
  ASK,
  S_2020_01_01T02_30_00Z
);
const eurUsdAConversionParam: ConversionParametersForNonFixedRate = new ConversionParametersForNonFixedRate(
  'EUR',
  'USD',
  '100',
  A,
  S_2020_03_01T02_30_00Z
);
const inrEurMConversionParamPastDate: ConversionParametersForNonFixedRate = new ConversionParametersForNonFixedRate(
  'INR',
  'EUR',
  '100',
  M,
  S_1990_03_01T02_30_00Z
);

//

/* Exchange Rate starts*/

const inrEurMrmThrMRate: ExchangeRate = new ExchangeRate(
  TENANT_ID,
  MRM,
  THR,
  M,
  S_100,
  INR,
  EUR,
  S_2019_09_16T02_30_00Z,
  false,
  1,
  1
);
const inrEurMrmThrMDuplicateRate: ExchangeRate = new ExchangeRate(
  TENANT_ID,
  MRM,
  THR,
  M,
  S_100,
  INR,
  EUR,
  S_2019_09_16T02_30_00Z,
  false,
  1,
  1
);

const eurInrMrmThrMRate: ExchangeRate = new ExchangeRate(
  TENANT_ID,
  MRM,
  THR,
  M,
  S_100,
  EUR,
  INR,
  S_2020_01_16T02_30_00Z,
  false,
  1,
  1
);
const eurInrMrmThrMDuplicateRate: ExchangeRate = new ExchangeRate(
  TENANT_ID,
  MRM,
  THR,
  M,
  S_100,
  EUR,
  INR,
  S_2019_09_16T02_30_00Z,
  false,
  1,
  1
);

const eurInrMrmThrAskIndirectTrueRate: ExchangeRate = new ExchangeRate(
  TENANT_ID,
  MRM,
  THR,
  ASK,
  S_100,
  EUR,
  INR,
  S_2020_01_01T02_30_00Z,
  true,
  1,
  1
);
const eurInrMrmThrAskIndirectFalseRate: ExchangeRate = new ExchangeRate(
  TENANT_ID,
  MRM,
  THR,
  ASK,
  S_100,
  EUR,
  INR,
  S_2020_01_01T02_30_00Z,
  false,
  1,
  1
);

const inrEurMrmThrMDiffrentTenantRate: ExchangeRate = new ExchangeRate(
  TENANT_ID1,
  MRM,
  THR,
  M,
  S_100,
  INR,
  EUR,
  S_2019_09_16T02_30_00Z,
  false,
  1,
  1
);

const usdInrMrmThrLastRate: ExchangeRate = new ExchangeRate(
  TENANT_ID,
  MRM,
  THR,
  LAST,
  S_10,
  USD,
  INR,
  S_2020_02_01T02_30_00Z,
  false,
  1,
  1
);
const eurInrMrmThrLastRate: ExchangeRate = new ExchangeRate(
  TENANT_ID,
  MRM,
  THR,
  LAST,
  S_10,
  EUR,
  INR,
  S_2020_02_01T02_30_00Z,
  false,
  1,
  1
);

const eurUsdMrmThrIndirectTrueRate: ExchangeRate = new ExchangeRate(
  TENANT_ID,
  MRM,
  THR,
  A,
  S_2,
  EUR,
  USD,
  S_2020_01_01T02_30_00Z,
  true,
  1,
  1
);
const eurUsdMrmThrIndirectFalseRate: ExchangeRate = new ExchangeRate(
  TENANT_ID,
  MRM,
  THR,
  A,
  S_2,
  EUR,
  USD,
  S_2020_02_01T02_30_00Z,
  false,
  1,
  1
);

const eurInrMrmThrARate: ExchangeRate = new ExchangeRate(
  TENANT_ID,
  MRM,
  THR,
  A,
  S_5,
  EUR,
  INR,
  S_2020_02_01T02_30_00Z,
  false,
  1,
  1
);
const eurInrMrmThrADateBeforeRate: ExchangeRate = new ExchangeRate(
  TENANT_ID,
  MRM,
  THR,
  A,
  S_5,
  EUR,
  INR,
  S_2019_09_16T02_30_00Z,
  false,
  1,
  1
);
const usdInrMrmThrARate: ExchangeRate = new ExchangeRate(
  TENANT_ID,
  MRM,
  THR,
  A,
  S_10,
  USD,
  INR,
  S_2020_01_01T02_30_00Z,
  false,
  1,
  1
);

const eurInrMrmThrADuplicateRate: ExchangeRate = new ExchangeRate(
  TENANT_ID,
  MRM,
  THR,
  A,
  S_5,
  EUR,
  INR,
  S_2020_02_01T02_30_00Z,
  false,
  1,
  1
);
const usdInrMrmThrADuplicateRate: ExchangeRate = new ExchangeRate(
  TENANT_ID,
  MRM,
  THR,
  A,
  S_5,
  USD,
  INR,
  S_2020_02_01T02_30_00Z,
  false,
  1,
  1
);

const eurInrMrmThrIndirectTrueRate: ExchangeRate = new ExchangeRate(
  TENANT_ID,
  MRM,
  THR,
  A,
  S_5,
  EUR,
  INR,
  S_2020_02_01T02_30_00Z,
  true,
  1,
  1
);
const eurInrMrmThrIndirectFalseRate: ExchangeRate = new ExchangeRate(
  TENANT_ID,
  MRM,
  THR,
  A,
  S_5,
  EUR,
  INR,
  S_2020_02_01T02_30_00Z,
  false,
  1,
  1
);

const eurInrMrmThrIndirectTrueFactorMoreThanOneRate: ExchangeRate = new ExchangeRate(
  TENANT_ID,
  MRM,
  THR,
  A,
  S_5,
  EUR,
  INR,
  S_2020_02_01T02_30_00Z,
  true,
  5,
  10
);
const eurInrMrmThrIndirectFalseFactorMoreThanOneRate: ExchangeRate = new ExchangeRate(
  TENANT_ID,
  MRM,
  THR,
  A,
  S_5,
  EUR,
  INR,
  S_2020_02_01T02_30_00Z,
  false,
  5,
  10
);

const usdInrMrmThrIndirectTrueRate: ExchangeRate = new ExchangeRate(
  TENANT_ID,
  MRM,
  THR,
  A,
  S_10,
  USD,
  INR,
  S_2020_01_01T02_30_00Z,
  true,
  1,
  1
);
const usdInrMrmThrIndirectFalseRate: ExchangeRate = new ExchangeRate(
  TENANT_ID,
  MRM,
  THR,
  A,
  S_10,
  USD,
  INR,
  S_2020_01_01T02_30_00Z,
  false,
  1,
  1
);

const usdInrMrmThrIndirectTrueFactorMoreThanOneRate: ExchangeRate = new ExchangeRate(
  TENANT_ID,
  MRM,
  THR,
  A,
  S_10,
  USD,
  INR,
  S_2020_01_01T02_30_00Z,
  true,
  10,
  5
);
const usdInrMrmThrIndirectFalseFactorMoreThanOneRate: ExchangeRate = new ExchangeRate(
  TENANT_ID,
  MRM,
  THR,
  A,
  S_10,
  USD,
  INR,
  S_2020_01_01T02_30_00Z,
  false,
  10,
  5
);

const usdInrMrmThrDuplicateDateRate: ExchangeRate = new ExchangeRate(
  TENANT_ID,
  MRM,
  THR,
  A,
  S_10,
  USD,
  INR,
  S_2020_01_01T02_30_00Z,
  false,
  1,
  1
);

const eurInrMrmThrZeroRate: ExchangeRate = new ExchangeRate(
  TENANT_ID,
  MRM,
  THR,
  A,
  S_0,
  EUR,
  INR,
  S_2020_02_01T02_30_00Z,
  false,
  1,
  1
);
const usdInrMrmThrZeroRate: ExchangeRate = new ExchangeRate(
  TENANT_ID,
  MRM,
  THR,
  A,
  S_0,
  USD,
  INR,
  S_2020_01_01T02_30_00Z,
  false,
  1,
  1
);

const eurInrMrmThrZeroFactor: ExchangeRate = new ExchangeRate(
  TENANT_ID,
  MRM,
  THR,
  A,
  S_10,
  EUR,
  INR,
  S_2020_02_01T02_30_00Z,
  false,
  0,
  0
);
const usdInrMrmThrZeroFactor: ExchangeRate = new ExchangeRate(
  TENANT_ID,
  MRM,
  THR,
  A,
  S_10,
  USD,
  INR,
  S_2020_01_01T02_30_00Z,
  false,
  0,
  0
);

const eurInrMrmThrZeroFactorRate: ExchangeRate = new ExchangeRate(
  TENANT_ID,
  MRM,
  THR,
  A,
  S_0,
  EUR,
  INR,
  S_2020_02_01T02_30_00Z,
  false,
  0,
  0
);
const usdInrMrmThrZeroFactorRate: ExchangeRate = new ExchangeRate(
  TENANT_ID,
  MRM,
  THR,
  A,
  S_0,
  USD,
  INR,
  S_2020_01_01T02_30_00Z,
  false,
  0,
  0
);

const eurUsdMrmThrMRate: ExchangeRate = new ExchangeRate(
  TENANT_ID,
  MRM,
  ECB,
  M,
  S_100,
  EUR,
  USD,
  S_2020_01_01T02_30_00Z,
  false,
  1,
  1
);
const usdEurMrmThrMRate: ExchangeRate = new ExchangeRate(
  TENANT_ID,
  MRM,
  ECB,
  M,
  S_100,
  USD,
  EUR,
  S_2020_01_01T02_30_00Z,
  false,
  1,
  1
);

const eurInrMrmThrIndirectFalseRateInfiniteDecimal: ExchangeRate = new ExchangeRate(
  TENANT_ID,
  MRM,
  THR,
  A,
  S_3,
  EUR,
  INR,
  S_2020_02_01T02_30_00Z,
  false,
  1,
  1
);
const usdInrMrmThrIndirectFalseRateInfiniteDecimal: ExchangeRate = new ExchangeRate(
  TENANT_ID,
  MRM,
  THR,
  A,
  S_3,
  USD,
  INR,
  S_2020_01_01T02_30_00Z,
  false,
  1,
  1
);

const usdInrMrmEcbLastRate: ExchangeRate = new ExchangeRate(
  TENANT_ID,
  MRM,
  ECB,
  LAST,
  S_10,
  USD,
  INR,
  S_2020_02_01T02_30_00Z,
  false,
  1,
  1
);
const eurInrMrmEcbLastRate: ExchangeRate = new ExchangeRate(
  TENANT_ID,
  MRM,
  ECB,
  LAST,
  S_10,
  EUR,
  INR,
  S_2020_02_01T02_30_00Z,
  false,
  1,
  1
);
const eurInrMrmEcbADateBeforeRate: ExchangeRate = new ExchangeRate(
  TENANT_ID,
  MRM,
  ECB,
  A,
  S_5,
  EUR,
  INR,
  S_2019_09_16T02_30_00Z,
  false,
  1,
  1
);
const inrEurMrmEcbMRate: ExchangeRate = new ExchangeRate(
  TENANT_ID,
  MRM,
  ECB,
  M,
  S_100,
  INR,
  EUR,
  S_2019_09_16T02_30_00Z,
  false,
  1,
  1
);

const inrEurMrmEcbMDuplicateRate: ExchangeRate = new ExchangeRate(
  TENANT_ID,
  MRM,
  ECB,
  M,
  S_100,
  INR,
  EUR,
  S_2019_09_16T02_30_00Z,
  false,
  1,
  1
);

const eurInrMrmEcbMRate: ExchangeRate = new ExchangeRate(
  TENANT_ID,
  MRM,
  ECB,
  M,
  S_100,
  EUR,
  INR,
  S_2020_01_16T02_30_00Z,
  false,
  1,
  1
);

const eurInrMrmEcbIndirectTrueRate: ExchangeRate = new ExchangeRate(
  TENANT_ID,
  MRM,
  ECB,
  M,
  S_100,
  EUR,
  INR,
  S_2020_01_16T02_30_00Z,
  true,
  1,
  1
);

const eurInrMrmEcbIndirectFalseRate: ExchangeRate = new ExchangeRate(
  TENANT_ID,
  MRM,
  ECB,
  M,
  S_100,
  EUR,
  INR,
  S_2020_01_16T02_30_00Z,
  false,
  1,
  1
);

const eurInrMrmEcbMDuplicateRate: ExchangeRate = new ExchangeRate(
  TENANT_ID,
  MRM,
  ECB,
  M,
  S_100,
  EUR,
  INR,
  S_2019_09_16T02_30_00Z,
  false,
  1,
  1
);

const eurInrMrmEcbAskIndirectTrueRate: ExchangeRate = new ExchangeRate(
  TENANT_ID,
  MRM,
  ECB,
  ASK,
  S_100,
  EUR,
  INR,
  S_2020_01_01T02_30_00Z,
  true,
  1,
  1
);

const eurInrMrmEcbAskIndirectFalseRate: ExchangeRate = new ExchangeRate(
  TENANT_ID,
  MRM,
  ECB,
  ASK,
  S_100,
  EUR,
  INR,
  S_2020_01_01T02_30_00Z,
  false,
  1,
  1
);

const inrEurMrmEcbMDiffrentTenantRate: ExchangeRate = new ExchangeRate(
  TENANT_ID1,
  MRM,
  ECB,
  M,
  S_100,
  INR,
  EUR,
  S_2019_09_16T02_30_00Z,
  false,
  1,
  1
);

const eurUsdMrmEcbMRate: ExchangeRate = new ExchangeRate(
  TENANT_ID,
  MRM,
  ECB,
  M,
  S_100,
  EUR,
  USD,
  S_2020_01_01T02_30_00Z,
  false,
  1,
  1
);
const usdEurMrmEcbMRate: ExchangeRate = new ExchangeRate(
  TENANT_ID,
  MRM,
  ECB,
  M,
  S_100,
  USD,
  EUR,
  S_2020_01_01T02_30_00Z,
  false,
  1,
  1
);

const eurUsdMrmEcbIndirectTrueRate: ExchangeRate = new ExchangeRate(
  TENANT_ID,
  MRM,
  ECB,
  A,
  S_2,
  EUR,
  USD,
  S_2020_01_01T02_30_00Z,
  true,
  1,
  1
);
const eurUsdMrmEcbIndirectFalseRate: ExchangeRate = new ExchangeRate(
  TENANT_ID,
  MRM,
  ECB,
  A,
  S_2,
  EUR,
  USD,
  S_2020_02_01T02_30_00Z,
  false,
  1,
  1
);
const eurInrMrmEcbARate: ExchangeRate = new ExchangeRate(
  TENANT_ID,
  MRM,
  ECB,
  A,
  S_5,
  EUR,
  INR,
  S_2020_02_01T02_30_00Z,
  false,
  1,
  1
);
const usdInrMrmEcbARate: ExchangeRate = new ExchangeRate(
  TENANT_ID,
  MRM,
  ECB,
  A,
  S_10,
  USD,
  INR,
  S_2020_01_01T02_30_00Z,
  false,
  1,
  1
);

const eurInrMrmEcbADuplicateRate: ExchangeRate = new ExchangeRate(
  TENANT_ID,
  MRM,
  ECB,
  A,
  S_5,
  EUR,
  INR,
  S_2020_02_01T02_30_00Z,
  false,
  1,
  1
);
const usdInrMrmEcbADuplicateRate: ExchangeRate = new ExchangeRate(
  TENANT_ID,
  MRM,
  ECB,
  A,
  S_5,
  USD,
  INR,
  S_2020_02_01T02_30_00Z,
  false,
  1,
  1
);

const eurInrMrmEcbIndirectTrueFactorMoreThanOneRate: ExchangeRate = new ExchangeRate(
  TENANT_ID,
  MRM,
  ECB,
  A,
  S_5,
  EUR,
  INR,
  S_2020_02_01T02_30_00Z,
  true,
  5,
  10
);
const eurInrMrmEcbIndirectFalseFactorMoreThanOneRate: ExchangeRate = new ExchangeRate(
  TENANT_ID,
  MRM,
  ECB,
  A,
  S_5,
  EUR,
  INR,
  S_2020_02_01T02_30_00Z,
  false,
  5,
  10
);

const usdInrMrmEcbIndirectTrueRate: ExchangeRate = new ExchangeRate(
  TENANT_ID,
  MRM,
  ECB,
  A,
  S_10,
  USD,
  INR,
  S_2020_01_01T02_30_00Z,
  true,
  1,
  1
);
const usdInrMrmEcbIndirectFalseRate: ExchangeRate = new ExchangeRate(
  TENANT_ID,
  MRM,
  ECB,
  A,
  S_10,
  USD,
  INR,
  S_2020_01_01T02_30_00Z,
  false,
  1,
  1
);

const usdInrMrmEcbIndirectTrueFactorMoreThanOneRate: ExchangeRate = new ExchangeRate(
  TENANT_ID,
  MRM,
  ECB,
  A,
  S_10,
  USD,
  INR,
  S_2020_01_01T02_30_00Z,
  true,
  10,
  5
);
const usdInrMrmEcbIndirectFalseFactorMoreThanOneRate: ExchangeRate = new ExchangeRate(
  TENANT_ID,
  MRM,
  ECB,
  A,
  S_10,
  USD,
  INR,
  S_2020_01_01T02_30_00Z,
  false,
  10,
  5
);

const usdInrMrmEcbDuplicateDateRate: ExchangeRate = new ExchangeRate(
  TENANT_ID,
  MRM,
  ECB,
  A,
  S_10,
  USD,
  INR,
  S_2020_01_01T02_30_00Z,
  false,
  1,
  1
);

const eurInrMrmEcbIndirectFalseRateInfiniteDecimal: ExchangeRate = new ExchangeRate(
  TENANT_ID,
  MRM,
  ECB,
  A,
  S_3,
  EUR,
  INR,
  S_2020_02_01T02_30_00Z,
  false,
  1,
  1
);
const usdInrMrmEcbIndirectFalseRateInfiniteDecimal: ExchangeRate = new ExchangeRate(
  TENANT_ID,
  MRM,
  ECB,
  A,
  S_3,
  USD,
  INR,
  S_2020_01_01T02_30_00Z,
  false,
  1,
  1
);

const eurInrMrmEcbZeroRate: ExchangeRate = new ExchangeRate(
  TENANT_ID,
  MRM,
  ECB,
  A,
  S_0,
  EUR,
  INR,
  S_2020_02_01T02_30_00Z,
  false,
  1,
  1
);
const usdInrMrmEcbZeroRate: ExchangeRate = new ExchangeRate(
  TENANT_ID,
  MRM,
  ECB,
  A,
  S_0,
  USD,
  INR,
  S_2020_01_01T02_30_00Z,
  false,
  1,
  1
);

const eurInrMrmEcbZeroFactor: ExchangeRate = new ExchangeRate(
  TENANT_ID,
  MRM,
  ECB,
  A,
  S_10,
  EUR,
  INR,
  S_2020_02_01T02_30_00Z,
  false,
  0,
  0
);
const usdInrMrmEcbZeroFactor: ExchangeRate = new ExchangeRate(
  TENANT_ID,
  MRM,
  ECB,
  A,
  S_10,
  USD,
  INR,
  S_2020_01_01T02_30_00Z,
  false,
  0,
  0
);

const eurInrMrmEcbZeroFactorRate: ExchangeRate = new ExchangeRate(
  TENANT_ID,
  MRM,
  ECB,
  A,
  S_0,
  EUR,
  INR,
  S_2020_02_01T02_30_00Z,
  false,
  0,
  0
);
const usdInrMrmEcbZeroFactorRate: ExchangeRate = new ExchangeRate(
  TENANT_ID,
  MRM,
  ECB,
  A,
  S_0,
  USD,
  INR,
  S_2020_01_01T02_30_00Z,
  false,
  0,
  0
);

const eurInrMrmEcbScaleMoreThanZeroRate: ExchangeRate = new ExchangeRate(
  TENANT_ID,
  MRM,
  ECB,
  A,
  S_7_0,
  EUR,
  INR,
  S_2020_02_01T02_30_00Z,
  false,
  1,
  1
);
const usdInrMrmEcbScaleMoreThanZeroRate: ExchangeRate = new ExchangeRate(
  TENANT_ID,
  MRM,
  ECB,
  A,
  S_21_0,
  USD,
  INR,
  S_2020_01_01T02_30_00Z,
  false,
  1,
  1
);

const eurInrMrmThrScaleMoreThanZeroRate: ExchangeRate = new ExchangeRate(
  TENANT_ID,
  MRM,
  THR,
  A,
  S_7_0,
  EUR,
  INR,
  S_2020_02_01T02_30_00Z,
  false,
  1,
  1
);
const usdInrMrmThrScaleMoreThanZeroRate: ExchangeRate = new ExchangeRate(
  TENANT_ID,
  MRM,
  THR,
  A,
  S_21_0,
  USD,
  INR,
  S_2020_01_01T02_30_00Z,
  false,
  1,
  1
);
const eurInrMrmEcbScaleMoreThanDefaultRate: ExchangeRate = new ExchangeRate(
  TENANT_ID,
  MRM,
  ECB,
  A,
  S_7_00000001,
  EUR,
  INR,
  S_2020_02_01T02_30_00Z,
  false,
  1,
  1
);
const usdInrMrmEcbScaleMoreThanDefaultRate: ExchangeRate = new ExchangeRate(
  TENANT_ID,
  MRM,
  ECB,
  A,
  S_21_00000001,
  USD,
  INR,
  S_2020_01_01T02_30_00Z,
  false,
  1,
  1
);
const eurInrMrmThrScaleMoreThanDefaultRate: ExchangeRate = new ExchangeRate(
  TENANT_ID,
  MRM,
  THR,
  A,
  S_7_00000001,
  EUR,
  INR,
  S_2020_02_01T02_30_00Z,
  false,
  1,
  1
);
const usdInrMrmThrScaleMoreThanDefaultRate: ExchangeRate = new ExchangeRate(
  TENANT_ID,
  MRM,
  THR,
  A,
  S_21_00000001,
  USD,
  INR,
  S_2020_01_01T02_30_00Z,
  false,
  1,
  1
);

/* Exchange Rate ends*/

function instantiateExchangeRateRecordDeterminer(exchangeRateResultSet: ExchangeRate[]): ExchangeRateRecordDeterminer {
  return new ExchangeRateRecordDeterminer(
    TENANT_ID,
    overrideTenantSettings,
    exchangeRateResultSet,
    getExchangeRateTypeDetailsForTenant()
  );
}

function getExchangeRateTypeDetailsForTenant(): Map<string, ExchangeRateTypeDetail> {
  const exchangeRateTypeDetailMap: Map<string, ExchangeRateTypeDetail> = new Map();
  exchangeRateTypeDetailMap.set(A, new ExchangeRateTypeDetail(INR, true));
  exchangeRateTypeDetailMap.set(M, new ExchangeRateTypeDetail(null as any, true));
  exchangeRateTypeDetailMap.set(ASK, new ExchangeRateTypeDetail(null as any, true));
  return exchangeRateTypeDetailMap;
}

describe('Exchange Rate Record Determiner Override Tenant Setting', () => {
  it('Get best matched exchange rate record', () => {
    const exchangeRateResultSet: ExchangeRate[] = [
      inrEurMrmThrMRate,
      eurInrMrmThrMRate,
      inrEurMrmEcbMRate,
      eurInrMrmEcbMRate
    ];
    const exchangeRateRecordDeterminer: ExchangeRateRecordDeterminer = instantiateExchangeRateRecordDeterminer(
      exchangeRateResultSet
    );
    const actualExchangeRateRecord: ExchangeRate = exchangeRateRecordDeterminer.getBestMatchedExchangeRateRecord(
      inrEurMConversionParam
    );
    expect(inrEurMrmThrMRate).toEqual(actualExchangeRateRecord);
  });

  it('Conversion with exchange rate record having future date', () => {
    let errInput = new Error();
    const exchangeRateResultSet: ExchangeRate[] = [
      inrEurMrmEcbMRate,
      eurInrMrmEcbMRate,
      eurInrMrmEcbARate,
      inrEurMrmThrMRate,
      eurInrMrmThrMRate,
      eurInrMrmThrARate
    ];
    const exchangeRateRecordDeterminer: ExchangeRateRecordDeterminer = instantiateExchangeRateRecordDeterminer(
      exchangeRateResultSet
    );
    try {
      const actualExchangeRateRecord: ExchangeRate = exchangeRateRecordDeterminer.getBestMatchedExchangeRateRecord(
        inrEurMConversionParamPastDate
      );
    } catch (error) {
      errInput = error;
    }
    expect(errInput.message).toBe(ConversionError.NO_MATCHING_EXCHANGE_RATE_RECORD);
  });

  it('exchange rate record with different data providers', () => {
    const exchangeRateResultSet: ExchangeRate[] = [
      eurInrMrmThrMRate,
      eurInrMrmThrMDuplicateRate,
      eurInrMrmThrAskIndirectTrueRate,
      eurInrMrmThrAskIndirectTrueRate,
      eurInrMrmEcbMDuplicateRate,
      eurInrMrmEcbAskIndirectTrueRate
    ];
    const exchangeRateRecordDeterminer: ExchangeRateRecordDeterminer = instantiateExchangeRateRecordDeterminer(
      exchangeRateResultSet
    );
    const actualExchangeRateRecord: ExchangeRate = exchangeRateRecordDeterminer.getBestMatchedExchangeRateRecord(
      eurInrMConversionParam
    );
    expect(eurInrMrmThrMDuplicateRate).toEqual(actualExchangeRateRecord);
  });

  it('Duplicate exchange rate record', () => {
    let errInput = new Error();
    const exchangeRateResultSet: ExchangeRate[] = [
      inrEurMrmThrMDuplicateRate,
      inrEurMrmThrMRate,
      eurInrMrmThrAskIndirectFalseRate,
      eurInrMrmThrAskIndirectTrueRate,
      inrEurMrmEcbMDuplicateRate,
      inrEurMrmEcbMRate,
      eurInrMrmEcbAskIndirectFalseRate,
      eurInrMrmEcbAskIndirectTrueRate
    ];
    const exchangeRateRecordDeterminer: ExchangeRateRecordDeterminer = instantiateExchangeRateRecordDeterminer(
      exchangeRateResultSet
    );
    try {
      const actualExchangeRateRecord: ExchangeRate = exchangeRateRecordDeterminer.getBestMatchedExchangeRateRecord(
        inrEurMConversionParam
      );
    } catch (error) {
      errInput = error;
    }
    expect(errInput.message).toBe(ConversionError.DUPLICATE_CONVERSION_RECORD_FOUND);
  });

  it('No exchange rate record for currency pair AUD-BSD', () => {
    let errInput = new Error();
    const exchangeRateResultSet: ExchangeRate[] = [
      eurInrMrmThrMRate,
      inrEurMrmThrMRate,
      inrEurMrmThrMDuplicateRate,
      inrEurMrmThrMRate,
      eurInrMrmThrAskIndirectFalseRate,
      eurInrMrmThrAskIndirectTrueRate,
      eurInrMrmEcbMRate,
      inrEurMrmEcbMRate,
      inrEurMrmEcbMDuplicateRate,
      inrEurMrmEcbMRate,
      eurInrMrmEcbAskIndirectFalseRate,
      eurInrMrmEcbAskIndirectTrueRate
    ];
    const exchangeRateRecordDeterminer: ExchangeRateRecordDeterminer = instantiateExchangeRateRecordDeterminer(
      exchangeRateResultSet
    );
    try {
      const actualExchangeRateRecord: ExchangeRate = exchangeRateRecordDeterminer.getBestMatchedExchangeRateRecord(
        eurInrInvalidCurrPairConversionParam
      );
    } catch (error) {
      errInput = error;
    }
    expect(errInput.message).toBe(ConversionError.NO_MATCHING_EXCHANGE_RATE_RECORD);
  });

  it('No exchange rate record for different tenant', () => {
    let errInput = new Error();
    const exchangeRateResultSet: ExchangeRate[] = [
      eurInrMrmThrMRate,
      inrEurMrmThrMRate,
      inrEurMrmThrMDuplicateRate,
      inrEurMrmThrMRate,
      eurInrMrmThrAskIndirectFalseRate,
      eurInrMrmThrAskIndirectTrueRate,
      eurInrMrmEcbMRate,
      inrEurMrmEcbMRate,
      inrEurMrmEcbMDuplicateRate,
      inrEurMrmEcbMRate,
      eurInrMrmEcbAskIndirectFalseRate,
      eurInrMrmEcbAskIndirectTrueRate
    ];
    const exchangeRateRecordDeterminer: ExchangeRateRecordDeterminer = new ExchangeRateRecordDeterminer(
      TENANT_ID1,
      overrideTenantSettings,
      exchangeRateResultSet,
      getExchangeRateTypeDetailsForTenant()
    );
    try {
      const actualExchangeRateRecord: ExchangeRate = exchangeRateRecordDeterminer.getBestMatchedExchangeRateRecord(
        inrEurMConversionParam
      );
    } catch (error) {
      errInput = error;
    }
    expect(errInput.message).toBe(ConversionError.NO_MATCHING_EXCHANGE_RATE_RECORD);
  });

  it('Single exchange rate record for different tenant', () => {
    const exchangeRateResultSet: ExchangeRate[] = [
      inrEurMrmThrMDiffrentTenantRate,
      eurInrMrmThrMRate,
      inrEurMrmThrMRate,
      inrEurMrmThrMDuplicateRate,
      inrEurMrmThrMRate,
      eurInrMrmThrAskIndirectFalseRate,
      eurInrMrmThrAskIndirectTrueRate,
      inrEurMrmEcbMDiffrentTenantRate,
      eurInrMrmEcbMRate,
      inrEurMrmEcbMRate,
      inrEurMrmEcbMDuplicateRate,
      inrEurMrmEcbMRate,
      eurInrMrmEcbAskIndirectFalseRate,
      eurInrMrmEcbAskIndirectTrueRate
    ];
    const exchangeRateRecordDeterminer: ExchangeRateRecordDeterminer = new ExchangeRateRecordDeterminer(
      TENANT_ID1,
      overrideTenantSettings,
      exchangeRateResultSet,
      getExchangeRateTypeDetailsForTenant()
    );
    const actualExchangeRateRecord: ExchangeRate = exchangeRateRecordDeterminer.getBestMatchedExchangeRateRecord(
      inrEurMConversionParam
    );
    expect(inrEurMrmThrMDiffrentTenantRate).toEqual(actualExchangeRateRecord);
  });

  /* INVERTED RATE TEST CASE STARTS */

  it('Inverted exchange rate record indirect true', () => {
    let errInput = new Error();
    const exchangeRateResultSet: ExchangeRate[] = [
      inrEurMrmThrMDuplicateRate,
      inrEurMrmThrMRate,
      eurInrMrmThrAskIndirectFalseRate,
      eurInrMrmThrAskIndirectTrueRate,
      inrEurMrmEcbMDuplicateRate,
      inrEurMrmEcbMRate,
      eurInrMrmEcbAskIndirectFalseRate,
      eurInrMrmEcbAskIndirectTrueRate
    ];
    const exchangeRateRecordDeterminer: ExchangeRateRecordDeterminer = instantiateExchangeRateRecordDeterminer(
      exchangeRateResultSet
    );
    try {
      const actualExchangeRateRecord: ExchangeRate = exchangeRateRecordDeterminer.getBestMatchedExchangeRateRecord(
        inrEurAskConversionParam
      );
    } catch (error) {
      errInput = error;
    }
    expect(errInput.message).toBe(ConversionError.DUPLICATE_CONVERSION_RECORD_FOUND);
  });

  it('Inverted conversion exchange rate record with exchange rate type detail null', () => {
    let errInput = new Error();
    const exchangeRateResultSet: ExchangeRate[] = [
      eurUsdMrmThrMRate,
      usdEurMrmThrMRate,
      eurUsdMrmEcbMRate,
      usdEurMrmEcbMRate
    ];
    const exchangeRateRecordDeterminer: ExchangeRateRecordDeterminer = new ExchangeRateRecordDeterminer(
      TENANT_ID,
      overrideTenantSettings,
      exchangeRateResultSet,
      null as any
    );
    try {
      const actualExchangeRateRecord: ExchangeRate = exchangeRateRecordDeterminer.getBestMatchedExchangeRateRecord(
        usdEurAskConversionParam
      );
    } catch (error) {
      errInput = error;
    }
    expect(errInput.message).toBe(ConversionError.NO_MATCHING_EXCHANGE_RATE_RECORD);
  });

  /* INVERTED RATE TEST CASE ENDS */

  /* REFERENCE CURRENCY STARTS */

  it('Reference Currency as INR', () => {
    const exchangeRateResultSet: ExchangeRate[] = [
      eurInrMrmThrARate,
      usdInrMrmThrARate,
      eurInrMrmEcbARate,
      usdInrMrmEcbARate
    ];
    const exchangeRateRecordDeterminer: ExchangeRateRecordDeterminer = instantiateExchangeRateRecordDeterminer(
      exchangeRateResultSet
    );
    const expectedExchangeRate: ExchangeRate = new ExchangeRate(
      TENANT_ID,
      MRM,
      THR,
      A,
      S_0_5,
      EUR,
      USD,
      S_2020_01_01T02_30_00Z,
      false,
      1,
      1
    );
    const actualExchangeRateRecord: ExchangeRate = exchangeRateRecordDeterminer.getBestMatchedExchangeRateRecord(
      eurUsdAConversionParam
    );
    expect(expectedExchangeRate).toEqual(actualExchangeRateRecord);
  });

  it('Reference Currency as INR scale more than zero rate', () => {
    const exchangeRateResultSet: ExchangeRate[] = [
      eurInrMrmEcbScaleMoreThanZeroRate,
      usdInrMrmEcbScaleMoreThanZeroRate,
      eurInrMrmThrScaleMoreThanZeroRate,
      usdInrMrmThrScaleMoreThanZeroRate
    ];
    const exchangeRateRecordDeterminer: ExchangeRateRecordDeterminer = instantiateExchangeRateRecordDeterminer(
      exchangeRateResultSet
    );
    const expectedExchangeRate: ExchangeRate = new ExchangeRate(
      TENANT_ID,
      MRM,
      THR,
      A,
      S_0_33333333333333,
      EUR,
      USD,
      S_2020_01_01T02_30_00Z,
      false,
      1,
      1
    );
    const actualExchangeRateRecord: ExchangeRate = exchangeRateRecordDeterminer.getBestMatchedExchangeRateRecord(
      eurUsdAConversionParam
    );
    expect(expectedExchangeRate).toEqual(actualExchangeRateRecord);
  });

  it('Reference Currency as INR scale more than default', () => {
    const exchangeRateResultSet: ExchangeRate[] = [
      eurInrMrmEcbScaleMoreThanDefaultRate,
      usdInrMrmEcbScaleMoreThanDefaultRate,
      eurInrMrmThrScaleMoreThanDefaultRate,
      usdInrMrmThrScaleMoreThanDefaultRate
    ];
    const exchangeRateRecordDeterminer: ExchangeRateRecordDeterminer = instantiateExchangeRateRecordDeterminer(
      exchangeRateResultSet
    );
    const expectedExchangeRate: ExchangeRate = new ExchangeRate(
      TENANT_ID,
      MRM,
      THR,
      A,
      new ExchangeRateValue('0.3333333336507937'),
      EUR,
      USD,
      S_2020_01_01T02_30_00Z,
      false,
      1,
      1
    );
    const actualExchangeRateRecord: ExchangeRate = exchangeRateRecordDeterminer.getBestMatchedExchangeRateRecord(
      eurUsdAConversionParam
    );
    expect(expectedExchangeRate).toEqual(actualExchangeRateRecord);
  });

  it('Reference Currency as INR From Reference Currency Pair Valid DateTime', () => {
    const exchangeRateResultSet: ExchangeRate[] = [
      eurInrMrmEcbADateBeforeRate,
      eurInrMrmThrADateBeforeRate,
      usdInrMrmEcbARate,
      usdInrMrmThrARate
    ];
    const exchangeRateRecordDeterminer: ExchangeRateRecordDeterminer = instantiateExchangeRateRecordDeterminer(
      exchangeRateResultSet
    );
    const expectedExchangeRate: ExchangeRate = new ExchangeRate(
      TENANT_ID,
      MRM,
      THR,
      A,
      S_0_5,
      EUR,
      USD,
      S_2019_09_16T02_30_00Z,
      false,
      1,
      1
    );
    const actualExchangeRateRecord: ExchangeRate = exchangeRateRecordDeterminer.getBestMatchedExchangeRateRecord(
      eurUsdAConversionParam
    );
    expect(expectedExchangeRate).toEqual(actualExchangeRateRecord);
  });

  it('Reference Currency with non existing rate type', () => {
    let errInput = new Error();
    const exchangeRateResultSet: ExchangeRate[] = [
      usdInrMrmThrLastRate,
      eurInrMrmThrLastRate,
      usdInrMrmEcbLastRate,
      eurInrMrmEcbLastRate
    ];
    const exchangeRateRecordDeterminer: ExchangeRateRecordDeterminer = instantiateExchangeRateRecordDeterminer(
      exchangeRateResultSet
    );
    try {
      const actualExchangeRateRecord: ExchangeRate = exchangeRateRecordDeterminer.getBestMatchedExchangeRateRecord(
        eurUsdAConversionParam
      );
    } catch (error) {
      errInput = error;
    }
    expect(errInput.message).toBe(ConversionError.NO_MATCHING_EXCHANGE_RATE_RECORD);
  });

  it('Reference Currency with Direct Rate No From Reference Pair', () => {
    const exchangeRateResultSet: ExchangeRate[] = [
      usdInrMrmThrARate,
      eurUsdMrmThrIndirectTrueRate,
      eurUsdMrmThrIndirectFalseRate,
      eurInrMrmEcbARate,
      eurUsdMrmEcbIndirectTrueRate,
      eurUsdMrmEcbIndirectFalseRate
    ];
    const exchangeRateRecordDeterminer: ExchangeRateRecordDeterminer = instantiateExchangeRateRecordDeterminer(
      exchangeRateResultSet
    );
    const actualExchangeRateRecord: ExchangeRate = exchangeRateRecordDeterminer.getBestMatchedExchangeRateRecord(
      eurUsdAConversionParam
    );
    expect(eurUsdMrmThrIndirectFalseRate).toEqual(actualExchangeRateRecord);
  });

  it('Reference Currency with Direct Rate No To Reference Pair', () => {
    const exchangeRateResultSet: ExchangeRate[] = [
      eurInrMrmThrARate,
      eurUsdMrmThrIndirectTrueRate,
      eurUsdMrmThrIndirectFalseRate,
      eurUsdMrmEcbIndirectTrueRate,
      eurUsdMrmEcbIndirectFalseRate
    ];
    const exchangeRateRecordDeterminer: ExchangeRateRecordDeterminer = instantiateExchangeRateRecordDeterminer(
      exchangeRateResultSet
    );
    const actualExchangeRateRecord: ExchangeRate = exchangeRateRecordDeterminer.getBestMatchedExchangeRateRecord(
      eurUsdAConversionParam
    );
    expect(eurUsdMrmThrIndirectFalseRate).toEqual(actualExchangeRateRecord);
  });

  it('Reference Currency with zero rate', () => {
    let errInput = new Error();
    const exchangeRateResultSet: ExchangeRate[] = [
      eurInrMrmEcbZeroRate,
      usdInrMrmEcbZeroRate,
      eurInrMrmThrZeroRate,
      usdInrMrmThrZeroRate
    ];
    const exchangeRateRecordDeterminer: ExchangeRateRecordDeterminer = instantiateExchangeRateRecordDeterminer(
      exchangeRateResultSet
    );
    try {
      const actualExchangeRateRecord: ExchangeRate = exchangeRateRecordDeterminer.getBestMatchedExchangeRateRecord(
        eurUsdAConversionParam
      );
    } catch (error) {
      errInput = error;
    }
    expect(errInput.message).toBe(ConversionError.ZERO_RATE_REFERENCE_CURRENCY);
  });

  it('Reference Currency with zero factor', () => {
    let errInput = new Error();
    const exchangeRateResultSet: ExchangeRate[] = [
      eurInrMrmEcbZeroFactor,
      usdInrMrmEcbZeroFactor,
      eurInrMrmThrZeroFactor,
      usdInrMrmThrZeroFactor
    ];
    const exchangeRateRecordDeterminer: ExchangeRateRecordDeterminer = instantiateExchangeRateRecordDeterminer(
      exchangeRateResultSet
    );
    try {
      const actualExchangeRateRecord: ExchangeRate = exchangeRateRecordDeterminer.getBestMatchedExchangeRateRecord(
        eurUsdAConversionParam
      );
    } catch (error) {
      errInput = error;
    }
    expect(errInput.message).toBe(ConversionError.ZERO_CURRENCY_FACTOR);
  });

  it('Reference Currency with zero factor and zero rate', () => {
    let errInput = new Error();
    const exchangeRateResultSet: ExchangeRate[] = [
      eurInrMrmEcbZeroFactorRate,
      usdInrMrmEcbZeroFactorRate,
      eurInrMrmThrZeroFactorRate,
      usdInrMrmThrZeroFactorRate
    ];
    const exchangeRateRecordDeterminer: ExchangeRateRecordDeterminer = instantiateExchangeRateRecordDeterminer(
      exchangeRateResultSet
    );
    try {
      const actualExchangeRateRecord: ExchangeRate = exchangeRateRecordDeterminer.getBestMatchedExchangeRateRecord(
        eurUsdAConversionParam
      );
    } catch (error) {
      errInput = error;
    }
    expect(errInput.message).toBe(ConversionError.ZERO_RATE_REFERENCE_CURRENCY);
  });

  it('Reference Currency with Direct Rate No From and To Reference Pair', () => {
    const exchangeRateResultSet: ExchangeRate[] = [
      eurUsdMrmThrIndirectTrueRate,
      eurUsdMrmThrIndirectFalseRate,
      eurUsdMrmEcbIndirectTrueRate,
      eurUsdMrmEcbIndirectFalseRate
    ];
    const exchangeRateRecordDeterminer: ExchangeRateRecordDeterminer = instantiateExchangeRateRecordDeterminer(
      exchangeRateResultSet
    );
    const actualExchangeRateRecord: ExchangeRate = exchangeRateRecordDeterminer.getBestMatchedExchangeRateRecord(
      eurUsdAConversionParam
    );
    expect(eurUsdMrmThrIndirectFalseRate).toEqual(actualExchangeRateRecord);
  });

  it('Reference Currency with duplicate from reference pair', () => {
    let errInput = new Error();
    const exchangeRateResultSet: ExchangeRate[] = [
      eurUsdMrmThrIndirectTrueRate,
      eurUsdMrmThrIndirectFalseRate,
      eurInrMrmThrARate,
      usdInrMrmThrARate,
      eurInrMrmThrADuplicateRate,
      eurUsdMrmEcbIndirectTrueRate,
      eurUsdMrmEcbIndirectFalseRate,
      eurInrMrmEcbARate,
      usdInrMrmEcbARate,
      eurInrMrmEcbADuplicateRate
    ];
    const exchangeRateRecordDeterminer: ExchangeRateRecordDeterminer = instantiateExchangeRateRecordDeterminer(
      exchangeRateResultSet
    );
    try {
      const actualExchangeRateRecord: ExchangeRate = exchangeRateRecordDeterminer.getBestMatchedExchangeRateRecord(
        eurUsdAConversionParam
      );
    } catch (error) {
      errInput = error;
    }
    expect(errInput.message).toBe(ConversionError.DUPLICATE_CONVERSION_RECORD_FOUND);
  });

  it('Reference Currency with duplicate to reference pair', () => {
    let errInput = new Error();
    const exchangeRateResultSet: ExchangeRate[] = [
      eurUsdMrmThrIndirectTrueRate,
      eurUsdMrmThrIndirectFalseRate,
      eurInrMrmThrARate,
      usdInrMrmThrARate,
      usdInrMrmThrDuplicateDateRate,
      eurUsdMrmEcbIndirectTrueRate,
      eurUsdMrmEcbIndirectFalseRate,
      eurInrMrmEcbARate,
      usdInrMrmEcbARate,
      usdInrMrmEcbDuplicateDateRate
    ];
    const exchangeRateRecordDeterminer: ExchangeRateRecordDeterminer = instantiateExchangeRateRecordDeterminer(
      exchangeRateResultSet
    );
    try {
      const actualExchangeRateRecord: ExchangeRate = exchangeRateRecordDeterminer.getBestMatchedExchangeRateRecord(
        eurUsdAConversionParam
      );
    } catch (error) {
      errInput = error;
    }
    expect(errInput.message).toBe(ConversionError.DUPLICATE_CONVERSION_RECORD_FOUND);
  });

  it('Reference Currency with duplicate from and to reference pair', () => {
    let errInput = new Error();
    const exchangeRateResultSet: ExchangeRate[] = [
      eurUsdMrmThrIndirectTrueRate,
      eurUsdMrmThrIndirectFalseRate,
      eurInrMrmThrARate,
      usdInrMrmThrARate,
      eurInrMrmThrADuplicateRate,
      usdInrMrmThrADuplicateRate,
      eurUsdMrmEcbIndirectTrueRate,
      eurUsdMrmEcbIndirectFalseRate,
      eurInrMrmEcbARate,
      usdInrMrmEcbARate,
      eurInrMrmEcbADuplicateRate,
      usdInrMrmEcbADuplicateRate
    ];
    const exchangeRateRecordDeterminer: ExchangeRateRecordDeterminer = instantiateExchangeRateRecordDeterminer(
      exchangeRateResultSet
    );
    try {
      const actualExchangeRateRecord: ExchangeRate = exchangeRateRecordDeterminer.getBestMatchedExchangeRateRecord(
        eurUsdAConversionParam
      );
    } catch (error) {
      errInput = error;
    }
    expect(errInput.message).toBe(ConversionError.DUPLICATE_CONVERSION_RECORD_FOUND);
  });

  /* Combination of indirect in 'From' and 'To' Currency */

  it('From Reference Rate as Indirect and To Reference Rate as Indirect', () => {
    const exchangeRateResultSet: ExchangeRate[] = [
      eurInrMrmThrIndirectTrueRate,
      usdInrMrmThrIndirectTrueRate,
      eurInrMrmEcbIndirectTrueRate,
      usdInrMrmEcbIndirectTrueRate
    ];
    const exchangeRateRecordDeterminer: ExchangeRateRecordDeterminer = instantiateExchangeRateRecordDeterminer(
      exchangeRateResultSet
    );
    const expectedExchangeRate: ExchangeRate = new ExchangeRate(
      TENANT_ID,
      MRM,
      THR,
      A,
      S_2,
      EUR,
      USD,
      S_2020_01_01T02_30_00Z,
      false,
      1,
      1
    );
    const actualExchangeRateRecord: ExchangeRate = exchangeRateRecordDeterminer.getBestMatchedExchangeRateRecord(
      eurUsdAConversionParam
    );
    expect(expectedExchangeRate).toEqual(actualExchangeRateRecord);
  });

  it('From Reference Rate as Indirect and To Reference Rate as direct', () => {
    const exchangeRateResultSet: ExchangeRate[] = [
      eurInrMrmThrIndirectTrueRate,
      usdInrMrmThrIndirectFalseRate,
      eurInrMrmEcbIndirectTrueRate,
      usdInrMrmEcbIndirectFalseRate
    ];
    const exchangeRateRecordDeterminer: ExchangeRateRecordDeterminer = instantiateExchangeRateRecordDeterminer(
      exchangeRateResultSet
    );
    const expectedExchangeRate: ExchangeRate = new ExchangeRate(
      TENANT_ID,
      MRM,
      THR,
      A,
      S_0_02,
      EUR,
      USD,
      S_2020_01_01T02_30_00Z,
      false,
      1,
      1
    );
    const actualExchangeRateRecord: ExchangeRate = exchangeRateRecordDeterminer.getBestMatchedExchangeRateRecord(
      eurUsdAConversionParam
    );
    expect(expectedExchangeRate).toEqual(actualExchangeRateRecord);
  });

  it('From Reference Rate as direct and To Reference Rate as indirect', () => {
    const exchangeRateResultSet: ExchangeRate[] = [
      eurInrMrmThrIndirectFalseRate,
      usdInrMrmThrIndirectTrueRate,
      eurInrMrmEcbIndirectFalseRate,
      usdInrMrmEcbIndirectTrueRate
    ];
    const exchangeRateRecordDeterminer: ExchangeRateRecordDeterminer = instantiateExchangeRateRecordDeterminer(
      exchangeRateResultSet
    );
    const expectedExchangeRate: ExchangeRate = new ExchangeRate(
      TENANT_ID,
      MRM,
      THR,
      A,
      S_50,
      EUR,
      USD,
      S_2020_01_01T02_30_00Z,
      false,
      1,
      1
    );
    const actualExchangeRateRecord: ExchangeRate = exchangeRateRecordDeterminer.getBestMatchedExchangeRateRecord(
      eurUsdAConversionParam
    );
    expect(expectedExchangeRate).toEqual(actualExchangeRateRecord);
  });

  it('From Reference Rate as direct and To Reference Rate as direct', () => {
    const exchangeRateResultSet: ExchangeRate[] = [
      eurInrMrmThrIndirectFalseRate,
      usdInrMrmThrIndirectFalseRate,
      eurInrMrmEcbIndirectFalseRate,
      usdInrMrmEcbIndirectFalseRate
    ];
    const exchangeRateRecordDeterminer: ExchangeRateRecordDeterminer = instantiateExchangeRateRecordDeterminer(
      exchangeRateResultSet
    );
    const expectedExchangeRate: ExchangeRate = new ExchangeRate(
      TENANT_ID,
      MRM,
      THR,
      A,
      S_0_5,
      EUR,
      USD,
      S_2020_01_01T02_30_00Z,
      false,
      1,
      1
    );
    const actualExchangeRateRecord: ExchangeRate = exchangeRateRecordDeterminer.getBestMatchedExchangeRateRecord(
      eurUsdAConversionParam
    );
    expect(expectedExchangeRate).toEqual(actualExchangeRateRecord);
  });

  it('From Reference Rate as direct and To Reference Rate as direct Infinite decimal', () => {
    const exchangeRateResultSet: ExchangeRate[] = [
      eurInrMrmThrIndirectFalseRateInfiniteDecimal,
      usdInrMrmThrIndirectFalseRateInfiniteDecimal,
      eurInrMrmEcbIndirectFalseRateInfiniteDecimal,
      usdInrMrmEcbIndirectFalseRateInfiniteDecimal
    ];
    const exchangeRateRecordDeterminer: ExchangeRateRecordDeterminer = instantiateExchangeRateRecordDeterminer(
      exchangeRateResultSet
    );
    const expectedExchangeRate: ExchangeRate = new ExchangeRate(
      TENANT_ID,
      MRM,
      THR,
      A,
      S_1,
      EUR,
      USD,
      S_2020_01_01T02_30_00Z,
      false,
      1,
      1
    );
    const actualExchangeRateRecord: ExchangeRate = exchangeRateRecordDeterminer.getBestMatchedExchangeRateRecord(
      eurUsdAConversionParam
    );
    expect(expectedExchangeRate).toEqual(actualExchangeRateRecord);
  });

  it('From Reference Rate as indirect and To Reference Rate as indirect factor more than one', () => {
    const exchangeRateResultSet: ExchangeRate[] = [
      eurInrMrmThrIndirectTrueFactorMoreThanOneRate,
      usdInrMrmThrIndirectTrueFactorMoreThanOneRate,
      eurInrMrmEcbIndirectTrueFactorMoreThanOneRate,
      usdInrMrmEcbIndirectTrueFactorMoreThanOneRate
    ];
    const exchangeRateRecordDeterminer: ExchangeRateRecordDeterminer = instantiateExchangeRateRecordDeterminer(
      exchangeRateResultSet
    );
    const expectedExchangeRate: ExchangeRate = new ExchangeRate(
      TENANT_ID,
      MRM,
      THR,
      A,
      S_8,
      EUR,
      USD,
      S_2020_01_01T02_30_00Z,
      false,
      1,
      1
    );
    const actualExchangeRateRecord: ExchangeRate = exchangeRateRecordDeterminer.getBestMatchedExchangeRateRecord(
      eurUsdAConversionParam
    );
    expect(expectedExchangeRate).toEqual(actualExchangeRateRecord);
  });

  it('From Reference Rate as indirect and To Reference Rate as direct factor more than one', () => {
    const exchangeRateResultSet: ExchangeRate[] = [
      eurInrMrmThrIndirectTrueFactorMoreThanOneRate,
      usdInrMrmThrIndirectFalseFactorMoreThanOneRate,
      eurInrMrmEcbIndirectTrueFactorMoreThanOneRate,
      usdInrMrmEcbIndirectFalseFactorMoreThanOneRate
    ];
    const exchangeRateRecordDeterminer: ExchangeRateRecordDeterminer = instantiateExchangeRateRecordDeterminer(
      exchangeRateResultSet
    );
    const expectedExchangeRate: ExchangeRate = new ExchangeRate(
      TENANT_ID,
      MRM,
      THR,
      A,
      S_0_08,
      EUR,
      USD,
      S_2020_01_01T02_30_00Z,
      false,
      1,
      1
    );
    const actualExchangeRateRecord: ExchangeRate = exchangeRateRecordDeterminer.getBestMatchedExchangeRateRecord(
      eurUsdAConversionParam
    );
    expect(expectedExchangeRate).toEqual(actualExchangeRateRecord);
  });

  it('From Reference Rate as direct and To Reference Rate as indirect factor more than one', () => {
    const exchangeRateResultSet: ExchangeRate[] = [
      eurInrMrmThrIndirectFalseFactorMoreThanOneRate,
      usdInrMrmThrIndirectTrueFactorMoreThanOneRate,
      eurInrMrmEcbIndirectFalseFactorMoreThanOneRate,
      usdInrMrmEcbIndirectTrueFactorMoreThanOneRate
    ];
    const exchangeRateRecordDeterminer: ExchangeRateRecordDeterminer = instantiateExchangeRateRecordDeterminer(
      exchangeRateResultSet
    );
    const expectedExchangeRate: ExchangeRate = new ExchangeRate(
      TENANT_ID,
      MRM,
      THR,
      A,
      S_200,
      EUR,
      USD,
      S_2020_01_01T02_30_00Z,
      false,
      1,
      1
    );
    const actualExchangeRateRecord: ExchangeRate = exchangeRateRecordDeterminer.getBestMatchedExchangeRateRecord(
      eurUsdAConversionParam
    );
    expect(expectedExchangeRate).toEqual(actualExchangeRateRecord);
  });

  it('From Reference Rate as direct and To Reference Rate as direct factor more than one', () => {
    const exchangeRateResultSet: ExchangeRate[] = [
      eurInrMrmThrIndirectFalseFactorMoreThanOneRate,
      usdInrMrmThrIndirectFalseFactorMoreThanOneRate,
      eurInrMrmEcbIndirectFalseFactorMoreThanOneRate,
      usdInrMrmEcbIndirectFalseFactorMoreThanOneRate
    ];
    const exchangeRateRecordDeterminer: ExchangeRateRecordDeterminer = instantiateExchangeRateRecordDeterminer(
      exchangeRateResultSet
    );
    const expectedExchangeRate: ExchangeRate = new ExchangeRate(
      TENANT_ID,
      MRM,
      THR,
      A,
      S_2,
      EUR,
      USD,
      S_2020_01_01T02_30_00Z,
      false,
      1,
      1
    );
    const actualExchangeRateRecord: ExchangeRate = exchangeRateRecordDeterminer.getBestMatchedExchangeRateRecord(
      eurUsdAConversionParam
    );
    expect(expectedExchangeRate).toEqual(actualExchangeRateRecord);
  });
});