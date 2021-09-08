/* Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved. */

import {
  CurrencyConversionError,
  DataAdapter,
  ExchangeRate,
  ExchangeRateTypeDetail,
  SingleNonFixedRateConversionResult,
  TenantSettings
} from '@sap-cloud-sdk/currency-conversion-models';
import { CurrencyConverter } from '../../src/core/currency-converter';
import { ConversionError } from '../../src/constants/conversion-error';
import * as constants from './test-data';

const currencyConverter: CurrencyConverter = new CurrencyConverter();

function buildAdapter(exchangeRates: ExchangeRate[]): DataAdapter {
  const adapter: DataAdapter = {} as DataAdapter;

  adapter.getExchangeRatesForTenant = (): Promise<ExchangeRate[]> => Promise.resolve(exchangeRates);

  adapter.getDefaultSettingsForTenant = (): Promise<TenantSettings> => Promise.resolve(null as any);

  adapter.getExchangeRateTypeDetailsForTenant = (): Promise<Map<string, ExchangeRateTypeDetail>> =>
    Promise.resolve(new Map());
  return adapter;
}
function buildAdapterWithDataSource(exchangeRates: ExchangeRate[], dataSource: string): DataAdapter {
  const adapter: DataAdapter = {} as DataAdapter;

  adapter.getExchangeRatesForTenant = (): Promise<ExchangeRate[]> => Promise.resolve(exchangeRates);

  adapter.getDefaultSettingsForTenant = (): Promise<TenantSettings> => Promise.resolve(null as any);

  adapter.getExchangeRateTypeDetailsForTenant = (): Promise<Map<string, ExchangeRateTypeDetail>> =>
    Promise.resolve(new Map());
  return adapter;
}

