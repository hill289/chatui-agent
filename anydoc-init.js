// @iyulab/anydoc — 非模块方式初始化
// 依赖: anydoc_wasm_b64.js (window.__anydocWasmBase64) + anydoc_wasm_bg_nomodule.js (全局函数)
// 解码 base64 → WebAssembly.instantiate → 注入 wasm 句柄 → 暴露解析 API。
// 为保持 index.html 原有读取文档逻辑不变，仍以 window.__undocParse 暴露
// { format(), toMarkdown(), toText() } 兼容接口；同时提供 window.__anydocParse。
(function() {
  try {
    // 解码 base64 → Uint8Array
    var binaryStr = atob(window.__anydocWasmBase64);
    var len = binaryStr.length;
    var bytes = new Uint8Array(len);
    for (var i = 0; i < len; i++) {
      bytes[i] = binaryStr.charCodeAt(i);
    }

    // WASM 需要的导入（全局函数在 anydoc_wasm_bg_nomodule.js 中声明）
    var importObj = {
      './anydoc_wasm_bg.js': {
        __wbg_String_8564e559799eccda: __wbg_String_8564e559799eccda,
        __wbg___wbindgen_throw_344f42d3211c4765: __wbg___wbindgen_throw_344f42d3211c4765,
        __wbg_from_13e323c65fc8f464: __wbg_from_13e323c65fc8f464,
        __wbg_getRandomValues_cc7f052a444bb2ce: __wbg_getRandomValues_cc7f052a444bb2ce,
        __wbg_new_32b398fb48b6d94a: __wbg_new_32b398fb48b6d94a,
        __wbg_new_b667d279fd5aa943: __wbg_new_b667d279fd5aa943,
        __wbg_new_cd45aabdf6073e84: __wbg_new_cd45aabdf6073e84,
        __wbg_new_da52cf8fe3429cb2: __wbg_new_da52cf8fe3429cb2,
        __wbg_set_6be42768c690e380: __wbg_set_6be42768c690e380,
        __wbg_set_8535240470bf2500: __wbg_set_8535240470bf2500,
        __wbg_set_8a16b38e4805b298: __wbg_set_8a16b38e4805b298,
        __wbindgen_cast_0000000000000001: __wbindgen_cast_0000000000000001,
        __wbindgen_cast_0000000000000002: __wbindgen_cast_0000000000000002,
        __wbindgen_cast_0000000000000003: __wbindgen_cast_0000000000000003,
        __wbindgen_object_clone_ref: __wbindgen_object_clone_ref,
        __wbindgen_object_drop_ref: __wbindgen_object_drop_ref,
      }
    };

    WebAssembly.instantiate(bytes, importObj).then(function(result) {
      var instance = result.instance;
      __wbg_set_wasm(instance.exports);

      // 与 anydoc_wasm.js 中 __wbindgen_enum_Format 保持一致
      var FORMAT_ENUM = ["doc", "docx", "odt", "pdf", "ppt", "pptx", "rtf", "epub", "xlsx", "ods", "odp", "csv"];

      function isLikeNone(x) {
        return x === undefined || x === null;
      }

      // 格式编号编码: enum 下标 + 1；未识别/空 → 13（由 wasm 自行探测）
      function formatTag(format) {
        return isLikeNone(format) ? 13 : ((FORMAT_ENUM.indexOf(format) + 1 || 13) - 1);
      }

      function formatFromBytesImpl(bytes) {
        var ptr0 = passArray8ToWasm0(bytes, wasm.__wbindgen_export);
        var len0 = WASM_VECTOR_LEN;
        var ret = wasm.formatFromBytes(ptr0, len0);
        return FORMAT_ENUM[ret];
      }

      function toMarkdownBytesImpl(bytes, format) {
        var deferred3_0;
        var deferred3_1;
        try {
          var retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
          var ptr0 = passArray8ToWasm0(bytes, wasm.__wbindgen_export);
          var len0 = WASM_VECTOR_LEN;
          wasm.toMarkdownBytes(retptr, ptr0, len0, formatTag(format));
          var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
          var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
          var r2 = getDataViewMemory0().getInt32(retptr + 4 * 2, true);
          var r3 = getDataViewMemory0().getInt32(retptr + 4 * 3, true);
          var ptr2 = r0;
          var len2 = r1;
          if (r3) {
            ptr2 = 0; len2 = 0;
            throw takeObject(r2);
          }
          deferred3_0 = ptr2;
          deferred3_1 = len2;
          return getStringFromWasm0(ptr2, len2);
        } finally {
          wasm.__wbindgen_add_to_stack_pointer(16);
          wasm.__wbindgen_export4(deferred3_0, deferred3_1, 1);
        }
      }

      // 兼容原 window.__undocParse 的返回结构: { format(), toMarkdown(), toText() }
      function parse(bytes) {
        var format = formatFromBytesImpl(bytes);
        return {
          format: function() { return format; },
          toMarkdown: function() { return toMarkdownBytesImpl(bytes, format); },
          // anydoc 未单独暴露纯文本提取，兜底返回 Markdown（仅当 Markdown 为空时被调用）
          toText: function() { return toMarkdownBytesImpl(bytes, format); }
        };
      }

      window.__undocParse = parse;   // 保持 index.html 原有调用逻辑不变
      window.__anydocParse = parse;  // 新的规范命名
      window.__undocReady = true;
    }).catch(function(err) {
      console.error('[anydoc] WASM instantiate failed:', err);
      window.__undocReady = false;
    });
  } catch (err) {
    console.error('[anydoc] Init failed:', err);
    window.__undocReady = false;
  }
})();
