/* Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved. */
import { Tenant } from '@sap-cloud-sdk/core';
import {
  BulkConversionResult,
  CurrencyConversionError,
  DataAdapter,
  ExchangeRate,
  SingleNonFixedRateConversionResult,
  TenantSettings,
  ExchangeRateTypeDetail,
  ConversionParameterForNonFixedRate,
  buildExchangeRateTypeDetail,
  buildConversionParameterForNonFixedRate,
  setDefaultSettings
} from '@sap-cloud-sdk/currency-conversion-models';
import { ConversionError } from '../../src/constants/conversion-error';
import { CurrencyConverter } from '../../src/core/currency-converter';
import * as constants from './test-data';

const DATE_2020_01_02: Date = new Date('2020-01-02T02:30:00Z');

const eurUsdMrmThrABCConvParam: ConversionParameterForNonFixedRate = buildConversionParameterForNonFixedRate(
  'USD',
  'EUR',
  '100',
  'ABC',
  constants.DATE_2020_01_01
);

const usdEurMrmEcbMultipleProviderDirectRate: ExchangeRate = {
  settings: {
    tenantIdentifier: constants.TENANT_ID,
    isIndirect: true,
    fromCurrencyfactor: 1,
    toCurrencyfactor: 1
  },
  data: {
    ratesDataProviderCode: constants.MRM,
    ratesDataSource: constants.ECB,
    exchangeRateType: constants.M
  },
  value: constants.VALUE_100,
  fromCurrency: constants.USD,
  toCurrency: constants.EUR,
  validFromDateTime: DATE_2020_01_02
};

const usdEurMrmEcbIndirectTrueInvertedTrueDuplicateDateRate: ExchangeRate = {
  settings: {
    tenantIdentifier: constants.TENANT_ID,
    isIndirect: true,
    fromCurrencyfactor: 1,
    toCurrencyfactor: 1
  },
  data: {
    ratesDataProviderCode: constants.MRM,
    ratesDataSource: constants.ECB,
    exchangeRateType: constants.M
  },
  value: constants.VALUE_100,
  fromCurrency: constants.USD,
  toCurrency: constants.EUR,
  validFromDateTime: DATE_2020_01_02
};

const usdEurMrmEcbIndirectTrueInvertedTrueRate: ExchangeRate = {
  settings: {
    tenantIdentifier: constants.TENANT_ID,
    isIndirect: true,
    fromCurrencyfactor: 1,
    toCurrencyfactor: 1
  },
  data: {
    ratesDataProviderCode: constants.MRM,
    ratesDataSource: constants.ECB,
    exchangeRateType: constants.M
  },
  value: constants.VALUE_100,
  fromCurrency: constants.USD,
  toCurrency: constants.EUR,
  validFromDateTime: DATE_2020_01_02
};

const usdEurMrmEcbIndirectTrueInvertedFalseRate: ExchangeRate = {
  settings: {
    tenantIdentifier: constants.TENANT_ID,
    isIndirect: true,
    fromCurrencyfactor: 1,
    toCurrencyfactor: 1
  },
  data: {
    ratesDataProviderCode: constants.MRM,
    ratesDataSource: constants.ECB,
    exchangeRateType: constants.B
  },
  value: constants.VALUE_100,
  fromCurrency: constants.USD,
  toCurrency: constants.EUR,
  validFromDateTime: DATE_2020_01_02
};

const usdEurMrmEcbIndirectFalseInvertedTrueExcRate: ExchangeRate = {
  settings: setDefaultSettings(constants.TENANT_ID),
  data: {
    ratesDataProviderCode: constants.MRM,
    ratesDataSource: constants.ECB,
    exchangeRateType: constants.M
  },
  value: constants.VALUE_100,
  fromCurrency: constants.USD,
  toCurrency: constants.EUR,
  validFromDateTime: DATE_2020_01_02
};

const usdEurMrmEcbIndirectFalseInvertedFalseRate: ExchangeRate = {
  settings: setDefaultSettings(constants.TENANT_ID),
  data: {
    ratesDataProviderCode: constants.MRM,
    ratesDataSource: constants.ECB,
    exchangeRateType: constants.B
  },
  value: constants.VALUE_100,
  fromCurrency: constants.USD,
  toCurrency: constants.EUR,
  validFromDateTime: DATE_2020_01_02
};

const usdEurMrmEcbIndirectTrueInvertedTrueFactorMoreThanOneRate: ExchangeRate = {
  settings: {
    tenantIdentifier: constants.TENANT_ID,
    isIndirect: true,
    fromCurrencyfactor: 1,
    toCurrencyfactor: 10
  },
  data: {
    ratesDataProviderCode: constants.MRM,
    ratesDataSource: constants.ECB,
    exchangeRateType: constants.M
  },
  value: constants.VALUE_20,
  fromCurrency: constants.USD,
  toCurrency: constants.EUR,
  validFromDateTime: DATE_2020_01_02
};

const usdEurMrmEcbIndirectTrueInvertedFalseFactorMoreThanOneRate: ExchangeRate = {
  settings: {
    tenantIdentifier: constants.TENANT_ID,
    isIndirect: true,
    fromCurrencyfactor: 1,
    toCurrencyfactor: 10
  },
  data: {
    ratesDataProviderCode: constants.MRM,
    ratesDataSource: constants.ECB,
    exchangeRateType: constants.B
  },
  value: constants.VALUE_20,
  fromCurrency: constants.USD,
  toCurrency: constants.EUR,
  validFromDateTime: DATE_2020_01_02
};

