/* iosSlider - http://iosscripts.com/iosslider/
 * 
 * Touch Enabled, Responsive jQuery Horizontal Content Slider/Carousel/Image Gallery Plugin
 *
 * A jQuery plugin which allows you to integrate a customizable, cross-browser 
 * content slider into your web presence. Designed for use as a content slider, carousel, 
 * scrolling website banner, or image gallery.
 * 
 * Copyright (c) 2013 Marc Whitbread
 * 
 * Version: v1.3.19 (11/17/2013)
 * Minimum requirements: jQuery v1.4+
 *
 * Advanced requirements:
 * 1) jQuery bind() click event override on slide requires jQuery v1.6+
 *
 * Terms of use:
 *
 * 1) iosSlider is licensed under the Creative Commons â€“ Attribution-NonCommercial 3.0 License.
 * 2) You may use iosSlider free for personal or non-profit purposes, without restriction.
 *	  Attribution is not required but always appreciated. For commercial projects, you
 *	  must purchase a license. You may download and play with the script before deciding to
 *	  fully implement it in your project. Making sure you are satisfied, and knowing iosSlider
 *	  is the right script for your project is paramount.
 * 3) You are not permitted to make the resources found on iosscripts.com available for
 *    distribution elsewhere "as is" without prior consent. If you would like to feature
 *    iosSlider on your site, please do not link directly to the resource zip files. Please
 *    link to the appropriate page on iosscripts.com where users can find the download.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY
 * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE
 * COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
 * EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE
 * GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED
 * AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 * NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED
 * OF THE POSSIBILITY OF SUCH DAMAGE. 
 */

