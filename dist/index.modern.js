import React__default, { useRef, useState, useEffect, forwardRef, useImperativeHandle, useMemo as useMemo$1, useCallback, Fragment, useContext, useLayoutEffect, createContext, createElement, Component, isValidElement, cloneElement, memo } from 'react';
import { Row, Col, App, message as message$1, Modal, notification as notification$1, ConfigProvider, Button, Popconfirm, Tooltip, Spin, Image, Upload, Space, Drawer, Tabs, Dropdown, Cascader, Checkbox, Empty, Radio, Select, TreeSelect, DatePicker, Form as Form$1, InputNumber, Input, AutoComplete, Rate, Slider, Switch, TimePicker, Card, Steps, Typography, Menu, Table as Table$1, Divider } from 'antd';
import dayjs from 'dayjs';
import { cloneDeepWith, cloneDeep as cloneDeep$1, debounce as debounce$1 } from 'lodash';
import ReactDOM from 'react-dom';
import { CopyOutlined, CheckOutlined, LoadingOutlined, PlusOutlined, UploadOutlined, QuestionCircleOutlined, MenuOutlined } from '@ant-design/icons';
import OSS from 'ali-oss';
import update from 'immutability-helper';
import { useDrop, useDrag, DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { EyeOutlined, DeleteOutlined } from '@ant-design/icons/es/icons';
import axios from 'axios';
import { isFragment, isMemo, ForwardRef } from 'react-is';
import { SortableElement, SortableHandle, SortableContainer, arrayMove } from 'react-sortable-hoc';
import debounce from 'lodash/debounce';
import mergeWith from 'lodash/mergeWith';
import BigNumber from 'bignumber.js';
import html2canvas from 'html2canvas';
import { useReactToPrint } from 'react-to-print';
import FileSaver from 'file-saver';
import JSZip from 'jszip';
import zhCN from 'antd/lib/locale/zh_CN';
import Draggable from 'react-draggable';
import { Resizable } from 'react-resizable';
import { VariableSizeGrid } from 'react-window';

var __defProp = Object.defineProperty;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __objRest = (source, exclude) => {
  var target = {};
  for (var prop in source)
    if (__hasOwnProp.call(source, prop) && exclude.indexOf(prop) < 0)
      target[prop] = source[prop];
  if (source != null && __getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(source)) {
      if (exclude.indexOf(prop) < 0 && __propIsEnum.call(source, prop))
        target[prop] = source[prop];
    }
  return target;
};

// src/third-party/qrcodegen/index.ts
/**
 * @license QR Code generator library (TypeScript)
 * Copyright (c) Project Nayuki.
 * SPDX-License-Identifier: MIT
 */
var qrcodegen;
((qrcodegen2) => {
  const _QrCode = class {
    constructor(version, errorCorrectionLevel, dataCodewords, msk) {
      this.version = version;
      this.errorCorrectionLevel = errorCorrectionLevel;
      this.modules = [];
      this.isFunction = [];
      if (version < _QrCode.MIN_VERSION || version > _QrCode.MAX_VERSION)
        throw new RangeError("Version value out of range");
      if (msk < -1 || msk > 7)
        throw new RangeError("Mask value out of range");
      this.size = version * 4 + 17;
      let row = [];
      for (let i = 0; i < this.size; i++)
        row.push(false);
      for (let i = 0; i < this.size; i++) {
        this.modules.push(row.slice());
        this.isFunction.push(row.slice());
      }
      this.drawFunctionPatterns();
      const allCodewords = this.addEccAndInterleave(dataCodewords);
      this.drawCodewords(allCodewords);
      if (msk == -1) {
        let minPenalty = 1e9;
        for (let i = 0; i < 8; i++) {
          this.applyMask(i);
          this.drawFormatBits(i);
          const penalty = this.getPenaltyScore();
          if (penalty < minPenalty) {
            msk = i;
            minPenalty = penalty;
          }
          this.applyMask(i);
        }
      }
      assert(0 <= msk && msk <= 7);
      this.mask = msk;
      this.applyMask(msk);
      this.drawFormatBits(msk);
      this.isFunction = [];
    }
    static encodeText(text, ecl) {
      const segs = qrcodegen2.QrSegment.makeSegments(text);
      return _QrCode.encodeSegments(segs, ecl);
    }
    static encodeBinary(data, ecl) {
      const seg = qrcodegen2.QrSegment.makeBytes(data);
      return _QrCode.encodeSegments([seg], ecl);
    }
    static encodeSegments(segs, ecl, minVersion = 1, maxVersion = 40, mask = -1, boostEcl = true) {
      if (!(_QrCode.MIN_VERSION <= minVersion && minVersion <= maxVersion && maxVersion <= _QrCode.MAX_VERSION) || mask < -1 || mask > 7)
        throw new RangeError("Invalid value");
      let version;
      let dataUsedBits;
      for (version = minVersion; ; version++) {
        const dataCapacityBits2 = _QrCode.getNumDataCodewords(version, ecl) * 8;
        const usedBits = QrSegment.getTotalBits(segs, version);
        if (usedBits <= dataCapacityBits2) {
          dataUsedBits = usedBits;
          break;
        }
        if (version >= maxVersion)
          throw new RangeError("Data too long");
      }
      for (const newEcl of [_QrCode.Ecc.MEDIUM, _QrCode.Ecc.QUARTILE, _QrCode.Ecc.HIGH]) {
        if (boostEcl && dataUsedBits <= _QrCode.getNumDataCodewords(version, newEcl) * 8)
          ecl = newEcl;
      }
      let bb = [];
      for (const seg of segs) {
        appendBits(seg.mode.modeBits, 4, bb);
        appendBits(seg.numChars, seg.mode.numCharCountBits(version), bb);
        for (const b of seg.getData())
          bb.push(b);
      }
      assert(bb.length == dataUsedBits);
      const dataCapacityBits = _QrCode.getNumDataCodewords(version, ecl) * 8;
      assert(bb.length <= dataCapacityBits);
      appendBits(0, Math.min(4, dataCapacityBits - bb.length), bb);
      appendBits(0, (8 - bb.length % 8) % 8, bb);
      assert(bb.length % 8 == 0);
      for (let padByte = 236; bb.length < dataCapacityBits; padByte ^= 236 ^ 17)
        appendBits(padByte, 8, bb);
      let dataCodewords = [];
      while (dataCodewords.length * 8 < bb.length)
        dataCodewords.push(0);
      bb.forEach((b, i) => dataCodewords[i >>> 3] |= b << 7 - (i & 7));
      return new _QrCode(version, ecl, dataCodewords, mask);
    }
    getModule(x, y) {
      return 0 <= x && x < this.size && 0 <= y && y < this.size && this.modules[y][x];
    }
    getModules() {
      return this.modules;
    }
    drawFunctionPatterns() {
      for (let i = 0; i < this.size; i++) {
        this.setFunctionModule(6, i, i % 2 == 0);
        this.setFunctionModule(i, 6, i % 2 == 0);
      }
      this.drawFinderPattern(3, 3);
      this.drawFinderPattern(this.size - 4, 3);
      this.drawFinderPattern(3, this.size - 4);
      const alignPatPos = this.getAlignmentPatternPositions();
      const numAlign = alignPatPos.length;
      for (let i = 0; i < numAlign; i++) {
        for (let j = 0; j < numAlign; j++) {
          if (!(i == 0 && j == 0 || i == 0 && j == numAlign - 1 || i == numAlign - 1 && j == 0))
            this.drawAlignmentPattern(alignPatPos[i], alignPatPos[j]);
        }
      }
      this.drawFormatBits(0);
      this.drawVersion();
    }
    drawFormatBits(mask) {
      const data = this.errorCorrectionLevel.formatBits << 3 | mask;
      let rem = data;
      for (let i = 0; i < 10; i++)
        rem = rem << 1 ^ (rem >>> 9) * 1335;
      const bits = (data << 10 | rem) ^ 21522;
      assert(bits >>> 15 == 0);
      for (let i = 0; i <= 5; i++)
        this.setFunctionModule(8, i, getBit(bits, i));
      this.setFunctionModule(8, 7, getBit(bits, 6));
      this.setFunctionModule(8, 8, getBit(bits, 7));
      this.setFunctionModule(7, 8, getBit(bits, 8));
      for (let i = 9; i < 15; i++)
        this.setFunctionModule(14 - i, 8, getBit(bits, i));
      for (let i = 0; i < 8; i++)
        this.setFunctionModule(this.size - 1 - i, 8, getBit(bits, i));
      for (let i = 8; i < 15; i++)
        this.setFunctionModule(8, this.size - 15 + i, getBit(bits, i));
      this.setFunctionModule(8, this.size - 8, true);
    }
    drawVersion() {
      if (this.version < 7)
        return;
      let rem = this.version;
      for (let i = 0; i < 12; i++)
        rem = rem << 1 ^ (rem >>> 11) * 7973;
      const bits = this.version << 12 | rem;
      assert(bits >>> 18 == 0);
      for (let i = 0; i < 18; i++) {
        const color = getBit(bits, i);
        const a = this.size - 11 + i % 3;
        const b = Math.floor(i / 3);
        this.setFunctionModule(a, b, color);
        this.setFunctionModule(b, a, color);
      }
    }
    drawFinderPattern(x, y) {
      for (let dy = -4; dy <= 4; dy++) {
        for (let dx = -4; dx <= 4; dx++) {
          const dist = Math.max(Math.abs(dx), Math.abs(dy));
          const xx = x + dx;
          const yy = y + dy;
          if (0 <= xx && xx < this.size && 0 <= yy && yy < this.size)
            this.setFunctionModule(xx, yy, dist != 2 && dist != 4);
        }
      }
    }
    drawAlignmentPattern(x, y) {
      for (let dy = -2; dy <= 2; dy++) {
        for (let dx = -2; dx <= 2; dx++)
          this.setFunctionModule(x + dx, y + dy, Math.max(Math.abs(dx), Math.abs(dy)) != 1);
      }
    }
    setFunctionModule(x, y, isDark) {
      this.modules[y][x] = isDark;
      this.isFunction[y][x] = true;
    }
    addEccAndInterleave(data) {
      const ver = this.version;
      const ecl = this.errorCorrectionLevel;
      if (data.length != _QrCode.getNumDataCodewords(ver, ecl))
        throw new RangeError("Invalid argument");
      const numBlocks = _QrCode.NUM_ERROR_CORRECTION_BLOCKS[ecl.ordinal][ver];
      const blockEccLen = _QrCode.ECC_CODEWORDS_PER_BLOCK[ecl.ordinal][ver];
      const rawCodewords = Math.floor(_QrCode.getNumRawDataModules(ver) / 8);
      const numShortBlocks = numBlocks - rawCodewords % numBlocks;
      const shortBlockLen = Math.floor(rawCodewords / numBlocks);
      let blocks = [];
      const rsDiv = _QrCode.reedSolomonComputeDivisor(blockEccLen);
      for (let i = 0, k = 0; i < numBlocks; i++) {
        let dat = data.slice(k, k + shortBlockLen - blockEccLen + (i < numShortBlocks ? 0 : 1));
        k += dat.length;
        const ecc = _QrCode.reedSolomonComputeRemainder(dat, rsDiv);
        if (i < numShortBlocks)
          dat.push(0);
        blocks.push(dat.concat(ecc));
      }
      let result = [];
      for (let i = 0; i < blocks[0].length; i++) {
        blocks.forEach((block, j) => {
          if (i != shortBlockLen - blockEccLen || j >= numShortBlocks)
            result.push(block[i]);
        });
      }
      assert(result.length == rawCodewords);
      return result;
    }
    drawCodewords(data) {
      if (data.length != Math.floor(_QrCode.getNumRawDataModules(this.version) / 8))
        throw new RangeError("Invalid argument");
      let i = 0;
      for (let right = this.size - 1; right >= 1; right -= 2) {
        if (right == 6)
          right = 5;
        for (let vert = 0; vert < this.size; vert++) {
          for (let j = 0; j < 2; j++) {
            const x = right - j;
            const upward = (right + 1 & 2) == 0;
            const y = upward ? this.size - 1 - vert : vert;
            if (!this.isFunction[y][x] && i < data.length * 8) {
              this.modules[y][x] = getBit(data[i >>> 3], 7 - (i & 7));
              i++;
            }
          }
        }
      }
      assert(i == data.length * 8);
    }
    applyMask(mask) {
      if (mask < 0 || mask > 7)
        throw new RangeError("Mask value out of range");
      for (let y = 0; y < this.size; y++) {
        for (let x = 0; x < this.size; x++) {
          let invert;
          switch (mask) {
            case 0:
              invert = (x + y) % 2 == 0;
              break;
            case 1:
              invert = y % 2 == 0;
              break;
            case 2:
              invert = x % 3 == 0;
              break;
            case 3:
              invert = (x + y) % 3 == 0;
              break;
            case 4:
              invert = (Math.floor(x / 3) + Math.floor(y / 2)) % 2 == 0;
              break;
            case 5:
              invert = x * y % 2 + x * y % 3 == 0;
              break;
            case 6:
              invert = (x * y % 2 + x * y % 3) % 2 == 0;
              break;
            case 7:
              invert = ((x + y) % 2 + x * y % 3) % 2 == 0;
              break;
            default:
              throw new Error("Unreachable");
          }
          if (!this.isFunction[y][x] && invert)
            this.modules[y][x] = !this.modules[y][x];
        }
      }
    }
    getPenaltyScore() {
      let result = 0;
      for (let y = 0; y < this.size; y++) {
        let runColor = false;
        let runX = 0;
        let runHistory = [0, 0, 0, 0, 0, 0, 0];
        for (let x = 0; x < this.size; x++) {
          if (this.modules[y][x] == runColor) {
            runX++;
            if (runX == 5)
              result += _QrCode.PENALTY_N1;
            else if (runX > 5)
              result++;
          } else {
            this.finderPenaltyAddHistory(runX, runHistory);
            if (!runColor)
              result += this.finderPenaltyCountPatterns(runHistory) * _QrCode.PENALTY_N3;
            runColor = this.modules[y][x];
            runX = 1;
          }
        }
        result += this.finderPenaltyTerminateAndCount(runColor, runX, runHistory) * _QrCode.PENALTY_N3;
      }
      for (let x = 0; x < this.size; x++) {
        let runColor = false;
        let runY = 0;
        let runHistory = [0, 0, 0, 0, 0, 0, 0];
        for (let y = 0; y < this.size; y++) {
          if (this.modules[y][x] == runColor) {
            runY++;
            if (runY == 5)
              result += _QrCode.PENALTY_N1;
            else if (runY > 5)
              result++;
          } else {
            this.finderPenaltyAddHistory(runY, runHistory);
            if (!runColor)
              result += this.finderPenaltyCountPatterns(runHistory) * _QrCode.PENALTY_N3;
            runColor = this.modules[y][x];
            runY = 1;
          }
        }
        result += this.finderPenaltyTerminateAndCount(runColor, runY, runHistory) * _QrCode.PENALTY_N3;
      }
      for (let y = 0; y < this.size - 1; y++) {
        for (let x = 0; x < this.size - 1; x++) {
          const color = this.modules[y][x];
          if (color == this.modules[y][x + 1] && color == this.modules[y + 1][x] && color == this.modules[y + 1][x + 1])
            result += _QrCode.PENALTY_N2;
        }
      }
      let dark = 0;
      for (const row of this.modules)
        dark = row.reduce((sum, color) => sum + (color ? 1 : 0), dark);
      const total = this.size * this.size;
      const k = Math.ceil(Math.abs(dark * 20 - total * 10) / total) - 1;
      assert(0 <= k && k <= 9);
      result += k * _QrCode.PENALTY_N4;
      assert(0 <= result && result <= 2568888);
      return result;
    }
    getAlignmentPatternPositions() {
      if (this.version == 1)
        return [];
      else {
        const numAlign = Math.floor(this.version / 7) + 2;
        const step = this.version == 32 ? 26 : Math.ceil((this.version * 4 + 4) / (numAlign * 2 - 2)) * 2;
        let result = [6];
        for (let pos = this.size - 7; result.length < numAlign; pos -= step)
          result.splice(1, 0, pos);
        return result;
      }
    }
    static getNumRawDataModules(ver) {
      if (ver < _QrCode.MIN_VERSION || ver > _QrCode.MAX_VERSION)
        throw new RangeError("Version number out of range");
      let result = (16 * ver + 128) * ver + 64;
      if (ver >= 2) {
        const numAlign = Math.floor(ver / 7) + 2;
        result -= (25 * numAlign - 10) * numAlign - 55;
        if (ver >= 7)
          result -= 36;
      }
      assert(208 <= result && result <= 29648);
      return result;
    }
    static getNumDataCodewords(ver, ecl) {
      return Math.floor(_QrCode.getNumRawDataModules(ver) / 8) - _QrCode.ECC_CODEWORDS_PER_BLOCK[ecl.ordinal][ver] * _QrCode.NUM_ERROR_CORRECTION_BLOCKS[ecl.ordinal][ver];
    }
    static reedSolomonComputeDivisor(degree) {
      if (degree < 1 || degree > 255)
        throw new RangeError("Degree out of range");
      let result = [];
      for (let i = 0; i < degree - 1; i++)
        result.push(0);
      result.push(1);
      let root = 1;
      for (let i = 0; i < degree; i++) {
        for (let j = 0; j < result.length; j++) {
          result[j] = _QrCode.reedSolomonMultiply(result[j], root);
          if (j + 1 < result.length)
            result[j] ^= result[j + 1];
        }
        root = _QrCode.reedSolomonMultiply(root, 2);
      }
      return result;
    }
    static reedSolomonComputeRemainder(data, divisor) {
      let result = divisor.map((_) => 0);
      for (const b of data) {
        const factor = b ^ result.shift();
        result.push(0);
        divisor.forEach((coef, i) => result[i] ^= _QrCode.reedSolomonMultiply(coef, factor));
      }
      return result;
    }
    static reedSolomonMultiply(x, y) {
      if (x >>> 8 != 0 || y >>> 8 != 0)
        throw new RangeError("Byte out of range");
      let z = 0;
      for (let i = 7; i >= 0; i--) {
        z = z << 1 ^ (z >>> 7) * 285;
        z ^= (y >>> i & 1) * x;
      }
      assert(z >>> 8 == 0);
      return z;
    }
    finderPenaltyCountPatterns(runHistory) {
      const n = runHistory[1];
      assert(n <= this.size * 3);
      const core = n > 0 && runHistory[2] == n && runHistory[3] == n * 3 && runHistory[4] == n && runHistory[5] == n;
      return (core && runHistory[0] >= n * 4 && runHistory[6] >= n ? 1 : 0) + (core && runHistory[6] >= n * 4 && runHistory[0] >= n ? 1 : 0);
    }
    finderPenaltyTerminateAndCount(currentRunColor, currentRunLength, runHistory) {
      if (currentRunColor) {
        this.finderPenaltyAddHistory(currentRunLength, runHistory);
        currentRunLength = 0;
      }
      currentRunLength += this.size;
      this.finderPenaltyAddHistory(currentRunLength, runHistory);
      return this.finderPenaltyCountPatterns(runHistory);
    }
    finderPenaltyAddHistory(currentRunLength, runHistory) {
      if (runHistory[0] == 0)
        currentRunLength += this.size;
      runHistory.pop();
      runHistory.unshift(currentRunLength);
    }
  };
  let QrCode = _QrCode;
  QrCode.MIN_VERSION = 1;
  QrCode.MAX_VERSION = 40;
  QrCode.PENALTY_N1 = 3;
  QrCode.PENALTY_N2 = 3;
  QrCode.PENALTY_N3 = 40;
  QrCode.PENALTY_N4 = 10;
  QrCode.ECC_CODEWORDS_PER_BLOCK = [
    [-1, 7, 10, 15, 20, 26, 18, 20, 24, 30, 18, 20, 24, 26, 30, 22, 24, 28, 30, 28, 28, 28, 28, 30, 30, 26, 28, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30],
    [-1, 10, 16, 26, 18, 24, 16, 18, 22, 22, 26, 30, 22, 22, 24, 24, 28, 28, 26, 26, 26, 26, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28],
    [-1, 13, 22, 18, 26, 18, 24, 18, 22, 20, 24, 28, 26, 24, 20, 30, 24, 28, 28, 26, 30, 28, 30, 30, 30, 30, 28, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30],
    [-1, 17, 28, 22, 16, 22, 28, 26, 26, 24, 28, 24, 28, 22, 24, 24, 30, 28, 28, 26, 28, 30, 24, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30]
  ];
  QrCode.NUM_ERROR_CORRECTION_BLOCKS = [
    [-1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 4, 4, 4, 4, 4, 6, 6, 6, 6, 7, 8, 8, 9, 9, 10, 12, 12, 12, 13, 14, 15, 16, 17, 18, 19, 19, 20, 21, 22, 24, 25],
    [-1, 1, 1, 1, 2, 2, 4, 4, 4, 5, 5, 5, 8, 9, 9, 10, 10, 11, 13, 14, 16, 17, 17, 18, 20, 21, 23, 25, 26, 28, 29, 31, 33, 35, 37, 38, 40, 43, 45, 47, 49],
    [-1, 1, 1, 2, 2, 4, 4, 6, 6, 8, 8, 8, 10, 12, 16, 12, 17, 16, 18, 21, 20, 23, 23, 25, 27, 29, 34, 34, 35, 38, 40, 43, 45, 48, 51, 53, 56, 59, 62, 65, 68],
    [-1, 1, 1, 2, 4, 4, 4, 5, 6, 8, 8, 11, 11, 16, 16, 18, 16, 19, 21, 25, 25, 25, 34, 30, 32, 35, 37, 40, 42, 45, 48, 51, 54, 57, 60, 63, 66, 70, 74, 77, 81]
  ];
  qrcodegen2.QrCode = QrCode;
  function appendBits(val, len, bb) {
    if (len < 0 || len > 31 || val >>> len != 0)
      throw new RangeError("Value out of range");
    for (let i = len - 1; i >= 0; i--)
      bb.push(val >>> i & 1);
  }
  function getBit(x, i) {
    return (x >>> i & 1) != 0;
  }
  function assert(cond) {
    if (!cond)
      throw new Error("Assertion error");
  }
  const _QrSegment = class {
    constructor(mode, numChars, bitData) {
      this.mode = mode;
      this.numChars = numChars;
      this.bitData = bitData;
      if (numChars < 0)
        throw new RangeError("Invalid argument");
      this.bitData = bitData.slice();
    }
    static makeBytes(data) {
      let bb = [];
      for (const b of data)
        appendBits(b, 8, bb);
      return new _QrSegment(_QrSegment.Mode.BYTE, data.length, bb);
    }
    static makeNumeric(digits) {
      if (!_QrSegment.isNumeric(digits))
        throw new RangeError("String contains non-numeric characters");
      let bb = [];
      for (let i = 0; i < digits.length; ) {
        const n = Math.min(digits.length - i, 3);
        appendBits(parseInt(digits.substr(i, n), 10), n * 3 + 1, bb);
        i += n;
      }
      return new _QrSegment(_QrSegment.Mode.NUMERIC, digits.length, bb);
    }
    static makeAlphanumeric(text) {
      if (!_QrSegment.isAlphanumeric(text))
        throw new RangeError("String contains unencodable characters in alphanumeric mode");
      let bb = [];
      let i;
      for (i = 0; i + 2 <= text.length; i += 2) {
        let temp = _QrSegment.ALPHANUMERIC_CHARSET.indexOf(text.charAt(i)) * 45;
        temp += _QrSegment.ALPHANUMERIC_CHARSET.indexOf(text.charAt(i + 1));
        appendBits(temp, 11, bb);
      }
      if (i < text.length)
        appendBits(_QrSegment.ALPHANUMERIC_CHARSET.indexOf(text.charAt(i)), 6, bb);
      return new _QrSegment(_QrSegment.Mode.ALPHANUMERIC, text.length, bb);
    }
    static makeSegments(text) {
      if (text == "")
        return [];
      else if (_QrSegment.isNumeric(text))
        return [_QrSegment.makeNumeric(text)];
      else if (_QrSegment.isAlphanumeric(text))
        return [_QrSegment.makeAlphanumeric(text)];
      else
        return [_QrSegment.makeBytes(_QrSegment.toUtf8ByteArray(text))];
    }
    static makeEci(assignVal) {
      let bb = [];
      if (assignVal < 0)
        throw new RangeError("ECI assignment value out of range");
      else if (assignVal < 1 << 7)
        appendBits(assignVal, 8, bb);
      else if (assignVal < 1 << 14) {
        appendBits(2, 2, bb);
        appendBits(assignVal, 14, bb);
      } else if (assignVal < 1e6) {
        appendBits(6, 3, bb);
        appendBits(assignVal, 21, bb);
      } else
        throw new RangeError("ECI assignment value out of range");
      return new _QrSegment(_QrSegment.Mode.ECI, 0, bb);
    }
    static isNumeric(text) {
      return _QrSegment.NUMERIC_REGEX.test(text);
    }
    static isAlphanumeric(text) {
      return _QrSegment.ALPHANUMERIC_REGEX.test(text);
    }
    getData() {
      return this.bitData.slice();
    }
    static getTotalBits(segs, version) {
      let result = 0;
      for (const seg of segs) {
        const ccbits = seg.mode.numCharCountBits(version);
        if (seg.numChars >= 1 << ccbits)
          return Infinity;
        result += 4 + ccbits + seg.bitData.length;
      }
      return result;
    }
    static toUtf8ByteArray(str) {
      str = encodeURI(str);
      let result = [];
      for (let i = 0; i < str.length; i++) {
        if (str.charAt(i) != "%")
          result.push(str.charCodeAt(i));
        else {
          result.push(parseInt(str.substr(i + 1, 2), 16));
          i += 2;
        }
      }
      return result;
    }
  };
  let QrSegment = _QrSegment;
  QrSegment.NUMERIC_REGEX = /^[0-9]*$/;
  QrSegment.ALPHANUMERIC_REGEX = /^[A-Z0-9 $%*+.\/:-]*$/;
  QrSegment.ALPHANUMERIC_CHARSET = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ $%*+-./:";
  qrcodegen2.QrSegment = QrSegment;
})(qrcodegen || (qrcodegen = {}));
((qrcodegen2) => {
  let QrCode;
  ((QrCode2) => {
    const _Ecc = class {
      constructor(ordinal, formatBits) {
        this.ordinal = ordinal;
        this.formatBits = formatBits;
      }
    };
    let Ecc = _Ecc;
    Ecc.LOW = new _Ecc(0, 1);
    Ecc.MEDIUM = new _Ecc(1, 0);
    Ecc.QUARTILE = new _Ecc(2, 3);
    Ecc.HIGH = new _Ecc(3, 2);
    QrCode2.Ecc = Ecc;
  })(QrCode = qrcodegen2.QrCode || (qrcodegen2.QrCode = {}));
})(qrcodegen || (qrcodegen = {}));
((qrcodegen2) => {
  let QrSegment;
  ((QrSegment2) => {
    const _Mode = class {
      constructor(modeBits, numBitsCharCount) {
        this.modeBits = modeBits;
        this.numBitsCharCount = numBitsCharCount;
      }
      numCharCountBits(ver) {
        return this.numBitsCharCount[Math.floor((ver + 7) / 17)];
      }
    };
    let Mode = _Mode;
    Mode.NUMERIC = new _Mode(1, [10, 12, 14]);
    Mode.ALPHANUMERIC = new _Mode(2, [9, 11, 13]);
    Mode.BYTE = new _Mode(4, [8, 16, 16]);
    Mode.KANJI = new _Mode(8, [8, 10, 12]);
    Mode.ECI = new _Mode(7, [0, 0, 0]);
    QrSegment2.Mode = Mode;
  })(QrSegment = qrcodegen2.QrSegment || (qrcodegen2.QrSegment = {}));
})(qrcodegen || (qrcodegen = {}));
var qrcodegen_default = qrcodegen;

// src/index.tsx
/**
 * @license qrcode.react
 * Copyright (c) Paul O'Shannessy
 * SPDX-License-Identifier: ISC
 */
var ERROR_LEVEL_MAP = {
  L: qrcodegen_default.QrCode.Ecc.LOW,
  M: qrcodegen_default.QrCode.Ecc.MEDIUM,
  Q: qrcodegen_default.QrCode.Ecc.QUARTILE,
  H: qrcodegen_default.QrCode.Ecc.HIGH
};
var DEFAULT_SIZE = 128;
var DEFAULT_LEVEL = "L";
var DEFAULT_BGCOLOR = "#FFFFFF";
var DEFAULT_FGCOLOR = "#000000";
var DEFAULT_INCLUDEMARGIN = false;
var MARGIN_SIZE = 4;
var DEFAULT_IMG_SCALE = 0.1;
function generatePath(modules, margin = 0) {
  const ops = [];
  modules.forEach(function(row, y) {
    let start = null;
    row.forEach(function(cell, x) {
      if (!cell && start !== null) {
        ops.push(`M${start + margin} ${y + margin}h${x - start}v1H${start + margin}z`);
        start = null;
        return;
      }
      if (x === row.length - 1) {
        if (!cell) {
          return;
        }
        if (start === null) {
          ops.push(`M${x + margin},${y + margin} h1v1H${x + margin}z`);
        } else {
          ops.push(`M${start + margin},${y + margin} h${x + 1 - start}v1H${start + margin}z`);
        }
        return;
      }
      if (cell && start === null) {
        start = x;
      }
    });
  });
  return ops.join("");
}
function excavateModules(modules, excavation) {
  return modules.slice().map((row, y) => {
    if (y < excavation.y || y >= excavation.y + excavation.h) {
      return row;
    }
    return row.map((cell, x) => {
      if (x < excavation.x || x >= excavation.x + excavation.w) {
        return cell;
      }
      return false;
    });
  });
}
function getImageSettings(cells, size, includeMargin, imageSettings) {
  if (imageSettings == null) {
    return null;
  }
  const margin = includeMargin ? MARGIN_SIZE : 0;
  const numCells = cells.length + margin * 2;
  const defaultSize = Math.floor(size * DEFAULT_IMG_SCALE);
  const scale = numCells / size;
  const w = (imageSettings.width || defaultSize) * scale;
  const h = (imageSettings.height || defaultSize) * scale;
  const x = imageSettings.x == null ? cells.length / 2 - w / 2 : imageSettings.x * scale;
  const y = imageSettings.y == null ? cells.length / 2 - h / 2 : imageSettings.y * scale;
  let excavation = null;
  if (imageSettings.excavate) {
    let floorX = Math.floor(x);
    let floorY = Math.floor(y);
    let ceilW = Math.ceil(w + x - floorX);
    let ceilH = Math.ceil(h + y - floorY);
    excavation = { x: floorX, y: floorY, w: ceilW, h: ceilH };
  }
  return { x, y, h, w, excavation };
}
var SUPPORTS_PATH2D = function() {
  try {
    new Path2D().addPath(new Path2D());
  } catch (e) {
    return false;
  }
  return true;
}();
function QRCodeCanvas(props) {
  const _a = props, {
    value,
    size = DEFAULT_SIZE,
    level = DEFAULT_LEVEL,
    bgColor = DEFAULT_BGCOLOR,
    fgColor = DEFAULT_FGCOLOR,
    includeMargin = DEFAULT_INCLUDEMARGIN,
    style,
    imageSettings
  } = _a, otherProps = __objRest(_a, [
    "value",
    "size",
    "level",
    "bgColor",
    "fgColor",
    "includeMargin",
    "style",
    "imageSettings"
  ]);
  const imgSrc = imageSettings == null ? void 0 : imageSettings.src;
  const _canvas = useRef(null);
  const _image = useRef(null);
  const [isImgLoaded, setIsImageLoaded] = useState(false);
  useEffect(() => {
    if (_canvas.current != null) {
      const canvas = _canvas.current;
      const ctx = canvas.getContext("2d");
      if (!ctx) {
        return;
      }
      let cells = qrcodegen_default.QrCode.encodeText(value, ERROR_LEVEL_MAP[level]).getModules();
      const margin = includeMargin ? MARGIN_SIZE : 0;
      const numCells = cells.length + margin * 2;
      const calculatedImageSettings = getImageSettings(cells, size, includeMargin, imageSettings);
      const image = _image.current;
      const haveImageToRender = calculatedImageSettings != null && image !== null && image.complete && image.naturalHeight !== 0 && image.naturalWidth !== 0;
      if (haveImageToRender) {
        if (calculatedImageSettings.excavation != null) {
          cells = excavateModules(cells, calculatedImageSettings.excavation);
        }
      }
      const pixelRatio = window.devicePixelRatio || 1;
      canvas.height = canvas.width = size * pixelRatio;
      const scale = size / numCells * pixelRatio;
      ctx.scale(scale, scale);
      ctx.fillStyle = bgColor;
      ctx.fillRect(0, 0, numCells, numCells);
      ctx.fillStyle = fgColor;
      if (SUPPORTS_PATH2D) {
        ctx.fill(new Path2D(generatePath(cells, margin)));
      } else {
        cells.forEach(function(row, rdx) {
          row.forEach(function(cell, cdx) {
            if (cell) {
              ctx.fillRect(cdx + margin, rdx + margin, 1, 1);
            }
          });
        });
      }
      if (haveImageToRender) {
        ctx.drawImage(image, calculatedImageSettings.x + margin, calculatedImageSettings.y + margin, calculatedImageSettings.w, calculatedImageSettings.h);
      }
    }
  });
  useEffect(() => {
    setIsImageLoaded(false);
  }, [imgSrc]);
  const canvasStyle = __spreadValues({ height: size, width: size }, style);
  let img = null;
  if (imgSrc != null) {
    img = /* @__PURE__ */ React__default.createElement("img", {
      src: imgSrc,
      key: imgSrc,
      style: { display: "none" },
      onLoad: () => {
        setIsImageLoaded(true);
      },
      ref: _image
    });
  }
  return /* @__PURE__ */ React__default.createElement(React__default.Fragment, null, /* @__PURE__ */ React__default.createElement("canvas", __spreadValues({
    style: canvasStyle,
    height: size,
    width: size,
    ref: _canvas
  }, otherProps)), img);
}
function QRCodeSVG(props) {
  const _a = props, {
    value,
    size = DEFAULT_SIZE,
    level = DEFAULT_LEVEL,
    bgColor = DEFAULT_BGCOLOR,
    fgColor = DEFAULT_FGCOLOR,
    includeMargin = DEFAULT_INCLUDEMARGIN,
    imageSettings
  } = _a, otherProps = __objRest(_a, [
    "value",
    "size",
    "level",
    "bgColor",
    "fgColor",
    "includeMargin",
    "imageSettings"
  ]);
  let cells = qrcodegen_default.QrCode.encodeText(value, ERROR_LEVEL_MAP[level]).getModules();
  const margin = includeMargin ? MARGIN_SIZE : 0;
  const numCells = cells.length + margin * 2;
  const calculatedImageSettings = getImageSettings(cells, size, includeMargin, imageSettings);
  let image = null;
  if (imageSettings != null && calculatedImageSettings != null) {
    if (calculatedImageSettings.excavation != null) {
      cells = excavateModules(cells, calculatedImageSettings.excavation);
    }
    image = /* @__PURE__ */ React__default.createElement("image", {
      xlinkHref: imageSettings.src,
      height: calculatedImageSettings.h,
      width: calculatedImageSettings.w,
      x: calculatedImageSettings.x + margin,
      y: calculatedImageSettings.y + margin,
      preserveAspectRatio: "none"
    });
  }
  const fgPath = generatePath(cells, margin);
  return /* @__PURE__ */ React__default.createElement("svg", __spreadValues({
    height: size,
    width: size,
    viewBox: `0 0 ${numCells} ${numCells}`
  }, otherProps), /* @__PURE__ */ React__default.createElement("path", {
    fill: bgColor,
    d: `M0,0 h${numCells}v${numCells}H0z`,
    shapeRendering: "crispEdges"
  }), /* @__PURE__ */ React__default.createElement("path", {
    fill: fgColor,
    d: fgPath,
    shapeRendering: "crispEdges"
  }), image);
}
var QRCode = (props) => {
  const _a = props, { renderAs } = _a, otherProps = __objRest(_a, ["renderAs"]);
  if (renderAs === "svg") {
    return /* @__PURE__ */ React__default.createElement(QRCodeSVG, __spreadValues({}, otherProps));
  }
  return /* @__PURE__ */ React__default.createElement(QRCodeCanvas, __spreadValues({}, otherProps));
};

var getElementTop = function getElementTop(el) {
  var actualTop = el.offsetTop;
  var current = el.offsetParent;
  while (current !== null) {
    actualTop += current.offsetTop;
    current = current.offsetParent;
  }
  return actualTop;
};

var AnchorCard = (function (_ref) {
  var tabs = _ref.tabs,
    getContainer = _ref.getContainer,
    defaultActivityKey = _ref.defaultActivityKey,
    _ref$fixHeight = _ref.fixHeight,
    fixHeight = _ref$fixHeight === void 0 ? 24 : _ref$fixHeight,
    _ref$fixedTop = _ref.fixedTop,
    fixedTop = _ref$fixedTop === void 0 ? 0 : _ref$fixedTop,
    contentClass = _ref.contentClass,
    _ref$children = _ref.children,
    children = _ref$children === void 0 ? null : _ref$children;
  var ticking = false;
  var _useState = useState(defaultActivityKey),
    activeKey = _useState[0],
    setActiveKey = _useState[1];
  useEffect(function () {
    window.addEventListener('scroll', handleScroll, true);
    return function () {
      window.removeEventListener('scroll', handleScroll, true);
    };
  }, []);
  var handleScroll = function handleScroll(event) {
    if (!ticking) {
      window.requestAnimationFrame(function () {
        var elementScrollTop = event.srcElement.scrollTop || document.documentElement.scrollTop || document.body.scrollTop;
        if (!elementScrollTop) {
          return;
        }
        var linkTabs = getLinkTabs();
        linkTabs.forEach(function (item) {
          if (Number(elementScrollTop) + Number(fixHeight) >= item.offsetTop) {
            setActiveKey(item.key);
          }
        });
        ticking = false;
      });
    }
  };
  var getLinkTabs = function getLinkTabs() {
    var links = [];
    tabs.forEach(function (item) {
      var el = document.getElementById(item.key);
      if (el) {
        links.push({
          key: item.key,
          offsetTop: getElementTop(el)
        });
      }
    });
    return links;
  };
  var anchorClick = function anchorClick(key) {
    var el = document.querySelector("#" + key);
    if (el) {
      setActiveKey(key);
      var dom = (getContainer === null || getContainer === void 0 ? void 0 : getContainer()) || document.documentElement;
      dom.scrollTo({
        top: getElementTop(el) - fixHeight,
        behavior: 'smooth'
      });
    }
  };
  var anchorHeight = 32 + tabs.length * 40;
  return React__default.createElement(Row, {
    className: "m-content",
    wrap: false
  }, React__default.createElement(Col, {
    flex: "160px",
    className: "m-left",
    style: {
      top: fixedTop,
      height: anchorHeight + "px"
    }
  }, tabs.map(function (item) {
    return React__default.createElement("div", {
      className: item.key === activeKey ? 'm-left-nav active' : 'm-left-nav',
      key: item.key,
      title: typeof item.tab === 'string' && item.tab,
      onClick: anchorClick.bind(null, item.key)
    }, item.tab);
  })), React__default.createElement(Col, {
    className: "m-right",
    id: "content"
  }, children || tabs.map(function (item) {
    return React__default.createElement("div", {
      className: contentClass,
      id: item.key
    }, item.content);
  })));
});

function _extends() {
  _extends = Object.assign ? Object.assign.bind() : function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  return _extends.apply(this, arguments);
}
function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;
  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }
  return target;
}

// A type of promise-like that resolves synchronously and supports only one observer
const _Pact = /*#__PURE__*/(function() {
	function _Pact() {}
	_Pact.prototype.then = function(onFulfilled, onRejected) {
		const result = new _Pact();
		const state = this.s;
		if (state) {
			const callback = state & 1 ? onFulfilled : onRejected;
			if (callback) {
				try {
					_settle(result, 1, callback(this.v));
				} catch (e) {
					_settle(result, 2, e);
				}
				return result;
			} else {
				return this;
			}
		}
		this.o = function(_this) {
			try {
				const value = _this.v;
				if (_this.s & 1) {
					_settle(result, 1, onFulfilled ? onFulfilled(value) : value);
				} else if (onRejected) {
					_settle(result, 1, onRejected(value));
				} else {
					_settle(result, 2, value);
				}
			} catch (e) {
				_settle(result, 2, e);
			}
		};
		return result;
	};
	return _Pact;
})();

// Settles a pact synchronously
function _settle(pact, state, value) {
	if (!pact.s) {
		if (value instanceof _Pact) {
			if (value.s) {
				if (state & 1) {
					state = value.s;
				}
				value = value.v;
			} else {
				value.o = _settle.bind(null, pact, state);
				return;
			}
		}
		if (value && value.then) {
			value.then(_settle.bind(null, pact, state), _settle.bind(null, pact, 2));
			return;
		}
		pact.s = state;
		pact.v = value;
		const observer = pact.o;
		if (observer) {
			observer(pact);
		}
	}
}

function _isSettledPact(thenable) {
	return thenable instanceof _Pact && thenable.s & 1;
}

// Asynchronously iterate through an object that has a length property, passing the index as the first argument to the callback (even as the length property changes)
function _forTo(array, body, check) {
	var i = -1, pact, reject;
	function _cycle(result) {
		try {
			while (++i < array.length && (!check || !check())) {
				result = body(i);
				if (result && result.then) {
					if (_isSettledPact(result)) {
						result = result.v;
					} else {
						result.then(_cycle, reject || (reject = _settle.bind(null, pact = new _Pact(), 2)));
						return;
					}
				}
			}
			if (pact) {
				_settle(pact, 1, result);
			} else {
				pact = result;
			}
		} catch (e) {
			_settle(pact || (pact = new _Pact()), 2, e);
		}
	}
	_cycle();
	return pact;
}

const _iteratorSymbol = /*#__PURE__*/ typeof Symbol !== "undefined" ? (Symbol.iterator || (Symbol.iterator = Symbol("Symbol.iterator"))) : "@@iterator";

const _asyncIteratorSymbol = /*#__PURE__*/ typeof Symbol !== "undefined" ? (Symbol.asyncIterator || (Symbol.asyncIterator = Symbol("Symbol.asyncIterator"))) : "@@asyncIterator";

// Asynchronously call a function and send errors to recovery continuation
function _catch(body, recover) {
	try {
		var result = body();
	} catch(e) {
		return recover(e);
	}
	if (result && result.then) {
		return result.then(void 0, recover);
	}
	return result;
}

// Asynchronously await a promise and pass the result to a finally continuation
function _finallyRethrows(body, finalizer) {
	try {
		var result = body();
	} catch (e) {
		return finalizer(true, e);
	}
	if (result && result.then) {
		return result.then(finalizer.bind(null, false), finalizer.bind(null, true));
	}
	return finalizer(false, result);
}

var message;
var notification;
var modal;
var staticThemeMethodHooks = (function () {
  var _staticFunction$messa;
  var staticFunction = App.useApp();
  message = (staticFunction === null || staticFunction === void 0 ? void 0 : (_staticFunction$messa = staticFunction.message) === null || _staticFunction$messa === void 0 ? void 0 : _staticFunction$messa.destroy) ? staticFunction.message : message$1;
  modal = staticFunction.modal.confirm ? staticFunction.modal : Modal;
  notification = staticFunction.notification.open ? staticFunction.notification : notification$1;
  return {
    message: message,
    notification: notification,
    modal: modal
  };
});

var isEmpty = function isEmpty(param) {
  if ([undefined, null, ''].includes(param)) {
    return true;
  }
  if (Array.isArray(param)) {
    return param.length === 0;
  }
  if (typeof param === 'string') {
    return param.trim() === '';
  }
  if (typeof param === 'object') {
    return Object.keys(param).length === 0;
  }
  return false;
};
var uuid = function uuid(size) {
  return Math.random().toString().substr(2, size);
};
var NOTICESELF = Symbol('');
var EventEmit = function EventEmit() {
  var _this = this;
  this.listeners = [];
  this.publishMergeField = function (fieldName, newField, customizer) {
    _this.listeners.filter(function (listener) {
      return fieldName === listener.fieldName;
    }).forEach(function (listener) {
      return listener.fn({}, newField, customizer);
    });
  };
  this.publishFields = function (fieldNames) {
    if (fieldNames === void 0) {
      fieldNames = [];
    }
    _this.listeners.filter(function (listener) {
      return fieldNames.includes(listener.fieldName);
    }).forEach(function (listener) {
      return listener.fn({
        name: NOTICESELF
      });
    });
  };
  this.publish = function (field) {
    if (!field) return;
    _this.listeners.forEach(function (listener) {
      return listener.fn(field);
    });
  };
  this.subscribe = function (fieldName, fn) {
    _this.listeners.push({
      fieldName: fieldName,
      fn: fn
    });
    return function () {
      _this.listeners = _this.listeners.filter(function (listener) {
        return listener.fn !== fn;
      });
    };
  };
};
var AsyncOptionsCache = {};
var _field_ = {};
var queryFieldByName = function queryFieldByName(fields, fieldName) {
  for (var i = 0; i < fields.length; i++) {
    var field = fields[i];
    if (field.name === fieldName) {
      _field_ = field;
      break;
    } else if (field.type === 'FieldSet' && Array.isArray(field.props.children)) {
      queryFieldByName(field.props.children, fieldName);
    }
  }
  return _field_;
};
var getUrlParams = function getUrlParams(names) {
  var uri = new URL(location.href.replace('#', ''));
  var res = {};
  if (!names) {
    uri.searchParams.forEach(function (value, key) {
      res[key] = value;
    });
  } else {
    names.forEach(function (i) {
      res[i] = uri.searchParams.get(i);
    });
  }
  return res;
};
var getType = function getType(obj) {
  var type = Object.prototype.toString.call(obj).slice(8, -1);
  return type.toLocaleLowerCase();
};
var isObject = function isObject(obj) {
  return getType(obj) === 'object';
};
var cloneDeep = function cloneDeep(source) {
  return cloneDeepWith(source, function (target) {
    if (React__default.isValidElement(target)) {
      return target;
    }
  });
};
var getGlobalConfigByName = function getGlobalConfigByName(key, props) {
  var _window$slickFormCo;
  var config = (_window$slickFormCo = window['slick-form-config']) === null || _window$slickFormCo === void 0 ? void 0 : _window$slickFormCo[key];
  var defaultProps = config ? typeof config === 'function' ? config(props) : config : {};
  return cloneDeep(defaultProps);
};
var range = function range(start, end) {
  var result = [];
  for (var i = start; i < end; i++) {
    result.push(i);
  }
  return result;
};
var disabledDate = function disabledDate(current, nowTime) {
  if (nowTime === void 0) {
    nowTime = new Date();
  }
  if (current) {
    var nowDay = dayjs(nowTime).format('YYYY-MM-DD') + " 00:00:00";
    var currentday = dayjs(current).format('YYYY-MM-DD') + " 00:00:00";
    return dayjs(currentday).valueOf() < dayjs(nowDay).valueOf();
  }
};
var disabledTime = function disabledTime(current, nowTime) {
  if (nowTime === void 0) {
    nowTime = new Date();
  }
  var nowDay = dayjs(nowTime).format('YYYY-MM-DD') + " 00:00:00";
  var currentDay = dayjs(current).format('YYYY-MM-DD') + " 00:00:00";
  if (current && nowDay.valueOf() === currentDay.valueOf()) {
    var hour = +dayjs(nowTime).hour();
    var minute = +dayjs(nowTime).minute();
    var finalHour = hour;
    var finalMinute = minute;
    if (current.hour() > hour) {
      finalMinute = 0;
    } else if (current.minute() >= 59) {
      finalHour = hour + 1;
      finalMinute = 0;
    } else {
      finalMinute = minute + 1;
    }
    return {
      disabledHours: function disabledHours() {
        return range(0, finalHour);
      },
      disabledMinutes: function disabledMinutes() {
        return range(0, finalMinute);
      }
    };
  }
  return {
    disabledHours: function disabledHours() {
      return [];
    },
    disabledMinutes: function disabledMinutes() {
      return [];
    }
  };
};
var optionsValueUnique = function optionsValueUnique(options, key) {
  if (options === void 0) {
    options = [];
  }
  var container = {};
  return options.filter(function (o) {
    return container.hasOwnProperty(o[key]) ? false : container[o[key]] = true;
  });
};
var deleteEmptyString = function deleteEmptyString(object) {
  var result = {};
  if (!object) return {};
  Object.keys(object).forEach(function (key) {
    if (object[key] !== '') {
      result[key] = object[key];
    }
  });
  return result;
};

var _excluded = ["containId", "tag"],
  _excluded2 = ["containId", "tag"];
var _getGlobalConfigByNam = getGlobalConfigByName('themeConfig', {}),
  token = _getGlobalConfigByNam.token;
var $ = document.querySelector.bind(document);
var layerClass = "layer-" + uuid(6);
var _close = function close(containId) {
  window.removeEventListener('popstate', callback);
  setTimeout(function () {
    var _$;
    (_$ = $("#" + containId)) === null || _$ === void 0 ? void 0 : _$.remove();
  }, 500);
};
var callback = function callback() {
  return document.querySelectorAll("." + layerClass).forEach(function (dom) {
    dom === null || dom === void 0 ? void 0 : dom.remove();
  });
};
var ModalFormWrapper = function ModalFormWrapper(_ref) {
  var containId = _ref.containId,
    tag = _ref.tag,
    props = _objectWithoutPropertiesLoose(_ref, _excluded);
  var _useState = useState(false),
    visible = _useState[0],
    setVisible = _useState[1];
  useEffect(function () {
    window.addEventListener('popstate', callback);
    setVisible(true);
  }, []);
  return React__default.createElement(ModalForm, Object.assign({}, props, {
    open: visible,
    onClose: function onClose() {
      var _props$onClose;
      (_props$onClose = props.onClose) === null || _props$onClose === void 0 ? void 0 : _props$onClose.call(props);
      setVisible(false);
      _close(containId);
    },
    modalProps: _extends({}, props.modalProps || {}, {
      getContainer: function getContainer() {
        return tag;
      }
    })
  }));
};
var DrawerFormWrapper = function DrawerFormWrapper(_ref2) {
  var containId = _ref2.containId,
    tag = _ref2.tag,
    props = _objectWithoutPropertiesLoose(_ref2, _excluded2);
  var _useState2 = useState(false),
    visible = _useState2[0],
    setVisible = _useState2[1];
  useEffect(function () {
    window.addEventListener('popstate', callback);
    setVisible(true);
  }, []);
  return React__default.createElement(DrawerForm, Object.assign({}, props, {
    open: visible,
    onClose: function onClose() {
      var _props$onClose2;
      (_props$onClose2 = props.onClose) === null || _props$onClose2 === void 0 ? void 0 : _props$onClose2.call(props);
      setVisible(false);
      _close(containId);
    },
    drawerProps: _extends({}, props.drawerProps || {}, {
      getContainer: function getContainer() {
        return tag;
      }
    })
  }));
};
var CreateModalForm = function CreateModalForm(props) {
  var _props$getPopupContai;
  var tag = document.createElement('div');
  tag.setAttribute('id', props.containId);
  tag.setAttribute('class', layerClass);
  var target = ((_props$getPopupContai = props.getPopupContainer) === null || _props$getPopupContai === void 0 ? void 0 : _props$getPopupContai.call(props)) || $('body');
  target.appendChild(tag);
  ReactDOM.render(React__default.createElement(ConfigProvider, {
    theme: {
      token: token
    }
  }, React__default.createElement(ModalFormWrapper, Object.assign({}, props, {
    tag: tag
  }))), tag);
  return null;
};
var CreateDrawerForm = function CreateDrawerForm(props) {
  var _props$getPopupContai2;
  var tag = document.createElement('div');
  tag.setAttribute('id', props.containId);
  tag.setAttribute('class', layerClass);
  var target = ((_props$getPopupContai2 = props.getPopupContainer) === null || _props$getPopupContai2 === void 0 ? void 0 : _props$getPopupContai2.call(props)) || $('body');
  target.appendChild(tag);
  ReactDOM.render(React__default.createElement(ConfigProvider, {
    theme: {
      token: token
    }
  }, React__default.createElement(DrawerFormWrapper, Object.assign({}, props, {
    tag: tag
  }))), tag);
  return null;
};
var CreateForm = {
  Modal: function Modal(options) {
    var containId = options.containId || "modalId_" + uuid(6);
    return {
      open: function open(config) {
        var props = _extends({}, options, config);
        CreateModalForm(_extends({}, props, {
          containId: containId,
          onSubmit: function (data) {
            try {
              var _props$onSubmit;
              return Promise.resolve((_props$onSubmit = props.onSubmit) === null || _props$onSubmit === void 0 ? void 0 : _props$onSubmit.call(props, data)).then(function () {
                _close(containId);
              });
            } catch (e) {
              return Promise.reject(e);
            }
          }
        }));
      },
      close: function close() {
        _close(containId);
      }
    };
  },
  Drawer: function Drawer(options) {
    var containId = options.containId || "drawerId_" + uuid(6);
    return {
      open: function (config) {
        try {
          var props = _extends({}, options, config);
          CreateDrawerForm(_extends({}, props, {
            containId: containId,
            onSubmit: function (data) {
              try {
                var _props$onSubmit2;
                return Promise.resolve((_props$onSubmit2 = props.onSubmit) === null || _props$onSubmit2 === void 0 ? void 0 : _props$onSubmit2.call(props, data)).then(function () {
                  _close(containId);
                });
              } catch (e) {
                return Promise.reject(e);
              }
            }
          }));
          return Promise.resolve();
        } catch (e) {
          return Promise.reject(e);
        }
      },
      close: function close() {
        _close(containId);
      }
    };
  }
};

var _excluded$1 = ["spin", "confirm", "auth", "btnType", "onBeforeClick", "drawerFormProps", "modalFormProps", "tooltip", "visible", "validator"];
var WrapperSpinOnClick = function WrapperSpinOnClick(setLoading, onClick, timer) {
  if (timer === void 0) {
    timer = 0;
  }
  return function (e) {
    try {
      setLoading(true);
      var _temp = _finallyRethrows(function () {
        return _catch(function () {
          return Promise.resolve(onClick === null || onClick === void 0 ? void 0 : onClick(e)).then(function () {});
        }, function (error) {
          console.error('error', error);
        });
      }, function (_wasThrown, _result) {
        setTimeout(function () {
          setLoading(false);
        }, timer);
        if (_wasThrown) throw _result;
        return _result;
      });
      return Promise.resolve(_temp && _temp.then ? _temp.then(function () {}) : void 0);
    } catch (e) {
      return Promise.reject(e);
    }
  };
};
var authName = Symbol('');
var ProButton = forwardRef(function (_ref, ref) {
  var spin = _ref.spin,
    confirm = _ref.confirm,
    auth = _ref.auth,
    onBeforeClick = _ref.onBeforeClick,
    drawerFormProps = _ref.drawerFormProps,
    modalFormProps = _ref.modalFormProps,
    tooltip = _ref.tooltip,
    _ref$visible = _ref.visible,
    visible = _ref$visible === void 0 ? true : _ref$visible,
    props = _objectWithoutPropertiesLoose(_ref, _excluded$1);
  var useStaticHooks = staticThemeMethodHooks();
  var _useState = useState(false),
    open = _useState[0],
    setOpen = _useState[1];
  var _useState2 = useState(false),
    disable = _useState2[0],
    setDisable = _useState2[1];
  var isPopConfirm = isObject(confirm) && confirm.type === 'pop';
  var submitForm;
  var _useState3 = useState(false),
    loading = _useState3[0],
    setLoading = _useState3[1];
  var onClick = function () {
    try {
      var _temp3 = function _temp3() {
        var _props$onClick;
        (_props$onClick = props.onClick) === null || _props$onClick === void 0 ? void 0 : _props$onClick.call(props);
      };
      var _temp2 = function () {
        if (typeof onBeforeClick === 'function') {
          return Promise.resolve(onBeforeClick()).then(function () {});
        }
      }();
      return Promise.resolve(_temp2 && _temp2.then ? _temp2.then(_temp3) : _temp3(_temp2));
    } catch (e) {
      return Promise.reject(e);
    }
  } || function () {};
  var label = props.children;
  if (isObject(drawerFormProps)) {
    submitForm = CreateForm.Drawer(drawerFormProps);
    onClick = WrapperSpinOnClick(setDisable, function () {
      try {
        return Promise.resolve(submitForm.open());
      } catch (e) {
        return Promise.reject(e);
      }
    }, 1000);
  } else if (isObject(modalFormProps)) {
    submitForm = CreateForm.Modal(modalFormProps);
    onClick = WrapperSpinOnClick(setDisable, function () {
      try {
        return Promise.resolve(submitForm.open());
      } catch (e) {
        return Promise.reject(e);
      }
    }, 1000);
  }
  useImperativeHandle(ref, function () {
    return {
      click: !isPopConfirm ? onClick : function () {}
    };
  });
  if (isObject(confirm)) {
    onClick = WrapperSpinOnClick(spin ? setLoading : function () {}, function () {
      try {
        var _temp7 = function _temp7() {
          var _confirm$type, _useStaticHooks$modal;
          function _temp5(_confirmClick) {
            _confirmClick;
          }
          var confirmClick = submitForm ? submitForm.open : props.onClick || function () {};
          var _temp4 = ((_confirm$type = confirm.type) != null ? _confirm$type : 'alert') === 'alert';
          return _temp4 ? _temp5((_useStaticHooks$modal = useStaticHooks.modal) === null || _useStaticHooks$modal === void 0 ? void 0 : _useStaticHooks$modal.confirm(_extends({
            okText: '确定',
            cancelText: '取消',
            title: '提示'
          }, confirm, {
            type: undefined,
            onOk: function onOk() {
              try {
                return Promise.resolve(confirmClick()).then(function () {});
              } catch (e) {
                return Promise.reject(e);
              }
            }
          }))) : Promise.resolve(confirmClick()).then(_temp5);
        };
        var _temp6 = function () {
          if (typeof onBeforeClick === 'function') {
            return Promise.resolve(onBeforeClick()).then(function () {});
          }
        }();
        return Promise.resolve(_temp6 && _temp6.then ? _temp6.then(_temp7) : _temp7(_temp6));
      } catch (e) {
        return Promise.reject(e);
      }
    }, spin ? 500 : 0);
  } else if (spin || typeof modalFormProps === 'function' || typeof drawerFormProps === 'function') {
    if (typeof modalFormProps === 'function') {
      onClick = WrapperSpinOnClick(spin ? setLoading : setDisable, function () {
        try {
          return Promise.resolve(modalFormProps()).then(function (config) {
            CreateForm.Modal(config).open();
          });
        } catch (e) {
          return Promise.reject(e);
        }
      }, spin ? 500 : 1000);
    } else if (typeof drawerFormProps === 'function') {
      onClick = WrapperSpinOnClick(spin ? setLoading : setDisable, function () {
        try {
          return Promise.resolve(drawerFormProps()).then(function (config) {
            CreateForm.Drawer(config).open();
          });
        } catch (e) {
          return Promise.reject(e);
        }
      }, spin ? 500 : 1000);
    } else if (spin) {
      if (typeof modalFormProps === 'object') {
        onClick = WrapperSpinOnClick(spin ? setLoading : function () {}, function () {
          try {
            CreateForm.Modal(modalFormProps).open();
            return Promise.resolve();
          } catch (e) {
            return Promise.reject(e);
          }
        }, spin ? 500 : 0);
      } else if (typeof drawerFormProps === 'object') {
        onClick = WrapperSpinOnClick(spin ? setLoading : function () {}, function () {
          try {
            CreateForm.Drawer(drawerFormProps).open();
            return Promise.resolve();
          } catch (e) {
            return Promise.reject(e);
          }
        }, spin ? 500 : 0);
      } else {
        onClick = WrapperSpinOnClick(setLoading, props.onClick, 500);
      }
    }
  }
  if (auth) {
    var auths = ProButton.getAuth();
    if (isEmpty(auth)) {
      return null;
    } else {
      var authKey = Object.keys(auths).find(function (key) {
        return key === auth;
      });
      if (authKey) {
        label = label || auths[authKey];
      } else {
        return null;
      }
    }
  }
  var vNode = React__default.createElement(Button, Object.assign({
    loading: loading
  }, props, {
    onClick: isPopConfirm || disable ? undefined : onClick
  }), label);
  var handleOpenChange = function handleOpenChange(newOpen) {
    try {
      var _temp9 = function _temp9() {
        setOpen(newOpen);
      };
      var _temp8 = function () {
        if (typeof onBeforeClick === 'function') {
          return Promise.resolve(onBeforeClick()).then(function () {});
        }
      }();
      return Promise.resolve(_temp8 && _temp8.then ? _temp8.then(_temp9) : _temp9(_temp8));
    } catch (e) {
      return Promise.reject(e);
    }
  };
  if (isPopConfirm) {
    vNode = React__default.createElement(Popconfirm, Object.assign({
      onConfirm: onClick,
      okText: "\u786E\u5B9A",
      cancelText: "\u53D6\u6D88"
    }, confirm, {
      onOpenChange: handleOpenChange,
      open: open
    }), vNode);
  }
  if (tooltip) {
    var tooltipProps = typeof tooltip === 'object' && !React__default.isValidElement(tooltip) ? tooltip : {
      title: tooltip
    };
    vNode = React__default.createElement(Tooltip, Object.assign({}, tooltipProps), vNode);
  }
  return visible && vNode;
});
ProButton.setAuth = function (auths) {
  ProButton[authName] = auths;
};
ProButton.getAuth = function () {
  return ProButton[authName] || {};
};
ProButton.hasAuth = function (authKey) {
  var auths = ProButton.getAuth();
  return auths[authKey] !== undefined;
};

var _excluded$2 = ["getContainer", "containId", "style", "mode"];
var $$1 = document.querySelector.bind(document);
var SpinComponent = function SpinComponent(_ref) {
  var style = _ref.style,
    mode = _ref.mode,
    spinProps = _ref.spinProps;
  return mode === 'loading' ? React__default.createElement(Spin, Object.assign({
    spinning: true
  }, spinProps)) : React__default.createElement("div", {
    className: "create-spin-vscode",
    style: style
  });
};
var CreateSpin = function CreateSpin(_ref2) {
  var _getContainer;
  var getContainer = _ref2.getContainer,
    containId = _ref2.containId,
    spinProps = _ref2.spinProps,
    style = _ref2.style,
    mode = _ref2.mode;
  if ($$1("#" + containId)) {
    return;
  }
  var tag = document.createElement('div');
  tag.setAttribute('id', containId);
  tag.style.width = '100%';
  tag.style.height = '100%';
  tag.style.position = 'absolute';
  tag.style.top = '0';
  tag.className = 'create-spin';
  (_getContainer = getContainer()) === null || _getContainer === void 0 ? void 0 : _getContainer.appendChild(tag);
  ReactDOM.render(React__default.createElement(SpinComponent, {
    style: style,
    mode: mode,
    spinProps: spinProps
  }), tag);
  return null;
};
var index = (function (_ref3) {
  var _ref3$getContainer = _ref3.getContainer,
    getContainer = _ref3$getContainer === void 0 ? function () {
      return document.querySelector('body');
    } : _ref3$getContainer,
    _ref3$containId = _ref3.containId,
    containId = _ref3$containId === void 0 ? "create-spin-root-" + uuid(5) : _ref3$containId,
    _ref3$style = _ref3.style,
    style = _ref3$style === void 0 ? {} : _ref3$style,
    _ref3$mode = _ref3.mode,
    mode = _ref3$mode === void 0 ? 'loading' : _ref3$mode,
    spinProps = _objectWithoutPropertiesLoose(_ref3, _excluded$2);
  return {
    open: function open() {
      CreateSpin({
        getContainer: getContainer,
        containId: containId,
        spinProps: spinProps,
        style: style,
        mode: mode
      });
    },
    close: function close() {
      var _$;
      (_$ = $$1("#" + containId)) === null || _$ === void 0 ? void 0 : _$.remove();
    }
  };
});

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var classnames = createCommonjsModule(function (module) {
/*!
	Copyright (c) 2018 Jed Watson.
	Licensed under the MIT License (MIT), see
	http://jedwatson.github.io/classnames
*/
/* global define */

(function () {

	var hasOwn = {}.hasOwnProperty;

	function classNames () {
		var classes = '';

		for (var i = 0; i < arguments.length; i++) {
			var arg = arguments[i];
			if (arg) {
				classes = appendClass(classes, parseValue(arg));
			}
		}

		return classes;
	}

	function parseValue (arg) {
		if (typeof arg === 'string' || typeof arg === 'number') {
			return arg;
		}

		if (typeof arg !== 'object') {
			return '';
		}

		if (Array.isArray(arg)) {
			return classNames.apply(null, arg);
		}

		if (arg.toString !== Object.prototype.toString && !arg.toString.toString().includes('[native code]')) {
			return arg.toString();
		}

		var classes = '';

		for (var key in arg) {
			if (hasOwn.call(arg, key) && arg[key]) {
				classes = appendClass(classes, key);
			}
		}

		return classes;
	}

	function appendClass (value, newClass) {
		if (!newClass) {
			return value;
		}
	
		if (value) {
			return value + ' ' + newClass;
		}
	
		return value + newClass;
	}

	if ( module.exports) {
		classNames.default = classNames;
		module.exports = classNames;
	} else {
		window.classNames = classNames;
	}
}());
});

function CopyLabelContent(_ref) {
  var label = _ref.label,
    content = _ref.content,
    _ref$copyable = _ref.copyable,
    copyable = _ref$copyable === void 0 ? true : _ref$copyable,
    _ref$type = _ref.type,
    type = _ref$type === void 0 ? 'default' : _ref$type,
    _ref$style = _ref.style,
    style = _ref$style === void 0 ? {} : _ref$style,
    _ref$contentStyle = _ref.contentStyle,
    contentStyle = _ref$contentStyle === void 0 ? {} : _ref$contentStyle,
    _ref$iconStyle = _ref.iconStyle,
    iconStyle = _ref$iconStyle === void 0 ? {} : _ref$iconStyle,
    _ref$copyTxt = _ref.copyTxt,
    copyTxt = _ref$copyTxt === void 0 ? '' : _ref$copyTxt,
    _ref$onCopy = _ref.onCopy,
    onCopy = _ref$onCopy === void 0 ? function () {} : _ref$onCopy,
    _ref$ellipsis = _ref.ellipsis,
    ellipsis = _ref$ellipsis === void 0 ? false : _ref$ellipsis;
  var _useState = useState(false),
    copied = _useState[0],
    setCopied = _useState[1];
  var _useState2 = useState(false),
    showCopied = _useState2[0],
    setShowCopied = _useState2[1];
  useEffect(function () {
    var timerId;
    if (copied) {
      timerId = setTimeout(function () {
        setCopied(false);
      }, 6000);
    }
    return function () {
      if (timerId) {
        clearTimeout(timerId);
      }
    };
  }, [copied]);
  useEffect(function () {
    var timerId;
    if (showCopied) {
      timerId = setTimeout(function () {
        setShowCopied(false);
      }, 4000);
    }
    return function () {
      if (timerId) {
        clearTimeout(timerId);
      }
    };
  }, [showCopied]);
  var sumIconStyle = useMemo$1(function () {
    return _extends({}, contentStyle, iconStyle);
  }, [contentStyle, iconStyle]);
  return React__default.createElement("div", {
    className: "slick-form-copy-container " + type,
    style: style
  }, React__default.createElement("div", {
    className: "copy-label"
  }, label), React__default.createElement("div", {
    style: contentStyle,
    className: classnames('copy-content', {
      ellipsis: ellipsis
    })
  }, ellipsis && ((content === null || content === void 0 ? void 0 : content.length) || 0) > 14 ? React__default.createElement(Tooltip, {
    title: content
  }, " ", content) : content), copyable && !copied && React__default.createElement("div", {
    style: sumIconStyle,
    className: "copy-icon",
    onClick: function onClick() {
      if (!copied) {
        onCopy();
        setCopied(true);
        setShowCopied(true);
      }
    }
  }, copyTxt ? React__default.createElement(CopyOutlined, null) : React__default.createElement(Tooltip, {
    placement: "top",
    title: "\u590D\u5236"
  }, React__default.createElement(CopyOutlined, null)), copyTxt), copyable && copied && React__default.createElement("div", {
    style: sumIconStyle,
    className: "copy-icon cd"
  }, copyTxt ? React__default.createElement(CheckOutlined, null) : React__default.createElement(Tooltip, {
    placement: "top",
    title: "\u590D\u5236\u6210\u529F",
    open: showCopied
  }, React__default.createElement(CheckOutlined, null)), copyTxt));
}

var PreviewFile = (function (_ref) {
  var name = _ref.name,
    url = _ref.url,
    services = _ref.services;
  return url ? React__default.createElement("span", {
    style: {
      cursor: 'pointer',
      marginLeft: 10
    },
    title: "\u70B9\u51FB\u9884\u89C8",
    onClick: function (e) {
      try {
        e.stopPropagation();
        return Promise.resolve(services.filePreview(name, url)).then(function (_ref2) {
          var returnData = _ref2.returnData,
            returnCode = _ref2.returnCode,
            code = _ref2.code,
            data = _ref2.data;
          if (code === 200 || returnCode === '100') {
            window.open(data || returnData);
          }
        });
      } catch (e) {
        return Promise.reject(e);
      }
    }
  }, React__default.createElement(EyeOutlined, {
    style: {
      color: 'var(--ant-color-primary)'
    }
  })) : null;
});

var downloadOssFile = function downloadOssFile(url, fileName, token) {
  if (fileName === void 0) {
    fileName = '';
  }
  if (token === void 0) {
    token = getAppToken();
  }
  var x = new XMLHttpRequest();
  x.open('GET', url + "&saas-token=" + token, true);
  x.responseType = 'blob';
  x.onload = function () {
    var _url = window.URL.createObjectURL(x.response);
    var a = document.createElement('a');
    a.href = _url;
    a.download = fileName;
    a.click();
  };
  x.send();
};
var getAppToken = function getAppToken() {
  var appId = getMetaContentByName('appId');
  if (appId) {
    return getLocalStore("jwtToken-" + appId);
  } else {
    return getLocalStore('jwtToken');
  }
};
var getLocalStore = function getLocalStore(name) {
  try {
    var content = localStorage.getItem(name);
    if (content !== null) {
      return JSON.parse(content);
    }
  } catch (error) {
    console.log(error);
  }
};
var getMetaContentByName = function getMetaContentByName(name) {
  var el = document.querySelector("meta[name=" + name);
  return el === null || el === void 0 ? void 0 : el.content;
};

var CustomRender = function CustomRender(_ref) {
  var originNode = _ref.originNode,
    accept = _ref.accept,
    file = _ref.file,
    listType = _ref.listType,
    disabled = _ref.disabled,
    onRemove = _ref.onRemove,
    services = _ref.services,
    showPreview = _ref.showPreview,
    readOnly = _ref.readOnly;
  return file.status === 'uploading' ? originNode : listType === 'picture-card' ? React__default.createElement("div", {
    className: "picture-card-image"
  }, (accept === null || accept === void 0 ? void 0 : accept.includes('.mp4')) ? React__default.createElement("video", {
    controls: true,
    height: 100,
    width: 100,
    src: file.url,
    crossOrigin: "anonymous"
  }) : React__default.createElement(Image, {
    width: 100,
    src: file.url
  }), !disabled && !readOnly && React__default.createElement("a", {
    className: "oss-file-item-render-action",
    style: {
      position: 'absolute',
      top: 2,
      right: 4
    },
    onClick: function onClick() {
      onRemove(file);
    }
  }, React__default.createElement(DeleteOutlined, null))) : React__default.createElement("div", {
    className: "oss-file-item-render"
  }, React__default.createElement("div", {
    style: {
      width: 'calc(100% - 60px)'
    },
    title: file.name,
    onClick: function onClick() {
      downloadOssFile(file.url, file.name);
    }
  }, originNode), React__default.createElement("div", null, showPreview && React__default.createElement("a", {
    className: "oss-file-item-render-action",
    style: {
      right: 30
    }
  }, React__default.createElement(PreviewFile, {
    name: file.name,
    url: file.url,
    services: services
  })), !disabled && !readOnly && React__default.createElement("a", {
    className: "oss-file-item-render-action",
    onClick: function onClick() {
      onRemove(file);
    }
  }, React__default.createElement(DeleteOutlined, null))));
};
var Drag = (function (_ref2) {
  var originNode = _ref2.originNode,
    file = _ref2.file,
    currFileList = _ref2.currFileList,
    onMoveRow = _ref2.onMoveRow,
    onRemove = _ref2.onRemove,
    listType = _ref2.listType,
    disabled = _ref2.disabled,
    accept = _ref2.accept,
    services = _ref2.services,
    showPreview = _ref2.showPreview,
    _ref2$readOnly = _ref2.readOnly,
    readOnly = _ref2$readOnly === void 0 ? false : _ref2$readOnly;
  var ref = useRef(null);
  var index = currFileList.indexOf(file);
  var _useDrop = useDrop({
      accept: 'DragableUploadList',
      collect: function collect(monitor) {
        var _ref3 = monitor.getItem() || {},
          dragIndex = _ref3.index;
        if (dragIndex === index) {
          return {};
        }
        return {
          isOver: monitor.isOver(),
          dropClassName: dragIndex < index ? ' drop-over-downward' : ' drop-over-upward'
        };
      },
      drop: function drop(item) {
        onMoveRow(item === null || item === void 0 ? void 0 : item.index, index);
      }
    }),
    _useDrop$ = _useDrop[0],
    isOver = _useDrop$.isOver,
    dropClassName = _useDrop$.dropClassName,
    drop = _useDrop[1];
  var _useDrag = useDrag({
      type: disabled ? '' : 'DragableUploadList',
      item: {
        index: index
      },
      collect: function collect(monitor) {
        return {
          isDragging: monitor.isDragging()
        };
      }
    }),
    drag = _useDrag[1];
  drop(drag(ref));
  return React__default.createElement("div", {
    ref: ref,
    className: disabled ? 'upload-draggable-list-item-readOnly' : "upload-draggable-list-item " + (isOver ? dropClassName : ''),
    style: {
      cursor: 'move'
    }
  }, React__default.createElement(CustomRender, Object.assign({}, {
    originNode: originNode,
    accept: accept,
    file: file,
    listType: listType,
    disabled: disabled,
    onRemove: onRemove,
    services: services,
    showPreview: showPreview,
    readOnly: readOnly
  })));
});

var _excluded$3 = ["config"];
var defaultRequest = (function (options) {
  var instance = axios.create(options);
  instance.interceptors.request.use(function (config) {
    return config;
  }, function (error) {
    return Promise.reject(error);
  });
  instance.interceptors.response.use(function (_ref) {
    var response = _objectWithoutPropertiesLoose(_ref, _excluded$3);
    if (response.status === 200) {
      if (response.data.code !== 200) {
        notification$1.error({
          message: '提示',
          description: response.data.msg
        });
      }
      return response.data;
    }
  }, function (error) {
    return Promise.reject(error);
  });
  return instance;
});

var useServices = (function (request, urlPrefix) {
  return {
    filePreview: function filePreview(name, url) {
      return request.post(urlPrefix + "/yqProject/getFilePreviewUrl", {
        name: name,
        url: url
      });
    },
    getOssPath: function (params) {
      try {
        return Promise.resolve(request.get(urlPrefix + "/service/fileUpload/getOssPath", {
          params: params
        }));
      } catch (e) {
        return Promise.reject(e);
      }
    },
    getOssInfo: function (data) {
      try {
        return Promise.resolve(request.post(urlPrefix + "/service/fileUpload/getOssInfo", data));
      } catch (e) {
        return Promise.reject(e);
      }
    },
    getOssInfoAndFinanceUrl: function (data) {
      try {
        return Promise.resolve(request.post(urlPrefix + "/service/fileUpload/getOssInfoAndAuctionCdnUrl", data));
      } catch (e) {
        return Promise.reject(e);
      }
    },
    getOssAuthInfo: function () {
      try {
        return Promise.resolve(request.get(urlPrefix + "/service/fileUpload/getOssClientInfo", {}));
      } catch (e) {
        return Promise.reject(e);
      }
    }
  };
});

var _excluded$4 = ["ossConfig", "onLoading", "baseURL", "text", "listType", "btnType", "accept", "maxCount", "limitSize", "value", "onChange", "uploadType", "useFinanceUrl", "form", "request", "urlPrefix", "readOnly", "disabled", "openDrag", "showPreview", "onFinish", "closeItemRender", "onFileChange"];
var OssFileUpload = (function (_ref) {
  var _ref$ossConfig = _ref.ossConfig,
    ossConfig = _ref$ossConfig === void 0 ? {
      bucket: 'wisdomhammer',
      region: 'oss-cn-hangzhou'
    } : _ref$ossConfig,
    _ref$onLoading = _ref.onLoading,
    onLoading = _ref$onLoading === void 0 ? function (loading) {} : _ref$onLoading,
    _ref$baseURL = _ref.baseURL,
    baseURL = _ref$baseURL === void 0 ? 'https://pmsaas.taobao.net' : _ref$baseURL,
    _ref$text = _ref.text,
    text = _ref$text === void 0 ? '上传文件' : _ref$text,
    _ref$listType = _ref.listType,
    listType = _ref$listType === void 0 ? 'text' : _ref$listType,
    _ref$accept = _ref.accept,
    accept = _ref$accept === void 0 ? listType === 'picture-card' ? '.png,.jpg,.jpeg' : '.doc,.docx,.pdf,.xlsx,.xls,.txt,.png,.jpg,.jpeg' : _ref$accept,
    _ref$maxCount = _ref.maxCount,
    maxCount = _ref$maxCount === void 0 ? 1 : _ref$maxCount,
    _ref$limitSize = _ref.limitSize,
    limitSize = _ref$limitSize === void 0 ? 1 * 1024 : _ref$limitSize,
    _ref$value = _ref.value,
    value = _ref$value === void 0 ? [] : _ref$value,
    _ref$onChange = _ref.onChange,
    onChange = _ref$onChange === void 0 ? function () {} : _ref$onChange,
    _ref$uploadType = _ref.uploadType,
    uploadType = _ref$uploadType === void 0 ? 1 : _ref$uploadType,
    _ref$useFinanceUrl = _ref.useFinanceUrl,
    useFinanceUrl = _ref$useFinanceUrl === void 0 ? false : _ref$useFinanceUrl,
    _ref$form = _ref.form,
    form = _ref$form === void 0 ? {} : _ref$form,
    _ref$request = _ref.request,
    request = _ref$request === void 0 ? defaultRequest({
      baseURL: baseURL
    }) : _ref$request,
    _ref$urlPrefix = _ref.urlPrefix,
    urlPrefix = _ref$urlPrefix === void 0 ? '' : _ref$urlPrefix,
    _ref$readOnly = _ref.readOnly,
    readOnly = _ref$readOnly === void 0 ? false : _ref$readOnly,
    _ref$disabled = _ref.disabled,
    disabled = _ref$disabled === void 0 ? false : _ref$disabled,
    _ref$openDrag = _ref.openDrag,
    openDrag = _ref$openDrag === void 0 ? false : _ref$openDrag,
    _ref$showPreview = _ref.showPreview,
    showPreview = _ref$showPreview === void 0 ? true : _ref$showPreview,
    _ref$onFinish = _ref.onFinish,
    onFinish = _ref$onFinish === void 0 ? function () {} : _ref$onFinish,
    _ref$closeItemRender = _ref.closeItemRender,
    closeItemRender = _ref$closeItemRender === void 0 ? false : _ref$closeItemRender,
    onFileChange = _ref.onFileChange,
    props = _objectWithoutPropertiesLoose(_ref, _excluded$4);
  var _useState = useState(false),
    loading = _useState[0],
    setLoading = _useState[1];
  useEffect(function () {
    onLoading(loading);
  }, [loading]);
  var services = useServices(request, urlPrefix);
  var beforeUpload = function beforeUpload(file) {
    try {
      var ext = file.name.substring(file.name.lastIndexOf('.'));
      if (!accept.split(',').map(function (item) {
        return item.toLowerCase();
      }).includes(ext.toLowerCase())) {
        message$1.error(file.name + " \u6587\u4EF6\u683C\u5F0F\u4E0D\u5728" + accept + "\u4E2D");
        return Upload.LIST_IGNORE;
      }
      var size = file.size;
      var isLtSize = size / 1024 / 1024 <= limitSize;
      if (!isLtSize) {
        message$1.error("\u6587\u4EF6\u5927\u5C0F\u4E0D\u5141\u8BB8\u8D85\u8FC7" + limitSize + "M");
        return Upload.LIST_IGNORE;
      }
      return isLtSize;
    } catch (error) {
      console.log(error);
    }
    return null;
  };
  var onRemove = function onRemove(file) {
    var _fileList = Array.isArray(value) ? value : JSON.parse(JSON.stringify(value.fileList));
    var tempFileList = JSON.parse(JSON.stringify(_fileList));
    tempFileList = tempFileList.filter(function (_ref2) {
      var uid = _ref2.uid;
      return uid !== file.uid;
    });
    onChange(tempFileList);
  };
  var customRequest = function customRequest(options) {
    try {
      var _temp2 = function _temp2() {
        onFileChange === null || onFileChange === void 0 ? void 0 : onFileChange({
          type: 'file-upload-success',
          data: ''
        });
      };
      var file = options.file;
      onFileChange === null || onFileChange === void 0 ? void 0 : onFileChange({
        type: 'get-file',
        data: file
      });
      var _temp = function () {
        if (file.size > 5 * 1024 * 1024) {
          return Promise.resolve(doMultiPartUpload(options)).then(function () {});
        } else {
          return Promise.resolve(doSimpleUpload(options)).then(function () {});
        }
      }();
      return Promise.resolve(_temp && _temp.then ? _temp.then(_temp2) : _temp2(_temp));
    } catch (e) {
      return Promise.reject(e);
    }
  };
  var generatePath = function generatePath(fileName) {
    try {
      return Promise.resolve(services.getOssPath({
        fileName: encodeURIComponent(fileName)
      })).then(function (_ref3) {
        var code = _ref3.code,
          data = _ref3.data;
        if (code === 200) {
          return data;
        }
      });
    } catch (e) {
      return Promise.reject(e);
    }
  };
  var generateInfo = function generateInfo(fileName, ossPath) {
    try {
      var _temp4 = function _temp4() {
        return res.code !== 200 ? Promise.reject(res.msg) : res.data;
      };
      var res = {
        code: 200,
        msg: '',
        data: {}
      };
      var _temp3 = function () {
        if (useFinanceUrl) {
          var _form$getFieldValue;
          return Promise.resolve(services.getOssInfoAndFinanceUrl({
            fileName: fileName,
            ossPath: ossPath,
            uploadType: uploadType,
            isEntrustOrg: (_form$getFieldValue = form.getFieldValue) === null || _form$getFieldValue === void 0 ? void 0 : _form$getFieldValue.call(form, 'isEntrustOrg')
          })).then(function (_services$getOssInfoA) {
            res = _services$getOssInfoA;
          });
        } else {
          return Promise.resolve(services.getOssInfo({
            fileName: fileName,
            ossPath: ossPath
          })).then(function (_services$getOssInfo) {
            res = _services$getOssInfo;
          });
        }
      }();
      return Promise.resolve(_temp3 && _temp3.then ? _temp3.then(_temp4) : _temp4(_temp3));
    } catch (e) {
      return Promise.reject(e);
    }
  };
  var doSimpleUpload = function doSimpleUpload(options) {
    try {
      var file = options.file,
        onProgress = options.onProgress,
        onSuccess = options.onSuccess;
      return Promise.resolve(services.getOssAuthInfo()).then(function (_ref4) {
        var data = _ref4.data,
          code = _ref4.code;
        return function () {
          if (code === 200) {
            var ossClient = new OSS(_extends({
              accessKeyId: data.accessKey,
              accessKeySecret: data.accessSecret,
              stsToken: data.securityToken
            }, ossConfig));
            return _catch(function () {
              setLoading(true);
              var _temp5 = _finallyRethrows(function () {
                return _catch(function () {
                  return Promise.resolve(generatePath(file.name)).then(function (fileOssPath) {
                    onProgress({
                      percent: 50
                    }, file);
                    return Promise.resolve(ossClient.put(fileOssPath, file)).then(function () {
                      onProgress({
                        percent: 100
                      }, file);
                      return Promise.resolve(generateInfo(file.name, fileOssPath)).then(function (returnData) {
                        onFinish === null || onFinish === void 0 ? void 0 : onFinish(returnData);
                        onSuccess({
                          returnData: returnData
                        }, file);
                      });
                    });
                  });
                }, function (error) {
                  onFileChange === null || onFileChange === void 0 ? void 0 : onFileChange({
                    type: 'file-upload-error',
                    data: error
                  });
                  console.log(error);
                });
              }, function (_wasThrown, _result) {
                setLoading(false);
                if (_wasThrown) throw _result;
                return _result;
              });
              if (_temp5 && _temp5.then) return _temp5.then(function () {});
            }, function (err) {
              console.error(err);
            });
          }
        }();
      });
    } catch (e) {
      return Promise.reject(e);
    }
  };
  var _onFileChange = function _onFileChange(option) {
    var tempFileList = [].concat(option.fileList);
    if (tempFileList.find(function (item) {
      var _item$response, _item$response$return;
      return item.status === 'done' && !item.url && (item === null || item === void 0 ? void 0 : (_item$response = item.response) === null || _item$response === void 0 ? void 0 : (_item$response$return = _item$response.returnData) === null || _item$response$return === void 0 ? void 0 : _item$response$return.url);
    })) {
      tempFileList = tempFileList.map(function (item) {
        var _item$response2, _item$response2$retur;
        return _extends({}, item, {
          url: (item === null || item === void 0 ? void 0 : item.url) || (item === null || item === void 0 ? void 0 : (_item$response2 = item.response) === null || _item$response2 === void 0 ? void 0 : (_item$response2$retur = _item$response2.returnData) === null || _item$response2$retur === void 0 ? void 0 : _item$response2$retur.url)
        });
      });
    }
    onChange(tempFileList);
    var multipleComplete = option.fileList.filter(function (d) {
      return d.status === 'done';
    });
    if (multipleComplete.length === option.fileList.length) {
      var mapFileList = multipleComplete.map(function (d) {
        var _d$response, _d$response2;
        return _extends({}, d === null || d === void 0 ? void 0 : (_d$response = d.response) === null || _d$response === void 0 ? void 0 : _d$response.returnData, {
          name: d === null || d === void 0 ? void 0 : (_d$response2 = d.response) === null || _d$response2 === void 0 ? void 0 : _d$response2.returnData.fileName
        }, d);
      });
      onChange(mapFileList);
    }
  };
  var doMultiPartUpload = function doMultiPartUpload(options) {
    try {
      var file = options.file,
        onProgress = options.onProgress,
        onSuccess = options.onSuccess;
      return Promise.resolve(services.getOssAuthInfo()).then(function (_ref5) {
        var data = _ref5.data,
          code = _ref5.code;
        return function () {
          if (code === 200) {
            var ossClient = new OSS(_extends({
              accessKeyId: data.accessKey,
              accessKeySecret: data.accessSecret,
              stsToken: data.securityToken
            }, ossConfig));
            return _catch(function () {
              setLoading(true);
              var _temp6 = _finallyRethrows(function () {
                return _catch(function () {
                  return Promise.resolve(generatePath(file.name)).then(function (fileOssPath) {
                    return Promise.resolve(ossClient.multipartUpload(fileOssPath, file, {
                      progress: function progress(p, checkpoint) {
                        onProgress({
                          percent: parseInt(String(p * 100), 10)
                        }, checkpoint === null || checkpoint === void 0 ? void 0 : checkpoint.file);
                      }
                    })).then(function () {
                      return Promise.resolve(generateInfo(file.name, fileOssPath)).then(function (returnData) {
                        onFinish === null || onFinish === void 0 ? void 0 : onFinish(returnData);
                        onSuccess({
                          returnData: returnData
                        }, file);
                      });
                    });
                  });
                }, function (error) {
                  onFileChange === null || onFileChange === void 0 ? void 0 : onFileChange({
                    type: 'file-upload-error',
                    data: error
                  });
                  console.log(error);
                });
              }, function (_wasThrown2, _result2) {
                setLoading(false);
                if (_wasThrown2) throw _result2;
                return _result2;
              });
              if (_temp6 && _temp6.then) return _temp6.then(function () {});
            }, function (err) {
              console.error(err);
            });
          }
        }();
      });
    } catch (e) {
      return Promise.reject(e);
    }
  };
  var moveRow = useCallback(function (dragIndex, hoverIndex) {
    var dragRow = value[dragIndex];
    onChange(update(value, {
      $splice: [[dragIndex, 1], [hoverIndex, 0, dragRow]]
    }));
  }, [value]);
  var uploadButton = listType === 'picture-card' ? React__default.createElement("div", null, loading ? React__default.createElement(LoadingOutlined, null) : React__default.createElement(PlusOutlined, null), React__default.createElement("div", {
    style: {
      marginTop: 8
    }
  }, text)) : React__default.createElement("div", null, React__default.createElement(Button, {
    loading: loading,
    icon: React__default.createElement(UploadOutlined, null)
  }, text));
  if (readOnly && value.length === 0) {
    return '-';
  }
  return React__default.createElement("div", {
    className: "slick-form-oss-upload"
  }, React__default.createElement(DndProvider, {
    backend: HTML5Backend
  }, React__default.createElement(Upload, Object.assign({}, props, {
    maxCount: maxCount,
    accept: accept,
    showUploadList: {
      showDownloadIcon: false,
      showRemoveIcon: false
    },
    listType: listType,
    fileList: value,
    beforeUpload: beforeUpload,
    customRequest: customRequest,
    onChange: _onFileChange,
    itemRender: function itemRender(originNode, file, currFileList) {
      if (closeItemRender) return null;
      return openDrag ? React__default.createElement(Drag, {
        originNode: originNode,
        file: file,
        currFileList: currFileList,
        onMoveRow: moveRow,
        onRemove: onRemove,
        listType: listType,
        disabled: disabled || readOnly,
        accept: accept,
        services: services,
        showPreview: showPreview,
        readOnly: readOnly
      }) : React__default.createElement(CustomRender, Object.assign({}, {
        readOnly: readOnly,
        originNode: originNode,
        accept: accept,
        file: file,
        listType: listType,
        disabled: disabled,
        onRemove: onRemove,
        services: services,
        showPreview: showPreview
      }));
    }
  }), readOnly || value.length >= maxCount ? null : uploadButton)));
});

var DescList = function DescList(_ref) {
  var onClose = _ref.onClose,
    visible = _ref.visible,
    data = _ref.data,
    _ref$type = _ref.type,
    type = _ref$type === void 0 ? 'Card' : _ref$type,
    _ref$gutter = _ref.gutter,
    gutter = _ref$gutter === void 0 ? [16, 24] : _ref$gutter,
    _ref$column = _ref.column,
    column = _ref$column === void 0 ? 3 : _ref$column,
    drawerProps = _ref.drawerProps,
    _ref$labelSpan = _ref.labelSpan,
    labelSpan = _ref$labelSpan === void 0 ? 8 : _ref$labelSpan,
    _ref$containerSpan = _ref.containerSpan,
    containerSpan = _ref$containerSpan === void 0 ? 16 : _ref$containerSpan,
    renderModel = _ref.renderModel,
    _ref$placeholder = _ref.placeholder,
    placeholder = _ref$placeholder === void 0 ? '-' : _ref$placeholder,
    update = _ref.update;
  var _useState = useState(data),
    _data = _useState[0],
    setData = _useState[1];
  var _useState2 = useState(false),
    setLoading = _useState2[1];
  useEffect(function () {
    setData(data);
  }, [data]);
  var MyFragment = function MyFragment(_ref2) {
    var children = _ref2.children;
    return React__default.createElement(Fragment, null, children);
  };
  var Warp = function () {
    switch (type) {
      case 'Drawer':
        return Drawer;
      default:
        return MyFragment;
    }
  }();
  var MediaItem = function MediaItem(_ref3) {
    return React__default.createElement("div", null, ";");
  };
  var Container = function Container(_ref4) {
    var item = _ref4.item,
      index = _ref4.index;
    var _item$options = item.options,
      _item$options2 = _item$options === void 0 ? {} : _item$options,
      _item$options2$toFixe = _item$options2.toFixed,
      toFixed = _item$options2$toFixe === void 0 ? 2 : _item$options2$toFixe,
      _item$options2$useGro = _item$options2.useGrouping,
      useGrouping = _item$options2$useGro === void 0 ? true : _item$options2$useGro,
      _item$options2$dateFo = _item$options2.dateFormat,
      dateFormat = _item$options2$dateFo === void 0 ? 'YYYY-MM-DD HH:mm:ss' : _item$options2$dateFo,
      enums = _item$options2.enums,
      render = item.render,
      _Type = item.type,
      key = item.key;
    var value = _data[key];
    if (typeof render === 'function') {
      return render(value, _data, index);
    }
    if (![undefined, null].includes(value)) {
      var _valRender;
      var valRender = value;
      switch (_Type) {
        case 'amount':
          valRender = value.toLocaleString('zh-CN', {
            useGrouping: useGrouping,
            minimumFractionDigits: toFixed,
            maximumFractionDigits: toFixed
          });
          break;
        case 'date':
          valRender = dayjs(value).format(dateFormat);
          break;
        case 'enum':
          if (Array.isArray(enums)) {
            var _enums$find;
            valRender = (_enums$find = enums.find(function (i) {
              return i.value === value;
            })) === null || _enums$find === void 0 ? void 0 : _enums$find.label;
          } else if (Object.prototype.toString.call(enums) === '[object Object]') {
            valRender = enums[value];
          }
          break;
        case 'media':
          valRender = (Array.isArray(value) ? value : [value]).map(function (i) {
            return React__default.createElement(MediaItem, {
              mediaData: i
            });
          });
          break;
      }
      return React__default.createElement("div", {
        className: 'desc-list-value'
      }, (_valRender = valRender) != null ? _valRender : value);
    }
    return React__default.createElement("div", {
      className: 'desc-list-value',
      style: {
        textAlign: 'center'
      }
    }, placeholder);
  };
  var Label = function Label(_ref5) {
    var label = _ref5.label,
      index = _ref5.index;
    if (typeof label === 'string' || 1) {
      return React__default.createElement("div", {
        style: {
          fontWeight: 'bold'
        }
      }, "\u6807\u7B7E-", index + 1, ": ");
    }
    return label || null;
  };
  var onRefresh = function onRefresh() {
    try {
      setLoading(true);
      return Promise.resolve(update()).then(function (res) {
        setData(res);
        setLoading(false);
      });
    } catch (e) {
      return Promise.reject(e);
    }
  };
  return React__default.createElement(Warp, Object.assign({
    width: 500,
    title: "\u8BE6\u60C5",
    extra: React__default.createElement(Space, null, React__default.createElement(Button, {
      type: "primary"
    }, "\u5237\u65B0"), React__default.createElement(Button, null, "\u7F16\u8F91"))
  }, drawerProps, {
    visible: visible,
    onClose: onClose
  }), type === 'Card' && React__default.createElement("div", {
    className: 'operation-area'
  }, React__default.createElement("h3", null, "\u8BE6\u60C5"), React__default.createElement(Space, null, React__default.createElement(Button, {
    type: "primary",
    onClick: onRefresh
  }, "\u5237\u65B0"), React__default.createElement(Button, null, "\u7F16\u8F91"))), React__default.createElement(Row, {
    gutter: gutter,
    className: 'desc-list-container',
    align: "middle"
  }, renderModel.map(function (i, idx) {
    return React__default.createElement(Col, {
      span: 24 / column * (i.span || 1),
      key: i.key
    }, React__default.createElement(Row, {
      align: "middle"
    }, React__default.createElement(Col, {
      span: labelSpan
    }, React__default.createElement(Label, {
      label: i.label,
      index: idx
    })), React__default.createElement(Col, {
      span: containerSpan,
      style: {
        padding: 10
      }
    }, React__default.createElement(Container, {
      item: i,
      index: idx
    }))));
  })));
};

function toArray(children, op) {
  var option = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var ret = [];
  React__default.Children.forEach(children, function (child) {
    if ((child === undefined || child === null) && !option.keepEmpty) {
      return;
    }
    if (Array.isArray(child)) {
      ret = ret.concat(toArray(child));
    } else if (isFragment(child) && child.props) {
      ret = ret.concat(toArray(child.props.children, option));
    } else {
      ret.push(child);
    }
  });
  return ret;
}

var DescriptionsItem = function DescriptionsItem(_ref) {
  var children = _ref.children;
  return children;
};

var prefixCls = 'slick-form-descriptions';
function Descriptions(_ref) {
  var title = _ref.title,
    extra = _ref.extra,
    _ref$column = _ref.column,
    column = _ref$column === void 0 ? 3 : _ref$column,
    _ref$gutter = _ref.gutter,
    gutter = _ref$gutter === void 0 ? 24 : _ref$gutter,
    _ref$layout = _ref.layout,
    layout = _ref$layout === void 0 ? 'horizontal' : _ref$layout,
    _ref$labelAlign = _ref.labelAlign,
    labelAlign = _ref$labelAlign === void 0 ? 'left' : _ref$labelAlign,
    labelWidth = _ref.labelWidth,
    children = _ref.children,
    _ref$emptyValue = _ref.emptyValue,
    emptyValue = _ref$emptyValue === void 0 ? '-' : _ref$emptyValue,
    className = _ref.className,
    style = _ref.style,
    _ref$labelStyle = _ref.labelStyle,
    labelStyle = _ref$labelStyle === void 0 ? {} : _ref$labelStyle,
    _ref$contentStyle = _ref.contentStyle,
    contentStyle = _ref$contentStyle === void 0 ? {} : _ref$contentStyle,
    _ref$dataSource = _ref.dataSource,
    dataSource = _ref$dataSource === void 0 ? [] : _ref$dataSource;
  if (!children) {
    var _dataSource$filter;
    children = dataSource === null || dataSource === void 0 ? void 0 : (_dataSource$filter = dataSource.filter(function (item) {
      return typeof item.visible !== 'boolean' || typeof item.visible === 'boolean' && item.visible;
    })) === null || _dataSource$filter === void 0 ? void 0 : _dataSource$filter.map(function (item) {
      return React__default.createElement(DescriptionsItem, {
        label: (item === null || item === void 0 ? void 0 : item.tooltip) ? React__default.createElement("span", null, item.label, React__default.createElement(Tooltip, {
          title: item.tooltip
        }, React__default.createElement(QuestionCircleOutlined, {
          style: {
            marginLeft: 2
          }
        }))) : item.label,
        key: item.label,
        span: item.span || 1
      }, item.value);
    });
  }
  var childNodes = toArray(children).filter(function (n) {
    return n;
  });
  return React__default.createElement("div", {
    className: classnames(prefixCls, className),
    style: style
  }, (title || extra) && React__default.createElement("div", {
    className: prefixCls + "-header"
  }, title && React__default.createElement("div", {
    className: prefixCls + "-title"
  }, title), extra && React__default.createElement("div", {
    className: prefixCls + "-extra"
  }, extra)), React__default.createElement("div", {
    className: prefixCls + "-view"
  }, React__default.createElement(Row, {
    gutter: gutter,
    wrap: true
  }, childNodes.map(function (node) {
    var _ref2 = node.props || {},
      _ref2$span = _ref2.span,
      span = _ref2$span === void 0 ? 1 : _ref2$span,
      diySpan = _ref2.diySpan,
      label = _ref2.label,
      nodeChildren = _ref2.children,
      nodeClassName = _ref2.className,
      _ref2$style = _ref2.style,
      nodeStyle = _ref2$style === void 0 ? {} : _ref2$style,
      nodeLabelStyle = _ref2.labelStyle,
      nodeContentStyle = _ref2.contentStyle;
    var mergedSpan = span || 1;
    return React__default.createElement(Col, {
      className: classnames({
        'description-item': true,
        'description-item-horizontal': layout === 'horizontal',
        'description-item-vertical': layout === 'vertical'
      }, nodeClassName),
      style: _extends({
        display: 'flex'
      }, nodeStyle),
      span: diySpan || 24 / column * mergedSpan
    }, React__default.createElement("div", {
      className: classnames({
        'item-label': true,
        'item-label-right': labelAlign === 'right'
      }),
      style: labelWidth ? _extends({}, labelStyle, nodeLabelStyle, {
        width: labelWidth
      }) : _extends({}, labelStyle, nodeLabelStyle)
    }, label), React__default.createElement("div", {
      className: "item-value",
      style: labelWidth ? _extends({}, contentStyle, nodeContentStyle, {
        width: "100% - " + labelWidth
      }) : _extends({}, contentStyle, nodeContentStyle)
    }, isEmpty(nodeChildren) ? emptyValue : nodeChildren));
  }))));
}
Descriptions.Item = DescriptionsItem;

var DragHandle = SortableHandle(function () {
  return React__default.createElement("i", {
    className: "iconfont spicon-drag2 f-drag-list-item-icon"
  });
});
var SortContainer = SortableContainer(function (props) {
  return React__default.createElement("div", Object.assign({
    className: "f-drag-list"
  }, props));
});
var DragList = (function (_ref) {
  var _ref$list = _ref.list,
    list = _ref$list === void 0 ? [] : _ref$list,
    onChange = _ref.onChange,
    _onClick = _ref.onClick,
    defaultActiveKey = _ref.defaultActiveKey,
    _ref$showIcon = _ref.showIcon,
    showIcon = _ref$showIcon === void 0 ? true : _ref$showIcon;
  var _useState = useState(defaultActiveKey),
    activeKey = _useState[0],
    setActiveKey = _useState[1];
  var _useState2 = useState([].concat(list)),
    innerList = _useState2[0],
    setInnerList = _useState2[1];
  var SortableItem = SortableElement(function (props) {
    return React__default.createElement("div", Object.assign({
      className: "f-drag-list-item"
    }, props, {
      onClick: function onClick(e) {
        setActiveKey(props.value.key);
        _onClick === null || _onClick === void 0 ? void 0 : _onClick(props.value, e);
      }
    }));
  });
  useEffect(function () {
    setInnerList([].concat(list));
  }, [list]);
  var onSortEnd = function onSortEnd(_ref2) {
    var oldIndex = _ref2.oldIndex,
      newIndex = _ref2.newIndex;
    if (oldIndex !== newIndex) {
      var newData = arrayMove([].concat(innerList), oldIndex, newIndex);
      setInnerList([].concat(newData));
      onChange === null || onChange === void 0 ? void 0 : onChange(newData);
    }
  };
  return React__default.createElement("div", {
    className: "f-drag-list"
  }, React__default.createElement(SortContainer, {
    distance: 1,
    onSortEnd: onSortEnd,
    helperClass: "f-drag-item-dragging"
  }, innerList.map(function (i, index) {
    return React__default.createElement(SortableItem, {
      index: index,
      key: i.key,
      value: i
    }, React__default.createElement(Space, null, showIcon && React__default.createElement(DragHandle, null), React__default.createElement("div", {
      className: activeKey === i.key ? 'f-drag-list-item-active-label' : 'f-drag-list-item-label'
    }, i.label)));
  })));
});

var TabOrderContext = React__default.createContext({
  orderItems: [],
  setOrder: function setOrder() {}
});

var _excluded$5 = ["items", "enableRightClick", "onChange", "closeTabs", "onItemsChange"];
var type = 'DraggableTabNode';
var DraggableTabNode = function DraggableTabNode(_ref) {
  var index = _ref.index,
    children = _ref.children,
    moveNode = _ref.moveNode;
  var ref = useRef(null);
  var _useState = useState(''),
    hoverClass = _useState[0],
    setHoverClass = _useState[1];
  var _useContext = useContext(TabOrderContext),
    orderItems = _useContext.orderItems;
  var _useState2 = useState(''),
    shift = _useState2[0],
    setShift = _useState2[1];
  var _useDrop = useDrop({
      accept: type,
      hover: function hover(item, monitor) {
        if (!ref.current) {
          return;
        }
        var dragKey = item.index;
        var hoverKey = index;
        var dragIndex = orderItems.findIndex(function (it) {
          return it.key === dragKey;
        });
        var hoverIndex = orderItems.findIndex(function (it) {
          return it.key === hoverKey;
        });
        if (dragIndex === hoverIndex) {
          return;
        }
        if (dragIndex < hoverIndex) {
          setShift('moveForward');
        } else {
          setShift('moveBackward');
        }
      },
      drop: function drop(item) {
        moveNode(item.index, index);
        setShift('');
      },
      collect: function collect(monitor) {
        return {
          isOver: monitor.isOver({
            shallow: true
          })
        };
      }
    }),
    isOver = _useDrop[0].isOver,
    drop = _useDrop[1];
  var _useDrag = useDrag({
      type: type,
      item: {
        index: index
      },
      collect: function collect(monitor) {
        return {
          isDragging: monitor.isDragging()
        };
      }
    }),
    isDragging = _useDrag[0].isDragging,
    drag = _useDrag[1];
  drag(drop(ref));
  useLayoutEffect(function () {
    if (!isOver) {
      setHoverClass('');
      return;
    }
    var hoverClasses = [];
    if (isOver) {
      hoverClasses.push('slick-form-dropping');
    }
    if (shift === 'moveForward') {
      hoverClasses.push('slick-form-tabShiftRight');
    } else if (shift === 'moveBackward') {
      hoverClasses.push('slick-form-tabShiftLeft');
    }
    setHoverClass(hoverClasses.join(' '));
  }, [isOver, isDragging, shift]);
  return React__default.createElement("div", {
    ref: ref,
    className: hoverClass,
    style: {
      marginRight: 8
    }
  }, children);
};
var DraggableTabs = function DraggableTabs(props) {
  var _items$;
  var _props$items = props.items,
    items = _props$items === void 0 ? [] : _props$items,
    onChange = props.onChange,
    closeTabs = props.closeTabs,
    onItemsChange = props.onItemsChange,
    otherProps = _objectWithoutPropertiesLoose(props, _excluded$5);
  var _useState3 = useState(items.map(function (item) {
      return item.key;
    })),
    order = _useState3[0],
    setOrder = _useState3[1];
  var _useState4 = useState(items === null || items === void 0 ? void 0 : (_items$ = items[0]) === null || _items$ === void 0 ? void 0 : _items$.key),
    currentActiveKey = _useState4[0],
    setCurrentActiveKey = _useState4[1];
  var inControl = ('activeKey' in otherProps);
  var realActiveKey = inControl ? otherProps === null || otherProps === void 0 ? void 0 : otherProps.activeKey : currentActiveKey;
  useEffect(function () {
    var newOrder = items.map(function (item) {
      return item.key;
    }).filter(function (key) {
      return order.includes(key) || !order.includes(key);
    });
    setOrder(newOrder);
  }, [items]);
  var onTabClick = function onTabClick(key) {
    onChange === null || onChange === void 0 ? void 0 : onChange(key);
    if (!inControl) {
      setCurrentActiveKey(key);
    }
  };
  var moveTabNode = function moveTabNode(dragKey, hoverKey) {
    setOrder(function (prevOrder) {
      var newOrder = [].concat(prevOrder);
      var dragIndex = newOrder.indexOf(dragKey);
      var hoverIndex = newOrder.indexOf(hoverKey);
      if (dragIndex !== -1 && hoverIndex !== -1) {
        newOrder.splice(dragIndex, 1);
        newOrder.splice(hoverIndex, 0, dragKey);
      } else if (dragIndex === -1 && hoverIndex !== -1) {
        newOrder.splice(hoverIndex, 0, dragKey);
      } else if (dragIndex !== -1 && hoverIndex === -1) {
        newOrder.splice(dragIndex, 1);
      } else {
        console.log('特殊情况，需要根据应用需求来定义处理方式');
      }
      return newOrder;
    });
  };
  var renderTabBar = function renderTabBar(tabBarProps, DefaultTabBar) {
    return React__default.createElement(DefaultTabBar, Object.assign({}, tabBarProps), function (node) {
      var currentIndex = order.indexOf(node.key);
      var menu = [{
        label: '关闭左侧',
        key: 'closeLeft',
        disabled: currentIndex === 0
      }, {
        label: '关闭右侧',
        key: 'closeRight',
        disabled: currentIndex === orderItems.length - 1
      }, {
        label: '关闭其他',
        key: 'closeOthers',
        disabled: orderItems.length === 1
      }, {
        label: '关闭全部',
        key: 'closeAll'
      }];
      var handleMenuClick = function handleMenuClick(_ref2) {
        var key = _ref2.key;
        var rightClickKey = orderItems[currentIndex];
        var handleClosingTabs = function handleClosingTabs(keysToClose) {
          closeTabs === null || closeTabs === void 0 ? void 0 : closeTabs(keysToClose);
        };
        var updateActiveTabIfNeeded = function updateActiveTabIfNeeded(nextActiveKey) {
          onChange === null || onChange === void 0 ? void 0 : onChange(nextActiveKey);
          if (!inControl) {
            setCurrentActiveKey(nextActiveKey);
          }
        };
        if (key === 'closeLeft' || key === 'closeRight') {
          var tabsToClose = orderItems.filter(function (item, index) {
            return key === 'closeLeft' ? index < currentIndex : index > currentIndex;
          }).map(function (item) {
            return item.key;
          });
          handleClosingTabs(tabsToClose);
          if (key === 'closeRight') {
            var remainingItems = orderItems.slice(0, currentIndex + 1);
            onItemsChange === null || onItemsChange === void 0 ? void 0 : onItemsChange(remainingItems);
          } else {
            var _remainingItems = orderItems.slice(currentIndex);
            onItemsChange === null || onItemsChange === void 0 ? void 0 : onItemsChange(_remainingItems);
          }
          if (tabsToClose.includes(realActiveKey)) {
            updateActiveTabIfNeeded(rightClickKey.key);
          }
        }
        if (key === 'closeOthers') {
          var _tabsToClose = orderItems.filter(function (item) {
            return item.key !== rightClickKey.key;
          }).map(function (item) {
            return item.key;
          });
          handleClosingTabs(_tabsToClose);
          onItemsChange === null || onItemsChange === void 0 ? void 0 : onItemsChange([rightClickKey]);
          updateActiveTabIfNeeded(rightClickKey.key);
        }
        if (key === 'closeAll') {
          var _tabsToClose2 = orderItems.map(function (item) {
            return item.key;
          });
          handleClosingTabs(_tabsToClose2);
          onItemsChange === null || onItemsChange === void 0 ? void 0 : onItemsChange([]);
          updateActiveTabIfNeeded('');
        }
      };
      return React__default.createElement(DraggableTabNode, {
        key: node.key,
        index: node.key,
        moveNode: moveTabNode
      }, React__default.createElement(Dropdown, {
        menu: {
          items: menu,
          onClick: handleMenuClick
        },
        trigger: ['contextMenu']
      }, node));
    });
  };
  var orderItems = [].concat(items).sort(function (a, b) {
    var orderA = order.indexOf(a.key);
    var orderB = order.indexOf(b.key);
    if (orderA !== -1 && orderB !== -1) {
      return orderA - orderB;
    }
    if (orderA !== -1) {
      return -1;
    }
    if (orderB !== -1) {
      return 1;
    }
    var ia = items.indexOf(a);
    var ib = items.indexOf(b);
    return ia - ib;
  });
  var remove = function remove(targetKey) {
    var targetIndex = orderItems.findIndex(function (pane) {
      return pane.key === targetKey;
    });
    var newPanes = orderItems.filter(function (pane) {
      return pane.key !== targetKey;
    });
    if (newPanes.length && targetKey === realActiveKey) {
      var key = newPanes[targetIndex === newPanes.length ? targetIndex - 1 : targetIndex].key;
      onChange === null || onChange === void 0 ? void 0 : onChange(key);
      if (!inControl) {
        setCurrentActiveKey(key);
      }
    }
    closeTabs === null || closeTabs === void 0 ? void 0 : closeTabs([targetKey]);
    onItemsChange === null || onItemsChange === void 0 ? void 0 : onItemsChange(newPanes);
  };
  var onEdit = function onEdit(targetKey, action) {
    if (action === 'remove') {
      remove(targetKey);
    }
  };
  return React__default.createElement(DndProvider, {
    backend: HTML5Backend
  }, React__default.createElement(TabOrderContext.Provider, {
    value: {
      orderItems: orderItems,
      setOrder: setOrder
    }
  }, React__default.createElement(Tabs, Object.assign({
    hideAdd: true,
    activeKey: realActiveKey,
    type: "editable-card",
    renderTabBar: renderTabBar,
    onTabClick: onTabClick,
    onEdit: onEdit
  }, otherProps, {
    items: orderItems
  }))));
};

var Ellipsis = function Ellipsis(_ref) {
  var children = _ref.children;
  return React__default.createElement("div", {
    className: "slick-form-ellipsis-wrap"
  }, React__default.createElement("span", {
    className: "txt"
  }, children), React__default.createElement("span", {
    className: "title",
    title: children
  }, children));
};

var _excluded$6 = ["readOnlyEmptyValueNode"];
var queryLoop = function queryLoop(data, value, fieldNames, labels, level) {
  if (fieldNames === void 0) {
    fieldNames = {
      value: 'value',
      label: 'label',
      children: 'children'
    };
  }
  if (labels === void 0) {
    labels = [];
  }
  if (level === void 0) {
    level = 0;
  }
  data.forEach(function (item) {
    if (item[fieldNames.value] === (value === null || value === void 0 ? void 0 : value[level])) {
      labels.push(item[fieldNames.label]);
      if (Array.isArray(item[fieldNames.children])) {
        queryLoop(item[fieldNames.children], value, fieldNames, labels, level + 1);
      }
    }
  });
};
var __Cascader__ = function __Cascader__(_ref) {
  var readOnlyEmptyValueNode = _ref.readOnlyEmptyValueNode,
    props = _objectWithoutPropertiesLoose(_ref, _excluded$6);
  if (props.readOnly) {
    var labels = [];
    queryLoop(props === null || props === void 0 ? void 0 : props.options, props.value, props.fieldNames, labels);
    return React__default.createElement("span", {
      className: "ant-cascader-readonly"
    }, labels.join('/') || readOnlyEmptyValueNode);
  }
  return React__default.createElement(Cascader, Object.assign({}, props));
};
__Cascader__.displayName = 'Cascader';

var AsyncCascader = function AsyncCascader(props) {
  var _props$initOptions = props.initOptions,
    initOptions = _props$initOptions === void 0 ? function () {} : _props$initOptions;
  var _useState = useState([]),
    cascaderOptions = _useState[0],
    setOptions = _useState[1];
  var _useState2 = useState(false),
    loading = _useState2[0],
    setLoading = _useState2[1];
  var init = function init() {
    try {
      var _exit = false;
      return Promise.resolve(_finallyRethrows(function () {
        return _catch(function () {
          var _exit2 = false;
          setLoading(true);
          return function () {
            if (typeof props.options === 'function') {
              var _temp2 = function _temp2(_result) {
                if (_exit) return _result;
                var defaultValue = props.value;
                AsyncOptionsCache[props.id] = props.options(defaultValue, props.form);
                return Promise.resolve(AsyncOptionsCache[props.id]).then(function (_AsyncOptionsCache$pr2) {
                  setOptions(_AsyncOptionsCache$pr2);
                });
              };
              var _temp = function () {
                if (AsyncOptionsCache[props.id]) {
                  return Promise.resolve(AsyncOptionsCache[props.id]).then(function (_AsyncOptionsCache$pr) {
                    var _setOptions = setOptions(_AsyncOptionsCache$pr);
                    _exit = true;
                    return _setOptions;
                  });
                }
              }();
              return _temp && _temp.then ? _temp.then(_temp2) : _temp2(_temp);
            } else return function () {
              if (typeof initOptions === 'function') {
                var _temp4 = function _temp4(_result3) {
                  if (_exit2) return _result3;
                  var defaultValue = props.value;
                  AsyncOptionsCache[props.id] = initOptions(defaultValue, props.form);
                  return Promise.resolve(AsyncOptionsCache[props.id]).then(function (_AsyncOptionsCache$pr4) {
                    setOptions(_AsyncOptionsCache$pr4);
                  });
                };
                var _temp3 = function () {
                  if (AsyncOptionsCache[props.id]) {
                    return Promise.resolve(AsyncOptionsCache[props.id]).then(function (_AsyncOptionsCache$pr3) {
                      var _setOptions2 = setOptions(_AsyncOptionsCache$pr3);
                      _exit2 = true;
                      return _setOptions2;
                    });
                  }
                }();
                return _temp3 && _temp3.then ? _temp3.then(_temp4) : _temp4(_temp3);
              } else {
                console.warn(props.name + " \u8BBE\u7F6E\u7684options\u4E0D\u662F\u4E00\u4E2Afunction");
              }
            }();
          }();
        }, function (error) {
          setOptions([]);
          console.error('error->', error);
        });
      }, function (_wasThrown, _result5) {
        setLoading(false);
        if (_wasThrown) throw _result5;
        return _result5;
      }));
    } catch (e) {
      return Promise.reject(e);
    }
  };
  useEffect(function () {
    init();
    return function () {
      setOptions([]);
    };
  }, []);
  var loadData = function loadData(selectedOptions) {
    try {
      var targetOption = selectedOptions[selectedOptions.length - 1];
      targetOption.loading = true;
      var _temp5 = function () {
        if (typeof props.loadData === 'function') {
          return Promise.resolve(props.loadData(targetOption, props.form)).then(function (children) {
            targetOption.loading = false;
            targetOption.children = children;
            AsyncOptionsCache[props.id] = cascaderOptions;
            setOptions([].concat(cascaderOptions));
          });
        }
      }();
      return Promise.resolve(_temp5 && _temp5.then ? _temp5.then(function () {}) : void 0);
    } catch (e) {
      return Promise.reject(e);
    }
  };
  var _props = {};
  Object.keys(props).forEach(function (key) {
    if (!['initOptions'].includes(key)) {
      _props[key] = props[key];
    }
  });
  return loading ? React__default.createElement("i", {
    className: "iconfont spicon-loading"
  }) : React__default.createElement(__Cascader__, Object.assign({}, _props, {
    options: cascaderOptions,
    loadData: loadData
  }));
};
AsyncCascader.displayName = 'AsyncCascader';

var _excluded$7 = ["showCheckAll"];
var CheckGroupAll = (function (_ref) {
  var showCheckAll = _ref.showCheckAll,
    props = _objectWithoutPropertiesLoose(_ref, _excluded$7);
  var onChange = function onChange(list) {
    props.onChange(list);
  };
  var onCheckAllChange = function onCheckAllChange(e) {
    if (e.target.checked) {
      props.onChange(props.options.map(function (i) {
        return i.value;
      }));
    } else {
      props.onChange([]);
    }
  };
  var isCheckAll = useMemo$1(function () {
    var _props$value, _props$value2;
    return !!((_props$value = props.value) === null || _props$value === void 0 ? void 0 : _props$value.length) && ((_props$value2 = props.value) === null || _props$value2 === void 0 ? void 0 : _props$value2.length) === props.options.length;
  }, [props.value, props.options]);
  var isIndeterminate = useMemo$1(function () {
    var _props$value3, _props$value4;
    return !!((_props$value3 = props.value) === null || _props$value3 === void 0 ? void 0 : _props$value3.length) && ((_props$value4 = props.value) === null || _props$value4 === void 0 ? void 0 : _props$value4.length) < props.options.length;
  }, [props.value, props.options]);
  return React__default.createElement(Space, {
    direction: "vertical"
  }, React__default.createElement("div", {
    className: "slick-form-check-group-all"
  }, React__default.createElement(Checkbox, {
    indeterminate: isIndeterminate,
    onChange: onCheckAllChange,
    checked: isCheckAll
  }, typeof showCheckAll === 'object' ? showCheckAll.text || '全选' : '全选')), React__default.createElement(Checkbox.Group, Object.assign({}, props, {
    onChange: onChange
  })));
});

var _excluded$8 = ["readOnlyEmptyValueNode", "showCheckAll"];
var CheckGroup = function CheckGroup(_ref) {
  var readOnlyEmptyValueNode = _ref.readOnlyEmptyValueNode,
    _ref$showCheckAll = _ref.showCheckAll,
    showCheckAll = _ref$showCheckAll === void 0 ? false : _ref$showCheckAll,
    props = _objectWithoutPropertiesLoose(_ref, _excluded$8);
  if (props.readOnly) {
    var _props$options;
    var labels = (props === null || props === void 0 ? void 0 : (_props$options = props.options) === null || _props$options === void 0 ? void 0 : _props$options.filter(function (i) {
      var _props$value;
      return props === null || props === void 0 ? void 0 : (_props$value = props.value) === null || _props$value === void 0 ? void 0 : _props$value.includes(i.value);
    }).map(function (i) {
      return i.label;
    })) || [];
    return React__default.createElement("span", {
      className: "ant-checkbox-readonly"
    }, labels.join('、') || readOnlyEmptyValueNode);
  }
  return showCheckAll ? React__default.createElement(CheckGroupAll, Object.assign({}, props, {
    showCheckAll: showCheckAll
  })) : React__default.createElement(Checkbox.Group, Object.assign({}, props));
};
CheckGroup.displayName = 'CheckGroup';

var _excluded$9 = ["emptyDescription", "openOptionsCache"];
var AsyncComponent = (function (Component) {
  return function (_ref) {
    var emptyDescription = _ref.emptyDescription,
      _ref$openOptionsCache = _ref.openOptionsCache,
      openOptionsCache = _ref$openOptionsCache === void 0 ? true : _ref$openOptionsCache,
      props = _objectWithoutPropertiesLoose(_ref, _excluded$9);
    var _useState = useState([]),
      options = _useState[0],
      setOptions = _useState[1];
    var _useState2 = useState(false),
      loading = _useState2[0],
      setLoading = _useState2[1];
    var init = function init() {
      try {
        var _exit = false;
        return Promise.resolve(_finallyRethrows(function () {
          return _catch(function () {
            setLoading(true);
            return function () {
              if (typeof props.options === 'function') {
                var _temp2 = function _temp2(_result) {
                  if (_exit) return _result;
                  AsyncOptionsCache[props.id] = props.options(props.form);
                  return Promise.resolve(AsyncOptionsCache[props.id]).then(function (_AsyncOptionsCache$pr2) {
                    setOptions(_AsyncOptionsCache$pr2);
                  });
                };
                var _temp = function () {
                  if (AsyncOptionsCache[props.id] && openOptionsCache) {
                    return Promise.resolve(AsyncOptionsCache[props.id]).then(function (_AsyncOptionsCache$pr) {
                      var _setOptions = setOptions(_AsyncOptionsCache$pr);
                      _exit = true;
                      return _setOptions;
                    });
                  }
                }();
                return _temp && _temp.then ? _temp.then(_temp2) : _temp2(_temp);
              } else {
                console.warn(props.name + " \u8BBE\u7F6E\u7684options\u4E0D\u662F\u4E00\u4E2Afunction");
              }
            }();
          }, function (error) {
            setOptions([]);
            console.error('error->', error);
          });
        }, function (_wasThrown, _result3) {
          setLoading(false);
          if (_wasThrown) throw _result3;
          return _result3;
        }));
      } catch (e) {
        return Promise.reject(e);
      }
    };
    useEffect(function () {
      init();
      return function () {
        setOptions([]);
      };
    }, []);
    return Component.displayName === 'Select' ? React__default.createElement(Component, Object.assign({}, props, {
      loading: loading,
      value: loading ? [] : props.value,
      notFoundContent: loading ? React__default.createElement(Spin, {
        size: "small"
      }) : React__default.createElement(Empty, {
        image: Empty.PRESENTED_IMAGE_SIMPLE,
        description: emptyDescription
      }),
      options: options
    })) : loading ? React__default.createElement("i", {
      className: "iconfont spicon-loading"
    }) : (options === null || options === void 0 ? void 0 : options.length) > 0 ? React__default.createElement(Component, Object.assign({}, props, {
      options: options
    })) : !props.readOnly && React__default.createElement(Empty, {
      image: Empty.PRESENTED_IMAGE_SIMPLE,
      description: emptyDescription
    });
  };
});

var AsyncCheckGroup = AsyncComponent(CheckGroup);
AsyncCheckGroup.displayName = 'AsyncCheckGroup';

var _excluded$a = ["readOnlyEmptyValueNode"];
var RadioGroup = function RadioGroup(_ref) {
  var readOnlyEmptyValueNode = _ref.readOnlyEmptyValueNode,
    props = _objectWithoutPropertiesLoose(_ref, _excluded$a);
  if (props.readOnly) {
    var _props$options;
    var option = props === null || props === void 0 ? void 0 : (_props$options = props.options) === null || _props$options === void 0 ? void 0 : _props$options.find(function (i) {
      return i.value === props.value;
    });
    return React__default.createElement("span", {
      className: "ant-radio-readonly"
    }, (option === null || option === void 0 ? void 0 : option.label) || readOnlyEmptyValueNode);
  }
  return React__default.createElement(Radio.Group, Object.assign({}, props));
};
RadioGroup.displayName = 'RadioGroup';

var AsyncRadioGroup = AsyncComponent(RadioGroup);
AsyncRadioGroup.displayName = 'AsyncRadioGroup';

var AsyncRender = (function (props) {
  var _useState = useState(false),
    loading = _useState[0],
    setLoading = _useState[1];
  if (typeof props.render !== 'function') {
    return null;
  }
  var asyncJsx = useMemo$1(function () {
    return props.render(props.form);
  }, []);
  var _useState2 = useState(''),
    vnode = _useState2[0],
    setVnode = _useState2[1];
  var init = function init() {
    try {
      setLoading(true);
      return Promise.resolve(asyncJsx).then(function (_asyncJsx) {
        setVnode(_asyncJsx);
        setLoading(false);
      });
    } catch (e) {
      return Promise.reject(e);
    }
  };
  useEffect(function () {
    init();
  }, []);
  var Spin = useMemo$1(function () {
    return props.spin ? React__default.createElement("i", {
      className: "iconfont spicon-loading"
    }) : React__default.createElement("div", null);
  }, []);
  return loading ? Spin : vnode || null;
});

var _excluded$b = ["fieldNames", "readOnlyEmptyValueNode", "autoFilterRepeatValue"];
var __Select__ = function __Select__(_ref) {
  var _ref$fieldNames = _ref.fieldNames,
    fieldNames = _ref$fieldNames === void 0 ? {
      value: 'value',
      label: 'label'
    } : _ref$fieldNames,
    readOnlyEmptyValueNode = _ref.readOnlyEmptyValueNode,
    _ref$autoFilterRepeat = _ref.autoFilterRepeatValue,
    autoFilterRepeatValue = _ref$autoFilterRepeat === void 0 ? false : _ref$autoFilterRepeat,
    props = _objectWithoutPropertiesLoose(_ref, _excluded$b);
  if (props.readOnly) {
    var _props$options;
    var values = Array.isArray(props.value) ? props.value : [props.value];
    var labels = (props === null || props === void 0 ? void 0 : (_props$options = props.options) === null || _props$options === void 0 ? void 0 : _props$options.filter(function (i) {
      return values.includes(i[fieldNames.value]);
    }).map(function (i) {
      return i[fieldNames.label];
    })) || [];
    return React__default.createElement("span", {
      className: "ant-select-readonly"
    }, labels.join('、') || readOnlyEmptyValueNode);
  }
  return React__default.createElement(Select, Object.assign({}, props, {
    options: autoFilterRepeatValue ? optionsValueUnique(props === null || props === void 0 ? void 0 : props.options, fieldNames.value) : props === null || props === void 0 ? void 0 : props.options,
    fieldNames: fieldNames
  }));
};
__Select__.displayName = 'Select';

var AsyncSelect = AsyncComponent(__Select__);
AsyncSelect.displayName = 'AsyncSelect';

var _excluded$c = ["readOnlyEmptyValueNode", "options"];
var queryLoop$1 = function queryLoop(data, value, fieldNames, labels) {
  if (fieldNames === void 0) {
    fieldNames = {
      value: 'value',
      label: 'title',
      children: 'children'
    };
  }
  if (labels === void 0) {
    labels = [];
  }
  data.some(function (item) {
    if (item[fieldNames.value] === value) {
      labels.push(item[fieldNames.label]);
      return true;
    } else if (Array.isArray(item[fieldNames.children])) {
      queryLoop(item[fieldNames.children], value, fieldNames, labels);
    }
    return false;
  });
};
var __TreeSelect__ = function __TreeSelect__(_ref) {
  var readOnlyEmptyValueNode = _ref.readOnlyEmptyValueNode,
    props = _objectWithoutPropertiesLoose(_ref, _excluded$c);
  if (props.readOnly) {
    var labels = [];
    queryLoop$1(props === null || props === void 0 ? void 0 : props.treeData, props.value, props.fieldNames, labels);
    return React__default.createElement("span", {
      className: "ant-tree-select-readonly"
    }, labels.join('、') || readOnlyEmptyValueNode);
  }
  return React__default.createElement(TreeSelect, Object.assign({}, props));
};
__TreeSelect__.displayName = 'TreeSelect';

var AsyncTreeSelect = function AsyncTreeSelect(props) {
  var _useState = useState([]),
    options = _useState[0],
    setOptions = _useState[1];
  var _useState2 = useState(false),
    loading = _useState2[0],
    setLoading = _useState2[1];
  var init = function init() {
    try {
      var _exit = false;
      return Promise.resolve(_finallyRethrows(function () {
        return _catch(function () {
          setLoading(true);
          return function () {
            if (typeof props.options === 'function') {
              var _temp2 = function _temp2(_result) {
                if (_exit) return _result;
                AsyncOptionsCache[props.id] = props.options(props.form);
                return Promise.resolve(AsyncOptionsCache[props.id]).then(function (_AsyncOptionsCache$pr2) {
                  setOptions(_AsyncOptionsCache$pr2);
                });
              };
              var _temp = function () {
                if (AsyncOptionsCache[props.id]) {
                  return Promise.resolve(AsyncOptionsCache[props.id]).then(function (_AsyncOptionsCache$pr) {
                    var _setOptions = setOptions(_AsyncOptionsCache$pr);
                    _exit = true;
                    return _setOptions;
                  });
                }
              }();
              return _temp && _temp.then ? _temp.then(_temp2) : _temp2(_temp);
            } else {
              console.warn(props.name + " \u8BBE\u7F6E\u7684options\u4E0D\u662F\u4E00\u4E2Afunction");
            }
          }();
        }, function (error) {
          setOptions([]);
          console.error('error->', error);
        });
      }, function (_wasThrown, _result3) {
        setLoading(false);
        if (_wasThrown) throw _result3;
        return _result3;
      }));
    } catch (e) {
      return Promise.reject(e);
    }
  };
  useEffect(function () {
    init();
    return function () {
      setOptions([]);
    };
  }, []);
  return loading ? React__default.createElement("i", {
    className: "iconfont spicon-loading"
  }) : React__default.createElement(__TreeSelect__, Object.assign({}, props, {
    value: loading ? [] : props.value,
    notFoundContent: loading ? React__default.createElement(Spin, {
      size: "small"
    }) : React__default.createElement(Empty, {
      image: Empty.PRESENTED_IMAGE_SIMPLE
    }),
    treeData: options
  }));
};
AsyncTreeSelect.displayName = 'AsyncTreeSelect';

var BlockQuote = function BlockQuote(_ref) {
  var title = _ref.title,
    subTitle = _ref.subTitle,
    _ref$label = _ref.label,
    label = _ref$label === void 0 ? title : _ref$label,
    _ref$subLabel = _ref.subLabel,
    subLabel = _ref$subLabel === void 0 ? subTitle : _ref$subLabel,
    _ref$style = _ref.style,
    style = _ref$style === void 0 ? {} : _ref$style;
  return React__default.createElement("div", {
    className: "slick-form-block-quote",
    style: style
  }, label, subLabel && React__default.createElement("div", {
    className: "slick-form-block-quote-sub"
  }, subLabel));
};
BlockQuote.displayName = 'BlockQuote';

var _excluded$d = ["value", "onChange"];
var DateTimeHabit = (function (_ref) {
  var value = _ref.value,
    onChange = _ref.onChange,
    props = _objectWithoutPropertiesLoose(_ref, _excluded$d);
  var _useState = useState(value.date),
    date = _useState[0],
    setDate = _useState[1];
  var _useState2 = useState(value.time),
    time = _useState2[0],
    setTime = _useState2[1];
  var first = useRef(true);
  useEffect(function () {
    if (!first.current) {
      onChange({
        date: date,
        time: time
      });
    } else {
      first.current = false;
    }
  }, [date, time]);
  return React__default.createElement(Space, null, React__default.createElement(DatePicker, {
    value: value === null || value === void 0 ? void 0 : value.date,
    onChange: function onChange(v) {
      setDate(v);
    },
    placeholder: "\u8BF7\u9009\u62E9\u65E5\u671F"
  }), React__default.createElement(Select, {
    value: value === null || value === void 0 ? void 0 : value.time,
    onChange: function onChange(v) {
      setTime(v || null);
    },
    style: {
      width: 150
    },
    allowClear: true,
    options: props.options,
    placeholder: "\u8BF7\u9009\u62E9\u65F6\u95F4\u70B9"
  }));
});

var _excluded$e = ["fetchOptions", "debounceTimeout", "onChange"];
var DebounceSelect = function DebounceSelect(_ref) {
  var fetchOptions = _ref.fetchOptions,
    _ref$debounceTimeout = _ref.debounceTimeout,
    debounceTimeout = _ref$debounceTimeout === void 0 ? 800 : _ref$debounceTimeout,
    _onChange = _ref.onChange,
    props = _objectWithoutPropertiesLoose(_ref, _excluded$e);
  var _useState = useState([]),
    options = _useState[0],
    setOptions = _useState[1];
  var _useState2 = useState(false),
    loading = _useState2[0],
    setLoading = _useState2[1];
  var fetchRef = useRef(0);
  var optionsCacheRef = useRef();
  var init = function init() {
    try {
      return Promise.resolve(_finallyRethrows(function () {
        return _catch(function () {
          setLoading(true);
          var _temp = function () {
            if (typeof fetchOptions === 'function') {
              if (!AsyncOptionsCache[props.id]) {
                AsyncOptionsCache[props.id] = fetchOptions('', props.form);
              }
              return Promise.resolve(AsyncOptionsCache[props.id]).then(function (_options) {
                optionsCacheRef.current = _options;
                setOptions(_options);
              });
            } else {
              console.warn(props.name + " \u8BBE\u7F6E\u7684fetchOptions\u4E0D\u662F\u4E00\u4E2Afunction");
            }
          }();
          if (_temp && _temp.then) return _temp.then(function () {});
        }, function (error) {
          setOptions([]);
          console.error('error->', error);
        });
      }, function (_wasThrown, _result) {
        setLoading(false);
        if (_wasThrown) throw _result;
        return _result;
      }));
    } catch (e) {
      return Promise.reject(e);
    }
  };
  useEffect(function () {
    init();
    return function () {
      setOptions([]);
    };
  }, []);
  var debounceFetcher = useMemo$1(function () {
    var loadOptions = function loadOptions(value) {
      fetchRef.current += 1;
      var fetchId = fetchRef.current;
      setOptions([]);
      setLoading(true);
      if (isEmpty(value) && optionsCacheRef.current) {
        AsyncOptionsCache[props.id] = optionsCacheRef.current;
        setOptions(optionsCacheRef.current);
        setLoading(false);
      } else {
        fetchOptions(value, props.form).then(function (newOptions) {
          if (isEmpty(optionsCacheRef.current)) {
            optionsCacheRef.current = newOptions;
          }
          if (fetchId !== fetchRef.current) {
            return;
          }
          AsyncOptionsCache[props.id] = newOptions;
          setOptions(newOptions);
          setLoading(false);
        });
      }
    };
    return debounce(loadOptions, debounceTimeout);
  }, [fetchOptions, debounceTimeout]);
  return React__default.createElement(__Select__, Object.assign({}, props, {
    onChange: function onChange(v) {
      if (v) {
        optionsCacheRef.current = options;
      }
      _onChange(v);
    },
    filterOption: false,
    loading: loading,
    value: loading ? [] : props.value,
    onSearch: debounceFetcher,
    notFoundContent: loading ? React__default.createElement(Spin, {
      size: "small"
    }) : React__default.createElement(Empty, {
      image: Empty.PRESENTED_IMAGE_SIMPLE
    }),
    options: options,
    showSearch: true
  }));
};
DebounceSelect.displayName = 'DebounceSelect';

var FieldSet = function FieldSet(_ref) {
  var _ref$style = _ref.style,
    style = _ref$style === void 0 ? {} : _ref$style,
    _ref$children = _ref.children,
    children = _ref$children === void 0 ? React__default.createElement(Empty, {
      image: Empty.PRESENTED_IMAGE_SIMPLE
    }) : _ref$children,
    _ref$label = _ref.label,
    label = _ref$label === void 0 ? '标题' : _ref$label,
    _ref$extra = _ref.extra,
    extra = _ref$extra === void 0 ? null : _ref$extra,
    _ref$subTitle = _ref.subTitle,
    subTitle = _ref$subTitle === void 0 ? '' : _ref$subTitle,
    event = _ref.event,
    effect = _ref.effect,
    fieldName = _ref.fieldName,
    isShow = _ref.isShow,
    form = _ref.form,
    initialValues = _ref.initialValues,
    _ref$className = _ref.className,
    className = _ref$className === void 0 ? '' : _ref$className;
  var _useState = useState(Math.random()),
    reload = _useState[0],
    setReload = _useState[1];
  useEffect(function () {
    var unsubscribe = function unsubscribe() {};
    unsubscribe = event.subscribe(fieldName, function (_ref2) {
      var name = _ref2.name;
      if (name === NOTICESELF || (effect === null || effect === void 0 ? void 0 : effect.includes(name))) {
        setReload(Math.random());
      }
    });
    return function () {
      unsubscribe();
    };
  }, []);
  var vNode = React__default.createElement("div", {
    style: style,
    className: "slick-form-fieldset " + (className || ''),
    key: reload
  }, React__default.createElement("div", {
    className: "slick-form-fieldset-title",
    id: fieldName
  }, React__default.createElement("div", {
    className: "slick-form-fieldset-label"
  }, label, subTitle && React__default.createElement("span", {
    className: "slick-form-fieldset-label-subTitle"
  }, subTitle)), React__default.createElement("div", {
    className: "slick-form-fieldset-extra"
  }, React__default.createElement(Space, null, extra === null || extra === void 0 ? void 0 : extra.map(function (dom) {
    return dom;
  })))), React__default.createElement("div", {
    className: "slick-form-fieldset-content"
  }, children));
  if (typeof isShow === 'function') {
    return isShow(_extends({}, initialValues, form.getFieldsValue())) ? vNode : null;
  }
  return vNode;
};
FieldSet.displayName = 'FieldSet';

var isPopupContainer = function isPopupContainer(type) {
  return ['AsyncSelect', 'AsyncCascader', 'DebounceSelect', 'Select', 'AutoComplete', 'Cascader', 'TreeSelect', 'AsyncTreeSelect', 'DatePicker', 'RangePicker', 'TimeRange', 'TimePicker'].includes(type);
};
var isExpansionItemProps = {
  props: '',
  isShow: '',
  transform: '',
  __parentKey__: '',
  autosearch: '',
  effect: '',
  onEffect: '',
  effectResetField: '',
  effectClearField: '',
  type: '',
  beforeReceive: '',
  span: '',
  itemRender: '',
  required: '',
  readOnly: '',
  disabled: '',
  labelWidth: '',
  nameAlise: '',
  useDefaultRules: ''
};
var isItemProps = _extends({
  colon: '',
  dependencies: '',
  extra: '',
  getValueFromEvent: '',
  getValueProps: '',
  hasFeedback: '',
  help: '',
  hidden: '',
  htmlFor: '',
  initialValue: '',
  label: '',
  labelAlign: '',
  labelCol: '',
  messageVariables: '',
  name: '',
  normalize: '',
  noStyle: '',
  preserve: '',
  required: '',
  rules: '',
  shouldUpdate: '',
  tooltip: '',
  trigger: '',
  validateFirst: '',
  validateStatus: '',
  validateTrigger: '',
  valuePropName: '',
  wrapperCol: ''
}, isExpansionItemProps);
var beforeFieldRender = function beforeFieldRender(field, form) {
  var _field$props, _field$props15;
  var _getGlobalConfigByNam = getGlobalConfigByName('Antd', {}),
    autoValidInputNumber = _getGlobalConfigByNam.autoValidInputNumber,
    autoValidInputLen = _getGlobalConfigByNam.autoValidInputLen,
    _getGlobalConfigByNam2 = _getGlobalConfigByNam.defaultInputMaxLength,
    defaultInputMaxLength = _getGlobalConfigByNam2 === void 0 ? 64 : _getGlobalConfigByNam2,
    autoValidTextAreaLen = _getGlobalConfigByNam.autoValidTextAreaLen,
    autoValidRequiredInputSpace = _getGlobalConfigByNam.autoValidRequiredInputSpace;
  if (typeof field.required === 'function') {
    field.required = field.required(form);
  }
  if (typeof field.disabled === 'function') {
    field.disabled = field.disabled(form);
  }
  if (typeof field.readOnly === 'function') {
    field.readOnly = field.readOnly(form);
  }
  var validInput = field.type === 'Input' && autoValidInputLen && !(field === null || field === void 0 ? void 0 : field.isSearchForm) && (field.required !== true || field.required && autoValidRequiredInputSpace !== true);
  var validTextArea = field.type === 'TextArea' && autoValidTextAreaLen && ((_field$props = field.props) === null || _field$props === void 0 ? void 0 : _field$props.maxLength);
  if (validInput || validTextArea) {
    var _field$props2, _field$props3, _field$rules, _field$useDefaultRule;
    var maxLength = field.type === 'Input' ? ((_field$props2 = field.props) === null || _field$props2 === void 0 ? void 0 : _field$props2.maxLength) || defaultInputMaxLength : (_field$props3 = field.props) === null || _field$props3 === void 0 ? void 0 : _field$props3.maxLength;
    field.rules = Array.isArray(field.rules) ? field.rules : [];
    var defaultRules = [{
      validator: function validator(_, value) {
        if ((value != null ? value : '').length > maxLength) {
          return Promise.reject(new Error("\u6700\u591A\u53EF\u8F93\u5165" + maxLength + "\u5B57"));
        } else {
          return Promise.resolve();
        }
      }
    }];
    if (!(field === null || field === void 0 ? void 0 : (_field$rules = field.rules) === null || _field$rules === void 0 ? void 0 : _field$rules.length)) {
      field.rules = defaultRules;
    } else if ((_field$useDefaultRule = field === null || field === void 0 ? void 0 : field.useDefaultRules) != null ? _field$useDefaultRule : true) {
      field.rules = [].concat(defaultRules, field.rules);
    }
  }
  if (field.type === 'DateTimeHabit') {
    var _field$rules2;
    var _defaultRules = [{
      validator: function validator(rule, value) {
        if (!value.date && !value.time) {
          return Promise.resolve();
        }
        if (!value.date || !value.time) {
          return Promise.reject('日期和时间点必须同时选择');
        }
        return Promise.resolve();
      }
    }];
    if (!(field === null || field === void 0 ? void 0 : (_field$rules2 = field.rules) === null || _field$rules2 === void 0 ? void 0 : _field$rules2.length)) {
      field.rules = _defaultRules;
    }
  }
  if (field.type === 'InputNumber' && autoValidInputNumber && !(field === null || field === void 0 ? void 0 : field.isSearchForm)) {
    var _field$rules3;
    var _field$props4 = field.props,
      min = _field$props4.min,
      max = _field$props4.max,
      _maxLength = _field$props4.maxLength;
    field.rules = Array.isArray(field.rules) ? field.rules : [];
    var _defaultRules2 = [{
      validator: function validator(_, value) {
        if ([undefined, null].includes(value)) {
          return Promise.resolve();
        }
        if (value.toString().length > _maxLength) {
          return Promise.reject(new Error("\u6700\u591A\u53EF\u8F93\u5165" + _maxLength + "\u4F4D"));
        } else if (!isEmpty(min) && value < min) {
          return Promise.reject(new Error("\u8F93\u5165\u503C\u4E0D\u5F97\u5C0F\u4E8E" + min));
        } else if (!isEmpty(max) && value > max) {
          return Promise.reject(new Error("\u8F93\u5165\u503C\u4E0D\u5F97\u5927\u4E8E" + max));
        } else {
          return Promise.resolve();
        }
      }
    }];
    if (!(field === null || field === void 0 ? void 0 : (_field$rules3 = field.rules) === null || _field$rules3 === void 0 ? void 0 : _field$rules3.length)) {
      field.rules = _defaultRules2;
    }
  }
  if (field.required === true) {
    var _field$props6;
    field.rules = Array.isArray(field.rules) ? field.rules : [];
    if (autoValidRequiredInputSpace && field.type === 'Input' && !(field === null || field === void 0 ? void 0 : field.isSearchForm)) {
      var _field$props5, _field$rules4, _field$useDefaultRule2;
      var _maxLength2 = ((_field$props5 = field.props) === null || _field$props5 === void 0 ? void 0 : _field$props5.maxLength) || defaultInputMaxLength;
      if (field === null || field === void 0 ? void 0 : field.isSearchForm) {
        return;
      }
      var _defaultRules3 = [{
        required: true,
        message: field.label + "\u4E0D\u80FD\u4E3A\u7A7A"
      }, {
        validator: function validator(_, value) {
          if (autoValidInputLen && (value != null ? value : '').length > _maxLength2) {
            return Promise.reject(new Error("\u6700\u591A\u53EF\u8F93\u5165" + _maxLength2 + "\u5B57"));
          } else if (new RegExp(/\s+/).test(value != null ? value : '')) {
            return Promise.reject(new Error('请不要输入空格'));
          } else {
            return Promise.resolve();
          }
        }
      }];
      if (!(field === null || field === void 0 ? void 0 : (_field$rules4 = field.rules) === null || _field$rules4 === void 0 ? void 0 : _field$rules4.length)) {
        field.rules = _defaultRules3;
      } else if ((_field$useDefaultRule2 = field === null || field === void 0 ? void 0 : field.useDefaultRules) != null ? _field$useDefaultRule2 : true) {
        field.rules = [].concat(_defaultRules3, field.rules);
      }
    } else if (field.type === 'RangePicker' && ((_field$props6 = field.props) === null || _field$props6 === void 0 ? void 0 : _field$props6.mode) === 'split') {
      var _field$props$canEqual, _field$props7;
      var canEqual = (_field$props$canEqual = (_field$props7 = field.props) === null || _field$props7 === void 0 ? void 0 : _field$props7.canEqual) != null ? _field$props$canEqual : true;
      field.rules.push({
        required: true,
        message: ''
      });
      field.rules.push({
        validator: function validator(_, value) {
          var _ref = value || [],
            start = _ref[0],
            end = _ref[1];
          if (!start || !end) {
            return Promise.reject(new Error((field.label || '') + "\u8D77\u59CB\u548C\u7ED3\u675F\u90FD\u4E0D\u80FD\u4E3A\u7A7A"));
          } else if (canEqual && start && end && dayjs(end).isBefore(dayjs(start))) {
            return Promise.reject(new Error('结束时间不能早于开始时间'));
          } else if (!canEqual && start & end && !dayjs(end).isAfter(dayjs(start))) {
            return Promise.reject(new Error('结束时间需晚于开始时间'));
          }
          return Promise.resolve();
        }
      });
    } else if (field.type === 'RangeInput') {
      field.rules.push({
        required: true,
        message: ''
      });
      field.rules.push({
        validator: function validator(_, value) {
          var _field$props10, _field$props12, _field$props13;
          var _ref2 = value || [],
            start = _ref2[0],
            end = _ref2[1];
          if (!start || !end && start !== 0 && end !== 0) {
            var _field$props8;
            if (field === null || field === void 0 ? void 0 : (_field$props8 = field.props) === null || _field$props8 === void 0 ? void 0 : _field$props8.oneEmptyErrorText) {
              var _field$props9;
              return Promise.reject(new Error(field === null || field === void 0 ? void 0 : (_field$props9 = field.props) === null || _field$props9 === void 0 ? void 0 : _field$props9.oneEmptyErrorText));
            }
            return Promise.reject(new Error((field.label || '') + "\u8D77\u59CB\u548C\u7ED3\u675F\u90FD\u4E0D\u80FD\u4E3A\u7A7A"));
          } else if (!(field === null || field === void 0 ? void 0 : (_field$props10 = field.props) === null || _field$props10 === void 0 ? void 0 : _field$props10.mode) && !isEmpty(start) && !isEmpty(end) && +end < +start) {
            var _field$props11;
            return Promise.reject(new Error((field === null || field === void 0 ? void 0 : (_field$props11 = field.props) === null || _field$props11 === void 0 ? void 0 : _field$props11.invertedErrorText) || '结束不能早于开始'));
          } else if (!(field === null || field === void 0 ? void 0 : (_field$props12 = field.props) === null || _field$props12 === void 0 ? void 0 : _field$props12.mode) && !isEmpty(start) && !isEmpty(end) && (field === null || field === void 0 ? void 0 : (_field$props13 = field.props) === null || _field$props13 === void 0 ? void 0 : _field$props13.notequal) && +end === +start) {
            var _field$props14;
            return Promise.reject(new Error((field === null || field === void 0 ? void 0 : (_field$props14 = field.props) === null || _field$props14 === void 0 ? void 0 : _field$props14.equalErrorText) || '结束不能等于开始'));
          }
          return Promise.resolve();
        }
      });
    } else {
      field.rules.push({
        required: true,
        message: (field.label || '') + "\u4E0D\u80FD\u4E3A\u7A7A"
      });
    }
  }
  if (field === null || field === void 0 ? void 0 : field.isSearchForm) {
    field.props.isSearchForm = true;
  }
  if (!(field === null || field === void 0 ? void 0 : field.required) && field.type === 'RangePicker' && ((_field$props15 = field.props) === null || _field$props15 === void 0 ? void 0 : _field$props15.mode) === 'split') {
    var _field$props$canEqual2, _field$props16;
    var _canEqual = (_field$props$canEqual2 = (_field$props16 = field.props) === null || _field$props16 === void 0 ? void 0 : _field$props16.canEqual) != null ? _field$props$canEqual2 : true;
    field.rules = [{
      required: false,
      validator: function validator(_, value) {
        if (value === void 0) {
          value = [];
        }
        var _value = value,
          start = _value[0],
          end = _value[1];
        if (start && !end || !start && end) {
          return Promise.reject(new Error('请选择完整的时间范围'));
        } else if (_canEqual && start && end && dayjs(end).isBefore(dayjs(start))) {
          return Promise.reject(new Error('结束时间不能早于开始时间'));
        } else if (!_canEqual && start && end && !dayjs(end).isAfter(dayjs(start))) {
          return Promise.reject(new Error('结束时间需晚于开始时间'));
        } else {
          return Promise.resolve();
        }
      }
    }];
  }
  if (!(field === null || field === void 0 ? void 0 : field.required) && field.type === 'RangeInput') {
    field.rules = [{
      required: false,
      validator: function validator(_, value) {
        var _field$props19, _field$props21, _field$props22;
        if (value === void 0) {
          value = [];
        }
        var _value2 = value,
          start = _value2[0],
          end = _value2[1];
        if (start && !end || !start && end) {
          var _field$props17;
          if (field === null || field === void 0 ? void 0 : (_field$props17 = field.props) === null || _field$props17 === void 0 ? void 0 : _field$props17.oneEmptyErrorText) {
            var _field$props18;
            return Promise.reject(new Error(field === null || field === void 0 ? void 0 : (_field$props18 = field.props) === null || _field$props18 === void 0 ? void 0 : _field$props18.oneEmptyErrorText));
          }
          return Promise.reject(new Error('请选择完整的区间范围'));
        } else if (!(field === null || field === void 0 ? void 0 : (_field$props19 = field.props) === null || _field$props19 === void 0 ? void 0 : _field$props19.mode) && !isEmpty(start) && !isEmpty(end) && +end < +start) {
          var _field$props20;
          return Promise.reject(new Error((field === null || field === void 0 ? void 0 : (_field$props20 = field.props) === null || _field$props20 === void 0 ? void 0 : _field$props20.invertedErrorText) || '结束不能早于开始'));
        } else if (!(field === null || field === void 0 ? void 0 : (_field$props21 = field.props) === null || _field$props21 === void 0 ? void 0 : _field$props21.mode) && !isEmpty(start) && !isEmpty(end) && (field === null || field === void 0 ? void 0 : (_field$props22 = field.props) === null || _field$props22 === void 0 ? void 0 : _field$props22.notequal) && +end === +start) {
          var _field$props23;
          return Promise.reject(new Error((field === null || field === void 0 ? void 0 : (_field$props23 = field.props) === null || _field$props23 === void 0 ? void 0 : _field$props23.equalErrorText) || '结束不能等于开始'));
        }
        return Promise.resolve();
      }
    }];
  }
  var pureFields = {};
  Object.keys(field).forEach(function (key) {
    if (!(key in isExpansionItemProps)) {
      pureFields[key] = field[key];
    }
  });
  return pureFields;
};
var splitItemAndFieldProps = function splitItemAndFieldProps(props) {
  var itemProps = {};
  var fieldProps = {};
  Object.keys(props).forEach(function (key) {
    if (key in isItemProps) {
      itemProps[key] = props[key];
    } else {
      fieldProps[key] = props[key];
    }
  });
  return {
    itemProps: itemProps,
    fieldProps: fieldProps
  };
};
var jsxToSchema = function jsxToSchema(children, fields) {
  if (!Array.isArray(children)) {
    children = [children];
  }
  children.filter(function (i) {
    return i !== undefined;
  }).forEach(function (child) {
    var _child$type;
    if (Array.isArray(child)) {
      jsxToSchema(child, fields);
      return;
    }
    if (((_child$type = child.type) === null || _child$type === void 0 ? void 0 : _child$type.displayName) === 'FieldSet') {
      var _child$props;
      var _children = [];
      jsxToSchema((_child$props = child.props) === null || _child$props === void 0 ? void 0 : _child$props.children, _children);
      var _splitItemAndFieldPro = splitItemAndFieldProps(child.props),
        itemProps = _splitItemAndFieldPro.itemProps,
        fieldProps = _splitItemAndFieldPro.fieldProps;
      var field = _extends({
        type: 'FieldSet'
      }, itemProps, {
        props: _extends({}, fieldProps, {
          children: _children
        })
      });
      fields.push(field);
    } else {
      var _child$type2;
      if (typeof child === 'string') {
        return fields.push({
          type: 'Render',
          props: {
            render: function render() {
              return child;
            }
          }
        });
      }
      var type = (_child$type2 = child.type) === null || _child$type2 === void 0 ? void 0 : _child$type2.displayName;
      if (!(type in BuiltInWidgetMapping)) {
        type = 'Render';
      }
      var _splitItemAndFieldPro2 = splitItemAndFieldProps(child === null || child === void 0 ? void 0 : child.props),
        _itemProps = _splitItemAndFieldPro2.itemProps,
        _fieldProps = _splitItemAndFieldPro2.fieldProps;
      var _field = _extends({
        type: type
      }, _itemProps, {
        props: _extends({}, _fieldProps)
      });
      if (_field.type === 'Render') {
        _field.props.render = function (props) {
          return _extends({}, child, {
            props: _extends({}, child.props, props)
          });
        };
      }
      delete _field.children;
      fields.push(_field);
    }
  });
};
var scrollToElement = function scrollToElement(container, childNode, gap) {
  if (gap === void 0) {
    gap = 50;
  }
  if (childNode) {
    if (typeof Element.prototype.scrollIntoView === 'function') {
      childNode.scrollIntoView({
        behavior: 'smooth',
        block: 'center'
      });
    } else {
      container.scrollTo({
        top: childNode.offsetTop - container.offsetTop - gap,
        behavior: 'smooth'
      });
    }
  }
};

var Item = (function (_ref) {
  var _ref$field = _ref.field,
    field = _ref$field === void 0 ? {} : _ref$field,
    form = _ref.form,
    initialValues = _ref.initialValues,
    _ref$onChange = _ref.onChange,
    onChange = _ref$onChange === void 0 ? function () {} : _ref$onChange,
    disabled = _ref.disabled,
    readOnly = _ref.readOnly,
    event = _ref.event,
    _ref$className = _ref.className,
    className = _ref$className === void 0 ? (field === null || field === void 0 ? void 0 : field.className) || '' : _ref$className,
    fieldKey = _ref.fieldKey,
    _ref$widgets = _ref.widgets,
    widgets = _ref$widgets === void 0 ? {} : _ref$widgets,
    _ref$formListName = _ref.formListName,
    formListName = _ref$formListName === void 0 ? '' : _ref$formListName,
    actionRef = _ref.actionRef,
    _ref$readOnlyEmptyVal = _ref.readOnlyEmptyValueNode,
    readOnlyEmptyValueNode = _ref$readOnlyEmptyVal === void 0 ? '-' : _ref$readOnlyEmptyVal,
    _ref$readOnlyClean = _ref.readOnlyClean,
    readOnlyClean = _ref$readOnlyClean === void 0 ? false : _ref$readOnlyClean;
  var _useState = useState(field),
    innerField = _useState[0],
    setInnerField = _useState[1];
  useEffect(function () {
    if (!formListName) {
      setInnerField(field);
    }
  }, [field]);
  var _field = useMemo$1(function () {
    return cloneDeep(innerField);
  }, [innerField]);
  var mergeField = useCallback(function (newField, customizer) {
    setInnerField(_extends({}, mergeWith(innerField, newField, customizer)));
    setReload(Math.random());
  }, []);
  var _useState2 = useState(Math.random()),
    reload = _useState2[0],
    setReload = _useState2[1];
  var touchEffect = useCallback(function (item, triggerField) {
    var _field$effectResetFie, _field$onEffect;
    var name = Array.isArray(item.name) ? [formListName].concat(item.name).filter(function (name) {
      return name !== '';
    }).join('_') : item.name;
    delete AsyncOptionsCache[form.name + "_" + name];
    setTimeout(function () {
      setReload(Math.random());
    });
    if ((_field$effectResetFie = _field.effectResetField) != null ? _field$effectResetFie : true) {
      if (typeof (_field === null || _field === void 0 ? void 0 : _field.effectResetField) === 'boolean' || Array.isArray(_field.effectResetField) && _field.effectResetField.includes(item.name)) {
        form.resetFields([item.name]);
      }
    }
    if (_field.effectClearField === true) {
      var _form$setFieldsValue;
      form.setFieldsValue((_form$setFieldsValue = {}, _form$setFieldsValue[item.name] = undefined, _form$setFieldsValue));
    }
    (_field$onEffect = _field.onEffect) === null || _field$onEffect === void 0 ? void 0 : _field$onEffect.call(_field, triggerField, form);
  }, []);
  useEffect(function () {
    var unsubscribe = function unsubscribe() {};
    unsubscribe = event.subscribe(Array.isArray(_field.name) ? [formListName].concat(_field.name).filter(function (name) {
      return name !== '';
    }).join('_') : _field.name, function (_ref2, newField, customizer) {
      var _field$effect;
      var name = _ref2.name;
      if (customizer === void 0) {
        customizer = function customizer() {};
      }
      if (!isEmpty(newField)) {
        return mergeField(newField, customizer);
      }
      if (name === NOTICESELF) {
        touchEffect(field);
      } else if (_field === null || _field === void 0 ? void 0 : (_field$effect = _field.effect) === null || _field$effect === void 0 ? void 0 : _field$effect.some(function (item) {
        if (Array.isArray(item)) {
          if (Array.isArray(_field.name)) {
            item[1] = _field.name[0];
          } else {
            item[1] = name.split(',')[1];
          }
        }
        return item.toString() === name.toString();
      })) {
        touchEffect(field, name);
      }
    });
    return function () {
      unsubscribe();
    };
  }, []);
  var cloneField = cloneDeep(_field);
  var pureFields = beforeFieldRender(cloneField, form);
  var itemID = useMemo$1(function () {
    return "item_" + uuid(10);
  }, []);
  useEffect(function () {
    var element = document.querySelector("[itemId=" + itemID + "]");
    if (element) {
      if (pureFields.ismore) {
        element.parentElement.setAttribute('ismore', '1');
      }
      element.classList.value = element.classList.value.split(',').concat('ant-form-item').join(' ');
    }
  }, []);
  var FormItem = React__default.createElement(Form$1.Item, Object.assign({}, pureFields, {
    key: reload,
    itemID: itemID,
    rules: readOnly ? undefined : pureFields.rules,
    tooltip: readOnly && readOnlyClean ? undefined : pureFields.tooltip,
    extra: readOnly && readOnlyClean ? undefined : pureFields.extra,
    className: pureFields.ismore === 1 ? className ? "ant-form-item-ismore " + className : 'ant-form-item-ismore' : className,
    fieldKey: fieldKey,
    label: cloneField.labelWidth ? React__default.createElement("span", {
      style: {
        width: cloneField.labelWidth
      }
    }, pureFields.label) : pureFields.label
  }), CreateWidget(_extends({
    disabled: disabled,
    readOnly: readOnly,
    event: event,
    readOnlyEmptyValueNode: readOnlyEmptyValueNode,
    actionRef: actionRef
  }, cloneField), _extends({}, form, {
    setValues: function setValues(value) {
      form.setFieldsValue(value);
      onChange(value, form.getFieldsValue(true));
    },
    quoteFormInstance: form.quoteFormInstance || form
  }), widgets));
  var vNode = FormItem;
  if (typeof _field.itemRender === 'function') {
    var node = _field.itemRender(FormItem, {
      field: field,
      form: form,
      disabled: disabled,
      readOnly: readOnly
    });
    if (Object.prototype.toString.call(node) === '[object Promise]') {
      vNode = React__default.createElement(AsyncRender, {
        form: form,
        spin: false,
        key: reload,
        render: function render() {
          return node;
        }
      });
    } else {
      vNode = node;
    }
  }
  if (typeof field.isShow === 'function') {
    return field.isShow(_extends({}, initialValues, form.getFieldsValue())) ? vNode : null;
  }
  return vNode;
});

var Grid = (function (_ref) {
  var _ref$children = _ref.children,
    children = _ref$children === void 0 ? null : _ref$children,
    _ref$gridStyle = _ref.gridStyle,
    gridStyle = _ref$gridStyle === void 0 ? {
      rowGap: 20,
      columnGap: 20
    } : _ref$gridStyle,
    _ref$column = _ref.column,
    column = _ref$column === void 0 ? 4 : _ref$column;
  return React__default.createElement("div", {
    className: "shine-grid-" + column,
    style: gridStyle
  }, children);
});

var FormList = (function (_ref) {
  var form = _ref.form,
    name = _ref.name,
    event = _ref.event,
    widgets = _ref.widgets,
    fields = _ref.fields,
    _ref$disabled = _ref.disabled,
    disabled = _ref$disabled === void 0 ? false : _ref$disabled,
    _ref$readOnly = _ref.readOnly,
    readOnly = _ref$readOnly === void 0 ? false : _ref$readOnly,
    _ref$operation = _ref.operation,
    operation = _ref$operation === void 0 ? true : _ref$operation,
    _ref$operationText = _ref.operationText,
    operationText = _ref$operationText === void 0 ? '添加' : _ref$operationText,
    _ref$maxCount = _ref.maxCount,
    maxCount = _ref$maxCount === void 0 ? 9999 : _ref$maxCount,
    _ref$leastOne = _ref.leastOne,
    leastOne = _ref$leastOne === void 0 ? false : _ref$leastOne,
    _ref$label = _ref.label,
    label = _ref$label === void 0 ? '' : _ref$label,
    _ref$actionRef = _ref.actionRef,
    actionRef = _ref$actionRef === void 0 ? useRef({}) : _ref$actionRef,
    _ref$grid = _ref.grid,
    grid = _ref$grid === void 0 ? {
      gridStyle: {
        rowGap: 0,
        columnGap: 20
      },
      column: 2
    } : _ref$grid;
  var notOperation = !operation || readOnly || disabled;
  return React__default.createElement(Form$1.List, {
    name: name
  }, function (f, _ref2) {
    var _add = _ref2.add,
      _remove = _ref2.remove;
    actionRef.current[name] = {
      add: function () {
        try {
          if (notOperation) {
            return Promise.resolve(message$1.info('不可操作'));
          }
          if ((f === null || f === void 0 ? void 0 : f.length) === maxCount) {
            return Promise.resolve(message$1.info("\u6700\u591A\u53EA\u80FD\u6DFB\u52A0" + maxCount + "\u6761"));
          }
          _add.apply(void 0, arguments);
          return Promise.resolve();
        } catch (e) {
          return Promise.reject(e);
        }
      },
      remove: function (idx) {
        if (idx === void 0) {
          idx = 0;
        }
        try {
          if (notOperation) {
            return Promise.resolve(message$1.info('不可操作'));
          }
          if (leastOne && f.length === 1) {
            return Promise.resolve(message$1.info('至少保留一条'));
          }
          _remove(idx);
          return Promise.resolve();
        } catch (e) {
          return Promise.reject(e);
        }
      }
    };
    return React__default.createElement(React__default.Fragment, null, f.map(function (item, index, _ref3) {
      var length = _ref3.length;
      return React__default.createElement("div", {
        className: "form-lib-list-item",
        key: item.key || item.name
      }, React__default.createElement("div", {
        className: "form-lib-list-block"
      }, React__default.createElement("span", {
        className: "form-list-block-label"
      }, label, index + 1), !notOperation && React__default.createElement(Button, {
        type: "link",
        disabled: leastOne && index === 0 && length === 1 || disabled,
        onClick: function onClick() {
          return _remove(item.name);
        }
      }, "\u5220\u9664")), React__default.createElement(Grid, Object.assign({}, grid), fields === null || fields === void 0 ? void 0 : fields.map(function (field) {
        var _field$props;
        var _field = _extends({}, field);
        _field.name = [item.name, _field.name];
        return React__default.createElement(Item, {
          readOnly: readOnly,
          disabled: disabled || (_field === null || _field === void 0 ? void 0 : (_field$props = _field.props) === null || _field$props === void 0 ? void 0 : _field$props.disabled),
          form: form,
          widgets: widgets,
          event: event,
          initialValues: form.initialValues,
          field: _field,
          formListName: name,
          fieldKey: [item.fieldKey, _field.name],
          key: _field.name || _field.key
        });
      })));
    }), notOperation && f.length === 0 && React__default.createElement(Empty, {
      image: Empty.PRESENTED_IMAGE_SIMPLE
    }), !notOperation && React__default.createElement(Form$1.Item, null, React__default.createElement(Button, {
      type: "dashed",
      className: "form-lib-block-btn",
      disabled: f.length === maxCount || disabled,
      onClick: function onClick() {
        return _add();
      },
      block: true
    }, operationText)));
  });
});

function downloadFile(url, fileName) {
  return new Promise(function (resolve, reject) {
    var x = new XMLHttpRequest();
    x.open('GET', url, true);
    x.responseType = 'blob';
    x.onload = function () {
      if (x.status !== 200) {
        reject(new Error("Failed to fetch file: " + x.statusText));
        return;
      }
      var loadurl = window.URL.createObjectURL(x.response);
      var a = document.createElement('a');
      a.href = loadurl;
      a.download = fileName;
      a.click();
      window.URL.revokeObjectURL(loadurl);
      resolve(true);
    };
    x.onerror = function () {
      reject(new Error('Error downloading file'));
    };
    x.onabort = function () {
      reject(new Error('File download aborted'));
    };
    x.send();
  });
}
var getFile = function getFile(url) {
  return new Promise(function (resolve, reject) {
    axios(url, {
      method: 'GET',
      responseType: 'blob'
    }).then(function (res) {
      resolve(res.data);
    })["catch"](function (error) {
      reject(error);
    });
  });
};
function compressAndDownload(data, zipName) {
  var zip = new JSZip();
  var promises = [];
  data.forEach(function (item) {
    var promise = getFile("" + item.url).then(function (res) {
      zip.file(item.name, res, {
        binary: true
      });
    });
    promises.push(promise);
  });
  return Promise.all(promises).then(function () {
    zip.generateAsync({
      type: 'blob',
      compression: 'STORE',
      compressionOptions: {
        level: 9
      }
    }).then(function (res) {
      FileSaver.saveAs(res, zipName || '图片压缩包.zip');
    });
  });
}

var DistanceMode;
(function (DistanceMode) {
  DistanceMode["DEFAULT"] = "DEFAULT";
  DistanceMode["CHINESE"] = "CHINESE";
  DistanceMode["ENGLISH"] = "ENGLISH";
})(DistanceMode || (DistanceMode = {}));
function distance(lat1, lon1, lat2, lon2, mode) {
  var _modeProcessor;
  if (mode === void 0) {
    mode = 'DEFAULT';
  }
  var a = 6378137;
  var f = 1 / 298.257223563;
  var b = (1 - f) * a;
  var toRadians = function toRadians(value) {
    return value * Math.PI / 180;
  };
  var L = toRadians(lon2 - lon1);
  var U1 = Math.atan((1 - f) * Math.tan(toRadians(lat1)));
  var U2 = Math.atan((1 - f) * Math.tan(toRadians(lat2)));
  var sinU1 = Math.sin(U1);
  var cosU1 = Math.cos(U1);
  var sinU2 = Math.sin(U2);
  var cosU2 = Math.cos(U2);
  var lambda = L;
  var lambdaP;
  var iterLimit = 100;
  var sinLambda;
  var cosLambda;
  var sinSigma;
  var cosSigma;
  var sigma;
  var sinAlpha;
  var cosSqAlpha;
  var cos2SigmaM;
  var C;
  do {
    sinLambda = Math.sin(lambda);
    cosLambda = Math.cos(lambda);
    sinSigma = Math.sqrt(cosU2 * sinLambda * (cosU2 * sinLambda) + (cosU1 * sinU2 - sinU1 * cosU2 * cosLambda) * (cosU1 * sinU2 - sinU1 * cosU2 * cosLambda));
    if (sinSigma === 0) {
      return 0;
    }
    cosSigma = sinU1 * sinU2 + cosU1 * cosU2 * cosLambda;
    sigma = Math.atan2(sinSigma, cosSigma);
    sinAlpha = cosU1 * cosU2 * sinLambda / sinSigma;
    cosSqAlpha = 1 - sinAlpha * sinAlpha;
    cos2SigmaM = cosSigma - 2 * sinU1 * sinU2 / cosSqAlpha;
    if (isNaN(cos2SigmaM)) {
      cos2SigmaM = 0;
    }
    C = f / 16 * cosSqAlpha * (4 + f * (4 - 3 * cosSqAlpha));
    lambdaP = lambda;
    lambda = L + (1 - C) * f * sinAlpha * (sigma + C * sinSigma * (cos2SigmaM + C * cosSigma * (-1 + 2 * cos2SigmaM * cos2SigmaM)));
  } while (Math.abs(lambda - lambdaP) > 1e-12 && --iterLimit > 0);
  if (iterLimit === 0) {
    return NaN;
  }
  var uSq = cosSqAlpha * (a * a - b * b) / (b * b);
  var aA = 1 + uSq / 16384 * (4096 + uSq * (-768 + uSq * (320 - 175 * uSq)));
  var bB = uSq / 1024 * (256 + uSq * (-128 + uSq * (74 - 47 * uSq)));
  var deltaSigma = bB * sinSigma * (cos2SigmaM + bB / 4 * (cosSigma * (-1 + 2 * cos2SigmaM * cos2SigmaM) - bB / 6 * cos2SigmaM * (-3 + 4 * sinSigma * sinSigma) * (-3 + 4 * cos2SigmaM * cos2SigmaM)));
  var s = b * aA * (sigma - deltaSigma);
  var modeProcessor = (_modeProcessor = {}, _modeProcessor[DistanceMode.DEFAULT] = function (dis) {
    return Math.round(dis);
  }, _modeProcessor[DistanceMode.ENGLISH] = function (dis) {
    if (dis < 1) {
      return Math.round(dis) + "m";
    } else {
      return (dis / 1000).toFixed(2) + "km";
    }
  }, _modeProcessor[DistanceMode.CHINESE] = function (dis) {
    if (dis < 1) {
      return Math.round(dis) + "\u7C73";
    } else {
      return (dis / 1000).toFixed(2) + "\u5343\u7C73";
    }
  }, _modeProcessor);
  return modeProcessor[mode](s);
}
function safeStringify(obj, replacer, space, cycleReplacer) {
  var stack = new WeakMap();
  return JSON.stringify(obj, function (key, value) {
    if (value !== null && typeof value === 'object') {
      if (stack.has(value)) {
        return cycleReplacer ? cycleReplacer(key, value) : '[Circular]';
      }
      stack.set(value, true);
    }
    return replacer ? replacer(key, value) : value;
  }, space);
}
function memoize(fn) {
  var cache = new Map();
  return function () {
    var _this = this;
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    var key = safeStringify(args);
    if (cache.has(key)) {
      return cache.get(key);
    }
    var result = function () {
      return fn.apply(_this, args);
    }();
    cache.set(key, result);
    return result;
  };
}

var calculate = function calculate(args, type) {
  return Number(args.reduce(function (a, b) {
    return new BigNumber(a)[type](new BigNumber(b));
  }).toString());
};
var tools = {
  BigNumber: {
    add: function add() {
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }
      return calculate(args, 'plus');
    },
    minus: function minus() {
      for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
      }
      return calculate(args, 'minus');
    },
    multiplie: function multiplie() {
      for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
        args[_key3] = arguments[_key3];
      }
      return calculate(args, 'multipliedBy');
    },
    divided: function divided() {
      for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
        args[_key4] = arguments[_key4];
      }
      return calculate(args, 'dividedBy');
    }
  },
  isEmpty: function isEmpty(param) {
    if (param === null || param === undefined) {
      return true;
    }
    if (Array.isArray(param)) {
      return param.length === 0;
    }
    if (typeof param === 'string') {
      return param.trim() === '';
    }
    if (typeof param === 'object') {
      return Object.keys(param).length === 0;
    }
    return false;
  },
  NumberFormat: function NumberFormat(number, options) {
    if (options === void 0) {
      options = {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      };
    }
    if (isNaN(Number.parseFloat(number))) {
      return '-';
    }
    return Number(number).toLocaleString('zh-CH', options);
  },
  getUrlSearchParams: function getUrlSearchParams(search) {
    var _search;
    if (search === void 0) {
      search = '';
    }
    search = (_search = search) === null || _search === void 0 ? void 0 : _search.split('?')[1];
    var params = {};
    var searchParams = new URLSearchParams(search);
    searchParams.forEach(function (value, key) {
      params[key] = value;
    });
    return params;
  },
  downloadFile: downloadFile,
  htmlDecode: function htmlDecode(input) {
    var doc = new DOMParser().parseFromString(input, 'text/html');
    return doc.documentElement.textContent;
  },
  copyToClipBoard: function (text, showNotice) {
    if (showNotice === void 0) {
      showNotice = true;
    }
    try {
      var _temp = function () {
        if (navigator.clipboard && window.isSecureContext) {
          setTimeout(function () {
            try {
              return Promise.resolve(navigator.clipboard.writeText(text)).then(function () {
                showNotice && message$1.success('已复制到剪切板');
              });
            } catch (e) {
              return Promise.reject(e);
            }
          });
        } else {
          var textArea = document.createElement('textarea');
          textArea.value = text;
          textArea.style.position = 'absolute';
          textArea.style.opacity = '0';
          textArea.style.left = '-999999px';
          textArea.style.top = '-999999px';
          document.body.appendChild(textArea);
          textArea.focus();
          textArea.select();
          return Promise.resolve(new Promise(function (resolve, reject) {
            document.execCommand('copy') ? resolve(true) : reject();
            textArea.remove();
          })).then(function (res) {
            if (res) {
              showNotice && message$1.success('已复制到剪切板');
            }
          });
        }
      }();
      return Promise.resolve(_temp && _temp.then ? _temp.then(function () {}) : void 0);
    } catch (e) {
      return Promise.reject(e);
    }
  },
  distance: distance,
  safeStringify: safeStringify,
  memoize: memoize,
  getElementSnapshot: function getElementSnapshot(element) {
    return {
      printImg: useReactToPrint({
        bodyClass: 'print-class',
        content: function content() {
          return document.querySelector(element);
        }
      }),
      downloadImg: function downloadImg(filename) {
        return new Promise(function (res) {
          html2canvas(document.querySelector(element), {
            useCORS: true
          }).then(function (canvas) {
            document.documentElement.classList.remove('html2canvas');
            var a = document.createElement('a');
            a.download = filename;
            a.href = canvas.toDataURL();
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            res(true);
          });
        });
      },
      getDataURL: function (config) {
        if (config === void 0) {
          config = {};
        }
        try {
          return Promise.resolve(new Promise(function (res) {
            html2canvas(document.querySelector(element), _extends({
              useCORS: true
            }, config)).then(function (canvas) {
              res(canvas.toDataURL());
            });
          }));
        } catch (e) {
          return Promise.reject(e);
        }
      }
    };
  },
  compressAndDownload: compressAndDownload,
  uuid: function uuid(size) {
    return Math.random().toString().substr(2, size);
  },
  encode: function encode(str) {
    try {
      return btoa(encodeURIComponent(str));
    } catch (error) {
      console.log(error);
      return '';
    }
  },
  decode: function decode(str) {
    try {
      return decodeURIComponent(atob(str));
    } catch (error) {
      console.log(error);
      return '';
    }
  },
  sleep: function sleep(ms) {
    if (ms === void 0) {
      ms = 1500;
    }
    return new Promise(function (res) {
      return setTimeout(res, ms);
    });
  },
  getJSType: function getJSType(params) {
    if (typeof params !== 'object') {
      return typeof params;
    }
    return Object.prototype.toString.call(params).replace(/^\[object (\S+)\]$/, '$1').toLocaleLowerCase();
  }
};

var _excluded$f = ["readOnlyEmptyValueNode", "precision", "maxLength", "min", "addonAfter", "formatter", "parser", "readOnly"];
var AmountInput = function AmountInput(_ref) {
  var _ref$precision = _ref.precision,
    precision = _ref$precision === void 0 ? 2 : _ref$precision,
    _ref$maxLength = _ref.maxLength,
    maxLength = _ref$maxLength === void 0 ? 15 : _ref$maxLength,
    _ref$min = _ref.min,
    min = _ref$min === void 0 ? 0 : _ref$min,
    _ref$addonAfter = _ref.addonAfter,
    addonAfter = _ref$addonAfter === void 0 ? '元' : _ref$addonAfter,
    _ref$formatter = _ref.formatter,
    formatter = _ref$formatter === void 0 ? function (value) {
      return value.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    } : _ref$formatter,
    _ref$parser = _ref.parser,
    parser = _ref$parser === void 0 ? function (value) {
      return value.replace(/\$\s?|(,*)/g, '');
    } : _ref$parser,
    readOnly = _ref.readOnly,
    props = _objectWithoutPropertiesLoose(_ref, _excluded$f);
  if (readOnly) {
    return React__default.createElement("span", {
      className: "readonly-count-input"
    }, tools.NumberFormat(props.value));
  }
  var handelChange = function handelChange(value) {
    if (String(value).length > maxLength) {
      value = Number(String(value).substr(0, maxLength));
    }
    if (precision) {
      value = Number(value).toFixed(precision);
    } else {
      value = Number.parseInt(value);
    }
    props.onChange(Number(value));
  };
  var _props = {};
  Object.keys(props).forEach(function (key) {
    if (!['form', 'name', 'precision', 'type', 'maxLength'].includes(key)) {
      _props[key] = props[key];
    }
  });
  return React__default.createElement(InputNumber, Object.assign({
    min: min,
    addonAfter: addonAfter
  }, _props, {
    stringMode: true,
    onChange: handelChange,
    formatter: formatter,
    parser: parser
  }));
};
AmountInput.displayName = 'AmountInput';

var _excluded$g = ["readOnlyEmptyValueNode", "addonBefore"];
var transformValue = function transformValue(value) {
  return value.replace(/[^\d]/g, '').replace(/(\d{4})(?=\d)/g, '$1 ');
};
var BankCardInput = function BankCardInput(_ref) {
  var _ref$addonBefore = _ref.addonBefore,
    addonBefore = _ref$addonBefore === void 0 ? React__default.createElement("i", {
      className: "iconfont spicon-yinhangka"
    }) : _ref$addonBefore,
    props = _objectWithoutPropertiesLoose(_ref, _excluded$g);
  if (props.readOnly) {
    return React__default.createElement("span", {
      className: "readonly-count-input"
    }, transformValue(String(props.value)));
  }
  return React__default.createElement(InputNumber, Object.assign({
    addonBefore: addonBefore
  }, props, {
    controls: false,
    stringMode: true,
    formatter: function formatter(value) {
      return transformValue(value);
    }
  }));
};
BankCardInput.displayName = 'BankCardInput';

var _excluded$h = ["readOnlyEmptyValueNode"],
  _excluded2$1 = ["showCount", "maxLength"];
var _Input_ = function _Input_(_ref) {
  var _ref$readOnlyEmptyVal = _ref.readOnlyEmptyValueNode,
    readOnlyEmptyValueNode = _ref$readOnlyEmptyVal === void 0 ? '-' : _ref$readOnlyEmptyVal,
    props = _objectWithoutPropertiesLoose(_ref, _excluded$h);
  var maxLength = props.maxLength,
    restProps = _objectWithoutPropertiesLoose(props, _excluded2$1);
  if (props.readOnly) {
    return React__default.createElement("span", {
      className: "ant-input-readonly"
    }, props.value || readOnlyEmptyValueNode);
  }
  var _getGlobalConfigByNam = getGlobalConfigByName('Antd', {}),
    autoTrimInputSpaceOnBlur = _getGlobalConfigByNam.autoTrimInputSpaceOnBlur,
    autoShowFormInputCount = _getGlobalConfigByNam.autoShowFormInputCount,
    _getGlobalConfigByNam2 = _getGlobalConfigByNam.defaultInputMaxLength,
    defaultInputMaxLength = _getGlobalConfigByNam2 === void 0 ? 64 : _getGlobalConfigByNam2;
  if (autoShowFormInputCount) {
    var _props$value;
    var nowLength = ((_props$value = props.value) != null ? _props$value : '').length;
    var nowMaxLength = maxLength || defaultInputMaxLength;
    return React__default.createElement(Input, Object.assign({
      suffix: !(props === null || props === void 0 ? void 0 : props.isSearchForm) && React__default.createElement("span", {
        style: {
          opacity: 0.6,
          fontSize: 12
        }
      }, React__default.createElement("span", {
        style: nowLength > nowMaxLength ? {
          color: 'red'
        } : {}
      }, nowLength), "/ ", nowMaxLength),
      onBlur: function onBlur(e) {
        if (autoTrimInputSpaceOnBlur) {
          var _e$target$value, _e$target$value$trim;
          props.onChange((_e$target$value = e.target.value) === null || _e$target$value === void 0 ? void 0 : (_e$target$value$trim = _e$target$value.trim) === null || _e$target$value$trim === void 0 ? void 0 : _e$target$value$trim.call(_e$target$value));
        }
      }
    }, restProps));
  }
  return React__default.createElement(Input, Object.assign({
    onBlur: function onBlur(e) {
      if (autoTrimInputSpaceOnBlur) {
        var _e$target$value2, _e$target$value2$trim;
        props.onChange((_e$target$value2 = e.target.value) === null || _e$target$value2 === void 0 ? void 0 : (_e$target$value2$trim = _e$target$value2.trim) === null || _e$target$value2$trim === void 0 ? void 0 : _e$target$value2$trim.call(_e$target$value2));
      }
    }
  }, props));
};
_Input_.displayName = 'Input';

var _excluded$i = ["showCount", "maxLength"];
var CountInput = function CountInput(_ref) {
  var _ref$showCount = _ref.showCount,
    showCount = _ref$showCount === void 0 ? true : _ref$showCount,
    _ref$maxLength = _ref.maxLength,
    maxLength = _ref$maxLength === void 0 ? 64 : _ref$maxLength,
    rest = _objectWithoutPropertiesLoose(_ref, _excluded$i);
  var count = rest.value && String(rest.value).length || 0;
  return React__default.createElement(_Input_, Object.assign({
    suffix: showCount && React__default.createElement("span", {
      style: {
        opacity: 0.6,
        fontSize: 12
      }
    }, count, " / ", maxLength),
    maxLength: maxLength
  }, rest));
};
CountInput.displayName = 'CountInput';

var _excluded$j = ["readOnlyEmptyValueNode"],
  _excluded2$2 = ["min", "max", "maxLength"];
var __InputNumber__ = function __InputNumber__(_ref) {
  var readOnlyEmptyValueNode = _ref.readOnlyEmptyValueNode,
    props = _objectWithoutPropertiesLoose(_ref, _excluded$j);
  var restProps = _objectWithoutPropertiesLoose(props, _excluded2$2);
  if (props.readOnly) {
    return React__default.createElement("span", {
      className: "ant-inputNumber-readonly"
    }, props.value || readOnlyEmptyValueNode);
  }
  var _getGlobalConfigByNam = getGlobalConfigByName('Antd', {}),
    autoValidInputNumber = _getGlobalConfigByNam.autoValidInputNumber;
  if (autoValidInputNumber) {
    return React__default.createElement(InputNumber, Object.assign({}, restProps, {
      maxLength: 15
    }));
  }
  return React__default.createElement(InputNumber, Object.assign({}, props));
};
__InputNumber__.displayName = 'InputNumber';

var _excluded$k = ["value", "onChange", "startProps", "endProps", "mode", "notequal", "equalErrorText", "invertedErrorText", "oneEmptyErrorText"];
var RangeInput = (function (_ref) {
  var value = _ref.value,
    _onChange = _ref.onChange,
    startProps = _ref.startProps,
    endProps = _ref.endProps,
    _ref$mode = _ref.mode,
    mode = _ref$mode === void 0 ? 'InputNumber' : _ref$mode,
    props = _objectWithoutPropertiesLoose(_ref, _excluded$k);
  var Component = useMemo$1(function () {
    return mode === 'InputNumber' ? __InputNumber__ : _Input_;
  }, []);
  return React__default.createElement(Space, {
    className: props.readOnly ? 'widget-range-input-readOnly' : 'widget-range-input'
  }, React__default.createElement(Component, Object.assign({
    precision: mode === 'InputNumber' && 2,
    placeholder: "\u8BF7\u8F93\u5165"
  }, props, startProps, {
    value: value === null || value === void 0 ? void 0 : value[0],
    onChange: function onChange(e) {
      var _e$target;
      var v = typeof e === 'object' ? e === null || e === void 0 ? void 0 : (_e$target = e.target) === null || _e$target === void 0 ? void 0 : _e$target.value : e;
      _onChange([v, value === null || value === void 0 ? void 0 : value[1]]);
    }
  })), React__default.createElement("span", null, "-"), React__default.createElement(Component, Object.assign({
    precision: mode === 'InputNumber' && 2,
    placeholder: "\u8BF7\u8F93\u5165"
  }, props, endProps, {
    value: value === null || value === void 0 ? void 0 : value[1],
    onChange: function onChange(e) {
      var _e$target2;
      var v = typeof e === 'object' ? e === null || e === void 0 ? void 0 : (_e$target2 = e.target) === null || _e$target2 === void 0 ? void 0 : _e$target2.value : e;
      _onChange([value === null || value === void 0 ? void 0 : value[0], v]);
    }
  })));
});

var Render = (function (props) {
  if (typeof props.render !== 'function') {
    return null;
  }
  var _props$form = props.form,
    getFieldValue = _props$form.getFieldValue,
    initialValue = _props$form.initialValue,
    setFieldsValue = _props$form.setFieldsValue;
  var renderProps = {};
  Object.assign(renderProps, props.form, {
    value: (initialValue === null || initialValue === void 0 ? void 0 : initialValue[props.name]) || getFieldValue(props.name),
    onChange: function onChange(value) {
      var _setFieldsValue;
      setFieldsValue((_setFieldsValue = {}, _setFieldsValue[props.name] = value || undefined, _setFieldsValue));
    }
  });
  var Jsx = props.render(renderProps);
  return Jsx || null;
});

var UploadImage = (function (props) {
  var _props$text = props.text,
    text = _props$text === void 0 ? '上传图片' : _props$text,
    _props$accept = props.accept,
    accept = _props$accept === void 0 ? '.jpg,.jpeg,.png,.bmp' : _props$accept,
    _props$maxCount = props.maxCount,
    maxCount = _props$maxCount === void 0 ? 1 : _props$maxCount,
    _props$limitSize = props.limitSize,
    limitSize = _props$limitSize === void 0 ? 5 : _props$limitSize,
    _props$disabled = props.disabled,
    disabled = _props$disabled === void 0 ? false : _props$disabled,
    _props$readOnly = props.readOnly,
    readOnly = _props$readOnly === void 0 ? false : _props$readOnly;
  var _useState = useState(props.value || []),
    fileList = _useState[0],
    setFileList = _useState[1];
  var beforeUpload = function beforeUpload(file) {
    try {
      var ext = file.name.substring(file.name.lastIndexOf('.'));
      if (!accept.split(',').map(function (item) {
        return item.toLowerCase();
      }).includes(ext.toLowerCase())) {
        message$1.error(file.name + " \u6587\u4EF6\u683C\u5F0F\u4E0D\u5728" + accept + "\u4E2D");
        return Upload.LIST_IGNORE;
      }
      var size = file.size;
      var isLtSize = size / 1024 / 1024 <= limitSize;
      if (!isLtSize) message$1.error("\u6587\u4EF6\u5927\u5C0F\u4E0D\u5141\u8BB8\u8D85\u8FC7" + limitSize + "M");
      return isLtSize;
    } catch (error) {
      console.log(error);
    }
    return null;
  };
  var onRemove = function onRemove(file) {
    var _fileList = Array.isArray(fileList) ? fileList : JSON.parse(JSON.stringify(fileList.fileList));
    var tempFileList = JSON.parse(JSON.stringify(_fileList));
    tempFileList = tempFileList.filter(function (_ref) {
      var uid = _ref.uid;
      return uid !== file.uid;
    });
    setFileList(tempFileList);
    props.onChange(tempFileList);
  };
  var onChange = function onChange(_ref2) {
    var file = _ref2.file,
      fileList = _ref2.fileList;
    setFileList(fileList);
    if (file.status === 'done') {
      props.onChange(fileList);
    }
  };
  var _fileList = Array.isArray(fileList) ? fileList : JSON.parse(JSON.stringify(fileList.fileList || []));
  return React__default.createElement(React__default.Fragment, null, React__default.createElement(Upload, Object.assign({}, props, {
    fileList: _fileList,
    beforeUpload: beforeUpload,
    onChange: onChange,
    onRemove: onRemove,
    maxCount: maxCount,
    disabled: disabled,
    listType: "picture-card",
    itemRender: function itemRender(_, file) {
      return React__default.createElement("div", {
        className: "picture-card-image"
      }, React__default.createElement(Image, {
        width: 100,
        src: file.thumbUrl || file.url
      }), !(props.disabled || readOnly) && React__default.createElement("a", {
        className: "oss-file-item-render-action",
        style: {
          position: 'absolute',
          top: 0,
          right: 0
        },
        onClick: function onClick() {
          onRemove(file);
        }
      }, React__default.createElement("i", {
        className: "iconfont spicon-shanchu"
      })));
    }
  }), _fileList.length < maxCount && text));
});

var _excluded$l = ["readOnlyEmptyValueNode"];
var __AutoComplete__ = function __AutoComplete__(_ref) {
  var props = _objectWithoutPropertiesLoose(_ref, _excluded$l);
  return React__default.createElement(AutoComplete, Object.assign({}, props));
};
__AutoComplete__.displayName = 'AutoComplete';

var _excluded$m = ["readOnlyEmptyValueNode"];
var __DatePicker__ = function __DatePicker__(_ref) {
  var readOnlyEmptyValueNode = _ref.readOnlyEmptyValueNode,
    props = _objectWithoutPropertiesLoose(_ref, _excluded$m);
  if (props.readOnly) {
    var label = dayjs.isDayjs(props.value) ? dayjs(props.value).format(props.format || 'YYYY-MM-DD') : props.value;
    return React__default.createElement("span", {
      className: "ant-date-picker-readonly"
    }, label || readOnlyEmptyValueNode);
  }
  return React__default.createElement(DatePicker, Object.assign({}, props));
};
__DatePicker__.displayName = 'DatePicker';

var _excluded$n = ["readOnlyEmptyValueNode"];
var Password = function Password(_ref) {
  var props = _objectWithoutPropertiesLoose(_ref, _excluded$n);
  if (props.readOnly) {
    return React__default.createElement("span", {
      className: "ant-password-readonly"
    }, "******");
  }
  return React__default.createElement(Input.Password, Object.assign({}, props));
};
Password.displayName = 'Password';

var _excluded$o = ["value", "onChange", "form", "name", "endTimeQuickSel"],
  _excluded2$3 = ["mode", "readOnlyEmptyValueNode"];
var SplitRangerPicker = function SplitRangerPicker(_ref) {
  var _ref$value = _ref.value,
    value = _ref$value === void 0 ? [] : _ref$value,
    _ref$onChange = _ref.onChange,
    onChange = _ref$onChange === void 0 ? function () {} : _ref$onChange,
    _ref$endTimeQuickSel = _ref.endTimeQuickSel,
    endTimeQuickSel = _ref$endTimeQuickSel === void 0 ? [] : _ref$endTimeQuickSel,
    props = _objectWithoutPropertiesLoose(_ref, _excluded$o);
  var _useState = useState(value),
    innerValue = _useState[0],
    setInnerValue = _useState[1];
  var _useState2 = useState(props),
    endProps = _useState2[0],
    setEndProps = _useState2[1];
  var onInnerChange = function onInnerChange(start, end, type) {
    setInnerValue([start, end]);
    onChange([start, end]);
    if (type === 'start') {
      var nowProps = {};
      if (start && props.openDisabledDate) {
        nowProps.disabledDate = function (current) {
          return disabledDate(current, start);
        };
        if (props.openDisabledTime) {
          nowProps.disabledTime = function (current) {
            return disabledTime(current, start);
          };
        }
      }
      setEndProps(nowProps);
    }
  };
  var endTimeQuickSelObj = endTimeQuickSel === null || endTimeQuickSel === void 0 ? void 0 : endTimeQuickSel.reduce(function (pre, cur) {
    pre[cur.text] = cur;
    return pre;
  }, {});
  var checkEndTime = function checkEndTime(e) {
    var start = innerValue[0];
    var nowStartTime = start || new Date();
    var _endTimeQuickSelObj$e = endTimeQuickSelObj[e.target.innerText],
      time = _endTimeQuickSelObj$e.time,
      unit = _endTimeQuickSelObj$e.unit;
    var nowEnd = dayjs(nowStartTime).add(time, unit);
    onInnerChange(start, nowEnd, 'end');
  };
  var renderExtraFooter = function renderExtraFooter() {
    return React__default.createElement("span", null, "\u5FEB\u901F\u9009\u62E9\u7ED3\u675F\u65F6\u95F4\uFF1A", React__default.createElement(Space, {
      onClick: checkEndTime
    }, endTimeQuickSel.map(function (item) {
      return React__default.createElement("span", {
        key: item.text,
        className: "slick-form-time-tag"
      }, item.text);
    })));
  };
  return React__default.createElement("div", {
    className: "slick-form-split-range-picker"
  }, React__default.createElement(Space, null, React__default.createElement(DatePicker, Object.assign({
    value: innerValue[0]
  }, props, {
    onChange: function onChange(v) {
      onInnerChange(v, innerValue[1], 'start');
    }
  })), React__default.createElement(DatePicker, Object.assign({
    value: innerValue[1]
  }, props, endProps, {
    onChange: function onChange(v) {
      onInnerChange(innerValue[0], v, 'end');
    },
    renderExtraFooter: endTimeQuickSel ? renderExtraFooter : null
  }))));
};
var RangePicker = function RangePicker(_ref2) {
  var mode = _ref2.mode,
    readOnlyEmptyValueNode = _ref2.readOnlyEmptyValueNode,
    props = _objectWithoutPropertiesLoose(_ref2, _excluded2$3);
  if (props.readOnly) {
    var _props$value;
    var labels = (_props$value = props.value) === null || _props$value === void 0 ? void 0 : _props$value.map(function (item) {
      return dayjs.isDayjs(item) ? dayjs(item).format(props.format || 'YYYY-MM-DD') : item;
    });
    return React__default.createElement("span", {
      className: "ant-range-picker-readonly"
    }, (labels === null || labels === void 0 ? void 0 : labels.join(props.splitLabel || ' ~ ')) || readOnlyEmptyValueNode);
  }
  if (mode === 'split') {
    return React__default.createElement(SplitRangerPicker, Object.assign({}, props));
  }
  return React__default.createElement(DatePicker.RangePicker, Object.assign({}, props));
};
RangePicker.displayName = 'RangePicker';

var _excluded$p = ["readOnlyEmptyValueNode"];
var __Rate__ = function __Rate__(_ref) {
  var props = _objectWithoutPropertiesLoose(_ref, _excluded$p);
  return React__default.createElement(Rate, Object.assign({}, props, {
    disabled: props.disabled || props.readOnly
  }));
};
__Rate__.displayName = 'Rate';

var _excluded$q = ["readOnlyEmptyValueNode"];
var __Slider__ = function __Slider__(_ref) {
  var props = _objectWithoutPropertiesLoose(_ref, _excluded$q);
  return React__default.createElement(Slider, Object.assign({}, props, {
    disabled: props.disabled || props.readOnly
  }));
};
__Slider__.displayName = 'Slider';

var _excluded$r = ["readOnlyEmptyValueNode"];
var __Switch__ = function __Switch__(_ref) {
  var props = _objectWithoutPropertiesLoose(_ref, _excluded$r);
  return React__default.createElement(Switch, Object.assign({}, props, {
    disabled: props.disabled || props.readOnly
  }));
};
__Switch__.displayName = 'Switch';

var _excluded$s = ["readOnlyEmptyValueNode"],
  _excluded2$4 = ["showCount", "maxLength"];
var TextArea = function TextArea(_ref) {
  var readOnlyEmptyValueNode = _ref.readOnlyEmptyValueNode,
    props = _objectWithoutPropertiesLoose(_ref, _excluded$s);
  var _getGlobalConfigByNam = getGlobalConfigByName('Antd', {}),
    autoShowFormTextAreaCount = _getGlobalConfigByNam.autoShowFormTextAreaCount;
  var maxLength = props.maxLength,
    restProps = _objectWithoutPropertiesLoose(props, _excluded2$4);
  if (props.readOnly) {
    return React__default.createElement("span", {
      className: "ant-text-area-readonly"
    }, props.value || readOnlyEmptyValueNode);
  }
  if (autoShowFormTextAreaCount) {
    var _props$value;
    var nowLen = ((_props$value = props.value) != null ? _props$value : '').length;
    var showLen = React__default.createElement("span", {
      style: !isEmpty(maxLength) && nowLen > maxLength ? {
        color: 'red'
      } : {}
    }, (!!nowLen || !isEmpty(maxLength)) && nowLen);
    return React__default.createElement("div", {
      style: {
        position: 'relative'
      }
    }, React__default.createElement(Input.TextArea, Object.assign({}, restProps)), !(props === null || props === void 0 ? void 0 : props.isSearchForm) && React__default.createElement("div", {
      style: {
        position: 'absolute',
        right: 0
      }
    }, React__default.createElement("span", {
      style: {
        opacity: 0.6,
        fontSize: 12
      }
    }, showLen, !isEmpty(maxLength) && React__default.createElement(React__default.Fragment, null, "/", maxLength))));
  }
  return React__default.createElement(Input.TextArea, Object.assign({}, props));
};
TextArea.displayName = 'TextArea';

var _excluded$t = ["readOnlyEmptyValueNode"];
var __TimePicker__ = function __TimePicker__(_ref) {
  var readOnlyEmptyValueNode = _ref.readOnlyEmptyValueNode,
    props = _objectWithoutPropertiesLoose(_ref, _excluded$t);
  if (props.readOnly) {
    var value = dayjs.isDayjs(props.value) ? dayjs(props.value).format('HH:mm:ss') : props.value;
    return React__default.createElement("span", {
      className: "ant-time-picker-readonly"
    }, value || readOnlyEmptyValueNode);
  }
  return React__default.createElement(TimePicker, Object.assign({}, props));
};
__TimePicker__.displayName = 'TimePicker';

var _excluded$u = ["readOnlyEmptyValueNode"];
var TimeRange = function TimeRange(_ref) {
  var readOnlyEmptyValueNode = _ref.readOnlyEmptyValueNode,
    props = _objectWithoutPropertiesLoose(_ref, _excluded$u);
  if (props.readOnly) {
    var _props$value;
    var labels = (_props$value = props.value) === null || _props$value === void 0 ? void 0 : _props$value.map(function (item) {
      return dayjs.isDayjs(item) ? dayjs(item).format('HH:mm:ss') : item;
    });
    return React__default.createElement("span", {
      className: "ant-time-range-picker-readonly"
    }, (labels === null || labels === void 0 ? void 0 : labels.join(props.splitLabel || ' ~ ')) || readOnlyEmptyValueNode);
  }
  return React__default.createElement(TimePicker.RangePicker, Object.assign({}, props));
};
TimeRange.displayName = 'TimeRange';

var _excluded$v = ["readOnlyEmptyValueNode"];
var __Upload__ = function __Upload__(_ref) {
  var props = _objectWithoutPropertiesLoose(_ref, _excluded$v);
  return React__default.createElement(Upload, Object.assign({}, props));
};
__Upload__.displayName = 'Upload';

var BuiltInWidgetMapping = {
  AutoComplete: __AutoComplete__,
  Input: _Input_,
  InputNumber: __InputNumber__,
  Rate: __Rate__,
  Slider: __Slider__,
  TextArea: TextArea,
  Password: Password,
  Select: __Select__,
  RadioGroup: RadioGroup,
  CheckGroup: CheckGroup,
  DatePicker: __DatePicker__,
  TimePicker: __TimePicker__,
  TimeRange: TimeRange,
  RangePicker: RangePicker,
  TreeSelect: __TreeSelect__,
  Cascader: __Cascader__,
  Upload: __Upload__,
  Switch: __Switch__,
  AsyncSelect: AsyncSelect,
  AsyncTreeSelect: AsyncTreeSelect,
  DebounceSelect: DebounceSelect,
  AsyncCascader: AsyncCascader,
  AsyncCheckGroup: AsyncCheckGroup,
  AsyncRadioGroup: AsyncRadioGroup,
  Render: Render,
  AsyncRender: AsyncRender,
  FormList: FormList,
  BlockQuote: BlockQuote,
  FieldSet: FieldSet,
  UploadImage: UploadImage,
  CountInput: CountInput,
  BankCardInput: BankCardInput,
  AmountInput: AmountInput,
  RangeInput: RangeInput,
  OssFileUpload: OssFileUpload,
  DateTimeHabit: DateTimeHabit
};
var Error$1 = function Error(_ref) {
  var widget = _ref.widget;
  return React__default.createElement("span", {
    style: {
      color: 'red'
    }
  }, "Error: widget\u7C7B\u578B(", widget, ")\u672A\u77E5");
};
var CreateWidget = (function (field, formInstance, widgets) {
  if (formInstance === void 0) {
    formInstance = {};
  }
  if (widgets === void 0) {
    widgets = {};
  }
  var Component = null;
  if (typeof field.type === 'function') {
    Component = field.type;
  } else {
    Component = widgets[field.type] || BuiltInWidgetMapping[field.type];
  }
  if (Component === undefined) {
    return React__default.createElement(Error$1, {
      widget: field.type
    });
  }
  var ExpProps = {};
  if (['FormList'].includes(field.type)) {
    ExpProps.actionRef = field.actionRef;
    ExpProps.event = field.event;
    ExpProps.widgets = widgets;
  }
  return React__default.createElement(Component, Object.assign({
    name: field.name,
    form: formInstance,
    disabled: field.disabled,
    readOnly: field.readOnly,
    readOnlyEmptyValueNode: field.readOnlyEmptyValueNode
  }, ExpProps, field.props));
});

var _getGlobalConfigByNam$1 = getGlobalConfigByName('Antd', {}),
  _getGlobalConfigByNam2 = _getGlobalConfigByNam$1.defaultInputMaxLength,
  defaultInputMaxLength = _getGlobalConfigByNam2 === void 0 ? 64 : _getGlobalConfigByNam2;
var defaultFormConfig = {
  defaultInputMaxLength: defaultInputMaxLength || 64,
  autoSetPopupContainer: true,
  autoTransfromDatePicker: true,
  autoSelectSearch: true
};
var transformSchema = function transformSchema(fields, name, column, formConfig) {
  if (column === void 0) {
    column = 1;
  }
  if (formConfig === void 0) {
    formConfig = defaultFormConfig;
  }
  fields === null || fields === void 0 ? void 0 : fields.forEach(function (field) {
    if (field.props === undefined) {
      field.props = {};
    }
    if (field.type === 'FieldSet' && Array.isArray(field.props.children)) {
      return transformSchema(field.props.children, name, column, formConfig);
    }
    if (field.type === 'FormList' && Array.isArray(field.props.fields)) {
      transformSchema(field.props.fields, name, undefined, formConfig);
    }
    if (['Input', 'CountInput'].includes(field.type)) {
      field.props.maxLength = field.props.maxLength || formConfig.defaultInputMaxLength;
    }
    if (['Input', 'InputNumber', 'CountInput', 'DebounceInput', 'BankCardInput', 'AmountInput', 'TextArea', 'Password'].includes(field.type)) {
      if (!['InputNumber', 'BankCardInput', 'AmountInput'].includes(field.type)) {
        field.props.allowClear = field.props.allowClear === undefined ? true : field.props.allowClear;
      }
      field.props.placeholder = field.props.placeholder || "\u8BF7\u8F93\u5165" + (field.label || '');
    }
    if (isPopupContainer(field.type)) {
      var popupName = field.name;
      if (Array.isArray(popupName)) {
        popupName = popupName.join('_');
      }
      field.props.allowClear = field.props.allowClear === undefined ? true : field.props.allowClear;
      if (!['RangePicker', 'TimeRange'].includes(field.type)) {
        field.props.placeholder = field.props.placeholder || "\u8BF7\u9009\u62E9" + (field.label || '');
      }
      field.popupid = name + "_" + popupName;
      if (typeof field.props.getPopupContainer !== 'function' && formConfig.autoSetPopupContainer) {
        field.props.getPopupContainer = function () {
          return document.querySelector("[popupid=" + field.popupid + "] .ant-form-item-control");
        };
      }
    }
    if (['Select', 'AsyncSelect'].includes(field.type) && typeof field.props.filterOption === 'undefined' && formConfig.autoSelectSearch) {
      field.props.showSearch = field.props.showSearch || true;
      field.props.filterOption = function (key, option) {
        var _field$props$fieldNam, _option$labelAlise;
        var labelAlise = ((_field$props$fieldNam = field.props.fieldNames) === null || _field$props$fieldNam === void 0 ? void 0 : _field$props$fieldNam.label) || 'label';
        return ((_option$labelAlise = option[labelAlise]) === null || _option$labelAlise === void 0 ? void 0 : _option$labelAlise.indexOf(key)) >= 0;
      };
    }
    if (field.type === 'BlockQuote') {
      field.span = field.span || column;
      field.key = field.props.title;
    }
    var style = field.style || {};
    if (field.span && field.offset) {
      style.gridColumn = field.offset + 1 + " / span " + field.span;
    } else if (field.span) {
      style.gridColumnStart = "span " + field.span;
    } else if (field.offset) {
      style.gridColumnStart = "" + (field.offset + 1);
    }
    field.style = _extends({}, style, field.style);
    if (['DatePicker', 'TimePicker'].includes(field.type) && formConfig.autoTransfromDatePicker) {
      var format = field.props.format || (field.type === 'DatePicker' ? 'YYYY-MM-DD' : 'hh:mm:ss');
      if (!field.beforeReceive) {
        field.beforeReceive = function (values) {
          return values[field.name] && (typeof values[field.name] === 'number' ? dayjs(values[field.name]) : dayjs(values[field.name], format));
        };
      }
      if (!field.transform) {
        field.transform = function (values) {
          var _ref;
          var dateMoment = values[field.name];
          return _ref = {}, _ref[field.name] = dateMoment === null || dateMoment === void 0 ? void 0 : dateMoment.format(format), _ref;
        };
      }
    }
    if (field.type === 'RangeInput') {
      var _field$nameAlise, _field$nameAlise2;
      if (!Array.isArray(field.nameAlise)) {
        return;
      }
      var start = (_field$nameAlise = field.nameAlise) === null || _field$nameAlise === void 0 ? void 0 : _field$nameAlise[0];
      var end = (_field$nameAlise2 = field.nameAlise) === null || _field$nameAlise2 === void 0 ? void 0 : _field$nameAlise2[1];
      if (!field.beforeReceive) {
        field.beforeReceive = function (values) {
          return (values[start] || values[end]) && [values[start], values[end]];
        };
      }
      if (!field.transform) {
        field.transform = function (values) {
          var _ref2;
          var nowValue = values[field.name];
          return _ref2 = {}, _ref2[start] = nowValue === null || nowValue === void 0 ? void 0 : nowValue[0], _ref2[end] = nowValue === null || nowValue === void 0 ? void 0 : nowValue[1], _ref2;
        };
      }
    }
    if (['RangePicker', 'TimeRange'].includes(field.type) && formConfig.autoTransfromDatePicker) {
      var _field$nameAlise3, _field$nameAlise4;
      if (!Array.isArray(field.nameAlise)) {
        return;
      }
      var _format = field.props.format || (field.type === 'RangePicker' ? 'YYYY-MM-DD' : 'hh:mm:ss');
      var startName = (_field$nameAlise3 = field.nameAlise) === null || _field$nameAlise3 === void 0 ? void 0 : _field$nameAlise3[0];
      var endName = (_field$nameAlise4 = field.nameAlise) === null || _field$nameAlise4 === void 0 ? void 0 : _field$nameAlise4[1];
      if (!field.beforeReceive) {
        field.beforeReceive = function (values) {
          var start;
          var end;
          if (values[startName]) {
            start = typeof values[startName] === 'number' ? dayjs(values[startName]) : dayjs(values[startName], _format);
          }
          if (values[endName]) {
            end = typeof values[endName] === 'number' ? dayjs(values[endName]) : dayjs(values[endName], _format);
          }
          return start || end ? [start, end] : undefined;
        };
      }
      if (!field.transform) {
        field.transform = function (values) {
          var _ref3, _ref4;
          var dateMoment = values[field.name];
          return dateMoment ? (_ref3 = {}, _ref3[startName] = (dateMoment === null || dateMoment === void 0 ? void 0 : dateMoment[0]) ? dateMoment[0].format(_format) : undefined, _ref3[endName] = (dateMoment === null || dateMoment === void 0 ? void 0 : dateMoment[1]) ? dateMoment[1].format(_format) : undefined, _ref3) : (_ref4 = {}, _ref4[startName] = undefined, _ref4[endName] = undefined, _ref4);
        };
      }
    }
    if (field.type === 'PcaSelect') {
      if (!Array.isArray(field.nameAlise)) {
        return;
      }
      if (!field.beforeReceive) {
        field.beforeReceive = function (values) {
          return values[field.nameAlise[0]] ? [String(values[field.nameAlise[0]]), String(values[field.nameAlise[1]] || ''), String(values[field.nameAlise[2]] || '')].filter(function (i) {
            return i;
          }) : undefined;
        };
      }
      if (!field.transform) {
        field.transform = function (values) {
          var _ref5;
          var city = values[field.name];
          return city && (_ref5 = {}, _ref5[field.nameAlise[0]] = city[0], _ref5[field.nameAlise[1]] = city[1], _ref5[field.nameAlise[2]] = city[2], _ref5);
        };
      }
    }
    if (field.type === 'DateTimeHabit') {
      if (!field.beforeReceive) {
        field.beforeReceive = function (values) {
          var _values$field$name, _values$field$name$sp;
          if (!values[field.name]) return {
            date: undefined,
            time: undefined
          };
          return {
            date: dayjs(values[field.name]),
            time: (_values$field$name = values[field.name]) === null || _values$field$name === void 0 ? void 0 : (_values$field$name$sp = _values$field$name.split) === null || _values$field$name$sp === void 0 ? void 0 : _values$field$name$sp.call(_values$field$name, ' ')[1]
          };
        };
      }
      if (!field.transform) {
        field.transform = function (values) {
          var _values$field$name2, _ref7;
          if (!((_values$field$name2 = values[field.name]) === null || _values$field$name2 === void 0 ? void 0 : _values$field$name2.date)) {
            var _ref6;
            return _ref6 = {}, _ref6[field.name] = undefined, _ref6;
          }
          return _ref7 = {}, _ref7[field.name] = values[field.name].date.format('YYYY-MM-DD') + " " + values[field.name].time, _ref7;
        };
      }
    }
  });
};
var isFieldSet = function isFieldSet(field) {
  var _field$props, _field$props2;
  return field.type === 'FieldSet' && (Array.isArray((_field$props = field.props) === null || _field$props === void 0 ? void 0 : _field$props.children) || typeof ((_field$props2 = field.props) === null || _field$props2 === void 0 ? void 0 : _field$props2.children) === 'function');
};
var getCombination = function getCombination(values, formFields, options, combination) {
  if (combination === void 0) {
    combination = {};
  }
  formFields === null || formFields === void 0 ? void 0 : formFields.forEach(function (field) {
    var _field$isShow, _ref8;
    if (((_field$isShow = field.isShow) === null || _field$isShow === void 0 ? void 0 : _field$isShow.call(field, _extends({}, options.initialValues, options.form.getFieldsValue(), combination))) === false || field.name === undefined) {
      return;
    }
    if (isFieldSet(field) && field.name) {
      var _field$props3, _field$props4, _field$props5, _field$props6;
      var childrenFields = typeof ((_field$props3 = field.props) === null || _field$props3 === void 0 ? void 0 : _field$props3.children) === 'function' ? (_field$props4 = field.props) === null || _field$props4 === void 0 ? void 0 : _field$props4.children(options.form) : (_field$props5 = field.props) === null || _field$props5 === void 0 ? void 0 : _field$props5.children;
      if (typeof ((_field$props6 = field.props) === null || _field$props6 === void 0 ? void 0 : _field$props6.children) === 'function') {
        transformSchema(childrenFields, options.name, field.props.column);
      }
      combination[field.name] = {};
      return getCombination(values, childrenFields, options, combination[field.name]);
    }
    Object.assign(combination, typeof field.transform === 'function' ? field.transform(_extends({}, values, combination)) : (_ref8 = {}, _ref8[field.name] = values[field.name], _ref8));
    delete values[field.name];
  });
  return _extends({}, values, combination);
};
var parseBeforeReceive = function parseBeforeReceive(values, formFields, options, parseValue) {
  if (parseValue === void 0) {
    parseValue = {};
  }
  formFields === null || formFields === void 0 ? void 0 : formFields.forEach(function (field) {
    if (isFieldSet(field) && field.name) {
      var _field$props7, _field$props8, _field$props9, _field$props10;
      var childrenFields = typeof ((_field$props7 = field.props) === null || _field$props7 === void 0 ? void 0 : _field$props7.children) === 'function' ? (_field$props8 = field.props) === null || _field$props8 === void 0 ? void 0 : _field$props8.children(_extends({}, options.form, {
        initialValues: options.initialValues
      }), true) : (_field$props9 = field.props) === null || _field$props9 === void 0 ? void 0 : _field$props9.children;
      if (typeof ((_field$props10 = field.props) === null || _field$props10 === void 0 ? void 0 : _field$props10.children) === 'function') {
        transformSchema(childrenFields, options.name, field.props.column);
      }
      return parseBeforeReceive(values[field.name] || {}, childrenFields, options, parseValue);
    }
    if (typeof field.isShow === 'function' && field.isShow(values) === false) {
      return;
    }
    parseValue[field.name] = typeof field.beforeReceive === 'function' ? field.beforeReceive(values) : values[field.name];
  });
  return _extends({}, values, parseValue);
};
var expansionInstanceMethod = function expansionInstanceMethod(_ref9) {
  var form = _ref9.form,
    antdForm = _ref9.antdForm,
    name = _ref9.name,
    initialValues = _ref9.initialValues,
    cloneFields = _ref9.cloneFields,
    event = _ref9.event,
    scrollToFirstError = _ref9.scrollToFirstError,
    getScrollContainer = _ref9.getScrollContainer,
    actionRef = _ref9.actionRef,
    setSpin = _ref9.setSpin,
    forceUpdate = _ref9.forceUpdate,
    onChange = _ref9.onChange;
  Object.assign(form, _extends({}, antdForm, {
    initialValues: initialValues,
    name: name,
    getValues: function getValues() {
      var values = antdForm.getFieldsValue();
      return getCombination(_extends({}, values), cloneFields, {
        name: name,
        form: form,
        initialValues: initialValues
      });
    },
    setValues: function setValues(data) {
      var values = parseBeforeReceive(data, cloneFields, {
        name: name,
        form: form,
        initialValues: initialValues
      });
      antdForm.setFieldsValue(values);
    },
    submit: function () {
      try {
        return Promise.resolve(_catch(function () {
          return Promise.resolve(antdForm.validateFields()).then(function (values) {
            function _temp3() {
              return getCombination(_extends({}, values), cloneFields, {
                name: name,
                form: form,
                initialValues: initialValues
              });
            }
            var arr = Object.keys(actionRef.current);
            var _temp2 = _forTo(arr, function (i) {
              var key = arr[i];
              var _temp = function () {
                if (typeof actionRef.current[key].validateFields === 'function') {
                  return Promise.resolve(actionRef.current[key].validateFields()).then(function () {});
                }
              }();
              if (_temp && _temp.then) return _temp.then(function () {});
            });
            return _temp2 && _temp2.then ? _temp2.then(_temp3) : _temp3(_temp2);
          });
        }, function (errorInfo) {
          if (scrollToFirstError) {
            setTimeout(function () {
              var el = (getScrollContainer === null || getScrollContainer === void 0 ? void 0 : getScrollContainer()) || document;
              scrollToElement(el, el === null || el === void 0 ? void 0 : el.querySelector('.ant-form-item-has-error'));
            }, 50);
          }
          console.error('validator fail ->', errorInfo);
          throw errorInfo;
        }));
      } catch (e) {
        return Promise.reject(e);
      }
    },
    touchFieldsRender: function touchFieldsRender(names) {
      event.publishFields(names);
    },
    mergeFieldByName: function mergeFieldByName(fieldName, newField, customizer) {
      event.publishMergeField(fieldName, newField, customizer);
    },
    getFieldByName: function getFieldByName(fieldName) {
      var field = cloneFields.find(function (i) {
        return i.name === fieldName;
      });
      return cloneDeep$1(field);
    },
    getFieldOption: function (fieldName) {
      try {
        return Promise.resolve(AsyncOptionsCache[name + "_" + fieldName]).then(function (_AsyncOptionsCache) {
          function _temp5() {
            return Promise.resolve(AsyncOptionsCache[name + "_" + fieldName]).then(function (_AsyncOptionsCache2) {
              return _AsyncOptionsCache2 || [];
            });
          }
          var _temp4 = function () {
            if (!_AsyncOptionsCache) {
              return Promise.resolve(new Promise(function (res) {
                return setTimeout(res, 100, true);
              })).then(function () {});
            }
          }();
          return _temp4 && _temp4.then ? _temp4.then(_temp5) : _temp5(_temp4);
        });
      } catch (e) {
        return Promise.reject(e);
      }
    },
    setFieldOption: function (fieldName, options) {
      try {
        AsyncOptionsCache[name + "_" + fieldName] = options;
        return Promise.resolve();
      } catch (e) {
        return Promise.reject(e);
      }
    },
    clearValues: function (names) {
      try {
        if (names) {
          names.forEach(function (fieldName) {
            var _form$setFieldsValue;
            form.setFieldsValue((_form$setFieldsValue = {}, _form$setFieldsValue[fieldName] = undefined, _form$setFieldsValue));
          });
        } else {
          form.setFieldsValue(Object.keys(form.getFieldsValue()).reduce(function (name1, name2) {
            var _extends2;
            return _extends({}, name1, (_extends2 = {}, _extends2[name2] = undefined, _extends2));
          }, {}));
        }
        return Promise.resolve();
      } catch (e) {
        return Promise.reject(e);
      }
    },
    formListInstance: actionRef.current,
    setFormLoading: setSpin,
    setInitialValues: function setInitialValues(values) {
      forceUpdate(values);
    },
    setFieldsValueTouchOnValuesChange: function setFieldsValueTouchOnValuesChange(value) {
      form.setFieldsValue(value);
      onChange(value, form.getFieldsValue(true));
    }
  }));
};

var _excluded$w = ["fields", "widgets", "readOnly", "disabled", "disabledFields", "form", "column", "gridStyle", "className", "initialValues", "onValuesChange", "locale", "getScrollContainer", "scrollToFirstError", "readOnlyEmptyValueNode", "formConfig", "readOnlyClean", "forceUpdate", "name"];
var labelColMap = [4, 6, 8, 10];
var wrapperColMap = [20, 18, 16, 14];
var Form = (function (_ref) {
  var _rest$labelCol, _rest$wrapperCol;
  var _ref$fields = _ref.fields,
    fields = _ref$fields === void 0 ? [] : _ref$fields,
    _ref$widgets = _ref.widgets,
    widgets = _ref$widgets === void 0 ? {} : _ref$widgets,
    _ref$readOnly = _ref.readOnly,
    readOnly = _ref$readOnly === void 0 ? false : _ref$readOnly,
    _ref$disabled = _ref.disabled,
    disabled = _ref$disabled === void 0 ? false : _ref$disabled,
    _ref$disabledFields = _ref.disabledFields,
    disabledFields = _ref$disabledFields === void 0 ? [] : _ref$disabledFields,
    _ref$form = _ref.form,
    form = _ref$form === void 0 ? FormLib.useForm()[0] : _ref$form,
    _ref$column = _ref.column,
    column = _ref$column === void 0 ? 1 : _ref$column,
    _ref$gridStyle = _ref.gridStyle,
    gridStyle = _ref$gridStyle === void 0 ? {
      columnGap: 20,
      rowGap: 0
    } : _ref$gridStyle,
    _ref$className = _ref.className,
    className = _ref$className === void 0 ? '' : _ref$className,
    _ref$initialValues = _ref.initialValues,
    initialValues = _ref$initialValues === void 0 ? {} : _ref$initialValues,
    _ref$onValuesChange = _ref.onValuesChange,
    onValuesChange = _ref$onValuesChange === void 0 ? function () {} : _ref$onValuesChange,
    _ref$locale = _ref.locale,
    locale = _ref$locale === void 0 ? zhCN : _ref$locale,
    getScrollContainer = _ref.getScrollContainer,
    _ref$scrollToFirstErr = _ref.scrollToFirstError,
    scrollToFirstError = _ref$scrollToFirstErr === void 0 ? true : _ref$scrollToFirstErr,
    readOnlyEmptyValueNode = _ref.readOnlyEmptyValueNode,
    _ref$formConfig = _ref.formConfig,
    formConfig = _ref$formConfig === void 0 ? {} : _ref$formConfig,
    _ref$readOnlyClean = _ref.readOnlyClean,
    readOnlyClean = _ref$readOnlyClean === void 0 ? false : _ref$readOnlyClean,
    forceUpdate = _ref.forceUpdate,
    name = _ref.name,
    rest = _objectWithoutPropertiesLoose(_ref, _excluded$w);
  if (readOnly) {
    gridStyle = _extends({}, gridStyle, {
      rowGap: gridStyle.rowGap || 10
    });
  }
  var layout = rest.layout || 'vertical';
  var labelCol = ((_rest$labelCol = rest.labelCol) != null ? _rest$labelCol : layout === 'vertical') ? {
    span: 24
  } : {
    span: labelColMap[column - 1]
  };
  var wrapperCol = ((_rest$wrapperCol = rest.wrapperCol) != null ? _rest$wrapperCol : layout === 'vertical') ? {
    span: 24
  } : {
    span: wrapperColMap[column - 1]
  };
  var _Form$useForm = Form$1.useForm(),
    antdForm = _Form$useForm[0];
  var event = useMemo$1(function () {
    return new EventEmit();
  }, []);
  var _useState = useState(false),
    spin = _useState[0],
    setSpin = _useState[1];
  var cloneFields = useMemo$1(function () {
    var newFields = typeof fields === 'function' ? cloneDeep(fields(form)) : cloneDeep(fields);
    transformSchema(newFields, name, column, Object.assign({}, defaultFormConfig, formConfig));
    return newFields;
  }, [fields]);
  var _initialValues = parseBeforeReceive(_extends({}, initialValues), cloneFields, {
    name: name,
    form: form,
    initialValues: initialValues
  });
  var actionRef = useRef({});
  var onChange = function onChange(value, values) {
    var key = Object.keys(value)[0];
    var field = queryFieldByName(cloneFields, key);
    var fieldValue = value[key];
    if (field.type === 'FormList' && Array.isArray(fieldValue)) {
      var index = fieldValue.findIndex(function (i) {
        return typeof i === 'object';
      });
      if (index > -1) {
        var innerName = Object.keys(fieldValue[index])[0];
        event.publish({
          name: [key, index, innerName].join(',')
        });
      }
    } else {
      event.publish({
        name: key
      });
    }
    onValuesChange(value, values);
  };
  expansionInstanceMethod({
    form: form,
    antdForm: antdForm,
    name: name,
    initialValues: _initialValues,
    cloneFields: cloneFields,
    event: event,
    scrollToFirstError: scrollToFirstError,
    getScrollContainer: getScrollContainer,
    actionRef: actionRef,
    setSpin: setSpin,
    forceUpdate: forceUpdate,
    onChange: onChange
  });
  var RenderFieldSet = function RenderFieldSet(_ref2) {
    var _field$props, _field$props2, _field$props3, _field$props4;
    var field = _ref2.field;
    var childrenFields = typeof ((_field$props = field.props) === null || _field$props === void 0 ? void 0 : _field$props.children) === 'function' ? (_field$props2 = field.props) === null || _field$props2 === void 0 ? void 0 : _field$props2.children(form) : (_field$props3 = field.props) === null || _field$props3 === void 0 ? void 0 : _field$props3.children;
    if (typeof ((_field$props4 = field.props) === null || _field$props4 === void 0 ? void 0 : _field$props4.children) === 'function') {
      transformSchema(childrenFields, name, field.props.column, Object.assign({}, defaultFormConfig, formConfig));
    }
    return childrenFields ? React__default.createElement(Grid, {
      gridStyle: field.props.gridStyle || gridStyle,
      column: field.props.column
    }, React__default.createElement(RenderFields, {
      itemFields: childrenFields || []
    })) : React__default.createElement(Empty, {
      image: Empty.PRESENTED_IMAGE_SIMPLE
    });
  };
  var RenderFields = useCallback(function (_ref3) {
    var _ref3$itemFields = _ref3.itemFields,
      itemFields = _ref3$itemFields === void 0 ? [] : _ref3$itemFields;
    return React__default.createElement(React__default.Fragment, null, itemFields.map(function (field, index) {
      var _field$props8;
      if (field.type === 'FieldSet') {
        var _field$props5, _field$props6, _field$props7;
        var style = field.style || {};
        if (field.span) {
          style = _extends({}, style, {
            gridColumnStart: "span " + field.span
          });
        }
        if (!field.name) {
          console.warn('FieldSet 缺少 name 属性');
        }
        var FormItem = React__default.createElement(FieldSet, {
          key: field.name,
          fieldName: field.name,
          className: (_field$props5 = field.props) === null || _field$props5 === void 0 ? void 0 : _field$props5.className,
          label: field.label,
          style: style,
          extra: (_field$props6 = field.props) === null || _field$props6 === void 0 ? void 0 : _field$props6.extra,
          subTitle: (_field$props7 = field.props) === null || _field$props7 === void 0 ? void 0 : _field$props7.subTitle,
          form: form,
          initialValues: _initialValues,
          effect: field.effect,
          isShow: field.isShow,
          event: event
        }, React__default.createElement(RenderFieldSet, {
          field: field
        }));
        var vNode = FormItem;
        if (typeof field.itemRender === 'function') {
          vNode = field.itemRender(FormItem, {
            field: field,
            form: form,
            disabled: disabled,
            readOnly: readOnly
          });
        }
        return vNode;
      }
      return React__default.createElement(Item, {
        event: event,
        disabled: disabled || (field === null || field === void 0 ? void 0 : (_field$props8 = field.props) === null || _field$props8 === void 0 ? void 0 : _field$props8.disabled) || disabledFields.includes(field.name),
        readOnly: readOnly,
        onChange: onChange,
        readOnlyClean: readOnlyClean,
        form: form,
        widgets: widgets,
        initialValues: _initialValues,
        field: field,
        key: field.name || field.key || index,
        readOnlyEmptyValueNode: readOnlyEmptyValueNode,
        actionRef: ['FormList', 'TableList', 'EditableTable'].includes(field.type) ? actionRef : undefined
      });
    }));
  }, [disabled, readOnly]);
  var _className = ["slick-form-" + layout];
  if (className) {
    _className.push(className);
  }
  if (readOnly) {
    _className.push('slick-form-readonly');
  }
  return React__default.createElement(ConfigProvider, {
    locale: locale
  }, React__default.createElement(Form$1, Object.assign({
    layout: layout,
    labelCol: labelCol,
    wrapperCol: wrapperCol,
    className: _className.join(' '),
    form: antdForm,
    name: name,
    initialValues: _initialValues,
    onValuesChange: onChange
  }, rest), React__default.createElement(Spin, {
    spinning: spin,
    wrapperClassName: "slick-form-spin"
  }, React__default.createElement(Grid, {
    gridStyle: gridStyle,
    column: column
  }, React__default.createElement(RenderFields, {
    itemFields: cloneFields
  })))));
});

var _excluded$x = ["form", "onMount", "formConfig"];
var FormLib = function FormLib(formProps) {
  var globalConfig = getGlobalConfigByName('Form', formProps);
  var _Object$assign = Object.assign({}, formProps, globalConfig, {
      formConfig: _extends({}, defaultFormConfig, formProps.formConfig, globalConfig.formConfig)
    }),
    _Object$assign$form = _Object$assign.form,
    form = _Object$assign$form === void 0 ? FormLib.useForm()[0] : _Object$assign$form,
    onMount = _Object$assign.onMount,
    formConfig = _Object$assign.formConfig,
    props = _objectWithoutPropertiesLoose(_Object$assign, _excluded$x);
  var _useState = useState(Math.random()),
    reload = _useState[0],
    setReload = _useState[1];
  var _useState2 = useState(props.initialValues),
    initialValues = _useState2[0],
    setInitialValues = _useState2[1];
  var forceUpdate = function forceUpdate(values) {
    setInitialValues(values);
    setReload(Math.random());
  };
  var fields = props.fields || [];
  if (props.children) {
    jsxToSchema(props.children, fields);
  }
  var firstRender = useRef(true);
  var name = useMemo$1(function () {
    return "form_" + uuid(10);
  }, []);
  useEffect(function () {
    if (firstRender.current) {
      firstRender.current = false;
      onMount === null || onMount === void 0 ? void 0 : onMount(form);
    }
    return function () {
      Object.keys(AsyncOptionsCache).forEach(function (key) {
        if (key.startsWith(name)) {
          delete AsyncOptionsCache[key];
        }
      });
    };
  }, []);
  return React__default.createElement(Form, Object.assign({}, props, {
    key: reload,
    form: form,
    name: name,
    initialValues: initialValues,
    fields: fields,
    forceUpdate: forceUpdate,
    formConfig: formConfig
  }));
};
FormLib.AutoComplete = function (props) {
  return React__default.createElement("div", null);
};
FormLib.InputNumber = function (props) {
  return React__default.createElement("div", null);
};
FormLib.Input = function (props) {
  return React__default.createElement("div", null);
};
FormLib.Select = function (props) {
  return React__default.createElement("div", null);
};
FormLib.Password = function (props) {
  return React__default.createElement("div", null);
};
FormLib.TextArea = function (props) {
  return React__default.createElement("div", null);
};
FormLib.Rate = function (props) {
  return React__default.createElement("div", null);
};
FormLib.Slider = function (props) {
  return React__default.createElement("div", null);
};
FormLib.RadioGroup = function (props) {
  return React__default.createElement("div", null);
};
FormLib.CheckGroup = function (props) {
  return React__default.createElement("div", null);
};
FormLib.DatePicker = function (props) {
  return React__default.createElement("div", null);
};
FormLib.RangePicker = function (props) {
  return React__default.createElement("div", null);
};
FormLib.TimePicker = function (props) {
  return React__default.createElement("div", null);
};
FormLib.TimeRange = function (props) {
  return React__default.createElement("div", null);
};
FormLib.Cascader = function (props) {
  return React__default.createElement("div", null);
};
FormLib.TreeSelect = function (props) {
  return React__default.createElement("div", null);
};
FormLib.Upload = function (props) {
  return React__default.createElement("div", null);
};
FormLib.Switch = function (props) {
  return React__default.createElement("div", null);
};
FormLib.AsyncSelect = function (props) {
  return React__default.createElement("div", null);
};
FormLib.AsyncTreeSelect = function (props) {
  return React__default.createElement("div", null);
};
FormLib.DebounceSelect = function (props) {
  return React__default.createElement("div", null);
};
FormLib.AsyncCascader = function (props) {
  return React__default.createElement("div", null);
};
FormLib.AsyncCheckGroup = function (props) {
  return React__default.createElement("div", null);
};
FormLib.AsyncRadioGroup = function (props) {
  return React__default.createElement("div", null);
};
FormLib.BlockQuote = function (props) {
  return React__default.createElement("div", null);
};
FormLib.FieldSet = function (props) {
  return React__default.createElement("div", null);
};
FormLib.UploadImage = function (props) {
  return React__default.createElement("div", null);
};
FormLib.useForm = function () {
  var ref = React__default.useRef({
    getValues: function getValues() {},
    setValues: function setValues(data) {},
    clearValues: function clearValues() {},
    mergeFieldByName: function mergeFieldByName(name, newField) {},
    getFieldByName: function getFieldByName(name) {},
    touchFieldsRender: function touchFieldsRender(names) {},
    getFieldOption: function (fieldName) {
      return Promise.resolve();
    },
    setFieldOption: function (fieldName, options) {
      return Promise.resolve();
    },
    submit: function submit() {},
    setFieldsValue: function setFieldsValue(value) {},
    getFieldValue: function getFieldValue(name) {},
    validateFields: function (nameList) {
      return Promise.resolve();
    },
    getFieldsValue: function getFieldsValue(nameList, filterFunc) {},
    setInitialValues: function setInitialValues(params) {},
    search: function search(params) {},
    reset: function reset() {},
    refresh: function refresh() {},
    resetFields: function resetFields(fields) {},
    setFormLoading: function setFormLoading() {},
    setFooterDisabled: function setFooterDisabled() {},
    setFooterActions: function setFooterActions() {},
    setFieldValue: function setFieldValue() {}
  });
  return [ref.current];
};
Object.assign(FormLib, BuiltInWidgetMapping);

var Footer = (function (_ref) {
  var _ref$actions = _ref.actions,
    actions = _ref$actions === void 0 ? [] : _ref$actions,
    actionClick = _ref.actionClick,
    validatorForm = _ref.validatorForm,
    form = _ref.form,
    cancelConfirm = _ref.cancelConfirm,
    okConfirm = _ref.okConfirm;
  var _useState = useState(false),
    disabled = _useState[0],
    setDisabled = _useState[1];
  var _useState2 = useState(actions),
    innerActions = _useState2[0],
    setInnerActions = _useState2[1];
  useEffect(function () {
    setInnerActions(actions);
  }, [actions]);
  useEffect(function () {
    Object.assign(form, {
      setFooterDisabled: setDisabled,
      setFooterActions: setInnerActions
    });
  }, []);
  if (!Array.isArray(innerActions)) {
    return null;
  }
  return React__default.createElement(Space, null, innerActions.filter(function (i) {
    return i.visible !== false;
  }).map(function (action) {
    var options = {};
    if (action.validator) {
      options.onBeforeClick = function () {
        try {
          return Promise.resolve(validatorForm()).then(function () {});
        } catch (e) {
          return Promise.reject(e);
        }
      };
    }
    return React__default.createElement(ProButton, Object.assign({
      confirm: action.type === 'primary' ? okConfirm : cancelConfirm,
      disabled: disabled,
      key: action.label
    }, options, action, {
      onClick: function () {
        try {
          return Promise.resolve(actionClick(action)).then(function () {});
        } catch (e) {
          return Promise.reject(e);
        }
      }
    }), action.label);
  }));
});

var _excluded$y = ["cardProps", "form", "width", "title", "onClose", "onSubmit", "footer", "actionAlign", "cancelText", "confirmText", "actions"];
var CardForm = (function (_ref) {
  var _ref$cardProps = _ref.cardProps,
    cardProps = _ref$cardProps === void 0 ? {} : _ref$cardProps,
    _ref$form = _ref.form,
    form = _ref$form === void 0 ? FormLib.useForm()[0] : _ref$form,
    _ref$width = _ref.width,
    width = _ref$width === void 0 ? '100%' : _ref$width,
    title = _ref.title,
    _ref$onClose = _ref.onClose,
    onClose = _ref$onClose === void 0 ? function () {} : _ref$onClose,
    _ref$onSubmit = _ref.onSubmit,
    onSubmit = _ref$onSubmit === void 0 ? function () {} : _ref$onSubmit,
    _ref$footer = _ref.footer,
    footer = _ref$footer === void 0 ? true : _ref$footer,
    _ref$actionAlign = _ref.actionAlign,
    actionAlign = _ref$actionAlign === void 0 ? 'end' : _ref$actionAlign,
    _ref$cancelText = _ref.cancelText,
    cancelText = _ref$cancelText === void 0 ? '取消' : _ref$cancelText,
    _ref$confirmText = _ref.confirmText,
    confirmText = _ref$confirmText === void 0 ? '保存' : _ref$confirmText,
    actions = _ref.actions,
    rest = _objectWithoutPropertiesLoose(_ref, _excluded$y);
  var _actions = actions || [{
    label: cancelText,
    onClick: onClose
  }, {
    label: confirmText,
    type: 'primary',
    validator: true,
    spin: true,
    onClick: onSubmit
  }];
  var id = useMemo$1(function () {
    return uuid(10);
  }, []);
  var validatorForm = function validatorForm() {
    try {
      return Promise.resolve(_catch(function () {
        return Promise.resolve(form.submit());
      }, function (errorInfo) {
        console.error('validatorForm fail ->', errorInfo);
        throw errorInfo;
      }));
    } catch (e) {
      return Promise.reject(e);
    }
  };
  var actionClick = function actionClick(action) {
    try {
      var _temp3 = function () {
        if (typeof action.onClick === 'function') {
          var _temp2 = function _temp2() {
            return Promise.resolve(action.onClick(_data)).then(function () {});
          };
          var _data = form.getValues();
          var _temp = function () {
            if (action.validator) {
              return Promise.resolve(validatorForm()).then(function (_validatorForm) {
                _data = _validatorForm;
              });
            }
          }();
          return _temp && _temp.then ? _temp.then(_temp2) : _temp2(_temp);
        }
      }();
      return Promise.resolve(_temp3 && _temp3.then ? _temp3.then(function () {}) : void 0);
    } catch (e) {
      return Promise.reject(e);
    }
  };
  return React__default.createElement("div", {
    className: "card-" + id + " card-form-" + actionAlign,
    style: {
      width: width
    }
  }, React__default.createElement(Card, Object.assign({}, cardProps, {
    title: title,
    actions: footer ? [React__default.createElement(Footer, {
      actions: _actions,
      actionClick: actionClick,
      validatorForm: validatorForm,
      form: form
    })] : null
  }), React__default.createElement(FormLib, Object.assign({
    form: form
  }, rest, {
    getScrollContainer: function getScrollContainer() {
      return document.querySelector(".card-" + id + " .ant-card-body");
    }
  }))));
});

var _excluded$z = ["drawerProps", "form", "title", "actionAlign", "className", "width", "open", "onClose", "onSubmit", "cancelConfirm", "okConfirm", "footer", "cancelText", "confirmText", "actions", "render", "closeConfirm", "footerRender"];
var DrawerForm = (function (props) {
  var globalConfig = getGlobalConfigByName('DrawerForm', props);
  var _Object$assign = Object.assign({}, props, globalConfig, {
      drawerProps: _extends({}, props.drawerProps, globalConfig.drawerProps)
    }),
    _Object$assign$drawer = _Object$assign.drawerProps,
    drawerProps = _Object$assign$drawer === void 0 ? {} : _Object$assign$drawer,
    _Object$assign$form = _Object$assign.form,
    form = _Object$assign$form === void 0 ? FormLib.useForm()[0] : _Object$assign$form,
    title = _Object$assign.title,
    _Object$assign$action = _Object$assign.actionAlign,
    actionAlign = _Object$assign$action === void 0 ? 'end' : _Object$assign$action,
    className = _Object$assign.className,
    _Object$assign$width = _Object$assign.width,
    width = _Object$assign$width === void 0 ? 500 : _Object$assign$width,
    _Object$assign$open = _Object$assign.open,
    open = _Object$assign$open === void 0 ? false : _Object$assign$open,
    _Object$assign$onClos = _Object$assign.onClose,
    onClose = _Object$assign$onClos === void 0 ? function () {} : _Object$assign$onClos,
    _Object$assign$onSubm = _Object$assign.onSubmit,
    onSubmit = _Object$assign$onSubm === void 0 ? function () {} : _Object$assign$onSubm,
    cancelConfirm = _Object$assign.cancelConfirm,
    okConfirm = _Object$assign.okConfirm,
    _Object$assign$footer = _Object$assign.footer,
    footer = _Object$assign$footer === void 0 ? true : _Object$assign$footer,
    _Object$assign$cancel = _Object$assign.cancelText,
    cancelText = _Object$assign$cancel === void 0 ? '取消' : _Object$assign$cancel,
    _Object$assign$confir = _Object$assign.confirmText,
    confirmText = _Object$assign$confir === void 0 ? '保存' : _Object$assign$confir,
    actions = _Object$assign.actions,
    render = _Object$assign.render,
    closeConfirm = _Object$assign.closeConfirm,
    footerRender = _Object$assign.footerRender,
    rest = _objectWithoutPropertiesLoose(_Object$assign, _excluded$z);
  var _staticThemeMethodHoo = staticThemeMethodHooks(),
    modal = _staticThemeMethodHoo.modal;
  var id = useMemo$1(function () {
    return uuid(10);
  }, []);
  var onHandleClose = function onHandleClose(e) {
    if (isObject(closeConfirm)) {
      modal === null || modal === void 0 ? void 0 : modal.confirm(_extends({}, closeConfirm, {
        onOk: onClose
      }));
    } else {
      onClose(e);
    }
  };
  var _useState = useState(rest.initialValues),
    value = _useState[0],
    onChange = _useState[1];
  var _actions = actions || [{
    label: cancelText,
    onClick: onHandleClose,
    cancelConfirm: cancelConfirm
  }, {
    label: confirmText,
    type: 'primary',
    validator: true,
    spin: true,
    onClick: onSubmit,
    okConfirm: okConfirm
  }];
  var validatorForm = function validatorForm() {
    try {
      return Promise.resolve(_catch(function () {
        return Promise.resolve(form.submit());
      }, function (errorInfo) {
        console.error('validatorForm fail ->', errorInfo);
        throw errorInfo;
      }));
    } catch (e) {
      return Promise.reject(e);
    }
  };
  var actionClick = function actionClick(action) {
    try {
      var _temp4 = function () {
        if (typeof action.onClick === 'function') {
          var _temp3 = function _temp3() {
            return Promise.resolve(action.onClick(_data)).then(function () {});
          };
          var _data = {};
          var _temp2 = function () {
            if (typeof render === 'function') {
              _data = value;
            } else {
              _data = form.getValues();
              var _temp = function () {
                if (action.validator) {
                  return Promise.resolve(validatorForm()).then(function (_validatorForm) {
                    _data = _validatorForm;
                  });
                }
              }();
              if (_temp && _temp.then) return _temp.then(function () {});
            }
          }();
          return _temp2 && _temp2.then ? _temp2.then(_temp3) : _temp3(_temp2);
        }
      }();
      return Promise.resolve(_temp4 && _temp4.then ? _temp4.then(function () {}) : void 0);
    } catch (e) {
      return Promise.reject(e);
    }
  };
  var _className = ["drawer-" + id, "drawer-form-" + actionAlign];
  if (className) {
    _className.push(className);
  }
  var footerNode = false;
  if (typeof footerRender === 'function') {
    footerNode = footerRender(form);
  } else if (footer) {
    footerNode = React__default.createElement(Footer, {
      actions: _actions,
      actionClick: actionClick,
      validatorForm: validatorForm,
      form: form,
      cancelConfirm: cancelConfirm,
      okConfirm: okConfirm
    });
  }
  return React__default.createElement(Drawer, Object.assign({}, _extends({
    getContainer: false
  }, drawerProps), {
    className: _className.join(' '),
    width: width,
    title: title,
    open: open,
    onClose: onHandleClose,
    footer: footerNode
  }), typeof render === 'function' ? render({
    value: value,
    onChange: onChange
  }) : React__default.createElement(FormLib, Object.assign({
    form: form
  }, rest, {
    getScrollContainer: function getScrollContainer() {
      return document.querySelector(".drawer-" + id + " .ant-drawer-body");
    }
  })));
});

var _excluded$A = ["modalProps", "form", "title", "actionAlign", "className", "width", "open", "onClose", "onSubmit", "cancelConfirm", "okConfirm", "footer", "cancelText", "confirmText", "actions", "render", "closeConfirm", "drag", "footerRender"];
var ModalForm = (function (_ref) {
  var modalProps = _ref.modalProps,
    _ref$form = _ref.form,
    form = _ref$form === void 0 ? FormLib.useForm()[0] : _ref$form,
    title = _ref.title,
    _ref$actionAlign = _ref.actionAlign,
    actionAlign = _ref$actionAlign === void 0 ? 'end' : _ref$actionAlign,
    className = _ref.className,
    _ref$width = _ref.width,
    width = _ref$width === void 0 ? 500 : _ref$width,
    _ref$open = _ref.open,
    open = _ref$open === void 0 ? false : _ref$open,
    _ref$onClose = _ref.onClose,
    onClose = _ref$onClose === void 0 ? function () {} : _ref$onClose,
    _ref$onSubmit = _ref.onSubmit,
    onSubmit = _ref$onSubmit === void 0 ? function () {} : _ref$onSubmit,
    cancelConfirm = _ref.cancelConfirm,
    okConfirm = _ref.okConfirm,
    _ref$footer = _ref.footer,
    footer = _ref$footer === void 0 ? true : _ref$footer,
    _ref$cancelText = _ref.cancelText,
    cancelText = _ref$cancelText === void 0 ? '取消' : _ref$cancelText,
    _ref$confirmText = _ref.confirmText,
    confirmText = _ref$confirmText === void 0 ? '保存' : _ref$confirmText,
    actions = _ref.actions,
    render = _ref.render,
    closeConfirm = _ref.closeConfirm,
    _ref$drag = _ref.drag,
    drag = _ref$drag === void 0 ? false : _ref$drag,
    footerRender = _ref.footerRender,
    rest = _objectWithoutPropertiesLoose(_ref, _excluded$A);
  var id = useMemo$1(function () {
    return uuid(10);
  }, []);
  var _staticThemeMethodHoo = staticThemeMethodHooks(),
    modal = _staticThemeMethodHoo.modal;
  var onHandleClose = function onHandleClose(e) {
    if (isObject(closeConfirm)) {
      modal === null || modal === void 0 ? void 0 : modal.confirm(_extends({}, closeConfirm, {
        onOk: onClose
      }));
    } else {
      onClose(e);
    }
  };
  var _useState = useState(rest.initialValues),
    value = _useState[0],
    onChange = _useState[1];
  var _actions = actions || [{
    label: cancelText,
    onClick: onHandleClose
  }, {
    label: confirmText,
    type: 'primary',
    validator: true,
    spin: true,
    onClick: onSubmit
  }];
  var validatorForm = function validatorForm() {
    try {
      return Promise.resolve(_catch(function () {
        return Promise.resolve(form.submit());
      }, function (errorInfo) {
        console.error('validatorForm fail ->', errorInfo);
        throw errorInfo;
      }));
    } catch (e) {
      return Promise.reject(e);
    }
  };
  var actionClick = function actionClick(action) {
    try {
      var _temp4 = function () {
        if (typeof action.onClick === 'function') {
          var _temp3 = function _temp3() {
            return Promise.resolve(action.onClick(_data)).then(function () {});
          };
          var _data = {};
          var _temp2 = function () {
            if (typeof render === 'function') {
              _data = value;
            } else {
              _data = form.getValues();
              var _temp = function () {
                if (action.validator) {
                  return Promise.resolve(validatorForm()).then(function (_validatorForm) {
                    _data = _validatorForm;
                  });
                }
              }();
              if (_temp && _temp.then) return _temp.then(function () {});
            }
          }();
          return _temp2 && _temp2.then ? _temp2.then(_temp3) : _temp3(_temp2);
        }
      }();
      return Promise.resolve(_temp4 && _temp4.then ? _temp4.then(function () {}) : void 0);
    } catch (e) {
      return Promise.reject(e);
    }
  };
  var _className = ["modal-" + id, "modal-form-" + actionAlign];
  if (className) {
    _className.push(className);
  }
  var draggleRef = useRef(null);
  var _useState2 = useState(false),
    disabled = _useState2[0],
    setDisabled = _useState2[1];
  var _useState3 = useState({
      left: 0,
      top: 0,
      bottom: 0,
      right: 0
    }),
    bounds = _useState3[0],
    setBounds = _useState3[1];
  var _onStart = function onStart(_event, uiData) {
    var _draggleRef$current;
    var _window$document$docu = window.document.documentElement,
      clientWidth = _window$document$docu.clientWidth,
      clientHeight = _window$document$docu.clientHeight;
    var targetRect = (_draggleRef$current = draggleRef.current) === null || _draggleRef$current === void 0 ? void 0 : _draggleRef$current.getBoundingClientRect();
    if (!targetRect) {
      return;
    }
    setBounds({
      left: -targetRect.left + uiData.x,
      right: clientWidth - (targetRect.right - uiData.x),
      top: -targetRect.top + uiData.y,
      bottom: clientHeight - (targetRect.bottom - uiData.y)
    });
  };
  var renderTitle = drag ? React__default.createElement("div", {
    style: {
      width: '100%',
      cursor: 'move'
    },
    onMouseOver: function onMouseOver() {
      if (disabled) {
        setDisabled(false);
      }
    },
    onMouseOut: function onMouseOut() {
      setDisabled(true);
    }
  }, title) : title;
  var footerNode = false;
  if (typeof footerRender === 'function') {
    footerNode = footerRender(form);
  } else if (footer) {
    footerNode = React__default.createElement(Footer, {
      actions: _actions,
      actionClick: actionClick,
      validatorForm: validatorForm,
      form: form,
      cancelConfirm: cancelConfirm,
      okConfirm: okConfirm
    });
  }
  return React__default.createElement(Modal, Object.assign({}, _extends({
    getContainer: false
  }, modalProps), {
    className: _className.join(' '),
    width: width,
    open: open,
    title: renderTitle,
    onCancel: onHandleClose,
    modalRender: drag ? function (modals) {
      return React__default.createElement(Draggable, {
        disabled: disabled,
        bounds: bounds,
        onStart: function onStart(event, uiData) {
          return _onStart(event, uiData);
        }
      }, React__default.createElement("div", {
        ref: draggleRef
      }, modals));
    } : undefined,
    footer: footerNode
  }), typeof render === 'function' ? render({
    value: value,
    onChange: onChange
  }) : React__default.createElement(FormLib, Object.assign({
    form: form
  }, rest, {
    getScrollContainer: function getScrollContainer() {
      return document.querySelector(".modal-" + id + " .ant-modal-body");
    }
  })));
});

var _excluded$B = ["type"],
  _excluded2$5 = ["maskClosable"];
var WarperMapping = {
  Panel: CardForm,
  Modal: ModalForm,
  Drawer: DrawerForm
};
function FormSubmit(_ref) {
  var _ref$type = _ref.type,
    type = _ref$type === void 0 ? 'Panel' : _ref$type,
    props = _objectWithoutPropertiesLoose(_ref, _excluded$B);
  var Popup = WarperMapping[type];
  var maskClosable = props.maskClosable,
    rest = _objectWithoutPropertiesLoose(props, _excluded2$5);
  if (type === 'Modal') {
    return React__default.createElement(Popup, Object.assign({}, rest, {
      modalProps: {
        maskClosable: !!maskClosable
      }
    }));
  } else if (type === 'Drawer') {
    return React__default.createElement(Popup, Object.assign({}, rest, {
      drawerProps: {
        maskClosable: !!maskClosable
      }
    }));
  } else {
    return React__default.createElement(Popup, Object.assign({}, rest));
  }
}

var _excluded$C = ["current", "onStepsClick", "form", "stepProps", "steps"];
var step = (function (_ref) {
  var _ref$current = _ref.current,
    current = _ref$current === void 0 ? 0 : _ref$current,
    _ref$onStepsClick = _ref.onStepsClick,
    onStepsClick = _ref$onStepsClick === void 0 ? function () {} : _ref$onStepsClick,
    _ref$form = _ref.form,
    form = _ref$form === void 0 ? FormLib.useForm()[0] : _ref$form,
    _ref$stepProps = _ref.stepProps,
    stepProps = _ref$stepProps === void 0 ? {} : _ref$stepProps,
    steps = _ref.steps,
    rest = _objectWithoutPropertiesLoose(_ref, _excluded$C);
  var validatorForm = function validatorForm() {
    try {
      return Promise.resolve(_catch(function () {
        return Promise.resolve(form.submit());
      }, function (errorInfo) {
        console.error('validatorForm fail ->', errorInfo);
        throw errorInfo;
      }));
    } catch (e) {
      return Promise.reject(e);
    }
  };
  var actionClick = function actionClick(action) {
    try {
      var _temp3 = function () {
        if (typeof action.onClick === 'function') {
          var _temp2 = function _temp2() {
            return Promise.resolve(action.onClick(_data)).then(function () {});
          };
          var _data = form.getValues();
          var _temp = function () {
            if (action.validator) {
              return Promise.resolve(validatorForm()).then(function (_validatorForm) {
                _data = _validatorForm;
              });
            }
          }();
          return _temp && _temp.then ? _temp.then(_temp2) : _temp2(_temp);
        }
      }();
      return Promise.resolve(_temp3 && _temp3.then ? _temp3.then(function () {}) : void 0);
    } catch (e) {
      return Promise.reject(e);
    }
  };
  return React__default.createElement("div", {
    className: "slick-form-step-form"
  }, React__default.createElement("div", {
    className: "slick-form-step-form-header"
  }, React__default.createElement(Steps, Object.assign({}, stepProps, {
    current: current,
    onChange: onStepsClick
  }), steps === null || steps === void 0 ? void 0 : steps.map(function (step) {
    return React__default.createElement(Steps.Step, {
      title: step.title,
      description: step.description
    });
  }))), React__default.createElement("div", {
    className: "slick-form-step-form-body"
  }, React__default.createElement(FormLib, Object.assign({}, rest, {
    fields: steps.map(function (step, index) {
      return step.fields.map(function (field) {
        return _extends({}, field, {
          hidden: index !== current ? true : field.hidden,
          required: index !== current ? false : field.required,
          rules: index !== current ? [] : field.rules
        });
      });
    }).flat(),
    form: form,
    column: steps[current].column
  }))), React__default.createElement("div", {
    className: "slick-form-step-form-footer"
  }, React__default.createElement(Footer, {
    actions: steps[current].actions,
    actionClick: actionClick,
    validatorForm: validatorForm,
    form: form
  })));
});

var useCreatePage = (function () {
  var _useState = useState({
      key: null,
      data: {},
      newTab: false
    }),
    layer = _useState[0],
    setLayer = _useState[1];
  return {
    open: function open(key, data, newTab) {
      if (data === void 0) {
        data = {};
      }
      if (newTab === void 0) {
        newTab = false;
      }
      setLayer({
        key: key,
        data: data,
        newTab: newTab
      });
    },
    close: function close() {
      setLayer({
        key: null,
        data: {},
        newTab: false
      });
    },
    createPage: function createPage(Page, Layers) {
      if (Layers === void 0) {
        Layers = {};
      }
      var Layer = Layers[layer.key] || null;
      return React__default.createElement("div", null, React__default.createElement("div", {
        style: {
          display: layer.newTab ? 'none' : 'block'
        }
      }, Page), Layer && React__default.createElement(Layer, {
        data: layer.data
      }));
    }
  };
});

var useSpin = (function (props) {
  if (props === void 0) {
    props = {
      spinning: false
    };
  }
  var _useState = useState(props.spinning || false),
    spin = _useState[0],
    setSpin = _useState[1];
  var SpinContainer = function SpinContainer(_ref) {
    var children = _ref.children;
    return React__default.createElement(Spin, Object.assign({}, props, {
      spinning: spin
    }), children);
  };
  return {
    closeSpin: setSpin.bind(null, false),
    openSpin: setSpin.bind(null, true),
    SpinContainer: SpinContainer
  };
});

var useTimer = (function (_ref) {
  var _ref$max = _ref.max,
    max = _ref$max === void 0 ? 60 : _ref$max,
    _ref$min = _ref.min,
    min = _ref$min === void 0 ? 0 : _ref$min,
    _ref$time = _ref.time,
    time = _ref$time === void 0 ? 1000 : _ref$time;
  var _useState = useState(max),
    count = _useState[0],
    setCount = _useState[1];
  var _useState2 = useState(true),
    flag = _useState2[0],
    setFlag = _useState2[1];
  var timeRef = useRef(null);
  var start = function start() {
    setCount(count - 1);
    setFlag(true);
  };
  var stop = function stop() {
    return setFlag(false);
  };
  var reset = function reset() {
    stop();
    setCount(max);
  };
  useEffect(function () {
    if (count > min && count !== max && flag) {
      timeRef.current = setTimeout(function () {
        setCount(count - 1);
      }, time);
    } else {
      clearTimeout(timeRef.current);
    }
    return function () {
      return clearTimeout(timeRef.current);
    };
  }, [count, flag]);
  return {
    start: start,
    count: count,
    stop: stop,
    reset: reset
  };
});

var Paragraph = Typography.Paragraph;
var index$1 = (function (_ref) {
  var _ref$rows = _ref.rows,
    rows = _ref$rows === void 0 ? 2 : _ref$rows,
    text = _ref.text,
    _ref$expandText = _ref.expandText,
    expandText = _ref$expandText === void 0 ? '展开' : _ref$expandText,
    _ref$packupText = _ref.packupText,
    packupText = _ref$packupText === void 0 ? '收起' : _ref$packupText,
    className = _ref.className;
  var _useState = useState(false),
    showAll = _useState[0],
    setShowAll = _useState[1];
  var _useState2 = useState(Math.random()),
    key = _useState2[0],
    setKey = _useState2[1];
  var toggleAll = function toggleAll() {
    setShowAll(!showAll);
  };
  useEffect(function () {
    setKey(Math.random());
  }, [showAll]);
  return React__default.createElement("div", {
    className: classnames('slick-form-long-text', className)
  }, React__default.createElement(Paragraph, {
    key: key,
    ellipsis: showAll ? false : {
      rows: rows,
      expandable: true,
      symbol: React__default.createElement("span", {
        onClick: toggleAll
      }, expandText)
    },
    style: {
      margin: 0
    }
  }, text, showAll && React__default.createElement("span", {
    className: "slick-form-pack-up",
    onClick: toggleAll
  }, packupText)));
});

var notify = function notify(description, type) {
  if (type === void 0) {
    type = 'success';
  }
  notification$1 === null || notification$1 === void 0 ? void 0 : notification$1[type]({
    message: '提示',
    description: description
  });
};
var index$2 = (function (_ref) {
  var _ref$Page = _ref.Page,
    Page = _ref$Page === void 0 ? function () {} : _ref$Page,
    _ref$Layers = _ref.Layers,
    Layers = _ref$Layers === void 0 ? {} : _ref$Layers,
    _ref$properties = _ref.properties,
    properties = _ref$properties === void 0 ? {} : _ref$properties;
  var _useState = useState(Math.random()),
    refresh = _useState[0],
    setRefresh = _useState[1];
  var _Form$useForm = FormLib.useForm(),
    searchForm = _Form$useForm[0];
  var forceUpdate = function forceUpdate() {
    setRefresh(Math.random());
  };
  var _useCreatePage = useCreatePage(),
    createPage = _useCreatePage.createPage,
    open = _useCreatePage.open,
    close = _useCreatePage.close;
  var success = useCallback(function (description) {
    notification$1.success({
      message: '提示',
      description: description
    });
  }, []);
  var _Layers = useMemo$1(function () {
    var allLayer = {};
    Object.keys(Layers).forEach(function (key) {
      var Layer = Layers[key];
      allLayer[key] = function (props) {
        return React__default.createElement(Layer, Object.assign({}, properties, props, {
          notify: notify,
          close: close,
          open: open,
          success: success,
          refresh: forceUpdate,
          searchForm: searchForm
        }));
      };
    });
    return allLayer;
  }, [refresh]);
  useEffect(function () {
    Object.keys(properties).some(function (key) {
      if (['key', 'close', 'open', 'success', 'data', 'notify', 'refresh', 'searchForm'].includes(key)) {
        console.warn('properties 包含了无效的属性：', key);
        return true;
      }
      return false;
    });
  }, [properties]);
  return createPage(React__default.createElement(Page, Object.assign({}, properties, {
    key: refresh,
    notify: notify,
    open: open,
    close: close,
    success: success,
    refresh: forceUpdate,
    searchForm: searchForm
  })), _Layers);
});

var query = document.querySelector.bind(document);
function Tips(_ref) {
  var _steps, _steps2, _steps3;
  var steps = _ref.steps,
    step = _ref.step,
    switchSteps = _ref.switchSteps,
    ending = _ref.ending,
    element = _ref.element,
    okText = _ref.okText,
    jumpText = _ref.jumpText,
    previousText = _ref.previousText,
    boxWidth = _ref.width,
    _ref$theme = _ref.theme,
    theme = _ref$theme === void 0 ? 'default' : _ref$theme;
  var _useState = useState('top-left'),
    imgDire = _useState[0],
    setimgDire = _useState[1];
  var type = theme === 'line';
  var ref = useRef({
    current: {}
  });
  var setTipsPosition = function setTipsPosition() {
    var _document$body = document.body,
      offsetWidth = _document$body.offsetWidth,
      offsetHeight = _document$body.offsetHeight;
    var current = ref.current;
    if (!current) return;
    current.style.width = (steps[step - 1].width || boxWidth || 360) + "px";
    if (!element) {
      current.style.left = offsetWidth / 2 + "px";
      current.style.top = offsetHeight / 2 + "px";
      current.style.transform = 'translate(-50%,-50%)';
      return;
    }
    current.style.transform = 'translate(0,0)';
    var _element$getBoundingC = element.getBoundingClientRect(),
      height = _element$getBoundingC.height,
      width = _element$getBoundingC.width,
      left = _element$getBoundingC.left,
      top = _element$getBoundingC.top;
    var _current$getBoundingC = current.getBoundingClientRect(),
      subHeight = _current$getBoundingC.height,
      subWidth = _current$getBoundingC.width;
    var tipsBottom = top + height + subHeight + 10 + (type ? 70 : 0);
    var bottomStatus = tipsBottom > offsetHeight;
    setTriangle(bottomStatus, subHeight);
    var leftPosition = left + width / 2;
    if (type) {
      var leftFlag = leftPosition + subWidth > offsetWidth;
      current.style.top = (bottomStatus ? top - 20 - subHeight - 50 : tipsBottom - 150) + "px";
      current.style.left = (leftFlag ? left + width / 2 - subWidth : leftPosition) + "px";
      if (bottomStatus) {
        !leftFlag ? setimgDire('bottom-left') : setimgDire('bottom-right');
      } else {
        !leftFlag ? setimgDire('top-left') : setimgDire('top-right');
      }
      return;
    }
    var subLeftPosition = left + width / 2 - subWidth / 2;
    var rightFlag = offsetWidth - subWidth;
    current.style.left = (subLeftPosition > 0 ? subLeftPosition > rightFlag ? rightFlag : subLeftPosition : 0) + "px";
    current.style.top = (bottomStatus ? top - 20 - subHeight : top + height + 20) + "px";
  };
  var onResize = useCallback(debounce$1(setTipsPosition, 300), []);
  useEffect(function () {
    setTipsPosition();
    window.addEventListener('resize', onResize);
    return function () {
      window.removeEventListener('resize', onResize);
    };
  }, []);
  var setTriangle = function setTriangle(bottomStatus, subHeight) {
    var triangle = query(".slick-form-box-tips-" + (type ? 'img' : 'triangle'));
    if (!triangle) return;
    if (!type) {
      triangle.style.left = '50%';
      triangle.style.top = bottomStatus ? subHeight + "px" : '0';
    }
  };
  return React__default.createElement("div", {
    className: "slick-form-box-tips-center " + (type ? '' : 'default'),
    ref: ref
  }, ((_steps = steps[step - 1]) === null || _steps === void 0 ? void 0 : _steps.title) ? React__default.createElement("div", {
    className: "slick-form-box-tips-title"
  }, steps[step - 1].title) : '', React__default.createElement("div", {
    className: "slick-form-box-tips-body"
  }, (_steps2 = steps[step - 1]) === null || _steps2 === void 0 ? void 0 : _steps2.intro), React__default.createElement("div", {
    className: "slick-form-box-tips-footer"
  }, step !== steps.length && React__default.createElement("div", {
    id: "__step__jump",
    onClick: debounce$1(ending, 200),
    style: {
      flex: '1 1 0%',
      cursor: 'pointer'
    }
  }, jumpText || '跳过'), React__default.createElement("div", {
    className: "__provious_step",
    onClick: debounce$1(function () {
      switchSteps('proviousStep');
    }, 200)
  }, step > 1 ? "" + (previousText || '上一步') : ''), React__default.createElement(Button, {
    type: "primary",
    onClick: debounce$1(switchSteps, 200)
  }, okText || '我知道了',  "(" + step + "/" + steps.length + ")")), React__default.createElement("div", {
    className: "slick-form-box-tips-icon",
    style: {
      right: type ? 26 : 14
    }
  }, React__default.createElement("i", {
    className: "iconfont spicon-guanbi",
    style: {
      fontSize: 20
    },
    onClick: debounce$1(ending, 200)
  }), type ? React__default.createElement("div", {
    className: "slick-form-box-tips-star"
  }) : ''), ((_steps3 = steps[step - 1]) === null || _steps3 === void 0 ? void 0 : _steps3.element) ? React__default.createElement("div", {
    className: "slick-form-box-tips-" + (type ? 'img' : 'triangle') + " slick-form-box-tips-img-" + imgDire
  }) : '');
}

var query$1 = document.querySelector.bind(document);
var creatE = document.createElement.bind(document);
var deleteLight = function deleteLight(stepRef) {
  var spotlight = query$1('.slick-form-spotlight');
  var targetValue = query$1('.slick-form-spotlight-setvalue');
  if (targetValue) {
    var classList = [].concat(targetValue.classList);
    classList = classList.filter(function (i) {
      return i !== 'slick-form-spotlight-setvalue';
    });
    targetValue.setAttribute('class', "" + classList.join(' '));
  }
  spotlight && spotlight.parentElement.removeChild(spotlight);
  var body = query$1('body');
  var stepNode = query$1(".slick-form-steps-tips" + stepRef.current);
  stepNode && body.removeChild(stepNode);
};
var createdBoxSure = function createdBoxSure(overflow) {
  var root = creatE('div');
  root.setAttribute('class', 'slick-form-steps-center');
  var body = query$1('body');
  body.style.overflow = 'hidden';
  body.append(root);
};
var setSpotlight = function setSpotlight(element, flash) {
  var _element$getBoundingC = element.getBoundingClientRect(),
    height = _element$getBoundingC.height,
    width = _element$getBoundingC.width,
    left = _element$getBoundingC.left,
    top = _element$getBoundingC.top;
  var spotlight = query$1('.slick-form-spotlight');
  if (!spotlight) {
    spotlight = creatE('div');
    spotlight.setAttribute('class', "slick-form-spotlight " + (flash ? 'flash' : ''));
    var center = query$1('.slick-form-steps-center');
    center && center.append(spotlight);
    var classList = [].concat(element.classList);
    classList.push('slick-form-spotlight-setvalue');
    element.setAttribute('class', "" + classList.join(' '));
  }
  spotlight.style.width = width + "px";
  spotlight.style.height = height + "px";
  spotlight.style.left = left + "px";
  spotlight.style.top = top + "px";
  spotlight.style.zIndex = '100000';
  spotlight.style.position = 'fixed';
};
var createdTips = function createdTips(subStep) {
  var tips = creatE('div');
  tips.setAttribute('class', "slick-form-steps-tips" + subStep);
  tips.style.zIndex = '10000';
  var body = query$1('body');
  body.append(tips);
  return tips;
};

var _excluded$D = ["steps"];
var _getGlobalConfigByNam$2 = getGlobalConfigByName('themeConfig', {}),
  token$1 = _getGlobalConfigByNam$2.token;
var continerId = 'Parsley-20220412';
var overflow = '';
var Dialog = function Dialog(_ref) {
  var steps = _ref.steps,
    props = _objectWithoutPropertiesLoose(_ref, _excluded$D);
  var _useState = useState(1),
    step = _useState[0],
    setStep = _useState[1];
  var stepRef = useRef(0);
  var createdAndUpdateBoxChild = function createdAndUpdateBoxChild() {
    var subStep = (stepRef.current || step) - 1;
    if (!steps.length) return;
    var element = steps[subStep].element;
    if (!element) return;
    setSpotlight(element, props.flash);
  };
  var onResize = useCallback(debounce$1(createdAndUpdateBoxChild, 300), []);
  useEffect(function () {
    window.addEventListener('resize', onResize);
    return function () {
      overflow = '';
      query$1('body').removeChild(query$1("#" + continerId));
      window.removeEventListener('resize', onResize);
    };
  }, []);
  useEffect(function () {
    stepRef.current = step;
    createdTipsAndDes(step);
    createdBox();
  }, [step]);
  var switchSteps = function switchSteps(flag) {
    try {
      var _temp2 = function _temp2() {
        deleteLight(stepRef);
        setStep(newStep);
      };
      var current = stepRef.current;
      var newStep = flag === 'proviousStep' ? current - 1 : current + 1;
      if (newStep === steps.length + 1) {
        ending();
        return Promise.resolve();
      }
      var origin = current - 1;
      var _temp = function () {
        if (steps[origin].callback) {
          return Promise.resolve(steps[origin].callback()).then(function () {});
        }
      }();
      return Promise.resolve(_temp && _temp.then ? _temp.then(_temp2) : _temp2(_temp));
    } catch (e) {
      return Promise.reject(e);
    }
  };
  var ending = function ending() {
    var box = query$1('.slick-form-steps-center');
    box.parentElement.removeChild(box);
    var body = query$1('body');
    body.style.overflow = overflow || 'auto';
    var current = stepRef.current;
    var tips = query$1(".slick-form-steps-tips" + current);
    ReactDOM.unmountComponentAtNode(query$1("#" + continerId));
    tips && ReactDOM.unmountComponentAtNode(tips);
    deleteLight(stepRef);
  };
  var createdBox = function createdBox() {
    query$1('.slick-form-steps-center') || createdBoxSure();
    var spotlight = query$1('.slick-form-spotlight');
    if (spotlight) return;
    createdAndUpdateBoxChild();
  };
  var createdTipsChild = function createdTipsChild(base) {
    var subStep = (stepRef.current || step) - 1;
    if (!steps.length) return;
    var element = steps[subStep].element;
    ReactDOM.render(React__default.createElement(ConfigProvider, {
      theme: {
        token: token$1
      }
    }, React__default.createElement(Tips, Object.assign({
      steps: steps,
      step: subStep + 1,
      switchSteps: switchSteps,
      element: element,
      ending: ending
    }, props))), base);
  };
  var createdTipsAndDes = function createdTipsAndDes(subStep) {
    var tips = query$1(".slick-form-steps-tips" + subStep) ? query$1(".slick-form-steps-tips" + subStep) : createdTips(subStep);
    createdTipsChild(tips);
  };
  return null;
};
var index$3 = {
  start: function (options) {
    try {
      if (Array.isArray(options.steps)) {
        var tag = query$1("#" + continerId);
        if (!tag) {
          tag = creatE('div');
          tag.setAttribute('id', continerId);
          query$1('body').appendChild(tag);
        }
        ReactDOM.render(React__default.createElement(Dialog, Object.assign({}, options)), tag);
      }
      return Promise.resolve();
    } catch (e) {
      return Promise.reject(e);
    }
  }
};

var CompLazy = (function (_ref) {
  var children = _ref.children,
    visible = _ref.visible,
    initSetKey = _ref.initSetKey;
  var _useState = useState(Math.random()),
    key = _useState[0],
    setKey = _useState[1];
  var _useState2 = useState(false),
    showChild = _useState2[0],
    setShowChild = _useState2[1];
  useEffect(function () {
    initSetKey === null || initSetKey === void 0 ? void 0 : initSetKey(function () {
      return setKey(Math.random());
    });
    if (visible && !showChild) setShowChild(true);
  });
  return React__default.createElement("div", {
    style: {
      display: visible ? 'block' : 'none',
      height: '100%'
    },
    key: key
  }, showChild ? children : null);
});

var OperationArea = (function (_ref) {
  var keyHandles = _ref.keyHandles,
    activeKey = _ref.activeKey,
    hideReload = _ref.hideReload,
    operations = _ref.operations,
    moreCount = _ref.moreCount;
  var _useState = useState(false),
    fakerLoading = _useState[0],
    setFakerLoading = _useState[1];
  return React__default.createElement("div", {
    className: 'operation-area'
  }, !hideReload && React__default.createElement(Button, {
    className: 'color-6e',
    icon: React__default.createElement("i", {
      style: {
        display: 'block'
      },
      className: "iconfont spicon-shuaxin " + (fakerLoading ? 'iconfont-spin' : '')
    }),
    onClick: function onClick() {
      var reload = keyHandles[activeKey];
      if (reload) {
        reload();
        setFakerLoading(true);
        setTimeout(function () {
          setFakerLoading(false);
        }, 1000);
      }
    },
    type: 'text'
  }), operations.slice(0, moreCount).map(function (i) {
    return React__default.createElement(Button, {
      className: 'color-6e',
      onClick: i.onClick,
      key: i.key,
      type: 'text'
    }, i.text);
  }), operations.length > moreCount && React__default.createElement(Dropdown, {
    overlayClassName: 'drop-down',
    trigger: ['click'],
    overlay: React__default.createElement(Menu, null, operations.slice(moreCount).map(function (i) {
      return React__default.createElement(Menu.Item, {
        key: i.key,
        onClick: i.onClick,
        className: 'drop-down-menu-item'
      }, i.text);
    }))
  }, React__default.createElement(Button, {
    icon: React__default.createElement("i", {
      className: "iconfont spicon-gengduo"
    }),
    className: 'color-6e',
    type: 'text'
  })));
});

var index$4 = forwardRef(function (_ref, ref) {
  var tabs = _ref.tabs,
    _ref$hideReload = _ref.hideReload,
    hideReload = _ref$hideReload === void 0 ? false : _ref$hideReload,
    _ref$operations = _ref.operations,
    operations = _ref$operations === void 0 ? [] : _ref$operations,
    _ref$moreCount = _ref.moreCount,
    moreCount = _ref$moreCount === void 0 ? 3 : _ref$moreCount,
    _ref$mode = _ref.mode,
    mode = _ref$mode === void 0 ? 'params' : _ref$mode,
    defaultOpen = _ref.defaultOpen,
    onVisibleChange = _ref.onVisibleChange,
    _ref$drawerProps = _ref.drawerProps,
    drawerProps = _ref$drawerProps === void 0 ? {
      width: '60vw'
    } : _ref$drawerProps,
    onTabChange = _ref.onTabChange,
    _ref$urlParamName = _ref.urlParamName,
    urlParamName = _ref$urlParamName === void 0 ? 'activeKey' : _ref$urlParamName;
  var initOpen = mode === 'params' && getUrlParams()[urlParamName];
  var _useState = useState(!!initOpen || defaultOpen),
    visible = _useState[0],
    setVisible = _useState[1];
  var _useState2 = useState(initOpen != null ? initOpen : ''),
    activeKey = _useState2[0],
    setActiveKey = _useState2[1];
  var keyHandles = {};
  useEffect(function () {
    if (defaultOpen && !initOpen) {
      setActiveKey(tabs[0].key);
    }
  }, []);
  useImperativeHandle(ref, function () {
    return {
      open: function open(tabKey) {
        setVisible(true);
        var key = tabs[0].key;
        if (tabKey) {
          for (var i = 0; i < tabs.length; i++) {
            if (tabs[i].key === tabKey) {
              key = tabKey;
              break;
            }
          }
        }
        setActiveKey(key);
      },
      close: function close() {
        return setVisible(false);
      },
      currTabKey: activeKey
    };
  });
  useEffect(function () {
    onVisibleChange === null || onVisibleChange === void 0 ? void 0 : onVisibleChange(visible);
  }, [visible]);
  useEffect(function () {
    onTabChange === null || onTabChange === void 0 ? void 0 : onTabChange(activeKey);
    if (mode === 'state') return;
    var _location = location,
      href = _location.href,
      origin = _location.origin;
    var path = href.replace(origin, '');
    if (activeKey) {
      if (path.includes(urlParamName + "=")) {
        path = path.replace(RegExp(urlParamName + "=\\w+", 'g'), urlParamName + "=" + activeKey);
      } else {
        path += "" + (path.includes('?') ? '&' : '?') + urlParamName + "=" + activeKey;
      }
      history.replaceState('', '', path);
    } else {
      var params = getUrlParams();
      var _path = path.split('?')[0];
      Object.keys(params).forEach(function (i) {
        if (i !== urlParamName) {
          _path += "" + (_path.includes('?') ? '&' : '?') + i + "=" + params[i];
        }
      });
      history.replaceState('', '', _path);
    }
  }, [activeKey]);
  var _onClose = function _onClose() {
    setActiveKey('');
    setVisible(false);
  };
  var renderItem = function renderItem(_ref2) {
    var key = _ref2.key,
      label = _ref2.label,
      disabled = _ref2.disabled,
      hide = _ref2.hide,
      icon = _ref2.icon;
    var props = {
      key: key,
      icon: icon,
      disabled: typeof disabled === 'function' ? disabled() : disabled
    };
    if (typeof hide === 'function' ? hide() : hide) return;
    return React__default.createElement(Menu.Item, Object.assign({}, props), label);
  };
  var getTitle = function getTitle() {
    var item = tabs.find(function (i) {
      return i.key === activeKey;
    });
    return (item === null || item === void 0 ? void 0 : item.title) || (item === null || item === void 0 ? void 0 : item.label);
  };
  return React__default.createElement(Drawer, Object.assign({
    className: "pro-drawer-wrap",
    open: visible,
    title: getTitle()
  }, drawerProps, {
    destroyOnClose: true,
    extra: React__default.createElement(OperationArea, Object.assign({}, {
      hideReload: hideReload,
      moreCount: moreCount,
      operations: operations,
      activeKey: activeKey,
      keyHandles: keyHandles
    })),
    closable: false,
    maskStyle: {
      backgroundColor: 'transparent'
    },
    onClose: _onClose
  }), visible && React__default.createElement("div", {
    className: "tab-wrap",
    style: {
      right: drawerProps.width
    }
  }, React__default.createElement(Button, {
    className: 'tab-close',
    icon: React__default.createElement("i", {
      className: "iconfont spicon-shouqikuaijin"
    }),
    onClick: _onClose,
    block: true,
    type: 'text'
  }), React__default.createElement(Menu, {
    style: {
      border: 'none'
    },
    key: activeKey,
    onClick: function onClick(e) {
      return setActiveKey(e.key);
    },
    defaultSelectedKeys: [activeKey]
  }, tabs.map(renderItem))), tabs.map(function (i) {
    return React__default.createElement(CompLazy, {
      key: i.key,
      visible: i.key === activeKey,
      initSetKey: function initSetKey(handle) {
        keyHandles[i.key] = handle;
      }
    }, i.content);
  }));
});

var Ctx = createContext({});

var _excluded$E = ["layout", "hidden", "labelCol", "wrapperCol", "fields", "form", "onSearch", "onReset", "loading", "column", "toolReverse", "defaultExpand", "clearInitialValuesOnReset", "gridStyle", "className"];
var Search = (function (_ref) {
  var _classNames;
  var _ref$layout = _ref.layout,
    layout = _ref$layout === void 0 ? 'inline' : _ref$layout,
    _ref$hidden = _ref.hidden,
    hidden = _ref$hidden === void 0 ? false : _ref$hidden,
    _ref$labelCol = _ref.labelCol,
    labelCol = _ref$labelCol === void 0 ? {
      span: 8
    } : _ref$labelCol,
    _ref$wrapperCol = _ref.wrapperCol,
    wrapperCol = _ref$wrapperCol === void 0 ? {
      span: 16
    } : _ref$wrapperCol,
    _ref$fields = _ref.fields,
    fields = _ref$fields === void 0 ? [] : _ref$fields,
    _ref$form = _ref.form,
    form = _ref$form === void 0 ? FormLib.useForm()[0] : _ref$form,
    _ref$onSearch = _ref.onSearch,
    onSearch = _ref$onSearch === void 0 ? function () {} : _ref$onSearch,
    _ref$onReset = _ref.onReset,
    onReset = _ref$onReset === void 0 ? function () {} : _ref$onReset,
    _ref$loading = _ref.loading,
    loading = _ref$loading === void 0 ? false : _ref$loading,
    _ref$column = _ref.column,
    column = _ref$column === void 0 ? 4 : _ref$column,
    _ref$toolReverse = _ref.toolReverse,
    toolReverse = _ref$toolReverse === void 0 ? false : _ref$toolReverse,
    _ref$defaultExpand = _ref.defaultExpand,
    defaultExpand = _ref$defaultExpand === void 0 ? false : _ref$defaultExpand,
    _ref$clearInitialValu = _ref.clearInitialValuesOnReset,
    clearInitialValuesOnReset = _ref$clearInitialValu === void 0 ? false : _ref$clearInitialValu,
    _ref$gridStyle = _ref.gridStyle,
    gridStyle = _ref$gridStyle === void 0 ? {
      rowGap: 20,
      columnGap: 20
    } : _ref$gridStyle,
    _ref$className = _ref.className,
    className = _ref$className === void 0 ? '' : _ref$className,
    rest = _objectWithoutPropertiesLoose(_ref, _excluded$E);
  if (fields === undefined || fields.length === 0) {
    return null;
  }
  var ctx = useContext(Ctx);
  var notCtx = isEmpty(ctx);
  var _useState = useState(defaultExpand),
    more = _useState[0],
    setMore = _useState[1];
  var search = function search(params) {
    if (params === void 0) {
      params = {};
    }
    try {
      return Promise.resolve(form.submit()).then(function (values) {
        if (typeof ctx.onSearch === 'function') {
          ctx.onSearch(_extends({}, values, params));
        }
        if (typeof onSearch === 'function') {
          onSearch(values);
        }
      });
    } catch (e) {
      return Promise.reject(e);
    }
  };
  var cloneFields = useMemo$1(function () {
    var newFields = typeof fields === 'function' ? cloneDeep(fields(form)) : cloneDeep(fields);
    return newFields;
  }, [fields]);
  var reset = function reset() {
    try {
      var clearValue = {};
      Object.keys(form.getFieldsValue()).forEach(function (key) {
        clearValue[key] = undefined;
      });
      if (typeof ctx.onReset === 'function') {
        form.setValues(_extends({}, clearValue, clearInitialValuesOnReset ? {} : ctx.initialSearchValues || {}));
        ctx.onReset(clearInitialValuesOnReset);
      } else {
        form.setValues(_extends({}, clearValue, clearInitialValuesOnReset ? {} : rest.initialValues || {}));
      }
      if (typeof onReset === 'function') {
        onReset();
      }
      return Promise.resolve();
    } catch (e) {
      return Promise.reject(e);
    }
  };
  useEffect(function () {
    form.search = search;
    form.reset = reset;
    if (typeof ctx.setRefresh === 'function') {
      form.refresh = function () {
        ctx.setRefresh(Math.random());
      };
    }
  }, []);
  var moreLabel = useMemo$1(function () {
    return React__default.createElement(React__default.Fragment, null, more ? '收起' : '展开', React__default.createElement("i", {
      className: more ? 'expand iconfont spicon-zhankai' : 'iconfont spicon-zhankai'
    }));
  }, [more]);
  var autosearchFields = [];
  cloneFields.forEach(function (field) {
    if (field.autosearch === 1) {
      autosearchFields.push(field.name);
    }
    if (['Input', 'InputNumber', 'CountInput'].includes(field.type)) {
      field.isSearchForm = true;
      if (field.props === undefined) {
        field.props = {};
      }
      field.props.onPressEnter = function () {
        search();
      };
      if (field.type !== 'InputNumber' && field.props.onPaste === undefined) {
        field.props.onPaste = function (e) {
          var target = e.target;
          setTimeout(function () {
            var _target$value, _form$setFieldsValue;
            form.setFieldsValue((_form$setFieldsValue = {}, _form$setFieldsValue[field.name] = (_target$value = target.value) === null || _target$value === void 0 ? void 0 : _target$value.trim(), _form$setFieldsValue));
          });
        };
      }
    }
  });
  var tools = [{
    label: '重置',
    type: 'default',
    key: 'reset',
    onClick: function onClick() {
      reset();
    }
  }, {
    label: '查询',
    key: 'search',
    type: 'primary',
    htmlType: 'submit',
    onClick: function onClick() {
      search();
    }
  }];
  if (toolReverse) {
    tools.reverse();
  }
  if (cloneFields.some(function (field) {
    return field.ismore && (typeof field.isShow === 'function' ? field.isShow() : true);
  })) {
    tools.push({
      type: 'link',
      key: 'more',
      label: moreLabel,
      onClick: function onClick() {
        setMore(!more);
      }
    });
  }
  var searchBtn = React__default.createElement("div", {
    className: "tools-btn-box"
  }, tools.map(function (tool) {
    return React__default.createElement(Button, Object.assign({}, tool, {
      loading: ['查询', '重置'].includes(tool.label) && (notCtx ? loading : ctx.loading)
    }), tool.label);
  }));
  var searchBtnField = {
    type: 'Render',
    key: 'btn-render',
    className: 'grid-search-btn',
    props: {
      render: function render() {
        return searchBtn;
      }
    }
  };
  var _fields = [].concat(cloneFields, [searchBtnField]);
  var searchCls = classnames('slick-form-search', (_classNames = {}, _classNames[className] = className !== '', _classNames['slick-form-search-hidden'] = hidden, _classNames['slick-form-search-expand'] = more, _classNames["slick-form-search-" + layout + "-expand"] = more, _classNames["slick-form-search-" + layout] = true, _classNames));
  return React__default.createElement(FormLib, Object.assign({
    className: searchCls,
    layout: layout,
    labelCol: labelCol,
    wrapperCol: wrapperCol,
    initialValues: ctx.params,
    form: form,
    fields: _fields,
    column: column,
    gridStyle: gridStyle,
    onFieldsChange: function onFieldsChange(changedFields) {
      if (!isEmpty(changedFields)) {
        if (autosearchFields.includes(changedFields[0].name[0])) {
          search();
        }
      }
    }
  }, rest));
});

var AdjustWidth = (function (_ref) {
  var onCellWidthChange = _ref.onCellWidthChange,
    children = _ref.children,
    _ref$width = _ref.width,
    width = _ref$width === void 0 ? 120 : _ref$width;
  return React__default.createElement(Resizable, {
    width: width,
    height: 54,
    onClick: function onClick(e) {
      e.stopPropagation();
    },
    onResize: function onResize(e, _ref2) {
      var size = _ref2.size;
      onCellWidthChange(size.width);
    }
  }, React__default.createElement("div", {
    className: "table-column-drag"
  }, React__default.createElement("div", {
    className: "table-column-drag-cell"
  }, children)));
});

var transformColumns = function transformColumns(_ref) {
  var _cloneDeep;
  var columns = _ref.columns,
    emptyNode = _ref.emptyNode,
    _onCellWidthChange = _ref.onCellWidthChange,
    pagination = _ref.pagination,
    sorterValues = _ref.sorterValues;
  var newColumns = (_cloneDeep = cloneDeep(columns)) === null || _cloneDeep === void 0 ? void 0 : _cloneDeep.filter(function (i) {
    return i.visible !== false;
  });
  if (Array.isArray(columns)) {
    return newColumns.map(function (column) {
      if (column.columnType === 'columnNo') {
        column.dataIndex = '__columnNo__';
        column.fixed = column.fixed || 'left';
        column.width = column.width || 100;
        column.ellipsis = column.ellipsis || true;
        column.render = function (_, __, index) {
          return (pagination.pageNum - 1) * pagination.pageSize + index + 1;
        };
        return column;
      }
      if (column.tip) {
        column.title = React__default.createElement(Space, null, column.title, React__default.createElement(Tooltip, {
          placement: "top",
          title: column.tip
        }, React__default.createElement("i", {
          className: "iconfont spicon-yiwen",
          style: {
            color: '#999',
            fontSize: 15
          }
        })));
      }
      if (column.resize) {
        column.title = React__default.createElement(AdjustWidth, {
          width: column.width,
          onCellWidthChange: function onCellWidthChange(width) {
            _onCellWidthChange(column, width);
          }
        }, column.title);
      }
      if (column.ellipsis) {
        column.ellipsis = {
          showTitle: false
        };
      }
      if (sorterValues && column.dataIndex === sorterValues.field) {
        column.sortOrder = sorterValues.order;
      }
      var defineRender = column.render;
      column.render = function (item, record, index) {
        var vNode = typeof defineRender === 'function' ? defineRender(item, record, index) : item;
        if (column.enums) {
          var _ref2 = column.enumsConf || {},
            _ref2$isArrObj = _ref2.isArrObj,
            isArrObj = _ref2$isArrObj === void 0 ? false : _ref2$isArrObj,
            _ref2$key = _ref2.key,
            key = _ref2$key === void 0 ? 'value' : _ref2$key,
            _ref2$label = _ref2.label,
            label = _ref2$label === void 0 ? 'label' : _ref2$label;
          var type = getType(column.enums);
          if (isArrObj && type === 'array') {
            var it = column.enums.find(function (i) {
              return i[key] === item;
            });
            vNode = it === null || it === void 0 ? void 0 : it[label];
          } else if (['array', 'object'].includes(type)) {
            vNode = column.enums[item];
          }
        }
        if (emptyNode) {
          vNode = isEmpty(vNode) ? emptyNode : vNode;
        }
        if (column.dateFormat && vNode) {
          vNode = dayjs(vNode).format(column.dateFormat);
          if (vNode === 'Invalid date') {
            vNode = '-';
          }
        }
        if (column.link) {
          vNode = React__default.createElement("a", null, vNode);
        }
        if (column.jumpLink) {
          vNode = React__default.createElement("a", {
            href: vNode,
            target: "_blank",
            rel: "noreferrer"
          }, vNode);
        }
        if (column.useThousandth) {
          vNode = NumberFormat(vNode, typeof column.useThousandth === 'boolean' ? undefined : column.useThousandth, emptyNode);
        }
        if (column.ellipsis) {
          vNode = React__default.createElement(Tooltip, Object.assign({
            placement: "topLeft",
            title: vNode
          }, column.tooltipProps), vNode);
        }
        if (column.copyable) {
          vNode = React__default.createElement(Space, null, vNode, React__default.createElement(Typography.Paragraph, {
            copyable: typeof column.copyable === 'object' ? column.copyable : {
              text: item
            },
            style: {
              marginBottom: 0
            },
            onClick: function onClick(e) {
              e.stopPropagation();
            }
          }));
        }
        if (column.suffix) {
          vNode = React__default.createElement(Fragment, null, vNode, column.suffix);
        }
        return vNode;
      };
      return column;
    });
  }
  return [];
};
var NumberFormat = function NumberFormat(number, options, emptyNode) {
  if (options === void 0) {
    options = {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    };
  }
  if (emptyNode === void 0) {
    emptyNode = '-';
  }
  if (isNaN(Number(number))) {
    return emptyNode;
  }
  return Number(number).toLocaleString('zh-CH', options);
};
var updateLocalFilter = function updateLocalFilter(_ref3) {
  var cacheId = _ref3.cacheId,
    _ref3$columns = _ref3.columns,
    columns = _ref3$columns === void 0 ? [] : _ref3$columns,
    filterIds = _ref3.filterIds,
    pageSize = _ref3.pageSize;
  if (cacheId) {
    var localData;
    try {
      localData = JSON.parse(localStorage.getItem("table_" + cacheId) || '');
    } catch (err) {
      localData = null;
    }
    var widthMap = {};
    if (localData) {
      var _ref4, _ref5;
      columns = columns || localData.columnIds.map(function (dataIndex) {
        return {
          dataIndex: dataIndex
        };
      });
      filterIds = (_ref4 = filterIds || localData.filterIds) != null ? _ref4 : [];
      pageSize = (_ref5 = pageSize || localData.pageSize) != null ? _ref5 : 10;
      widthMap = _extends({}, localData.widthMap || {});
      columns.forEach(function (i) {
        if (i.resize) {
          widthMap[i.dataIndex] = i.width;
        }
      });
    }
    var backupIds = columns.map(function (i) {
      return i.dataIndex;
    });
    localStorage.setItem("table_" + cacheId + "_backup", JSON.stringify(backupIds));
    localStorage.setItem("table_" + cacheId, JSON.stringify({
      columnIds: columns.map(function (i) {
        return i.dataIndex || i.key;
      }),
      filterIds: filterIds,
      pageSize: pageSize,
      widthMap: widthMap
    }));
  }
};

var _excluded$F = ["className", "style", "dataSource"];
var DragHandle$1 = SortableHandle(function () {
  return React__default.createElement(MenuOutlined, {
    style: {
      cursor: 'grab',
      color: '#999'
    }
  });
});
var SortableItem = SortableElement(function (props) {
  return React__default.createElement("tr", Object.assign({}, props));
});
var SortableBody = SortableContainer(function (props) {
  return React__default.createElement("tbody", Object.assign({}, props));
});
var _onSortEnd = function onSortEnd(_ref) {
  var setDataSource = _ref.setDataSource,
    dataSource = _ref.dataSource,
    oldIndex = _ref.oldIndex,
    newIndex = _ref.newIndex;
  if (oldIndex !== newIndex) {
    var newData = arrayMove(dataSource.slice(), oldIndex, newIndex).filter(function (el) {
      return !!el;
    });
    setDataSource(newData);
    return {
      oldIndex: oldIndex,
      newIndex: newIndex,
      dataSource: newData
    };
  }
};
var DraggableContainer = function DraggableContainer(props) {
  return React__default.createElement(SortableBody, Object.assign({
    useDragHandle: true,
    disableAutoscroll: true,
    helperClass: "table-provider-row-dragging",
    onSortEnd: function onSortEnd(e) {
      props.onDragDone(_onSortEnd(_extends({
        setDataSource: props.setDataSource,
        dataSource: props.dataSource
      }, e)));
    }
  }, props));
};
var DraggableBodyRow = function DraggableBodyRow(_ref2) {
  var dataSource = _ref2.dataSource,
    restProps = _objectWithoutPropertiesLoose(_ref2, _excluded$F);
  var index = dataSource.findIndex(function (x) {
    return x.index === restProps['data-row-key'];
  });
  return React__default.createElement(SortableItem, Object.assign({
    index: index
  }, restProps));
};

var InfoBar = (function (_ref) {
  var infoContent = _ref.infoContent,
    infoBarClassName = _ref.infoBarClassName;
  return React__default.createElement("div", {
    className: "table-info-bar " + infoBarClassName
  }, infoContent);
});

var getRowOperations = (function (_ref) {
  var onSearch = _ref.onSearch,
    onRefresh = _ref.onRefresh,
    _ref$rowOperations = _ref.rowOperations,
    rowOperations = _ref$rowOperations === void 0 ? {
      menus: [],
      showMore: 3
    } : _ref$rowOperations,
    _ref$rowOperationsCli = _ref.rowOperationsClick,
    rowOperationsClick = _ref$rowOperationsCli === void 0 ? function (a, b, index) {} : _ref$rowOperationsCli;
  rowOperations.showMore = rowOperations.showMore || 3;
  if (typeof rowOperations.menus !== 'function') {
    return false;
  }
  var RenderItem = function RenderItem(_ref2) {
    var menu = _ref2.menu,
      record = _ref2.record,
      index = _ref2.index;
    var modalFormProps = menu.modalFormProps,
      drawerFormProps = menu.drawerFormProps;
    if (typeof menu.modalFormProps === 'function') {
      menu.modalFormProps = function () {
        try {
          return Promise.resolve(modalFormProps({
            onSearch: onSearch,
            onRefresh: onRefresh
          }, _extends({}, record)));
        } catch (e) {
          return Promise.reject(e);
        }
      };
    }
    if (typeof menu.drawerFormProps === 'function') {
      menu.drawerFormProps = function () {
        try {
          return Promise.resolve(drawerFormProps({
            onSearch: onSearch,
            onRefresh: onRefresh
          }, _extends({}, record)));
        } catch (e) {
          return Promise.reject(e);
        }
      };
    }
    return React__default.createElement(ProButton, Object.assign({
      type: "link"
    }, menu, {
      onClick: function () {
        try {
          var _temp2 = function _temp2() {
            return Promise.resolve(rowOperationsClick(_extends({}, menu), _extends({}, record), index, {
              onSearch: onSearch,
              onRefresh: onRefresh
            })).then(function () {});
          };
          if (menu.disabled) {
            return Promise.resolve();
          }
          var _temp = function () {
            if (typeof menu.onClick === 'function') {
              return Promise.resolve(menu.onClick({
                onSearch: onSearch,
                onRefresh: onRefresh
              }, _extends({}, record))).then(function () {});
            }
          }();
          return Promise.resolve(_temp && _temp.then ? _temp.then(_temp2) : _temp2(_temp));
        } catch (e) {
          return Promise.reject(e);
        }
      }
    }), menu.copyable ? React__default.createElement(Typography.Paragraph, {
      copyable: menu.copyable,
      style: {
        marginBottom: 0
      }
    }, React__default.createElement("a", null, menu.label)) : menu.label);
  };
  return rowOperations.visible === false ? null : _extends({}, rowOperations, {
    ellipsis: false,
    dataIndex: 'row-operations-td-row-operation-area',
    className: 'td-row-operation-area',
    render: function render(_, record, index) {
      var menus = rowOperations.menus(record, index).filter(function (i) {
        try {
          return typeof i.visible === 'function' ? i.visible(record) !== false : i.visible !== false;
        } catch (error) {
          console.log(error);
          return false;
        }
      });
      if (!Array.isArray(menus) || menus.length === 0) {
        return;
      }
      var showMenu = menus.length === rowOperations.showMore ? menus.slice(0, rowOperations.showMore) : menus.slice(0, rowOperations.showMore - 1);
      var menuItems = menus.slice(rowOperations.showMore - 1).map(function (menu) {
        return React__default.createElement(Menu.Item, {
          key: menu.key || menu.label
        }, React__default.createElement(RenderItem, {
          menu: menu,
          record: record,
          index: index
        }));
      });
      return React__default.createElement(React__default.Fragment, null, showMenu.map(function (menu) {
        return React__default.createElement(RenderItem, {
          key: menu.key || menu.label,
          menu: menu,
          record: record,
          index: index
        });
      }), menus.length > rowOperations.showMore && React__default.createElement(Dropdown, {
        arrow: true,
        overlay: React__default.createElement(Menu, {
          className: "slick-form-row-menu"
        }, menuItems)
      }, React__default.createElement("a", {
        className: "ant-dropdown-link",
        onClick: function onClick(e) {
          return e.preventDefault();
        }
      }, "\u66F4\u591A", React__default.createElement("i", {
        className: "iconfont spicon-zhankai",
        style: {
          fontSize: 14,
          marginLeft: 6
        }
      }))));
    }
  });
});

var FilterColumns = (function (_ref) {
  var _ref$filterIds = _ref.filterIds,
    filterIds = _ref$filterIds === void 0 ? [] : _ref$filterIds,
    _ref$columns = _ref.columns,
    columns = _ref$columns === void 0 ? [] : _ref$columns,
    _ref$onOk = _ref.onOk,
    onOk = _ref$onOk === void 0 ? Function : _ref$onOk,
    setColumns = _ref.setColumns,
    tableId = _ref.tableId;
  var columnList = useMemo$1(function () {
    return columns.map(function (column) {
      return {
        key: column.dataIndex,
        value: column,
        label: React__default.createElement("div", {
          style: {
            padding: 4
          },
          onClick: function onClick(e) {
            return e.stopPropagation();
          }
        }, React__default.createElement(Checkbox, {
          checked: !filterIds.includes(column.dataIndex),
          onChange: function onChange(e) {
            e.preventDefault();
            var index = filterIds.findIndex(function (item) {
              return item === column.dataIndex;
            });
            if (index > -1) {
              filterIds.splice(index, 1);
            } else {
              filterIds.push(column.dataIndex);
            }
            onOk([].concat(filterIds));
            if (tableId) {
              updateLocalFilter({
                cacheId: tableId,
                columns: columns,
                filterIds: filterIds
              });
            }
          }
        }, column.title))
      };
    });
  }, [columns, filterIds]);
  return React__default.createElement(Dropdown, {
    arrow: true,
    overlay: React__default.createElement(Menu, {
      style: {
        height: 220,
        overflow: 'auto'
      }
    }, React__default.createElement(DragList, {
      onChange: function onChange(list) {
        var _columns = list.map(function (i) {
          return i.value;
        });
        setColumns(_columns);
        if (tableId) {
          updateLocalFilter({
            cacheId: tableId,
            columns: _columns,
            filterIds: filterIds
          });
        }
      },
      list: columnList
    })),
    placement: "bottom",
    trigger: ['click'],
    overlayClassName: "table-filter-columns"
  }, React__default.createElement(Button, {
    type: "default",
    icon: React__default.createElement("i", {
      className: "iconfont spicon-shezhi"
    }),
    onClick: function onClick(e) {
      return e.preventDefault();
    }
  }));
});

var ToolBar = (function (props) {
  var _props$title = props.title,
    title = _props$title === void 0 ? '' : _props$title,
    _props$filterIds = props.filterIds,
    filterIds = _props$filterIds === void 0 ? [] : _props$filterIds,
    _props$columns = props.columns,
    columns = _props$columns === void 0 ? [] : _props$columns,
    _props$tools = props.tools,
    tools = _props$tools === void 0 ? [] : _props$tools,
    _props$toolsAlign = props.toolsAlign,
    toolsAlign = _props$toolsAlign === void 0 ? 'right' : _props$toolsAlign,
    _props$toolsClick = props.toolsClick,
    toolsClick = _props$toolsClick === void 0 ? function (tool) {} : _props$toolsClick,
    _props$onFilter = props.onFilter,
    onFilter = _props$onFilter === void 0 ? function () {} : _props$onFilter,
    _props$onRefresh = props.onRefresh,
    onRefresh = _props$onRefresh === void 0 ? function () {} : _props$onRefresh,
    _props$onSearch = props.onSearch,
    onSearch = _props$onSearch === void 0 ? function () {} : _props$onSearch,
    payload = props.payload,
    _props$setColumns = props.setColumns,
    setColumns = _props$setColumns === void 0 ? Function : _props$setColumns,
    _props$size = props.size,
    size = _props$size === void 0 ? 'default' : _props$size,
    _props$toolBarClass = props.toolBarClass,
    toolBarClass = _props$toolBarClass === void 0 ? '' : _props$toolBarClass,
    tableId = props.tableId,
    _props$selectedRows = props.selectedRows,
    selectedRows = _props$selectedRows === void 0 ? [] : _props$selectedRows;
  var handelClick = function handelClick(tool) {
    try {
      var _temp2 = function _temp2() {
        return Promise.resolve(toolsClick(_extends({}, tool), {
          onSearch: onSearch,
          onRefresh: onRefresh,
          selectedRows: selectedRows
        })).then(function () {});
      };
      if (tool.disabled) {
        return Promise.resolve();
      }
      if (tool.type === 'Refresh') {
        onRefresh();
      }
      var _temp = function () {
        if (typeof tool.onClick === 'function') {
          return Promise.resolve(tool.onClick(payload, {
            onSearch: onSearch,
            onRefresh: onRefresh,
            selectedRows: selectedRows
          })).then(function () {});
        }
      }();
      return Promise.resolve(_temp && _temp.then ? _temp.then(_temp2) : _temp2(_temp));
    } catch (e) {
      return Promise.reject(e);
    }
  };
  var renderTool = function renderTool(tool) {
    var _tool$menu, _tool$menu2;
    var btnProps = _extends({}, tool, {
      key: tool.key || tool.type || tool.label,
      onClick: handelClick.bind(null, tool)
    });
    var modalFormProps = tool.modalFormProps,
      drawerFormProps = tool.drawerFormProps;
    if (typeof tool.modalFormProps === 'function') {
      tool.modalFormProps = function () {
        try {
          return Promise.resolve(modalFormProps({
            onSearch: onSearch,
            onRefresh: onRefresh
          }));
        } catch (e) {
          return Promise.reject(e);
        }
      };
    }
    if (typeof tool.drawerFormProps === 'function') {
      tool.drawerFormProps = function () {
        try {
          return Promise.resolve(drawerFormProps({
            onSearch: onSearch,
            onRefresh: onRefresh
          }));
        } catch (e) {
          return Promise.reject(e);
        }
      };
    }
    switch (tool.type) {
      case 'Export':
        return React__default.createElement(ProButton, Object.assign({}, btnProps, {
          type: tool.btnType || 'default',
          spin: true
        }), tool.label || '导出数据');
      case 'Refresh':
        return React__default.createElement(ProButton, Object.assign({}, btnProps, {
          type: "default",
          icon: React__default.createElement("i", {
            className: "iconfont spicon-shuaxin"
          })
        }));
      case 'FilterColumns':
        return React__default.createElement(FilterColumns, {
          key: "filter-columns",
          tableId: tableId,
          filterIds: filterIds,
          columns: columns,
          setColumns: setColumns,
          onOk: onFilter
        });
      case 'Render':
        return tool.render({
          onSearch: onSearch
        });
      case 'Dropdown':
        return ((_tool$menu = tool.menu) === null || _tool$menu === void 0 ? void 0 : _tool$menu.length) > 0 ? React__default.createElement(Dropdown, {
          disabled: tool.disabled,
          key: tool.key || tool.type || tool.label,
          overlay: React__default.createElement(Menu, {
            onClick: function onClick(item) {
              handelClick(item);
            }
          }, (_tool$menu2 = tool.menu) === null || _tool$menu2 === void 0 ? void 0 : _tool$menu2.map(function (item, index) {
            if (item.type === 'Divider') {
              return React__default.createElement(Menu.Divider, {
                key: item.key || index
              });
            }
            return React__default.createElement(Menu.Item, {
              key: item.key || tool.label
            }, item.label);
          })),
          trigger: tool.trigger || ['click']
        }, React__default.createElement(Button, {
          type: tool.btnType || 'default',
          style: {
            display: 'flex',
            alignItems: 'center'
          }
        }, tool.label, React__default.createElement("i", {
          className: "iconfont spicon-zhankai",
          style: {
            fontSize: 12,
            marginLeft: 4
          }
        }))) : null;
      default:
        return React__default.createElement(ProButton, Object.assign({}, btnProps, {
          type: tool.btnType || 'primary'
        }), tool.label);
    }
  };
  var _tools = [].concat(tools);
  return _tools && _tools.length > 0 || title ? React__default.createElement("div", {
    className: size === 'small' ? "table-form-header-small table-align-" + toolsAlign + " " + toolBarClass : "table-form-header table-align-" + toolsAlign + " " + toolBarClass
  }, React__default.createElement("div", {
    className: "table-form-header-left"
  }, title), React__default.createElement("div", {
    className: "table-form-header-right"
  }, React__default.createElement(Space, null, _tools.map(function (tool) {
    return renderTool(tool);
  })))) : null;
});

function _extends$1() {
  _extends$1 = Object.assign ? Object.assign.bind() : function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  return _extends$1.apply(this, arguments);
}

function toArray$1(children) {
  var option = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var ret = [];
  React__default.Children.forEach(children, function (child) {
    if ((child === undefined || child === null) && !option.keepEmpty) {
      return;
    }
    if (Array.isArray(child)) {
      ret = ret.concat(toArray$1(child));
    } else if (isFragment(child) && child.props) {
      ret = ret.concat(toArray$1(child.props.children, option));
    } else {
      ret.push(child);
    }
  });
  return ret;
}

/* eslint-disable no-console */
var preWarningFns = [];

/**
 * Warning if condition not match.
 * @param valid Condition
 * @param message Warning message
 * @example
 * ```js
 * warning(false, 'some error'); // print some error
 * warning(true, 'some error'); // print nothing
 * warning(1 === 2, 'some error'); // print some error
 * ```
 */
function warning(valid, message) {
  if (process.env.NODE_ENV !== 'production' && !valid && console !== undefined) {
    var finalMessage = preWarningFns.reduce(function (msg, preMessageFn) {
      return preMessageFn(msg !== null && msg !== void 0 ? msg : '', 'warning');
    }, message);
    if (finalMessage) {
      console.error("Warning: ".concat(finalMessage));
    }
  }
}

function _typeof(o) {
  "@babel/helpers - typeof";

  return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) {
    return typeof o;
  } : function (o) {
    return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
  }, _typeof(o);
}

function toPrimitive(t, r) {
  if ("object" != _typeof(t) || !t) return t;
  var e = t[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i = e.call(t, r || "default");
    if ("object" != _typeof(i)) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r ? String : Number)(t);
}

function toPropertyKey(t) {
  var i = toPrimitive(t, "string");
  return "symbol" == _typeof(i) ? i : i + "";
}

function _defineProperty(obj, key, value) {
  key = toPropertyKey(key);
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }
  return obj;
}

function ownKeys(e, r) {
  var t = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    r && (o = o.filter(function (r) {
      return Object.getOwnPropertyDescriptor(e, r).enumerable;
    })), t.push.apply(t, o);
  }
  return t;
}
function _objectSpread2(e) {
  for (var r = 1; r < arguments.length; r++) {
    var t = null != arguments[r] ? arguments[r] : {};
    r % 2 ? ownKeys(Object(t), !0).forEach(function (r) {
      _defineProperty(e, r, t[r]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) {
      Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r));
    });
  }
  return e;
}

function isDOM(node) {
  // https://developer.mozilla.org/en-US/docs/Web/API/Element
  // Since XULElement is also subclass of Element, we only need HTMLElement and SVGElement
  return node instanceof HTMLElement || node instanceof SVGElement;
}

/**
 * Return if a node is a DOM node. Else will return by `findDOMNode`
 */
function findDOMNode(node) {
  if (isDOM(node)) {
    return node;
  }
  if (node instanceof React__default.Component) {
    return ReactDOM.findDOMNode(node);
  }
  return null;
}

function useMemo(getValue, condition, shouldUpdate) {
  var cacheRef = useRef({});
  if (!('value' in cacheRef.current) || shouldUpdate(cacheRef.current.condition, condition)) {
    cacheRef.current.value = getValue();
    cacheRef.current.condition = condition;
  }
  return cacheRef.current.value;
}

function fillRef(ref, node) {
  if (typeof ref === 'function') {
    ref(node);
  } else if (_typeof(ref) === 'object' && ref && 'current' in ref) {
    ref.current = node;
  }
}

/**
 * Merge refs into one ref function to support ref passing.
 */
function composeRef() {
  for (var _len = arguments.length, refs = new Array(_len), _key = 0; _key < _len; _key++) {
    refs[_key] = arguments[_key];
  }
  var refList = refs.filter(function (ref) {
    return ref;
  });
  if (refList.length <= 1) {
    return refList[0];
  }
  return function (node) {
    refs.forEach(function (ref) {
      fillRef(ref, node);
    });
  };
}
function useComposeRef() {
  for (var _len2 = arguments.length, refs = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
    refs[_key2] = arguments[_key2];
  }
  return useMemo(function () {
    return composeRef.apply(void 0, refs);
  }, refs, function (prev, next) {
    return prev.length !== next.length || prev.every(function (ref, i) {
      return ref !== next[i];
    });
  });
}
function supportRef(nodeOrComponent) {
  var _type$prototype, _nodeOrComponent$prot;
  var type = isMemo(nodeOrComponent) ? nodeOrComponent.type.type : nodeOrComponent.type;

  // Function component node
  if (typeof type === 'function' && !((_type$prototype = type.prototype) !== null && _type$prototype !== void 0 && _type$prototype.render) && type.$$typeof !== ForwardRef) {
    return false;
  }

  // Class component
  if (typeof nodeOrComponent === 'function' && !((_nodeOrComponent$prot = nodeOrComponent.prototype) !== null && _nodeOrComponent$prot !== void 0 && _nodeOrComponent$prot.render) && nodeOrComponent.$$typeof !== ForwardRef) {
    return false;
  }
  return true;
}
/* eslint-enable */

var CollectionContext = /*#__PURE__*/createContext(null);
/**
 * Collect all the resize event from children ResizeObserver
 */
function Collection(_ref) {
  var children = _ref.children,
    onBatchResize = _ref.onBatchResize;
  var resizeIdRef = useRef(0);
  var resizeInfosRef = useRef([]);
  var onCollectionResize = useContext(CollectionContext);
  var onResize = useCallback(function (size, element, data) {
    resizeIdRef.current += 1;
    var currentId = resizeIdRef.current;
    resizeInfosRef.current.push({
      size: size,
      element: element,
      data: data
    });
    Promise.resolve().then(function () {
      if (currentId === resizeIdRef.current) {
        onBatchResize === null || onBatchResize === void 0 || onBatchResize(resizeInfosRef.current);
        resizeInfosRef.current = [];
      }
    });

    // Continue bubbling if parent exist
    onCollectionResize === null || onCollectionResize === void 0 || onCollectionResize(size, element, data);
  }, [onBatchResize, onCollectionResize]);
  return /*#__PURE__*/createElement(CollectionContext.Provider, {
    value: onResize
  }, children);
}

/**
 * A collection of shims that provide minimal functionality of the ES6 collections.
 *
 * These implementations are not meant to be used outside of the ResizeObserver
 * modules as they cover only a limited range of use cases.
 */
/* eslint-disable require-jsdoc, valid-jsdoc */
var MapShim = (function () {
    if (typeof Map !== 'undefined') {
        return Map;
    }
    /**
     * Returns index in provided array that matches the specified key.
     *
     * @param {Array<Array>} arr
     * @param {*} key
     * @returns {number}
     */
    function getIndex(arr, key) {
        var result = -1;
        arr.some(function (entry, index) {
            if (entry[0] === key) {
                result = index;
                return true;
            }
            return false;
        });
        return result;
    }
    return /** @class */ (function () {
        function class_1() {
            this.__entries__ = [];
        }
        Object.defineProperty(class_1.prototype, "size", {
            /**
             * @returns {boolean}
             */
            get: function () {
                return this.__entries__.length;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * @param {*} key
         * @returns {*}
         */
        class_1.prototype.get = function (key) {
            var index = getIndex(this.__entries__, key);
            var entry = this.__entries__[index];
            return entry && entry[1];
        };
        /**
         * @param {*} key
         * @param {*} value
         * @returns {void}
         */
        class_1.prototype.set = function (key, value) {
            var index = getIndex(this.__entries__, key);
            if (~index) {
                this.__entries__[index][1] = value;
            }
            else {
                this.__entries__.push([key, value]);
            }
        };
        /**
         * @param {*} key
         * @returns {void}
         */
        class_1.prototype.delete = function (key) {
            var entries = this.__entries__;
            var index = getIndex(entries, key);
            if (~index) {
                entries.splice(index, 1);
            }
        };
        /**
         * @param {*} key
         * @returns {void}
         */
        class_1.prototype.has = function (key) {
            return !!~getIndex(this.__entries__, key);
        };
        /**
         * @returns {void}
         */
        class_1.prototype.clear = function () {
            this.__entries__.splice(0);
        };
        /**
         * @param {Function} callback
         * @param {*} [ctx=null]
         * @returns {void}
         */
        class_1.prototype.forEach = function (callback, ctx) {
            if (ctx === void 0) { ctx = null; }
            for (var _i = 0, _a = this.__entries__; _i < _a.length; _i++) {
                var entry = _a[_i];
                callback.call(ctx, entry[1], entry[0]);
            }
        };
        return class_1;
    }());
})();

/**
 * Detects whether window and document objects are available in current environment.
 */
var isBrowser = typeof window !== 'undefined' && typeof document !== 'undefined' && window.document === document;

// Returns global object of a current environment.
var global$1 = (function () {
    if (typeof global !== 'undefined' && global.Math === Math) {
        return global;
    }
    if (typeof self !== 'undefined' && self.Math === Math) {
        return self;
    }
    if (typeof window !== 'undefined' && window.Math === Math) {
        return window;
    }
    // eslint-disable-next-line no-new-func
    return Function('return this')();
})();

/**
 * A shim for the requestAnimationFrame which falls back to the setTimeout if
 * first one is not supported.
 *
 * @returns {number} Requests' identifier.
 */
var requestAnimationFrame$1 = (function () {
    if (typeof requestAnimationFrame === 'function') {
        // It's required to use a bounded function because IE sometimes throws
        // an "Invalid calling object" error if rAF is invoked without the global
        // object on the left hand side.
        return requestAnimationFrame.bind(global$1);
    }
    return function (callback) { return setTimeout(function () { return callback(Date.now()); }, 1000 / 60); };
})();

// Defines minimum timeout before adding a trailing call.
var trailingTimeout = 2;
/**
 * Creates a wrapper function which ensures that provided callback will be
 * invoked only once during the specified delay period.
 *
 * @param {Function} callback - Function to be invoked after the delay period.
 * @param {number} delay - Delay after which to invoke callback.
 * @returns {Function}
 */
function throttle (callback, delay) {
    var leadingCall = false, trailingCall = false, lastCallTime = 0;
    /**
     * Invokes the original callback function and schedules new invocation if
     * the "proxy" was called during current request.
     *
     * @returns {void}
     */
    function resolvePending() {
        if (leadingCall) {
            leadingCall = false;
            callback();
        }
        if (trailingCall) {
            proxy();
        }
    }
    /**
     * Callback invoked after the specified delay. It will further postpone
     * invocation of the original function delegating it to the
     * requestAnimationFrame.
     *
     * @returns {void}
     */
    function timeoutCallback() {
        requestAnimationFrame$1(resolvePending);
    }
    /**
     * Schedules invocation of the original function.
     *
     * @returns {void}
     */
    function proxy() {
        var timeStamp = Date.now();
        if (leadingCall) {
            // Reject immediately following calls.
            if (timeStamp - lastCallTime < trailingTimeout) {
                return;
            }
            // Schedule new call to be in invoked when the pending one is resolved.
            // This is important for "transitions" which never actually start
            // immediately so there is a chance that we might miss one if change
            // happens amids the pending invocation.
            trailingCall = true;
        }
        else {
            leadingCall = true;
            trailingCall = false;
            setTimeout(timeoutCallback, delay);
        }
        lastCallTime = timeStamp;
    }
    return proxy;
}

// Minimum delay before invoking the update of observers.
var REFRESH_DELAY = 20;
// A list of substrings of CSS properties used to find transition events that
// might affect dimensions of observed elements.
var transitionKeys = ['top', 'right', 'bottom', 'left', 'width', 'height', 'size', 'weight'];
// Check if MutationObserver is available.
var mutationObserverSupported = typeof MutationObserver !== 'undefined';
/**
 * Singleton controller class which handles updates of ResizeObserver instances.
 */
var ResizeObserverController = /** @class */ (function () {
    /**
     * Creates a new instance of ResizeObserverController.
     *
     * @private
     */
    function ResizeObserverController() {
        /**
         * Indicates whether DOM listeners have been added.
         *
         * @private {boolean}
         */
        this.connected_ = false;
        /**
         * Tells that controller has subscribed for Mutation Events.
         *
         * @private {boolean}
         */
        this.mutationEventsAdded_ = false;
        /**
         * Keeps reference to the instance of MutationObserver.
         *
         * @private {MutationObserver}
         */
        this.mutationsObserver_ = null;
        /**
         * A list of connected observers.
         *
         * @private {Array<ResizeObserverSPI>}
         */
        this.observers_ = [];
        this.onTransitionEnd_ = this.onTransitionEnd_.bind(this);
        this.refresh = throttle(this.refresh.bind(this), REFRESH_DELAY);
    }
    /**
     * Adds observer to observers list.
     *
     * @param {ResizeObserverSPI} observer - Observer to be added.
     * @returns {void}
     */
    ResizeObserverController.prototype.addObserver = function (observer) {
        if (!~this.observers_.indexOf(observer)) {
            this.observers_.push(observer);
        }
        // Add listeners if they haven't been added yet.
        if (!this.connected_) {
            this.connect_();
        }
    };
    /**
     * Removes observer from observers list.
     *
     * @param {ResizeObserverSPI} observer - Observer to be removed.
     * @returns {void}
     */
    ResizeObserverController.prototype.removeObserver = function (observer) {
        var observers = this.observers_;
        var index = observers.indexOf(observer);
        // Remove observer if it's present in registry.
        if (~index) {
            observers.splice(index, 1);
        }
        // Remove listeners if controller has no connected observers.
        if (!observers.length && this.connected_) {
            this.disconnect_();
        }
    };
    /**
     * Invokes the update of observers. It will continue running updates insofar
     * it detects changes.
     *
     * @returns {void}
     */
    ResizeObserverController.prototype.refresh = function () {
        var changesDetected = this.updateObservers_();
        // Continue running updates if changes have been detected as there might
        // be future ones caused by CSS transitions.
        if (changesDetected) {
            this.refresh();
        }
    };
    /**
     * Updates every observer from observers list and notifies them of queued
     * entries.
     *
     * @private
     * @returns {boolean} Returns "true" if any observer has detected changes in
     *      dimensions of it's elements.
     */
    ResizeObserverController.prototype.updateObservers_ = function () {
        // Collect observers that have active observations.
        var activeObservers = this.observers_.filter(function (observer) {
            return observer.gatherActive(), observer.hasActive();
        });
        // Deliver notifications in a separate cycle in order to avoid any
        // collisions between observers, e.g. when multiple instances of
        // ResizeObserver are tracking the same element and the callback of one
        // of them changes content dimensions of the observed target. Sometimes
        // this may result in notifications being blocked for the rest of observers.
        activeObservers.forEach(function (observer) { return observer.broadcastActive(); });
        return activeObservers.length > 0;
    };
    /**
     * Initializes DOM listeners.
     *
     * @private
     * @returns {void}
     */
    ResizeObserverController.prototype.connect_ = function () {
        // Do nothing if running in a non-browser environment or if listeners
        // have been already added.
        if (!isBrowser || this.connected_) {
            return;
        }
        // Subscription to the "Transitionend" event is used as a workaround for
        // delayed transitions. This way it's possible to capture at least the
        // final state of an element.
        document.addEventListener('transitionend', this.onTransitionEnd_);
        window.addEventListener('resize', this.refresh);
        if (mutationObserverSupported) {
            this.mutationsObserver_ = new MutationObserver(this.refresh);
            this.mutationsObserver_.observe(document, {
                attributes: true,
                childList: true,
                characterData: true,
                subtree: true
            });
        }
        else {
            document.addEventListener('DOMSubtreeModified', this.refresh);
            this.mutationEventsAdded_ = true;
        }
        this.connected_ = true;
    };
    /**
     * Removes DOM listeners.
     *
     * @private
     * @returns {void}
     */
    ResizeObserverController.prototype.disconnect_ = function () {
        // Do nothing if running in a non-browser environment or if listeners
        // have been already removed.
        if (!isBrowser || !this.connected_) {
            return;
        }
        document.removeEventListener('transitionend', this.onTransitionEnd_);
        window.removeEventListener('resize', this.refresh);
        if (this.mutationsObserver_) {
            this.mutationsObserver_.disconnect();
        }
        if (this.mutationEventsAdded_) {
            document.removeEventListener('DOMSubtreeModified', this.refresh);
        }
        this.mutationsObserver_ = null;
        this.mutationEventsAdded_ = false;
        this.connected_ = false;
    };
    /**
     * "Transitionend" event handler.
     *
     * @private
     * @param {TransitionEvent} event
     * @returns {void}
     */
    ResizeObserverController.prototype.onTransitionEnd_ = function (_a) {
        var _b = _a.propertyName, propertyName = _b === void 0 ? '' : _b;
        // Detect whether transition may affect dimensions of an element.
        var isReflowProperty = transitionKeys.some(function (key) {
            return !!~propertyName.indexOf(key);
        });
        if (isReflowProperty) {
            this.refresh();
        }
    };
    /**
     * Returns instance of the ResizeObserverController.
     *
     * @returns {ResizeObserverController}
     */
    ResizeObserverController.getInstance = function () {
        if (!this.instance_) {
            this.instance_ = new ResizeObserverController();
        }
        return this.instance_;
    };
    /**
     * Holds reference to the controller's instance.
     *
     * @private {ResizeObserverController}
     */
    ResizeObserverController.instance_ = null;
    return ResizeObserverController;
}());

/**
 * Defines non-writable/enumerable properties of the provided target object.
 *
 * @param {Object} target - Object for which to define properties.
 * @param {Object} props - Properties to be defined.
 * @returns {Object} Target object.
 */
var defineConfigurable = (function (target, props) {
    for (var _i = 0, _a = Object.keys(props); _i < _a.length; _i++) {
        var key = _a[_i];
        Object.defineProperty(target, key, {
            value: props[key],
            enumerable: false,
            writable: false,
            configurable: true
        });
    }
    return target;
});

/**
 * Returns the global object associated with provided element.
 *
 * @param {Object} target
 * @returns {Object}
 */
var getWindowOf = (function (target) {
    // Assume that the element is an instance of Node, which means that it
    // has the "ownerDocument" property from which we can retrieve a
    // corresponding global object.
    var ownerGlobal = target && target.ownerDocument && target.ownerDocument.defaultView;
    // Return the local global object if it's not possible extract one from
    // provided element.
    return ownerGlobal || global$1;
});

// Placeholder of an empty content rectangle.
var emptyRect = createRectInit(0, 0, 0, 0);
/**
 * Converts provided string to a number.
 *
 * @param {number|string} value
 * @returns {number}
 */
function toFloat(value) {
    return parseFloat(value) || 0;
}
/**
 * Extracts borders size from provided styles.
 *
 * @param {CSSStyleDeclaration} styles
 * @param {...string} positions - Borders positions (top, right, ...)
 * @returns {number}
 */
function getBordersSize(styles) {
    var positions = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        positions[_i - 1] = arguments[_i];
    }
    return positions.reduce(function (size, position) {
        var value = styles['border-' + position + '-width'];
        return size + toFloat(value);
    }, 0);
}
/**
 * Extracts paddings sizes from provided styles.
 *
 * @param {CSSStyleDeclaration} styles
 * @returns {Object} Paddings box.
 */
function getPaddings(styles) {
    var positions = ['top', 'right', 'bottom', 'left'];
    var paddings = {};
    for (var _i = 0, positions_1 = positions; _i < positions_1.length; _i++) {
        var position = positions_1[_i];
        var value = styles['padding-' + position];
        paddings[position] = toFloat(value);
    }
    return paddings;
}
/**
 * Calculates content rectangle of provided SVG element.
 *
 * @param {SVGGraphicsElement} target - Element content rectangle of which needs
 *      to be calculated.
 * @returns {DOMRectInit}
 */
function getSVGContentRect(target) {
    var bbox = target.getBBox();
    return createRectInit(0, 0, bbox.width, bbox.height);
}
/**
 * Calculates content rectangle of provided HTMLElement.
 *
 * @param {HTMLElement} target - Element for which to calculate the content rectangle.
 * @returns {DOMRectInit}
 */
function getHTMLElementContentRect(target) {
    // Client width & height properties can't be
    // used exclusively as they provide rounded values.
    var clientWidth = target.clientWidth, clientHeight = target.clientHeight;
    // By this condition we can catch all non-replaced inline, hidden and
    // detached elements. Though elements with width & height properties less
    // than 0.5 will be discarded as well.
    //
    // Without it we would need to implement separate methods for each of
    // those cases and it's not possible to perform a precise and performance
    // effective test for hidden elements. E.g. even jQuery's ':visible' filter
    // gives wrong results for elements with width & height less than 0.5.
    if (!clientWidth && !clientHeight) {
        return emptyRect;
    }
    var styles = getWindowOf(target).getComputedStyle(target);
    var paddings = getPaddings(styles);
    var horizPad = paddings.left + paddings.right;
    var vertPad = paddings.top + paddings.bottom;
    // Computed styles of width & height are being used because they are the
    // only dimensions available to JS that contain non-rounded values. It could
    // be possible to utilize the getBoundingClientRect if only it's data wasn't
    // affected by CSS transformations let alone paddings, borders and scroll bars.
    var width = toFloat(styles.width), height = toFloat(styles.height);
    // Width & height include paddings and borders when the 'border-box' box
    // model is applied (except for IE).
    if (styles.boxSizing === 'border-box') {
        // Following conditions are required to handle Internet Explorer which
        // doesn't include paddings and borders to computed CSS dimensions.
        //
        // We can say that if CSS dimensions + paddings are equal to the "client"
        // properties then it's either IE, and thus we don't need to subtract
        // anything, or an element merely doesn't have paddings/borders styles.
        if (Math.round(width + horizPad) !== clientWidth) {
            width -= getBordersSize(styles, 'left', 'right') + horizPad;
        }
        if (Math.round(height + vertPad) !== clientHeight) {
            height -= getBordersSize(styles, 'top', 'bottom') + vertPad;
        }
    }
    // Following steps can't be applied to the document's root element as its
    // client[Width/Height] properties represent viewport area of the window.
    // Besides, it's as well not necessary as the <html> itself neither has
    // rendered scroll bars nor it can be clipped.
    if (!isDocumentElement(target)) {
        // In some browsers (only in Firefox, actually) CSS width & height
        // include scroll bars size which can be removed at this step as scroll
        // bars are the only difference between rounded dimensions + paddings
        // and "client" properties, though that is not always true in Chrome.
        var vertScrollbar = Math.round(width + horizPad) - clientWidth;
        var horizScrollbar = Math.round(height + vertPad) - clientHeight;
        // Chrome has a rather weird rounding of "client" properties.
        // E.g. for an element with content width of 314.2px it sometimes gives
        // the client width of 315px and for the width of 314.7px it may give
        // 314px. And it doesn't happen all the time. So just ignore this delta
        // as a non-relevant.
        if (Math.abs(vertScrollbar) !== 1) {
            width -= vertScrollbar;
        }
        if (Math.abs(horizScrollbar) !== 1) {
            height -= horizScrollbar;
        }
    }
    return createRectInit(paddings.left, paddings.top, width, height);
}
/**
 * Checks whether provided element is an instance of the SVGGraphicsElement.
 *
 * @param {Element} target - Element to be checked.
 * @returns {boolean}
 */
var isSVGGraphicsElement = (function () {
    // Some browsers, namely IE and Edge, don't have the SVGGraphicsElement
    // interface.
    if (typeof SVGGraphicsElement !== 'undefined') {
        return function (target) { return target instanceof getWindowOf(target).SVGGraphicsElement; };
    }
    // If it's so, then check that element is at least an instance of the
    // SVGElement and that it has the "getBBox" method.
    // eslint-disable-next-line no-extra-parens
    return function (target) { return (target instanceof getWindowOf(target).SVGElement &&
        typeof target.getBBox === 'function'); };
})();
/**
 * Checks whether provided element is a document element (<html>).
 *
 * @param {Element} target - Element to be checked.
 * @returns {boolean}
 */
function isDocumentElement(target) {
    return target === getWindowOf(target).document.documentElement;
}
/**
 * Calculates an appropriate content rectangle for provided html or svg element.
 *
 * @param {Element} target - Element content rectangle of which needs to be calculated.
 * @returns {DOMRectInit}
 */
function getContentRect(target) {
    if (!isBrowser) {
        return emptyRect;
    }
    if (isSVGGraphicsElement(target)) {
        return getSVGContentRect(target);
    }
    return getHTMLElementContentRect(target);
}
/**
 * Creates rectangle with an interface of the DOMRectReadOnly.
 * Spec: https://drafts.fxtf.org/geometry/#domrectreadonly
 *
 * @param {DOMRectInit} rectInit - Object with rectangle's x/y coordinates and dimensions.
 * @returns {DOMRectReadOnly}
 */
function createReadOnlyRect(_a) {
    var x = _a.x, y = _a.y, width = _a.width, height = _a.height;
    // If DOMRectReadOnly is available use it as a prototype for the rectangle.
    var Constr = typeof DOMRectReadOnly !== 'undefined' ? DOMRectReadOnly : Object;
    var rect = Object.create(Constr.prototype);
    // Rectangle's properties are not writable and non-enumerable.
    defineConfigurable(rect, {
        x: x, y: y, width: width, height: height,
        top: y,
        right: x + width,
        bottom: height + y,
        left: x
    });
    return rect;
}
/**
 * Creates DOMRectInit object based on the provided dimensions and the x/y coordinates.
 * Spec: https://drafts.fxtf.org/geometry/#dictdef-domrectinit
 *
 * @param {number} x - X coordinate.
 * @param {number} y - Y coordinate.
 * @param {number} width - Rectangle's width.
 * @param {number} height - Rectangle's height.
 * @returns {DOMRectInit}
 */
function createRectInit(x, y, width, height) {
    return { x: x, y: y, width: width, height: height };
}

/**
 * Class that is responsible for computations of the content rectangle of
 * provided DOM element and for keeping track of it's changes.
 */
var ResizeObservation = /** @class */ (function () {
    /**
     * Creates an instance of ResizeObservation.
     *
     * @param {Element} target - Element to be observed.
     */
    function ResizeObservation(target) {
        /**
         * Broadcasted width of content rectangle.
         *
         * @type {number}
         */
        this.broadcastWidth = 0;
        /**
         * Broadcasted height of content rectangle.
         *
         * @type {number}
         */
        this.broadcastHeight = 0;
        /**
         * Reference to the last observed content rectangle.
         *
         * @private {DOMRectInit}
         */
        this.contentRect_ = createRectInit(0, 0, 0, 0);
        this.target = target;
    }
    /**
     * Updates content rectangle and tells whether it's width or height properties
     * have changed since the last broadcast.
     *
     * @returns {boolean}
     */
    ResizeObservation.prototype.isActive = function () {
        var rect = getContentRect(this.target);
        this.contentRect_ = rect;
        return (rect.width !== this.broadcastWidth ||
            rect.height !== this.broadcastHeight);
    };
    /**
     * Updates 'broadcastWidth' and 'broadcastHeight' properties with a data
     * from the corresponding properties of the last observed content rectangle.
     *
     * @returns {DOMRectInit} Last observed content rectangle.
     */
    ResizeObservation.prototype.broadcastRect = function () {
        var rect = this.contentRect_;
        this.broadcastWidth = rect.width;
        this.broadcastHeight = rect.height;
        return rect;
    };
    return ResizeObservation;
}());

var ResizeObserverEntry = /** @class */ (function () {
    /**
     * Creates an instance of ResizeObserverEntry.
     *
     * @param {Element} target - Element that is being observed.
     * @param {DOMRectInit} rectInit - Data of the element's content rectangle.
     */
    function ResizeObserverEntry(target, rectInit) {
        var contentRect = createReadOnlyRect(rectInit);
        // According to the specification following properties are not writable
        // and are also not enumerable in the native implementation.
        //
        // Property accessors are not being used as they'd require to define a
        // private WeakMap storage which may cause memory leaks in browsers that
        // don't support this type of collections.
        defineConfigurable(this, { target: target, contentRect: contentRect });
    }
    return ResizeObserverEntry;
}());

var ResizeObserverSPI = /** @class */ (function () {
    /**
     * Creates a new instance of ResizeObserver.
     *
     * @param {ResizeObserverCallback} callback - Callback function that is invoked
     *      when one of the observed elements changes it's content dimensions.
     * @param {ResizeObserverController} controller - Controller instance which
     *      is responsible for the updates of observer.
     * @param {ResizeObserver} callbackCtx - Reference to the public
     *      ResizeObserver instance which will be passed to callback function.
     */
    function ResizeObserverSPI(callback, controller, callbackCtx) {
        /**
         * Collection of resize observations that have detected changes in dimensions
         * of elements.
         *
         * @private {Array<ResizeObservation>}
         */
        this.activeObservations_ = [];
        /**
         * Registry of the ResizeObservation instances.
         *
         * @private {Map<Element, ResizeObservation>}
         */
        this.observations_ = new MapShim();
        if (typeof callback !== 'function') {
            throw new TypeError('The callback provided as parameter 1 is not a function.');
        }
        this.callback_ = callback;
        this.controller_ = controller;
        this.callbackCtx_ = callbackCtx;
    }
    /**
     * Starts observing provided element.
     *
     * @param {Element} target - Element to be observed.
     * @returns {void}
     */
    ResizeObserverSPI.prototype.observe = function (target) {
        if (!arguments.length) {
            throw new TypeError('1 argument required, but only 0 present.');
        }
        // Do nothing if current environment doesn't have the Element interface.
        if (typeof Element === 'undefined' || !(Element instanceof Object)) {
            return;
        }
        if (!(target instanceof getWindowOf(target).Element)) {
            throw new TypeError('parameter 1 is not of type "Element".');
        }
        var observations = this.observations_;
        // Do nothing if element is already being observed.
        if (observations.has(target)) {
            return;
        }
        observations.set(target, new ResizeObservation(target));
        this.controller_.addObserver(this);
        // Force the update of observations.
        this.controller_.refresh();
    };
    /**
     * Stops observing provided element.
     *
     * @param {Element} target - Element to stop observing.
     * @returns {void}
     */
    ResizeObserverSPI.prototype.unobserve = function (target) {
        if (!arguments.length) {
            throw new TypeError('1 argument required, but only 0 present.');
        }
        // Do nothing if current environment doesn't have the Element interface.
        if (typeof Element === 'undefined' || !(Element instanceof Object)) {
            return;
        }
        if (!(target instanceof getWindowOf(target).Element)) {
            throw new TypeError('parameter 1 is not of type "Element".');
        }
        var observations = this.observations_;
        // Do nothing if element is not being observed.
        if (!observations.has(target)) {
            return;
        }
        observations.delete(target);
        if (!observations.size) {
            this.controller_.removeObserver(this);
        }
    };
    /**
     * Stops observing all elements.
     *
     * @returns {void}
     */
    ResizeObserverSPI.prototype.disconnect = function () {
        this.clearActive();
        this.observations_.clear();
        this.controller_.removeObserver(this);
    };
    /**
     * Collects observation instances the associated element of which has changed
     * it's content rectangle.
     *
     * @returns {void}
     */
    ResizeObserverSPI.prototype.gatherActive = function () {
        var _this = this;
        this.clearActive();
        this.observations_.forEach(function (observation) {
            if (observation.isActive()) {
                _this.activeObservations_.push(observation);
            }
        });
    };
    /**
     * Invokes initial callback function with a list of ResizeObserverEntry
     * instances collected from active resize observations.
     *
     * @returns {void}
     */
    ResizeObserverSPI.prototype.broadcastActive = function () {
        // Do nothing if observer doesn't have active observations.
        if (!this.hasActive()) {
            return;
        }
        var ctx = this.callbackCtx_;
        // Create ResizeObserverEntry instance for every active observation.
        var entries = this.activeObservations_.map(function (observation) {
            return new ResizeObserverEntry(observation.target, observation.broadcastRect());
        });
        this.callback_.call(ctx, entries, ctx);
        this.clearActive();
    };
    /**
     * Clears the collection of active observations.
     *
     * @returns {void}
     */
    ResizeObserverSPI.prototype.clearActive = function () {
        this.activeObservations_.splice(0);
    };
    /**
     * Tells whether observer has active observations.
     *
     * @returns {boolean}
     */
    ResizeObserverSPI.prototype.hasActive = function () {
        return this.activeObservations_.length > 0;
    };
    return ResizeObserverSPI;
}());

// Registry of internal observers. If WeakMap is not available use current shim
// for the Map collection as it has all required methods and because WeakMap
// can't be fully polyfilled anyway.
var observers = typeof WeakMap !== 'undefined' ? new WeakMap() : new MapShim();
/**
 * ResizeObserver API. Encapsulates the ResizeObserver SPI implementation
 * exposing only those methods and properties that are defined in the spec.
 */
var ResizeObserver = /** @class */ (function () {
    /**
     * Creates a new instance of ResizeObserver.
     *
     * @param {ResizeObserverCallback} callback - Callback that is invoked when
     *      dimensions of the observed elements change.
     */
    function ResizeObserver(callback) {
        if (!(this instanceof ResizeObserver)) {
            throw new TypeError('Cannot call a class as a function.');
        }
        if (!arguments.length) {
            throw new TypeError('1 argument required, but only 0 present.');
        }
        var controller = ResizeObserverController.getInstance();
        var observer = new ResizeObserverSPI(callback, controller, this);
        observers.set(this, observer);
    }
    return ResizeObserver;
}());
// Expose public methods of ResizeObserver.
[
    'observe',
    'unobserve',
    'disconnect'
].forEach(function (method) {
    ResizeObserver.prototype[method] = function () {
        var _a;
        return (_a = observers.get(this))[method].apply(_a, arguments);
    };
});

var index$5 = (function () {
    // Export existing implementation if available.
    if (typeof global$1.ResizeObserver !== 'undefined') {
        return global$1.ResizeObserver;
    }
    return ResizeObserver;
})();

// =============================== Const ===============================
var elementListeners = new Map();
function onResize(entities) {
  entities.forEach(function (entity) {
    var _elementListeners$get;
    var target = entity.target;
    (_elementListeners$get = elementListeners.get(target)) === null || _elementListeners$get === void 0 || _elementListeners$get.forEach(function (listener) {
      return listener(target);
    });
  });
}

// Note: ResizeObserver polyfill not support option to measure border-box resize
var resizeObserver = new index$5(onResize);

// Dev env only
var _el = process.env.NODE_ENV !== 'production' ? elementListeners : null; // eslint-disable-line
var _rs = process.env.NODE_ENV !== 'production' ? onResize : null; // eslint-disable-line

// ============================== Observe ==============================
function observe(element, callback) {
  if (!elementListeners.has(element)) {
    elementListeners.set(element, new Set());
    resizeObserver.observe(element);
  }
  elementListeners.get(element).add(callback);
}
function unobserve(element, callback) {
  if (elementListeners.has(element)) {
    elementListeners.get(element).delete(callback);
    if (!elementListeners.get(element).size) {
      resizeObserver.unobserve(element);
      elementListeners.delete(element);
    }
  }
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, toPropertyKey(descriptor.key), descriptor);
  }
}
function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  Object.defineProperty(Constructor, "prototype", {
    writable: false
  });
  return Constructor;
}

function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };
  return _setPrototypeOf(o, p);
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }
  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  Object.defineProperty(subClass, "prototype", {
    writable: false
  });
  if (superClass) _setPrototypeOf(subClass, superClass);
}

function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
}

function _isNativeReflectConstruct() {
  try {
    var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
  } catch (t) {}
  return (_isNativeReflectConstruct = function _isNativeReflectConstruct() {
    return !!t;
  })();
}

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }
  return self;
}

function _possibleConstructorReturn(self, call) {
  if (call && (_typeof(call) === "object" || typeof call === "function")) {
    return call;
  } else if (call !== void 0) {
    throw new TypeError("Derived constructors may only return object or undefined");
  }
  return _assertThisInitialized(self);
}

function _createSuper(Derived) {
  var hasNativeReflectConstruct = _isNativeReflectConstruct();
  return function _createSuperInternal() {
    var Super = _getPrototypeOf(Derived),
      result;
    if (hasNativeReflectConstruct) {
      var NewTarget = _getPrototypeOf(this).constructor;
      result = Reflect.construct(Super, arguments, NewTarget);
    } else {
      result = Super.apply(this, arguments);
    }
    return _possibleConstructorReturn(this, result);
  };
}

/**
 * Fallback to findDOMNode if origin ref do not provide any dom element
 */
var DomWrapper = /*#__PURE__*/function (_React$Component) {
  _inherits(DomWrapper, _React$Component);
  var _super = _createSuper(DomWrapper);
  function DomWrapper() {
    _classCallCheck(this, DomWrapper);
    return _super.apply(this, arguments);
  }
  _createClass(DomWrapper, [{
    key: "render",
    value: function render() {
      return this.props.children;
    }
  }]);
  return DomWrapper;
}(Component);

function SingleObserver(props, ref) {
  var children = props.children,
    disabled = props.disabled;
  var elementRef = useRef(null);
  var wrapperRef = useRef(null);
  var onCollectionResize = useContext(CollectionContext);

  // =========================== Children ===========================
  var isRenderProps = typeof children === 'function';
  var mergedChildren = isRenderProps ? children(elementRef) : children;

  // ============================= Size =============================
  var sizeRef = useRef({
    width: -1,
    height: -1,
    offsetWidth: -1,
    offsetHeight: -1
  });

  // ============================= Ref ==============================
  var canRef = !isRenderProps && /*#__PURE__*/isValidElement(mergedChildren) && supportRef(mergedChildren);
  var originRef = canRef ? mergedChildren.ref : null;
  var mergedRef = useComposeRef(originRef, elementRef);
  var getDom = function getDom() {
    var _elementRef$current;
    return findDOMNode(elementRef.current) || (
    // Support `nativeElement` format
    elementRef.current && _typeof(elementRef.current) === 'object' ? findDOMNode((_elementRef$current = elementRef.current) === null || _elementRef$current === void 0 ? void 0 : _elementRef$current.nativeElement) : null) || findDOMNode(wrapperRef.current);
  };
  useImperativeHandle(ref, function () {
    return getDom();
  });

  // =========================== Observe ============================
  var propsRef = useRef(props);
  propsRef.current = props;

  // Handler
  var onInternalResize = useCallback(function (target) {
    var _propsRef$current = propsRef.current,
      onResize = _propsRef$current.onResize,
      data = _propsRef$current.data;
    var _target$getBoundingCl = target.getBoundingClientRect(),
      width = _target$getBoundingCl.width,
      height = _target$getBoundingCl.height;
    var offsetWidth = target.offsetWidth,
      offsetHeight = target.offsetHeight;

    /**
     * Resize observer trigger when content size changed.
     * In most case we just care about element size,
     * let's use `boundary` instead of `contentRect` here to avoid shaking.
     */
    var fixedWidth = Math.floor(width);
    var fixedHeight = Math.floor(height);
    if (sizeRef.current.width !== fixedWidth || sizeRef.current.height !== fixedHeight || sizeRef.current.offsetWidth !== offsetWidth || sizeRef.current.offsetHeight !== offsetHeight) {
      var size = {
        width: fixedWidth,
        height: fixedHeight,
        offsetWidth: offsetWidth,
        offsetHeight: offsetHeight
      };
      sizeRef.current = size;

      // IE is strange, right?
      var mergedOffsetWidth = offsetWidth === Math.round(width) ? width : offsetWidth;
      var mergedOffsetHeight = offsetHeight === Math.round(height) ? height : offsetHeight;
      var sizeInfo = _objectSpread2(_objectSpread2({}, size), {}, {
        offsetWidth: mergedOffsetWidth,
        offsetHeight: mergedOffsetHeight
      });

      // Let collection know what happened
      onCollectionResize === null || onCollectionResize === void 0 || onCollectionResize(sizeInfo, target, data);
      if (onResize) {
        // defer the callback but not defer to next frame
        Promise.resolve().then(function () {
          onResize(sizeInfo, target);
        });
      }
    }
  }, []);

  // Dynamic observe
  useEffect(function () {
    var currentElement = getDom();
    if (currentElement && !disabled) {
      observe(currentElement, onInternalResize);
    }
    return function () {
      return unobserve(currentElement, onInternalResize);
    };
  }, [elementRef.current, disabled]);

  // ============================ Render ============================
  return /*#__PURE__*/createElement(DomWrapper, {
    ref: wrapperRef
  }, canRef ? /*#__PURE__*/cloneElement(mergedChildren, {
    ref: mergedRef
  }) : mergedChildren);
}
var RefSingleObserver = /*#__PURE__*/forwardRef(SingleObserver);
if (process.env.NODE_ENV !== 'production') {
  RefSingleObserver.displayName = 'SingleObserver';
}

var INTERNAL_PREFIX_KEY = 'rc-observer-key';
function ResizeObserver$1(props, ref) {
  var children = props.children;
  var childNodes = typeof children === 'function' ? [children] : toArray$1(children);
  if (process.env.NODE_ENV !== 'production') {
    if (childNodes.length > 1) {
      warning(false, 'Find more than one child node with `children` in ResizeObserver. Please use ResizeObserver.Collection instead.');
    } else if (childNodes.length === 0) {
      warning(false, '`children` of ResizeObserver is empty. Nothing is in observe.');
    }
  }
  return childNodes.map(function (child, index) {
    var key = (child === null || child === void 0 ? void 0 : child.key) || "".concat(INTERNAL_PREFIX_KEY, "-").concat(index);
    return /*#__PURE__*/createElement(RefSingleObserver, _extends$1({}, props, {
      key: key,
      ref: index === 0 ? ref : undefined
    }), child);
  });
}
var RefResizeObserver = /*#__PURE__*/forwardRef(ResizeObserver$1);
if (process.env.NODE_ENV !== 'production') {
  RefResizeObserver.displayName = 'ResizeObserver';
}
RefResizeObserver.Collection = Collection;

var VirtualTable = (function (_ref) {
  var rowKey = _ref.rowKey,
    dataSource = _ref.dataSource,
    columns = _ref.columns,
    loading = _ref.loading,
    pagination = _ref.pagination,
    scroll = _ref.scroll,
    ToolBar = _ref.ToolBar,
    loadMoreData = _ref.loadMoreData,
    loadMoreTopData = _ref.loadMoreTopData;
  var _useState = useState(false),
    spin = _useState[0],
    setSpin = _useState[1];
  var _useState2 = useState(false),
    topSpin = _useState2[0],
    setTopSpin = _useState2[1];
  var _useState3 = useState(false),
    loadOver = _useState3[0],
    setLoadOver = _useState3[1];
  var _useState4 = useState(false),
    setLoadTopOver = _useState4[1];
  var _useState5 = useState([]),
    loadData = _useState5[0],
    setLoadData = _useState5[1];
  var _useState6 = useState([]),
    loadTopData = _useState6[0],
    setLoadTopData = _useState6[1];
  var gridRef = useRef();
  useEffect(function () {
    setLoadData([]);
    setLoadOver(false);
    gridRef.current._outerRef.scrollTop = 0;
  }, [dataSource]);
  var _useState7 = useState(0),
    tableWidth = _useState7[0],
    setTableWidth = _useState7[1];
  var widthColumnCount = columns.filter(function (_ref2) {
    var width = _ref2.width;
    return !width;
  }).length;
  var mergedColumns = columns.map(function (column) {
    if (column.width) {
      return column;
    }
    return _extends({}, column, {
      width: Math.floor(tableWidth / widthColumnCount)
    });
  });
  var _useState8 = useState(function () {
      var obj = {};
      Object.defineProperty(obj, 'scrollLeft', {
        get: function get() {
          if (gridRef.current) {
            var _gridRef$current, _gridRef$current$stat;
            return (_gridRef$current = gridRef.current) === null || _gridRef$current === void 0 ? void 0 : (_gridRef$current$stat = _gridRef$current.state) === null || _gridRef$current$stat === void 0 ? void 0 : _gridRef$current$stat.scrollLeft;
          }
          return null;
        },
        set: function set(scrollLeft) {
          if (gridRef.current) {
            gridRef.current.scrollTo({
              scrollLeft: scrollLeft
            });
          }
        }
      });
      return obj;
    }),
    connectObject = _useState8[0];
  var resetVirtualGrid = function resetVirtualGrid() {
    var _gridRef$current2;
    (_gridRef$current2 = gridRef.current) === null || _gridRef$current2 === void 0 ? void 0 : _gridRef$current2.resetAfterIndices({
      columnIndex: 0,
      shouldForceUpdate: true
    });
  };
  useEffect(function () {
    return resetVirtualGrid;
  }, [tableWidth]);
  var renderVirtualList = function renderVirtualList(rawData, _ref3) {
    var scrollbarSize = _ref3.scrollbarSize,
      ref = _ref3.ref,
      _onScroll = _ref3.onScroll;
    ref.current = connectObject;
    var totalHeight = rawData.length * 54;
    return React__default.createElement("div", {
      style: {
        position: 'relative'
      }
    }, topSpin ? React__default.createElement("div", {
      className: "virtual-grid-spin",
      style: {
        position: 'absolute',
        top: 4,
        left: 0,
        right: 0,
        bottom: 'unset'
      }
    }, React__default.createElement(Spin, {
      tip: "\u52A0\u8F7D\u4E2D"
    })) : null, React__default.createElement(VariableSizeGrid, {
      ref: gridRef,
      className: "virtual-grid",
      columnCount: mergedColumns.length,
      columnWidth: function columnWidth(index) {
        var width = mergedColumns[index].width;
        return totalHeight > scroll.y && index === mergedColumns.length - 1 ? width - scrollbarSize - 1 : width;
      },
      height: scroll.y,
      rowCount: rawData.length,
      rowHeight: function rowHeight() {
        return 54;
      },
      width: tableWidth,
      onScroll: function (_ref4) {
        var scrollLeft = _ref4.scrollLeft,
          scrollTop = _ref4.scrollTop;
        try {
          var _temp3 = function _temp3() {
            var _temp = function () {
              if (typeof loadMoreTopData === 'function' && scrollTop === 0) {
                setTopSpin(true);
                return Promise.resolve(loadMoreTopData(rawData)).then(function (data) {
                  if (data === false) {
                    setTopSpin(false);
                    setLoadTopOver(true);
                  }
                  if (Array.isArray(data)) {
                    setLoadTopData([].concat(data, loadTopData));
                  }
                  setTopSpin(false);
                });
              }
            }();
            if (_temp && _temp.then) return _temp.then(function () {});
          };
          _onScroll({
            scrollLeft: scrollLeft
          });
          var _temp2 = function () {
            if (totalHeight - scrollTop === scroll.y && loadOver === false && typeof loadMoreData === 'function') {
              setSpin(true);
              return Promise.resolve(loadMoreData(rawData)).then(function (data) {
                if (data === false) {
                  setSpin(false);
                  setLoadOver(true);
                }
                if (Array.isArray(data)) {
                  setLoadData([].concat(loadData, data));
                }
                setSpin(false);
              });
            }
          }();
          return Promise.resolve(_temp2 && _temp2.then ? _temp2.then(_temp3) : _temp3(_temp2));
        } catch (e) {
          return Promise.reject(e);
        }
      }
    }, function (_ref5) {
      var columnIndex = _ref5.columnIndex,
        rowIndex = _ref5.rowIndex,
        style = _ref5.style;
      var record = rawData[rowIndex];
      var column = mergedColumns[columnIndex];
      var value = record[column.dataIndex];
      return React__default.createElement("div", {
        className: classnames('virtual-table-cell', {
          'virtual-table-cell-last': columnIndex === mergedColumns.length - 1
        }),
        style: style
      }, typeof column.render === 'function' ? column.render(value, record, rowIndex) : value);
    }), loadOver && React__default.createElement("div", {
      className: "virtual-grid-over"
    }, React__default.createElement(Divider, {
      plain: true
    }, "\u6570\u636E\u52A0\u8F7D\u5B8C\u6BD5")), spin ? React__default.createElement("div", {
      className: "virtual-grid-spin"
    }, React__default.createElement(Spin, {
      tip: "\u52A0\u8F7D\u4E2D"
    })) : null);
  };
  return React__default.createElement(React__default.Fragment, null, ToolBar, React__default.createElement(RefResizeObserver, {
    onResize: function onResize(_ref6) {
      var width = _ref6.width;
      if (width !== tableWidth) {
        setTableWidth(width);
      }
    }
  }, React__default.createElement("div", null, React__default.createElement(Table$1, {
    rowKey: rowKey,
    dataSource: [].concat(loadTopData, dataSource, loadData),
    columns: mergedColumns,
    loading: loading,
    pagination: pagination,
    scroll: scroll,
    components: {
      body: renderVirtualList
    }
  }))));
});

var _excluded$G = ["title", "rowKey", "columns", "tools", "rowOperations", "filterIds", "reload", "pagination", "size", "emptyNode", "rowSelection", "tableId", "drag", "onDragDone", "dragColumn", "autoNo", "keepRowSelectionHistory", "style", "virtual", "loadMoreData", "loadMoreTopData"];
var Table = (function (_ref) {
  var _window3;
  var _ref$title = _ref.title,
    title = _ref$title === void 0 ? '' : _ref$title,
    _ref$rowKey = _ref.rowKey,
    rowKey = _ref$rowKey === void 0 ? 'id' : _ref$rowKey,
    _ref$columns = _ref.columns,
    columns = _ref$columns === void 0 ? [] : _ref$columns,
    _ref$tools = _ref.tools,
    tools = _ref$tools === void 0 ? [] : _ref$tools,
    rowOperations = _ref.rowOperations,
    _ref$filterIds = _ref.filterIds,
    filterIds = _ref$filterIds === void 0 ? [] : _ref$filterIds,
    _ref$reload = _ref.reload,
    reload = _ref$reload === void 0 ? false : _ref$reload,
    _ref$pagination = _ref.pagination,
    pagination = _ref$pagination === void 0 ? true : _ref$pagination,
    size = _ref.size,
    _ref$emptyNode = _ref.emptyNode,
    emptyNode = _ref$emptyNode === void 0 ? '-' : _ref$emptyNode,
    rowSelection = _ref.rowSelection,
    tableId = _ref.tableId,
    _ref$drag = _ref.drag,
    drag = _ref$drag === void 0 ? false : _ref$drag,
    _ref$onDragDone = _ref.onDragDone,
    onDragDone = _ref$onDragDone === void 0 ? function () {} : _ref$onDragDone,
    _ref$dragColumn = _ref.dragColumn,
    dragColumn = _ref$dragColumn === void 0 ? {} : _ref$dragColumn,
    _ref$autoNo = _ref.autoNo,
    autoNo = _ref$autoNo === void 0 ? false : _ref$autoNo,
    _ref$keepRowSelection = _ref.keepRowSelectionHistory,
    keepRowSelectionHistory = _ref$keepRowSelection === void 0 ? false : _ref$keepRowSelection,
    _ref$style = _ref.style,
    style = _ref$style === void 0 ? {} : _ref$style,
    _ref$virtual = _ref.virtual,
    virtual = _ref$virtual === void 0 ? false : _ref$virtual,
    loadMoreData = _ref.loadMoreData,
    loadMoreTopData = _ref.loadMoreTopData,
    restProp = _objectWithoutPropertiesLoose(_ref, _excluded$G);
  var ctx = useContext(Ctx);
  if (isEmpty(ctx)) {
    throw '请在TableProvider包裹下使用Table';
  }
  var _useState = useState([]),
    _columns = _useState[0],
    setColumns = _useState[1];
  var _useState2 = useState(filterIds),
    _filterIds = _useState2[0],
    setFilterIds = _useState2[1];
  var cacheId = tableId || (ctx === null || ctx === void 0 ? void 0 : ctx.cacheTableParamsId) || '';
  var syncCacehColumsConfig = function syncCacehColumsConfig(localData) {
    var _result$columnIds;
    var result = JSON.parse(localData);
    var isExpired = cacheIsExpired(result);
    if (isExpired) {
      result = JSON.parse(localStorage.getItem("table_" + cacheId));
    }
    setColumns((_result$columnIds = result.columnIds) === null || _result$columnIds === void 0 ? void 0 : _result$columnIds.map(function (columnId) {
      var _result$widthMap;
      var column = columns.find(function (item) {
        var key = item.dataIndex || item.key;
        return key === columnId;
      });
      var width = (_result$widthMap = result.widthMap) === null || _result$widthMap === void 0 ? void 0 : _result$widthMap[columnId];
      if (width && column) {
        column.width = width;
      }
      return column;
    }).filter(Boolean));
    setFilterIds(result.filterIds);
    ctx.params.pageSize = result.pageSize || ctx.params.pageSize;
    ctx.setParams(_extends({}, ctx.params));
  };
  useEffect(function () {
    setColumns(columns.filter(function (i) {
      return i.visible !== false;
    }));
    var localData = localStorage.getItem("table_" + cacheId);
    if (cacheId && localData) {
      syncCacehColumsConfig(localData);
    }
  }, [columns]);
  var cacheIsExpired = function cacheIsExpired(cacheData) {
    if (cacheData === void 0) {
      cacheData = {};
    }
    var localIds = localStorage.getItem("table_" + cacheId + "_backup");
    var ids = JSON.parse(localIds) || [];
    var dataIndexList = columns.map(function (i) {
      return i.dataIndex;
    });
    for (var i = 0; i < dataIndexList.length; i++) {
      var dataIndex = dataIndexList[i];
      if (!isEmpty(dataIndex) && !ids.includes(dataIndex)) {
        localStorage.setItem("table_" + cacheId, JSON.stringify(_extends({}, cacheData, {
          columnIds: dataIndexList
        })));
        localStorage.setItem("table_" + cacheId + "_backup", JSON.stringify(dataIndexList));
        return true;
      }
    }
    return false;
  };
  var filterRef = useRef(undefined);
  var sorterRef = useRef(undefined);
  var query = function query(filters, sorter) {
    try {
      var _window2;
      if (filters === undefined) filters = filterRef.current;
      if (sorter === undefined) sorter = sorterRef.current;
      filterRef.current = filters;
      sorterRef.current = sorter;
      if (ctx.cacheTableParams) {
        window["CurrentTableSearchValues" + ((ctx === null || ctx === void 0 ? void 0 : ctx.cacheTableParamsId) || '')] = ctx.params;
        if (sorter && cacheId) {
          if (Object.prototype.toString.call(sorter) === '[object Object]') {
            var _Object$assign;
            window["CurrentTableSorterValues" + cacheId] = Object.assign(window["CurrentTableSorterValues" + cacheId] || {}, (_Object$assign = {}, _Object$assign[cacheId] = sorter, _Object$assign));
          } else {
            var _window;
            window["CurrentTableSorterValues" + cacheId] = (_window = {}, _window[cacheId] = sorter, _window);
          }
        }
      }
      if (ctx.cacheTableParams && window["CurrentTableSorterValues" + cacheId] && cacheId && ((_window2 = window["CurrentTableSorterValues" + cacheId]) === null || _window2 === void 0 ? void 0 : _window2[cacheId])) {
        sorter = window["CurrentTableSorterValues" + cacheId][cacheId];
      }
      ctx.onQuery(ctx.params, filters, sorter);
      ctx.setLoading(true);
      var _temp = _finallyRethrows(function () {
        return _catch(function () {
          return Promise.resolve(restProp.request(deleteEmptyString(ctx.params), filters, sorter)).then(function (_ref2) {
            var isError = _ref2.isError,
              list = _ref2.list,
              total = _ref2.total,
              message = _ref2.message,
              _ref2$extOptions = _ref2.extOptions,
              extOptions = _ref2$extOptions === void 0 ? {} : _ref2$extOptions;
            ctx.onLoad(list, extOptions);
            if (isError || !Array.isArray(list)) {
              ctx.pagination.total = 0;
              ctx.setDataSource([]);
              if (message) {
                notification$1.error({
                  message: '提示',
                  description: message
                });
              }
            } else {
              ctx.pagination.total = total;
              ctx.pagination.current = ctx.params.pageNum;
              ctx.pagination.pageSize = ctx.params.pageSize;
              ctx.pagination.pageNum = ctx.params.pageNum;
              ctx.setDataSource(list);
            }
          });
        }, function (error) {
          console.error('Request Error ->', error);
        });
      }, function (_wasThrown, _result) {
        ctx.setLoading(false);
        if (_wasThrown) throw _result;
        return _result;
      });
      return Promise.resolve(_temp && _temp.then ? _temp.then(function () {}) : void 0);
    } catch (e) {
      return Promise.reject(e);
    }
  };
  useEffect(function () {
    query();
  }, [ctx.refresh, reload]);
  var rowOperationsColumns = getRowOperations({
    onRefresh: query,
    onSearch: ctx.onSearch,
    rowOperations: rowOperations,
    rowOperationsClick: ctx.rowOperationsClick
  });
  var lastColumns = rowOperationsColumns ? [].concat(_columns, [rowOperationsColumns]) : _columns;
  var onCellWidthChange = function onCellWidthChange(column, width) {
    var c = _columns.find(function (i) {
      return i.dataIndex === column.dataIndex;
    });
    if (c) {
      c.width = width;
      setColumns([].concat(_columns));
      updateLocalFilter({
        cacheId: cacheId,
        columns: columns
      });
    }
  };
  var _useState3 = useState((rowSelection === null || rowSelection === void 0 ? void 0 : rowSelection.defaultSelectedRows) || []),
    innerSelectedRow = _useState3[0],
    setInnerSelectedRow = _useState3[1];
  var _useState4 = useState([]),
    innerSelectedRowKeys = _useState4[0],
    setInnerSelectedRowKeys = _useState4[1];
  useEffect(function () {
    var _rowSelection$onChang;
    var _innerSelectedRowKeys = innerSelectedRow.map(function (row) {
      return row[rowKey];
    });
    setInnerSelectedRowKeys(_innerSelectedRowKeys);
    rowSelection === null || rowSelection === void 0 ? void 0 : (_rowSelection$onChang = rowSelection.onChange) === null || _rowSelection$onChang === void 0 ? void 0 : _rowSelection$onChang.call(rowSelection, _innerSelectedRowKeys, innerSelectedRow, {
      type: 'all'
    });
  }, [innerSelectedRow]);
  var innerRowSelection = rowSelection;
  if (keepRowSelectionHistory && typeof rowSelection === 'object' && rowSelection.type !== 'radio') {
    innerRowSelection = _extends({}, rowSelection, {
      onChange: function onChange() {},
      selectedRowKeys: innerSelectedRowKeys,
      onSelectAll: function onSelectAll(selected, currentSelectedRows) {
        currentSelectedRows = currentSelectedRows.filter(function (item) {
          return item !== undefined;
        });
        var _selectedRows = [].concat(innerSelectedRow);
        if (selected) {
          currentSelectedRows.forEach(function (item) {
            if (!_selectedRows.some(function (_item) {
              return _item.id === item.id;
            })) {
              _selectedRows.push(item);
            }
          });
        } else {
          _selectedRows = _selectedRows.filter(function (i) {
            return currentSelectedRows.some(function (item) {
              return item.id === i.id;
            });
          });
        }
        setInnerSelectedRow([].concat(_selectedRows));
      },
      onSelect: function onSelect(record, selected) {
        var currentSelectedRows = [].concat(innerSelectedRow);
        if (selected) {
          currentSelectedRows.push(record);
        } else {
          currentSelectedRows = currentSelectedRows.filter(function (i) {
            return i[rowKey] !== record[rowKey];
          });
        }
        setInnerSelectedRow(currentSelectedRows);
      }
    });
  }
  var newColumns = lastColumns.filter(function (item) {
    return !(_filterIds === null || _filterIds === void 0 ? void 0 : _filterIds.includes(item.dataIndex));
  });
  if (autoNo) {
    newColumns = [{
      title: '序号',
      columnType: 'columnNo'
    }].concat(newColumns);
  }
  newColumns = transformColumns({
    columns: newColumns,
    emptyNode: emptyNode,
    onCellWidthChange: onCellWidthChange,
    pagination: ctx.pagination,
    sorterValues: ctx.cacheTableParams && cacheId ? (_window3 = window["CurrentTableSorterValues" + cacheId]) === null || _window3 === void 0 ? void 0 : _window3[cacheId] : undefined
  });
  if (drag) {
    newColumns = [_extends({
      title: '排序',
      dataIndex: '__sort__',
      width: 60,
      fixed: 'left',
      className: 'drag-visible',
      render: function render() {
        return React__default.createElement(DragHandle$1, null);
      }
    }, dragColumn)].concat(newColumns);
  }
  var InfoBarNode = typeof restProp.infoContent === 'function' ? restProp.infoContent(innerSelectedRowKeys, innerSelectedRow, setInnerSelectedRow) : restProp.infoContent;
  var ToolBarNode = React__default.createElement(React__default.Fragment, null, React__default.createElement(ToolBar, {
    title: title,
    size: size,
    payload: ctx.params,
    setColumns: setColumns,
    selectedRows: innerSelectedRow,
    columns: _columns,
    tools: tools.filter(function (i) {
      try {
        return typeof i.visible === 'function' ? i.visible() !== false : i.visible !== false;
      } catch (error) {
        console.log(error);
        return false;
      }
    }),
    toolsAlign: restProp.toolsAlign,
    onRefresh: query,
    onSearch: ctx.onSearch,
    filterIds: _filterIds,
    toolsClick: ctx.toolsClick,
    tableId: cacheId,
    onFilter: setFilterIds,
    toolBarClassName: restProp.toolBarClassName
  }), InfoBarNode && React__default.createElement(InfoBar, {
    infoContent: InfoBarNode,
    infoBarClassName: restProp.infoBarClassName
  }));
  return virtual ? React__default.createElement("div", {
    className: "shine-table-form",
    style: style
  }, React__default.createElement(VirtualTable, {
    rowKey: rowKey,
    dataSource: ctx.dataSource,
    columns: newColumns,
    loading: ctx.loading,
    pagination: false,
    scroll: restProp.scroll || {
      y: 500
    },
    ToolBar: ToolBarNode,
    loadMoreData: loadMoreData,
    loadMoreTopData: loadMoreTopData
  })) : React__default.createElement("div", {
    className: "shine-table-form",
    style: style
  }, ToolBarNode, React__default.createElement(Table$1, Object.assign({
    rowKey: rowKey,
    dataSource: ctx.dataSource,
    columns: newColumns,
    loading: ctx.loading,
    onChange: function onChange(_pagination, filters, sorter) {
      if (typeof ctx.pagination.onChange === 'function') {
        ctx.pagination.onChange(_pagination, filters, sorter);
      }
      ctx.params.pageSize = _pagination.pageSize;
      ctx.params.pageNum = _pagination.current;
      query(filters, sorter);
      updateLocalFilter({
        cacheId: cacheId,
        columns: columns,
        pageSize: _pagination.pageSize
      });
    },
    pagination: pagination && _extends({}, ctx.pagination, {
      pageSize: ctx.params.pageSize,
      pageNum: ctx.params.pageNum,
      onChange: function onChange() {}
    }),
    rowSelection: innerRowSelection,
    components: drag ? {
      body: {
        wrapper: function wrapper(props) {
          return React__default.createElement(DraggableContainer, Object.assign({}, props, {
            dataSource: ctx.dataSource,
            setDataSource: ctx.setDataSource,
            onDragDone: onDragDone
          }));
        },
        row: function row(props) {
          return React__default.createElement(DraggableBodyRow, Object.assign({}, props, {
            dataSource: ctx.dataSource
          }));
        }
      }
    } : undefined
  }, restProp)));
});

var defaultPaginationConfig = {
  pageNum: 1,
  pageSize: 10,
  pageSizeOptions: [10, 20, 50, 100],
  total: 0,
  showSizeChanger: true,
  showQuickJumper: true,
  showTotal: function showTotal(total) {
    return "\u5171 " + total + " \u6761";
  }
};
var useGetContext = function useGetContext(_ref) {
  var _ref$onQuery = _ref.onQuery,
    onQuery = _ref$onQuery === void 0 ? function (params) {} : _ref$onQuery,
    _ref$onLoad = _ref.onLoad,
    onLoad = _ref$onLoad === void 0 ? function (list, extOptions) {} : _ref$onLoad,
    _ref$toolsClick = _ref.toolsClick,
    toolsClick = _ref$toolsClick === void 0 ? function (tool) {} : _ref$toolsClick,
    _ref$rowOperationsCli = _ref.rowOperationsClick,
    rowOperationsClick = _ref$rowOperationsCli === void 0 ? function (menu, record, index) {} : _ref$rowOperationsCli,
    _ref$initialSearchVal = _ref.initialSearchValues,
    initialSearchValues = _ref$initialSearchVal === void 0 ? {} : _ref$initialSearchVal,
    _ref$paginationConfig = _ref.paginationConfig,
    paginationConfig = _ref$paginationConfig === void 0 ? {} : _ref$paginationConfig,
    _ref$cacheTableParams = _ref.cacheTableParams,
    cacheTableParams = _ref$cacheTableParams === void 0 ? false : _ref$cacheTableParams,
    _ref$cacheTableParams2 = _ref.cacheTableParamsId,
    cacheTableParamsId = _ref$cacheTableParams2 === void 0 ? '' : _ref$cacheTableParams2;
  var _useState = useState(0),
    refresh = _useState[0],
    setRefresh = _useState[1];
  var _useState2 = useState(false),
    loading = _useState2[0],
    setLoading = _useState2[1];
  var _useState3 = useState([]),
    dataSource = _useState3[0],
    setDataSource = _useState3[1];
  var _useState4 = useState(_extends({}, defaultPaginationConfig, paginationConfig)),
    pagination = _useState4[0],
    setPagination = _useState4[1];
  var _useState5 = useState(_extends({
      pageNum: pagination.pageNum,
      pageSize: pagination.pageSize
    }, initialSearchValues, cacheTableParams ? window["CurrentTableSearchValues" + (cacheTableParamsId || '')] : {})),
    params = _useState5[0],
    setParams = _useState5[1];
  var onReset = function onReset(clearInitialValuesOnReset) {
    setParams(_extends({}, clearInitialValuesOnReset ? {} : initialSearchValues, {
      pageSize: pagination.pageSize,
      pageNum: 1
    }));
    setRefresh(Math.random());
  };
  var onSearch = function onSearch(values) {
    params.pageNum = 1;
    setParams(_extends({}, params, values));
    setRefresh(Math.random());
  };
  return {
    refresh: refresh,
    loading: loading,
    params: params,
    initialSearchValues: initialSearchValues,
    pagination: pagination,
    setPagination: setPagination,
    dataSource: dataSource,
    setRefresh: setRefresh,
    setLoading: setLoading,
    setParams: setParams,
    onSearch: onSearch,
    onReset: onReset,
    onQuery: onQuery,
    onLoad: onLoad,
    toolsClick: toolsClick,
    rowOperationsClick: rowOperationsClick,
    setDataSource: setDataSource,
    cacheTableParams: cacheTableParams,
    cacheTableParamsId: cacheTableParamsId
  };
};
var Container = function Container(props, ref) {
  var context = useGetContext(props);
  useImperativeHandle(ref, function () {
    return context;
  });
  useEffect(function () {
    return function () {
      var _props$unMountClearCa;
      if ((_props$unMountClearCa = props.unMountClearCache) === null || _props$unMountClearCa === void 0 ? void 0 : _props$unMountClearCa.call(props)) {
        delete window["CurrentTableSearchValues" + ((props === null || props === void 0 ? void 0 : props.cacheTableParamsId) || '')];
        delete window["CurrentTableSorterValues" + ((props === null || props === void 0 ? void 0 : props.cacheTableParamsId) || '')];
      }
    };
  }, []);
  return React__default.createElement(ConfigProvider, {
    locale: zhCN
  }, React__default.createElement(Ctx.Provider, Object.assign({}, props, {
    value: context
  })));
};
var TableProvider = forwardRef(Container);
TableProvider.Search = memo(Search);
TableProvider.Table = Table;

var _excluded$H = ["height", "className", "formProps"];
var index$6 = (function (_ref) {
  var _ref$height = _ref.height,
    height = _ref$height === void 0 ? 500 : _ref$height,
    _ref$className = _ref.className,
    className = _ref$className === void 0 ? 'anchor-card-form-box' : _ref$className,
    _ref$formProps = _ref.formProps,
    formProps = _ref$formProps === void 0 ? {} : _ref$formProps,
    rest = _objectWithoutPropertiesLoose(_ref, _excluded$H);
  var _Form$useForm = FormLib.useForm(),
    form = _Form$useForm[0];
  var fileds = Array.isArray(formProps.fields) ? formProps.fields : formProps.fields(form);
  var defaultCardProps = {
    className: className,
    style: {
      borderWidth: 0,
      background: 'none'
    },
    bodyStyle: {
      height: height,
      overflow: 'auto',
      padding: 0
    }
  };
  return React__default.createElement("div", {
    className: "anchor-card-form"
  }, React__default.createElement(AnchorCard, Object.assign({
    tabs: fileds.filter(function (item) {
      var _item$isShow;
      return ((_item$isShow = item.isShow) === null || _item$isShow === void 0 ? void 0 : _item$isShow.call(item, formProps.initialValues)) !== false;
    }).map(function (item) {
      return {
        tab: item.label,
        key: item.name
      };
    }),
    getContainer: function getContainer() {
      return document.querySelector("." + className + " .ant-card-body");
    }
  }, rest), React__default.createElement(CardForm, Object.assign({}, formProps, {
    cardProps: defaultCardProps
  }))));
});

export { AnchorCard, index$6 as AnchorCardForm, ProButton as Button, CardForm, CopyLabelContent, CreateForm, index as CreateSpin, DescList, Descriptions, DragList, DraggableTabs as DragTabs, DrawerForm, Ellipsis, FormLib as Form, FormSubmit, Grid, index$1 as LongText, ModalForm, OssFileUpload, index$2 as PageProvider, index$3 as Parsley, QRCode as Qrcode, Search, staticThemeMethodHooks as StaticThemeMethod, step as StepForm, index$4 as TabDrawer, Table, TableProvider, tools, useCreatePage, useSpin, useTimer };
//# sourceMappingURL=index.modern.js.map