const usdEurMrmEcbIndirectFalseInvertedTrueFactorMoreThanOneExcRate: ExchangeRate = {
  settings: {
    tenantIdentifier: constants.TENANT_ID,
    isIndirect: false,
    fromCurrencyfactor: 1,
    toCurrencyfactor: 10
  },
  data: {
    ratesDataProviderCode: constants.MRM,
    ratesDataSource: constants.ECB,
    exchangeRateType: constants.M
  },
  value: constants.VALUE_20,
  fromCurrency: constants.USD,
  toCurrency: constants.EUR,
  validFromDateTime: DATE_2020_01_02
};

const usdEurMrmEcbIndirectFalseInvertedFalseFactorMoreThanOneExcRate: ExchangeRate = {
  settings: {
    tenantIdentifier: constants.TENANT_ID,
    isIndirect: false,
    fromCurrencyfactor: 1,
    toCurrencyfactor: 10
  },
  data: {
    ratesDataProviderCode: constants.MRM,
    ratesDataSource: constants.ECB,
    exchangeRateType: constants.B
  },
  value: constants.VALUE_20,
  fromCurrency: constants.USD,
  toCurrency: constants.EUR,
  validFromDateTime: DATE_2020_01_02
};

const eurUsdMrmEcbMultipleProviderIndirectRate: ExchangeRate = {
  settings: {
    tenantIdentifier: constants.TENANT_ID,
    isIndirect: true,
    fromCurrencyfactor: 10,
    toCurrencyfactor: 100
  },
  data: {
    ratesDataProviderCode: constants.MRM,
    ratesDataSource: constants.ECB,
    exchangeRateType: constants.M
  },
  value: constants.VALUE_30,
  fromCurrency: constants.EUR,
  toCurrency: constants.USD,
  validFromDateTime: constants.DATE_2020_01_01
};

const eurUsdMrmEcbIndirectTrueInvertedTrueDuplicateDateRate: ExchangeRate = {
  settings: {
    tenantIdentifier: constants.TENANT_ID,
    isIndirect: true,
    fromCurrencyfactor: 1,
    toCurrencyfactor: 1
  },
  data: {
    ratesDataProviderCode: constants.MRM,
    ratesDataSource: constants.ECB,
    exchangeRateType: constants.M
  },
  value: constants.VALUE_100,
  fromCurrency: constants.EUR,
  toCurrency: constants.USD,
  validFromDateTime: constants.DATE_2020_01_01
};

const eurUsdMrmEcbNewExcRate: ExchangeRate = {
  settings: setDefaultSettings(constants.TENANT_ID),
  data: {
    ratesDataProviderCode: constants.MRM,
    ratesDataSource: constants.ECB,
    exchangeRateType: 'ABC'
  },
  value: constants.VALUE_100,
  fromCurrency: constants.USD,
  toCurrency: constants.EUR,
  validFromDateTime: constants.DATE_2020_01_01
};

const usdEurMrmThrMultipleProviderDirectRate: ExchangeRate = {
  settings: {
    tenantIdentifier: constants.TENANT_ID,
    isIndirect: true,
    fromCurrencyfactor: 1,
    toCurrencyfactor: 1
  },
  data: {
    ratesDataProviderCode: constants.MRM,
    ratesDataSource: constants.THR,
    exchangeRateType: constants.M
  },
  value: constants.VALUE_100,
  fromCurrency: constants.USD,
  toCurrency: constants.EUR,
  validFromDateTime: DATE_2020_01_02
};

const eurUsdMrmThrMultipleProviderIndirectRate: ExchangeRate = {
  settings: {
    tenantIdentifier: constants.TENANT_ID,
    isIndirect: true,
    fromCurrencyfactor: 1,
    toCurrencyfactor: 1
  },
  data: {
    ratesDataProviderCode: constants.MRM,
    ratesDataSource: constants.THR,
    exchangeRateType: constants.M
  },
  value: constants.VALUE_100,
  fromCurrency: constants.EUR,
  toCurrency: constants.USD,
  validFromDateTime: constants.DATE_2020_01_01
};

const eurUsdMrmThrIndirectTrueInvertedTrueExcRate: ExchangeRate = {
  settings: {
    tenantIdentifier: constants.TENANT_ID,
    isIndirect: true,
    fromCurrencyfactor: 1,
    toCurrencyfactor: 1
  },
  data: {
    ratesDataProviderCode: constants.MRM,
    ratesDataSource: constants.THR,
    exchangeRateType: constants.M
  },
  value: constants.VALUE_100,
  fromCurrency: constants.EUR,
  toCurrency: constants.USD,
  validFromDateTime: DATE_2020_01_02
};

const eurUsdMrmThrIndirectTrueInvertedFalseExcRate: ExchangeRate = {
  settings: {
    tenantIdentifier: constants.TENANT_ID,
    isIndirect: true,
    fromCurrencyfactor: 1,
    toCurrencyfactor: 1
  },
  data: {
    ratesDataProviderCode: constants.MRM,
    ratesDataSource: constants.THR,
    exchangeRateType: constants.B
  },
  value: constants.VALUE_100,
  fromCurrency: constants.EUR,
  toCurrency: constants.USD,
  validFromDateTime: DATE_2020_01_02
};

