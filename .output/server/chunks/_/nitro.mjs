import process from 'node:process';globalThis._importMeta_=globalThis._importMeta_||{url:"file:///_entry.js",env:process.env};import http from 'node:http';
import https from 'node:https';
import { promises, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { resolve as resolve$1, dirname as dirname$1, join } from 'node:path';

const suspectProtoRx = /"(?:_|\\u0{2}5[Ff]){2}(?:p|\\u0{2}70)(?:r|\\u0{2}72)(?:o|\\u0{2}6[Ff])(?:t|\\u0{2}74)(?:o|\\u0{2}6[Ff])(?:_|\\u0{2}5[Ff]){2}"\s*:/;
const suspectConstructorRx = /"(?:c|\\u0063)(?:o|\\u006[Ff])(?:n|\\u006[Ee])(?:s|\\u0073)(?:t|\\u0074)(?:r|\\u0072)(?:u|\\u0075)(?:c|\\u0063)(?:t|\\u0074)(?:o|\\u006[Ff])(?:r|\\u0072)"\s*:/;
const JsonSigRx = /^\s*["[{]|^\s*-?\d{1,16}(\.\d{1,17})?([Ee][+-]?\d+)?\s*$/;
function jsonParseTransform(key, value) {
  if (key === "__proto__" || key === "constructor" && value && typeof value === "object" && "prototype" in value) {
    warnKeyDropped(key);
    return;
  }
  return value;
}
function warnKeyDropped(key) {
  console.warn(`[destr] Dropping "${key}" key to prevent prototype pollution.`);
}
function destr(value, options = {}) {
  if (typeof value !== "string") {
    return value;
  }
  const _value = value.trim();
  if (
    // eslint-disable-next-line unicorn/prefer-at
    value[0] === '"' && value.endsWith('"') && !value.includes("\\")
  ) {
    return _value.slice(1, -1);
  }
  if (_value.length <= 9) {
    const _lval = _value.toLowerCase();
    if (_lval === "true") {
      return true;
    }
    if (_lval === "false") {
      return false;
    }
    if (_lval === "undefined") {
      return void 0;
    }
    if (_lval === "null") {
      return null;
    }
    if (_lval === "nan") {
      return Number.NaN;
    }
    if (_lval === "infinity") {
      return Number.POSITIVE_INFINITY;
    }
    if (_lval === "-infinity") {
      return Number.NEGATIVE_INFINITY;
    }
  }
  if (!JsonSigRx.test(value)) {
    if (options.strict) {
      throw new SyntaxError("[destr] Invalid JSON");
    }
    return value;
  }
  try {
    if (suspectProtoRx.test(value) || suspectConstructorRx.test(value)) {
      if (options.strict) {
        throw new Error("[destr] Possible prototype pollution");
      }
      return JSON.parse(value, jsonParseTransform);
    }
    return JSON.parse(value);
  } catch (error) {
    if (options.strict) {
      throw error;
    }
    return value;
  }
}

const HASH_RE = /#/g;
const AMPERSAND_RE = /&/g;
const SLASH_RE = /\//g;
const EQUAL_RE = /=/g;
const PLUS_RE = /\+/g;
const ENC_CARET_RE = /%5e/gi;
const ENC_BACKTICK_RE = /%60/gi;
const ENC_PIPE_RE = /%7c/gi;
const ENC_SPACE_RE = /%20/gi;
const ENC_SLASH_RE = /%2f/gi;
function encode(text) {
  return encodeURI("" + text).replace(ENC_PIPE_RE, "|");
}
function encodeQueryValue(input) {
  return encode(typeof input === "string" ? input : JSON.stringify(input)).replace(PLUS_RE, "%2B").replace(ENC_SPACE_RE, "+").replace(HASH_RE, "%23").replace(AMPERSAND_RE, "%26").replace(ENC_BACKTICK_RE, "`").replace(ENC_CARET_RE, "^").replace(SLASH_RE, "%2F");
}
function encodeQueryKey(text) {
  return encodeQueryValue(text).replace(EQUAL_RE, "%3D");
}
function decode(text = "") {
  try {
    return decodeURIComponent("" + text);
  } catch {
    return "" + text;
  }
}
function decodePath(text) {
  return decode(text.replace(ENC_SLASH_RE, "%252F"));
}
function decodeQueryKey(text) {
  return decode(text.replace(PLUS_RE, " "));
}
function decodeQueryValue(text) {
  return decode(text.replace(PLUS_RE, " "));
}

function parseQuery(parametersString = "") {
  const object = {};
  if (parametersString[0] === "?") {
    parametersString = parametersString.slice(1);
  }
  for (const parameter of parametersString.split("&")) {
    const s = parameter.match(/([^=]+)=?(.*)/) || [];
    if (s.length < 2) {
      continue;
    }
    const key = decodeQueryKey(s[1]);
    if (key === "__proto__" || key === "constructor") {
      continue;
    }
    const value = decodeQueryValue(s[2] || "");
    if (object[key] === void 0) {
      object[key] = value;
    } else if (Array.isArray(object[key])) {
      object[key].push(value);
    } else {
      object[key] = [object[key], value];
    }
  }
  return object;
}
function encodeQueryItem(key, value) {
  if (typeof value === "number" || typeof value === "boolean") {
    value = String(value);
  }
  if (!value) {
    return encodeQueryKey(key);
  }
  if (Array.isArray(value)) {
    return value.map((_value) => `${encodeQueryKey(key)}=${encodeQueryValue(_value)}`).join("&");
  }
  return `${encodeQueryKey(key)}=${encodeQueryValue(value)}`;
}
function stringifyQuery(query) {
  return Object.keys(query).filter((k) => query[k] !== void 0).map((k) => encodeQueryItem(k, query[k])).filter(Boolean).join("&");
}

const PROTOCOL_STRICT_REGEX = /^[\s\w\0+.-]{2,}:([/\\]{1,2})/;
const PROTOCOL_REGEX = /^[\s\w\0+.-]{2,}:([/\\]{2})?/;
const PROTOCOL_RELATIVE_REGEX = /^([/\\]\s*){2,}[^/\\]/;
const JOIN_LEADING_SLASH_RE = /^\.?\//;
function hasProtocol(inputString, opts = {}) {
  if (typeof opts === "boolean") {
    opts = { acceptRelative: opts };
  }
  if (opts.strict) {
    return PROTOCOL_STRICT_REGEX.test(inputString);
  }
  return PROTOCOL_REGEX.test(inputString) || (opts.acceptRelative ? PROTOCOL_RELATIVE_REGEX.test(inputString) : false);
}
function hasTrailingSlash(input = "", respectQueryAndFragment) {
  {
    return input.endsWith("/");
  }
}
function withoutTrailingSlash(input = "", respectQueryAndFragment) {
  {
    return (hasTrailingSlash(input) ? input.slice(0, -1) : input) || "/";
  }
}
function withTrailingSlash(input = "", respectQueryAndFragment) {
  {
    return input.endsWith("/") ? input : input + "/";
  }
}
function hasLeadingSlash(input = "") {
  return input.startsWith("/");
}
function withLeadingSlash(input = "") {
  return hasLeadingSlash(input) ? input : "/" + input;
}
function withBase(input, base) {
  if (isEmptyURL(base) || hasProtocol(input)) {
    return input;
  }
  const _base = withoutTrailingSlash(base);
  if (input.startsWith(_base)) {
    return input;
  }
  return joinURL(_base, input);
}
function withoutBase(input, base) {
  if (isEmptyURL(base)) {
    return input;
  }
  const _base = withoutTrailingSlash(base);
  if (!input.startsWith(_base)) {
    return input;
  }
  const trimmed = input.slice(_base.length);
  return trimmed[0] === "/" ? trimmed : "/" + trimmed;
}
function withQuery(input, query) {
  const parsed = parseURL(input);
  const mergedQuery = { ...parseQuery(parsed.search), ...query };
  parsed.search = stringifyQuery(mergedQuery);
  return stringifyParsedURL(parsed);
}
function getQuery$1(input) {
  return parseQuery(parseURL(input).search);
}
function isEmptyURL(url) {
  return !url || url === "/";
}
function isNonEmptyURL(url) {
  return url && url !== "/";
}
function joinURL(base, ...input) {
  let url = base || "";
  for (const segment of input.filter((url2) => isNonEmptyURL(url2))) {
    if (url) {
      const _segment = segment.replace(JOIN_LEADING_SLASH_RE, "");
      url = withTrailingSlash(url) + _segment;
    } else {
      url = segment;
    }
  }
  return url;
}
function joinRelativeURL(..._input) {
  const JOIN_SEGMENT_SPLIT_RE = /\/(?!\/)/;
  const input = _input.filter(Boolean);
  const segments = [];
  let segmentsDepth = 0;
  for (const i of input) {
    if (!i || i === "/") {
      continue;
    }
    for (const [sindex, s] of i.split(JOIN_SEGMENT_SPLIT_RE).entries()) {
      if (!s || s === ".") {
        continue;
      }
      if (s === "..") {
        if (segments.length === 1 && hasProtocol(segments[0])) {
          continue;
        }
        segments.pop();
        segmentsDepth--;
        continue;
      }
      if (sindex === 1 && segments[segments.length - 1]?.endsWith(":/")) {
        segments[segments.length - 1] += "/" + s;
        continue;
      }
      segments.push(s);
      segmentsDepth++;
    }
  }
  let url = segments.join("/");
  if (segmentsDepth >= 0) {
    if (input[0]?.startsWith("/") && !url.startsWith("/")) {
      url = "/" + url;
    } else if (input[0]?.startsWith("./") && !url.startsWith("./")) {
      url = "./" + url;
    }
  } else {
    url = "../".repeat(-1 * segmentsDepth) + url;
  }
  if (input[input.length - 1]?.endsWith("/") && !url.endsWith("/")) {
    url += "/";
  }
  return url;
}

const protocolRelative = Symbol.for("ufo:protocolRelative");
function parseURL(input = "", defaultProto) {
  const _specialProtoMatch = input.match(
    /^[\s\0]*(blob:|data:|javascript:|vbscript:)(.*)/i
  );
  if (_specialProtoMatch) {
    const [, _proto, _pathname = ""] = _specialProtoMatch;
    return {
      protocol: _proto.toLowerCase(),
      pathname: _pathname,
      href: _proto + _pathname,
      auth: "",
      host: "",
      search: "",
      hash: ""
    };
  }
  if (!hasProtocol(input, { acceptRelative: true })) {
    return defaultProto ? parseURL(defaultProto + input) : parsePath(input);
  }
  const [, protocol = "", auth, hostAndPath = ""] = input.replace(/\\/g, "/").match(/^[\s\0]*([\w+.-]{2,}:)?\/\/([^/@]+@)?(.*)/) || [];
  let [, host = "", path = ""] = hostAndPath.match(/([^#/?]*)(.*)?/) || [];
  if (protocol === "file:") {
    path = path.replace(/\/(?=[A-Za-z]:)/, "");
  }
  const { pathname, search, hash } = parsePath(path);
  return {
    protocol: protocol.toLowerCase(),
    auth: auth ? auth.slice(0, Math.max(0, auth.length - 1)) : "",
    host,
    pathname,
    search,
    hash,
    [protocolRelative]: !protocol
  };
}
function parsePath(input = "") {
  const [pathname = "", search = "", hash = ""] = (input.match(/([^#?]*)(\?[^#]*)?(#.*)?/) || []).splice(1);
  return {
    pathname,
    search,
    hash
  };
}
function stringifyParsedURL(parsed) {
  const pathname = parsed.pathname || "";
  const search = parsed.search ? (parsed.search.startsWith("?") ? "" : "?") + parsed.search : "";
  const hash = parsed.hash || "";
  const auth = parsed.auth ? parsed.auth + "@" : "";
  const host = parsed.host || "";
  const proto = parsed.protocol || parsed[protocolRelative] ? (parsed.protocol || "") + "//" : "";
  return proto + auth + host + pathname + search + hash;
}

const defaults = Object.freeze({
  ignoreUnknown: false,
  respectType: false,
  respectFunctionNames: false,
  respectFunctionProperties: false,
  unorderedObjects: true,
  unorderedArrays: false,
  unorderedSets: false,
  excludeKeys: void 0,
  excludeValues: void 0,
  replacer: void 0
});
function objectHash(object, options) {
  if (options) {
    options = { ...defaults, ...options };
  } else {
    options = defaults;
  }
  const hasher = createHasher(options);
  hasher.dispatch(object);
  return hasher.toString();
}
const defaultPrototypesKeys = Object.freeze([
  "prototype",
  "__proto__",
  "constructor"
]);
function createHasher(options) {
  let buff = "";
  let context = /* @__PURE__ */ new Map();
  const write = (str) => {
    buff += str;
  };
  return {
    toString() {
      return buff;
    },
    getContext() {
      return context;
    },
    dispatch(value) {
      if (options.replacer) {
        value = options.replacer(value);
      }
      const type = value === null ? "null" : typeof value;
      return this[type](value);
    },
    object(object) {
      if (object && typeof object.toJSON === "function") {
        return this.object(object.toJSON());
      }
      const objString = Object.prototype.toString.call(object);
      let objType = "";
      const objectLength = objString.length;
      if (objectLength < 10) {
        objType = "unknown:[" + objString + "]";
      } else {
        objType = objString.slice(8, objectLength - 1);
      }
      objType = objType.toLowerCase();
      let objectNumber = null;
      if ((objectNumber = context.get(object)) === void 0) {
        context.set(object, context.size);
      } else {
        return this.dispatch("[CIRCULAR:" + objectNumber + "]");
      }
      if (typeof Buffer !== "undefined" && Buffer.isBuffer && Buffer.isBuffer(object)) {
        write("buffer:");
        return write(object.toString("utf8"));
      }
      if (objType !== "object" && objType !== "function" && objType !== "asyncfunction") {
        if (this[objType]) {
          this[objType](object);
        } else if (!options.ignoreUnknown) {
          this.unkown(object, objType);
        }
      } else {
        let keys = Object.keys(object);
        if (options.unorderedObjects) {
          keys = keys.sort();
        }
        let extraKeys = [];
        if (options.respectType !== false && !isNativeFunction(object)) {
          extraKeys = defaultPrototypesKeys;
        }
        if (options.excludeKeys) {
          keys = keys.filter((key) => {
            return !options.excludeKeys(key);
          });
          extraKeys = extraKeys.filter((key) => {
            return !options.excludeKeys(key);
          });
        }
        write("object:" + (keys.length + extraKeys.length) + ":");
        const dispatchForKey = (key) => {
          this.dispatch(key);
          write(":");
          if (!options.excludeValues) {
            this.dispatch(object[key]);
          }
          write(",");
        };
        for (const key of keys) {
          dispatchForKey(key);
        }
        for (const key of extraKeys) {
          dispatchForKey(key);
        }
      }
    },
    array(arr, unordered) {
      unordered = unordered === void 0 ? options.unorderedArrays !== false : unordered;
      write("array:" + arr.length + ":");
      if (!unordered || arr.length <= 1) {
        for (const entry of arr) {
          this.dispatch(entry);
        }
        return;
      }
      const contextAdditions = /* @__PURE__ */ new Map();
      const entries = arr.map((entry) => {
        const hasher = createHasher(options);
        hasher.dispatch(entry);
        for (const [key, value] of hasher.getContext()) {
          contextAdditions.set(key, value);
        }
        return hasher.toString();
      });
      context = contextAdditions;
      entries.sort();
      return this.array(entries, false);
    },
    date(date) {
      return write("date:" + date.toJSON());
    },
    symbol(sym) {
      return write("symbol:" + sym.toString());
    },
    unkown(value, type) {
      write(type);
      if (!value) {
        return;
      }
      write(":");
      if (value && typeof value.entries === "function") {
        return this.array(
          Array.from(value.entries()),
          true
          /* ordered */
        );
      }
    },
    error(err) {
      return write("error:" + err.toString());
    },
    boolean(bool) {
      return write("bool:" + bool);
    },
    string(string) {
      write("string:" + string.length + ":");
      write(string);
    },
    function(fn) {
      write("fn:");
      if (isNativeFunction(fn)) {
        this.dispatch("[native]");
      } else {
        this.dispatch(fn.toString());
      }
      if (options.respectFunctionNames !== false) {
        this.dispatch("function-name:" + String(fn.name));
      }
      if (options.respectFunctionProperties) {
        this.object(fn);
      }
    },
    number(number) {
      return write("number:" + number);
    },
    xml(xml) {
      return write("xml:" + xml.toString());
    },
    null() {
      return write("Null");
    },
    undefined() {
      return write("Undefined");
    },
    regexp(regex) {
      return write("regex:" + regex.toString());
    },
    uint8array(arr) {
      write("uint8array:");
      return this.dispatch(Array.prototype.slice.call(arr));
    },
    uint8clampedarray(arr) {
      write("uint8clampedarray:");
      return this.dispatch(Array.prototype.slice.call(arr));
    },
    int8array(arr) {
      write("int8array:");
      return this.dispatch(Array.prototype.slice.call(arr));
    },
    uint16array(arr) {
      write("uint16array:");
      return this.dispatch(Array.prototype.slice.call(arr));
    },
    int16array(arr) {
      write("int16array:");
      return this.dispatch(Array.prototype.slice.call(arr));
    },
    uint32array(arr) {
      write("uint32array:");
      return this.dispatch(Array.prototype.slice.call(arr));
    },
    int32array(arr) {
      write("int32array:");
      return this.dispatch(Array.prototype.slice.call(arr));
    },
    float32array(arr) {
      write("float32array:");
      return this.dispatch(Array.prototype.slice.call(arr));
    },
    float64array(arr) {
      write("float64array:");
      return this.dispatch(Array.prototype.slice.call(arr));
    },
    arraybuffer(arr) {
      write("arraybuffer:");
      return this.dispatch(new Uint8Array(arr));
    },
    url(url) {
      return write("url:" + url.toString());
    },
    map(map) {
      write("map:");
      const arr = [...map];
      return this.array(arr, options.unorderedSets !== false);
    },
    set(set) {
      write("set:");
      const arr = [...set];
      return this.array(arr, options.unorderedSets !== false);
    },
    file(file) {
      write("file:");
      return this.dispatch([file.name, file.size, file.type, file.lastModfied]);
    },
    blob() {
      if (options.ignoreUnknown) {
        return write("[blob]");
      }
      throw new Error(
        'Hashing Blob objects is currently not supported\nUse "options.replacer" or "options.ignoreUnknown"\n'
      );
    },
    domwindow() {
      return write("domwindow");
    },
    bigint(number) {
      return write("bigint:" + number.toString());
    },
    /* Node.js standard native objects */
    process() {
      return write("process");
    },
    timer() {
      return write("timer");
    },
    pipe() {
      return write("pipe");
    },
    tcp() {
      return write("tcp");
    },
    udp() {
      return write("udp");
    },
    tty() {
      return write("tty");
    },
    statwatcher() {
      return write("statwatcher");
    },
    securecontext() {
      return write("securecontext");
    },
    connection() {
      return write("connection");
    },
    zlib() {
      return write("zlib");
    },
    context() {
      return write("context");
    },
    nodescript() {
      return write("nodescript");
    },
    httpparser() {
      return write("httpparser");
    },
    dataview() {
      return write("dataview");
    },
    signal() {
      return write("signal");
    },
    fsevent() {
      return write("fsevent");
    },
    tlswrap() {
      return write("tlswrap");
    }
  };
}
const nativeFunc = "[native code] }";
const nativeFuncLength = nativeFunc.length;
function isNativeFunction(f) {
  if (typeof f !== "function") {
    return false;
  }
  return Function.prototype.toString.call(f).slice(-nativeFuncLength) === nativeFunc;
}

var __defProp$1 = Object.defineProperty;
var __defNormalProp$1 = (obj, key, value) => key in obj ? __defProp$1(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField$1 = (obj, key, value) => {
  __defNormalProp$1(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
class WordArray {
  constructor(words, sigBytes) {
    __publicField$1(this, "words");
    __publicField$1(this, "sigBytes");
    words = this.words = words || [];
    this.sigBytes = sigBytes === void 0 ? words.length * 4 : sigBytes;
  }
  toString(encoder) {
    return (encoder || Hex).stringify(this);
  }
  concat(wordArray) {
    this.clamp();
    if (this.sigBytes % 4) {
      for (let i = 0; i < wordArray.sigBytes; i++) {
        const thatByte = wordArray.words[i >>> 2] >>> 24 - i % 4 * 8 & 255;
        this.words[this.sigBytes + i >>> 2] |= thatByte << 24 - (this.sigBytes + i) % 4 * 8;
      }
    } else {
      for (let j = 0; j < wordArray.sigBytes; j += 4) {
        this.words[this.sigBytes + j >>> 2] = wordArray.words[j >>> 2];
      }
    }
    this.sigBytes += wordArray.sigBytes;
    return this;
  }
  clamp() {
    this.words[this.sigBytes >>> 2] &= 4294967295 << 32 - this.sigBytes % 4 * 8;
    this.words.length = Math.ceil(this.sigBytes / 4);
  }
  clone() {
    return new WordArray([...this.words]);
  }
}
const Hex = {
  stringify(wordArray) {
    const hexChars = [];
    for (let i = 0; i < wordArray.sigBytes; i++) {
      const bite = wordArray.words[i >>> 2] >>> 24 - i % 4 * 8 & 255;
      hexChars.push((bite >>> 4).toString(16), (bite & 15).toString(16));
    }
    return hexChars.join("");
  }
};
const Base64 = {
  stringify(wordArray) {
    const keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const base64Chars = [];
    for (let i = 0; i < wordArray.sigBytes; i += 3) {
      const byte1 = wordArray.words[i >>> 2] >>> 24 - i % 4 * 8 & 255;
      const byte2 = wordArray.words[i + 1 >>> 2] >>> 24 - (i + 1) % 4 * 8 & 255;
      const byte3 = wordArray.words[i + 2 >>> 2] >>> 24 - (i + 2) % 4 * 8 & 255;
      const triplet = byte1 << 16 | byte2 << 8 | byte3;
      for (let j = 0; j < 4 && i * 8 + j * 6 < wordArray.sigBytes * 8; j++) {
        base64Chars.push(keyStr.charAt(triplet >>> 6 * (3 - j) & 63));
      }
    }
    return base64Chars.join("");
  }
};
const Latin1 = {
  parse(latin1Str) {
    const latin1StrLength = latin1Str.length;
    const words = [];
    for (let i = 0; i < latin1StrLength; i++) {
      words[i >>> 2] |= (latin1Str.charCodeAt(i) & 255) << 24 - i % 4 * 8;
    }
    return new WordArray(words, latin1StrLength);
  }
};
const Utf8 = {
  parse(utf8Str) {
    return Latin1.parse(unescape(encodeURIComponent(utf8Str)));
  }
};
class BufferedBlockAlgorithm {
  constructor() {
    __publicField$1(this, "_data", new WordArray());
    __publicField$1(this, "_nDataBytes", 0);
    __publicField$1(this, "_minBufferSize", 0);
    __publicField$1(this, "blockSize", 512 / 32);
  }
  reset() {
    this._data = new WordArray();
    this._nDataBytes = 0;
  }
  _append(data) {
    if (typeof data === "string") {
      data = Utf8.parse(data);
    }
    this._data.concat(data);
    this._nDataBytes += data.sigBytes;
  }
  _doProcessBlock(_dataWords, _offset) {
  }
  _process(doFlush) {
    let processedWords;
    let nBlocksReady = this._data.sigBytes / (this.blockSize * 4);
    if (doFlush) {
      nBlocksReady = Math.ceil(nBlocksReady);
    } else {
      nBlocksReady = Math.max((nBlocksReady | 0) - this._minBufferSize, 0);
    }
    const nWordsReady = nBlocksReady * this.blockSize;
    const nBytesReady = Math.min(nWordsReady * 4, this._data.sigBytes);
    if (nWordsReady) {
      for (let offset = 0; offset < nWordsReady; offset += this.blockSize) {
        this._doProcessBlock(this._data.words, offset);
      }
      processedWords = this._data.words.splice(0, nWordsReady);
      this._data.sigBytes -= nBytesReady;
    }
    return new WordArray(processedWords, nBytesReady);
  }
}
class Hasher extends BufferedBlockAlgorithm {
  update(messageUpdate) {
    this._append(messageUpdate);
    this._process();
    return this;
  }
  finalize(messageUpdate) {
    if (messageUpdate) {
      this._append(messageUpdate);
    }
  }
}

var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, key + "" , value);
  return value;
};
const H = [
  1779033703,
  -1150833019,
  1013904242,
  -1521486534,
  1359893119,
  -1694144372,
  528734635,
  1541459225
];
const K = [
  1116352408,
  1899447441,
  -1245643825,
  -373957723,
  961987163,
  1508970993,
  -1841331548,
  -1424204075,
  -670586216,
  310598401,
  607225278,
  1426881987,
  1925078388,
  -2132889090,
  -1680079193,
  -1046744716,
  -459576895,
  -272742522,
  264347078,
  604807628,
  770255983,
  1249150122,
  1555081692,
  1996064986,
  -1740746414,
  -1473132947,
  -1341970488,
  -1084653625,
  -958395405,
  -710438585,
  113926993,
  338241895,
  666307205,
  773529912,
  1294757372,
  1396182291,
  1695183700,
  1986661051,
  -2117940946,
  -1838011259,
  -1564481375,
  -1474664885,
  -1035236496,
  -949202525,
  -778901479,
  -694614492,
  -200395387,
  275423344,
  430227734,
  506948616,
  659060556,
  883997877,
  958139571,
  1322822218,
  1537002063,
  1747873779,
  1955562222,
  2024104815,
  -2067236844,
  -1933114872,
  -1866530822,
  -1538233109,
  -1090935817,
  -965641998
];
const W = [];
class SHA256 extends Hasher {
  constructor() {
    super(...arguments);
    __publicField(this, "_hash", new WordArray([...H]));
  }
  /**
   * Resets the internal state of the hash object to initial values.
   */
  reset() {
    super.reset();
    this._hash = new WordArray([...H]);
  }
  _doProcessBlock(M, offset) {
    const H2 = this._hash.words;
    let a = H2[0];
    let b = H2[1];
    let c = H2[2];
    let d = H2[3];
    let e = H2[4];
    let f = H2[5];
    let g = H2[6];
    let h = H2[7];
    for (let i = 0; i < 64; i++) {
      if (i < 16) {
        W[i] = M[offset + i] | 0;
      } else {
        const gamma0x = W[i - 15];
        const gamma0 = (gamma0x << 25 | gamma0x >>> 7) ^ (gamma0x << 14 | gamma0x >>> 18) ^ gamma0x >>> 3;
        const gamma1x = W[i - 2];
        const gamma1 = (gamma1x << 15 | gamma1x >>> 17) ^ (gamma1x << 13 | gamma1x >>> 19) ^ gamma1x >>> 10;
        W[i] = gamma0 + W[i - 7] + gamma1 + W[i - 16];
      }
      const ch = e & f ^ ~e & g;
      const maj = a & b ^ a & c ^ b & c;
      const sigma0 = (a << 30 | a >>> 2) ^ (a << 19 | a >>> 13) ^ (a << 10 | a >>> 22);
      const sigma1 = (e << 26 | e >>> 6) ^ (e << 21 | e >>> 11) ^ (e << 7 | e >>> 25);
      const t1 = h + sigma1 + ch + K[i] + W[i];
      const t2 = sigma0 + maj;
      h = g;
      g = f;
      f = e;
      e = d + t1 | 0;
      d = c;
      c = b;
      b = a;
      a = t1 + t2 | 0;
    }
    H2[0] = H2[0] + a | 0;
    H2[1] = H2[1] + b | 0;
    H2[2] = H2[2] + c | 0;
    H2[3] = H2[3] + d | 0;
    H2[4] = H2[4] + e | 0;
    H2[5] = H2[5] + f | 0;
    H2[6] = H2[6] + g | 0;
    H2[7] = H2[7] + h | 0;
  }
  /**
   * Finishes the hash calculation and returns the hash as a WordArray.
   *
   * @param {string} messageUpdate - Additional message content to include in the hash.
   * @returns {WordArray} The finalised hash as a WordArray.
   */
  finalize(messageUpdate) {
    super.finalize(messageUpdate);
    const nBitsTotal = this._nDataBytes * 8;
    const nBitsLeft = this._data.sigBytes * 8;
    this._data.words[nBitsLeft >>> 5] |= 128 << 24 - nBitsLeft % 32;
    this._data.words[(nBitsLeft + 64 >>> 9 << 4) + 14] = Math.floor(
      nBitsTotal / 4294967296
    );
    this._data.words[(nBitsLeft + 64 >>> 9 << 4) + 15] = nBitsTotal;
    this._data.sigBytes = this._data.words.length * 4;
    this._process();
    return this._hash;
  }
}
function sha256base64(message) {
  return new SHA256().finalize(message).toString(Base64);
}

function hash(object, options = {}) {
  const hashed = typeof object === "string" ? object : objectHash(object, options);
  return sha256base64(hashed).slice(0, 10);
}

const NODE_TYPES = {
  NORMAL: 0,
  WILDCARD: 1,
  PLACEHOLDER: 2
};

function createRouter$1(options = {}) {
  const ctx = {
    options,
    rootNode: createRadixNode(),
    staticRoutesMap: {}
  };
  const normalizeTrailingSlash = (p) => options.strictTrailingSlash ? p : p.replace(/\/$/, "") || "/";
  if (options.routes) {
    for (const path in options.routes) {
      insert(ctx, normalizeTrailingSlash(path), options.routes[path]);
    }
  }
  return {
    ctx,
    lookup: (path) => lookup(ctx, normalizeTrailingSlash(path)),
    insert: (path, data) => insert(ctx, normalizeTrailingSlash(path), data),
    remove: (path) => remove(ctx, normalizeTrailingSlash(path))
  };
}
function lookup(ctx, path) {
  const staticPathNode = ctx.staticRoutesMap[path];
  if (staticPathNode) {
    return staticPathNode.data;
  }
  const sections = path.split("/");
  const params = {};
  let paramsFound = false;
  let wildcardNode = null;
  let node = ctx.rootNode;
  let wildCardParam = null;
  for (let i = 0; i < sections.length; i++) {
    const section = sections[i];
    if (node.wildcardChildNode !== null) {
      wildcardNode = node.wildcardChildNode;
      wildCardParam = sections.slice(i).join("/");
    }
    const nextNode = node.children.get(section);
    if (nextNode === void 0) {
      if (node && node.placeholderChildren.length > 1) {
        const remaining = sections.length - i;
        node = node.placeholderChildren.find((c) => c.maxDepth === remaining) || null;
      } else {
        node = node.placeholderChildren[0] || null;
      }
      if (!node) {
        break;
      }
      if (node.paramName) {
        params[node.paramName] = section;
      }
      paramsFound = true;
    } else {
      node = nextNode;
    }
  }
  if ((node === null || node.data === null) && wildcardNode !== null) {
    node = wildcardNode;
    params[node.paramName || "_"] = wildCardParam;
    paramsFound = true;
  }
  if (!node) {
    return null;
  }
  if (paramsFound) {
    return {
      ...node.data,
      params: paramsFound ? params : void 0
    };
  }
  return node.data;
}
function insert(ctx, path, data) {
  let isStaticRoute = true;
  const sections = path.split("/");
  let node = ctx.rootNode;
  let _unnamedPlaceholderCtr = 0;
  const matchedNodes = [node];
  for (const section of sections) {
    let childNode;
    if (childNode = node.children.get(section)) {
      node = childNode;
    } else {
      const type = getNodeType(section);
      childNode = createRadixNode({ type, parent: node });
      node.children.set(section, childNode);
      if (type === NODE_TYPES.PLACEHOLDER) {
        childNode.paramName = section === "*" ? `_${_unnamedPlaceholderCtr++}` : section.slice(1);
        node.placeholderChildren.push(childNode);
        isStaticRoute = false;
      } else if (type === NODE_TYPES.WILDCARD) {
        node.wildcardChildNode = childNode;
        childNode.paramName = section.slice(
          3
          /* "**:" */
        ) || "_";
        isStaticRoute = false;
      }
      matchedNodes.push(childNode);
      node = childNode;
    }
  }
  for (const [depth, node2] of matchedNodes.entries()) {
    node2.maxDepth = Math.max(matchedNodes.length - depth, node2.maxDepth || 0);
  }
  node.data = data;
  if (isStaticRoute === true) {
    ctx.staticRoutesMap[path] = node;
  }
  return node;
}
function remove(ctx, path) {
  let success = false;
  const sections = path.split("/");
  let node = ctx.rootNode;
  for (const section of sections) {
    node = node.children.get(section);
    if (!node) {
      return success;
    }
  }
  if (node.data) {
    const lastSection = sections.at(-1) || "";
    node.data = null;
    if (Object.keys(node.children).length === 0 && node.parent) {
      node.parent.children.delete(lastSection);
      node.parent.wildcardChildNode = null;
      node.parent.placeholderChildren = [];
    }
    success = true;
  }
  return success;
}
function createRadixNode(options = {}) {
  return {
    type: options.type || NODE_TYPES.NORMAL,
    maxDepth: 0,
    parent: options.parent || null,
    children: /* @__PURE__ */ new Map(),
    data: options.data || null,
    paramName: options.paramName || null,
    wildcardChildNode: null,
    placeholderChildren: []
  };
}
function getNodeType(str) {
  if (str.startsWith("**")) {
    return NODE_TYPES.WILDCARD;
  }
  if (str[0] === ":" || str === "*") {
    return NODE_TYPES.PLACEHOLDER;
  }
  return NODE_TYPES.NORMAL;
}

function toRouteMatcher(router) {
  const table = _routerNodeToTable("", router.ctx.rootNode);
  return _createMatcher(table, router.ctx.options.strictTrailingSlash);
}
function _createMatcher(table, strictTrailingSlash) {
  return {
    ctx: { table },
    matchAll: (path) => _matchRoutes(path, table, strictTrailingSlash)
  };
}
function _createRouteTable() {
  return {
    static: /* @__PURE__ */ new Map(),
    wildcard: /* @__PURE__ */ new Map(),
    dynamic: /* @__PURE__ */ new Map()
  };
}
function _matchRoutes(path, table, strictTrailingSlash) {
  if (strictTrailingSlash !== true && path.endsWith("/")) {
    path = path.slice(0, -1) || "/";
  }
  const matches = [];
  for (const [key, value] of _sortRoutesMap(table.wildcard)) {
    if (path === key || path.startsWith(key + "/")) {
      matches.push(value);
    }
  }
  for (const [key, value] of _sortRoutesMap(table.dynamic)) {
    if (path.startsWith(key + "/")) {
      const subPath = "/" + path.slice(key.length).split("/").splice(2).join("/");
      matches.push(..._matchRoutes(subPath, value));
    }
  }
  const staticMatch = table.static.get(path);
  if (staticMatch) {
    matches.push(staticMatch);
  }
  return matches.filter(Boolean);
}
function _sortRoutesMap(m) {
  return [...m.entries()].sort((a, b) => a[0].length - b[0].length);
}
function _routerNodeToTable(initialPath, initialNode) {
  const table = _createRouteTable();
  function _addNode(path, node) {
    if (path) {
      if (node.type === NODE_TYPES.NORMAL && !(path.includes("*") || path.includes(":"))) {
        if (node.data) {
          table.static.set(path, node.data);
        }
      } else if (node.type === NODE_TYPES.WILDCARD) {
        table.wildcard.set(path.replace("/**", ""), node.data);
      } else if (node.type === NODE_TYPES.PLACEHOLDER) {
        const subTable = _routerNodeToTable("", node);
        if (node.data) {
          subTable.static.set("/", node.data);
        }
        table.dynamic.set(path.replace(/\/\*|\/:\w+/, ""), subTable);
        return;
      }
    }
    for (const [childPath, child] of node.children.entries()) {
      _addNode(`${path}/${childPath}`.replace("//", "/"), child);
    }
  }
  _addNode(initialPath, initialNode);
  return table;
}

function isPlainObject(value) {
  if (value === null || typeof value !== "object") {
    return false;
  }
  const prototype = Object.getPrototypeOf(value);
  if (prototype !== null && prototype !== Object.prototype && Object.getPrototypeOf(prototype) !== null) {
    return false;
  }
  if (Symbol.iterator in value) {
    return false;
  }
  if (Symbol.toStringTag in value) {
    return Object.prototype.toString.call(value) === "[object Module]";
  }
  return true;
}

function _defu(baseObject, defaults, namespace = ".", merger) {
  if (!isPlainObject(defaults)) {
    return _defu(baseObject, {}, namespace, merger);
  }
  const object = Object.assign({}, defaults);
  for (const key in baseObject) {
    if (key === "__proto__" || key === "constructor") {
      continue;
    }
    const value = baseObject[key];
    if (value === null || value === void 0) {
      continue;
    }
    if (merger && merger(object, key, value, namespace)) {
      continue;
    }
    if (Array.isArray(value) && Array.isArray(object[key])) {
      object[key] = [...value, ...object[key]];
    } else if (isPlainObject(value) && isPlainObject(object[key])) {
      object[key] = _defu(
        value,
        object[key],
        (namespace ? `${namespace}.` : "") + key.toString(),
        merger
      );
    } else {
      object[key] = value;
    }
  }
  return object;
}
function createDefu(merger) {
  return (...arguments_) => (
    // eslint-disable-next-line unicorn/no-array-reduce
    arguments_.reduce((p, c) => _defu(p, c, "", merger), {})
  );
}
const defu = createDefu();
const defuFn = createDefu((object, key, currentValue) => {
  if (object[key] !== void 0 && typeof currentValue === "function") {
    object[key] = currentValue(object[key]);
    return true;
  }
});

function hasProp(obj, prop) {
  try {
    return prop in obj;
  } catch {
    return false;
  }
}

class H3Error extends Error {
  static __h3_error__ = true;
  statusCode = 500;
  fatal = false;
  unhandled = false;
  statusMessage;
  data;
  cause;
  constructor(message, opts = {}) {
    super(message, opts);
    if (opts.cause && !this.cause) {
      this.cause = opts.cause;
    }
  }
  toJSON() {
    const obj = {
      message: this.message,
      statusCode: sanitizeStatusCode(this.statusCode, 500)
    };
    if (this.statusMessage) {
      obj.statusMessage = sanitizeStatusMessage(this.statusMessage);
    }
    if (this.data !== undefined) {
      obj.data = this.data;
    }
    return obj;
  }
}
function createError$1(input) {
  if (typeof input === "string") {
    return new H3Error(input);
  }
  if (isError(input)) {
    return input;
  }
  const err = new H3Error(input.message ?? input.statusMessage ?? "", {
    cause: input.cause || input
  });
  if (hasProp(input, "stack")) {
    try {
      Object.defineProperty(err, "stack", {
        get() {
          return input.stack;
        }
      });
    } catch {
      try {
        err.stack = input.stack;
      } catch {
      }
    }
  }
  if (input.data) {
    err.data = input.data;
  }
  if (input.statusCode) {
    err.statusCode = sanitizeStatusCode(input.statusCode, err.statusCode);
  } else if (input.status) {
    err.statusCode = sanitizeStatusCode(input.status, err.statusCode);
  }
  if (input.statusMessage) {
    err.statusMessage = input.statusMessage;
  } else if (input.statusText) {
    err.statusMessage = input.statusText;
  }
  if (err.statusMessage) {
    const originalMessage = err.statusMessage;
    const sanitizedMessage = sanitizeStatusMessage(err.statusMessage);
    if (sanitizedMessage !== originalMessage) {
      console.warn(
        "[h3] Please prefer using `message` for longer error messages instead of `statusMessage`. In the future, `statusMessage` will be sanitized by default."
      );
    }
  }
  if (input.fatal !== undefined) {
    err.fatal = input.fatal;
  }
  if (input.unhandled !== undefined) {
    err.unhandled = input.unhandled;
  }
  return err;
}
function sendError(event, error, debug) {
  if (event.handled) {
    return;
  }
  const h3Error = isError(error) ? error : createError$1(error);
  const responseBody = {
    statusCode: h3Error.statusCode,
    statusMessage: h3Error.statusMessage,
    stack: [],
    data: h3Error.data
  };
  if (debug) {
    responseBody.stack = (h3Error.stack || "").split("\n").map((l) => l.trim());
  }
  if (event.handled) {
    return;
  }
  const _code = Number.parseInt(h3Error.statusCode);
  setResponseStatus(event, _code, h3Error.statusMessage);
  event.node.res.setHeader("content-type", MIMES.json);
  event.node.res.end(JSON.stringify(responseBody, undefined, 2));
}
function isError(input) {
  return input?.constructor?.__h3_error__ === true;
}

function getQuery(event) {
  return getQuery$1(event.path || "");
}
function isMethod(event, expected, allowHead) {
  if (typeof expected === "string") {
    if (event.method === expected) {
      return true;
    }
  } else if (expected.includes(event.method)) {
    return true;
  }
  return false;
}
function assertMethod(event, expected, allowHead) {
  if (!isMethod(event, expected)) {
    throw createError$1({
      statusCode: 405,
      statusMessage: "HTTP method is not allowed."
    });
  }
}
function getRequestHeaders(event) {
  const _headers = {};
  for (const key in event.node.req.headers) {
    const val = event.node.req.headers[key];
    _headers[key] = Array.isArray(val) ? val.filter(Boolean).join(", ") : val;
  }
  return _headers;
}
function getRequestHeader(event, name) {
  const headers = getRequestHeaders(event);
  const value = headers[name.toLowerCase()];
  return value;
}

const RawBodySymbol = Symbol.for("h3RawBody");
const PayloadMethods$1 = ["PATCH", "POST", "PUT", "DELETE"];
function readRawBody(event, encoding = "utf8") {
  assertMethod(event, PayloadMethods$1);
  const _rawBody = event._requestBody || event.web?.request?.body || event.node.req[RawBodySymbol] || event.node.req.rawBody || event.node.req.body;
  if (_rawBody) {
    const promise2 = Promise.resolve(_rawBody).then((_resolved) => {
      if (Buffer.isBuffer(_resolved)) {
        return _resolved;
      }
      if (typeof _resolved.pipeTo === "function") {
        return new Promise((resolve, reject) => {
          const chunks = [];
          _resolved.pipeTo(
            new WritableStream({
              write(chunk) {
                chunks.push(chunk);
              },
              close() {
                resolve(Buffer.concat(chunks));
              },
              abort(reason) {
                reject(reason);
              }
            })
          ).catch(reject);
        });
      } else if (typeof _resolved.pipe === "function") {
        return new Promise((resolve, reject) => {
          const chunks = [];
          _resolved.on("data", (chunk) => {
            chunks.push(chunk);
          }).on("end", () => {
            resolve(Buffer.concat(chunks));
          }).on("error", reject);
        });
      }
      if (_resolved.constructor === Object) {
        return Buffer.from(JSON.stringify(_resolved));
      }
      if (_resolved instanceof URLSearchParams) {
        return Buffer.from(_resolved.toString());
      }
      return Buffer.from(_resolved);
    });
    return encoding ? promise2.then((buff) => buff.toString(encoding)) : promise2;
  }
  if (!Number.parseInt(event.node.req.headers["content-length"] || "") && !String(event.node.req.headers["transfer-encoding"] ?? "").split(",").map((e) => e.trim()).filter(Boolean).includes("chunked")) {
    return Promise.resolve(undefined);
  }
  const promise = event.node.req[RawBodySymbol] = new Promise(
    (resolve, reject) => {
      const bodyData = [];
      event.node.req.on("error", (err) => {
        reject(err);
      }).on("data", (chunk) => {
        bodyData.push(chunk);
      }).on("end", () => {
        resolve(Buffer.concat(bodyData));
      });
    }
  );
  const result = encoding ? promise.then((buff) => buff.toString(encoding)) : promise;
  return result;
}
function getRequestWebStream(event) {
  if (!PayloadMethods$1.includes(event.method)) {
    return;
  }
  const bodyStream = event.web?.request?.body || event._requestBody;
  if (bodyStream) {
    return bodyStream;
  }
  const _hasRawBody = RawBodySymbol in event.node.req || "rawBody" in event.node.req || "body" in event.node.req || "__unenv__" in event.node.req;
  if (_hasRawBody) {
    return new ReadableStream({
      async start(controller) {
        const _rawBody = await readRawBody(event, false);
        if (_rawBody) {
          controller.enqueue(_rawBody);
        }
        controller.close();
      }
    });
  }
  return new ReadableStream({
    start: (controller) => {
      event.node.req.on("data", (chunk) => {
        controller.enqueue(chunk);
      });
      event.node.req.on("end", () => {
        controller.close();
      });
      event.node.req.on("error", (err) => {
        controller.error(err);
      });
    }
  });
}

function handleCacheHeaders(event, opts) {
  const cacheControls = ["public", ...opts.cacheControls || []];
  let cacheMatched = false;
  if (opts.maxAge !== undefined) {
    cacheControls.push(`max-age=${+opts.maxAge}`, `s-maxage=${+opts.maxAge}`);
  }
  if (opts.modifiedTime) {
    const modifiedTime = new Date(opts.modifiedTime);
    const ifModifiedSince = event.node.req.headers["if-modified-since"];
    event.node.res.setHeader("last-modified", modifiedTime.toUTCString());
    if (ifModifiedSince && new Date(ifModifiedSince) >= opts.modifiedTime) {
      cacheMatched = true;
    }
  }
  if (opts.etag) {
    event.node.res.setHeader("etag", opts.etag);
    const ifNonMatch = event.node.req.headers["if-none-match"];
    if (ifNonMatch === opts.etag) {
      cacheMatched = true;
    }
  }
  event.node.res.setHeader("cache-control", cacheControls.join(", "));
  if (cacheMatched) {
    event.node.res.statusCode = 304;
    if (!event.handled) {
      event.node.res.end();
    }
    return true;
  }
  return false;
}

const MIMES = {
  html: "text/html",
  json: "application/json"
};

const DISALLOWED_STATUS_CHARS = /[^\u0009\u0020-\u007E]/g;
function sanitizeStatusMessage(statusMessage = "") {
  return statusMessage.replace(DISALLOWED_STATUS_CHARS, "");
}
function sanitizeStatusCode(statusCode, defaultStatusCode = 200) {
  if (!statusCode) {
    return defaultStatusCode;
  }
  if (typeof statusCode === "string") {
    statusCode = Number.parseInt(statusCode, 10);
  }
  if (statusCode < 100 || statusCode > 999) {
    return defaultStatusCode;
  }
  return statusCode;
}
function splitCookiesString(cookiesString) {
  if (Array.isArray(cookiesString)) {
    return cookiesString.flatMap((c) => splitCookiesString(c));
  }
  if (typeof cookiesString !== "string") {
    return [];
  }
  const cookiesStrings = [];
  let pos = 0;
  let start;
  let ch;
  let lastComma;
  let nextStart;
  let cookiesSeparatorFound;
  const skipWhitespace = () => {
    while (pos < cookiesString.length && /\s/.test(cookiesString.charAt(pos))) {
      pos += 1;
    }
    return pos < cookiesString.length;
  };
  const notSpecialChar = () => {
    ch = cookiesString.charAt(pos);
    return ch !== "=" && ch !== ";" && ch !== ",";
  };
  while (pos < cookiesString.length) {
    start = pos;
    cookiesSeparatorFound = false;
    while (skipWhitespace()) {
      ch = cookiesString.charAt(pos);
      if (ch === ",") {
        lastComma = pos;
        pos += 1;
        skipWhitespace();
        nextStart = pos;
        while (pos < cookiesString.length && notSpecialChar()) {
          pos += 1;
        }
        if (pos < cookiesString.length && cookiesString.charAt(pos) === "=") {
          cookiesSeparatorFound = true;
          pos = nextStart;
          cookiesStrings.push(cookiesString.slice(start, lastComma));
          start = pos;
        } else {
          pos = lastComma + 1;
        }
      } else {
        pos += 1;
      }
    }
    if (!cookiesSeparatorFound || pos >= cookiesString.length) {
      cookiesStrings.push(cookiesString.slice(start));
    }
  }
  return cookiesStrings;
}

const defer = typeof setImmediate === "undefined" ? (fn) => fn() : setImmediate;
function send(event, data, type) {
  if (type) {
    defaultContentType(event, type);
  }
  return new Promise((resolve) => {
    defer(() => {
      if (!event.handled) {
        event.node.res.end(data);
      }
      resolve();
    });
  });
}
function sendNoContent(event, code) {
  if (event.handled) {
    return;
  }
  if (!code && event.node.res.statusCode !== 200) {
    code = event.node.res.statusCode;
  }
  const _code = sanitizeStatusCode(code, 204);
  if (_code === 204) {
    event.node.res.removeHeader("content-length");
  }
  event.node.res.writeHead(_code);
  event.node.res.end();
}
function setResponseStatus(event, code, text) {
  if (code) {
    event.node.res.statusCode = sanitizeStatusCode(
      code,
      event.node.res.statusCode
    );
  }
  if (text) {
    event.node.res.statusMessage = sanitizeStatusMessage(text);
  }
}
function getResponseStatus(event) {
  return event.node.res.statusCode;
}
function getResponseStatusText(event) {
  return event.node.res.statusMessage;
}
function defaultContentType(event, type) {
  if (type && event.node.res.statusCode !== 304 && !event.node.res.getHeader("content-type")) {
    event.node.res.setHeader("content-type", type);
  }
}
function sendRedirect(event, location, code = 302) {
  event.node.res.statusCode = sanitizeStatusCode(
    code,
    event.node.res.statusCode
  );
  event.node.res.setHeader("location", location);
  const encodedLoc = location.replace(/"/g, "%22");
  const html = `<!DOCTYPE html><html><head><meta http-equiv="refresh" content="0; url=${encodedLoc}"></head></html>`;
  return send(event, html, MIMES.html);
}
function getResponseHeader(event, name) {
  return event.node.res.getHeader(name);
}
function setResponseHeaders(event, headers) {
  for (const [name, value] of Object.entries(headers)) {
    event.node.res.setHeader(
      name,
      value
    );
  }
}
const setHeaders = setResponseHeaders;
function setResponseHeader(event, name, value) {
  event.node.res.setHeader(name, value);
}
function appendResponseHeader(event, name, value) {
  let current = event.node.res.getHeader(name);
  if (!current) {
    event.node.res.setHeader(name, value);
    return;
  }
  if (!Array.isArray(current)) {
    current = [current.toString()];
  }
  event.node.res.setHeader(name, [...current, value]);
}
function removeResponseHeader(event, name) {
  return event.node.res.removeHeader(name);
}
function isStream(data) {
  if (!data || typeof data !== "object") {
    return false;
  }
  if (typeof data.pipe === "function") {
    if (typeof data._read === "function") {
      return true;
    }
    if (typeof data.abort === "function") {
      return true;
    }
  }
  if (typeof data.pipeTo === "function") {
    return true;
  }
  return false;
}
function isWebResponse(data) {
  return typeof Response !== "undefined" && data instanceof Response;
}
function sendStream(event, stream) {
  if (!stream || typeof stream !== "object") {
    throw new Error("[h3] Invalid stream provided.");
  }
  event.node.res._data = stream;
  if (!event.node.res.socket) {
    event._handled = true;
    return Promise.resolve();
  }
  if (hasProp(stream, "pipeTo") && typeof stream.pipeTo === "function") {
    return stream.pipeTo(
      new WritableStream({
        write(chunk) {
          event.node.res.write(chunk);
        }
      })
    ).then(() => {
      event.node.res.end();
    });
  }
  if (hasProp(stream, "pipe") && typeof stream.pipe === "function") {
    return new Promise((resolve, reject) => {
      stream.pipe(event.node.res);
      if (stream.on) {
        stream.on("end", () => {
          event.node.res.end();
          resolve();
        });
        stream.on("error", (error) => {
          reject(error);
        });
      }
      event.node.res.on("close", () => {
        if (stream.abort) {
          stream.abort();
        }
      });
    });
  }
  throw new Error("[h3] Invalid or incompatible stream provided.");
}
function sendWebResponse(event, response) {
  for (const [key, value] of response.headers) {
    if (key === "set-cookie") {
      event.node.res.appendHeader(key, splitCookiesString(value));
    } else {
      event.node.res.setHeader(key, value);
    }
  }
  if (response.status) {
    event.node.res.statusCode = sanitizeStatusCode(
      response.status,
      event.node.res.statusCode
    );
  }
  if (response.statusText) {
    event.node.res.statusMessage = sanitizeStatusMessage(response.statusText);
  }
  if (response.redirected) {
    event.node.res.setHeader("location", response.url);
  }
  if (!response.body) {
    event.node.res.end();
    return;
  }
  return sendStream(event, response.body);
}

const PayloadMethods = /* @__PURE__ */ new Set(["PATCH", "POST", "PUT", "DELETE"]);
const ignoredHeaders = /* @__PURE__ */ new Set([
  "transfer-encoding",
  "accept-encoding",
  "connection",
  "keep-alive",
  "upgrade",
  "expect",
  "host",
  "accept"
]);
async function proxyRequest(event, target, opts = {}) {
  let body;
  let duplex;
  if (PayloadMethods.has(event.method)) {
    if (opts.streamRequest) {
      body = getRequestWebStream(event);
      duplex = "half";
    } else {
      body = await readRawBody(event, false).catch(() => undefined);
    }
  }
  const method = opts.fetchOptions?.method || event.method;
  const fetchHeaders = mergeHeaders$1(
    getProxyRequestHeaders(event, { host: target.startsWith("/") }),
    opts.fetchOptions?.headers,
    opts.headers
  );
  return sendProxy(event, target, {
    ...opts,
    fetchOptions: {
      method,
      body,
      duplex,
      ...opts.fetchOptions,
      headers: fetchHeaders
    }
  });
}
async function sendProxy(event, target, opts = {}) {
  let response;
  try {
    response = await _getFetch(opts.fetch)(target, {
      headers: opts.headers,
      ignoreResponseError: true,
      // make $ofetch.raw transparent
      ...opts.fetchOptions
    });
  } catch (error) {
    throw createError$1({
      status: 502,
      statusMessage: "Bad Gateway",
      cause: error
    });
  }
  event.node.res.statusCode = sanitizeStatusCode(
    response.status,
    event.node.res.statusCode
  );
  event.node.res.statusMessage = sanitizeStatusMessage(response.statusText);
  const cookies = [];
  for (const [key, value] of response.headers.entries()) {
    if (key === "content-encoding") {
      continue;
    }
    if (key === "content-length") {
      continue;
    }
    if (key === "set-cookie") {
      cookies.push(...splitCookiesString(value));
      continue;
    }
    event.node.res.setHeader(key, value);
  }
  if (cookies.length > 0) {
    event.node.res.setHeader(
      "set-cookie",
      cookies.map((cookie) => {
        if (opts.cookieDomainRewrite) {
          cookie = rewriteCookieProperty(
            cookie,
            opts.cookieDomainRewrite,
            "domain"
          );
        }
        if (opts.cookiePathRewrite) {
          cookie = rewriteCookieProperty(
            cookie,
            opts.cookiePathRewrite,
            "path"
          );
        }
        return cookie;
      })
    );
  }
  if (opts.onResponse) {
    await opts.onResponse(event, response);
  }
  if (response._data !== undefined) {
    return response._data;
  }
  if (event.handled) {
    return;
  }
  if (opts.sendStream === false) {
    const data = new Uint8Array(await response.arrayBuffer());
    return event.node.res.end(data);
  }
  if (response.body) {
    for await (const chunk of response.body) {
      event.node.res.write(chunk);
    }
  }
  return event.node.res.end();
}
function getProxyRequestHeaders(event, opts) {
  const headers = /* @__PURE__ */ Object.create(null);
  const reqHeaders = getRequestHeaders(event);
  for (const name in reqHeaders) {
    if (!ignoredHeaders.has(name) || name === "host" && opts?.host) {
      headers[name] = reqHeaders[name];
    }
  }
  return headers;
}
function fetchWithEvent(event, req, init, options) {
  return _getFetch(options?.fetch)(req, {
    ...init,
    context: init?.context || event.context,
    headers: {
      ...getProxyRequestHeaders(event, {
        host: typeof req === "string" && req.startsWith("/")
      }),
      ...init?.headers
    }
  });
}
function _getFetch(_fetch) {
  if (_fetch) {
    return _fetch;
  }
  if (globalThis.fetch) {
    return globalThis.fetch;
  }
  throw new Error(
    "fetch is not available. Try importing `node-fetch-native/polyfill` for Node.js."
  );
}
function rewriteCookieProperty(header, map, property) {
  const _map = typeof map === "string" ? { "*": map } : map;
  return header.replace(
    new RegExp(`(;\\s*${property}=)([^;]+)`, "gi"),
    (match, prefix, previousValue) => {
      let newValue;
      if (previousValue in _map) {
        newValue = _map[previousValue];
      } else if ("*" in _map) {
        newValue = _map["*"];
      } else {
        return match;
      }
      return newValue ? prefix + newValue : "";
    }
  );
}
function mergeHeaders$1(defaults, ...inputs) {
  const _inputs = inputs.filter(Boolean);
  if (_inputs.length === 0) {
    return defaults;
  }
  const merged = new Headers(defaults);
  for (const input of _inputs) {
    for (const [key, value] of Object.entries(input)) {
      if (value !== undefined) {
        merged.set(key, value);
      }
    }
  }
  return merged;
}

class H3Event {
  "__is_event__" = true;
  // Context
  node;
  // Node
  web;
  // Web
  context = {};
  // Shared
  // Request
  _method;
  _path;
  _headers;
  _requestBody;
  // Response
  _handled = false;
  // Hooks
  _onBeforeResponseCalled;
  _onAfterResponseCalled;
  constructor(req, res) {
    this.node = { req, res };
  }
  // --- Request ---
  get method() {
    if (!this._method) {
      this._method = (this.node.req.method || "GET").toUpperCase();
    }
    return this._method;
  }
  get path() {
    return this._path || this.node.req.url || "/";
  }
  get headers() {
    if (!this._headers) {
      this._headers = _normalizeNodeHeaders(this.node.req.headers);
    }
    return this._headers;
  }
  // --- Respoonse ---
  get handled() {
    return this._handled || this.node.res.writableEnded || this.node.res.headersSent;
  }
  respondWith(response) {
    return Promise.resolve(response).then(
      (_response) => sendWebResponse(this, _response)
    );
  }
  // --- Utils ---
  toString() {
    return `[${this.method}] ${this.path}`;
  }
  toJSON() {
    return this.toString();
  }
  // --- Deprecated ---
  /** @deprecated Please use `event.node.req` instead. */
  get req() {
    return this.node.req;
  }
  /** @deprecated Please use `event.node.res` instead. */
  get res() {
    return this.node.res;
  }
}
function isEvent(input) {
  return hasProp(input, "__is_event__");
}
function createEvent(req, res) {
  return new H3Event(req, res);
}
function _normalizeNodeHeaders(nodeHeaders) {
  const headers = new Headers();
  for (const [name, value] of Object.entries(nodeHeaders)) {
    if (Array.isArray(value)) {
      for (const item of value) {
        headers.append(name, item);
      }
    } else if (value) {
      headers.set(name, value);
    }
  }
  return headers;
}

function defineEventHandler(handler) {
  if (typeof handler === "function") {
    handler.__is_handler__ = true;
    return handler;
  }
  const _hooks = {
    onRequest: _normalizeArray(handler.onRequest),
    onBeforeResponse: _normalizeArray(handler.onBeforeResponse)
  };
  const _handler = (event) => {
    return _callHandler(event, handler.handler, _hooks);
  };
  _handler.__is_handler__ = true;
  _handler.__resolve__ = handler.handler.__resolve__;
  _handler.__websocket__ = handler.websocket;
  return _handler;
}
function _normalizeArray(input) {
  return input ? Array.isArray(input) ? input : [input] : undefined;
}
async function _callHandler(event, handler, hooks) {
  if (hooks.onRequest) {
    for (const hook of hooks.onRequest) {
      await hook(event);
      if (event.handled) {
        return;
      }
    }
  }
  const body = await handler(event);
  const response = { body };
  if (hooks.onBeforeResponse) {
    for (const hook of hooks.onBeforeResponse) {
      await hook(event, response);
    }
  }
  return response.body;
}
const eventHandler = defineEventHandler;
function isEventHandler(input) {
  return hasProp(input, "__is_handler__");
}
function toEventHandler(input, _, _route) {
  if (!isEventHandler(input)) {
    console.warn(
      "[h3] Implicit event handler conversion is deprecated. Use `eventHandler()` or `fromNodeMiddleware()` to define event handlers.",
      _route && _route !== "/" ? `
     Route: ${_route}` : "",
      `
     Handler: ${input}`
    );
  }
  return input;
}
function defineLazyEventHandler(factory) {
  let _promise;
  let _resolved;
  const resolveHandler = () => {
    if (_resolved) {
      return Promise.resolve(_resolved);
    }
    if (!_promise) {
      _promise = Promise.resolve(factory()).then((r) => {
        const handler2 = r.default || r;
        if (typeof handler2 !== "function") {
          throw new TypeError(
            "Invalid lazy handler result. It should be a function:",
            handler2
          );
        }
        _resolved = { handler: toEventHandler(r.default || r) };
        return _resolved;
      });
    }
    return _promise;
  };
  const handler = eventHandler((event) => {
    if (_resolved) {
      return _resolved.handler(event);
    }
    return resolveHandler().then((r) => r.handler(event));
  });
  handler.__resolve__ = resolveHandler;
  return handler;
}
const lazyEventHandler = defineLazyEventHandler;

function createApp(options = {}) {
  const stack = [];
  const handler = createAppEventHandler(stack, options);
  const resolve = createResolver(stack);
  handler.__resolve__ = resolve;
  const getWebsocket = cachedFn(() => websocketOptions(resolve, options));
  const app = {
    // @ts-expect-error
    use: (arg1, arg2, arg3) => use(app, arg1, arg2, arg3),
    resolve,
    handler,
    stack,
    options,
    get websocket() {
      return getWebsocket();
    }
  };
  return app;
}
function use(app, arg1, arg2, arg3) {
  if (Array.isArray(arg1)) {
    for (const i of arg1) {
      use(app, i, arg2, arg3);
    }
  } else if (Array.isArray(arg2)) {
    for (const i of arg2) {
      use(app, arg1, i, arg3);
    }
  } else if (typeof arg1 === "string") {
    app.stack.push(
      normalizeLayer({ ...arg3, route: arg1, handler: arg2 })
    );
  } else if (typeof arg1 === "function") {
    app.stack.push(normalizeLayer({ ...arg2, handler: arg1 }));
  } else {
    app.stack.push(normalizeLayer({ ...arg1 }));
  }
  return app;
}
function createAppEventHandler(stack, options) {
  const spacing = options.debug ? 2 : undefined;
  return eventHandler(async (event) => {
    event.node.req.originalUrl = event.node.req.originalUrl || event.node.req.url || "/";
    const _reqPath = event._path || event.node.req.url || "/";
    let _layerPath;
    if (options.onRequest) {
      await options.onRequest(event);
    }
    for (const layer of stack) {
      if (layer.route.length > 1) {
        if (!_reqPath.startsWith(layer.route)) {
          continue;
        }
        _layerPath = _reqPath.slice(layer.route.length) || "/";
      } else {
        _layerPath = _reqPath;
      }
      if (layer.match && !layer.match(_layerPath, event)) {
        continue;
      }
      event._path = _layerPath;
      event.node.req.url = _layerPath;
      const val = await layer.handler(event);
      const _body = val === undefined ? undefined : await val;
      if (_body !== undefined) {
        const _response = { body: _body };
        if (options.onBeforeResponse) {
          event._onBeforeResponseCalled = true;
          await options.onBeforeResponse(event, _response);
        }
        await handleHandlerResponse(event, _response.body, spacing);
        if (options.onAfterResponse) {
          event._onAfterResponseCalled = true;
          await options.onAfterResponse(event, _response);
        }
        return;
      }
      if (event.handled) {
        if (options.onAfterResponse) {
          event._onAfterResponseCalled = true;
          await options.onAfterResponse(event, undefined);
        }
        return;
      }
    }
    if (!event.handled) {
      throw createError$1({
        statusCode: 404,
        statusMessage: `Cannot find any path matching ${event.path || "/"}.`
      });
    }
    if (options.onAfterResponse) {
      event._onAfterResponseCalled = true;
      await options.onAfterResponse(event, undefined);
    }
  });
}
function createResolver(stack) {
  return async (path) => {
    let _layerPath;
    for (const layer of stack) {
      if (layer.route === "/" && !layer.handler.__resolve__) {
        continue;
      }
      if (!path.startsWith(layer.route)) {
        continue;
      }
      _layerPath = path.slice(layer.route.length) || "/";
      if (layer.match && !layer.match(_layerPath, undefined)) {
        continue;
      }
      let res = { route: layer.route, handler: layer.handler };
      if (res.handler.__resolve__) {
        const _res = await res.handler.__resolve__(_layerPath);
        if (!_res) {
          continue;
        }
        res = {
          ...res,
          ..._res,
          route: joinURL(res.route || "/", _res.route || "/")
        };
      }
      return res;
    }
  };
}
function normalizeLayer(input) {
  let handler = input.handler;
  if (handler.handler) {
    handler = handler.handler;
  }
  if (input.lazy) {
    handler = lazyEventHandler(handler);
  } else if (!isEventHandler(handler)) {
    handler = toEventHandler(handler, undefined, input.route);
  }
  return {
    route: withoutTrailingSlash(input.route),
    match: input.match,
    handler
  };
}
function handleHandlerResponse(event, val, jsonSpace) {
  if (val === null) {
    return sendNoContent(event);
  }
  if (val) {
    if (isWebResponse(val)) {
      return sendWebResponse(event, val);
    }
    if (isStream(val)) {
      return sendStream(event, val);
    }
    if (val.buffer) {
      return send(event, val);
    }
    if (val.arrayBuffer && typeof val.arrayBuffer === "function") {
      return val.arrayBuffer().then((arrayBuffer) => {
        return send(event, Buffer.from(arrayBuffer), val.type);
      });
    }
    if (val instanceof Error) {
      throw createError$1(val);
    }
    if (typeof val.end === "function") {
      return true;
    }
  }
  const valType = typeof val;
  if (valType === "string") {
    return send(event, val, MIMES.html);
  }
  if (valType === "object" || valType === "boolean" || valType === "number") {
    return send(event, JSON.stringify(val, undefined, jsonSpace), MIMES.json);
  }
  if (valType === "bigint") {
    return send(event, val.toString(), MIMES.json);
  }
  throw createError$1({
    statusCode: 500,
    statusMessage: `[h3] Cannot send ${valType} as response.`
  });
}
function cachedFn(fn) {
  let cache;
  return () => {
    if (!cache) {
      cache = fn();
    }
    return cache;
  };
}
function websocketOptions(evResolver, appOptions) {
  return {
    ...appOptions.websocket,
    async resolve(info) {
      const url = info.request?.url || info.url || "/";
      const { pathname } = typeof url === "string" ? parseURL(url) : url;
      const resolved = await evResolver(pathname);
      return resolved?.handler?.__websocket__ || {};
    }
  };
}

const RouterMethods = [
  "connect",
  "delete",
  "get",
  "head",
  "options",
  "post",
  "put",
  "trace",
  "patch"
];
function createRouter(opts = {}) {
  const _router = createRouter$1({});
  const routes = {};
  let _matcher;
  const router = {};
  const addRoute = (path, handler, method) => {
    let route = routes[path];
    if (!route) {
      routes[path] = route = { path, handlers: {} };
      _router.insert(path, route);
    }
    if (Array.isArray(method)) {
      for (const m of method) {
        addRoute(path, handler, m);
      }
    } else {
      route.handlers[method] = toEventHandler(handler, undefined, path);
    }
    return router;
  };
  router.use = router.add = (path, handler, method) => addRoute(path, handler, method || "all");
  for (const method of RouterMethods) {
    router[method] = (path, handle) => router.add(path, handle, method);
  }
  const matchHandler = (path = "/", method = "get") => {
    const qIndex = path.indexOf("?");
    if (qIndex !== -1) {
      path = path.slice(0, Math.max(0, qIndex));
    }
    const matched = _router.lookup(path);
    if (!matched || !matched.handlers) {
      return {
        error: createError$1({
          statusCode: 404,
          name: "Not Found",
          statusMessage: `Cannot find any route matching ${path || "/"}.`
        })
      };
    }
    let handler = matched.handlers[method] || matched.handlers.all;
    if (!handler) {
      if (!_matcher) {
        _matcher = toRouteMatcher(_router);
      }
      const _matches = _matcher.matchAll(path).reverse();
      for (const _match of _matches) {
        if (_match.handlers[method]) {
          handler = _match.handlers[method];
          matched.handlers[method] = matched.handlers[method] || handler;
          break;
        }
        if (_match.handlers.all) {
          handler = _match.handlers.all;
          matched.handlers.all = matched.handlers.all || handler;
          break;
        }
      }
    }
    if (!handler) {
      return {
        error: createError$1({
          statusCode: 405,
          name: "Method Not Allowed",
          statusMessage: `Method ${method} is not allowed on this route.`
        })
      };
    }
    return { matched, handler };
  };
  const isPreemptive = opts.preemptive || opts.preemtive;
  router.handler = eventHandler((event) => {
    const match = matchHandler(
      event.path,
      event.method.toLowerCase()
    );
    if ("error" in match) {
      if (isPreemptive) {
        throw match.error;
      } else {
        return;
      }
    }
    event.context.matchedRoute = match.matched;
    const params = match.matched.params || {};
    event.context.params = params;
    return Promise.resolve(match.handler(event)).then((res) => {
      if (res === undefined && isPreemptive) {
        return null;
      }
      return res;
    });
  });
  router.handler.__resolve__ = async (path) => {
    path = withLeadingSlash(path);
    const match = matchHandler(path);
    if ("error" in match) {
      return;
    }
    let res = {
      route: match.matched.path,
      handler: match.handler
    };
    if (match.handler.__resolve__) {
      const _res = await match.handler.__resolve__(path);
      if (!_res) {
        return;
      }
      res = { ...res, ..._res };
    }
    return res;
  };
  return router;
}
function toNodeListener(app) {
  const toNodeHandle = async function(req, res) {
    const event = createEvent(req, res);
    try {
      await app.handler(event);
    } catch (_error) {
      const error = createError$1(_error);
      if (!isError(_error)) {
        error.unhandled = true;
      }
      setResponseStatus(event, error.statusCode, error.statusMessage);
      if (app.options.onError) {
        await app.options.onError(error, event);
      }
      if (event.handled) {
        return;
      }
      if (error.unhandled || error.fatal) {
        console.error("[h3]", error.fatal ? "[fatal]" : "[unhandled]", error);
      }
      if (app.options.onBeforeResponse && !event._onBeforeResponseCalled) {
        await app.options.onBeforeResponse(event, { body: error });
      }
      await sendError(event, error, !!app.options.debug);
      if (app.options.onAfterResponse && !event._onAfterResponseCalled) {
        await app.options.onAfterResponse(event, { body: error });
      }
    }
  };
  return toNodeHandle;
}

function flatHooks(configHooks, hooks = {}, parentName) {
  for (const key in configHooks) {
    const subHook = configHooks[key];
    const name = parentName ? `${parentName}:${key}` : key;
    if (typeof subHook === "object" && subHook !== null) {
      flatHooks(subHook, hooks, name);
    } else if (typeof subHook === "function") {
      hooks[name] = subHook;
    }
  }
  return hooks;
}
const defaultTask = { run: (function_) => function_() };
const _createTask = () => defaultTask;
const createTask = typeof console.createTask !== "undefined" ? console.createTask : _createTask;
function serialTaskCaller(hooks, args) {
  const name = args.shift();
  const task = createTask(name);
  return hooks.reduce(
    (promise, hookFunction) => promise.then(() => task.run(() => hookFunction(...args))),
    Promise.resolve()
  );
}
function parallelTaskCaller(hooks, args) {
  const name = args.shift();
  const task = createTask(name);
  return Promise.all(hooks.map((hook) => task.run(() => hook(...args))));
}
function callEachWith(callbacks, arg0) {
  for (const callback of [...callbacks]) {
    callback(arg0);
  }
}

class Hookable {
  constructor() {
    this._hooks = {};
    this._before = void 0;
    this._after = void 0;
    this._deprecatedMessages = void 0;
    this._deprecatedHooks = {};
    this.hook = this.hook.bind(this);
    this.callHook = this.callHook.bind(this);
    this.callHookWith = this.callHookWith.bind(this);
  }
  hook(name, function_, options = {}) {
    if (!name || typeof function_ !== "function") {
      return () => {
      };
    }
    const originalName = name;
    let dep;
    while (this._deprecatedHooks[name]) {
      dep = this._deprecatedHooks[name];
      name = dep.to;
    }
    if (dep && !options.allowDeprecated) {
      let message = dep.message;
      if (!message) {
        message = `${originalName} hook has been deprecated` + (dep.to ? `, please use ${dep.to}` : "");
      }
      if (!this._deprecatedMessages) {
        this._deprecatedMessages = /* @__PURE__ */ new Set();
      }
      if (!this._deprecatedMessages.has(message)) {
        console.warn(message);
        this._deprecatedMessages.add(message);
      }
    }
    if (!function_.name) {
      try {
        Object.defineProperty(function_, "name", {
          get: () => "_" + name.replace(/\W+/g, "_") + "_hook_cb",
          configurable: true
        });
      } catch {
      }
    }
    this._hooks[name] = this._hooks[name] || [];
    this._hooks[name].push(function_);
    return () => {
      if (function_) {
        this.removeHook(name, function_);
        function_ = void 0;
      }
    };
  }
  hookOnce(name, function_) {
    let _unreg;
    let _function = (...arguments_) => {
      if (typeof _unreg === "function") {
        _unreg();
      }
      _unreg = void 0;
      _function = void 0;
      return function_(...arguments_);
    };
    _unreg = this.hook(name, _function);
    return _unreg;
  }
  removeHook(name, function_) {
    if (this._hooks[name]) {
      const index = this._hooks[name].indexOf(function_);
      if (index !== -1) {
        this._hooks[name].splice(index, 1);
      }
      if (this._hooks[name].length === 0) {
        delete this._hooks[name];
      }
    }
  }
  deprecateHook(name, deprecated) {
    this._deprecatedHooks[name] = typeof deprecated === "string" ? { to: deprecated } : deprecated;
    const _hooks = this._hooks[name] || [];
    delete this._hooks[name];
    for (const hook of _hooks) {
      this.hook(name, hook);
    }
  }
  deprecateHooks(deprecatedHooks) {
    Object.assign(this._deprecatedHooks, deprecatedHooks);
    for (const name in deprecatedHooks) {
      this.deprecateHook(name, deprecatedHooks[name]);
    }
  }
  addHooks(configHooks) {
    const hooks = flatHooks(configHooks);
    const removeFns = Object.keys(hooks).map(
      (key) => this.hook(key, hooks[key])
    );
    return () => {
      for (const unreg of removeFns.splice(0, removeFns.length)) {
        unreg();
      }
    };
  }
  removeHooks(configHooks) {
    const hooks = flatHooks(configHooks);
    for (const key in hooks) {
      this.removeHook(key, hooks[key]);
    }
  }
  removeAllHooks() {
    for (const key in this._hooks) {
      delete this._hooks[key];
    }
  }
  callHook(name, ...arguments_) {
    arguments_.unshift(name);
    return this.callHookWith(serialTaskCaller, name, ...arguments_);
  }
  callHookParallel(name, ...arguments_) {
    arguments_.unshift(name);
    return this.callHookWith(parallelTaskCaller, name, ...arguments_);
  }
  callHookWith(caller, name, ...arguments_) {
    const event = this._before || this._after ? { name, args: arguments_, context: {} } : void 0;
    if (this._before) {
      callEachWith(this._before, event);
    }
    const result = caller(
      name in this._hooks ? [...this._hooks[name]] : [],
      arguments_
    );
    if (result instanceof Promise) {
      return result.finally(() => {
        if (this._after && event) {
          callEachWith(this._after, event);
        }
      });
    }
    if (this._after && event) {
      callEachWith(this._after, event);
    }
    return result;
  }
  beforeEach(function_) {
    this._before = this._before || [];
    this._before.push(function_);
    return () => {
      if (this._before !== void 0) {
        const index = this._before.indexOf(function_);
        if (index !== -1) {
          this._before.splice(index, 1);
        }
      }
    };
  }
  afterEach(function_) {
    this._after = this._after || [];
    this._after.push(function_);
    return () => {
      if (this._after !== void 0) {
        const index = this._after.indexOf(function_);
        if (index !== -1) {
          this._after.splice(index, 1);
        }
      }
    };
  }
}
function createHooks() {
  return new Hookable();
}

const s=globalThis.Headers,i=globalThis.AbortController,l=globalThis.fetch||(()=>{throw new Error("[node-fetch-native] Failed to fetch: `globalThis.fetch` is not available!")});

class FetchError extends Error {
  constructor(message, opts) {
    super(message, opts);
    this.name = "FetchError";
    if (opts?.cause && !this.cause) {
      this.cause = opts.cause;
    }
  }
}
function createFetchError(ctx) {
  const errorMessage = ctx.error?.message || ctx.error?.toString() || "";
  const method = ctx.request?.method || ctx.options?.method || "GET";
  const url = ctx.request?.url || String(ctx.request) || "/";
  const requestStr = `[${method}] ${JSON.stringify(url)}`;
  const statusStr = ctx.response ? `${ctx.response.status} ${ctx.response.statusText}` : "<no response>";
  const message = `${requestStr}: ${statusStr}${errorMessage ? ` ${errorMessage}` : ""}`;
  const fetchError = new FetchError(
    message,
    ctx.error ? { cause: ctx.error } : void 0
  );
  for (const key of ["request", "options", "response"]) {
    Object.defineProperty(fetchError, key, {
      get() {
        return ctx[key];
      }
    });
  }
  for (const [key, refKey] of [
    ["data", "_data"],
    ["status", "status"],
    ["statusCode", "status"],
    ["statusText", "statusText"],
    ["statusMessage", "statusText"]
  ]) {
    Object.defineProperty(fetchError, key, {
      get() {
        return ctx.response && ctx.response[refKey];
      }
    });
  }
  return fetchError;
}

const payloadMethods = new Set(
  Object.freeze(["PATCH", "POST", "PUT", "DELETE"])
);
function isPayloadMethod(method = "GET") {
  return payloadMethods.has(method.toUpperCase());
}
function isJSONSerializable(value) {
  if (value === void 0) {
    return false;
  }
  const t = typeof value;
  if (t === "string" || t === "number" || t === "boolean" || t === null) {
    return true;
  }
  if (t !== "object") {
    return false;
  }
  if (Array.isArray(value)) {
    return true;
  }
  if (value.buffer) {
    return false;
  }
  return value.constructor && value.constructor.name === "Object" || typeof value.toJSON === "function";
}
const textTypes = /* @__PURE__ */ new Set([
  "image/svg",
  "application/xml",
  "application/xhtml",
  "application/html"
]);
const JSON_RE = /^application\/(?:[\w!#$%&*.^`~-]*\+)?json(;.+)?$/i;
function detectResponseType(_contentType = "") {
  if (!_contentType) {
    return "json";
  }
  const contentType = _contentType.split(";").shift() || "";
  if (JSON_RE.test(contentType)) {
    return "json";
  }
  if (textTypes.has(contentType) || contentType.startsWith("text/")) {
    return "text";
  }
  return "blob";
}
function resolveFetchOptions(request, input, defaults, Headers) {
  const headers = mergeHeaders(
    input?.headers ?? request?.headers,
    defaults?.headers,
    Headers
  );
  let query;
  if (defaults?.query || defaults?.params || input?.params || input?.query) {
    query = {
      ...defaults?.params,
      ...defaults?.query,
      ...input?.params,
      ...input?.query
    };
  }
  return {
    ...defaults,
    ...input,
    query,
    params: query,
    headers
  };
}
function mergeHeaders(input, defaults, Headers) {
  if (!defaults) {
    return new Headers(input);
  }
  const headers = new Headers(defaults);
  if (input) {
    for (const [key, value] of Symbol.iterator in input || Array.isArray(input) ? input : new Headers(input)) {
      headers.set(key, value);
    }
  }
  return headers;
}
async function callHooks(context, hooks) {
  if (hooks) {
    if (Array.isArray(hooks)) {
      for (const hook of hooks) {
        await hook(context);
      }
    } else {
      await hooks(context);
    }
  }
}

const retryStatusCodes = /* @__PURE__ */ new Set([
  408,
  // Request Timeout
  409,
  // Conflict
  425,
  // Too Early (Experimental)
  429,
  // Too Many Requests
  500,
  // Internal Server Error
  502,
  // Bad Gateway
  503,
  // Service Unavailable
  504
  // Gateway Timeout
]);
const nullBodyResponses$1 = /* @__PURE__ */ new Set([101, 204, 205, 304]);
function createFetch$1(globalOptions = {}) {
  const {
    fetch = globalThis.fetch,
    Headers = globalThis.Headers,
    AbortController = globalThis.AbortController
  } = globalOptions;
  async function onError(context) {
    const isAbort = context.error && context.error.name === "AbortError" && !context.options.timeout || false;
    if (context.options.retry !== false && !isAbort) {
      let retries;
      if (typeof context.options.retry === "number") {
        retries = context.options.retry;
      } else {
        retries = isPayloadMethod(context.options.method) ? 0 : 1;
      }
      const responseCode = context.response && context.response.status || 500;
      if (retries > 0 && (Array.isArray(context.options.retryStatusCodes) ? context.options.retryStatusCodes.includes(responseCode) : retryStatusCodes.has(responseCode))) {
        const retryDelay = typeof context.options.retryDelay === "function" ? context.options.retryDelay(context) : context.options.retryDelay || 0;
        if (retryDelay > 0) {
          await new Promise((resolve) => setTimeout(resolve, retryDelay));
        }
        return $fetchRaw(context.request, {
          ...context.options,
          retry: retries - 1
        });
      }
    }
    const error = createFetchError(context);
    if (Error.captureStackTrace) {
      Error.captureStackTrace(error, $fetchRaw);
    }
    throw error;
  }
  const $fetchRaw = async function $fetchRaw2(_request, _options = {}) {
    const context = {
      request: _request,
      options: resolveFetchOptions(
        _request,
        _options,
        globalOptions.defaults,
        Headers
      ),
      response: void 0,
      error: void 0
    };
    if (context.options.method) {
      context.options.method = context.options.method.toUpperCase();
    }
    if (context.options.onRequest) {
      await callHooks(context, context.options.onRequest);
    }
    if (typeof context.request === "string") {
      if (context.options.baseURL) {
        context.request = withBase(context.request, context.options.baseURL);
      }
      if (context.options.query) {
        context.request = withQuery(context.request, context.options.query);
        delete context.options.query;
      }
      if ("query" in context.options) {
        delete context.options.query;
      }
      if ("params" in context.options) {
        delete context.options.params;
      }
    }
    if (context.options.body && isPayloadMethod(context.options.method)) {
      if (isJSONSerializable(context.options.body)) {
        context.options.body = typeof context.options.body === "string" ? context.options.body : JSON.stringify(context.options.body);
        context.options.headers = new Headers(context.options.headers || {});
        if (!context.options.headers.has("content-type")) {
          context.options.headers.set("content-type", "application/json");
        }
        if (!context.options.headers.has("accept")) {
          context.options.headers.set("accept", "application/json");
        }
      } else if (
        // ReadableStream Body
        "pipeTo" in context.options.body && typeof context.options.body.pipeTo === "function" || // Node.js Stream Body
        typeof context.options.body.pipe === "function"
      ) {
        if (!("duplex" in context.options)) {
          context.options.duplex = "half";
        }
      }
    }
    let abortTimeout;
    if (!context.options.signal && context.options.timeout) {
      const controller = new AbortController();
      abortTimeout = setTimeout(() => {
        const error = new Error(
          "[TimeoutError]: The operation was aborted due to timeout"
        );
        error.name = "TimeoutError";
        error.code = 23;
        controller.abort(error);
      }, context.options.timeout);
      context.options.signal = controller.signal;
    }
    try {
      context.response = await fetch(
        context.request,
        context.options
      );
    } catch (error) {
      context.error = error;
      if (context.options.onRequestError) {
        await callHooks(
          context,
          context.options.onRequestError
        );
      }
      return await onError(context);
    } finally {
      if (abortTimeout) {
        clearTimeout(abortTimeout);
      }
    }
    const hasBody = (context.response.body || // https://github.com/unjs/ofetch/issues/324
    // https://github.com/unjs/ofetch/issues/294
    // https://github.com/JakeChampion/fetch/issues/1454
    context.response._bodyInit) && !nullBodyResponses$1.has(context.response.status) && context.options.method !== "HEAD";
    if (hasBody) {
      const responseType = (context.options.parseResponse ? "json" : context.options.responseType) || detectResponseType(context.response.headers.get("content-type") || "");
      switch (responseType) {
        case "json": {
          const data = await context.response.text();
          const parseFunction = context.options.parseResponse || destr;
          context.response._data = parseFunction(data);
          break;
        }
        case "stream": {
          context.response._data = context.response.body || context.response._bodyInit;
          break;
        }
        default: {
          context.response._data = await context.response[responseType]();
        }
      }
    }
    if (context.options.onResponse) {
      await callHooks(
        context,
        context.options.onResponse
      );
    }
    if (!context.options.ignoreResponseError && context.response.status >= 400 && context.response.status < 600) {
      if (context.options.onResponseError) {
        await callHooks(
          context,
          context.options.onResponseError
        );
      }
      return await onError(context);
    }
    return context.response;
  };
  const $fetch = async function $fetch2(request, options) {
    const r = await $fetchRaw(request, options);
    return r._data;
  };
  $fetch.raw = $fetchRaw;
  $fetch.native = (...args) => fetch(...args);
  $fetch.create = (defaultOptions = {}, customGlobalOptions = {}) => createFetch$1({
    ...globalOptions,
    ...customGlobalOptions,
    defaults: {
      ...globalOptions.defaults,
      ...customGlobalOptions.defaults,
      ...defaultOptions
    }
  });
  return $fetch;
}

function createNodeFetch() {
  const useKeepAlive = JSON.parse(process.env.FETCH_KEEP_ALIVE || "false");
  if (!useKeepAlive) {
    return l;
  }
  const agentOptions = { keepAlive: true };
  const httpAgent = new http.Agent(agentOptions);
  const httpsAgent = new https.Agent(agentOptions);
  const nodeFetchOptions = {
    agent(parsedURL) {
      return parsedURL.protocol === "http:" ? httpAgent : httpsAgent;
    }
  };
  return function nodeFetchWithKeepAlive(input, init) {
    return l(input, { ...nodeFetchOptions, ...init });
  };
}
const fetch = globalThis.fetch ? (...args) => globalThis.fetch(...args) : createNodeFetch();
const Headers$1 = globalThis.Headers || s;
const AbortController = globalThis.AbortController || i;
createFetch$1({ fetch, Headers: Headers$1, AbortController });

function rawHeaders(headers) {
  const rawHeaders2 = [];
  for (const key in headers) {
    if (Array.isArray(headers[key])) {
      for (const h of headers[key]) {
        rawHeaders2.push(key, h);
      }
    } else {
      rawHeaders2.push(key, headers[key]);
    }
  }
  return rawHeaders2;
}
function mergeFns(...functions) {
  return function(...args) {
    for (const fn of functions) {
      fn(...args);
    }
  };
}
function createNotImplementedError(name) {
  throw new Error(`[unenv] ${name} is not implemented yet!`);
}

let defaultMaxListeners = 10;
let EventEmitter$1 = class EventEmitter {
  __unenv__ = true;
  _events = /* @__PURE__ */ Object.create(null);
  _maxListeners;
  static get defaultMaxListeners() {
    return defaultMaxListeners;
  }
  static set defaultMaxListeners(arg) {
    if (typeof arg !== "number" || arg < 0 || Number.isNaN(arg)) {
      throw new RangeError(
        'The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received ' + arg + "."
      );
    }
    defaultMaxListeners = arg;
  }
  setMaxListeners(n) {
    if (typeof n !== "number" || n < 0 || Number.isNaN(n)) {
      throw new RangeError(
        'The value of "n" is out of range. It must be a non-negative number. Received ' + n + "."
      );
    }
    this._maxListeners = n;
    return this;
  }
  getMaxListeners() {
    return _getMaxListeners(this);
  }
  emit(type, ...args) {
    if (!this._events[type] || this._events[type].length === 0) {
      return false;
    }
    if (type === "error") {
      let er;
      if (args.length > 0) {
        er = args[0];
      }
      if (er instanceof Error) {
        throw er;
      }
      const err = new Error(
        "Unhandled error." + (er ? " (" + er.message + ")" : "")
      );
      err.context = er;
      throw err;
    }
    for (const _listener of this._events[type]) {
      (_listener.listener || _listener).apply(this, args);
    }
    return true;
  }
  addListener(type, listener) {
    return _addListener(this, type, listener, false);
  }
  on(type, listener) {
    return _addListener(this, type, listener, false);
  }
  prependListener(type, listener) {
    return _addListener(this, type, listener, true);
  }
  once(type, listener) {
    return this.on(type, _wrapOnce(this, type, listener));
  }
  prependOnceListener(type, listener) {
    return this.prependListener(type, _wrapOnce(this, type, listener));
  }
  removeListener(type, listener) {
    return _removeListener(this, type, listener);
  }
  off(type, listener) {
    return this.removeListener(type, listener);
  }
  removeAllListeners(type) {
    return _removeAllListeners(this, type);
  }
  listeners(type) {
    return _listeners(this, type, true);
  }
  rawListeners(type) {
    return _listeners(this, type, false);
  }
  listenerCount(type) {
    return this.rawListeners(type).length;
  }
  eventNames() {
    return Object.keys(this._events);
  }
};
function _addListener(target, type, listener, prepend) {
  _checkListener(listener);
  if (target._events.newListener !== void 0) {
    target.emit("newListener", type, listener.listener || listener);
  }
  if (!target._events[type]) {
    target._events[type] = [];
  }
  if (prepend) {
    target._events[type].unshift(listener);
  } else {
    target._events[type].push(listener);
  }
  const maxListeners = _getMaxListeners(target);
  if (maxListeners > 0 && target._events[type].length > maxListeners && !target._events[type].warned) {
    target._events[type].warned = true;
    const warning = new Error(
      `[unenv] Possible EventEmitter memory leak detected. ${target._events[type].length} ${type} listeners added. Use emitter.setMaxListeners() to increase limit`
    );
    warning.name = "MaxListenersExceededWarning";
    warning.emitter = target;
    warning.type = type;
    warning.count = target._events[type]?.length;
    console.warn(warning);
  }
  return target;
}
function _removeListener(target, type, listener) {
  _checkListener(listener);
  if (!target._events[type] || target._events[type].length === 0) {
    return target;
  }
  const lenBeforeFilter = target._events[type].length;
  target._events[type] = target._events[type].filter((fn) => fn !== listener);
  if (lenBeforeFilter === target._events[type].length) {
    return target;
  }
  if (target._events.removeListener) {
    target.emit("removeListener", type, listener.listener || listener);
  }
  if (target._events[type].length === 0) {
    delete target._events[type];
  }
  return target;
}
function _removeAllListeners(target, type) {
  if (!target._events[type] || target._events[type].length === 0) {
    return target;
  }
  if (target._events.removeListener) {
    for (const _listener of target._events[type]) {
      target.emit("removeListener", type, _listener.listener || _listener);
    }
  }
  delete target._events[type];
  return target;
}
function _wrapOnce(target, type, listener) {
  let fired = false;
  const wrapper = (...args) => {
    if (fired) {
      return;
    }
    target.removeListener(type, wrapper);
    fired = true;
    return args.length === 0 ? listener.call(target) : listener.apply(target, args);
  };
  wrapper.listener = listener;
  return wrapper;
}
function _getMaxListeners(target) {
  return target._maxListeners ?? EventEmitter$1.defaultMaxListeners;
}
function _listeners(target, type, unwrap) {
  let listeners = target._events[type];
  if (typeof listeners === "function") {
    listeners = [listeners];
  }
  return unwrap ? listeners.map((l) => l.listener || l) : listeners;
}
function _checkListener(listener) {
  if (typeof listener !== "function") {
    throw new TypeError(
      'The "listener" argument must be of type Function. Received type ' + typeof listener
    );
  }
}

const EventEmitter = globalThis.EventEmitter || EventEmitter$1;

class _Readable extends EventEmitter {
  __unenv__ = true;
  readableEncoding = null;
  readableEnded = true;
  readableFlowing = false;
  readableHighWaterMark = 0;
  readableLength = 0;
  readableObjectMode = false;
  readableAborted = false;
  readableDidRead = false;
  closed = false;
  errored = null;
  readable = false;
  destroyed = false;
  static from(_iterable, options) {
    return new _Readable(options);
  }
  constructor(_opts) {
    super();
  }
  _read(_size) {
  }
  read(_size) {
  }
  setEncoding(_encoding) {
    return this;
  }
  pause() {
    return this;
  }
  resume() {
    return this;
  }
  isPaused() {
    return true;
  }
  unpipe(_destination) {
    return this;
  }
  unshift(_chunk, _encoding) {
  }
  wrap(_oldStream) {
    return this;
  }
  push(_chunk, _encoding) {
    return false;
  }
  _destroy(_error, _callback) {
    this.removeAllListeners();
  }
  destroy(error) {
    this.destroyed = true;
    this._destroy(error);
    return this;
  }
  pipe(_destenition, _options) {
    return {};
  }
  compose(stream, options) {
    throw new Error("[unenv] Method not implemented.");
  }
  [Symbol.asyncDispose]() {
    this.destroy();
    return Promise.resolve();
  }
  // eslint-disable-next-line require-yield
  async *[Symbol.asyncIterator]() {
    throw createNotImplementedError("Readable.asyncIterator");
  }
  iterator(options) {
    throw createNotImplementedError("Readable.iterator");
  }
  map(fn, options) {
    throw createNotImplementedError("Readable.map");
  }
  filter(fn, options) {
    throw createNotImplementedError("Readable.filter");
  }
  forEach(fn, options) {
    throw createNotImplementedError("Readable.forEach");
  }
  reduce(fn, initialValue, options) {
    throw createNotImplementedError("Readable.reduce");
  }
  find(fn, options) {
    throw createNotImplementedError("Readable.find");
  }
  findIndex(fn, options) {
    throw createNotImplementedError("Readable.findIndex");
  }
  some(fn, options) {
    throw createNotImplementedError("Readable.some");
  }
  toArray(options) {
    throw createNotImplementedError("Readable.toArray");
  }
  every(fn, options) {
    throw createNotImplementedError("Readable.every");
  }
  flatMap(fn, options) {
    throw createNotImplementedError("Readable.flatMap");
  }
  drop(limit, options) {
    throw createNotImplementedError("Readable.drop");
  }
  take(limit, options) {
    throw createNotImplementedError("Readable.take");
  }
  asIndexedPairs(options) {
    throw createNotImplementedError("Readable.asIndexedPairs");
  }
}
const Readable = globalThis.Readable || _Readable;

class _Writable extends EventEmitter {
  __unenv__ = true;
  writable = true;
  writableEnded = false;
  writableFinished = false;
  writableHighWaterMark = 0;
  writableLength = 0;
  writableObjectMode = false;
  writableCorked = 0;
  closed = false;
  errored = null;
  writableNeedDrain = false;
  destroyed = false;
  _data;
  _encoding = "utf-8";
  constructor(_opts) {
    super();
  }
  pipe(_destenition, _options) {
    return {};
  }
  _write(chunk, encoding, callback) {
    if (this.writableEnded) {
      if (callback) {
        callback();
      }
      return;
    }
    if (this._data === void 0) {
      this._data = chunk;
    } else {
      const a = typeof this._data === "string" ? Buffer.from(this._data, this._encoding || encoding || "utf8") : this._data;
      const b = typeof chunk === "string" ? Buffer.from(chunk, encoding || this._encoding || "utf8") : chunk;
      this._data = Buffer.concat([a, b]);
    }
    this._encoding = encoding;
    if (callback) {
      callback();
    }
  }
  _writev(_chunks, _callback) {
  }
  _destroy(_error, _callback) {
  }
  _final(_callback) {
  }
  write(chunk, arg2, arg3) {
    const encoding = typeof arg2 === "string" ? this._encoding : "utf-8";
    const cb = typeof arg2 === "function" ? arg2 : typeof arg3 === "function" ? arg3 : void 0;
    this._write(chunk, encoding, cb);
    return true;
  }
  setDefaultEncoding(_encoding) {
    return this;
  }
  end(arg1, arg2, arg3) {
    const callback = typeof arg1 === "function" ? arg1 : typeof arg2 === "function" ? arg2 : typeof arg3 === "function" ? arg3 : void 0;
    if (this.writableEnded) {
      if (callback) {
        callback();
      }
      return this;
    }
    const data = arg1 === callback ? void 0 : arg1;
    if (data) {
      const encoding = arg2 === callback ? void 0 : arg2;
      this.write(data, encoding, callback);
    }
    this.writableEnded = true;
    this.writableFinished = true;
    this.emit("close");
    this.emit("finish");
    return this;
  }
  cork() {
  }
  uncork() {
  }
  destroy(_error) {
    this.destroyed = true;
    delete this._data;
    this.removeAllListeners();
    return this;
  }
  compose(stream, options) {
    throw new Error("[h3] Method not implemented.");
  }
}
const Writable = globalThis.Writable || _Writable;

const __Duplex = class {
  allowHalfOpen = true;
  _destroy;
  constructor(readable = new Readable(), writable = new Writable()) {
    Object.assign(this, readable);
    Object.assign(this, writable);
    this._destroy = mergeFns(readable._destroy, writable._destroy);
  }
};
function getDuplex() {
  Object.assign(__Duplex.prototype, Readable.prototype);
  Object.assign(__Duplex.prototype, Writable.prototype);
  return __Duplex;
}
const _Duplex = /* @__PURE__ */ getDuplex();
const Duplex = globalThis.Duplex || _Duplex;

class Socket extends Duplex {
  __unenv__ = true;
  bufferSize = 0;
  bytesRead = 0;
  bytesWritten = 0;
  connecting = false;
  destroyed = false;
  pending = false;
  localAddress = "";
  localPort = 0;
  remoteAddress = "";
  remoteFamily = "";
  remotePort = 0;
  autoSelectFamilyAttemptedAddresses = [];
  readyState = "readOnly";
  constructor(_options) {
    super();
  }
  write(_buffer, _arg1, _arg2) {
    return false;
  }
  connect(_arg1, _arg2, _arg3) {
    return this;
  }
  end(_arg1, _arg2, _arg3) {
    return this;
  }
  setEncoding(_encoding) {
    return this;
  }
  pause() {
    return this;
  }
  resume() {
    return this;
  }
  setTimeout(_timeout, _callback) {
    return this;
  }
  setNoDelay(_noDelay) {
    return this;
  }
  setKeepAlive(_enable, _initialDelay) {
    return this;
  }
  address() {
    return {};
  }
  unref() {
    return this;
  }
  ref() {
    return this;
  }
  destroySoon() {
    this.destroy();
  }
  resetAndDestroy() {
    const err = new Error("ERR_SOCKET_CLOSED");
    err.code = "ERR_SOCKET_CLOSED";
    this.destroy(err);
    return this;
  }
}

class IncomingMessage extends Readable {
  __unenv__ = {};
  aborted = false;
  httpVersion = "1.1";
  httpVersionMajor = 1;
  httpVersionMinor = 1;
  complete = true;
  connection;
  socket;
  headers = {};
  trailers = {};
  method = "GET";
  url = "/";
  statusCode = 200;
  statusMessage = "";
  closed = false;
  errored = null;
  readable = false;
  constructor(socket) {
    super();
    this.socket = this.connection = socket || new Socket();
  }
  get rawHeaders() {
    return rawHeaders(this.headers);
  }
  get rawTrailers() {
    return [];
  }
  setTimeout(_msecs, _callback) {
    return this;
  }
  get headersDistinct() {
    return _distinct(this.headers);
  }
  get trailersDistinct() {
    return _distinct(this.trailers);
  }
}
function _distinct(obj) {
  const d = {};
  for (const [key, value] of Object.entries(obj)) {
    if (key) {
      d[key] = (Array.isArray(value) ? value : [value]).filter(
        Boolean
      );
    }
  }
  return d;
}

class ServerResponse extends Writable {
  __unenv__ = true;
  statusCode = 200;
  statusMessage = "";
  upgrading = false;
  chunkedEncoding = false;
  shouldKeepAlive = false;
  useChunkedEncodingByDefault = false;
  sendDate = false;
  finished = false;
  headersSent = false;
  strictContentLength = false;
  connection = null;
  socket = null;
  req;
  _headers = {};
  constructor(req) {
    super();
    this.req = req;
  }
  assignSocket(socket) {
    socket._httpMessage = this;
    this.socket = socket;
    this.connection = socket;
    this.emit("socket", socket);
    this._flush();
  }
  _flush() {
    this.flushHeaders();
  }
  detachSocket(_socket) {
  }
  writeContinue(_callback) {
  }
  writeHead(statusCode, arg1, arg2) {
    if (statusCode) {
      this.statusCode = statusCode;
    }
    if (typeof arg1 === "string") {
      this.statusMessage = arg1;
      arg1 = void 0;
    }
    const headers = arg2 || arg1;
    if (headers) {
      if (Array.isArray(headers)) ; else {
        for (const key in headers) {
          this.setHeader(key, headers[key]);
        }
      }
    }
    this.headersSent = true;
    return this;
  }
  writeProcessing() {
  }
  setTimeout(_msecs, _callback) {
    return this;
  }
  appendHeader(name, value) {
    name = name.toLowerCase();
    const current = this._headers[name];
    const all = [
      ...Array.isArray(current) ? current : [current],
      ...Array.isArray(value) ? value : [value]
    ].filter(Boolean);
    this._headers[name] = all.length > 1 ? all : all[0];
    return this;
  }
  setHeader(name, value) {
    this._headers[name.toLowerCase()] = value;
    return this;
  }
  getHeader(name) {
    return this._headers[name.toLowerCase()];
  }
  getHeaders() {
    return this._headers;
  }
  getHeaderNames() {
    return Object.keys(this._headers);
  }
  hasHeader(name) {
    return name.toLowerCase() in this._headers;
  }
  removeHeader(name) {
    delete this._headers[name.toLowerCase()];
  }
  addTrailers(_headers) {
  }
  flushHeaders() {
  }
  writeEarlyHints(_headers, cb) {
    if (typeof cb === "function") {
      cb();
    }
  }
}

const nullBodyResponses = /* @__PURE__ */ new Set([101, 204, 205, 304]);
function createCall(handle) {
  return function callHandle(context) {
    const req = new IncomingMessage();
    const res = new ServerResponse(req);
    req.url = context.url || "/";
    req.method = context.method || "GET";
    req.headers = {};
    if (context.headers) {
      const headerEntries = typeof context.headers.entries === "function" ? context.headers.entries() : Object.entries(context.headers);
      for (const [name, value] of headerEntries) {
        if (!value) {
          continue;
        }
        req.headers[name.toLowerCase()] = value;
      }
    }
    req.headers.host = req.headers.host || context.host || "localhost";
    req.connection.encrypted = // @ts-ignore
    req.connection.encrypted || context.protocol === "https";
    req.body = context.body || null;
    req.__unenv__ = context.context;
    return handle(req, res).then(() => {
      let body = res._data;
      if (nullBodyResponses.has(res.statusCode) || req.method.toUpperCase() === "HEAD") {
        body = null;
        delete res._headers["content-length"];
      }
      const r = {
        body,
        headers: res._headers,
        status: res.statusCode,
        statusText: res.statusMessage
      };
      req.destroy();
      res.destroy();
      return r;
    });
  };
}

function createFetch(call, _fetch = global.fetch) {
  return async function ufetch(input, init) {
    const url = input.toString();
    if (!url.startsWith("/")) {
      return _fetch(url, init);
    }
    try {
      const r = await call({ url, ...init });
      return new Response(r.body, {
        status: r.status,
        statusText: r.statusText,
        headers: Object.fromEntries(
          Object.entries(r.headers).map(([name, value]) => [
            name,
            Array.isArray(value) ? value.join(",") : String(value) || ""
          ])
        )
      });
    } catch (error) {
      return new Response(error.toString(), {
        status: Number.parseInt(error.statusCode || error.code) || 500,
        statusText: error.statusText
      });
    }
  };
}

function hasReqHeader(event, name, includes) {
  const value = getRequestHeader(event, name);
  return value && typeof value === "string" && value.toLowerCase().includes(includes);
}
function isJsonRequest(event) {
  if (hasReqHeader(event, "accept", "text/html")) {
    return false;
  }
  return hasReqHeader(event, "accept", "application/json") || hasReqHeader(event, "user-agent", "curl/") || hasReqHeader(event, "user-agent", "httpie/") || hasReqHeader(event, "sec-fetch-mode", "cors") || event.path.startsWith("/api/") || event.path.endsWith(".json");
}
function normalizeError(error, isDev) {
  const cwd = typeof process.cwd === "function" ? process.cwd() : "/";
  const stack = (error.unhandled || error.fatal) ? [] : (error.stack || "").split("\n").splice(1).filter((line) => line.includes("at ")).map((line) => {
    const text = line.replace(cwd + "/", "./").replace("webpack:/", "").replace("file://", "").trim();
    return {
      text,
      internal: line.includes("node_modules") && !line.includes(".cache") || line.includes("internal") || line.includes("new Promise")
    };
  });
  const statusCode = error.statusCode || 500;
  const statusMessage = error.statusMessage ?? (statusCode === 404 ? "Not Found" : "");
  const message = error.unhandled ? "internal server error" : error.message || error.toString();
  return {
    stack,
    statusCode,
    statusMessage,
    message
  };
}
function _captureError(error, type) {
  console.error(`[nitro] [${type}]`, error);
  useNitroApp().captureError(error, { tags: [type] });
}
function trapUnhandledNodeErrors() {
  process.on(
    "unhandledRejection",
    (error) => _captureError(error, "unhandledRejection")
  );
  process.on(
    "uncaughtException",
    (error) => _captureError(error, "uncaughtException")
  );
}
function joinHeaders(value) {
  return Array.isArray(value) ? value.join(", ") : String(value);
}
function normalizeFetchResponse(response) {
  if (!response.headers.has("set-cookie")) {
    return response;
  }
  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers: normalizeCookieHeaders(response.headers)
  });
}
function normalizeCookieHeader(header = "") {
  return splitCookiesString(joinHeaders(header));
}
function normalizeCookieHeaders(headers) {
  const outgoingHeaders = new Headers();
  for (const [name, header] of headers) {
    if (name === "set-cookie") {
      for (const cookie of normalizeCookieHeader(header)) {
        outgoingHeaders.append("set-cookie", cookie);
      }
    } else {
      outgoingHeaders.set(name, joinHeaders(header));
    }
  }
  return outgoingHeaders;
}

const errorHandler = (async function errorhandler(error, event) {
  const { stack, statusCode, statusMessage, message } = normalizeError(error);
  const errorObject = {
    url: event.path,
    statusCode,
    statusMessage,
    message,
    stack: "",
    // TODO: check and validate error.data for serialisation into query
    data: error.data
  };
  if (error.unhandled || error.fatal) {
    const tags = [
      "[nuxt]",
      "[request error]",
      error.unhandled && "[unhandled]",
      error.fatal && "[fatal]",
      Number(errorObject.statusCode) !== 200 && `[${errorObject.statusCode}]`
    ].filter(Boolean).join(" ");
    console.error(tags, (error.message || error.toString() || "internal server error") + "\n" + stack.map((l) => "  " + l.text).join("  \n"));
  }
  if (event.handled) {
    return;
  }
  setResponseStatus(event, errorObject.statusCode !== 200 && errorObject.statusCode || 500, errorObject.statusMessage);
  if (isJsonRequest(event)) {
    setResponseHeader(event, "Content-Type", "application/json");
    return send(event, JSON.stringify(errorObject));
  }
  const reqHeaders = getRequestHeaders(event);
  const isRenderingError = event.path.startsWith("/__nuxt_error") || !!reqHeaders["x-nuxt-error"];
  const res = isRenderingError ? null : await useNitroApp().localFetch(
    withQuery(joinURL(useRuntimeConfig(event).app.baseURL, "/__nuxt_error"), errorObject),
    {
      headers: { ...reqHeaders, "x-nuxt-error": "true" },
      redirect: "manual"
    }
  ).catch(() => null);
  if (!res) {
    const { template } = await import('./error-500.mjs');
    if (event.handled) {
      return;
    }
    setResponseHeader(event, "Content-Type", "text/html;charset=UTF-8");
    return send(event, template(errorObject));
  }
  const html = await res.text();
  if (event.handled) {
    return;
  }
  for (const [header, value] of res.headers.entries()) {
    setResponseHeader(event, header, value);
  }
  setResponseStatus(event, res.status && res.status !== 200 ? res.status : void 0, res.statusText);
  return send(event, html);
});

const plugins = [
  
];

const assets$1 = {
  "/favicon.png": {
    "type": "image/png",
    "etag": "\"3ba-IFBMV2VYH5LJJGab+gJrcj/Xt/w\"",
    "mtime": "2023-03-01T12:15:41.000Z",
    "size": 954,
    "path": "../public/favicon.png"
  },
  "/css/bootstrap.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"15b298-1j9F1w/9jjTvDF4TSUKc712j0BU\"",
    "mtime": "2023-03-01T12:15:37.000Z",
    "size": 1421976,
    "path": "../public/css/bootstrap.css"
  },
  "/css/bootstrap.min.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"2fe74-pZCENryrI2lCkhT2u8ej/2KgK9s\"",
    "mtime": "2023-03-01T12:15:37.000Z",
    "size": 196212,
    "path": "../public/css/bootstrap.min.css"
  },
  "/css/bootstrap.rtl.min.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"2f8f3-6Jmc0jG8PC79Ocdg+AAnOk0KrHU\"",
    "mtime": "2023-03-01T12:15:37.000Z",
    "size": 194803,
    "path": "../public/css/bootstrap.rtl.min.css"
  },
  "/css/demo1.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"18b0a9-ih7GkAVFry+eJOKneFrH/3hYs+U\"",
    "mtime": "2025-02-21T22:28:14.838Z",
    "size": 1618089,
    "path": "../public/css/demo1.css"
  },
  "/css/demo1_dark.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"1a3865-FYuN6k9TLDaxGCoscMo52WK1OgM\"",
    "mtime": "2025-02-21T22:24:38.054Z",
    "size": 1718373,
    "path": "../public/css/demo1_dark.css"
  },
  "/css/demo2.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"1de6fc-iU52FJaGugLaD9HF5zvJe5/YERs\"",
    "mtime": "2025-02-21T22:29:01.412Z",
    "size": 1959676,
    "path": "../public/css/demo2.css"
  },
  "/css/demo2_dark.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"1f078f-Tzm3gaGZ15QaqgaNz16QFI00Ib0\"",
    "mtime": "2023-03-01T12:15:37.000Z",
    "size": 2033551,
    "path": "../public/css/demo2_dark.css"
  },
  "/css/demo3.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"1df6f6-miPbgW48EyclxJ63wog3adjRvno\"",
    "mtime": "2025-02-21T22:30:33.392Z",
    "size": 1963766,
    "path": "../public/css/demo3.css"
  },
  "/css/demo3_dark.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"1f18ec-myPEuDkU0YdJZFnTyv6oV/3WCcA\"",
    "mtime": "2023-03-01T12:15:37.000Z",
    "size": 2037996,
    "path": "../public/css/demo3_dark.css"
  },
  "/css/demo4.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"1e85e5-eY5DHnZl9wxuGcmolMAYYlBFboo\"",
    "mtime": "2025-02-21T22:30:06.751Z",
    "size": 2000357,
    "path": "../public/css/demo4.css"
  },
  "/css/demo4_dark.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"1f8fb7-7tdiNim+U98P9ioiHSRIoPqN/T8\"",
    "mtime": "2023-03-01T12:15:38.000Z",
    "size": 2068407,
    "path": "../public/css/demo4_dark.css"
  },
  "/css/demo5.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"1f02fb-s+zVhtWBUiAWs1/ANMFjglQQxq0\"",
    "mtime": "2025-02-21T22:29:45.541Z",
    "size": 2032379,
    "path": "../public/css/demo5.css"
  },
  "/css/demo5_dark.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"1ff494-0TxnjbkQj7eWz13FNkoqk97tDVE\"",
    "mtime": "2023-03-01T12:15:41.000Z",
    "size": 2094228,
    "path": "../public/css/demo5_dark.css"
  },
  "/css/demo6.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"1f7e04-gacmrVY2bUXTGr9z2InVNH4yFiA\"",
    "mtime": "2025-02-21T22:29:32.431Z",
    "size": 2063876,
    "path": "../public/css/demo6.css"
  },
  "/css/demo6_dark.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"2087ff-yKw7jCna6KtDiOXSMXO0Wf6tQuc\"",
    "mtime": "2023-03-01T12:15:41.000Z",
    "size": 2131967,
    "path": "../public/css/demo6_dark.css"
  },
  "/css/style.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"21-TyLddHGlo+kHZ7xwwvVfOJ1re3c\"",
    "mtime": "2025-02-21T22:21:08.525Z",
    "size": 33,
    "path": "../public/css/style.css"
  },
  "/favicons/1.png": {
    "type": "image/png",
    "etag": "\"47e-A1xsXixhnINRod8Sj+0Iv0gMw4o\"",
    "mtime": "2023-03-01T13:09:03.000Z",
    "size": 1150,
    "path": "../public/favicons/1.png"
  },
  "/favicons/2-144.png": {
    "type": "image/png",
    "etag": "\"af6-SJFPkU4qfl9+6txTjOMwX6ABUFE\"",
    "mtime": "2023-03-01T13:09:03.000Z",
    "size": 2806,
    "path": "../public/favicons/2-144.png"
  },
  "/favicons/2-168.png": {
    "type": "image/png",
    "etag": "\"cf3-SYmma3sCYQckqB9lFxp3rc2CNLI\"",
    "mtime": "2023-03-01T13:09:03.000Z",
    "size": 3315,
    "path": "../public/favicons/2-168.png"
  },
  "/favicons/2-192.png": {
    "type": "image/png",
    "etag": "\"ecb-OfOHTVqYrjJLtNLi5SvIs8ScBlk\"",
    "mtime": "2023-03-01T13:09:03.000Z",
    "size": 3787,
    "path": "../public/favicons/2-192.png"
  },
  "/favicons/2-48.png": {
    "type": "image/png",
    "etag": "\"3ba-IFBMV2VYH5LJJGab+gJrcj/Xt/w\"",
    "mtime": "2023-03-01T13:09:03.000Z",
    "size": 954,
    "path": "../public/favicons/2-48.png"
  },
  "/favicons/2-512.png": {
    "type": "image/png",
    "etag": "\"2aa8-jH09/4/1d5/fIb0C6Gt+XQ5DHiE\"",
    "mtime": "2023-03-01T13:09:03.000Z",
    "size": 10920,
    "path": "../public/favicons/2-512.png"
  },
  "/favicons/2-72.png": {
    "type": "image/png",
    "etag": "\"57f-RMagCDvmGP5LTeGJMX6sxqY8oaQ\"",
    "mtime": "2023-03-01T13:09:03.000Z",
    "size": 1407,
    "path": "../public/favicons/2-72.png"
  },
  "/favicons/2-96.png": {
    "type": "image/png",
    "etag": "\"746-r9KOjJ7WrBKPZuionjH4HJbFtXw\"",
    "mtime": "2023-03-01T13:09:03.000Z",
    "size": 1862,
    "path": "../public/favicons/2-96.png"
  },
  "/favicons/2.png": {
    "type": "image/png",
    "etag": "\"483-Oph2UFnj26v2Tmy+rjKEHFvtzK0\"",
    "mtime": "2023-03-01T13:09:03.000Z",
    "size": 1155,
    "path": "../public/favicons/2.png"
  },
  "/favicons/3.png": {
    "type": "image/png",
    "etag": "\"244-M479W7DEPVDtkb2FgStU6nQzTZM\"",
    "mtime": "2023-03-01T13:09:03.000Z",
    "size": 580,
    "path": "../public/favicons/3.png"
  },
  "/favicons/4.png": {
    "type": "image/png",
    "etag": "\"24e-9mpABmrEBnvqVBwBZsj/6p3e7P8\"",
    "mtime": "2023-03-01T13:09:03.000Z",
    "size": 590,
    "path": "../public/favicons/4.png"
  },
  "/favicons/5.png": {
    "type": "image/png",
    "etag": "\"247-uoL8rmdH1rXkwNI/ITMv9tyBNs8\"",
    "mtime": "2023-03-01T13:09:03.000Z",
    "size": 583,
    "path": "../public/favicons/5.png"
  },
  "/favicons/6.png": {
    "type": "image/png",
    "etag": "\"25b-VsELEseutobBvPgtHhoOQ23gbm8\"",
    "mtime": "2023-03-01T13:09:03.000Z",
    "size": 603,
    "path": "../public/favicons/6.png"
  },
  "/favicons/favicon.png": {
    "type": "image/png",
    "etag": "\"3ba-IFBMV2VYH5LJJGab+gJrcj/Xt/w\"",
    "mtime": "2023-03-01T13:09:03.000Z",
    "size": 954,
    "path": "../public/favicons/favicon.png"
  },
  "/data/footerLinks.json": {
    "type": "application/json",
    "etag": "\"7b1-0nJLxZIGqexCg0sVayDsmAZXAnk\"",
    "mtime": "2023-03-02T06:03:42.000Z",
    "size": 1969,
    "path": "../public/data/footerLinks.json"
  },
  "/const/index.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"34b7-LKL2PQAR7ytteejxePSvKcd+uCE\"",
    "mtime": "2023-03-02T06:03:42.000Z",
    "size": 13495,
    "path": "../public/const/index.js"
  },
  "/images/360-icon.png": {
    "type": "image/png",
    "etag": "\"19b1-ErjIcH4kV6PBwn17T+yNTJSGCXU\"",
    "mtime": "2022-03-29T06:37:23.000Z",
    "size": 6577,
    "path": "../public/images/360-icon.png"
  },
  "/images/ajax-loader.gif": {
    "type": "image/gif",
    "etag": "\"c7f-94K86WQJQP91LxTRj9vFTQGYvRI\"",
    "mtime": "2022-03-29T06:37:23.000Z",
    "size": 3199,
    "path": "../public/images/ajax-loader.gif"
  },
  "/images/check.svg": {
    "type": "image/svg+xml",
    "etag": "\"fe-TvcQyAiK090qpa9QGrD1f4KSoJ0\"",
    "mtime": "2022-03-29T06:37:23.000Z",
    "size": 254,
    "path": "../public/images/check.svg"
  },
  "/images/cookie.png": {
    "type": "image/png",
    "etag": "\"efd-b3y2THajM89nfmP2czfmimpUioI\"",
    "mtime": "2022-03-29T06:37:23.000Z",
    "size": 3837,
    "path": "../public/images/cookie.png"
  },
  "/images/icon-play.png": {
    "type": "image/png",
    "etag": "\"10f-thtNu4D6nFFd68dGdWkiZxYtMxw\"",
    "mtime": "2022-03-29T06:37:23.000Z",
    "size": 271,
    "path": "../public/images/icon-play.png"
  },
  "/images/logo.png": {
    "type": "image/png",
    "etag": "\"3e2-zLQjja1ZM9k5yamfjsGciD8t5tQ\"",
    "mtime": "2022-03-29T06:37:23.000Z",
    "size": 994,
    "path": "../public/images/logo.png"
  },
  "/images/minus.svg": {
    "type": "image/svg+xml",
    "etag": "\"fd-Dz6ElyDqbsHigUYMIQEk2KJmNUE\"",
    "mtime": "2022-03-29T06:37:23.000Z",
    "size": 253,
    "path": "../public/images/minus.svg"
  },
  "/images/newletter-icon.png": {
    "type": "image/png",
    "etag": "\"daa-gTjNSsWTKvhO40mUEKwwF7WpJ+A\"",
    "mtime": "2022-03-29T06:37:23.000Z",
    "size": 3498,
    "path": "../public/images/newletter-icon.png"
  },
  "/images/plus.svg": {
    "type": "image/svg+xml",
    "etag": "\"128-mVeRd4gKhAzNauYmJJmzexQiEAk\"",
    "mtime": "2022-03-29T06:37:23.000Z",
    "size": 296,
    "path": "../public/images/plus.svg"
  },
  "/images/pwa.png": {
    "type": "image/png",
    "etag": "\"17167-aBcClSdKAZPDtWstMj0Yis3xnJI\"",
    "mtime": "2022-03-29T06:37:23.000Z",
    "size": 94567,
    "path": "../public/images/pwa.png"
  },
  "/images/size-chart.jpg": {
    "type": "image/jpeg",
    "etag": "\"7bc2-oA6T57N7FYnZLTUC6b9MEcOB5Wo\"",
    "mtime": "2022-03-29T06:37:23.000Z",
    "size": 31682,
    "path": "../public/images/size-chart.jpg"
  },
  "/images/voxo.png": {
    "type": "image/png",
    "etag": "\"3c929-ybXt9O7y4rp+36zq1g9SSv+3MTM\"",
    "mtime": "2022-03-29T06:37:24.000Z",
    "size": 248105,
    "path": "../public/images/voxo.png"
  },
  "/svg/credit-card.svg": {
    "type": "image/svg+xml",
    "etag": "\"165-Xah/4/1jZK8vpkLTFpS+JgywT7M\"",
    "mtime": "2023-03-01T12:15:43.000Z",
    "size": 357,
    "path": "../public/svg/credit-card.svg"
  },
  "/svg/customer.svg": {
    "type": "image/svg+xml",
    "etag": "\"975-ZATMtjkvr22gkMYOMhnKzm9wJAI\"",
    "mtime": "2023-03-01T12:15:43.000Z",
    "size": 2421,
    "path": "../public/svg/customer.svg"
  },
  "/svg/grid-2.svg": {
    "type": "image/svg+xml",
    "etag": "\"d7-RfgsUtEjxrQruMz4js7u80+dXpQ\"",
    "mtime": "2023-03-01T12:15:43.000Z",
    "size": 215,
    "path": "../public/svg/grid-2.svg"
  },
  "/svg/grid-3.svg": {
    "type": "image/svg+xml",
    "etag": "\"116-KURrbWiiGuAUno7BUQ1x7lPe9es\"",
    "mtime": "2023-03-01T12:15:43.000Z",
    "size": 278,
    "path": "../public/svg/grid-3.svg"
  },
  "/svg/grid-5.svg": {
    "type": "image/svg+xml",
    "etag": "\"190-8U6IQBi07jyFP9zI2jCPlwhn+M4\"",
    "mtime": "2023-03-01T12:15:43.000Z",
    "size": 400,
    "path": "../public/svg/grid-5.svg"
  },
  "/svg/grid.svg": {
    "type": "image/svg+xml",
    "etag": "\"153-fJoZvah5qtuTRUFZPnXucjxGLOQ\"",
    "mtime": "2023-03-01T12:15:43.000Z",
    "size": 339,
    "path": "../public/svg/grid.svg"
  },
  "/svg/icons.svg": {
    "type": "image/svg+xml",
    "etag": "\"1ec9-vo27xx8Yei+SCoKQCSUoDj9j6+c\"",
    "mtime": "2023-03-01T12:15:43.000Z",
    "size": 7881,
    "path": "../public/svg/icons.svg"
  },
  "/svg/list.svg": {
    "type": "image/svg+xml",
    "etag": "\"69f-ceKCu0AZVSikxjFhZ90nQSqtVYQ\"",
    "mtime": "2023-03-01T12:15:43.000Z",
    "size": 1695,
    "path": "../public/svg/list.svg"
  },
  "/_nuxt/-oTPj3Hs.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"2b0-DlwM5NF7EnHkxLdOIpXpdRKB+eA\"",
    "mtime": "2025-03-12T09:58:14.167Z",
    "size": 688,
    "path": "../public/_nuxt/-oTPj3Hs.js"
  },
  "/_nuxt/0nP0Jsik.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"abd-wiw6H4DrGOmVN7rncifBm/Fo2Zc\"",
    "mtime": "2025-03-12T09:58:14.141Z",
    "size": 2749,
    "path": "../public/_nuxt/0nP0Jsik.js"
  },
  "/_nuxt/0Sz5vd9s.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"66a-lywIPUBT2KRmntBckq2ctbs71xM\"",
    "mtime": "2025-03-12T09:58:14.149Z",
    "size": 1642,
    "path": "../public/_nuxt/0Sz5vd9s.js"
  },
  "/_nuxt/1koWxyZB.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"104-fuINuKO9I5u7or2ZZ1f8RU7pf2g\"",
    "mtime": "2025-03-12T09:58:14.150Z",
    "size": 260,
    "path": "../public/_nuxt/1koWxyZB.js"
  },
  "/_nuxt/2fcp77eV.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"5fa-m0jRGkfJVL1aB/2Th/DCk3Feoss\"",
    "mtime": "2025-03-12T09:58:14.158Z",
    "size": 1530,
    "path": "../public/_nuxt/2fcp77eV.js"
  },
  "/_nuxt/4ppzJunR.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"45e-I/h3b8m4DgckOnxEeQBFEPbBCIk\"",
    "mtime": "2025-03-12T09:58:14.158Z",
    "size": 1118,
    "path": "../public/_nuxt/4ppzJunR.js"
  },
  "/_nuxt/7jTQuPRs.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"201-8FBM+hsyfGdiwJQ93IuAFrsql0U\"",
    "mtime": "2025-03-12T09:58:14.146Z",
    "size": 513,
    "path": "../public/_nuxt/7jTQuPRs.js"
  },
  "/_nuxt/B1E4jwQw.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"1616-1yyZizSd9nm6i4IUKADfHC7IWpU\"",
    "mtime": "2025-03-12T09:58:14.162Z",
    "size": 5654,
    "path": "../public/_nuxt/B1E4jwQw.js"
  },
  "/_nuxt/B3arlh24.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"435-awiReOXT1eJ53M3dcsegy/O/hy8\"",
    "mtime": "2025-03-12T09:58:14.159Z",
    "size": 1077,
    "path": "../public/_nuxt/B3arlh24.js"
  },
  "/_nuxt/B53KRfDV.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"30e4-JDT77ubZn3MCuq6vDkh63BVnyJU\"",
    "mtime": "2025-03-12T09:58:14.163Z",
    "size": 12516,
    "path": "../public/_nuxt/B53KRfDV.js"
  },
  "/_nuxt/B5_xqPrG.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"e31-lrRnDP8A8ScEzOA9ZVbha2ClvrM\"",
    "mtime": "2025-03-12T09:58:14.146Z",
    "size": 3633,
    "path": "../public/_nuxt/B5_xqPrG.js"
  },
  "/_nuxt/B6cAnFGm.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"2193-cepLkUfLU2t0T88s1gobYqXt+7o\"",
    "mtime": "2025-03-12T09:58:14.160Z",
    "size": 8595,
    "path": "../public/_nuxt/B6cAnFGm.js"
  },
  "/_nuxt/B8bbKuZA.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"1d057-79Ja0dsOfejut1Om0gIwtIc0KJM\"",
    "mtime": "2025-03-12T09:58:14.149Z",
    "size": 118871,
    "path": "../public/_nuxt/B8bbKuZA.js"
  },
  "/_nuxt/B8vuSSJG.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"2489-/215RTaU/P2b1hSaCIJsM+FYKqY\"",
    "mtime": "2025-03-12T09:58:14.164Z",
    "size": 9353,
    "path": "../public/_nuxt/B8vuSSJG.js"
  },
  "/_nuxt/BA58jgSD.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"18a0-XuDbKtzG1Vb6BLeKtddIf0nVgRo\"",
    "mtime": "2025-03-12T09:58:14.162Z",
    "size": 6304,
    "path": "../public/_nuxt/BA58jgSD.js"
  },
  "/_nuxt/BbPY5Eer.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"a0c-fQ3Q5bJjpJhSOANn8fZdU0hC2mo\"",
    "mtime": "2025-03-12T09:58:14.146Z",
    "size": 2572,
    "path": "../public/_nuxt/BbPY5Eer.js"
  },
  "/_nuxt/BChRJGnH.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"9d-rSgSWNM8NUMHeS5qgj8YZi9tRlo\"",
    "mtime": "2025-03-12T09:58:14.154Z",
    "size": 157,
    "path": "../public/_nuxt/BChRJGnH.js"
  },
  "/_nuxt/BCKidhl8.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"a3efc-cRTDD+IU3+xywc8Ns+nMmGhbWoY\"",
    "mtime": "2025-03-12T09:58:14.139Z",
    "size": 671484,
    "path": "../public/_nuxt/BCKidhl8.js"
  },
  "/_nuxt/BdVqY9zv.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"2614-m9xjar2+Zq53wIcxlZ+lvIOC110\"",
    "mtime": "2025-03-12T09:58:14.164Z",
    "size": 9748,
    "path": "../public/_nuxt/BdVqY9zv.js"
  },
  "/_nuxt/BFZ2o0f2.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"867-YZ5ce0jV8qbALpPuBMyUgkT9VRE\"",
    "mtime": "2025-03-12T09:58:14.140Z",
    "size": 2151,
    "path": "../public/_nuxt/BFZ2o0f2.js"
  },
  "/_nuxt/BI2aU0Mp.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"2d2-cScn9m6ADoBwerrhdgnUXxAyKz8\"",
    "mtime": "2025-03-12T09:58:14.167Z",
    "size": 722,
    "path": "../public/_nuxt/BI2aU0Mp.js"
  },
  "/_nuxt/BiLuQKT8.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"b3f-bdwHjUgoJLF8m1YDfrzeDgA/QlE\"",
    "mtime": "2025-03-12T09:58:14.167Z",
    "size": 2879,
    "path": "../public/_nuxt/BiLuQKT8.js"
  },
  "/_nuxt/BJ7N-ucT.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"2c9-5Sc4MHttWC2OuxXk/F3KaV60mDA\"",
    "mtime": "2025-03-12T09:58:14.167Z",
    "size": 713,
    "path": "../public/_nuxt/BJ7N-ucT.js"
  },
  "/_nuxt/BkWbezfu.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"14cc-3+Qr6L1bJhYp5FtzIpSLd9m+beo\"",
    "mtime": "2025-03-12T09:58:14.144Z",
    "size": 5324,
    "path": "../public/_nuxt/BkWbezfu.js"
  },
  "/_nuxt/BL5IN06U.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"1d56-x0R0xlzq4/HtAB5ZTVkYO2PPfwc\"",
    "mtime": "2025-03-12T09:58:14.149Z",
    "size": 7510,
    "path": "../public/_nuxt/BL5IN06U.js"
  },
  "/_nuxt/BMEp06rB.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"e07-njKmWMyyKbbCgqnXRpwxgb+I5YQ\"",
    "mtime": "2025-03-12T09:58:14.153Z",
    "size": 3591,
    "path": "../public/_nuxt/BMEp06rB.js"
  },
  "/_nuxt/BmNIiv4K.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"dcf-6wmRwzs8y+NVXwoetqdONR5qy4s\"",
    "mtime": "2025-03-12T09:58:14.145Z",
    "size": 3535,
    "path": "../public/_nuxt/BmNIiv4K.js"
  },
  "/_nuxt/Bnq33BYt.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"855-V9MKPmxir4F7GyP1R9f9cllbt5U\"",
    "mtime": "2025-03-12T09:58:14.158Z",
    "size": 2133,
    "path": "../public/_nuxt/Bnq33BYt.js"
  },
  "/_nuxt/BNx30NHC.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"ed6-TgO0k9usAJZiQgJtGc36nhhM+8w\"",
    "mtime": "2025-03-12T09:58:14.150Z",
    "size": 3798,
    "path": "../public/_nuxt/BNx30NHC.js"
  },
  "/_nuxt/BOl73eN-.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"77d-5xLsHif1lEKkovXR+PGYrSBwbDg\"",
    "mtime": "2025-03-12T09:58:14.145Z",
    "size": 1917,
    "path": "../public/_nuxt/BOl73eN-.js"
  },
  "/_nuxt/BONtQfND.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"d3c-nx6LgSBIDXWa2/0IoRFwc8194sc\"",
    "mtime": "2025-03-12T09:58:14.139Z",
    "size": 3388,
    "path": "../public/_nuxt/BONtQfND.js"
  },
  "/_nuxt/BP-jgOIv.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"db9-Gnqw/AOeGnFSAGLti6hfnImx8vs\"",
    "mtime": "2025-03-12T09:58:14.162Z",
    "size": 3513,
    "path": "../public/_nuxt/BP-jgOIv.js"
  },
  "/_nuxt/BQxV9Dio.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"bd6-NM/J3BvQeXV3iniy+L1Rba2iYa8\"",
    "mtime": "2025-03-12T09:58:14.162Z",
    "size": 3030,
    "path": "../public/_nuxt/BQxV9Dio.js"
  },
  "/_nuxt/BSj34--q.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"3e7-2m6b6O6DaTOdQJQRD5NS2Qh+pro\"",
    "mtime": "2025-03-12T09:58:14.150Z",
    "size": 999,
    "path": "../public/_nuxt/BSj34--q.js"
  },
  "/_nuxt/BuG_2jVg.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"70e-t4aNFPsDimnc3nWYkQFMaxx78HQ\"",
    "mtime": "2025-03-12T09:58:14.145Z",
    "size": 1806,
    "path": "../public/_nuxt/BuG_2jVg.js"
  },
  "/_nuxt/BVzSXd_P.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"550b-p+RyCr6DunM51hx1ErL39lKMjYw\"",
    "mtime": "2025-03-12T09:58:14.162Z",
    "size": 21771,
    "path": "../public/_nuxt/BVzSXd_P.js"
  },
  "/_nuxt/BWMdHuqS.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"28c-Rta5FYMkHzmyEiJgLz9jVepqVmM\"",
    "mtime": "2025-03-12T09:58:14.165Z",
    "size": 652,
    "path": "../public/_nuxt/BWMdHuqS.js"
  },
  "/_nuxt/BXg2vM6b.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"c26-o6xdQ5Lvykg0th6QG7zVoINf3q8\"",
    "mtime": "2025-03-12T09:58:14.157Z",
    "size": 3110,
    "path": "../public/_nuxt/BXg2vM6b.js"
  },
  "/_nuxt/BxNjlww3.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"93e-JBteEmIkoDCYH1LWfBoNbS2MAvM\"",
    "mtime": "2025-03-12T09:58:14.168Z",
    "size": 2366,
    "path": "../public/_nuxt/BxNjlww3.js"
  },
  "/_nuxt/BZfSfDsw.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"94f-b25IQgyFemIptOr3MSoZhunRqj4\"",
    "mtime": "2025-03-12T09:58:14.154Z",
    "size": 2383,
    "path": "../public/_nuxt/BZfSfDsw.js"
  },
  "/_nuxt/C-C6k8jp.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"c4d-DeE+Z7nK/MIJnMOzDlPngyse0/8\"",
    "mtime": "2025-03-12T09:58:14.154Z",
    "size": 3149,
    "path": "../public/_nuxt/C-C6k8jp.js"
  },
  "/_nuxt/C1RbuLtU.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"3e9-eJYZBb14GsWHnuPkC+e4LiYhRpc\"",
    "mtime": "2025-03-12T09:58:14.153Z",
    "size": 1001,
    "path": "../public/_nuxt/C1RbuLtU.js"
  },
  "/_nuxt/C45Jg4sW.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"1274-eAtm4Oth1BMJeOWaBwShXZCa0LM\"",
    "mtime": "2025-03-12T09:58:14.144Z",
    "size": 4724,
    "path": "../public/_nuxt/C45Jg4sW.js"
  },
  "/_nuxt/C6CB9uZS.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"3c3e-ck9m03U1YB66D33nwWKljDACcF8\"",
    "mtime": "2025-03-12T09:58:14.150Z",
    "size": 15422,
    "path": "../public/_nuxt/C6CB9uZS.js"
  },
  "/_nuxt/C6Pi20VM.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"abd-wiw6H4DrGOmVN7rncifBm/Fo2Zc\"",
    "mtime": "2025-03-12T09:58:14.140Z",
    "size": 2749,
    "path": "../public/_nuxt/C6Pi20VM.js"
  },
  "/_nuxt/C7LuTx8_.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"27b-jo4Lfirm5h7qcIPoaW3M9ZyC1Nc\"",
    "mtime": "2025-03-12T09:58:14.167Z",
    "size": 635,
    "path": "../public/_nuxt/C7LuTx8_.js"
  },
  "/_nuxt/CAB1MLoe.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"d1f-C2VxK9THTrxyJxBaGgOzZpszpMw\"",
    "mtime": "2025-03-12T09:58:14.140Z",
    "size": 3359,
    "path": "../public/_nuxt/CAB1MLoe.js"
  },
  "/_nuxt/CDuhs2Av.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"9da-eVXwZM6grPDNX6hr/FHlHxBUYV0\"",
    "mtime": "2025-03-12T09:58:14.162Z",
    "size": 2522,
    "path": "../public/_nuxt/CDuhs2Av.js"
  },
  "/_nuxt/CetCXnYv.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"2e4-xe06h3doQtqloMUHeR4hLQVpFgs\"",
    "mtime": "2025-03-12T09:58:14.167Z",
    "size": 740,
    "path": "../public/_nuxt/CetCXnYv.js"
  },
  "/_nuxt/Cez7fol2.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"135dd-t6T5q/rqmU5oq9FSiHIgpuUpuug\"",
    "mtime": "2025-03-12T09:58:14.144Z",
    "size": 79325,
    "path": "../public/_nuxt/Cez7fol2.js"
  },
  "/_nuxt/CF5eaEXg.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"e5e-g03E7Jjhm5lpuvDAeyvM/PUv0VM\"",
    "mtime": "2025-03-12T09:58:14.145Z",
    "size": 3678,
    "path": "../public/_nuxt/CF5eaEXg.js"
  },
  "/_nuxt/CfS2LqW4.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"a8b-YdMnlJ0MpK+E4GxzuL6g8O2HMWY\"",
    "mtime": "2025-03-12T09:58:14.140Z",
    "size": 2699,
    "path": "../public/_nuxt/CfS2LqW4.js"
  },
  "/_nuxt/Cj2dAKbn.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"1858-dUd9H+KeboYndYqjTmTtNaLGBME\"",
    "mtime": "2025-03-12T09:58:14.163Z",
    "size": 6232,
    "path": "../public/_nuxt/Cj2dAKbn.js"
  },
  "/_nuxt/CjIugQOj.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"427-J+jVXehxWfUBEA0ZqFxnlC2rdFA\"",
    "mtime": "2025-03-12T09:58:14.168Z",
    "size": 1063,
    "path": "../public/_nuxt/CjIugQOj.js"
  },
  "/_nuxt/Ck8nP8qJ.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"64-V707cTPthOSnUgQO/3SQUR5+ug4\"",
    "mtime": "2025-03-12T09:58:14.157Z",
    "size": 100,
    "path": "../public/_nuxt/Ck8nP8qJ.js"
  },
  "/_nuxt/CM3Mthvh.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"600-cgyn14UcJivzRq3ewPYia3t59Qw\"",
    "mtime": "2025-03-12T09:58:14.141Z",
    "size": 1536,
    "path": "../public/_nuxt/CM3Mthvh.js"
  },
  "/_nuxt/CMdg63J1.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"d92-5wMK0t405ya7uQIIK9KtH/dLlO0\"",
    "mtime": "2025-03-12T09:58:14.140Z",
    "size": 3474,
    "path": "../public/_nuxt/CMdg63J1.js"
  },
  "/_nuxt/CmkFvSRu.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"378-9yD0cSi9HOvqARM9IJwyNBlndu4\"",
    "mtime": "2025-03-12T09:58:14.162Z",
    "size": 888,
    "path": "../public/_nuxt/CmkFvSRu.js"
  },
  "/_nuxt/CnsgDAlj.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"7dd-N4zWvmDNKq+LSO2iCFIlAzfSpYw\"",
    "mtime": "2025-03-12T09:58:14.153Z",
    "size": 2013,
    "path": "../public/_nuxt/CnsgDAlj.js"
  },
  "/_nuxt/comming_soon.BYB4O6Oo.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"d05e-CvcCYxcpvgsHrV50I/Kq55JfEUE\"",
    "mtime": "2025-03-12T09:58:14.132Z",
    "size": 53342,
    "path": "../public/_nuxt/comming_soon.BYB4O6Oo.css"
  },
  "/_nuxt/CsK_Ow4K.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"369-MlLb/5qnT5b8laOrcFruPxcgJ3w\"",
    "mtime": "2025-03-12T09:58:14.149Z",
    "size": 873,
    "path": "../public/_nuxt/CsK_Ow4K.js"
  },
  "/_nuxt/CsUr8uEF.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"1657-PyGUPMQBucjlBZsAVbnj4agV7IE\"",
    "mtime": "2025-03-12T09:58:14.146Z",
    "size": 5719,
    "path": "../public/_nuxt/CsUr8uEF.js"
  },
  "/_nuxt/CT86aIrK.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"abd-wiw6H4DrGOmVN7rncifBm/Fo2Zc\"",
    "mtime": "2025-03-12T09:58:14.141Z",
    "size": 2749,
    "path": "../public/_nuxt/CT86aIrK.js"
  },
  "/_nuxt/Ctan51KP.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"270b-5ltN3MDRlIkWduMtJMmYbgiP5i0\"",
    "mtime": "2025-03-12T09:58:14.164Z",
    "size": 9995,
    "path": "../public/_nuxt/Ctan51KP.js"
  },
  "/_nuxt/CtKfcukS.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"1b61-5PoxSJMo40NV0GGusnBriPLF/Ns\"",
    "mtime": "2025-03-12T09:58:14.141Z",
    "size": 7009,
    "path": "../public/_nuxt/CtKfcukS.js"
  },
  "/_nuxt/CucdHqId.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"16c4-ia+OPa2C7fDDebTObctO4JJ9dBw\"",
    "mtime": "2025-03-12T09:58:14.150Z",
    "size": 5828,
    "path": "../public/_nuxt/CucdHqId.js"
  },
  "/_nuxt/CVryCDUn.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"8b8-+VCPs/D1i5Ew2qTIzlyFxtRxrMQ\"",
    "mtime": "2025-03-12T09:58:14.153Z",
    "size": 2232,
    "path": "../public/_nuxt/CVryCDUn.js"
  },
  "/_nuxt/CWBm-yar.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"15a2-EYDr1nehLQuPFvHkwt8OGNIUk54\"",
    "mtime": "2025-03-12T09:58:14.149Z",
    "size": 5538,
    "path": "../public/_nuxt/CWBm-yar.js"
  },
  "/_nuxt/Cy-qpi73.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"443-xYj1QM60V+8/sdVdKapB8DFj6x0\"",
    "mtime": "2025-03-12T09:58:14.150Z",
    "size": 1091,
    "path": "../public/_nuxt/Cy-qpi73.js"
  },
  "/_nuxt/Cz4_rMBn.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"645a-h8WYhykKbNNbd7r8iLKONXb9uY8\"",
    "mtime": "2025-03-12T09:58:14.139Z",
    "size": 25690,
    "path": "../public/_nuxt/Cz4_rMBn.js"
  },
  "/_nuxt/C_vQX4HT.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"21d6-C5jnacqZfJ8lDNrNmhXNsx4MKcw\"",
    "mtime": "2025-03-12T09:58:14.153Z",
    "size": 8662,
    "path": "../public/_nuxt/C_vQX4HT.js"
  },
  "/_nuxt/D-7HKq_m.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"47c-XWC1cqmaOHiXGl+AYwIOcrwmST4\"",
    "mtime": "2025-03-12T09:58:14.160Z",
    "size": 1148,
    "path": "../public/_nuxt/D-7HKq_m.js"
  },
  "/_nuxt/D1RfBy6t.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"451-Dz8RIcXfEo/f6TzfslIJxJALRN0\"",
    "mtime": "2025-03-12T09:58:14.149Z",
    "size": 1105,
    "path": "../public/_nuxt/D1RfBy6t.js"
  },
  "/_nuxt/D1S-cCVm.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"18c3-7IFJP2J/01ujIyNKjCN78W309RY\"",
    "mtime": "2025-03-12T09:58:14.147Z",
    "size": 6339,
    "path": "../public/_nuxt/D1S-cCVm.js"
  },
  "/_nuxt/D2Wi-i-a.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"8b-mEn0qAMpaOot9hS4kjEt1vwp6Kg\"",
    "mtime": "2025-03-12T09:58:14.145Z",
    "size": 139,
    "path": "../public/_nuxt/D2Wi-i-a.js"
  },
  "/_nuxt/D4Ef_GUA.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"2a6-hISXvetcaraKUN1XnOq4hDQl+08\"",
    "mtime": "2025-03-12T09:58:14.162Z",
    "size": 678,
    "path": "../public/_nuxt/D4Ef_GUA.js"
  },
  "/_nuxt/D5eVovLw.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"3ee6-xgVdPcxvPNWXho6MA6t8nnoKNsE\"",
    "mtime": "2025-03-12T09:58:14.163Z",
    "size": 16102,
    "path": "../public/_nuxt/D5eVovLw.js"
  },
  "/_nuxt/D6N3SPFj.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"d2b-ave34HHA1MkunBwd2ZxjOrMAL3o\"",
    "mtime": "2025-03-12T09:58:14.154Z",
    "size": 3371,
    "path": "../public/_nuxt/D6N3SPFj.js"
  },
  "/_nuxt/D9HjwuRb.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"c2c-1zGSoXb3GDTBjXGZ5Z+Dsvbda50\"",
    "mtime": "2025-03-12T09:58:14.157Z",
    "size": 3116,
    "path": "../public/_nuxt/D9HjwuRb.js"
  },
  "/_nuxt/D9M9GpXW.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"6f6-sO0E2WUKkPtzi2w9ujz53IcGcmA\"",
    "mtime": "2025-03-12T09:58:14.157Z",
    "size": 1782,
    "path": "../public/_nuxt/D9M9GpXW.js"
  },
  "/_nuxt/DB-tzbwg.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"59f-jgVKmeTp0wHbuVJoZxSX/Qft+2Q\"",
    "mtime": "2025-03-12T09:58:14.155Z",
    "size": 1439,
    "path": "../public/_nuxt/DB-tzbwg.js"
  },
  "/_nuxt/DDnXGUlE.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"5b0-qiO5eeIZgAUQtl+yvUKsK6tzwSk\"",
    "mtime": "2025-03-12T09:58:14.145Z",
    "size": 1456,
    "path": "../public/_nuxt/DDnXGUlE.js"
  },
  "/_nuxt/DDyXF4lH.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"8b02-2AIdX103W6W7hY1abh8At3NcEig\"",
    "mtime": "2025-03-12T09:58:14.153Z",
    "size": 35586,
    "path": "../public/_nuxt/DDyXF4lH.js"
  },
  "/_nuxt/DF4t5vOi.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"15ac-CpRpaq4Yl4C3wEFtDkUiUXfXwP4\"",
    "mtime": "2025-03-12T09:58:14.140Z",
    "size": 5548,
    "path": "../public/_nuxt/DF4t5vOi.js"
  },
  "/_nuxt/DFbuI3dd.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"594b-DMgh/3T+f6EhdQh0XerhyFyUAMc\"",
    "mtime": "2025-03-12T09:58:14.144Z",
    "size": 22859,
    "path": "../public/_nuxt/DFbuI3dd.js"
  },
  "/_nuxt/DFmPV37T.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"47c-wBlOjhEHCRb+jvqUGKFQGgVYXX4\"",
    "mtime": "2025-03-12T09:58:14.150Z",
    "size": 1148,
    "path": "../public/_nuxt/DFmPV37T.js"
  },
  "/_nuxt/DFsrMpEb.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"38c8-HfI+IF9xKnYoMe6tac6PFkceVK4\"",
    "mtime": "2025-03-12T09:58:14.158Z",
    "size": 14536,
    "path": "../public/_nuxt/DFsrMpEb.js"
  },
  "/_nuxt/Dg_YXS9f.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"b97-alYULqWTzs043zHjucpUTWRERms\"",
    "mtime": "2025-03-12T09:58:14.168Z",
    "size": 2967,
    "path": "../public/_nuxt/Dg_YXS9f.js"
  },
  "/_nuxt/DHyZbirp.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"e5b-CZOSs8bivz9ZGu7ASn+lELpBGhQ\"",
    "mtime": "2025-03-12T09:58:14.153Z",
    "size": 3675,
    "path": "../public/_nuxt/DHyZbirp.js"
  },
  "/_nuxt/DjZ-niDK.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"5644-RTzdA+s5qCCYXKa9CycssjB7QiA\"",
    "mtime": "2025-03-12T09:58:14.167Z",
    "size": 22084,
    "path": "../public/_nuxt/DjZ-niDK.js"
  },
  "/_nuxt/DkijlSeB.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"3a1-TfEwMtzNjcEhFDBsnLiB1dI9QNo\"",
    "mtime": "2025-03-12T09:58:14.159Z",
    "size": 929,
    "path": "../public/_nuxt/DkijlSeB.js"
  },
  "/_nuxt/DkOD4o7X.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"2d8-uJmXk8tr3Qkt32OWEgbWkjBK43U\"",
    "mtime": "2025-03-12T09:58:14.167Z",
    "size": 728,
    "path": "../public/_nuxt/DkOD4o7X.js"
  },
  "/_nuxt/Dl3ytYK-.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"b3a-ScnTKfopeIYlE8qG29AbjULV89M\"",
    "mtime": "2025-03-12T09:58:14.168Z",
    "size": 2874,
    "path": "../public/_nuxt/Dl3ytYK-.js"
  },
  "/_nuxt/DLa0S3h2.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"99d-a7XF5apcuQtLbMAPK5AiqTfnORI\"",
    "mtime": "2025-03-12T09:58:14.162Z",
    "size": 2461,
    "path": "../public/_nuxt/DLa0S3h2.js"
  },
  "/_nuxt/DlA8Kyh5.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"d6d-4NwHtP8nDZow2YiOG15GR4eKrf8\"",
    "mtime": "2025-03-12T09:58:14.168Z",
    "size": 3437,
    "path": "../public/_nuxt/DlA8Kyh5.js"
  },
  "/_nuxt/DLh0jc3r.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"57f9-yW3a3vfcTfParqwyppu+ccUBOQ4\"",
    "mtime": "2025-03-12T09:58:14.145Z",
    "size": 22521,
    "path": "../public/_nuxt/DLh0jc3r.js"
  },
  "/_nuxt/DM3LFi26.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"c9a-H2gN+ktiPgCgxn+ujOPA/oKrcaM\"",
    "mtime": "2025-03-12T09:58:14.149Z",
    "size": 3226,
    "path": "../public/_nuxt/DM3LFi26.js"
  },
  "/_nuxt/DmWgZK4b.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"76b-FH/z70mOw51GrBgNePiMxhYsuJ8\"",
    "mtime": "2025-03-12T09:58:14.158Z",
    "size": 1899,
    "path": "../public/_nuxt/DmWgZK4b.js"
  },
  "/_nuxt/DonYAvhd.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"1fe0-MhrQlPjyi+AA1Xm+fwQmWi3RIIQ\"",
    "mtime": "2025-03-12T09:58:14.164Z",
    "size": 8160,
    "path": "../public/_nuxt/DonYAvhd.js"
  },
  "/_nuxt/DQEDbJEp.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"15aa-oKg0g3+TWI36pPPBeBkREvDtws8\"",
    "mtime": "2025-03-12T09:58:14.159Z",
    "size": 5546,
    "path": "../public/_nuxt/DQEDbJEp.js"
  },
  "/_nuxt/DSn4cwTm.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"7b55-QJxPJ4vLpelcJBbPmdrTCi4Saco\"",
    "mtime": "2025-03-12T09:58:14.140Z",
    "size": 31573,
    "path": "../public/_nuxt/DSn4cwTm.js"
  },
  "/_nuxt/DTrVJwE2.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"1c0f-nLtboekrqbZIQiDhhel07e/Qhkc\"",
    "mtime": "2025-03-12T09:58:14.155Z",
    "size": 7183,
    "path": "../public/_nuxt/DTrVJwE2.js"
  },
  "/_nuxt/Dtz17-Mg.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"60c-8ITRo5c+EiHdNnxe7+f9P0Ok8Cg\"",
    "mtime": "2025-03-12T09:58:14.165Z",
    "size": 1548,
    "path": "../public/_nuxt/Dtz17-Mg.js"
  },
  "/_nuxt/DU-MWNdt.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"ea4-HUxNFxCO4+BHbbRcs1gq8892/wY\"",
    "mtime": "2025-03-12T09:58:14.139Z",
    "size": 3748,
    "path": "../public/_nuxt/DU-MWNdt.js"
  },
  "/_nuxt/DU7liZe7.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"41-8r12Jdx8mY2KI11M+fW8+qthpiU\"",
    "mtime": "2025-03-12T09:58:14.153Z",
    "size": 65,
    "path": "../public/_nuxt/DU7liZe7.js"
  },
  "/_nuxt/Dvau8yW8.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"118-I/uLpnNxCSFkNCpQdrmBJTGJ0Us\"",
    "mtime": "2025-03-12T09:58:14.149Z",
    "size": 280,
    "path": "../public/_nuxt/Dvau8yW8.js"
  },
  "/_nuxt/DVfDKF__.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"ff0-WuHkznhWpzfsiubcphnG9PH+VkA\"",
    "mtime": "2025-03-12T09:58:14.140Z",
    "size": 4080,
    "path": "../public/_nuxt/DVfDKF__.js"
  },
  "/_nuxt/DvWCykqZ.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"b89-iyqnioA57qTQlxaNoWH47nqJra0\"",
    "mtime": "2025-03-12T09:58:14.167Z",
    "size": 2953,
    "path": "../public/_nuxt/DvWCykqZ.js"
  },
  "/_nuxt/DYBQKreB.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"1dea-hnwGDlKrrHaBcEQ9ASOzGMahC+M\"",
    "mtime": "2025-03-12T09:58:14.154Z",
    "size": 7658,
    "path": "../public/_nuxt/DYBQKreB.js"
  },
  "/_nuxt/DyKdkqo6.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"1767-iH5nUUXMZq0Q28fz+0DQKhzYksU\"",
    "mtime": "2025-03-12T09:58:14.153Z",
    "size": 5991,
    "path": "../public/_nuxt/DyKdkqo6.js"
  },
  "/_nuxt/DYR2KUfy.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"37c0-ZZjVYe9D7qegh/QuKzESdXDGRKY\"",
    "mtime": "2025-03-12T09:58:14.157Z",
    "size": 14272,
    "path": "../public/_nuxt/DYR2KUfy.js"
  },
  "/_nuxt/D_d2WRb8.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"b8e-BuzOH4B+fVkl10PLrgc8TvYq/0M\"",
    "mtime": "2025-03-12T09:58:14.153Z",
    "size": 2958,
    "path": "../public/_nuxt/D_d2WRb8.js"
  },
  "/_nuxt/effect-fade.DyjU0h27.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"146-vWBtYJWt0XSnbsMkpszSw/h1aDE\"",
    "mtime": "2025-03-12T09:58:14.132Z",
    "size": 326,
    "path": "../public/_nuxt/effect-fade.DyjU0h27.css"
  },
  "/_nuxt/element_categories.vBaJo7VQ.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"2463c-rcJAHzYitdTGboAYl+W9ZGeO55Q\"",
    "mtime": "2025-03-12T09:58:14.133Z",
    "size": 149052,
    "path": "../public/_nuxt/element_categories.vBaJo7VQ.css"
  },
  "/_nuxt/element_collection_banner.cOa1qNQ0.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"18e16-OgNPahqcMETsfXeneboZwnGDEgk\"",
    "mtime": "2025-03-12T09:58:14.134Z",
    "size": 101910,
    "path": "../public/_nuxt/element_collection_banner.cOa1qNQ0.css"
  },
  "/_nuxt/element_deal_banner.BN6Nrq6I.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"244e8-XW1Zan0j1a6V3nhAStsN2hHHY4M\"",
    "mtime": "2025-03-12T09:58:14.134Z",
    "size": 148712,
    "path": "../public/_nuxt/element_deal_banner.BN6Nrq6I.css"
  },
  "/_nuxt/element_header.CxtBsugg.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"19698-p1W2iLXpUFydlNlPwDHQF33DPTU\"",
    "mtime": "2025-03-12T09:58:14.134Z",
    "size": 104088,
    "path": "../public/_nuxt/element_header.CxtBsugg.css"
  },
  "/_nuxt/element_home.Cj8FXww2.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"3bee7-q7XiZFuG6OPwkZ2DiA+IihVaGKM\"",
    "mtime": "2025-03-12T09:58:14.135Z",
    "size": 245479,
    "path": "../public/_nuxt/element_home.Cj8FXww2.css"
  },
  "/_nuxt/EmE-W5lJ.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"8ea8-sjWYPxUXf9sppLcXibblvfnE2Fg\"",
    "mtime": "2025-03-12T09:58:14.151Z",
    "size": 36520,
    "path": "../public/_nuxt/EmE-W5lJ.js"
  },
  "/_nuxt/entry.B5r6XXbs.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"5ffd9-yVC/RmXm2I1Cqb14TbsJg7Lmn3k\"",
    "mtime": "2025-03-12T09:58:14.128Z",
    "size": 393177,
    "path": "../public/_nuxt/entry.B5r6XXbs.css"
  },
  "/_nuxt/error-404.XRqzIcKU.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"de4-gTO9z0P/RUn3/xXblc8+joSVtTw\"",
    "mtime": "2025-03-12T09:58:14.128Z",
    "size": 3556,
    "path": "../public/_nuxt/error-404.XRqzIcKU.css"
  },
  "/_nuxt/error-500.yAViT7NE.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"75c-8I5bb7eK7QMpE2U8P0ujol/H8l8\"",
    "mtime": "2025-03-12T09:58:14.128Z",
    "size": 1884,
    "path": "../public/_nuxt/error-500.yAViT7NE.css"
  },
  "/_nuxt/fa-brands-400.BKbXKK0N.ttf": {
    "type": "font/ttf",
    "etag": "\"1f818-B9Pxf6ht31jIRC7DusvO6Q/kK9w\"",
    "mtime": "2025-03-12T09:58:14.128Z",
    "size": 129048,
    "path": "../public/_nuxt/fa-brands-400.BKbXKK0N.ttf"
  },
  "/_nuxt/fa-brands-400.CuatgLLT.eot": {
    "type": "application/vnd.ms-fontobject",
    "etag": "\"1f948-ytMxc0Lb454zNWljPxwQPh0ThyI\"",
    "mtime": "2025-03-12T09:58:14.124Z",
    "size": 129352,
    "path": "../public/_nuxt/fa-brands-400.CuatgLLT.eot"
  },
  "/_nuxt/fa-brands-400.CvXSnKH_.woff": {
    "type": "font/woff",
    "etag": "\"15538-TLCHA169OvoMWI8SnRVJ5TLAbRg\"",
    "mtime": "2025-03-12T09:58:14.127Z",
    "size": 87352,
    "path": "../public/_nuxt/fa-brands-400.CvXSnKH_.woff"
  },
  "/_nuxt/fa-brands-400.G2bx_Wyq.svg": {
    "type": "image/svg+xml",
    "etag": "\"a8702-0hnNoHatEpuyfNmUKG24/4Fp4zc\"",
    "mtime": "2025-03-12T09:58:14.129Z",
    "size": 689922,
    "path": "../public/_nuxt/fa-brands-400.G2bx_Wyq.svg"
  },
  "/_nuxt/fa-brands-400.gCSK8EOc.woff2": {
    "type": "font/woff2",
    "etag": "\"1230c-pAOvMzfmIH0US5mLnDvtQ5r1Yqk\"",
    "mtime": "2025-03-12T09:58:14.127Z",
    "size": 74508,
    "path": "../public/_nuxt/fa-brands-400.gCSK8EOc.woff2"
  },
  "/_nuxt/fa-regular-400.CeZAys4y.woff2": {
    "type": "font/woff2",
    "etag": "\"350c-x0QhfKqCsyRc/6JxSq8uyfdJYU0\"",
    "mtime": "2025-03-12T09:58:14.127Z",
    "size": 13580,
    "path": "../public/_nuxt/fa-regular-400.CeZAys4y.woff2"
  },
  "/_nuxt/fa-regular-400.CRlP6IEk.woff": {
    "type": "font/woff",
    "etag": "\"41a4-godbPjH0oqi57U5LOD5hzjc3Jn8\"",
    "mtime": "2025-03-12T09:58:14.128Z",
    "size": 16804,
    "path": "../public/_nuxt/fa-regular-400.CRlP6IEk.woff"
  },
  "/_nuxt/fa-regular-400.DbvZ_vSH.ttf": {
    "type": "font/ttf",
    "etag": "\"852c-KDP0hsmANCdqjPZj9jm9mF82C9A\"",
    "mtime": "2025-03-12T09:58:14.128Z",
    "size": 34092,
    "path": "../public/_nuxt/fa-regular-400.DbvZ_vSH.ttf"
  },
  "/_nuxt/fa-regular-400.DCEQL6pf.svg": {
    "type": "image/svg+xml",
    "etag": "\"23443-c5B69FGc2LHH8xo3Y0nIzt0UXMY\"",
    "mtime": "2025-03-12T09:58:14.128Z",
    "size": 144451,
    "path": "../public/_nuxt/fa-regular-400.DCEQL6pf.svg"
  },
  "/_nuxt/fa-regular-400.DfibE8Hl.eot": {
    "type": "application/vnd.ms-fontobject",
    "etag": "\"8654-OLBdqwMqFO2QTDaHd5W+l0F8s88\"",
    "mtime": "2025-03-12T09:58:14.127Z",
    "size": 34388,
    "path": "../public/_nuxt/fa-regular-400.DfibE8Hl.eot"
  },
  "/_nuxt/fa-solid-900.B5wk1sYN.woff2": {
    "type": "font/woff2",
    "etag": "\"126b0-B77RU9R/kSmpRO5U3XKVLe7QdMg\"",
    "mtime": "2025-03-12T09:58:14.128Z",
    "size": 75440,
    "path": "../public/_nuxt/fa-solid-900.B5wk1sYN.woff2"
  },
  "/_nuxt/fa-solid-900.BLPEd_vn.svg": {
    "type": "image/svg+xml",
    "etag": "\"ccedc-rdGvDObRChA8Q0tO2qbAesquo7w\"",
    "mtime": "2025-03-12T09:58:14.129Z",
    "size": 839388,
    "path": "../public/_nuxt/fa-solid-900.BLPEd_vn.svg"
  },
  "/_nuxt/fa-solid-900.DRjTsAeK.ttf": {
    "type": "font/ttf",
    "etag": "\"2ed58-t/co7Fke2d2QKO0962pTbQA4yNY\"",
    "mtime": "2025-03-12T09:58:14.128Z",
    "size": 191832,
    "path": "../public/_nuxt/fa-solid-900.DRjTsAeK.ttf"
  },
  "/_nuxt/fa-solid-900.DvRAW_bk.woff": {
    "type": "font/woff",
    "etag": "\"17ee4-D2/L9H3tGhxqzg9nOD1RK2oFPa0\"",
    "mtime": "2025-03-12T09:58:14.128Z",
    "size": 98020,
    "path": "../public/_nuxt/fa-solid-900.DvRAW_bk.woff"
  },
  "/_nuxt/fa-solid-900.DxSXXLgP.eot": {
    "type": "application/vnd.ms-fontobject",
    "etag": "\"2ee74-rO5PHjYcz5lRIfOBuVQktuxrKcA\"",
    "mtime": "2025-03-12T09:58:14.127Z",
    "size": 192116,
    "path": "../public/_nuxt/fa-solid-900.DxSXXLgP.eot"
  },
  "/_nuxt/FJEW03B6.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"15e9-gg2t5R6hK+choP6FyVGyNlJhyyc\"",
    "mtime": "2025-03-12T09:58:14.149Z",
    "size": 5609,
    "path": "../public/_nuxt/FJEW03B6.js"
  },
  "/_nuxt/fXFjbv9O.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"da5-8DTCW8mhNBypHehIGu0Ibe5dGnk\"",
    "mtime": "2025-03-12T09:58:14.154Z",
    "size": 3493,
    "path": "../public/_nuxt/fXFjbv9O.js"
  },
  "/_nuxt/fXKV8mkW.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"17c9-VCcIn8Vl7ZtpgRpXGVm6tWt1D+Y\"",
    "mtime": "2025-03-12T09:58:14.145Z",
    "size": 6089,
    "path": "../public/_nuxt/fXKV8mkW.js"
  },
  "/_nuxt/gdl2Rddu.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"4b1e-zDcBjgMS6ZWKZPHvGzz282J/l/M\"",
    "mtime": "2025-03-12T09:58:14.167Z",
    "size": 19230,
    "path": "../public/_nuxt/gdl2Rddu.js"
  },
  "/_nuxt/gjqOL-gs.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"13f5-U1F9OofX+4XV+VNtbssPjLWNQck\"",
    "mtime": "2025-03-12T09:58:14.159Z",
    "size": 5109,
    "path": "../public/_nuxt/gjqOL-gs.js"
  },
  "/_nuxt/hz7fNtiI.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"2c91-2jqFrF4bn5QptutTzI4rBC5lnU0\"",
    "mtime": "2025-03-12T09:58:14.140Z",
    "size": 11409,
    "path": "../public/_nuxt/hz7fNtiI.js"
  },
  "/_nuxt/i8ztro2m.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"2a2-KtTH3c8sbYS6uf6fBJPLc6L9Y2k\"",
    "mtime": "2025-03-12T09:58:14.167Z",
    "size": 674,
    "path": "../public/_nuxt/i8ztro2m.js"
  },
  "/_nuxt/icons.sJfS1raL.svg": {
    "type": "image/svg+xml",
    "etag": "\"1ec9-vo27xx8Yei+SCoKQCSUoDj9j6+c\"",
    "mtime": "2025-03-12T09:58:14.128Z",
    "size": 7881,
    "path": "../public/_nuxt/icons.sJfS1raL.svg"
  },
  "/_nuxt/index.CPVw5I3v.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"2213b-4jMyc1LwaNKhtggFX2HnawUJjsQ\"",
    "mtime": "2025-03-12T09:58:14.130Z",
    "size": 139579,
    "path": "../public/_nuxt/index.CPVw5I3v.css"
  },
  "/_nuxt/index.CVr1rcWy.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"d3e0-vOtb8MQW4fKwiSOUeqOLUyrIkOw\"",
    "mtime": "2025-03-12T09:58:14.133Z",
    "size": 54240,
    "path": "../public/_nuxt/index.CVr1rcWy.css"
  },
  "/_nuxt/index.DSai1MGl.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"14b-7rtawjQHkjjDv+RmKdJjivsvVT8\"",
    "mtime": "2025-03-12T09:58:14.132Z",
    "size": 331,
    "path": "../public/_nuxt/index.DSai1MGl.css"
  },
  "/_nuxt/index.Dvld92Zo.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"28-Jx1W7EJHBlohJ5hkREEHXHsNxxg\"",
    "mtime": "2025-03-12T09:58:14.133Z",
    "size": 40,
    "path": "../public/_nuxt/index.Dvld92Zo.css"
  },
  "/_nuxt/index.I5l-MzcG.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"102a0-qIQGJORGNkJn+Oix82AOi/Nypmg\"",
    "mtime": "2025-03-12T09:58:14.137Z",
    "size": 66208,
    "path": "../public/_nuxt/index.I5l-MzcG.css"
  },
  "/_nuxt/ipad.Bosl_EbW.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"47-rNtXXO8rEKIN73y4D75OSdSrz/o\"",
    "mtime": "2025-03-12T09:58:14.128Z",
    "size": 71,
    "path": "../public/_nuxt/ipad.Bosl_EbW.css"
  },
  "/_nuxt/jwRbRWa8.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"3e4-zOu8inDr/Zh0+OWuezB9KXLZb0w\"",
    "mtime": "2025-03-12T09:58:14.150Z",
    "size": 996,
    "path": "../public/_nuxt/jwRbRWa8.js"
  },
  "/_nuxt/MmeYmtL7.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"ebb-WnCg1r6FvK5Acv6yt2DB9Ch/Wx0\"",
    "mtime": "2025-03-12T09:58:14.145Z",
    "size": 3771,
    "path": "../public/_nuxt/MmeYmtL7.js"
  },
  "/_nuxt/MoqrdlUm.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"2279-NA7zhOyhC3x2K5Xcbs6HR0L4IDo\"",
    "mtime": "2025-03-12T09:58:14.149Z",
    "size": 8825,
    "path": "../public/_nuxt/MoqrdlUm.js"
  },
  "/_nuxt/MTPl6rY2.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"2be-svdLtkOqsMdLA0oxXBWBKKtsgYk\"",
    "mtime": "2025-03-12T09:58:14.157Z",
    "size": 702,
    "path": "../public/_nuxt/MTPl6rY2.js"
  },
  "/_nuxt/navigation.CkiPtpbM.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"57f-krG2giLwQUb53eeCP7SeGNaAsYA\"",
    "mtime": "2025-03-12T09:58:14.133Z",
    "size": 1407,
    "path": "../public/_nuxt/navigation.CkiPtpbM.css"
  },
  "/_nuxt/ng643Lvd.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"2013-KDjMlExttY+1olaSrgwLNfQoVLA\"",
    "mtime": "2025-03-12T09:58:14.157Z",
    "size": 8211,
    "path": "../public/_nuxt/ng643Lvd.js"
  },
  "/_nuxt/NzzkKtvw.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"65-gRTD/EK3brzssj8IQilUM9MgXLw\"",
    "mtime": "2025-03-12T09:58:14.150Z",
    "size": 101,
    "path": "../public/_nuxt/NzzkKtvw.js"
  },
  "/_nuxt/options1.DhlmRU39.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"a82-vMoKPB6geQnVNO1tF/2IpTbk8w0\"",
    "mtime": "2025-03-12T09:58:14.132Z",
    "size": 2690,
    "path": "../public/_nuxt/options1.DhlmRU39.css"
  },
  "/_nuxt/pagination.CyGEN_sX.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"1478-86ftHZywZKxV6K+dPS2ZS6T5KiM\"",
    "mtime": "2025-03-12T09:58:14.132Z",
    "size": 5240,
    "path": "../public/_nuxt/pagination.CyGEN_sX.css"
  },
  "/_nuxt/peFNys8Z.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"1869-qVh6TXxDnsOeYgvbEn+1gSxcz8o\"",
    "mtime": "2025-03-12T09:58:14.157Z",
    "size": 6249,
    "path": "../public/_nuxt/peFNys8Z.js"
  },
  "/_nuxt/pNpE0Op4.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"1cc5-AvOigPafykc7G1IFUC4PBR4ifdk\"",
    "mtime": "2025-03-12T09:58:14.142Z",
    "size": 7365,
    "path": "../public/_nuxt/pNpE0Op4.js"
  },
  "/_nuxt/productSection.Bf47mqrf.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"d0fe-T4oSPL0TRBrcphPXJW9T5IHkx70\"",
    "mtime": "2025-03-12T09:58:14.132Z",
    "size": 53502,
    "path": "../public/_nuxt/productSection.Bf47mqrf.css"
  },
  "/_nuxt/productSlider.CgmyUnJI.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"112-KescL/nmzims7YyhYqd3u5tDXc4\"",
    "mtime": "2025-03-12T09:58:14.131Z",
    "size": 274,
    "path": "../public/_nuxt/productSlider.CgmyUnJI.css"
  },
  "/_nuxt/qHxjPx1y.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"d57-ACppsONoOBpTIz1Qv1dEkwq3VVM\"",
    "mtime": "2025-03-12T09:58:14.154Z",
    "size": 3415,
    "path": "../public/_nuxt/qHxjPx1y.js"
  },
  "/_nuxt/shopFilterbar.BBcYU-2N.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"19a-TEfFzLMgRZOiOmS4ueOgzwJRbGg\"",
    "mtime": "2025-03-12T09:58:14.133Z",
    "size": 410,
    "path": "../public/_nuxt/shopFilterbar.BBcYU-2N.css"
  },
  "/_nuxt/siNfmuag.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"2e09-ysre3TJCKRHcH6CMoCcp7sE/LBc\"",
    "mtime": "2025-03-12T09:58:14.164Z",
    "size": 11785,
    "path": "../public/_nuxt/siNfmuag.js"
  },
  "/_nuxt/u7mHGdzA.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"91f-+ySYOmlsnMgXP1QrcXrjQ6rIkoo\"",
    "mtime": "2025-03-12T09:58:14.140Z",
    "size": 2335,
    "path": "../public/_nuxt/u7mHGdzA.js"
  },
  "/_nuxt/UGDyV1VA.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"5ba-ICaehDpBhZQzZ/V5PhHB8vLLqXQ\"",
    "mtime": "2025-03-12T09:58:14.168Z",
    "size": 1466,
    "path": "../public/_nuxt/UGDyV1VA.js"
  },
  "/_nuxt/uIF0iD68.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"cab-FF3mXYC06TnCxNE/kdvz4/RrOTM\"",
    "mtime": "2025-03-12T09:58:14.154Z",
    "size": 3243,
    "path": "../public/_nuxt/uIF0iD68.js"
  },
  "/_nuxt/usm7NH3B.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"e22-8M7d3EkT46VAd5MNqUEtRJ/2Nn0\"",
    "mtime": "2025-03-12T09:58:14.145Z",
    "size": 3618,
    "path": "../public/_nuxt/usm7NH3B.js"
  },
  "/_nuxt/VNuwG3qS.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"6094-p9n2Gsi+QyS+S9wPLGhc0nvYkyw\"",
    "mtime": "2025-03-12T09:58:14.140Z",
    "size": 24724,
    "path": "../public/_nuxt/VNuwG3qS.js"
  },
  "/_nuxt/wbCBUsf7.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"547-YmHNqMaTwqfPxmEJusbKtqxkxGs\"",
    "mtime": "2025-03-12T09:58:14.163Z",
    "size": 1351,
    "path": "../public/_nuxt/wbCBUsf7.js"
  },
  "/_nuxt/WCAt7Xoh.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"30b-GDK/7AQqZ4BZlC4VX6of6I+9DeU\"",
    "mtime": "2025-03-12T09:58:14.159Z",
    "size": 779,
    "path": "../public/_nuxt/WCAt7Xoh.js"
  },
  "/_nuxt/WHFRaeor.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"42d-FV9vBnrK38dQsIhK/gk1d4xIhus\"",
    "mtime": "2025-03-12T09:58:14.145Z",
    "size": 1069,
    "path": "../public/_nuxt/WHFRaeor.js"
  },
  "/_nuxt/_...Bg5YoRGj.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"169-7g0DO1PxnA+/CoTtwZVEqY8zeYY\"",
    "mtime": "2025-03-12T09:58:14.132Z",
    "size": 361,
    "path": "../public/_nuxt/_...Bg5YoRGj.css"
  },
  "/_nuxt/_...h19L8hzF.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"ef-JqtMg6Oyqt7LMMOObQ3Q1PbFYvw\"",
    "mtime": "2025-03-12T09:58:14.132Z",
    "size": 239,
    "path": "../public/_nuxt/_...h19L8hzF.css"
  },
  "/images/360Images/img-1.jpg": {
    "type": "image/jpeg",
    "etag": "\"7fa2-OupT27WLmEj6D+MVE8Iihn/e3BE\"",
    "mtime": "2023-03-01T13:09:03.000Z",
    "size": 32674,
    "path": "../public/images/360Images/img-1.jpg"
  },
  "/images/360Images/img-10.jpg": {
    "type": "image/jpeg",
    "etag": "\"7992-gfe+Po0BKythVaHjqN5wKXQ+dfo\"",
    "mtime": "2023-03-01T13:09:03.000Z",
    "size": 31122,
    "path": "../public/images/360Images/img-10.jpg"
  },
  "/images/360Images/img-11.jpg": {
    "type": "image/jpeg",
    "etag": "\"82a6-ayP7kj5WeIVtvRSB2Nfwm8KRIx8\"",
    "mtime": "2023-03-01T13:09:03.000Z",
    "size": 33446,
    "path": "../public/images/360Images/img-11.jpg"
  },
  "/images/360Images/img-12.jpg": {
    "type": "image/jpeg",
    "etag": "\"83d6-iL0rkC+xDMR3SezGKCnBje1XrD0\"",
    "mtime": "2023-03-01T13:09:03.000Z",
    "size": 33750,
    "path": "../public/images/360Images/img-12.jpg"
  },
  "/images/360Images/img-13.jpg": {
    "type": "image/jpeg",
    "etag": "\"7cb0-3v2bb0k1RbUkB8x1Tj0N8Vkaxms\"",
    "mtime": "2023-03-01T13:09:03.000Z",
    "size": 31920,
    "path": "../public/images/360Images/img-13.jpg"
  },
  "/images/360Images/img-14.jpg": {
    "type": "image/jpeg",
    "etag": "\"729c-huG2jVZKrFufOugJjIeqi9Iz+4o\"",
    "mtime": "2023-03-01T13:09:03.000Z",
    "size": 29340,
    "path": "../public/images/360Images/img-14.jpg"
  },
  "/images/360Images/img-15.jpg": {
    "type": "image/jpeg",
    "etag": "\"6366-TcgWCJxNcqkJLeQbEcIhBoKfrsU\"",
    "mtime": "2023-03-01T13:09:03.000Z",
    "size": 25446,
    "path": "../public/images/360Images/img-15.jpg"
  },
  "/images/360Images/img-16.jpg": {
    "type": "image/jpeg",
    "etag": "\"5082-AeHV/j+xQ/tLakY81X1Ys4LSU94\"",
    "mtime": "2023-03-01T13:09:03.000Z",
    "size": 20610,
    "path": "../public/images/360Images/img-16.jpg"
  },
  "/images/360Images/img-17.jpg": {
    "type": "image/jpeg",
    "etag": "\"4032-Q3g6k0lLVq/5FEGknRrCHIbnsF8\"",
    "mtime": "2023-03-01T13:09:03.000Z",
    "size": 16434,
    "path": "../public/images/360Images/img-17.jpg"
  },
  "/images/360Images/img-18.jpg": {
    "type": "image/jpeg",
    "etag": "\"3766-rz3dY0M7MN3frMukQkJaccsB9ag\"",
    "mtime": "2023-03-01T13:09:03.000Z",
    "size": 14182,
    "path": "../public/images/360Images/img-18.jpg"
  },
  "/images/360Images/img-19.jpg": {
    "type": "image/jpeg",
    "etag": "\"44d8-HJwuhIRCI/Kvxer6EBPMYiMUIuQ\"",
    "mtime": "2023-03-01T13:09:03.000Z",
    "size": 17624,
    "path": "../public/images/360Images/img-19.jpg"
  },
  "/images/360Images/img-2.jpg": {
    "type": "image/jpeg",
    "etag": "\"7db0-89YpUSNgYBUi8UouWGzztaO51+E\"",
    "mtime": "2023-03-01T13:09:03.000Z",
    "size": 32176,
    "path": "../public/images/360Images/img-2.jpg"
  },
  "/images/360Images/img-20.jpg": {
    "type": "image/jpeg",
    "etag": "\"57da-PAloWUtg+VmDGoyOUiZt4NJrmHA\"",
    "mtime": "2023-03-01T13:09:03.000Z",
    "size": 22490,
    "path": "../public/images/360Images/img-20.jpg"
  },
  "/images/360Images/img-21.jpg": {
    "type": "image/jpeg",
    "etag": "\"6a36-8LWwC0pxnaVzGviGdRpKKukN71Y\"",
    "mtime": "2023-03-01T13:09:03.000Z",
    "size": 27190,
    "path": "../public/images/360Images/img-21.jpg"
  },
  "/images/360Images/img-22.jpg": {
    "type": "image/jpeg",
    "etag": "\"6d72-njFdujOscZM/AyE8U5jxzj14BN0\"",
    "mtime": "2023-03-01T13:09:03.000Z",
    "size": 28018,
    "path": "../public/images/360Images/img-22.jpg"
  },
  "/images/360Images/img-23.jpg": {
    "type": "image/jpeg",
    "etag": "\"78a0-S3Q7WYgQ16Ur5uCE3vFt7Vg329E\"",
    "mtime": "2023-03-01T13:09:03.000Z",
    "size": 30880,
    "path": "../public/images/360Images/img-23.jpg"
  },
  "/images/360Images/img-24.jpg": {
    "type": "image/jpeg",
    "etag": "\"7e0a-VFRTN/sMPsG4Egw+vxkA51t7eXE\"",
    "mtime": "2023-03-01T13:09:03.000Z",
    "size": 32266,
    "path": "../public/images/360Images/img-24.jpg"
  },
  "/images/360Images/img-3.jpg": {
    "type": "image/jpeg",
    "etag": "\"7412-OYbRtE8uCrCRdepFkqKtXB+/Wj8\"",
    "mtime": "2023-03-01T13:09:03.000Z",
    "size": 29714,
    "path": "../public/images/360Images/img-3.jpg"
  },
  "/images/360Images/img-4.jpg": {
    "type": "image/jpeg",
    "etag": "\"629e-MkTx8T79xVpxPZPBG9XKQ6eSubg\"",
    "mtime": "2023-03-01T13:09:03.000Z",
    "size": 25246,
    "path": "../public/images/360Images/img-4.jpg"
  },
  "/images/360Images/img-5.jpg": {
    "type": "image/jpeg",
    "etag": "\"4c70-/Z/zEFd3PBzeCYtMOejNoWydyiY\"",
    "mtime": "2023-03-01T13:09:03.000Z",
    "size": 19568,
    "path": "../public/images/360Images/img-5.jpg"
  },
  "/images/360Images/img-6.jpg": {
    "type": "image/jpeg",
    "etag": "\"39d2-A0w7NBTl8yjDabxnhJuTXtKagiM\"",
    "mtime": "2023-03-01T13:09:03.000Z",
    "size": 14802,
    "path": "../public/images/360Images/img-6.jpg"
  },
  "/images/360Images/img-7.jpg": {
    "type": "image/jpeg",
    "etag": "\"3d08-ckvj8raEQ9ZX8DNRcOf0ZJYfK5s\"",
    "mtime": "2023-03-01T13:09:03.000Z",
    "size": 15624,
    "path": "../public/images/360Images/img-7.jpg"
  },
  "/images/360Images/img-8.jpg": {
    "type": "image/jpeg",
    "etag": "\"5238-EX28/i173+NW2CXy+C6xwOk1yIc\"",
    "mtime": "2023-03-01T13:09:03.000Z",
    "size": 21048,
    "path": "../public/images/360Images/img-8.jpg"
  },
  "/images/360Images/img-9.jpg": {
    "type": "image/jpeg",
    "etag": "\"68da-7SHCKbbzPmt4iYTfRWt9YTJNnNA\"",
    "mtime": "2023-03-01T13:09:03.000Z",
    "size": 26842,
    "path": "../public/images/360Images/img-9.jpg"
  },
  "/images/banner/1.jpg": {
    "type": "image/jpeg",
    "etag": "\"1287-BohvQ9DTg0tlcNl3sss7vaFxz18\"",
    "mtime": "2022-03-29T06:37:23.000Z",
    "size": 4743,
    "path": "../public/images/banner/1.jpg"
  },
  "/images/brand/1.png": {
    "type": "image/png",
    "etag": "\"8ca-F6Pb1OBFyws81vPGi9depfCI6Rk\"",
    "mtime": "2022-03-29T06:37:23.000Z",
    "size": 2250,
    "path": "../public/images/brand/1.png"
  },
  "/images/brand/2.png": {
    "type": "image/png",
    "etag": "\"863-urHDfi40zX04TbDnqItuavvsh/c\"",
    "mtime": "2022-03-29T06:37:23.000Z",
    "size": 2147,
    "path": "../public/images/brand/2.png"
  },
  "/images/brand/3.png": {
    "type": "image/png",
    "etag": "\"96c-Rw4bC1N7/GkjMxyOsMTvm5pQDxg\"",
    "mtime": "2022-03-29T06:37:23.000Z",
    "size": 2412,
    "path": "../public/images/brand/3.png"
  },
  "/images/brand/4.png": {
    "type": "image/png",
    "etag": "\"9e7-PDv4GA5cv+zKGarE1gGxXGK122o\"",
    "mtime": "2022-03-29T06:37:23.000Z",
    "size": 2535,
    "path": "../public/images/brand/4.png"
  },
  "/images/brand/5.png": {
    "type": "image/png",
    "etag": "\"12ea-sh6eVKKEjd8As12oo93v3u03yKc\"",
    "mtime": "2022-03-29T06:37:23.000Z",
    "size": 4842,
    "path": "../public/images/brand/5.png"
  },
  "/images/brand/6.png": {
    "type": "image/png",
    "etag": "\"891-v2Ic9dj50Enu0RILpjTQtAB5r8Y\"",
    "mtime": "2022-03-29T06:37:23.000Z",
    "size": 2193,
    "path": "../public/images/brand/6.png"
  },
  "/images/demo-image/electonic.jpg": {
    "type": "image/jpeg",
    "etag": "\"1cfdc-9NLiqGqTn3q3MxHuqf4+WdEIOg4\"",
    "mtime": "2022-03-29T06:37:23.000Z",
    "size": 118748,
    "path": "../public/images/demo-image/electonic.jpg"
  },
  "/images/demo-image/fashion.jpg": {
    "type": "image/jpeg",
    "etag": "\"2c998-BrU/cHiWpfza1twypFidsyDrv/A\"",
    "mtime": "2022-03-29T06:37:23.000Z",
    "size": 182680,
    "path": "../public/images/demo-image/fashion.jpg"
  },
  "/images/demo-image/flower.jpg": {
    "type": "image/jpeg",
    "etag": "\"3649d-IyBHeIif+krVVLJ8Y7Ls/biEQ4I\"",
    "mtime": "2022-03-29T06:37:23.000Z",
    "size": 222365,
    "path": "../public/images/demo-image/flower.jpg"
  },
  "/images/demo-image/furniture.jpg": {
    "type": "image/jpeg",
    "etag": "\"28dca-Tzou+5cJenbjmW5QE+HwUBe78Nc\"",
    "mtime": "2022-03-29T06:37:23.000Z",
    "size": 167370,
    "path": "../public/images/demo-image/furniture.jpg"
  },
  "/images/demo-image/shoes.jpg": {
    "type": "image/jpeg",
    "etag": "\"26609-PIPamGVsql2wuToHH01V5gMawS0\"",
    "mtime": "2022-03-29T06:37:23.000Z",
    "size": 157193,
    "path": "../public/images/demo-image/shoes.jpg"
  },
  "/images/demo-image/vagetables.jpg": {
    "type": "image/jpeg",
    "etag": "\"33482-/odla7I4AymJ0fwkmA+WiVBBq4U\"",
    "mtime": "2022-03-29T06:37:23.000Z",
    "size": 210050,
    "path": "../public/images/demo-image/vagetables.jpg"
  },
  "/images/fashion/1.jpg": {
    "type": "image/jpeg",
    "etag": "\"4948-J2xvTdNz6MvZmJTQfz6+nJs25fM\"",
    "mtime": "2022-03-29T06:37:23.000Z",
    "size": 18760,
    "path": "../public/images/fashion/1.jpg"
  },
  "/images/fashion/2.jpg": {
    "type": "image/jpeg",
    "etag": "\"4948-J2xvTdNz6MvZmJTQfz6+nJs25fM\"",
    "mtime": "2022-03-29T06:37:23.000Z",
    "size": 18760,
    "path": "../public/images/fashion/2.jpg"
  },
  "/images/fashion/3.jpg": {
    "type": "image/jpeg",
    "etag": "\"4948-J2xvTdNz6MvZmJTQfz6+nJs25fM\"",
    "mtime": "2022-03-29T06:37:23.000Z",
    "size": 18760,
    "path": "../public/images/fashion/3.jpg"
  },
  "/images/fashion/4.jpg": {
    "type": "image/jpeg",
    "etag": "\"4948-J2xvTdNz6MvZmJTQfz6+nJs25fM\"",
    "mtime": "2022-03-29T06:37:23.000Z",
    "size": 18760,
    "path": "../public/images/fashion/4.jpg"
  },
  "/images/fashion/5.jpg": {
    "type": "image/jpeg",
    "etag": "\"4948-J2xvTdNz6MvZmJTQfz6+nJs25fM\"",
    "mtime": "2022-03-29T06:37:23.000Z",
    "size": 18760,
    "path": "../public/images/fashion/5.jpg"
  },
  "/images/fashion/6.jpg": {
    "type": "image/jpeg",
    "etag": "\"4948-J2xvTdNz6MvZmJTQfz6+nJs25fM\"",
    "mtime": "2022-03-29T06:37:23.000Z",
    "size": 18760,
    "path": "../public/images/fashion/6.jpg"
  },
  "/images/fashion/7.jpg": {
    "type": "image/jpeg",
    "etag": "\"4948-J2xvTdNz6MvZmJTQfz6+nJs25fM\"",
    "mtime": "2022-03-29T06:37:23.000Z",
    "size": 18760,
    "path": "../public/images/fashion/7.jpg"
  },
  "/images/fashion/banner.jpg": {
    "type": "image/jpeg",
    "etag": "\"32c4-5se+0VqadQwdTqMih4yQ/mSPcUQ\"",
    "mtime": "2022-03-29T06:37:23.000Z",
    "size": 12996,
    "path": "../public/images/fashion/banner.jpg"
  },
  "/images/favicon/1.png": {
    "type": "image/png",
    "etag": "\"47e-A1xsXixhnINRod8Sj+0Iv0gMw4o\"",
    "mtime": "2022-03-29T06:37:23.000Z",
    "size": 1150,
    "path": "../public/images/favicon/1.png"
  },
  "/images/favicon/2-144.png": {
    "type": "image/png",
    "etag": "\"af6-SJFPkU4qfl9+6txTjOMwX6ABUFE\"",
    "mtime": "2022-03-29T06:37:23.000Z",
    "size": 2806,
    "path": "../public/images/favicon/2-144.png"
  },
  "/images/favicon/2-168.png": {
    "type": "image/png",
    "etag": "\"cf3-SYmma3sCYQckqB9lFxp3rc2CNLI\"",
    "mtime": "2022-03-29T06:37:23.000Z",
    "size": 3315,
    "path": "../public/images/favicon/2-168.png"
  },
  "/images/favicon/2-192.png": {
    "type": "image/png",
    "etag": "\"ecb-OfOHTVqYrjJLtNLi5SvIs8ScBlk\"",
    "mtime": "2022-03-29T06:37:23.000Z",
    "size": 3787,
    "path": "../public/images/favicon/2-192.png"
  },
  "/images/favicon/2-48.png": {
    "type": "image/png",
    "etag": "\"3ba-IFBMV2VYH5LJJGab+gJrcj/Xt/w\"",
    "mtime": "2022-03-29T06:37:23.000Z",
    "size": 954,
    "path": "../public/images/favicon/2-48.png"
  },
  "/images/favicon/2-512.png": {
    "type": "image/png",
    "etag": "\"2aa8-jH09/4/1d5/fIb0C6Gt+XQ5DHiE\"",
    "mtime": "2022-03-29T06:37:23.000Z",
    "size": 10920,
    "path": "../public/images/favicon/2-512.png"
  },
  "/images/favicon/2-72.png": {
    "type": "image/png",
    "etag": "\"57f-RMagCDvmGP5LTeGJMX6sxqY8oaQ\"",
    "mtime": "2022-03-29T06:37:23.000Z",
    "size": 1407,
    "path": "../public/images/favicon/2-72.png"
  },
  "/images/favicon/2-96.png": {
    "type": "image/png",
    "etag": "\"746-r9KOjJ7WrBKPZuionjH4HJbFtXw\"",
    "mtime": "2022-03-29T06:37:23.000Z",
    "size": 1862,
    "path": "../public/images/favicon/2-96.png"
  },
  "/images/favicon/2.png": {
    "type": "image/png",
    "etag": "\"483-Oph2UFnj26v2Tmy+rjKEHFvtzK0\"",
    "mtime": "2022-03-29T06:37:23.000Z",
    "size": 1155,
    "path": "../public/images/favicon/2.png"
  },
  "/images/favicon/3.png": {
    "type": "image/png",
    "etag": "\"244-M479W7DEPVDtkb2FgStU6nQzTZM\"",
    "mtime": "2022-03-29T06:37:23.000Z",
    "size": 580,
    "path": "../public/images/favicon/3.png"
  },
  "/images/favicon/4.png": {
    "type": "image/png",
    "etag": "\"24e-9mpABmrEBnvqVBwBZsj/6p3e7P8\"",
    "mtime": "2022-03-29T06:37:23.000Z",
    "size": 590,
    "path": "../public/images/favicon/4.png"
  },
  "/images/favicon/5.png": {
    "type": "image/png",
    "etag": "\"247-uoL8rmdH1rXkwNI/ITMv9tyBNs8\"",
    "mtime": "2022-03-29T06:37:23.000Z",
    "size": 583,
    "path": "../public/images/favicon/5.png"
  },
  "/images/favicon/6.png": {
    "type": "image/png",
    "etag": "\"25b-VsELEseutobBvPgtHhoOQ23gbm8\"",
    "mtime": "2022-03-29T06:37:23.000Z",
    "size": 603,
    "path": "../public/images/favicon/6.png"
  },
  "/images/gif/fire.gif": {
    "type": "image/gif",
    "etag": "\"2218-hDpaVb6M762+WP6lJGZAnMV+D4I\"",
    "mtime": "2022-03-29T06:37:23.000Z",
    "size": 8728,
    "path": "../public/images/gif/fire.gif"
  },
  "/images/gif/person.gif": {
    "type": "image/gif",
    "etag": "\"809-xyeRmS6FeHQS7TysETi56qK//X8\"",
    "mtime": "2022-03-29T06:37:23.000Z",
    "size": 2057,
    "path": "../public/images/gif/person.gif"
  },
  "/images/gif/truck.png": {
    "type": "image/png",
    "etag": "\"258-Ybu2NW7+iCzQBDXxByHwI6cSif4\"",
    "mtime": "2022-03-29T06:37:23.000Z",
    "size": 600,
    "path": "../public/images/gif/truck.png"
  },
  "/images/flower/back-cirlce.png": {
    "type": "image/png",
    "etag": "\"565a1-iMctpA7RzOHko055vnw37vFbtfs\"",
    "mtime": "2022-03-29T06:37:23.000Z",
    "size": 353697,
    "path": "../public/images/flower/back-cirlce.png"
  },
  "/images/flower/back.jpg": {
    "type": "image/jpeg",
    "etag": "\"93044-UKqjLVCPVXG6/t5lQpQ4xfOU1Gk\"",
    "mtime": "2022-03-29T06:37:23.000Z",
    "size": 602180,
    "path": "../public/images/flower/back.jpg"
  },
  "/images/inner-page/404.png": {
    "type": "image/png",
    "etag": "\"2499f-wfPvBaRuscRCzUuntzLBQ5rQmt8\"",
    "mtime": "2022-03-29T06:37:23.000Z",
    "size": 149919,
    "path": "../public/images/inner-page/404.png"
  },
  "/images/inner-page/facebook.png": {
    "type": "image/png",
    "etag": "\"c4e-FVfLvZS4Tx0nD+8cHCLIXVYZPRo\"",
    "mtime": "2022-03-29T06:37:23.000Z",
    "size": 3150,
    "path": "../public/images/inner-page/facebook.png"
  },
  "/images/inner-page/google.png": {
    "type": "image/png",
    "etag": "\"485f-7l46lIVASeqIW5Uj7ioOc2/Mu3M\"",
    "mtime": "2022-03-29T06:37:23.000Z",
    "size": 18527,
    "path": "../public/images/inner-page/google.png"
  },
  "/images/inner-page/quote.png": {
    "type": "image/png",
    "etag": "\"4b21-mMi0DfzL0pj1ODw8ik3fvoLlRtw\"",
    "mtime": "2022-03-29T06:37:23.000Z",
    "size": 19233,
    "path": "../public/images/inner-page/quote.png"
  },
  "/images/list-grid/2.svg": {
    "type": "image/svg+xml",
    "etag": "\"1ea-mmMB5pJoaRxICTF31bvla3lt7Ok\"",
    "mtime": "2022-03-29T06:37:23.000Z",
    "size": 490,
    "path": "../public/images/list-grid/2.svg"
  },
  "/images/list-grid/3.svg": {
    "type": "image/svg+xml",
    "etag": "\"324-CYCNXWxuqupaLhIypdfSIsQe59k\"",
    "mtime": "2022-03-29T06:37:23.000Z",
    "size": 804,
    "path": "../public/images/list-grid/3.svg"
  },
  "/images/list-grid/4.svg": {
    "type": "image/svg+xml",
    "etag": "\"4fe-crHe24yi/7Sm0i8DpKICcMKUzog\"",
    "mtime": "2022-03-29T06:37:23.000Z",
    "size": 1278,
    "path": "../public/images/list-grid/4.svg"
  },
  "/images/list-grid/list.svg": {
    "type": "image/svg+xml",
    "etag": "\"364-/dNU5Mrf+FflIXyiFDVK+q6pXK4\"",
    "mtime": "2022-03-29T06:37:23.000Z",
    "size": 868,
    "path": "../public/images/list-grid/list.svg"
  },
  "/images/landing-image/bg.jpg": {
    "type": "image/jpeg",
    "etag": "\"153ae7-635mHFaK/JfBBuVc8NCLVfSW5eM\"",
    "mtime": "2022-03-29T06:37:23.000Z",
    "size": 1391335,
    "path": "../public/images/landing-image/bg.jpg"
  },
  "/images/landing-image/future-bg.jpg": {
    "type": "image/jpeg",
    "etag": "\"9037-XKaBrp8RmGO3sL2ybfXlYTab9BM\"",
    "mtime": "2022-03-29T06:37:23.000Z",
    "size": 36919,
    "path": "../public/images/landing-image/future-bg.jpg"
  },
  "/images/logos/1.png": {
    "type": "image/png",
    "etag": "\"29f-CnqioB0xlQlSLUEjUdkthxIAV2w\"",
    "mtime": "2022-03-29T06:37:23.000Z",
    "size": 671,
    "path": "../public/images/logos/1.png"
  },
  "/images/logos/2.png": {
    "type": "image/png",
    "etag": "\"4e1-gcYulM3zXNEdKiyJ1f1R5ASgZxQ\"",
    "mtime": "2022-03-29T06:37:23.000Z",
    "size": 1249,
    "path": "../public/images/logos/2.png"
  },
  "/images/logos/3.png": {
    "type": "image/png",
    "etag": "\"209-aKSJnRp0qgkTyC42Q9mj6c74yCo\"",
    "mtime": "2022-03-29T06:37:23.000Z",
    "size": 521,
    "path": "../public/images/logos/3.png"
  },
  "/images/logos/4.png": {
    "type": "image/png",
    "etag": "\"209-oR3XtmPWEc4li8KU/vECOyeSlTw\"",
    "mtime": "2022-03-29T06:37:23.000Z",
    "size": 521,
    "path": "../public/images/logos/4.png"
  },
  "/images/logos/5.png": {
    "type": "image/png",
    "etag": "\"209-N8eqWAVjqlttIWffJ3H8ybpQ3VM\"",
    "mtime": "2022-03-29T06:37:23.000Z",
    "size": 521,
    "path": "../public/images/logos/5.png"
  },
  "/images/logos/6.png": {
    "type": "image/png",
    "etag": "\"209-l5PiaaKQmIP65knUvH5auXyNFUc\"",
    "mtime": "2022-03-29T06:37:23.000Z",
    "size": 521,
    "path": "../public/images/logos/6.png"
  },
  "/images/logos/logo-white.png": {
    "type": "image/png",
    "etag": "\"eaa-ZdG4BsnQ32JqRlidSjv+2wXsEck\"",
    "mtime": "2022-03-29T06:37:23.000Z",
    "size": 3754,
    "path": "../public/images/logos/logo-white.png"
  },
  "/images/payment-icon/1.jpg": {
    "type": "image/jpeg",
    "etag": "\"98e-na1YhjFPqFiw1rVQD/ypWcm3fP8\"",
    "mtime": "2022-03-29T06:37:23.000Z",
    "size": 2446,
    "path": "../public/images/payment-icon/1.jpg"
  },
  "/images/payment-icon/2.jpg": {
    "type": "image/jpeg",
    "etag": "\"a7f-1XNluQsZDO/jhHeLr0pNuywQ3YA\"",
    "mtime": "2022-03-29T06:37:23.000Z",
    "size": 2687,
    "path": "../public/images/payment-icon/2.jpg"
  },
  "/images/payment-icon/3.jpg": {
    "type": "image/jpeg",
    "etag": "\"abd-xV3BuRD1grEV2qX5WakmgJ0EGoc\"",
    "mtime": "2022-03-29T06:37:23.000Z",
    "size": 2749,
    "path": "../public/images/payment-icon/3.jpg"
  },
  "/images/payment-icon/4.jpg": {
    "type": "image/jpeg",
    "etag": "\"c16-TqZYd4h275tP0mUJb4wYOdcTacg\"",
    "mtime": "2022-03-29T06:37:23.000Z",
    "size": 3094,
    "path": "../public/images/payment-icon/4.jpg"
  },
  "/images/shoes/1-.png": {
    "type": "image/png",
    "etag": "\"65f99-sWi0NrG6VPKRShJ4x9bR+2bLR78\"",
    "mtime": "2022-03-29T06:37:23.000Z",
    "size": 417689,
    "path": "../public/images/shoes/1-.png"
  },
  "/images/shoes/slider-2.png": {
    "type": "image/png",
    "etag": "\"62846-MyZc+gynRspOR4vZdbxyxgDWETY\"",
    "mtime": "2022-03-29T06:37:23.000Z",
    "size": 403526,
    "path": "../public/images/shoes/slider-2.png"
  },
  "/images/shoes/Slider.png": {
    "type": "image/png",
    "etag": "\"69d12-zOE20cPtdgKYrF71fjGrBU2SdOI\"",
    "mtime": "2022-03-29T06:37:23.000Z",
    "size": 433426,
    "path": "../public/images/shoes/Slider.png"
  },
  "/images/shop/1-.jpg": {
    "type": "image/jpeg",
    "etag": "\"3f96-D008NzW2bJd+dW368RdDP1gpw60\"",
    "mtime": "2022-03-29T06:37:23.000Z",
    "size": 16278,
    "path": "../public/images/shop/1-.jpg"
  },
  "/images/shop/1.jpg": {
    "type": "image/jpeg",
    "etag": "\"5865-lP+LFlxmuA/ISa6GS5+C7ZUekgM\"",
    "mtime": "2022-03-29T06:37:23.000Z",
    "size": 22629,
    "path": "../public/images/shop/1.jpg"
  },
  "/images/shop/12701.jpg": {
    "type": "image/jpeg",
    "etag": "\"21ad-TCIzo8YURLqv/Buzv2c4p0BRkuk\"",
    "mtime": "2022-03-29T06:37:23.000Z",
    "size": 8621,
    "path": "../public/images/shop/12701.jpg"
  },
  "/images/shop/2.jpg": {
    "type": "image/jpeg",
    "etag": "\"60b9-P5EPxX2vWyLtoo/nUp06+crEia8\"",
    "mtime": "2022-03-29T06:37:23.000Z",
    "size": 24761,
    "path": "../public/images/shop/2.jpg"
  },
  "/images/shop/3.jpg": {
    "type": "image/jpeg",
    "etag": "\"6251-IIWiuhPfqt1d4MDjlhjjeXBwuQ0\"",
    "mtime": "2022-03-29T06:37:23.000Z",
    "size": 25169,
    "path": "../public/images/shop/3.jpg"
  },
  "/images/social-icon/1.png": {
    "type": "image/png",
    "etag": "\"325-NwOhGzvMWmkyndcCsy0v6IUp4hs\"",
    "mtime": "2022-03-29T06:37:23.000Z",
    "size": 805,
    "path": "../public/images/social-icon/1.png"
  },
  "/images/social-icon/2.png": {
    "type": "image/png",
    "etag": "\"497-oxD0pNes/Ty9hGGMwrfZfxNPIps\"",
    "mtime": "2022-03-29T06:37:23.000Z",
    "size": 1175,
    "path": "../public/images/social-icon/2.png"
  },
  "/images/social-icon/3.png": {
    "type": "image/png",
    "etag": "\"36e-iYRyfRWUnlPJZkjioIWM/9LqJ1Q\"",
    "mtime": "2022-03-29T06:37:23.000Z",
    "size": 878,
    "path": "../public/images/social-icon/3.png"
  },
  "/images/social-icon/4.png": {
    "type": "image/png",
    "etag": "\"145-7ah+xgM80ifQMFhUIeBgWtUPKuA\"",
    "mtime": "2022-03-29T06:37:23.000Z",
    "size": 325,
    "path": "../public/images/social-icon/4.png"
  },
  "/images/social-icon/5.png": {
    "type": "image/png",
    "etag": "\"2a3-VIUHQcB4qlnmVTw6uWHj0SSiRKo\"",
    "mtime": "2022-03-29T06:37:23.000Z",
    "size": 675,
    "path": "../public/images/social-icon/5.png"
  },
  "/images/social-icon/6.png": {
    "type": "image/png",
    "etag": "\"1eb-6Ohm8UB04Ojn6F5gO2m04u4nhMI\"",
    "mtime": "2022-03-29T06:37:23.000Z",
    "size": 491,
    "path": "../public/images/social-icon/6.png"
  },
  "/images/social-icon/facebook.png": {
    "type": "image/png",
    "etag": "\"1153-nCdZTCFPql8p8UM8x80B1lfDpgU\"",
    "mtime": "2022-03-29T06:37:23.000Z",
    "size": 4435,
    "path": "../public/images/social-icon/facebook.png"
  },
  "/images/social-icon/google-plus.png": {
    "type": "image/png",
    "etag": "\"2107-X2EqNby+mTAzwg1F07vqpsyUPTE\"",
    "mtime": "2022-03-29T06:37:24.000Z",
    "size": 8455,
    "path": "../public/images/social-icon/google-plus.png"
  },
  "/images/social-icon/instagram.png": {
    "type": "image/png",
    "etag": "\"46f6-Dt3UwhVPazBDjwQMahL7M3JlWAs\"",
    "mtime": "2022-03-29T06:37:24.000Z",
    "size": 18166,
    "path": "../public/images/social-icon/instagram.png"
  },
  "/images/social-icon/twitter.png": {
    "type": "image/png",
    "etag": "\"3438-iwpWEI61+PZGxQ2ulfLqkywH4sw\"",
    "mtime": "2022-03-29T06:37:24.000Z",
    "size": 13368,
    "path": "../public/images/social-icon/twitter.png"
  },
  "/images/svg/box.png": {
    "type": "image/png",
    "etag": "\"3331-FJWWa+iVqgy8HKHpLkEGdN6AVhc\"",
    "mtime": "2022-03-29T06:37:24.000Z",
    "size": 13105,
    "path": "../public/images/svg/box.png"
  },
  "/images/svg/box1.png": {
    "type": "image/png",
    "etag": "\"20d6-qNbvNRe5pXViO+vAhOmdUb5xTdo\"",
    "mtime": "2022-03-29T06:37:24.000Z",
    "size": 8406,
    "path": "../public/images/svg/box1.png"
  },
  "/images/svg/sent.png": {
    "type": "image/png",
    "etag": "\"21fb-ZPG78bHX9HVRXbOlZpsDKx119nk\"",
    "mtime": "2022-03-29T06:37:24.000Z",
    "size": 8699,
    "path": "../public/images/svg/sent.png"
  },
  "/images/svg/sent1.png": {
    "type": "image/png",
    "etag": "\"1689-71BvBcGOgxcEMgsZsDc9GhbnRNc\"",
    "mtime": "2022-03-29T06:37:24.000Z",
    "size": 5769,
    "path": "../public/images/svg/sent1.png"
  },
  "/images/svg/user.png": {
    "type": "image/png",
    "etag": "\"41ba-GbjyQihLSzXoRTq6lLq7BdI/HfA\"",
    "mtime": "2022-03-29T06:37:24.000Z",
    "size": 16826,
    "path": "../public/images/svg/user.png"
  },
  "/images/svg/user1.png": {
    "type": "image/png",
    "etag": "\"28c3-Xuj0CBXidUXsY89VL2Xo3P2cBsA\"",
    "mtime": "2022-03-29T06:37:24.000Z",
    "size": 10435,
    "path": "../public/images/svg/user1.png"
  },
  "/images/svg/wishlist.png": {
    "type": "image/png",
    "etag": "\"2b59-oxYHqqMCtBz2CoJY8TkenNRTdhA\"",
    "mtime": "2022-03-29T06:37:24.000Z",
    "size": 11097,
    "path": "../public/images/svg/wishlist.png"
  },
  "/images/svg/wishlist1.png": {
    "type": "image/png",
    "etag": "\"1f05-lZFVo4VJFSrtYco5svmceMAX2dI\"",
    "mtime": "2022-03-29T06:37:24.000Z",
    "size": 7941,
    "path": "../public/images/svg/wishlist1.png"
  },
  "/images/vegetable/1234.png": {
    "type": "image/png",
    "etag": "\"bc862-SI46TF1wrojKzVZnrtMyxRuDa+U\"",
    "mtime": "2022-03-29T06:37:24.000Z",
    "size": 772194,
    "path": "../public/images/vegetable/1234.png"
  },
  "/images/vegetable/852.png": {
    "type": "image/png",
    "etag": "\"18771-eYt3T1Fd1g0eq7lX06nV9VH5Et8\"",
    "mtime": "2022-03-29T06:37:24.000Z",
    "size": 100209,
    "path": "../public/images/vegetable/852.png"
  },
  "/images/vegetable/circle.png": {
    "type": "image/png",
    "etag": "\"2d106-EEe/1vJjmxg4+X7jeBMuLSl9ySs\"",
    "mtime": "2022-03-29T06:37:24.000Z",
    "size": 184582,
    "path": "../public/images/vegetable/circle.png"
  },
  "/images/vegetable/effect.png": {
    "type": "image/png",
    "etag": "\"d0ef-QXdTGxwxZBy8CFA2x8xx9dxf2SY\"",
    "mtime": "2022-03-29T06:37:24.000Z",
    "size": 53487,
    "path": "../public/images/vegetable/effect.png"
  },
  "/images/vegetable/effect1.png": {
    "type": "image/png",
    "etag": "\"748c-7VdTVuMBcx5Na+ALWqyaqe54vDA\"",
    "mtime": "2022-03-29T06:37:24.000Z",
    "size": 29836,
    "path": "../public/images/vegetable/effect1.png"
  },
  "/images/vegetable/percent.png": {
    "type": "image/png",
    "etag": "\"aad-L/5dnBtfCS+AIdWL7CSW2JrUiDY\"",
    "mtime": "2022-03-29T06:37:24.000Z",
    "size": 2733,
    "path": "../public/images/vegetable/percent.png"
  },
  "/images/vegetable/percentage.jpg": {
    "type": "image/jpeg",
    "etag": "\"362e7-F5Q4O8VLQF97/abJsgadyVIkS70\"",
    "mtime": "2022-03-29T06:37:24.000Z",
    "size": 221927,
    "path": "../public/images/vegetable/percentage.jpg"
  },
  "/_nuxt/builds/latest.json": {
    "type": "application/json",
    "etag": "\"47-izQ9ZX9zO9nBYkku3OAfDdar2/s\"",
    "mtime": "2025-03-12T09:58:14.447Z",
    "size": 71,
    "path": "../public/_nuxt/builds/latest.json"
  },
  "/images/electronics/banner/1.jpg": {
    "type": "image/jpeg",
    "etag": "\"1b7f-iXCWrMD7mcWiZHJ4Ap9qpwgwP9g\"",
    "mtime": "2022-03-29T06:37:23.000Z",
    "size": 7039,
    "path": "../public/images/electronics/banner/1.jpg"
  },
  "/images/electronics/banner/2.jpg": {
    "type": "image/jpeg",
    "etag": "\"1b7f-iXCWrMD7mcWiZHJ4Ap9qpwgwP9g\"",
    "mtime": "2022-03-29T06:37:23.000Z",
    "size": 7039,
    "path": "../public/images/electronics/banner/2.jpg"
  },
  "/images/electronics/banner/3.jpg": {
    "type": "image/jpeg",
    "etag": "\"3dc5-BzbG3L0pkXSIdbM4+ubR0xmZwIc\"",
    "mtime": "2022-03-29T06:37:23.000Z",
    "size": 15813,
    "path": "../public/images/electronics/banner/3.jpg"
  },
  "/images/electronics/banner/4.jpg": {
    "type": "image/jpeg",
    "etag": "\"9a1-03FbMTZ4FBqbTmjW6dkgJr7TZhk\"",
    "mtime": "2022-03-29T06:37:23.000Z",
    "size": 2465,
    "path": "../public/images/electronics/banner/4.jpg"
  },
  "/images/electronics/instagram/1.jpg": {
    "type": "image/jpeg",
    "etag": "\"1416-l6ZZiB5vJMQ5sCIYFvc8wsEvvO8\"",
    "mtime": "2022-03-29T06:37:23.000Z",
    "size": 5142,
    "path": "../public/images/electronics/instagram/1.jpg"
  },
  "/images/electronics/instagram/2.jpg": {
    "type": "image/jpeg",
    "etag": "\"1416-l6ZZiB5vJMQ5sCIYFvc8wsEvvO8\"",
    "mtime": "2022-03-29T06:37:23.000Z",
    "size": 5142,
    "path": "../public/images/electronics/instagram/2.jpg"
  },
  "/images/electronics/instagram/3.jpg": {
    "type": "image/jpeg",
    "etag": "\"1416-l6ZZiB5vJMQ5sCIYFvc8wsEvvO8\"",
    "mtime": "2022-03-29T06:37:23.000Z",
    "size": 5142,
    "path": "../public/images/electronics/instagram/3.jpg"
  },
  "/images/electronics/instagram/4.jpg": {
    "type": "image/jpeg",
    "etag": "\"1416-l6ZZiB5vJMQ5sCIYFvc8wsEvvO8\"",
    "mtime": "2022-03-29T06:37:23.000Z",
    "size": 5142,
    "path": "../public/images/electronics/instagram/4.jpg"
  },
  "/images/electronics/instagram/5.jpg": {
    "type": "image/jpeg",
    "etag": "\"1416-l6ZZiB5vJMQ5sCIYFvc8wsEvvO8\"",
    "mtime": "2022-03-29T06:37:23.000Z",
    "size": 5142,
    "path": "../public/images/electronics/instagram/5.jpg"
  },
  "/images/electronics/product/1.jpg": {
    "type": "image/jpeg",
    "etag": "\"22af-doRfXzcxXaMTW3uevU27ow83IXI\"",
    "mtime": "2022-03-29T06:37:23.000Z",
    "size": 8879,
    "path": "../public/images/electronics/product/1.jpg"
  },
  "/images/electronics/product/2.jpg": {
    "type": "image/jpeg",
    "etag": "\"22af-doRfXzcxXaMTW3uevU27ow83IXI\"",
    "mtime": "2022-03-29T06:37:23.000Z",
    "size": 8879,
    "path": "../public/images/electronics/product/2.jpg"
  },
  "/images/electronics/product/3.jpg": {
    "type": "image/jpeg",
    "etag": "\"22af-doRfXzcxXaMTW3uevU27ow83IXI\"",
    "mtime": "2022-03-29T06:37:23.000Z",
    "size": 8879,
    "path": "../public/images/electronics/product/3.jpg"
  },
  "/images/electronics/product/4.jpg": {
    "type": "image/jpeg",
    "etag": "\"22af-doRfXzcxXaMTW3uevU27ow83IXI\"",
    "mtime": "2022-03-29T06:37:23.000Z",
    "size": 8879,
    "path": "../public/images/electronics/product/4.jpg"
  },
  "/images/electronics/product/5.jpg": {
    "type": "image/jpeg",
    "etag": "\"22af-doRfXzcxXaMTW3uevU27ow83IXI\"",
    "mtime": "2022-03-29T06:37:23.000Z",
    "size": 8879,
    "path": "../public/images/electronics/product/5.jpg"
  },
  "/images/electronics/product/6.jpg": {
    "type": "image/jpeg",
    "etag": "\"22af-doRfXzcxXaMTW3uevU27ow83IXI\"",
    "mtime": "2022-03-29T06:37:23.000Z",
    "size": 8879,
    "path": "../public/images/electronics/product/6.jpg"
  },
  "/images/electronics/product/8.jpg": {
    "type": "image/jpeg",
    "etag": "\"22af-doRfXzcxXaMTW3uevU27ow83IXI\"",
    "mtime": "2022-03-29T06:37:23.000Z",
    "size": 8879,
    "path": "../public/images/electronics/product/8.jpg"
  },
  "/images/electronics/product/9.jpg": {
    "type": "image/jpeg",
    "etag": "\"22af-doRfXzcxXaMTW3uevU27ow83IXI\"",
    "mtime": "2022-03-29T06:37:23.000Z",
    "size": 8879,
    "path": "../public/images/electronics/product/9.jpg"
  },
  "/images/electronics/slider/1.jpg": {
    "type": "image/jpeg",
    "etag": "\"93d6-l1IwtWFgrZb+5yhsJ5oeDgdjpfs\"",
    "mtime": "2022-03-29T06:37:23.000Z",
    "size": 37846,
    "path": "../public/images/electronics/slider/1.jpg"
  },
  "/images/electronics/slider/2.jpg": {
    "type": "image/jpeg",
    "etag": "\"53a-trn0EmwgyL3RaPMTw68YQtZLchA\"",
    "mtime": "2022-03-29T06:37:23.000Z",
    "size": 1338,
    "path": "../public/images/electronics/slider/2.jpg"
  },
  "/images/electronics/slider/3.jpg": {
    "type": "image/jpeg",
    "etag": "\"53a-trn0EmwgyL3RaPMTw68YQtZLchA\"",
    "mtime": "2022-03-29T06:37:23.000Z",
    "size": 1338,
    "path": "../public/images/electronics/slider/3.jpg"
  },
  "/images/electronics/slider/4.jpg": {
    "type": "image/jpeg",
    "etag": "\"5cb6-ujI5nxAaxo7dQJLzLty9qR3DHnQ\"",
    "mtime": "2022-03-29T06:37:23.000Z",
    "size": 23734,
    "path": "../public/images/electronics/slider/4.jpg"
  },
  "/images/fashion/bundle/1.jpg": {
    "type": "image/jpeg",
    "etag": "\"5474-bqPwpLkLZpCOziLFaWaAAAZj8tM\"",
    "mtime": "2022-03-29T06:37:23.000Z",
    "size": 21620,
    "path": "../public/images/fashion/bundle/1.jpg"
  },
  "/images/fashion/bundle/2.jpg": {
    "type": "image/jpeg",
    "etag": "\"5474-bqPwpLkLZpCOziLFaWaAAAZj8tM\"",
    "mtime": "2022-03-29T06:37:23.000Z",
    "size": 21620,
    "path": "../public/images/fashion/bundle/2.jpg"
  },
  "/images/fashion/bundle/3.jpg": {
    "type": "image/jpeg",
    "etag": "\"5474-bqPwpLkLZpCOziLFaWaAAAZj8tM\"",
    "mtime": "2022-03-29T06:37:23.000Z",
    "size": 21620,
    "path": "../public/images/fashion/bundle/3.jpg"
  },
  "/images/fashion/banner/1.jpg": {
    "type": "image/jpeg",
    "etag": "\"198a-h2LNX5JFUT9Y4BswH5n+x3kS2d4\"",
    "mtime": "2022-03-29T06:37:23.000Z",
    "size": 6538,
    "path": "../public/images/fashion/banner/1.jpg"
  },
  "/images/fashion/banner/2.jpg": {
    "type": "image/jpeg",
    "etag": "\"198a-h2LNX5JFUT9Y4BswH5n+x3kS2d4\"",
    "mtime": "2022-03-29T06:37:23.000Z",
    "size": 6538,
    "path": "../public/images/fashion/banner/2.jpg"
  },
  "/images/fashion/banner/3.jpg": {
    "type": "image/jpeg",
    "etag": "\"198a-h2LNX5JFUT9Y4BswH5n+x3kS2d4\"",
    "mtime": "2022-03-29T06:37:23.000Z",
    "size": 6538,
    "path": "../public/images/fashion/banner/3.jpg"
  },
  "/images/fashion/banner/4.jpg": {
    "type": "image/jpeg",
    "etag": "\"2d44-pOrwc3ZP21xGX0wOmQvxZbyzui4\"",
    "mtime": "2022-03-29T06:37:23.000Z",
    "size": 11588,
    "path": "../public/images/fashion/banner/4.jpg"
  },
  "/images/fashion/banner/5.jpg": {
    "type": "image/jpeg",
    "etag": "\"2081-ZQ7wEpaD7qQ3EWTATn+2C4qZtns\"",
    "mtime": "2022-03-29T06:37:23.000Z",
    "size": 8321,
    "path": "../public/images/fashion/banner/5.jpg"
  },
  "/images/fashion/banner/6.jpg": {
    "type": "image/jpeg",
    "etag": "\"1020-/REHXQX9itPxfpP0v/7qF354GT4\"",
    "mtime": "2022-03-29T06:37:23.000Z",
    "size": 4128,
    "path": "../public/images/fashion/banner/6.jpg"
  },
  "/images/fashion/banner/7.jpg": {
    "type": "image/jpeg",
    "etag": "\"1020-/REHXQX9itPxfpP0v/7qF354GT4\"",
    "mtime": "2022-03-29T06:37:23.000Z",
    "size": 4128,
    "path": "../public/images/fashion/banner/7.jpg"
  },
  "/images/fashion/banner/8.jpg": {
    "type": "image/jpeg",
    "etag": "\"69c7-anQurmAXesqciU7ib3wmYokOZM0\"",
    "mtime": "2022-03-29T06:37:23.000Z",
    "size": 27079,
    "path": "../public/images/fashion/banner/8.jpg"
  },
  "/images/fashion/category/1.jpg": {
    "type": "image/jpeg",
    "etag": "\"cbd-/1XvZ5BIWODoTUSdHlFylVObDpA\"",
    "mtime": "2022-03-29T06:37:23.000Z",
    "size": 3261,
    "path": "../public/images/fashion/category/1.jpg"
  },
  "/images/fashion/category/10.jpg": {
    "type": "image/jpeg",
    "etag": "\"b6d-KTH0JP/aupX1F1lRFl4uBl2PNns\"",
    "mtime": "2022-03-29T06:37:23.000Z",
    "size": 2925,
    "path": "../public/images/fashion/category/10.jpg"
  },
  "/images/fashion/category/11.jpg": {
    "type": "image/jpeg",
    "etag": "\"b6d-KTH0JP/aupX1F1lRFl4uBl2PNns\"",
    "mtime": "2022-03-29T06:37:23.000Z",
    "size": 2925,
    "path": "../public/images/fashion/category/11.jpg"
  },
  "/images/fashion/category/12.jpg": {
    "type": "image/jpeg",
    "etag": "\"b6d-KTH0JP/aupX1F1lRFl4uBl2PNns\"",
    "mtime": "2022-03-29T06:37:23.000Z",
    "size": 2925,
    "path": "../public/images/fashion/category/12.jpg"
  },
  "/images/fashion/category/2.jpg": {
    "type": "image/jpeg",
    "etag": "\"cbd-/1XvZ5BIWODoTUSdHlFylVObDpA\"",
    "mtime": "2022-03-29T06:37:23.000Z",
    "size": 3261,
    "path": "../public/images/fashion/category/2.jpg"
  },
  "/images/fashion/category/3.jpg": {
    "type": "image/jpeg",
    "etag": "\"cbd-/1XvZ5BIWODoTUSdHlFylVObDpA\"",
    "mtime": "2022-03-29T06:37:23.000Z",
    "size": 3261,
    "path": "../public/images/fashion/category/3.jpg"
  },
  "/images/fashion/category/4.jpg": {
    "type": "image/jpeg",
    "etag": "\"cbd-/1XvZ5BIWODoTUSdHlFylVObDpA\"",
    "mtime": "2022-03-29T06:37:23.000Z",
    "size": 3261,
    "path": "../public/images/fashion/category/4.jpg"
  },
  "/images/fashion/category/5.jpg": {
    "type": "image/jpeg",
    "etag": "\"b6d-KTH0JP/aupX1F1lRFl4uBl2PNns\"",
    "mtime": "2022-03-29T06:37:23.000Z",
    "size": 2925,
    "path": "../public/images/fashion/category/5.jpg"
  },
  "/images/fashion/category/6.jpg": {
    "type": "image/jpeg",
    "etag": "\"b6d-KTH0JP/aupX1F1lRFl4uBl2PNns\"",
    "mtime": "2022-03-29T06:37:23.000Z",
    "size": 2925,
    "path": "../public/images/fashion/category/6.jpg"
  },
  "/images/fashion/category/7.jpg": {
    "type": "image/jpeg",
    "etag": "\"b6d-KTH0JP/aupX1F1lRFl4uBl2PNns\"",
    "mtime": "2022-03-29T06:37:23.000Z",
    "size": 2925,
    "path": "../public/images/fashion/category/7.jpg"
  },
  "/images/fashion/category/8.jpg": {
    "type": "image/jpeg",
    "etag": "\"b6d-KTH0JP/aupX1F1lRFl4uBl2PNns\"",
    "mtime": "2022-03-29T06:37:23.000Z",
    "size": 2925,
    "path": "../public/images/fashion/category/8.jpg"
  },
  "/images/fashion/category/9.jpg": {
    "type": "image/jpeg",
    "etag": "\"b6d-KTH0JP/aupX1F1lRFl4uBl2PNns\"",
    "mtime": "2022-03-29T06:37:23.000Z",
    "size": 2925,
    "path": "../public/images/fashion/category/9.jpg"
  },
  "/images/fashion/instagram/1.jpg": {
    "type": "image/jpeg",
    "etag": "\"140f-l2TGISR3iayro5gKcya5ABXKWzQ\"",
    "mtime": "2022-03-29T06:37:23.000Z",
    "size": 5135,
    "path": "../public/images/fashion/instagram/1.jpg"
  },
  "/images/fashion/instagram/2.jpg": {
    "type": "image/jpeg",
    "etag": "\"140f-l2TGISR3iayro5gKcya5ABXKWzQ\"",
    "mtime": "2022-03-29T06:37:23.000Z",
    "size": 5135,
    "path": "../public/images/fashion/instagram/2.jpg"
  },
  "/images/fashion/instagram/3.jpg": {
    "type": "image/jpeg",
    "etag": "\"140f-l2TGISR3iayro5gKcya5ABXKWzQ\"",
    "mtime": "2022-03-29T06:37:23.000Z",
    "size": 5135,
    "path": "../public/images/fashion/instagram/3.jpg"
  },
  "/images/fashion/instagram/4.jpg": {
    "type": "image/jpeg",
    "etag": "\"140f-l2TGISR3iayro5gKcya5ABXKWzQ\"",
    "mtime": "2022-03-29T06:37:23.000Z",
    "size": 5135,
    "path": "../public/images/fashion/instagram/4.jpg"
  },
  "/images/fashion/instagram/5.jpg": {
    "type": "image/jpeg",
    "etag": "\"140f-l2TGISR3iayro5gKcya5ABXKWzQ\"",
    "mtime": "2022-03-29T06:37:23.000Z",
    "size": 5135,
    "path": "../public/images/fashion/instagram/5.jpg"
  },
  "/images/fashion/slider/1.jpg": {
    "type": "image/jpeg",
    "etag": "\"72be-ZAZy+q9azBMu5Y5UIVxC5SN+aCM\"",
    "mtime": "2022-03-29T06:37:23.000Z",
    "size": 29374,
    "path": "../public/images/fashion/slider/1.jpg"
  },
  "/images/fashion/slider/2.jpg": {
    "type": "image/jpeg",
    "etag": "\"72be-ZAZy+q9azBMu5Y5UIVxC5SN+aCM\"",
    "mtime": "2022-03-29T06:37:23.000Z",
    "size": 29374,
    "path": "../public/images/fashion/slider/2.jpg"
  },
  "/images/furniture-images/banner/1.jpg": {
    "type": "image/jpeg",
    "etag": "\"2074-jrWE/qp9+fcm9IuwYu/tUHaNIdw\"",
    "mtime": "2022-03-29T06:37:23.000Z",
    "size": 8308,
    "path": "../public/images/furniture-images/banner/1.jpg"
  },
  "/images/furniture-images/banner/2.jpg": {
    "type": "image/jpeg",
    "etag": "\"2074-jrWE/qp9+fcm9IuwYu/tUHaNIdw\"",
    "mtime": "2022-03-29T06:37:23.000Z",
    "size": 8308,
    "path": "../public/images/furniture-images/banner/2.jpg"
  },
  "/images/furniture-images/banner/3.jpg": {
    "type": "image/jpeg",
    "etag": "\"2074-jrWE/qp9+fcm9IuwYu/tUHaNIdw\"",
    "mtime": "2022-03-29T06:37:23.000Z",
    "size": 8308,
    "path": "../public/images/furniture-images/banner/3.jpg"
  },
  "/images/furniture-images/new-arrival/1.jpg": {
    "type": "image/jpeg",
    "etag": "\"1400-Xkb5aJg2Cg8lSCSMsk8iTgxDJF0\"",
    "mtime": "2022-03-29T06:37:23.000Z",
    "size": 5120,
    "path": "../public/images/furniture-images/new-arrival/1.jpg"
  },
  "/images/furniture-images/new-arrival/2.jpg": {
    "type": "image/jpeg",
    "etag": "\"1400-Xkb5aJg2Cg8lSCSMsk8iTgxDJF0\"",
    "mtime": "2022-03-29T06:37:23.000Z",
    "size": 5120,
    "path": "../public/images/furniture-images/new-arrival/2.jpg"
  },
  "/images/furniture-images/new-arrival/3.jpg": {
    "type": "image/jpeg",
    "etag": "\"1400-Xkb5aJg2Cg8lSCSMsk8iTgxDJF0\"",
    "mtime": "2022-03-29T06:37:23.000Z",
    "size": 5120,
    "path": "../public/images/furniture-images/new-arrival/3.jpg"
  },
  "/images/furniture-images/new-arrival/4.jpg": {
    "type": "image/jpeg",
    "etag": "\"1400-Xkb5aJg2Cg8lSCSMsk8iTgxDJF0\"",
    "mtime": "2022-03-29T06:37:23.000Z",
    "size": 5120,
    "path": "../public/images/furniture-images/new-arrival/4.jpg"
  },
  "/images/furniture-images/new-arrival/5.jpg": {
    "type": "image/jpeg",
    "etag": "\"1400-Xkb5aJg2Cg8lSCSMsk8iTgxDJF0\"",
    "mtime": "2022-03-29T06:37:23.000Z",
    "size": 5120,
    "path": "../public/images/furniture-images/new-arrival/5.jpg"
  },
  "/images/furniture-images/new-arrival/6.jpg": {
    "type": "image/jpeg",
    "etag": "\"1400-Xkb5aJg2Cg8lSCSMsk8iTgxDJF0\"",
    "mtime": "2022-03-29T06:37:23.000Z",
    "size": 5120,
    "path": "../public/images/furniture-images/new-arrival/6.jpg"
  },
  "/images/furniture-images/new-arrival/7.jpg": {
    "type": "image/jpeg",
    "etag": "\"1400-Xkb5aJg2Cg8lSCSMsk8iTgxDJF0\"",
    "mtime": "2022-03-29T06:37:23.000Z",
    "size": 5120,
    "path": "../public/images/furniture-images/new-arrival/7.jpg"
  },
  "/images/furniture-images/new-arrival/8.jpg": {
    "type": "image/jpeg",
    "etag": "\"1400-Xkb5aJg2Cg8lSCSMsk8iTgxDJF0\"",
    "mtime": "2022-03-29T06:37:23.000Z",
    "size": 5120,
    "path": "../public/images/furniture-images/new-arrival/8.jpg"
  },
  "/images/furniture-images/new-arrival/9.jpg": {
    "type": "image/jpeg",
    "etag": "\"1400-Xkb5aJg2Cg8lSCSMsk8iTgxDJF0\"",
    "mtime": "2022-03-29T06:37:23.000Z",
    "size": 5120,
    "path": "../public/images/furniture-images/new-arrival/9.jpg"
  },
  "/images/furniture-images/new-arrival/circle.png": {
    "type": "image/png",
    "etag": "\"cff-MMjvNf2USum+jHmQ5Wlo/BOQL5c\"",
    "mtime": "2022-03-29T06:37:23.000Z",
    "size": 3327,
    "path": "../public/images/furniture-images/new-arrival/circle.png"
  },
  "/images/furniture-images/deal/1.png": {
    "type": "image/png",
    "etag": "\"746c3-qNUa+5hSXaL8coSJC/pCL9NwXFQ\"",
    "mtime": "2022-03-29T06:37:23.000Z",
    "size": 476867,
    "path": "../public/images/furniture-images/deal/1.png"
  },
  "/images/furniture-images/poster/1.png": {
    "type": "image/png",
    "etag": "\"ed8f1-muggC5KMzOGdEqms9sguGiNHwkQ\"",
    "mtime": "2022-03-29T06:37:23.000Z",
    "size": 973041,
    "path": "../public/images/furniture-images/poster/1.png"
  },
  "/images/furniture-images/poster/2.png": {
    "type": "image/png",
    "etag": "\"4bd69-95DkTPRRuszpGc/jt0Zj6NrSnp0\"",
    "mtime": "2022-03-29T06:37:23.000Z",
    "size": 310633,
    "path": "../public/images/furniture-images/poster/2.png"
  },
  "/images/furniture-images/poster/3.png": {
    "type": "image/png",
    "etag": "\"176f7c-eTrYNvGJdi4XbrxQ9j98JV/Edfk\"",
    "mtime": "2022-03-29T06:37:23.000Z",
    "size": 1535868,
    "path": "../public/images/furniture-images/poster/3.png"
  },
  "/images/furniture-images/poster/back.jpg": {
    "type": "image/jpeg",
    "etag": "\"27889-SkR0MmS6VEVxj2QylzwCN2sOers\"",
    "mtime": "2022-03-29T06:37:23.000Z",
    "size": 161929,
    "path": "../public/images/furniture-images/poster/back.jpg"
  },
  "/images/furniture-images/poster/t1.jpg": {
    "type": "image/jpeg",
    "etag": "\"5a3-WLvTMPYvsnxRV8CflKZMhrXpUlM\"",
    "mtime": "2022-03-29T06:37:23.000Z",
    "size": 1443,
    "path": "../public/images/furniture-images/poster/t1.jpg"
  },
  "/images/furniture-images/poster/t2.jpg": {
    "type": "image/jpeg",
    "etag": "\"5a3-WLvTMPYvsnxRV8CflKZMhrXpUlM\"",
    "mtime": "2022-03-29T06:37:23.000Z",
    "size": 1443,
    "path": "../public/images/furniture-images/poster/t2.jpg"
  },
  "/images/furniture-images/poster/t3.jpg": {
    "type": "image/jpeg",
    "etag": "\"5a3-WLvTMPYvsnxRV8CflKZMhrXpUlM\"",
    "mtime": "2022-03-29T06:37:23.000Z",
    "size": 1443,
    "path": "../public/images/furniture-images/poster/t3.jpg"
  },
  "/images/furniture-images/product/1.jpg": {
    "type": "image/jpeg",
    "etag": "\"1811-FSC7QLXBNvCgyjDMvRIThD004+k\"",
    "mtime": "2022-03-29T06:37:23.000Z",
    "size": 6161,
    "path": "../public/images/furniture-images/product/1.jpg"
  },
  "/images/furniture-images/product/2.jpg": {
    "type": "image/jpeg",
    "etag": "\"1811-FSC7QLXBNvCgyjDMvRIThD004+k\"",
    "mtime": "2022-03-29T06:37:23.000Z",
    "size": 6161,
    "path": "../public/images/furniture-images/product/2.jpg"
  },
  "/images/furniture-images/product/3.jpg": {
    "type": "image/jpeg",
    "etag": "\"1811-FSC7QLXBNvCgyjDMvRIThD004+k\"",
    "mtime": "2022-03-29T06:37:23.000Z",
    "size": 6161,
    "path": "../public/images/furniture-images/product/3.jpg"
  },
  "/images/furniture-images/product/4.jpg": {
    "type": "image/jpeg",
    "etag": "\"1811-FSC7QLXBNvCgyjDMvRIThD004+k\"",
    "mtime": "2022-03-29T06:37:23.000Z",
    "size": 6161,
    "path": "../public/images/furniture-images/product/4.jpg"
  },
  "/images/furniture-images/product/5.jpg": {
    "type": "image/jpeg",
    "etag": "\"1811-FSC7QLXBNvCgyjDMvRIThD004+k\"",
    "mtime": "2022-03-29T06:37:23.000Z",
    "size": 6161,
    "path": "../public/images/furniture-images/product/5.jpg"
  },
  "/images/furniture-images/product/6.jpg": {
    "type": "image/jpeg",
    "etag": "\"1811-FSC7QLXBNvCgyjDMvRIThD004+k\"",
    "mtime": "2022-03-29T06:37:23.000Z",
    "size": 6161,
    "path": "../public/images/furniture-images/product/6.jpg"
  },
  "/images/furniture-images/product/7.jpg": {
    "type": "image/jpeg",
    "etag": "\"1811-FSC7QLXBNvCgyjDMvRIThD004+k\"",
    "mtime": "2022-03-29T06:37:23.000Z",
    "size": 6161,
    "path": "../public/images/furniture-images/product/7.jpg"
  },
  "/images/furniture-images/product/8.jpg": {
    "type": "image/jpeg",
    "etag": "\"1811-FSC7QLXBNvCgyjDMvRIThD004+k\"",
    "mtime": "2022-03-29T06:37:23.000Z",
    "size": 6161,
    "path": "../public/images/furniture-images/product/8.jpg"
  },
  "/images/furniture-images/shop/1.png": {
    "type": "image/png",
    "etag": "\"15aa7-cGRIne0BhoMXElduM2nh3cV+j/c\"",
    "mtime": "2022-03-29T06:37:23.000Z",
    "size": 88743,
    "path": "../public/images/furniture-images/shop/1.png"
  },
  "/images/furniture-images/shop/2.png": {
    "type": "image/png",
    "etag": "\"24977-5VPnfvg7as3n+VKt8lBjcgEV2f8\"",
    "mtime": "2022-03-29T06:37:23.000Z",
    "size": 149879,
    "path": "../public/images/furniture-images/shop/2.png"
  },
  "/images/furniture-images/shop/3.png": {
    "type": "image/png",
    "etag": "\"4b6c1-A/WRLM2xtO6RPhlwaMdyKvZ+JX4\"",
    "mtime": "2022-03-29T06:37:23.000Z",
    "size": 308929,
    "path": "../public/images/furniture-images/shop/3.png"
  },
  "/images/furniture-images/shop/4.png": {
    "type": "image/png",
    "etag": "\"bf40-PFNLjvoLrB42Al438GVKq9kfyLs\"",
    "mtime": "2022-03-29T06:37:23.000Z",
    "size": 48960,
    "path": "../public/images/furniture-images/shop/4.png"
  },
  "/images/furniture-images/slider/1.jpg": {
    "type": "image/jpeg",
    "etag": "\"6ce-VJe3xxQQrFjvC+B7zVA7m5zA4hE\"",
    "mtime": "2022-03-29T06:37:23.000Z",
    "size": 1742,
    "path": "../public/images/furniture-images/slider/1.jpg"
  },
  "/images/furniture-images/slider/2.jpg": {
    "type": "image/jpeg",
    "etag": "\"6ce-VJe3xxQQrFjvC+B7zVA7m5zA4hE\"",
    "mtime": "2022-03-29T06:37:23.000Z",
    "size": 1742,
    "path": "../public/images/furniture-images/slider/2.jpg"
  },
  "/images/furniture-images/slider/3.jpg": {
    "type": "image/jpeg",
    "etag": "\"6ce-VJe3xxQQrFjvC+B7zVA7m5zA4hE\"",
    "mtime": "2022-03-29T06:37:23.000Z",
    "size": 1742,
    "path": "../public/images/furniture-images/slider/3.jpg"
  },
  "/images/furniture-images/slider/4.jpg": {
    "type": "image/jpeg",
    "etag": "\"6ce-VJe3xxQQrFjvC+B7zVA7m5zA4hE\"",
    "mtime": "2022-03-29T06:37:23.000Z",
    "size": 1742,
    "path": "../public/images/furniture-images/slider/4.jpg"
  },
  "/images/furniture-images/slider/5.jpg": {
    "type": "image/jpeg",
    "etag": "\"6ce-VJe3xxQQrFjvC+B7zVA7m5zA4hE\"",
    "mtime": "2022-03-29T06:37:23.000Z",
    "size": 1742,
    "path": "../public/images/furniture-images/slider/5.jpg"
  },
  "/images/furniture-images/slider/6.jpg": {
    "type": "image/jpeg",
    "etag": "\"6ce-VJe3xxQQrFjvC+B7zVA7m5zA4hE\"",
    "mtime": "2022-03-29T06:37:23.000Z",
    "size": 1742,
    "path": "../public/images/furniture-images/slider/6.jpg"
  },
  "/images/furniture-images/slider/7.jpg": {
    "type": "image/jpeg",
    "etag": "\"6ce-VJe3xxQQrFjvC+B7zVA7m5zA4hE\"",
    "mtime": "2022-03-29T06:37:23.000Z",
    "size": 1742,
    "path": "../public/images/furniture-images/slider/7.jpg"
  },
  "/images/furniture-images/slider/8.jpg": {
    "type": "image/jpeg",
    "etag": "\"6ce-VJe3xxQQrFjvC+B7zVA7m5zA4hE\"",
    "mtime": "2022-03-29T06:37:23.000Z",
    "size": 1742,
    "path": "../public/images/furniture-images/slider/8.jpg"
  },
  "/images/furniture-images/special-offer/1.png": {
    "type": "image/png",
    "etag": "\"121-td8PVv/G9u3FgWH0J0bVNl1jdrk\"",
    "mtime": "2022-03-29T06:37:23.000Z",
    "size": 289,
    "path": "../public/images/furniture-images/special-offer/1.png"
  },
  "/images/furniture-images/special-offer/2.png": {
    "type": "image/png",
    "etag": "\"1ce-zIP1FSBItsSwdbEuyr9gUAbhhGs\"",
    "mtime": "2022-03-29T06:37:23.000Z",
    "size": 462,
    "path": "../public/images/furniture-images/special-offer/2.png"
  },
  "/images/furniture-images/special-offer/3.png": {
    "type": "image/png",
    "etag": "\"1ce-zIP1FSBItsSwdbEuyr9gUAbhhGs\"",
    "mtime": "2022-03-29T06:37:23.000Z",
    "size": 462,
    "path": "../public/images/furniture-images/special-offer/3.png"
  },
  "/images/furniture-images/special-offer/4.png": {
    "type": "image/png",
    "etag": "\"1ce-zIP1FSBItsSwdbEuyr9gUAbhhGs\"",
    "mtime": "2022-03-29T06:37:23.000Z",
    "size": 462,
    "path": "../public/images/furniture-images/special-offer/4.png"
  },
  "/images/furniture-images/special-offer/5.png": {
    "type": "image/png",
    "etag": "\"322-UGxvZiBQ+tPG6vm1PrsAANPjMX0\"",
    "mtime": "2022-03-29T06:37:23.000Z",
    "size": 802,
    "path": "../public/images/furniture-images/special-offer/5.png"
  },
  "/images/furniture-images/special-offer/6.png": {
    "type": "image/png",
    "etag": "\"314-LyaGm4axlX3a18qPxCDNPYd6WrM\"",
    "mtime": "2022-03-29T06:37:23.000Z",
    "size": 788,
    "path": "../public/images/furniture-images/special-offer/6.png"
  },
  "/images/furniture-images/special-offer/a1.png": {
    "type": "image/png",
    "etag": "\"632-CxZFjra8FTO7NiurHyKFIflJjco\"",
    "mtime": "2022-03-29T06:37:23.000Z",
    "size": 1586,
    "path": "../public/images/furniture-images/special-offer/a1.png"
  },
  "/images/flower/banner/1.jpg": {
    "type": "image/jpeg",
    "etag": "\"dc2f-uvFKcL0bvEnjmuPBXTYkeMD1akY\"",
    "mtime": "2022-03-29T06:37:23.000Z",
    "size": 56367,
    "path": "../public/images/flower/banner/1.jpg"
  },
  "/images/flower/banner/2.jpg": {
    "type": "image/jpeg",
    "etag": "\"dc2f-uvFKcL0bvEnjmuPBXTYkeMD1akY\"",
    "mtime": "2022-03-29T06:37:23.000Z",
    "size": 56367,
    "path": "../public/images/flower/banner/2.jpg"
  },
  "/images/flower/banner/3.jpg": {
    "type": "image/jpeg",
    "etag": "\"dc2f-uvFKcL0bvEnjmuPBXTYkeMD1akY\"",
    "mtime": "2022-03-29T06:37:23.000Z",
    "size": 56367,
    "path": "../public/images/flower/banner/3.jpg"
  },
  "/images/flower/categories/1.jpg": {
    "type": "image/jpeg",
    "etag": "\"cbd-/1XvZ5BIWODoTUSdHlFylVObDpA\"",
    "mtime": "2022-03-29T06:37:23.000Z",
    "size": 3261,
    "path": "../public/images/flower/categories/1.jpg"
  },
  "/images/flower/categories/2.jpg": {
    "type": "image/jpeg",
    "etag": "\"cbd-/1XvZ5BIWODoTUSdHlFylVObDpA\"",
    "mtime": "2022-03-29T06:37:23.000Z",
    "size": 3261,
    "path": "../public/images/flower/categories/2.jpg"
  },
  "/images/flower/categories/3.jpg": {
    "type": "image/jpeg",
    "etag": "\"cbd-/1XvZ5BIWODoTUSdHlFylVObDpA\"",
    "mtime": "2022-03-29T06:37:23.000Z",
    "size": 3261,
    "path": "../public/images/flower/categories/3.jpg"
  },
  "/images/flower/categories/4.jpg": {
    "type": "image/jpeg",
    "etag": "\"cbd-/1XvZ5BIWODoTUSdHlFylVObDpA\"",
    "mtime": "2022-03-29T06:37:23.000Z",
    "size": 3261,
    "path": "../public/images/flower/categories/4.jpg"
  },
  "/images/flower/new/1.jpg": {
    "type": "image/jpeg",
    "etag": "\"5d9c-S/5PsBoxmpd8+i8gTtK/LYcZp/g\"",
    "mtime": "2022-03-29T06:37:23.000Z",
    "size": 23964,
    "path": "../public/images/flower/new/1.jpg"
  },
  "/images/flower/new/2.jpg": {
    "type": "image/jpeg",
    "etag": "\"5d9c-S/5PsBoxmpd8+i8gTtK/LYcZp/g\"",
    "mtime": "2022-03-29T06:37:23.000Z",
    "size": 23964,
    "path": "../public/images/flower/new/2.jpg"
  },
  "/images/flower/new/3.jpg": {
    "type": "image/jpeg",
    "etag": "\"5d9c-S/5PsBoxmpd8+i8gTtK/LYcZp/g\"",
    "mtime": "2022-03-29T06:37:23.000Z",
    "size": 23964,
    "path": "../public/images/flower/new/3.jpg"
  },
  "/images/flower/offer/1.jpg": {
    "type": "image/jpeg",
    "etag": "\"206b-4iTR+JtX9PjcvXj6x/l+5xrzG8Y\"",
    "mtime": "2022-03-29T06:37:23.000Z",
    "size": 8299,
    "path": "../public/images/flower/offer/1.jpg"
  },
  "/images/flower/offer/2.jpg": {
    "type": "image/jpeg",
    "etag": "\"1019-daVzdUxuJCTYHSzmHIsM8JOMWrY\"",
    "mtime": "2022-03-29T06:37:23.000Z",
    "size": 4121,
    "path": "../public/images/flower/offer/2.jpg"
  },
  "/images/flower/offer/3.jpg": {
    "type": "image/jpeg",
    "etag": "\"1019-daVzdUxuJCTYHSzmHIsM8JOMWrY\"",
    "mtime": "2022-03-29T06:37:23.000Z",
    "size": 4121,
    "path": "../public/images/flower/offer/3.jpg"
  },
  "/images/flower/offer/big.jpg": {
    "type": "image/jpeg",
    "etag": "\"2d32-Dol1RBv7Ad8eMex1raCQkpULTgA\"",
    "mtime": "2022-03-29T06:37:23.000Z",
    "size": 11570,
    "path": "../public/images/flower/offer/big.jpg"
  },
  "/images/flower/offer-1/1.png": {
    "type": "image/png",
    "etag": "\"ecc4e-rimzKg9lOjpMUr19tZr0Pm4Gjk8\"",
    "mtime": "2022-03-29T06:37:23.000Z",
    "size": 969806,
    "path": "../public/images/flower/offer-1/1.png"
  },
  "/images/flower/offer-1/2.png": {
    "type": "image/png",
    "etag": "\"67cfe-wy/n2lg66TkKlJZ0lkzjUnBcru4\"",
    "mtime": "2022-03-29T06:37:23.000Z",
    "size": 425214,
    "path": "../public/images/flower/offer-1/2.png"
  },
  "/images/flower/popular/1.jpg": {
    "type": "image/jpeg",
    "etag": "\"114d-MNZvefQRncRPfCwAt96drpJLGQ0\"",
    "mtime": "2022-03-29T06:37:23.000Z",
    "size": 4429,
    "path": "../public/images/flower/popular/1.jpg"
  },
  "/images/flower/popular/2.jpg": {
    "type": "image/jpeg",
    "etag": "\"114d-MNZvefQRncRPfCwAt96drpJLGQ0\"",
    "mtime": "2022-03-29T06:37:23.000Z",
    "size": 4429,
    "path": "../public/images/flower/popular/2.jpg"
  },
  "/images/flower/popular/3.jpg": {
    "type": "image/jpeg",
    "etag": "\"114d-MNZvefQRncRPfCwAt96drpJLGQ0\"",
    "mtime": "2022-03-29T06:37:23.000Z",
    "size": 4429,
    "path": "../public/images/flower/popular/3.jpg"
  },
  "/images/flower/popular/a1.jpg": {
    "type": "image/jpeg",
    "etag": "\"8883-E7n0V++QdqfXeDMQ4Pa/F7LAN6Q\"",
    "mtime": "2022-03-29T06:37:23.000Z",
    "size": 34947,
    "path": "../public/images/flower/popular/a1.jpg"
  },
  "/images/flower/popular/a2.jpg": {
    "type": "image/jpeg",
    "etag": "\"289b-tmvMoSRbel8MMMh3gtSi6Y6vmHM\"",
    "mtime": "2022-03-29T06:37:23.000Z",
    "size": 10395,
    "path": "../public/images/flower/popular/a2.jpg"
  },
  "/images/flower/popular/a3.jpg": {
    "type": "image/jpeg",
    "etag": "\"1f55-yG17qdlN5Gf0wNdvba+QqHE6feg\"",
    "mtime": "2022-03-29T06:37:23.000Z",
    "size": 8021,
    "path": "../public/images/flower/popular/a3.jpg"
  },
  "/images/flower/popular/a4.jpg": {
    "type": "image/jpeg",
    "etag": "\"5c9e-JCuYbiHTUWuquHVidwHTCmp+Ns8\"",
    "mtime": "2022-03-29T06:37:23.000Z",
    "size": 23710,
    "path": "../public/images/flower/popular/a4.jpg"
  },
  "/images/flower/popular/a5.jpg": {
    "type": "image/jpeg",
    "etag": "\"7fd2-56m+xq90Lpnk2IL0kfW3cvuZvWY\"",
    "mtime": "2022-03-29T06:37:23.000Z",
    "size": 32722,
    "path": "../public/images/flower/popular/a5.jpg"
  },
  "/images/flower/poster/1.png": {
    "type": "image/png",
    "etag": "\"efbaa-GfNc5KSgws0hlGmymPXEDIR9shQ\"",
    "mtime": "2022-03-29T06:37:23.000Z",
    "size": 981930,
    "path": "../public/images/flower/poster/1.png"
  },
  "/images/flower/poster/2.png": {
    "type": "image/png",
    "etag": "\"6e31f-4UaBtwcMdO03F2MIQIM2MwQNBq8\"",
    "mtime": "2022-03-29T06:37:23.000Z",
    "size": 451359,
    "path": "../public/images/flower/poster/2.png"
  },
  "/images/flower/poster/a1.png": {
    "type": "image/png",
    "etag": "\"4c61c-Wu8tZaKpp52olF+YlaSMOMhaCgg\"",
    "mtime": "2022-03-29T06:37:23.000Z",
    "size": 312860,
    "path": "../public/images/flower/poster/a1.png"
  },
  "/images/flower/poster/t1.jpg": {
    "type": "image/jpeg",
    "etag": "\"5b1-dQqtp1xz4kc3dG7K94ts4kRZN+k\"",
    "mtime": "2022-03-29T06:37:23.000Z",
    "size": 1457,
    "path": "../public/images/flower/poster/t1.jpg"
  },
  "/images/flower/poster/t2.jpg": {
    "type": "image/jpeg",
    "etag": "\"5b1-dQqtp1xz4kc3dG7K94ts4kRZN+k\"",
    "mtime": "2022-03-29T06:37:23.000Z",
    "size": 1457,
    "path": "../public/images/flower/poster/t2.jpg"
  },
  "/images/flower/product/1.jpg": {
    "type": "image/jpeg",
    "etag": "\"1479-hYsoU3Xbv9LFQS12wTIwplXCP4A\"",
    "mtime": "2022-03-29T06:37:23.000Z",
    "size": 5241,
    "path": "../public/images/flower/product/1.jpg"
  },
  "/images/flower/product/2.jpg": {
    "type": "image/jpeg",
    "etag": "\"1479-hYsoU3Xbv9LFQS12wTIwplXCP4A\"",
    "mtime": "2022-03-29T06:37:23.000Z",
    "size": 5241,
    "path": "../public/images/flower/product/2.jpg"
  },
  "/images/flower/product/3.jpg": {
    "type": "image/jpeg",
    "etag": "\"1479-hYsoU3Xbv9LFQS12wTIwplXCP4A\"",
    "mtime": "2022-03-29T06:37:23.000Z",
    "size": 5241,
    "path": "../public/images/flower/product/3.jpg"
  },
  "/images/flower/product/4.jpg": {
    "type": "image/jpeg",
    "etag": "\"1479-hYsoU3Xbv9LFQS12wTIwplXCP4A\"",
    "mtime": "2022-03-29T06:37:23.000Z",
    "size": 5241,
    "path": "../public/images/flower/product/4.jpg"
  },
  "/images/flower/product/5.jpg": {
    "type": "image/jpeg",
    "etag": "\"1479-hYsoU3Xbv9LFQS12wTIwplXCP4A\"",
    "mtime": "2022-03-29T06:37:23.000Z",
    "size": 5241,
    "path": "../public/images/flower/product/5.jpg"
  },
  "/images/inner-page/faq/community.png": {
    "type": "image/png",
    "etag": "\"7793-6LINYAHMznHOJvAhPrNNn/7kXWk\"",
    "mtime": "2022-03-29T06:37:23.000Z",
    "size": 30611,
    "path": "../public/images/inner-page/faq/community.png"
  },
  "/images/inner-page/faq/faq.png": {
    "type": "image/png",
    "etag": "\"2811-+W5r/3Iqt1klFzN2kPL/bikioMQ\"",
    "mtime": "2022-03-29T06:37:23.000Z",
    "size": 10257,
    "path": "../public/images/inner-page/faq/faq.png"
  },
  "/images/inner-page/faq/guides.png": {
    "type": "image/png",
    "etag": "\"23511-cqicpZg0nVeiHTp4ksFudqgPToM\"",
    "mtime": "2022-03-29T06:37:23.000Z",
    "size": 144657,
    "path": "../public/images/inner-page/faq/guides.png"
  },
  "/images/inner-page/product/1.jpg": {
    "type": "image/jpeg",
    "etag": "\"4cdc-Mihf54Dibtq7A+KjEm19kENM2A8\"",
    "mtime": "2022-03-29T06:37:23.000Z",
    "size": 19676,
    "path": "../public/images/inner-page/product/1.jpg"
  },
  "/images/inner-page/product/10.jpg": {
    "type": "image/jpeg",
    "etag": "\"5f1e-HT5vqOruXpVGyoPAJdhzioVxWfs\"",
    "mtime": "2022-03-29T06:37:23.000Z",
    "size": 24350,
    "path": "../public/images/inner-page/product/10.jpg"
  },
  "/images/inner-page/product/11.jpg": {
    "type": "image/jpeg",
    "etag": "\"5f1e-HT5vqOruXpVGyoPAJdhzioVxWfs\"",
    "mtime": "2022-03-29T06:37:23.000Z",
    "size": 24350,
    "path": "../public/images/inner-page/product/11.jpg"
  },
  "/images/inner-page/product/12.jpg": {
    "type": "image/jpeg",
    "etag": "\"5f1e-HT5vqOruXpVGyoPAJdhzioVxWfs\"",
    "mtime": "2022-03-29T06:37:23.000Z",
    "size": 24350,
    "path": "../public/images/inner-page/product/12.jpg"
  },
  "/images/inner-page/product/13.jpg": {
    "type": "image/jpeg",
    "etag": "\"48d8-3l7pNqyPo7SwIJDRtNpTYaBLUZU\"",
    "mtime": "2022-03-29T06:37:23.000Z",
    "size": 18648,
    "path": "../public/images/inner-page/product/13.jpg"
  },
  "/images/inner-page/product/14.jpg": {
    "type": "image/jpeg",
    "etag": "\"48d8-3l7pNqyPo7SwIJDRtNpTYaBLUZU\"",
    "mtime": "2022-03-29T06:37:23.000Z",
    "size": 18648,
    "path": "../public/images/inner-page/product/14.jpg"
  },
  "/images/inner-page/product/15.jpg": {
    "type": "image/jpeg",
    "etag": "\"48d8-3l7pNqyPo7SwIJDRtNpTYaBLUZU\"",
    "mtime": "2022-03-29T06:37:23.000Z",
    "size": 18648,
    "path": "../public/images/inner-page/product/15.jpg"
  },
  "/images/inner-page/product/16.jpg": {
    "type": "image/jpeg",
    "etag": "\"48d8-3l7pNqyPo7SwIJDRtNpTYaBLUZU\"",
    "mtime": "2022-03-29T06:37:23.000Z",
    "size": 18648,
    "path": "../public/images/inner-page/product/16.jpg"
  },
  "/images/inner-page/product/17.jpg": {
    "type": "image/jpeg",
    "etag": "\"9169-okqS0Fkv9riyV8L+9uOcaWuyR5o\"",
    "mtime": "2022-03-29T06:37:23.000Z",
    "size": 37225,
    "path": "../public/images/inner-page/product/17.jpg"
  },
  "/images/inner-page/product/18.jpg": {
    "type": "image/jpeg",
    "etag": "\"48d8-3l7pNqyPo7SwIJDRtNpTYaBLUZU\"",
    "mtime": "2022-03-29T06:37:23.000Z",
    "size": 18648,
    "path": "../public/images/inner-page/product/18.jpg"
  },
  "/images/inner-page/product/19.jpg": {
    "type": "image/jpeg",
    "etag": "\"46a0-8+/qvIJJdSF5NC9oFPoU342WTi0\"",
    "mtime": "2022-03-29T06:37:23.000Z",
    "size": 18080,
    "path": "../public/images/inner-page/product/19.jpg"
  },
  "/images/inner-page/product/2.jpg": {
    "type": "image/jpeg",
    "etag": "\"6f87-kdr81oG+3ASdNjL71UOCPFYk5qs\"",
    "mtime": "2022-03-29T06:37:23.000Z",
    "size": 28551,
    "path": "../public/images/inner-page/product/2.jpg"
  },
  "/images/inner-page/product/20.jpg": {
    "type": "image/jpeg",
    "etag": "\"613a-HxxX3q8JOIxmDA0DrQZJttXCXn0\"",
    "mtime": "2022-03-29T06:37:23.000Z",
    "size": 24890,
    "path": "../public/images/inner-page/product/20.jpg"
  },
  "/images/inner-page/product/21.jpg": {
    "type": "image/jpeg",
    "etag": "\"613a-HxxX3q8JOIxmDA0DrQZJttXCXn0\"",
    "mtime": "2022-03-29T06:37:23.000Z",
    "size": 24890,
    "path": "../public/images/inner-page/product/21.jpg"
  },
  "/images/inner-page/product/3.jpg": {
    "type": "image/jpeg",
    "etag": "\"2f79-OQV93k8F+emiWKaEI7n7ztTLshE\"",
    "mtime": "2022-03-29T06:37:23.000Z",
    "size": 12153,
    "path": "../public/images/inner-page/product/3.jpg"
  },
  "/images/inner-page/product/4.jpg": {
    "type": "image/jpeg",
    "etag": "\"3486-0j0yHKrccZWhRFUdgkmVqIW5C5E\"",
    "mtime": "2022-03-29T06:37:23.000Z",
    "size": 13446,
    "path": "../public/images/inner-page/product/4.jpg"
  },
  "/images/inner-page/product/5.jpg": {
    "type": "image/jpeg",
    "etag": "\"31f4-h5xE+AKVNBqe5d2gwpfXiY/Y+a8\"",
    "mtime": "2022-03-29T06:37:23.000Z",
    "size": 12788,
    "path": "../public/images/inner-page/product/5.jpg"
  },
  "/images/inner-page/product/6.jpg": {
    "type": "image/jpeg",
    "etag": "\"2f6c-tRYSF1tyGzN0KEj5dfjckAv5/+8\"",
    "mtime": "2022-03-29T06:37:23.000Z",
    "size": 12140,
    "path": "../public/images/inner-page/product/6.jpg"
  },
  "/images/inner-page/product/7.jpg": {
    "type": "image/jpeg",
    "etag": "\"5605-5HSl7saOnv7UnLTFpYaXdaTXGD0\"",
    "mtime": "2022-03-29T06:37:23.000Z",
    "size": 22021,
    "path": "../public/images/inner-page/product/7.jpg"
  },
  "/images/inner-page/product/8.jpg": {
    "type": "image/jpeg",
    "etag": "\"3451-/Dpbd4LEn/kWCrtStreoEvEFSeI\"",
    "mtime": "2022-03-29T06:37:23.000Z",
    "size": 13393,
    "path": "../public/images/inner-page/product/8.jpg"
  },
  "/images/inner-page/product/9.jpg": {
    "type": "image/jpeg",
    "etag": "\"6c81-iQG0tMNMksit+/mhuTRW6puMLFc\"",
    "mtime": "2022-03-29T06:37:23.000Z",
    "size": 27777,
    "path": "../public/images/inner-page/product/9.jpg"
  },
  "/images/inner-page/review-image/1.jpg": {
    "type": "image/jpeg",
    "etag": "\"18bca1-GW+rNE8/s4TE2a6PtaMGrb+ql+I\"",
    "mtime": "2022-03-29T06:37:23.000Z",
    "size": 1621153,
    "path": "../public/images/inner-page/review-image/1.jpg"
  },
  "/images/inner-page/review-image/2.jpg": {
    "type": "image/jpeg",
    "etag": "\"20e75e-Ar1dq5k2B5M8BvffLeo5ZoaVlZQ\"",
    "mtime": "2022-03-29T06:37:23.000Z",
    "size": 2156382,
    "path": "../public/images/inner-page/review-image/2.jpg"
  },
  "/images/inner-page/review-image/3.jpg": {
    "type": "image/jpeg",
    "etag": "\"255918-oTaNJZ1jXyMr3rxm9az99LBJJUk\"",
    "mtime": "2022-03-29T06:37:23.000Z",
    "size": 2447640,
    "path": "../public/images/inner-page/review-image/3.jpg"
  },
  "/images/inner-page/review-image/4.jpg": {
    "type": "image/jpeg",
    "etag": "\"1caa55-hHj+46DVw5h8qptDimMWnf4M9vw\"",
    "mtime": "2022-03-29T06:37:23.000Z",
    "size": 1878613,
    "path": "../public/images/inner-page/review-image/4.jpg"
  },
  "/images/inner-page/review-image/5.jpg": {
    "type": "image/jpeg",
    "etag": "\"17eb5e-EK2E3mh+5QuozrFFOL3EmpYdaQU\"",
    "mtime": "2022-03-29T06:37:23.000Z",
    "size": 1567582,
    "path": "../public/images/inner-page/review-image/5.jpg"
  },
  "/images/inner-page/review-image/6.jpg": {
    "type": "image/jpeg",
    "etag": "\"16f0-4M2vMJ8SRi5ZiadZb6ccTAYaGT0\"",
    "mtime": "2022-03-29T06:37:23.000Z",
    "size": 5872,
    "path": "../public/images/inner-page/review-image/6.jpg"
  },
  "/images/inner-page/review-image/7.jpg": {
    "type": "image/jpeg",
    "etag": "\"16f0-4M2vMJ8SRi5ZiadZb6ccTAYaGT0\"",
    "mtime": "2022-03-29T06:37:23.000Z",
    "size": 5872,
    "path": "../public/images/inner-page/review-image/7.jpg"
  },
  "/images/inner-page/review-image/8.jpg": {
    "type": "image/jpeg",
    "etag": "\"4156-LX079UcyoxbczIs6D0qgn1fpGJY\"",
    "mtime": "2022-03-29T06:37:23.000Z",
    "size": 16726,
    "path": "../public/images/inner-page/review-image/8.jpg"
  },
  "/images/landing-image/core/1.png": {
    "type": "image/png",
    "etag": "\"702-uorXyWRw3CDNKfeZdZOkvR8nVmg\"",
    "mtime": "2022-03-29T06:37:23.000Z",
    "size": 1794,
    "path": "../public/images/landing-image/core/1.png"
  },
  "/images/landing-image/core/10.png": {
    "type": "image/png",
    "etag": "\"15ca-yflvSpSqehoagfmJqZQ8/3l/XsI\"",
    "mtime": "2022-03-29T06:37:23.000Z",
    "size": 5578,
    "path": "../public/images/landing-image/core/10.png"
  },
  "/images/landing-image/core/11.png": {
    "type": "image/png",
    "etag": "\"bd0-GkjuV91RFSJqbb13fix0wXiMSjc\"",
    "mtime": "2022-03-29T06:37:23.000Z",
    "size": 3024,
    "path": "../public/images/landing-image/core/11.png"
  },
  "/images/landing-image/core/12.png": {
    "type": "image/png",
    "etag": "\"f52-Ce05rTUzJ9Qysx3C8/VMhX38D20\"",
    "mtime": "2022-03-29T06:37:23.000Z",
    "size": 3922,
    "path": "../public/images/landing-image/core/12.png"
  },
  "/images/landing-image/core/13.png": {
    "type": "image/png",
    "etag": "\"115d-xRha8zrzPOmcokqSE1A+ib87nnc\"",
    "mtime": "2022-03-29T06:37:23.000Z",
    "size": 4445,
    "path": "../public/images/landing-image/core/13.png"
  },
  "/images/landing-image/core/14.png": {
    "type": "image/png",
    "etag": "\"add-hJBJbIe1bfs4FIbeA0zuEilkbLQ\"",
    "mtime": "2022-03-29T06:37:23.000Z",
    "size": 2781,
    "path": "../public/images/landing-image/core/14.png"
  },
  "/images/landing-image/core/15.png": {
    "type": "image/png",
    "etag": "\"c25-/dLJGd3C47TfTaLW2dUXlq1lD1k\"",
    "mtime": "2022-03-29T06:37:23.000Z",
    "size": 3109,
    "path": "../public/images/landing-image/core/15.png"
  },
  "/images/landing-image/core/16.png": {
    "type": "image/png",
    "etag": "\"c1f-gjRnGEAG8Pld3gAJMwvSccNsekQ\"",
    "mtime": "2022-03-29T06:37:23.000Z",
    "size": 3103,
    "path": "../public/images/landing-image/core/16.png"
  },
  "/images/landing-image/core/17.png": {
    "type": "image/png",
    "etag": "\"ab1-Mc6+lnqvCvXod4OWSp1y8BeMyC0\"",
    "mtime": "2022-03-29T06:37:23.000Z",
    "size": 2737,
    "path": "../public/images/landing-image/core/17.png"
  },
  "/images/landing-image/core/18.png": {
    "type": "image/png",
    "etag": "\"1671-HWjP9RUZ638IRE8K0xDeITwXJKU\"",
    "mtime": "2022-03-29T06:37:23.000Z",
    "size": 5745,
    "path": "../public/images/landing-image/core/18.png"
  },
  "/images/landing-image/core/2.png": {
    "type": "image/png",
    "etag": "\"c1a-/g0DRmgtPybrY6gIE7uw+eyO5MQ\"",
    "mtime": "2022-03-29T06:37:23.000Z",
    "size": 3098,
    "path": "../public/images/landing-image/core/2.png"
  },
  "/images/landing-image/core/3.png": {
    "type": "image/png",
    "etag": "\"1b5a-+85lv0wTspyn+ucZee3KLQ8G4aE\"",
    "mtime": "2022-03-29T06:37:23.000Z",
    "size": 7002,
    "path": "../public/images/landing-image/core/3.png"
  },
  "/images/landing-image/core/4.png": {
    "type": "image/png",
    "etag": "\"91e-LS7tJj4P60T+Tlg/K1/u7gUL8Cw\"",
    "mtime": "2022-03-29T06:37:23.000Z",
    "size": 2334,
    "path": "../public/images/landing-image/core/4.png"
  },
  "/images/landing-image/core/5.png": {
    "type": "image/png",
    "etag": "\"8e0-eCAmFbHf5FfZBoDuJaZkT+zWvdY\"",
    "mtime": "2022-03-29T06:37:23.000Z",
    "size": 2272,
    "path": "../public/images/landing-image/core/5.png"
  },
  "/images/landing-image/core/6.png": {
    "type": "image/png",
    "etag": "\"102f-6XsWQoTdvonZrfqNFCfWJc8kUUY\"",
    "mtime": "2022-03-29T06:37:23.000Z",
    "size": 4143,
    "path": "../public/images/landing-image/core/6.png"
  },
  "/images/landing-image/core/7.png": {
    "type": "image/png",
    "etag": "\"eef-yu4ybkMhL/t6zkOKkSx1p+zMlOE\"",
    "mtime": "2022-03-29T06:37:23.000Z",
    "size": 3823,
    "path": "../public/images/landing-image/core/7.png"
  },
  "/images/landing-image/core/8.png": {
    "type": "image/png",
    "etag": "\"a2d-kS157EusDy74LWy/xSf1rzW9uz8\"",
    "mtime": "2022-03-29T06:37:23.000Z",
    "size": 2605,
    "path": "../public/images/landing-image/core/8.png"
  },
  "/images/landing-image/core/9.png": {
    "type": "image/png",
    "etag": "\"9f1-TUDa/Rs3+y09HewuYo+tdm29rI4\"",
    "mtime": "2022-03-29T06:37:23.000Z",
    "size": 2545,
    "path": "../public/images/landing-image/core/9.png"
  },
  "/images/landing-image/future/back-end.png": {
    "type": "image/png",
    "etag": "\"17ae6-Bu09K+8b64bLYUfvMt//ymZLslE\"",
    "mtime": "2022-03-29T06:37:23.000Z",
    "size": 96998,
    "path": "../public/images/landing-image/future/back-end.png"
  },
  "/images/landing-image/future/email.png": {
    "type": "image/png",
    "etag": "\"1db5e-BWFetCTZ8GlkPV9MhOCzhOg3cFo\"",
    "mtime": "2022-03-29T06:37:23.000Z",
    "size": 121694,
    "path": "../public/images/landing-image/future/email.png"
  },
  "/images/landing-image/future/frontend.png": {
    "type": "image/png",
    "etag": "\"353ae-m7ADj0L49q2QGoBzugJFXR2QY6c\"",
    "mtime": "2022-03-29T06:37:23.000Z",
    "size": 218030,
    "path": "../public/images/landing-image/future/frontend.png"
  },
  "/images/landing-image/future/invoice.png": {
    "type": "image/png",
    "etag": "\"156a1-M8n5iFqZ5MSWYtkgkYS1QZyDnd8\"",
    "mtime": "2022-03-29T06:37:23.000Z",
    "size": 87713,
    "path": "../public/images/landing-image/future/invoice.png"
  },
  "/images/landing-image/home/1.jpg": {
    "type": "image/jpeg",
    "etag": "\"1b6a9-nS1ZJkQVEJCD0eaQoCZYQdM7n1U\"",
    "mtime": "2022-03-29T06:37:23.000Z",
    "size": 112297,
    "path": "../public/images/landing-image/home/1.jpg"
  },
  "/images/landing-image/home/2.jpg": {
    "type": "image/jpeg",
    "etag": "\"202f0-WwhXD8ZFhmUjyO+ThkCWUs0dzDY\"",
    "mtime": "2022-03-29T06:37:23.000Z",
    "size": 131824,
    "path": "../public/images/landing-image/home/2.jpg"
  },
  "/images/landing-image/home/3.jpg": {
    "type": "image/jpeg",
    "etag": "\"1291e-jxs1P4aPGEWRcsp0DcXzHIrRQuU\"",
    "mtime": "2022-03-29T06:37:23.000Z",
    "size": 76062,
    "path": "../public/images/landing-image/home/3.jpg"
  },
  "/images/landing-image/home/4.jpg": {
    "type": "image/jpeg",
    "etag": "\"1e868-T4YyThr/4BeQVoPjfcF5d9NVdic\"",
    "mtime": "2022-03-29T06:37:23.000Z",
    "size": 125032,
    "path": "../public/images/landing-image/home/4.jpg"
  },
  "/images/landing-image/home/5.jpg": {
    "type": "image/jpeg",
    "etag": "\"ea5d-8ekiVGqarTLqvtmdMoQ49K7c/O4\"",
    "mtime": "2022-03-29T06:37:23.000Z",
    "size": 59997,
    "path": "../public/images/landing-image/home/5.jpg"
  },
  "/images/landing-image/home/6.jpg": {
    "type": "image/jpeg",
    "etag": "\"1032f-r+KDElkehHdmT9tHUo9gb3pCht4\"",
    "mtime": "2022-03-29T06:37:23.000Z",
    "size": 66351,
    "path": "../public/images/landing-image/home/6.jpg"
  },
  "/images/landing-image/home/demo-images.png": {
    "type": "image/png",
    "etag": "\"bcbf7-IMUrHQDCk155Z7vSRsZXo3DYy7I\"",
    "mtime": "2022-03-29T06:37:23.000Z",
    "size": 773111,
    "path": "../public/images/landing-image/home/demo-images.png"
  },
  "/images/landing-image/icon/autoheight.png": {
    "type": "image/png",
    "etag": "\"461-/P3KLd/j/5UZZYLK+ZjxeaKhVzs\"",
    "mtime": "2022-03-29T06:37:23.000Z",
    "size": 1121,
    "path": "../public/images/landing-image/icon/autoheight.png"
  },
  "/images/landing-image/icon/color.png": {
    "type": "image/png",
    "etag": "\"537-X2ZPLWpEUA02ikpmFrGsYefdloM\"",
    "mtime": "2022-03-29T06:37:23.000Z",
    "size": 1335,
    "path": "../public/images/landing-image/icon/color.png"
  },
  "/images/landing-image/icon/lazy.png": {
    "type": "image/png",
    "etag": "\"717-Q0d8MEJUsr7JLwn7CT8rKe7XzxE\"",
    "mtime": "2022-03-29T06:37:23.000Z",
    "size": 1815,
    "path": "../public/images/landing-image/icon/lazy.png"
  },
  "/images/landing-image/icon/moon.png": {
    "type": "image/png",
    "etag": "\"383-EKhLS/iqM9gDq9++ldhuNNr3LPY\"",
    "mtime": "2022-03-29T06:37:23.000Z",
    "size": 899,
    "path": "../public/images/landing-image/icon/moon.png"
  },
  "/images/landing-image/icon/pwa.png": {
    "type": "image/png",
    "etag": "\"72b-ml/5QP6XF4+aR78HpMG8sC9E+e0\"",
    "mtime": "2022-03-29T06:37:23.000Z",
    "size": 1835,
    "path": "../public/images/landing-image/icon/pwa.png"
  },
  "/images/landing-image/icon/rtl.png": {
    "type": "image/png",
    "etag": "\"353-wAGoobptURUZBFTVADpYkahOOHM\"",
    "mtime": "2022-03-29T06:37:23.000Z",
    "size": 851,
    "path": "../public/images/landing-image/icon/rtl.png"
  },
  "/images/landing-image/pages/1.jpg": {
    "type": "image/jpeg",
    "etag": "\"7458-3MvcHJC4HzGd08PKSuIX1+zKLV8\"",
    "mtime": "2022-03-29T06:37:23.000Z",
    "size": 29784,
    "path": "../public/images/landing-image/pages/1.jpg"
  },
  "/images/landing-image/pages/2.jpg": {
    "type": "image/jpeg",
    "etag": "\"12e8a-BuQeK711A0uo3NQ81zYUOcBvbFU\"",
    "mtime": "2022-03-29T06:37:23.000Z",
    "size": 77450,
    "path": "../public/images/landing-image/pages/2.jpg"
  },
  "/images/landing-image/pages/3.jpg": {
    "type": "image/jpeg",
    "etag": "\"71ac-h4sztv4Aigk6biPDqnoxUhkj0ws\"",
    "mtime": "2022-03-29T06:37:23.000Z",
    "size": 29100,
    "path": "../public/images/landing-image/pages/3.jpg"
  },
  "/images/landing-image/pages/4.jpg": {
    "type": "image/jpeg",
    "etag": "\"6276-hE81vasjMq6UFlv9I2VioIB113M\"",
    "mtime": "2022-03-29T06:37:23.000Z",
    "size": 25206,
    "path": "../public/images/landing-image/pages/4.jpg"
  },
  "/images/landing-image/pages/404.jpg": {
    "type": "image/jpeg",
    "etag": "\"32fb-DzjtgMwiuitsRy5JKDl6yox1ieY\"",
    "mtime": "2022-03-29T06:37:23.000Z",
    "size": 13051,
    "path": "../public/images/landing-image/pages/404.jpg"
  },
  "/images/landing-image/pages/5.jpg": {
    "type": "image/jpeg",
    "etag": "\"677b-JX/0tt5G6NMeF/RL1hcNmnFa0ow\"",
    "mtime": "2022-03-29T06:37:23.000Z",
    "size": 26491,
    "path": "../public/images/landing-image/pages/5.jpg"
  },
  "/images/landing-image/pages/6.jpg": {
    "type": "image/jpeg",
    "etag": "\"721e-tuincUFW5JgAmQZKWfcDlFjs+pc\"",
    "mtime": "2022-03-29T06:37:23.000Z",
    "size": 29214,
    "path": "../public/images/landing-image/pages/6.jpg"
  },
  "/images/landing-image/pages/about-us.jpg": {
    "type": "image/jpeg",
    "etag": "\"46c8-pBKIzlCG+kEb0NjEzaWLnxKdvs4\"",
    "mtime": "2022-03-29T06:37:23.000Z",
    "size": 18120,
    "path": "../public/images/landing-image/pages/about-us.jpg"
  },
  "/images/landing-image/pages/blog-details.jpg": {
    "type": "image/jpeg",
    "etag": "\"5485-+5pp1HLWt/MZ+pI0H9jgFuInjgw\"",
    "mtime": "2022-03-29T06:37:23.000Z",
    "size": 21637,
    "path": "../public/images/landing-image/pages/blog-details.jpg"
  },
  "/images/landing-image/pages/blog-infinite-scroll.jpg": {
    "type": "image/jpeg",
    "etag": "\"5ca6-g2FQ8ZhTO1/rt5RLacdJjWr2ojM\"",
    "mtime": "2022-03-29T06:37:23.000Z",
    "size": 23718,
    "path": "../public/images/landing-image/pages/blog-infinite-scroll.jpg"
  },
  "/images/landing-image/pages/blog-left-sidebar.jpg": {
    "type": "image/jpeg",
    "etag": "\"5fcd-5YVDaWQnB+ToI2b+c7ykap5ppHE\"",
    "mtime": "2022-03-29T06:37:23.000Z",
    "size": 24525,
    "path": "../public/images/landing-image/pages/blog-left-sidebar.jpg"
  },
  "/images/landing-image/pages/blog-listing.jpg": {
    "type": "image/jpeg",
    "etag": "\"4061-p9KD1xS0mnAUyVaVEq2tToqBBos\"",
    "mtime": "2022-03-29T06:37:23.000Z",
    "size": 16481,
    "path": "../public/images/landing-image/pages/blog-listing.jpg"
  },
  "/images/landing-image/pages/blog-masonary.jpg": {
    "type": "image/jpeg",
    "etag": "\"4b8d-H+sQiFbI9gDg8aIHKb47qKQXh7k\"",
    "mtime": "2022-03-29T06:37:23.000Z",
    "size": 19341,
    "path": "../public/images/landing-image/pages/blog-masonary.jpg"
  },
  "/images/landing-image/pages/blog-no-sidebar.jpg": {
    "type": "image/jpeg",
    "etag": "\"58e2-uexjc30AHPHw8V4pFa/EkwMad3s\"",
    "mtime": "2022-03-29T06:37:23.000Z",
    "size": 22754,
    "path": "../public/images/landing-image/pages/blog-no-sidebar.jpg"
  },
  "/images/landing-image/pages/blog-right-sidebar.jpg": {
    "type": "image/jpeg",
    "etag": "\"5bae-y+Hi63iXZwL0sgWlerowfDVNT+E\"",
    "mtime": "2022-03-29T06:37:23.000Z",
    "size": 23470,
    "path": "../public/images/landing-image/pages/blog-right-sidebar.jpg"
  },
  "/images/landing-image/pages/cart.jpg": {
    "type": "image/jpeg",
    "etag": "\"31e3-9XhpL8o5uHN+aNzWCIH2NbgD2FA\"",
    "mtime": "2022-03-29T06:37:23.000Z",
    "size": 12771,
    "path": "../public/images/landing-image/pages/cart.jpg"
  },
  "/images/landing-image/pages/checkout.jpg": {
    "type": "image/jpeg",
    "etag": "\"2cdf-SoqsvNgXQ/A2M3p+Y4RoRhxqxCM\"",
    "mtime": "2022-03-29T06:37:23.000Z",
    "size": 11487,
    "path": "../public/images/landing-image/pages/checkout.jpg"
  },
  "/images/landing-image/pages/coming-soon.jpg": {
    "type": "image/jpeg",
    "etag": "\"3fdd-o0m6oS8yT5zhuGO+ozt/nMoUWqk\"",
    "mtime": "2022-03-29T06:37:23.000Z",
    "size": 16349,
    "path": "../public/images/landing-image/pages/coming-soon.jpg"
  },
  "/images/landing-image/pages/compare.jpg": {
    "type": "image/jpeg",
    "etag": "\"509e-jfU6YbfH2mfx3u3Ea0G7rvszElo\"",
    "mtime": "2022-03-29T06:37:23.000Z",
    "size": 20638,
    "path": "../public/images/landing-image/pages/compare.jpg"
  },
  "/images/landing-image/pages/contact-us.jpg": {
    "type": "image/jpeg",
    "etag": "\"3ea1-EtaNcs3HGPe4Kijz6OzIZuG7DjM\"",
    "mtime": "2022-03-29T06:37:23.000Z",
    "size": 16033,
    "path": "../public/images/landing-image/pages/contact-us.jpg"
  },
  "/images/landing-image/pages/element-button.jpg": {
    "type": "image/jpeg",
    "etag": "\"48bc-sg7QqaadntPhM3oC1W7LzmLZ8CQ\"",
    "mtime": "2022-03-29T06:37:23.000Z",
    "size": 18620,
    "path": "../public/images/landing-image/pages/element-button.jpg"
  },
  "/images/landing-image/pages/element-category.jpg": {
    "type": "image/jpeg",
    "etag": "\"58e4-UrDS3gW2SaBjVQJhwzuRBXniePg\"",
    "mtime": "2022-03-29T06:37:23.000Z",
    "size": 22756,
    "path": "../public/images/landing-image/pages/element-category.jpg"
  },
  "/images/landing-image/pages/element-collection-banner.jpg": {
    "type": "image/jpeg",
    "etag": "\"4b21-taBjnJT+G/9bEvbQdYWNmVBP2wI\"",
    "mtime": "2022-03-29T06:37:23.000Z",
    "size": 19233,
    "path": "../public/images/landing-image/pages/element-collection-banner.jpg"
  },
  "/images/landing-image/pages/element-deal-banner.jpg": {
    "type": "image/jpeg",
    "etag": "\"3c49-OMDD238+o+GZHYNp9j6a/9R+4bo\"",
    "mtime": "2022-03-29T06:37:23.000Z",
    "size": 15433,
    "path": "../public/images/landing-image/pages/element-deal-banner.jpg"
  },
  "/images/landing-image/pages/element-header.jpg": {
    "type": "image/jpeg",
    "etag": "\"339d-IMGRxsK36YkkgOG5xO3tdFbqoJY\"",
    "mtime": "2022-03-29T06:37:23.000Z",
    "size": 13213,
    "path": "../public/images/landing-image/pages/element-header.jpg"
  },
  "/images/landing-image/pages/element-home.jpg": {
    "type": "image/jpeg",
    "etag": "\"7828-uavgcpV8qWBW6TbGmqwXd9YKp1s\"",
    "mtime": "2022-03-29T06:37:23.000Z",
    "size": 30760,
    "path": "../public/images/landing-image/pages/element-home.jpg"
  },
  "/images/landing-image/pages/element-product.jpg": {
    "type": "image/jpeg",
    "etag": "\"4b99-T/gh45JqnDiH3jQPy/irioZvdL8\"",
    "mtime": "2022-03-29T06:37:23.000Z",
    "size": 19353,
    "path": "../public/images/landing-image/pages/element-product.jpg"
  },
  "/images/landing-image/pages/faq.jpg": {
    "type": "image/jpeg",
    "etag": "\"35a7-6MYCsFVBVscHUAqEi3/1Y74aJjQ\"",
    "mtime": "2022-03-29T06:37:23.000Z",
    "size": 13735,
    "path": "../public/images/landing-image/pages/faq.jpg"
  },
  "/images/landing-image/pages/forgot.jpg": {
    "type": "image/jpeg",
    "etag": "\"175c-4tFFV6725+P03+DytsmoBRAjQds\"",
    "mtime": "2022-03-29T06:37:23.000Z",
    "size": 5980,
    "path": "../public/images/landing-image/pages/forgot.jpg"
  },
  "/images/landing-image/pages/log-in.jpg": {
    "type": "image/jpeg",
    "etag": "\"1c8d-8GsFGpk5zIHbnSFnse4rHnM32SM\"",
    "mtime": "2022-03-29T06:37:23.000Z",
    "size": 7309,
    "path": "../public/images/landing-image/pages/log-in.jpg"
  },
  "/images/landing-image/pages/order-success.jpg": {
    "type": "image/jpeg",
    "etag": "\"35dd-dH8n9SR0y+VXEV7OadHoOS1jEU4\"",
    "mtime": "2022-03-29T06:37:23.000Z",
    "size": 13789,
    "path": "../public/images/landing-image/pages/order-success.jpg"
  },
  "/images/landing-image/pages/order-tracking.jpg": {
    "type": "image/jpeg",
    "etag": "\"3660-XCq7sinCtC5tB7E+0ExNIvgRqBg\"",
    "mtime": "2022-03-29T06:37:23.000Z",
    "size": 13920,
    "path": "../public/images/landing-image/pages/order-tracking.jpg"
  },
  "/images/landing-image/pages/portfolio-2-grid.jpg": {
    "type": "image/jpeg",
    "etag": "\"39cc-DjPLLqxmxUzF996gwlHcYDN0m6E\"",
    "mtime": "2022-03-29T06:37:23.000Z",
    "size": 14796,
    "path": "../public/images/landing-image/pages/portfolio-2-grid.jpg"
  },
  "/images/landing-image/pages/portfolio-2-masonary.jpg": {
    "type": "image/jpeg",
    "etag": "\"35c6-9I1UVTwjcs0pwD8YHk6iLFyOI6s\"",
    "mtime": "2022-03-29T06:37:23.000Z",
    "size": 13766,
    "path": "../public/images/landing-image/pages/portfolio-2-masonary.jpg"
  },
  "/images/landing-image/pages/portfolio-3-grid.jpg": {
    "type": "image/jpeg",
    "etag": "\"44ec-zpceWH1Hozg5VSy7soPpo/Ff6Yo\"",
    "mtime": "2022-03-29T06:37:23.000Z",
    "size": 17644,
    "path": "../public/images/landing-image/pages/portfolio-3-grid.jpg"
  },
  "/images/landing-image/pages/portfolio-3-masonary.jpg": {
    "type": "image/jpeg",
    "etag": "\"4276-9kBNFr14AEoJjmrLR8mTpTBj62s\"",
    "mtime": "2022-03-29T06:37:23.000Z",
    "size": 17014,
    "path": "../public/images/landing-image/pages/portfolio-3-masonary.jpg"
  },
  "/images/landing-image/pages/portfolio-4-grid.jpg": {
    "type": "image/jpeg",
    "etag": "\"50b0-LfwVnci8SE5nJcw/NEMqvNVmEx0\"",
    "mtime": "2022-03-29T06:37:23.000Z",
    "size": 20656,
    "path": "../public/images/landing-image/pages/portfolio-4-grid.jpg"
  },
  "/images/landing-image/pages/portfolio-4-masonary.jpg": {
    "type": "image/jpeg",
    "etag": "\"4e37-UpYckbxdQT3Bz3yQvL91HarQskA\"",
    "mtime": "2022-03-29T06:37:23.000Z",
    "size": 20023,
    "path": "../public/images/landing-image/pages/portfolio-4-masonary.jpg"
  },
  "/images/landing-image/pages/portfolio-no-space.jpg": {
    "type": "image/jpeg",
    "etag": "\"42e7-c4A2fU8KIMda+QrKLD2cT8HY4wo\"",
    "mtime": "2022-03-29T06:37:23.000Z",
    "size": 17127,
    "path": "../public/images/landing-image/pages/portfolio-no-space.jpg"
  },
  "/images/landing-image/pages/product-360-view.jpg": {
    "type": "image/jpeg",
    "etag": "\"4880-UVHq75LOpoVaAIzdgOMoWp5aTxQ\"",
    "mtime": "2022-03-29T06:37:23.000Z",
    "size": 18560,
    "path": "../public/images/landing-image/pages/product-360-view.jpg"
  },
  "/images/landing-image/pages/product-4-image.jpg": {
    "type": "image/jpeg",
    "etag": "\"4ea1-aBtmbXHvYaoXbtwishaa8jxhv/E\"",
    "mtime": "2022-03-29T06:37:23.000Z",
    "size": 20129,
    "path": "../public/images/landing-image/pages/product-4-image.jpg"
  },
  "/images/landing-image/pages/product-bundle.jpg": {
    "type": "image/jpeg",
    "etag": "\"49bd-Icn4r0DqBi027RhVC3aCn0fVvW0\"",
    "mtime": "2022-03-29T06:37:23.000Z",
    "size": 18877,
    "path": "../public/images/landing-image/pages/product-bundle.jpg"
  },
  "/images/landing-image/pages/product-left-sidebar.jpg": {
    "type": "image/jpeg",
    "etag": "\"47dd-dFyEjjC344MGqCtO7q+Y14i/7j8\"",
    "mtime": "2022-03-29T06:37:23.000Z",
    "size": 18397,
    "path": "../public/images/landing-image/pages/product-left-sidebar.jpg"
  },
  "/images/landing-image/pages/product-left-thumbnail.jpg": {
    "type": "image/jpeg",
    "etag": "\"470e-3PHt4Pl6Z+bC5ciF9A5XiPw8nC0\"",
    "mtime": "2022-03-29T06:37:23.000Z",
    "size": 18190,
    "path": "../public/images/landing-image/pages/product-left-thumbnail.jpg"
  },
  "/images/landing-image/pages/product-no-sidebar.jpg": {
    "type": "image/jpeg",
    "etag": "\"486f-oxtK+UGzwEeGoLuyluZK4NaD5fE\"",
    "mtime": "2022-03-29T06:37:23.000Z",
    "size": 18543,
    "path": "../public/images/landing-image/pages/product-no-sidebar.jpg"
  },
  "/images/landing-image/pages/product-right-sidebar.jpg": {
    "type": "image/jpeg",
    "etag": "\"4833-y/lBCZkuERlp3wf3gIF/ylfKcnQ\"",
    "mtime": "2022-03-29T06:37:23.000Z",
    "size": 18483,
    "path": "../public/images/landing-image/pages/product-right-sidebar.jpg"
  },
  "/images/landing-image/pages/product-right-thumbnail.jpg": {
    "type": "image/jpeg",
    "etag": "\"4630-G+fvJQOHp69nzqhhGe9tV3+D9do\"",
    "mtime": "2022-03-29T06:37:23.000Z",
    "size": 17968,
    "path": "../public/images/landing-image/pages/product-right-thumbnail.jpg"
  },
  "/images/landing-image/pages/product-sticky.jpg": {
    "type": "image/jpeg",
    "etag": "\"487e-pZtqcSqa977dtWWyCglXoUIP7Tk\"",
    "mtime": "2022-03-29T06:37:23.000Z",
    "size": 18558,
    "path": "../public/images/landing-image/pages/product-sticky.jpg"
  },
  "/images/landing-image/pages/product-video-thumbnail.jpg": {
    "type": "image/jpeg",
    "etag": "\"4dd0-DENmNwZcdPXhma3c3rEMiGDnDNE\"",
    "mtime": "2022-03-29T06:37:23.000Z",
    "size": 19920,
    "path": "../public/images/landing-image/pages/product-video-thumbnail.jpg"
  },
  "/images/landing-image/pages/review.jpg": {
    "type": "image/jpeg",
    "etag": "\"4e5f-EZhPmZr919oknNvHNCa0LIqXhVg\"",
    "mtime": "2022-03-29T06:37:23.000Z",
    "size": 20063,
    "path": "../public/images/landing-image/pages/review.jpg"
  },
  "/images/landing-image/pages/search.jpg": {
    "type": "image/jpeg",
    "etag": "\"542a-FNK5mj7mUpERGSsj+1Dp2dGiIzc\"",
    "mtime": "2022-03-29T06:37:23.000Z",
    "size": 21546,
    "path": "../public/images/landing-image/pages/search.jpg"
  },
  "/images/landing-image/pages/shop-canvas.jpg": {
    "type": "image/jpeg",
    "etag": "\"589e-hE8jNRbDU73i45KkncKAe93/ynA\"",
    "mtime": "2022-03-29T06:37:23.000Z",
    "size": 22686,
    "path": "../public/images/landing-image/pages/shop-canvas.jpg"
  },
  "/images/landing-image/pages/shop-category-sidebar.jpg": {
    "type": "image/jpeg",
    "etag": "\"5e19-cXPiE4YnJ11ymkKS/1ii4obROO0\"",
    "mtime": "2022-03-29T06:37:23.000Z",
    "size": 24089,
    "path": "../public/images/landing-image/pages/shop-category-sidebar.jpg"
  },
  "/images/landing-image/pages/shop-filter.jpg": {
    "type": "image/jpeg",
    "etag": "\"6560-SIZ3mXGyftJVDcQn4DnM2AwB7z0\"",
    "mtime": "2022-03-29T06:37:23.000Z",
    "size": 25952,
    "path": "../public/images/landing-image/pages/shop-filter.jpg"
  },
  "/images/landing-image/pages/shop-left-sidebar.jpg": {
    "type": "image/jpeg",
    "etag": "\"60bf-Vl3IONh0oGlGUMIGlLlXQ5YDkso\"",
    "mtime": "2022-03-29T06:37:23.000Z",
    "size": 24767,
    "path": "../public/images/landing-image/pages/shop-left-sidebar.jpg"
  },
  "/images/landing-image/pages/shop-list-infinite.jpg": {
    "type": "image/jpeg",
    "etag": "\"4d9c-aMV3vlsxAaX1S9dB9iOOAyeV3xA\"",
    "mtime": "2022-03-29T06:37:23.000Z",
    "size": 19868,
    "path": "../public/images/landing-image/pages/shop-list-infinite.jpg"
  },
  "/images/landing-image/pages/shop-list.jpg": {
    "type": "image/jpeg",
    "etag": "\"4d98-mYhAKJXGGspYww8EvQL+iXRzENc\"",
    "mtime": "2022-03-29T06:37:23.000Z",
    "size": 19864,
    "path": "../public/images/landing-image/pages/shop-list.jpg"
  },
  "/images/landing-image/pages/shop-no-sidebar.jpg": {
    "type": "image/jpeg",
    "etag": "\"5d3e-m55C/MYkAvCs+O1QENkN46/2v+M\"",
    "mtime": "2022-03-29T06:37:23.000Z",
    "size": 23870,
    "path": "../public/images/landing-image/pages/shop-no-sidebar.jpg"
  },
  "/images/landing-image/pages/shop-right-sidebar.jpg": {
    "type": "image/jpeg",
    "etag": "\"6110-w9f8e7fP6ccl5CDeEJNi474YsDs\"",
    "mtime": "2022-03-29T06:37:23.000Z",
    "size": 24848,
    "path": "../public/images/landing-image/pages/shop-right-sidebar.jpg"
  },
  "/images/landing-image/pages/shop-top-filter.jpg": {
    "type": "image/jpeg",
    "etag": "\"6529-je7D6n9cieyemRGcKu/N8qBqQfo\"",
    "mtime": "2022-03-29T06:37:23.000Z",
    "size": 25897,
    "path": "../public/images/landing-image/pages/shop-top-filter.jpg"
  },
  "/images/landing-image/pages/shop-with-category.jpg": {
    "type": "image/jpeg",
    "etag": "\"5b16-SDvnw77n31v0Tf2c4MLjrMrJmMY\"",
    "mtime": "2022-03-29T06:37:23.000Z",
    "size": 23318,
    "path": "../public/images/landing-image/pages/shop-with-category.jpg"
  },
  "/images/landing-image/pages/sign-up.jpg": {
    "type": "image/jpeg",
    "etag": "\"1de7-p0ViCXaZvGI7yvpjivR/b1FPmyw\"",
    "mtime": "2022-03-29T06:37:23.000Z",
    "size": 7655,
    "path": "../public/images/landing-image/pages/sign-up.jpg"
  },
  "/images/landing-image/pages/user-dashboard.jpg": {
    "type": "image/jpeg",
    "etag": "\"337d-GbnxSSstgDddd7v1VzSqSngaqjM\"",
    "mtime": "2022-03-29T06:37:23.000Z",
    "size": 13181,
    "path": "../public/images/landing-image/pages/user-dashboard.jpg"
  },
  "/images/landing-image/pages/wishlist.jpg": {
    "type": "image/jpeg",
    "etag": "\"3413-Qd2kOXBciahDxKjgqzVzK17qBlM\"",
    "mtime": "2022-03-29T06:37:23.000Z",
    "size": 13331,
    "path": "../public/images/landing-image/pages/wishlist.jpg"
  },
  "/images/shoes/category/1.png": {
    "type": "image/png",
    "etag": "\"113-fiYiCHmvwr9ZtneL45RQUxW7ijw\"",
    "mtime": "2022-03-29T06:37:23.000Z",
    "size": 275,
    "path": "../public/images/shoes/category/1.png"
  },
  "/images/shoes/category/2.png": {
    "type": "image/png",
    "etag": "\"11a-ZgGlAgFc+wX6N4IR5NrQTG+gw7Y\"",
    "mtime": "2022-03-29T06:37:23.000Z",
    "size": 282,
    "path": "../public/images/shoes/category/2.png"
  },
  "/images/shoes/category/3.png": {
    "type": "image/png",
    "etag": "\"ea-A0YQs/A/6V8kCXDs35zNnDIUVAw\"",
    "mtime": "2022-03-29T06:37:23.000Z",
    "size": 234,
    "path": "../public/images/shoes/category/3.png"
  },
  "/images/shoes/category/4.png": {
    "type": "image/png",
    "etag": "\"11f-AYWkfwH670h8VvkcOq22I0liLYw\"",
    "mtime": "2022-03-29T06:37:23.000Z",
    "size": 287,
    "path": "../public/images/shoes/category/4.png"
  },
  "/images/shoes/category/5.png": {
    "type": "image/png",
    "etag": "\"11f-AYWkfwH670h8VvkcOq22I0liLYw\"",
    "mtime": "2022-03-29T06:37:23.000Z",
    "size": 287,
    "path": "../public/images/shoes/category/5.png"
  },
  "/images/shoes/category/6.png": {
    "type": "image/png",
    "etag": "\"106-17jpTwCiVAX2DVkUYGVKq/PqeDo\"",
    "mtime": "2022-03-29T06:37:23.000Z",
    "size": 262,
    "path": "../public/images/shoes/category/6.png"
  },
  "/images/shoes/category/7.png": {
    "type": "image/png",
    "etag": "\"115-JXy0L7h81TYsNkEFdUQc92Pn5Ho\"",
    "mtime": "2022-03-29T06:37:23.000Z",
    "size": 277,
    "path": "../public/images/shoes/category/7.png"
  },
  "/images/landing-image/use-tools/bootstrap.png": {
    "type": "image/png",
    "etag": "\"109ee-X6aw1swo1O9vyXen4KLVrxPht8o\"",
    "mtime": "2022-03-29T06:37:23.000Z",
    "size": 68078,
    "path": "../public/images/landing-image/use-tools/bootstrap.png"
  },
  "/images/landing-image/use-tools/css.png": {
    "type": "image/png",
    "etag": "\"345b-b1gRSKU+3OiwAMgU8hMbDWFfM8Y\"",
    "mtime": "2022-03-29T06:37:23.000Z",
    "size": 13403,
    "path": "../public/images/landing-image/use-tools/css.png"
  },
  "/images/landing-image/use-tools/gulp.png": {
    "type": "image/png",
    "etag": "\"1edae-hVYdRDlVl0/7YD53DhDuOytEcEE\"",
    "mtime": "2022-03-29T06:37:23.000Z",
    "size": 126382,
    "path": "../public/images/landing-image/use-tools/gulp.png"
  },
  "/images/landing-image/use-tools/html.png": {
    "type": "image/png",
    "etag": "\"33f9-gkCdJDTbgsviMkz09m92QcBbSE4\"",
    "mtime": "2022-03-29T06:37:23.000Z",
    "size": 13305,
    "path": "../public/images/landing-image/use-tools/html.png"
  },
  "/images/landing-image/use-tools/js.png": {
    "type": "image/png",
    "etag": "\"3495-POogZjdGse/OQ+8Fqh5pCqBAcvU\"",
    "mtime": "2022-03-29T06:37:23.000Z",
    "size": 13461,
    "path": "../public/images/landing-image/use-tools/js.png"
  },
  "/images/landing-image/use-tools/scss.png": {
    "type": "image/png",
    "etag": "\"1461a-itCIcq+4KwZl837VzmKyvATIVec\"",
    "mtime": "2022-03-29T06:37:23.000Z",
    "size": 83482,
    "path": "../public/images/landing-image/use-tools/scss.png"
  },
  "/images/shoes/deal/1.png": {
    "type": "image/png",
    "etag": "\"2c726-JMTExrM2XGfCGeCuNS6wLGgZqdo\"",
    "mtime": "2022-03-29T06:37:23.000Z",
    "size": 182054,
    "path": "../public/images/shoes/deal/1.png"
  },
  "/images/shoes/latest-product/1-.jpg": {
    "type": "image/jpeg",
    "etag": "\"1ef5-rrf6+s0HtSkNtsZ+Bl6J1xawJtc\"",
    "mtime": "2022-03-29T06:37:23.000Z",
    "size": 7925,
    "path": "../public/images/shoes/latest-product/1-.jpg"
  },
  "/images/shoes/latest-product/1.jpg": {
    "type": "image/jpeg",
    "etag": "\"1ef5-rrf6+s0HtSkNtsZ+Bl6J1xawJtc\"",
    "mtime": "2022-03-29T06:37:23.000Z",
    "size": 7925,
    "path": "../public/images/shoes/latest-product/1.jpg"
  },
  "/images/shoes/latest-product/2-.jpg": {
    "type": "image/jpeg",
    "etag": "\"1ef5-rrf6+s0HtSkNtsZ+Bl6J1xawJtc\"",
    "mtime": "2022-03-29T06:37:23.000Z",
    "size": 7925,
    "path": "../public/images/shoes/latest-product/2-.jpg"
  },
  "/images/shoes/latest-product/2.jpg": {
    "type": "image/jpeg",
    "etag": "\"1ef5-rrf6+s0HtSkNtsZ+Bl6J1xawJtc\"",
    "mtime": "2022-03-29T06:37:23.000Z",
    "size": 7925,
    "path": "../public/images/shoes/latest-product/2.jpg"
  },
  "/images/shoes/latest-product/3-.jpg": {
    "type": "image/jpeg",
    "etag": "\"1ef5-rrf6+s0HtSkNtsZ+Bl6J1xawJtc\"",
    "mtime": "2022-03-29T06:37:23.000Z",
    "size": 7925,
    "path": "../public/images/shoes/latest-product/3-.jpg"
  },
  "/images/shoes/latest-product/3.jpg": {
    "type": "image/jpeg",
    "etag": "\"1ef5-rrf6+s0HtSkNtsZ+Bl6J1xawJtc\"",
    "mtime": "2022-03-29T06:37:23.000Z",
    "size": 7925,
    "path": "../public/images/shoes/latest-product/3.jpg"
  },
  "/images/shoes/latest-product/4-.jpg": {
    "type": "image/jpeg",
    "etag": "\"1ef5-rrf6+s0HtSkNtsZ+Bl6J1xawJtc\"",
    "mtime": "2022-03-29T06:37:23.000Z",
    "size": 7925,
    "path": "../public/images/shoes/latest-product/4-.jpg"
  },
  "/images/shoes/latest-product/4.jpg": {
    "type": "image/jpeg",
    "etag": "\"1ef5-rrf6+s0HtSkNtsZ+Bl6J1xawJtc\"",
    "mtime": "2022-03-29T06:37:23.000Z",
    "size": 7925,
    "path": "../public/images/shoes/latest-product/4.jpg"
  },
  "/images/shoes/latest-product/5-.jpg": {
    "type": "image/jpeg",
    "etag": "\"1ef5-rrf6+s0HtSkNtsZ+Bl6J1xawJtc\"",
    "mtime": "2022-03-29T06:37:23.000Z",
    "size": 7925,
    "path": "../public/images/shoes/latest-product/5-.jpg"
  },
  "/images/shoes/latest-product/5.jpg": {
    "type": "image/jpeg",
    "etag": "\"1ef5-rrf6+s0HtSkNtsZ+Bl6J1xawJtc\"",
    "mtime": "2022-03-29T06:37:23.000Z",
    "size": 7925,
    "path": "../public/images/shoes/latest-product/5.jpg"
  },
  "/images/shoes/latest-product/6-.jpg": {
    "type": "image/jpeg",
    "etag": "\"1ef5-rrf6+s0HtSkNtsZ+Bl6J1xawJtc\"",
    "mtime": "2022-03-29T06:37:23.000Z",
    "size": 7925,
    "path": "../public/images/shoes/latest-product/6-.jpg"
  },
  "/images/shoes/latest-product/6.jpg": {
    "type": "image/jpeg",
    "etag": "\"1ef5-rrf6+s0HtSkNtsZ+Bl6J1xawJtc\"",
    "mtime": "2022-03-29T06:37:23.000Z",
    "size": 7925,
    "path": "../public/images/shoes/latest-product/6.jpg"
  },
  "/images/shoes/latest-product/7-.jpg": {
    "type": "image/jpeg",
    "etag": "\"1ef5-rrf6+s0HtSkNtsZ+Bl6J1xawJtc\"",
    "mtime": "2022-03-29T06:37:23.000Z",
    "size": 7925,
    "path": "../public/images/shoes/latest-product/7-.jpg"
  },
  "/images/shoes/latest-product/7.jpg": {
    "type": "image/jpeg",
    "etag": "\"1ef5-rrf6+s0HtSkNtsZ+Bl6J1xawJtc\"",
    "mtime": "2022-03-29T06:37:23.000Z",
    "size": 7925,
    "path": "../public/images/shoes/latest-product/7.jpg"
  },
  "/images/shoes/latest-product/8-.jpg": {
    "type": "image/jpeg",
    "etag": "\"1ef5-rrf6+s0HtSkNtsZ+Bl6J1xawJtc\"",
    "mtime": "2022-03-29T06:37:23.000Z",
    "size": 7925,
    "path": "../public/images/shoes/latest-product/8-.jpg"
  },
  "/images/shoes/latest-product/8.jpg": {
    "type": "image/jpeg",
    "etag": "\"1ef5-rrf6+s0HtSkNtsZ+Bl6J1xawJtc\"",
    "mtime": "2022-03-29T06:37:23.000Z",
    "size": 7925,
    "path": "../public/images/shoes/latest-product/8.jpg"
  },
  "/images/shoes/latest-product/9-.jpg": {
    "type": "image/jpeg",
    "etag": "\"1ef5-rrf6+s0HtSkNtsZ+Bl6J1xawJtc\"",
    "mtime": "2022-03-29T06:37:23.000Z",
    "size": 7925,
    "path": "../public/images/shoes/latest-product/9-.jpg"
  },
  "/images/shoes/latest-product/9.jpg": {
    "type": "image/jpeg",
    "etag": "\"1ef5-rrf6+s0HtSkNtsZ+Bl6J1xawJtc\"",
    "mtime": "2022-03-29T06:37:23.000Z",
    "size": 7925,
    "path": "../public/images/shoes/latest-product/9.jpg"
  },
  "/images/shoes/new/1.png": {
    "type": "image/png",
    "etag": "\"ad8-7ICJrCxiByzpYD5TrCBZSL7svRY\"",
    "mtime": "2022-03-29T06:37:23.000Z",
    "size": 2776,
    "path": "../public/images/shoes/new/1.png"
  },
  "/images/shoes/new/2.png": {
    "type": "image/png",
    "etag": "\"239-jCSuK8jNPfcSpna1+8EoCjGjZHk\"",
    "mtime": "2022-03-29T06:37:23.000Z",
    "size": 569,
    "path": "../public/images/shoes/new/2.png"
  },
  "/images/shoes/new/3.png": {
    "type": "image/png",
    "etag": "\"1dc-9Pk9WDJ8zMG+skTfCWO2FNIU6sQ\"",
    "mtime": "2022-03-29T06:37:23.000Z",
    "size": 476,
    "path": "../public/images/shoes/new/3.png"
  },
  "/images/shoes/new/4.png": {
    "type": "image/png",
    "etag": "\"264-MOqabtEJ5xoEr/s1r8sUTCcg79c\"",
    "mtime": "2022-03-29T06:37:23.000Z",
    "size": 612,
    "path": "../public/images/shoes/new/4.png"
  },
  "/images/shoes/new/5.png": {
    "type": "image/png",
    "etag": "\"aa4-UP1ZT7pLKkEe0Yoq0POw4Y/KgGs\"",
    "mtime": "2022-03-29T06:37:23.000Z",
    "size": 2724,
    "path": "../public/images/shoes/new/5.png"
  },
  "/images/shoes/new/6.png": {
    "type": "image/png",
    "etag": "\"a78-NcXhhSRbeJuCHPjDNLW1vfqL5vc\"",
    "mtime": "2022-03-29T06:37:23.000Z",
    "size": 2680,
    "path": "../public/images/shoes/new/6.png"
  },
  "/images/shoes/new/7.png": {
    "type": "image/png",
    "etag": "\"a78-NcXhhSRbeJuCHPjDNLW1vfqL5vc\"",
    "mtime": "2022-03-29T06:37:23.000Z",
    "size": 2680,
    "path": "../public/images/shoes/new/7.png"
  },
  "/images/shoes/other/1.jpg": {
    "type": "image/jpeg",
    "etag": "\"7172-vbX0fOEQb1ORuEoJwZP48YWhHsI\"",
    "mtime": "2022-03-29T06:37:23.000Z",
    "size": 29042,
    "path": "../public/images/shoes/other/1.jpg"
  },
  "/images/shoes/other/11.jpg": {
    "type": "image/jpeg",
    "etag": "\"5d85-/m6dnD7Dx95J9NIou0r1r9qgKbM\"",
    "mtime": "2022-03-29T06:37:23.000Z",
    "size": 23941,
    "path": "../public/images/shoes/other/11.jpg"
  },
  "/images/shoes/other/12-(2).jpg": {
    "type": "image/jpeg",
    "etag": "\"2cb2-mhsVdMSVAngDZE0Upvm/pgF4qhQ\"",
    "mtime": "2022-03-29T06:37:23.000Z",
    "size": 11442,
    "path": "../public/images/shoes/other/12-(2).jpg"
  },
  "/images/shoes/other/12.jpg": {
    "type": "image/jpeg",
    "etag": "\"2c8e-9ow8PODLEEr4R7nbBXAqBDjhCtc\"",
    "mtime": "2022-03-29T06:37:23.000Z",
    "size": 11406,
    "path": "../public/images/shoes/other/12.jpg"
  },
  "/images/shoes/other/13.jpg": {
    "type": "image/jpeg",
    "etag": "\"161f-PmQRpBYWuOOvYmeA7OYhu/8XudI\"",
    "mtime": "2022-03-29T06:37:23.000Z",
    "size": 5663,
    "path": "../public/images/shoes/other/13.jpg"
  },
  "/images/shoes/other/14.jpg": {
    "type": "image/jpeg",
    "etag": "\"1ed9-wV1Qw9SaQs0NYllr4nPf3vYQlBQ\"",
    "mtime": "2022-03-29T06:37:23.000Z",
    "size": 7897,
    "path": "../public/images/shoes/other/14.jpg"
  },
  "/images/shoes/other/15.jpg": {
    "type": "image/jpeg",
    "etag": "\"3474-h+0ozF9leyhnot+jzTjf/B6Y2Sg\"",
    "mtime": "2022-03-29T06:37:23.000Z",
    "size": 13428,
    "path": "../public/images/shoes/other/15.jpg"
  },
  "/images/shoes/other/16.jpg": {
    "type": "image/jpeg",
    "etag": "\"29e8-vRRaohZgnAWlAjRtfUS1hka5oXo\"",
    "mtime": "2022-03-29T06:37:23.000Z",
    "size": 10728,
    "path": "../public/images/shoes/other/16.jpg"
  },
  "/images/shoes/other/17.jpg": {
    "type": "image/jpeg",
    "etag": "\"1e2c-0CH/DCxxSuwc0LE49Z0qhRNNZoc\"",
    "mtime": "2022-03-29T06:37:23.000Z",
    "size": 7724,
    "path": "../public/images/shoes/other/17.jpg"
  },
  "/images/shoes/other/18.jpg": {
    "type": "image/jpeg",
    "etag": "\"a420-oKhxT7TObyPFSQA80XmfPndkcsQ\"",
    "mtime": "2022-03-29T06:37:23.000Z",
    "size": 42016,
    "path": "../public/images/shoes/other/18.jpg"
  },
  "/images/shoes/other/2.jpg": {
    "type": "image/jpeg",
    "etag": "\"2e17-zNVbM1K15A+puP1xEWpAN7vVlsA\"",
    "mtime": "2022-03-29T06:37:23.000Z",
    "size": 11799,
    "path": "../public/images/shoes/other/2.jpg"
  },
  "/images/shoes/other/headphone.png": {
    "type": "image/png",
    "etag": "\"22dc-oYOhMrqHU/KVKEkIf16wosNRuy8\"",
    "mtime": "2022-03-29T06:37:23.000Z",
    "size": 8924,
    "path": "../public/images/shoes/other/headphone.png"
  },
  "/images/shoes/png/001-hotel-service.png": {
    "type": "image/png",
    "etag": "\"2d84-naElLIuDbVjwYbkYuBHMu+68s9o\"",
    "mtime": "2022-03-29T06:37:23.000Z",
    "size": 11652,
    "path": "../public/images/shoes/png/001-hotel-service.png"
  },
  "/images/shoes/png/001-hotel-service.svg": {
    "type": "image/svg+xml",
    "etag": "\"2fc9-ojuXyNnCl2bBdglW13BrYsL53Fw\"",
    "mtime": "2022-03-29T06:37:23.000Z",
    "size": 12233,
    "path": "../public/images/shoes/png/001-hotel-service.svg"
  },
  "/images/shoes/png/002-store.png": {
    "type": "image/png",
    "etag": "\"235f-C2pSJoPdAP593eieOP8k2MD+MyQ\"",
    "mtime": "2022-03-29T06:37:23.000Z",
    "size": 9055,
    "path": "../public/images/shoes/png/002-store.png"
  },
  "/images/shoes/png/002-store.svg": {
    "type": "image/svg+xml",
    "etag": "\"3b85-u4f2mpQh1a4mTlMhxdvJnRSL+Tc\"",
    "mtime": "2022-03-29T06:37:23.000Z",
    "size": 15237,
    "path": "../public/images/shoes/png/002-store.svg"
  },
  "/images/shoes/png/003-steering-wheel.png": {
    "type": "image/png",
    "etag": "\"2cb2-p/wV4IeLp1mlmFvS8ZjCU6iA4fY\"",
    "mtime": "2022-03-29T06:37:23.000Z",
    "size": 11442,
    "path": "../public/images/shoes/png/003-steering-wheel.png"
  },
  "/images/shoes/png/003-steering-wheel.svg": {
    "type": "image/svg+xml",
    "etag": "\"573a-lou7yAxx8x/rfEk0fTPwiNDlO1E\"",
    "mtime": "2022-03-29T06:37:23.000Z",
    "size": 22330,
    "path": "../public/images/shoes/png/003-steering-wheel.svg"
  },
  "/images/shoes/png/004-security.png": {
    "type": "image/png",
    "etag": "\"57db-lSnv2aLT0Z73bHSKlaNDqQA3IrQ\"",
    "mtime": "2022-03-29T06:37:23.000Z",
    "size": 22491,
    "path": "../public/images/shoes/png/004-security.png"
  },
  "/images/shoes/png/004-security.svg": {
    "type": "image/svg+xml",
    "etag": "\"5df9-HX+tIY47zh0TjXi/It5QV0sltA8\"",
    "mtime": "2022-03-29T06:37:23.000Z",
    "size": 24057,
    "path": "../public/images/shoes/png/004-security.svg"
  },
  "/images/shoes/png/icons.svg": {
    "type": "image/svg+xml",
    "etag": "\"3bce-scQ1yWN19RKDryHSNXbM0Bv1mcA\"",
    "mtime": "2022-03-29T06:37:23.000Z",
    "size": 15310,
    "path": "../public/images/shoes/png/icons.svg"
  },
  "/images/shoes/poster/1.png": {
    "type": "image/png",
    "etag": "\"a1d-zL6CztweHdzrGJ9pXcu1aZPxMPM\"",
    "mtime": "2022-03-29T06:37:23.000Z",
    "size": 2589,
    "path": "../public/images/shoes/poster/1.png"
  },
  "/images/shoes/poster/2.png": {
    "type": "image/png",
    "etag": "\"a1d-zL6CztweHdzrGJ9pXcu1aZPxMPM\"",
    "mtime": "2022-03-29T06:37:23.000Z",
    "size": 2589,
    "path": "../public/images/shoes/poster/2.png"
  },
  "/images/shoes/poster-2/1.jpg": {
    "type": "image/jpeg",
    "etag": "\"2d2c-XUiqCushdX0keWk1n5I9E8EzNPo\"",
    "mtime": "2022-03-29T06:37:23.000Z",
    "size": 11564,
    "path": "../public/images/shoes/poster-2/1.jpg"
  },
  "/images/shoes/poster-2/2.jpg": {
    "type": "image/jpeg",
    "etag": "\"2081-ZQ7wEpaD7qQ3EWTATn+2C4qZtns\"",
    "mtime": "2022-03-29T06:37:23.000Z",
    "size": 8321,
    "path": "../public/images/shoes/poster-2/2.jpg"
  },
  "/images/shoes/poster-2/3.jpg": {
    "type": "image/jpeg",
    "etag": "\"1020-/REHXQX9itPxfpP0v/7qF354GT4\"",
    "mtime": "2022-03-29T06:37:23.000Z",
    "size": 4128,
    "path": "../public/images/shoes/poster-2/3.jpg"
  },
  "/images/shoes/poster-2/4.jpg": {
    "type": "image/jpeg",
    "etag": "\"1020-/REHXQX9itPxfpP0v/7qF354GT4\"",
    "mtime": "2022-03-29T06:37:23.000Z",
    "size": 4128,
    "path": "../public/images/shoes/poster-2/4.jpg"
  },
  "/images/shoes/product/1.jpg": {
    "type": "image/jpeg",
    "etag": "\"1ef5-rrf6+s0HtSkNtsZ+Bl6J1xawJtc\"",
    "mtime": "2022-03-29T06:37:23.000Z",
    "size": 7925,
    "path": "../public/images/shoes/product/1.jpg"
  },
  "/images/shoes/product/2.jpg": {
    "type": "image/jpeg",
    "etag": "\"1ef5-rrf6+s0HtSkNtsZ+Bl6J1xawJtc\"",
    "mtime": "2022-03-29T06:37:23.000Z",
    "size": 7925,
    "path": "../public/images/shoes/product/2.jpg"
  },
  "/images/shoes/product/3.jpg": {
    "type": "image/jpeg",
    "etag": "\"1ef5-rrf6+s0HtSkNtsZ+Bl6J1xawJtc\"",
    "mtime": "2022-03-29T06:37:23.000Z",
    "size": 7925,
    "path": "../public/images/shoes/product/3.jpg"
  },
  "/images/shoes/product/4.jpg": {
    "type": "image/jpeg",
    "etag": "\"1ef5-rrf6+s0HtSkNtsZ+Bl6J1xawJtc\"",
    "mtime": "2022-03-29T06:37:23.000Z",
    "size": 7925,
    "path": "../public/images/shoes/product/4.jpg"
  },
  "/images/shoes/product/5.jpg": {
    "type": "image/jpeg",
    "etag": "\"1ef5-rrf6+s0HtSkNtsZ+Bl6J1xawJtc\"",
    "mtime": "2022-03-29T06:37:23.000Z",
    "size": 7925,
    "path": "../public/images/shoes/product/5.jpg"
  },
  "/images/shoes/product/6.jpg": {
    "type": "image/jpeg",
    "etag": "\"1ef5-rrf6+s0HtSkNtsZ+Bl6J1xawJtc\"",
    "mtime": "2022-03-29T06:37:23.000Z",
    "size": 7925,
    "path": "../public/images/shoes/product/6.jpg"
  },
  "/images/vegetable/banner/1.jpg": {
    "type": "image/jpeg",
    "etag": "\"23c2-v8mK0nipoBlKGUSqgDAZRvn5zGs\"",
    "mtime": "2022-03-29T06:37:24.000Z",
    "size": 9154,
    "path": "../public/images/vegetable/banner/1.jpg"
  },
  "/images/vegetable/banner/2.jpg": {
    "type": "image/jpeg",
    "etag": "\"2928-jelo+WjKNcFqcJbfzwgjXnebSLc\"",
    "mtime": "2022-03-29T06:37:24.000Z",
    "size": 10536,
    "path": "../public/images/vegetable/banner/2.jpg"
  },
  "/images/vegetable/fresh/1.jpg": {
    "type": "image/jpeg",
    "etag": "\"1483-tSxlY8qX9Q1q21/7kMVM9VDhxRg\"",
    "mtime": "2022-03-29T06:37:24.000Z",
    "size": 5251,
    "path": "../public/images/vegetable/fresh/1.jpg"
  },
  "/images/vegetable/fresh/2.jpg": {
    "type": "image/jpeg",
    "etag": "\"1483-tSxlY8qX9Q1q21/7kMVM9VDhxRg\"",
    "mtime": "2022-03-29T06:37:24.000Z",
    "size": 5251,
    "path": "../public/images/vegetable/fresh/2.jpg"
  },
  "/images/vegetable/fresh/3.jpg": {
    "type": "image/jpeg",
    "etag": "\"1483-tSxlY8qX9Q1q21/7kMVM9VDhxRg\"",
    "mtime": "2022-03-29T06:37:24.000Z",
    "size": 5251,
    "path": "../public/images/vegetable/fresh/3.jpg"
  },
  "/images/vegetable/fresh/4.jpg": {
    "type": "image/jpeg",
    "etag": "\"1483-tSxlY8qX9Q1q21/7kMVM9VDhxRg\"",
    "mtime": "2022-03-29T06:37:24.000Z",
    "size": 5251,
    "path": "../public/images/vegetable/fresh/4.jpg"
  },
  "/images/vegetable/fresh/5.jpg": {
    "type": "image/jpeg",
    "etag": "\"1483-tSxlY8qX9Q1q21/7kMVM9VDhxRg\"",
    "mtime": "2022-03-29T06:37:24.000Z",
    "size": 5251,
    "path": "../public/images/vegetable/fresh/5.jpg"
  },
  "/images/vegetable/fresh/6.jpg": {
    "type": "image/jpeg",
    "etag": "\"1483-tSxlY8qX9Q1q21/7kMVM9VDhxRg\"",
    "mtime": "2022-03-29T06:37:24.000Z",
    "size": 5251,
    "path": "../public/images/vegetable/fresh/6.jpg"
  },
  "/images/vegetable/category/1.jpg": {
    "type": "image/jpeg",
    "etag": "\"141d-nA+j2AQtfS/+o+Tw89bnepep8Zg\"",
    "mtime": "2022-03-29T06:37:24.000Z",
    "size": 5149,
    "path": "../public/images/vegetable/category/1.jpg"
  },
  "/images/vegetable/category/1.png": {
    "type": "image/png",
    "etag": "\"9dc3-lc81IiHL31KURfEfUinKr23YFWs\"",
    "mtime": "2022-03-29T06:37:24.000Z",
    "size": 40387,
    "path": "../public/images/vegetable/category/1.png"
  },
  "/images/vegetable/category/2.jpg": {
    "type": "image/jpeg",
    "etag": "\"13b4-4qlI0FRg6l1Iq2UprFo/wLVBsT8\"",
    "mtime": "2022-03-29T06:37:24.000Z",
    "size": 5044,
    "path": "../public/images/vegetable/category/2.jpg"
  },
  "/images/vegetable/category/2.png": {
    "type": "image/png",
    "etag": "\"8312-5ZAcq/t9t6gR+EPC6jr2TnThjiI\"",
    "mtime": "2022-03-29T06:37:24.000Z",
    "size": 33554,
    "path": "../public/images/vegetable/category/2.png"
  },
  "/images/vegetable/category/3.jpg": {
    "type": "image/jpeg",
    "etag": "\"18d1-wFwiy7q2hKVceTIO3x4yNxJMSWs\"",
    "mtime": "2022-03-29T06:37:24.000Z",
    "size": 6353,
    "path": "../public/images/vegetable/category/3.jpg"
  },
  "/images/vegetable/category/3.png": {
    "type": "image/png",
    "etag": "\"77a0-wqIzxg+i1fZpbCKqy5g8tCo0AzQ\"",
    "mtime": "2022-03-29T06:37:24.000Z",
    "size": 30624,
    "path": "../public/images/vegetable/category/3.png"
  },
  "/images/vegetable/category/4.jpg": {
    "type": "image/jpeg",
    "etag": "\"1786-1zUJdaRW6+sCOhXqjs3Rqc5pJyk\"",
    "mtime": "2022-03-29T06:37:24.000Z",
    "size": 6022,
    "path": "../public/images/vegetable/category/4.jpg"
  },
  "/images/vegetable/category/4.png": {
    "type": "image/png",
    "etag": "\"70f7-OQ3W7XsrlbfUY5igN+dI3DzJQho\"",
    "mtime": "2022-03-29T06:37:24.000Z",
    "size": 28919,
    "path": "../public/images/vegetable/category/4.png"
  },
  "/images/vegetable/fruit/1.jpg": {
    "type": "image/jpeg",
    "etag": "\"111d-L4Wl6wvmZ6E/JIaVbddPd0nKLIQ\"",
    "mtime": "2022-03-29T06:37:24.000Z",
    "size": 4381,
    "path": "../public/images/vegetable/fruit/1.jpg"
  },
  "/images/vegetable/fruit/2.jpg": {
    "type": "image/jpeg",
    "etag": "\"111d-L4Wl6wvmZ6E/JIaVbddPd0nKLIQ\"",
    "mtime": "2022-03-29T06:37:24.000Z",
    "size": 4381,
    "path": "../public/images/vegetable/fruit/2.jpg"
  },
  "/images/vegetable/fruit/3.jpg": {
    "type": "image/jpeg",
    "etag": "\"111d-L4Wl6wvmZ6E/JIaVbddPd0nKLIQ\"",
    "mtime": "2022-03-29T06:37:24.000Z",
    "size": 4381,
    "path": "../public/images/vegetable/fruit/3.jpg"
  },
  "/images/vegetable/fruit/4.jpg": {
    "type": "image/jpeg",
    "etag": "\"111d-L4Wl6wvmZ6E/JIaVbddPd0nKLIQ\"",
    "mtime": "2022-03-29T06:37:24.000Z",
    "size": 4381,
    "path": "../public/images/vegetable/fruit/4.jpg"
  },
  "/images/vegetable/fruit/5.jpg": {
    "type": "image/jpeg",
    "etag": "\"111d-L4Wl6wvmZ6E/JIaVbddPd0nKLIQ\"",
    "mtime": "2022-03-29T06:37:24.000Z",
    "size": 4381,
    "path": "../public/images/vegetable/fruit/5.jpg"
  },
  "/images/vegetable/fruit/6.jpg": {
    "type": "image/jpeg",
    "etag": "\"111d-L4Wl6wvmZ6E/JIaVbddPd0nKLIQ\"",
    "mtime": "2022-03-29T06:37:24.000Z",
    "size": 4381,
    "path": "../public/images/vegetable/fruit/6.jpg"
  },
  "/images/vegetable/offer/2.jpg": {
    "type": "image/jpeg",
    "etag": "\"1405-kf0FCPKUpmesaakW8yckzEElFdA\"",
    "mtime": "2022-03-29T06:37:24.000Z",
    "size": 5125,
    "path": "../public/images/vegetable/offer/2.jpg"
  },
  "/images/vegetable/offer-1/1.png": {
    "type": "image/png",
    "etag": "\"393-vkQHfGLWgRT7nP3IxPQlfvOlrkE\"",
    "mtime": "2022-03-29T06:37:24.000Z",
    "size": 915,
    "path": "../public/images/vegetable/offer-1/1.png"
  },
  "/images/vegetable/offer-1/2.png": {
    "type": "image/png",
    "etag": "\"41ae-qwh8+dxMgS7BQVJem9+TSjjpxBQ\"",
    "mtime": "2022-03-29T06:37:24.000Z",
    "size": 16814,
    "path": "../public/images/vegetable/offer-1/2.png"
  },
  "/images/vegetable/offer-1/3.png": {
    "type": "image/png",
    "etag": "\"e45-P1cz/FXeLxrnqnBG1zpmSeZruVo\"",
    "mtime": "2022-03-29T06:37:24.000Z",
    "size": 3653,
    "path": "../public/images/vegetable/offer-1/3.png"
  },
  "/images/vegetable/offer-1/4.png": {
    "type": "image/png",
    "etag": "\"810-h8bRmmtxjfjppLrIm7FulUhVhUg\"",
    "mtime": "2022-03-29T06:37:24.000Z",
    "size": 2064,
    "path": "../public/images/vegetable/offer-1/4.png"
  },
  "/images/vegetable/offer-1/5.png": {
    "type": "image/png",
    "etag": "\"25d-/M4GXytDFmed6PtS5RmS0qrA1IE\"",
    "mtime": "2022-03-29T06:37:24.000Z",
    "size": 605,
    "path": "../public/images/vegetable/offer-1/5.png"
  },
  "/images/vegetable/offer-1/6.png": {
    "type": "image/png",
    "etag": "\"af1-MxZJnuEXpRw59NiTEF8KIhyRUsw\"",
    "mtime": "2022-03-29T06:37:24.000Z",
    "size": 2801,
    "path": "../public/images/vegetable/offer-1/6.png"
  },
  "/images/vegetable/offer-1/big.png": {
    "type": "image/png",
    "etag": "\"104245-CNAXwGSHFP8bbqH09ncomUdIATY\"",
    "mtime": "2022-03-29T06:37:24.000Z",
    "size": 1065541,
    "path": "../public/images/vegetable/offer-1/big.png"
  },
  "/images/vegetable/poster/1.png": {
    "type": "image/png",
    "etag": "\"10cc69-VVaQ03CcoTZiYEss+Fvk2RjexRM\"",
    "mtime": "2022-03-29T06:37:24.000Z",
    "size": 1100905,
    "path": "../public/images/vegetable/poster/1.png"
  },
  "/images/vegetable/poster/2.png": {
    "type": "image/png",
    "etag": "\"47fde-pNlj17AvDKxM5IXA9Od1cn4ixHc\"",
    "mtime": "2022-03-29T06:37:24.000Z",
    "size": 294878,
    "path": "../public/images/vegetable/poster/2.png"
  },
  "/images/vegetable/poster/3.png": {
    "type": "image/png",
    "etag": "\"104245-CNAXwGSHFP8bbqH09ncomUdIATY\"",
    "mtime": "2022-03-29T06:37:24.000Z",
    "size": 1065541,
    "path": "../public/images/vegetable/poster/3.png"
  },
  "/images/vegetable/poster/circle.png": {
    "type": "image/png",
    "etag": "\"2d106-EEe/1vJjmxg4+X7jeBMuLSl9ySs\"",
    "mtime": "2022-03-29T06:37:24.000Z",
    "size": 184582,
    "path": "../public/images/vegetable/poster/circle.png"
  },
  "/images/vegetable/poster/percentage.jpg": {
    "type": "image/jpeg",
    "etag": "\"362e7-F5Q4O8VLQF97/abJsgadyVIkS70\"",
    "mtime": "2022-03-29T06:37:24.000Z",
    "size": 221927,
    "path": "../public/images/vegetable/poster/percentage.jpg"
  },
  "/images/vegetable/poster/t1.jpg": {
    "type": "image/jpeg",
    "etag": "\"445-DSrSWc3aNnk58j4TZQiRARP8k28\"",
    "mtime": "2022-03-29T06:37:24.000Z",
    "size": 1093,
    "path": "../public/images/vegetable/poster/t1.jpg"
  },
  "/images/vegetable/poster/t2.jpg": {
    "type": "image/jpeg",
    "etag": "\"445-DSrSWc3aNnk58j4TZQiRARP8k28\"",
    "mtime": "2022-03-29T06:37:24.000Z",
    "size": 1093,
    "path": "../public/images/vegetable/poster/t2.jpg"
  },
  "/images/vegetable/poster/t3.jpg": {
    "type": "image/jpeg",
    "etag": "\"445-DSrSWc3aNnk58j4TZQiRARP8k28\"",
    "mtime": "2022-03-29T06:37:24.000Z",
    "size": 1093,
    "path": "../public/images/vegetable/poster/t3.jpg"
  },
  "/images/vegetable/update/1.jpg": {
    "type": "image/jpeg",
    "etag": "\"14ab-IOqsN59aqkTvcglkDFSnwyVho2U\"",
    "mtime": "2022-03-29T06:37:24.000Z",
    "size": 5291,
    "path": "../public/images/vegetable/update/1.jpg"
  },
  "/images/vegetable/update/2.jpg": {
    "type": "image/jpeg",
    "etag": "\"14ab-IOqsN59aqkTvcglkDFSnwyVho2U\"",
    "mtime": "2022-03-29T06:37:24.000Z",
    "size": 5291,
    "path": "../public/images/vegetable/update/2.jpg"
  },
  "/images/vegetable/update/3.jpg": {
    "type": "image/jpeg",
    "etag": "\"17ea-SiWWa9M3PJdITUObqQiEw1ArVvA\"",
    "mtime": "2022-03-29T06:37:24.000Z",
    "size": 6122,
    "path": "../public/images/vegetable/update/3.jpg"
  },
  "/_nuxt/builds/meta/65717515-fa6c-42a1-ad80-25a7083fd68f.json": {
    "type": "application/json",
    "etag": "\"8b-+s+tyBgRHbVBpKNLqzUSFx02DAo\"",
    "mtime": "2025-03-12T09:58:14.448Z",
    "size": 139,
    "path": "../public/_nuxt/builds/meta/65717515-fa6c-42a1-ad80-25a7083fd68f.json"
  },
  "/images/electronics/product/png/1.png": {
    "type": "image/png",
    "etag": "\"2932-N3aoqLS7xzVGfUHcFiyADpj0boU\"",
    "mtime": "2022-03-29T06:37:23.000Z",
    "size": 10546,
    "path": "../public/images/electronics/product/png/1.png"
  },
  "/images/electronics/product/png/10.png": {
    "type": "image/png",
    "etag": "\"26f7-H0vBpIslIvSG66Rvb8Lx5sP2pZI\"",
    "mtime": "2022-03-29T06:37:23.000Z",
    "size": 9975,
    "path": "../public/images/electronics/product/png/10.png"
  },
  "/images/electronics/product/png/11.png": {
    "type": "image/png",
    "etag": "\"35cc-wBmyD71cYdtDrKXs75aXzKB93jM\"",
    "mtime": "2022-03-29T06:37:23.000Z",
    "size": 13772,
    "path": "../public/images/electronics/product/png/11.png"
  },
  "/images/electronics/product/png/12.png": {
    "type": "image/png",
    "etag": "\"2935-KDW95xK21+5pc6KY7styz2/ssww\"",
    "mtime": "2022-03-29T06:37:23.000Z",
    "size": 10549,
    "path": "../public/images/electronics/product/png/12.png"
  },
  "/images/electronics/product/png/13.png": {
    "type": "image/png",
    "etag": "\"2b38-BvU6+KMo6yjQ8nQBuFrD+2ywNoQ\"",
    "mtime": "2022-03-29T06:37:23.000Z",
    "size": 11064,
    "path": "../public/images/electronics/product/png/13.png"
  },
  "/images/electronics/product/png/14.png": {
    "type": "image/png",
    "etag": "\"a40a-o4xwZRfglpVy13OeMITRoqiKTPE\"",
    "mtime": "2022-03-29T06:37:23.000Z",
    "size": 41994,
    "path": "../public/images/electronics/product/png/14.png"
  },
  "/images/electronics/product/png/2.png": {
    "type": "image/png",
    "etag": "\"2fbd-59WIoKrQ38ijwslvwHf6zmnbEh4\"",
    "mtime": "2022-03-29T06:37:23.000Z",
    "size": 12221,
    "path": "../public/images/electronics/product/png/2.png"
  },
  "/images/electronics/product/png/3.png": {
    "type": "image/png",
    "etag": "\"3b3d-16ArTY6u0U8i/StrhaZLQzbyyxY\"",
    "mtime": "2022-03-29T06:37:23.000Z",
    "size": 15165,
    "path": "../public/images/electronics/product/png/3.png"
  },
  "/images/electronics/product/png/4.png": {
    "type": "image/png",
    "etag": "\"3b5d-3prf/aqRruY8vLMHR/DpuOpzWA4\"",
    "mtime": "2022-03-29T06:37:23.000Z",
    "size": 15197,
    "path": "../public/images/electronics/product/png/4.png"
  },
  "/images/electronics/product/png/5.png": {
    "type": "image/png",
    "etag": "\"3012-Stz8DTtFFx3hjPjlnvLLbtN5usQ\"",
    "mtime": "2022-03-29T06:37:23.000Z",
    "size": 12306,
    "path": "../public/images/electronics/product/png/5.png"
  },
  "/images/electronics/product/png/6.png": {
    "type": "image/png",
    "etag": "\"3dcb-PbNyPgwpygFekB+HWR20dUehuo0\"",
    "mtime": "2022-03-29T06:37:23.000Z",
    "size": 15819,
    "path": "../public/images/electronics/product/png/6.png"
  },
  "/images/electronics/product/png/7.png": {
    "type": "image/png",
    "etag": "\"3182-eLgFRWsd7gPuMW1LWqsOjIRg6is\"",
    "mtime": "2022-03-29T06:37:23.000Z",
    "size": 12674,
    "path": "../public/images/electronics/product/png/7.png"
  },
  "/images/electronics/product/png/8.png": {
    "type": "image/png",
    "etag": "\"211d-yj26tCpKDZq4d2czJ4pRMr0sYss\"",
    "mtime": "2022-03-29T06:37:23.000Z",
    "size": 8477,
    "path": "../public/images/electronics/product/png/8.png"
  },
  "/images/electronics/product/png/9.png": {
    "type": "image/png",
    "etag": "\"3de5-MuhVfX7AftYPEz5opCiYLp0R4Kc\"",
    "mtime": "2022-03-29T06:37:23.000Z",
    "size": 15845,
    "path": "../public/images/electronics/product/png/9.png"
  },
  "/images/fashion/product/back/1.jpg": {
    "type": "image/jpeg",
    "etag": "\"21a6-6+FCU+5dL5CIWiohuoomW60W6cA\"",
    "mtime": "2022-03-29T06:37:23.000Z",
    "size": 8614,
    "path": "../public/images/fashion/product/back/1.jpg"
  },
  "/images/fashion/product/back/2.jpg": {
    "type": "image/jpeg",
    "etag": "\"21a6-6+FCU+5dL5CIWiohuoomW60W6cA\"",
    "mtime": "2022-03-29T06:37:23.000Z",
    "size": 8614,
    "path": "../public/images/fashion/product/back/2.jpg"
  },
  "/images/fashion/product/back/3.jpg": {
    "type": "image/jpeg",
    "etag": "\"21a6-6+FCU+5dL5CIWiohuoomW60W6cA\"",
    "mtime": "2022-03-29T06:37:23.000Z",
    "size": 8614,
    "path": "../public/images/fashion/product/back/3.jpg"
  },
  "/images/fashion/product/back/4.jpg": {
    "type": "image/jpeg",
    "etag": "\"21a6-6+FCU+5dL5CIWiohuoomW60W6cA\"",
    "mtime": "2022-03-29T06:37:23.000Z",
    "size": 8614,
    "path": "../public/images/fashion/product/back/4.jpg"
  },
  "/images/fashion/product/back/5.jpg": {
    "type": "image/jpeg",
    "etag": "\"21a6-6+FCU+5dL5CIWiohuoomW60W6cA\"",
    "mtime": "2022-03-29T06:37:23.000Z",
    "size": 8614,
    "path": "../public/images/fashion/product/back/5.jpg"
  },
  "/images/fashion/product/back/6.jpg": {
    "type": "image/jpeg",
    "etag": "\"21a6-6+FCU+5dL5CIWiohuoomW60W6cA\"",
    "mtime": "2022-03-29T06:37:23.000Z",
    "size": 8614,
    "path": "../public/images/fashion/product/back/6.jpg"
  },
  "/images/fashion/product/back/7.jpg": {
    "type": "image/jpeg",
    "etag": "\"21a6-6+FCU+5dL5CIWiohuoomW60W6cA\"",
    "mtime": "2022-03-29T06:37:23.000Z",
    "size": 8614,
    "path": "../public/images/fashion/product/back/7.jpg"
  },
  "/images/fashion/product/back/8.jpg": {
    "type": "image/jpeg",
    "etag": "\"21a6-6+FCU+5dL5CIWiohuoomW60W6cA\"",
    "mtime": "2022-03-29T06:37:23.000Z",
    "size": 8614,
    "path": "../public/images/fashion/product/back/8.jpg"
  },
  "/images/fashion/product/front/1.jpg": {
    "type": "image/jpeg",
    "etag": "\"21a6-6+FCU+5dL5CIWiohuoomW60W6cA\"",
    "mtime": "2022-03-29T06:37:23.000Z",
    "size": 8614,
    "path": "../public/images/fashion/product/front/1.jpg"
  },
  "/images/fashion/product/front/2.jpg": {
    "type": "image/jpeg",
    "etag": "\"21a6-6+FCU+5dL5CIWiohuoomW60W6cA\"",
    "mtime": "2022-03-29T06:37:23.000Z",
    "size": 8614,
    "path": "../public/images/fashion/product/front/2.jpg"
  },
  "/images/fashion/product/front/3.jpg": {
    "type": "image/jpeg",
    "etag": "\"21a6-6+FCU+5dL5CIWiohuoomW60W6cA\"",
    "mtime": "2022-03-29T06:37:23.000Z",
    "size": 8614,
    "path": "../public/images/fashion/product/front/3.jpg"
  },
  "/images/fashion/product/front/4.jpg": {
    "type": "image/jpeg",
    "etag": "\"21a6-6+FCU+5dL5CIWiohuoomW60W6cA\"",
    "mtime": "2022-03-29T06:37:23.000Z",
    "size": 8614,
    "path": "../public/images/fashion/product/front/4.jpg"
  },
  "/images/fashion/product/front/5.jpg": {
    "type": "image/jpeg",
    "etag": "\"21a6-6+FCU+5dL5CIWiohuoomW60W6cA\"",
    "mtime": "2022-03-29T06:37:23.000Z",
    "size": 8614,
    "path": "../public/images/fashion/product/front/5.jpg"
  },
  "/images/fashion/product/front/6.jpg": {
    "type": "image/jpeg",
    "etag": "\"21a6-6+FCU+5dL5CIWiohuoomW60W6cA\"",
    "mtime": "2022-03-29T06:37:23.000Z",
    "size": 8614,
    "path": "../public/images/fashion/product/front/6.jpg"
  },
  "/images/fashion/product/front/7.jpg": {
    "type": "image/jpeg",
    "etag": "\"21a6-6+FCU+5dL5CIWiohuoomW60W6cA\"",
    "mtime": "2022-03-29T06:37:23.000Z",
    "size": 8614,
    "path": "../public/images/fashion/product/front/7.jpg"
  },
  "/images/fashion/product/front/8.jpg": {
    "type": "image/jpeg",
    "etag": "\"21a6-6+FCU+5dL5CIWiohuoomW60W6cA\"",
    "mtime": "2022-03-29T06:37:23.000Z",
    "size": 8614,
    "path": "../public/images/fashion/product/front/8.jpg"
  },
  "/images/landing-image/pages/back-end/add-new-product.jpg": {
    "type": "image/jpeg",
    "etag": "\"9563-VQ58kQq+anPTBOGumjxFTdTAt+4\"",
    "mtime": "2022-03-29T06:37:23.000Z",
    "size": 38243,
    "path": "../public/images/landing-image/pages/back-end/add-new-product.jpg"
  },
  "/images/landing-image/pages/back-end/add-new-user.jpg": {
    "type": "image/jpeg",
    "etag": "\"81e6-Y0ZB9+aqxAZaR+vZ++sdkel/EBI\"",
    "mtime": "2022-03-29T06:37:23.000Z",
    "size": 33254,
    "path": "../public/images/landing-image/pages/back-end/add-new-user.jpg"
  },
  "/images/landing-image/pages/back-end/all-user.jpg": {
    "type": "image/jpeg",
    "etag": "\"101b4-8OScCvJm2K11Mi5KMuXQuXK7ds8\"",
    "mtime": "2022-03-29T06:37:23.000Z",
    "size": 65972,
    "path": "../public/images/landing-image/pages/back-end/all-user.jpg"
  },
  "/images/landing-image/pages/back-end/coupon-list.jpg": {
    "type": "image/jpeg",
    "etag": "\"a432-8RQBZeGoasokFp3QWuK/+mHfYLI\"",
    "mtime": "2022-03-29T06:37:23.000Z",
    "size": 42034,
    "path": "../public/images/landing-image/pages/back-end/coupon-list.jpg"
  },
  "/images/landing-image/pages/back-end/create-coupon.jpg": {
    "type": "image/jpeg",
    "etag": "\"8c8d-qOItgIVlupk2BYccsj8+0PBRGpg\"",
    "mtime": "2022-03-29T06:37:23.000Z",
    "size": 35981,
    "path": "../public/images/landing-image/pages/back-end/create-coupon.jpg"
  },
  "/images/landing-image/pages/back-end/create-menu.jpg": {
    "type": "image/jpeg",
    "etag": "\"7bf2-kTBsVUuixYurR7qqY5PtY1OK3js\"",
    "mtime": "2022-03-29T06:37:23.000Z",
    "size": 31730,
    "path": "../public/images/landing-image/pages/back-end/create-menu.jpg"
  },
  "/images/landing-image/pages/back-end/create-vendor.jpg": {
    "type": "image/jpeg",
    "etag": "\"7e23-55bW6tS/icgQZX0YkVXjJnPNveo\"",
    "mtime": "2022-03-29T06:37:23.000Z",
    "size": 32291,
    "path": "../public/images/landing-image/pages/back-end/create-vendor.jpg"
  },
  "/images/landing-image/pages/back-end/currency-rates.jpg": {
    "type": "image/jpeg",
    "etag": "\"a9da-R6gxQO1XskCCgXvuDYZkTY7mg24\"",
    "mtime": "2022-03-29T06:37:23.000Z",
    "size": 43482,
    "path": "../public/images/landing-image/pages/back-end/currency-rates.jpg"
  },
  "/images/landing-image/pages/back-end/dashboard.jpg": {
    "type": "image/jpeg",
    "etag": "\"10ad4-qoZdh0KdGTiB+da93vQVssrKWr8\"",
    "mtime": "2022-03-29T06:37:23.000Z",
    "size": 68308,
    "path": "../public/images/landing-image/pages/back-end/dashboard.jpg"
  },
  "/images/landing-image/pages/back-end/forgot.jpg": {
    "type": "image/jpeg",
    "etag": "\"2b30-JTdC2K7qfxNfJZV5z2/5HzzjNSY\"",
    "mtime": "2022-03-29T06:37:23.000Z",
    "size": 11056,
    "path": "../public/images/landing-image/pages/back-end/forgot.jpg"
  },
  "/images/landing-image/pages/back-end/invoice.jpg": {
    "type": "image/jpeg",
    "etag": "\"eaca-PVL63hHGrs+PvlQrkhOItvOiH8w\"",
    "mtime": "2022-03-29T06:37:23.000Z",
    "size": 60106,
    "path": "../public/images/landing-image/pages/back-end/invoice.jpg"
  },
  "/images/landing-image/pages/back-end/list-page.jpg": {
    "type": "image/jpeg",
    "etag": "\"c267-VQMOX9Gm311kJBPflwL5ynDYsF4\"",
    "mtime": "2022-03-29T06:37:23.000Z",
    "size": 49767,
    "path": "../public/images/landing-image/pages/back-end/list-page.jpg"
  },
  "/images/landing-image/pages/back-end/login.jpg": {
    "type": "image/jpeg",
    "etag": "\"44a6-jxfkLNFQXshBLmm6wIydcXKEL4E\"",
    "mtime": "2022-03-29T06:37:23.000Z",
    "size": 17574,
    "path": "../public/images/landing-image/pages/back-end/login.jpg"
  },
  "/images/landing-image/pages/back-end/menu-list.jpg": {
    "type": "image/jpeg",
    "etag": "\"9bbc-bF29ybQz6JPa1ATiprCNBS4eebw\"",
    "mtime": "2022-03-29T06:37:23.000Z",
    "size": 39868,
    "path": "../public/images/landing-image/pages/back-end/menu-list.jpg"
  },
  "/images/landing-image/pages/back-end/order-detail.jpg": {
    "type": "image/jpeg",
    "etag": "\"b7f8-b3T1Bsm/HvKAq9aznKEMMFO8ZbM\"",
    "mtime": "2022-03-29T06:37:23.000Z",
    "size": 47096,
    "path": "../public/images/landing-image/pages/back-end/order-detail.jpg"
  },
  "/images/landing-image/pages/back-end/order-list.jpg": {
    "type": "image/jpeg",
    "etag": "\"d61d-m/kyUY4AX5FXLvVtsSjc0XO2xO0\"",
    "mtime": "2022-03-29T06:37:23.000Z",
    "size": 54813,
    "path": "../public/images/landing-image/pages/back-end/order-list.jpg"
  },
  "/images/landing-image/pages/back-end/order-tracking.jpg": {
    "type": "image/jpeg",
    "etag": "\"ceaa-G21DE4DLnHywJUos12jWnmx4pOs\"",
    "mtime": "2022-03-29T06:37:23.000Z",
    "size": 52906,
    "path": "../public/images/landing-image/pages/back-end/order-tracking.jpg"
  },
  "/images/landing-image/pages/back-end/product-review.jpg": {
    "type": "image/jpeg",
    "etag": "\"fb02-xoI4Xy/jDEw67cQVD11blaa2pKU\"",
    "mtime": "2022-03-29T06:37:23.000Z",
    "size": 64258,
    "path": "../public/images/landing-image/pages/back-end/product-review.jpg"
  },
  "/images/landing-image/pages/back-end/product.jpg": {
    "type": "image/jpeg",
    "etag": "\"b271-yluBFrm0l31Aq/PwdYyaVEqJQKA\"",
    "mtime": "2022-03-29T06:37:23.000Z",
    "size": 45681,
    "path": "../public/images/landing-image/pages/back-end/product.jpg"
  },
  "/images/landing-image/pages/back-end/profile-setting.jpg": {
    "type": "image/jpeg",
    "etag": "\"b496-5Btj5v8fkaKHiINCdCxqn0ZH2GI\"",
    "mtime": "2022-03-29T06:37:23.000Z",
    "size": 46230,
    "path": "../public/images/landing-image/pages/back-end/profile-setting.jpg"
  },
  "/images/landing-image/pages/back-end/register.jpg": {
    "type": "image/jpeg",
    "etag": "\"44cc-hcXEOlSmGP6naIJvEP6PWCHFRLA\"",
    "mtime": "2022-03-29T06:37:23.000Z",
    "size": 17612,
    "path": "../public/images/landing-image/pages/back-end/register.jpg"
  },
  "/images/landing-image/pages/back-end/reports.jpg": {
    "type": "image/jpeg",
    "etag": "\"fe29-W6k6bMWaCMtlIUKdq8SdMDwQn6c\"",
    "mtime": "2022-03-29T06:37:23.000Z",
    "size": 65065,
    "path": "../public/images/landing-image/pages/back-end/reports.jpg"
  },
  "/images/landing-image/pages/back-end/support-ticket.jpg": {
    "type": "image/jpeg",
    "etag": "\"c49f-lHNOm8u4ZpSrnLBXPtphhQvGrZ0\"",
    "mtime": "2022-03-29T06:37:23.000Z",
    "size": 50335,
    "path": "../public/images/landing-image/pages/back-end/support-ticket.jpg"
  },
  "/images/landing-image/pages/back-end/taxes.jpg": {
    "type": "image/jpeg",
    "etag": "\"a80b-dXnqS0L+54W5j/9z7A5EAtxNzQE\"",
    "mtime": "2022-03-29T06:37:23.000Z",
    "size": 43019,
    "path": "../public/images/landing-image/pages/back-end/taxes.jpg"
  },
  "/images/landing-image/pages/back-end/translation.jpg": {
    "type": "image/jpeg",
    "etag": "\"e180-UEQfEv8iqM5A3ABnJjlxDfXuA7k\"",
    "mtime": "2022-03-29T06:37:23.000Z",
    "size": 57728,
    "path": "../public/images/landing-image/pages/back-end/translation.jpg"
  },
  "/images/landing-image/pages/back-end/vendor-list.jpg": {
    "type": "image/jpeg",
    "etag": "\"ec90-T+g38UpBFbNvfe0HioNv9oJGujE\"",
    "mtime": "2022-03-29T06:37:23.000Z",
    "size": 60560,
    "path": "../public/images/landing-image/pages/back-end/vendor-list.jpg"
  },
  "/images/landing-image/pages/email-template/abandonment-email.jpg": {
    "type": "image/jpeg",
    "etag": "\"b632-/da5CXokN7fIzUTAfWevCInWaWk\"",
    "mtime": "2022-03-29T06:37:23.000Z",
    "size": 46642,
    "path": "../public/images/landing-image/pages/email-template/abandonment-email.jpg"
  },
  "/images/landing-image/pages/email-template/black-friday.jpg": {
    "type": "image/jpeg",
    "etag": "\"12243-s4l/rYRWTsy+TTZd8LfowvbXrnI\"",
    "mtime": "2022-03-29T06:37:23.000Z",
    "size": 74307,
    "path": "../public/images/landing-image/pages/email-template/black-friday.jpg"
  },
  "/images/landing-image/pages/email-template/email-template-1.jpg": {
    "type": "image/jpeg",
    "etag": "\"1042e-RTDwQhZUPPGN9kVwc8XKMBn6YZM\"",
    "mtime": "2022-03-29T06:37:23.000Z",
    "size": 66606,
    "path": "../public/images/landing-image/pages/email-template/email-template-1.jpg"
  },
  "/images/landing-image/pages/email-template/email-template-2.jpg": {
    "type": "image/jpeg",
    "etag": "\"e268-ArMcd3VR/TZemGjIz1eumIGIRLg\"",
    "mtime": "2022-03-29T06:37:23.000Z",
    "size": 57960,
    "path": "../public/images/landing-image/pages/email-template/email-template-2.jpg"
  },
  "/images/landing-image/pages/email-template/offer.jpg": {
    "type": "image/jpeg",
    "etag": "\"d2ed-ipLvpvCboS5hHGXGZ/ZN2OQROIw\"",
    "mtime": "2022-03-29T06:37:23.000Z",
    "size": 53997,
    "path": "../public/images/landing-image/pages/email-template/offer.jpg"
  },
  "/images/landing-image/pages/email-template/order-success-1.jpg": {
    "type": "image/jpeg",
    "etag": "\"9f05-WSBLL0zjhJZkBUSOg7WkL5qaY5Q\"",
    "mtime": "2022-03-29T06:37:23.000Z",
    "size": 40709,
    "path": "../public/images/landing-image/pages/email-template/order-success-1.jpg"
  },
  "/images/landing-image/pages/email-template/order-success-2.jpg": {
    "type": "image/jpeg",
    "etag": "\"a68c-Z7WiPaOYzm5X17SGHulOB4K2I4E\"",
    "mtime": "2022-03-29T06:37:23.000Z",
    "size": 42636,
    "path": "../public/images/landing-image/pages/email-template/order-success-2.jpg"
  },
  "/images/landing-image/pages/email-template/product-review.jpg": {
    "type": "image/jpeg",
    "etag": "\"c32f-dneQlVKGROZ4tH52CMo0seF0mow\"",
    "mtime": "2022-03-29T06:37:23.000Z",
    "size": 49967,
    "path": "../public/images/landing-image/pages/email-template/product-review.jpg"
  },
  "/images/landing-image/pages/email-template/reset-password.jpg": {
    "type": "image/jpeg",
    "etag": "\"88bd-lJXjCTzL9adiRvSFR3jfPkAYQrk\"",
    "mtime": "2022-03-29T06:37:23.000Z",
    "size": 35005,
    "path": "../public/images/landing-image/pages/email-template/reset-password.jpg"
  },
  "/images/landing-image/pages/email-template/welcome.jpg": {
    "type": "image/jpeg",
    "etag": "\"1155a-K/g9z/J9MYkiyCVYRVyYil6PKlw\"",
    "mtime": "2022-03-29T06:37:23.000Z",
    "size": 71002,
    "path": "../public/images/landing-image/pages/email-template/welcome.jpg"
  },
  "/images/landing-image/pages/invoice/invoice-1.jpg": {
    "type": "image/jpeg",
    "etag": "\"abd5-ciBgO8QTxTjOpvzLXgnKAbP9lQE\"",
    "mtime": "2022-03-29T06:37:23.000Z",
    "size": 43989,
    "path": "../public/images/landing-image/pages/invoice/invoice-1.jpg"
  },
  "/images/landing-image/pages/invoice/invoice-2.jpg": {
    "type": "image/jpeg",
    "etag": "\"a645-po7BLJKrJNzeqJQoEyvmRhB3cuw\"",
    "mtime": "2022-03-29T06:37:23.000Z",
    "size": 42565,
    "path": "../public/images/landing-image/pages/invoice/invoice-2.jpg"
  },
  "/images/landing-image/pages/invoice/invoice-3.jpg": {
    "type": "image/jpeg",
    "etag": "\"b07a-NRxiR/ow1zdvylSDMF4C/Bss6YE\"",
    "mtime": "2022-03-29T06:37:23.000Z",
    "size": 45178,
    "path": "../public/images/landing-image/pages/invoice/invoice-3.jpg"
  }
};

const _DRIVE_LETTER_START_RE = /^[A-Za-z]:\//;
function normalizeWindowsPath(input = "") {
  if (!input) {
    return input;
  }
  return input.replace(/\\/g, "/").replace(_DRIVE_LETTER_START_RE, (r) => r.toUpperCase());
}
const _IS_ABSOLUTE_RE = /^[/\\](?![/\\])|^[/\\]{2}(?!\.)|^[A-Za-z]:[/\\]/;
const _DRIVE_LETTER_RE = /^[A-Za-z]:$/;
function cwd() {
  if (typeof process !== "undefined" && typeof process.cwd === "function") {
    return process.cwd().replace(/\\/g, "/");
  }
  return "/";
}
const resolve = function(...arguments_) {
  arguments_ = arguments_.map((argument) => normalizeWindowsPath(argument));
  let resolvedPath = "";
  let resolvedAbsolute = false;
  for (let index = arguments_.length - 1; index >= -1 && !resolvedAbsolute; index--) {
    const path = index >= 0 ? arguments_[index] : cwd();
    if (!path || path.length === 0) {
      continue;
    }
    resolvedPath = `${path}/${resolvedPath}`;
    resolvedAbsolute = isAbsolute(path);
  }
  resolvedPath = normalizeString(resolvedPath, !resolvedAbsolute);
  if (resolvedAbsolute && !isAbsolute(resolvedPath)) {
    return `/${resolvedPath}`;
  }
  return resolvedPath.length > 0 ? resolvedPath : ".";
};
function normalizeString(path, allowAboveRoot) {
  let res = "";
  let lastSegmentLength = 0;
  let lastSlash = -1;
  let dots = 0;
  let char = null;
  for (let index = 0; index <= path.length; ++index) {
    if (index < path.length) {
      char = path[index];
    } else if (char === "/") {
      break;
    } else {
      char = "/";
    }
    if (char === "/") {
      if (lastSlash === index - 1 || dots === 1) ; else if (dots === 2) {
        if (res.length < 2 || lastSegmentLength !== 2 || res[res.length - 1] !== "." || res[res.length - 2] !== ".") {
          if (res.length > 2) {
            const lastSlashIndex = res.lastIndexOf("/");
            if (lastSlashIndex === -1) {
              res = "";
              lastSegmentLength = 0;
            } else {
              res = res.slice(0, lastSlashIndex);
              lastSegmentLength = res.length - 1 - res.lastIndexOf("/");
            }
            lastSlash = index;
            dots = 0;
            continue;
          } else if (res.length > 0) {
            res = "";
            lastSegmentLength = 0;
            lastSlash = index;
            dots = 0;
            continue;
          }
        }
        if (allowAboveRoot) {
          res += res.length > 0 ? "/.." : "..";
          lastSegmentLength = 2;
        }
      } else {
        if (res.length > 0) {
          res += `/${path.slice(lastSlash + 1, index)}`;
        } else {
          res = path.slice(lastSlash + 1, index);
        }
        lastSegmentLength = index - lastSlash - 1;
      }
      lastSlash = index;
      dots = 0;
    } else if (char === "." && dots !== -1) {
      ++dots;
    } else {
      dots = -1;
    }
  }
  return res;
}
const isAbsolute = function(p) {
  return _IS_ABSOLUTE_RE.test(p);
};
const dirname = function(p) {
  const segments = normalizeWindowsPath(p).replace(/\/$/, "").split("/").slice(0, -1);
  if (segments.length === 1 && _DRIVE_LETTER_RE.test(segments[0])) {
    segments[0] += "/";
  }
  return segments.join("/") || (isAbsolute(p) ? "/" : ".");
};

function readAsset (id) {
  const serverDir = dirname(fileURLToPath(globalThis._importMeta_.url));
  return promises.readFile(resolve(serverDir, assets$1[id].path))
}

const publicAssetBases = {"/_nuxt/builds/meta/":{"maxAge":31536000},"/_nuxt/builds/":{"maxAge":1},"/_nuxt/":{"maxAge":31536000}};

function isPublicAssetURL(id = '') {
  if (assets$1[id]) {
    return true
  }
  for (const base in publicAssetBases) {
    if (id.startsWith(base)) { return true }
  }
  return false
}

function getAsset (id) {
  return assets$1[id]
}

const METHODS = /* @__PURE__ */ new Set(["HEAD", "GET"]);
const EncodingMap = { gzip: ".gz", br: ".br" };
const _2BvWv0 = eventHandler((event) => {
  if (event.method && !METHODS.has(event.method)) {
    return;
  }
  let id = decodePath(
    withLeadingSlash(withoutTrailingSlash(parseURL(event.path).pathname))
  );
  let asset;
  const encodingHeader = String(
    getRequestHeader(event, "accept-encoding") || ""
  );
  const encodings = [
    ...encodingHeader.split(",").map((e) => EncodingMap[e.trim()]).filter(Boolean).sort(),
    ""
  ];
  if (encodings.length > 1) {
    appendResponseHeader(event, "Vary", "Accept-Encoding");
  }
  for (const encoding of encodings) {
    for (const _id of [id + encoding, joinURL(id, "index.html" + encoding)]) {
      const _asset = getAsset(_id);
      if (_asset) {
        asset = _asset;
        id = _id;
        break;
      }
    }
  }
  if (!asset) {
    if (isPublicAssetURL(id)) {
      removeResponseHeader(event, "Cache-Control");
      throw createError$1({
        statusMessage: "Cannot find static asset " + id,
        statusCode: 404
      });
    }
    return;
  }
  const ifNotMatch = getRequestHeader(event, "if-none-match") === asset.etag;
  if (ifNotMatch) {
    setResponseStatus(event, 304, "Not Modified");
    return "";
  }
  const ifModifiedSinceH = getRequestHeader(event, "if-modified-since");
  const mtimeDate = new Date(asset.mtime);
  if (ifModifiedSinceH && asset.mtime && new Date(ifModifiedSinceH) >= mtimeDate) {
    setResponseStatus(event, 304, "Not Modified");
    return "";
  }
  if (asset.type && !getResponseHeader(event, "Content-Type")) {
    setResponseHeader(event, "Content-Type", asset.type);
  }
  if (asset.etag && !getResponseHeader(event, "ETag")) {
    setResponseHeader(event, "ETag", asset.etag);
  }
  if (asset.mtime && !getResponseHeader(event, "Last-Modified")) {
    setResponseHeader(event, "Last-Modified", mtimeDate.toUTCString());
  }
  if (asset.encoding && !getResponseHeader(event, "Content-Encoding")) {
    setResponseHeader(event, "Content-Encoding", asset.encoding);
  }
  if (asset.size > 0 && !getResponseHeader(event, "Content-Length")) {
    setResponseHeader(event, "Content-Length", asset.size);
  }
  return readAsset(id);
});

const _lazy_3MsgpG = () => import('../routes/renderer.mjs');

const handlers = [
  { route: '', handler: _2BvWv0, lazy: false, middleware: true, method: undefined },
  { route: '/__nuxt_error', handler: _lazy_3MsgpG, lazy: true, middleware: false, method: undefined },
  { route: '/**', handler: _lazy_3MsgpG, lazy: true, middleware: false, method: undefined }
];

function wrapToPromise(value) {
  if (!value || typeof value.then !== "function") {
    return Promise.resolve(value);
  }
  return value;
}
function asyncCall(function_, ...arguments_) {
  try {
    return wrapToPromise(function_(...arguments_));
  } catch (error) {
    return Promise.reject(error);
  }
}
function isPrimitive(value) {
  const type = typeof value;
  return value === null || type !== "object" && type !== "function";
}
function isPureObject(value) {
  const proto = Object.getPrototypeOf(value);
  return !proto || proto.isPrototypeOf(Object);
}
function stringify(value) {
  if (isPrimitive(value)) {
    return String(value);
  }
  if (isPureObject(value) || Array.isArray(value)) {
    return JSON.stringify(value);
  }
  if (typeof value.toJSON === "function") {
    return stringify(value.toJSON());
  }
  throw new Error("[unstorage] Cannot stringify value!");
}
const BASE64_PREFIX = "base64:";
function serializeRaw(value) {
  if (typeof value === "string") {
    return value;
  }
  return BASE64_PREFIX + base64Encode(value);
}
function deserializeRaw(value) {
  if (typeof value !== "string") {
    return value;
  }
  if (!value.startsWith(BASE64_PREFIX)) {
    return value;
  }
  return base64Decode(value.slice(BASE64_PREFIX.length));
}
function base64Decode(input) {
  if (globalThis.Buffer) {
    return Buffer.from(input, "base64");
  }
  return Uint8Array.from(
    globalThis.atob(input),
    (c) => c.codePointAt(0)
  );
}
function base64Encode(input) {
  if (globalThis.Buffer) {
    return Buffer.from(input).toString("base64");
  }
  return globalThis.btoa(String.fromCodePoint(...input));
}

const storageKeyProperties = [
  "hasItem",
  "getItem",
  "getItemRaw",
  "setItem",
  "setItemRaw",
  "removeItem",
  "getMeta",
  "setMeta",
  "removeMeta",
  "getKeys",
  "clear",
  "mount",
  "unmount"
];
function prefixStorage(storage, base) {
  base = normalizeBaseKey(base);
  if (!base) {
    return storage;
  }
  const nsStorage = { ...storage };
  for (const property of storageKeyProperties) {
    nsStorage[property] = (key = "", ...args) => (
      // @ts-ignore
      storage[property](base + key, ...args)
    );
  }
  nsStorage.getKeys = (key = "", ...arguments_) => storage.getKeys(base + key, ...arguments_).then((keys) => keys.map((key2) => key2.slice(base.length)));
  return nsStorage;
}
function normalizeKey$1(key) {
  if (!key) {
    return "";
  }
  return key.split("?")[0]?.replace(/[/\\]/g, ":").replace(/:+/g, ":").replace(/^:|:$/g, "") || "";
}
function joinKeys(...keys) {
  return normalizeKey$1(keys.join(":"));
}
function normalizeBaseKey(base) {
  base = normalizeKey$1(base);
  return base ? base + ":" : "";
}

function defineDriver$1(factory) {
  return factory;
}

const DRIVER_NAME$1 = "memory";
const memory = defineDriver$1(() => {
  const data = /* @__PURE__ */ new Map();
  return {
    name: DRIVER_NAME$1,
    getInstance: () => data,
    hasItem(key) {
      return data.has(key);
    },
    getItem(key) {
      return data.get(key) ?? null;
    },
    getItemRaw(key) {
      return data.get(key) ?? null;
    },
    setItem(key, value) {
      data.set(key, value);
    },
    setItemRaw(key, value) {
      data.set(key, value);
    },
    removeItem(key) {
      data.delete(key);
    },
    getKeys() {
      return [...data.keys()];
    },
    clear() {
      data.clear();
    },
    dispose() {
      data.clear();
    }
  };
});

function createStorage(options = {}) {
  const context = {
    mounts: { "": options.driver || memory() },
    mountpoints: [""],
    watching: false,
    watchListeners: [],
    unwatch: {}
  };
  const getMount = (key) => {
    for (const base of context.mountpoints) {
      if (key.startsWith(base)) {
        return {
          base,
          relativeKey: key.slice(base.length),
          driver: context.mounts[base]
        };
      }
    }
    return {
      base: "",
      relativeKey: key,
      driver: context.mounts[""]
    };
  };
  const getMounts = (base, includeParent) => {
    return context.mountpoints.filter(
      (mountpoint) => mountpoint.startsWith(base) || includeParent && base.startsWith(mountpoint)
    ).map((mountpoint) => ({
      relativeBase: base.length > mountpoint.length ? base.slice(mountpoint.length) : void 0,
      mountpoint,
      driver: context.mounts[mountpoint]
    }));
  };
  const onChange = (event, key) => {
    if (!context.watching) {
      return;
    }
    key = normalizeKey$1(key);
    for (const listener of context.watchListeners) {
      listener(event, key);
    }
  };
  const startWatch = async () => {
    if (context.watching) {
      return;
    }
    context.watching = true;
    for (const mountpoint in context.mounts) {
      context.unwatch[mountpoint] = await watch(
        context.mounts[mountpoint],
        onChange,
        mountpoint
      );
    }
  };
  const stopWatch = async () => {
    if (!context.watching) {
      return;
    }
    for (const mountpoint in context.unwatch) {
      await context.unwatch[mountpoint]();
    }
    context.unwatch = {};
    context.watching = false;
  };
  const runBatch = (items, commonOptions, cb) => {
    const batches = /* @__PURE__ */ new Map();
    const getBatch = (mount) => {
      let batch = batches.get(mount.base);
      if (!batch) {
        batch = {
          driver: mount.driver,
          base: mount.base,
          items: []
        };
        batches.set(mount.base, batch);
      }
      return batch;
    };
    for (const item of items) {
      const isStringItem = typeof item === "string";
      const key = normalizeKey$1(isStringItem ? item : item.key);
      const value = isStringItem ? void 0 : item.value;
      const options2 = isStringItem || !item.options ? commonOptions : { ...commonOptions, ...item.options };
      const mount = getMount(key);
      getBatch(mount).items.push({
        key,
        value,
        relativeKey: mount.relativeKey,
        options: options2
      });
    }
    return Promise.all([...batches.values()].map((batch) => cb(batch))).then(
      (r) => r.flat()
    );
  };
  const storage = {
    // Item
    hasItem(key, opts = {}) {
      key = normalizeKey$1(key);
      const { relativeKey, driver } = getMount(key);
      return asyncCall(driver.hasItem, relativeKey, opts);
    },
    getItem(key, opts = {}) {
      key = normalizeKey$1(key);
      const { relativeKey, driver } = getMount(key);
      return asyncCall(driver.getItem, relativeKey, opts).then(
        (value) => destr(value)
      );
    },
    getItems(items, commonOptions = {}) {
      return runBatch(items, commonOptions, (batch) => {
        if (batch.driver.getItems) {
          return asyncCall(
            batch.driver.getItems,
            batch.items.map((item) => ({
              key: item.relativeKey,
              options: item.options
            })),
            commonOptions
          ).then(
            (r) => r.map((item) => ({
              key: joinKeys(batch.base, item.key),
              value: destr(item.value)
            }))
          );
        }
        return Promise.all(
          batch.items.map((item) => {
            return asyncCall(
              batch.driver.getItem,
              item.relativeKey,
              item.options
            ).then((value) => ({
              key: item.key,
              value: destr(value)
            }));
          })
        );
      });
    },
    getItemRaw(key, opts = {}) {
      key = normalizeKey$1(key);
      const { relativeKey, driver } = getMount(key);
      if (driver.getItemRaw) {
        return asyncCall(driver.getItemRaw, relativeKey, opts);
      }
      return asyncCall(driver.getItem, relativeKey, opts).then(
        (value) => deserializeRaw(value)
      );
    },
    async setItem(key, value, opts = {}) {
      if (value === void 0) {
        return storage.removeItem(key);
      }
      key = normalizeKey$1(key);
      const { relativeKey, driver } = getMount(key);
      if (!driver.setItem) {
        return;
      }
      await asyncCall(driver.setItem, relativeKey, stringify(value), opts);
      if (!driver.watch) {
        onChange("update", key);
      }
    },
    async setItems(items, commonOptions) {
      await runBatch(items, commonOptions, async (batch) => {
        if (batch.driver.setItems) {
          return asyncCall(
            batch.driver.setItems,
            batch.items.map((item) => ({
              key: item.relativeKey,
              value: stringify(item.value),
              options: item.options
            })),
            commonOptions
          );
        }
        if (!batch.driver.setItem) {
          return;
        }
        await Promise.all(
          batch.items.map((item) => {
            return asyncCall(
              batch.driver.setItem,
              item.relativeKey,
              stringify(item.value),
              item.options
            );
          })
        );
      });
    },
    async setItemRaw(key, value, opts = {}) {
      if (value === void 0) {
        return storage.removeItem(key, opts);
      }
      key = normalizeKey$1(key);
      const { relativeKey, driver } = getMount(key);
      if (driver.setItemRaw) {
        await asyncCall(driver.setItemRaw, relativeKey, value, opts);
      } else if (driver.setItem) {
        await asyncCall(driver.setItem, relativeKey, serializeRaw(value), opts);
      } else {
        return;
      }
      if (!driver.watch) {
        onChange("update", key);
      }
    },
    async removeItem(key, opts = {}) {
      if (typeof opts === "boolean") {
        opts = { removeMeta: opts };
      }
      key = normalizeKey$1(key);
      const { relativeKey, driver } = getMount(key);
      if (!driver.removeItem) {
        return;
      }
      await asyncCall(driver.removeItem, relativeKey, opts);
      if (opts.removeMeta || opts.removeMata) {
        await asyncCall(driver.removeItem, relativeKey + "$", opts);
      }
      if (!driver.watch) {
        onChange("remove", key);
      }
    },
    // Meta
    async getMeta(key, opts = {}) {
      if (typeof opts === "boolean") {
        opts = { nativeOnly: opts };
      }
      key = normalizeKey$1(key);
      const { relativeKey, driver } = getMount(key);
      const meta = /* @__PURE__ */ Object.create(null);
      if (driver.getMeta) {
        Object.assign(meta, await asyncCall(driver.getMeta, relativeKey, opts));
      }
      if (!opts.nativeOnly) {
        const value = await asyncCall(
          driver.getItem,
          relativeKey + "$",
          opts
        ).then((value_) => destr(value_));
        if (value && typeof value === "object") {
          if (typeof value.atime === "string") {
            value.atime = new Date(value.atime);
          }
          if (typeof value.mtime === "string") {
            value.mtime = new Date(value.mtime);
          }
          Object.assign(meta, value);
        }
      }
      return meta;
    },
    setMeta(key, value, opts = {}) {
      return this.setItem(key + "$", value, opts);
    },
    removeMeta(key, opts = {}) {
      return this.removeItem(key + "$", opts);
    },
    // Keys
    async getKeys(base, opts = {}) {
      base = normalizeBaseKey(base);
      const mounts = getMounts(base, true);
      let maskedMounts = [];
      const allKeys = [];
      for (const mount of mounts) {
        const rawKeys = await asyncCall(
          mount.driver.getKeys,
          mount.relativeBase,
          opts
        );
        for (const key of rawKeys) {
          const fullKey = mount.mountpoint + normalizeKey$1(key);
          if (!maskedMounts.some((p) => fullKey.startsWith(p))) {
            allKeys.push(fullKey);
          }
        }
        maskedMounts = [
          mount.mountpoint,
          ...maskedMounts.filter((p) => !p.startsWith(mount.mountpoint))
        ];
      }
      return base ? allKeys.filter(
        (key) => key.startsWith(base) && key[key.length - 1] !== "$"
      ) : allKeys.filter((key) => key[key.length - 1] !== "$");
    },
    // Utils
    async clear(base, opts = {}) {
      base = normalizeBaseKey(base);
      await Promise.all(
        getMounts(base, false).map(async (m) => {
          if (m.driver.clear) {
            return asyncCall(m.driver.clear, m.relativeBase, opts);
          }
          if (m.driver.removeItem) {
            const keys = await m.driver.getKeys(m.relativeBase || "", opts);
            return Promise.all(
              keys.map((key) => m.driver.removeItem(key, opts))
            );
          }
        })
      );
    },
    async dispose() {
      await Promise.all(
        Object.values(context.mounts).map((driver) => dispose(driver))
      );
    },
    async watch(callback) {
      await startWatch();
      context.watchListeners.push(callback);
      return async () => {
        context.watchListeners = context.watchListeners.filter(
          (listener) => listener !== callback
        );
        if (context.watchListeners.length === 0) {
          await stopWatch();
        }
      };
    },
    async unwatch() {
      context.watchListeners = [];
      await stopWatch();
    },
    // Mount
    mount(base, driver) {
      base = normalizeBaseKey(base);
      if (base && context.mounts[base]) {
        throw new Error(`already mounted at ${base}`);
      }
      if (base) {
        context.mountpoints.push(base);
        context.mountpoints.sort((a, b) => b.length - a.length);
      }
      context.mounts[base] = driver;
      if (context.watching) {
        Promise.resolve(watch(driver, onChange, base)).then((unwatcher) => {
          context.unwatch[base] = unwatcher;
        }).catch(console.error);
      }
      return storage;
    },
    async unmount(base, _dispose = true) {
      base = normalizeBaseKey(base);
      if (!base || !context.mounts[base]) {
        return;
      }
      if (context.watching && base in context.unwatch) {
        context.unwatch[base]?.();
        delete context.unwatch[base];
      }
      if (_dispose) {
        await dispose(context.mounts[base]);
      }
      context.mountpoints = context.mountpoints.filter((key) => key !== base);
      delete context.mounts[base];
    },
    getMount(key = "") {
      key = normalizeKey$1(key) + ":";
      const m = getMount(key);
      return {
        driver: m.driver,
        base: m.base
      };
    },
    getMounts(base = "", opts = {}) {
      base = normalizeKey$1(base);
      const mounts = getMounts(base, opts.parents);
      return mounts.map((m) => ({
        driver: m.driver,
        base: m.mountpoint
      }));
    },
    // Aliases
    keys: (base, opts = {}) => storage.getKeys(base, opts),
    get: (key, opts = {}) => storage.getItem(key, opts),
    set: (key, value, opts = {}) => storage.setItem(key, value, opts),
    has: (key, opts = {}) => storage.hasItem(key, opts),
    del: (key, opts = {}) => storage.removeItem(key, opts),
    remove: (key, opts = {}) => storage.removeItem(key, opts)
  };
  return storage;
}
function watch(driver, onChange, base) {
  return driver.watch ? driver.watch((event, key) => onChange(event, base + key)) : () => {
  };
}
async function dispose(driver) {
  if (typeof driver.dispose === "function") {
    await asyncCall(driver.dispose);
  }
}

const _assets = {

};

const normalizeKey = function normalizeKey(key) {
  if (!key) {
    return "";
  }
  return key.split("?")[0]?.replace(/[/\\]/g, ":").replace(/:+/g, ":").replace(/^:|:$/g, "") || "";
};

const assets = {
  getKeys() {
    return Promise.resolve(Object.keys(_assets))
  },
  hasItem (id) {
    id = normalizeKey(id);
    return Promise.resolve(id in _assets)
  },
  getItem (id) {
    id = normalizeKey(id);
    return Promise.resolve(_assets[id] ? _assets[id].import() : null)
  },
  getMeta (id) {
    id = normalizeKey(id);
    return Promise.resolve(_assets[id] ? _assets[id].meta : {})
  }
};

function defineDriver(factory) {
  return factory;
}
function createError(driver, message, opts) {
  const err = new Error(`[unstorage] [${driver}] ${message}`, opts);
  if (Error.captureStackTrace) {
    Error.captureStackTrace(err, createError);
  }
  return err;
}
function createRequiredError(driver, name) {
  if (Array.isArray(name)) {
    return createError(
      driver,
      `Missing some of the required options ${name.map((n) => "`" + n + "`").join(", ")}`
    );
  }
  return createError(driver, `Missing required option \`${name}\`.`);
}

function ignoreNotfound(err) {
  return err.code === "ENOENT" || err.code === "EISDIR" ? null : err;
}
function ignoreExists(err) {
  return err.code === "EEXIST" ? null : err;
}
async function writeFile(path, data, encoding) {
  await ensuredir(dirname$1(path));
  return promises.writeFile(path, data, encoding);
}
function readFile(path, encoding) {
  return promises.readFile(path, encoding).catch(ignoreNotfound);
}
function unlink(path) {
  return promises.unlink(path).catch(ignoreNotfound);
}
function readdir(dir) {
  return promises.readdir(dir, { withFileTypes: true }).catch(ignoreNotfound).then((r) => r || []);
}
async function ensuredir(dir) {
  if (existsSync(dir)) {
    return;
  }
  await ensuredir(dirname$1(dir)).catch(ignoreExists);
  await promises.mkdir(dir).catch(ignoreExists);
}
async function readdirRecursive(dir, ignore) {
  if (ignore && ignore(dir)) {
    return [];
  }
  const entries = await readdir(dir);
  const files = [];
  await Promise.all(
    entries.map(async (entry) => {
      const entryPath = resolve$1(dir, entry.name);
      if (entry.isDirectory()) {
        const dirFiles = await readdirRecursive(entryPath, ignore);
        files.push(...dirFiles.map((f) => entry.name + "/" + f));
      } else {
        if (!(ignore && ignore(entry.name))) {
          files.push(entry.name);
        }
      }
    })
  );
  return files;
}
async function rmRecursive(dir) {
  const entries = await readdir(dir);
  await Promise.all(
    entries.map((entry) => {
      const entryPath = resolve$1(dir, entry.name);
      if (entry.isDirectory()) {
        return rmRecursive(entryPath).then(() => promises.rmdir(entryPath));
      } else {
        return promises.unlink(entryPath);
      }
    })
  );
}

const PATH_TRAVERSE_RE = /\.\.:|\.\.$/;
const DRIVER_NAME = "fs-lite";
const unstorage_47drivers_47fs_45lite = defineDriver((opts = {}) => {
  if (!opts.base) {
    throw createRequiredError(DRIVER_NAME, "base");
  }
  opts.base = resolve$1(opts.base);
  const r = (key) => {
    if (PATH_TRAVERSE_RE.test(key)) {
      throw createError(
        DRIVER_NAME,
        `Invalid key: ${JSON.stringify(key)}. It should not contain .. segments`
      );
    }
    const resolved = join(opts.base, key.replace(/:/g, "/"));
    return resolved;
  };
  return {
    name: DRIVER_NAME,
    options: opts,
    hasItem(key) {
      return existsSync(r(key));
    },
    getItem(key) {
      return readFile(r(key), "utf8");
    },
    getItemRaw(key) {
      return readFile(r(key));
    },
    async getMeta(key) {
      const { atime, mtime, size, birthtime, ctime } = await promises.stat(r(key)).catch(() => ({}));
      return { atime, mtime, size, birthtime, ctime };
    },
    setItem(key, value) {
      if (opts.readOnly) {
        return;
      }
      return writeFile(r(key), value, "utf8");
    },
    setItemRaw(key, value) {
      if (opts.readOnly) {
        return;
      }
      return writeFile(r(key), value);
    },
    removeItem(key) {
      if (opts.readOnly) {
        return;
      }
      return unlink(r(key));
    },
    getKeys() {
      return readdirRecursive(r("."), opts.ignore);
    },
    async clear() {
      if (opts.readOnly || opts.noClear) {
        return;
      }
      await rmRecursive(r("."));
    }
  };
});

const storage = createStorage({});

storage.mount('/assets', assets);

storage.mount('data', unstorage_47drivers_47fs_45lite({"driver":"fsLite","base":"C:\\Users\\DELL\\Desktop\\fronend\\.data\\kv"}));

function useStorage(base = "") {
  return base ? prefixStorage(storage, base) : storage;
}

function defaultCacheOptions() {
  return {
    name: "_",
    base: "/cache",
    swr: true,
    maxAge: 1
  };
}
function defineCachedFunction(fn, opts = {}) {
  opts = { ...defaultCacheOptions(), ...opts };
  const pending = {};
  const group = opts.group || "nitro/functions";
  const name = opts.name || fn.name || "_";
  const integrity = opts.integrity || hash([fn, opts]);
  const validate = opts.validate || ((entry) => entry.value !== void 0);
  async function get(key, resolver, shouldInvalidateCache, event) {
    const cacheKey = [opts.base, group, name, key + ".json"].filter(Boolean).join(":").replace(/:\/$/, ":index");
    let entry = await useStorage().getItem(cacheKey).catch((error) => {
      console.error(`[nitro] [cache] Cache read error.`, error);
      useNitroApp().captureError(error, { event, tags: ["cache"] });
    }) || {};
    if (typeof entry !== "object") {
      entry = {};
      const error = new Error("Malformed data read from cache.");
      console.error("[nitro] [cache]", error);
      useNitroApp().captureError(error, { event, tags: ["cache"] });
    }
    const ttl = (opts.maxAge ?? 0) * 1e3;
    if (ttl) {
      entry.expires = Date.now() + ttl;
    }
    const expired = shouldInvalidateCache || entry.integrity !== integrity || ttl && Date.now() - (entry.mtime || 0) > ttl || validate(entry) === false;
    const _resolve = async () => {
      const isPending = pending[key];
      if (!isPending) {
        if (entry.value !== void 0 && (opts.staleMaxAge || 0) >= 0 && opts.swr === false) {
          entry.value = void 0;
          entry.integrity = void 0;
          entry.mtime = void 0;
          entry.expires = void 0;
        }
        pending[key] = Promise.resolve(resolver());
      }
      try {
        entry.value = await pending[key];
      } catch (error) {
        if (!isPending) {
          delete pending[key];
        }
        throw error;
      }
      if (!isPending) {
        entry.mtime = Date.now();
        entry.integrity = integrity;
        delete pending[key];
        if (validate(entry) !== false) {
          let setOpts;
          if (opts.maxAge && !opts.swr) {
            setOpts = { ttl: opts.maxAge };
          }
          const promise = useStorage().setItem(cacheKey, entry, setOpts).catch((error) => {
            console.error(`[nitro] [cache] Cache write error.`, error);
            useNitroApp().captureError(error, { event, tags: ["cache"] });
          });
          if (event?.waitUntil) {
            event.waitUntil(promise);
          }
        }
      }
    };
    const _resolvePromise = expired ? _resolve() : Promise.resolve();
    if (entry.value === void 0) {
      await _resolvePromise;
    } else if (expired && event && event.waitUntil) {
      event.waitUntil(_resolvePromise);
    }
    if (opts.swr && validate(entry) !== false) {
      _resolvePromise.catch((error) => {
        console.error(`[nitro] [cache] SWR handler error.`, error);
        useNitroApp().captureError(error, { event, tags: ["cache"] });
      });
      return entry;
    }
    return _resolvePromise.then(() => entry);
  }
  return async (...args) => {
    const shouldBypassCache = await opts.shouldBypassCache?.(...args);
    if (shouldBypassCache) {
      return fn(...args);
    }
    const key = await (opts.getKey || getKey)(...args);
    const shouldInvalidateCache = await opts.shouldInvalidateCache?.(...args);
    const entry = await get(
      key,
      () => fn(...args),
      shouldInvalidateCache,
      args[0] && isEvent(args[0]) ? args[0] : void 0
    );
    let value = entry.value;
    if (opts.transform) {
      value = await opts.transform(entry, ...args) || value;
    }
    return value;
  };
}
function cachedFunction(fn, opts = {}) {
  return defineCachedFunction(fn, opts);
}
function getKey(...args) {
  return args.length > 0 ? hash(args, {}) : "";
}
function escapeKey(key) {
  return String(key).replace(/\W/g, "");
}
function defineCachedEventHandler(handler, opts = defaultCacheOptions()) {
  const variableHeaderNames = (opts.varies || []).filter(Boolean).map((h) => h.toLowerCase()).sort();
  const _opts = {
    ...opts,
    getKey: async (event) => {
      const customKey = await opts.getKey?.(event);
      if (customKey) {
        return escapeKey(customKey);
      }
      const _path = event.node.req.originalUrl || event.node.req.url || event.path;
      let _pathname;
      try {
        _pathname = escapeKey(decodeURI(parseURL(_path).pathname)).slice(0, 16) || "index";
      } catch {
        _pathname = "-";
      }
      const _hashedPath = `${_pathname}.${hash(_path)}`;
      const _headers = variableHeaderNames.map((header) => [header, event.node.req.headers[header]]).map(([name, value]) => `${escapeKey(name)}.${hash(value)}`);
      return [_hashedPath, ..._headers].join(":");
    },
    validate: (entry) => {
      if (!entry.value) {
        return false;
      }
      if (entry.value.code >= 400) {
        return false;
      }
      if (entry.value.body === void 0) {
        return false;
      }
      if (entry.value.headers.etag === "undefined" || entry.value.headers["last-modified"] === "undefined") {
        return false;
      }
      return true;
    },
    group: opts.group || "nitro/handlers",
    integrity: opts.integrity || hash([handler, opts])
  };
  const _cachedHandler = cachedFunction(
    async (incomingEvent) => {
      const variableHeaders = {};
      for (const header of variableHeaderNames) {
        const value = incomingEvent.node.req.headers[header];
        if (value !== void 0) {
          variableHeaders[header] = value;
        }
      }
      const reqProxy = cloneWithProxy(incomingEvent.node.req, {
        headers: variableHeaders
      });
      const resHeaders = {};
      let _resSendBody;
      const resProxy = cloneWithProxy(incomingEvent.node.res, {
        statusCode: 200,
        writableEnded: false,
        writableFinished: false,
        headersSent: false,
        closed: false,
        getHeader(name) {
          return resHeaders[name];
        },
        setHeader(name, value) {
          resHeaders[name] = value;
          return this;
        },
        getHeaderNames() {
          return Object.keys(resHeaders);
        },
        hasHeader(name) {
          return name in resHeaders;
        },
        removeHeader(name) {
          delete resHeaders[name];
        },
        getHeaders() {
          return resHeaders;
        },
        end(chunk, arg2, arg3) {
          if (typeof chunk === "string") {
            _resSendBody = chunk;
          }
          if (typeof arg2 === "function") {
            arg2();
          }
          if (typeof arg3 === "function") {
            arg3();
          }
          return this;
        },
        write(chunk, arg2, arg3) {
          if (typeof chunk === "string") {
            _resSendBody = chunk;
          }
          if (typeof arg2 === "function") {
            arg2(void 0);
          }
          if (typeof arg3 === "function") {
            arg3();
          }
          return true;
        },
        writeHead(statusCode, headers2) {
          this.statusCode = statusCode;
          if (headers2) {
            if (Array.isArray(headers2) || typeof headers2 === "string") {
              throw new TypeError("Raw headers  is not supported.");
            }
            for (const header in headers2) {
              const value = headers2[header];
              if (value !== void 0) {
                this.setHeader(
                  header,
                  value
                );
              }
            }
          }
          return this;
        }
      });
      const event = createEvent(reqProxy, resProxy);
      event.fetch = (url, fetchOptions) => fetchWithEvent(event, url, fetchOptions, {
        fetch: useNitroApp().localFetch
      });
      event.$fetch = (url, fetchOptions) => fetchWithEvent(event, url, fetchOptions, {
        fetch: globalThis.$fetch
      });
      event.context = incomingEvent.context;
      event.context.cache = {
        options: _opts
      };
      const body = await handler(event) || _resSendBody;
      const headers = event.node.res.getHeaders();
      headers.etag = String(
        headers.Etag || headers.etag || `W/"${hash(body)}"`
      );
      headers["last-modified"] = String(
        headers["Last-Modified"] || headers["last-modified"] || (/* @__PURE__ */ new Date()).toUTCString()
      );
      const cacheControl = [];
      if (opts.swr) {
        if (opts.maxAge) {
          cacheControl.push(`s-maxage=${opts.maxAge}`);
        }
        if (opts.staleMaxAge) {
          cacheControl.push(`stale-while-revalidate=${opts.staleMaxAge}`);
        } else {
          cacheControl.push("stale-while-revalidate");
        }
      } else if (opts.maxAge) {
        cacheControl.push(`max-age=${opts.maxAge}`);
      }
      if (cacheControl.length > 0) {
        headers["cache-control"] = cacheControl.join(", ");
      }
      const cacheEntry = {
        code: event.node.res.statusCode,
        headers,
        body
      };
      return cacheEntry;
    },
    _opts
  );
  return defineEventHandler(async (event) => {
    if (opts.headersOnly) {
      if (handleCacheHeaders(event, { maxAge: opts.maxAge })) {
        return;
      }
      return handler(event);
    }
    const response = await _cachedHandler(
      event
    );
    if (event.node.res.headersSent || event.node.res.writableEnded) {
      return response.body;
    }
    if (handleCacheHeaders(event, {
      modifiedTime: new Date(response.headers["last-modified"]),
      etag: response.headers.etag,
      maxAge: opts.maxAge
    })) {
      return;
    }
    event.node.res.statusCode = response.code;
    for (const name in response.headers) {
      const value = response.headers[name];
      if (name === "set-cookie") {
        event.node.res.appendHeader(
          name,
          splitCookiesString(value)
        );
      } else {
        if (value !== void 0) {
          event.node.res.setHeader(name, value);
        }
      }
    }
    return response.body;
  });
}
function cloneWithProxy(obj, overrides) {
  return new Proxy(obj, {
    get(target, property, receiver) {
      if (property in overrides) {
        return overrides[property];
      }
      return Reflect.get(target, property, receiver);
    },
    set(target, property, value, receiver) {
      if (property in overrides) {
        overrides[property] = value;
        return true;
      }
      return Reflect.set(target, property, value, receiver);
    }
  });
}
const cachedEventHandler = defineCachedEventHandler;

function klona(x) {
	if (typeof x !== 'object') return x;

	var k, tmp, str=Object.prototype.toString.call(x);

	if (str === '[object Object]') {
		if (x.constructor !== Object && typeof x.constructor === 'function') {
			tmp = new x.constructor();
			for (k in x) {
				if (x.hasOwnProperty(k) && tmp[k] !== x[k]) {
					tmp[k] = klona(x[k]);
				}
			}
		} else {
			tmp = {}; // null
			for (k in x) {
				if (k === '__proto__') {
					Object.defineProperty(tmp, k, {
						value: klona(x[k]),
						configurable: true,
						enumerable: true,
						writable: true,
					});
				} else {
					tmp[k] = klona(x[k]);
				}
			}
		}
		return tmp;
	}

	if (str === '[object Array]') {
		k = x.length;
		for (tmp=Array(k); k--;) {
			tmp[k] = klona(x[k]);
		}
		return tmp;
	}

	if (str === '[object Set]') {
		tmp = new Set;
		x.forEach(function (val) {
			tmp.add(klona(val));
		});
		return tmp;
	}

	if (str === '[object Map]') {
		tmp = new Map;
		x.forEach(function (val, key) {
			tmp.set(klona(key), klona(val));
		});
		return tmp;
	}

	if (str === '[object Date]') {
		return new Date(+x);
	}

	if (str === '[object RegExp]') {
		tmp = new RegExp(x.source, x.flags);
		tmp.lastIndex = x.lastIndex;
		return tmp;
	}

	if (str === '[object DataView]') {
		return new x.constructor( klona(x.buffer) );
	}

	if (str === '[object ArrayBuffer]') {
		return x.slice(0);
	}

	// ArrayBuffer.isView(x)
	// ~> `new` bcuz `Buffer.slice` => ref
	if (str.slice(-6) === 'Array]') {
		return new x.constructor(x);
	}

	return x;
}

const inlineAppConfig = {
  "nuxt": {}
};



const appConfig = defuFn(inlineAppConfig);

const NUMBER_CHAR_RE = /\d/;
const STR_SPLITTERS = ["-", "_", "/", "."];
function isUppercase(char = "") {
  if (NUMBER_CHAR_RE.test(char)) {
    return void 0;
  }
  return char !== char.toLowerCase();
}
function splitByCase(str, separators) {
  const splitters = STR_SPLITTERS;
  const parts = [];
  if (!str || typeof str !== "string") {
    return parts;
  }
  let buff = "";
  let previousUpper;
  let previousSplitter;
  for (const char of str) {
    const isSplitter = splitters.includes(char);
    if (isSplitter === true) {
      parts.push(buff);
      buff = "";
      previousUpper = void 0;
      continue;
    }
    const isUpper = isUppercase(char);
    if (previousSplitter === false) {
      if (previousUpper === false && isUpper === true) {
        parts.push(buff);
        buff = char;
        previousUpper = isUpper;
        continue;
      }
      if (previousUpper === true && isUpper === false && buff.length > 1) {
        const lastChar = buff.at(-1);
        parts.push(buff.slice(0, Math.max(0, buff.length - 1)));
        buff = lastChar + char;
        previousUpper = isUpper;
        continue;
      }
    }
    buff += char;
    previousUpper = isUpper;
    previousSplitter = isSplitter;
  }
  parts.push(buff);
  return parts;
}
function kebabCase(str, joiner) {
  return str ? (Array.isArray(str) ? str : splitByCase(str)).map((p) => p.toLowerCase()).join(joiner) : "";
}
function snakeCase(str) {
  return kebabCase(str || "", "_");
}

function getEnv(key, opts) {
  const envKey = snakeCase(key).toUpperCase();
  return destr(
    process.env[opts.prefix + envKey] ?? process.env[opts.altPrefix + envKey]
  );
}
function _isObject(input) {
  return typeof input === "object" && !Array.isArray(input);
}
function applyEnv(obj, opts, parentKey = "") {
  for (const key in obj) {
    const subKey = parentKey ? `${parentKey}_${key}` : key;
    const envValue = getEnv(subKey, opts);
    if (_isObject(obj[key])) {
      if (_isObject(envValue)) {
        obj[key] = { ...obj[key], ...envValue };
        applyEnv(obj[key], opts, subKey);
      } else if (envValue === void 0) {
        applyEnv(obj[key], opts, subKey);
      } else {
        obj[key] = envValue ?? obj[key];
      }
    } else {
      obj[key] = envValue ?? obj[key];
    }
    if (opts.envExpansion && typeof obj[key] === "string") {
      obj[key] = _expandFromEnv(obj[key]);
    }
  }
  return obj;
}
const envExpandRx = /{{(.*?)}}/g;
function _expandFromEnv(value) {
  return value.replace(envExpandRx, (match, key) => {
    return process.env[key] || match;
  });
}

const _inlineRuntimeConfig = {
  "app": {
    "baseURL": "/",
    "buildId": "65717515-fa6c-42a1-ad80-25a7083fd68f",
    "buildAssetsDir": "/_nuxt/",
    "cdnURL": ""
  },
  "nitro": {
    "envPrefix": "NUXT_",
    "routeRules": {
      "/__nuxt_error": {
        "cache": false
      },
      "/_nuxt/builds/meta/**": {
        "headers": {
          "cache-control": "public, max-age=31536000, immutable"
        }
      },
      "/_nuxt/builds/**": {
        "headers": {
          "cache-control": "public, max-age=1, immutable"
        }
      },
      "/_nuxt/**": {
        "headers": {
          "cache-control": "public, max-age=31536000, immutable"
        }
      }
    }
  },
  "public": {
    "const": {
      "comparePagePath": "/page/compare",
      "cartPagePath": "/page/cart",
      "wishlistPagePath": "/page/wishlist",
      "CommonImagePath": "@/assets/images/",
      "RawHamColorblockTshirt": "Raw Ham Colorblock T-shirt",
      "Review": "5040 Review",
      "Price": "$49.55",
      "Size": "Size",
      "Sizes": [
        "S",
        "M",
        "L",
        "XL",
        "XXL"
      ],
      "Color": "Color",
      "Black": "Black",
      "White": "White",
      "Blue": "Blue",
      "Gray": "Gray",
      "Qty": "Qty",
      "Quantity": [
        1,
        2,
        3,
        4
      ],
      "Addtocart": "Add to cart",
      "AddedToBag": "Added To Bag",
      "sharewith": "Share With",
      "Sale": "Sale",
      "NewTrandingFashion": "New Tranding Fashion",
      "BUYONEGETONE": "BUY ONE GET ONE",
      "FREE": "FREE",
      "Discover": "Discover",
      "OurCollection": "Our Collection",
      "OurCategory": "Our Category",
      "NewArrival": "New Arrival",
      "Newoffers": "New Offers",
      "JustForYou": "Just For You",
      "InstagramShop": "Instagram Shop",
      "NewCollection": "New Collection",
      "LatestProduct": "Latest Product",
      "OurProduct": "Our Product",
      "Mostpopularss": "Most Popular",
      "OurUpdate": "Our News & Update",
      "OurBlog": "Our Blog",
      "Buttons": "Button",
      "SubscribeOurNews": "Subscribe Our News",
      "SubscribeDescription": "Subscribe and receive our newsletters to follow the news about our fresh and fantastic Shoes Products.",
      "ShopNow": "Shop Now",
      "NEW": "New",
      "OFF": "Off",
      "Next": "Next",
      "Prev": "Prev",
      "HurryUp": "Hurry up!",
      "SpecialOffer": "Special Offer",
      "Showdetails": "Show details",
      "LearnMore": "Learn more",
      "VRCollection": "VR Collection",
      "Share": "Share",
      "BUYNOW": "BUY NOW",
      "Discount": "Discount",
      "FreshFruits": "Fresh Fruits",
      "OurNewsUpdate": "Our News & Update",
      "ReadMore": "Read More",
      "Allcategories": "All categories",
      "CategoryList": "Category List",
      "pagenotfound": "page not found",
      "pagedescription": "The page you are looking for doesn't exist or an other error occurred. Go back, or head over to choose a new direction.",
      "BackHomePage": "Back Home Page",
      "Logins": "Login",
      "Username": "Username",
      "Pleasefillthename": "Please fill the name",
      "Password": "Password",
      "Forgotyourpassword": "Forgot your password?",
      "LogIn": "Log In",
      "Orsigninwith": "Or sign in with",
      "Facebook": "Facebook",
      "Google": "Google",
      "Notamember": "Not a member?",
      "Signupnow": "Sign up now",
      "Registers": "Register",
      "Name": "Name",
      "EmailAddress": "Email Address",
      "ConfirmPassword": "Confirm Password",
      "SignUp": "Sign Up",
      "Orsignupwith": "Or sign up with",
      "Alreadyhaveanaccount": "Already have an account?",
      "ForgotPassword": "Forgot Password",
      "EnterEmailAddress": "Enter Email Address",
      "Send": "Send",
      "cartDescription": "Your cart will be expired in",
      "minutes": "minutes !",
      "CheckOut": "Check Out",
      "clearallitems": "clear all items",
      "ContinueShopping": "Continue Shopping",
      "ApplyCoupon": "Apply Coupon",
      "CartTotals": "Cart Totals",
      "TotalMRP": "Total MRP",
      "CouponDiscount": "Coupon Discount",
      "ConvenienceFee": "Convenience Fee",
      "ProcessCheckout": "Process Checkout",
      "Promocode": "Promocode",
      "EXAMPLECODE": "EXAMPLECODE",
      "TotalUSD": "Total (USD)",
      "Yourcart": "Your cart",
      "Country": "Country",
      "CountryArr": [
        "United States",
        "India",
        "America",
        "South America",
        "Dubai",
        "Hong Kong",
        "Indonesia",
        "Pakistan",
        "Saudi Arabia",
        "China"
      ],
      "Choose": "Choose...",
      "State": "State",
      "StateArr": [
        "Gujarat",
        "Maharashtra",
        "Goa",
        "Dehli",
        "Madya Pradesh",
        "Uttar Pradesh",
        "Himacal Pradesh",
        "Rajesthan"
      ],
      "Payment": "Payment",
      "FirstName": "First Name",
      "LastName": "Last Name",
      "SaveInfo": "Save this information for next time",
      "Creditcard": "Credit card",
      "Debitcard": "Debit card",
      "PayPal": "PayPal",
      "Nameoncard": "Name on card",
      "Fullname": "Full name as displayed on card",
      "Creditnumber": "Credit card number",
      "Creditnumberrequired": "Credit card number is required",
      "Expiration": "Expiration",
      "CVV": "CVV",
      "Continuecheckout": "Continue to checkout",
      "Wearecomingsoon": "We are coming soon",
      "ComingDescription": "we are almost there! if you want to get notified when the website goes live, subscribe to our mailing list!",
      "NotifyMe": "Notify Me!",
      "Address": "Address :",
      "ActualAddress": " Riv1418erwood Drive, Suite 3245 Cottonwood, CA 96052, United States",
      "PhoneNumber": "Phone Number :",
      "num1": "+ 185659635",
      "num2": "+ 658651167",
      "ThemeEmail": "voxo123@gmail.com",
      "ThemeEmail2": "voxo158@gmail.com",
      "LetTouch": "Let's get in touch",
      "SuggestionDesc": "We're open for any suggestion or just to have a chat",
      "Submit": "Submit",
      "ConfirmEmail": "Confirm Email",
      "Comment": "Comment",
      "Email": "Email",
      "EmailRequired": "Your email address will not be published. Required fields are marked *",
      "Contactus": "Contact Us",
      "Howhelp": "How can we help you?",
      "OrderSuccess": "Order Success",
      "PaymentDescription": "Payment Is Successfully Processsed And Your Order Is On The Way",
      "TransactionID": "Transaction ID:267676GHERT105467",
      "OrderDetail": "Order Details",
      "summery": "summery",
      "OrderID": "Order ID: 5563853658932",
      "OrderDate": "Order Date: October 22, 2018",
      "OrderTotal": "Order Total: $907.28",
      "shippingaddress": "shipping address",
      "Add1": "Gerg Harvell",
      "Add2": "568, Suite Ave.",
      "Add3": "Austrlia, 235153 Contact No. 48465465465",
      "paymentmethod": "payment method",
      "PayonDelivery": "Pay on Delivery (Cash/Card). Cash on delivery (COD) available. Card/Net banking acceptance subject to device availability.",
      "expecteddate": "expected date of delivery:",
      "fulldate": "october 22, 2018",
      "trackorder": "track order",
      "SearchForProducts": "Search For Products",
      "ShowMenu": "Show Menu",
      "Category": "Category",
      "PopularPosts": "Popular Posts",
      "Johnwick": "John wick",
      "date": "15 Aug 2021",
      "LeaveComments": "Leave Comments",
      "Comments": "Comments",
      "Blogtitle": "Just a Standard Format Post.",
      "BlogDesp1": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, Lorem Ipsum has been the industry'sstandard dummy text ever since the 1500s.looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage.",
      "BlogDesp2": "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latinprofessor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classicalliterature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of de Finibus Bonorum et Malorum (The Extremes of Good and Evil) by Cicero, written in 45BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, Lorem ipsum dolor sit amet.., comes from a line in section 1.10.32.The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from de Finibus Bonorum et Malorum by Cicero are also reproducedin their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.",
      "BlogDesp3": "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normaldistribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum astheir default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes onpurpose injected humour and the like.",
      "loadmore": "Load more",
      "NoProduct": "No More Product",
      "ElementButton": "Element Button",
      "ButtontextSizes": "Button text Sizes",
      "Bootstrapbutton": "Bootstrap button",
      "ButtonOutlines": "Button Outline",
      "Blocklevelbutton": "Block level button",
      "Buttonblock": "Button block",
      "Activelink": "Active link",
      "Links": "Link",
      "Buttongroups": "Button group",
      "Category1": "Category Style 1",
      "Category2": "Category Style 2",
      "Category3": "Category Style 3",
      "Collection1": "Collection Banner 1",
      "Collection2": "Collection Banner 2",
      "Collection3": "Collection Banner 3",
      "Collection4": "Collection Banner 4",
      "Collection5": "Collection Banner 5",
      "Collection6": "Collection Banner 6",
      "Collection7": "Collection Banner 7",
      "Deal1": "Deal Banner 1",
      "Deal2": "Deal Banner 2",
      "Deal3": "Deal Banner 3",
      "Deal4": "Deal Banner 4",
      "Product1": "Product Style 1",
      "Product2": "Product Style 2",
      "Product3": "Product Style 3",
      "Product4": "Product Style 4",
      "Product5": "Product Style 5",
      "Product6": "Product Style 6",
      "All": "All",
      "App": "App",
      "Card": "Card",
      "Web": "Web",
      "ShopTheLatestTrends": "Shop The Latest Trends",
      "shopdescription": "Shop the latest clothing trends with our weekly edit of what's new in online at Voxo. From out latest woman collection.",
      "bannerdescription": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
      "Filter": "Filter",
      "Close": "Close",
      "HideFilter": "Hide Filter",
      "ShowFilter": "Show Filter",
      "Latestfilter": "Latest filter",
      "Brand": "Brand",
      "SpecifyDescription": "The Model is wearing a white blouse from our stylist's collection, see the image for a mock-up of what the actual blouse would look like.it has text written on it in a black cursive language which looks great on a white color.",
      "ProductDescription1": "Nor again is there anyone who loves or pursues or desires to obtain pain of itself, because it is pain, but because occasionally circumstances occur in which toil and pain can procure him          some great pleasure. To take a trivial example, which of us ever undertakes laborious physical exercise, except to obtain some advantage from it? But who has any right to find fault with a man who chooses to enjoy a pleasure that has no annoying consequences, or one who avoids a pain that produces no resultant pleasure.",
      "ProductQuestion1": "Give you a complete account of the system",
      "fabric": "fabric",
      "ProductDescription2": "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab, autem nemo? Tempora vitae assumenda laudantium unde magni, soluta repudiandae quam, neque voluptate deleniti consequatur            laboriosam veritatis? Tempore dolor molestias voluptatum! Minima possimus, pariatur sed, quasi provident dolorum unde molestias, assumenda consequuntur odit magni blanditiis obcaecati? Eacorporis odit dolorem fuga, fugiat soluta consequuntur magni.",
      "ProductDescription3": "Art silk is manufactured by synthetic fibres like rayon. It's light in weight and is soft on the skin for comfort in summers.Art silk is manufactured by synthetic fibres like rayon. It's light in weight and is soft on the skin for comfort in summers.",
      "ProductDescription4": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
      "Customerreviews": "Customer Reviews",
      "numRatings": "82 Ratings",
      "Rating": "Rating",
      "CustomersAlsoBoughtThese": "Customers Also Bought These",
      "LTR": "LTR",
      "RTL": "RTL",
      "Prices": "Price",
      "DiscountRange": "Discount Range",
      "VoxoPlus": "VOXO PLUS",
      "EnjoyExperience": "Enjoy app-like experience",
      "EnjoyExperienceDescription": "With this Screen option you can use Website like an App.",
      "ADDTOHOMESCREEN": "ADD TO HOMESCREEN",
      "wishlist": "Wishlist",
      "VIEWCART": "VIEW CART",
      "English": "English",
      "Franch": "Franch",
      "Spanish": "Spanish",
      "ProceedTOPayment": "Proceed to payment",
      "Total": "Total",
      "SuccessAddtocart": " successfullyadded to you cart.",
      "TOTAL": "TOTAL",
      "orderIn": " orders in last 24 hours",
      "activeView": "active view this",
      "ProductName": "Brand New t-Shirt",
      "BestSeller": "#1 Best seller",
      "infashion": "in fashion",
      "selectsize": "select size",
      "sizechart": "size chart",
      "pleaseselectsize": "please select size",
      "quentityname": "quantity",
      "Days": "Days",
      "Hour": "Hour",
      "Min": "Min",
      "Sec": "Sec",
      "productdetail": "product details",
      "Tags": "Tags",
      "Viewdetails": "View details",
      "CustomerRating": "Customer Rating",
      "GenericName": "Generic Name",
      "Department": "Department",
      "Manufacturer": "Manufacturer",
      "DateFirstAvailable": "Date First Available",
      "image": "image",
      "productname": "product name",
      "price": "price",
      "availability": "availability",
      "action": "action",
      "whoAreWe": "WHO ARE WE",
      "largerFashion": "largest Online fashion destination",
      "aboutUsDesc": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam,\n    culpa! Asperiores labore amet nemo ullam odit atque adipisci,\n    hic, aliquid animi fugiat praesentium quidem. Perspiciatis,\n    expedita!",
      "aboutUsDesc2": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam,\n    culpa! Asperiores labore amet nemo ullam odit atque adipisci,\n    hic, aliquid animi fugiat praesentium quidem. Perspiciatis,\n    expedita!",
      "meetOurTeam": "Meet Our Team",
      "teamDesc": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero assumenda hic porro odio voluptas qui quod sed."
    }
  }
};
const envOptions = {
  prefix: "NITRO_",
  altPrefix: _inlineRuntimeConfig.nitro.envPrefix ?? process.env.NITRO_ENV_PREFIX ?? "_",
  envExpansion: _inlineRuntimeConfig.nitro.envExpansion ?? process.env.NITRO_ENV_EXPANSION ?? false
};
const _sharedRuntimeConfig = _deepFreeze(
  applyEnv(klona(_inlineRuntimeConfig), envOptions)
);
function useRuntimeConfig(event) {
  if (!event) {
    return _sharedRuntimeConfig;
  }
  if (event.context.nitro.runtimeConfig) {
    return event.context.nitro.runtimeConfig;
  }
  const runtimeConfig = klona(_inlineRuntimeConfig);
  applyEnv(runtimeConfig, envOptions);
  event.context.nitro.runtimeConfig = runtimeConfig;
  return runtimeConfig;
}
_deepFreeze(klona(appConfig));
function _deepFreeze(object) {
  const propNames = Object.getOwnPropertyNames(object);
  for (const name of propNames) {
    const value = object[name];
    if (value && typeof value === "object") {
      _deepFreeze(value);
    }
  }
  return Object.freeze(object);
}
new Proxy(/* @__PURE__ */ Object.create(null), {
  get: (_, prop) => {
    console.warn(
      "Please use `useRuntimeConfig()` instead of accessing config directly."
    );
    const runtimeConfig = useRuntimeConfig();
    if (prop in runtimeConfig) {
      return runtimeConfig[prop];
    }
    return void 0;
  }
});

const config = useRuntimeConfig();
const _routeRulesMatcher = toRouteMatcher(
  createRouter$1({ routes: config.nitro.routeRules })
);
function createRouteRulesHandler(ctx) {
  return eventHandler((event) => {
    const routeRules = getRouteRules(event);
    if (routeRules.headers) {
      setHeaders(event, routeRules.headers);
    }
    if (routeRules.redirect) {
      let target = routeRules.redirect.to;
      if (target.endsWith("/**")) {
        let targetPath = event.path;
        const strpBase = routeRules.redirect._redirectStripBase;
        if (strpBase) {
          targetPath = withoutBase(targetPath, strpBase);
        }
        target = joinURL(target.slice(0, -3), targetPath);
      } else if (event.path.includes("?")) {
        const query = getQuery$1(event.path);
        target = withQuery(target, query);
      }
      return sendRedirect(event, target, routeRules.redirect.statusCode);
    }
    if (routeRules.proxy) {
      let target = routeRules.proxy.to;
      if (target.endsWith("/**")) {
        let targetPath = event.path;
        const strpBase = routeRules.proxy._proxyStripBase;
        if (strpBase) {
          targetPath = withoutBase(targetPath, strpBase);
        }
        target = joinURL(target.slice(0, -3), targetPath);
      } else if (event.path.includes("?")) {
        const query = getQuery$1(event.path);
        target = withQuery(target, query);
      }
      return proxyRequest(event, target, {
        fetch: ctx.localFetch,
        ...routeRules.proxy
      });
    }
  });
}
function getRouteRules(event) {
  event.context._nitro = event.context._nitro || {};
  if (!event.context._nitro.routeRules) {
    event.context._nitro.routeRules = getRouteRulesForPath(
      withoutBase(event.path.split("?")[0], useRuntimeConfig().app.baseURL)
    );
  }
  return event.context._nitro.routeRules;
}
function getRouteRulesForPath(path) {
  return defu({}, ..._routeRulesMatcher.matchAll(path).reverse());
}

function createNitroApp() {
  const config = useRuntimeConfig();
  const hooks = createHooks();
  const captureError = (error, context = {}) => {
    const promise = hooks.callHookParallel("error", error, context).catch((error_) => {
      console.error("Error while capturing another error", error_);
    });
    if (context.event && isEvent(context.event)) {
      const errors = context.event.context.nitro?.errors;
      if (errors) {
        errors.push({ error, context });
      }
      if (context.event.waitUntil) {
        context.event.waitUntil(promise);
      }
    }
  };
  const h3App = createApp({
    debug: destr(false),
    onError: (error, event) => {
      captureError(error, { event, tags: ["request"] });
      return errorHandler(error, event);
    },
    onRequest: async (event) => {
      await nitroApp.hooks.callHook("request", event).catch((error) => {
        captureError(error, { event, tags: ["request"] });
      });
    },
    onBeforeResponse: async (event, response) => {
      await nitroApp.hooks.callHook("beforeResponse", event, response).catch((error) => {
        captureError(error, { event, tags: ["request", "response"] });
      });
    },
    onAfterResponse: async (event, response) => {
      await nitroApp.hooks.callHook("afterResponse", event, response).catch((error) => {
        captureError(error, { event, tags: ["request", "response"] });
      });
    }
  });
  const router = createRouter({
    preemptive: true
  });
  const localCall = createCall(toNodeListener(h3App));
  const _localFetch = createFetch(localCall, globalThis.fetch);
  const localFetch = (input, init) => _localFetch(input, init).then(
    (response) => normalizeFetchResponse(response)
  );
  const $fetch = createFetch$1({
    fetch: localFetch,
    Headers: Headers$1,
    defaults: { baseURL: config.app.baseURL }
  });
  globalThis.$fetch = $fetch;
  h3App.use(createRouteRulesHandler({ localFetch }));
  h3App.use(
    eventHandler((event) => {
      event.context.nitro = event.context.nitro || { errors: [] };
      const envContext = event.node.req?.__unenv__;
      if (envContext) {
        Object.assign(event.context, envContext);
      }
      event.fetch = (req, init) => fetchWithEvent(event, req, init, { fetch: localFetch });
      event.$fetch = (req, init) => fetchWithEvent(event, req, init, {
        fetch: $fetch
      });
      event.waitUntil = (promise) => {
        if (!event.context.nitro._waitUntilPromises) {
          event.context.nitro._waitUntilPromises = [];
        }
        event.context.nitro._waitUntilPromises.push(promise);
        if (envContext?.waitUntil) {
          envContext.waitUntil(promise);
        }
      };
      event.captureError = (error, context) => {
        captureError(error, { event, ...context });
      };
    })
  );
  for (const h of handlers) {
    let handler = h.lazy ? lazyEventHandler(h.handler) : h.handler;
    if (h.middleware || !h.route) {
      const middlewareBase = (config.app.baseURL + (h.route || "/")).replace(
        /\/+/g,
        "/"
      );
      h3App.use(middlewareBase, handler);
    } else {
      const routeRules = getRouteRulesForPath(
        h.route.replace(/:\w+|\*\*/g, "_")
      );
      if (routeRules.cache) {
        handler = cachedEventHandler(handler, {
          group: "nitro/routes",
          ...routeRules.cache
        });
      }
      router.use(h.route, handler, h.method);
    }
  }
  h3App.use(config.app.baseURL, router.handler);
  const app = {
    hooks,
    h3App,
    router,
    localCall,
    localFetch,
    captureError
  };
  return app;
}
function runNitroPlugins(nitroApp2) {
  for (const plugin of plugins) {
    try {
      plugin(nitroApp2);
    } catch (error) {
      nitroApp2.captureError(error, { tags: ["plugin"] });
      throw error;
    }
  }
}
const nitroApp = createNitroApp();
function useNitroApp() {
  return nitroApp;
}
runNitroPlugins(nitroApp);

function defineRenderHandler(render) {
  const runtimeConfig = useRuntimeConfig();
  return eventHandler(async (event) => {
    const nitroApp = useNitroApp();
    const ctx = { event, render, response: void 0 };
    await nitroApp.hooks.callHook("render:before", ctx);
    if (!ctx.response) {
      if (event.path === `${runtimeConfig.app.baseURL}favicon.ico`) {
        setResponseHeader(event, "Content-Type", "image/x-icon");
        return send(
          event,
          "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"
        );
      }
      ctx.response = await ctx.render(event);
      if (!ctx.response) {
        const _currentStatus = getResponseStatus(event);
        setResponseStatus(event, _currentStatus === 200 ? 500 : _currentStatus);
        return send(
          event,
          "No response returned from render handler: " + event.path
        );
      }
    }
    await nitroApp.hooks.callHook("render:response", ctx.response, ctx);
    if (ctx.response.headers) {
      setResponseHeaders(event, ctx.response.headers);
    }
    if (ctx.response.statusCode || ctx.response.statusMessage) {
      setResponseStatus(
        event,
        ctx.response.statusCode,
        ctx.response.statusMessage
      );
    }
    return ctx.response.body;
  });
}

const debug = (...args) => {
};
function GracefulShutdown(server, opts) {
  opts = opts || {};
  const options = Object.assign(
    {
      signals: "SIGINT SIGTERM",
      timeout: 3e4,
      development: false,
      forceExit: true,
      onShutdown: (signal) => Promise.resolve(signal),
      preShutdown: (signal) => Promise.resolve(signal)
    },
    opts
  );
  let isShuttingDown = false;
  const connections = {};
  let connectionCounter = 0;
  const secureConnections = {};
  let secureConnectionCounter = 0;
  let failed = false;
  let finalRun = false;
  function onceFactory() {
    let called = false;
    return (emitter, events, callback) => {
      function call() {
        if (!called) {
          called = true;
          return Reflect.apply(callback, this, arguments);
        }
      }
      for (const e of events) {
        emitter.on(e, call);
      }
    };
  }
  const signals = options.signals.split(" ").map((s) => s.trim()).filter((s) => s.length > 0);
  const once = onceFactory();
  once(process, signals, (signal) => {
    debug("received shut down signal", signal);
    shutdown(signal).then(() => {
      if (options.forceExit) {
        process.exit(failed ? 1 : 0);
      }
    }).catch((error) => {
      debug("server shut down error occurred", error);
      process.exit(1);
    });
  });
  function isFunction(functionToCheck) {
    const getType = Object.prototype.toString.call(functionToCheck);
    return /^\[object\s([A-Za-z]+)?Function]$/.test(getType);
  }
  function destroy(socket, force = false) {
    if (socket._isIdle && isShuttingDown || force) {
      socket.destroy();
      if (socket.server instanceof http.Server) {
        delete connections[socket._connectionId];
      } else {
        delete secureConnections[socket._connectionId];
      }
    }
  }
  function destroyAllConnections(force = false) {
    debug("Destroy Connections : " + (force ? "forced close" : "close"));
    let counter = 0;
    let secureCounter = 0;
    for (const key of Object.keys(connections)) {
      const socket = connections[key];
      const serverResponse = socket._httpMessage;
      if (serverResponse && !force) {
        if (!serverResponse.headersSent) {
          serverResponse.setHeader("connection", "close");
        }
      } else {
        counter++;
        destroy(socket);
      }
    }
    debug("Connections destroyed : " + counter);
    debug("Connection Counter    : " + connectionCounter);
    for (const key of Object.keys(secureConnections)) {
      const socket = secureConnections[key];
      const serverResponse = socket._httpMessage;
      if (serverResponse && !force) {
        if (!serverResponse.headersSent) {
          serverResponse.setHeader("connection", "close");
        }
      } else {
        secureCounter++;
        destroy(socket);
      }
    }
    debug("Secure Connections destroyed : " + secureCounter);
    debug("Secure Connection Counter    : " + secureConnectionCounter);
  }
  server.on("request", (req, res) => {
    req.socket._isIdle = false;
    if (isShuttingDown && !res.headersSent) {
      res.setHeader("connection", "close");
    }
    res.on("finish", () => {
      req.socket._isIdle = true;
      destroy(req.socket);
    });
  });
  server.on("connection", (socket) => {
    if (isShuttingDown) {
      socket.destroy();
    } else {
      const id = connectionCounter++;
      socket._isIdle = true;
      socket._connectionId = id;
      connections[id] = socket;
      socket.once("close", () => {
        delete connections[socket._connectionId];
      });
    }
  });
  server.on("secureConnection", (socket) => {
    if (isShuttingDown) {
      socket.destroy();
    } else {
      const id = secureConnectionCounter++;
      socket._isIdle = true;
      socket._connectionId = id;
      secureConnections[id] = socket;
      socket.once("close", () => {
        delete secureConnections[socket._connectionId];
      });
    }
  });
  process.on("close", () => {
    debug("closed");
  });
  function shutdown(sig) {
    function cleanupHttp() {
      destroyAllConnections();
      debug("Close http server");
      return new Promise((resolve, reject) => {
        server.close((err) => {
          if (err) {
            return reject(err);
          }
          return resolve(true);
        });
      });
    }
    debug("shutdown signal - " + sig);
    if (options.development) {
      debug("DEV-Mode - immediate forceful shutdown");
      return process.exit(0);
    }
    function finalHandler() {
      if (!finalRun) {
        finalRun = true;
        if (options.finally && isFunction(options.finally)) {
          debug("executing finally()");
          options.finally();
        }
      }
      return Promise.resolve();
    }
    function waitForReadyToShutDown(totalNumInterval) {
      debug(`waitForReadyToShutDown... ${totalNumInterval}`);
      if (totalNumInterval === 0) {
        debug(
          `Could not close connections in time (${options.timeout}ms), will forcefully shut down`
        );
        return Promise.resolve(true);
      }
      const allConnectionsClosed = Object.keys(connections).length === 0 && Object.keys(secureConnections).length === 0;
      if (allConnectionsClosed) {
        debug("All connections closed. Continue to shutting down");
        return Promise.resolve(false);
      }
      debug("Schedule the next waitForReadyToShutdown");
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(waitForReadyToShutDown(totalNumInterval - 1));
        }, 250);
      });
    }
    if (isShuttingDown) {
      return Promise.resolve();
    }
    debug("shutting down");
    return options.preShutdown(sig).then(() => {
      isShuttingDown = true;
      cleanupHttp();
    }).then(() => {
      const pollIterations = options.timeout ? Math.round(options.timeout / 250) : 0;
      return waitForReadyToShutDown(pollIterations);
    }).then((force) => {
      debug("Do onShutdown now");
      if (force) {
        destroyAllConnections(force);
      }
      return options.onShutdown(sig);
    }).then(finalHandler).catch((error) => {
      const errString = typeof error === "string" ? error : JSON.stringify(error);
      debug(errString);
      failed = true;
      throw errString;
    });
  }
  function shutdownManual() {
    return shutdown("manual");
  }
  return shutdownManual;
}

function getGracefulShutdownConfig() {
  return {
    disabled: !!process.env.NITRO_SHUTDOWN_DISABLED,
    signals: (process.env.NITRO_SHUTDOWN_SIGNALS || "SIGTERM SIGINT").split(" ").map((s) => s.trim()),
    timeout: Number.parseInt(process.env.NITRO_SHUTDOWN_TIMEOUT || "", 10) || 3e4,
    forceExit: !process.env.NITRO_SHUTDOWN_NO_FORCE_EXIT
  };
}
function setupGracefulShutdown(listener, nitroApp) {
  const shutdownConfig = getGracefulShutdownConfig();
  if (shutdownConfig.disabled) {
    return;
  }
  GracefulShutdown(listener, {
    signals: shutdownConfig.signals.join(" "),
    timeout: shutdownConfig.timeout,
    forceExit: shutdownConfig.forceExit,
    onShutdown: async () => {
      await new Promise((resolve) => {
        const timeout = setTimeout(() => {
          console.warn("Graceful shutdown timeout, force exiting...");
          resolve();
        }, shutdownConfig.timeout);
        nitroApp.hooks.callHook("close").catch((error) => {
          console.error(error);
        }).finally(() => {
          clearTimeout(timeout);
          resolve();
        });
      });
    }
  });
}

export { trapUnhandledNodeErrors as a, useNitroApp as b, defineRenderHandler as c, destr as d, createError$1 as e, getRouteRules as f, getQuery as g, getResponseStatusText as h, getResponseStatus as i, joinRelativeURL as j, setupGracefulShutdown as s, toNodeListener as t, useRuntimeConfig as u };
//# sourceMappingURL=nitro.mjs.map
