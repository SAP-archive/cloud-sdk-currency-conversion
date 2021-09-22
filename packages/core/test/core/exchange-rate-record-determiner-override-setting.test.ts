/* Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved. */

import {
  ExchangeRateTypeDetail,
  ExchangeRate,
  Value,
  buildExchangeRateTypeDetail,
  setDefaultSettings,
  ConversionParameterForNonFixedRate,
  buildConversionParameterForNonFixedRate
} from '@sap-cloud-sdk/currency-conversion-models';
import { ExchangeRateRecordDeterminer } from '../../src/core/exchange-rate-record-determiner';
import { ConversionError } from '../../src/constants/conversion-error';
import * as constants from './test-data';

const VALUE_0_5: Value = new Value('0.5');
const VALUE_0_33333333333333: Value = new Value('0.33333333333333');
const VALUE_2: Value = new Value('2');
const VALUE_0_02: Value = new Value('0.02');
const VALUE_50: Value = new Value('50');
const VALUE_1: Value = new Value('1');
const VALUE_8: Value = new Value('8');
const VALUE_0_08: Value = new Value('0.08');
const VALUE_200: Value = new Value('200');

const DATE_2020_01_01: Date = new Date('2020-01-01T02:30:00Z');
const DATE_2019_09_16: Date = new Date('2019-09-16T02:30:00Z');

const usdEurAskConversionParam: ConversionParameterForNonFixedRate = buildConversionParameterForNonFixedRate(
  'USD',
  'EUR',
  '100',
  constants.ASK,
  DATE_2020_01_01
);

function instantiateExchangeRateRecordDeterminer(exchangeRateResultSet: ExchangeRate[]): ExchangeRateRecordDeterminer {
  return new ExchangeRateRecordDeterminer(
    constants.TENANT_ID,
    constants.overrideTenantSettings,
    exchangeRateResultSet,
    getExchangeRateTypeDetailsForTenant()
  );
}

function getExchangeRateTypeDetailsForTenant(): Map<string, ExchangeRateTypeDetail> {
  const exchangeRateTypeDetailMap: Map<string, ExchangeRateTypeDetail> = new Map();
  exchangeRateTypeDetailMap.set(constants.A, buildExchangeRateTypeDetail(constants.INR, true));
  exchangeRateTypeDetailMap.set(constants.M, buildExchangeRateTypeDetail(null as any, true));
  exchangeRateTypeDetailMap.set(constants.ASK, buildExchangeRateTypeDetail(null as any, true));
  return exchangeRateTypeDetailMap;
}