const eurUsdMrmThrIndirectFalseInvertedTrueExcRate: ExchangeRate = {
  settings: setDefaultSettings(constants.TENANT_ID),
  data: {
    ratesDataProviderCode: constants.MRM,
    ratesDataSource: constants.THR,
    exchangeRateType: constants.M
  },
  value: constants.VALUE_100,
  fromCurrency: constants.EUR,
  toCurrency: constants.USD,
  validFromDateTime: DATE_2020_01_02
};

const eurUsdMrmThrIndirectFalseInvertedFalseExcRate: ExchangeRate = {
  settings: setDefaultSettings(constants.TENANT_ID),
  data: {
    ratesDataProviderCode: constants.MRM,
    ratesDataSource: constants.THR,
    exchangeRateType: constants.B
  },
  value: constants.VALUE_100,
  fromCurrency: constants.EUR,
  toCurrency: constants.USD,
  validFromDateTime: DATE_2020_01_02
};

const eurUsdMrmThrIndirectTrueInvertedTrueFactorMoreThanOneExcRate: ExchangeRate = {
  settings: {
    tenantIdentifier: constants.TENANT_ID,
    isIndirect: true,
    fromCurrencyfactor: 10,
    toCurrencyfactor: 100
  },
  data: {
    ratesDataProviderCode: constants.MRM,
    ratesDataSource: constants.THR,
    exchangeRateType: constants.M
  },
  value: constants.VALUE_30,
  fromCurrency: constants.EUR,
  toCurrency: constants.USD,
  validFromDateTime: DATE_2020_01_02
};

const eurUsdMrmThrIndirectTrueInvertedFalseFactorMoreThanOneExcRate: ExchangeRate = {
  settings: {
    tenantIdentifier: constants.TENANT_ID,
    isIndirect: true,
    fromCurrencyfactor: 10,
    toCurrencyfactor: 100
  },
  data: {
    ratesDataProviderCode: constants.MRM,
    ratesDataSource: constants.THR,
    exchangeRateType: constants.B
  },
  value: constants.VALUE_30,
  fromCurrency: constants.EUR,
  toCurrency: constants.USD,
  validFromDateTime: DATE_2020_01_02
};

const eurUsdMrmThrIndirectFalseInvertedTrueFactorMoreThanOneExcRate: ExchangeRate = {
  settings: {
    tenantIdentifier: constants.TENANT_ID,
    isIndirect: false,
    fromCurrencyfactor: 10,
    toCurrencyfactor: 100
  },
  data: {
    ratesDataProviderCode: constants.MRM,
    ratesDataSource: constants.THR,
    exchangeRateType: constants.M
  },
  value: constants.VALUE_30,
  fromCurrency: constants.EUR,
  toCurrency: constants.USD,
  validFromDateTime: DATE_2020_01_02
};

const eurUsdMrmThrIndirectFalseInvertedFalseFactorMoreThanOneExcRate: ExchangeRate = {
  settings: {
    tenantIdentifier: constants.TENANT_ID,
    isIndirect: false,
    fromCurrencyfactor: 10,
    toCurrencyfactor: 100
  },
  data: {
    ratesDataProviderCode: constants.MRM,
    ratesDataSource: constants.THR,
    exchangeRateType: constants.B
  },
  value: constants.VALUE_30,
  fromCurrency: constants.EUR,
  toCurrency: constants.USD,
  validFromDateTime: DATE_2020_01_02
};

const eurUsdMrmThrNewExcRateType: ExchangeRate = {
  settings: setDefaultSettings(constants.TENANT_ID),
  data: {
    ratesDataProviderCode: constants.MRM,
    ratesDataSource: constants.THR,
    exchangeRateType: 'ABC'
  },
  value: constants.VALUE_100,
  fromCurrency: constants.USD,
  toCurrency: constants.EUR,
  validFromDateTime: DATE_2020_01_02
};

const currencyConverter: CurrencyConverter = new CurrencyConverter();

function buildAdapter(exchangeRates: ExchangeRate[]): DataAdapter {
  const adapter: DataAdapter = {} as DataAdapter;

  adapter.getExchangeRatesForTenant = (
    params: ConversionParameterForNonFixedRate[],
    tenant: Tenant,
    tenantSettings: TenantSettings | null | undefined
  ): Promise<ExchangeRate[]> => Promise.resolve(exchangeRates);

  adapter.getDefaultSettingsForTenant = (tenant: Tenant): Promise<TenantSettings> => Promise.resolve(null as any);

  adapter.getExchangeRateTypeDetailsForTenant = (
    tenant: Tenant,
    rateTypeSet: string[]
  ): Promise<Map<string, ExchangeRateTypeDetail>> => {
    const exchangeRateTypeDetailMap: Map<string, ExchangeRateTypeDetail> = new Map();
    exchangeRateTypeDetailMap.set(constants.B, buildExchangeRateTypeDetail(null as any, false));
    exchangeRateTypeDetailMap.set(constants.M, buildExchangeRateTypeDetail(null as any, true));
    return Promise.resolve(exchangeRateTypeDetailMap);
  };
  return adapter;
}

