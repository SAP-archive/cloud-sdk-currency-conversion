/* Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved. */

import {
  buildCurrency,
  CurrencyConversionError,
  DataAdapter,
  ExchangeRate,
  ExchangeRateTypeDetail,
  SingleNonFixedRateConversionResult,
  TenantSettings,
  buildExchangeRateTypeDetail
} from '@sap-cloud-sdk/currency-conversion-models';
import { CurrencyConverter } from '../../src/core/currency-converter';
import * as constants from './test-data';

const currencyConverter: CurrencyConverter = new CurrencyConverter();

function buildAdapter(exchangeRates: ExchangeRate[]): DataAdapter {
  const adapter: DataAdapter = {} as DataAdapter;

  adapter.getExchangeRatesForTenant = (): Promise<ExchangeRate[]> => Promise.resolve(exchangeRates);

  adapter.getDefaultSettingsForTenant = (): Promise<TenantSettings> => Promise.resolve(null as any);

  adapter.getExchangeRateTypeDetailsForTenant = (): Promise<Map<string, ExchangeRateTypeDetail>> => {
    const exchangeRate: Map<string, ExchangeRateTypeDetail> = new Map();
    exchangeRate.set(constants.A, buildExchangeRateTypeDetail(buildCurrency('INR'), true));
    exchangeRate.set(constants.LAST, buildExchangeRateTypeDetail(buildCurrency('AFN'), true));
    exchangeRate.set(constants.ASK, buildExchangeRateTypeDetail(null as any, false));
    return Promise.resolve(exchangeRate);
  };
  return adapter;
}

