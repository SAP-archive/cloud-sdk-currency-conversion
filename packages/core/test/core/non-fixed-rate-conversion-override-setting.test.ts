/* Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved. */
import { Tenant } from '@sap-cloud-sdk/core';
import {
  ConversionParameterForNonFixedRate,
  DataAdapter,
  ExchangeRate,
  ExchangeRateTypeDetail,
  CurrencyAmount,
  TenantSettings,
  SingleNonFixedRateConversionResult,
  CurrencyConversionError,
  BulkConversionResult
} from '@sap-cloud-sdk/currency-conversion-models';
import { BigNumber } from 'bignumber.js';
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
  ): Promise<Map<string, ExchangeRateTypeDetail>> => Promise.resolve(new Map());
  return adapter;
}

function buildAdapterWithNullExchangeRateTypeDetails(exchangeRates: ExchangeRate[]): DataAdapter {
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
  ): Promise<Map<string, ExchangeRateTypeDetail>> => Promise.resolve(null as any);
  return adapter;
}

function buildAdapterWithNullExchangeRates(): DataAdapter {
  const adapter: DataAdapter = {} as DataAdapter;

  adapter.getExchangeRatesForTenant = (
    params: ConversionParameterForNonFixedRate[],
    tenant: Tenant,
    tenantSettings: TenantSettings
  ): Promise<ExchangeRate[]> => Promise.resolve(null as any);

  adapter.getDefaultSettingsForTenant = (tenant: Tenant): Promise<TenantSettings> =>
    Promise.resolve(constants.defaultTenantSettings);

  adapter.getExchangeRateTypeDetailsForTenant = (
    tenant: Tenant,
    rateTypeSet: string[]
  ): Promise<Map<string, ExchangeRateTypeDetail>> => Promise.resolve(new Map());
  return adapter;
}

function buildAdapterWithEmptyExchangeRates(): DataAdapter {
  const adapter: DataAdapter = {} as DataAdapter;

  adapter.getExchangeRatesForTenant = (
    params: ConversionParameterForNonFixedRate[],
    tenant: Tenant,
    tenantSettings: TenantSettings
  ): Promise<ExchangeRate[]> => Promise.resolve([]);

  adapter.getDefaultSettingsForTenant = (tenant: Tenant): Promise<TenantSettings> =>
    Promise.resolve(constants.defaultTenantSettings);

  adapter.getExchangeRateTypeDetailsForTenant = (
    tenant: Tenant,
    rateTypeSet: string[]
  ): Promise<Map<string, ExchangeRateTypeDetail>> => Promise.resolve(new Map());
  return adapter;
}

