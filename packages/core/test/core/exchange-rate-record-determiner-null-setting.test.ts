/* Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved. */

import {
  ExchangeRate,
  Value,
  ExchangeRateTypeDetail,
  buildExchangeRateTypeDetail,
  setDefaultSettings
} from '@sap-cloud-sdk/currency-conversion-models';
import { ExchangeRateRecordDeterminer } from '../../src/core/exchange-rate-record-determiner';
import { ConversionError } from '../../src/constants/conversion-error';
import * as constants from './test-data';

const VALUE_0_5: Value = new Value('0.5');
const VALUE_0_33333333333333: Value = new Value('0.33333333333333');
const VALUE_0_02: Value = new Value('0.02');
const VALUE_50: Value = new Value('50');
const VALUE_8: Value = new Value('8');
const VALUE_0_08: Value = new Value('0.08');
const VALUE_200: Value = new Value('200');

const inrEurMrmThrMRate: ExchangeRate = {
  settings: setDefaultSettings(constants.TENANT_ID),
  data: {
    ratesDataProviderCode: constants.MRM,
    ratesDataSource: constants.THR,
    exchangeRateType: constants.M
  },
  value: constants.VALUE_100,
  fromCurrency: constants.INR,
  toCurrency: constants.EUR,
  validFromDateTime: constants.DATE_2020_01_01
};

const eurInrMrmThrAExcRate: ExchangeRate = {
  settings: setDefaultSettings(constants.TENANT_ID),
  data: {
    ratesDataProviderCode: constants.MRM,
    ratesDataSource: constants.THR,
    exchangeRateType: constants.A
  },
  value: constants.VALUE_5,
  fromCurrency: constants.EUR,
  toCurrency: constants.INR,
  validFromDateTime: constants.DATE_2019_09_16
};

const eurUsdByorEcbIndirectFalseInvertedTrueRate: ExchangeRate = {
  settings: setDefaultSettings(constants.TENANT_ID),
  data: {
    ratesDataProviderCode: 'BYOR',
    ratesDataSource: constants.ECB,
    exchangeRateType: constants.M
  },
  value: constants.VALUE_100,
  fromCurrency: constants.EUR,
  toCurrency: constants.USD,
  validFromDateTime: constants.DATE_2020_01_01
};