describe('Non Fixed Rate Currency Conversion -- Reference currency null tenant settings Tests.', () => {
  it('Test Single Conversion With Reference Currency.', async () => {
    const result: SingleNonFixedRateConversionResult = await currencyConverter.convertCurrencyWithNonFixedRate(
      constants.eurUsdAConversionParam,
      buildAdapter([constants.eurInrMrmEcbARate, constants.usdInrMrmEcbARate]),
      constants.TENANT_ID
    );
    expect(result).toBeTruthy();
    expect(result.convertedAmount.valueString).toBe('50');
    expect(result.exchangeRate.fromCurrency.currencyCode).toBe('EUR');
    expect(result.exchangeRate.toCurrency.currencyCode).toBe('USD');
  });

  it('Test Bulk Conversion With Reference Currency.', async () => {
    const result: SingleNonFixedRateConversionResult = (
      await currencyConverter.convertCurrenciesWithNonFixedRate(
        Array.of(constants.eurUsdAConversionParam),
        buildAdapter([constants.eurInrMrmEcbARate, constants.usdInrMrmEcbARate]),
        constants.TENANT_ID
      )
    ).get(constants.eurUsdAConversionParam) as SingleNonFixedRateConversionResult;
    expect(result).toBeTruthy();
    expect(result.convertedAmount.valueString).toBe('50');
    expect(result.exchangeRate.fromCurrency.currencyCode).toBe('EUR');
    expect(result.exchangeRate.toCurrency.currencyCode).toBe('USD');
  });

  it('Test Conversion Reference Currency And Inversion Null', async () => {
    await expect(
      currencyConverter.convertCurrencyWithNonFixedRate(
        constants.eurUsdAskConversionParam,
        buildAdapter([constants.eurInrMrmEcbAskRate, constants.usdInrMrmEcbAskRate]),
        constants.TENANT_ID
      )
    ).rejects.toThrowError(CurrencyConversionError);
  });

  it('Test Reference Currency With Exchange Rate Record Having Future Date', async () => {
    await expect(
      currencyConverter.convertCurrencyWithNonFixedRate(
        constants.eurUsdAConvParamPastDate,
        buildAdapter([constants.usdInrMrmEcbARate, constants.eurInrMrmEcbARate]),
        constants.TENANT_ID
      )
    ).rejects.toThrowError(CurrencyConversionError);
  });

  it('Test Conversion With Non-Existing Reference Currency', async () => {
    await expect(
      currencyConverter.convertCurrencyWithNonFixedRate(
        constants.eurUsdLastConversionParam,
        buildAdapter([constants.usdInrMrmEcbLastRate, constants.eurInrMrmEcbLastRate]),
        constants.TENANT_ID
      )
    ).rejects.toThrowError(CurrencyConversionError);
  });

  it('Test Reference Currency With Non-Existing RateType', async () => {
    await expect(
      currencyConverter.convertCurrencyWithNonFixedRate(
        constants.eurUsdNewConversionParam,
        buildAdapter([constants.usdInrMrmEcbLastRate, constants.eurInrMrmEcbLastRate]),
        constants.TENANT_ID
      )
    ).rejects.toThrowError(CurrencyConversionError);
  });

  it('Test Reference Currency With Direct Rate No From Reference Pair', async () => {
    const result = await currencyConverter.convertCurrencyWithNonFixedRate(
      constants.eurUsdAConversionParam,
      buildAdapter([
        constants.usdInrMrmEcbARate,
        constants.eurUsdMrmEcbIndirectTrueRate,
        constants.eurUsdMrmEcbIndirectFalseRate
      ]),
      constants.TENANT_ID
    );
    expect(result).toBeTruthy();
    expect(result.convertedAmount.valueString).toBe('200');
    expect(result.roundedOffConvertedAmount.valueString).toBe('200');
    expect(result.exchangeRate).toMatchObject(constants.eurUsdMrmEcbIndirectFalseRate);
  });

  it('Test Reference Currency With Direct RateNo To Reference Pair', async () => {
    const result = (
      await currencyConverter.convertCurrenciesWithNonFixedRate(
        Array.of(constants.eurUsdAConversionParam),
        buildAdapter([
          constants.eurInrMrmEcbARate,
          constants.eurUsdMrmEcbIndirectTrueRate,
          constants.eurUsdMrmEcbIndirectFalseRate
        ]),
        constants.TENANT_ID
      )
    ).get(constants.eurUsdAConversionParam) as SingleNonFixedRateConversionResult;
    expect(result).toBeTruthy();
    expect(result.convertedAmount.valueString).toBe('200');
    expect(result.roundedOffConvertedAmount.valueString).toBe('200');
    expect(result.exchangeRate).toMatchObject(constants.eurUsdMrmEcbIndirectFalseRate);
  });

  it('Test Reference Currency With Direct Rate No From And To Reference Pair', async () => {
    const result = await currencyConverter.convertCurrencyWithNonFixedRate(
      constants.eurUsdAConversionParam,
      buildAdapter([constants.eurUsdMrmEcbIndirectTrueRate, constants.eurUsdMrmEcbIndirectFalseRate]),
      constants.TENANT_ID
    );
    expect(result).toBeTruthy();
    expect(result.convertedAmount.valueString).toBe('200');
    expect(result.roundedOffConvertedAmount.valueString).toBe('200');
    expect(result.exchangeRate).toMatchObject(constants.eurUsdMrmEcbIndirectFalseRate);
  });

  it('Test Reference Currency Duplicate From Reference Pair', async () => {
    await expect(
      currencyConverter.convertCurrencyWithNonFixedRate(
        constants.eurUsdAConversionParam,
        buildAdapter([
          constants.eurUsdMrmEcbIndirectTrueRate,
          constants.eurUsdMrmEcbIndirectFalseRate,
          constants.eurInrMrmEcbARate,
          constants.usdInrMrmEcbARate,
          constants.eurInrMrmEcbADuplicateRate
        ]),
        constants.TENANT_ID
      )
    ).rejects.toThrowError(CurrencyConversionError);
  });

  it('Test Reference Currency Duplicate To Reference Pair', async () => {
    await expect(
      currencyConverter.convertCurrencyWithNonFixedRate(
        constants.eurUsdAConversionParam,
        buildAdapter([
          constants.eurUsdMrmEcbIndirectTrueRate,
          constants.eurUsdMrmEcbIndirectFalseRate,
          constants.eurInrMrmEcbARate,
          constants.usdInrMrmEcbARate,
          constants.usdInrMrmEcbDuplicateDateRate
        ]),
        constants.TENANT_ID
      )
    ).rejects.toThrowError(CurrencyConversionError);
  });

  it('Test Reference Currency Duplicate From And To Reference Pair.', async () => {
    await expect(
      currencyConverter.convertCurrencyWithNonFixedRate(
        constants.eurUsdAConversionParam,
        buildAdapter([
          constants.eurUsdMrmEcbIndirectTrueRate,
          constants.eurUsdMrmEcbIndirectFalseRate,
          constants.eurInrMrmEcbARate,
          constants.usdInrMrmEcbARate,
          constants.eurInrMrmEcbADuplicateRate,
          constants.usdInrMrmEcbADuplicateRate
        ]),
        constants.TENANT_ID
      )
    ).rejects.toThrowError(CurrencyConversionError);
  });

  it('Test Reference Currency From Indirect To Indirect', async () => {
    const result = await await currencyConverter.convertCurrencyWithNonFixedRate(
      constants.eurUsdAConversionParam,
      buildAdapter([constants.eurInrMrmEcbIndirectTrueRate, constants.usdInrMrmEcbIndirectTrueRate]),
      constants.TENANT_ID
    );
    expect(result).toBeTruthy();
    expect(result.convertedAmount.valueString).toBe('200');
    expect(result.roundedOffConvertedAmount.valueString).toBe('200');
    expect(result.exchangeRate.data.exchangeRateType).toBe(constants.A);
    expect(result.exchangeRate.fromCurrency.currencyCode).toBe('EUR');
    expect(result.exchangeRate.toCurrency.currencyCode).toBe('USD');
  });

  it('Test Reference Currency From Indirect To Direct', async () => {
    const result = await currencyConverter.convertCurrencyWithNonFixedRate(
      constants.eurUsdAConversionParam,
      buildAdapter([constants.eurInrMrmEcbIndirectTrueRate, constants.usdInrMrmEcbIndirectFalseRate]),
      constants.TENANT_ID
    );
    expect(result).toBeTruthy();
    expect(result.convertedAmount.valueString).toBe('2');
    expect(result.roundedOffConvertedAmount.valueString).toBe('2');

    expect(result.exchangeRate.data.exchangeRateType).toBe(constants.A);
    expect(result.exchangeRate.fromCurrency.currencyCode).toBe('EUR');
    expect(result.exchangeRate.toCurrency.currencyCode).toBe('USD');
  });

  it('Test Reference Currency From Direct To Indirect', async () => {
    const result = await currencyConverter.convertCurrencyWithNonFixedRate(
      constants.eurUsdAConversionParam,
      buildAdapter([constants.eurInrMrmEcbIndirectFalseRate, constants.usdInrMrmEcbIndirectTrueRate]),
      constants.TENANT_ID
    );
    expect(result).toBeTruthy();
    expect(result.convertedAmount.valueString).toBe('5000');
    expect(result.roundedOffConvertedAmount.valueString).toBe('5000');

    expect(result.exchangeRate.data.exchangeRateType).toBe(constants.A);
    expect(result.exchangeRate.fromCurrency.currencyCode).toBe('EUR');
    expect(result.exchangeRate.toCurrency.currencyCode).toBe('USD');
  });

  it('Test Reference Currency From Direct To Direct', async () => {
    const result = await currencyConverter.convertCurrencyWithNonFixedRate(
      constants.eurUsdAConversionParam,
      buildAdapter([constants.eurInrMrmEcbIndirectFalseRate, constants.usdInrMrmEcbIndirectFalseRate]),
      constants.TENANT_ID
    );
    expect(result).toBeTruthy();
    expect(result.convertedAmount.valueString).toBe('50');
    expect(result.roundedOffConvertedAmount.valueString).toBe('50');

    expect(result.exchangeRate.data.exchangeRateType).toBe(constants.A);
    expect(result.exchangeRate.fromCurrency.currencyCode).toBe('EUR');
    expect(result.exchangeRate.toCurrency.currencyCode).toBe('USD');
  });

  it('Test Reference Currency From Indirect To Indirect Factor More Than One', async () => {
    const result = await currencyConverter.convertCurrencyWithNonFixedRate(
      constants.eurUsdAConversionParam,
      buildAdapter([
        constants.eurInrMrmEcbIndirectTrueFactorMoreThanOneRate,
        constants.usdInrMrmEcbIndirectTrueFactorMoreThanOneRate
      ]),
      constants.TENANT_ID
    );
    expect(result).toBeTruthy();
    expect(result.convertedAmount.valueString).toBe('800');
    expect(result.roundedOffConvertedAmount.valueString).toBe('800');

    expect(result.exchangeRate.data.exchangeRateType).toBe(constants.A);
    expect(result.exchangeRate.fromCurrency.currencyCode).toBe('EUR');
    expect(result.exchangeRate.toCurrency.currencyCode).toBe('USD');
  });

  it('Test Reference Currency From Indirect To Direct Factor More Than One', async () => {
    const result = await currencyConverter.convertCurrencyWithNonFixedRate(
      constants.eurUsdAConversionParam,
      buildAdapter([
        constants.eurInrMrmEcbIndirectTrueFactorMoreThanOneRate,
        constants.usdInrMrmEcbIndirectFalseFactorMoreThanOneRate
      ]),
      constants.TENANT_ID
    );
    expect(result).toBeTruthy();
    expect(result.convertedAmount.valueString).toBe('8');
    expect(result.roundedOffConvertedAmount.valueString).toBe('8');

    expect(result.exchangeRate.data.exchangeRateType).toBe(constants.A);
    expect(result.exchangeRate.fromCurrency.currencyCode).toBe('EUR');
    expect(result.exchangeRate.toCurrency.currencyCode).toBe('USD');
  });

  it('Test Reference Currency From Direct To Indirect Factor More Than One.', async () => {
    const result = await currencyConverter.convertCurrencyWithNonFixedRate(
      constants.eurUsdAConversionParam,
      buildAdapter([
        constants.eurInrMrmEcbIndirectFalseFactorMoreThanOneRate,
        constants.usdInrMrmEcbIndirectTrueFactorMoreThanOneRate
      ]),
      constants.TENANT_ID
    );
    expect(result).toBeTruthy();
    expect(result.convertedAmount.valueString).toBe('20000');
    expect(result.roundedOffConvertedAmount.valueString).toBe('20000');

    expect(result.exchangeRate.data.exchangeRateType).toBe(constants.A);
    expect(result.exchangeRate.fromCurrency.currencyCode).toBe('EUR');
    expect(result.exchangeRate.toCurrency.currencyCode).toBe('USD');
  });

  it('Test Reference Currency From Direct To Direct Factor More Than One.', async () => {
    const result = await currencyConverter.convertCurrencyWithNonFixedRate(
      constants.eurUsdAConversionParam,
      buildAdapter([
        constants.eurInrMrmEcbIndirectFalseFactorMoreThanOneRate,
        constants.usdInrMrmEcbIndirectFalseFactorMoreThanOneRate
      ]),
      constants.TENANT_ID
    );
    expect(result).toBeTruthy();
    expect(result.convertedAmount.valueString).toBe('200');
    expect(result.roundedOffConvertedAmount.valueString).toBe('200');

    expect(result.exchangeRate.data.exchangeRateType).toBe(constants.A);
    expect(result.exchangeRate.fromCurrency.currencyCode).toBe('EUR');
    expect(result.exchangeRate.toCurrency.currencyCode).toBe('USD');
  });
});
