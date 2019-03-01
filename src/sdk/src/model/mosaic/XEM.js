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
const NamespaceId_1 = require("../namespace/NamespaceId");
const UInt64_1 = require("../UInt64");
const Mosaic_1 = require("./Mosaic");
const MosaicId_1 = require("./MosaicId");
/**
 * XEM mosaic
 */
class XEM extends Mosaic_1.Mosaic {
    /**
     * constructor
     * @param amount
     */
    constructor(amount) {
        super(XEM.MOSAIC_ID, amount);
    }
    /**
     * Create xem with using xem as unit.
     *
     * @param amount
     * @returns {XEM}
     */
    static createRelative(amount) {
        if (typeof amount === 'number') {
            return new XEM(UInt64_1.UInt64.fromUint(amount * Math.pow(10, XEM.DIVISIBILITY)));
        }
        return new XEM(UInt64_1.UInt64.fromUint(amount.compact() * Math.pow(10, XEM.DIVISIBILITY)));
    }
    /**
     * Create xem with using micro xem as unit, 1 XEM = 1000000 micro XEM.
     *
     * @param amount
     * @returns {XEM}
     */
    static createAbsolute(amount) {
        if (typeof amount === 'number') {
            return new XEM(UInt64_1.UInt64.fromUint(amount));
        }
        return new XEM(amount);
    }
}
/**
 * Divisiblity
 * @type {number}
 */
XEM.DIVISIBILITY = 6;
/**
 * Initial supply
 * @type {number}
 */
XEM.INITIAL_SUPPLY = 8999999999;
/**
 * Is tranferable
 * @type {boolean}
 */
XEM.TRANSFERABLE = true;
/**
 * Is mutable
 * @type {boolean}
 */
XEM.SUPPLY_MUTABLE = false;
/**
 * mosaicId
 * @type {Id}
 */
XEM.MOSAIC_ID = new MosaicId_1.MosaicId('nem:xem');
/**
 * namespaceId
 * @type {Id}
 */
XEM.NAMESPACE_ID = new NamespaceId_1.NamespaceId('nem');
exports.XEM = XEM;
//# sourceMappingURL=XEM.js.map