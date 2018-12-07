System.register(["../../@pfelements/pfelement.js"], function (exports_1, context_1) {
    "use strict";
    var __extends = (this && this.__extends) || (function () {
        var extendStatics = function (d, b) {
            extendStatics = Object.setPrototypeOf ||
                ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
                function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
            return extendStatics(d, b);
        };
        return function (d, b) {
            extendStatics(d, b);
            function __() { this.constructor = d; }
            d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
        };
    })();
    var pfelement_js_1, RHDPSearchResultCount;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (pfelement_js_1_1) {
                pfelement_js_1 = pfelement_js_1_1;
            }
        ],
        execute: function () {
            RHDPSearchResultCount = (function (_super) {
                __extends(RHDPSearchResultCount, _super);
                function RHDPSearchResultCount() {
                    var _this = _super.call(this, 'rhdp-search-result-count') || this;
                    _this.template = function (el) {
                        var tpl = document.createElement("template");
                        tpl.innerHTML = "\n        <style>\n        :host {\n            grid-column: 5 / span 9;\n            font-weight: 600;\n            font-size: 1.2em;\n            display: block;\n        }\n\n        @media only screen and (max-width: 768px) {\n            :host { border-bottom: 1px solid var(--rhd-grey-3; }\n        }\n        </style>\n        " + el.count + " results found for " + el.term.replace('<', '&lt;').replace('>', '&gt;');
                        return tpl;
                    };
                    _this._count = 0;
                    _this._term = '';
                    _this._loading = true;
                    _this._setText = _this._setText.bind(_this);
                    return _this;
                }
                Object.defineProperty(RHDPSearchResultCount.prototype, "count", {
                    get: function () {
                        return this._count;
                    },
                    set: function (val) {
                        if (this._count === val)
                            return;
                        this._count = val;
                        this.setAttribute('count', val.toString());
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(RHDPSearchResultCount.prototype, "term", {
                    get: function () {
                        return this._term;
                    },
                    set: function (val) {
                        val = decodeURI(val).replace('<', '&lt;').replace('>', '&gt;');
                        if (this._term === val)
                            return;
                        this._term = val;
                        this.setAttribute('term', val);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(RHDPSearchResultCount.prototype, "loading", {
                    get: function () {
                        return this._loading;
                    },
                    set: function (val) {
                        if (this._loading === val)
                            return;
                        this._loading = val;
                    },
                    enumerable: true,
                    configurable: true
                });
                RHDPSearchResultCount.prototype.connectedCallback = function () {
                    var _this = this;
                    _super.prototype.render.call(this, this.template(this));
                    top.addEventListener('params-ready', this._setText);
                    top.addEventListener('search-start', function (e) { _this.loading = true; _this._setText(e); });
                    top.addEventListener('search-complete', function (e) { _this.loading = false; _this._setText(e); });
                };
                Object.defineProperty(RHDPSearchResultCount, "observedAttributes", {
                    get: function () {
                        return ['count', 'term'];
                    },
                    enumerable: true,
                    configurable: true
                });
                RHDPSearchResultCount.prototype.attributeChangedCallback = function (name, oldVal, newVal) {
                    this[name] = newVal;
                    _super.prototype.render.call(this, this.template(this));
                };
                RHDPSearchResultCount.prototype._setText = function (e) {
                    if (e.detail) {
                        if (typeof e.detail.invalid === 'undefined') {
                            if (e.detail.term && e.detail.term.length > 0) {
                                this.term = e.detail.term;
                            }
                            else {
                                this.term = '';
                            }
                            if (e.detail.results && e.detail.results.hits && e.detail.results.hits.total) {
                                this.count = e.detail.results.hits.total;
                            }
                            else {
                                this.count = 0;
                            }
                            if (!this.loading) {
                                _super.prototype.render.call(this, this.template(this));
                            }
                        }
                        else {
                            this.term = '';
                            this.count = 0;
                            this.shadowRoot.innerHTML = '';
                        }
                    }
                    else {
                        this.term = '';
                        this.count = 0;
                        this.shadowRoot.innerHTML = '';
                    }
                };
                return RHDPSearchResultCount;
            }(pfelement_js_1.default));
            exports_1("default", RHDPSearchResultCount);
            customElements.define('rhdp-search-result-count', RHDPSearchResultCount);
        }
    };
});