function instantiateExchangeRateRecordDeterminer(exchangeRateResultSet: ExchangeRate[]): ExchangeRateRecordDeterminer {
  return new ExchangeRateRecordDeterminer(
    constants.TENANT_ID,
    null as any,
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

describe('Exchange Rate Record Determiner Null Tenant Setting', () => {
  it('Get best matched exchange rate record', () => {
    const exchangeRateResultSet: ExchangeRate[] = [
      constants.inrEurMrmEcbMRate,
      constants.eurInrMrmEcbMRate,
      constants.eurInrMrmEcbARate
    ];
    const exchangeRateRecordDeterminer: ExchangeRateRecordDeterminer = instantiateExchangeRateRecordDeterminer(
      exchangeRateResultSet
    );
    const actualExchangeRateRecord: ExchangeRate = exchangeRateRecordDeterminer.getBestMatchedExchangeRateRecord(
      constants.inrEurMConversionParam
    );
    expect(constants.inrEurMrmEcbMRate).toEqual(actualExchangeRateRecord);
  });

  it('Conversion with exchange rate record having future date', () => {
    let errInput = new Error();
    const exchangeRateResultSet: ExchangeRate[] = [
      constants.inrEurMrmEcbMRate,
      constants.eurInrMrmEcbMRate,
      constants.eurInrMrmEcbARate,
      inrEurMrmThrMRate,
      constants.eurInrMrmThrMRate,
      eurInrMrmThrAExcRate
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
    let errInput = new Error();
    const exchangeRateResultSet: ExchangeRate[] = [
      constants.inrEurMrmEcbMRate,
      constants.eurInrMrmThrMRate,
      constants.eurInrMrmEcbMDuplicateRate
    ];
    const exchangeRateRecordDeterminer: ExchangeRateRecordDeterminer = instantiateExchangeRateRecordDeterminer(
      exchangeRateResultSet
    );
    try {
      const actualExchangeRateRecord: ExchangeRate = exchangeRateRecordDeterminer.getBestMatchedExchangeRateRecord(
        constants.eurInrMConversionParam
      );
    } catch (error) {
      errInput = error;
    }
    expect(errInput.message).toBe(ConversionError.MULTIPLE_CONVERSION_RECORD_FOUND);
  });

  it('Duplicate exchange rate record', () => {
    let errInput = new Error();
    const exchangeRateResultSet: ExchangeRate[] = [
      constants.inrEurMrmEcbMDuplicateRate,
      constants.inrEurMrmEcbMDuplicateRate,
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
      constants.eurInrMrmEcbARate,
      constants.inrEurMrmEcbMDuplicateRate,
      constants.inrEurMrmEcbMDuplicateRate,
      constants.inrEurMrmEcbMDuplicateRate,
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
      constants.eurInrMrmEcbARate,
      constants.inrEurMrmEcbMDuplicateRate,
      constants.inrEurMrmEcbMDuplicateRate,
      constants.inrEurMrmEcbMDuplicateRate,
      constants.eurInrMrmEcbAskIndirectFalseRate,
      constants.eurInrMrmEcbAskIndirectTrueRate
    ];
    const exchangeRateRecordDeterminer: ExchangeRateRecordDeterminer = new ExchangeRateRecordDeterminer(
      constants.TENANT_ID1,
      null as any,
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
      constants.inrEurMrmEcbMDiffrentTenantRate,
      constants.eurInrMrmEcbARate,
      constants.inrEurMrmEcbMDuplicateRate,
      constants.inrEurMrmEcbMDuplicateRate,
      constants.inrEurMrmEcbMDuplicateRate,
      constants.eurInrMrmEcbAskIndirectFalseRate,
      constants.eurInrMrmEcbAskIndirectTrueRate
    ];
    const exchangeRateRecordDeterminer: ExchangeRateRecordDeterminer = new ExchangeRateRecordDeterminer(
      constants.TENANT_ID1,
      null as any,
      exchangeRateResultSet,
      getExchangeRateTypeDetailsForTenant()
    );
    const actualExchangeRateRecord: ExchangeRate = exchangeRateRecordDeterminer.getBestMatchedExchangeRateRecord(
      constants.inrEurMConversionParam
    );
    expect(constants.inrEurMrmEcbMDiffrentTenantRate).toEqual(actualExchangeRateRecord);
  });

  // /* INVERTED RATE TEST CASE STARTS */

  it('Inverted conversion with duplicate rate', () => {
    let errInput = new Error();
    const exchangeRateResultSet: ExchangeRate[] = [
      constants.inrEurMrmEcbMDuplicateRate,
      constants.inrEurMrmEcbMDuplicateRate,
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

  it('Inverted conversion with different data source', () => {
    let errInput = new Error();
    const exchangeRateResultSet: ExchangeRate[] = [
      constants.eurUsdMrmEcbIndirectFalseInvertedTrueRate,
      constants.eurUsdMrmThrIndirectFalseInvertedTrueRate
    ];
    const exchangeRateRecordDeterminer: ExchangeRateRecordDeterminer = instantiateExchangeRateRecordDeterminer(
      exchangeRateResultSet
    );
    try {
      const actualExchangeRateRecord: ExchangeRate = exchangeRateRecordDeterminer.getBestMatchedExchangeRateRecord(
        constants.usdEurMConversionParam
      );
    } catch (error) {
      errInput = error;
    }
    expect(errInput.message).toBe(ConversionError.MULTIPLE_CONVERSION_RECORD_FOUND);
  });

  it('Inverted conversion with different data provider', () => {
    let errInput = new Error();
    const exchangeRateResultSet: ExchangeRate[] = [
      constants.eurUsdMrmEcbIndirectFalseInvertedTrueRate,
      eurUsdByorEcbIndirectFalseInvertedTrueRate
    ];
    const exchangeRateRecordDeterminer: ExchangeRateRecordDeterminer = instantiateExchangeRateRecordDeterminer(
      exchangeRateResultSet
    );
    try {
      const actualExchangeRateRecord: ExchangeRate = exchangeRateRecordDeterminer.getBestMatchedExchangeRateRecord(
        constants.usdEurMConversionParam
      );
    } catch (error) {
      errInput = error;
    }
    expect(errInput.message).toBe(ConversionError.MULTIPLE_CONVERSION_RECORD_FOUND);
  });

  it('Inverted Single conversion with inverted currency pair', () => {
    const exchangeRateResultSet: ExchangeRate[] = [constants.eurUsdMrmEcbIndirectFalseInvertedTrueRate];
    const exchangeRateRecordDeterminer: ExchangeRateRecordDeterminer = instantiateExchangeRateRecordDeterminer(
      exchangeRateResultSet
    );
    const actualExchangeRateRecord: ExchangeRate = exchangeRateRecordDeterminer.getBestMatchedExchangeRateRecord(
      constants.usdEurMConversionParam
    );
    expect(constants.eurUsdMrmEcbIndirectFalseInvertedTrueRate).toEqual(actualExchangeRateRecord);
  });

  it('Inverted Single conversion with direct currency pair', () => {
    const exchangeRateResultSet: ExchangeRate[] = [
      constants.eurUsdMrmEcbIndirectFalseInvertedTrueRate,
      constants.usdEurMrmEcbIndirectFalseInvertedTrueRate
    ];
    const exchangeRateRecordDeterminer: ExchangeRateRecordDeterminer = instantiateExchangeRateRecordDeterminer(
      exchangeRateResultSet
    );
    const actualExchangeRateRecord: ExchangeRate = exchangeRateRecordDeterminer.getBestMatchedExchangeRateRecord(
      constants.usdEurMConversionParam
    );
    expect(constants.usdEurMrmEcbIndirectFalseInvertedTrueRate).toEqual(actualExchangeRateRecord);
  });

  it('Inverted conversion exchange rate record with exchange rate type detail null', () => {
    let errInput = new Error();
    const exchangeRateResultSet: ExchangeRate[] = [
      constants.eurUsdMrmEcbMRate,
      constants.usdEurMrmEcbMRate,
      constants.eurInrMrmEcbAskIndirectFalseRate
    ];
    const exchangeRateRecordDeterminer: ExchangeRateRecordDeterminer = new ExchangeRateRecordDeterminer(
      constants.TENANT_ID,
      null as any,
      exchangeRateResultSet,
      null as any
    );
    try {
      const actualExchangeRateRecord: ExchangeRate = exchangeRateRecordDeterminer.getBestMatchedExchangeRateRecord(
        constants.inrEurAskConversionParam
      );
    } catch (error) {
      errInput = error;
    }
    expect(errInput.message).toBe(ConversionError.NO_MATCHING_EXCHANGE_RATE_RECORD);
  });

  /* INVERTED RATE TEST CASE ENDS */

  /* REFERENCE CURRENCY STARTS */

  it('Reference Currency as INR', () => {
    const exchangeRateResultSet: ExchangeRate[] = [constants.eurInrMrmEcbARate, constants.usdInrMrmEcbARate];
    const exchangeRateRecordDeterminer: ExchangeRateRecordDeterminer = instantiateExchangeRateRecordDeterminer(
      exchangeRateResultSet
    );
    const expectedExchangeRate: ExchangeRate = {
      settings: setDefaultSettings(constants.TENANT_ID),
      data: {
        ratesDataProviderCode: null as any,
        ratesDataSource: null as any,
        exchangeRateType: constants.A
      },
      value: VALUE_0_5,
      fromCurrency: constants.EUR,
      toCurrency: constants.USD,
      validFromDateTime: constants.DATE_2020_01_01
    };
    const actualExchangeRateRecord: ExchangeRate = exchangeRateRecordDeterminer.getBestMatchedExchangeRateRecord(
      constants.eurUsdAConversionParam
    );
    expect(expectedExchangeRate).toEqual(actualExchangeRateRecord);
  });

  it('Reference Currency as INR scale more than zero rate', () => {
    const exchangeRateResultSet: ExchangeRate[] = [
      constants.eurInrMrmEcbScaleMoreThanZeroRate,
      constants.usdInrMrmEcbScaleMoreThanZeroRate
    ];
    const exchangeRateRecordDeterminer: ExchangeRateRecordDeterminer = instantiateExchangeRateRecordDeterminer(
      exchangeRateResultSet
    );
    const expectedExchangeRate: ExchangeRate = {
      settings: setDefaultSettings(constants.TENANT_ID),
      data: {
        ratesDataProviderCode: null as any,
        ratesDataSource: null as any,
        exchangeRateType: constants.A
      },
      value: VALUE_0_33333333333333,
      fromCurrency: constants.EUR,
      toCurrency: constants.USD,
      validFromDateTime: constants.DATE_2020_01_01
    };
    const actualExchangeRateRecord: ExchangeRate = exchangeRateRecordDeterminer.getBestMatchedExchangeRateRecord(
      constants.eurUsdAConversionParam
    );
    expect(expectedExchangeRate).toEqual(actualExchangeRateRecord);
  });

  it('Reference Currency as INR scale more than default', () => {
    const exchangeRateResultSet: ExchangeRate[] = [
      constants.eurInrMrmEcbScaleMoreThanDefaultRate,
      constants.usdInrMrmEcbScaleMoreThanDefaultRate
    ];
    const exchangeRateRecordDeterminer: ExchangeRateRecordDeterminer = instantiateExchangeRateRecordDeterminer(
      exchangeRateResultSet
    );
    const expectedExchangeRate: ExchangeRate = {
      settings: setDefaultSettings(constants.TENANT_ID),
      data: {
        ratesDataProviderCode: null as any,
        ratesDataSource: null as any,
        exchangeRateType: constants.A
      },
      value: new Value('0.3333333336507937'),
      fromCurrency: constants.EUR,
      toCurrency: constants.USD,
      validFromDateTime: constants.DATE_2020_01_01
    };
    const actualExchangeRateRecord: ExchangeRate = exchangeRateRecordDeterminer.getBestMatchedExchangeRateRecord(
      constants.eurUsdAConversionParam
    );
    expect(expectedExchangeRate).toEqual(actualExchangeRateRecord);
  });

  it('Reference Currency as INR From Reference Currency Pair Valid DateTime', () => {
    const exchangeRateResultSet: ExchangeRate[] = [constants.eurInrMrmEcbADateBeforeRate, constants.usdInrMrmEcbARate];
    const exchangeRateRecordDeterminer: ExchangeRateRecordDeterminer = instantiateExchangeRateRecordDeterminer(
      exchangeRateResultSet
    );
    const expectedExchangeRate: ExchangeRate = {
      settings: setDefaultSettings(constants.TENANT_ID),
      data: {
        ratesDataProviderCode: null as any,
        ratesDataSource: null as any,
        exchangeRateType: constants.A
      },
      value: VALUE_0_5,
      fromCurrency: constants.EUR,
      toCurrency: constants.USD,
      validFromDateTime: constants.DATE_2019_09_16
    };
    const actualExchangeRateRecord: ExchangeRate = exchangeRateRecordDeterminer.getBestMatchedExchangeRateRecord(
      constants.eurUsdAConversionParam
    );
    expect(expectedExchangeRate).toEqual(actualExchangeRateRecord);
  });

  it('Reference Currency with non existing rate type', () => {
    let errInput = new Error();
    const exchangeRateResultSet: ExchangeRate[] = [constants.usdInrMrmEcbLastRate, constants.eurInrMrmEcbLastRate];
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
    expect(errInput.message).toBe(ConversionError.NO_MATCHING_EXCHANGE_RATE_RECORD);
  });

  it('Reference Currency with Direct Rate No From Reference Pair', () => {
    const exchangeRateResultSet: ExchangeRate[] = [
      constants.usdInrMrmEcbARate,
      constants.eurUsdMrmEcbIndirectTrueExcRate,
      constants.eurUsdMrmEcbIndirectFalseRate
    ];
    const exchangeRateRecordDeterminer: ExchangeRateRecordDeterminer = instantiateExchangeRateRecordDeterminer(
      exchangeRateResultSet
    );
    const actualExchangeRateRecord: ExchangeRate = exchangeRateRecordDeterminer.getBestMatchedExchangeRateRecord(
      constants.eurUsdAConversionParam
    );
    expect(constants.eurUsdMrmEcbIndirectFalseRate).toEqual(actualExchangeRateRecord);
  });

  it('Reference Currency with Direct Rate No To Reference Pair', () => {
    const exchangeRateResultSet: ExchangeRate[] = [
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
    expect(constants.eurUsdMrmEcbIndirectFalseRate).toEqual(actualExchangeRateRecord);
  });

  it('Reference Currency with zero rate', () => {
    let errInput = new Error();
    const exchangeRateResultSet: ExchangeRate[] = [constants.eurInrMrmEcbZeroRate, constants.usdInrMrmEcbZeroRate];
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
    const exchangeRateResultSet: ExchangeRate[] = [constants.eurInrMrmEcbZeroFactor, constants.usdInrMrmEcbZeroFactor];
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
      constants.eurInrMrmEcbZeroFactorExcRate,
      constants.usdInrMrmEcbZeroFactorRate
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
      constants.eurUsdMrmEcbIndirectTrueExcRate,
      constants.eurUsdMrmEcbIndirectFalseRate
    ];
    const exchangeRateRecordDeterminer: ExchangeRateRecordDeterminer = instantiateExchangeRateRecordDeterminer(
      exchangeRateResultSet
    );
    const actualExchangeRateRecord: ExchangeRate = exchangeRateRecordDeterminer.getBestMatchedExchangeRateRecord(
      constants.eurUsdAConversionParam
    );
    expect(constants.eurUsdMrmEcbIndirectFalseRate).toEqual(actualExchangeRateRecord);
  });

  it('Reference Currency with duplicate from reference pair', () => {
    let errInput = new Error();
    const exchangeRateResultSet: ExchangeRate[] = [
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
      constants.eurUsdMrmEcbIndirectTrueExcRate,
      constants.eurUsdMrmEcbIndirectFalseRate,
      constants.eurInrMrmEcbARate,
      constants.usdInrMrmEcbARate,
      constants.usdInrMrmEcbDuplicateDateRate
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
      constants.eurInrMrmIndirectTrueRate,
      constants.usdInrMrmIndirectTrueRate
    ];
    const exchangeRateRecordDeterminer: ExchangeRateRecordDeterminer = instantiateExchangeRateRecordDeterminer(
      exchangeRateResultSet
    );
    const expectedExchangeRate: ExchangeRate = {
      settings: setDefaultSettings(constants.TENANT_ID),
      data: {
        ratesDataProviderCode: null as any,
        ratesDataSource: null as any,
        exchangeRateType: constants.A
      },
      value: constants.VALUE_2,
      fromCurrency: constants.EUR,
      toCurrency: constants.USD,
      validFromDateTime: constants.DATE_2020_01_01
    };
    const actualExchangeRateRecord: ExchangeRate = exchangeRateRecordDeterminer.getBestMatchedExchangeRateRecord(
      constants.eurUsdAConversionParam
    );
    expect(expectedExchangeRate).toEqual(actualExchangeRateRecord);
  });

  it('From Reference Rate as Indirect and To Reference Rate as direct', () => {
    const exchangeRateResultSet: ExchangeRate[] = [
      constants.eurInrMrmIndirectTrueRate,
      constants.usdInrMrmIndirectFalseRate
    ];
    const exchangeRateRecordDeterminer: ExchangeRateRecordDeterminer = instantiateExchangeRateRecordDeterminer(
      exchangeRateResultSet
    );
    const expectedExchangeRate: ExchangeRate = {
      settings: setDefaultSettings(constants.TENANT_ID),
      data: {
        ratesDataProviderCode: null as any,
        ratesDataSource: null as any,
        exchangeRateType: constants.A
      },
      value: VALUE_0_02,
      fromCurrency: constants.EUR,
      toCurrency: constants.USD,
      validFromDateTime: constants.DATE_2020_01_01
    };
    const actualExchangeRateRecord: ExchangeRate = exchangeRateRecordDeterminer.getBestMatchedExchangeRateRecord(
      constants.eurUsdAConversionParam
    );
    expect(expectedExchangeRate).toEqual(actualExchangeRateRecord);
  });

  it('From Reference Rate as direct and To Reference Rate as indirect', () => {
    const exchangeRateResultSet: ExchangeRate[] = [
      constants.eurInrMrmIndirectFalseRate,
      constants.usdInrMrmIndirectTrueRate
    ];
    const exchangeRateRecordDeterminer: ExchangeRateRecordDeterminer = instantiateExchangeRateRecordDeterminer(
      exchangeRateResultSet
    );
    const expectedExchangeRate: ExchangeRate = {
      settings: setDefaultSettings(constants.TENANT_ID),
      data: {
        ratesDataProviderCode: null as any,
        ratesDataSource: null as any,
        exchangeRateType: constants.A
      },
      value: VALUE_50,
      fromCurrency: constants.EUR,
      toCurrency: constants.USD,
      validFromDateTime: constants.DATE_2020_01_01
    };
    const actualExchangeRateRecord: ExchangeRate = exchangeRateRecordDeterminer.getBestMatchedExchangeRateRecord(
      constants.eurUsdAConversionParam
    );
    expect(expectedExchangeRate).toEqual(actualExchangeRateRecord);
  });

  it('From Reference Rate as direct and To Reference Rate as direct', () => {
    const exchangeRateResultSet: ExchangeRate[] = [
      constants.eurInrMrmIndirectFalseRate,
      constants.usdInrMrmIndirectFalseRate
    ];
    const exchangeRateRecordDeterminer: ExchangeRateRecordDeterminer = instantiateExchangeRateRecordDeterminer(
      exchangeRateResultSet
    );
    const expectedExchangeRate: ExchangeRate = {
      settings: setDefaultSettings(constants.TENANT_ID),
      data: {
        ratesDataProviderCode: null as any,
        ratesDataSource: null as any,
        exchangeRateType: constants.A
      },
      value: VALUE_0_5,
      fromCurrency: constants.EUR,
      toCurrency: constants.USD,
      validFromDateTime: constants.DATE_2020_01_01
    };
    const actualExchangeRateRecord: ExchangeRate = exchangeRateRecordDeterminer.getBestMatchedExchangeRateRecord(
      constants.eurUsdAConversionParam
    );
    expect(expectedExchangeRate).toEqual(actualExchangeRateRecord);
  });

  it('From Reference Rate as direct and To Reference Rate as direct Infinite decimal', () => {
    const exchangeRateResultSet: ExchangeRate[] = [
      constants.eurInrMrmIndirectFalseRateInfiniteDecimal,
      constants.usdInrMrmIndirectFalseRateInfiniteDecimal
    ];
    const exchangeRateRecordDeterminer: ExchangeRateRecordDeterminer = instantiateExchangeRateRecordDeterminer(
      exchangeRateResultSet
    );
    const expectedExchangeRate: ExchangeRate = {
      settings: setDefaultSettings(constants.TENANT_ID),
      data: {
        ratesDataProviderCode: null as any,
        ratesDataSource: null as any,
        exchangeRateType: constants.A
      },
      value: constants.VALUE_1,
      fromCurrency: constants.EUR,
      toCurrency: constants.USD,
      validFromDateTime: constants.DATE_2020_01_01
    };
    const actualExchangeRateRecord: ExchangeRate = exchangeRateRecordDeterminer.getBestMatchedExchangeRateRecord(
      constants.eurUsdAConversionParam
    );
    expect(expectedExchangeRate).toEqual(actualExchangeRateRecord);
  });

  it('From Reference Rate as indirect and To Reference Rate as indirect factor more than one', () => {
    const exchangeRateResultSet: ExchangeRate[] = [
      constants.eurInrMrmIndirectTrueFactorMoreThanOneRate,
      constants.usdInrMrmIndirectTrueFactorMoreThanOneRate
    ];
    const exchangeRateRecordDeterminer: ExchangeRateRecordDeterminer = instantiateExchangeRateRecordDeterminer(
      exchangeRateResultSet
    );
    const expectedExchangeRate: ExchangeRate = {
      settings: setDefaultSettings(constants.TENANT_ID),
      data: {
        ratesDataProviderCode: null as any,
        ratesDataSource: null as any,
        exchangeRateType: constants.A
      },
      value: VALUE_8,
      fromCurrency: constants.EUR,
      toCurrency: constants.USD,
      validFromDateTime: constants.DATE_2020_01_01
    };
    const actualExchangeRateRecord: ExchangeRate = exchangeRateRecordDeterminer.getBestMatchedExchangeRateRecord(
      constants.eurUsdAConversionParam
    );
    expect(expectedExchangeRate).toEqual(actualExchangeRateRecord);
  });

  it('From Reference Rate as indirect and To Reference Rate as direct factor more than one', () => {
    const exchangeRateResultSet: ExchangeRate[] = [
      constants.eurInrMrmIndirectTrueFactorMoreThanOneRate,
      constants.usdInrMrmIndirectFalseFactorMoreThanOneRate
    ];
    const exchangeRateRecordDeterminer: ExchangeRateRecordDeterminer = instantiateExchangeRateRecordDeterminer(
      exchangeRateResultSet
    );
    const expectedExchangeRate: ExchangeRate = {
      settings: setDefaultSettings(constants.TENANT_ID),
      data: {
        ratesDataProviderCode: null as any,
        ratesDataSource: null as any,
        exchangeRateType: constants.A
      },
      value: VALUE_0_08,
      fromCurrency: constants.EUR,
      toCurrency: constants.USD,
      validFromDateTime: constants.DATE_2020_01_01
    };
    const actualExchangeRateRecord: ExchangeRate = exchangeRateRecordDeterminer.getBestMatchedExchangeRateRecord(
      constants.eurUsdAConversionParam
    );
    expect(expectedExchangeRate).toEqual(actualExchangeRateRecord);
  });

  it('From Reference Rate as direct and To Reference Rate as indirect factor more than one', () => {
    const exchangeRateResultSet: ExchangeRate[] = [
      constants.eurInrMrmIndirectFalseFactorMoreThanOneRate,
      constants.usdInrMrmIndirectTrueFactorMoreThanOneRate
    ];
    const exchangeRateRecordDeterminer: ExchangeRateRecordDeterminer = instantiateExchangeRateRecordDeterminer(
      exchangeRateResultSet
    );
    const expectedExchangeRate: ExchangeRate = {
      settings: setDefaultSettings(constants.TENANT_ID),
      data: {
        ratesDataProviderCode: null as any,
        ratesDataSource: null as any,
        exchangeRateType: constants.A
      },
      value: VALUE_200,
      fromCurrency: constants.EUR,
      toCurrency: constants.USD,
      validFromDateTime: constants.DATE_2020_01_01
    };
    const actualExchangeRateRecord: ExchangeRate = exchangeRateRecordDeterminer.getBestMatchedExchangeRateRecord(
      constants.eurUsdAConversionParam
    );
    expect(expectedExchangeRate).toEqual(actualExchangeRateRecord);
  });

  it('From Reference Rate as direct and To Reference Rate as direct factor more than one', () => {
    const exchangeRateResultSet: ExchangeRate[] = [
      constants.eurInrMrmIndirectFalseFactorMoreThanOneRate,
      constants.usdInrMrmIndirectFalseFactorMoreThanOneRate
    ];
    const exchangeRateRecordDeterminer: ExchangeRateRecordDeterminer = instantiateExchangeRateRecordDeterminer(
      exchangeRateResultSet
    );
    const expectedExchangeRate: ExchangeRate = {
      settings: setDefaultSettings(constants.TENANT_ID),
      data: {
        ratesDataProviderCode: null as any,
        ratesDataSource: null as any,
        exchangeRateType: constants.A
      },
      value: constants.VALUE_2,
      fromCurrency: constants.EUR,
      toCurrency: constants.USD,
      validFromDateTime: constants.DATE_2020_01_01
    };
    const actualExchangeRateRecord: ExchangeRate = exchangeRateRecordDeterminer.getBestMatchedExchangeRateRecord(
      constants.eurUsdAConversionParam
    );
    expect(expectedExchangeRate).toEqual(actualExchangeRateRecord);
  });
});
