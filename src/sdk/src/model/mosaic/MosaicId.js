"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
const nem2_library_1 = require("nem2-library");
const Id_1 = require("../Id");
/**
 * The mosaic id structure describes mosaic id
 *
 * @since 1.0
 */
class MosaicId {
    /**
     * Create MosaicId from mosaic and namespace string id (ex: nem:xem or domain.subdom.subdome:token)
     * or id in form of array number (ex: [3646934825, 3576016193])
     *
     * @param id
     */
    constructor(id) {
        if (id instanceof Array) {
            this.id = new Id_1.Id(id);
        }
        else if (typeof id === 'string') {
            this.fullName = id;
            const limiterPosition = id.indexOf(':');
            const namespaceName = id.substr(0, limiterPosition);
            const mosaicName = id.substr(limiterPosition + 1);
            this.id = new Id_1.Id(nem2_library_1.mosaicId(namespaceName, mosaicName));
        }
    }
    /**
     * Get string value of id
     * @returns {string}
     */
    toHex() {
        return this.id.toHex();
    }
    /**
     * Compares mosaicIds for equality.
     *
     * @return boolean
     */
    equals(other) {
        if (other instanceof MosaicId) {
            return this.id.equals(other.id);
        }
        return false;
    }
}
exports.MosaicId = MosaicId;
//# sourceMappingURL=MosaicId.js.map