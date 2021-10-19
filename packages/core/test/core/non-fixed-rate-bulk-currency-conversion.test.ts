/* Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved. */
import { Tenant } from '@sap-cloud-sdk/core';
import {
  CurrencyConversionError,
  DataAdapter,
  ExchangeRate,
  SingleNonFixedRateConversionResult,
  TenantSettings,
  ExchangeRateTypeDetail,
  ConversionParameterForNonFixedRate
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
  ): Promise<Map<string, ExchangeRateTypeDetail>> => Promise.resolve(new Map());
  return adapter;
}

function buildAdapterThrowsExcpetion(exchangeRates: ExchangeRate[]): DataAdapter {
  const adapter: DataAdapter = {} as DataAdapter;

  adapter.getExchangeRatesForTenant = (
    params: ConversionParameterForNonFixedRate[],
    tenant: Tenant,
    tenantSettings: TenantSettings
  ): Promise<ExchangeRate[]> => {
    throw new CurrencyConversionError('Data Adapter Exceptions.');
    Promise.resolve(exchangeRates);
  };

  adapter.getDefaultSettingsForTenant = (tenant: Tenant): Promise<TenantSettings> =>
    Promise.resolve(constants.defaultTenantSettings);

  adapter.getExchangeRateTypeDetailsForTenant = (
    tenant: Tenant,
    rateTypeSet: string[]
  ): Promise<Map<string, ExchangeRateTypeDetail>> => Promise.resolve(new Map());
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

describe('Non Fixed Rate -- Bulk Currency Conversion Tests.', () => {
  it('Test Direct Conversion Decimal Value.', async () => {
    const result = await currencyConverter.convertCurrenciesWithNonFixedRate(
      Array.of(constants.eurInrDecimalValueConvParam),
      buildAdapter([
        constants.eurInrMrmEcbDirectConversionDecimal,
        constants.inrEurMrmEcbMRate,
        constants.inrEurMrmEcbMDiffrentTenantRate,
        constants.eurInrMrmThrMRate
      ]),
      constants.TENANT_ID
    );
    expect(result).toBeTruthy();
    expect(
      (result.get(constants.eurInrDecimalValueConvParam) as SingleNonFixedRateConversionResult).convertedAmount
        .valueString
    ).toBe('14831.1106484722999998921741');
    expect(
      (result.get(constants.eurInrDecimalValueConvParam) as SingleNonFixedRateConversionResult)
        .roundedOffConvertedAmount.valueString
    ).toBe('14831.11');
    expect(
      (result.get(constants.eurInrDecimalValueConvParam) as SingleNonFixedRateConversionResult).exchangeRate.data
        .ratesDataSource
    ).toBe('ECB');
  });

  it('Test Direct Conversion Exponent Three.', async () => {
    const result = await currencyConverter.convertCurrenciesWithNonFixedRate(
      Array.of(constants.usdBhdMConversionParam),
      buildAdapter([constants.usdBhdMrmEcbMRate]),
      constants.TENANT_ID
    );
    expect(result.get(constants.usdBhdMConversionParam) as SingleNonFixedRateConversionResult).toBeTruthy();
    expect(
      (result.get(
        constants.usdBhdMConversionParam
      ) as SingleNonFixedRateConversionResult).roundedOffConvertedAmount.decimalValue.dp()
    ).toEqual(3);
    expect(
      (result.get(constants.usdBhdMConversionParam) as SingleNonFixedRateConversionResult).exchangeRate.data
        .ratesDataSource
    ).toBe('ECB');
  });

  it('Test Direct Conversion Rounded Off Value Exponent Four.', async () => {
    const result = await currencyConverter.convertCurrenciesWithNonFixedRate(
      Array.of(constants.usdClfMConversionParam),
      buildAdapter([constants.usdClfMrmEcbMRate]),
      constants.TENANT_ID
    );
    expect(result.get(constants.usdClfMConversionParam) as SingleNonFixedRateConversionResult).toBeTruthy();
    expect(
      (result.get(
        constants.usdClfMConversionParam
      ) as SingleNonFixedRateConversionResult).roundedOffConvertedAmount.decimalValue.dp()
    ).toEqual(4);
    expect(
      (result.get(constants.usdClfMConversionParam) as SingleNonFixedRateConversionResult).exchangeRate.data
        .ratesDataSource
    ).toBe('ECB');
  });

  it('Test Direct Conversion Rounded Halfup Last Digit Five.', async () => {
    const result = await currencyConverter.convertCurrenciesWithNonFixedRate(
      Array.of(constants.inrBhdMFiveParam),
      buildAdapter([constants.inrBhdMrmEcbMRate]),
      constants.TENANT_ID
    );
    expect(result.get(constants.inrBhdMFiveParam) as SingleNonFixedRateConversionResult).toBeTruthy();
    expect(
      (result.get(constants.inrBhdMFiveParam) as SingleNonFixedRateConversionResult).convertedAmount.valueString
    ).toEqual('6.0425223');
    expect(
      (result.get(constants.inrBhdMFiveParam) as SingleNonFixedRateConversionResult).roundedOffConvertedAmount
        .valueString
    ).toEqual('6.043');
    expect(
      (result.get(
        constants.inrBhdMFiveParam
      ) as SingleNonFixedRateConversionResult).roundedOffConvertedAmount.decimalValue.dp()
    ).toEqual(constants.inrBhdMFiveParam.toCurrency.defaultFractionDigits);
    expect(
      (result.get(constants.inrBhdMFiveParam) as SingleNonFixedRateConversionResult).exchangeRate.data.ratesDataSource
    ).toBe('ECB');
  });

  it('Test Direct Conversion Rounded Halfup Last Digit More Than Five.', async () => {
    const result = await currencyConverter.convertCurrenciesWithNonFixedRate(
      Array.of(constants.inrBhdMMoreThanFiveParam),
      buildAdapter([constants.inrBhdMrmEcbMRate]),
      constants.TENANT_ID
    );
    expect(result.get(constants.inrBhdMMoreThanFiveParam) as SingleNonFixedRateConversionResult).toBeTruthy();
    expect(
      (result.get(constants.inrBhdMMoreThanFiveParam) as SingleNonFixedRateConversionResult).convertedAmount.valueString
    ).toEqual('2555295.4999699377');
    expect(
      (result.get(constants.inrBhdMMoreThanFiveParam) as SingleNonFixedRateConversionResult).roundedOffConvertedAmount
        .valueString
    ).toEqual('2555295.5');
    expect(
      (result.get(
        constants.inrBhdMMoreThanFiveParam
      ) as SingleNonFixedRateConversionResult).roundedOffConvertedAmount.decimalValue.dp()
    ).toEqual(1);
    expect(
      (result.get(constants.inrBhdMMoreThanFiveParam) as SingleNonFixedRateConversionResult).exchangeRate.data
        .ratesDataSource
    ).toBe('ECB');
  });

  it('Test Direct Conversion With Empty Exchange RateType Details.', async () => {
    const result = await currencyConverter.convertCurrenciesWithNonFixedRate(
      Array.of(constants.inrEurMConversionParam),
      buildAdapter([
        constants.inrEurMrmEcbMRate,
        constants.eurInrMrmEcbMRate,
        constants.eurInrMrmEcbIndirectConversionRate,
        constants.eurUsdMrmEcbAskRate,
        constants.inrEurMrmEcbMDiffrentTenantRate,
        constants.usdEurMrmThrMRate,
        constants.eurInrMrmThrMRate,
        constants.eurInrMrmEcbAskIndirectFalseRate
      ]),
      constants.TENANT_ID
    );
    expect(result.get(constants.inrEurMConversionParam) as SingleNonFixedRateConversionResult).toBeTruthy();
    expect(
      (result.get(constants.inrEurMConversionParam) as SingleNonFixedRateConversionResult).exchangeRate.fromCurrency
        .currencyCode
    ).toEqual(constants.inrEurMrmEcbMRate.fromCurrency.currencyCode);
    expect(
      (result.get(constants.inrEurMConversionParam) as SingleNonFixedRateConversionResult).exchangeRate.toCurrency
        .currencyCode
    ).toEqual(constants.inrEurMrmEcbMRate.toCurrency.currencyCode);
    expect(
      (result.get(constants.inrEurMConversionParam) as SingleNonFixedRateConversionResult).convertedAmount.valueString
    ).toBe('10000');
    expect(
      (result.get(constants.inrEurMConversionParam) as SingleNonFixedRateConversionResult).roundedOffConvertedAmount
        .valueString
    ).toBe('10000');
    expect(
      (result.get(constants.inrEurMConversionParam) as SingleNonFixedRateConversionResult).exchangeRate.data
        .ratesDataSource
    ).toBe('ECB');
  });
  // Non Fixed Rate -- Single Currency Conversoin Tests Negative.
  it('Test Bulk Conversion With Exchange Rate Record Having Future Date', async () => {
    expect(
      (
        await currencyConverter.convertCurrenciesWithNonFixedRate(
          Array.of(constants.inrEurMConvParamPastDate),
          buildAdapter([constants.eurInrMrmThrMRate, constants.inrEurMrmEcbMRate, constants.eurInrMrmEcbMRate]),
          constants.TENANT_ID
        )
      ).get(constants.inrEurMConvParamPastDate)
    ).toBeTruthy();

    expect(
      (
        await currencyConverter.convertCurrenciesWithNonFixedRate(
          Array.of(constants.inrEurMConvParamPastDate),
          buildAdapter([constants.eurInrMrmThrMRate, constants.inrEurMrmEcbMRate, constants.eurInrMrmEcbMRate]),
          constants.TENANT_ID
        )
      ).get(constants.inrEurMConvParamPastDate)
    ).toBeInstanceOf(CurrencyConversionError);
  });

  it('Test Bulk Conversion With Null Conversion Params', async () => {
    await expect(
      currencyConverter.convertCurrenciesWithNonFixedRate(
        null as any,
        buildAdapter([constants.eurInrMrmThrMRate, constants.inrEurMrmEcbMRate, constants.eurInrMrmEcbMRate]),
        constants.TENANT_ID
      )
    ).rejects.toThrow(ConversionError.INVALID_PARAMS);
  });

  it('Test Bulk Conversion With Empty Exchange Rates.', async () => {
    const temp: ExchangeRate[] = new Array();
    await expect(
      currencyConverter.convertCurrenciesWithNonFixedRate(
        Array.of(constants.inrEurMConvParamPastDate),
        buildAdapter(temp),
        constants.TENANT_ID
      )
    ).rejects.toThrow(ConversionError.EMPTY_EXCHANGE_RATE_LIST);
  });
  it('Test Bulk Conversion With ExchangeRates Throws DataAdapterException.', async () => {
    const temp: ExchangeRate[] = new Array();
    await expect(
      currencyConverter.convertCurrenciesWithNonFixedRate(
        Array.of(constants.inrEurMConvParamPastDate),
        buildAdapterThrowsExcpetion(temp),
        constants.TENANT_ID
      )
    ).rejects.toThrow('Data Adapter Exceptions.');
  });
  it('Test Bulk Conversion With Duplicate Exchange Rate Same TimeStamp', async () => {
    expect(
      (
        await currencyConverter.convertCurrenciesWithNonFixedRate(
          Array.of(constants.inrEurMConversionParam),
          buildAdapter([constants.inrEurMrmEcbMDuplicateRate, constants.inrEurMrmEcbMRate]),
          constants.TENANT_ID
        )
      ).get(constants.inrEurMConversionParam)
    ).toBeInstanceOf(CurrencyConversionError);
  });
  it('Test Bulk Conversion With Duplicate Record.', async () => {
    expect(
      (
        await currencyConverter.convertCurrenciesWithNonFixedRate(
          Array.of(constants.inrEurMConversionParam),
          buildAdapter([constants.inrEurMrmEcbMDuplicateRate, constants.inrEurMrmEcbMRate]),
          constants.TENANT_ID
        )
      ).get(constants.inrEurMConversionParam)
    ).toBeInstanceOf(CurrencyConversionError);
  });
  it('Test bulk Conversion With No Record Found', async () => {
    expect(
      (
        await currencyConverter.convertCurrenciesWithNonFixedRate(
          Array.of(constants.inrEurMConversionParam),
          buildAdapter([constants.eurInrMrmThrMRate, constants.eurInrMrmEcbMDuplicateRate]),
          constants.TENANT_ID
        )
      ).get(constants.inrEurMConversionParam)
    ).toBeInstanceOf(CurrencyConversionError);
  });
  it('Test bulk Conversion With Data Adapter Null', async () => {
    await expect(
      currencyConverter.convertCurrenciesWithNonFixedRate(
        Array.of(constants.inrEurMConversionParam),
        null as any,
        constants.TENANT_ID
      )
    ).rejects.toThrow(ConversionError.NULL_ADAPTER_TENANT);
  });
  it('Test bulk Conversion With Exchange Rates Null', async () => {
    const temp: ExchangeRate[] = new Array();
    await expect(
      currencyConverter.convertCurrenciesWithNonFixedRate(
        Array.of(constants.inrEurMConversionParam),
        buildAdapterWithNullExchangeRates(),
        constants.TENANT_ID
      )
    ).rejects.toThrow(ConversionError.EMPTY_EXCHANGE_RATE_LIST);
  });
  it('Test Bulk Conversion With Exchange Rates And Default TS Null', async () => {
    const temp: ExchangeRate[] = new Array();
    await expect(
      currencyConverter.convertCurrenciesWithNonFixedRate(
        Array.of(constants.inrEurMConversionParam),
        buildAdapterWithNullExchangeRatesAndDefaultTenantSettings(),
        constants.TENANT_ID
      )
    ).rejects.toThrow(ConversionError.EMPTY_EXCHANGE_RATE_LIST);
  });
});
