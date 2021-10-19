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

describe('Non Fixed Rate -- Inverted Rate conversion override tenant settings', () => {
  it('Inverted Single Conversion With Inverted Currency Pair', async () => {
    const expectedConversionResult: SingleNonFixedRateConversionResult = new SingleNonFixedRateConversionResult(
      constants.eurUsdMrmThrIndirectFalseInvertedTrueRate,
      constants.AMOUNT_1,
      constants.AMOUNT_1
    );
    const result: SingleNonFixedRateConversionResult = await currencyConverter.convertCurrencyWithNonFixedRate(
      constants.usdEurMConversionParam,
      buildAdapter([
        constants.eurUsdMrmThrIndirectFalseInvertedTrueRate,
        constants.eurUsdMrmEcbIndirectFalseInvertedTrueRate
      ]),
      constants.TENANT_ID,
      constants.overrideTenantSettings
    );
    expect(result).toBeTruthy();
    expect(result).toEqual(expectedConversionResult);
  });

  it('Inverted Single Conversion With Direct Currency Pair', async () => {
    const expectedConversionResult: SingleNonFixedRateConversionResult = new SingleNonFixedRateConversionResult(
      constants.usdEurMrmThrIndirectFalseInvertedTrueRate,
      constants.AMOUNT_10000,
      constants.AMOUNT_10000
    );
    const result: SingleNonFixedRateConversionResult = await currencyConverter.convertCurrencyWithNonFixedRate(
      constants.usdEurMConversionParam,
      buildAdapter([
        constants.eurUsdMrmThrIndirectFalseInvertedTrueRate,
        constants.usdEurMrmThrIndirectFalseInvertedTrueRate,
        constants.eurUsdMrmEcbIndirectFalseInvertedTrueRate,
        constants.usdEurMrmEcbIndirectFalseInvertedTrueRate
      ]),
      constants.TENANT_ID,
      constants.overrideTenantSettings
    );
    expect(result).toBeTruthy();
    expect(result).toEqual(expectedConversionResult);
  });

  it('Inverted Bulk Conversion With Inverted Currency Pair', async () => {
    const expectedConversionResult: SingleNonFixedRateConversionResult = new SingleNonFixedRateConversionResult(
      constants.eurUsdMrmThrIndirectFalseInvertedTrueRate,
      constants.AMOUNT_1,
      constants.AMOUNT_1
    );
    const result: BulkConversionResult<
      ConversionParameterForNonFixedRate,
      SingleNonFixedRateConversionResult
    > = await currencyConverter.convertCurrenciesWithNonFixedRate(
      [constants.usdEurMConversionParam],
      buildAdapter([
        constants.eurUsdMrmThrIndirectFalseInvertedTrueRate,
        constants.eurUsdMrmEcbIndirectFalseInvertedTrueRate
      ]),
      constants.TENANT_ID,
      constants.overrideTenantSettings
    );
    expect(result.get(constants.usdEurMConversionParam)).toBeTruthy();
    expect(result.get(constants.usdEurMConversionParam)).toEqual(expectedConversionResult);
  });

  it('Inverted Bulk Conversion With Direct Currency Pair', async () => {
    const expectedConversionResult: SingleNonFixedRateConversionResult = new SingleNonFixedRateConversionResult(
      constants.usdEurMrmThrIndirectFalseInvertedTrueRate,
      constants.AMOUNT_10000,
      constants.AMOUNT_10000
    );
    const result: BulkConversionResult<
      ConversionParameterForNonFixedRate,
      SingleNonFixedRateConversionResult
    > = await currencyConverter.convertCurrenciesWithNonFixedRate(
      [constants.usdEurMConversionParam],
      buildAdapter([
        constants.eurUsdMrmThrIndirectFalseInvertedTrueRate,
        constants.usdEurMrmThrIndirectFalseInvertedTrueRate,
        constants.eurUsdMrmEcbIndirectFalseInvertedTrueRate,
        constants.usdEurMrmEcbIndirectFalseInvertedTrueRate
      ]),
      constants.TENANT_ID,
      constants.overrideTenantSettings
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
      buildAdapter([
        constants.eurUsdMrmThrIndirectFalseInvertedTrueRate,
        constants.eurUsdMrmEcbIndirectFalseInvertedTrueRate
      ]),
      constants.TENANT_ID,
      constants.overrideTenantSettings
    );
    expect(result.get(constants.usdEurBConvParamPastDate)).toBeInstanceOf(CurrencyConversionError);
    expect((result.get(constants.usdEurBConvParamPastDate) as CurrencyConversionError).message).toBe(
      ConversionError.NO_MATCHING_EXCHANGE_RATE_RECORD
    );
  });

  it('Inverted Conversion With New Exchange Rate Type', async () => {
    const expectedConversionResult: SingleNonFixedRateConversionResult = new SingleNonFixedRateConversionResult(
      constants.eurUsdMrmThrNewRateType,
      constants.AMOUNT_10000,
      constants.AMOUNT_10000
    );
    const result: BulkConversionResult<
      ConversionParameterForNonFixedRate,
      SingleNonFixedRateConversionResult
    > = await currencyConverter.convertCurrenciesWithNonFixedRate(
      [constants.eurUsdMrmEcbABCConvParam],
      buildAdapter([constants.eurUsdMrmThrNewRateType, constants.eurUsdMrmEcbNewRateType]),
      constants.TENANT_ID,
      constants.overrideTenantSettings
    );
    expect(result.get(constants.eurUsdMrmEcbABCConvParam)).toBeTruthy();
    expect(result.get(constants.eurUsdMrmEcbABCConvParam)).toEqual(expectedConversionResult);
  });

  it('Conversion For Indirect True Inverted True Inverted Currency Pair', async () => {
    const expectedConversionResult: SingleNonFixedRateConversionResult = new SingleNonFixedRateConversionResult(
      constants.eurUsdMrmThrIndirectTrueInvertedTrueRate,
      constants.AMOUNT_10000,
      constants.AMOUNT_10000
    );
    const result: BulkConversionResult<
      ConversionParameterForNonFixedRate,
      SingleNonFixedRateConversionResult
    > = await currencyConverter.convertCurrenciesWithNonFixedRate(
      [constants.usdEurMConversionParam],
      buildAdapter([
        constants.eurUsdMrmThrIndirectTrueInvertedTrueRate,
        constants.eurUsdMrmEcbIndirectTrueInvertedTrueRate
      ]),
      constants.TENANT_ID,
      constants.overrideTenantSettings
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
      buildAdapter([
        constants.eurUsdMrmThrIndirectTrueInvertedFalseRate,
        constants.eurUsdMrmEcbIndirectTrueInvertedFalseRate
      ]),
      constants.TENANT_ID,
      constants.overrideTenantSettings
    );
    expect(result.get(constants.usdEurBConversionParam)).toBeInstanceOf(CurrencyConversionError);
    expect((result.get(constants.usdEurBConversionParam) as CurrencyConversionError).message).toBe(
      ConversionError.NO_MATCHING_EXCHANGE_RATE_RECORD
    );
  });

  it('Conversion For Indirect False Inverted True Inverted Currency Pair', async () => {
    const expectedConversionResult: SingleNonFixedRateConversionResult = new SingleNonFixedRateConversionResult(
      constants.eurUsdMrmThrIndirectFalseInvertedTrueRate,
      constants.AMOUNT_1,
      constants.AMOUNT_1
    );
    const result: BulkConversionResult<
      ConversionParameterForNonFixedRate,
      SingleNonFixedRateConversionResult
    > = await currencyConverter.convertCurrenciesWithNonFixedRate(
      [constants.usdEurMConversionParam],
      buildAdapter([
        constants.eurUsdMrmThrIndirectFalseInvertedTrueRate,
        constants.eurUsdMrmEcbIndirectFalseInvertedTrueRate
      ]),
      constants.TENANT_ID,
      constants.overrideTenantSettings
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
      buildAdapter([
        constants.eurUsdMrmThrIndirectFalseInvertedFalseRate,
        constants.eurUsdMrmEcbIndirectFalseInvertedFalseRate
      ]),
      constants.TENANT_ID,
      constants.overrideTenantSettings
    );
    expect(result.get(constants.usdEurBConversionParam)).toBeInstanceOf(CurrencyConversionError);
    expect((result.get(constants.usdEurBConversionParam) as CurrencyConversionError).message).toBe(
      ConversionError.NO_MATCHING_EXCHANGE_RATE_RECORD
    );
  });

  it('Conversion For Indirect True Inverted True Inverted Currency Pair Factor More Than One Rate', async () => {
    const expectedConversionResult: SingleNonFixedRateConversionResult = new SingleNonFixedRateConversionResult(
      constants.eurUsdMrmThrIndirectTrueInvertedTrueFactorMoreThanOneRate,
      constants.AMOUNT_300,
      constants.AMOUNT_300
    );
    const result: BulkConversionResult<
      ConversionParameterForNonFixedRate,
      SingleNonFixedRateConversionResult
    > = await currencyConverter.convertCurrenciesWithNonFixedRate(
      [constants.usdEurMConversionParam],
      buildAdapter([
        constants.eurUsdMrmThrIndirectTrueInvertedTrueFactorMoreThanOneRate,
        constants.eurUsdMrmEcbIndirectTrueInvertedTrueFactorMoreThanOneRate
      ]),
      constants.TENANT_ID,
      constants.overrideTenantSettings
    );
    expect(result.get(constants.usdEurMConversionParam)).toBeTruthy();
    expect(result.get(constants.usdEurMConversionParam)).toEqual(expectedConversionResult);
  });

  it('Conversion For Indirect True Inverted False Inverted Currency Pair Factor More Than One Rate', async () => {
    const result: BulkConversionResult<
      ConversionParameterForNonFixedRate,
      SingleNonFixedRateConversionResult
    > = await currencyConverter.convertCurrenciesWithNonFixedRate(
      [constants.usdEurBConversionParam],
      buildAdapter([
        constants.eurUsdMrmThrIndirectTrueInvertedFalseFactorMoreThanOneRate,
        constants.eurUsdMrmEcbIndirectTrueInvertedFalseFactorMoreThanOneRate
      ]),
      constants.TENANT_ID,
      constants.overrideTenantSettings
    );
    expect(result.get(constants.usdEurBConversionParam)).toBeInstanceOf(CurrencyConversionError);
    expect((result.get(constants.usdEurBConversionParam) as CurrencyConversionError).message).toBe(
      ConversionError.NO_MATCHING_EXCHANGE_RATE_RECORD
    );
  });

  it('Conversion For Indirect False Inverted True Inverted Currency Pair Factor More Than One Rate', async () => {
    const expectedConversionResult: SingleNonFixedRateConversionResult = new SingleNonFixedRateConversionResult(
      constants.eurUsdMrmThrIndirectFalseInvertedTrueFactorMoreThanOneRate,
      constants.AMOUNT_0_333333333333,
      constants.AMOUNT_0_33
    );
    const result: BulkConversionResult<
      ConversionParameterForNonFixedRate,
      SingleNonFixedRateConversionResult
    > = await currencyConverter.convertCurrenciesWithNonFixedRate(
      [constants.usdEurMConversionParam],
      buildAdapter([
        constants.eurUsdMrmThrIndirectFalseInvertedTrueFactorMoreThanOneRate,
        constants.eurUsdMrmEcbIndirectFalseInvertedTrueFactorMoreThanOneRate
      ]),
      constants.TENANT_ID,
      constants.overrideTenantSettings
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
      buildAdapter([
        constants.eurUsdMrmThrIndirectFalseInvertedFalseFactorMoreThanOneRate,
        constants.eurUsdMrmEcbIndirectFalseInvertedFalseFactorMoreThanOneRate
      ]),
      constants.TENANT_ID,
      constants.overrideTenantSettings
    );
    expect(result.get(constants.usdEurBConversionParam)).toBeInstanceOf(CurrencyConversionError);
    expect((result.get(constants.usdEurBConversionParam) as CurrencyConversionError).message).toBe(
      ConversionError.NO_MATCHING_EXCHANGE_RATE_RECORD
    );
  });

  it('Conversion For Indirect True Inverted True Direct Currency Pair', async () => {
    const expectedConversionResult: SingleNonFixedRateConversionResult = new SingleNonFixedRateConversionResult(
      constants.usdEurMrmThrIndirectTrueInvertedTrueRate,
      constants.AMOUNT_1,
      constants.AMOUNT_1
    );
    const result: BulkConversionResult<
      ConversionParameterForNonFixedRate,
      SingleNonFixedRateConversionResult
    > = await currencyConverter.convertCurrenciesWithNonFixedRate(
      [constants.usdEurMConversionParam],
      buildAdapter([
        constants.usdEurMrmThrIndirectTrueInvertedTrueRate,
        constants.eurUsdMrmThrIndirectTrueInvertedTrueRate,
        constants.usdEurMrmEcbIndirectTrueInvertedTrueExcRate,
        constants.eurUsdMrmEcbIndirectTrueInvertedTrueRate
      ]),
      constants.TENANT_ID,
      constants.overrideTenantSettings
    );
    expect(result.get(constants.usdEurMConversionParam)).toBeTruthy();
    expect(result.get(constants.usdEurMConversionParam)).toEqual(expectedConversionResult);
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
        constants.eurUsdMrmThrIndirectTrueInvertedFalseRate,
        constants.usdEurMrmEcbIndirectTrueInvertedFalseExcRate,
        constants.eurUsdMrmEcbIndirectTrueInvertedFalseRate
      ]),
      constants.TENANT_ID,
      constants.overrideTenantSettings
    );
    expect(result.get(constants.usdEurBConversionParam)).toBeTruthy();
    expect(result.get(constants.usdEurBConversionParam)).toEqual(expectedConversionResult);
  });

  it('Conversion For Indirect False Inverted True Direct Currency Pair', async () => {
    const expectedConversionResult: SingleNonFixedRateConversionResult = new SingleNonFixedRateConversionResult(
      constants.usdEurMrmThrIndirectFalseInvertedTrueRate,
      constants.AMOUNT_10000,
      constants.AMOUNT_10000
    );
    const result: BulkConversionResult<
      ConversionParameterForNonFixedRate,
      SingleNonFixedRateConversionResult
    > = await currencyConverter.convertCurrenciesWithNonFixedRate(
      [constants.usdEurMConversionParam],
      buildAdapter([
        constants.usdEurMrmThrIndirectFalseInvertedTrueRate,
        constants.eurUsdMrmThrIndirectFalseInvertedTrueRate,
        constants.usdEurMrmEcbIndirectFalseInvertedTrueRate,
        constants.eurUsdMrmEcbIndirectFalseInvertedTrueRate
      ]),
      constants.TENANT_ID,
      constants.overrideTenantSettings
    );
    expect(result.get(constants.usdEurMConversionParam)).toBeTruthy();
    expect(result.get(constants.usdEurMConversionParam)).toEqual(expectedConversionResult);
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
        constants.eurUsdMrmThrIndirectFalseInvertedFalseRate,
        constants.usdEurMrmEcbIndirectFalseInvertedFalseExcRate,
        constants.eurUsdMrmEcbIndirectFalseInvertedFalseRate
      ]),
      constants.TENANT_ID,
      constants.overrideTenantSettings
    );
    expect(result.get(constants.usdEurBConversionParam)).toBeTruthy();
    expect(result.get(constants.usdEurBConversionParam)).toEqual(expectedConversionResult);
  });

  it('Conversion For Indirect True Inverted True Direct Currency Pair Factor More Than One Rate', async () => {
    const expectedConversionResult: SingleNonFixedRateConversionResult = new SingleNonFixedRateConversionResult(
      constants.usdEurMrmThrIndirectTrueInvertedTrueFactorMoreThanOneRate,
      constants.AMOUNT_50,
      constants.AMOUNT_50
    );
    const result: BulkConversionResult<
      ConversionParameterForNonFixedRate,
      SingleNonFixedRateConversionResult
    > = await currencyConverter.convertCurrenciesWithNonFixedRate(
      [constants.usdEurMConversionParam],
      buildAdapter([
        constants.usdEurMrmThrIndirectTrueInvertedTrueFactorMoreThanOneRate,
        constants.eurUsdMrmThrIndirectTrueInvertedTrueFactorMoreThanOneRate,
        constants.usdEurMrmEcbIndirectTrueInvertedTrueFactorMoreThanOneExcRate,
        constants.eurUsdMrmEcbIndirectTrueInvertedTrueFactorMoreThanOneRate
      ]),
      constants.TENANT_ID,
      constants.overrideTenantSettings
    );
    expect(result.get(constants.usdEurMConversionParam)).toBeTruthy();
    expect(result.get(constants.usdEurMConversionParam)).toEqual(expectedConversionResult);
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
        constants.eurUsdMrmThrIndirectTrueInvertedFalseFactorMoreThanOneRate,
        constants.usdEurMrmEcbIndirectTrueInvertedFalseFactorMoreThanOneExcRate,
        constants.eurUsdMrmEcbIndirectTrueInvertedFalseFactorMoreThanOneRate
      ]),
      constants.TENANT_ID,
      constants.overrideTenantSettings
    );
    expect(result.get(constants.usdEurBConversionParam)).toBeTruthy();
    expect(result.get(constants.usdEurBConversionParam)).toEqual(expectedConversionResult);
  });

  it('Conversion For Indirect False Inverted True Direct Currency Pair Factor More Than One Rate', async () => {
    const expectedConversionResult: SingleNonFixedRateConversionResult = new SingleNonFixedRateConversionResult(
      constants.usdEurMrmThrIndirectFalseInvertedTrueFactorMoreThanOneRate,
      constants.AMOUNT_20000,
      constants.AMOUNT_20000
    );
    const result: BulkConversionResult<
      ConversionParameterForNonFixedRate,
      SingleNonFixedRateConversionResult
    > = await currencyConverter.convertCurrenciesWithNonFixedRate(
      [constants.usdEurMConversionParam],
      buildAdapter([
        constants.usdEurMrmThrIndirectFalseInvertedTrueFactorMoreThanOneRate,
        constants.eurUsdMrmThrIndirectFalseInvertedTrueFactorMoreThanOneRate,
        constants.usdEurMrmEcbIndirectFalseInvertedTrueFactorMoreThanOneRate,
        constants.eurUsdMrmEcbIndirectFalseInvertedTrueFactorMoreThanOneRate
      ]),
      constants.TENANT_ID,
      constants.overrideTenantSettings
    );
    expect(result.get(constants.usdEurMConversionParam)).toBeTruthy();
    expect(result.get(constants.usdEurMConversionParam)).toEqual(expectedConversionResult);
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
        constants.eurUsdMrmThrIndirectFalseInvertedFalseFactorMoreThanOneRate,
        constants.usdEurMrmEcbIndirectFalseInvertedFalseFactorMoreThanOneRate,
        constants.eurUsdMrmEcbIndirectFalseInvertedFalseFactorMoreThanOneRate
      ]),
      constants.TENANT_ID,
      constants.overrideTenantSettings
    );
    expect(result.get(constants.usdEurBConversionParam)).toBeTruthy();
    expect(result.get(constants.usdEurBConversionParam)).toEqual(expectedConversionResult);
  });
});