describe('Non Fixed Rate -- zero rate or zero factor tests default null and override tenant settings.', () => {
  it('Test Direct Zero Rate.', async () => {
    const result = (
      await currencyConverter.convertCurrenciesWithNonFixedRate(
        Array.of(constants.inrEurMConversionParam),
        buildAdapter([constants.inrEurMrmThrDirectZeroRate, constants.inrEurMrmEcbDirectZeroRate]),
        constants.TENANT_ID,
        constants.overrideTenantSettings
      )
    ).get(constants.inrEurMConversionParam) as SingleNonFixedRateConversionResult;
    expect(result).toBeTruthy();
    expect(result.convertedAmount.decimalValue.toNumber()).toBe(0);
    expect(result.roundedOffConvertedAmount.decimalValue.toString()).toBe('0');
    expect(result.exchangeRate).toMatchObject(constants.inrEurMrmThrDirectZeroRate);
  });

  it('Test Direct Zero to Factor Zero.', async () => {
    const result: SingleNonFixedRateConversionResult = await await currencyConverter.convertCurrencyWithNonFixedRate(
      constants.inrEurMConversionParam,
      buildAdapterWithDataSource(
        [constants.inrEurMrmThrDirectZeroToFactorZeroRate, constants.inrEurMrmEcbDirectZeroToFactorZeroRate],
        constants.ECB
      ),
      constants.TENANT_ID,
      constants.overrideTenantSettings
    );
    expect(result).toBeTruthy();
    expect(result.convertedAmount.decimalValue.toNumber()).toBe(0);
    expect(result.roundedOffConvertedAmount.decimalValue.toString()).toBe('0');
    expect(result.exchangeRate).toMatchObject(constants.inrEurMrmThrDirectZeroToFactorZeroRate);
  });

  it('Test Indirect Zero To Factor Rate.', async () => {
    const result = (
      await currencyConverter.convertCurrenciesWithNonFixedRate(
        Array.of(constants.inrEurMConversionParam),
        buildAdapterWithDataSource(
          [constants.inrEurMrmThrIndirectZeroToFactorRate, constants.inrEurMrmEcbIndirectZeroToFactorRate],
          constants.ECB
        ),
        constants.TENANT_ID,
        constants.overrideTenantSettings
      )
    ).get(constants.inrEurMConversionParam) as SingleNonFixedRateConversionResult;
    expect(result).toBeTruthy();
    expect(result.convertedAmount.decimalValue.toNumber()).toBe(0);
    expect(result.roundedOffConvertedAmount.decimalValue.toString()).toBe('0');
    expect(result.exchangeRate).toMatchObject(constants.inrEurMrmThrIndirectZeroToFactorRate);
  });

  it('Test Direct Zero To Factor Rate.', async () => {
    const result = (
      await currencyConverter.convertCurrenciesWithNonFixedRate(
        Array.of(constants.inrEurMConversionParam),
        buildAdapterWithDataSource(
          [constants.inrEurMrmThrDirectZeroToFactorRate, constants.inrEurMrmEcbDirectZeroToFactorRate],
          constants.ECB
        ),
        constants.TENANT_ID,
        constants.overrideTenantSettings
      )
    ).get(constants.inrEurMConversionParam) as SingleNonFixedRateConversionResult;
    expect(result).toBeTruthy();
    expect(result.convertedAmount.decimalValue.toNumber()).toBe(0);
    expect(result.roundedOffConvertedAmount.decimalValue.toString()).toBe('0');
    expect(result.exchangeRate).toMatchObject(constants.inrEurMrmThrDirectZeroToFactorRate);
  });

  it('Test Indirect Zero Rate', async () => {
    const result = (
      await currencyConverter.convertCurrenciesWithNonFixedRate(
        Array.of(constants.inrEurMConversionParam),
        buildAdapterWithDataSource(
          [constants.inrEurMrmThrIndirectZeroRate, constants.inrEurMrmEcbIndirectZeroRate],
          constants.ECB
        ),
        constants.TENANT_ID,
        constants.overrideTenantSettings
      )
    ).get(constants.inrEurMConversionParam) as SingleNonFixedRateConversionResult;
    expect(result).toBeTruthy();
    expect(result).toBeInstanceOf(Error);
  });

  it('Test Indirect Zero Factors Zero Rate.', async () => {
    const result = (
      await currencyConverter.convertCurrenciesWithNonFixedRate(
        Array.of(constants.inrEurMConversionParam),
        buildAdapterWithDataSource(
          [constants.inrEurMrmThrIndirectZeroFactorsZeroRate, constants.inrEurMrmEcbIndirectZeroFactorsZeroRate],
          constants.ECB
        ),
        constants.TENANT_ID,
        constants.overrideTenantSettings
      )
    ).get(constants.inrEurMConversionParam) as CurrencyConversionError;
    expect(result).toBeTruthy();
    expect(result).toBeInstanceOf(Error);
    expect(result.message).toBe(ConversionError.ZERO_CURRENCY_FACTOR);
  });

  it('Test Indirect Zero To Factor Zero Rate.', async () => {
    const result = (
      await currencyConverter.convertCurrenciesWithNonFixedRate(
        Array.of(constants.inrEurMConversionParam),
        buildAdapterWithDataSource(
          [constants.inrEurMrmThrIndirectZeroToFactorZeroRate, constants.inrEurMrmEcbIndirectZeroToFactorZeroRate],
          constants.ECB
        ),
        constants.TENANT_ID,
        constants.overrideTenantSettings
      )
    ).get(constants.inrEurMConversionParam) as CurrencyConversionError;
    expect(result).toBeTruthy();
    expect(result).toBeInstanceOf(Error);
  });

  it('Test Indirect Zero From Fact Zero Rate.', async () => {
    const result = (
      await currencyConverter.convertCurrenciesWithNonFixedRate(
        Array.of(constants.inrEurMConversionParam),
        buildAdapterWithDataSource(
          [constants.inrEurMrmThrIndirectZeroFromFactZeroRate, constants.inrEurMrmEcbIndirectZeroFromFactZeroRate],
          constants.ECB
        ),
        constants.TENANT_ID,
        constants.overrideTenantSettings
      )
    ).get(constants.inrEurMConversionParam) as CurrencyConversionError;
    expect(result).toBeTruthy();
    expect(result).toBeInstanceOf(Error);
    expect(result.message).toBe(ConversionError.ZERO_CURRENCY_FACTOR);
  });

  it('Test Direct Zero Factors Zero Rate.', async () => {
    const result = (
      await currencyConverter.convertCurrenciesWithNonFixedRate(
        Array.of(constants.inrEurMConversionParam),
        buildAdapterWithDataSource(
          [constants.inrEurMrmThrDirectZeroFactorsZeroRate, constants.inrEurMrmEcbDirectZeroFactorsZeroRate],
          constants.ECB
        ),
        constants.TENANT_ID,
        constants.overrideTenantSettings
      )
    ).get(constants.inrEurMConversionParam) as CurrencyConversionError;
    expect(result).toBeTruthy();
    expect(result).toBeInstanceOf(Error);
    expect(result.message).toBe(ConversionError.ZERO_CURRENCY_FACTOR);
  });

  it('Test Direct Zero From Fact Zero Rate.', async () => {
    const result = (
      await currencyConverter.convertCurrenciesWithNonFixedRate(
        Array.of(constants.inrEurMConversionParam),
        buildAdapterWithDataSource(
          [constants.inrEurMrmThrDirectZeroFromFactZeroRate, constants.inrEurMrmEcbDirectZeroFromFactZeroRate],
          constants.ECB
        ),
        constants.TENANT_ID,
        constants.overrideTenantSettings
      )
    ).get(constants.inrEurMConversionParam) as CurrencyConversionError;
    expect(result).toBeTruthy();
    expect(result).toBeInstanceOf(Error);
    expect(result.message).toBe(ConversionError.ZERO_CURRENCY_FACTOR);
  });

  it('Test Indirect Zero Factors Rate.', async () => {
    const result = (
      await currencyConverter.convertCurrenciesWithNonFixedRate(
        Array.of(constants.inrEurMConversionParam),
        buildAdapterWithDataSource(
          [constants.inrEurMrmThrIndirectZeroFactorsRate, constants.inrEurMrmEcbIndirectZeroFactorsRate],
          constants.ECB
        ),
        constants.TENANT_ID,
        constants.overrideTenantSettings
      )
    ).get(constants.inrEurMConversionParam) as CurrencyConversionError;
    expect(result).toBeTruthy();
    expect(result).toBeInstanceOf(Error);
    expect(result.message).toBe(ConversionError.ZERO_CURRENCY_FACTOR);
  });

  it('Test Indirect Zero From Factor Rate.', async () => {
    const result = (
      await currencyConverter.convertCurrenciesWithNonFixedRate(
        Array.of(constants.inrEurMConversionParam),
        buildAdapterWithDataSource(
          [constants.inrEurMrmThrIndirectZeroFromFactorRate, constants.inrEurMrmEcbIndirectZeroFromFactorRate],
          constants.ECB
        ),
        constants.TENANT_ID,
        constants.overrideTenantSettings
      )
    ).get(constants.inrEurMConversionParam) as CurrencyConversionError;
    expect(result).toBeTruthy();
    expect(result).toBeInstanceOf(Error);
    expect(result.message).toBe(ConversionError.ZERO_CURRENCY_FACTOR);
  });

  it('Test Direct Zero Factors Rate.', async () => {
    const result = (
      await currencyConverter.convertCurrenciesWithNonFixedRate(
        Array.of(constants.inrEurMConversionParam),
        buildAdapterWithDataSource(
          [constants.inrEurMrmThrDirectZeroFactorsRate, constants.inrEurMrmEcbDirectZeroFactorsRate],
          constants.ECB
        ),
        constants.TENANT_ID,
        constants.overrideTenantSettings
      )
    ).get(constants.inrEurMConversionParam) as CurrencyConversionError;
    expect(result).toBeTruthy();
    expect(result).toBeInstanceOf(Error);
    expect(result.message).toBe(ConversionError.ZERO_CURRENCY_FACTOR);
  });

  it('Test Direct Zero From Factor Rate.', async () => {
    const result = (
      await currencyConverter.convertCurrenciesWithNonFixedRate(
        Array.of(constants.inrEurMConversionParam),
        buildAdapterWithDataSource(
          [constants.inrEurMrmThrDirectZeroFromFactorRate, constants.inrEurMrmEcbDirectZeroFromFactorRate],
          constants.ECB
        ),
        constants.TENANT_ID,
        constants.overrideTenantSettings
      )
    ).get(constants.inrEurMConversionParam) as CurrencyConversionError;
    expect(result).toBeTruthy();
    expect(result).toBeInstanceOf(Error);
    expect(result.message).toBe(ConversionError.ZERO_CURRENCY_FACTOR);
  });
});
