import {
  t
} from "./chunk-HKPMXDWR.js";
import {
  C,
  E
} from "./chunk-ZZG2ZT6N.js";
import {
  df
} from "./chunk-2QDYOWI4.js";

// node_modules/.pnpm/mermaid@10.2.3/node_modules/mermaid/dist/line-130fa1e5.js
function v(e) {
  return e[0];
}
function b(e) {
  return e[1];
}
function S(e, u) {
  var p = E(true), i = null, l = df, r = null;
  e = typeof e == "function" ? e : e === void 0 ? v : E(e), u = typeof u == "function" ? u : u === void 0 ? b : E(u);
  function t2(n) {
    var f, m = (n = t(n)).length, s, c = false, g;
    for (i == null && (r = l(g = C())), f = 0; f <= m; ++f)
      !(f < m && p(s = n[f], f, n)) === c && ((c = !c) ? r.lineStart() : r.lineEnd()), c && r.point(+e(s, f, n), +u(s, f, n));
    if (g)
      return r = null, g + "" || null;
  }
  return t2.x = function(n) {
    return arguments.length ? (e = typeof n == "function" ? n : E(+n), t2) : e;
  }, t2.y = function(n) {
    return arguments.length ? (u = typeof n == "function" ? n : E(+n), t2) : u;
  }, t2.defined = function(n) {
    return arguments.length ? (p = typeof n == "function" ? n : E(!!n), t2) : p;
  }, t2.curve = function(n) {
    return arguments.length ? (l = n, i != null && (r = l(i)), t2) : l;
  }, t2.context = function(n) {
    return arguments.length ? (n == null ? i = r = null : r = l(i = n), t2) : i;
  }, t2;
}

export {
  S
};
//# sourceMappingURL=chunk-D7J64JHA.js.map
