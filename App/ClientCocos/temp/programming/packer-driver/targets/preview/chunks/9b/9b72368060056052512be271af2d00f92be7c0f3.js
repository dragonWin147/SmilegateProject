System.register(["cc"], function (_export, _context) {
  "use strict";

  var _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, _dec, _class, _crd, ccclass, property, KMD5;

  return {
    setters: [function (_cc) {
      _cclegacy = _cc.cclegacy;
      __checkObsolete__ = _cc.__checkObsolete__;
      __checkObsoleteInNamespace__ = _cc.__checkObsoleteInNamespace__;
      _decorator = _cc._decorator;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "c3013VBPoBLx7Hjtsg1zXdj", "KMD5", undefined);

      __checkObsolete__(['_decorator']);

      ({
        ccclass,
        property
      } = _decorator);

      _export("KMD5", KMD5 = (_dec = ccclass('KMMD5'), _dec(_class = class KMD5 {
        static safeAdd(x, y) {
          var lsw = (x & 0xFFFF) + (y & 0xFFFF);
          var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
          return msw << 16 | lsw & 0xFFFF;
        }

        static bitRotateLeft(num, cnt) {
          return num << cnt | num >>> 32 - cnt;
        }

        static md5cmn(q, a, b, x, s, t) {
          return KMD5.safeAdd(KMD5.bitRotateLeft(KMD5.safeAdd(KMD5.safeAdd(a, q), KMD5.safeAdd(x, t)), s), b);
        }

        static md5ff(a, b, c, d, x, s, t) {
          return KMD5.md5cmn(b & c | ~b & d, a, b, x, s, t);
        }

        static md5gg(a, b, c, d, x, s, t) {
          return KMD5.md5cmn(b & d | c & ~d, a, b, x, s, t);
        }

        static md5hh(a, b, c, d, x, s, t) {
          return KMD5.md5cmn(b ^ c ^ d, a, b, x, s, t);
        }

        static md5ii(a, b, c, d, x, s, t) {
          return KMD5.md5cmn(c ^ (b | ~d), a, b, x, s, t);
        }

        static binlMD5(x, len) {
          x[len >> 5] |= 0x80 << len % 32;
          x[(len + 64 >>> 9 << 4) + 14] = len;
          var i;
          var olda;
          var oldb;
          var oldc;
          var oldd;
          var a = 1732584193;
          var b = -271733879;
          var c = -1732584194;
          var d = 271733878;

          for (i = 0; i < x.length; i += 16) {
            olda = a;
            oldb = b;
            oldc = c;
            oldd = d;
            a = KMD5.md5ff(a, b, c, d, x[i], 7, -680876936);
            d = KMD5.md5ff(d, a, b, c, x[i + 1], 12, -389564586);
            c = KMD5.md5ff(c, d, a, b, x[i + 2], 17, 606105819);
            b = KMD5.md5ff(b, c, d, a, x[i + 3], 22, -1044525330);
            a = KMD5.md5ff(a, b, c, d, x[i + 4], 7, -176418897);
            d = KMD5.md5ff(d, a, b, c, x[i + 5], 12, 1200080426);
            c = KMD5.md5ff(c, d, a, b, x[i + 6], 17, -1473231341);
            b = KMD5.md5ff(b, c, d, a, x[i + 7], 22, -45705983);
            a = KMD5.md5ff(a, b, c, d, x[i + 8], 7, 1770035416);
            d = KMD5.md5ff(d, a, b, c, x[i + 9], 12, -1958414417);
            c = KMD5.md5ff(c, d, a, b, x[i + 10], 17, -42063);
            b = KMD5.md5ff(b, c, d, a, x[i + 11], 22, -1990404162);
            a = KMD5.md5ff(a, b, c, d, x[i + 12], 7, 1804603682);
            d = KMD5.md5ff(d, a, b, c, x[i + 13], 12, -40341101);
            c = KMD5.md5ff(c, d, a, b, x[i + 14], 17, -1502002290);
            b = KMD5.md5ff(b, c, d, a, x[i + 15], 22, 1236535329);
            a = KMD5.md5gg(a, b, c, d, x[i + 1], 5, -165796510);
            d = KMD5.md5gg(d, a, b, c, x[i + 6], 9, -1069501632);
            c = KMD5.md5gg(c, d, a, b, x[i + 11], 14, 643717713);
            b = KMD5.md5gg(b, c, d, a, x[i], 20, -373897302);
            a = KMD5.md5gg(a, b, c, d, x[i + 5], 5, -701558691);
            d = KMD5.md5gg(d, a, b, c, x[i + 10], 9, 38016083);
            c = KMD5.md5gg(c, d, a, b, x[i + 15], 14, -660478335);
            b = KMD5.md5gg(b, c, d, a, x[i + 4], 20, -405537848);
            a = KMD5.md5gg(a, b, c, d, x[i + 9], 5, 568446438);
            d = KMD5.md5gg(d, a, b, c, x[i + 14], 9, -1019803690);
            c = KMD5.md5gg(c, d, a, b, x[i + 3], 14, -187363961);
            b = KMD5.md5gg(b, c, d, a, x[i + 8], 20, 1163531501);
            a = KMD5.md5gg(a, b, c, d, x[i + 13], 5, -1444681467);
            d = KMD5.md5gg(d, a, b, c, x[i + 2], 9, -51403784);
            c = KMD5.md5gg(c, d, a, b, x[i + 7], 14, 1735328473);
            b = KMD5.md5gg(b, c, d, a, x[i + 12], 20, -1926607734);
            a = KMD5.md5hh(a, b, c, d, x[i + 5], 4, -378558);
            d = KMD5.md5hh(d, a, b, c, x[i + 8], 11, -2022574463);
            c = KMD5.md5hh(c, d, a, b, x[i + 11], 16, 1839030562);
            b = KMD5.md5hh(b, c, d, a, x[i + 14], 23, -35309556);
            a = KMD5.md5hh(a, b, c, d, x[i + 1], 4, -1530992060);
            d = KMD5.md5hh(d, a, b, c, x[i + 4], 11, 1272893353);
            c = KMD5.md5hh(c, d, a, b, x[i + 7], 16, -155497632);
            b = KMD5.md5hh(b, c, d, a, x[i + 10], 23, -1094730640);
            a = KMD5.md5hh(a, b, c, d, x[i + 13], 4, 681279174);
            d = KMD5.md5hh(d, a, b, c, x[i], 11, -358537222);
            c = KMD5.md5hh(c, d, a, b, x[i + 3], 16, -722521979);
            b = KMD5.md5hh(b, c, d, a, x[i + 6], 23, 76029189);
            a = KMD5.md5hh(a, b, c, d, x[i + 9], 4, -640364487);
            d = KMD5.md5hh(d, a, b, c, x[i + 12], 11, -421815835);
            c = KMD5.md5hh(c, d, a, b, x[i + 15], 16, 530742520);
            b = KMD5.md5hh(b, c, d, a, x[i + 2], 23, -995338651);
            a = KMD5.md5ii(a, b, c, d, x[i], 6, -198630844);
            d = KMD5.md5ii(d, a, b, c, x[i + 7], 10, 1126891415);
            c = KMD5.md5ii(c, d, a, b, x[i + 14], 15, -1416354905);
            b = KMD5.md5ii(b, c, d, a, x[i + 5], 21, -57434055);
            a = KMD5.md5ii(a, b, c, d, x[i + 12], 6, 1700485571);
            d = KMD5.md5ii(d, a, b, c, x[i + 3], 10, -1894986606);
            c = KMD5.md5ii(c, d, a, b, x[i + 10], 15, -1051523);
            b = KMD5.md5ii(b, c, d, a, x[i + 1], 21, -2054922799);
            a = KMD5.md5ii(a, b, c, d, x[i + 8], 6, 1873313359);
            d = KMD5.md5ii(d, a, b, c, x[i + 15], 10, -30611744);
            c = KMD5.md5ii(c, d, a, b, x[i + 6], 15, -1560198380);
            b = KMD5.md5ii(b, c, d, a, x[i + 13], 21, 1309151649);
            a = KMD5.md5ii(a, b, c, d, x[i + 4], 6, -145523070);
            d = KMD5.md5ii(d, a, b, c, x[i + 11], 10, -1120210379);
            c = KMD5.md5ii(c, d, a, b, x[i + 2], 15, 718787259);
            b = KMD5.md5ii(b, c, d, a, x[i + 9], 21, -343485551);
            a = KMD5.safeAdd(a, olda);
            b = KMD5.safeAdd(b, oldb);
            c = KMD5.safeAdd(c, oldc);
            d = KMD5.safeAdd(d, oldd);
          }

          return [a, b, c, d];
        }

        static binl2rstr(input) {
          var i;
          var output = '';
          var length32 = input.length * 32;

          for (i = 0; i < length32; i += 8) {
            output += String.fromCharCode(input[i >> 5] >>> i % 32 & 0xFF);
          }

          return output;
        }

        static rstr2binl(input) {
          var i;
          var output = [];
          output[(input.length >> 2) - 1] = undefined;

          for (i = 0; i < output.length; i += 1) {
            output[i] = 0;
          }

          var length8 = input.length * 8;

          for (i = 0; i < length8; i += 8) {
            output[i >> 5] |= (input.charCodeAt(i / 8) & 0xFF) << i % 32;
          }

          return output;
        }

        static rstrMD5(s) {
          return KMD5.binl2rstr(KMD5.binlMD5(KMD5.rstr2binl(s), s.length * 8));
        }

        static rstrHMACMD5(key, data) {
          var i;
          var bkey = KMD5.rstr2binl(key);
          var ipad = [];
          var opad = [];
          var hash;
          ipad[15] = opad[15] = undefined;

          if (bkey.length > 16) {
            bkey = KMD5.binlMD5(bkey, key.length * 8);
          }

          for (i = 0; i < 16; i += 1) {
            ipad[i] = bkey[i] ^ 0x36363636;
            opad[i] = bkey[i] ^ 0x5C5C5C5C;
          }

          hash = KMD5.binlMD5(ipad.concat(KMD5.rstr2binl(data)), 512 + data.length * 8);
          return KMD5.binl2rstr(KMD5.binlMD5(opad.concat(hash), 512 + 128));
        }

        static rstr2hex(input) {
          var hexTab = '0123456789abcdef';
          var output = '';
          var x;
          var i;

          for (i = 0; i < input.length; i += 1) {
            x = input.charCodeAt(i);
            output += hexTab.charAt(x >>> 4 & 0x0F) + hexTab.charAt(x & 0x0F);
          }

          return output;
        }

        static str2rstrUTF8(input) {
          return unescape(encodeURIComponent(input));
        }

        static rawMD5(s) {
          return KMD5.rstrMD5(KMD5.str2rstrUTF8(s));
        }

        static hexMD5(s) {
          return KMD5.rstr2hex(KMD5.rawMD5(s));
        }

        static rawHMACMD5(k, d) {
          return KMD5.rstrHMACMD5(KMD5.str2rstrUTF8(k), KMD5.str2rstrUTF8(d));
        }

        static hexHMACMD5(k, d) {
          return KMD5.rstr2hex(KMD5.rawHMACMD5(k, d));
        }

        static encrypt(string, key, raw) {
          if (key === void 0) {
            key = false;
          }

          if (raw === void 0) {
            raw = false;
          }

          if (!key) {
            if (!raw) {
              return KMD5.hexMD5(string);
            }

            return KMD5.rawMD5(string);
          }

          if (!raw) {
            return KMD5.hexHMACMD5(key, string);
          }

          return KMD5.rawHMACMD5(key, string);
        }

      }) || _class));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=9b72368060056052512be271af2d00f92be7c0f3.js.map