(function(a) {
    var na = 0, W = 0, ea = 0, T = 0, Aa = "ontouchstart"in window, Ba = "onorientationchange"in window, fa = !1, aa = !1, X = !1, oa = !1, ia = !1, ga = "pointer", sa = "pointer", ja = [], J = [], ta = [], $ = [], z = [], ba = [], B = [], m = [], s = [], ua = [], ca = [], e = {showScrollbar: function(b, e) {
            b.scrollbarHide && a("." + e).css({opacity: b.scrollbarOpacity, filter: "alpha(opacity:" + 100 * b.scrollbarOpacity + ")"})
        }, hideScrollbar: function(a, g, c, f, h, d, m, s, B, z) {
            if (a.scrollbar && a.scrollbarHide)
                for (var t = c; t < c + 25; t++)
                    g[g.length] = e.hideScrollbarIntervalTimer(10 * t, f[c], (c + 24 - t) / 24, h, d, m, s, B, z, a)
        }, hideScrollbarInterval: function(b, g, c, f, h, d, m, B, z) {
            T = -1 * b / s[B] * (h - d - m - f);
            e.setSliderOffset("." + c, T);
            a("." + c).css({opacity: z.scrollbarOpacity * g, filter: "alpha(opacity:" + z.scrollbarOpacity * g * 100 + ")"})
        }, slowScrollHorizontalInterval: function(b, g, c, f, h, d, N, O, L, K, t, w, x, y, v, q, G, p, n) {
            if (n.infiniteSlider) {
                if (c <= -1 * s[q]) {
                    var r = a(b).width();
                    if (c <= -1 * ua[q]) {
                        var u = -1 * t[0];
                        a(g).each(function(c) {
                            e.setSliderOffset(a(g)[c], u + G);
                            c < w.length && (w[c] = -1 * u);
                            u += v[c]
                        });
                        c += -1 * w[0];
                        m[q] = -1 * w[0] + G;
                        s[q] = m[q] + r - d;
                        B[q] = 0
                    } else {
                        var k = 0, D = e.getSliderOffset(a(g[0]), "x");
                        a(g).each(function(a) {
                            e.getSliderOffset(this, "x") < D && (D = e.getSliderOffset(this, "x"), k = a)
                        });
                        x = m[q] + r;
                        e.setSliderOffset(a(g)[k], x);
                        m[q] = -1 * w[1] + G;
                        s[q] = m[q] + r - d;
                        w.splice(0, 1);
                        w.splice(w.length, 0, -1 * x + G);
                        B[q]++
                    }
                }
                if (c >= -1 * m[q] || 0 <= c) {
                    r = a(b).width();
                    if (0 <= c)
                        for (u = -1 * t[0], a(g).each(function(c) {
                            e.setSliderOffset(a(g)[c], u + G);
                            c < w.length && (w[c] = -1 * u);
                            u += v[c]
                        }), c -= -1 * w[0], m[q] = -1 * w[0] + G, s[q] = m[q] + r - d, B[q] = y; 0 < -1 * w[0] - r + G; ) {
                            var A = 0, I = e.getSliderOffset(a(g[0]), "x");
                            a(g).each(function(a) {
                                e.getSliderOffset(this, "x") > I && (I = e.getSliderOffset(this, "x"), A = a)
                            });
                            x = m[q] - v[A];
                            e.setSliderOffset(a(g)[A], x);
                            w.splice(0, 0, -1 * x + G);
                            w.splice(w.length - 1, 1);
                            m[q] = -1 * w[0] + G;
                            s[q] = m[q] + r - d;
                            B[q]--;
                            z[q]++
                        }
                    0 > c && (A = 0, I = e.getSliderOffset(a(g[0]), "x"), a(g).each(function(a) {
                        e.getSliderOffset(this, "x") > I && (I = e.getSliderOffset(this, "x"), A = a)
                    }), x = m[q] - v[A], e.setSliderOffset(a(g)[A], x), w.splice(0, 0, -1 * x + G), w.splice(w.length - 1, 1), m[q] = -1 * w[0] + G, s[q] = m[q] + r - d, B[q]--)
                }
            }
            t = !1;
            d = e.calcActiveOffset(n, c, w, d, B[q], y, K, q);
            x = (d + B[q] + y) % y;
            n.infiniteSlider ? x != ba[q] && (t = !0) : d != z[q] && (t = !0);
            if (t && (y = new e.args("change", n, b, a(b).children(":eq(" + x + ")"), x, p), a(b).parent().data("args", y), "" != n.onSlideChange))
                n.onSlideChange(y);
            z[q] = d;
            ba[q] = x;
            c = Math.floor(c);
            e.setSliderOffset(b, c);
            n.scrollbar && (T = Math.floor((-1 * c - m[q] + G) / (s[q] - m[q] + G) * (N - O - h)), b = h - L, c >= -1 * m[q] + G ? (b = h - L - -1 * T, e.setSliderOffset(a("." + f), 0)) : (c <= -1 * s[q] + 1 && (b = N - O - L - T), e.setSliderOffset(a("." + f), T)), a("." + f).css({width: b + "px"}))
        }, slowScrollHorizontal: function(b, g, c, f, h, d, N, O, L, K, t, w, x, y, v, q, G, p, n, r, u) {
            var k = e.getSliderOffset(b, "x");
            d = [];
            var D = 0, A = 25 / 1024 * O;
            frictionCoefficient = u.frictionCoefficient;
            elasticFrictionCoefficient = u.elasticFrictionCoefficient;
            snapFrictionCoefficient = u.snapFrictionCoefficient;
            h > u.snapVelocityThreshold && u.snapToChildren && !n ? D = 1 : h < -1 * u.snapVelocityThreshold && u.snapToChildren && !n && (D = -1);
            h < -1 * A ? h = -1 * A : h > A && (h = A);
            a(b)[0] !== a(p)[0] && (D *= -1, h *= -2);
            p = B[v];
            if (u.infiniteSlider)
                var I = m[v], l = s[v];
            n = [];
            for (var A = [], E = 0; E < x.length; E++)
                n[E] = x[E], E < g.length && (A[E] = e.getSliderOffset(a(g[E]), "x"));
            for (; 1 < h || -1 > h; ) {
                h *= frictionCoefficient;
                k += h;
                (k > -1 * m[v] || k < -1 * s[v]) && !u.infiniteSlider && (h *= elasticFrictionCoefficient, k += h);
                if (u.infiniteSlider) {
                    if (k <= -1 * l) {
                        for (var l = a(b).width(), J = 0, P = A[0], E = 0; E < A.length; E++)
                            A[E] < P && (P = A[E], J = E);
                        E = I + l;
                        A[J] = E;
                        I = -1 * n[1] + r;
                        l = I + l - O;
                        n.splice(0, 1);
                        n.splice(n.length, 0, -1 * E + r);
                        p++
                    }
                    if (k >= -1 * I) {
                        l = a(b).width();
                        J = 0;
                        P = A[0];
                        for (E = 0; E < A.length; E++)
                            A[E] > P && (P = A[E], J = E);
                        E = I - y[J];
                        A[J] = E;
                        n.splice(0, 0, -1 * E + r);
                        n.splice(n.length - 1, 1);
                        I = -1 * n[0] + r;
                        l = I + l - O;
                        p--
                    }
                }
                d[d.length] = k
            }
            A = !1;
            h = e.calcActiveOffset(u, k, n, O, p, G, z[v], v);
            I = (h + p + G) % G;
            u.snapToChildren && (u.infiniteSlider ? I != ba[v] && (A = !0) : h != z[v] && (A = !0), 0 > D && !A ? (h++, h >= x.length && !u.infiniteSlider && (h = x.length - 1)) : 0 < D && !A && (h--, 0 > h && !u.infiniteSlider && (h = 0)));
            if (u.snapToChildren || (k > -1 * m[v] || k < -1 * s[v]) && !u.infiniteSlider) {
                (k > -1 * m[v] || k < -1 * s[v]) && !u.infiniteSlider ? d.splice(0, d.length) : (d.splice(0.1 * d.length, d.length), k = 0 < d.length ? d[d.length - 1] : k);
                for (; k < n[h] - 0.5 || k > n[h] + 0.5; )
                    k = (k - n[h]) * snapFrictionCoefficient + n[h], d[d.length] = k;
                d[d.length] = n[h]
            }
            D = 1;
            0 != d.length % 2 && (D = 0);
            for (k = 0; k < c.length; k++)
                clearTimeout(c[k]);
            p = (h + p + G) % G;
            I = 0;
            for (k = D; k < d.length; k += 2)
                if (k == D || 1 < Math.abs(d[k] - I) || k >= d.length - 2)
                    I = d[k], c[c.length] = e.slowScrollHorizontalIntervalTimer(10 * k, b, g, d[k], f, N, O, L, K, t, h, w, x, q, G, y, v, r, p, u);
            I = (h + B[v] + G) % G;
            "" != u.onSlideComplete && 1 < d.length && (c[c.length] = e.onSlideCompleteTimer(10 * (k + 1), u, b, a(b).children(":eq(" + I + ")"), p, v));
            $[v] = c;
            e.hideScrollbar(u, c, k, d, f, N, O, K, t, v)
        }, onSlideComplete: function(b, g, c, f, h) {
            c = new e.args("complete", b, a(g), c, f, f);
            a(g).parent().data("args", c);
            if ("" != b.onSlideComplete)
                b.onSlideComplete(c)
        }, getSliderOffset: function(b, e) {
            var c = 0;
            e = "x" == e ? 4 : 5;
            if (!fa || aa || X)
                c = parseInt(a(b).css("left"), 10);
            else {
                for (var c = ["-webkit-transform", "-moz-transform", "transform"], f, h = 0; h < c.length; h++)
                    if (void 0 != a(b).css(c[h]) && 0 < a(b).css(c[h]).length) {
                        f = a(b).css(c[h]).split(",");
                        break
                    }
                c = void 0 == f[e] ? 0 : parseInt(f[e], 10)
            }
            return c
        }, setSliderOffset: function(b, e) {
            e = parseInt(e, 10);
            !fa || aa || X ? a(b).css({left: e + "px"}) : a(b).css({webkitTransform: "matrix(1,0,0,1," + e + ",0)", MozTransform: "matrix(1,0,0,1," + e + ",0)", transform: "matrix(1,0,0,1," + e + ",0)"})
        }, setBrowserInfo: function() {
            null != navigator.userAgent.match("WebKit") ? (ga = "-webkit-grab", sa = "-webkit-grabbing") : null != navigator.userAgent.match("Gecko") ? (ia = !0, ga = "move", sa = "-moz-grabbing") : null != navigator.userAgent.match("MSIE 7") ? oa = aa = !0 : null != navigator.userAgent.match("MSIE 8") ? oa = X = !0 : null != navigator.userAgent.match("MSIE 9") && (oa = !0)
        }, has3DTransform: function() {
            var b = !1, e = a("<div />").css({webkitTransform: "matrix(1,1,1,1,1,1)", MozTransform: "matrix(1,1,1,1,1,1)", transform: "matrix(1,1,1,1,1,1)"});
            "" == e.attr("style") ? b = !1 : ia && 21 <= parseInt(navigator.userAgent.split("/")[3], 10) ? b = !1 : void 0 != e.attr("style") && (b = !0);
            return b
        }, getSlideNumber: function(a, e, c) {
            return(a - B[e] + c) % c
        }, calcActiveOffset: function(a, e, c, f, h, d, m, s) {
            h = !1;
            a = [];
            var z;
            e > c[0] && (z = 0);
            e < c[c.length - 1] && (z = d - 1);
            for (d = 0; d < c.length; d++)
                c[d] <= e && c[d] > e - f && (h || c[d] == e || (a[a.length] = c[d - 1]), a[a.length] = c[d], h = !0);
            0 == a.length && (a[0] = c[c.length - 1]);
            for (d = h = 0; d < a.length; d++)
                m = Math.abs(e - a[d]), m < f && (h = a[d], f = m);
            for (d = 0; d < c.length; d++)
                h == c[d] && (z = d);
            return z
        }, changeSlide: function(b, g, c, f, h, d, m, s, L, K, t, w, x, y, v, q, G, p) {
            e.autoSlidePause(y);
            for (var n = 0; n < f.length; n++)
                clearTimeout(f[n]);
            var r = Math.ceil(p.autoSlideTransTimer / 10) + 1, u = e.getSliderOffset(g, "x"), k = w[b], D = k - u;
            if (p.infiniteSlider)
                for (b = (b - B[y] + 2 * q) % q, n = !1, 0 == b && 2 == q && (b = q, w[b] = w[b - 1] - a(c).eq(0).outerWidth(!0), n = !0), k = w[b], D = k - u, k = [w[b] - a(g).width(), w[b] + a(g).width()], n && w.splice(w.length - 1, 1), n = 0; n < k.length; n++)
                    Math.abs(k[n] - u) < Math.abs(D) && (D = k[n] - u);
            var k = [], A;
            e.showScrollbar(p, h);
            for (n = 0; n <= r; n++)
                A = n, A /= r, A--, A = u + D * (Math.pow(A, 5) + 1), k[k.length] = A;
            r = (b + B[y] + q) % q;
            for (n = u = 0; n < k.length; n++) {
                if (0 == n || 1 < Math.abs(k[n] - u) || n >= k.length - 2)
                    u = k[n], f[n] = e.slowScrollHorizontalIntervalTimer(10 * (n + 1), g, c, k[n], h, d, m, s, L, K, b, t, w, v, q, x, y, G, r, p);
                0 == n && "" != p.onSlideStart && (D = (z[y] + B[y] + q) % q, p.onSlideStart(new e.args("start", p, g, a(g).children(":eq(" + D + ")"), D, b)))
            }
            u = !1;
            p.infiniteSlider ? r != ba[y] && (u = !0) : b != z[y] && (u = !0);
            u && "" != p.onSlideComplete && (f[f.length] = e.onSlideCompleteTimer(10 * (n + 1), p, g, a(g).children(":eq(" + r + ")"), r, y));
            $[y] = f;
            e.hideScrollbar(p, f, n, k, h, d, m, L, K, y);
            e.autoSlide(g, c, f, h, d, m, s, L, K, t, w, x, y, v, q, G, p)
        }, autoSlide: function(a, g, c, f, h, d, m, s, L, K, t, w, x, y, v, q, G) {
            if (!J[x].autoSlide)
                return!1;
            e.autoSlidePause(x);
            ja[x] = setTimeout(function() {
                !G.infiniteSlider && z[x] > t.length - 1 && (z[x] -= v);
                e.changeSlide((z[x] + B[x] + t.length + 1) % t.length, a, g, c, f, h, d, m, s, L, K, t, w, x, y, v, q, G);
                e.autoSlide(a, g, c, f, h, d, m, s, L, K, t, w, x, y, v, q, G)
            }, G.autoSlideTimer + G.autoSlideTransTimer)
        }, autoSlidePause: function(a) {
            clearTimeout(ja[a])
        }, isUnselectable: function(b, e) {
            return"" != e.unselectableSelector && 1 == a(b).closest(e.unselectableSelector).length ? !0 : !1
        }, slowScrollHorizontalIntervalTimer: function(a, g, c, f, h, d, m, s, z, B, t, w, x, y, v, q, G, p, n, r) {
            return setTimeout(function() {
                e.slowScrollHorizontalInterval(g, c, f, h, d, m, s, z, B, t, w, x, y, v, q, G, p, n, r)
            }, a)
        }, onSlideCompleteTimer: function(a, g, c, f, h, d) {
            return setTimeout(function() {
                e.onSlideComplete(g, c, f, h, d)
            }, a)
        }, hideScrollbarIntervalTimer: function(a, g, c, f, h, d, m, s, z, B) {
            return setTimeout(function() {
                e.hideScrollbarInterval(g, c, f, h, d, m, s, z, B)
            }, a)
        }, args: function(b, g, c, f, h, d) {
            this.prevSlideNumber = void 0 == a(c).parent().data("args") ? void 0 : a(c).parent().data("args").prevSlideNumber;
            this.prevSlideObject = void 0 == a(c).parent().data("args") ? void 0 : a(c).parent().data("args").prevSlideObject;
            this.targetSlideNumber = d + 1;
            this.targetSlideObject = a(c).children(":eq(" + d + ")");
            this.slideChanged = !1;
            "load" == b ? this.targetSlideObject = this.targetSlideNumber = void 0 : "start" == b ? this.targetSlideObject = this.targetSlideNumber = void 0 : "change" == b ? (this.slideChanged = !0, this.prevSlideNumber = void 0 == a(c).parent().data("args") ? g.startAtSlide : a(c).parent().data("args").currentSlideNumber, this.prevSlideObject = a(c).children(":eq(" + this.prevSlideNumber + ")")) : "complete" == b && (this.slideChanged = a(c).parent().data("args").slideChanged);
            this.settings = g;
            this.data = a(c).parent().data("iosslider");
            this.sliderObject = c;
            this.sliderContainerObject = a(c).parent();
            this.currentSlideObject = f;
            this.currentSlideNumber = h + 1;
            this.currentSliderOffset = -1 * e.getSliderOffset(c, "x")
        }, preventDrag: function(a) {
            a.preventDefault()
        }, preventClick: function(a) {
            a.stopImmediatePropagation();
            return!1
        }, enableClick: function() {
            return!0
        }};
    e.setBrowserInfo();
    var V = {init: function(b, g) {
            fa = e.has3DTransform();
            var c = a.extend(!0, {elasticPullResistance: 0.6, frictionCoefficient: 0.92, elasticFrictionCoefficient: 0.6, snapFrictionCoefficient: 0.92, snapToChildren: !1, snapSlideCenter: !1, startAtSlide: 1, scrollbar: !1, scrollbarDrag: !1, scrollbarHide: !0, scrollbarLocation: "top", scrollbarContainer: "", scrollbarOpacity: 0.4, scrollbarHeight: "4px", scrollbarBorder: "0", scrollbarMargin: "5px", scrollbarBackground: "#000", scrollbarBorderRadius: "100px", scrollbarShadow: "0 0 0 #000", scrollbarElasticPullResistance: 0.9, desktopClickDrag: !1, keyboardControls: !1, tabToAdvance: !1, responsiveSlideContainer: !0, responsiveSlides: !0, navSlideSelector: "", navPrevSelector: "", navNextSelector: "", autoSlideToggleSelector: "", autoSlide: !1, autoSlideTimer: 5E3, autoSlideTransTimer: 750, autoSlideHoverPause: !0, infiniteSlider: !1, snapVelocityThreshold: 5, slideStartVelocityThreshold: 0, horizontalSlideLockThreshold: 5, verticalSlideLockThreshold: 3, stageCSS: {position: "relative", top: "0", left: "0", overflow: "hidden", zIndex: 1}, unselectableSelector: "", onSliderLoaded: "", onSliderUpdate: "", onSliderResize: "", onSlideStart: "", onSlideChange: "", onSlideComplete: ""}, b);
            void 0 == g && (g = this);
            return a(g).each(function(b) {
                function g() {
                    e.autoSlidePause(d);
                    va = a(F).find("a");
                    ja = a(F).find("[onclick]");
                    pa = a(F).find("*");
                    a(n).css("width", "");
                    a(n).css("height", "");
                    a(F).css("width", "");
                    C = a(F).children().not("script").get();
                    ha = [];
                    M = [];
                    c.responsiveSlides && a(C).css("width", "");
                    s[d] = 0;
                    l = [];
                    q = a(n).parent().width();
                    r = a(n).outerWidth(!0);
                    c.responsiveSlideContainer && (r = a(n).outerWidth(!0) > q ? q : a(n).width());
                    a(n).css({position: c.stageCSS.position, top: c.stageCSS.top, left: c.stageCSS.left, overflow: c.stageCSS.overflow, zIndex: c.stageCSS.zIndex, webkitPerspective: 1E3, webkitBackfaceVisibility: "hidden", msTouchAction: "pan-y", width: r});
                    a(c.unselectableSelector).css({cursor: "default"});
                    for (var b = 0; b < C.length; b++) {
                        ha[b] = a(C[b]).width();
                        M[b] = a(C[b]).outerWidth(!0);
                        var h = M[b];
                        c.responsiveSlides && (M[b] > r ? (h = r + -1 * (M[b] - ha[b]), ha[b] = h, M[b] = r) : h = ha[b], a(C[b]).css({width: h}));
                        a(C[b]).css({webkitBackfaceVisibility: "hidden", overflow: "hidden", position: "absolute"});
                        l[b] = -1 * s[d];
                        s[d] = s[d] + h + (M[b] - ha[b])
                    }
                    c.snapSlideCenter && (p = 0.5 * (r - M[0]), c.responsiveSlides && M[0] > r && (p = 0));
                    ua[d] = 2 * s[d];
                    for (b = 0; b < C.length; b++)
                        e.setSliderOffset(a(C[b]), -1 * l[b] + s[d] + p), l[b] -= s[d];
                    if (!c.infiniteSlider && !c.snapSlideCenter) {
                        for (b = 0; b < l.length && !(l[b] <= - 1 * (2 * s[d] - r)); b++)
                            ia = b;
                        l.splice(ia + 1, l.length);
                        l[l.length] = -1 * (2 * s[d] - r)
                    }
                    for (b = 0; b < l.length; b++)
                        E[b] = l[b];
                    I && (J[d].startAtSlide = J[d].startAtSlide > l.length ? l.length : J[d].startAtSlide, c.infiniteSlider ? (J[d].startAtSlide = (J[d].startAtSlide - 1 + H) % H, z[d] = J[d].startAtSlide) : (J[d].startAtSlide = 0 > J[d].startAtSlide - 1 ? l.length - 1 : J[d].startAtSlide, z[d] = J[d].startAtSlide - 1), ba[d] = z[d]);
                    m[d] = s[d] + p;
                    a(F).css({position: "relative", cursor: ga, webkitPerspective: "0", webkitBackfaceVisibility: "hidden", width: s[d] + "px"});
                    R = s[d];
                    s[d] = 2 * s[d] - r + 2 * p;
                    (Y = R + p < r || 0 == r ? !0 : !1) && a(F).css({cursor: "default"});
                    G = a(n).parent().outerHeight(!0);
                    u = a(n).height();
                    c.responsiveSlideContainer && (u = u > G ? G : u);
                    a(n).css({height: u});
                    e.setSliderOffset(F, l[z[d]]);
                    if (c.infiniteSlider && !Y) {
                        b = e.getSliderOffset(a(F), "x");
                        for (h = (B[d] + H) % H * -1; 0 > h; ) {
                            var f = 0, A = e.getSliderOffset(a(C[0]), "x");
                            a(C).each(function(a) {
                                e.getSliderOffset(this, "x") < A && (A = e.getSliderOffset(this, "x"), f = a)
                            });
                            var L = m[d] + R;
                            e.setSliderOffset(a(C)[f], L);
                            m[d] = -1 * l[1] + p;
                            s[d] = m[d] + R - r;
                            l.splice(0, 1);
                            l.splice(l.length, 0, -1 * L + p);
                            h++
                        }
                        for (; 0 < -1 * l[0] - R + p && c.snapSlideCenter && I; ) {
                            var O = 0, P = e.getSliderOffset(a(C[0]), "x");
                            a(C).each(function(a) {
                                e.getSliderOffset(this, "x") > P && (P = e.getSliderOffset(this, "x"), O = a)
                            });
                            L = m[d] - M[O];
                            e.setSliderOffset(a(C)[O], L);
                            l.splice(0, 0, -1 * L + p);
                            l.splice(l.length - 1, 1);
                            m[d] = -1 * l[0] + p;
                            s[d] = m[d] + R - r;
                            B[d]--;
                            z[d]++
                        }
                        for (; b <= - 1 * s[d]; )
                            f = 0, A = e.getSliderOffset(a(C[0]), "x"), a(C).each(function(a) {
                                e.getSliderOffset(this, "x") < A && (A = e.getSliderOffset(this, "x"), f = a)
                            }), L = m[d] + R, e.setSliderOffset(a(C)[f], L), m[d] = -1 * l[1] + p, s[d] = m[d] + R - r, l.splice(0, 1), l.splice(l.length, 0, -1 * L + p), B[d]++, z[d]--
                    }
                    e.setSliderOffset(F, l[z[d]]);
                    c.desktopClickDrag || a(F).css({cursor: "default"});
                    c.scrollbar && (a("." + K).css({margin: c.scrollbarMargin, overflow: "hidden", display: "none"}), a("." + K + " ." + t).css({border: c.scrollbarBorder}), k = parseInt(a("." + K).css("marginLeft")) + parseInt(a("." + K).css("marginRight")), D = parseInt(a("." + K + " ." + t).css("borderLeftWidth"), 10) + parseInt(a("." + K + " ." + t).css("borderRightWidth"), 10), y = "" != c.scrollbarContainer ? a(c.scrollbarContainer).width() : r, v = r / R * (y - k), c.scrollbarHide || (V = c.scrollbarOpacity), a("." + K).css({position: "absolute", left: 0, width: y - k + "px", margin: c.scrollbarMargin}), "top" == c.scrollbarLocation ? a("." + K).css("top", "0") : a("." + K).css("bottom", "0"), a("." + K + " ." + t).css({borderRadius: c.scrollbarBorderRadius, background: c.scrollbarBackground, height: c.scrollbarHeight, width: v - D + "px", minWidth: c.scrollbarHeight, border: c.scrollbarBorder, webkitPerspective: 1E3, webkitBackfaceVisibility: "hidden", position: "relative", opacity: V, filter: "alpha(opacity:" + 100 * V + ")", boxShadow: c.scrollbarShadow}), e.setSliderOffset(a("." + K + " ." + t), Math.floor((-1 * l[z[d]] - m[d] + p) / (s[d] - m[d] + p) * (y - k - v))), a("." + K).css({display: "block"}), w = a("." + K + " ." + t), x = a("." + K));
                    c.scrollbarDrag && !Y && a("." + K + " ." + t).css({cursor: ga});
                    c.infiniteSlider && (S = (s[d] + r) / 3);
                    "" != c.navSlideSelector && a(c.navSlideSelector).each(function(b) {
                        a(this).css({cursor: "pointer"});
                        a(this).unbind(Q).bind(Q, function(g) {
                            "touchstart" == g.type ? a(this).unbind("click.iosSliderEvent") : a(this).unbind("touchstart.iosSliderEvent");
                            Q = g.type + ".iosSliderEvent";
                            e.changeSlide(b, F, C, N, t, v, r, y, k, D, E, l, M, d, S, H, p, c)
                        })
                    });
                    "" != c.navPrevSelector && (a(c.navPrevSelector).css({cursor: "pointer"}), a(c.navPrevSelector).unbind(Q).bind(Q, function(b) {
                        "touchstart" == b.type ? a(this).unbind("click.iosSliderEvent") : a(this).unbind("touchstart.iosSliderEvent");
                        Q = b.type + ".iosSliderEvent";
                        b = (z[d] + B[d] + H) % H;
                        (0 < b || c.infiniteSlider) && e.changeSlide(b - 1, F, C, N, t, v, r, y, k, D, E, l, M, d, S, H, p, c)
                    }));
                    "" != c.navNextSelector && (a(c.navNextSelector).css({cursor: "pointer"}), a(c.navNextSelector).unbind(Q).bind(Q, function(b) {
                        "touchstart" == b.type ? a(this).unbind("click.iosSliderEvent") : a(this).unbind("touchstart.iosSliderEvent");
                        Q = b.type + ".iosSliderEvent";
                        b = (z[d] + B[d] + H) % H;
                        (b < l.length - 1 || c.infiniteSlider) && e.changeSlide(b + 1, F, C, N, t, v, r, y, k, D, E, l, M, d, S, H, p, c)
                    }));
                    c.autoSlide && !Y && "" != c.autoSlideToggleSelector && (a(c.autoSlideToggleSelector).css({cursor: "pointer"}), a(c.autoSlideToggleSelector).unbind(Q).bind(Q, function(b) {
                        "touchstart" == b.type ? a(this).unbind("click.iosSliderEvent") : a(this).unbind("touchstart.iosSliderEvent");
                        Q = b.type + ".iosSliderEvent";
                        wa ? (e.autoSlide(F, C, N, t, v, r, y, k, D, E, l, M, d, S, H, p, c), wa = !1, a(c.autoSlideToggleSelector).removeClass("on")) : (e.autoSlidePause(d), wa = !0, a(c.autoSlideToggleSelector).addClass("on"))
                    }));
                    e.autoSlide(F, C, N, t, v, r, y, k, D, E, l, M, d, S, H, p, c);
                    a(n).bind("mouseleave.iosSliderEvent", function() {
                        e.autoSlide(F, C, N, t, v, r, y, k, D, E, l, M, d, S, H, p, c)
                    });
                    a(n).bind("touchend.iosSliderEvent", function() {
                        e.autoSlide(F, C, N, t, v, r, y, k, D, E, l, M, d, S, H, p, c)
                    });
                    c.autoSlideHoverPause && a(n).bind("mouseenter.iosSliderEvent", function() {
                        e.autoSlidePause(d)
                    });
                    a(n).data("iosslider", {obj: za, settings: c, scrollerNode: F, slideNodes: C, numberOfSlides: H, centeredSlideOffset: p, sliderNumber: d, originalOffsets: E, childrenOffsets: l, sliderMax: s[d], scrollbarClass: t, scrollbarWidth: v, scrollbarStageWidth: y, stageWidth: r, scrollMargin: k, scrollBorder: D, infiniteSliderOffset: B[d], infiniteSliderWidth: S, slideNodeOuterWidths: M});
                    I = !1;
                    return!0
                }
                na++;
                var d = na, N = [];
                J[d] = a.extend({}, c);
                m[d] = 0;
                s[d] = 0;
                var O = [0, 0], L = [0, 0], K = "scrollbarBlock" + na, t = "scrollbar" + na, w, x, y, v, q, G, p = 0, n = a(this), r, u, k, D, A, I = !0;
                b = -1;
                var l, E = [], V = 0, P = 0, fa = 0, F = a(this).children(":first-child"), C, ha, M, H = a(F).children().not("script").length, U = !1, ia = 0, xa = !1, qa = void 0, S;
                B[d] = 0;
                var Y = !1, wa = !1;
                ta[d] = !1;
                var Z, ra = !1, ka = !1, Q = "touchstart.iosSliderEvent click.iosSliderEvent", R, va, ja, pa;
                ca[d] = !1;
                $[d] = [];
                c.scrollbarDrag && (c.scrollbar = !0, c.scrollbarHide = !1);
                var za = a(this);
                if (void 0 != za.data("iosslider"))
                    return!0;
                a(this).find("img").bind("dragstart.iosSliderEvent", function(a) {
                    a.preventDefault()
                });
                c.infiniteSlider && (c.scrollbar = !1);
                c.infiniteSlider && 1 == H && (c.infiniteSlider = !1);
                c.scrollbar && ("" != c.scrollbarContainer ? a(c.scrollbarContainer).append("<div class = '" + K + "'><div class = '" + t + "'></div></div>") : a(F).parent().append("<div class = '" + K + "'><div class = '" + t + "'></div></div>"));
                if (!g())
                    return!0;
                a(this).find("a").bind("mousedown", e.preventDrag);
                a(this).find("[onclick]").bind("click", e.preventDrag).each(function() {
                    a(this).data("onclick", this.onclick)
                });
                b = e.calcActiveOffset(c, e.getSliderOffset(a(F), "x"), l, r, B[d], H, void 0, d);
                b = (b + B[d] + H) % H;
                b = new e.args("load", c, F, a(F).children(":eq(" + b + ")"), b, b);
                a(n).data("args", b);
                if ("" != c.onSliderLoaded)
                    c.onSliderLoaded(b);
                if (J[d].responsiveSlides || J[d].responsiveSlideContainer)
                    b = Ba ? "orientationchange" : "resize", a(window).bind(b + ".iosSliderEvent-" + d, function() {
                        if (!g())
                            return!0;
                        var b = a(n).data("args");
                        if ("" != c.onSliderResize)
                            c.onSliderResize(b)
                    });
                !c.keyboardControls && !c.tabToAdvance || Y || a(document).bind("keydown.iosSliderEvent", function(a) {
                    aa || X || (a = a.originalEvent);
                    if (37 == a.keyCode && c.keyboardControls)
                        a.preventDefault(), a = (z[d] + B[d] + H) % H, (0 < a || c.infiniteSlider) && e.changeSlide(a - 1, F, C, N, t, v, r, y, k, D, E, l, M, d, S, H, p, c);
                    else if (39 == a.keyCode && c.keyboardControls || 9 == a.keyCode && c.tabToAdvance)
                        a.preventDefault(), a = (z[d] + B[d] + H) % H, (a < l.length - 1 || c.infiniteSlider) && e.changeSlide(a + 1, F, C, N, t, v, r, y, k, D, E, l, M, d, S, H, p, c)
                });
                if (Aa || c.desktopClickDrag) {
                    var da = !1, la = a(F), ma = a(F), ya = !1;
                    c.scrollbarDrag && (la = la.add(w), ma = ma.add(x));
                    a(la).bind("mousedown.iosSliderEvent touchstart.iosSliderEvent", function(b) {
                        if (da)
                            return!0;
                        da = !0;
                        "touchstart" == b.type ? a(ma).unbind("mousedown.iosSliderEvent") : a(ma).unbind("touchstart.iosSliderEvent");
                        if (ca[d] || Y || (ya = e.isUnselectable(b.target, c)))
                            return U = da = !1, !0;
                        Z = a(this)[0] === a(w)[0] ? w : F;
                        aa || X || (b = b.originalEvent);
                        e.autoSlidePause(d);
                        pa.unbind(".disableClick");
                        if ("touchstart" == b.type)
                            eventX = b.touches[0].pageX, eventY = b.touches[0].pageY;
                        else {
                            if (window.getSelection)
                                window.getSelection().empty ? window.getSelection().empty() : window.getSelection().removeAllRanges && window.getSelection().removeAllRanges();
                            else if (document.selection)
                                if (X)
                                    try {
                                        document.selection.empty()
                                    } catch (g) {
                                    }
                                else
                                    document.selection.empty();
                            eventX = b.pageX;
                            eventY = b.pageY;
                            xa = !0;
                            qa = F;
                            a(this).css({cursor: sa})
                        }
                        O = [0, 0];
                        L = [0, 0];
                        W = 0;
                        U = !1;
                        for (b = 0; b < N.length; b++)
                            clearTimeout(N[b]);
                        b = e.getSliderOffset(F, "x");
                        b > -1 * m[d] + p + R ? (b = -1 * m[d] + p + R, e.setSliderOffset(a("." + t), b), a("." + t).css({width: v - D + "px"})) : b < -1 * s[d] && (e.setSliderOffset(a("." + t), y - k - v), a("." + t).css({width: v - D + "px"}));
                        b = a(this)[0] === a(w)[0] ? m[d] : 0;
                        P = -1 * (e.getSliderOffset(this, "x") - eventX - b);
                        e.getSliderOffset(this, "y");
                        O[1] = eventX;
                        L[1] = eventY;
                        ka = !1
                    });
                    a(ma).bind("touchmove.iosSliderEvent mousemove.iosSliderEvent", function(b) {
                        aa || X || (b = b.originalEvent);
                        if (ca[d] || Y || ya)
                            return!0;
                        var g = 0;
                        if ("touchmove" == b.type)
                            eventX = b.touches[0].pageX, eventY = b.touches[0].pageY;
                        else {
                            if (window.getSelection)
                                window.getSelection().empty || window.getSelection().removeAllRanges && window.getSelection().removeAllRanges();
                            else if (document.selection)
                                if (X)
                                    try {
                                        document.selection.empty()
                                    } catch (h) {
                                    }
                                else
                                    document.selection.empty();
                            eventX = b.pageX;
                            eventY = b.pageY;
                            if (!xa || !oa && ("undefined" != typeof b.webkitMovementX || "undefined" != typeof b.webkitMovementY) && 0 === b.webkitMovementY && 0 === b.webkitMovementX)
                                return!0
                        }
                        O[0] = O[1];
                        O[1] = eventX;
                        W = (O[1] - O[0]) / 2;
                        L[0] = L[1];
                        L[1] = eventY;
                        ea = (L[1] - L[0]) / 2;
                        if (!U) {
                            var f = (z[d] + B[d] + H) % H, f = new e.args("start", c, F, a(F).children(":eq(" + f + ")"), f, void 0);
                            a(n).data("args", f);
                            if ("" != c.onSlideStart)
                                c.onSlideStart(f)
                        }
                        (ea > c.verticalSlideLockThreshold || ea < -1 * c.verticalSlideLockThreshold) && "touchmove" == b.type && !U && (ra = !0);
                        (W > c.horizontalSlideLockThreshold || W < -1 * c.horizontalSlideLockThreshold) && "touchmove" == b.type && b.preventDefault();
                        if (W > c.slideStartVelocityThreshold || W < -1 * c.slideStartVelocityThreshold)
                            U = !0;
                        if (U && !ra) {
                            var f = e.getSliderOffset(F, "x"), q = a(Z)[0] === a(w)[0] ? m[d] : p, u = a(Z)[0] === a(w)[0] ? (m[d] - s[d] - p) / (y - k - v) : 1, x = a(Z)[0] === a(w)[0] ? c.scrollbarElasticPullResistance : c.elasticPullResistance, G = c.snapSlideCenter && a(Z)[0] === a(w)[0] ? 0 : p, K = c.snapSlideCenter && a(Z)[0] === a(w)[0] ? p : 0;
                            "touchmove" == b.type && (fa != b.touches.length && (P = -1 * f + eventX), fa = b.touches.length);
                            if (c.infiniteSlider) {
                                if (f <= -1 * s[d]) {
                                    var I = a(F).width();
                                    if (f <= -1 * ua[d]) {
                                        var J = -1 * E[0];
                                        a(C).each(function(b) {
                                            e.setSliderOffset(a(C)[b], J + p);
                                            b < l.length && (l[b] = -1 * J);
                                            J += M[b]
                                        });
                                        P -= -1 * l[0];
                                        m[d] = -1 * l[0] + p;
                                        s[d] = m[d] + I - r;
                                        B[d] = 0
                                    } else {
                                        var N = 0, S = e.getSliderOffset(a(C[0]), "x");
                                        a(C).each(function(a) {
                                            e.getSliderOffset(this, "x") < S && (S = e.getSliderOffset(this, "x"), N = a)
                                        });
                                        x = m[d] + I;
                                        e.setSliderOffset(a(C)[N], x);
                                        m[d] = -1 * l[1] + p;
                                        s[d] = m[d] + I - r;
                                        l.splice(0, 1);
                                        l.splice(l.length, 0, -1 * x + p);
                                        B[d]++
                                    }
                                }
                                if (f >= -1 * m[d] || 0 <= f)
                                    if (I = a(F).width(), 0 <= f)
                                        for (J = -1 * E[0], a(C).each(function(b) {
                                            e.setSliderOffset(a(C)[b], J + p);
                                            b < l.length && (l[b] = -1 * J);
                                            J += M[b]
                                        }), P += -1 * l[0], m[d] = -1 * l[0] + p, s[d] = m[d] + I - r, B[d] = H; 0 < -1 * l[0] - I + p; ) {
                                            var Q = 0, R = e.getSliderOffset(a(C[0]), "x");
                                            a(C).each(function(a) {
                                                e.getSliderOffset(this, "x") > R && (R = e.getSliderOffset(this, "x"), Q = a)
                                            });
                                            x = m[d] - M[Q];
                                            e.setSliderOffset(a(C)[Q], x);
                                            l.splice(0, 0, -1 * x + p);
                                            l.splice(l.length - 1, 1);
                                            m[d] = -1 * l[0] + p;
                                            s[d] = m[d] + I - r;
                                            B[d]--;
                                            z[d]++
                                        }
                                    else
                                        Q = 0, R = e.getSliderOffset(a(C[0]), "x"), a(C).each(function(a) {
                                            e.getSliderOffset(this, "x") > R && (R = e.getSliderOffset(this, "x"), Q = a)
                                        }), x = m[d] - M[Q], e.setSliderOffset(a(C)[Q], x), l.splice(0, 0, -1 * x + p), l.splice(l.length - 1, 1), m[d] = -1 * l[0] + p, s[d] = m[d] + I - r, B[d]--
                            } else
                                I = a(F).width(), f > -1 * m[d] + p && (g = (m[d] + -1 * (P - q - eventX + G) * u - q) * x * -1 / u), f < -1 * s[d] && (g = (s[d] + K + -1 * (P - q - eventX) * u - q) * x * -1 / u);
                            e.setSliderOffset(F, -1 * (P - q - eventX - g) * u - q + K);
                            c.scrollbar && (e.showScrollbar(c, t), T = Math.floor((P - eventX - g - m[d] + G) / (s[d] - m[d] + p) * (y - k - v) * u), f = v, 0 >= T ? (f = v - D - -1 * T, e.setSliderOffset(a("." + t), 0), a("." + t).css({width: f + "px"})) : T >= y - k - D - v ? (f = y - k - D - T, e.setSliderOffset(a("." + t), T), a("." + t).css({width: f + "px"})) : e.setSliderOffset(a("." + t), T));
                            "touchmove" == b.type && (A = b.touches[0].pageX);
                            b = !1;
                            g = e.calcActiveOffset(c, -1 * (P - eventX - g), l, r, B[d], H, void 0, d);
                            f = (g + B[d] + H) % H;
                            c.infiniteSlider ? f != ba[d] && (b = !0) : g != z[d] && (b = !0);
                            if (b && (z[d] = g, ba[d] = f, ka = !0, f = new e.args("change", c, F, a(F).children(":eq(" + f + ")"), f, f), a(n).data("args", f), "" != c.onSlideChange))
                                c.onSlideChange(f)
                        }
                        da = !1
                    });
                    b = a(window);
                    if (X || aa)
                        b = a(document);
                    a(la).bind("touchend.iosSliderEvent", function(a) {
                        a = a.originalEvent;
                        if (ca[d] || Y || ya)
                            return!0;
                        if (0 != a.touches.length)
                            for (var b = 0; b < a.touches.length; b++)
                                a.touches[b].pageX == A && e.slowScrollHorizontal(F, C, N, t, W, ea, v, r, y, k, D, E, l, M, d, S, H, Z, ka, p, c);
                        else
                            e.slowScrollHorizontal(F, C, N, t, W, ea, v, r, y, k, D, E, l, M, d, S, H, Z, ka, p, c);
                        da = ra = !1
                    });
                    a(b).bind("mouseup.iosSliderEvent-" + d, function(b) {
                        U ? va.unbind("click.disableClick").bind("click.disableClick", e.preventClick) : va.unbind("click.disableClick").bind("click.disableClick", e.enableClick);
                        ja.each(function() {
                            this.onclick = function(b) {
                                if (U)
                                    return!1;
                                a(this).data("onclick").call(this, b || window.event)
                            };
                            this.onclick = a(this).data("onclick")
                        });
                        1.8 <= parseFloat(a().jquery) ? pa.each(function() {
                            var b = a._data(this, "events");
                            if (void 0 != b && void 0 != b.click && "iosSliderEvent" != b.click[0].namespace) {
                                if (!U)
                                    return!1;
                                a(this).one("click.disableClick", e.preventClick);
                                var b = a._data(this, "events").click, c = b.pop();
                                b.splice(0, 0, c)
                            }
                        }) : 1.6 <= parseFloat(a().jquery) && pa.each(function() {
                            var b = a(this).data("events");
                            if (void 0 != b && void 0 != b.click && "iosSliderEvent" != b.click[0].namespace) {
                                if (!U)
                                    return!1;
                                a(this).one("click.disableClick", e.preventClick);
                                var b = a(this).data("events").click, c = b.pop();
                                b.splice(0, 0, c)
                            }
                        });
                        if (!ta[d]) {
                            if (Y || ca[d])
                                return!0;
                            a(la).css({cursor: ga});
                            xa = !1;
                            if (void 0 == qa)
                                return!0;
                            e.slowScrollHorizontal(qa, C, N, t, W, ea, v, r, y, k, D, E, l, M, d, S, H, Z, ka, p, c);
                            qa = void 0
                        }
                        da = ra = !1
                    })
                }
            })
        }, destroy: function(b, g) {
            void 0 == g && (g = this);
            return a(g).each(function() {
                var c = a(this), f = c.data("iosslider");
                if (void 0 == f)
                    return!1;
                void 0 == b && (b = !0);
                e.autoSlidePause(f.sliderNumber);
                ta[f.sliderNumber] = !0;
                a(window).unbind(".iosSliderEvent-" + f.sliderNumber);
                a(document).unbind(".iosSliderEvent-" + f.sliderNumber);
                a(document).unbind("keydown.iosSliderEvent");
                a(this).unbind(".iosSliderEvent");
                a(this).children(":first-child").unbind(".iosSliderEvent");
                a(this).children(":first-child").children().unbind(".iosSliderEvent");
                b && (a(this).attr("style", ""), a(this).children(":first-child").attr("style", ""), a(this).children(":first-child").children().attr("style", ""), a(f.settings.navSlideSelector).attr("style", ""), a(f.settings.navPrevSelector).attr("style", ""), a(f.settings.navNextSelector).attr("style", ""), a(f.settings.autoSlideToggleSelector).attr("style", ""), a(f.settings.unselectableSelector).attr("style", ""));
                f.settings.scrollbar && a(".scrollbarBlock" + f.sliderNumber).remove();
                for (var f = $[f.sliderNumber], g = 0; g < f.length; g++)
                    clearTimeout(f[g]);
                c.removeData("iosslider");
                c.removeData("args")
            })
        }, update: function(b) {
            void 0 == b && (b = this);
            return a(b).each(function() {
                var b = a(this), c = b.data("iosslider");
                if (void 0 == c)
                    return!1;
                c.settings.startAtSlide = b.data("args").currentSlideNumber;
                V.destroy(!1, this);
                1 != c.numberOfSlides && c.settings.infiniteSlider && (c.settings.startAtSlide = (z[c.sliderNumber] + 1 + B[c.sliderNumber] + c.numberOfSlides) % c.numberOfSlides);
                V.init(c.settings, this);
                b = new e.args("update", c.settings, c.scrollerNode, a(c.scrollerNode).children(":eq(" + (c.settings.startAtSlide - 1) + ")"), c.settings.startAtSlide - 1, c.settings.startAtSlide - 1);
                a(c.stageNode).data("args", b);
                if ("" != c.settings.onSliderUpdate)
                    c.settings.onSliderUpdate(b)
            })
        }, addSlide: function(b, e) {
            return this.each(function() {
                var c = a(this), f = c.data("iosslider");
                if (void 0 == f)
                    return!1;
                0 == a(f.scrollerNode).children().length ? (a(f.scrollerNode).append(b), c.data("args").currentSlideNumber = 1) : f.settings.infiniteSlider ? (1 == e ? a(f.scrollerNode).children(":eq(0)").before(b) : a(f.scrollerNode).children(":eq(" + (e - 2) + ")").after(b), -1 > B[f.sliderNumber] && z[f.sliderNumber]--, c.data("args").currentSlideNumber >= e && z[f.sliderNumber]++) : (e <= f.numberOfSlides ? a(f.scrollerNode).children(":eq(" + (e - 1) + ")").before(b) : a(f.scrollerNode).children(":eq(" + (e - 2) + ")").after(b), c.data("args").currentSlideNumber >= e && c.data("args").currentSlideNumber++);
                c.data("iosslider").numberOfSlides++;
                V.update(this)
            })
        }, removeSlide: function(b) {
            return this.each(function() {
                var e = a(this).data("iosslider");
                if (void 0 == e)
                    return!1;
                a(e.scrollerNode).children(":eq(" + (b - 1) + ")").remove();
                z[e.sliderNumber] > b - 1 && z[e.sliderNumber]--;
                V.update(this)
            })
        }, goToSlide: function(b, g) {
            void 0 == g && (g = this);
            return a(g).each(function() {
                var c = a(this).data("iosslider");
                if (void 0 == c)
                    return!1;
                b = b > c.childrenOffsets.length ? c.childrenOffsets.length - 1 : b - 1;
                e.changeSlide(b, a(c.scrollerNode), a(c.slideNodes), $[c.sliderNumber], c.scrollbarClass, c.scrollbarWidth, c.stageWidth, c.scrollbarStageWidth, c.scrollMargin, c.scrollBorder, c.originalOffsets, c.childrenOffsets, c.slideNodeOuterWidths, c.sliderNumber, c.infiniteSliderWidth, c.numberOfSlides, c.centeredSlideOffset, c.settings)
            })
        }, prevSlide: function() {
            return this.each(function() {
                var b = a(this).data("iosslider");
                if (void 0 == b)
                    return!1;
                var g = (z[b.sliderNumber] + B[b.sliderNumber] + b.numberOfSlides) % b.numberOfSlides;
                (0 < g || b.settings.infiniteSlider) && e.changeSlide(g - 1, a(b.scrollerNode), a(b.slideNodes), $[b.sliderNumber], b.scrollbarClass, b.scrollbarWidth, b.stageWidth, b.scrollbarStageWidth, b.scrollMargin, b.scrollBorder, b.originalOffsets, b.childrenOffsets, b.slideNodeOuterWidths, b.sliderNumber, b.infiniteSliderWidth, b.numberOfSlides, b.centeredSlideOffset, b.settings);
                z[b.sliderNumber] = g
            })
        }, nextSlide: function() {
            return this.each(function() {
                var b = a(this).data("iosslider");
                if (void 0 == b)
                    return!1;
                var g = (z[b.sliderNumber] + B[b.sliderNumber] + b.numberOfSlides) % b.numberOfSlides;
                (g < b.childrenOffsets.length - 1 || b.settings.infiniteSlider) && e.changeSlide(g + 1, a(b.scrollerNode), a(b.slideNodes), $[b.sliderNumber], b.scrollbarClass, b.scrollbarWidth, b.stageWidth, b.scrollbarStageWidth, b.scrollMargin, b.scrollBorder, b.originalOffsets, b.childrenOffsets, b.slideNodeOuterWidths, b.sliderNumber, b.infiniteSliderWidth, b.numberOfSlides, b.centeredSlideOffset, b.settings);
                z[b.sliderNumber] = g
            })
        }, lock: function() {
            return this.each(function() {
                var b = a(this).data("iosslider");
                if (void 0 == b)
                    return!1;
                a(b.scrollerNode).css({cursor: "default"});
                ca[b.sliderNumber] = !0
            })
        }, unlock: function() {
            return this.each(function() {
                var b = a(this).data("iosslider");
                if (void 0 == b)
                    return!1;
                a(b.scrollerNode).css({cursor: ga});
                ca[b.sliderNumber] = !1
            })
        }, getData: function() {
            return this.each(function() {
                var b = a(this).data("iosslider");
                return void 0 == b ? !1 : b
            })
        }, autoSlidePause: function() {
            return this.each(function() {
                var b = a(this).data("iosslider");
                if (void 0 == b)
                    return!1;
                J[b.sliderNumber].autoSlide = !1;
                e.autoSlidePause(b.sliderNumber);
                return b
            })
        }, autoSlidePlay: function() {
            return this.each(function() {
                var b = a(this).data("iosslider");
                if (void 0 == b)
                    return!1;
                J[b.sliderNumber].autoSlide = !0;
                e.autoSlide(a(b.scrollerNode), a(b.slideNodes), $[b.sliderNumber], b.scrollbarClass, b.scrollbarWidth, b.stageWidth, b.scrollbarStageWidth, b.scrollMargin, b.scrollBorder, b.originalOffsets, b.childrenOffsets, b.slideNodeOuterWidths, b.sliderNumber, b.infiniteSliderWidth, b.numberOfSlides, b.centeredSlideOffset, b.settings);
                return b
            })
        }};
    a.fn.iosSlider = function(b) {
        if (V[b])
            return V[b].apply(this, Array.prototype.slice.call(arguments, 1));
        if ("object" !== typeof b && b)
            a.error("invalid method call!");
        else
            return V.init.apply(this, arguments)
    }
})(jQuery);
;
jQuery(function($) {
    $('.rt_size_chart td').hover(function() {
        var sc_table = $(this).closest('table');
        sc_table.find('th,td').removeClass('hover');
        var sb = $(this).addClass('hover').parent().find('td');
        sb.eq(0).addClass('hover');
        sc_table.find('th').eq($(this).index()).addClass('hover');
    });
    $('.rt_size_chart').mouseout(function() {
        $(this).find('th,td').removeClass('hover');
    });
});