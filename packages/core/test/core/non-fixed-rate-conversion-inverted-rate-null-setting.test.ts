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
      constants.eurUsdMrmThrIndirectFalseInvertedTrueExcRate,
      constants.A_1,
      constants.A_1
    );
    const result: SingleNonFixedRateConversionResult = await currencyConverter.convertCurrencyWithNonFixedRate(
      constants.usdEurMConversionParameter,
      buildAdapter([
        constants.eurUsdMrmThrIndirectFalseInvertedTrueExcRate,
        constants.eurUsdMrmEcbIndirectFalseInvertedTrueRate
      ]),
      constants.TENANT_ID
    );
    expect(result).toBeTruthy();
    expect(result).toEqual(expectedConversionResult);
  });

  it('Inverted Single Conversion With Direct Currency Pair', async () => {
    const expectedConversionResult: SingleNonFixedRateConversionResult = new SingleNonFixedRateConversionResult(
      constants.usdEurMrmEcbIndirectFalseInvertedTrueExcRate,
      constants.A_10000,
      constants.A_10000
    );
    const result: SingleNonFixedRateConversionResult = await currencyConverter.convertCurrencyWithNonFixedRate(
      constants.usdEurMConversionParameter,
      buildAdapter([
        constants.eurUsdMrmThrIndirectFalseInvertedTrueExcRate,
        constants.usdEurMrmThrIndirectFalseInvertedTrueRate,
        constants.eurUsdMrmEcbIndirectFalseInvertedTrueRate,
        constants.usdEurMrmEcbIndirectFalseInvertedTrueExcRate
      ]),
      constants.TENANT_ID
    );
    expect(result).toBeTruthy();
    expect(result).toEqual(expectedConversionResult);
  });

  it('Inverted Bulk Conversion With Inverted Currency Pair', async () => {
    const expectedConversionResult: SingleNonFixedRateConversionResult = new SingleNonFixedRateConversionResult(
      constants.eurUsdMrmThrIndirectFalseInvertedTrueExcRate,
      constants.A_1,
      constants.A_1
    );
    const result: BulkConversionResult<
      ConversionParameterForNonFixedRate,
      SingleNonFixedRateConversionResult
    > = await currencyConverter.convertCurrenciesWithNonFixedRate(
      [constants.usdEurMConversionParameter],
      buildAdapter([
        constants.eurUsdMrmThrIndirectFalseInvertedTrueExcRate,
        constants.eurUsdMrmEcbIndirectFalseInvertedTrueRate
      ]),
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
      buildAdapter([
        constants.usdEurMrmEcbIndirectTrueInvertedTrueRate,
        constants.usdEurMrmEcbIndirectTrueInvertedTrueDuplicateDateRate
      ]),
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
      buildAdapter([
        constants.eurUsdMrmThrIndirectFalseInvertedTrueExcRate,
        constants.eurUsdMrmEcbIndirectFalseInvertedTrueRate
      ]),
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
      buildAdapter([
        constants.usdEurMrmEcbMultipleProviderDirectRate,
        constants.usdEurMrmThrMultipleProviderDirectRate
      ]),
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
        constants.eurUsdMrmEcbIndirectTrueInvertedTrueDuplicateDateRate
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
      buildAdapter([
        constants.eurUsdMrmEcbMultipleProviderIndirectRate,
        constants.eurUsdMrmThrMultipleProviderIndirectRate
      ]),
      constants.TENANT_ID
    );
    expect(result.get(constants.usdEurMConversionParameter)).toBeInstanceOf(CurrencyConversionError);
    expect((result.get(constants.usdEurMConversionParameter) as CurrencyConversionError).message).toBe(
      ConversionError.MULTIPLE_CONVERSION_RECORD_FOUND
    );
  });

  it('Inverted Bulk Conversion With Direct Currency Pair', async () => {
    const expectedConversionResult: SingleNonFixedRateConversionResult = new SingleNonFixedRateConversionResult(
      constants.usdEurMrmEcbIndirectFalseInvertedTrueExcRate,
      constants.A_10000,
      constants.A_10000
    );
    const result: BulkConversionResult<
      ConversionParameterForNonFixedRate,
      SingleNonFixedRateConversionResult
    > = await currencyConverter.convertCurrenciesWithNonFixedRate(
      [constants.usdEurMConversionParameter],
      buildAdapter([
        constants.eurUsdMrmThrIndirectFalseInvertedTrueExcRate,
        constants.usdEurMrmThrIndirectFalseInvertedTrueRate,
        constants.eurUsdMrmEcbIndirectFalseInvertedTrueRate,
        constants.usdEurMrmEcbIndirectFalseInvertedTrueExcRate
      ]),
      constants.TENANT_ID
    );
    expect(result.get(constants.usdEurMConversionParameter)).toBeTruthy();
    expect(result.get(constants.usdEurMConversionParameter)).toEqual(expectedConversionResult);
  });

  it('Inverted Bulk Conversion With New Exchange Rate', async () => {
    const expectedConversionResult: SingleNonFixedRateConversionResult = new SingleNonFixedRateConversionResult(
      constants.eurUsdMrmEcbNewExcRate,
      constants.A_10000,
      constants.A_10000
    );
    const result: BulkConversionResult<
      ConversionParameterForNonFixedRate,
      SingleNonFixedRateConversionResult
    > = await currencyConverter.convertCurrenciesWithNonFixedRate(
      [constants.eurUsdMrmThrABCConvParam],
      buildAdapter([constants.eurUsdMrmThrNewExcRateType, constants.eurUsdMrmEcbNewExcRate]),
      constants.TENANT_ID
    );
    expect(result.get(constants.eurUsdMrmThrABCConvParam)).toBeTruthy();
    expect(result.get(constants.eurUsdMrmThrABCConvParam)).toEqual(expectedConversionResult);
  });

  it('Conversion For Indirect True Inverted True Inverted Currency Pair', async () => {
    const expectedConversionResult: SingleNonFixedRateConversionResult = new SingleNonFixedRateConversionResult(
      constants.eurUsdMrmThrIndirectTrueInvertedTrueExcRate,
      constants.A_10000,
      constants.A_10000
    );
    const result: BulkConversionResult<
      ConversionParameterForNonFixedRate,
      SingleNonFixedRateConversionResult
    > = await currencyConverter.convertCurrenciesWithNonFixedRate(
      [constants.usdEurMConversionParameter],
      buildAdapter([
        constants.eurUsdMrmThrIndirectTrueInvertedTrueExcRate,
        constants.eurUsdMrmEcbIndirectTrueInvertedTrueRate
      ]),
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
      buildAdapter([
        constants.eurUsdMrmThrIndirectTrueInvertedFalseExcRate,
        constants.eurUsdMrmEcbIndirectTrueInvertedFalseRate
      ]),
      constants.TENANT_ID
    );
    expect(result.get(constants.usdEurBConversionParam)).toBeInstanceOf(CurrencyConversionError);
    expect((result.get(constants.usdEurBConversionParam) as CurrencyConversionError).message).toBe(
      ConversionError.NO_MATCHING_EXCHANGE_RATE_RECORD
    );
  });

  it('Conversion For Indirect False Inverted True Inverted Currency Pair', async () => {
    const expectedConversionResult: SingleNonFixedRateConversionResult = new SingleNonFixedRateConversionResult(
      constants.eurUsdMrmThrIndirectFalseInvertedTrueExcRate,
      constants.A_1,
      constants.A_1
    );
    const result: BulkConversionResult<
      ConversionParameterForNonFixedRate,
      SingleNonFixedRateConversionResult
    > = await currencyConverter.convertCurrenciesWithNonFixedRate(
      [constants.usdEurMConversionParameter],
      buildAdapter([
        constants.eurUsdMrmThrIndirectFalseInvertedTrueExcRate,
        constants.eurUsdMrmEcbIndirectFalseInvertedTrueRate
      ]),
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
        constants.eurUsdMrmThrIndirectFalseInvertedFalseExcRate,
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
      constants.eurUsdMrmThrIndirectTrueInvertedTrueFactorMoreThanOneExcRate,
      constants.A_300,
      constants.A_300
    );
    const result: BulkConversionResult<
      ConversionParameterForNonFixedRate,
      SingleNonFixedRateConversionResult
    > = await currencyConverter.convertCurrenciesWithNonFixedRate(
      [constants.usdEurMConversionParameter],
      buildAdapter([
        constants.eurUsdMrmThrIndirectTrueInvertedTrueFactorMoreThanOneExcRate,
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
        constants.eurUsdMrmThrIndirectTrueInvertedFalseFactorMoreThanOneExcRate,
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
      constants.eurUsdMrmThrIndirectFalseInvertedTrueFactorMoreThanOneExcRate,
      constants.A_0_333333333333,
      constants.A_0_33
    );
    const result: BulkConversionResult<
      ConversionParameterForNonFixedRate,
      SingleNonFixedRateConversionResult
    > = await currencyConverter.convertCurrenciesWithNonFixedRate(
      [constants.usdEurMConversionParameter],
      buildAdapter([
        constants.eurUsdMrmThrIndirectFalseInvertedTrueFactorMoreThanOneExcRate,
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
        constants.eurUsdMrmThrIndirectFalseInvertedFalseFactorMoreThanOneExcRate,
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
      constants.usdEurMrmEcbIndirectTrueInvertedTrueRate,
      constants.A_1,
      constants.A_1
    );
    const result: BulkConversionResult<
      ConversionParameterForNonFixedRate,
      SingleNonFixedRateConversionResult
    > = await currencyConverter.convertCurrenciesWithNonFixedRate(
      [constants.usdEurMConversionParameter],
      buildAdapter([
        constants.usdEurMrmThrIndirectTrueInvertedTrueRate,
        constants.eurUsdMrmThrIndirectTrueInvertedTrueExcRate,
        constants.usdEurMrmEcbIndirectTrueInvertedTrueRate,
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
      constants.A_1,
      constants.A_1
    );
    const result: BulkConversionResult<
      ConversionParameterForNonFixedRate,
      SingleNonFixedRateConversionResult
    > = await currencyConverter.convertCurrenciesWithNonFixedRate(
      [constants.usdEurBConversionParam],
      buildAdapter([
        constants.usdEurMrmThrIndirectTrueInvertedFalseRate,
        constants.eurUsdMrmThrIndirectTrueInvertedFalseExcRate,
        constants.usdEurMrmEcbIndirectTrueInvertedFalseRate,
        constants.eurUsdMrmEcbIndirectTrueInvertedFalseRate
      ]),
      constants.TENANT_ID
    );
    expect(result.get(constants.usdEurBConversionParam)).toBeTruthy();
    expect(result.get(constants.usdEurBConversionParam)).toEqual(expectedConversionResult);
  });

  it('Conversion For Indirect False Inverted True Direct Currency Pair', async () => {
    const expectedConversionResult: SingleNonFixedRateConversionResult = new SingleNonFixedRateConversionResult(
      constants.usdEurMrmEcbIndirectFalseInvertedTrueExcRate,
      constants.A_10000,
      constants.A_10000
    );
    const result: BulkConversionResult<
      ConversionParameterForNonFixedRate,
      SingleNonFixedRateConversionResult
    > = await currencyConverter.convertCurrenciesWithNonFixedRate(
      [constants.usdEurMConversionParameter],
      buildAdapter([
        constants.usdEurMrmThrIndirectFalseInvertedTrueRate,
        constants.eurUsdMrmThrIndirectFalseInvertedTrueExcRate,
        constants.usdEurMrmEcbIndirectFalseInvertedTrueExcRate,
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
      constants.A_10000,
      constants.A_10000
    );
    const result: BulkConversionResult<
      ConversionParameterForNonFixedRate,
      SingleNonFixedRateConversionResult
    > = await currencyConverter.convertCurrenciesWithNonFixedRate(
      [constants.usdEurBConversionParam],
      buildAdapter([
        constants.usdEurMrmThrIndirectFalseInvertedFalseRate,
        constants.eurUsdMrmThrIndirectFalseInvertedFalseExcRate,
        constants.usdEurMrmEcbIndirectFalseInvertedFalseRate,
        constants.eurUsdMrmEcbIndirectFalseInvertedFalseRate
      ]),
      constants.TENANT_ID
    );
    expect(result.get(constants.usdEurBConversionParam)).toBeTruthy();
    expect(result.get(constants.usdEurBConversionParam)).toEqual(expectedConversionResult);
  });

  it('Conversion For Indirect True Inverted True Direct Currency Pair Factor More Than One Rate', async () => {
    const expectedConversionResult: SingleNonFixedRateConversionResult = new SingleNonFixedRateConversionResult(
      constants.usdEurMrmEcbIndirectTrueInvertedTrueFactorMoreThanOneRate,
      constants.A_50,
      constants.A_50
    );
    const result: BulkConversionResult<
      ConversionParameterForNonFixedRate,
      SingleNonFixedRateConversionResult
    > = await currencyConverter.convertCurrenciesWithNonFixedRate(
      [constants.usdEurMConversionParameter],
      buildAdapter([
        constants.usdEurMrmThrIndirectTrueInvertedTrueFactorMoreThanOneRate,
        constants.eurUsdMrmThrIndirectTrueInvertedTrueFactorMoreThanOneExcRate,
        constants.usdEurMrmEcbIndirectTrueInvertedTrueFactorMoreThanOneRate,
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
      constants.A_50,
      constants.A_50
    );
    const result: BulkConversionResult<
      ConversionParameterForNonFixedRate,
      SingleNonFixedRateConversionResult
    > = await currencyConverter.convertCurrenciesWithNonFixedRate(
      [constants.usdEurBConversionParam],
      buildAdapter([
        constants.usdEurMrmThrIndirectTrueInvertedFalseFactorMoreThanOneRate,
        constants.eurUsdMrmThrIndirectTrueInvertedFalseFactorMoreThanOneExcRate,
        constants.usdEurMrmEcbIndirectTrueInvertedFalseFactorMoreThanOneRate,
        constants.eurUsdMrmEcbIndirectTrueInvertedFalseFactorMoreThanOneRate
      ]),
      constants.TENANT_ID
    );
    expect(result.get(constants.usdEurBConversionParam)).toBeTruthy();
    expect(result.get(constants.usdEurBConversionParam)).toEqual(expectedConversionResult);
  });

  it('Conversion For Indirect False Inverted True Direct Currency Pair Factor More Than One Rate', async () => {
    const expectedConversionResult: SingleNonFixedRateConversionResult = new SingleNonFixedRateConversionResult(
      constants.usdEurMrmEcbIndirectFalseInvertedTrueFactorMoreThanOneExcRate,
      constants.A_20000,
      constants.A_20000
    );
    const result: BulkConversionResult<
      ConversionParameterForNonFixedRate,
      SingleNonFixedRateConversionResult
    > = await currencyConverter.convertCurrenciesWithNonFixedRate(
      [constants.usdEurMConversionParameter],
      buildAdapter([
        constants.usdEurMrmThrIndirectFalseInvertedTrueFactorMoreThanOneRate,
        constants.eurUsdMrmThrIndirectFalseInvertedTrueFactorMoreThanOneExcRate,
        constants.usdEurMrmEcbIndirectFalseInvertedTrueFactorMoreThanOneExcRate,
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
      constants.A_20000,
      constants.A_20000
    );
    const result: BulkConversionResult<
      ConversionParameterForNonFixedRate,
      SingleNonFixedRateConversionResult
    > = await currencyConverter.convertCurrenciesWithNonFixedRate(
      [constants.usdEurBConversionParam],
      buildAdapter([
        constants.usdEurMrmThrIndirectFalseInvertedFalseFactorMoreThanOneRate,
        constants.eurUsdMrmThrIndirectFalseInvertedFalseFactorMoreThanOneExcRate,
        constants.usdEurMrmEcbIndirectFalseInvertedFalseFactorMoreThanOneExcRate,
        constants.eurUsdMrmEcbIndirectFalseInvertedFalseFactorMoreThanOneRate
      ]),
      constants.TENANT_ID
    );
    expect(result.get(constants.usdEurBConversionParam)).toBeTruthy();
    expect(result.get(constants.usdEurBConversionParam)).toEqual(expectedConversionResult);
  });
});