function buildAdapterWithNullExchangeRatesAndDefaultTenantSettings(): DataAdapter {
  const adapter: DataAdapter = {} as DataAdapter;

  adapter.getExchangeRatesForTenant = (
    params: ConversionParameterForNonFixedRate[],
    tenant: Tenant,
    tenantSettings: TenantSettings
  ): Promise<ExchangeRate[]> => Promise.resolve(null as any);

  adapter.getDefaultSettingsForTenant = (tenant: Tenant): Promise<TenantSettings> => Promise.resolve(null as any);

  adapter.getExchangeRateTypeDetailsForTenant = (
    tenant: Tenant,
    rateTypeSet: string[]
  ): Promise<Map<string, ExchangeRateTypeDetail>> => Promise.resolve(new Map());
  return adapter;
}
describe('Non Fixed Rate Conversion override tenant settings', () => {
  it('Single Conversion With Empty Exchange Rate Type Details', async () => {
    const expectedConversionResult: SingleNonFixedRateConversionResult = new SingleNonFixedRateConversionResult(
      constants.inrEurMrmThrMExcRate,
      constants.A_10000,
      constants.A_10000
    );
    const result: SingleNonFixedRateConversionResult = await currencyConverter.convertCurrencyWithNonFixedRate(
      constants.inrEurMConversionParam,
      buildAdapter([
        constants.inrEurMrmEcbMRate,
        constants.eurInrMrmEcbMRate,
        constants.inrEurMrmThrMExcRate,
        constants.eurInrMrmThrMExcRate,
        constants.eurInrMrmThrIndirectConversionRate,
        constants.eurUsdMrmThrAskRate,
        constants.inrEurMrmThrMDiffrentTenantRate,
        constants.usdEurMrmThrMExcRate,
        constants.eurInrMrmThrMExcRate,
        constants.eurInrMrmThrAskIndirectFalseRate
      ]),
      constants.TENANT_ID,
      constants.overrideTenantSettings
    );
    expect(result).toBeTruthy();
    expect(result).toEqual(expectedConversionResult);
  });

  it('Single Conversion With Exchange Rate Record Having Future Date', async () => {
    let errorInput = new Error();
    try {
      const result: SingleNonFixedRateConversionResult = await currencyConverter.convertCurrencyWithNonFixedRate(
        constants.inrEurMConvParamPastDate,
        buildAdapter([
          constants.inrEurMrmThrMExcRate,
          constants.eurInrMrmThrMExcRate,
          constants.inrEurMrmEcbMRate,
          constants.eurInrMrmEcbMRate
        ]),
        constants.TENANT_ID,
        constants.overrideTenantSettings
      );
    } catch (error) {
      errorInput = error;
    }
    expect(errorInput).toBeInstanceOf(CurrencyConversionError);
    expect(errorInput.message).toBe(ConversionError.NO_MATCHING_EXCHANGE_RATE_RECORD);
  });

  it('Single Conversion With Null Conversion Parameter', async () => {
    let errorInput = new Error();
    try {
      const result: SingleNonFixedRateConversionResult = await currencyConverter.convertCurrencyWithNonFixedRate(
        null as any,
        buildAdapter([
          constants.inrEurMrmEcbMRate,
          constants.eurInrMrmEcbMRate,
          constants.inrEurMrmThrMExcRate,
          constants.eurInrMrmThrMExcRate,
          constants.eurInrMrmThrIndirectConversionRate,
          constants.eurUsdMrmThrAskRate,
          constants.inrEurMrmThrMDiffrentTenantRate,
          constants.usdEurMrmThrMExcRate,
          constants.eurInrMrmThrMExcRate,
          constants.eurInrMrmThrAskIndirectFalseRate
        ]),
        constants.TENANT_ID,
        constants.overrideTenantSettings
      );
    } catch (error) {
      errorInput = error;
    }
    expect(errorInput).toBeInstanceOf(CurrencyConversionError);
    expect(errorInput.message).toBe(ConversionError.INVALID_PARAMS);
  });

  it('Bulk Conversion With Empty Exchange Rate Type Details', async () => {
    const expectedConversionResult: SingleNonFixedRateConversionResult = new SingleNonFixedRateConversionResult(
      constants.inrEurMrmThrMExcRate,
      constants.A_10000,
      constants.A_10000
    );
    const result: BulkConversionResult<
      ConversionParameterForNonFixedRate,
      SingleNonFixedRateConversionResult
    > = await currencyConverter.convertCurrenciesWithNonFixedRate(
      [constants.inrEurMConversionParam],
      buildAdapter([
        constants.inrEurMrmEcbMRate,
        constants.eurInrMrmEcbMRate,
        constants.inrEurMrmThrMExcRate,
        constants.eurInrMrmThrMExcRate,
        constants.eurInrMrmThrIndirectConversionRate,
        constants.eurUsdMrmThrAskRate,
        constants.inrEurMrmThrMDiffrentTenantRate,
        constants.usdEurMrmThrMExcRate,
        constants.eurInrMrmThrMExcRate,
        constants.eurInrMrmThrAskIndirectFalseRate
      ]),
      constants.TENANT_ID,
      constants.overrideTenantSettings
    );
    expect(result.get(constants.inrEurMConversionParam)).toBeTruthy();
    expect(result.get(constants.inrEurMConversionParam)).toEqual(expectedConversionResult);
  });

  it('Bulk Conversion With null Exchange Rate Type Details', async () => {
    const expectedConversionResult: SingleNonFixedRateConversionResult = new SingleNonFixedRateConversionResult(
      constants.inrEurMrmThrMExcRate,
      constants.A_10000,
      constants.A_10000
    );
    const result: BulkConversionResult<
      ConversionParameterForNonFixedRate,
      SingleNonFixedRateConversionResult
    > = await currencyConverter.convertCurrenciesWithNonFixedRate(
      [constants.inrEurMConversionParam],
      buildAdapterWithNullExchangeRateTypeDetails([
        constants.inrEurMrmEcbMRate,
        constants.eurInrMrmEcbMRate,
        constants.inrEurMrmThrMExcRate,
        constants.eurInrMrmThrMExcRate,
        constants.eurInrMrmThrIndirectConversionRate,
        constants.eurUsdMrmThrAskRate,
        constants.inrEurMrmThrMDiffrentTenantRate,
        constants.usdEurMrmThrMExcRate,
        constants.eurInrMrmThrMExcRate,
        constants.eurInrMrmThrAskIndirectFalseRate
      ]),
      constants.TENANT_ID,
      constants.overrideTenantSettings
    );
    expect(result.get(constants.inrEurMConversionParam)).toBeTruthy();
    expect(result.get(constants.inrEurMConversionParam)).toEqual(expectedConversionResult);
  });

  it('Bulk Conversion With Exchange Rate Record Having Future Date', async () => {
    const result: BulkConversionResult<
      ConversionParameterForNonFixedRate,
      SingleNonFixedRateConversionResult
    > = await currencyConverter.convertCurrenciesWithNonFixedRate(
      [constants.inrEurMConvParamPastDate],
      buildAdapter([
        constants.inrEurMrmThrMExcRate,
        constants.eurInrMrmThrMExcRate,
        constants.inrEurMrmEcbMRate,
        constants.eurInrMrmEcbMRate
      ]),
      constants.TENANT_ID,
      constants.overrideTenantSettings
    );
    expect(result.get(constants.inrEurMConvParamPastDate)).toBeInstanceOf(CurrencyConversionError);
    expect((result.get(constants.inrEurMConvParamPastDate) as CurrencyConversionError).message).toBe(
      ConversionError.NO_MATCHING_EXCHANGE_RATE_RECORD
    );
  });

  it('Bulk Conversion With Null Conversion Parameter', async () => {
    let errorInput = new Error();
    try {
      const result: BulkConversionResult<
        ConversionParameterForNonFixedRate,
        SingleNonFixedRateConversionResult
      > = await currencyConverter.convertCurrenciesWithNonFixedRate(
        null as any,
        buildAdapter([
          constants.inrEurMrmEcbMRate,
          constants.eurInrMrmEcbMRate,
          constants.inrEurMrmThrMExcRate,
          constants.eurInrMrmThrMExcRate,
          constants.eurInrMrmThrIndirectConversionRate,
          constants.eurUsdMrmThrAskRate,
          constants.inrEurMrmThrMDiffrentTenantRate,
          constants.usdEurMrmThrMExcRate,
          constants.eurInrMrmThrMExcRate,
          constants.eurInrMrmThrAskIndirectFalseRate
        ]),
        constants.TENANT_ID,
        constants.overrideTenantSettings
      );
    } catch (error) {
      errorInput = error;
    }
    expect(errorInput).toBeInstanceOf(CurrencyConversionError);
    expect(errorInput.message).toBe(ConversionError.INVALID_PARAMS);
  });

  it('Bulk Conversion With empty Conversion Parameter list', async () => {
    let errorInput = new Error();
    try {
      const result: BulkConversionResult<
        ConversionParameterForNonFixedRate,
        SingleNonFixedRateConversionResult
      > = await currencyConverter.convertCurrenciesWithNonFixedRate(
        [],
        buildAdapter([
          constants.inrEurMrmEcbMRate,
          constants.eurInrMrmEcbMRate,
          constants.inrEurMrmThrMExcRate,
          constants.eurInrMrmThrMExcRate,
          constants.eurInrMrmThrIndirectConversionRate,
          constants.eurUsdMrmThrAskRate,
          constants.inrEurMrmThrMDiffrentTenantRate,
          constants.usdEurMrmThrMExcRate,
          constants.eurInrMrmThrMExcRate,
          constants.eurInrMrmThrAskIndirectFalseRate
        ]),
        constants.TENANT_ID,
        constants.overrideTenantSettings
      );
    } catch (error) {
      errorInput = error;
    }
    expect(errorInput).toBeInstanceOf(CurrencyConversionError);
    expect(errorInput.message).toBe(ConversionError.INVALID_PARAMS);
  });

  it('Bulk Conversion With Direct Factor Five Ten Rate', async () => {
    const expectedConversionResult: SingleNonFixedRateConversionResult = new SingleNonFixedRateConversionResult(
      constants.inrEurMrmThrMDirectFactorFiveTenRate,
      constants.A_20000,
      constants.A_20000
    );
    const result: BulkConversionResult<
      ConversionParameterForNonFixedRate,
      SingleNonFixedRateConversionResult
    > = await currencyConverter.convertCurrenciesWithNonFixedRate(
      [constants.inrEurMConversionParam],
      buildAdapter([constants.inrEurMrmThrMDirectFactorFiveTenRate, constants.inrEurMrmEcbMDirectFactorFiveTenRate]),
      constants.TENANT_ID,
      constants.overrideTenantSettings
    );
    expect(result.get(constants.inrEurMConversionParam)).toBeTruthy();
    expect(result.get(constants.inrEurMConversionParam)).toEqual(expectedConversionResult);
  });

  it('Bulk Conversion With Direct Factor More Than One Rate', async () => {
    const expectedConversionResult: SingleNonFixedRateConversionResult = new SingleNonFixedRateConversionResult(
      constants.inrEurMrmThrMDirectFactorMoreThanOneRate,
      constants.A_5000,
      constants.A_5000
    );
    const result: BulkConversionResult<
      ConversionParameterForNonFixedRate,
      SingleNonFixedRateConversionResult
    > = await currencyConverter.convertCurrenciesWithNonFixedRate(
      [constants.inrEurMConversionParam],
      buildAdapter([
        constants.inrEurMrmThrMDirectFactorMoreThanOneRate,
        constants.inrEurMrmEcbMDirectFactorMoreThanOneRate
      ]),
      constants.TENANT_ID,
      constants.overrideTenantSettings
    );
    expect(result.get(constants.inrEurMConversionParam)).toBeTruthy();
    expect(result.get(constants.inrEurMConversionParam)).toEqual(expectedConversionResult);
  });

  it('Bulk Conversion With indirect Factor Five Ten Rate', async () => {
    const expectedConversionResult: SingleNonFixedRateConversionResult = new SingleNonFixedRateConversionResult(
      constants.inrEurMrmThrMIndirectFactorFiveTenRate,
      constants.A_2,
      constants.A_2
    );
    const result: BulkConversionResult<
      ConversionParameterForNonFixedRate,
      SingleNonFixedRateConversionResult
    > = await currencyConverter.convertCurrenciesWithNonFixedRate(
      [constants.inrEurMConversionParam],
      buildAdapter([
        constants.inrEurMrmThrMIndirectFactorFiveTenRate,
        constants.inrEurMrmEcbMIndirectFactorFiveTenRate
      ]),
      constants.TENANT_ID,
      constants.overrideTenantSettings
    );
    expect(result.get(constants.inrEurMConversionParam)).toBeTruthy();
    expect(result.get(constants.inrEurMConversionParam)).toEqual(expectedConversionResult);
  });

  it('Bulk Conversion With Inirect Factor More Than One Rate', async () => {
    const expectedConversionResult: SingleNonFixedRateConversionResult = new SingleNonFixedRateConversionResult(
      constants.inrEurMrmThrMIndirectFactorMoreThanOneRate,
      constants.A_0_5,
      constants.A_0_5
    );
    const result: BulkConversionResult<
      ConversionParameterForNonFixedRate,
      SingleNonFixedRateConversionResult
    > = await currencyConverter.convertCurrenciesWithNonFixedRate(
      [constants.inrEurMConversionParam],
      buildAdapter([
        constants.inrEurMrmThrMIndirectFactorMoreThanOneRate,
        constants.inrEurMrmEcbMIndirectFactorMoreThanOneRate
      ]),
      constants.TENANT_ID,
      constants.overrideTenantSettings
    );
    expect(result.get(constants.inrEurMConversionParam)).toBeTruthy();
    expect(result.get(constants.inrEurMConversionParam)).toEqual(expectedConversionResult);
  });

  it('Convert bulk non fixed rate currency with maximum conversion parameters', async () => {
    const maximumConversionParameterList: ConversionParameterForNonFixedRate[] = [];
    for (let i = 1; i <= 1000; i++) {
      maximumConversionParameterList.push(constants.inrEurMConversionParam);
    }
    const actualConversionResult = await currencyConverter.convertCurrenciesWithNonFixedRate(
      maximumConversionParameterList,
      buildAdapter([constants.inrEurMrmThrMExcRate]),
      constants.TENANT_ID,
      constants.overrideTenantSettings
    );
    for (const param of maximumConversionParameterList) {
      expect(
        (actualConversionResult.get(constants.inrEurMConversionParam) as SingleNonFixedRateConversionResult)
          .convertedAmount.valueString
      ).toEqual('10000');
      expect(
        (actualConversionResult.get(constants.inrEurMConversionParam) as SingleNonFixedRateConversionResult)
          .convertedAmount.decimalValue
      ).toEqual(new BigNumber('10000'));
      expect(
        (actualConversionResult.get(constants.inrEurMConversionParam) as SingleNonFixedRateConversionResult)
          .roundedOffConvertedAmount.valueString
      ).toEqual('10000');
      expect(
        (actualConversionResult.get(constants.inrEurMConversionParam) as SingleNonFixedRateConversionResult)
          .roundedOffConvertedAmount.decimalValue
      ).toEqual(new BigNumber('10000'));
    }
  });

  it('Convert bulk non fixed rate currency with more than 1000 conversion parameters', () => {
    const maximumConversionParameterList: ConversionParameterForNonFixedRate[] = [];
    let errInput = new Error();
    for (let i = 0; i <= 1000; i++) {
      maximumConversionParameterList.push(constants.inrEurMConversionParam);
    }
    try {
      expect(async () => {
        await await currencyConverter.convertCurrenciesWithNonFixedRate(
          maximumConversionParameterList,
          buildAdapter([constants.inrEurMrmThrMExcRate]),
          constants.TENANT_ID,
          constants.overrideTenantSettings
        );
      }).toThrowError(ConversionError.INVALID_PARAMS);
    } catch (error) {
      errInput = error;
    }
  });

  it('Multiple Conversion Success Failure', async () => {
    const expectedConversionResult1: SingleNonFixedRateConversionResult = new SingleNonFixedRateConversionResult(
      constants.inrEurMrmThrMExcRate,
      constants.A_10000,
      constants.A_10000
    );
    const expectedConversionResult2: SingleNonFixedRateConversionResult = new SingleNonFixedRateConversionResult(
      constants.eurUsdMrmThrAskRate,
      constants.A_10000,
      constants.A_10000
    );
    const expectedConversionResult3: SingleNonFixedRateConversionResult = new SingleNonFixedRateConversionResult(
      constants.eurInrMrmThrAskIndirectFalseRate,
      constants.A_10000,
      constants.A_10000
    );
    const result: BulkConversionResult<
      ConversionParameterForNonFixedRate,
      SingleNonFixedRateConversionResult
    > = await currencyConverter.convertCurrenciesWithNonFixedRate(
      [
        constants.inrEurMConversionParam,
        constants.eurUsdAskConversionParameter,
        constants.eurInrAskConversionParam,
        constants.eurInrMConversionParam
      ],
      buildAdapter([
        constants.inrEurMrmThrMExcRate,
        constants.eurUsdMrmThrAskRate,
        constants.eurInrMrmThrAskIndirectFalseRate,
        constants.eurInrMrmThrMExcRate,
        constants.inrEurMrmEcbMRate,
        constants.eurUsdMrmEcbAskRate,
        constants.eurInrMrmEcbAskIndirectFalseRate,
        constants.eurInrMrmEcbMRate
      ]),
      constants.TENANT_ID,
      constants.overrideTenantSettings
    );
    expect(result.get(constants.inrEurMConversionParam)).toBeTruthy();
    expect(result.get(constants.inrEurMConversionParam)).toEqual(expectedConversionResult1);
    expect(result.get(constants.eurUsdAskConversionParameter)).toBeTruthy();
    expect(result.get(constants.eurUsdAskConversionParameter)).toEqual(expectedConversionResult2);
    expect(result.get(constants.eurInrAskConversionParam)).toBeTruthy();
    expect(result.get(constants.eurInrAskConversionParam)).toEqual(expectedConversionResult3);
    expect(result.get(constants.eurInrMConversionParam)).toBeInstanceOf(CurrencyConversionError);
    expect((result.get(constants.eurInrMConversionParam) as CurrencyConversionError).message).toBe(
      ConversionError.NO_MATCHING_EXCHANGE_RATE_RECORD
    );
  });

  it('Bulk Indirect Conversion', async () => {
    const expectedConversionResult: SingleNonFixedRateConversionResult = new SingleNonFixedRateConversionResult(
      constants.eurInrMrmThrIndirectConversionRate,
      new CurrencyAmount('1'),
      new CurrencyAmount('1')
    );
    const result: BulkConversionResult<
      ConversionParameterForNonFixedRate,
      SingleNonFixedRateConversionResult
    > = await currencyConverter.convertCurrenciesWithNonFixedRate(
      [constants.eurInrIndirectConvParam],
      buildAdapter([
        constants.eurInrMrmThrIndirectConversionRate,
        constants.inrEurMrmThrMExcRate,
        constants.eurInrMrmThrMExcRate,
        constants.eurInrMrmEcbIndirectConversionExcRate,
        constants.inrEurMrmEcbMRate,
        constants.eurInrMrmEcbMRate
      ]),
      constants.TENANT_ID,
      constants.overrideTenantSettings
    );
    expect(result.get(constants.eurInrIndirectConvParam)).toBeTruthy();
    expect(result.get(constants.eurInrIndirectConvParam)).toEqual(expectedConversionResult);
  });

  it('Bulk Indirect Conversion Decimal Value', async () => {
    const expectedConversionResult: SingleNonFixedRateConversionResult = new SingleNonFixedRateConversionResult(
      constants.eurInrMrmThrIndirectConversionDecimalRate,
      new CurrencyAmount('0.97835236045058661466079243313883250280145'),
      new CurrencyAmount('0.98')
    );
    const result: BulkConversionResult<
      ConversionParameterForNonFixedRate,
      SingleNonFixedRateConversionResult
    > = await currencyConverter.convertCurrenciesWithNonFixedRate(
      [constants.eurInrDecimalValueConvParam],
      buildAdapter([
        constants.eurInrMrmThrIndirectConversionDecimalRate,
        constants.inrEurMrmThrMExcRate,
        constants.eurInrMrmThrMExcRate,
        constants.eurInrMrmEcbIndirectConversionDecimalRate,
        constants.inrEurMrmEcbMRate,
        constants.eurInrMrmEcbMRate
      ]),
      constants.TENANT_ID,
      constants.overrideTenantSettings
    );
    expect(result.get(constants.eurInrDecimalValueConvParam)).toBeTruthy();
    expect(result.get(constants.eurInrDecimalValueConvParam)).toEqual(expectedConversionResult);
  });

  it('Bulk direct Conversion Decimal Value', async () => {
    const expectedConversionResult: SingleNonFixedRateConversionResult = new SingleNonFixedRateConversionResult(
      constants.eurInrMrmThrDirectConversionDecimal,
      new CurrencyAmount('14831.1106484722999998921741'),
      new CurrencyAmount('14831.11')
    );
    const result: BulkConversionResult<
      ConversionParameterForNonFixedRate,
      SingleNonFixedRateConversionResult
    > = await currencyConverter.convertCurrenciesWithNonFixedRate(
      [constants.eurInrDecimalValueConvParam],
      buildAdapter([
        constants.eurInrMrmThrDirectConversionDecimal,
        constants.inrEurMrmThrMExcRate,
        constants.eurInrMrmThrMExcRate,
        constants.eurInrMrmEcbDirectConversionDecimal,
        constants.inrEurMrmEcbMRate,
        constants.eurInrMrmEcbMRate
      ]),
      constants.TENANT_ID,
      constants.overrideTenantSettings
    );
    expect(result.get(constants.eurInrDecimalValueConvParam)).toBeTruthy();
    expect(result.get(constants.eurInrDecimalValueConvParam)).toEqual(expectedConversionResult);
  });

  it('Bulk Conversion With Different Tenant Record Found', async () => {
    const expectedConversionResult: SingleNonFixedRateConversionResult = new SingleNonFixedRateConversionResult(
      constants.inrEurMrmThrMDiffrentTenantRate,
      constants.A_10000,
      constants.A_10000
    );
    const result: BulkConversionResult<
      ConversionParameterForNonFixedRate,
      SingleNonFixedRateConversionResult
    > = await currencyConverter.convertCurrenciesWithNonFixedRate(
      [constants.inrEurMConversionParam],
      buildAdapter([
        constants.inrEurMrmThrMExcRate,
        constants.inrEurMrmThrMDiffrentTenantRate,
        constants.inrEurMrmEcbMRate,
        constants.inrEurMrmEcbMDiffrentTenantRate
      ]),
      constants.TENANT_ID1,
      constants.overrideTenantSettings
    );
    expect(result.get(constants.inrEurMConversionParam)).toBeTruthy();
    expect(result.get(constants.inrEurMConversionParam)).toEqual(expectedConversionResult);
  });

  it('Bulk Conversion With Old Conversion Time', async () => {
    const expectedConversionResult: SingleNonFixedRateConversionResult = new SingleNonFixedRateConversionResult(
      constants.inrEurMrmThrMExcRate,
      constants.A_10000,
      constants.A_10000
    );
    const result: BulkConversionResult<
      ConversionParameterForNonFixedRate,
      SingleNonFixedRateConversionResult
    > = await currencyConverter.convertCurrenciesWithNonFixedRate(
      [constants.inrEurMConversionParam],
      buildAdapter([
        constants.inrEurMrmThrMExcRate,
        constants.eurInrMrmThrMExcRate,
        constants.inrEurMrmEcbMRate,
        constants.eurInrMrmEcbMRate
      ]),
      constants.TENANT_ID,
      constants.overrideTenantSettings
    );
    expect(result.get(constants.inrEurMConversionParam)).toBeTruthy();
    expect(result.get(constants.inrEurMConversionParam)).toEqual(expectedConversionResult);
  });

  it('Bulk Conversion With Same Currency Pair List', async () => {
    const expectedConversionResult1: SingleNonFixedRateConversionResult = new SingleNonFixedRateConversionResult(
      constants.inrInrMrmThrMRate,
      constants.A_120,
      constants.A_120
    );
    const expectedConversionResult2: SingleNonFixedRateConversionResult = new SingleNonFixedRateConversionResult(
      constants.eurEurMrmThrMRate,
      constants.A_120,
      constants.A_120
    );
    const result: BulkConversionResult<
      ConversionParameterForNonFixedRate,
      SingleNonFixedRateConversionResult
    > = await currencyConverter.convertCurrenciesWithNonFixedRate(
      [constants.inrInrMConversionParam, constants.eurEurMConversionParam],
      buildAdapter([
        constants.inrInrMrmThrMRate,
        constants.eurEurMrmThrMRate,
        constants.inrInrMrmEcbMRate,
        constants.eurEurMrmEcbMRate
      ]),
      constants.TENANT_ID,
      constants.overrideTenantSettings
    );
    expect(result.get(constants.inrInrMConversionParam)).toBeTruthy();
    expect(result.get(constants.inrInrMConversionParam)).toEqual(expectedConversionResult1);
    expect(result.get(constants.eurEurMConversionParam)).toBeTruthy();
    expect(result.get(constants.eurEurMConversionParam)).toEqual(expectedConversionResult2);
  });

  it('Non Fixed Rate Conversion Rounded Half Up Last Digit Five', async () => {
    const expectedConversionResult: SingleNonFixedRateConversionResult = new SingleNonFixedRateConversionResult(
      constants.inrBhdMrmThrMRate,
      new CurrencyAmount('6.0425223'),
      new CurrencyAmount('6.043')
    );
    const result: BulkConversionResult<
      ConversionParameterForNonFixedRate,
      SingleNonFixedRateConversionResult
    > = await currencyConverter.convertCurrenciesWithNonFixedRate(
      [constants.inrBhdMFiveParam],
      buildAdapter([constants.inrBhdMrmEcbMRate, constants.inrBhdMrmThrMRate]),
      constants.TENANT_ID,
      constants.overrideTenantSettings
    );
    expect(result.get(constants.inrBhdMFiveParam)).toBeTruthy();
    expect(result.get(constants.inrBhdMFiveParam)).toEqual(expectedConversionResult);
  });

  it('Non Fixed Rate Conversion Rounded Half Up Last Digit More Than Five', async () => {
    const expectedConversionResult: SingleNonFixedRateConversionResult = new SingleNonFixedRateConversionResult(
      constants.inrBhdMrmThrMRate,
      new CurrencyAmount('2555295.4999699377'),
      new CurrencyAmount('2555295.5')
    );
    const result: BulkConversionResult<
      ConversionParameterForNonFixedRate,
      SingleNonFixedRateConversionResult
    > = await currencyConverter.convertCurrenciesWithNonFixedRate(
      [constants.inrBhdMMoreThanFiveParam],
      buildAdapter([constants.inrBhdMrmEcbMRate, constants.inrBhdMrmThrMRate]),
      constants.TENANT_ID,
      constants.overrideTenantSettings
    );
    expect(result.get(constants.inrBhdMMoreThanFiveParam)).toBeTruthy();
    expect(result.get(constants.inrBhdMMoreThanFiveParam)).toEqual(expectedConversionResult);
  });

  it('Non Fixed Rate Conversion Rounded Half Up Last Digit Less Than Five', async () => {
    const expectedConversionResult: SingleNonFixedRateConversionResult = new SingleNonFixedRateConversionResult(
      constants.inrBhdMrmThrMRate,
      new CurrencyAmount('60.155263546'),
      new CurrencyAmount('60.155')
    );
    const result: BulkConversionResult<
      ConversionParameterForNonFixedRate,
      SingleNonFixedRateConversionResult
    > = await currencyConverter.convertCurrenciesWithNonFixedRate(
      [constants.inrBhdMLessThanFiveParam],
      buildAdapter([constants.inrBhdMrmEcbMRate, constants.inrBhdMrmThrMRate]),
      constants.TENANT_ID,
      constants.overrideTenantSettings
    );
    expect(result.get(constants.inrBhdMLessThanFiveParam)).toBeTruthy();
    expect(result.get(constants.inrBhdMLessThanFiveParam)).toEqual(expectedConversionResult);
  });

  it('Bulk Conversion With Exchange Rate Record Having Future Date', async () => {
    const result: BulkConversionResult<
      ConversionParameterForNonFixedRate,
      SingleNonFixedRateConversionResult
    > = await currencyConverter.convertCurrenciesWithNonFixedRate(
      [constants.invalidCurrenecyConvParam],
      buildAdapter([
        constants.inrEurMrmThrMExcRate,
        constants.eurUsdMrmThrAskRate,
        constants.usdEurMrmThrMExcRate,
        constants.eurInrMrmThrMExcRate,
        constants.inrEurMrmEcbMRate,
        constants.eurUsdMrmEcbAskRate,
        constants.usdEurMrmEcbMExcRate,
        constants.eurInrMrmEcbMRate
      ]),
      constants.TENANT_ID,
      constants.overrideTenantSettings
    );
    expect(result.get(constants.invalidCurrenecyConvParam)).toBeInstanceOf(CurrencyConversionError);
    expect((result.get(constants.invalidCurrenecyConvParam) as CurrencyConversionError).message).toBe(
      ConversionError.NO_MATCHING_EXCHANGE_RATE_RECORD
    );
  });

  it('Bulk Conversion With Different Tenant No Record', async () => {
    const result: BulkConversionResult<
      ConversionParameterForNonFixedRate,
      SingleNonFixedRateConversionResult
    > = await currencyConverter.convertCurrenciesWithNonFixedRate(
      [constants.inrEurMConversionParam],
      buildAdapter([
        constants.inrEurMrmThrMExcRate,
        constants.inrEurMrmThrMDiffrentTenantRate,
        constants.inrEurMrmEcbMRate,
        constants.inrEurMrmEcbMDiffrentTenantRate
      ]),
      constants.TENANT_ID2,
      constants.overrideTenantSettings
    );
    expect(result.get(constants.inrEurMConversionParam)).toBeInstanceOf(CurrencyConversionError);
    expect((result.get(constants.inrEurMConversionParam) as CurrencyConversionError).message).toBe(
      ConversionError.NO_MATCHING_EXCHANGE_RATE_RECORD
    );
  });

  it('Bulk Conversion With Duplicate Exchange Rate Same TimeStamp', async () => {
    const result: BulkConversionResult<
      ConversionParameterForNonFixedRate,
      SingleNonFixedRateConversionResult
    > = await currencyConverter.convertCurrenciesWithNonFixedRate(
      [constants.inrEurMConversionParam],
      buildAdapter([
        constants.inrEurMrmThrMDuplicateRate,
        constants.inrEurMrmThrMExcRate,
        constants.inrEurMrmEcbMDuplicateExcRate,
        constants.inrEurMrmEcbMRate
      ]),
      constants.TENANT_ID,
      constants.overrideTenantSettings
    );
    expect(result.get(constants.inrEurMConversionParam)).toBeInstanceOf(CurrencyConversionError);
    expect((result.get(constants.inrEurMConversionParam) as CurrencyConversionError).message).toBe(
      ConversionError.DUPLICATE_CONVERSION_RECORD_FOUND
    );
  });

  it('Bulk Conversion With Duplicate Exchange Rate Record', async () => {
    const result: BulkConversionResult<
      ConversionParameterForNonFixedRate,
      SingleNonFixedRateConversionResult
    > = await currencyConverter.convertCurrenciesWithNonFixedRate(
      [constants.inrEurMConversionParam],
      buildAdapter([
        constants.inrEurMrmThrMDuplicateRate,
        constants.inrEurMrmThrMExcRate,
        constants.inrEurMrmEcbMDuplicateExcRate,
        constants.inrEurMrmEcbMRate
      ]),
      constants.TENANT_ID,
      constants.overrideTenantSettings
    );
    expect(result.get(constants.inrEurMConversionParam)).toBeInstanceOf(CurrencyConversionError);
    expect((result.get(constants.inrEurMConversionParam) as CurrencyConversionError).message).toBe(
      ConversionError.DUPLICATE_CONVERSION_RECORD_FOUND
    );
  });

  it('Bulk Conversion With No Record Found', async () => {
    const result: BulkConversionResult<
      ConversionParameterForNonFixedRate,
      SingleNonFixedRateConversionResult
    > = await currencyConverter.convertCurrenciesWithNonFixedRate(
      [constants.inrEurMConversionParam],
      buildAdapter([
        constants.eurInrMrmThrMExcRate,
        constants.eurInrMrmThrMDuplicateRate,
        constants.eurInrMrmEcbMRate,
        constants.eurInrMrmEcbMDuplicateExcRate
      ]),
      constants.TENANT_ID,
      constants.overrideTenantSettings
    );
    expect(result.get(constants.inrEurMConversionParam)).toBeInstanceOf(CurrencyConversionError);
    expect((result.get(constants.inrEurMConversionParam) as CurrencyConversionError).message).toBe(
      ConversionError.NO_MATCHING_EXCHANGE_RATE_RECORD
    );
  });

  it('Bulk Conversion With data Adapter Null', async () => {
    let errorInput: Error = new Error();
    let result: BulkConversionResult<ConversionParameterForNonFixedRate, SingleNonFixedRateConversionResult>;
    try {
      result = await await currencyConverter.convertCurrenciesWithNonFixedRate(
        [constants.inrEurMConversionParam],
        null as any,
        constants.TENANT_ID,
        constants.overrideTenantSettings
      );
    } catch (err) {
      errorInput = err;
    }
    expect(errorInput).toBeInstanceOf(CurrencyConversionError);
    expect(errorInput.message).toBe(ConversionError.NULL_ADAPTER_TENANT);
  });

  it('Bulk Conversion With Exchange Rates Null', async () => {
    let errorInput: Error = new Error();
    let result: BulkConversionResult<ConversionParameterForNonFixedRate, SingleNonFixedRateConversionResult>;
    try {
      result = await await currencyConverter.convertCurrenciesWithNonFixedRate(
        [constants.inrEurMConversionParam],
        buildAdapterWithNullExchangeRates(),
        constants.TENANT_ID,
        constants.overrideTenantSettings
      );
    } catch (err) {
      errorInput = err;
    }
    expect(errorInput).toBeInstanceOf(CurrencyConversionError);
    expect(errorInput.message).toBe(ConversionError.EMPTY_EXCHANGE_RATE_LIST);
  });

  it('Bulk Conversion With both Exchange Rates and default tenant settings Null', async () => {
    let errorInput: Error = new Error();
    let result: BulkConversionResult<ConversionParameterForNonFixedRate, SingleNonFixedRateConversionResult>;
    try {
      result = await await currencyConverter.convertCurrenciesWithNonFixedRate(
        [constants.inrEurMConversionParam],
        buildAdapterWithNullExchangeRatesAndDefaultTenantSettings(),
        constants.TENANT_ID,
        constants.overrideTenantSettings
      );
    } catch (err) {
      errorInput = err;
    }
    expect(errorInput).toBeInstanceOf(CurrencyConversionError);
    expect(errorInput.message).toBe(ConversionError.EMPTY_EXCHANGE_RATE_LIST);
  });

  it('Bulk Conversion With Exchange Rates Empty', async () => {
    let errorInput: Error = new Error();
    let result: BulkConversionResult<ConversionParameterForNonFixedRate, SingleNonFixedRateConversionResult>;
    try {
      result = await await currencyConverter.convertCurrenciesWithNonFixedRate(
        [constants.inrEurMConversionParam],
        buildAdapterWithEmptyExchangeRates(),
        constants.TENANT_ID,
        constants.overrideTenantSettings
      );
    } catch (err) {
      errorInput = err;
    }
    expect(errorInput).toBeInstanceOf(CurrencyConversionError);
    expect(errorInput.message).toBe(ConversionError.EMPTY_EXCHANGE_RATE_LIST);
  });
});
