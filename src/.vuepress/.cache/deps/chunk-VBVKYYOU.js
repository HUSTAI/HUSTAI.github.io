import {
  C,
  E
} from "./chunk-ZZG2ZT6N.js";
import {
  Ax,
  Bx,
  Ex,
  Fx,
  Lx,
  Sn,
  So,
  Sx,
  To,
  Tx,
  kx,
  vx,
  wx
} from "./chunk-2QDYOWI4.js";

// node_modules/.pnpm/mermaid@10.2.3/node_modules/mermaid/dist/arc-7150e654.js
function fn(l) {
  return l.innerRadius;
}
function cn(l) {
  return l.outerRadius;
}
function yn(l) {
  return l.startAngle;
}
function gn(l) {
  return l.endAngle;
}
function mn(l) {
  return l && l.padAngle;
}
function pn(l, x, q, E2, h, v, K, a) {
  var s = q - l, n = E2 - x, m = K - h, i = a - v, r = i * s - m * n;
  if (!(r * r < To))
    return r = (m * (x - v) - i * (l - h)) / r, [l + r * s, x + r * n];
}
function V(l, x, q, E2, h, v, K) {
  var a = l - q, s = x - E2, n = (K ? v : -v) / Fx(a * a + s * s), m = n * s, i = -n * a, r = l + m, f = x + i, c = q + m, w = E2 + i, o = (r + c) / 2, C2 = (f + w) / 2, p = c - r, g = w - f, A = p * p + g * g, F = h - v, P = r * w - c * f, G = (g < 0 ? -1 : 1) * Fx(vx(0, F * F * A - P * P)), H = (P * g - p * G) / A, d = (-P * p - g * G) / A, R = (P * g + p * G) / A, T = (-P * p + g * G) / A, e = H - o, u = d - C2, L = R - o, M = T - C2;
  return e * e + u * u > L * L + M * M && (H = R, d = T), {
    cx: H,
    cy: d,
    x01: -m,
    y01: -i,
    x11: H * (h / F - 1),
    y11: d * (h / F - 1)
  };
}
function hn() {
  var l = fn, x = cn, q = E(0), E2 = null, h = yn, v = gn, K = mn, a = null;
  function s() {
    var n, m, i = +l.apply(this, arguments), r = +x.apply(this, arguments), f = h.apply(this, arguments) - So, c = v.apply(this, arguments) - So, w = Tx(c - f), o = c > f;
    if (a || (a = n = C()), r < i && (m = r, r = i, i = m), !(r > To))
      a.moveTo(0, 0);
    else if (w > Lx - To)
      a.moveTo(r * kx(f), r * Bx(f)), a.arc(0, 0, r, f, c, !o), i > To && (a.moveTo(i * kx(c), i * Bx(c)), a.arc(0, 0, i, c, f, o));
    else {
      var C2 = f, p = c, g = f, A = c, F = w, P = w, G = K.apply(this, arguments) / 2, H = G > To && (E2 ? +E2.apply(this, arguments) : Fx(i * i + r * r)), d = wx(Tx(r - i) / 2, +q.apply(this, arguments)), R = d, T = d, e, u;
      if (H > To) {
        var L = Ex(H / i * Bx(G)), M = Ex(H / r * Bx(G));
        (F -= L * 2) > To ? (L *= o ? 1 : -1, g += L, A -= L) : (F = 0, g = A = (f + c) / 2), (P -= M * 2) > To ? (M *= o ? 1 : -1, C2 += M, p -= M) : (P = 0, C2 = p = (f + c) / 2);
      }
      var O = r * kx(C2), Q = r * Bx(C2), j = i * kx(A), z = i * Bx(A);
      if (d > To) {
        var B = r * kx(p), U = r * Bx(p), W = i * kx(g), X = i * Bx(g), I;
        if (w < Sn && (I = pn(O, Q, W, X, B, U, j, z))) {
          var Y = O - I[0], Z = Q - I[1], $ = B - I[0], k = U - I[1], _ = 1 / Bx(Ax((Y * $ + Z * k) / (Fx(Y * Y + Z * Z) * Fx($ * $ + k * k))) / 2), nn = Fx(I[0] * I[0] + I[1] * I[1]);
          R = wx(d, (i - nn) / (_ - 1)), T = wx(d, (r - nn) / (_ + 1));
        }
      }
      P > To ? T > To ? (e = V(W, X, O, Q, r, T, o), u = V(B, U, j, z, r, T, o), a.moveTo(e.cx + e.x01, e.cy + e.y01), T < d ? a.arc(e.cx, e.cy, T, Sx(e.y01, e.x01), Sx(u.y01, u.x01), !o) : (a.arc(e.cx, e.cy, T, Sx(e.y01, e.x01), Sx(e.y11, e.x11), !o), a.arc(0, 0, r, Sx(e.cy + e.y11, e.cx + e.x11), Sx(u.cy + u.y11, u.cx + u.x11), !o), a.arc(u.cx, u.cy, T, Sx(u.y11, u.x11), Sx(u.y01, u.x01), !o))) : (a.moveTo(O, Q), a.arc(0, 0, r, C2, p, !o)) : a.moveTo(O, Q), !(i > To) || !(F > To) ? a.lineTo(j, z) : R > To ? (e = V(j, z, B, U, i, -R, o), u = V(O, Q, W, X, i, -R, o), a.lineTo(e.cx + e.x01, e.cy + e.y01), R < d ? a.arc(e.cx, e.cy, R, Sx(e.y01, e.x01), Sx(u.y01, u.x01), !o) : (a.arc(e.cx, e.cy, R, Sx(e.y01, e.x01), Sx(e.y11, e.x11), !o), a.arc(0, 0, i, Sx(e.cy + e.y11, e.cx + e.x11), Sx(u.cy + u.y11, u.cx + u.x11), o), a.arc(u.cx, u.cy, R, Sx(u.y11, u.x11), Sx(u.y01, u.x01), !o))) : a.arc(0, 0, i, A, g, o);
    }
    if (a.closePath(), n)
      return a = null, n + "" || null;
  }
  return s.centroid = function() {
    var n = (+l.apply(this, arguments) + +x.apply(this, arguments)) / 2, m = (+h.apply(this, arguments) + +v.apply(this, arguments)) / 2 - Sn / 2;
    return [kx(m) * n, Bx(m) * n];
  }, s.innerRadius = function(n) {
    return arguments.length ? (l = typeof n == "function" ? n : E(+n), s) : l;
  }, s.outerRadius = function(n) {
    return arguments.length ? (x = typeof n == "function" ? n : E(+n), s) : x;
  }, s.cornerRadius = function(n) {
    return arguments.length ? (q = typeof n == "function" ? n : E(+n), s) : q;
  }, s.padRadius = function(n) {
    return arguments.length ? (E2 = n == null ? null : typeof n == "function" ? n : E(+n), s) : E2;
  }, s.startAngle = function(n) {
    return arguments.length ? (h = typeof n == "function" ? n : E(+n), s) : h;
  }, s.endAngle = function(n) {
    return arguments.length ? (v = typeof n == "function" ? n : E(+n), s) : v;
  }, s.padAngle = function(n) {
    return arguments.length ? (K = typeof n == "function" ? n : E(+n), s) : K;
  }, s.context = function(n) {
    return arguments.length ? (a = n ?? null, s) : a;
  }, s;
}

export {
  hn
};
//# sourceMappingURL=chunk-VBVKYYOU.js.map
