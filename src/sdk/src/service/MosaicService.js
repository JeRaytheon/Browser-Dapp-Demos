"use strict";
/*
 * Copyright 2018 NEM
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
const MosaicAmountView_1 = require("./MosaicAmountView");
const MosaicView_1 = require("./MosaicView");
/**
 * Mosaic service
 */
class MosaicService {
    /**
     * Constructor
     * @param accountHttp
     * @param mosaicHttp
     * @param namespaceHttp
     */
    constructor(accountHttp, mosaicHttp, namespaceHttp) {
        this.accountHttp = accountHttp;
        this.mosaicHttp = mosaicHttp;
        this.namespaceHttp = namespaceHttp;
    }
    /**
     * Get mosaic view given mosaicIds
     * @param mosaicIds - The ids of the mosaics
     * @returns {Observable<MosaicView[]>}
     */
    mosaicsView(mosaicIds) {
        return rxjs_1.of(mosaicIds).pipe(operators_1.mergeMap((_) => this.mosaicHttp.getMosaics(mosaicIds)), operators_1.mergeMap((_) => _), operators_1.mergeMap((mosaicInfo) => this.mosaicHttp.getMosaicsName([mosaicInfo.mosaicId]).pipe(operators_1.map((mosaicsName) => {
            return { mosaicInfo, mosaicName: mosaicsName[0].name };
        }))), operators_1.mergeMap((_) => this.namespaceHttp.getNamespacesName([_.mosaicInfo.namespaceId]).pipe(operators_1.map((namespacesName) => {
            return new MosaicView_1.MosaicView(_.mosaicInfo, namespacesName[0].name, _.mosaicName);
        }))), operators_1.toArray());
    }
    /**
     * Get mosaic amount view given mosaic array
     * @param mosaics
     * @returns {Observable<MosaicAmountView[]>}
     */
    mosaicsAmountView(mosaics) {
        return rxjs_1.of(mosaics).pipe(operators_1.mergeMap((_) => _), operators_1.mergeMap((mosaic) => this.mosaicsView([mosaic.id]).pipe(operators_1.filter((_) => _.length !== 0), operators_1.map((mosaicViews) => {
            return new MosaicAmountView_1.MosaicAmountView(mosaicViews[0].mosaicInfo, mosaicViews[0].namespaceName, mosaicViews[0].mosaicName, mosaic.amount);
        }), operators_1.toArray())));
    }
    /**
     * Get balance mosaics in form of MosaicAmountViews for a given account address
     * @param address - Account address
     * @returns {Observable<MosaicAmountView[]>}
     */
    mosaicsAmountViewFromAddress(address) {
        return rxjs_1.of(address).pipe(operators_1.mergeMap((_) => this.accountHttp.getAccountInfo(_)), operators_1.mergeMap((_) => this.mosaicsAmountView(_.mosaics)));
    }
}
exports.MosaicService = MosaicService;
//# sourceMappingURL=MosaicService.js.map