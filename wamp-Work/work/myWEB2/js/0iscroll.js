/*! iScroll v5.1.1 ~ (c) 2008-2014 Matteo Spinelli ~ http://cubiq.org/license */
(function(f, a, e) {
	var h = f.requestAnimationFrame || f.webkitRequestAnimationFrame || f.mozRequestAnimationFrame || f.oRequestAnimationFrame || f.msRequestAnimationFrame ||
	function(i) {
		f.setTimeout(i, 1000 / 60)
	};
	var c = (function() {
		var m = {};
		var n = a.createElement("div").style;
		var k = (function() {
			var r = ["t", "webkitT", "MozT", "msT", "OT"],
				p, q = 0,
				o = r.length;
			for (; q < o; q++) {
				p = r[q] + "ransform";
				if (p in n) {
					return r[q].substr(0, r[q].length - 1)
				}
			}
			return false
		})();

		function l(o) {
			if (k === false) {
				return false
			}
			if (k === "") {
				return o
			}
			return k + o.charAt(0).toUpperCase() + o.substr(1)
		}
		m.getTime = Date.now ||
		function i() {
			return new Date().getTime()
		};
		m.extend = function(q, p) {
			for (var o in p) {
				q[o] = p[o]
			}
		};
		m.addEvent = function(r, q, p, o) {
			r.addEventListener(q, p, !! o)
		};
		m.removeEvent = function(r, q, p, o) {
			r.removeEventListener(q, p, !! o)
		};
		m.momentum = function(u, q, r, o, v, w) {
			var p = u - q,
				s = e.abs(p) / r,
				x, t;
			w = w === undefined ? 0.0006 : w;
			x = u + (s * s) / (2 * w) * (p < 0 ? -1 : 1);
			t = s / w;
			if (x < o) {
				x = v ? o - (v / 2.5 * (s / 8)) : o;
				p = e.abs(x - u);
				t = p / s
			} else {
				if (x > 0) {
					x = v ? v / 2.5 * (s / 8) : 0;
					p = e.abs(u) + x;
					t = p / s
				}
			}
			return {
				destination: e.round(x),
				duration: t
			}
		};
		var j = l("transform");
		m.extend(m, {
			hasTransform: j !== false,
			hasPerspective: l("perspective") in n,
			hasTouch: "ontouchstart" in f,
			hasPointer: navigator.msPointerEnabled,
			hasTransition: l("transition") in n
		});
		m.isBadAndroid = /Android /.test(f.navigator.appVersion) && !(/Chrome\/\d/.test(f.navigator.appVersion));
		m.extend(m.style = {}, {
			transform: j,
			transitionTimingFunction: l("transitionTimingFunction"),
			transitionDuration: l("transitionDuration"),
			transitionDelay: l("transitionDelay"),
			transformOrigin: l("transformOrigin")
		});
		m.hasClass = function(p, q) {
			var o = new RegExp("(^|\\s)" + q + "(\\s|$)");
			return o.test(p.className)
		};
		m.addClass = function(p, q) {
			if (m.hasClass(p, q)) {
				return
			}
			var o = p.className.split(" ");
			o.push(q);
			p.className = o.join(" ")
		};
		m.removeClass = function(p, q) {
			if (!m.hasClass(p, q)) {
				return
			}
			var o = new RegExp("(^|\\s)" + q + "(\\s|$)", "g");
			p.className = p.className.replace(o, " ")
		};
		m.offset = function(o) {
			var q = -o.offsetLeft,
				p = -o.offsetTop;
			while (o = o.offsetParent) {
				q -= o.offsetLeft;
				p -= o.offsetTop
			}
			return {
				left: q,
				top: p
			}
		};
		m.preventDefaultException = function(q, p) {
			for (var o in p) {
				if (p[o].test(q[o])) {
					return true
				}
			}
			return false
		};
		m.extend(m.eventType = {}, {
			touchstart: 1,
			touchmove: 1,
			touchend: 3,
			mousedown: 2,
			mousemove: 2,
			mouseup: 2,
			MSPointerDown: 3,
			MSPointerMove: 3,
			MSPointerUp: 3
		});
		m.extend(m.ease = {}, {
			quadratic: {
				style: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
				fn: function(o) {
					return o * (2 - o)
				}
			},
			circular: {
				style: "cubic-bezier(0.1, 0.57, 0.1, 1)",
				fn: function(o) {
					return e.sqrt(1 - (--o * o))
				}
			},
			back: {
				style: "cubic-bezier(0.175, 0.885, 0.32, 1.275)",
				fn: function(p) {
					var o = 4;
					return (p = p - 1) * p * ((o + 1) * p + o) + 1
				}
			},
			bounce: {
				style: "",
				fn: function(o) {
					if ((o /= 1) < (1 / 2.75)) {
						return 7.5625 * o * o
					} else {
						if (o < (2 / 2.75)) {
							return 7.5625 * (o -= (1.5 / 2.75)) * o + 0.75
						} else {
							if (o < (2.5 / 2.75)) {
								return 7.5625 * (o -= (2.25 / 2.75)) * o + 0.9375
							} else {
								return 7.5625 * (o -= (2.625 / 2.75)) * o + 0.984375
							}
						}
					}
				}
			},
			elastic: {
				style: "",
				fn: function(o) {
					var p = 0.22,
						q = 0.4;
					if (o === 0) {
						return 0
					}
					if (o == 1) {
						return 1
					}
					return (q * e.pow(2, -10 * o) * e.sin((o - p / 4) * (2 * e.PI) / p) + 1)
				}
			}
		});
		m.tap = function(q, o) {
			var p = a.createEvent("Event");
			p.initEvent(o, true, true);
			p.pageX = q.pageX;
			p.pageY = q.pageY;
			q.target.dispatchEvent(p)
		};
		m.click = function(q) {
			var p = q.target,
				o;
			if (!(/(SELECT|INPUT|TEXTAREA)/i).test(p.tagName)) {
				o = a.createEvent("MouseEvents");
				o.initMouseEvent("click", true, true, q.view, 1, p.screenX, p.screenY, p.clientX, p.clientY, q.ctrlKey, q.altKey, q.shiftKey, q.metaKey, 0, null);
				o._constructed = true;
				p.dispatchEvent(o)
			}
		};
		return m
	})();

	function g(l, j) {
		this.wrapper = typeof l == "string" ? a.querySelector(l) : l;
		this.scroller = this.wrapper.children[0];
		this.scrollerStyle = this.scroller.style;
		this.options = {
			resizeScrollbars: true,
			mouseWheelSpeed: 20,
			snapThreshold: 0.334,
			startX: 0,
			startY: 0,
			scrollY: true,
			directionLockThreshold: 5,
			momentum: true,
			bounce: true,
			bounceTime: 600,
			bounceEasing: "",
			preventDefault: true,
			preventDefaultException: {
				tagName: /^(INPUT|TEXTAREA|BUTTON|SELECT)$/
			},
			HWCompositing: true,
			useTransition: true,
			useTransform: true
		};
		for (var k in j) {
			this.options[k] = j[k]
		}
		this.translateZ = this.options.HWCompositing && c.hasPerspective ? " translateZ(0)" : "";
		this.options.useTransition = c.hasTransition && this.options.useTransition;
		this.options.useTransform = c.hasTransform && this.options.useTransform;
		this.options.eventPassthrough = this.options.eventPassthrough === true ? "vertical" : this.options.eventPassthrough;
		this.options.preventDefault = !this.options.eventPassthrough && this.options.preventDefault;
		this.options.scrollY = this.options.eventPassthrough == "vertical" ? false : this.options.scrollY;
		this.options.scrollX = this.options.eventPassthrough == "horizontal" ? false : this.options.scrollX;
		this.options.freeScroll = this.options.freeScroll && !this.options.eventPassthrough;
		this.options.directionLockThreshold = this.options.eventPassthrough ? 0 : this.options.directionLockThreshold;
		this.options.bounceEasing = typeof this.options.bounceEasing == "string" ? c.ease[this.options.bounceEasing] || c.ease.circular : this.options.bounceEasing;
		this.options.resizePolling = this.options.resizePolling === undefined ? 60 : this.options.resizePolling;
		if (this.options.tap === true) {
			this.options.tap = "tap"
		}
		if (this.options.shrinkScrollbars == "scale") {
			this.options.useTransition = false
		}
		this.options.invertWheelDirection = this.options.invertWheelDirection ? -1 : 1;
		this.x = 0;
		this.y = 0;
		this.directionX = 0;
		this.directionY = 0;
		this._events = {};
		this._init();
		this.refresh();
		this.scrollTo(this.options.startX, this.options.startY);
		this.enable()
	}
	g.prototype = {
		version: "5.1.1",
		_init: function() {
			this._initEvents();
			if (this.options.scrollbars || this.options.indicators) {
				this._initIndicators()
			}
			if (this.options.mouseWheel) {
				this._initWheel()
			}
			if (this.options.snap) {
				this._initSnap()
			}
			if (this.options.keyBindings) {
				this._initKeys()
			}
		},
		destroy: function() {
			this._initEvents(true);
			this._execEvent("destroy")
		},
		_transitionEnd: function(i) {
			if (i.target != this.scroller || !this.isInTransition) {
				return
			}
			this._transitionTime();
			if (!this.resetPosition(this.options.bounceTime)) {
				this.isInTransition = false;
				this._execEvent("scrollEnd")
			}
		},
		_start: function(j) {
			if (c.eventType[j.type] != 1) {
				if (j.button !== 0) {
					return
				}
			}
			if (!this.enabled || (this.initiated && c.eventType[j.type] !== this.initiated)) {
				return
			}
			if (this.options.preventDefault && !c.isBadAndroid && !c.preventDefaultException(j.target, this.options.preventDefaultException)) {
				j.preventDefault()
			}
			var i = j.touches ? j.touches[0] : j,
				k;
			this.initiated = c.eventType[j.type];
			this.moved = false;
			this.distX = 0;
			this.distY = 0;
			this.directionX = 0;
			this.directionY = 0;
			this.directionLocked = 0;
			this._transitionTime();
			this.startTime = c.getTime();
			if (this.options.useTransition && this.isInTransition) {
				this.isInTransition = false;
				k = this.getComputedPosition();
				this._translate(e.round(k.x), e.round(k.y));
				this._execEvent("scrollEnd")
			} else {
				if (!this.options.useTransition && this.isAnimating) {
					this.isAnimating = false;
					this._execEvent("scrollEnd")
				}
			}
			this.startX = this.x;
			this.startY = this.y;
			this.absStartX = this.x;
			this.absStartY = this.y;
			this.pointX = i.pageX;
			this.pointY = i.pageY;
			this._execEvent("beforeScrollStart")
		},
		_move: function(n) {
			if (!this.enabled || c.eventType[n.type] !== this.initiated) {
				return
			}
			if (this.options.preventDefault) {
				n.preventDefault()
			}
			var p = n.touches ? n.touches[0] : n,
				k = p.pageX - this.pointX,
				j = p.pageY - this.pointY,
				o = c.getTime(),
				i, q, m, l;
			this.pointX = p.pageX;
			this.pointY = p.pageY;
			this.distX += k;
			this.distY += j;
			m = e.abs(this.distX);
			l = e.abs(this.distY);
			if (o - this.endTime > 300 && (m < 10 && l < 10)) {
				return
			}
			if (!this.directionLocked && !this.options.freeScroll) {
				if (m > l + this.options.directionLockThreshold) {
					this.directionLocked = "h"
				} else {
					if (l >= m + this.options.directionLockThreshold) {
						this.directionLocked = "v"
					} else {
						this.directionLocked = "n"
					}
				}
			}
			if (this.directionLocked == "h") {
				if (this.options.eventPassthrough == "vertical") {
					n.preventDefault()
				} else {
					if (this.options.eventPassthrough == "horizontal") {
						this.initiated = false;
						return
					}
				}
				j = 0
			} else {
				if (this.directionLocked == "v") {
					if (this.options.eventPassthrough == "horizontal") {
						n.preventDefault()
					} else {
						if (this.options.eventPassthrough == "vertical") {
							this.initiated = false;
							return
						}
					}
					k = 0
				}
			}
			k = this.hasHorizontalScroll ? k : 0;
			j = this.hasVerticalScroll ? j : 0;
			i = this.x + k;
			q = this.y + j;
			if (i > 0 || i < this.maxScrollX) {
				i = this.options.bounce ? this.x + k / 3 : i > 0 ? 0 : this.maxScrollX
			}
			if (q > 0 || q < this.maxScrollY) {
				q = this.options.bounce ? this.y + j / 3 : q > 0 ? 0 : this.maxScrollY
			}
			this.directionX = k > 0 ? -1 : k < 0 ? 1 : 0;
			this.directionY = j > 0 ? -1 : j < 0 ? 1 : 0;
			if (!this.moved) {
				this._execEvent("scrollStart")
			}
			this.moved = true;
			this._translate(i, q);
			if (o - this.startTime > 300) {
				this.startTime = o;
				this.startX = this.x;
				this.startY = this.y
			}
		},
		_end: function(o) {
			if (!this.enabled || c.eventType[o.type] !== this.initiated) {
				return
			}
			if (this.options.preventDefault && !c.preventDefaultException(o.target, this.options.preventDefaultException)) {
				o.preventDefault()
			}
			var q = o.changedTouches ? o.changedTouches[0] : o,
				k, j, n = c.getTime() - this.startTime,
				i = e.round(this.x),
				t = e.round(this.y),
				s = e.abs(i - this.startX),
				r = e.abs(t - this.startY),
				l = 0,
				p = "";
			this.isInTransition = 0;
			this.initiated = 0;
			this.endTime = c.getTime();
			if (this.resetPosition(this.options.bounceTime)) {
				return
			}
			this.scrollTo(i, t);
			if (!this.moved) {
				if (this.options.tap) {
					c.tap(o, this.options.tap)
				}
				if (this.options.click) {
					c.click(o)
				}
				this._execEvent("scrollCancel");
				return
			}
			if (this._events.flick && n < 200 && s < 100 && r < 100) {
				this._execEvent("flick");
				return
			}
			if (this.options.momentum && n < 300) {
				k = this.hasHorizontalScroll ? c.momentum(this.x, this.startX, n, this.maxScrollX, this.options.bounce ? this.wrapperWidth : 0, this.options.deceleration) : {
					destination: i,
					duration: 0
				};
				j = this.hasVerticalScroll ? c.momentum(this.y, this.startY, n, this.maxScrollY, this.options.bounce ? this.wrapperHeight : 0, this.options.deceleration) : {
					destination: t,
					duration: 0
				};
				i = k.destination;
				t = j.destination;
				l = e.max(k.duration, j.duration);
				this.isInTransition = 1
			}
			if (this.options.snap) {
				var m = this._nearestSnap(i, t);
				this.currentPage = m;
				l = this.options.snapSpeed || e.max(e.max(e.min(e.abs(i - m.x), 1000), e.min(e.abs(t - m.y), 1000)), 300);
				i = m.x;
				t = m.y;
				this.directionX = 0;
				this.directionY = 0;
				p = this.options.bounceEasing
			}
			if (i != this.x || t != this.y) {
				if (i > 0 || i < this.maxScrollX || t > 0 || t < this.maxScrollY) {
					p = c.ease.quadratic
				}
				this.scrollTo(i, t, l, p);
				return
			}
			this._execEvent("scrollEnd")
		},
		_resize: function() {
			var i = this;
			clearTimeout(this.resizeTimeout);
			this.resizeTimeout = setTimeout(function() {
				i.refresh()
			}, this.options.resizePolling)
		},
		resetPosition: function(j) {
			var i = this.x,
				k = this.y;
			j = j || 0;
			if (!this.hasHorizontalScroll || this.x > 0) {
				i = 0
			} else {
				if (this.x < this.maxScrollX) {
					i = this.maxScrollX
				}
			}
			if (!this.hasVerticalScroll || this.y > 0) {
				k = 0
			} else {
				if (this.y < this.maxScrollY) {
					k = this.maxScrollY
				}
			}
			if (i == this.x && k == this.y) {
				return false
			}
			this.scrollTo(i, k, j, this.options.bounceEasing);
			return true
		},
		disable: function() {
			this.enabled = false
		},
		enable: function() {
			this.enabled = true
		},
		refresh: function() {
			var i = this.wrapper.offsetHeight;
			this.wrapperWidth = this.wrapper.clientWidth;
			this.wrapperHeight = this.wrapper.clientHeight;
			this.scrollerWidth = this.scroller.offsetWidth;
			this.scrollerHeight = this.scroller.offsetHeight;
			this.maxScrollX = this.wrapperWidth - this.scrollerWidth;
			this.maxScrollY = this.wrapperHeight - this.scrollerHeight;
			this.hasHorizontalScroll = this.options.scrollX && this.maxScrollX < 0;
			this.hasVerticalScroll = this.options.scrollY && this.maxScrollY < 0;
			if (!this.hasHorizontalScroll) {
				this.maxScrollX = 0;
				this.scrollerWidth = this.wrapperWidth
			}
			if (!this.hasVerticalScroll) {
				this.maxScrollY = 0;
				this.scrollerHeight = this.wrapperHeight
			}
			this.endTime = 0;
			this.directionX = 0;
			this.directionY = 0;
			this.wrapperOffset = c.offset(this.wrapper);
			this._execEvent("refresh");
			this.resetPosition()
		},
		on: function(j, i) {
			if (!this._events[j]) {
				this._events[j] = []
			}
			this._events[j].push(i)
		},
		off: function(k, j) {
			if (!this._events[k]) {
				return
			}
			var i = this._events[k].indexOf(j);
			if (i > -1) {
				this._events[k].splice(i, 1)
			}
		},
		_execEvent: function(m) {
			if (!this._events[m]) {
				return
			}
			var k = 0,
				j = this._events[m].length;
			if (!j) {
				return
			}
			for (; k < j; k++) {
				this._events[m][k].apply(this, [].slice.call(arguments, 1))
			}
		},
		scrollBy: function(i, l, j, k) {
			i = this.x + i;
			l = this.y + l;
			j = j || 0;
			this.scrollTo(i, l, j, k)
		},
		scrollTo: function(i, l, j, k) {
			k = k || c.ease.circular;
			this.isInTransition = this.options.useTransition && j > 0;
			if (!j || (this.options.useTransition && k.style)) {
				this._transitionTimingFunction(k.style);
				this._transitionTime(j);
				this._translate(i, l)
			} else {
				this._animate(i, l, j, k.fn)
			}
		},
		scrollToElement: function(j, k, i, n, m) {
			j = j.nodeType ? j : this.scroller.querySelector(j);
			if (!j) {
				return
			}
			var l = c.offset(j);
			l.left -= this.wrapperOffset.left;
			l.top -= this.wrapperOffset.top;
			if (i === true) {
				i = e.round(j.offsetWidth / 2 - this.wrapper.offsetWidth / 2)
			}
			if (n === true) {
				n = e.round(j.offsetHeight / 2 - this.wrapper.offsetHeight / 2)
			}
			l.left -= i || 0;
			l.top -= n || 0;
			l.left = l.left > 0 ? 0 : l.left < this.maxScrollX ? this.maxScrollX : l.left;
			l.top = l.top > 0 ? 0 : l.top < this.maxScrollY ? this.maxScrollY : l.top;
			k = k === undefined || k === null || k === "auto" ? e.max(e.abs(this.x - l.left), e.abs(this.y - l.top)) : k;
			this.scrollTo(l.left, l.top, k, m)
		},
		_transitionTime: function(k) {
			k = k || 0;
			this.scrollerStyle[c.style.transitionDuration] = k + "ms";
			if (!k && c.isBadAndroid) {
				this.scrollerStyle[c.style.transitionDuration] = "0.001s"
			}
			if (this.indicators) {
				for (var j = this.indicators.length; j--;) {
					this.indicators[j].transitionTime(k)
				}
			}
		},
		_transitionTimingFunction: function(k) {
			this.scrollerStyle[c.style.transitionTimingFunction] = k;
			if (this.indicators) {
				for (var j = this.indicators.length; j--;) {
					this.indicators[j].transitionTimingFunction(k)
				}
			}
		},
		_translate: function(j, l) {
			if (this.options.useTransform) {
				this.scrollerStyle[c.style.transform] = "translate(" + j + "px," + l + "px)" + this.translateZ
			} else {
				j = e.round(j);
				l = e.round(l);
				this.scrollerStyle.left = j + "px";
				this.scrollerStyle.top = l + "px"
			}
			this.x = j;
			this.y = l;
			if (this.indicators) {
				for (var k = this.indicators.length; k--;) {
					this.indicators[k].updatePosition()
				}
			}
		},
		_initEvents: function(i) {
			var j = i ? c.removeEvent : c.addEvent,
				k = this.options.bindToWrapper ? this.wrapper : f;
			j(f, "orientationchange", this);
			j(f, "resize", this);
			if (this.options.click) {
				j(this.wrapper, "click", this, true)
			}
			if (!this.options.disableMouse) {
				j(this.wrapper, "mousedown", this);
				j(k, "mousemove", this);
				j(k, "mousecancel", this);
				j(k, "mouseup", this)
			}
			if (c.hasPointer && !this.options.disablePointer) {
				j(this.wrapper, "MSPointerDown", this);
				j(k, "MSPointerMove", this);
				j(k, "MSPointerCancel", this);
				j(k, "MSPointerUp", this)
			}
			if (c.hasTouch && !this.options.disableTouch) {
				j(this.wrapper, "touchstart", this);
				j(k, "touchmove", this);
				j(k, "touchcancel", this);
				j(k, "touchend", this)
			}
			j(this.scroller, "transitionend", this);
			j(this.scroller, "webkitTransitionEnd", this);
			j(this.scroller, "oTransitionEnd", this);
			j(this.scroller, "MSTransitionEnd", this)
		},
		getComputedPosition: function() {
			var j = f.getComputedStyle(this.scroller, null),
				i, k;
			if (this.options.useTransform) {
				j = j[c.style.transform].split(")")[0].split(", ");
				i = +(j[12] || j[4]);
				k = +(j[13] || j[5])
			} else {
				i = +j.left.replace(/[^-\d.]/g, "");
				k = +j.top.replace(/[^-\d.]/g, "")
			}
			return {
				x: i,
				y: k
			}
		},
		_initIndicators: function() {
			var l = this.options.interactiveScrollbars,
				n = typeof this.options.scrollbars != "string",
				p = [],
				k;
			var o = this;
			this.indicators = [];
			if (this.options.scrollbars) {
				if (this.options.scrollY) {
					k = {
						el: d("v", l, this.options.scrollbars),
						interactive: l,
						defaultScrollbars: true,
						customStyle: n,
						resize: this.options.resizeScrollbars,
						shrink: this.options.shrinkScrollbars,
						fade: this.options.fadeScrollbars,
						listenX: false
					};
					this.wrapper.appendChild(k.el);
					p.push(k)
				}
				if (this.options.scrollX) {
					k = {
						el: d("h", l, this.options.scrollbars),
						interactive: l,
						defaultScrollbars: true,
						customStyle: n,
						resize: this.options.resizeScrollbars,
						shrink: this.options.shrinkScrollbars,
						fade: this.options.fadeScrollbars,
						listenY: false
					};
					this.wrapper.appendChild(k.el);
					p.push(k)
				}
			}
			if (this.options.indicators) {
				p = p.concat(this.options.indicators)
			}
			for (var m = p.length; m--;) {
				this.indicators.push(new b(this, p[m]))
			}
			function j(r) {
				for (var q = o.indicators.length; q--;) {
					r.call(o.indicators[q])
				}
			}
			if (this.options.fadeScrollbars) {
				this.on("scrollEnd", function() {
					j(function() {
						this.fade()
					})
				});
				this.on("scrollCancel", function() {
					j(function() {
						this.fade()
					})
				});
				this.on("scrollStart", function() {
					j(function() {
						this.fade(1)
					})
				});
				this.on("beforeScrollStart", function() {
					j(function() {
						this.fade(1, true)
					})
				})
			}
			this.on("refresh", function() {
				j(function() {
					this.refresh()
				})
			});
			this.on("destroy", function() {
				j(function() {
					this.destroy()
				});
				delete this.indicators
			})
		},
		_initWheel: function() {
			c.addEvent(this.wrapper, "wheel", this);
			c.addEvent(this.wrapper, "mousewheel", this);
			c.addEvent(this.wrapper, "DOMMouseScroll", this);
			this.on("destroy", function() {
				c.removeEvent(this.wrapper, "wheel", this);
				c.removeEvent(this.wrapper, "mousewheel", this);
				c.removeEvent(this.wrapper, "DOMMouseScroll", this)
			})
		},
		_wheel: function(m) {
			if (!this.enabled) {
				return
			}
			m.preventDefault();
			m.stopPropagation();
			var k, j, n, l, i = this;
			if (this.wheelTimeout === undefined) {
				i._execEvent("scrollStart")
			}
			clearTimeout(this.wheelTimeout);
			this.wheelTimeout = setTimeout(function() {
				i._execEvent("scrollEnd");
				i.wheelTimeout = undefined
			}, 400);
			if ("deltaX" in m) {
				k = -m.deltaX;
				j = -m.deltaY
			} else {
				if ("wheelDeltaX" in m) {
					k = m.wheelDeltaX / 120 * this.options.mouseWheelSpeed;
					j = m.wheelDeltaY / 120 * this.options.mouseWheelSpeed
				} else {
					if ("wheelDelta" in m) {
						k = j = m.wheelDelta / 120 * this.options.mouseWheelSpeed
					} else {
						if ("detail" in m) {
							k = j = -m.detail / 3 * this.options.mouseWheelSpeed
						} else {
							return
						}
					}
				}
			}
			k *= this.options.invertWheelDirection;
			j *= this.options.invertWheelDirection;
			if (!this.hasVerticalScroll) {
				k = j;
				j = 0
			}
			if (this.options.snap) {
				n = this.currentPage.pageX;
				l = this.currentPage.pageY;
				if (k > 0) {
					n--
				} else {
					if (k < 0) {
						n++
					}
				}
				if (j > 0) {
					l--
				} else {
					if (j < 0) {
						l++
					}
				}
				this.goToPage(n, l);
				return
			}
			n = this.x + e.round(this.hasHorizontalScroll ? k : 0);
			l = this.y + e.round(this.hasVerticalScroll ? j : 0);
			if (n > 0) {
				n = 0
			} else {
				if (n < this.maxScrollX) {
					n = this.maxScrollX
				}
			}
			if (l > 0) {
				l = 0
			} else {
				if (l < this.maxScrollY) {
					l = this.maxScrollY
				}
			}
			this.scrollTo(n, l, 0)
		},
		_initSnap: function() {
			this.currentPage = {};
			if (typeof this.options.snap == "string") {
				this.options.snap = this.scroller.querySelectorAll(this.options.snap)
			}
			this.on("refresh", function() {
				var s = 0,
					q, o = 0,
					k, r, p, u = 0,
					t, w = this.options.snapStepX || this.wrapperWidth,
					v = this.options.snapStepY || this.wrapperHeight,
					j;
				this.pages = [];
				if (!this.wrapperWidth || !this.wrapperHeight || !this.scrollerWidth || !this.scrollerHeight) {
					return
				}
				if (this.options.snap === true) {
					r = e.round(w / 2);
					p = e.round(v / 2);
					while (u > -this.scrollerWidth) {
						this.pages[s] = [];
						q = 0;
						t = 0;
						while (t > -this.scrollerHeight) {
							this.pages[s][q] = {
								x: e.max(u, this.maxScrollX),
								y: e.max(t, this.maxScrollY),
								width: w,
								height: v,
								cx: u - r,
								cy: t - p
							};
							t -= v;
							q++
						}
						u -= w;
						s++
					}
				} else {
					j = this.options.snap;
					q = j.length;
					k = -1;
					for (; s < q; s++) {
						if (s === 0 || j[s].offsetLeft <= j[s - 1].offsetLeft) {
							o = 0;
							k++
						}
						if (!this.pages[o]) {
							this.pages[o] = []
						}
						u = e.max(-j[s].offsetLeft, this.maxScrollX);
						t = e.max(-j[s].offsetTop, this.maxScrollY);
						r = u - e.round(j[s].offsetWidth / 2);
						p = t - e.round(j[s].offsetHeight / 2);
						this.pages[o][k] = {
							x: u,
							y: t,
							width: j[s].offsetWidth,
							height: j[s].offsetHeight,
							cx: r,
							cy: p
						};
						if (u > this.maxScrollX) {
							o++
						}
					}
				}
				this.goToPage(this.currentPage.pageX || 0, this.currentPage.pageY || 0, 0);
				if (this.options.snapThreshold % 1 === 0) {
					this.snapThresholdX = this.options.snapThreshold;
					this.snapThresholdY = this.options.snapThreshold
				} else {
					this.snapThresholdX = e.round(this.pages[this.currentPage.pageX][this.currentPage.pageY].width * this.options.snapThreshold);
					this.snapThresholdY = e.round(this.pages[this.currentPage.pageX][this.currentPage.pageY].height * this.options.snapThreshold)
				}
			});
			this.on("flick", function() {
				var i = this.options.snapSpeed || e.max(e.max(e.min(e.abs(this.x - this.startX), 1000), e.min(e.abs(this.y - this.startY), 1000)), 300);
				this.goToPage(this.currentPage.pageX + this.directionX, this.currentPage.pageY + this.directionY, i)
			})
		},
		_nearestSnap: function(k, p) {
			if (!this.pages.length) {
				return {
					x: 0,
					y: 0,
					pageX: 0,
					pageY: 0
				}
			}
			var o = 0,
				n = this.pages.length,
				j = 0;
			if (e.abs(k - this.absStartX) < this.snapThresholdX && e.abs(p - this.absStartY) < this.snapThresholdY) {
				return this.currentPage
			}
			if (k > 0) {
				k = 0
			} else {
				if (k < this.maxScrollX) {
					k = this.maxScrollX
				}
			}
			if (p > 0) {
				p = 0
			} else {
				if (p < this.maxScrollY) {
					p = this.maxScrollY
				}
			}
			for (; o < n; o++) {
				if (k >= this.pages[o][0].cx) {
					k = this.pages[o][0].x;
					break
				}
			}
			n = this.pages[o].length;
			for (; j < n; j++) {
				if (p >= this.pages[0][j].cy) {
					p = this.pages[0][j].y;
					break
				}
			}
			if (o == this.currentPage.pageX) {
				o += this.directionX;
				if (o < 0) {
					o = 0
				} else {
					if (o >= this.pages.length) {
						o = this.pages.length - 1
					}
				}
				k = this.pages[o][0].x
			}
			if (j == this.currentPage.pageY) {
				j += this.directionY;
				if (j < 0) {
					j = 0
				} else {
					if (j >= this.pages[0].length) {
						j = this.pages[0].length - 1
					}
				}
				p = this.pages[0][j].y
			}
			return {
				x: k,
				y: p,
				pageX: o,
				pageY: j
			}
		},
		goToPage: function(i, n, j, m) {
			m = m || this.options.bounceEasing;
			if (i >= this.pages.length) {
				i = this.pages.length - 1
			} else {
				if (i < 0) {
					i = 0
				}
			}
			if (n >= this.pages[i].length) {
				n = this.pages[i].length - 1
			} else {
				if (n < 0) {
					n = 0
				}
			}
			var l = this.pages[i][n].x,
				k = this.pages[i][n].y;
			j = j === undefined ? this.options.snapSpeed || e.max(e.max(e.min(e.abs(l - this.x), 1000), e.min(e.abs(k - this.y), 1000)), 300) : j;
			this.currentPage = {
				x: l,
				y: k,
				pageX: i,
				pageY: n
			};
			this.scrollTo(l, k, j, m)
		},
		next: function(j, l) {
			var i = this.currentPage.pageX,
				k = this.currentPage.pageY;
			i++;
			if (i >= this.pages.length && this.hasVerticalScroll) {
				i = 0;
				k++
			}
			this.goToPage(i, k, j, l)
		},
		prev: function(j, l) {
			var i = this.currentPage.pageX,
				k = this.currentPage.pageY;
			i--;
			if (i < 0 && this.hasVerticalScroll) {
				i = 0;
				k--
			}
			this.goToPage(i, k, j, l)
		},
		_initKeys: function(l) {
			var k = {
				pageUp: 33,
				pageDown: 34,
				end: 35,
				home: 36,
				left: 37,
				up: 38,
				right: 39,
				down: 40
			};
			var j;
			if (typeof this.options.keyBindings == "object") {
				for (j in this.options.keyBindings) {
					if (typeof this.options.keyBindings[j] == "string") {
						this.options.keyBindings[j] = this.options.keyBindings[j].toUpperCase().charCodeAt(0)
					}
				}
			} else {
				this.options.keyBindings = {}
			}
			for (j in k) {
				this.options.keyBindings[j] = this.options.keyBindings[j] || k[j]
			}
			c.addEvent(f, "keydown", this);
			this.on("destroy", function() {
				c.removeEvent(f, "keydown", this)
			})
		},
		_key: function(n) {
			if (!this.enabled) {
				return
			}
			var i = this.options.snap,
				o = i ? this.currentPage.pageX : this.x,
				m = i ? this.currentPage.pageY : this.y,
				k = c.getTime(),
				j = this.keyTime || 0,
				l = 0.25,
				p;
			if (this.options.useTransition && this.isInTransition) {
				p = this.getComputedPosition();
				this._translate(e.round(p.x), e.round(p.y));
				this.isInTransition = false
			}
			this.keyAcceleration = k - j < 200 ? e.min(this.keyAcceleration + l, 50) : 0;
			switch (n.keyCode) {
			case this.options.keyBindings.pageUp:
				if (this.hasHorizontalScroll && !this.hasVerticalScroll) {
					o += i ? 1 : this.wrapperWidth
				} else {
					m += i ? 1 : this.wrapperHeight
				}
				break;
			case this.options.keyBindings.pageDown:
				if (this.hasHorizontalScroll && !this.hasVerticalScroll) {
					o -= i ? 1 : this.wrapperWidth
				} else {
					m -= i ? 1 : this.wrapperHeight
				}
				break;
			case this.options.keyBindings.end:
				o = i ? this.pages.length - 1 : this.maxScrollX;
				m = i ? this.pages[0].length - 1 : this.maxScrollY;
				break;
			case this.options.keyBindings.home:
				o = 0;
				m = 0;
				break;
			case this.options.keyBindings.left:
				o += i ? -1 : 5 + this.keyAcceleration >> 0;
				break;
			case this.options.keyBindings.up:
				m += i ? 1 : 5 + this.keyAcceleration >> 0;
				break;
			case this.options.keyBindings.right:
				o -= i ? -1 : 5 + this.keyAcceleration >> 0;
				break;
			case this.options.keyBindings.down:
				m -= i ? 1 : 5 + this.keyAcceleration >> 0;
				break;
			default:
				return
			}
			if (i) {
				this.goToPage(o, m);
				return
			}
			if (o > 0) {
				o = 0;
				this.keyAcceleration = 0
			} else {
				if (o < this.maxScrollX) {
					o = this.maxScrollX;
					this.keyAcceleration = 0
				}
			}
			if (m > 0) {
				m = 0;
				this.keyAcceleration = 0
			} else {
				if (m < this.maxScrollY) {
					m = this.maxScrollY;
					this.keyAcceleration = 0
				}
			}
			this.scrollTo(o, m, 0);
			this.keyTime = k
		},
		_animate: function(r, q, l, i) {
			var o = this,
				n = this.x,
				m = this.y,
				j = c.getTime(),
				p = j + l;

			function k() {
				var s = c.getTime(),
					u, t, v;
				if (s >= p) {
					o.isAnimating = false;
					o._translate(r, q);
					if (!o.resetPosition(o.options.bounceTime)) {
						o._execEvent("scrollEnd")
					}
					return
				}
				s = (s - j) / l;
				v = i(s);
				u = (r - n) * v + n;
				t = (q - m) * v + m;
				o._translate(u, t);
				if (o.isAnimating) {
					h(k)
				}
			}
			this.isAnimating = true;
			k()
		},
		handleEvent: function(i) {
			switch (i.type) {
			case "touchstart":
			case "MSPointerDown":
			case "mousedown":
				this._start(i);
				break;
			case "touchmove":
			case "MSPointerMove":
			case "mousemove":
				this._move(i);
				break;
			case "touchend":
			case "MSPointerUp":
			case "mouseup":
			case "touchcancel":
			case "MSPointerCancel":
			case "mousecancel":
				this._end(i);
				break;
			case "orientationchange":
			case "resize":
				this._resize();
				break;
			case "transitionend":
			case "webkitTransitionEnd":
			case "oTransitionEnd":
			case "MSTransitionEnd":
				this._transitionEnd(i);
				break;
			case "wheel":
			case "DOMMouseScroll":
			case "mousewheel":
				this._wheel(i);
				break;
			case "keydown":
				this._key(i);
				break;
			case "click":
				if (!i._constructed) {
					i.preventDefault();
					i.stopPropagation()
				}
				break
			}
		}
	};

	function d(l, j, k) {
		var m = a.createElement("div"),
			i = a.createElement("div");
		if (k === true) {
			m.style.cssText = "position:absolute;z-index:9999";
			i.style.cssText = "-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;position:absolute;background:rgba(0,0,0,0.5);border:1px solid rgba(255,255,255,0.9);border-radius:3px"
		}
		i.className = "iScrollIndicator";
		if (l == "h") {
			if (k === true) {
				m.style.cssText += ";height:7px;left:2px;right:2px;bottom:0";
				i.style.height = "100%"
			}
			m.className = "iScrollHorizontalScrollbar"
		} else {
			if (k === true) {
				m.style.cssText += ";width:7px;bottom:2px;top:2px;right:1px";
				i.style.width = "100%"
			}
			m.className = "iScrollVerticalScrollbar"
		}
		m.style.cssText += ";overflow:hidden";
		if (!j) {
			m.style.pointerEvents = "none"
		}
		m.appendChild(i);
		return m
	}
	function b(j, k) {
		this.wrapper = typeof k.el == "string" ? a.querySelector(k.el) : k.el;
		this.wrapperStyle = this.wrapper.style;
		this.indicator = this.wrapper.children[0];
		this.indicatorStyle = this.indicator.style;
		this.scroller = j;
		this.options = {
			listenX: true,
			listenY: true,
			interactive: false,
			resize: true,
			defaultScrollbars: false,
			shrink: false,
			fade: false,
			speedRatioX: 0,
			speedRatioY: 0
		};
		for (var l in k) {
			this.options[l] = k[l]
		}
		this.sizeRatioX = 1;
		this.sizeRatioY = 1;
		this.maxPosX = 0;
		this.maxPosY = 0;
		if (this.options.interactive) {
			if (!this.options.disableTouch) {
				c.addEvent(this.indicator, "touchstart", this);
				c.addEvent(f, "touchend", this)
			}
			if (!this.options.disablePointer) {
				c.addEvent(this.indicator, "MSPointerDown", this);
				c.addEvent(f, "MSPointerUp", this)
			}
			if (!this.options.disableMouse) {
				c.addEvent(this.indicator, "mousedown", this);
				c.addEvent(f, "mouseup", this)
			}
		}
		if (this.options.fade) {
			this.wrapperStyle[c.style.transform] = this.scroller.translateZ;
			this.wrapperStyle[c.style.transitionDuration] = c.isBadAndroid ? "0.001s" : "0ms";
			this.wrapperStyle.opacity = "0"
		}
	}
	b.prototype = {
		handleEvent: function(i) {
			switch (i.type) {
			case "touchstart":
			case "MSPointerDown":
			case "mousedown":
				this._start(i);
				break;
			case "touchmove":
			case "MSPointerMove":
			case "mousemove":
				this._move(i);
				break;
			case "touchend":
			case "MSPointerUp":
			case "mouseup":
			case "touchcancel":
			case "MSPointerCancel":
			case "mousecancel":
				this._end(i);
				break
			}
		},
		destroy: function() {
			if (this.options.interactive) {
				c.removeEvent(this.indicator, "touchstart", this);
				c.removeEvent(this.indicator, "MSPointerDown", this);
				c.removeEvent(this.indicator, "mousedown", this);
				c.removeEvent(f, "touchmove", this);
				c.removeEvent(f, "MSPointerMove", this);
				c.removeEvent(f, "mousemove", this);
				c.removeEvent(f, "touchend", this);
				c.removeEvent(f, "MSPointerUp", this);
				c.removeEvent(f, "mouseup", this)
			}
			if (this.options.defaultScrollbars) {
				this.wrapper.parentNode.removeChild(this.wrapper)
			}
		},
		_start: function(j) {
			var i = j.touches ? j.touches[0] : j;
			j.preventDefault();
			j.stopPropagation();
			this.transitionTime();
			this.initiated = true;
			this.moved = false;
			this.lastPointX = i.pageX;
			this.lastPointY = i.pageY;
			this.startTime = c.getTime();
			if (!this.options.disableTouch) {
				c.addEvent(f, "touchmove", this)
			}
			if (!this.options.disablePointer) {
				c.addEvent(f, "MSPointerMove", this)
			}
			if (!this.options.disableMouse) {
				c.addEvent(f, "mousemove", this)
			}
			this.scroller._execEvent("beforeScrollStart")
		},
		_move: function(n) {
			var j = n.touches ? n.touches[0] : n,
				k, i, o, m, l = c.getTime();
			if (!this.moved) {
				this.scroller._execEvent("scrollStart")
			}
			this.moved = true;
			k = j.pageX - this.lastPointX;
			this.lastPointX = j.pageX;
			i = j.pageY - this.lastPointY;
			this.lastPointY = j.pageY;
			o = this.x + k;
			m = this.y + i;
			this._pos(o, m);
			n.preventDefault();
			n.stopPropagation()
		},
		_end: function(k) {
			if (!this.initiated) {
				return
			}
			this.initiated = false;
			k.preventDefault();
			k.stopPropagation();
			c.removeEvent(f, "touchmove", this);
			c.removeEvent(f, "MSPointerMove", this);
			c.removeEvent(f, "mousemove", this);
			if (this.scroller.options.snap) {
				var i = this.scroller._nearestSnap(this.scroller.x, this.scroller.y);
				var j = this.options.snapSpeed || e.max(e.max(e.min(e.abs(this.scroller.x - i.x), 1000), e.min(e.abs(this.scroller.y - i.y), 1000)), 300);
				if (this.scroller.x != i.x || this.scroller.y != i.y) {
					this.scroller.directionX = 0;
					this.scroller.directionY = 0;
					this.scroller.currentPage = i;
					this.scroller.scrollTo(i.x, i.y, j, this.scroller.options.bounceEasing)
				}
			}
			if (this.moved) {
				this.scroller._execEvent("scrollEnd")
			}
		},
		transitionTime: function(i) {
			i = i || 0;
			this.indicatorStyle[c.style.transitionDuration] = i + "ms";
			if (!i && c.isBadAndroid) {
				this.indicatorStyle[c.style.transitionDuration] = "0.001s"
			}
		},
		transitionTimingFunction: function(i) {
			this.indicatorStyle[c.style.transitionTimingFunction] = i
		},
		refresh: function() {
			this.transitionTime();
			if (this.options.listenX && !this.options.listenY) {
				this.indicatorStyle.display = this.scroller.hasHorizontalScroll ? "block" : "none"
			} else {
				if (this.options.listenY && !this.options.listenX) {
					this.indicatorStyle.display = this.scroller.hasVerticalScroll ? "block" : "none"
				} else {
					this.indicatorStyle.display = this.scroller.hasHorizontalScroll || this.scroller.hasVerticalScroll ? "block" : "none"
				}
			}
			if (this.scroller.hasHorizontalScroll && this.scroller.hasVerticalScroll) {
				c.addClass(this.wrapper, "iScrollBothScrollbars");
				c.removeClass(this.wrapper, "iScrollLoneScrollbar");
				if (this.options.defaultScrollbars && this.options.customStyle) {
					if (this.options.listenX) {
						this.wrapper.style.right = "8px"
					} else {
						this.wrapper.style.bottom = "8px"
					}
				}
			} else {
				c.removeClass(this.wrapper, "iScrollBothScrollbars");
				c.addClass(this.wrapper, "iScrollLoneScrollbar");
				if (this.options.defaultScrollbars && this.options.customStyle) {
					if (this.options.listenX) {
						this.wrapper.style.right = "2px"
					} else {
						this.wrapper.style.bottom = "2px"
					}
				}
			}
			var i = this.wrapper.offsetHeight;
			if (this.options.listenX) {
				this.wrapperWidth = this.wrapper.clientWidth;
				if (this.options.resize) {
					this.indicatorWidth = e.max(e.round(this.wrapperWidth * this.wrapperWidth / (this.scroller.scrollerWidth || this.wrapperWidth || 1)), 8);
					this.indicatorStyle.width = this.indicatorWidth + "px"
				} else {
					this.indicatorWidth = this.indicator.clientWidth
				}
				this.maxPosX = this.wrapperWidth - this.indicatorWidth;
				if (this.options.shrink == "clip") {
					this.minBoundaryX = -this.indicatorWidth + 8;
					this.maxBoundaryX = this.wrapperWidth - 8
				} else {
					this.minBoundaryX = 0;
					this.maxBoundaryX = this.maxPosX
				}
				this.sizeRatioX = this.options.speedRatioX || (this.scroller.maxScrollX && (this.maxPosX / this.scroller.maxScrollX))
			}
			if (this.options.listenY) {
				this.wrapperHeight = this.wrapper.clientHeight;
				if (this.options.resize) {
					this.indicatorHeight = e.max(e.round(this.wrapperHeight * this.wrapperHeight / (this.scroller.scrollerHeight || this.wrapperHeight || 1)), 8);
					this.indicatorStyle.height = this.indicatorHeight + "px"
				} else {
					this.indicatorHeight = this.indicator.clientHeight
				}
				this.maxPosY = this.wrapperHeight - this.indicatorHeight;
				if (this.options.shrink == "clip") {
					this.minBoundaryY = -this.indicatorHeight + 8;
					this.maxBoundaryY = this.wrapperHeight - 8
				} else {
					this.minBoundaryY = 0;
					this.maxBoundaryY = this.maxPosY
				}
				this.maxPosY = this.wrapperHeight - this.indicatorHeight;
				this.sizeRatioY = this.options.speedRatioY || (this.scroller.maxScrollY && (this.maxPosY / this.scroller.maxScrollY))
			}
			this.updatePosition()
		},
		updatePosition: function() {
			var i = this.options.listenX && e.round(this.sizeRatioX * this.scroller.x) || 0,
				j = this.options.listenY && e.round(this.sizeRatioY * this.scroller.y) || 0;
			if (!this.options.ignoreBoundaries) {
				if (i < this.minBoundaryX) {
					if (this.options.shrink == "scale") {
						this.width = e.max(this.indicatorWidth + i, 8);
						this.indicatorStyle.width = this.width + "px"
					}
					i = this.minBoundaryX
				} else {
					if (i > this.maxBoundaryX) {
						if (this.options.shrink == "scale") {
							this.width = e.max(this.indicatorWidth - (i - this.maxPosX), 8);
							this.indicatorStyle.width = this.width + "px";
							i = this.maxPosX + this.indicatorWidth - this.width
						} else {
							i = this.maxBoundaryX
						}
					} else {
						if (this.options.shrink == "scale" && this.width != this.indicatorWidth) {
							this.width = this.indicatorWidth;
							this.indicatorStyle.width = this.width + "px"
						}
					}
				}
				if (j < this.minBoundaryY) {
					if (this.options.shrink == "scale") {
						this.height = e.max(this.indicatorHeight + j * 3, 8);
						this.indicatorStyle.height = this.height + "px"
					}
					j = this.minBoundaryY
				} else {
					if (j > this.maxBoundaryY) {
						if (this.options.shrink == "scale") {
							this.height = e.max(this.indicatorHeight - (j - this.maxPosY) * 3, 8);
							this.indicatorStyle.height = this.height + "px";
							j = this.maxPosY + this.indicatorHeight - this.height
						} else {
							j = this.maxBoundaryY
						}
					} else {
						if (this.options.shrink == "scale" && this.height != this.indicatorHeight) {
							this.height = this.indicatorHeight;
							this.indicatorStyle.height = this.height + "px"
						}
					}
				}
			}
			this.x = i;
			this.y = j;
			if (this.scroller.options.useTransform) {
				this.indicatorStyle[c.style.transform] = "translate(" + i + "px," + j + "px)" + this.scroller.translateZ
			} else {
				this.indicatorStyle.left = i + "px";
				this.indicatorStyle.top = j + "px"
			}
		},
		_pos: function(i, j) {
			if (i < 0) {
				i = 0
			} else {
				if (i > this.maxPosX) {
					i = this.maxPosX
				}
			}
			if (j < 0) {
				j = 0
			} else {
				if (j > this.maxPosY) {
					j = this.maxPosY
				}
			}
			i = this.options.listenX ? e.round(i / this.sizeRatioX) : this.scroller.x;
			j = this.options.listenY ? e.round(j / this.sizeRatioY) : this.scroller.y;
			this.scroller.scrollTo(i, j)
		},
		fade: function(l, k) {
			if (k && !this.visible) {
				return
			}
			clearTimeout(this.fadeTimeout);
			this.fadeTimeout = null;
			var j = l ? 250 : 500,
				i = l ? 0 : 300;
			l = l ? "1" : "0";
			this.wrapperStyle[c.style.transitionDuration] = j + "ms";
			this.fadeTimeout = setTimeout((function(m) {
				this.wrapperStyle.opacity = m;
				this.visible = +m
			}).bind(this, l), i)
		}
	};
	g.utils = c;
	if (typeof module != "undefined" && module.exports) {
		module.exports = g
	} else {
		f.IScroll = g
	}
})(window, document, Math);