describe('Non Fixed Rate -- Inverted Rate conversion null tenant settings', () => {
  it('Inverted Single Conversion With Inverted Currency Pair', async () => {
    const expectedConversionResult: SingleNonFixedRateConversionResult = new SingleNonFixedRateConversionResult(
      eurUsdMrmThrIndirectFalseInvertedTrueExcRate,
      constants.AMOUNT_1,
      constants.AMOUNT_1
    );
    const result: SingleNonFixedRateConversionResult = await currencyConverter.convertCurrencyWithNonFixedRate(
      constants.usdEurMConversionParameter,
      buildAdapter([eurUsdMrmThrIndirectFalseInvertedTrueExcRate, constants.eurUsdMrmEcbIndirectFalseInvertedTrueRate]),
      constants.TENANT_ID
    );
    expect(result).toBeTruthy();
    expect(result).toEqual(expectedConversionResult);
  });

  it('Inverted Single Conversion With Direct Currency Pair', async () => {
    const expectedConversionResult: SingleNonFixedRateConversionResult = new SingleNonFixedRateConversionResult(
      usdEurMrmEcbIndirectFalseInvertedTrueExcRate,
      constants.AMOUNT_10000,
      constants.AMOUNT_10000
    );
    const result: SingleNonFixedRateConversionResult = await currencyConverter.convertCurrencyWithNonFixedRate(
      constants.usdEurMConversionParameter,
      buildAdapter([
        eurUsdMrmThrIndirectFalseInvertedTrueExcRate,
        constants.usdEurMrmThrIndirectFalseInvertedTrueRate,
        constants.eurUsdMrmEcbIndirectFalseInvertedTrueRate,
        usdEurMrmEcbIndirectFalseInvertedTrueExcRate
      ]),
      constants.TENANT_ID
    );
    expect(result).toBeTruthy();
    expect(result).toEqual(expectedConversionResult);
  });

  it('Inverted Bulk Conversion With Inverted Currency Pair', async () => {
    const expectedConversionResult: SingleNonFixedRateConversionResult = new SingleNonFixedRateConversionResult(
      eurUsdMrmThrIndirectFalseInvertedTrueExcRate,
      constants.AMOUNT_1,
      constants.AMOUNT_1
    );
    const result: BulkConversionResult<
      ConversionParameterForNonFixedRate,
      SingleNonFixedRateConversionResult
    > = await currencyConverter.convertCurrenciesWithNonFixedRate(
      [constants.usdEurMConversionParameter],
      buildAdapter([eurUsdMrmThrIndirectFalseInvertedTrueExcRate, constants.eurUsdMrmEcbIndirectFalseInvertedTrueRate]),
      constants.TENANT_ID
    );
    expect(result.get(constants.usdEurMConversionParameter)).toBeTruthy();
    expect(result.get(constants.usdEurMConversionParameter)).toEqual(expectedConversionResult);
  });

  it('Inverted Bulk Conversion With Direct Currency Pair Duplicate Record', async () => {
    const result: BulkConversionResult<
      ConversionParameterForNonFixedRate,
      SingleNonFixedRateConversionResult
    > = await currencyConverter.convertCurrenciesWithNonFixedRate(
      [constants.usdEurMConversionParameter],
      buildAdapter([usdEurMrmEcbIndirectTrueInvertedTrueRate, usdEurMrmEcbIndirectTrueInvertedTrueDuplicateDateRate]),
      constants.TENANT_ID
    );
    expect(result.get(constants.usdEurMConversionParameter)).toBeInstanceOf(CurrencyConversionError);
    expect((result.get(constants.usdEurMConversionParameter) as CurrencyConversionError).message).toBe(
      ConversionError.DUPLICATE_CONVERSION_RECORD_FOUND
    );
  });

  it('Conversion With Exchange Rate Record Having Future Date', async () => {
    const result: BulkConversionResult<
      ConversionParameterForNonFixedRate,
      SingleNonFixedRateConversionResult
    > = await currencyConverter.convertCurrenciesWithNonFixedRate(
      [constants.usdEurBConvParamPastDate],
      buildAdapter([eurUsdMrmThrIndirectFalseInvertedTrueExcRate, constants.eurUsdMrmEcbIndirectFalseInvertedTrueRate]),
      constants.TENANT_ID
    );
    expect(result.get(constants.usdEurBConvParamPastDate)).toBeInstanceOf(CurrencyConversionError);
    expect((result.get(constants.usdEurBConvParamPastDate) as CurrencyConversionError).message).toBe(
      ConversionError.NO_MATCHING_EXCHANGE_RATE_RECORD
    );
  });

  it('Inverted Conversion With Direct Currency Pair And Multiple Data Provider', async () => {
    const result: BulkConversionResult<
      ConversionParameterForNonFixedRate,
      SingleNonFixedRateConversionResult
    > = await currencyConverter.convertCurrenciesWithNonFixedRate(
      [constants.usdEurMConversionParameter],
      buildAdapter([usdEurMrmEcbMultipleProviderDirectRate, usdEurMrmThrMultipleProviderDirectRate]),
      constants.TENANT_ID
    );
    expect(result.get(constants.usdEurMConversionParameter)).toBeInstanceOf(CurrencyConversionError);
    expect((result.get(constants.usdEurMConversionParameter) as CurrencyConversionError).message).toBe(
      ConversionError.MULTIPLE_CONVERSION_RECORD_FOUND
    );
  });

  it('Inverted Bulk Conversion With Indirect Currency Pair Duplicate Record', async () => {
    const result: BulkConversionResult<
      ConversionParameterForNonFixedRate,
      SingleNonFixedRateConversionResult
    > = await currencyConverter.convertCurrenciesWithNonFixedRate(
      [constants.usdEurMConversionParameter],
      buildAdapter([
        constants.eurUsdMrmEcbIndirectTrueInvertedTrueRate,
        eurUsdMrmEcbIndirectTrueInvertedTrueDuplicateDateRate
      ]),
      constants.TENANT_ID
    );
    expect(result.get(constants.usdEurMConversionParameter)).toBeInstanceOf(CurrencyConversionError);
    expect((result.get(constants.usdEurMConversionParameter) as CurrencyConversionError).message).toBe(
      ConversionError.DUPLICATE_CONVERSION_RECORD_FOUND
    );
  });

  it('Inverted Conversion With Indirect Currency Pair And Multiple Data Provider', async () => {
    const result: BulkConversionResult<
      ConversionParameterForNonFixedRate,
      SingleNonFixedRateConversionResult
    > = await currencyConverter.convertCurrenciesWithNonFixedRate(
      [constants.usdEurMConversionParameter],
      buildAdapter([eurUsdMrmEcbMultipleProviderIndirectRate, eurUsdMrmThrMultipleProviderIndirectRate]),
      constants.TENANT_ID
    );
    expect(result.get(constants.usdEurMConversionParameter)).toBeInstanceOf(CurrencyConversionError);
    expect((result.get(constants.usdEurMConversionParameter) as CurrencyConversionError).message).toBe(
      ConversionError.MULTIPLE_CONVERSION_RECORD_FOUND
    );
  });

  it('Inverted Bulk Conversion With Direct Currency Pair', async () => {
    const expectedConversionResult: SingleNonFixedRateConversionResult = new SingleNonFixedRateConversionResult(
      usdEurMrmEcbIndirectFalseInvertedTrueExcRate,
      constants.AMOUNT_10000,
      constants.AMOUNT_10000
    );
    const result: BulkConversionResult<
      ConversionParameterForNonFixedRate,
      SingleNonFixedRateConversionResult
    > = await currencyConverter.convertCurrenciesWithNonFixedRate(
      [constants.usdEurMConversionParameter],
      buildAdapter([
        eurUsdMrmThrIndirectFalseInvertedTrueExcRate,
        constants.usdEurMrmThrIndirectFalseInvertedTrueRate,
        constants.eurUsdMrmEcbIndirectFalseInvertedTrueRate,
        usdEurMrmEcbIndirectFalseInvertedTrueExcRate
      ]),
      constants.TENANT_ID
    );
    expect(result.get(constants.usdEurMConversionParameter)).toBeTruthy();
    expect(result.get(constants.usdEurMConversionParameter)).toEqual(expectedConversionResult);
  });

  it('Inverted Bulk Conversion With New Exchange Rate', async () => {
    const expectedConversionResult: SingleNonFixedRateConversionResult = new SingleNonFixedRateConversionResult(
      eurUsdMrmEcbNewExcRate,
      constants.AMOUNT_10000,
      constants.AMOUNT_10000
    );
    const result: BulkConversionResult<
      ConversionParameterForNonFixedRate,
      SingleNonFixedRateConversionResult
    > = await currencyConverter.convertCurrenciesWithNonFixedRate(
      [eurUsdMrmThrABCConvParam],
      buildAdapter([eurUsdMrmThrNewExcRateType, eurUsdMrmEcbNewExcRate]),
      constants.TENANT_ID
    );
    expect(result.get(eurUsdMrmThrABCConvParam)).toBeTruthy();
    expect(result.get(eurUsdMrmThrABCConvParam)).toEqual(expectedConversionResult);
  });

  it('Conversion For Indirect True Inverted True Inverted Currency Pair', async () => {
    const expectedConversionResult: SingleNonFixedRateConversionResult = new SingleNonFixedRateConversionResult(
      eurUsdMrmThrIndirectTrueInvertedTrueExcRate,
      constants.AMOUNT_10000,
      constants.AMOUNT_10000
    );
    const result: BulkConversionResult<
      ConversionParameterForNonFixedRate,
      SingleNonFixedRateConversionResult
    > = await currencyConverter.convertCurrenciesWithNonFixedRate(
      [constants.usdEurMConversionParameter],
      buildAdapter([eurUsdMrmThrIndirectTrueInvertedTrueExcRate, constants.eurUsdMrmEcbIndirectTrueInvertedTrueRate]),
      constants.TENANT_ID
    );
    expect(result.get(constants.usdEurMConversionParameter)).toBeTruthy();
    expect(result.get(constants.usdEurMConversionParameter)).toEqual(expectedConversionResult);
  });

  it('Conversion For Indirect True Inverted False Inverted Currency Pair', async () => {
    const result: BulkConversionResult<
      ConversionParameterForNonFixedRate,
      SingleNonFixedRateConversionResult
    > = await currencyConverter.convertCurrenciesWithNonFixedRate(
      [constants.usdEurBConversionParam],
      buildAdapter([eurUsdMrmThrIndirectTrueInvertedFalseExcRate, constants.eurUsdMrmEcbIndirectTrueInvertedFalseRate]),
      constants.TENANT_ID
    );
    expect(result.get(constants.usdEurBConversionParam)).toBeInstanceOf(CurrencyConversionError);
    expect((result.get(constants.usdEurBConversionParam) as CurrencyConversionError).message).toBe(
      ConversionError.NO_MATCHING_EXCHANGE_RATE_RECORD
    );
  });

  it('Conversion For Indirect False Inverted True Inverted Currency Pair', async () => {
    const expectedConversionResult: SingleNonFixedRateConversionResult = new SingleNonFixedRateConversionResult(
      eurUsdMrmThrIndirectFalseInvertedTrueExcRate,
      constants.AMOUNT_1,
      constants.AMOUNT_1
    );
    const result: BulkConversionResult<
      ConversionParameterForNonFixedRate,
      SingleNonFixedRateConversionResult
    > = await currencyConverter.convertCurrenciesWithNonFixedRate(
      [constants.usdEurMConversionParameter],
      buildAdapter([eurUsdMrmThrIndirectFalseInvertedTrueExcRate, constants.eurUsdMrmEcbIndirectFalseInvertedTrueRate]),
      constants.TENANT_ID
    );
    expect(result.get(constants.usdEurMConversionParameter)).toBeTruthy();
    expect(result.get(constants.usdEurMConversionParameter)).toEqual(expectedConversionResult);
  });

  it('Conversion For Indirect False Inverted False Inverted Currency Pair', async () => {
    const result: BulkConversionResult<
      ConversionParameterForNonFixedRate,
      SingleNonFixedRateConversionResult
    > = await currencyConverter.convertCurrenciesWithNonFixedRate(
      [constants.usdEurBConversionParam],
      buildAdapter([
        eurUsdMrmThrIndirectFalseInvertedFalseExcRate,
        constants.eurUsdMrmEcbIndirectFalseInvertedFalseRate
      ]),
      constants.TENANT_ID
    );
    expect(result.get(constants.usdEurBConversionParam)).toBeInstanceOf(CurrencyConversionError);
    expect((result.get(constants.usdEurBConversionParam) as CurrencyConversionError).message).toBe(
      ConversionError.NO_MATCHING_EXCHANGE_RATE_RECORD
    );
  });

  it('Conversion For Indirect True Inverted True Inverted Currency Pair Factor More Than One Rate', async () => {
    const expectedConversionResult: SingleNonFixedRateConversionResult = new SingleNonFixedRateConversionResult(
      eurUsdMrmThrIndirectTrueInvertedTrueFactorMoreThanOneExcRate,
      constants.AMOUNT_300,
      constants.AMOUNT_300
    );
    const result: BulkConversionResult<
      ConversionParameterForNonFixedRate,
      SingleNonFixedRateConversionResult
    > = await currencyConverter.convertCurrenciesWithNonFixedRate(
      [constants.usdEurMConversionParameter],
      buildAdapter([
        eurUsdMrmThrIndirectTrueInvertedTrueFactorMoreThanOneExcRate,
        constants.eurUsdMrmEcbIndirectTrueInvertedTrueFactorMoreThanOneRate
      ]),
      constants.TENANT_ID
    );
    expect(result.get(constants.usdEurMConversionParameter)).toBeTruthy();
    expect(result.get(constants.usdEurMConversionParameter)).toEqual(expectedConversionResult);
  });

  it('Conversion For Indirect True Inverted False Inverted Currency Pair Factor More Than One Rate', async () => {
    const result: BulkConversionResult<
      ConversionParameterForNonFixedRate,
      SingleNonFixedRateConversionResult
    > = await currencyConverter.convertCurrenciesWithNonFixedRate(
      [constants.usdEurBConversionParam],
      buildAdapter([
        eurUsdMrmThrIndirectTrueInvertedFalseFactorMoreThanOneExcRate,
        constants.eurUsdMrmEcbIndirectTrueInvertedFalseFactorMoreThanOneRate
      ]),
      constants.TENANT_ID
    );
    expect(result.get(constants.usdEurBConversionParam)).toBeInstanceOf(CurrencyConversionError);
    expect((result.get(constants.usdEurBConversionParam) as CurrencyConversionError).message).toBe(
      ConversionError.NO_MATCHING_EXCHANGE_RATE_RECORD
    );
  });

  it('Conversion For Indirect False Inverted True Inverted Currency Pair Factor More Than One Rate', async () => {
    const expectedConversionResult: SingleNonFixedRateConversionResult = new SingleNonFixedRateConversionResult(
      eurUsdMrmThrIndirectFalseInvertedTrueFactorMoreThanOneExcRate,
      constants.AMOUNT_0_333333333333,
      constants.AMOUNT_0_33
    );
    const result: BulkConversionResult<
      ConversionParameterForNonFixedRate,
      SingleNonFixedRateConversionResult
    > = await currencyConverter.convertCurrenciesWithNonFixedRate(
      [constants.usdEurMConversionParameter],
      buildAdapter([
        eurUsdMrmThrIndirectFalseInvertedTrueFactorMoreThanOneExcRate,
        constants.eurUsdMrmEcbIndirectFalseInvertedTrueFactorMoreThanOneRate
      ]),
      constants.TENANT_ID
    );
    expect(result.get(constants.usdEurMConversionParameter)).toBeTruthy();
    expect(result.get(constants.usdEurMConversionParameter)).toEqual(expectedConversionResult);
  });

  it('Conversion For Indirect False Inverted False Inverted Currency Pair Factor More Than One Rate', async () => {
    const result: BulkConversionResult<
      ConversionParameterForNonFixedRate,
      SingleNonFixedRateConversionResult
    > = await currencyConverter.convertCurrenciesWithNonFixedRate(
      [constants.usdEurBConversionParam],
      buildAdapter([
        eurUsdMrmThrIndirectFalseInvertedFalseFactorMoreThanOneExcRate,
        constants.eurUsdMrmEcbIndirectFalseInvertedFalseFactorMoreThanOneRate
      ]),
      constants.TENANT_ID
    );
    expect(result.get(constants.usdEurBConversionParam)).toBeInstanceOf(CurrencyConversionError);
    expect((result.get(constants.usdEurBConversionParam) as CurrencyConversionError).message).toBe(
      ConversionError.NO_MATCHING_EXCHANGE_RATE_RECORD
    );
  });

  it('Conversion For Indirect True Inverted True Direct Currency Pair', async () => {
    const expectedConversionResult: SingleNonFixedRateConversionResult = new SingleNonFixedRateConversionResult(
      usdEurMrmEcbIndirectTrueInvertedTrueRate,
      constants.AMOUNT_1,
      constants.AMOUNT_1
    );
    const result: BulkConversionResult<
      ConversionParameterForNonFixedRate,
      SingleNonFixedRateConversionResult
    > = await currencyConverter.convertCurrenciesWithNonFixedRate(
      [constants.usdEurMConversionParameter],
      buildAdapter([
        constants.usdEurMrmThrIndirectTrueInvertedTrueRate,
        eurUsdMrmThrIndirectTrueInvertedTrueExcRate,
        usdEurMrmEcbIndirectTrueInvertedTrueRate,
        constants.eurUsdMrmEcbIndirectTrueInvertedTrueRate
      ]),
      constants.TENANT_ID
    );
    expect(result.get(constants.usdEurMConversionParameter)).toBeTruthy();
    expect(result.get(constants.usdEurMConversionParameter)).toEqual(expectedConversionResult);
  });

  it('Conversion For Indirect True Inverted False Direct Currency Pair', async () => {
    const expectedConversionResult: SingleNonFixedRateConversionResult = new SingleNonFixedRateConversionResult(
      constants.usdEurMrmThrIndirectTrueInvertedFalseRate,
      constants.AMOUNT_1,
      constants.AMOUNT_1
    );
    const result: BulkConversionResult<
      ConversionParameterForNonFixedRate,
      SingleNonFixedRateConversionResult
    > = await currencyConverter.convertCurrenciesWithNonFixedRate(
      [constants.usdEurBConversionParam],
      buildAdapter([
        constants.usdEurMrmThrIndirectTrueInvertedFalseRate,
        eurUsdMrmThrIndirectTrueInvertedFalseExcRate,
        usdEurMrmEcbIndirectTrueInvertedFalseRate,
        constants.eurUsdMrmEcbIndirectTrueInvertedFalseRate
      ]),
      constants.TENANT_ID
    );
    expect(result.get(constants.usdEurBConversionParam)).toBeTruthy();
    expect(result.get(constants.usdEurBConversionParam)).toEqual(expectedConversionResult);
  });

  it('Conversion For Indirect False Inverted True Direct Currency Pair', async () => {
    const expectedConversionResult: SingleNonFixedRateConversionResult = new SingleNonFixedRateConversionResult(
      usdEurMrmEcbIndirectFalseInvertedTrueExcRate,
      constants.AMOUNT_10000,
      constants.AMOUNT_10000
    );
    const result: BulkConversionResult<
      ConversionParameterForNonFixedRate,
      SingleNonFixedRateConversionResult
    > = await currencyConverter.convertCurrenciesWithNonFixedRate(
      [constants.usdEurMConversionParameter],
      buildAdapter([
        constants.usdEurMrmThrIndirectFalseInvertedTrueRate,
        eurUsdMrmThrIndirectFalseInvertedTrueExcRate,
        usdEurMrmEcbIndirectFalseInvertedTrueExcRate,
        constants.eurUsdMrmEcbIndirectFalseInvertedTrueRate
      ]),
      constants.TENANT_ID
    );
    expect(result.get(constants.usdEurMConversionParameter)).toBeTruthy();
    expect(result.get(constants.usdEurMConversionParameter)).toEqual(expectedConversionResult);
  });

  it('Conversion For Indirect False Inverted False Direct Currency Pair', async () => {
    const expectedConversionResult: SingleNonFixedRateConversionResult = new SingleNonFixedRateConversionResult(
      constants.usdEurMrmThrIndirectFalseInvertedFalseRate,
      constants.AMOUNT_10000,
      constants.AMOUNT_10000
    );
    const result: BulkConversionResult<
      ConversionParameterForNonFixedRate,
      SingleNonFixedRateConversionResult
    > = await currencyConverter.convertCurrenciesWithNonFixedRate(
      [constants.usdEurBConversionParam],
      buildAdapter([
        constants.usdEurMrmThrIndirectFalseInvertedFalseRate,
        eurUsdMrmThrIndirectFalseInvertedFalseExcRate,
        usdEurMrmEcbIndirectFalseInvertedFalseRate,
        constants.eurUsdMrmEcbIndirectFalseInvertedFalseRate
      ]),
      constants.TENANT_ID
    );
    expect(result.get(constants.usdEurBConversionParam)).toBeTruthy();
    expect(result.get(constants.usdEurBConversionParam)).toEqual(expectedConversionResult);
  });

  it('Conversion For Indirect True Inverted True Direct Currency Pair Factor More Than One Rate', async () => {
    const expectedConversionResult: SingleNonFixedRateConversionResult = new SingleNonFixedRateConversionResult(
      usdEurMrmEcbIndirectTrueInvertedTrueFactorMoreThanOneRate,
      constants.AMOUNT_50,
      constants.AMOUNT_50
    );
    const result: BulkConversionResult<
      ConversionParameterForNonFixedRate,
      SingleNonFixedRateConversionResult
    > = await currencyConverter.convertCurrenciesWithNonFixedRate(
      [constants.usdEurMConversionParameter],
      buildAdapter([
        constants.usdEurMrmThrIndirectTrueInvertedTrueFactorMoreThanOneRate,
        eurUsdMrmThrIndirectTrueInvertedTrueFactorMoreThanOneExcRate,
        usdEurMrmEcbIndirectTrueInvertedTrueFactorMoreThanOneRate,
        constants.eurUsdMrmEcbIndirectTrueInvertedTrueFactorMoreThanOneRate
      ]),
      constants.TENANT_ID
    );
    expect(result.get(constants.usdEurMConversionParameter)).toBeTruthy();
    expect(result.get(constants.usdEurMConversionParameter)).toEqual(expectedConversionResult);
  });

  it('Conversion For Indirect True Inverted False Direct Currency Pair Factor More Than One Rate', async () => {
    const expectedConversionResult: SingleNonFixedRateConversionResult = new SingleNonFixedRateConversionResult(
      constants.usdEurMrmThrIndirectTrueInvertedFalseFactorMoreThanOneRate,
      constants.AMOUNT_50,
      constants.AMOUNT_50
    );
    const result: BulkConversionResult<
      ConversionParameterForNonFixedRate,
      SingleNonFixedRateConversionResult
    > = await currencyConverter.convertCurrenciesWithNonFixedRate(
      [constants.usdEurBConversionParam],
      buildAdapter([
        constants.usdEurMrmThrIndirectTrueInvertedFalseFactorMoreThanOneRate,
        eurUsdMrmThrIndirectTrueInvertedFalseFactorMoreThanOneExcRate,
        usdEurMrmEcbIndirectTrueInvertedFalseFactorMoreThanOneRate,
        constants.eurUsdMrmEcbIndirectTrueInvertedFalseFactorMoreThanOneRate
      ]),
      constants.TENANT_ID
    );
    expect(result.get(constants.usdEurBConversionParam)).toBeTruthy();
    expect(result.get(constants.usdEurBConversionParam)).toEqual(expectedConversionResult);
  });

  it('Conversion For Indirect False Inverted True Direct Currency Pair Factor More Than One Rate', async () => {
    const expectedConversionResult: SingleNonFixedRateConversionResult = new SingleNonFixedRateConversionResult(
      usdEurMrmEcbIndirectFalseInvertedTrueFactorMoreThanOneExcRate,
      constants.AMOUNT_20000,
      constants.AMOUNT_20000
    );
    const result: BulkConversionResult<
      ConversionParameterForNonFixedRate,
      SingleNonFixedRateConversionResult
    > = await currencyConverter.convertCurrenciesWithNonFixedRate(
      [constants.usdEurMConversionParameter],
      buildAdapter([
        constants.usdEurMrmThrIndirectFalseInvertedTrueFactorMoreThanOneRate,
        eurUsdMrmThrIndirectFalseInvertedTrueFactorMoreThanOneExcRate,
        usdEurMrmEcbIndirectFalseInvertedTrueFactorMoreThanOneExcRate,
        constants.eurUsdMrmEcbIndirectFalseInvertedTrueFactorMoreThanOneRate
      ]),
      constants.TENANT_ID
    );
    expect(result.get(constants.usdEurMConversionParameter)).toBeTruthy();
    expect(result.get(constants.usdEurMConversionParameter)).toEqual(expectedConversionResult);
  });

  it('Conversion For Indirect False Inverted False Direct Currency Pair Factor More Than One Rate', async () => {
    const expectedConversionResult: SingleNonFixedRateConversionResult = new SingleNonFixedRateConversionResult(
      constants.usdEurMrmThrIndirectFalseInvertedFalseFactorMoreThanOneRate,
      constants.AMOUNT_20000,
      constants.AMOUNT_20000
    );
    const result: BulkConversionResult<
      ConversionParameterForNonFixedRate,
      SingleNonFixedRateConversionResult
    > = await currencyConverter.convertCurrenciesWithNonFixedRate(
      [constants.usdEurBConversionParam],
      buildAdapter([
        constants.usdEurMrmThrIndirectFalseInvertedFalseFactorMoreThanOneRate,
        eurUsdMrmThrIndirectFalseInvertedFalseFactorMoreThanOneExcRate,
        usdEurMrmEcbIndirectFalseInvertedFalseFactorMoreThanOneExcRate,
        constants.eurUsdMrmEcbIndirectFalseInvertedFalseFactorMoreThanOneRate
      ]),
      constants.TENANT_ID
    );
    expect(result.get(constants.usdEurBConversionParam)).toBeTruthy();
    expect(result.get(constants.usdEurBConversionParam)).toEqual(expectedConversionResult);
  });
});
