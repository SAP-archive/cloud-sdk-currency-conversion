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
  buildExchangeRateTypeDetail
} from '@sap-cloud-sdk/currency-conversion-models';
import { ConversionError } from '../../src/constants/conversion-error';
import { CurrencyConverter } from '../../src/core/currency-converter';
import * as constants from './test-data';

const currencyConverter: CurrencyConverter = new CurrencyConverter();

function buildAdapter(exchangeRates: ExchangeRate[]): DataAdapter {
  const adapter: DataAdapter = {} as DataAdapter;

  adapter.getExchangeRatesForTenant = (
    params: ConversionParameterForNonFixedRate[],
    tenant: Tenant,
    tenantSettings: TenantSettings
  ): Promise<ExchangeRate[]> => Promise.resolve(exchangeRates);

  adapter.getDefaultSettingsForTenant = (tenant: Tenant): Promise<TenantSettings> =>
    Promise.resolve(constants.defaultTenantSettings);

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

describe('Non Fixed Rate -- Inverted Rate conversion default tenant settings', () => {
  it('Inverted Single Conversion With Inverted Currency Pair', async () => {
    const expectedConversionResult: SingleNonFixedRateConversionResult = new SingleNonFixedRateConversionResult(
      constants.eurUsdMrmEcbIndirectFalseInvertedTrueRate,
      constants.A_1,
      constants.A_1
    );
    const result: SingleNonFixedRateConversionResult = await currencyConverter.convertCurrencyWithNonFixedRate(
      constants.usdEurMConversionParam,
      buildAdapter([constants.eurUsdMrmEcbIndirectFalseInvertedTrueRate]),
      constants.TENANT_ID
    );
    expect(result).toBeTruthy();
    expect(result).toEqual(expectedConversionResult);
  });

  it('Inverted Single Conversion With Direct Currency Pair', async () => {
    const expectedConversionResult: SingleNonFixedRateConversionResult = new SingleNonFixedRateConversionResult(
      constants.usdEurMrmEcbIndirectFalseInvertedTrueRate,
      constants.A_10000,
      constants.A_10000
    );
    const result: SingleNonFixedRateConversionResult = await currencyConverter.convertCurrencyWithNonFixedRate(
      constants.usdEurMConversionParam,
      buildAdapter([
        constants.eurUsdMrmEcbIndirectFalseInvertedTrueRate,
        constants.usdEurMrmEcbIndirectFalseInvertedTrueRate
      ]),
      constants.TENANT_ID
    );
    expect(result).toBeTruthy();
    expect(result).toEqual(expectedConversionResult);
  });

  it('Inverted Bulk Conversion With Inverted Currency Pair', async () => {
    const expectedConversionResult: SingleNonFixedRateConversionResult = new SingleNonFixedRateConversionResult(
      constants.eurUsdMrmEcbIndirectFalseInvertedTrueRate,
      constants.A_1,
      constants.A_1
    );
    const result: BulkConversionResult<
      ConversionParameterForNonFixedRate,
      SingleNonFixedRateConversionResult
    > = await currencyConverter.convertCurrenciesWithNonFixedRate(
      [constants.usdEurMConversionParam],
      buildAdapter([constants.eurUsdMrmEcbIndirectFalseInvertedTrueRate]),
      constants.TENANT_ID
    );
    expect(result.get(constants.usdEurMConversionParam)).toBeTruthy();
    expect(result.get(constants.usdEurMConversionParam)).toEqual(expectedConversionResult);
  });

  it('Inverted Bulk Conversion With Direct Currency Pair', async () => {
    const expectedConversionResult: SingleNonFixedRateConversionResult = new SingleNonFixedRateConversionResult(
      constants.usdEurMrmEcbIndirectFalseInvertedTrueRate,
      constants.A_10000,
      constants.A_10000
    );
    const result: BulkConversionResult<
      ConversionParameterForNonFixedRate,
      SingleNonFixedRateConversionResult
    > = await currencyConverter.convertCurrenciesWithNonFixedRate(
      [constants.usdEurMConversionParam],
      buildAdapter([
        constants.eurUsdMrmEcbIndirectFalseInvertedTrueRate,
        constants.usdEurMrmEcbIndirectFalseInvertedTrueRate
      ]),
      constants.TENANT_ID
    );
    expect(result.get(constants.usdEurMConversionParam)).toBeTruthy();
    expect(result.get(constants.usdEurMConversionParam)).toEqual(expectedConversionResult);
  });

  it('Conversion With Exchange Rate Record Having Future Date', async () => {
    const result: BulkConversionResult<
      ConversionParameterForNonFixedRate,
      SingleNonFixedRateConversionResult
    > = await currencyConverter.convertCurrenciesWithNonFixedRate(
      [constants.usdEurBConvParamPastDate],
      buildAdapter([constants.eurUsdMrmEcbIndirectFalseInvertedTrueRate]),
      constants.TENANT_ID
    );
    expect(result.get(constants.usdEurBConvParamPastDate)).toBeInstanceOf(CurrencyConversionError);
    expect((result.get(constants.usdEurBConvParamPastDate) as CurrencyConversionError).message).toBe(
      ConversionError.NO_MATCHING_EXCHANGE_RATE_RECORD
    );
  });

  it('Inverted Conversion With New Exchange Rate Type', async () => {
    const expectedConversionResult: SingleNonFixedRateConversionResult = new SingleNonFixedRateConversionResult(
      constants.eurUsdMrmEcbNewRateType,
      constants.A_10000,
      constants.A_10000
    );
    const result: BulkConversionResult<
      ConversionParameterForNonFixedRate,
      SingleNonFixedRateConversionResult
    > = await currencyConverter.convertCurrenciesWithNonFixedRate(
      [constants.eurUsdMrmEcbABCConvParam],
      buildAdapter([constants.eurUsdMrmEcbNewRateType]),
      constants.TENANT_ID
    );
    expect(result.get(constants.eurUsdMrmEcbABCConvParam)).toBeTruthy();
    expect(result.get(constants.eurUsdMrmEcbABCConvParam)).toEqual(expectedConversionResult);
  });

  it('Conversion For Indirect True Inverted True Inverted Currency Pair', async () => {
    const expectedConversionResult: SingleNonFixedRateConversionResult = new SingleNonFixedRateConversionResult(
      constants.eurUsdMrmEcbIndirectTrueInvertedTrueRate,
      constants.A_10000,
      constants.A_10000
    );
    const result: BulkConversionResult<
      ConversionParameterForNonFixedRate,
      SingleNonFixedRateConversionResult
    > = await currencyConverter.convertCurrenciesWithNonFixedRate(
      [constants.usdEurMConversionParam],
      buildAdapter([constants.eurUsdMrmEcbIndirectTrueInvertedTrueRate]),
      constants.TENANT_ID
    );
    expect(result.get(constants.usdEurMConversionParam)).toBeTruthy();
    expect(result.get(constants.usdEurMConversionParam)).toEqual(expectedConversionResult);
  });

  it('Conversion For Indirect True Inverted False Inverted Currency Pair', async () => {
    const result: BulkConversionResult<
      ConversionParameterForNonFixedRate,
      SingleNonFixedRateConversionResult
    > = await currencyConverter.convertCurrenciesWithNonFixedRate(
      [constants.usdEurBConversionParam],
      buildAdapter([constants.eurUsdMrmEcbIndirectTrueInvertedFalseRate]),
      constants.TENANT_ID
    );
    expect(result.get(constants.usdEurBConversionParam)).toBeInstanceOf(CurrencyConversionError);
    expect((result.get(constants.usdEurBConversionParam) as CurrencyConversionError).message).toBe(
      ConversionError.NO_MATCHING_EXCHANGE_RATE_RECORD
    );
  });

  it('Conversion For Indirect False Inverted True Inverted Currency Pair', async () => {
    const expectedConversionResult: SingleNonFixedRateConversionResult = new SingleNonFixedRateConversionResult(
      constants.eurUsdMrmEcbIndirectFalseInvertedTrueRate,
      constants.A_1,
      constants.A_1
    );
    const result: BulkConversionResult<
      ConversionParameterForNonFixedRate,
      SingleNonFixedRateConversionResult
    > = await currencyConverter.convertCurrenciesWithNonFixedRate(
      [constants.usdEurMConversionParam],
      buildAdapter([constants.eurUsdMrmEcbIndirectFalseInvertedTrueRate]),
      constants.TENANT_ID
    );
    expect(result.get(constants.usdEurMConversionParam)).toBeTruthy();
    expect(result.get(constants.usdEurMConversionParam)).toEqual(expectedConversionResult);
  });

  it('Conversion For Indirect False Inverted False Inverted Currency Pair', async () => {
    const result: BulkConversionResult<
      ConversionParameterForNonFixedRate,
      SingleNonFixedRateConversionResult
    > = await currencyConverter.convertCurrenciesWithNonFixedRate(
      [constants.usdEurBConversionParam],
      buildAdapter([constants.eurUsdMrmEcbIndirectFalseInvertedFalseRate]),
      constants.TENANT_ID
    );
    expect(result.get(constants.usdEurBConversionParam)).toBeInstanceOf(CurrencyConversionError);
    expect((result.get(constants.usdEurBConversionParam) as CurrencyConversionError).message).toBe(
      ConversionError.NO_MATCHING_EXCHANGE_RATE_RECORD
    );
  });

  it('Conversion For Indirect True Inverted True Inverted Currency Pair Factor More Than One Rate', async () => {
    const expectedConversionResult: SingleNonFixedRateConversionResult = new SingleNonFixedRateConversionResult(
      constants.eurUsdMrmEcbIndirectTrueInvertedTrueFactorMoreThanOneRate,
      constants.A_300,
      constants.A_300
    );
    const result: BulkConversionResult<
      ConversionParameterForNonFixedRate,
      SingleNonFixedRateConversionResult
    > = await currencyConverter.convertCurrenciesWithNonFixedRate(
      [constants.usdEurMConversionParam],
      buildAdapter([constants.eurUsdMrmEcbIndirectTrueInvertedTrueFactorMoreThanOneRate]),
      constants.TENANT_ID
    );
    expect(result.get(constants.usdEurMConversionParam)).toBeTruthy();
    expect(result.get(constants.usdEurMConversionParam)).toEqual(expectedConversionResult);
  });

  it('Conversion For Indirect False Inverted True Inverted Currency Pair Factor More Than One Rate', async () => {
    const expectedConversionResult: SingleNonFixedRateConversionResult = new SingleNonFixedRateConversionResult(
      constants.eurUsdMrmEcbIndirectFalseInvertedTrueFactorMoreThanOneRate,
      constants.A_0_333333333333,
      constants.A_0_33
    );
    const result: BulkConversionResult<
      ConversionParameterForNonFixedRate,
      SingleNonFixedRateConversionResult
    > = await currencyConverter.convertCurrenciesWithNonFixedRate(
      [constants.usdEurMConversionParam],
      buildAdapter([constants.eurUsdMrmEcbIndirectFalseInvertedTrueFactorMoreThanOneRate]),
      constants.TENANT_ID
    );
    expect(result.get(constants.usdEurMConversionParam)).toBeTruthy();
    expect(result.get(constants.usdEurMConversionParam)).toEqual(expectedConversionResult);
  });

  it('Conversion For Indirect False Inverted False Inverted Currency Pair Factor More Than One Rate', async () => {
    const result: BulkConversionResult<
      ConversionParameterForNonFixedRate,
      SingleNonFixedRateConversionResult
    > = await currencyConverter.convertCurrenciesWithNonFixedRate(
      [constants.usdEurBConversionParam],
      buildAdapter([constants.eurUsdMrmEcbIndirectFalseInvertedFalseFactorMoreThanOneRate]),
      constants.TENANT_ID
    );
    expect(result.get(constants.usdEurBConversionParam)).toBeInstanceOf(CurrencyConversionError);
    expect((result.get(constants.usdEurBConversionParam) as CurrencyConversionError).message).toBe(
      ConversionError.NO_MATCHING_EXCHANGE_RATE_RECORD
    );
  });

  it('Conversion For Indirect True Inverted True Direct Currency Pair', async () => {
    const expectedConversionResult: SingleNonFixedRateConversionResult = new SingleNonFixedRateConversionResult(
      constants.usdEurMrmEcbIndirectTrueInvertedTrueExcRate,
      constants.A_1,
      constants.A_1
    );
    const result: BulkConversionResult<
      ConversionParameterForNonFixedRate,
      SingleNonFixedRateConversionResult
    > = await currencyConverter.convertCurrenciesWithNonFixedRate(
      [constants.usdEurMConversionParam],
      buildAdapter([
        constants.usdEurMrmEcbIndirectTrueInvertedTrueExcRate,
        constants.eurUsdMrmEcbIndirectTrueInvertedTrueRate
      ]),
      constants.TENANT_ID
    );
    expect(result.get(constants.usdEurMConversionParam)).toBeTruthy();
    expect(result.get(constants.usdEurMConversionParam)).toEqual(expectedConversionResult);
  });

  it('Conversion For Indirect True Inverted False Direct Currency Pair', async () => {
    const expectedConversionResult: SingleNonFixedRateConversionResult = new SingleNonFixedRateConversionResult(
      constants.usdEurMrmEcbIndirectTrueInvertedFalseExcRate,
      constants.A_1,
      constants.A_1
    );
    const result: BulkConversionResult<
      ConversionParameterForNonFixedRate,
      SingleNonFixedRateConversionResult
    > = await currencyConverter.convertCurrenciesWithNonFixedRate(
      [constants.usdEurBConversionParam],
      buildAdapter([
        constants.usdEurMrmEcbIndirectTrueInvertedFalseExcRate,
        constants.eurUsdMrmEcbIndirectTrueInvertedFalseRate
      ]),
      constants.TENANT_ID
    );
    expect(result.get(constants.usdEurBConversionParam)).toBeTruthy();
    expect(result.get(constants.usdEurBConversionParam)).toEqual(expectedConversionResult);
  });

  it('Conversion For Indirect False Inverted True Direct Currency Pair', async () => {
    const expectedConversionResult: SingleNonFixedRateConversionResult = new SingleNonFixedRateConversionResult(
      constants.usdEurMrmEcbIndirectFalseInvertedTrueRate,
      constants.A_10000,
      constants.A_10000
    );
    const result: BulkConversionResult<
      ConversionParameterForNonFixedRate,
      SingleNonFixedRateConversionResult
    > = await currencyConverter.convertCurrenciesWithNonFixedRate(
      [constants.usdEurMConversionParam],
      buildAdapter([
        constants.usdEurMrmEcbIndirectFalseInvertedTrueRate,
        constants.eurUsdMrmEcbIndirectFalseInvertedTrueRate
      ]),
      constants.TENANT_ID
    );
    expect(result.get(constants.usdEurMConversionParam)).toBeTruthy();
    expect(result.get(constants.usdEurMConversionParam)).toEqual(expectedConversionResult);
  });

  it('Conversion For Indirect False Inverted False Direct Currency Pair', async () => {
    const expectedConversionResult: SingleNonFixedRateConversionResult = new SingleNonFixedRateConversionResult(
      constants.usdEurMrmEcbIndirectFalseInvertedFalseExcRate,
      constants.A_10000,
      constants.A_10000
    );
    const result: BulkConversionResult<
      ConversionParameterForNonFixedRate,
      SingleNonFixedRateConversionResult
    > = await currencyConverter.convertCurrenciesWithNonFixedRate(
      [constants.usdEurBConversionParam],
      buildAdapter([
        constants.usdEurMrmEcbIndirectFalseInvertedFalseExcRate,
        constants.eurUsdMrmEcbIndirectFalseInvertedFalseRate
      ]),
      constants.TENANT_ID
    );
    expect(result.get(constants.usdEurBConversionParam)).toBeTruthy();
    expect(result.get(constants.usdEurBConversionParam)).toEqual(expectedConversionResult);
  });

  it('Conversion For Indirect True Inverted True Direct Currency Pair Factor More Than One Rate', async () => {
    const expectedConversionResult: SingleNonFixedRateConversionResult = new SingleNonFixedRateConversionResult(
      constants.usdEurMrmEcbIndirectTrueInvertedTrueFactorMoreThanOneExcRate,
      constants.A_50,
      constants.A_50
    );
    const result: BulkConversionResult<
      ConversionParameterForNonFixedRate,
      SingleNonFixedRateConversionResult
    > = await currencyConverter.convertCurrenciesWithNonFixedRate(
      [constants.usdEurMConversionParam],
      buildAdapter([
        constants.usdEurMrmEcbIndirectTrueInvertedTrueFactorMoreThanOneExcRate,
        constants.eurUsdMrmEcbIndirectTrueInvertedTrueFactorMoreThanOneRate
      ]),
      constants.TENANT_ID
    );
    expect(result.get(constants.usdEurMConversionParam)).toBeTruthy();
    expect(result.get(constants.usdEurMConversionParam)).toEqual(expectedConversionResult);
  });

  it('Conversion For Indirect True Inverted False Direct Currency Pair Factor More Than One Rate', async () => {
    const expectedConversionResult: SingleNonFixedRateConversionResult = new SingleNonFixedRateConversionResult(
      constants.usdEurMrmEcbIndirectTrueInvertedFalseFactorMoreThanOneExcRate,
      constants.A_50,
      constants.A_50
    );
    const result: BulkConversionResult<
      ConversionParameterForNonFixedRate,
      SingleNonFixedRateConversionResult
    > = await currencyConverter.convertCurrenciesWithNonFixedRate(
      [constants.usdEurBConversionParam],
      buildAdapter([
        constants.usdEurMrmEcbIndirectTrueInvertedFalseFactorMoreThanOneExcRate,
        constants.eurUsdMrmEcbIndirectTrueInvertedFalseFactorMoreThanOneRate
      ]),
      constants.TENANT_ID
    );
    expect(result.get(constants.usdEurBConversionParam)).toBeTruthy();
    expect(result.get(constants.usdEurBConversionParam)).toEqual(expectedConversionResult);
  });

  it('Conversion For Indirect False Inverted True Direct Currency Pair Factor More Than One Rate', async () => {
    const expectedConversionResult: SingleNonFixedRateConversionResult = new SingleNonFixedRateConversionResult(
      constants.usdEurMrmEcbIndirectFalseInvertedTrueFactorMoreThanOneRate,
      constants.A_20000,
      constants.A_20000
    );
    const result: BulkConversionResult<
      ConversionParameterForNonFixedRate,
      SingleNonFixedRateConversionResult
    > = await currencyConverter.convertCurrenciesWithNonFixedRate(
      [constants.usdEurMConversionParam],
      buildAdapter([
        constants.usdEurMrmEcbIndirectFalseInvertedTrueFactorMoreThanOneRate,
        constants.eurUsdMrmEcbIndirectFalseInvertedTrueFactorMoreThanOneRate
      ]),
      constants.TENANT_ID
    );
    expect(result.get(constants.usdEurMConversionParam)).toBeTruthy();
    expect(result.get(constants.usdEurMConversionParam)).toEqual(expectedConversionResult);
  });

  it('Conversion For Indirect False Inverted False Direct Currency Pair Factor More Than One Rate', async () => {
    const expectedConversionResult: SingleNonFixedRateConversionResult = new SingleNonFixedRateConversionResult(
      constants.usdEurMrmEcbIndirectFalseInvertedFalseFactorMoreThanOneRate,
      constants.A_20000,
      constants.A_20000
    );
    const result: BulkConversionResult<
      ConversionParameterForNonFixedRate,
      SingleNonFixedRateConversionResult
    > = await currencyConverter.convertCurrenciesWithNonFixedRate(
      [constants.usdEurBConversionParam],
      buildAdapter([
        constants.usdEurMrmEcbIndirectFalseInvertedFalseFactorMoreThanOneRate,
        constants.eurUsdMrmEcbIndirectFalseInvertedFalseFactorMoreThanOneRate
      ]),
      constants.TENANT_ID
    );
    expect(result.get(constants.usdEurBConversionParam)).toBeTruthy();
    expect(result.get(constants.usdEurBConversionParam)).toEqual(expectedConversionResult);
  });
});
