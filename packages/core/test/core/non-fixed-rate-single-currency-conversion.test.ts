/* Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved. */
import { Tenant } from '@sap-cloud-sdk/core';
import {
  CurrencyConversionError,
  ConversionParameterForNonFixedRate,
  DataAdapter,
  ExchangeRate,
  ExchangeRateTypeDetail,
  SingleNonFixedRateConversionResult,
  TenantSettings
} from '@sap-cloud-sdk/currency-conversion-models';
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
    return Promise.resolve(exchangeRates);
  };

  adapter.getDefaultSettingsForTenant = (tenant: Tenant): Promise<TenantSettings> =>
    Promise.resolve(constants.defaultTenantSettings);

  adapter.getExchangeRateTypeDetailsForTenant = (
    tenant: Tenant,
    rateTypeSet: string[]
  ): Promise<Map<string, ExchangeRateTypeDetail>> => Promise.resolve(new Map());
  return adapter;
}

function buildAdapterTSNull(exchangeRates: ExchangeRate[]): DataAdapter {
  const adapter: DataAdapter = {} as DataAdapter;

  adapter.getExchangeRatesForTenant = (
    params: ConversionParameterForNonFixedRate[],
    tenant: Tenant,
    tenantSettings: TenantSettings
  ): Promise<ExchangeRate[]> => Promise.resolve(exchangeRates);

  adapter.getDefaultSettingsForTenant = (tenant: Tenant): Promise<TenantSettings> => Promise.resolve(new Array()[0]);

  adapter.getExchangeRateTypeDetailsForTenant = (
    tenant: Tenant,
    rateTypeSet: string[]
  ): Promise<Map<string, ExchangeRateTypeDetail>> => Promise.resolve(new Map());
  return adapter;
}
describe('Non Fixed Rate -- Single Currency Conversoin Tests Positive.', () => {
  it('Test Direct Conversion Decimal Value.', async () => {
    const result: SingleNonFixedRateConversionResult = await currencyConverter.convertCurrencyWithNonFixedRate(
      constants.eurInrDecimalValueConvParam,
      buildAdapter([
        constants.eurInrMrmEcbDirectConversionDecimal,
        constants.inrEurMrmEcbMRate,
        constants.inrEurMrmEcbMDiffrentTenantRate,
        constants.eurInrMrmThrMRate
      ]),
      constants.TENANT_ID
    );
    expect(result).toBeTruthy();
    expect(result.convertedAmount.valueString).toBe('14831.1106484722999998921741');
    expect(result.roundedOffConvertedAmount.valueString).toBe('14831.11');
    expect(result.exchangeRate.data.ratesDataSource).toBe('ECB');
  });

  it('Test Direct Conversion Exponent Three.', async () => {
    const result: SingleNonFixedRateConversionResult = await currencyConverter.convertCurrencyWithNonFixedRate(
      constants.usdBhdMConversionParam,
      buildAdapter([constants.usdBhdMrmEcbMRate]),
      constants.TENANT_ID
    );
    expect(result).toBeTruthy();
    expect(result.roundedOffConvertedAmount.decimalValue.dp()).toEqual(3);
    expect(result.exchangeRate.data.ratesDataSource).toBe('ECB');
  });

  it('Test Direct Conversion Rounded Off Value Exponent Four.', async () => {
    const result: SingleNonFixedRateConversionResult = await currencyConverter.convertCurrencyWithNonFixedRate(
      constants.usdClfMConversionParam,
      buildAdapter([constants.usdClfMrmEcbMRate]),
      constants.TENANT_ID
    );
    expect(result).toBeTruthy();
    expect(result.roundedOffConvertedAmount.decimalValue.dp()).toEqual(4);
    expect(result.exchangeRate.data.ratesDataSource).toBe('ECB');
  });

  it('Test Direct Conversion Rounded Halfup Last Digit Five.', async () => {
    const result: SingleNonFixedRateConversionResult = await currencyConverter.convertCurrencyWithNonFixedRate(
      constants.inrBhdMFiveParam,
      buildAdapter([constants.inrBhdMrmEcbMRate]),
      constants.TENANT_ID
    );
    expect(result).toBeTruthy();
    expect(result.convertedAmount.valueString).toEqual('6.0425223');
    expect(result.roundedOffConvertedAmount.valueString).toEqual('6.043');
    expect(result.roundedOffConvertedAmount.decimalValue.dp()).toEqual(
      constants.inrBhdMFiveParam.toCurrency.defaultFractionDigits
    );
    expect(result.exchangeRate.data.ratesDataSource).toBe('ECB');
  });

  it('Test Direct Conversion Rounded Halfup Last Digit More Than Five.', async () => {
    const result: SingleNonFixedRateConversionResult = await currencyConverter.convertCurrencyWithNonFixedRate(
      constants.inrBhdMMoreThanFiveParam,
      buildAdapter([constants.inrBhdMrmEcbMRate]),
      constants.TENANT_ID
    );
    expect(result).toBeTruthy();
    expect(result.convertedAmount.valueString).toEqual('2555295.4999699377');
    expect(result.roundedOffConvertedAmount.valueString).toEqual('2555295.5');
    expect(result.roundedOffConvertedAmount.decimalValue.dp()).toEqual(1);
    expect(result.exchangeRate.data.ratesDataSource).toBe('ECB');
  });

  it('Test Direct Conversion With Empty Exchange RateType Details.', async () => {
    const result: SingleNonFixedRateConversionResult = await currencyConverter.convertCurrencyWithNonFixedRate(
      constants.inrEurMConversionParam,
      buildAdapter([
        constants.inrEurMrmEcbMRate,
        constants.eurInrMrmEcbMRate,
        constants.eurInrMrmEcbIndirectConversionRate,
        constants.eurUsdMrmEcbAskRate,
        constants.inrEurMrmEcbMDiffrentTenantRate,
        constants.usdEurMrmThrMExRate,
        constants.eurInrMrmThrMRate,
        constants.eurInrMrmEcbAskIndirectFalseRate
      ]),
      constants.TENANT_ID
    );
    expect(result).toBeTruthy();
    expect(result.exchangeRate.fromCurrency.currencyCode).toEqual(
      constants.inrEurMrmEcbMRate.fromCurrency.currencyCode
    );
    expect(result.exchangeRate.toCurrency.currencyCode).toEqual(constants.inrEurMrmEcbMRate.toCurrency.currencyCode);
    expect(result.convertedAmount.valueString).toBe('10000');
    expect(result.roundedOffConvertedAmount.valueString).toBe('10000');
    expect(result.exchangeRate.data.ratesDataSource).toBe('ECB');
  });
  it('Test Single Conversion With Exchange Rat eRecord Having Future Date', async () => {
    await expect(
      currencyConverter.convertCurrencyWithNonFixedRate(
        constants.inrEurMConvParamPastDate,
        buildAdapter([constants.eurInrMrmThrMRate, constants.inrEurMrmEcbMRate, constants.eurInrMrmEcbMRate]),
        constants.TENANT_ID
      )
    ).rejects.toThrowError();
  });

  it('Test Single Conversion With Null Conversion Params', async () => {
    const temp: ConversionParameterForNonFixedRate[] = new Array();
    await expect(
      currencyConverter.convertCurrencyWithNonFixedRate(
        temp[0],
        buildAdapter([constants.eurInrMrmThrMRate, constants.inrEurMrmEcbMRate, constants.eurInrMrmEcbMRate]),
        constants.TENANT_ID
      )
    ).rejects.toThrowError();
  });

  it('Test Single Conversion With Empty Exchange Rates.', async () => {
    const temp: ExchangeRate[] = new Array();
    await expect(
      currencyConverter.convertCurrencyWithNonFixedRate(
        constants.inrEurMConvParamPastDate,
        buildAdapter(temp),
        constants.TENANT_ID
      )
    ).rejects.toThrowError();
  });
  it('Test Single Conversion With ExchangeRates Throws DataAdapterException.', async () => {
    const temp: ExchangeRate[] = new Array();
    await expect(
      currencyConverter.convertCurrencyWithNonFixedRate(
        constants.inrEurMConvParamPastDate,
        buildAdapterThrowsExcpetion(temp),
        constants.TENANT_ID
      )
    ).rejects.toThrowError();
  });
  it('Test Single Conversion With Duplicate Exchange Rate Same TimeStamp', async () => {
    await expect(
      currencyConverter.convertCurrencyWithNonFixedRate(
        constants.inrEurMConversionParam,
        buildAdapter([constants.inrEurMrmEcbMDuplicateExRate, constants.inrEurMrmEcbMRate]),
        constants.TENANT_ID
      )
    ).rejects.toThrowError();
  });
  it('Test Single Conversion With Duplicate Record.', async () => {
    await expect(
      currencyConverter.convertCurrencyWithNonFixedRate(
        constants.inrEurMConversionParam,
        buildAdapter([constants.inrEurMrmEcbMDuplicateExRate, constants.inrEurMrmEcbMRate]),
        constants.TENANT_ID
      )
    ).rejects.toThrowError();
  });
  it('Test Single Conversion With No Record Found', async () => {
    await expect(
      currencyConverter.convertCurrencyWithNonFixedRate(
        constants.inrEurMConversionParam,
        buildAdapter([constants.eurInrMrmThrMRate, constants.eurInrMrmEcbMDuplicateExRate]),
        constants.TENANT_ID
      )
    ).rejects.toThrowError();
  });
  it('Test Single Conversion With Data Adapter Null', async () => {
    const temp: DataAdapter[] = new Array();
    await expect(
      currencyConverter.convertCurrencyWithNonFixedRate(constants.inrEurMConversionParam, temp[0], constants.TENANT_ID)
    ).rejects.toThrowError();
  });
  it('Test Single Conversion With Exchange Rates Null', async () => {
    const temp: ExchangeRate[] = new Array();
    await expect(
      currencyConverter.convertCurrencyWithNonFixedRate(
        constants.inrEurMConversionParam,
        buildAdapter(temp),
        constants.TENANT_ID
      )
    ).rejects.toThrowError();
  });
  it('Test Single Conversion With Exchange Rates And Default TS Null', async () => {
    const temp: ExchangeRate[] = new Array();
    await expect(
      currencyConverter.convertCurrencyWithNonFixedRate(
        constants.inrEurMConversionParam,
        buildAdapterTSNull(temp),
        constants.TENANT_ID
      )
    ).rejects.toThrowError();
  });
});