describe('Exchange Rate Record Determiner Override Tenant Setting', () => {
  it('Get best matched exchange rate record', () => {
    const exchangeRateResultSet: ExchangeRate[] = [
      constants.inrEurMrmThrMExcRate,
      constants.eurInrMrmThrMExcRate,
      constants.inrEurMrmEcbMRate,
      constants.eurInrMrmEcbMRate
    ];
    const exchangeRateRecordDeterminer: ExchangeRateRecordDeterminer = instantiateExchangeRateRecordDeterminer(
      exchangeRateResultSet
    );
    const actualExchangeRateRecord: ExchangeRate = exchangeRateRecordDeterminer.getBestMatchedExchangeRateRecord(
      constants.inrEurMConversionParam
    );
    expect(constants.inrEurMrmThrMExcRate).toEqual(actualExchangeRateRecord);
  });

  it('Conversion with exchange rate record having future date', () => {
    let errInput = new Error();
    const exchangeRateResultSet: ExchangeRate[] = [
      constants.inrEurMrmEcbMRate,
      constants.eurInrMrmEcbMRate,
      constants.eurInrMrmEcbARate,
      constants.inrEurMrmThrMExcRate,
      constants.eurInrMrmThrMExcRate,
      constants.eurInrMrmThrARate
    ];
    const exchangeRateRecordDeterminer: ExchangeRateRecordDeterminer = instantiateExchangeRateRecordDeterminer(
      exchangeRateResultSet
    );
    try {
      const actualExchangeRateRecord: ExchangeRate = exchangeRateRecordDeterminer.getBestMatchedExchangeRateRecord(
        constants.inrEurMConvParamPastDate
      );
    } catch (error) {
      errInput = error;
    }
    expect(errInput.message).toBe(ConversionError.NO_MATCHING_EXCHANGE_RATE_RECORD);
  });

  it('exchange rate record with different data providers', () => {
    const exchangeRateResultSet: ExchangeRate[] = [
      constants.eurInrMrmThrMExcRate,
      constants.eurInrMrmThrMDuplicateRate,
      constants.eurInrMrmThrAskIndirectTrueRate,
      constants.eurInrMrmThrAskIndirectTrueRate,
      constants.eurInrMrmEcbMDuplicateRate,
      constants.eurInrMrmEcbAskIndirectTrueRate
    ];
    const exchangeRateRecordDeterminer: ExchangeRateRecordDeterminer = instantiateExchangeRateRecordDeterminer(
      exchangeRateResultSet
    );
    const actualExchangeRateRecord: ExchangeRate = exchangeRateRecordDeterminer.getBestMatchedExchangeRateRecord(
      constants.eurInrMConversionParam
    );
    expect(constants.eurInrMrmThrMDuplicateRate).toEqual(actualExchangeRateRecord);
  });

  it('Duplicate exchange rate record', () => {
    let errInput = new Error();
    const exchangeRateResultSet: ExchangeRate[] = [
      constants.inrEurMrmThrMDuplicateRate,
      constants.inrEurMrmThrMExcRate,
      constants.eurInrMrmThrAskIndirectFalseRate,
      constants.eurInrMrmThrAskIndirectTrueRate,
      constants.inrEurMrmEcbMDuplicateRate,
      constants.inrEurMrmEcbMRate,
      constants.eurInrMrmEcbAskIndirectFalseRate,
      constants.eurInrMrmEcbAskIndirectTrueRate
    ];
    const exchangeRateRecordDeterminer: ExchangeRateRecordDeterminer = instantiateExchangeRateRecordDeterminer(
      exchangeRateResultSet
    );
    try {
      const actualExchangeRateRecord: ExchangeRate = exchangeRateRecordDeterminer.getBestMatchedExchangeRateRecord(
        constants.inrEurMConversionParam
      );
    } catch (error) {
      errInput = error;
    }
    expect(errInput.message).toBe(ConversionError.DUPLICATE_CONVERSION_RECORD_FOUND);
  });

  it('No exchange rate record for currency pair AUD-BSD', () => {
    let errInput = new Error();
    const exchangeRateResultSet: ExchangeRate[] = [
      constants.eurInrMrmThrMExcRate,
      constants.inrEurMrmThrMExcRate,
      constants.inrEurMrmThrMDuplicateRate,
      constants.inrEurMrmThrMExcRate,
      constants.eurInrMrmThrAskIndirectFalseRate,
      constants.eurInrMrmThrAskIndirectTrueRate,
      constants.eurInrMrmEcbMRate,
      constants.inrEurMrmEcbMRate,
      constants.inrEurMrmEcbMDuplicateRate,
      constants.inrEurMrmEcbMRate,
      constants.eurInrMrmEcbAskIndirectFalseRate,
      constants.eurInrMrmEcbAskIndirectTrueRate
    ];
    const exchangeRateRecordDeterminer: ExchangeRateRecordDeterminer = instantiateExchangeRateRecordDeterminer(
      exchangeRateResultSet
    );
    try {
      const actualExchangeRateRecord: ExchangeRate = exchangeRateRecordDeterminer.getBestMatchedExchangeRateRecord(
        constants.eurInrInvalidCurrPairConversionParam
      );
    } catch (error) {
      errInput = error;
    }
    expect(errInput.message).toBe(ConversionError.NO_MATCHING_EXCHANGE_RATE_RECORD);
  });

  it('No exchange rate record for different tenant', () => {
    let errInput = new Error();
    const exchangeRateResultSet: ExchangeRate[] = [
      constants.eurInrMrmThrMExcRate,
      constants.inrEurMrmThrMExcRate,
      constants.inrEurMrmThrMDuplicateRate,
      constants.inrEurMrmThrMExcRate,
      constants.eurInrMrmThrAskIndirectFalseRate,
      constants.eurInrMrmThrAskIndirectTrueRate,
      constants.eurInrMrmEcbMRate,
      constants.inrEurMrmEcbMRate,
      constants.inrEurMrmEcbMDuplicateRate,
      constants.inrEurMrmEcbMRate,
      constants.eurInrMrmEcbAskIndirectFalseRate,
      constants.eurInrMrmEcbAskIndirectTrueRate
    ];
    const exchangeRateRecordDeterminer: ExchangeRateRecordDeterminer = new ExchangeRateRecordDeterminer(
      constants.TENANT_ID1,
      constants.overrideTenantSettings,
      exchangeRateResultSet,
      getExchangeRateTypeDetailsForTenant()
    );
    try {
      const actualExchangeRateRecord: ExchangeRate = exchangeRateRecordDeterminer.getBestMatchedExchangeRateRecord(
        constants.inrEurMConversionParam
      );
    } catch (error) {
      errInput = error;
    }
    expect(errInput.message).toBe(ConversionError.NO_MATCHING_EXCHANGE_RATE_RECORD);
  });

  it('Single exchange rate record for different tenant', () => {
    const exchangeRateResultSet: ExchangeRate[] = [
      constants.inrEurMrmThrMDiffrentTenantRate,
      constants.eurInrMrmThrMExcRate,
      constants.inrEurMrmThrMExcRate,
      constants.inrEurMrmThrMDuplicateRate,
      constants.inrEurMrmThrMExcRate,
      constants.eurInrMrmThrAskIndirectFalseRate,
      constants.eurInrMrmThrAskIndirectTrueRate,
      constants.inrEurMrmEcbMDiffrentTenantRate,
      constants.eurInrMrmEcbMRate,
      constants.inrEurMrmEcbMRate,
      constants.inrEurMrmEcbMDuplicateRate,
      constants.inrEurMrmEcbMRate,
      constants.eurInrMrmEcbAskIndirectFalseRate,
      constants.eurInrMrmEcbAskIndirectTrueRate
    ];
    const exchangeRateRecordDeterminer: ExchangeRateRecordDeterminer = new ExchangeRateRecordDeterminer(
      constants.TENANT_ID1,
      constants.overrideTenantSettings,
      exchangeRateResultSet,
      getExchangeRateTypeDetailsForTenant()
    );
    const actualExchangeRateRecord: ExchangeRate = exchangeRateRecordDeterminer.getBestMatchedExchangeRateRecord(
      constants.inrEurMConversionParam
    );
    expect(constants.inrEurMrmThrMDiffrentTenantRate).toEqual(actualExchangeRateRecord);
  });

  /* INVERTED RATE TEST CASE STARTS */

  it('Inverted exchange rate record indirect true', () => {
    let errInput = new Error();
    const exchangeRateResultSet: ExchangeRate[] = [
      constants.inrEurMrmThrMDuplicateRate,
      constants.inrEurMrmThrMExcRate,
      constants.eurInrMrmThrAskIndirectFalseRate,
      constants.eurInrMrmThrAskIndirectTrueRate,
      constants.inrEurMrmEcbMDuplicateRate,
      constants.inrEurMrmEcbMRate,
      constants.eurInrMrmEcbAskIndirectFalseRate,
      constants.eurInrMrmEcbAskIndirectTrueRate
    ];
    const exchangeRateRecordDeterminer: ExchangeRateRecordDeterminer = instantiateExchangeRateRecordDeterminer(
      exchangeRateResultSet
    );
    try {
      const actualExchangeRateRecord: ExchangeRate = exchangeRateRecordDeterminer.getBestMatchedExchangeRateRecord(
        constants.inrEurAskConversionParam
      );
    } catch (error) {
      errInput = error;
    }
    expect(errInput.message).toBe(ConversionError.DUPLICATE_CONVERSION_RECORD_FOUND);
  });

  it('Inverted conversion exchange rate record with exchange rate type detail null', () => {
    let errInput = new Error();
    const exchangeRateResultSet: ExchangeRate[] = [
      constants.eurUsdMrmThrMRate,
      constants.usdEurMrmThrMRate,
      constants.eurUsdMrmEcbMRate,
      constants.usdEurMrmEcbMRate
    ];
    const exchangeRateRecordDeterminer: ExchangeRateRecordDeterminer = new ExchangeRateRecordDeterminer(
      constants.TENANT_ID,
      constants.overrideTenantSettings,
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
      constants.eurInrMrmThrARate,
      constants.usdInrMrmThrARate,
      constants.eurInrMrmEcbARate,
      constants.usdInrMrmEcbARate
    ];
    const exchangeRateRecordDeterminer: ExchangeRateRecordDeterminer = instantiateExchangeRateRecordDeterminer(
      exchangeRateResultSet
    );
    const expectedExchangeRate: ExchangeRate = {
      settings: setDefaultSettings(constants.TENANT_ID),
      data: {
        ratesDataProviderCode: constants.MRM,
        ratesDataSource: constants.THR,
        exchangeRateType: constants.A
      },
      value: VALUE_0_5,
      fromCurrency: constants.EUR,
      toCurrency: constants.USD,
      validFromDateTime: DATE_2020_01_01
    };
    const actualExchangeRateRecord: ExchangeRate = exchangeRateRecordDeterminer.getBestMatchedExchangeRateRecord(
      constants.eurUsdAConversionParam
    );
    expect(expectedExchangeRate).toEqual(actualExchangeRateRecord);
  });

  it('Reference Currency as INR scale more than zero rate', () => {
    const exchangeRateResultSet: ExchangeRate[] = [
      constants.eurInrMrmEcbScaleMoreThanZeroRate,
      constants.usdInrMrmEcbScaleMoreThanZeroRate,
      constants.eurInrMrmThrScaleMoreThanZeroRate,
      constants.usdInrMrmThrScaleMoreThanZeroRate
    ];
    const exchangeRateRecordDeterminer: ExchangeRateRecordDeterminer = instantiateExchangeRateRecordDeterminer(
      exchangeRateResultSet
    );
    const expectedExchangeRate: ExchangeRate = {
      settings: setDefaultSettings(constants.TENANT_ID),
      data: {
        ratesDataProviderCode: constants.MRM,
        ratesDataSource: constants.THR,
        exchangeRateType: constants.A
      },
      value: VALUE_0_33333333333333,
      fromCurrency: constants.EUR,
      toCurrency: constants.USD,
      validFromDateTime: DATE_2020_01_01
    };
    const actualExchangeRateRecord: ExchangeRate = exchangeRateRecordDeterminer.getBestMatchedExchangeRateRecord(
      constants.eurUsdAConversionParam
    );
    expect(expectedExchangeRate).toEqual(actualExchangeRateRecord);
  });

  it('Reference Currency as INR scale more than default', () => {
    const exchangeRateResultSet: ExchangeRate[] = [
      constants.eurInrMrmEcbScaleMoreThanDefaultRate,
      constants.usdInrMrmEcbScaleMoreThanDefaultRate,
      constants.eurInrMrmThrScaleMoreThanDefaultRate,
      constants.usdInrMrmThrScaleMoreThanDefaultRate
    ];
    const exchangeRateRecordDeterminer: ExchangeRateRecordDeterminer = instantiateExchangeRateRecordDeterminer(
      exchangeRateResultSet
    );
    const expectedExchangeRate: ExchangeRate = {
      settings: setDefaultSettings(constants.TENANT_ID),
      data: {
        ratesDataProviderCode: constants.MRM,
        ratesDataSource: constants.THR,
        exchangeRateType: constants.A
      },
      value: new Value('0.3333333336507937'),
      fromCurrency: constants.EUR,
      toCurrency: constants.USD,
      validFromDateTime: DATE_2020_01_01
    };
    const actualExchangeRateRecord: ExchangeRate = exchangeRateRecordDeterminer.getBestMatchedExchangeRateRecord(
      constants.eurUsdAConversionParam
    );
    expect(expectedExchangeRate).toEqual(actualExchangeRateRecord);
  });

  it('Reference Currency as INR From Reference Currency Pair Valid DateTime', () => {
    const exchangeRateResultSet: ExchangeRate[] = [
      constants.eurInrMrmEcbADateBeforeRate,
      constants.eurInrMrmThrADateBeforeRate,
      constants.usdInrMrmEcbARate,
      constants.usdInrMrmThrARate
    ];
    const exchangeRateRecordDeterminer: ExchangeRateRecordDeterminer = instantiateExchangeRateRecordDeterminer(
      exchangeRateResultSet
    );
    const expectedExchangeRate: ExchangeRate = {
      settings: setDefaultSettings(constants.TENANT_ID),
      data: {
        ratesDataProviderCode: constants.MRM,
        ratesDataSource: constants.THR,
        exchangeRateType: constants.A
      },
      value: VALUE_0_5,
      fromCurrency: constants.EUR,
      toCurrency: constants.USD,
      validFromDateTime: DATE_2019_09_16
    };
    const actualExchangeRateRecord: ExchangeRate = exchangeRateRecordDeterminer.getBestMatchedExchangeRateRecord(
      constants.eurUsdAConversionParam
    );
    expect(expectedExchangeRate).toEqual(actualExchangeRateRecord);
  });

  it('Reference Currency with non existing rate type', () => {
    let errInput = new Error();
    const exchangeRateResultSet: ExchangeRate[] = [
      constants.usdInrMrmThrLastRate,
      constants.eurInrMrmThrLastRate,
      constants.usdInrMrmEcbLastRate,
      constants.eurInrMrmEcbLastRate
    ];
    const exchangeRateRecordDeterminer: ExchangeRateRecordDeterminer = instantiateExchangeRateRecordDeterminer(
      exchangeRateResultSet
    );
    try {
      const actualExchangeRateRecord: ExchangeRate = exchangeRateRecordDeterminer.getBestMatchedExchangeRateRecord(
        constants.eurUsdAConversionParam
      );
    } catch (error) {
      errInput = error;
    }
    expect(errInput.message).toBe(ConversionError.NO_MATCHING_EXCHANGE_RATE_RECORD);
  });

  it('Reference Currency with Direct Rate No From Reference Pair', () => {
    const exchangeRateResultSet: ExchangeRate[] = [
      constants.usdInrMrmThrARate,
      constants.eurUsdMrmThrIndirectTrueRate,
      constants.eurUsdMrmThrIndirectFalseRate,
      constants.eurInrMrmEcbARate,
      constants.eurUsdMrmEcbIndirectTrueExcRate,
      constants.eurUsdMrmEcbIndirectFalseRate
    ];
    const exchangeRateRecordDeterminer: ExchangeRateRecordDeterminer = instantiateExchangeRateRecordDeterminer(
      exchangeRateResultSet
    );
    const actualExchangeRateRecord: ExchangeRate = exchangeRateRecordDeterminer.getBestMatchedExchangeRateRecord(
      constants.eurUsdAConversionParam
    );
    expect(constants.eurUsdMrmThrIndirectFalseRate).toEqual(actualExchangeRateRecord);
  });

  it('Reference Currency with Direct Rate No To Reference Pair', () => {
    const exchangeRateResultSet: ExchangeRate[] = [
      constants.eurInrMrmThrARate,
      constants.eurUsdMrmThrIndirectTrueRate,
      constants.eurUsdMrmThrIndirectFalseRate,
      constants.eurUsdMrmEcbIndirectTrueExcRate,
      constants.eurUsdMrmEcbIndirectFalseRate
    ];
    const exchangeRateRecordDeterminer: ExchangeRateRecordDeterminer = instantiateExchangeRateRecordDeterminer(
      exchangeRateResultSet
    );
    const actualExchangeRateRecord: ExchangeRate = exchangeRateRecordDeterminer.getBestMatchedExchangeRateRecord(
      constants.eurUsdAConversionParam
    );
    expect(constants.eurUsdMrmThrIndirectFalseRate).toEqual(actualExchangeRateRecord);
  });

  it('Reference Currency with zero rate', () => {
    let errInput = new Error();
    const exchangeRateResultSet: ExchangeRate[] = [
      constants.eurInrMrmEcbZeroRate,
      constants.usdInrMrmEcbZeroRate,
      constants.eurInrMrmThrZeroRate,
      constants.usdInrMrmThrZeroRate
    ];
    const exchangeRateRecordDeterminer: ExchangeRateRecordDeterminer = instantiateExchangeRateRecordDeterminer(
      exchangeRateResultSet
    );
    try {
      const actualExchangeRateRecord: ExchangeRate = exchangeRateRecordDeterminer.getBestMatchedExchangeRateRecord(
        constants.eurUsdAConversionParam
      );
    } catch (error) {
      errInput = error;
    }
    expect(errInput.message).toBe(ConversionError.ZERO_RATE_REFERENCE_CURRENCY);
  });

  it('Reference Currency with zero factor', () => {
    let errInput = new Error();
    const exchangeRateResultSet: ExchangeRate[] = [
      constants.eurInrMrmEcbZeroFactor,
      constants.usdInrMrmEcbZeroFactor,
      constants.eurInrMrmThrZeroFactor,
      constants.usdInrMrmThrZeroFactor
    ];
    const exchangeRateRecordDeterminer: ExchangeRateRecordDeterminer = instantiateExchangeRateRecordDeterminer(
      exchangeRateResultSet
    );
    try {
      const actualExchangeRateRecord: ExchangeRate = exchangeRateRecordDeterminer.getBestMatchedExchangeRateRecord(
        constants.eurUsdAConversionParam
      );
    } catch (error) {
      errInput = error;
    }
    expect(errInput.message).toBe(ConversionError.ZERO_CURRENCY_FACTOR);
  });

  it('Reference Currency with zero factor and zero rate', () => {
    let errInput = new Error();
    const exchangeRateResultSet: ExchangeRate[] = [
      constants.eurInrMrmEcbZeroFactorRate,
      constants.usdInrMrmEcbZeroFactorRate,
      constants.eurInrMrmThrZeroFactorRate,
      constants.usdInrMrmThrZeroFactorRate
    ];
    const exchangeRateRecordDeterminer: ExchangeRateRecordDeterminer = instantiateExchangeRateRecordDeterminer(
      exchangeRateResultSet
    );
    try {
      const actualExchangeRateRecord: ExchangeRate = exchangeRateRecordDeterminer.getBestMatchedExchangeRateRecord(
        constants.eurUsdAConversionParam
      );
    } catch (error) {
      errInput = error;
    }
    expect(errInput.message).toBe(ConversionError.ZERO_RATE_REFERENCE_CURRENCY);
  });

  it('Reference Currency with Direct Rate No From and To Reference Pair', () => {
    const exchangeRateResultSet: ExchangeRate[] = [
      constants.eurUsdMrmThrIndirectTrueRate,
      constants.eurUsdMrmThrIndirectFalseRate,
      constants.eurUsdMrmEcbIndirectTrueExcRate,
      constants.eurUsdMrmEcbIndirectFalseRate
    ];
    const exchangeRateRecordDeterminer: ExchangeRateRecordDeterminer = instantiateExchangeRateRecordDeterminer(
      exchangeRateResultSet
    );
    const actualExchangeRateRecord: ExchangeRate = exchangeRateRecordDeterminer.getBestMatchedExchangeRateRecord(
      constants.eurUsdAConversionParam
    );
    expect(constants.eurUsdMrmThrIndirectFalseRate).toEqual(actualExchangeRateRecord);
  });

  it('Reference Currency with duplicate from reference pair', () => {
    let errInput = new Error();
    const exchangeRateResultSet: ExchangeRate[] = [
      constants.eurUsdMrmThrIndirectTrueRate,
      constants.eurUsdMrmThrIndirectFalseRate,
      constants.eurInrMrmThrARate,
      constants.usdInrMrmThrARate,
      constants.eurInrMrmThrADuplicateRate,
      constants.eurUsdMrmEcbIndirectTrueExcRate,
      constants.eurUsdMrmEcbIndirectFalseRate,
      constants.eurInrMrmEcbARate,
      constants.usdInrMrmEcbARate,
      constants.eurInrMrmEcbADuplicateRate
    ];
    const exchangeRateRecordDeterminer: ExchangeRateRecordDeterminer = instantiateExchangeRateRecordDeterminer(
      exchangeRateResultSet
    );
    try {
      const actualExchangeRateRecord: ExchangeRate = exchangeRateRecordDeterminer.getBestMatchedExchangeRateRecord(
        constants.eurUsdAConversionParam
      );
    } catch (error) {
      errInput = error;
    }
    expect(errInput.message).toBe(ConversionError.DUPLICATE_CONVERSION_RECORD_FOUND);
  });

  it('Reference Currency with duplicate to reference pair', () => {
    let errInput = new Error();
    const exchangeRateResultSet: ExchangeRate[] = [
      constants.eurUsdMrmThrIndirectTrueRate,
      constants.eurUsdMrmThrIndirectFalseRate,
      constants.eurInrMrmThrARate,
      constants.usdInrMrmThrARate,
      constants.usdInrMrmThrDuplicateDateRate,
      constants.eurUsdMrmEcbIndirectTrueExcRate,
      constants.eurUsdMrmEcbIndirectFalseRate,
      constants.eurInrMrmEcbARate,
      constants.usdInrMrmEcbARate,
      constants.usdInrMrmEcbDuplicateDateExcRate
    ];
    const exchangeRateRecordDeterminer: ExchangeRateRecordDeterminer = instantiateExchangeRateRecordDeterminer(
      exchangeRateResultSet
    );
    try {
      const actualExchangeRateRecord: ExchangeRate = exchangeRateRecordDeterminer.getBestMatchedExchangeRateRecord(
        constants.eurUsdAConversionParam
      );
    } catch (error) {
      errInput = error;
    }
    expect(errInput.message).toBe(ConversionError.DUPLICATE_CONVERSION_RECORD_FOUND);
  });

  it('Reference Currency with duplicate from and to reference pair', () => {
    let errInput = new Error();
    const exchangeRateResultSet: ExchangeRate[] = [
      constants.eurUsdMrmThrIndirectTrueRate,
      constants.eurUsdMrmThrIndirectFalseRate,
      constants.eurInrMrmThrARate,
      constants.usdInrMrmThrARate,
      constants.eurInrMrmThrADuplicateRate,
      constants.usdInrMrmThrADuplicateRate,
      constants.eurUsdMrmEcbIndirectTrueExcRate,
      constants.eurUsdMrmEcbIndirectFalseRate,
      constants.eurInrMrmEcbARate,
      constants.usdInrMrmEcbARate,
      constants.eurInrMrmEcbADuplicateRate,
      constants.usdInrMrmEcbADuplicateRate
    ];
    const exchangeRateRecordDeterminer: ExchangeRateRecordDeterminer = instantiateExchangeRateRecordDeterminer(
      exchangeRateResultSet
    );
    try {
      const actualExchangeRateRecord: ExchangeRate = exchangeRateRecordDeterminer.getBestMatchedExchangeRateRecord(
        constants.eurUsdAConversionParam
      );
    } catch (error) {
      errInput = error;
    }
    expect(errInput.message).toBe(ConversionError.DUPLICATE_CONVERSION_RECORD_FOUND);
  });

  /* Combination of indirect in 'From' and 'To' Currency */

  it('From Reference Rate as Indirect and To Reference Rate as Indirect', () => {
    const exchangeRateResultSet: ExchangeRate[] = [
      constants.eurInrMrmThrIndirectTrueRate,
      constants.usdInrMrmThrIndirectTrueRate,
      constants.eurInrMrmEcbIndirectTrueExcRate,
      constants.usdInrMrmEcbIndirectTrueRate
    ];
    const exchangeRateRecordDeterminer: ExchangeRateRecordDeterminer = instantiateExchangeRateRecordDeterminer(
      exchangeRateResultSet
    );
    const expectedExchangeRate: ExchangeRate = {
      settings: setDefaultSettings(constants.TENANT_ID),
      data: {
        ratesDataProviderCode: constants.MRM,
        ratesDataSource: constants.THR,
        exchangeRateType: constants.A
      },
      value: VALUE_2,
      fromCurrency: constants.EUR,
      toCurrency: constants.USD,
      validFromDateTime: DATE_2020_01_01
    };
    const actualExchangeRateRecord: ExchangeRate = exchangeRateRecordDeterminer.getBestMatchedExchangeRateRecord(
      constants.eurUsdAConversionParam
    );
    expect(expectedExchangeRate).toEqual(actualExchangeRateRecord);
  });

  it('From Reference Rate as Indirect and To Reference Rate as direct', () => {
    const exchangeRateResultSet: ExchangeRate[] = [
      constants.eurInrMrmThrIndirectTrueRate,
      constants.usdInrMrmThrIndirectFalseRate,
      constants.eurInrMrmEcbIndirectTrueExcRate,
      constants.usdInrMrmEcbIndirectFalseRate
    ];
    const exchangeRateRecordDeterminer: ExchangeRateRecordDeterminer = instantiateExchangeRateRecordDeterminer(
      exchangeRateResultSet
    );
    const expectedExchangeRate: ExchangeRate = {
      settings: setDefaultSettings(constants.TENANT_ID),
      data: {
        ratesDataProviderCode: constants.MRM,
        ratesDataSource: constants.THR,
        exchangeRateType: constants.A
      },
      value: VALUE_0_02,
      fromCurrency: constants.EUR,
      toCurrency: constants.USD,
      validFromDateTime: DATE_2020_01_01
    };
    const actualExchangeRateRecord: ExchangeRate = exchangeRateRecordDeterminer.getBestMatchedExchangeRateRecord(
      constants.eurUsdAConversionParam
    );
    expect(expectedExchangeRate).toEqual(actualExchangeRateRecord);
  });

  it('From Reference Rate as direct and To Reference Rate as indirect', () => {
    const exchangeRateResultSet: ExchangeRate[] = [
      constants.eurInrMrmThrIndirectFalseRate,
      constants.usdInrMrmThrIndirectTrueRate,
      constants.eurInrMrmEcbIndirectFalseExcRate,
      constants.usdInrMrmEcbIndirectTrueRate
    ];
    const exchangeRateRecordDeterminer: ExchangeRateRecordDeterminer = instantiateExchangeRateRecordDeterminer(
      exchangeRateResultSet
    );
    const expectedExchangeRate: ExchangeRate = {
      settings: setDefaultSettings(constants.TENANT_ID),
      data: {
        ratesDataProviderCode: constants.MRM,
        ratesDataSource: constants.THR,
        exchangeRateType: constants.A
      },
      value: VALUE_50,
      fromCurrency: constants.EUR,
      toCurrency: constants.USD,
      validFromDateTime: DATE_2020_01_01
    };
    const actualExchangeRateRecord: ExchangeRate = exchangeRateRecordDeterminer.getBestMatchedExchangeRateRecord(
      constants.eurUsdAConversionParam
    );
    expect(expectedExchangeRate).toEqual(actualExchangeRateRecord);
  });

  it('From Reference Rate as direct and To Reference Rate as direct', () => {
    const exchangeRateResultSet: ExchangeRate[] = [
      constants.eurInrMrmThrIndirectFalseRate,
      constants.usdInrMrmThrIndirectFalseRate,
      constants.eurInrMrmEcbIndirectFalseExcRate,
      constants.usdInrMrmEcbIndirectFalseRate
    ];
    const exchangeRateRecordDeterminer: ExchangeRateRecordDeterminer = instantiateExchangeRateRecordDeterminer(
      exchangeRateResultSet
    );
    const expectedExchangeRate: ExchangeRate = {
      settings: setDefaultSettings(constants.TENANT_ID),
      data: {
        ratesDataProviderCode: constants.MRM,
        ratesDataSource: constants.THR,
        exchangeRateType: constants.A
      },
      value: VALUE_0_5,
      fromCurrency: constants.EUR,
      toCurrency: constants.USD,
      validFromDateTime: DATE_2020_01_01
    };
    const actualExchangeRateRecord: ExchangeRate = exchangeRateRecordDeterminer.getBestMatchedExchangeRateRecord(
      constants.eurUsdAConversionParam
    );
    expect(expectedExchangeRate).toEqual(actualExchangeRateRecord);
  });

  it('From Reference Rate as direct and To Reference Rate as direct Infinite decimal', () => {
    const exchangeRateResultSet: ExchangeRate[] = [
      constants.eurInrMrmThrIndirectFalseRateInfiniteDecimal,
      constants.usdInrMrmThrIndirectFalseRateInfiniteDecimal,
      constants.eurInrMrmEcbIndirectFalseRateInfiniteDecimal,
      constants.usdInrMrmEcbIndirectFalseRateInfiniteDecimal
    ];
    const exchangeRateRecordDeterminer: ExchangeRateRecordDeterminer = instantiateExchangeRateRecordDeterminer(
      exchangeRateResultSet
    );
    const expectedExchangeRate: ExchangeRate = {
      settings: setDefaultSettings(constants.TENANT_ID),
      data: {
        ratesDataProviderCode: constants.MRM,
        ratesDataSource: constants.THR,
        exchangeRateType: constants.A
      },
      value: VALUE_1,
      fromCurrency: constants.EUR,
      toCurrency: constants.USD,
      validFromDateTime: DATE_2020_01_01
    };
    const actualExchangeRateRecord: ExchangeRate = exchangeRateRecordDeterminer.getBestMatchedExchangeRateRecord(
      constants.eurUsdAConversionParam
    );
    expect(expectedExchangeRate).toEqual(actualExchangeRateRecord);
  });

  it('From Reference Rate as indirect and To Reference Rate as indirect factor more than one', () => {
    const exchangeRateResultSet: ExchangeRate[] = [
      constants.eurInrMrmThrIndirectTrueFactorMoreThanOneRate,
      constants.usdInrMrmThrIndirectTrueFactorMoreThanOneRate,
      constants.eurInrMrmEcbIndirectTrueFactorMoreThanOneRate,
      constants.usdInrMrmEcbIndirectTrueFactorMoreThanOneRate
    ];
    const exchangeRateRecordDeterminer: ExchangeRateRecordDeterminer = instantiateExchangeRateRecordDeterminer(
      exchangeRateResultSet
    );
    const expectedExchangeRate: ExchangeRate = {
      settings: setDefaultSettings(constants.TENANT_ID),
      data: {
        ratesDataProviderCode: constants.MRM,
        ratesDataSource: constants.THR,
        exchangeRateType: constants.A
      },
      value: VALUE_8,
      fromCurrency: constants.EUR,
      toCurrency: constants.USD,
      validFromDateTime: DATE_2020_01_01
    };
    const actualExchangeRateRecord: ExchangeRate = exchangeRateRecordDeterminer.getBestMatchedExchangeRateRecord(
      constants.eurUsdAConversionParam
    );
    expect(expectedExchangeRate).toEqual(actualExchangeRateRecord);
  });

  it('From Reference Rate as indirect and To Reference Rate as direct factor more than one', () => {
    const exchangeRateResultSet: ExchangeRate[] = [
      constants.eurInrMrmThrIndirectTrueFactorMoreThanOneRate,
      constants.usdInrMrmThrIndirectFalseFactorMoreThanOneRate,
      constants.eurInrMrmEcbIndirectTrueFactorMoreThanOneRate,
      constants.usdInrMrmEcbIndirectFalseFactorMoreThanOneRate
    ];
    const exchangeRateRecordDeterminer: ExchangeRateRecordDeterminer = instantiateExchangeRateRecordDeterminer(
      exchangeRateResultSet
    );
    const expectedExchangeRate: ExchangeRate = {
      settings: setDefaultSettings(constants.TENANT_ID),
      data: {
        ratesDataProviderCode: constants.MRM,
        ratesDataSource: constants.THR,
        exchangeRateType: constants.A
      },
      value: VALUE_0_08,
      fromCurrency: constants.EUR,
      toCurrency: constants.USD,
      validFromDateTime: DATE_2020_01_01
    };
    const actualExchangeRateRecord: ExchangeRate = exchangeRateRecordDeterminer.getBestMatchedExchangeRateRecord(
      constants.eurUsdAConversionParam
    );
    expect(expectedExchangeRate).toEqual(actualExchangeRateRecord);
  });

  it('From Reference Rate as direct and To Reference Rate as indirect factor more than one', () => {
    const exchangeRateResultSet: ExchangeRate[] = [
      constants.eurInrMrmThrIndirectFalseFactorMoreThanOneRate,
      constants.usdInrMrmThrIndirectTrueFactorMoreThanOneRate,
      constants.eurInrMrmEcbIndirectFalseFactorMoreThanOneRate,
      constants.usdInrMrmEcbIndirectTrueFactorMoreThanOneRate
    ];
    const exchangeRateRecordDeterminer: ExchangeRateRecordDeterminer = instantiateExchangeRateRecordDeterminer(
      exchangeRateResultSet
    );
    const expectedExchangeRate: ExchangeRate = {
      settings: setDefaultSettings(constants.TENANT_ID),
      data: {
        ratesDataProviderCode: constants.MRM,
        ratesDataSource: constants.THR,
        exchangeRateType: constants.A
      },
      value: VALUE_200,
      fromCurrency: constants.EUR,
      toCurrency: constants.USD,
      validFromDateTime: DATE_2020_01_01
    };
    const actualExchangeRateRecord: ExchangeRate = exchangeRateRecordDeterminer.getBestMatchedExchangeRateRecord(
      constants.eurUsdAConversionParam
    );
    expect(expectedExchangeRate).toEqual(actualExchangeRateRecord);
  });

  it('From Reference Rate as direct and To Reference Rate as direct factor more than one', () => {
    const exchangeRateResultSet: ExchangeRate[] = [
      constants.eurInrMrmThrIndirectFalseFactorMoreThanOneRate,
      constants.usdInrMrmThrIndirectFalseFactorMoreThanOneRate,
      constants.eurInrMrmEcbIndirectFalseFactorMoreThanOneRate,
      constants.usdInrMrmEcbIndirectFalseFactorMoreThanOneRate
    ];
    const exchangeRateRecordDeterminer: ExchangeRateRecordDeterminer = instantiateExchangeRateRecordDeterminer(
      exchangeRateResultSet
    );
    const expectedExchangeRate: ExchangeRate = {
      settings: setDefaultSettings(constants.TENANT_ID),
      data: {
        ratesDataProviderCode: constants.MRM,
        ratesDataSource: constants.THR,
        exchangeRateType: constants.A
      },
      value: VALUE_2,
      fromCurrency: constants.EUR,
      toCurrency: constants.USD,
      validFromDateTime: DATE_2020_01_01
    };
    const actualExchangeRateRecord: ExchangeRate = exchangeRateRecordDeterminer.getBestMatchedExchangeRateRecord(
      constants.eurUsdAConversionParam
    );
    expect(expectedExchangeRate).toEqual(actualExchangeRateRecord);
  });
});
