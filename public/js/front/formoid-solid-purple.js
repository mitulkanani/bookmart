/*!
 * jQuery Validation Plugin 1.12.0pre
 *
 * http://jqueryvalidation.org//
 *
 * Copyright 2013 Jörn Zaefferer
 * Released under the MIT license:
 *   http://www.opensource.org/licenses/mit-license.php
 *//*!
  * jQuery Validation Plugin 1.12.0pre
  *
  * http://jqueryvalidation.org//
  *
  * Copyright 2013 Jörn Zaefferer
  * Released under the MIT license:
  *   http://www.opensource.org/licenses/mit-license.php
  */
(function(a) {
    a.extend(a.fn, {validate: function(b) {
            if (!this.length) {
                if (b && b.debug && window.console) {
                    console.warn("Nothing selected, can't validate, returning nothing.")
                }
                return
            }
            var c = a.data(this[0], "validator");
            if (c) {
                return c
            }
            this.attr("novalidate", "novalidate");
            c = new a.validator(b, this[0]);
            a.data(this[0], "validator", c);
            if (c.settings.onsubmit) {
                this.validateDelegate(":submit", "click", function(d) {
                    if (c.settings.submitHandler) {
                        c.submitButton = d.target
                    }
                    if (a(d.target).hasClass("cancel")) {
                        c.cancelSubmit = true
                    }
                    if (a(d.target).attr("formnovalidate") !== undefined) {
                        c.cancelSubmit = true
                    }
                });
                this.submit(function(d) {
                    if (c.settings.debug) {
                        d.preventDefault()
                    }
                    function e() {
                        var f;
                        if (c.settings.submitHandler) {
                            if (c.submitButton) {
                                f = a("<input type='hidden'/>").attr("name", c.submitButton.name).val(a(c.submitButton).val()).appendTo(c.currentForm)
                            }
                            c.settings.submitHandler.call(c, c.currentForm, d);
                            if (c.submitButton) {
                                f.remove()
                            }
                            return false
                        }
                        return true
                    }
                    if (c.cancelSubmit) {
                        c.cancelSubmit = false;
                        return e()
                    }
                    if (c.form()) {
                        if (c.pendingRequest) {
                            c.formSubmitted = true;
                            return false
                        }
                        return e()
                    } else {
                        c.focusInvalid();
                        return false
                    }
                })
            }
            return c
        }, valid: function() {
            if (a(this[0]).is("form")) {
                return this.validate().form()
            } else {
                var c = true;
                var b = a(this[0].form).validate();
                this.each(function() {
                    c = b.element(this) && c
                });
                return c
            }
        }, removeAttrs: function(d) {
            var b = {}, c = this;
            a.each(d.split(/\s/), function(e, f) {
                b[f] = c.attr(f);
                c.removeAttr(f)
            });
            return b
        }, rules: function(e, b) {
            var g = this[0];
            if (e) {
                var d = a.data(g.form, "validator").settings;
                var i = d.rules;
                var j = a.validator.staticRules(g);
                switch (e) {
                    case"add":
                        a.extend(j, a.validator.normalizeRule(b));
                        delete j.messages;
                        i[g.name] = j;
                        if (b.messages) {
                            d.messages[g.name] = a.extend(d.messages[g.name], b.messages)
                        }
                        break;
                    case"remove":
                        if (!b) {
                            delete i[g.name];
                            return j
                        }
                        var h = {};
                        a.each(b.split(/\s/), function(k, l) {
                            h[l] = j[l];
                            delete j[l];
                            if (l === "required") {
                                a(g).removeAttr("aria-required")
                            }
                        });
                        return h
                }
            }
            var f = a.validator.normalizeRules(a.extend({}, a.validator.classRules(g), a.validator.attributeRules(g), a.validator.dataRules(g), a.validator.staticRules(g)), g);
            if (f.required) {
                var c = f.required;
                delete f.required;
                f = a.extend({required: c}, f);
                a(g).attr("aria-required", "true")
            }
            return f
        }});
    a.extend(a.expr[":"], {blank: function(b) {
            return !a.trim("" + a(b).val())
        }, filled: function(b) {
            return !!a.trim("" + a(b).val())
        }, unchecked: function(b) {
            return !a(b).prop("checked")
        }});
    a.validator = function(b, c) {
        this.settings = a.extend(true, {}, a.validator.defaults, b);
        this.currentForm = c;
        this.init()
    };
    a.validator.format = function(b, c) {
        if (arguments.length === 1) {
            return function() {
                var d = a.makeArray(arguments);
                d.unshift(b);
                return a.validator.format.apply(this, d)
            }
        }
        if (arguments.length > 2 && c.constructor !== Array) {
            c = a.makeArray(arguments).slice(1)
        }
        if (c.constructor !== Array) {
            c = [c]
        }
        a.each(c, function(d, e) {
            b = b.replace(new RegExp("\\{" + d + "\\}", "g"), function() {
                return e
            })
        });
        return b
    };
    a.extend(a.validator, {defaults: {messages: {}, groups: {}, rules: {}, errorClass: "error", validClass: "valid", errorElement: "label", focusInvalid: true, errorContainer: a([]), errorLabelContainer: a([]), onsubmit: true, ignore: ":hidden", ignoreTitle: false, onfocusin: function(b, c) {
                this.lastActive = b;
                if (this.settings.focusCleanup && !this.blockFocusCleanup) {
                    if (this.settings.unhighlight) {
                        this.settings.unhighlight.call(this, b, this.settings.errorClass, this.settings.validClass)
                    }
                    this.addWrapper(this.errorsFor(b)).hide()
                }
            }, onfocusout: function(b, c) {
                if (!this.checkable(b) && (b.name in this.submitted || !this.optional(b))) {
                    this.element(b)
                }
            }, onkeyup: function(b, c) {
                if (c.which === 9 && this.elementValue(b) === "") {
                    return
                } else {
                    if (b.name in this.submitted || b === this.lastElement) {
                        this.element(b)
                    }
                }
            }, onclick: function(b, c) {
                if (b.name in this.submitted) {
                    this.element(b)
                } else {
                    if (b.parentNode.name in this.submitted) {
                        this.element(b.parentNode)
                    }
                }
            }, highlight: function(d, b, c) {
                if (d.type === "radio") {
                    this.findByName(d.name).addClass(b).removeClass(c)
                } else {
                    a(d).addClass(b).removeClass(c)
                }
            }, unhighlight: function(d, b, c) {
                if (d.type === "radio") {
                    this.findByName(d.name).removeClass(b).addClass(c)
                } else {
                    a(d).removeClass(b).addClass(c)
                }
            }}, setDefaults: function(b) {
            a.extend(a.validator.defaults, b)
        }, messages: {required: "This field is required.", remote: "Please fix this field.", email: "Please enter a valid email address.", url: "Please enter a valid URL.", date: "Please enter a valid date.", dateISO: "Please enter a valid date (ISO).", number: "Please enter a valid number.", digits: "Please enter only digits.", creditcard: "Please enter a valid credit card number.", equalTo: "Please enter the same value again.", maxlength: a.validator.format("Please enter no more than {0} characters."), minlength: a.validator.format("Please enter at least {0} characters."), rangelength: a.validator.format("Please enter a value between {0} and {1} characters long."), range: a.validator.format("Please enter a value between {0} and {1}."), max: a.validator.format("Please enter a value less than or equal to {0}."), min: a.validator.format("Please enter a value greater than or equal to {0}.")}, autoCreateRanges: false, prototype: {init: function() {
                this.labelContainer = a(this.settings.errorLabelContainer);
                this.errorContext = this.labelContainer.length && this.labelContainer || a(this.currentForm);
                this.containers = a(this.settings.errorContainer).add(this.settings.errorLabelContainer);
                this.submitted = {};
                this.valueCache = {};
                this.pendingRequest = 0;
                this.pending = {};
                this.invalid = {};
                this.reset();
                var b = (this.groups = {});
                a.each(this.settings.groups, function(e, f) {
                    if (typeof f === "string") {
                        f = f.split(/\s/)
                    }
                    a.each(f, function(h, g) {
                        b[g] = e
                    })
                });
                var d = this.settings.rules;
                a.each(d, function(e, f) {
                    d[e] = a.validator.normalizeRule(f)
                });
                function c(g) {
                    var f = a.data(this[0].form, "validator"), e = "on" + g.type.replace(/^validate/, "");
                    if (f.settings[e]) {
                        f.settings[e].call(f, this[0], g)
                    }
                }
                a(this.currentForm).validateDelegate(":text, [type='password'], [type='file'], select, textarea, [type='number'], [type='search'] ,[type='tel'], [type='url'], [type='email'], [type='datetime'], [type='date'], [type='month'], [type='week'], [type='time'], [type='datetime-local'], [type='range'], [type='color'] ", "focusin focusout keyup", c).validateDelegate("[type='radio'], [type='checkbox'], select, option", "click", c);
                if (this.settings.invalidHandler) {
                    a(this.currentForm).bind("invalid-form.validate", this.settings.invalidHandler)
                }
                a(this.currentForm).find("[required], [data-rule-required], .required").attr("aria-required", "true")
            }, form: function() {
                this.checkForm();
                a.extend(this.submitted, this.errorMap);
                this.invalid = a.extend({}, this.errorMap);
                if (!this.valid()) {
                    a(this.currentForm).triggerHandler("invalid-form", [this])
                }
                this.showErrors();
                return this.valid()
            }, checkForm: function() {
                this.prepareForm();
                for (var b = 0, c = (this.currentElements = this.elements()); c[b]; b++) {
                    this.check(c[b])
                }
                return this.valid()
            }, element: function(c) {
                c = this.validationTargetFor(this.clean(c));
                this.lastElement = c;
                this.prepareElement(c);
                this.currentElements = a(c);
                var b = this.check(c) !== false;
                if (b) {
                    delete this.invalid[c.name]
                } else {
                    this.invalid[c.name] = true
                }
                a(c).attr("aria-invalid", !b);
                if (!this.numberOfInvalids()) {
                    this.toHide = this.toHide.add(this.containers)
                }
                this.showErrors();
                return b
            }, showErrors: function(c) {
                if (c) {
                    a.extend(this.errorMap, c);
                    this.errorList = [];
                    for (var b in c) {
                        this.errorList.push({message: c[b], element: this.findByName(b)[0]})
                    }
                    this.successList = a.grep(this.successList, function(d) {
                        return !(d.name in c)
                    })
                }
                if (this.settings.showErrors) {
                    this.settings.showErrors.call(this, this.errorMap, this.errorList)
                } else {
                    this.defaultShowErrors()
                }
            }, resetForm: function() {
                if (a.fn.resetForm) {
                    a(this.currentForm).resetForm()
                }
                this.submitted = {};
                this.lastElement = null;
                this.prepareForm();
                this.hideErrors();
                this.elements().removeClass(this.settings.errorClass).removeData("previousValue").removeAttr("aria-invalid")
            }, numberOfInvalids: function() {
                return this.objectLength(this.invalid)
            }, objectLength: function(d) {
                var c = 0;
                for (var b in d) {
                    c++
                }
                return c
            }, hideErrors: function() {
                this.addWrapper(this.toHide).hide()
            }, valid: function() {
                return this.size() === 0
            }, size: function() {
                return this.errorList.length
            }, focusInvalid: function() {
                if (this.settings.focusInvalid) {
                    try {
                        a(this.findLastActive() || this.errorList.length && this.errorList[0].element || []).filter(":visible").focus().trigger("focusin")
                    } catch (b) {
                    }
                }
            }, findLastActive: function() {
                var b = this.lastActive;
                return b && a.grep(this.errorList, function(c) {
                    return c.element.name === b.name
                }).length === 1 && b
            }, elements: function() {
                var c = this, b = {};
                return a(this.currentForm).find("input, select, textarea").not(":submit, :reset, :image, [disabled]").not(this.settings.ignore).filter(function() {
                    if (!this.name && c.settings.debug && window.console) {
                        console.error("%o has no name assigned", this)
                    }
                    if (this.name in b || !c.objectLength(a(this).rules())) {
                        return false
                    }
                    b[this.name] = true;
                    return true
                })
            }, clean: function(b) {
                return a(b)[0]
            }, errors: function() {
                var b = this.settings.errorClass.replace(" ", ".");
                return a(this.settings.errorElement + "." + b, this.errorContext)
            }, reset: function() {
                this.successList = [];
                this.errorList = [];
                this.errorMap = {};
                this.toShow = a([]);
                this.toHide = a([]);
                this.currentElements = a([])
            }, prepareForm: function() {
                this.reset();
                this.toHide = this.errors().add(this.containers)
            }, prepareElement: function(b) {
                this.reset();
                this.toHide = this.errorsFor(b)
            }, elementValue: function(b) {
                var c = a(b).attr("type"), d = a(b).val();
                if (c === "radio" || c === "checkbox") {
                    return a("input[name='" + a(b).attr("name") + "']:checked").val()
                }
                if (typeof d === "string") {
                    return d.replace(/\r/g, "")
                }
                return d
            }, check: function(c) {
                c = this.validationTargetFor(this.clean(c));
                var i = a(c).rules();
                var d = false;
                var h = this.elementValue(c);
                var b;
                for (var j in i) {
                    var g = {method: j, parameters: i[j]};
                    try {
                        b = a.validator.methods[j].call(this, h, c, g.parameters);
                        if (b === "dependency-mismatch") {
                            d = true;
                            continue
                        }
                        d = false;
                        if (b === "pending") {
                            this.toHide = this.toHide.not(this.errorsFor(c));
                            return
                        }
                        if (!b) {
                            this.formatAndAdd(c, g);
                            return false
                        }
                    } catch (f) {
                        if (this.settings.debug && window.console) {
                            console.log("Exception occurred when checking element " + c.id + ", check the '" + g.method + "' method.", f)
                        }
                        throw f
                    }
                }
                if (d) {
                    return
                }
                if (this.objectLength(i)) {
                    this.successList.push(c)
                }
                return true
            }, customDataMessage: function(b, c) {
                return a(b).data("msg-" + c.toLowerCase()) || (b.attributes && a(b).attr("data-msg-" + c.toLowerCase()))
            }, customMessage: function(c, d) {
                var b = this.settings.messages[c];
                return b && (b.constructor === String ? b : b[d])
            }, findDefined: function() {
                for (var b = 0; b < arguments.length; b++) {
                    if (arguments[b] !== undefined) {
                        return arguments[b]
                    }
                }
                return undefined
            }, defaultMessage: function(b, c) {
                return this.findDefined(this.customMessage(b.name, c), this.customDataMessage(b, c), !this.settings.ignoreTitle && b.title || undefined, a.validator.messages[c], "<strong>Warning: No message defined for " + b.name + "</strong>")
            }, formatAndAdd: function(c, e) {
                var d = this.defaultMessage(c, e.method), b = /\$?\{(\d+)\}/g;
                if (typeof d === "function") {
                    d = d.call(this, e.parameters, c)
                } else {
                    if (b.test(d)) {
                        d = a.validator.format(d.replace(b, "{$1}"), e.parameters)
                    }
                }
                this.errorList.push({message: d, element: c});
                this.errorMap[c.name] = d;
                this.submitted[c.name] = d
            }, addWrapper: function(b) {
                if (this.settings.wrapper) {
                    b = b.add(b.parent(this.settings.wrapper))
                }
                return b
            }, defaultShowErrors: function() {
                var c, d;
                for (c = 0; this.errorList[c]; c++) {
                    var b = this.errorList[c];
                    if (this.settings.highlight) {
                        this.settings.highlight.call(this, b.element, this.settings.errorClass, this.settings.validClass)
                    }
                    this.showLabel(b.element, b.message)
                }
                if (this.errorList.length) {
                    this.toShow = this.toShow.add(this.containers)
                }
                if (this.settings.success) {
                    for (c = 0; this.successList[c]; c++) {
                        this.showLabel(this.successList[c])
                    }
                }
                if (this.settings.unhighlight) {
                    for (c = 0, d = this.validElements(); d[c]; c++) {
                        this.settings.unhighlight.call(this, d[c], this.settings.errorClass, this.settings.validClass)
                    }
                }
                this.toHide = this.toHide.not(this.toShow);
                this.hideErrors();
                this.addWrapper(this.toShow).show()
            }, validElements: function() {
                return this.currentElements.not(this.invalidElements())
            }, invalidElements: function() {
                return a(this.errorList).map(function() {
                    return this.element
                })
            }, showLabel: function(c, d) {
                var b = this.errorsFor(c);
                if (b.length) {
                    b.removeClass(this.settings.validClass).addClass(this.settings.errorClass);
                    b.html(d)
                } else {
                    b = a("<" + this.settings.errorElement + ">").attr("for", this.idOrName(c)).addClass(this.settings.errorClass).html(d || "");
                    if (this.settings.wrapper) {
                        b = b.hide().show().wrap("<" + this.settings.wrapper + "/>").parent()
                    }
                    if (!this.labelContainer.append(b).length) {
                        if (this.settings.errorPlacement) {
                            this.settings.errorPlacement(b, a(c))
                        } else {
                            b.insertAfter(c)
                        }
                    }
                }
                if (!d && this.settings.success) {
                    b.text("");
                    if (typeof this.settings.success === "string") {
                        b.addClass(this.settings.success)
                    } else {
                        this.settings.success(b, c)
                    }
                }
                this.toShow = this.toShow.add(b)
            }, errorsFor: function(c) {
                var b = this.idOrName(c);
                return this.errors().filter(function() {
                    return a(this).attr("for") === b
                })
            }, idOrName: function(b) {
                return this.groups[b.name] || (this.checkable(b) ? b.name : b.id || b.name)
            }, validationTargetFor: function(b) {
                if (this.checkable(b)) {
                    b = this.findByName(b.name).not(this.settings.ignore)[0]
                }
                return b
            }, checkable: function(b) {
                return(/radio|checkbox/i).test(b.type)
            }, findByName: function(b) {
                return a(this.currentForm).find("[name='" + b + "']")
            }, getLength: function(c, b) {
                switch (b.nodeName.toLowerCase()) {
                    case"select":
                        return a("option:selected", b).length;
                    case"input":
                        if (this.checkable(b)) {
                            return this.findByName(b.name).filter(":checked").length
                        }
                }
                return c.length
            }, depend: function(c, b) {
                return this.dependTypes[typeof c] ? this.dependTypes[typeof c](c, b) : true
            }, dependTypes: {"boolean": function(c, b) {
                    return c
                }, string: function(c, b) {
                    return !!a(c, b.form).length
                }, "function": function(c, b) {
                    return c(b)
                }}, optional: function(b) {
                var c = this.elementValue(b);
                return !a.validator.methods.required.call(this, c, b) && "dependency-mismatch"
            }, startRequest: function(b) {
                if (!this.pending[b.name]) {
                    this.pendingRequest++;
                    this.pending[b.name] = true
                }
            }, stopRequest: function(b, c) {
                this.pendingRequest--;
                if (this.pendingRequest < 0) {
                    this.pendingRequest = 0
                }
                delete this.pending[b.name];
                if (c && this.pendingRequest === 0 && this.formSubmitted && this.form()) {
                    a(this.currentForm).submit();
                    this.formSubmitted = false
                } else {
                    if (!c && this.pendingRequest === 0 && this.formSubmitted) {
                        a(this.currentForm).triggerHandler("invalid-form", [this]);
                        this.formSubmitted = false
                    }
                }
            }, previousValue: function(b) {
                return a.data(b, "previousValue") || a.data(b, "previousValue", {old: null, valid: true, message: this.defaultMessage(b, "remote")})
            }}, classRuleSettings: {required: {required: true}, email: {email: true}, url: {url: true}, date: {date: true}, dateISO: {dateISO: true}, number: {number: true}, digits: {digits: true}, creditcard: {creditcard: true}}, addClassRules: function(b, c) {
            if (b.constructor === String) {
                this.classRuleSettings[b] = c
            } else {
                a.extend(this.classRuleSettings, b)
            }
        }, classRules: function(c) {
            var d = {};
            var b = a(c).attr("class");
            if (b) {
                a.each(b.split(" "), function() {
                    if (this in a.validator.classRuleSettings) {
                        a.extend(d, a.validator.classRuleSettings[this])
                    }
                })
            }
            return d
        }, attributeRules: function(c) {
            var f = {};
            var b = a(c);
            var d = b[0].getAttribute("type");
            for (var g in a.validator.methods) {
                var e;
                if (g === "required") {
                    e = b.get(0).getAttribute(g);
                    if (e === "") {
                        e = true
                    }
                    e = !!e
                } else {
                    e = b.attr(g)
                }
                if (/min|max/.test(g) && (d === null || /number|range|text/.test(d))) {
                    e = Number(e)
                }
                if (e) {
                    f[g] = e
                } else {
                    if (d === g && d !== "range") {
                        f[g] = true
                    }
                }
            }
            if (f.maxlength && /-1|2147483647|524288/.test(f.maxlength)) {
                delete f.maxlength
            }
            return f
        }, dataRules: function(c) {
            var f, d, e = {}, b = a(c);
            for (f in a.validator.methods) {
                d = b.data("rule-" + f.toLowerCase());
                if (d !== undefined) {
                    e[f] = d
                }
            }
            return e
        }, staticRules: function(c) {
            var d = {};
            var b = a.data(c.form, "validator");
            if (b.settings.rules) {
                d = a.validator.normalizeRule(b.settings.rules[c.name]) || {}
            }
            return d
        }, normalizeRules: function(c, b) {
            a.each(c, function(f, e) {
                if (e === false) {
                    delete c[f];
                    return
                }
                if (e.param || e.depends) {
                    var d = true;
                    switch (typeof e.depends) {
                        case"string":
                            d = !!a(e.depends, b.form).length;
                            break;
                        case"function":
                            d = e.depends.call(b, b);
                            break
                    }
                    if (d) {
                        c[f] = e.param !== undefined ? e.param : true
                    } else {
                        delete c[f]
                    }
                }
            });
            a.each(c, function(d, e) {
                c[d] = a.isFunction(e) ? e(b) : e
            });
            a.each(["minlength", "maxlength"], function() {
                if (c[this]) {
                    c[this] = Number(c[this])
                }
            });
            a.each(["rangelength", "range"], function() {
                var d;
                if (c[this]) {
                    if (a.isArray(c[this])) {
                        c[this] = [Number(c[this][0]), Number(c[this][1])]
                    } else {
                        if (typeof c[this] === "string") {
                            d = c[this].split(/[\s,]+/);
                            c[this] = [Number(d[0]), Number(d[1])]
                        }
                    }
                }
            });
            if (a.validator.autoCreateRanges) {
                if (c.min && c.max) {
                    c.range = [c.min, c.max];
                    delete c.min;
                    delete c.max
                }
                if (c.minlength && c.maxlength) {
                    c.rangelength = [c.minlength, c.maxlength];
                    delete c.minlength;
                    delete c.maxlength
                }
            }
            return c
        }, normalizeRule: function(c) {
            if (typeof c === "string") {
                var b = {};
                a.each(c.split(/\s/), function() {
                    b[this] = true
                });
                c = b
            }
            return c
        }, addMethod: function(b, d, c) {
            a.validator.methods[b] = d;
            a.validator.messages[b] = c !== undefined ? c : a.validator.messages[b];
            if (d.length < 3) {
                a.validator.addClassRules(b, a.validator.normalizeRule(b))
            }
        }, methods: {required: function(c, b, e) {
                if (!this.depend(e, b)) {
                    return"dependency-mismatch"
                }
                if (b.nodeName.toLowerCase() === "select") {
                    var d = a(b).val();
                    return d && d.length > 0
                }
                if (this.checkable(b)) {
                    return this.getLength(c, b) > 0
                }
                return a.trim(c).length > 0
            }, email: function(c, b) {
                return this.optional(b) || /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/i.test(c)
            }, url: function(c, b) {
                return this.optional(b) || /^(https?|s?ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i.test(c)
            }, date: function(c, b) {
                return this.optional(b) || !/Invalid|NaN/.test(new Date(c).toString())
            }, dateISO: function(c, b) {
                return this.optional(b) || /^\d{4}[\/\-]\d{1,2}[\/\-]\d{1,2}$/.test(c)
            }, number: function(c, b) {
                return this.optional(b) || /^-?(?:\d+|\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/.test(c)
            }, digits: function(c, b) {
                return this.optional(b) || /^\d+$/.test(c)
            }, creditcard: function(f, c) {
                if (this.optional(c)) {
                    return"dependency-mismatch"
                }
                if (/[^0-9 \-]+/.test(f)) {
                    return false
                }
                var g = 0, e = 0, b = false;
                f = f.replace(/\D/g, "");
                if (f.length < 13 || f.length > 19) {
                    return false
                }
                for (var h = f.length - 1; h >= 0; h--) {
                    var d = f.charAt(h);
                    e = parseInt(d, 10);
                    if (b) {
                        if ((e *= 2) > 9) {
                            e -= 9
                        }
                    }
                    g += e;
                    b = !b
                }
                return(g % 10) === 0
            }, minlength: function(d, b, e) {
                var c = a.isArray(d) ? d.length : this.getLength(a.trim(d), b);
                return this.optional(b) || c >= e
            }, maxlength: function(d, b, e) {
                var c = a.isArray(d) ? d.length : this.getLength(a.trim(d), b);
                return this.optional(b) || c <= e
            }, rangelength: function(d, b, e) {
                var c = a.isArray(d) ? d.length : this.getLength(a.trim(d), b);
                return this.optional(b) || (c >= e[0] && c <= e[1])
            }, min: function(c, b, d) {
                return this.optional(b) || c >= d
            }, max: function(c, b, d) {
                return this.optional(b) || c <= d
            }, range: function(c, b, d) {
                return this.optional(b) || (c >= d[0] && c <= d[1])
            }, equalTo: function(c, b, e) {
                var d = a(e);
                if (this.settings.onfocusout) {
                    d.unbind(".validate-equalTo").bind("blur.validate-equalTo", function() {
                        a(b).valid()
                    })
                }
                return c === d.val()
            }, remote: function(f, c, g) {
                if (this.optional(c)) {
                    return"dependency-mismatch"
                }
                var d = this.previousValue(c);
                if (!this.settings.messages[c.name]) {
                    this.settings.messages[c.name] = {}
                }
                d.originalMessage = this.settings.messages[c.name].remote;
                this.settings.messages[c.name].remote = d.message;
                g = typeof g === "string" && {url: g} || g;
                if (d.old === f) {
                    return d.valid
                }
                d.old = f;
                var b = this;
                this.startRequest(c);
                var e = {};
                e[c.name] = f;
                a.ajax(a.extend(true, {url: g, mode: "abort", port: "validate" + c.name, dataType: "json", data: e, success: function(i) {
                        b.settings.messages[c.name].remote = d.originalMessage;
                        var k = i === true || i === "true";
                        if (k) {
                            var h = b.formSubmitted;
                            b.prepareElement(c);
                            b.formSubmitted = h;
                            b.successList.push(c);
                            delete b.invalid[c.name];
                            b.showErrors()
                        } else {
                            var l = {};
                            var j = i || b.defaultMessage(c, "remote");
                            l[c.name] = d.message = a.isFunction(j) ? j(f) : j;
                            b.invalid[c.name] = true;
                            b.showErrors(l)
                        }
                        d.valid = k;
                        b.stopRequest(c, k)
                    }}, g));
                return"pending"
            }}});
    a.format = a.validator.format
}(jQuery));
(function(c) {
    var a = {};
    if (c.ajaxPrefilter) {
        c.ajaxPrefilter(function(f, e, g) {
            var d = f.port;
            if (f.mode === "abort") {
                if (a[d]) {
                    a[d].abort()
                }
                a[d] = g
            }
        })
    } else {
        var b = c.ajax;
        c.ajax = function(e) {
            var f = ("mode" in e ? e : c.ajaxSettings).mode, d = ("port" in e ? e : c.ajaxSettings).port;
            if (f === "abort") {
                if (a[d]) {
                    a[d].abort()
                }
                a[d] = b.apply(this, arguments);
                return a[d]
            }
            return b.apply(this, arguments)
        }
    }
}(jQuery));
(function(a) {
    a.extend(a.fn, {validateDelegate: function(d, c, b) {
            return this.bind(c, function(e) {
                var f = a(e.target);
                if (f.is(d)) {
                    return b.apply(f, arguments)
                }
            })
        }})
}(jQuery));/**
 * Bootstrap.js by @fat & @mdo
 * plugins: bootstrap-transition.js, bootstrap-modal.js, bootstrap-dropdown.js, bootstrap-scrollspy.js, bootstrap-tab.js, bootstrap-tooltip.js, bootstrap-popover.js, bootstrap-affix.js, bootstrap-alert.js, bootstrap-button.js, bootstrap-collapse.js, bootstrap-carousel.js, bootstrap-typeahead.js
 * Copyright 2012 Twitter, Inc.
 * http://www.apache.org/licenses/LICENSE-2.0.txt
 *
 * bootstrap-select
 * http://silviomoreto.github.io/bootstrap-select/
 *
 * Copyright 2013 bootstrap-select
 * Licensed under the MIT license
 */
!function($) {
    var Selectpicker = function(element, options, e) {
        if (e) {
            e.stopPropagation();
            e.preventDefault();
        }
        this.$element = $(element);
        this.$newElement = null;
        this.button = null;

        //Merge defaults, options and data-attributes to make our options
        this.options = $.extend({}, $.fn.selectpicker.defaults, this.$element.data(), typeof options == 'object' && options);

        //If we have no title yet, check the attribute 'title' (this is missed by jq as its not a data-attribute
        if (this.options.title == null)
            this.options.title = this.$element.attr('title');

        //Expose public methods
        this.val = Selectpicker.prototype.val;
        this.render = Selectpicker.prototype.render;
        this.init();
    };

    Selectpicker.prototype = {
        constructor: Selectpicker,
        init: function(e) {
            var _this = this;
            this.$element.hide();
            this.multiple = this.$element.prop('multiple');


            var classList = this.$element.attr('class') !== undefined ? this.$element.attr('class').split(/\s+/) : '';
            var id = this.$element.attr('id');
            this.$element.after(this.createView());
            this.$newElement = this.$element.next('.select');
            var select = this.$newElement;
            var menu = this.$newElement.find('.dropdown-menu');
            var menuArrow = this.$newElement.find('.dropdown-arrow');
            var menuA = menu.find('li > a');
            var liHeight = select.addClass('open').find('.dropdown-menu li > a').outerHeight();
            select.removeClass('open');
            var divHeight = menu.find('li .divider').outerHeight(true);
            var selectOffset_top = this.$newElement.offset().top;
            var size = 0;
            var menuHeight = 0;
            var selectHeight = this.$newElement.outerHeight();
            this.button = this.$newElement.find('> button');
            if (id !== undefined) {
                this.button.attr('id', id);
                $('label[for="' + id + '"]').click(function() {
                    select.find('button#' + id).focus();
                })
            }
            for (var i = 0; i < classList.length; i++) {
                if (classList[i] != 'selectpicker') {
                    this.$newElement.addClass(classList[i]);
                }
            }
            //If we are multiple, then add the show-tick class by default
            if (this.multiple) {
                this.$newElement.addClass('select-multiple');
            }
            this.button.addClass(this.options.style);
            menu.addClass(this.options.menuStyle);
            menuArrow.addClass(function() {
                if (_this.options.menuStyle) {
                    return _this.options.menuStyle.replace('dropdown-', 'dropdown-arrow-');
                }
            });
            this.checkDisabled();
            this.checkTabIndex();
            this.clickListener();
            var menuPadding = parseInt(menu.css('padding-top')) + parseInt(menu.css('padding-bottom')) + parseInt(menu.css('border-top-width')) + parseInt(menu.css('border-bottom-width'));
            if (this.options.size == 'auto') {
                function getSize() {
                    var selectOffset_top_scroll = selectOffset_top - $(window).scrollTop();
                    var windowHeight = window.innerHeight;
                    var menuExtras = menuPadding + parseInt(menu.css('margin-top')) + parseInt(menu.css('margin-bottom')) + 2;
                    var selectOffset_bot = windowHeight - selectOffset_top_scroll - selectHeight - menuExtras;
                    menuHeight = selectOffset_bot;
                    if (select.hasClass('dropup')) {
                        menuHeight = selectOffset_top_scroll - menuExtras;
                    }
                    menu.css({'max-height': (menuHeight - 40) + 'px', 'overflow-y': 'auto', 'min-height': liHeight * 3 + 'px'});
                }
                getSize();
                $(window).resize(getSize);
                $(window).scroll(getSize);
                this.$element.bind('DOMNodeInserted', getSize);
            } else if (this.options.size && this.options.size != 'auto' && menu.find('li').length > this.options.size) {
                var optIndex = menu.find("li > *").filter(':not(.divider)').slice(0, this.options.size).last().parent().index();
                var divLength = menu.find("li").slice(0, optIndex + 1).find('.divider').length;
                menuHeight = liHeight * this.options.size + divLength * divHeight + menuPadding;
                menu.css({'max-height': (menuHeight - 40) + 'px', 'overflow-y': 'scroll'});
            }

            //Listen for updates to the DOM and re render...
            this.$element.bind('DOMNodeInserted', $.proxy(this.reloadLi, this));

            this.render();
        },
        createDropdown: function() {
            var drop =
                    "<div class='btn-group select'>" +
                    "<i class='dropdown-arrow'></i>" +
                    "<button class='btn dropdown-toggle clearfix' data-toggle='dropdown'>" +
                    "<span class='filter-option pull-left'></span>&nbsp;" +
                    "</button>" +
                    "<ul class='dropdown-menu' role='menu'>" +
                    "</ul>" +
                    "</div>";

            return $(drop);
        },
        createView: function() {
            var $drop = this.createDropdown();
            var $li = this.createLi();
            $drop.find('ul').append($li);
            return $drop;
        },
        reloadLi: function() {
            //Remove all children.
            this.destroyLi();
            //Re build
            $li = this.createLi();
            this.$newElement.find('ul').append($li);
            //render view
            this.render();
        },
        destroyLi: function() {
            this.$newElement.find('li').remove();
        },
        createLi: function() {

            var _this = this;
            var _li = [];
            var _liA = [];
            var _liHtml = '';

            this.$element.find('option').each(function() {
                _li.push($(this).text());
            });

            this.$element.find('option').each(function(index) {
                //Get the class and text for the option
                var optionClass = $(this).attr("class") !== undefined ? $(this).attr("class") : '';
                var text = $(this).text();
                var subtext = $(this).data('subtext') !== undefined ? '<small class="muted">' + $(this).data('subtext') + '</small>' : '';

                //Append any subtext to the main text.
                text += subtext;

                if ($(this).parent().is('optgroup') && $(this).data('divider') != true) {
                    if ($(this).index() == 0) {
                        //Get the opt group label
                        var label = $(this).parent().attr('label');
                        var labelSubtext = $(this).parent().data('subtext') !== undefined ? '<small class="muted">' + $(this).parent().data('subtext') + '</small>' : '';
                        label += labelSubtext;

                        if ($(this)[0].index != 0) {
                            _liA.push(
                                    '<div class="divider"></div>' +
                                    '<dt>' + label + '</dt>' +
                                    _this.createA(text, "opt " + optionClass)
                                    );
                        } else {
                            _liA.push(
                                    '<dt>' + label + '</dt>' +
                                    _this.createA(text, "opt " + optionClass));
                        }
                    } else {
                        _liA.push(_this.createA(text, "opt " + optionClass));
                    }
                } else if ($(this).data('divider') == true) {
                    _liA.push('<div class="divider"></div>');
                } else {
                    _liA.push(_this.createA(text, optionClass));
                }
            });

            if (_li.length > 0) {
                for (var i = 0; i < _li.length; i++) {
                    var $option = this.$element.find('option').eq(i);
                    _liHtml += "<li rel=" + i + ">" + _liA[i] + "</li>";
                }
            }

            //If we dont have a selected item, and we dont have a title, select the first element so something is set in the button
            /*
             if(this.$element.find('option:selected').length==0 && !_this.options.title) {
             this.$element.find('option').eq(0).prop('selected', true).attr('selected', 'selected');
             }
             */

            return $(_liHtml);
        },
        createA: function(test, classes) {
            return '<a tabindex="-1" href="#" class="' + classes + '">' +
                    '<span class="pull-left">' + test + '</span>' +
                    '</a>';

        },
        render: function() {
            var _this = this;

            //Set width of select
            if (this.options.width == 'auto') {
                var ulWidth = this.$newElement.find('.dropdown-menu').css('width');
                this.$newElement.css('width', ulWidth);
            } else if (this.options.width && this.options.width != 'auto') {
                this.$newElement.css('width', this.options.width);
            }

            //Update the LI to match the SELECT
            this.$element.find('option').each(function(index) {
                _this.setDisabled(index, $(this).is(':disabled') || $(this).parent().is(':disabled'));
                _this.setSelected(index, $(this).is(':selected'));
            });



            var selectedItems = this.$element.find('option:selected').map(function(index, value) {
                if ($(this).attr('title') != undefined) {
                    return $(this).attr('title');
                } else {
                    return $(this).text();
                }
            }).toArray();

            //Convert all the values into a comma delimited string
            var title = selectedItems.join(", ");

            //If this is multi select, and the selectText type is count, the show 1 of 2 selected etc..
            if (_this.multiple && _this.options.selectedTextFormat.indexOf('count') > -1) {
                var max = _this.options.selectedTextFormat.split(">");
                if ((max.length > 1 && selectedItems.length > max[1]) || (max.length == 1 && selectedItems.length >= 2)) {
                    title = selectedItems.length + ' of ' + this.$element.find('option').length + ' selected';
                }
            }

            //If we dont have a title, then use the default, or if nothing is set at all, use the not selected text
            if (!title) {
                title = _this.options.title != undefined ? _this.options.title : this.$element.attr('data-no-selected');
            }

            this.$element.next('.select').find('.filter-option').html(title);
        },
        setSelected: function(index, selected) {
            if (selected) {
                this.$newElement.find('li').eq(index).addClass('selected');
            } else {
                this.$newElement.find('li').eq(index).removeClass('selected');
            }
        },
        setDisabled: function(index, disabled) {
            if (disabled) {
                this.$newElement.find('li').eq(index).addClass('disabled');
            } else {
                this.$newElement.find('li').eq(index).removeClass('disabled');
            }
        },
        checkDisabled: function() {
            if (this.$element.is(':disabled')) {
                this.button.addClass('disabled');
                this.button.click(function(e) {
                    e.preventDefault();
                });
            }
        },
        checkTabIndex: function() {
            if (this.$element.is('[tabindex]')) {
                var tabindex = this.$element.attr("tabindex");
                this.button.attr('tabindex', tabindex);
            }
        },
        clickListener: function() {
            var _this = this;

            $('body').on('touchstart.dropdown', '.dropdown-menu', function(e) {
                e.stopPropagation();
            });



            this.$newElement.on('click', 'li a', function(e) {
                var clickedIndex = $(this).parent().index(),
                        $this = $(this).parent(),
                        $select = $this.parents('.select');


                //Dont close on multi choice menu
                if (_this.multiple) {
                    e.stopPropagation();
                }

                e.preventDefault();

                //Dont run if we have been disabled
                if ($select.prev('select').not(':disabled') && !$(this).parent().hasClass('disabled')) {
                    //Deselect all others if not multi select box
                    if (!_this.multiple) {
                        $select.prev('select').find('option').removeAttr('selected');
                        $select.prev('select').find('option').eq(clickedIndex).prop('selected', true).attr('selected', 'selected');
                    }
                    //Else toggle the one we have chosen if we are multi selet.
                    else {
                        var selected = $select.prev('select').find('option').eq(clickedIndex).prop('selected');

                        if (selected) {
                            $select.prev('select').find('option').eq(clickedIndex).removeAttr('selected');
                        } else {
                            $select.prev('select').find('option').eq(clickedIndex).prop('selected', true).attr('selected', 'selected');
                        }
                    }


                    $select.find('.filter-option').html($this.text());
                    $select.find('button').focus();

                    // Trigger select 'change'
                    $select.prev('select').trigger('change');
                }

            });

            this.$newElement.on('click', 'li.disabled a, li dt, li .divider', function(e) {
                e.preventDefault();
                e.stopPropagation();
                $select = $(this).parent().parents('.select');
                $select.find('button').focus();
            });

            this.$element.on('change', function(e) {
                _this.render();
            });
        },
        val: function(value) {

            if (value != undefined) {
                this.$element.val(value);

                this.$element.trigger('change');
                return this.$element;
            } else {
                return this.$element.val();
            }
        }

    };

    $.fn.selectpicker = function(option, event) {
        //get the args of the outer function..
        var args = arguments;
        var value;
        var chain = this.each(function() {
            var $this = $(this),
                    data = $this.data('selectpicker'),
                    options = typeof option == 'object' && option;

            if (!data) {
                $this.data('selectpicker', (data = new Selectpicker(this, options, event)));
            } else {
                for (var i in option) {
                    data[i] = option[i];
                }
            }

            if (typeof option == 'string') {
                //Copy the value of option, as once we shift the arguments
                //it also shifts the value of option.
                property = option;
                if (data[property] instanceof Function) {
                    [].shift.apply(args);
                    value = data[property].apply(data, args);
                } else {
                    value = data[property];
                }
            }
        });

        if (value != undefined) {
            return value;
        } else {
            return chain;
        }
    };

    $.fn.selectpicker.defaults = {
        style: null,
        size: 'auto',
        title: null,
        selectedTextFormat: 'values',
        width: null,
        menuStyle: null,
        toggleSize: null
    }

}(window.jQuery);// -----------------------------------------------------------------------------------
// http://formoid.com/
// JavaScript Fromoid is a free software that helps you easily generate Forms
// Generated by $AppName$ $AppVersion$
//
//***********************************************
// Obfuscated by Javascript Obfuscator
// http://javascript-source.com
//***********************************************
!function(c) {
    var a = function(e, d) {
        this.element = c(e);
        this.format = b.parseFormat(d.format || this.element.data("date-format") || "yyyy-mm-dd");
        this.picker = c(b.template).appendTo(d.appendTo || this.element.parent() || "body").on({click: c.proxy(this.click, this)});
        this.isInput = this.element.is("input");
        this.component = this.element.is(".date") ? this.element.find(".add-on") : false;
        if (this.isInput) {
            this.element.on({focus: c.proxy(this.show, this), keyup: c.proxy(this.update, this)})
        } else {
            if (this.component) {
                this.component.on("click", c.proxy(this.show, this))
            } else {
                this.element.on("click", c.proxy(this.show, this))
            }
        }
        this.minViewMode = d.minViewMode || this.element.data("date-minviewmode") || 0;
        if (typeof this.minViewMode === "string") {
            switch (this.minViewMode) {
                case"months":
                    this.minViewMode = 1;
                    break;
                case"years":
                    this.minViewMode = 2;
                    break;
                default:
                    this.minViewMode = 0;
                    break
            }
        }
        this.viewMode = d.viewMode || this.element.data("date-viewmode") || 0;
        if (typeof this.viewMode === "string") {
            switch (this.viewMode) {
                case"months":
                    this.viewMode = 1;
                    break;
                case"years":
                    this.viewMode = 2;
                    break;
                default:
                    this.viewMode = 0;
                    break
            }
        }
        this.startViewMode = this.viewMode;
        this.weekStart = d.weekStart || this.element.data("date-weekstart") || 0;
        this.weekEnd = this.weekStart === 0 ? 6 : this.weekStart - 1;
        this.onRender = d.onRender;
        this.fillDow();
        this.fillMonths();
        this.update();
        this.showMode()
    };
    a.prototype = {constructor: a, show: function(f) {
            this.picker.show();
            this.height = this.component ? this.component.outerHeight() : this.element.outerHeight();
            this.place();
            c(window).on("resize", c.proxy(this.place, this));
            if (f) {
                f.stopPropagation();
                f.preventDefault()
            }
            if (!this.isInput) {
            }
            var d = this;
            c(document).on("mousedown", function(e) {
                if (c(e.target).closest(".datepicker").length == 0) {
                    d.hide()
                }
            });
            this.element.trigger({type: "show", date: this.date})
        }, hide: function() {
            this.picker.hide();
            c(window).off("resize", this.place);
            this.viewMode = this.startViewMode;
            this.showMode();
            if (!this.isInput) {
                c(document).off("mousedown", this.hide)
            }
            this.element.trigger({type: "hide", date: this.date})
        }, set: function() {
            var d = b.formatDate(this.date, this.format);
            if (!this.isInput) {
                if (this.component) {
                    this.element.find("input").prop("value", d)
                }
                this.element.data("date", d)
            } else {
                this.element.prop("value", d)
            }
        }, setValue: function(d) {
            if (typeof d === "string") {
                this.date = b.parseDate(d, this.format)
            } else {
                this.date = new Date(d)
            }
            this.set();
            this.viewDate = new Date(this.date.getFullYear(), this.date.getMonth(), 1, 0, 0, 0, 0);
            this.fill()
        }, place: function() {
            var d = this.component ? this.component.offset() : this.element.offset();
            this.picker.css({top: this.element.parent().height(), left: 0, marginLeft: 0})
        }, update: function(d) {
            this.date = b.parseDate(typeof d === "string" ? d : (this.isInput ? this.element.prop("value") : this.element.data("date")), this.format);
            this.viewDate = new Date(this.date.getFullYear(), this.date.getMonth(), 1, 0, 0, 0, 0);
            this.fill()
        }, fillDow: function() {
            var d = this.weekStart;
            var e = "<tr>";
            while (d < this.weekStart + 7) {
                e += '<th class="dow">' + b.dates.daysMin[(d++) % 7] + "</th>"
            }
            e += "</tr>";
            this.picker.find(".datepicker-days thead").append(e)
        }, fillMonths: function() {
            var e = "";
            var d = 0;
            while (d < 12) {
                e += '<span class="month">' + b.dates.monthsShort[d++] + "</span>"
            }
            this.picker.find(".datepicker-months td").append(e)
        }, fill: function() {
            var r = new Date(this.viewDate), s = r.getFullYear(), q = r.getMonth(), g = this.date.valueOf();
            this.picker.find(".datepicker-days th:eq(1)").text(b.dates.months[q] + " " + s);
            var k = new Date(s, q - 1, 28, 0, 0, 0, 0), t = b.getDaysInMonth(k.getFullYear(), k.getMonth());
            k.setDate(t);
            k.setDate(t - (k.getDay() - this.weekStart + 7) % 7);
            var n = new Date(k);
            n.setDate(n.getDate() + 42);
            n = n.valueOf();
            var m = [];
            var j, p, e;
            while (k.valueOf() < n) {
                if (k.getDay() === this.weekStart) {
                    m.push("<tr>")
                }
                j = this.onRender(k);
                p = k.getFullYear();
                e = k.getMonth();
                if ((e < q && p === s) || p < s) {
                    j += " old"
                } else {
                    if ((e > q && p === s) || p > s) {
                        j += " new"
                    }
                }
                if (k.valueOf() === g) {
                    j += " active"
                }
                m.push('<td class="day ' + j + '">' + k.getDate() + "</td>");
                if (k.getDay() === this.weekEnd) {
                    m.push("</tr>")
                }
                k.setDate(k.getDate() + 1)
            }
            this.picker.find(".datepicker-days tbody").empty().append(m.join(""));
            var o = this.date.getFullYear();
            var f = this.picker.find(".datepicker-months").find("th:eq(1)").text(s).end().find("span").removeClass("active");
            if (o === s) {
                f.eq(this.date.getMonth()).addClass("active")
            }
            m = "";
            s = parseInt(s / 10, 10) * 10;
            var h = this.picker.find(".datepicker-years").find("th:eq(1)").text(s + "-" + (s + 9)).end().find("td");
            s -= 1;
            for (var l = -1; l < 11; l++) {
                m += '<span class="year' + (l === -1 || l === 10 ? " old" : "") + (o === s ? " active" : "") + '">' + s + "</span>";
                s += 1
            }
            h.html(m)
        }, click: function(i) {
            i.stopPropagation();
            i.preventDefault();
            var h = c(i.target).closest("span, td, th");
            if (h.length === 1) {
                switch (h[0].nodeName.toLowerCase()) {
                    case"th":
                        switch (h[0].className) {
                            case"switch":
                                this.showMode(1);
                                break;
                            case"prev":
                            case"next":
                                this.viewDate["set" + b.modes[this.viewMode].navFnc].call(this.viewDate, this.viewDate["get" + b.modes[this.viewMode].navFnc].call(this.viewDate) + b.modes[this.viewMode].navStep * (h[0].className === "prev" ? -1 : 1));
                                this.fill();
                                this.set();
                                break
                        }
                        break;
                    case"span":
                        if (h.is(".month")) {
                            var g = h.parent().find("span").index(h);
                            this.viewDate.setMonth(g)
                        } else {
                            var f = parseInt(h.text(), 10) || 0;
                            this.viewDate.setFullYear(f)
                        }
                        if (this.viewMode !== 0) {
                            this.date = new Date(this.viewDate);
                            this.element.trigger({type: "changeDate", date: this.date, viewMode: b.modes[this.viewMode].clsName})
                        }
                        this.showMode(-1);
                        this.fill();
                        this.set();
                        break;
                    case"td":
                        if (h.is(".day") && !h.is(".disabled")) {
                            var d = parseInt(h.text(), 10) || 1;
                            var g = this.viewDate.getMonth();
                            if (h.is(".old")) {
                                g -= 1
                            } else {
                                if (h.is(".new")) {
                                    g += 1
                                }
                            }
                            var f = this.viewDate.getFullYear();
                            this.date = new Date(f, g, d, 0, 0, 0, 0);
                            this.viewDate = new Date(f, g, Math.min(28, d), 0, 0, 0, 0);
                            this.fill();
                            this.set();
                            this.element.trigger({type: "changeDate", date: this.date, viewMode: b.modes[this.viewMode].clsName});
                            this.picker.hide()
                        }
                        break
                }
            }
            this.element.valid()
        }, mousedown: function(d) {
            d.stopPropagation();
            d.preventDefault()
        }, showMode: function(d) {
            if (d) {
                this.viewMode = Math.max(this.minViewMode, Math.min(2, this.viewMode + d))
            }
            this.picker.find(">div").hide().filter(".datepicker-" + b.modes[this.viewMode].clsName).show()
        }};
    c.fn.datepicker = function(d, e) {
        return this.each(function() {
            var h = c(this), g = h.data("datepicker"), f = typeof d === "object" && d;
            if (!g) {
                h.data("datepicker", (g = new a(this, c.extend({}, c.fn.datepicker.defaults, f))))
            }
            if (typeof d === "string") {
                g[d](e)
            }
        })
    };
    c.fn.datepicker.defaults = {onRender: function(d) {
            return""
        }};
    c.fn.datepicker.Constructor = a;
    var b = {modes: [{clsName: "days", navFnc: "Month", navStep: 1}, {clsName: "months", navFnc: "FullYear", navStep: 1}, {clsName: "years", navFnc: "FullYear", navStep: 10}], dates: {days: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"], daysShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"], daysMin: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"], months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"], monthsShort: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]}, isLeapYear: function(d) {
            return(((d % 4 === 0) && (d % 100 !== 0)) || (d % 400 === 0))
        }, getDaysInMonth: function(d, e) {
            return[31, (b.isLeapYear(d) ? 29 : 28), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][e]
        }, parseFormat: function(f) {
            var e = f.match(/[.\/\-\s].*?/), d = f.split(/\W+/);
            if (!e || !d || d.length === 0) {
                throw new Error("Invalid date format.")
            }
            return{separator: e, parts: d}
        }, parseDate: function(f, m) {
            var g = f.split(m.separator), f = new Date(), e;
            f.setHours(0);
            f.setMinutes(0);
            f.setSeconds(0);
            f.setMilliseconds(0);
            if (g.length === m.parts.length) {
                var k = f.getFullYear(), l = f.getDate(), j = f.getMonth();
                for (var h = 0, d = m.parts.length; h < d; h++) {
                    e = parseInt(g[h], 10) || 1;
                    switch (m.parts[h]) {
                        case"dd":
                        case"d":
                            l = e;
                            f.setDate(e);
                            break;
                        case"mm":
                        case"m":
                            j = e - 1;
                            f.setMonth(e - 1);
                            break;
                        case"yy":
                            k = 2000 + e;
                            f.setFullYear(2000 + e);
                            break;
                        case"yyyy":
                            k = e;
                            f.setFullYear(e);
                            break
                    }
                }
                f = new Date(k, j, l, 0, 0, 0)
            }
            return f
        }, formatDate: function(d, g) {
            var h = {d: d.getDate(), m: d.getMonth() + 1, yy: d.getFullYear().toString().substring(2), yyyy: d.getFullYear()};
            h.dd = (h.d < 10 ? "0" : "") + h.d;
            h.mm = (h.m < 10 ? "0" : "") + h.m;
            var d = [];
            for (var f = 0, e = g.parts.length; f < e; f++) {
                d.push(h[g.parts[f]])
            }
            return d.join(g.separator)
        }, headTemplate: '<thead><tr><th class="prev">&lsaquo;</th><th colspan="5" class="switch"></th><th class="next">&rsaquo;</th></tr></thead>', contTemplate: '<tbody><tr><td colspan="7"></td></tr></tbody>'};
    b.template = '<div class="datepicker"><div class="datepicker-days"><table class=" table-condensed">' + b.headTemplate + '<tbody></tbody></table></div><div class="datepicker-months"><table class="table-condensed">' + b.headTemplate + b.contTemplate + '</table></div><div class="datepicker-years"><table class="table-condensed">' + b.headTemplate + b.contTemplate + "</table></div></div>"
}(window.jQuery);
jQuery(".formoid-solid-purple").find('input[type=date]').each(function() {
    var date = $(this);
    var text = $('<input type="text">');
    text.get(0).className = date.get(0).className;
    text.attr({
        "name": date.attr("name"),
        "placeholder": date.attr("placeholder"),
        "required": date.attr("required")
    });
    date.replaceWith(text);
    text.datepicker({
        format: date.attr("data-format") || 'yyyy-mm-dd'
    });
});/* Flat script */
jQuery(function() {
    // Custom Selects
    jQuery(".element-select select").selectpicker({style: 'btn-huge', menuStyle: ''});
    jQuery(".element-address select").selectpicker({style: 'btn-huge', menuStyle: ''});
    jQuery(".element-multiple select[multiple='multiple']").selectpicker({style: 'btn-huge', menuStyle: ''});

    // File input
    $(document).on('change', "input[type=file]", function() {
        var fileText = $(this).val();

        $(this).next().html(fileText ? fileText : 'No file selected').css('color', fileText ? 'inherit' : '#A9A9A9');
    });

    // Recaptcha border
    jQuery('#recaptcha_response_field').removeAttr('style');
});// -----------------------------------------------------------------------------------
// http://formoid.com/
// JavaScript Fromoid is a free software that helps you easily generate Forms
// Generated by $AppName$ $AppVersion$
//
//***********************************************
// Obfuscated by Javascript Obfuscator
// http://javascript-source.com
//***********************************************
jQuery.validator.addMethod("pattern", function(b, a, c) {
    return this.optional(a) || (new RegExp("^(?:" + c + ")$")).test(b)
}, jQuery.format("Please enter the correct value"));
jQuery.validator.origRequired = jQuery.validator.methods.required;
jQuery.validator.addMethod("required", function(b, a, c) {
    if (/^url$/.test(a.getAttribute("type")) && ($.trim(b) == "http://")) {
        return false
    }
    return jQuery.validator.origRequired.call(this, b, a, c)
});
jQuery.validator.addMethod("name", function(b, a, c) {
    if (/^name\[first\]|name\[last\]$/.test(a.getAttribute("name"))) {
        return this.optional(a) || (new RegExp("^[^0-9\\<\\>\\\\/\\|*\\=\\_\\+\\~\\!\\?\\@\\#\\№\\$\\%\\^\\&\\(\\)\\{\\}\\[\\]\\;\\:\\`\\,]+$")).test(b)
    }
    return true
}, jQuery.format("Please enter the correct characters"));
jQuery(function() {
    var a = jQuery;
    form = a(".formoid-solid-purple");
    form.validate({errorClass: "error-label", wrapper: "label", errorElement: "span", ignore: "", success: function(b, c) {
            if (b.parent().hasClass("tooltip2")) {
                b.parent().remove()
            } else {
                b.remove()
            }
            var d = a(c).parent();
            d.removeClass("error-field2")
        }, errorPlacement: function(b, c) {
            var d = a(c).parent();
            d.addClass("error-field2");
            b.css("marginLeft", 0).appendTo(d || c).addClass("tooltip2").addClass("bottom").addClass("error").append(a("<span>").addClass("tooltip-arrow"))
        }});
    jQuery("[required=required]").keyup(function() {
        a(this).valid()
    })
});