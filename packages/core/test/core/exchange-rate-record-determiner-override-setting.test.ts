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
const VALUE_0_02: Value = new Value('0.02');
const VALUE_50: Value = new Value('50');
const VALUE_8: Value = new Value('8');
const VALUE_0_08: Value = new Value('0.08');
const VALUE_200: Value = new Value('200');

const usdEurAskConversionParam: ConversionParameterForNonFixedRate = buildConversionParameterForNonFixedRate(
  'USD',
  'EUR',
  '100',
  constants.ASK,
  constants.DATE_2020_01_01
);

const eurInrMrmThrADateBeforeRate: ExchangeRate = {
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

const eurInrMrmThrZeroRate: ExchangeRate = {
  settings: setDefaultSettings(constants.TENANT_ID),
  data: {
    ratesDataProviderCode: constants.MRM,
    ratesDataSource: constants.THR,
    exchangeRateType: constants.A
  },
  value: constants.VALUE_0,
  fromCurrency: constants.EUR,
  toCurrency: constants.INR,
  validFromDateTime: constants.DATE_2020_02_01
};

const usdInrMrmThrZeroRate: ExchangeRate = {
  settings: setDefaultSettings(constants.TENANT_ID),
  data: {
    ratesDataProviderCode: constants.MRM,
    ratesDataSource: constants.THR,
    exchangeRateType: constants.A
  },
  value: constants.VALUE_0,
  fromCurrency: constants.USD,
  toCurrency: constants.INR,
  validFromDateTime: constants.DATE_2020_01_01
};

const eurInrMrmThrZeroFactor: ExchangeRate = {
  settings: {
    tenantIdentifier: constants.TENANT_ID,
    isIndirect: false,
    fromCurrencyfactor: 0,
    toCurrencyfactor: 0
  },
  data: {
    ratesDataProviderCode: constants.MRM,
    ratesDataSource: constants.THR,
    exchangeRateType: constants.A
  },
  value: constants.VALUE_10,
  fromCurrency: constants.EUR,
  toCurrency: constants.INR,
  validFromDateTime: constants.DATE_2020_02_01
};

const eurInrMrmThrZeroFactorRate: ExchangeRate = {
  settings: {
    tenantIdentifier: constants.TENANT_ID,
    isIndirect: false,
    fromCurrencyfactor: 0,
    toCurrencyfactor: 0
  },
  data: {
    ratesDataProviderCode: constants.MRM,
    ratesDataSource: constants.THR,
    exchangeRateType: constants.A
  },
  value: constants.VALUE_0,
  fromCurrency: constants.EUR,
  toCurrency: constants.INR,
  validFromDateTime: constants.DATE_2020_02_01
};

const usdInrMrmThrZeroFactor: ExchangeRate = {
  settings: {
    tenantIdentifier: constants.TENANT_ID,
    isIndirect: false,
    fromCurrencyfactor: 0,
    toCurrencyfactor: 0
  },
  data: {
    ratesDataProviderCode: constants.MRM,
    ratesDataSource: constants.THR,
    exchangeRateType: constants.A
  },
  value: constants.VALUE_10,
  fromCurrency: constants.USD,
  toCurrency: constants.INR,
  validFromDateTime: constants.DATE_2020_01_01
};

const usdInrMrmThrZeroFactorRate: ExchangeRate = {
  settings: {
    tenantIdentifier: constants.TENANT_ID,
    isIndirect: false,
    fromCurrencyfactor: 0,
    toCurrencyfactor: 0
  },
  data: {
    ratesDataProviderCode: constants.MRM,
    ratesDataSource: constants.THR,
    exchangeRateType: constants.A
  },
  value: constants.VALUE_0,
  fromCurrency: constants.USD,
  toCurrency: constants.INR,
  validFromDateTime: constants.DATE_2020_01_01
};

const eurUsdMrmThrMRate: ExchangeRate = {
  settings: setDefaultSettings(constants.TENANT_ID),
  data: {
    ratesDataProviderCode: constants.MRM,
    ratesDataSource: constants.ECB,
    exchangeRateType: constants.M
  },
  value: constants.VALUE_100,
  fromCurrency: constants.EUR,
  toCurrency: constants.USD,
  validFromDateTime: constants.DATE_2020_01_01
};

const eurInrMrmThrIndirectFalseRateInfiniteDecimal: ExchangeRate = {
  settings: setDefaultSettings(constants.TENANT_ID),
  data: {
    ratesDataProviderCode: constants.MRM,
    ratesDataSource: constants.THR,
    exchangeRateType: constants.A
  },
  value: constants.VALUE_3,
  fromCurrency: constants.EUR,
  toCurrency: constants.INR,
  validFromDateTime: constants.DATE_2020_02_01
};

const usdInrMrmThrIndirectFalseRateInfiniteDecimal: ExchangeRate = {
  settings: setDefaultSettings(constants.TENANT_ID),
  data: {
    ratesDataProviderCode: constants.MRM,
    ratesDataSource: constants.THR,
    exchangeRateType: constants.A
  },
  value: constants.VALUE_3,
  fromCurrency: constants.USD,
  toCurrency: constants.INR,
  validFromDateTime: constants.DATE_2020_01_01
};

const eurInrMrmEcbIndirectTrueExcRate: ExchangeRate = {
  settings: {
    tenantIdentifier: constants.TENANT_ID,
    isIndirect: true,
    fromCurrencyfactor: 1,
    toCurrencyfactor: 1
  },
  data: {
    ratesDataProviderCode: constants.MRM,
    ratesDataSource: constants.ECB,
    exchangeRateType: constants.M
  },
  value: constants.VALUE_100,
  fromCurrency: constants.EUR,
  toCurrency: constants.INR,
  validFromDateTime: constants.DATE_2020_01_16
};

const eurInrMrmEcbIndirectFalseExcRate: ExchangeRate = {
  settings: setDefaultSettings(constants.TENANT_ID),
  data: {
    ratesDataProviderCode: constants.MRM,
    ratesDataSource: constants.ECB,
    exchangeRateType: constants.M
  },
  value: constants.VALUE_100,
  fromCurrency: constants.EUR,
  toCurrency: constants.INR,
  validFromDateTime: constants.DATE_2020_01_16
};

const usdInrMrmEcbDuplicateDateExcRate: ExchangeRate = {
  settings: setDefaultSettings(constants.TENANT_ID),
  data: {
    ratesDataProviderCode: constants.MRM,
    ratesDataSource: constants.ECB,
    exchangeRateType: constants.A
  },
  value: constants.VALUE_10,
  fromCurrency: constants.EUR,
  toCurrency: constants.INR,
  validFromDateTime: constants.DATE_2020_01_01
};

const eurInrMrmEcbIndirectFalseRateInfiniteDecimal: ExchangeRate = {
  settings: setDefaultSettings(constants.TENANT_ID),
  data: {
    ratesDataProviderCode: constants.MRM,
    ratesDataSource: constants.ECB,
    exchangeRateType: constants.A
  },
  value: constants.VALUE_3,
  fromCurrency: constants.EUR,
  toCurrency: constants.INR,
  validFromDateTime: constants.DATE_2020_02_01
};

const usdInrMrmEcbIndirectFalseRateInfiniteDecimal: ExchangeRate = {
  settings: setDefaultSettings(constants.TENANT_ID),
  data: {
    ratesDataProviderCode: constants.MRM,
    ratesDataSource: constants.ECB,
    exchangeRateType: constants.A
  },
  value: constants.VALUE_3,
  fromCurrency: constants.USD,
  toCurrency: constants.INR,
  validFromDateTime: constants.DATE_2020_01_01
};

const eurInrMrmEcbZeroFactorRate: ExchangeRate = {
  settings: {
    tenantIdentifier: constants.TENANT_ID,
    isIndirect: false,
    fromCurrencyfactor: 0,
    toCurrencyfactor: 0
  },
  data: {
    ratesDataProviderCode: constants.MRM,
    ratesDataSource: constants.ECB,
    exchangeRateType: constants.A
  },
  value: constants.VALUE_0,
  fromCurrency: constants.EUR,
  toCurrency: constants.INR,
  validFromDateTime: constants.DATE_2020_01_01
};

const eurInrMrmThrScaleMoreThanZeroRate: ExchangeRate = {
  settings: setDefaultSettings(constants.TENANT_ID),
  data: {
    ratesDataProviderCode: constants.MRM,
    ratesDataSource: constants.THR,
    exchangeRateType: constants.A
  },
  value: constants.VALUE_7_0,
  fromCurrency: constants.EUR,
  toCurrency: constants.INR,
  validFromDateTime: constants.DATE_2020_02_01
};

const usdInrMrmThrScaleMoreThanZeroRate: ExchangeRate = {
  settings: setDefaultSettings(constants.TENANT_ID),
  data: {
    ratesDataProviderCode: constants.MRM,
    ratesDataSource: constants.THR,
    exchangeRateType: constants.A
  },
  value: constants.VALUE_21_0,
  fromCurrency: constants.USD,
  toCurrency: constants.INR,
  validFromDateTime: constants.DATE_2020_01_01
};

const eurInrMrmThrScaleMoreThanDefaultRate: ExchangeRate = {
  settings: setDefaultSettings(constants.TENANT_ID),
  data: {
    ratesDataProviderCode: constants.MRM,
    ratesDataSource: constants.THR,
    exchangeRateType: constants.A
  },
  value: constants.VALUE_7_00000001,
  fromCurrency: constants.EUR,
  toCurrency: constants.INR,
  validFromDateTime: constants.DATE_2020_02_01
};

const usdInrMrmThrScaleMoreThanDefaultRate: ExchangeRate = {
  settings: setDefaultSettings(constants.TENANT_ID),
  data: {
    ratesDataProviderCode: constants.MRM,
    ratesDataSource: constants.THR,
    exchangeRateType: constants.A
  },
  value: constants.VALUE_21_00000001,
  fromCurrency: constants.USD,
  toCurrency: constants.INR,
  validFromDateTime: constants.DATE_2020_01_01
};

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
      eurUsdMrmThrMRate,
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
      constants.usdInrMrmEcbScaleMoreThanZeroRate,
      eurInrMrmThrScaleMoreThanZeroRate,
      usdInrMrmThrScaleMoreThanZeroRate
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
      constants.usdInrMrmEcbScaleMoreThanDefaultRate,
      eurInrMrmThrScaleMoreThanDefaultRate,
      usdInrMrmThrScaleMoreThanDefaultRate
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
      validFromDateTime: constants.DATE_2020_01_01
    };
    const actualExchangeRateRecord: ExchangeRate = exchangeRateRecordDeterminer.getBestMatchedExchangeRateRecord(
      constants.eurUsdAConversionParam
    );
    expect(expectedExchangeRate).toEqual(actualExchangeRateRecord);
  });

  it('Reference Currency as INR From Reference Currency Pair Valid DateTime', () => {
    const exchangeRateResultSet: ExchangeRate[] = [
      constants.eurInrMrmEcbADateBeforeRate,
      eurInrMrmThrADateBeforeRate,
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
      validFromDateTime: constants.DATE_2019_09_16
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
      eurInrMrmThrZeroRate,
      usdInrMrmThrZeroRate
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
      eurInrMrmThrZeroFactor,
      usdInrMrmThrZeroFactor
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
      eurInrMrmEcbZeroFactorRate,
      constants.usdInrMrmEcbZeroFactorRate,
      eurInrMrmThrZeroFactorRate,
      usdInrMrmThrZeroFactorRate
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
      usdInrMrmEcbDuplicateDateExcRate
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
      eurInrMrmEcbIndirectTrueExcRate,
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
      constants.eurInrMrmThrIndirectTrueRate,
      constants.usdInrMrmThrIndirectFalseRate,
      eurInrMrmEcbIndirectTrueExcRate,
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
      validFromDateTime: constants.DATE_2020_01_01
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
      eurInrMrmEcbIndirectFalseExcRate,
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
      validFromDateTime: constants.DATE_2020_01_01
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
      eurInrMrmEcbIndirectFalseExcRate,
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
      validFromDateTime: constants.DATE_2020_01_01
    };
    const actualExchangeRateRecord: ExchangeRate = exchangeRateRecordDeterminer.getBestMatchedExchangeRateRecord(
      constants.eurUsdAConversionParam
    );
    expect(expectedExchangeRate).toEqual(actualExchangeRateRecord);
  });

  it('From Reference Rate as direct and To Reference Rate as direct Infinite decimal', () => {
    const exchangeRateResultSet: ExchangeRate[] = [
      eurInrMrmThrIndirectFalseRateInfiniteDecimal,
      usdInrMrmThrIndirectFalseRateInfiniteDecimal,
      eurInrMrmEcbIndirectFalseRateInfiniteDecimal,
      usdInrMrmEcbIndirectFalseRateInfiniteDecimal
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
      validFromDateTime: constants.DATE_2020_01_01
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
      validFromDateTime: constants.DATE_2020_01_01
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
      validFromDateTime: constants.DATE_2020_01_01
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
