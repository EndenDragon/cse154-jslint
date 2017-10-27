// jslint.js
// 2008-04-18
/*
Copyright (c) 2002 Douglas Crockford  (www.JSLint.com)

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies
of the Software, and to permit persons to whom the Software is furnished to do
so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

The Software shall be used for Good, not Evil.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/

/*
    JSLINT is a global function. It takes two parameters.

        var myResult = JSLINT(source, option, adsafe);

    The first parameter is either a string or an array of strings. If it is a
    string, it will be split on '\n' or '\r'. If it is an array of strings, it
    is assumed that each string represents one line. The source can be a
    JavaScript text, or HTML text, or a Konfabulator text.

    The second parameter is an optional object of options which control the
    operation of JSLINT. All of the options are booleans. All are optional and
    have a default value of false.

    The third parameter is an optional object that names the global objects
    that are allowed under ADsafe. The default is {
        ADSAFE: true,
    }. Each member must have a true value. These names will deliver methods
    to the guest code. The guest will be allowed to call the methods, but not
    to retrieve or set members.

    If it checks out, JSLINT returns true. Otherwise, it returns false.

    If false, you can inspect JSLINT.errors to find out the problems.
    JSLINT.errors is an array of objects containing these members:

    {
        line      : The line (relative to 0) at which the lint was found
        character : The character (relative to 0) at which the lint was found
        reason    : The problem
        evidence  : The text line in which the problem occurred
        raw       : The raw message before the details were inserted
        a         : The first detail
        b         : The second detail
        c         : The third detail
        d         : The fourth detail
    }

    If a fatal error was found, a null will be the last element of the
    JSLINT.errors array.

    You can request a Function Report, which shows all of the functions
    and the parameters and vars that they use. This can be used to find
    implied global variables and other problems. The report is in HTML and
    can be inserted in a <body>.

        var myReport = JSLINT.report(option);

    If the option is true, then the report will be limited to only errors.
*/

/*jslint evil: true, nomen: false */

/*members "\b", "\t", "\n", "\f", "\r", "\"", "(begin)", "(breakage)",
    "(context)", "(end)", "(global)", "(identifier)", "(line)", "(name)",
    "(params)", "(scope)", "(verb)", ")", "++", "--", "\/", ADSAFE, Array,
    Boolean, COM, Canvas, CustomAnimation, Date, Debug, E, Error, EvalError,
    FadeAnimation, FormField, Frame, Function, HotKey, Image, LN10, LN2,
    LOG10E, LOG2E, MAX_VALUE, MIN_VALUE, Math, MenuItem, MoveAnimation,
    NEGATIVE_INFINITY, Number, Object, Option, PI, POSITIVE_INFINITY, Point,
    RangeError, ReferenceError, RegExp, RotateAnimation, SQRT1_2, SQRT2,
    ScrollBar, String, SyntaxError, System, Text, TextArea, TypeError,
    URIError, URL, Window, XMLDOM, XMLHttpRequest, "\\", "]", a, abbr,
    "about-box", "about-image", "about-text", "about-version", acronym,
    action, address, adsafe, alert, alignment, anchorstyle, animator,
    appleScript, applet, apply, area, arguments, author, autohide, b,
    background, base, bdo, beep, beget, bgcolor, bgcolour, bgopacity, big,
    bitwise, block, blockquote, blur, body, br, browser, button,
    bytesToUIString, c, call, callee, caller, canvas, cap, caption, cases,
    center, charAt, charCodeAt, character, charset, checked, chooseColor,
    chooseFile, chooseFolder, cite, clearInterval, clearTimeout, cliprect,
    close, closeWidget, closed, code, col, colgroup, color, colorize,
    colour, columns, company, condition, confirm, console, constructor,
    content, contextmenuitems, convertPathToHFS, convertPathToPlatform,
    copyright, d, data, dd, debug, decodeURI, decodeURIComponent,
    defaultStatus, defaulttracking, defaultvalue, defineClass, del,
    description, deserialize, dfn, dir, directory, div, dl, doAttribute,
    doBegin, doIt, doTagName, document, dt, dynsrc, editable, em, embed,
    empty, enabled, encodeURI, encodeURIComponent, entityify, eqeqeq,
    errors, escape, eval, event, evidence, evil, exec, exps, extension,
    fieldset, file, filesystem, fillmode, floor, focus, focusWidget, font,
    fontstyle, forin, form, fragment, frame, frames, frameset, from,
    fromCharCode, fud, function, g, gc, getComputedStyle, glovar, group, h1,
    h2, h3, h4, h5, h6, halign, handlelinks, hasOwnProperty, head, height,
    help, hidden, history, hlinesize, hoffset, hotkey, hr, href,
    hregistrationpoint, hscrollbar, hsladjustment, hsltinting, html, i,
    iTunes, icon, id, identifier, iframe, image, img, include, indexOf,
    init, input, ins, interval, isAlpha, isApplicationRunning, isDigit,
    isFinite, isNaN, join, jQuery, jquery, kbd, key, kind, konfabulatorVersion, label,
    labelled, laxbreak, lbp, led, left, legend, length, level, li, line,
    lines, link, load, loadClass, loadingsrc, location, locked, log, lowsrc,
    m, map, match, max, maxlength, menu, menuitem, message, meta, min,
    minimumversion, minlength, missingsrc, modifier, moveBy, moveTo, name,
    navigator, new, noframes, nomen, noscript, notsaved, nud, object, ol,
    on, onblur, onclick, oncontextmenu, ondragdrop, ondragenter, ondragexit,
    onerror, onfirstdisplay, onfocus, ongainfocus, onimageloaded, onkeydown,
    onkeypress, onkeyup, onload, onlosefocus, onmousedown, onmousedrag,
    onmouseenter, onmouseexit, onmousemove, onmouseup, onmousewheel,
    onmulticlick, onresize, onselect, ontextinput, ontimerfired, onunload,
    onvaluechanged, opacity, open, openURL, opener, opera, optgroup, option,
    optionvalue, order, orientation, p, pagesize, param, parent, parseFloat,
    parseInt, passfail, play, plusplus, pop, popupMenu, pre, preference,
    preferenceGroups, preferencegroup, preferences, print, prompt,
    prototype, push, q, quit, random, raw, reach, readFile, readUrl, reason,
    regexp, reloadWidget, remoteasync, replace, report, requiredplatform,
    reserved, resizeBy, resizeTo, resolvePath, resumeUpdates, rhino, right,
    root, rotation, runCommand, runCommandInBg, samp, saveAs,
    savePreferences, screen, script, scroll, scrollBy, scrollTo, scrollbar,
    scrolling, scrollx, scrolly, seal, search, secure, select, self,
    serialize, setInterval, setTimeout, setting, settings, shadow, shift,
    showWidgetPreferences, sidebar, size, skip, sleep, slice, small, sort,
    span, spawn, speak, special, spellcheck, split, src, srcheight,
    srcwidth, status, strong, style, sub, substr, subviews, sup, superview,
    supplant, suppressUpdates, sync, system, table, tag, tbody, td,
    tellWidget, test, text, textarea, tfoot, th, thead, thumbcolor, ticking,
    ticklabel, ticks, tileorigin, timer, title, toLowerCase, toString,
    toint32, token, tooltip, top, tr, tracking, trigger, truncation, tt,
    type, u, ul, undef, unescape, union, unwatch, updateNow, url,
    usefileicon, valign, value, valueOf, var, version, visible, vlinesize,
    voffset, vregistrationpoint, vscrollbar, watch, white, widget, width,
    window, wrap, yahooCheckLogin, yahooLogin, yahooLogout, zorder
*/

/*global JSLINT*/

// We build the application inside a function so that we produce only a single
// global variable. The function will be invoked, its return value is the JSLINT
// application itself.

// *** means added by Marty
var __DEBUG = false;

// *** kludge to get things to work in and out of browser
var __RUNNING_IN_BROWSER = true;
if (typeof(document) === "undefined") {
    __RUNNING_IN_BROWSER = false;

    // set up a fake global 'document' object to avoid crashes
    this.document = {
        cookie: "",
        getElementById: function() { return {}; },     // stub
        getElementsByName: function() { return []; },  // stub
        querySelector: function() { return {}; },      // stub
        querySelectorAll: function() { return []; }    // stub
    };
}

var __windowOnLoad = function() {
    var c = document.cookie,
        cluster = {
            // *** changed by Marty
            recommended: [
                // 'eqeqeq',
                // 'glovar',
                // 'nomen',
                // 'white',
                // 'laxbreak',
                'browser',
                'undef',
                'styledom',
                'eventfunc',
                'cse154',
                'fwddecl',
                'usestrict',
                'on',
                'prototype',
                'jquery'
            ],
            goodparts: [
                'bitwise', 'eqeqeq', 'glovar', 'nomen', 'plusplus', 'regexp',
                'undef', 'white'
            ],
            clearall: []
        },
        i,                              // Loop counter
        input = document.getElementById('input'),
        n,                              // A dom node
        ns,                             // An array of dom nodes
        o,                              // The options object
        options = [
            'adsafe', 'bitwise', 'browser', 'cap', 'debug', 'eqeqeq',
            'evil', 'forin', 'fragment', 'glovar', 'laxbreak', 'nomen', 'on',
            'passfail', 'plusplus', 'regexp', 'rhino', 'sidebar', 'undef',
            'white', 'widget',

            // *** added by Marty
            'prototype', 'jquery', 'yui', 'mootools', 'dojo', 'nodejs',
            'styledom', 'eventfunc', 'fwddecl', 'cse154', 'underscore', 'usestrict'
        ],
        output = document.getElementById('output');

    function getOption(o) {
        var n = document.getElementById(o);
        return n && n.checked;
    }


    function setOption(o, b) {
        var n = document.getElementById(o);
        if (n) {
            n.checked = b;
        }
    }

    function setCluster(n) {
        document.getElementById(n).onclick = function (e) {
            var c = cluster[n];
            for (i = 0; i < options.length; i += 1) {
                setOption(options[i], false);
            }
            for (i = 0; i < c.length; i += 1) {
                setOption(c[i], true);
            }
        };
    }


    if (__RUNNING_IN_BROWSER) {
        if (input) {
            input.onchange = function (e) {
                output.innerHTML = '';
            };
        }

        // Add click event handlers to the [JSLint] and [clear] buttons.
        ns = document.querySelectorAll('#jslint, .jslint');
        for (i = 0; i < ns.length; i += 1) {
            n = ns[i];
            var value = n.value ? n.value : n.innerHTML;
            switch (value) {
            case 'JSLint':
            case 'run JSLint':
            case 'Run JSLint':
                n.onclick = function (e) {
                    // Make a JSON cookie of the current options.
                    var b, d = new Date(), j, k = '{', oj, op = {}, v;
                    for (j = 0; j < options.length; j += 1) {
                        oj = options[j];
                        v = getOption(oj);
                        op[oj] = v;
                        if (b) {
                            k += ',';
                        }
                        k += '"' + oj + '":' + v;
                        b = true;
                    }
                    k += '}';
                    d.setTime(d.getTime() + 1e10);

                    // *** commented out by Marty to turn off annoying options cookie
                    // document.cookie = 'jslint=' + k + ';expires=' +
                    // d.toGMTString();

                    // Call JSLint and obtain the report.
                    JSLINT(input.value, op);
                    output.innerHTML = JSLINT.report();
                    if (input && input.select) { input.select(); }
                    return false;
                };
                break;
            case 'clear':
                n.onclick = function (e) {
                    input.value = '';
                    output.innerHTML = '';
                    if (input && input.select) { input.select(); }
                    return false;
                };
                break;
            }
        }

        // Recover the JSLint options from a JSON cookie.

        // *** commented out by Marty
        /*
        if (__RUNNING_IN_BROWSER && c && c.length > 8) {
            i = c.indexOf('jslint={');
            if (i >= 0) {
                c = c.substring(i + 7);
                i = c.indexOf('}');
                if (i > 1) {
                    c = c.substring(0, i + 1);
                    o = eval('(' + c + ')');
                    for (i = 0; i < options.length; i += 1) {
                        setOption(options[i], o[options[i]]);
                    }
                }
            }
        }
        */

        setCluster('recommended');
        setCluster('goodparts');
        setCluster('clearall');

        if (input && input.select) { input.select(); }

        // *** Marty
        // pre-run if text is already in pane (submitted via POST)
        if (document.getElementById("input").value) {
            document.getElementById("jslint").onclick();
        }
    }
};

// *** if running in browser, run when page is done loading;
// if not (e.g. running in Rhino on Grade-It), run immediately
if (__RUNNING_IN_BROWSER) {
    window.onload = __windowOnLoad;
} else {
    __windowOnLoad();
}

JSLINT = function () {
    // These are members that should not be permitted in third party ads.
    var adsafe = {              // the member names that ADsafe prohibits.
            apply           : true,
            'arguments'     : true,
            call            : true,
            callee          : true,
            caller          : true,
            constructor     : true,
            'eval'          : true,
            prototype       : true,
            jquery          : true,
            unwatch         : true,
            valueOf         : true,
            watch           : true
        },
        adsafe_allow,           // the global objects that ADsafe allows.

// These are all of the JSLint options.

        allOptions = {
            adsafe     : true, // if use of some browser features should be restricted
            bitwise    : true, // if bitwise operators should not be allowed
            browser    : true, // if the standard browser globals should be predefined
            cap        : true, // if upper case HTML should be allowed
            debug      : true, // if debugger statements should be allowed
            eqeqeq     : true, // if === should be required
            evil       : true, // if eval should be allowed
            forin      : true, // if for in statements must filter
            fragment   : true, // if HTML fragments should be allowed
            glovar     : true, // if HTML fragments should be allowed
            laxbreak   : true, // if line breaks should not be checked
            nomen      : true, // if names should be checked
            on         : true, // if HTML event handlers should be allowed
            passfail   : true, // if the scan should stop on first error
            plusplus   : true, // if increment/decrement should not be allowed
            regexp     : true, // if the . should not be allowed in regexp literals
            rhino      : true, // if the Rhino environment globals should be predefined
            undef      : true, // if variables should be declared before used
            sidebar    : true, // if the System object should be predefined
            white      : true, // if strict whitespace rules apply
            widget     : true, // if the Yahoo Widgets globals should be predefined

            // *** added by Marty
            prototype  : true,
            jquery     : true,
            yui        : true,
            mootools   : true,
            dojo       : true,
            nodejs     : true,
            eventfunc  : true,
            styledom   : true,
            fwddecl    : true,
            cse154     : true,
            underscore : true,
            usestrict  : true
        },

        anonname,   // The guessed name for anonymous functions.

// browser contains a set of global names which are commonly provided by a
// web browser environment.

        browser = {
            // Added by whitaker. Promises are legit, AjaxGetPromise and AjaxPostPromise are CSE154/17sp specific.
            AjaxGetPromise       : true,
            AjaxPostPromise      : true,
            Promise              : true,

            ArrayBuffer          : true,
            ArrayBufferView      : true,
            Audio                : true,
            Blob                 : true,
            addEventListener     : true,
            alert                : true,
            applicationCache     : true,
            atob                 : true,
            blur                 : true,
            btoa                 : true,
            clearInterval        : true,
            clearTimeout         : true,
            close                : true,
            closed               : true,
            confirm              : true,
            console              : true,
            DataView             : true,
            DOMParser            : true,
            defaultStatus        : true,
            document             : true,
            Element              : true,
            escape               : true,
            event                : true,
            FileReader           : true,
            Float32Array         : true,
            Float64Array         : true,
            FormData             : true,
            focus                : true,
            frames               : true,
            getComputedStyle     : true,
            HTMLElement          : true,
            HTMLAnchorElement    : true,
            HTMLBaseElement      : true,
            HTMLBlockquoteElement: true,
            HTMLBodyElement      : true,
            HTMLBRElement        : true,
            HTMLButtonElement    : true,
            HTMLCanvasElement    : true,
            HTMLDirectoryElement : true,
            HTMLDivElement       : true,
            HTMLDListElement     : true,
            HTMLFieldSetElement  : true,
            HTMLFontElement      : true,
            HTMLFormElement      : true,
            HTMLFrameElement     : true,
            HTMLFrameSetElement  : true,
            HTMLHeadElement      : true,
            HTMLHeadingElement   : true,
            HTMLHRElement        : true,
            HTMLHtmlElement      : true,
            HTMLIFrameElement    : true,
            HTMLImageElement     : true,
            HTMLInputElement     : true,
            HTMLIsIndexElement   : true,
            HTMLLabelElement     : true,
            HTMLLayerElement     : true,
            HTMLLegendElement    : true,
            HTMLLIElement        : true,
            HTMLLinkElement      : true,
            HTMLMapElement       : true,
            HTMLMenuElement      : true,
            HTMLMetaElement      : true,
            HTMLModElement       : true,
            HTMLObjectElement    : true,
            HTMLOListElement     : true,
            HTMLOptGroupElement  : true,
            HTMLOptionElement    : true,
            HTMLParagraphElement : true,
            HTMLParamElement     : true,
            HTMLPreElement       : true,
            HTMLQuoteElement     : true,
            HTMLScriptElement    : true,
            HTMLSelectElement    : true,
            HTMLStyleElement     : true,
            HTMLTableCaptionElement: true,
            HTMLTableCellElement : true,
            HTMLTableColElement  : true,
            HTMLTableElement     : true,
            HTMLTableRowElement  : true,
            HTMLTableSectionElement: true,
            HTMLTextAreaElement  : true,
            HTMLTitleElement     : true,
            HTMLUListElement     : true,
            HTMLVideoElement     : true,
            history              : true,
            Int16Array           : true,
            Int32Array           : true,
            Int8Array            : true,
            Image                : true,
            length               : true,
            localStorage         : true,
            location             : true,
            MessageChannel       : true,
            MessageEvent         : true,
            MessagePort          : true,
            moveBy               : true,
            moveTo               : true,
            MutationObserver     : true,
            name                 : true,
            Node                 : true,
            NodeFilter           : true,
            navigator            : true,
            onbeforeunload       : true,
            onblur               : true,
            onerror              : true,
            onfocus              : true,
            onload               : true,
            onresize             : true,
            onunload             : true,
            open                 : true,
            openDatabase         : true,
            opener               : true,
            Option               : true,
            parent               : true,
            print                : true,
            prompt               : true,
            removeEventListener  : true,
            resizeBy             : true,
            resizeTo             : true,
            screen               : true,
            scroll               : true,
            scrollBy             : true,
            scrollTo             : true,
            sessionStorage       : true,
            setInterval          : true,
            setTimeout           : true,
            SharedWorker         : true,
            status               : true,
            top                  : true,
            Uint16Array          : true,
            Uint32Array          : true,
            Uint8Array           : true,
            unescape             : true,
            WebSocket            : true,
            window               : true,
            Worker               : true,
            XMLHttpRequest       : true,
            XMLSerializer        : true,
            XPathEvaluator       : true,
            XPathException       : true,
            XPathExpression      : true,
            XPathNamespace       : true,
            XPathNSResolver      : true,
            XPathResult          : true
        },

        // *** added by Marty; global symbols added by Dojo Toolkit framework
        dojo = {
            dojo     : true,
            dijit    : true,
            dojox    : true,
            define   : true,
            "require": true
        },

        escapes = {
            '\b': '\\b',
            '\t': '\\t',
            '\n': '\\n',
            '\f': '\\f',
            '\r': '\\r',
            '"' : '\\"',
            '/' : '\\/',
            '\\': '\\\\'
        },

        funct,          // The current function
        functions,      // All of the functions

        href = {
            background  : true,
            content     : true,
            data        : true,
            dynsrc      : true,
            href        : true,
            lowsrc      : true,
            value       : true,
            src         : true,
            style       : true
        },

        global,         // The global object
        globals,        // The current globals
        implied,        // Implied globals
        inblock,
        indent,
        jsonmode,
        lines,
        lookahead,
        member,
        membersOnly,
        nexttoken,
        noreach,
        option,
        prereg,
        prevtoken,
        scope,      // The current scope
        sidebar = {
            System      : true
        },
        src,
        stack,

        // global names that are provided by the ECMAScript standard
        standard = {
            Array               : true,
            Boolean             : true,
            Date                : true,
            decodeURI           : true,
            decodeURIComponent  : true,
            encodeURI           : true,
            encodeURIComponent  : true,
            Error               : true,
            'eval'              : true,
            EvalError           : true,
            Function            : true,
            /*hasOwnProperty      : true,*/
            isFinite            : true,
            isNaN               : true,
            JSON                : true,
            Math                : true,
            Map                 : true,
            Number              : true,
            Object              : true,
            parseInt            : true,
            parseFloat          : true,
            RangeError          : true,
            ReferenceError      : true,
            RegExp              : true,
            Set                 : true,
            String              : true,
            SyntaxError         : true,
            TypeError           : true,
            URIError            : true,
            WeakMap             : true
        },

        standard_member = {
            E                   : true,
            LN2                 : true,
            LN10                : true,
            LOG2E               : true,
            LOG10E              : true,
            PI                  : true,
            SQRT1_2             : true,
            SQRT2               : true,
            MAX_VALUE           : true,
            MIN_VALUE           : true,
            NEGATIVE_INFINITY   : true,
            POSITIVE_INFINITY   : true
        },

        syntax = {},
        token,
        warnings,

// widget contains the global names which are provided to a Yahoo
// (fna Konfabulator) widget.

        widget = {
            alert                   : true,
            appleScript             : true,
            animator                : true,
            appleScript             : true,
            beep                    : true,
            bytesToUIString         : true,
            Canvas                  : true,
            chooseColor             : true,
            chooseFile              : true,
            chooseFolder            : true,
            convertPathToHFS        : true,
            convertPathToPlatform   : true,
            closeWidget             : true,
            COM                     : true,
            CustomAnimation         : true,
            escape                  : true,
            FadeAnimation           : true,
            filesystem              : true,
            focusWidget             : true,
            form                    : true,
            FormField               : true,
            Frame                   : true,
            HotKey                  : true,
            Image                   : true,
            include                 : true,
            isApplicationRunning    : true,
            iTunes                  : true,
            konfabulatorVersion     : true,
            log                     : true,
            MenuItem                : true,
            MoveAnimation           : true,
            openURL                 : true,
            play                    : true,
            Point                   : true,
            popupMenu               : true,
            preferenceGroups        : true,
            preferences             : true,
            print                   : true,
            prompt                  : true,
            random                  : true,
            reloadWidget            : true,
            resolvePath             : true,
            resumeUpdates           : true,
            RotateAnimation         : true,
            runCommand              : true,
            runCommandInBg          : true,
            saveAs                  : true,
            savePreferences         : true,
            screen                  : true,
            ScrollBar               : true,
            showWidgetPreferences   : true,
            sleep                   : true,
            speak                   : true,
            suppressUpdates         : true,
            system                  : true,
            tellWidget              : true,
            Text                    : true,
            TextArea                : true,
            unescape                : true,
            updateNow               : true,
            URL                     : true,
            widget                  : true,
            Window                  : true,
            XMLDOM                  : true,
            XMLHttpRequest          : true,
            yahooCheckLogin         : true,
            yahooLogin              : true,
            yahooLogout             : true
        },

//  xmode is used to adapt to the exceptions in XML parsing.
//  It can have these states:
//      false   .js script file
//      "       A " attribute
//      '       A ' attribute
//      content The content of a script tag
//      CDATA   A CDATA block

        xmode,

//  xtype identifies the type of document being analyzed.
//  It can have these states:
//      false   .js script file
//      html    .html file
//      widget  .kon Konfabulator file

        xtype,

// unsafe comment
        ax = /@cc|<\/?script|\]\]|&/i,
// unsafe character
        cx = /[\u0000-\u001f\u007f-\u009f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/,
// token
        tx = /^\s*([(){}\[.,:;'"~]|\](\]>)?|\?>?|==?=?|\/(\*(global|extern|jslint|member|members)?|=|\/)?|\*[\/=]?|\+[+=]?|-[\-=]?|%[=>]?|&[&=]?|\|[|=]?|>>?>?=?|<([\/=%\?]|\!(\[|--)?|<=?)?|\^=?|\!=?=?|[a-zA-Z_$][a-zA-Z0-9_$]*|[0-9]+([xX][0-9a-fA-F]+|\.[0-9]*)?([eE][+\-]?[0-9]+)?)/,
// star slash
        lx = /\*\/|\/\*/,
// identifier
        ix = /^([a-zA-Z_$][a-zA-Z0-9_$]*)$/,
// javascript url
        jx = /^(?:javascript|jscript|ecmascript|vbscript|mocha|livescript)\s*:/i,
// url badness
        ux = /&|\+|\u00AD|\.\.|\/\*|%[^;]|base64|url|expression|data|mailto/i,

        // *** added by Marty; global symbols added by jQuery framework
        jquery = {
            "$" : true,
            "jQuery" : true
        },

        // *** added by Marty; global symbols added by Node.js framework
        nodejs = {
            __filename   : true,
            __dirname    : true,
            Buffer       : true,
            console      : true,
            exports      : true,  // In Node it is ok to exports = module.exports = foo();
            GLOBAL       : true,
            global       : true,
            module       : true,
            process      : true,
            require      : true,
            setTimeout   : true,
            clearTimeout : true,
            setInterval  : true,
            clearInterval: true
        },

        // *** added by Marty; global symbols added by Prototype framework
        prototype = {
            "$" : true,
            "$$" : true,
            "$A" : true,
            "$break" : true,
            "$continue" : true,
            "$F" : true,
            "$H" : true,
            "$R" : true,
            "$w" : true,
            "Abstract": true,
            "Ajax" : true,
            "Class" : true,
            "Element" : true,
            "Enumerable" : true,
            "Event" : true,
            "Field": true,
            "Form" : true,
            "Hash" : true,
            "Insertion" : true,
            "Object" : true,
            "ObjectRange" : true,
            "PeriodicalExecuter" : true,
            "Position" : true,
            "Prototype" : true,
            "Selector": true,
            "Template" : true,
            "TimedObserver" : true,
            "Toggle": true,
            "Try" : true,

            // *** added by Marty; global symbols added by Scriptaculous framework
            "Autocompleter" : true,
            "Builder" : true,
            "Control" : true,
            "DelayedObserver" : true,
            "Draggable" : true,
            "Draggables" : true,
            "Droppables" : true,
            "Effect" : true,
            "Scriptaculous" : true,
            "Slider" : true,
            "Sortable" : true,
            "SortableObserver" : true,
            "Sortables" : true,
            "Sound" : true,
            "Test" : true,
            "Unit" : true,
            "Runner" : true,
            "Logger" : true
        },

        yui = {
            "YUI"       : true,
            "Y"         : true,
            "YUI_config": true
        },

        // *** added by Marty; globals used by CSE 154 assignments
        cse154 = {
            "ANIMATIONS" : true,
            "blank" : true,
            "BLANK" : true,
            "exercise" : true,
            "EXERCISE" : true,
            "juggler" : true,
            "JUGGLER" : true,
            "bike" : true,
            "BIKE" : true,
            "dive" : true,
            "DIVE" : true,
            "CUSTOM" : true,
            "custom" : true
        },

        // *** added by Marty; global symbols added by MooTools framework
        mootools = {
            "$"           : true,
            "$$"          : true,
            Asset         : true,
            Browser       : true,
            Chain         : true,
            Class         : true,
            Color         : true,
            Cookie        : true,
            Core          : true,
            Document      : true,
            DomReady      : true,
            DOMEvent      : true,
            DOMReady      : true,
            Drag          : true,
            Element       : true,
            Elements      : true,
            Event         : true,
            Events        : true,
            Fx            : true,
            Group         : true,
            Hash          : true,
            HtmlTable     : true,
            Iframe        : true,
            IframeShim    : true,
            InputValidator: true,
            instanceOf    : true,
            Keyboard      : true,
            Locale        : true,
            Mask          : true,
            MooTools      : true,
            Native        : true,
            Options       : true,
            OverText      : true,
            Request       : true,
            Scroller      : true,
            Slick         : true,
            Slider        : true,
            Sortables     : true,
            Spinner       : true,
            Swiff         : true,
            Tips          : true,
            Type          : true,
            typeOf        : true,
            URI           : true,
            Window        : true
        },

        rhino = {
            defineClass  : true,
            deserialize  : true,
            gc           : true,
            help         : true,
            importPackage: true,
            "java"       : true,
            load         : true,
            loadClass    : true,
            print        : true,
            quit         : true,
            readFile     : true,
            readUrl      : true,
            runCommand   : true,
            seal         : true,
            serialize    : true,
            spawn        : true,
            sync         : true,
            toint32      : true,
            version      : true
        },

        // *** added by Marty; globals used by the Underscore JS library
        underscore = {
            "_" : true
        },

        eventNames = {
            onblur : true,
            onchange : true,
            onclick : true,
            ondblclick : true,
            onfocus : true,
            onkeydown : true,
            onkeypress : true,
            onkeyup : true,
            onload : true,
            onmousedown : true,
            onmousemove : true,
            onmouseout : true,
            onmouseover : true,
            onmouseup : true,
            onreset : true,
            onscroll : true,
            onselect : true,
            onsubmit : true,
            onunload : true
        },

        // names of bare events, also used by Prototype
        eventNamesBare = {
            blur : true,
            change : true,
            click : true,
            dblclick : true,
            focus : true,
            keydown : true,
            keypress : true,
            keyup : true,
            load : true,
            mousedown : true,
            mousemove : true,
            mouseout : true,
            mouseover : true,
            mouseup : true,
            reset : true,
            scroll : true,
            select : true,
            submit : true,
            unload : true,
            "dom:loaded" : true
        },

        // mapping from DOM 1 style event names e.g. "onclick" to real event names e.g. "click"
        eventNamesToBareMap = {
            onblur : "blur",
            onchange : "change",
            onclick : "click",
            ondblclick : "dblclick",
            onfocus : "focus",
            onkeydown : "keydown",
            onkeypress : "keypress",
            onkeyup : "keyup",
            onload : "load",
            onmousedown : "mousedown",
            onmousemove : "mousemove",
            onmouseout : "mouseout",
            onmouseover : "mouseover",
            onmouseup : "mouseup",
            onreset : "reset",
            onscroll : "scroll",
            onselect : "select",
            onsubmit : "submit",
            onunload : "unload"
        },

        prototypeEventNames = {
            // prototype/scriptaculous event names
            afterFinish : true,
            onChange : true,
            on200 : true,
            on303 : true,
            on304 : true,
            on400 : true,
            on403 : true,
            on404 : true,
            on500 : true,
            onDrag : true,
            onDrop : true,
            onEnd : true,
            onEnterEditMode : true,
            onEnterHover : true,
            onException : true,
            onFailure : true,
            onHover : true,
            onLeaveEditMode : true,
            onLeaveHover : true,
            onStart : true,
            onSuccess : true,
            onUpdate : true
        },

        styleProperties = {
            ":active" : true,
            ":after" : true,
            ":before" : true,
            ":first-child" : true,
            ":first-letter" : true,
            ":first-line" : true,
            ":focus" : true,
            ":hover" : true,
            ":lang" : true,
            ":link" : true,
            ":visited" : true,
            "background" : true,
            "background-attachment" : true,
            "background-color" : true,
            "background-image" : true,
            "background-position" : true,
            "background-repeat" : true,
            "border" : true,
            "border-bottom" : true,
            "border-bottom-color" : true,
            "border-bottom-style" : true,
            "border-bottom-width" : true,
            "border-collapse" : true,
            "border-color" : true,
            "border-left" : true,
            "border-left-color" : true,
            "border-left-style" : true,
            "border-left-width" : true,
            "border-right" : true,
            "border-right-color" : true,
            "border-right-style" : true,
            "border-right-width" : true,
            "border-spacing" : true,
            "border-style" : true,
            "border-top" : true,
            "border-top-color" : true,
            "border-top-style" : true,
            "border-top-width" : true,
            "border-width" : true,
            "bottom" : true,
            "caption-side" : true,
            "clear" : true,
            "clip" : true,
            "color" : true,
            "content" : true,
            "counter-increment" : true,
            "counter-reset" : true,
            "cssFloat" : true,
            "cursor" : true,
            "direction" : true,
            "display" : true,
            "empty-cells" : true,
            "float" : true,
            "font" : true,
            "font-family" : true,
            "font-size" : true,
            "font-size-adjust" : true,
            "font-stretch" : true,
            "font-style" : true,
            "font-variant" : true,
            "font-weight" : true,
            // "height" : true,
            "left" : true,
            "letter-spacing" : true,
            "line-height" : true,
            "line-height" : true,
            "list-style" : true,
            "list-style-image" : true,
            "list-style-position" : true,
            "list-style-type" : true,
            "margin" : true,
            "margin-bottom" : true,
            "margin-left" : true,
            "margin-right" : true,
            "margin-top" : true,
            "marker-offset" : true,
            "max-height" : true,
            "max-width" : true,
            "min-height" : true,
            "min-width" : true,
            "opacity" : true,
            "outline" : true,
            "outline-color" : true,
            "outline-style" : true,
            "outline-width" : true,
            "overflow" : true,
            "padding" : true,
            "padding-bottom" : true,
            "padding-left" : true,
            "padding-right" : true,
            "padding-top" : true,
            "position" : true,
            "position" : true,
            "quotes" : true,
            "right" : true,
            "table-layout" : true,
            "text-align" : true,
            "text-decoration" : true,
            "text-indent" : true,
            "text-shadow" : true,
            "text-transform" : true,
            "top" : true,
            "unicode-bidi" : true,
            "vertical-align" : true,
            "visibility" : true,
            "white-space" : true,
            // "width" : true,
            "word-spacing" : true,
            "z-index" : true,

            // new CSS3 properties:  http://meiert.com/en/indices/css-properties/
            "alignment-adjust" : true,
            "alignment-baseline" : true,
            "animation" : true,
            "animation-delay" : true,
            "animation-direction" : true,
            "animation-duration" : true,
            "animation-iteration-count" : true,
            "animation-name" : true,
            "animation-play-state" : true,
            "animation-timing-function" : true,
            "appearance" : true,
            "backface-visibility" : true,
            "background-origin" : true,
            "background-size" : true,
            "baseline-shift" : true,
            "binding" : true,
            "bleed" : true,
            "bookmark-label" : true,
            "bookmark-level" : true,
            "bookmark-state" : true,
            "bookmark-target" : true,
            "border-bottom-left-radius" : true,
            "border-bottom-right-radius" : true,
            "border-image" : true,
            "border-image-outset" : true,
            "border-image-repeat" : true,
            "border-image-slice" : true,
            "border-image-source" : true,
            "border-image-width" : true,
            "border-radius" : true,
            "border-top-left-radius" : true,
            "border-top-right-radius" : true,
            "box-decoration-break" : true,
            "box-shadow" : true,
            "box-sizing" : true,
            "break-after" : true,
            "break-before" : true,
            "break-inside" : true,
            "color-profile" : true,
            "column-count" : true,
            "column-fill" : true,
            "column-gap" : true,
            "column-rule" : true,
            "column-rule-color" : true,
            "column-rule-style" : true,
            "column-rule-width" : true,
            "column-span" : true,
            "column-width" : true,
            "columns" : true,
            "dominant-baseline" : true,
            "drop-initial-after-adjust" : true,
            "drop-initial-after-align" : true,
            "drop-initial-before-adjust" : true,
            "drop-initial-before-align" : true,
            "drop-initial-size" : true,
            "drop-initial-value" : true,
            "elevation" : true,
            "fit" : true,
            "fit-position" : true,
            "flex-align" : true,
            "flex-flow" : true,
            "flex-line-pack" : true,
            "flex-order" : true,
            "flex-pack" : true,
            "float-offset" : true,
            "grid-columns" : true,
            "grid-rows" : true,
            "hanging-punctuation" : true,
            "hyphenate-after" : true,
            "hyphenate-before" : true,
            "hyphenate-character" : true,
            "hyphenate-lines" : true,
            "hyphenate-resource" : true,
            "hyphens" : true,
            "icon" : true,
            "image-orientation" : true,
            "image-rendering" : true,
            "image-resolution" : true,
            "inline-box-align" : true,
            "line-break" : true,
            "line-stacking" : true,
            "line-stacking-ruby" : true,
            "line-stacking-shift" : true,
            "line-stacking-strategy" : true,
            "marquee-direction" : true,
            "marquee-loop" : true,
            "marquee-play-count" : true,
            "marquee-speed" : true,
            "marquee-style" : true,
            "move-to" : true,
            "nav-down" : true,
            "nav-index" : true,
            "nav-left" : true,
            "nav-right" : true,
            "nav-up" : true,
            "order" : true,
            "outline-offset" : true,
            "overflow-style" : true,
            "overflow-wrap" : true,
            "overflow-x" : true,
            "overflow-y" : true,
            "page" : true,
            "page-policy" : true,
            "perspective" : true,
            "perspective-origin" : true,
            "phonemes" : true,
            "pitch" : true,
            "pitch-range" : true,
            "play-during" : true,
            "presentation-level" : true,
            "punctuation-trim" : true,
            "rendering-intent" : true,
            "resize" : true,
            "rest" : true,
            "rest-after" : true,
            "rest-before" : true,
            "richness" : true,
            "rotation" : true,
            "rotation-point" : true,
            "ruby-align" : true,
            "ruby-overhang" : true,
            "ruby-position" : true,
            "ruby-span" : true,
            "speak" : true,
            "speak-header" : true,
            "speak-numeral" : true,
            "speak-punctuation" : true,
            "speech-rate" : true,
            "stress" : true,
            "string-set" : true,
            "tab-size" : true,
            "target" : true,
            "target-name" : true,
            "target-new" : true,
            "target-position" : true,
            "text-align-last" : true,
            "text-decoration-color" : true,
            "text-decoration-line" : true,
            "text-decoration-skip" : true,
            "text-decoration-style" : true,
            "text-emphasis" : true,
            "text-emphasis-color" : true,
            "text-emphasis-position" : true,
            "text-emphasis-style" : true,
            "text-height" : true,
            "text-justify" : true,
            "text-outline" : true,
            "text-underline-position" : true,
            "text-wrap" : true,
            "transform" : true,
            "transform-origin" : true,
            "transform-style" : true,
            "transition" : true,
            "transition-delay" : true,
            "transition-duration" : true,
            "transition-property" : true,
            "transition-timing-function" : true,
            "voice-balance" : true,
            "voice-duration" : true,
            "voice-family" : true,
            "voice-pitch" : true,
            "voice-pitch-range" : true,
            "voice-rate" : true,
            "voice-stress" : true,
            "voice-volume" : true,
            "volume" : true,
            "widows" : true,
            "word-break" : true,
            "word-wrap" : true
        },

        styleDomProperties = {
            background : true,
            backgroundAttachment : true,
            backgroundColor : true,
            backgroundImage : true,
            backgroundPosition : true,
            backgroundRepeat : true,
            border : true,
            borderBottom : true,
            borderBottomColor : true,
            borderBottomStyle : true,
            borderBottomWidth : true,
            borderCollapse : true,
            borderColor : true,
            borderLeft : true,
            borderLeftColor : true,
            borderLeftStyle : true,
            borderLeftWidth : true,
            borderRight : true,
            borderRightColor : true,
            borderRightStyle : true,
            borderRightWidth : true,
            borderSpacing : true,
            borderStyle : true,
            borderTop : true,
            borderTopColor : true,
            borderTopStyle : true,
            borderTopWidth : true,
            borderWidth : true,
            bottom : true,
            captionSide : true,
            clear : true,
            clip : true,
            color : true,
            content  : true,
            counterIncrement  : true,
            counterReset  : true,
            cssFloat : true,
            cursor : true,
            direction : true,
            display : true,
            emptyCells : true,
            "float" : true,
            font : true,
            fontFamily : true,
            fontSize : true,
            fontSizeAdjust  : true,
            fontStretch  : true,
            fontStyle : true,
            fontVariant : true,
            fontWeight : true,
            height : true,
            left : true,
            letterSpacing : true,
            lineHeight : true,
            lineHeight : true,
            listStyle : true,
            listStyleImage : true,
            listStylePosition : true,
            listStyleType : true,
            margin  : true,
            marginBottom  : true,
            marginLeft  : true,
            marginRight  : true,
            marginTop  : true,
            markerOffset : true,
            maxHeight : true,
            maxWidth : true,
            minHeight : true,
            minWidth : true,
            opacity : true,
            outline  : true,
            outlineColor  : true,
            outlineStyle  : true,
            outlineWidth  : true,
            overflow : true,
            padding : true,
            paddingBottom : true,
            paddingLeft : true,
            paddingRight : true,
            paddingTop : true,
            position : true,
            position : true,
            quotes  : true,
            right : true,
            tableLayout : true,
            textAlign : true,
            textDecoration : true,
            textIndent : true,
            textShadow : true,
            textTransform : true,
            top : true,
            unicodeBidi : true,
            verticalAlign : true,
            visibility : true,
            whiteSpace : true,
            width : true,
            wordSpacing : true,
            zIndex : true,

            // new CSS3 properties:  http://meiert.com/en/indices/css-properties/
            alignmentAdjust : true,
            alignmentBaseline : true,
            animation : true,
            animationDelay : true,
            animationDirection : true,
            animationDuration : true,
            animationIterationCount : true,
            animationName : true,
            animationPlayState : true,
            animationTimingFunction : true,
            appearance : true,
            backfaceVisibility : true,
            backgroundOrigin : true,
            backgroundSize : true,
            baselineShift : true,
            binding : true,
            bleed : true,
            bookmarkLabel : true,
            bookmarkLevel : true,
            bookmarkState : true,
            bookmarkTarget : true,
            borderBottomLeftRadius : true,
            borderBottomRightRadius : true,
            borderImage : true,
            borderImageOutset : true,
            borderImageRepeat : true,
            borderImageSlice : true,
            borderImageSource : true,
            borderImageWidth : true,
            borderRadius : true,
            borderTopLeftRadius : true,
            borderTopRightRadius : true,
            boxDecorationBreak : true,
            boxShadow : true,
            boxSizing : true,
            breakAfter : true,
            breakBefore : true,
            breakInside : true,
            colorProfile : true,
            columnCount : true,
            columnFill : true,
            columnGap : true,
            columnRule : true,
            columnRuleColor : true,
            columnRuleStyle : true,
            columnRuleWidth : true,
            columnSpan : true,
            columnWidth : true,
            columns : true,
            dominantBaseline : true,
            dropInitialAfterAdjust : true,
            dropInitialAfterAlign : true,
            dropInitialBeforeAdjust : true,
            dropInitialBeforeAlign : true,
            dropInitialSize : true,
            dropInitialValue : true,
            elevation : true,
            fit : true,
            fitPosition : true,
            flexAlign : true,
            flexFlow : true,
            flexLinePack : true,
            flexOrder : true,
            flexPack : true,
            floatOffset : true,
            gridColumns : true,
            gridRows : true,
            hangingPunctuation : true,
            hyphenateAfter : true,
            hyphenateBefore : true,
            hyphenateCharacter : true,
            hyphenateLines : true,
            hyphenateResource : true,
            hyphens : true,
            icon : true,
            imageOrientation : true,
            imageRendering : true,
            imageResolution : true,
            inlineBoxAlign : true,
            lineBreak : true,
            lineStacking : true,
            lineStackingRuby : true,
            lineStackingShift : true,
            lineStackingStrategy : true,
            marqueeDirection : true,
            marqueeLoop : true,
            marqueePlayCount : true,
            marqueeSpeed : true,
            marqueeStyle : true,
            moveTo : true,
            navDown : true,
            navIndex : true,
            navLeft : true,
            navRight : true,
            navUp : true,
            order : true,
            outlineOffset : true,
            overflowStyle : true,
            overflowWrap : true,
            overflowX : true,
            overflowY : true,
            page : true,
            pagePolicy : true,
            perspective : true,
            perspectiveOrigin : true,
            phonemes : true,
            pitch : true,
            pitchRange : true,
            playDuring : true,
            presentationLevel : true,
            punctuationTrim : true,
            renderingIntent : true,
            resize : true,
            rest : true,
            restAfter : true,
            restBefore : true,
            richness : true,
            rotation : true,
            rotationPoint : true,
            rubyAlign : true,
            rubyOverhang : true,
            rubyPosition : true,
            rubySpan : true,
            speak : true,
            speakHeader : true,
            speakNumeral : true,
            speakPunctuation : true,
            speechRate : true,
            stress : true,
            stringSet : true,
            tabSize : true,
            // target : true,
            targetName : true,
            targetNew : true,
            targetPosition : true,
            textAlignLast : true,
            textDecorationColor : true,
            textDecorationLine : true,
            textDecorationSkip : true,
            textDecorationStyle : true,
            textEmphasis : true,
            textEmphasisColor : true,
            textEmphasisPosition : true,
            textEmphasisStyle : true,
            textHeight : true,
            textJustify : true,
            textOutline : true,
            textUnderlinePosition : true,
            textWrap : true,
            transform : true,
            transformOrigin : true,
            transformStyle : true,
            transition : true,
            transitionDelay : true,
            transitionDuration : true,
            transitionProperty : true,
            transitionTimingFunction : true,
            voiceBalance : true,
            voiceDuration : true,
            voiceFamily : true,
            voicePitch : true,
            voicePitchRange : true,
            voiceRate : true,
            voiceStress : true,
            voiceVolume : true,
            volume : true,
            widows : true,
            wordBreak : true,
            wordWrap : true
        },

        styleDomPropertiesLowercase = {
            background : true,
            backgroundattachment : true,
            backgroundcolor : true,
            backgroundimage : true,
            backgroundposition : true,
            backgroundrepeat : true,
            border : true,
            borderbottom : true,
            borderbottomcolor : true,
            borderbottomstyle : true,
            borderbottomwidth : true,
            bordercollapse : true,
            bordercolor : true,
            borderleft : true,
            borderleftcolor : true,
            borderleftstyle : true,
            borderleftwidth : true,
            borderright : true,
            borderrightcolor : true,
            borderrightstyle : true,
            borderrightwidth : true,
            borderspacing : true,
            borderstyle : true,
            bordertop : true,
            bordertopcolor : true,
            bordertopstyle : true,
            bordertopwidth : true,
            borderwidth : true,
            bottom : true,
            captionside : true,
            clear : true,
            clip : true,
            color : true,
            content  : true,
            counterincrement  : true,
            counterreset  : true,
            cssfloat : true,
            cursor : true,
            direction : true,
            display : true,
            emptycells : true,
            // "float" : true,
            font : true,
            fontfamily : true,
            fontsize : true,
            fontsizeadjust  : true,
            fontstretch  : true,
            fontstyle : true,
            fontvariant : true,
            fontweight : true,
            height : true,
            left : true,
            letterspacing : true,
            lineheight : true,
            lineheight : true,
            liststyle : true,
            liststyleimage : true,
            liststyleposition : true,
            liststyletype : true,
            margin  : true,
            marginbottom  : true,
            marginleft  : true,
            marginright  : true,
            margintop  : true,
            markeroffset : true,
            maxheight : true,
            maxwidth : true,
            minheight : true,
            minwidth : true,
            opacity : true,
            outline  : true,
            outlinecolor  : true,
            outlinestyle  : true,
            outlinewidth  : true,
            overflow : true,
            padding : true,
            paddingbottom : true,
            paddingleft : true,
            paddingright : true,
            paddingtop : true,
            position : true,
            position : true,
            quotes  : true,
            right : true,
            tablelayout : true,
            textalign : true,
            textdecoration : true,
            textindent : true,
            textshadow : true,
            texttransform : true,
            top : true,
            unicodebidi : true,
            verticalalign : true,
            visibility : true,
            whitespace : true,
            width : true,
            wordspacing : true,
            zindex : true,

            // new CSS3 properties:  http://meiert.com/en/indices/css-properties/
            alignmentadjust : true,
            alignmentbaseline : true,
            animation : true,
            animationdelay : true,
            animationdirection : true,
            animationduration : true,
            animationiterationcount : true,
            animationname : true,
            animationplaystate : true,
            animationtimingfunction : true,
            appearance : true,
            backfacevisibility : true,
            backgroundorigin : true,
            backgroundsize : true,
            baselineshift : true,
            binding : true,
            bleed : true,
            bookmarklabel : true,
            bookmarklevel : true,
            bookmarkstate : true,
            bookmarktarget : true,
            borderbottomleftradius : true,
            borderbottomrightradius : true,
            borderimage : true,
            borderimageoutset : true,
            borderimagerepeat : true,
            borderimageslice : true,
            borderimagesource : true,
            borderimagewidth : true,
            borderradius : true,
            bordertopleftradius : true,
            bordertoprightradius : true,
            boxdecorationbreak : true,
            boxshadow : true,
            boxsizing : true,
            breakafter : true,
            breakbefore : true,
            breakinside : true,
            colorprofile : true,
            columncount : true,
            columnfill : true,
            columngap : true,
            columnrule : true,
            columnrulecolor : true,
            columnrulestyle : true,
            columnrulewidth : true,
            columnspan : true,
            columnwidth : true,
            columns : true,
            dominantbaseline : true,
            dropinitialafteradjust : true,
            dropinitialafteralign : true,
            dropinitialbeforeadjust : true,
            dropinitialbeforealign : true,
            dropinitialsize : true,
            dropinitialvalue : true,
            elevation : true,
            fit : true,
            fitposition : true,
            flexalign : true,
            flexflow : true,
            flexlinepack : true,
            flexorder : true,
            flexpack : true,
            floatoffset : true,
            gridcolumns : true,
            gridrows : true,
            hangingpunctuation : true,
            hyphenateafter : true,
            hyphenatebefore : true,
            hyphenatecharacter : true,
            hyphenatelines : true,
            hyphenateresource : true,
            hyphens : true,
            icon : true,
            imageorientation : true,
            imagerendering : true,
            imageresolution : true,
            inlineboxalign : true,
            linebreak : true,
            linestacking : true,
            linestackingruby : true,
            linestackingshift : true,
            linestackingstrategy : true,
            marqueedirection : true,
            marqueeloop : true,
            marqueeplaycount : true,
            marqueespeed : true,
            marqueestyle : true,
            moveto : true,
            navdown : true,
            navindex : true,
            navleft : true,
            navright : true,
            navup : true,
            order : true,
            outlineoffset : true,
            overflowstyle : true,
            overflowwrap : true,
            overflowx : true,
            overflowy : true,
            page : true,
            pagepolicy : true,
            perspective : true,
            perspectiveorigin : true,
            phonemes : true,
            pitch : true,
            pitchrange : true,
            playduring : true,
            presentationlevel : true,
            punctuationtrim : true,
            renderingintent : true,
            resize : true,
            rest : true,
            restafter : true,
            restbefore : true,
            richness : true,
            rotation : true,
            rotationpoint : true,
            rubyalign : true,
            rubyoverhang : true,
            rubyposition : true,
            rubyspan : true,
            speak : true,
            speakheader : true,
            speaknumeral : true,
            speakpunctuation : true,
            speechrate : true,
            stress : true,
            stringset : true,
            tabsize : true,
            // target : true,
            targetname : true,
            targetnew : true,
            targetposition : true,
            textalignlast : true,
            textdecorationcolor : true,
            textdecorationline : true,
            textdecorationskip : true,
            textdecorationstyle : true,
            textemphasis : true,
            textemphasiscolor : true,
            textemphasisposition : true,
            textemphasisstyle : true,
            textheight : true,
            textjustify : true,
            textoutline : true,
            textunderlineposition : true,
            textwrap : true,
            transform : true,
            transformorigin : true,
            transformstyle : true,
            transition : true,
            transitiondelay : true,
            transitionduration : true,
            transitionproperty : true,
            transitiontimingfunction : true,
            voicebalance : true,
            voiceduration : true,
            voicefamily : true,
            voicepitch : true,
            voicepitchrange : true,
            voicerate : true,
            voicestress : true,
            voicevolume : true,
            volume : true,
            widows : true,
            wordbreak : true,
            wordwrap : true
        };

    function F() {}

    if (typeof Object.beget !== 'function') {
        Object.beget = function (o) {
            F.prototype = o;
            return new F();
        };
    }
    Object.prototype.union = function (o) {
        var n;
        for (n in o) if (o.hasOwnProperty(n)) {
            this[n] = o[n];
        }
    };

    String.prototype.entityify = function () {
        return this.
            replace(/&/g, '&amp;').
            replace(/</g, '&lt;').
            replace(/>/g, '&gt;');
    };

    String.prototype.isAlpha = function () {
        return (this >= 'a' && this <= 'z\uffff') ||
            (this >= 'A' && this <= 'Z\uffff');
    };


    String.prototype.isDigit = function () {
        return (this >= '0' && this <= '9');
    };


    String.prototype.supplant = function (o) {
        return this.replace(/\{([^{}]*)\}/g, function (a, b) {
            var r = o[b];
            return typeof r === 'string' || typeof r === 'number' ? r : a;
        });
    };

    String.prototype.name = function () {

// If the string looks like an identifier, then we can return it as is.
// If the string contains no control characters, no quote characters, and no
// backslash characters, then we can simply slap some quotes around it.
// Otherwise we must also replace the offending characters with safe
// sequences.


        if (ix.test(this)) {
            return this;
        }
        if (/[&<"\/\\\x00-\x1f]/.test(this)) {
            return '"' + this.replace(/[&<"\/\\\x00-\x1f]/g, function (a) {
                var c = escapes[a];
                if (c) {
                    return c;
                }
                c = a.charCodeAt();
                return '\\u00' +
                    Math.floor(c / 16).toString(16) +
                    (c % 16).toString(16);
            }) + '"';
        }
        return '"' + this + '"';
    };


    function populateGlobals() {
        if (option.adsafe) {
            globals.union(adsafe_allow);
        } else {
            if (option.rhino) {
                globals.union(rhino);
            }
            if (option.browser || option.sidebar) {
                globals.union(browser);
            }
            if (option.sidebar) {
                globals.union(sidebar);
            }
            if (option.widget) {
                globals.union(widget);
            }

            // *** added by Marty
            if (option.prototype) {
                globals.union(prototype);
            }
            if (option.jquery) {
                globals.union(jquery);
            }
            if (option.cse154) {
                globals.union(cse154);
            }
            if (option.underscore) {
                globals.union(underscore);
            }
        }
    }


// Produce an error warning.

    function quit(m, l, ch) {
        throw {
            name: 'JSLintError',
            line: l,
            character: ch,
            message: m + " (" + Math.floor((l / lines.length) * 100) +
                    "% scanned)."
        };
    }

    // *** Marty
    // adds a 'notice' message; like an error but just an FYI, might not be bad
    function notice(m, isHTML) {
        var t = nexttoken;
        if (t.id === '(end)') {
            t = token;
        }
        var l = t.line || 0;
        var ch = t.from || 0;
        var w = {
            id: '(notice)',
            raw: m,
            evidence: lines[l] || '',
            line: l,
            character: ch,
            "isHTML": isHTML
        };
        w.reason = m.supplant(w);
        JSLINT.notices.push(w);
    }

    function warning(m, t, a, b, c, d, isHTML) {
        var ch, l, w;
        t = t || nexttoken;
        if (t.id === '(end)') {
            t = token;
        }
        l = t.line || 0;
        ch = t.from || 0;
        w = {
            id: '(error)',
            raw: m,
            evidence: lines[l] || '',
            line: l,
            character: ch,
            a: a,
            b: b,
            c: c,
            d: d,
            "isHTML": isHTML           // true if error message contains HTML
        };
        w.reason = m.supplant(w);
        JSLINT.errors.push(w);
        if (option.passfail) {
            quit('Stopping. ', l, ch);
        }
        warnings += 1;
        if (warnings === 50) {
            quit("Too many errors.", l, ch);
        }
        return w;
    }

    function warningAt(m, l, ch, a, b, c, d) {
        return warning(m, {
            line: l,
            from: ch
        }, a, b, c, d);
    }

    function error(m, t, a, b, c, d) {
        var w = warning(m, t, a, b, c, d);
        quit("Stopping, unable to continue.", w.line, w.character);
    }

    function errorAt(m, l, ch, a, b, c, d) {
        return error(m, {
            line: l,
            from: ch
        }, a, b, c, d);
    }



// lexical analysis

    var lex = function () {
        var character, from, line, s;

// Private lex methods

        function nextLine() {
            var at;
            line += 1;
            if (line >= lines.length) {
                return false;
            }
            character = 0;
            s = lines[line].replace(/\t/g, '    ');
            at = s.search(cx);
            if (at >= 0) {
                warningAt("Unsafe character.", line, at);
            }
            return true;
        }

// Produce a token object.  The token inherits from a syntax symbol.

        function it(type, value) {
            var i, t;
            if (type === '(punctuator)' ||
                    (type === '(identifier)' && syntax.hasOwnProperty(value))) {
                t = syntax[value];

// Mozilla bug workaround.

                if (!t.id) {
                    t = syntax[type];
                }
            } else {
                t = syntax[type];
            }
            t = Object.beget(t);
            if (type === '(string)') {
                if (jx.test(value)) {
                    warningAt("Script URL.", line, from);
                }
            } else if (type === '(identifier)') {
                if (option.nomen && value.charAt(0) === '_') {
                    warningAt("Unexpected '_' in '{a}'.", line, from, value);
                }
            }
            t.value = value;
            t.line = line;
            t.character = character;
            t.from = from;
            i = t.id;
            if (i !== '(endline)') {
                prereg = i &&
                        (('(,=:[!&|?{};'.indexOf(i.charAt(i.length - 1)) >= 0) ||
                        i === 'return');
            }
            return t;
        }

// Public lex methods

        return {
            init: function (source) {
                if (typeof source === 'string') {
                    lines = source.
                        replace(/\r\n/g, '\n').
                        replace(/\r/g, '\n').
                        split('\n');
                } else {
                    lines = source;
                }
                line = -1;
                nextLine();
                from = 0;
            },

// token -- this is called by advance to get the next token.

            token: function () {
                var b, c, captures, d, depth, high, i, l, low, q, t;

                function match(x) {
                    var r = x.exec(s), r1;
                    if (r) {
                        l = r[0].length;
                        r1 = r[1];
                        c = r1.charAt(0);
                        s = s.substr(l);
                        character += l;
                        from = character - r1.length;
                        return r1;
                    }
                }

                function string(x) {
                    var c, j, r = '';

                    if (jsonmode && x !== '"') {
                        warningAt("Strings must use doublequote.",
                                line, character);
                    }

                    if (xmode === x || xmode === 'string') {
                        return it('(punctuator)', x);
                    }

                    function esc(n) {
                        var i = parseInt(s.substr(j + 1, n), 16);
                        j += n;
                        if (i >= 32 && i <= 127 &&
                                i !== 34 && i !== 92 && i !== 39) {
                            warningAt("Unnecessary escapement.", line, character);
                        }
                        character += n;
                        c = String.fromCharCode(i);
                    }
                    j = 0;
                    for (;;) {
                        while (j >= s.length) {
                            j = 0;
                            if (xmode !== 'xml' || !nextLine()) {
                                errorAt("Unclosed string.", line, from);
                            }
                        }
                        c = s.charAt(j);
                        if (c === x) {
                            character += 1;
                            s = s.substr(j + 1);
                            return it('(string)', r, x);
                        }
                        if (c < ' ') {
                            if (c === '\n' || c === '\r') {
                                break;
                            }
                            warningAt("Control character in string: {a}.",
                                    line, character + j, s.slice(0, j));
                        } else if (c === '<') {
                            if (option.adsafe && xmode === 'xml') {
                                warningAt("ADsafe string violation.",
                                        line, character + j);
                            } else if (s.charAt(j + 1) === '/' && ((xmode && xmode !== 'CDATA') || option.adsafe)) {
                                warningAt("Expected '<\\/' and instead saw '</'.", line, character);
                            }
                        } else if (c === '\\') {
                            if (option.adsafe && xmode === 'xml') {
                                warningAt("ADsafe string violation.",
                                        line, character + j);
                            }
                            j += 1;
                            character += 1;
                            c = s.charAt(j);
                            switch (c) {
                            case '\\':
                            case '\'':
                            case '"':
                            case '/':
                                break;
                            case 'b':
                                c = '\b';
                                break;
                            case 'f':
                                c = '\f';
                                break;
                            case 'n':
                                c = '\n';
                                break;
                            case 'r':
                                c = '\r';
                                break;
                            case 't':
                                c = '\t';
                                break;
                            case 'u':
                                esc(4);
                                break;
                            case 'v':
                                c = '\v';
                                break;
                            case 'x':
                                if (jsonmode) {
                                    warningAt("Avoid \\x-.", line, character);
                                }
                                esc(2);
                                break;
                            default:
                                warningAt("Bad escapement.", line, character);
                            }
                        }
                        r += c;
                        character += 1;
                        j += 1;
                    }
                }

                for (;;) {
                    if (!s) {
                        return it(nextLine() ? '(endline)' : '(end)', '');
                    }
                    t = match(tx);
                    if (!t) {
                        t = '';
                        c = '';
                        while (s && s < '!') {
                            s = s.substr(1);
                        }
                        if (s) {
                            errorAt("Unexpected '{a}'.",
                                    line, character, s.substr(0, 1));
                        }
                    }

//      identifier

                    if (c.isAlpha() || c === '_' || c === '$') {
                        return it('(identifier)', t);
                    }

//      number

                    if (c.isDigit()) {
                        if (!isFinite(Number(t))) {
                            warningAt("Bad number '{a}'.",
                                line, character, t);
                        }
                        if (s.substr(0, 1).isAlpha()) {
                            warningAt("Missing space after '{a}'.",
                                    line, character, t);
                        }
                        if (c === '0') {
                            d = t.substr(1, 1);
                            if (d.isDigit()) {
                                if (token.id !== '.') {
                                    warningAt("Don't use extra leading zeros '{a}'.",
                                        line, character, t);
                                }
                            } else if (jsonmode && (d === 'x' || d === 'X')) {
                                warningAt("Avoid 0x-. '{a}'.",
                                        line, character, t);
                            }
                        }
                        if (t.substr(t.length - 1) === '.') {
                            warningAt(
    "A trailing decimal point can be confused with a dot '{a}'.",
                                    line, character, t);
                        }
                        return it('(number)', t);
                    }

//      string

                    switch (t) {
                    case '"':
                    case "'":
                        return string(t);

//      // comment

                    case '//':
                        if (src || (xmode && !(xmode === 'script' || xmode === 'CDATA'))) {
                            warningAt("Unexpected comment.", line, character);
                        }
                        if (option.adsafe && ax.test(s)) {
                            warningAt("ADsafe comment violation.", line, character);
                        }
                        s = '';
                        break;

//      /* comment

                    case '/*':
                        if (src || (xmode && !(xmode === 'script' || xmode === 'CDATA'))) {
                            warningAt("Unexpected comment.", line, character);
                        }
                        if (option.adsafe && ax.test(s)) {
                            warningAt("ADsafe comment violation.", line, character);
                        }
                        for (;;) {
                            i = s.search(lx);
                            if (i >= 0) {
                                break;
                            }
                            if (!nextLine()) {
                                errorAt("Unclosed comment.", line, character);
                            } else {
                                if (option.adsafe && ax.test(s)) {
                                    warningAt("ADsafe comment violation.", line, character);
                                }
                            }
                        }
                        character += i + 2;
                        if (s.substr(i, 1) === '/') {
                            errorAt("Nested comment.", line, character);
                        }
                        s = s.substr(i + 2);
                        break;

//      /*global /*extern /*members /*jslint */

                    case '/*global':
                    case '/*extern':
                    case '/*members':
                    case '/*member':
                    case '/*jslint':
                    case '*/':
                        return {
                            value: t,
                            type: 'special',
                            line: line,
                            character: character,
                            from: from
                        };

                    case '':
                        break;
//      /
                    case '/':
                        if (prereg) {
                            depth = 0;
                            captures = 0;
                            l = 0;
                            for (;;) {
                                b = true;
                                c = s.charAt(l);
                                l += 1;
                                switch (c) {
                                case '':
                                    errorAt("Unclosed regular expression.", line, from);
                                    return;
                                case '/':
                                    if (depth > 0) {
                                        warningAt("Unescaped '{a}'.", line, from + l, '/');
                                    }
                                    c = s.substr(0, l - 1);
                                    q = {
                                        g: true,
                                        i: true,
                                        m: true
                                    };
                                    while (q[s.charAt(l)] === true) {
                                        q[s.charAt(l)] = false;
                                        l += 1;
                                    }
                                    character += l;
                                    s = s.substr(l);
                                    return it('(regex)', c);
                                case '\\':
                                    l += 1;
                                    break;
                                case '(':
                                    depth += 1;
                                    b = false;
                                    if (s.charAt(l) === '?') {
                                        l += 1;
                                        switch (s.charAt(l)) {
                                        case ':':
                                        case '=':
                                        case '!':
                                            l += 1;
                                            break;
                                        default:
                                            warningAt("Expected '{a}' and instead saw '{b}'.", line, from + l, ':', s.charAt(l));
                                        }
                                    } else {
                                        captures += 1;
                                    }
                                    break;
                                case ')':
                                    if (depth === 0) {
                                        warningAt("Unescaped '{a}'.", line, from + l, ')');
                                    } else {
                                        depth -= 1;
                                    }
                                    break;
                                case ' ':
                                    q = 1;
                                    while (s.charAt(l) === ' ') {
                                        l += 1;
                                        q += 1;
                                    }
                                    if (q > 1) {
                                        warningAt("Spaces are hard to count. Use {{a}}.", line, from + l, q);
                                    }
                                    break;
                                case '[':
                                    if (s.charAt(l) === '^') {
                                        l += 1;
                                    }
                                    q = false;
klass:                              for (;;) {
                                        c = s.charAt(l);
                                        l += 1;
                                        switch (c) {
                                        case '[':
                                        case '^':
                                            warningAt("Unescaped '{a}'.", line, from + l, c);
                                            q = true;
                                            break;
                                        case '-':
                                            if (q) {
                                                q = false;
                                            } else {
                                                warningAt("Unescaped '{a}'.", line, from + l, '-');
                                                q = true;
                                            }
                                            break;
                                        case ']':
                                            if (!q) {
                                                warningAt("Unescaped '{a}'.", line, from + l - 1, '-');
                                            }
                                            break klass;
                                        case '\\':
                                            l += 1;
                                            q = true;
                                            break;
                                        default:
                                            q = true;
                                        }
                                    }
                                    break;
                                case '.':
                                    if (option.regexp) {
                                        warningAt("Unexpected '{a}'.", line, from + l, c);
                                    }
                                    break;
                                case ']':
                                case '?':
                                case '{':
                                case '}':
                                case '+':
                                case '*':
                                    warningAt("Unescaped '{a}'.", line, from + l, c);
                                    break;
                                }
                                if (b) {
                                    switch (s.charAt(l)) {
                                    case '?':
                                    case '+':
                                    case '*':
                                        l += 1;
                                        if (s.charAt(l) === '?') {
                                            l += 1;
                                        }
                                        break;
                                    case '{':
                                        l += 1;
                                        c = s.charAt(l);
                                        if (c < '0' || c > '9') {
                                            warningAt("Expected a number and instead saw '{a}'.", line, from + l, c);
                                        }
                                        l += 1;
                                        low = +c;
                                        for (;;) {
                                            c = s.charAt(l);
                                            if (c < '0' || c > '9') {
                                                break;
                                            }
                                            l += 1;
                                            low = +c + (low * 10);
                                        }
                                        high = low;
                                        if (c === ',') {
                                            l += 1;
                                            high = Infinity;
                                            c = s.charAt(l);
                                            if (c >= '0' && c <= '9') {
                                                l += 1;
                                                high = +c;
                                                for (;;) {
                                                    c = s.charAt(l);
                                                    if (c < '0' || c > '9') {
                                                        break;
                                                    }
                                                    l += 1;
                                                    high = +c + (high * 10);
                                                }
                                            }
                                        }
                                        if (s.charAt(l) !== '}') {
                                            warningAt("Expected '{a}' and instead saw '{b}'.", line, from + l, '}', c);
                                        } else {
                                            l += 1;
                                        }
                                        if (s.charAt(l) === '?') {
                                            l += 1;
                                        }
                                        if (low > high) {
                                            warningAt("'{a}' should not be greater than '{b}'.", line, from + l, low, high);
                                        }
                                    }
                                }
                            }
                            c = s.substr(0, l - 1);
                            character += l;
                            s = s.substr(l);
                            return it('(regex)', c);
                        }
                        return it('(punctuator)', t);

//      punctuator

                    default:
                        return it('(punctuator)', t);
                    }
                }
            },

// skip -- skip past the next occurrence of a particular string.
// If the argument is empty, skip to just before the next '<' character.
// This is used to ignore HTML content. Return false if it isn't found.

            skip: function (p) {
                var i, t = p;
                if (nexttoken.id) {
                    if (!t) {
                        t = '';
                        if (nexttoken.id.substr(0, 1) === '<') {
                            lookahead.push(nexttoken);
                            return true;
                        }
                    } else if (nexttoken.id.indexOf(t) >= 0) {
                        return true;
                    }
                }
                token = nexttoken;
                nexttoken = syntax['(end)'];
                for (;;) {
                    i = s.indexOf(t || '<');
                    if (i >= 0) {
                        character += i + t.length;
                        s = s.substr(i + t.length);
                        return true;
                    }
                    if (!nextLine()) {
                        break;
                    }
                }
                return false;
            }
        };
    }();


    function addlabel(t, type) {

        if (t === 'hasOwnProperty') {
            error("'hasOwnProperty' is a really bad name.");
        }
        if (option.adsafe && funct['(global)']) {
            warning('ADsafe global: ' + t + '.', token);
        }

// Define t in the current function in the current scope.

        if (funct.hasOwnProperty(t)) {
            // *** modified by Marty to turn off warnings about
            // redefining local variables such as var i.
            // "'{a}' is already defined.",
            if (funct[t] === true) {
                warning("'{a}' was used before it was defined.", nexttoken, t);
            }
        }
        funct[t] = type;
        if (type === 'label') {
            scope[t] = funct;
        } else if (funct['(global)']) {
            global[t] = funct;
            if (implied.hasOwnProperty(t)) {
                warning("'{a}' was used before it was defined.", nexttoken, t);
                delete implied[t];
            }
        } else {
            funct['(scope)'][t] = funct;
        }
    }


    function doOption() {
        var b, obj, filter, o = nexttoken.value, t, v;
        switch (o) {
        case '*/':
            error("Unbegun comment.");
            break;
        case '/*global':
        case '/*extern':
            if (option.adsafe) {
                warning("ADsafe restriction.");
            }
            obj = globals;
            break;
        case '/*members':
        case '/*member':
            o = '/*members';
            if (!membersOnly) {
                membersOnly = {};
            }
            obj = membersOnly;
            break;
        case '/*jslint':
            if (option.adsafe) {
                warning("ADsafe restriction.");
            }
            obj = option;
            filter = allOptions;
        }
        for (;;) {
            t = lex.token();
            if (t.id === ',') {
                t = lex.token();
            }
            while (t.id === '(endline)') {
                t = lex.token();
            }
            if (t.type === 'special' && t.value === '*/') {
                break;
            }
            if (t.type !== '(string)' && t.type !== '(identifier)' &&
                    o !== '/*members') {
                error("Bad option.", t);
            }
            if (filter) {
                if (filter[t.value] !== true) {
                    error("Bad option.", t);
                }
                v = lex.token();
                if (v.id !== ':') {
                    error("Expected '{a}' and instead saw '{b}'.",
                            t, ':', t.value);
                }
                v = lex.token();
                if (v.value === 'true') {
                    b = true;
                } else if (v.value === 'false') {
                    b = false;
                } else {
                    error("Expected '{a}' and instead saw '{b}'.",
                            t, 'true', t.value);
                }
            } else {
                b = true;
            }
            obj[t.value] = b;
        }
        if (filter) {
            populateGlobals();
        }
    }


// We need a peek function. If it has an argument, it peeks that much farther
// ahead. It is used to distinguish
//     for ( var i in ..
// from
//     for ( var i = ..

    function peek(p) {
        var i = p || 0, j = 0, t;

        while (j <= i) {
            t = lookahead[j];
            if (!t) {
                t = lookahead[j] = lex.token();
            }
            j += 1;
        }
        return t;
    }


    var badbreak = {
        ')': true,
        ']': true,
        '++': true,
        '--': true
    };

// Produce the next token. It looks for programming errors.

    function advance(id, t) {
        var l;
        switch (token.id) {
        case '(number)':
            if (nexttoken.id === '.') {
                warning(
"A dot following a number can be confused with a decimal point.", token);
            }
            break;
        case '-':
            if (nexttoken.id === '-' || nexttoken.id === '--') {
                warning("Confusing minusses.");
            }
            break;
        case '+':
            if (nexttoken.id === '+' || nexttoken.id === '++') {
                warning("Confusing plusses.");
            }
            break;
        }
        if (token.type === '(string)' || token.identifier) {
            anonname = token.value;
        }

        if (id && nexttoken.id !== id) {
            if (t) {
                if (nexttoken.id === '(end)') {
                    warning("Unmatched '{a}'.", t, t.id);
                } else {
                    warning("Expected '{a}' to match '{b}' from line {c} and instead saw '{d}'.",
                            nexttoken, id, t.id, t.line + 1, nexttoken.value);
                }
            } else {
                warning("Expected '{a}' and instead saw '{b}'.",
                        nexttoken, id, nexttoken.value);
            }
        }
        prevtoken = token;
        token = nexttoken;
        for (;;) {
            nexttoken = lookahead.shift() || lex.token();
            if (nexttoken.type === 'special') {
                doOption();
            } else {
                if (nexttoken.id === '<![') {
                    if (option.adsafe) {
                        error("ADsafe violation.", nexttoken);
                    }
                    if (xtype === 'html') {
                        error("Unexpected '{a}'.", nexttoken, '<![');
                    }
                    if (xmode === 'script') {
                        nexttoken = lex.token();
                        if (nexttoken.value !== 'CDATA') {
                            error("Missing '{a}'.", nexttoken, 'CDATA');
                        }
                        nexttoken = lex.token();
                        if (nexttoken.id !== '[') {
                            error("Missing '{a}'.", nexttoken, '[');
                        }
                        xmode = 'CDATA';
                    } else if (xmode === 'xml') {
                        lex.skip(']]>');
                    } else {
                        error("Unexpected '{a}'.", nexttoken, '<![');
                    }
                } else if (nexttoken.id === ']]>') {
                    if (xmode === 'CDATA') {
                        xmode = 'script';
                    } else {
                        error("Unexpected '{a}'.", nexttoken, ']]>');
                    }
                } else if (nexttoken.id !== '(endline)') {
                    break;
                }
                if (xmode === '"' || xmode === "'") {
                    error("Missing '{a}'.", token, xmode);
                }
                l = !xmode && !option.laxbreak &&
                    (token.type === '(string)' || token.type === '(number)' ||
                    token.type === '(identifier)' || badbreak[token.id]);
            }
        }
        if (l) {
            switch (nexttoken.id) {
            case '{':
            case '}':
            case ']':
                break;
	    case '.':
		if (allOptions.jquery) {
			break;
		}
            case ')':
                switch (token.id) {
                case ')':
                case '}':
                case ']':
                    break;
		case '.':
			if(allOptions.jquery) {
				break;
			}
                default:
                    warning("Bad line break at '{a}'.  (If you are trying to split a long expression across multiple lines, insert the line break just after an operator, not just before the operator.)", token, ')');
                }
                break;
            default:
                warning("Bad line break at '{a}'.  (If you are trying to split a long expression across multiple lines, insert the line break just after an operator, not just before the operator.)", token, token.value);
            }
        }
        if (xtype === 'widget' && xmode === 'script' && nexttoken.id) {
            l = nexttoken.id.charAt(0);
            if (l === '<' || l === '&') {
                nexttoken.nud = nexttoken.led = null;
                nexttoken.lbp = 0;
                nexttoken.reach = true;
            }
        }
    }


// This is the heart of JSLINT, the Pratt parser. In addition to parsing, it
// is looking for ad hoc lint patterns. We add to Pratt's model .fud, which is
// like nud except that it is only used on the first token of a statement.
// Having .fud makes it much easier to define JavaScript. I retained Pratt's
// nomenclature.

// .nud     Null denotation
// .fud     First null denotation
// .led     Left denotation
//  lbp     Left binding power
//  rbp     Right binding power

// They are key to the parsing method called Top Down Operator Precedence.

    function parse(rbp, initial) {
        var left, o, p;
        if (nexttoken.id === '(end)') {
            error("Unexpected early end of program.", token);
        }
        advance();
        if (option.adsafe) {
            p = peek(0);
            if (adsafe_allow[token.value] === true ||
                    standard[token.value] === true) {
                if (nexttoken.id !== '(' &&
                        (nexttoken.id !== '.' || !p.identifier ||
                        (peek(1).id !== '(' &&
                        standard_member[p.value] !== true))) {
                    warning('ADsafe violation.', token);
                }
            }
        }
        if (initial) {
            anonname = 'anonymous';
            funct['(verb)'] = token.value;
        }
        if (initial === true && token.fud) {
            left = token.fud();
        } else {
            if (token.nud) {
                o = token.exps;
                left = token.nud();
            } else {
                if (nexttoken.type === '(number)' && token.id === '.') {
                    warning("A leading decimal point can be confused with a dot: '.{a}'.",
                            token, nexttoken.value);
                    advance();
                    return token;
                } else {
                    error("Expected an identifier and instead saw '{a}'.",
                            token, token.id);
                }
            }
            while (rbp < nexttoken.lbp) {
                o = nexttoken.exps;
                advance();
                if (token.led) {
                    left = token.led(left);
                } else {
                    error("Expected an operator and instead saw '{a}'.",
                        token, token.id);
                }
            }
            if (initial && !o) {
                // *** added by Marty: ignore the special expression value "use strict"
                //     because it is used to enable strict JS syntax checking in browser.
                if (!left || left.value != "use strict") {
                    if (left.value.match(/use/i) && left.value.match(/strict/i)) {
                        warning("Improperly written 'use strict' declaration.  It should be exactly the following: \"use strict\";", token);
                    } else {
                        warning("Expected an assignment or function call and instead saw an expression.", token);
                    }
                } else if (left || left.value != "use strict") {
                    // found a 'use strict' declaration!
                    JSLINT.seenUseStrict = true;
                }
            }
        }
        if (!option.evil && left && left.value === 'eval') {
            warning("eval is evil.", left);
        }
        return left;
    }


// Functions for conformance of style.

    function adjacent(left, right) {
        left = left || token;
        right = right || nexttoken;
        if (option.white) {
            if (left.character !== right.from) {
                warning("Unexpected space after '{a}'.",
                        nexttoken, left.value);
            }
        }
    }


    function nospace(left, right) {
        left = left || token;
        right = right || nexttoken;
        if (option.white) {
            if (left.line === right.line) {
                adjacent(left, right);
            }
        }
    }


    function nonadjacent(left, right) {
        left = left || token;
        right = right || nexttoken;
        if (option.white) {
            if (left.character === right.from) {
                warning("Missing space after '{a}'.",
                        nexttoken, left.value);
            }
        }
    }

    function indentation(bias) {
        var i;
        if (option.white && nexttoken.id !== '(end)') {
            i = indent + (bias || 0);
            if (nexttoken.from !== i) {
                warning("Expected '{a}' to have an indentation of {b} instead of {c}.",
                        nexttoken, nexttoken.value, i, nexttoken.from);
            }
        }
    }

    function nolinebreak(t) {
        if (t.line !== nexttoken.line) {
            warning("Line breaking error '{a}'.", t, t.id);
        }
    }


// Parasitic constructors for making the symbols that will be inherited by
// tokens.

    function symbol(s, p) {
        var x = syntax[s];
        if (!x || typeof x !== 'object') {
            syntax[s] = x = {
                id: s,
                lbp: p,
                value: s
            };
        }
        return x;
    }


    function delim(s) {
        return symbol(s, 0);
    }


    function stmt(s, f) {
        var x = delim(s);
        x.identifier = x.reserved = true;
        x.fud = f;
        return x;
    }


    function blockstmt(s, f) {
        var x = stmt(s, f);
        x.block = true;
        return x;
    }


    function reserveName(x) {
        var c = x.id.charAt(0);
        if ((c >= 'a' && c <= 'z') || (c >= 'A' && c <= 'Z')) {
            x.identifier = x.reserved = true;
        }
        return x;
    }


    function prefix(s, f) {
        var x = symbol(s, 150);
        reserveName(x);
        x.nud = (typeof f === 'function') ? f : function () {
            if (option.plusplus && (this.id === '++' || this.id === '--')) {
                warning("Unexpected use of '{a}'.", this, this.id);
            }
            parse(150);
            return this;
        };
        return x;
    }


    function type(s, f) {
        var x = delim(s);
        x.type = s;
        x.nud = f;
        return x;
    }


    function reserve(s, f) {
        var x = type(s, f);
        x.identifier = x.reserved = true;
        return x;
    }


    function reservevar(s) {
        return reserve(s, function () {
            if (option.adsafe && this.id === 'this') {
                warning("ADsafe violation.", this);
            }
            return this;
        });
    }


    function infix(s, f, p) {
        var x = symbol(s, p);
        reserveName(x);
        x.led = (typeof f === 'function') ? f : function (left) {
            nonadjacent(prevtoken, token);
            nonadjacent(token, nexttoken);
            this.left = left;
            this.right = parse(p);
            return this;
        };
        return x;
    }


    function relation(s, f) {
        var x = symbol(s, 100);
        x.led = function (left) {
            nonadjacent(prevtoken, token);
            nonadjacent(token, nexttoken);
            var right = parse(100);
            if ((left && left.id === 'NaN') || (right && right.id === 'NaN')) {
                warning("Use the isNaN function to compare with NaN.", this);
            } else if (f) {
                f.apply(this, [left, right]);
            }
            this.left = left;
            this.right = right;
            return this;
        };
        return x;
    }


    function isPoorRelation(node) {
        // *** commented out by Marty; spurious errors on == 0 comparisons
        // return (node.type === '(number)' && !+node.value) ||
               //(node.type === '(string)' && !node.value) ||
        return node.type === 'true' ||
               node.type === 'false' ||
               node.type === 'undefined' ||
               node.type === 'null';
    }


    function assignop(s, f) {
        symbol(s, 20).exps = true;
        return infix(s, function (left) {
            var l;
            nonadjacent(prevtoken, token);
            nonadjacent(token, nexttoken);
            if (option.adsafe) {
                l = left;
                do {
                    if (adsafe_allow[l.value] === true ||
                            standard[l.value] === true) {
                        warning('ADsafe violation.', l);
                    }
                    l = l.left;
                } while (l);
            }
            if (left) {
                // *** added by Marty
                // Marty's test for style/DOM misuse
                if (option.styledom && left.right) {
                    // check for obj.styleProp rather than obj.style.styleProp
                    if (styleDomProperties[left.right] === true) {
                        if (left.left && (!left.left.right || left.left.right !== "style")) {
                            warning("It looks like you are trying to set a DOM style property here, but I believe you meant to say <code>" +
                                    (left.left.id === "function" ? "" : left.left.value) + ".style." + left.right + "</code> instead of <code>" + (left.left.id === "function" ? "" : left.left.value) + "." + left.right + "</code> ?",
                                    undefined, undefined, undefined, undefined, undefined, /* isHTML */ true);
                            var right = parse(19);
                            return left;
                        }

                        // check for assigning a style a non-string value
                        var nextIsIdentifier = nexttoken.type === "(identifier)";
                        if (nexttoken.type !== "(string)") {
                            // very subtle; calls the token parser with a priority of 19
                            // (which seems to be the priority needed to parse to the end
                            // of a statement) .. so I can examine the entire RHS
                            // of the assignment
                            var right = parse(19);

                            // used to make sure the RHS evaluates to a String
                            // *** edited by Marty to work for undefined case
                            function __isType(node, type) {
                                if (type === "undefined") {
                                    return typeof(node) === "undefined";
                                } else if (!node) {
                                    return false;
                                } else {
                                    return node.id === type ||
                                        (typeof(node.left)  !== "undefined" && node.value != "[" && __isType(node.left, type)) ||
                                        (typeof(node.right) !== "undefined" && node.value != "[" && __isType(node.right, type));
                                }
                            };

                            if (!__isType(right, "(string)")
                                    && !__isType(right, "null")
                                    && !__isType(right, "undefined")) {
                                // special case for opacity
                                if (__isType(right, "(number)")) {
                                    if (left && left.value == "." && left.right && (left.right == "opacity" || left.right == "zIndex" || left.right == "order")) {
                                        // any numbers are ok for opacity or z-index
                                        ;
                                    } else if (right.value !== "0") {
                                        warning("I believe you have tried to set a CSS style property to a value that is the wrong type.  All style properties must be set to strings such as <code>\"red\"</code> or <code>\"50px\"</code>, or set to <code>null</code>.  If you set this style property to a numeric value, it must be 0, such as to remove a border.",
                                        undefined, undefined, undefined, undefined, undefined, /* isHTML */ true);
                                    }
                                } else if (nextIsIdentifier ||
                                        (right && right.identifier) ||
                                        (right && (right.id == "." || right.value == "."))) { // && right.left && right.left.identifier) ||
                                    notice("It looks like you are setting a CSS style property to the value of another variable or property.  All style properties must be set to properly formatted strings such as <code>\"red\"</code> or <code>\"50px\"</code>, or set to <code>null</code>.  Make sure that the variable or property you are storing is a string value in the appropriate format.", /* isHTML */ true);
                                } else {
                                    warning("I believe you have tried to set a CSS style property to a value that is the wrong type.  All style properties must be set to strings such as <code>\"red\"</code> or <code>\"50px\"</code>, or set to <code>null</code>.",
                                        undefined, undefined, undefined, undefined, undefined, /* isHTML */ true);
                                }
                            }

                            return left;
                        }
                    }

                    else if (left.left.right && left.left.right === "style") {
                        // check for obj.style.styleprop rather than obj.style.styleProp (bad casing)
                        var badCase = false;
                        if (styleDomPropertiesLowercase[("" + left.right).toLowerCase()] === true) {
                            for (stylePropName in styleDomProperties) {
                                if (stylePropName.toLowerCase() === left.right.toLowerCase()) {
                                    warning("Incorrect capitalization of CSS style property; I suggest " +
                                            stylePropName + " instead of " + left.right);
                                    badCase = true;
                                    break;
                                }
                            }
                        }

                        // check for obj.style.nonStyleProp rather than obj.nonStyleProp
                        if (!badCase) {
                            var objStr = left.left.left && left.left.left.value ? left.left.left.value : "";
                            if (!styleDomProperties[left.right] === true) {
                                warning("It looks like you are trying to set a DOM style property here, but '" + left.right + "' is not a recognized style property name (<a target=\"blank\" href=\"http://www.w3schools.com/jsref/dom_obj_style.asp\">see list</a>).  Maybe you have misspelled it, or maybe you meant <code>" +
                                        objStr + "." + left.right + "</code> instead of <code>" + objStr + ".style." + left.right + "</code> ?",
                                        undefined, undefined, undefined, undefined, undefined, /* isHTML */ true);
                                // return left;
                            }
                        }
                    }
                }

                if (left.id === '.' || left.id === '[') {
                    if (left.left.value === 'arguments') {
                        warning('Bad assignment.', this);
                    }
                    parse(19);

                    // *** Marty's event handler warning code, in case they try to
                    // write code such as:
                    //   foo.onclick = bar();
                    // when it should be
                    //   foo.onclick = bar;
                    if (option.eventfunc || option.on) {
                        if (eventNames[left.right] || (option.prototype && prototypeEventNames[left.right])) {
                            if (left.right && token && token.value && token.value === ")") {
                                warning("Shouldn't write parentheses () or parameters when attaching an event handler.  To attach a function as an event handler, write just the function's name.");
                            }
                        }
                    } else {
                        if (eventNames[left.right] || (option.prototype && prototypeEventNames[left.right])) {
                            warning("Avoid using HTML event handlers such as onclick.");
                        }
                    }

                    return left;
                } else if (left.identifier && !left.reserved) {
                    parse(19);
                    return left;
                }
                if (left === syntax['function']) {
                    warning("Expected an identifier in an assignment and instead saw a function invocation.", token);
                }
            }
            error("Bad assignment.", this);
        }, 20);
    }

    function bitwise(s, f, p) {
        var x = symbol(s, p);
        reserveName(x);
        x.led = (typeof f === 'function') ? f : function (left) {
            if (option.bitwise) {
                warning("Unexpected use of '{a}'.", this, this.id);
            }
            nonadjacent(prevtoken, token);
            nonadjacent(token, nexttoken);
            this.left = left;
            this.right = parse(p);
            return this;
        };
        return x;
    }

    function bitwiseassignop(s) {
        symbol(s, 20).exps = true;
        return infix(s, function (left) {
            if (option.bitwise) {
                warning("Unexpected use of '{a}'.", this, this.id);
            }
            nonadjacent(prevtoken, token);
            nonadjacent(token, nexttoken);
            if (left) {
                if (left.id === '.' || left.id === '[' ||
                        (left.identifier && !left.reserved)) {
                    parse(19);
                    return left;
                }
                if (left === syntax['function']) {
                    warning("Expected an identifier in an assignment, and instead saw a function invocation.", token);
                }
            }
            error("Bad assignment.", this);
        }, 20);
    }


    function suffix(s, f) {
        var x = symbol(s, 150);
        x.led = function (left) {
            if (option.plusplus) {
                warning("Unexpected use of '{a}'.", this, this.id);
            }
            this.left = left;
            return this;
        };
        return x;
    }


    function optionalidentifier() {
        if (nexttoken.reserved) {
            warning("Expected an identifier and instead saw '{a}' (a reserved word).",
                    nexttoken, nexttoken.id);
        }
        if (nexttoken.identifier) {
            advance();
            return token.value;
        }
    }


    function identifier() {
        var i = optionalidentifier();
        if (i) {
            return i;
        }
        if (token.id === 'function' && nexttoken.id === '(') {
            warning("Missing name in function statement.");
        } else {
            error("Expected an identifier and instead saw '{a}'.",
                    nexttoken, nexttoken.value);
        }
    }

    function reachable(s) {
        var i = 0, t;
        if (nexttoken.id !== ';' || noreach) {
            return;
        }
        for (;;) {
            t = peek(i);
            if (t.reach) {
                return;
            }
            if (t.id !== '(endline)') {
                if (t.id === 'function') {
                    warning(
"Inner functions should be listed at the top of the outer function.", t);
                    break;
                }
                warning("Unreachable '{a}' after '{b}'.", t, t.value, s);
                break;
            }
            i += 1;
        }
    }


    function statement(noindent) {
        var i = indent, r, s = scope, t = nexttoken;

// We don't like the empty statement.

        if (t.id === ';') {
            warning("Unnecessary semicolon.", t);
            advance(';');
            return;
        }

// Is this a labelled statement?

        if (t.identifier && !t.reserved && peek().id === ':') {
            advance();
            advance(':');
            scope = Object.beget(s);
            addlabel(t.value, 'label');
            if (!nexttoken.labelled) {
                warning("Label '{a}' on {b} statement.",
                        nexttoken, t.value, nexttoken.value);
            }
            if (jx.test(t.value + ':')) {
                warning("Label '{a}' looks like a javascript url.",
                        t, t.value);
            }
            nexttoken.label = t.value;
            t = nexttoken;
        }

// Parse the statement.

        if (!noindent) {
            indentation();
        }
        r = parse(0, true);

// Look for the final semicolon.

        if (!t.block) {
            if (nexttoken.id !== ';') {
                if (!option.laxbreak) {
                    warningAt("Missing semicolon.", token.line,
                            token.from + token.value.length);
                }
            } else {
                adjacent(token, nexttoken);
                advance(';');
                nonadjacent(token, nexttoken);
            }
        }

// Restore the indentation.

        indent = i;
        scope = s;
        return r;
    }


    function statements() {
        var a = [];
        while (!nexttoken.reach && nexttoken.id !== '(end)') {
            if (nexttoken.id === ';') {
                warning("Unnecessary semicolon.");
                advance(';');
            } else {
                a.push(statement());
            }
        }
        return a;
    }


    function block(f) {
        var a, b = inblock, s = scope;
        inblock = f;
        if (f) {
            scope = Object.beget(scope);
        }
        nonadjacent(token, nexttoken);
        var t = nexttoken;
        if (nexttoken.id === '{') {
            funct['(inSetTimeout)']  = false;
            funct['(inObserve)'] = false;

            advance('{');
            if (nexttoken.id !== '}' || token.line !== nexttoken.line) {
                indent += 4;
                if (!f && nexttoken.from === indent + 4) {
                    indent += 4;
                }
                a = statements();
                indent -= 4;
                indentation();
            }
            advance('}', t);
        } else {
            warning("Expected '{a}' and instead saw '{b}'.",
                    nexttoken, '{', nexttoken.value);
            noreach = true;
            a = [statement()];
            noreach = false;
        }
        funct['(verb)'] = null;
        scope = s;
        inblock = b;
        return a;
    }


// An identity function, used by string and number tokens.

    function idValue() {
        return this;
    }


    function countMember(m) {
        if (membersOnly && membersOnly[m] !== true) {
            warning("Unexpected member '{a}'.", nexttoken, m);
        }
        if (typeof member[m] === 'number') {
            member[m] += 1;
        } else {
            member[m] = 1;
        }
    }

    function note_implied(token) {
        var name = token.value, line = token.line + 1, a = implied[name];
        if (!a) {
            a = [line];
            implied[name] = a;
        } else if (a[a.length - 1] !== line) {
            a.push(line);
        }
    }


// XML types. Currently we support html and widget.

    var xmltype = {
        html: {
            doBegin: function (n) {
                xtype = 'html';
                option.browser = true;
                populateGlobals();
            },
            doTagName: function (n, p) {
                var i, t = xmltype.html.tag[n], x;
                src = false;
                if (!t) {
                    error("Unrecognized tag '<{a}>'.",
                            nexttoken,
                            n === n.toLowerCase() ? n : n + ' (capitalization error)');
                }
                x = t.parent;
                if (!option.fragment || stack.length !== 1 || !stack[0].fragment) {
                    if (x) {
                        if (x.indexOf(' ' + p + ' ') < 0) {
                            error("A '<{a}>' must be within '<{b}>'.",
                                    token, n, x);
                        }
                    } else {
                        i = stack.length;
                        do {
                            if (i <= 0) {
                                error("A '<{a}>' must be within '<{b}>'.",
                                        token, n, 'body');
                            }
                            i -= 1;
                        } while (stack[i].name !== 'body');
                    }
                }
                return t.empty;
            },
            doAttribute: function (n, a) {
                if (!a) {
                    warning("Missing attribute name.", token);
                }
                a = a.toLowerCase();
                if (n === 'script') {
                    if (a === 'src') {
                        src = true;
                        return 'href';
                    } else if (a === 'language') {
                        warning("The 'language' attribute is deprecated.",
                                token);
                        return false;
                    }
                } else if (n === 'style') {
                    if (a === 'type' && option.adsafe) {
                        warning("Don't bother with 'type'.", token);
                    }
                }
                if (href[a] === true) {
                    return 'href';
                }
                if (a.slice(0, 2) === 'on') {
                    if (!option.on) {
                        warning("Avoid HTML event handlers.");
                    }
                    return 'script';
                } else {
                    return 'value';
                }
            },
            doIt: function (n) {
                return n === 'script' ? 'script' : n !== 'html' &&
                        xmltype.html.tag[n].special && 'special';
            },
            tag: {
                a:        {},
                abbr:     {},
                acronym:  {},
                address:  {},
                applet:   {},
                area:     {empty: true, parent: ' map '},
                b:        {},
                base:     {empty: true, parent: ' head '},
                bdo:      {},
                big:      {},
                blockquote: {},
                body:     {parent: ' html noframes '},
                br:       {empty: true},
                button:   {},
                canvas:   {parent: ' body p div th td '},
                caption:  {parent: ' table '},
                center:   {},
                cite:     {},
                code:     {},
                col:      {empty: true, parent: ' table colgroup '},
                colgroup: {parent: ' table '},
                dd:       {parent: ' dl '},
                del:      {},
                dfn:      {},
                dir:      {},
                div:      {},
                dl:       {},
                dt:       {parent: ' dl '},
                em:       {},
                embed:    {},
                fieldset: {},
                font:     {},
                form:     {},
                frame:    {empty: true, parent: ' frameset '},
                frameset: {parent: ' html frameset '},
                h1:       {},
                h2:       {},
                h3:       {},
                h4:       {},
                h5:       {},
                h6:       {},
                head:     {parent: ' html '},
                html:     {},
                hr:       {empty: true},
                i:        {},
                iframe:   {},
                img:      {empty: true},
                input:    {empty: true},
                ins:      {},
                kbd:      {},
                label:    {},
                legend:   {parent: ' fieldset '},
                li:       {parent: ' dir menu ol ul '},
                link:     {empty: true, parent: ' head '},
                map:      {},
                menu:     {},
                meta:     {empty: true, parent: ' head noframes noscript '},
                noframes: {parent: ' html body '},
                noscript: {parent: ' body head noframes '},
                object:   {},
                ol:       {},
                optgroup: {parent: ' select '},
                option:   {parent: ' optgroup select '},
                p:        {},
                param:    {empty: true, parent: ' applet object '},
                pre:      {},
                q:        {},
                samp:     {},
                script:   {parent: ' body div frame head iframe p pre span '},
                select:   {},
                small:    {},
                span:     {},
                strong:   {},
                style:    {parent: ' head ', special: true},
                sub:      {},
                sup:      {},
                table:    {},
                tbody:    {parent: ' table '},
                td:       {parent: ' tr '},
                textarea: {},
                tfoot:    {parent: ' table '},
                th:       {parent: ' tr '},
                thead:    {parent: ' table '},
                title:    {parent: ' head '},
                tr:       {parent: ' table tbody thead tfoot '},
                tt:       {},
                u:        {},
                ul:       {},
                'var':    {}
            }
        },
        widget: {
            doBegin: function (n) {
                xtype = 'widget';
                option.widget = true;
                option.cap = true;
                populateGlobals();
            },
            doTagName: function (n, p) {
                var t = xmltype.widget.tag[n];
                if (!t) {
                    error("Unrecognized tag '<{a}>'.", nexttoken, n);
                }
                var x = t.parent;
                if (x.indexOf(' ' + p + ' ') < 0) {
                    error("A '<{a}>' must be within '<{b}>'.",
                            token, n, x);
                }
            },
            doAttribute: function (n, a) {
                var t = xmltype.widget.tag[a];
                if (!t) {
                    error("Unrecognized attribute '<{a} {b}>'.", nexttoken, n, a);
                }
                var x = t.parent;
                if (x.indexOf(' ' + n + ' ') < 0) {
                    error("Attribute '{a}' does not belong in '<{b}>'.", nexttoken, a, n);
                }
                return t.script ?
                        'script' :
                        a === 'name' && n !== 'setting' ?
                            'define' : 'string';
            },
            doIt: function (n) {
                var x = xmltype.widget.tag[n];
                return x && x.script && 'script';
            },
            tag: {
                "about-box":            {parent: ' widget '},
                "about-image":          {parent: ' about-box '},
                "about-text":           {parent: ' about-box '},
                "about-version":        {parent: ' about-box '},
                action:                 {parent: ' widget ', script: true},
                alignment:              {parent: ' canvas frame image scrollbar text textarea window '},
                anchorstyle:            {parent: ' text '},
                author:                 {parent: ' widget '},
                autohide:               {parent: ' scrollbar '},
                beget:                  {parent: ' canvas frame image scrollbar text window '},
                bgcolor:                {parent: ' text textarea '},
                bgcolour:               {parent: ' text textarea '},
                bgopacity:              {parent: ' text textarea '},
                canvas:                 {parent: ' frame window '},
                charset:                {parent: ' script '},
                checked:                {parent: ' image menuitem '},
                cliprect:               {parent: ' image '},
                color:                  {parent: ' about-text about-version shadow text textarea '},
                colorize:               {parent: ' image '},
                colour:                 {parent: ' about-text about-version shadow text textarea '},
                columns:                {parent: ' textarea '},
                company:                {parent: ' widget '},
                contextmenuitems:       {parent: ' canvas frame image scrollbar text textarea window '},
                copyright:              {parent: ' widget '},
                data:                   {parent: ' about-text about-version text textarea '},
                debug:                  {parent: ' widget '},
                defaultvalue:           {parent: ' preference '},
                defaulttracking:        {parent: ' widget '},
                description:            {parent: ' preference '},
                directory:              {parent: ' preference '},
                editable:               {parent: ' textarea '},
                enabled:                {parent: ' menuitem '},
                extension:              {parent: ' preference '},
                file:                   {parent: ' action preference '},
                fillmode:               {parent: ' image '},
                font:                   {parent: ' about-text about-version text textarea '},
                fontstyle:              {parent: ' textarea '},
                frame:                  {parent: ' frame window '},
                group:                  {parent: ' preference '},
                halign:                 {parent: ' canvas frame image scrollbar text textarea '},
                handlelinks:            {parent: ' textarea '},
                height:                 {parent: ' canvas frame image scrollbar text textarea window '},
                hidden:                 {parent: ' preference '},
                hlinesize:              {parent: ' frame '},
                hoffset:                {parent: ' about-text about-version canvas frame image scrollbar shadow text textarea window '},
                hotkey:                 {parent: ' widget '},
                hregistrationpoint:     {parent: ' canvas frame image scrollbar text '},
                hscrollbar:             {parent: ' frame '},
                hsladjustment:          {parent: ' image '},
                hsltinting:             {parent: ' image '},
                icon:                   {parent: ' preferencegroup '},
                id:                     {parent: ' canvas frame hotkey image preference text textarea timer scrollbar widget window '},
                image:                  {parent: ' about-box frame window widget '},
                interval:               {parent: ' action timer '},
                key:                    {parent: ' hotkey '},
                kind:                   {parent: ' preference '},
                level:                  {parent: ' window '},
                lines:                  {parent: ' textarea '},
                loadingsrc:             {parent: ' image '},
                locked:                 {parent: ' window '},
                max:                    {parent: ' scrollbar '},
                maxlength:              {parent: ' preference '},
                menuitem:               {parent: ' contextmenuitems '},
                min:                    {parent: ' scrollbar '},
                minimumversion:         {parent: ' widget '},
                minlength:              {parent: ' preference '},
                missingsrc:             {parent: ' image '},
                modifier:               {parent: ' hotkey '},
                name:                   {parent: ' canvas frame hotkey image preference preferencegroup scrollbar setting text textarea timer widget window '},
                notsaved:               {parent: ' preference '},
                onclick:                {parent: ' canvas frame image scrollbar text textarea ', script: true},
                oncontextmenu:          {parent: ' canvas frame image scrollbar text textarea window ', script: true},
                ondragdrop:             {parent: ' canvas frame image scrollbar text textarea ', script: true},
                ondragenter:            {parent: ' canvas frame image scrollbar text textarea ', script: true},
                ondragexit:             {parent: ' canvas frame image scrollbar text textarea ', script: true},
                onfirstdisplay:         {parent: ' window ', script: true},
                ongainfocus:            {parent: ' textarea window ', script: true},
                onkeydown:              {parent: ' hotkey text textarea window ', script: true},
                onkeypress:             {parent: ' textarea window ', script: true},
                onkeyup:                {parent: ' hotkey text textarea window ', script: true},
                onimageloaded:          {parent: ' image ', script: true},
                onlosefocus:            {parent: ' textarea window ', script: true},
                onmousedown:            {parent: ' canvas frame image scrollbar text textarea window ', script: true},
                onmousedrag:            {parent: ' canvas frame image scrollbar text textarea window ', script: true},
                onmouseenter:           {parent: ' canvas frame image scrollbar text textarea window ', script: true},
                onmouseexit:            {parent: ' canvas frame image scrollbar text textarea window ', script: true},
                onmousemove:            {parent: ' canvas frame image scrollbar text textarea window ', script: true},
                onmouseup:              {parent: ' canvas frame image scrollbar text textarea window ', script: true},
                onmousewheel:           {parent: ' frame ', script: true},
                onmulticlick:           {parent: ' canvas frame image scrollbar text textarea window ', script: true},
                onselect:               {parent: ' menuitem ', script: true},
                ontextinput:            {parent: ' window ', script: true},
                ontimerfired:           {parent: ' timer ', script: true},
                onvaluechanged:         {parent: ' scrollbar ', script: true},
                opacity:                {parent: ' canvas frame image scrollbar shadow text textarea window '},
                option:                 {parent: ' preference widget '},
                optionvalue:            {parent: ' preference '},
                order:                  {parent: ' preferencegroup '},
                orientation:            {parent: ' scrollbar '},
                pagesize:               {parent: ' scrollbar '},
                preference:             {parent: ' widget '},
                preferencegroup:        {parent: ' widget '},
                remoteasync:            {parent: ' image '},
                requiredplatform:       {parent: ' widget '},
                root:                   {parent: ' window '},
                rotation:               {parent: ' canvas frame image scrollbar text '},
                script:                 {parent: ' widget ', script: true},
                scrollbar:              {parent: ' frame text textarea window '},
                scrolling:              {parent: ' text '},
                scrollx:                {parent: ' frame '},
                scrolly:                {parent: ' frame '},
                secure:                 {parent: ' preference textarea '},
                setting:                {parent: ' settings '},
                settings:               {parent: ' widget '},
                shadow:                 {parent: ' about-text about-version text window '},
                size:                   {parent: ' about-text about-version text textarea '},
                spellcheck:             {parent: ' textarea '},
                src:                    {parent: ' image script '},
                srcheight:              {parent: ' image '},
                srcwidth:               {parent: ' image '},
                style:                  {parent: ' about-text about-version canvas frame image preference scrollbar text textarea window '},
                subviews:               {parent: ' frame '},
                superview:              {parent: ' canvas frame image scrollbar text textarea '},
                text:                   {parent: ' frame text textarea window '},
                textarea:               {parent: ' frame window '},
                timer:                  {parent: ' widget '},
                thumbcolor:             {parent: ' scrollbar textarea '},
                ticking:                {parent: ' timer '},
                ticks:                  {parent: ' preference '},
                ticklabel:              {parent: ' preference '},
                tileorigin:             {parent: ' image '},
                title:                  {parent: ' menuitem preference preferencegroup window '},
                tooltip:                {parent: ' frame image text textarea '},
                tracking:               {parent: ' canvas image '},
                trigger:                {parent: ' action '},
                truncation:             {parent: ' text '},
                type:                   {parent: ' preference '},
                url:                    {parent: ' about-box about-text about-version '},
                usefileicon:            {parent: ' image '},
                valign:                 {parent: ' canvas frame image scrollbar text textarea '},
                value:                  {parent: ' preference scrollbar setting '},
                version:                {parent: ' widget '},
                visible:                {parent: ' canvas frame image scrollbar text textarea window '},
                vlinesize:              {parent: ' frame '},
                voffset:                {parent: ' about-text about-version canvas frame image scrollbar shadow text textarea window '},
                vregistrationpoint:     {parent: ' canvas frame image scrollbar text '},
                vscrollbar:             {parent: ' frame '},
                width:                  {parent: ' canvas frame image scrollbar text textarea window '},
                window:                 {parent: ' canvas frame image scrollbar text textarea widget '},
                wrap:                   {parent: ' text '},
                zorder:                 {parent: ' canvas frame image scrollbar text textarea window '}
            }
        }
    };

    function xmlword(tag) {
        var w = nexttoken.value;
        if (!nexttoken.identifier) {
            if (nexttoken.id === '<') {
                if (tag) {
                    error("Expected '{a}' and instead saw '{b}'.",
                        token, '&lt;', '<');
                } else {
                    error("Missing '{a}'.", token, '>');
                }
            } else if (nexttoken.id === '(end)') {
                error("Bad structure.");
            } else {
                warning("Missing quote.", token);
            }
        }
        advance();
        while (nexttoken.id === '-' || nexttoken.id === ':') {
            w += nexttoken.id;
            advance();
            if (!nexttoken.identifier) {
                error("Bad name '{a}'.", nexttoken, w + nexttoken.value);
            }
            w += nexttoken.value;
            advance();
        }
        if (option.cap) {
            w = w.toLowerCase();
        }
        return w;
    }

    function closetag(n) {
        return '</' + n + '>';
    }

    function xml() {
        var a, e, n, q, t, wmode;
        xmode = 'xml';
        stack = null;
        for (;;) {
            switch (nexttoken.value) {
            case '<':
                if (!stack) {
                    stack = [];
                }
                advance('<');
                t = nexttoken;
                n = xmlword(true);
                t.name = n;
                if (!xtype) {
                    if (option.fragment && option.adsafe &&
                            n !== 'div' && n !== 'iframe') {
                        error("ADsafe HTML fragment violation.", token);
                    }
                    if (xmltype[n]) {
                        xmltype[n].doBegin();
                        n = xtype;
                        e = false;
                    } else {
                        if (option.fragment) {
                            xmltype.html.doBegin();
                        } else {
                            error("Unrecognized tag '<{a}>'.", nexttoken, n);
                        }
                    }
                } else {
                    if (stack.length === 0) {
                        error("What the hell is this?");
                    }
                    e = xmltype[xtype].doTagName(n,
                            stack[stack.length - 1].name);
                }
                t.type = n;
                for (;;) {
                    if (nexttoken.id === '/') {
                        advance('/');
                        if (nexttoken.id !== '>') {
                            warning("Expected '{a}' and instead saw '{b}'.",
                                    nexttoken, '>', nexttoken.value);
                        }
                        e = true;
                        break;
                    }
                    if (nexttoken.id && nexttoken.id.substr(0, 1) === '>') {
                        break;
                    }
                    a = xmlword();
                    switch (xmltype[xtype].doAttribute(n, a)) {
                    case 'script':
                        xmode = 'string';
                        advance('=');
                        q = nexttoken.id;
                        if (q !== '"' && q !== "'") {
                            error("Missing quote.");
                        }
                        xmode = q;
                        wmode = option.white;
                        option.white = false;
                        advance(q);
                        statements();
                        option.white = wmode;
                        if (nexttoken.id !== q) {
                            error("Missing close quote on script attribute.");
                        }
                        xmode = 'xml';
                        advance(q);
                        break;
                    case 'value':
                        advance('=');
                        if (!nexttoken.identifier &&
                                nexttoken.type !== '(string)' &&
                                nexttoken.type !== '(number)') {
                            error("Bad value '{a}'.",
                                    nexttoken, nexttoken.value);
                        }
                        advance();
                        break;
                    case 'string':
                        advance('=');
                        if (nexttoken.type !== '(string)') {
                            error("Bad value '{a}'.",
                                    nexttoken, nexttoken.value);
                        }
                        advance();
                        break;
                    case 'href':
                        advance('=');
                        if (nexttoken.type !== '(string)') {
                            error("Bad value '{a}'.",
                                    nexttoken, nexttoken.value);
                        }
                        if (option.adsafe && ux.test(nexttoken.value)) {
                            error("ADsafe URL violation.");
                        }
                        advance();
                        break;
                    case 'define':
                        advance('=');
                        if (nexttoken.type !== '(string)') {
                            error("Bad value '{a}'.",
                                    nexttoken, nexttoken.value);
                        }
                        addlabel(nexttoken.value, 'var');
                        advance();
                        break;
                    default:
                        if (nexttoken.id === '=') {
                            advance('=');
                            if (!nexttoken.identifier &&
                                    nexttoken.type !== '(string)' &&
                                    nexttoken.type !== '(number)') {
                                error("Bad value '{a}'.",
                                        nexttoken, nexttoken.value);
                            }
                            advance();
                        }
                    }
                }
                switch (xmltype[xtype].doIt(n)) {
                case 'script':
                    xmode = 'script';
                    advance('>');
                    indent = nexttoken.from;
                    if (src) {
                        if (option.fragment && option.adsafe) {
                            warning("ADsafe script violation.", token);
                        }
                    } else {
                        statements();
                    }
                    if (nexttoken.id !== '</' && nexttoken.id !== '(end)') {
                        warning("Expected '{a}' and instead saw '{b}'.",
                                nexttoken, '<\/script>', nexttoken.value);
                    }
                    xmode = 'xml';
                    break;
                case 'special':
                    e = true;
                    n = closetag(t.name);
                    if (!lex.skip(n)) {
                        error("Missing '{a}'.", t, n);
                    }
                    break;
                default:
                    lex.skip('>');
                }
                if (!e) {
                    stack.push(t);
                }
                break;
            case '</':
                advance('</');
                n = xmlword(true);
                t = stack.pop();
                if (!t) {
                    error("Unexpected '{a}'.", nexttoken, closetag(n));
                }
                if (t.name !== n) {
                    error("Expected '{a}' and instead saw '{b}'.",
                            nexttoken, closetag(t.name), closetag(n));
                }
                if (nexttoken.id !== '>') {
                    error("Missing '{a}'.", nexttoken, '>');
                }
                if (stack.length > 0) {
                    lex.skip('>');
                } else {
                    advance('>');
                }
                break;
            case '<!':
                if (option.adsafe) {
                    error("ADsafe HTML violation.");
                }
                for (;;) {
                    advance();
                    if (nexttoken.id === '>') {
                        break;
                    }
                    if (nexttoken.id === '<' || nexttoken.id === '(end)') {
                        error("Missing '{a}'.", token, '>');
                    }
                }
                lex.skip('>');
                break;
            case '<!--':
                if (option.adsafe) {
                    error("ADsafe comment violation.");
                }
                lex.skip('-->');
                break;
            case '<%':
                if (option.adsafe) {
                    error("ADsafe HTML violation.");
                }
                lex.skip('%>');
                break;
            case '<?':
                if (option.adsafe) {
                    error("ADsafe HTML violation.");
                }
                for (;;) {
                    advance();
                    if (nexttoken.id === '?>') {
                        break;
                    }
                    if (nexttoken.id === '<?' || nexttoken.id === '<' ||
                            nexttoken.id === '>' || nexttoken.id === '(end)') {
                        error("Missing '{a}'.", token, '?>');
                    }
                }
                lex.skip('?>');
                break;
            case '<=':
            case '<<':
            case '<<=':
                error("Missing '{a}'.", nexttoken, '&lt;');
                break;
            case '(end)':
                return;
            }
            if (stack && stack.length === 0) {
                return;
            }
            if (!lex.skip('')) {
                if (!stack) {
                    error("Bad XML.");
                }
                t = stack.pop();
                if (t.value) {
                    error("Missing '{a}'.", t, closetag(t.name));
                } else {
                    return;
                }
            }
            advance();
        }
    }


// Build the syntax table by declaring the syntactic elements of the language.

    type('(number)', idValue);
    type('(string)', idValue);

    syntax['(identifier)'] = {
        type: '(identifier)',
        lbp: 0,
        identifier: true,
        nud: function () {
            var v = this.value,
                s = scope[v];

// The name is in scope and defined in the current function.

            if (s && (s === funct || s === funct['(global)'])) {

//      If we are not also in the global scope, change 'unused' to 'var',
//      and reject labels.

                if (!funct['(global)']) {
                    switch (funct[v]) {
                    case 'unused':
                        funct[v] = 'var';
                        break;
                    case 'label':
                        warning("'{a}' is a statement label.", token, v);
                        break;
                    }
                }

// The name is not defined in the function.  If we are in the global scope,
// then we have an undefined variable.

            } else if (funct['(global)']) {
                // *** added by Marty to allow forward declarations
                // *** removed requirement for (global) to ease the JS "module pattern"
                if (option.fwddecl) {
                    var possibleError = {name:this.value, token:nexttoken, line:nexttoken.line};
                    funct['(functionsNeededLocal)'].push(possibleError);
                } else {
                    if (option.undef) {
                        warning("'{a}' is undefined.", token, v);
                    }
                    note_implied(token);
                }

// If the name is already defined in the current
// function, but not as outer, then there is a scope error.

            } else {
                switch (funct[v]) {
                case 'closure':
                case 'function':
                case 'var':
                case 'unused':
                    warning("'{a}' used out of scope.", token, v);
                    break;
                case 'label':
                    warning("'{a}' is a statement label.", token, v);
                    break;
                case 'outer':
                case true:
                    break;
                default:

// If the name is defined in an outer function, make an outer entry, and if
// it was unused, make it var.

                    if (s === true) {
                        funct[v] = true;
                    } else if (typeof s !== 'object') {
                        // *** added by Marty to allow forward declarations
                        if (option.fwddecl) {
                            var possibleError = {name:this.value, token:nexttoken, line:nexttoken.line};
                            funct['(functionsNeededLocal)'].push(possibleError);
                        } else {
                            if (option.undef) {
                                warning("'{a}' is undefined.", token, v);
                            } else {
                                funct[v] = true;
                            }
                            note_implied(token);
                        }
                    } else {
                        switch (s[v]) {
                        case 'function':
                        case 'var':
                        case 'unused':
                            s[v] = 'closure';
                            funct[v] = 'outer';
                            break;
                        case 'closure':
                        case 'parameter':
                            funct[v] = 'outer';
                            break;
                        case 'label':
                            warning("'{a}' is a statement label.", token, v);
                        }
                    }
                }
            }
            return this;
        },
        led: function () {
            error("Expected an operator and instead saw '{a}'.",
                    nexttoken, nexttoken.value);
        }
    };

    type('(regex)', function () {
        return this;
    });

    delim('(endline)');
    delim('(begin)');
    delim('(end)').reach = true;
    delim('</').reach = true;
    delim('<![').reach = true;
    delim('<%');
    delim('<?');
    delim('<!');
    delim('<!--');
    delim('%>');
    delim('?>');
    delim('(error)').reach = true;
    delim('}').reach = true;
    delim(')');
    delim(']');
    delim(']]>').reach = true;
    delim('"').reach = true;
    delim("'").reach = true;
    delim(';');
    delim(':').reach = true;
    delim(',');
    reserve('else');
    reserve('case').reach = true;
//  Unreserved by whitaker because it's not really reserved. Common method call for Promises.
//    reserve('catch');
    reserve('default').reach = true;
    reserve('finally');
    reservevar('arguments');
    reservevar('eval');
    reservevar('false');
    reservevar('Infinity');
    reservevar('NaN');
    reservevar('null');
    reservevar('this');
    reservevar('true');
    reservevar('undefined');
    assignop('=', 'assign', 20);
    assignop('+=', 'assignadd', 20);
    assignop('-=', 'assignsub', 20);
    assignop('*=', 'assignmult', 20);

    // *** commented out by Marty; this is a silly error message
    assignop('/=', 'assigndiv', 20).nud = function () {
        notice("A regular expression literal can be confused with '/='.");
    };

    assignop('%=', 'assignmod', 20);
    bitwiseassignop('&=', 'assignbitand', 20);
    bitwiseassignop('|=', 'assignbitor', 20);
    bitwiseassignop('^=', 'assignbitxor', 20);
    bitwiseassignop('<<=', 'assignshiftleft', 20);
    bitwiseassignop('>>=', 'assignshiftright', 20);
    bitwiseassignop('>>>=', 'assignshiftrightunsigned', 20);
    infix('?', function (left) {
        parse(10);
        advance(':');
        parse(10);
    }, 30);

    infix('||', 'or', 40);
    infix('&&', 'and', 50);
    bitwise('|', 'bitor', 70);
    bitwise('^', 'bitxor', 80);
    bitwise('&', 'bitand', 90);
    relation('==', function (left, right) {
        if (option.eqeqeq) {
            warning("Expected '{a}' and instead saw '{b}'.",
                    this, '===', '==');
        } else if (isPoorRelation(left)) {
            warning("Don't use == or != to test whether a value is '{a}'.  Just test whether the value is truthy/falsey, or use === or !== .",
                this, left.value, right.value);
        } else if (isPoorRelation(right)) {
            warning("Don't use == or != to test whether a value is '{b}'.  Just test whether the value is truthy/falsey, or use === or !== .",
                this, left.value, right.value);
        }
        return this;
    });
    relation('===');
    relation('!=', function (left, right) {
        if (option.eqeqeq) {
            warning("Expected '{a}' and instead saw '{b}'.",
                    this, '!==', '!=');
        } else if (isPoorRelation(left)) {
            warning("Don't use == or != to test whether a value is '{a}'.  Just test whether the value is truthy/falsey, or use === or !== .",
                this, left.value, right.value);
        } else if (isPoorRelation(right)) {
            warning("Don't use == or != to test whether a value is '{b}'.  Just test whether the value is truthy/falsey, or use === or !== .",
                this, left.value, right.value);
        }
        return this;
    });
    relation('!==');
    relation('<');
    relation('>');
    relation('<=');
    relation('>=');
    bitwise('<<', 'shiftleft', 120);
    bitwise('>>', 'shiftright', 120);
    bitwise('>>>', 'shiftrightunsigned', 120);
    infix('in', 'in', 120);
    infix('instanceof', 'instanceof', 120);
    infix('+', function (left) {
        nonadjacent(prevtoken, token);
        nonadjacent(token, nexttoken);
        var right = parse(130);
        if (left && right && left.id === '(string)' && right.id === '(string)') {
            left.value += right.value;
            left.character = right.character;
            if (jx.test(left.value)) {
                warning("JavaScript URL.", left);
            }
            return left;
        }
        this.left = left;
        this.right = right;
        return this;
    }, 130);
    prefix('+', 'num');
    infix('-', 'sub', 130);
    prefix('-', 'neg');
    infix('*', 'mult', 140);
    infix('/', 'div', 140);
    infix('%', 'mod', 140);

    suffix('++', 'postinc');
    prefix('++', 'preinc');
    syntax['++'].exps = true;

    suffix('--', 'postdec');
    prefix('--', 'predec');
    syntax['--'].exps = true;
    prefix('delete', function () {
        var p = parse(0);
        if (p.id !== '.' && p.id !== '[') {
            warning("Expected '{a}' and instead saw '{b}'.",
                    nexttoken, '.', nexttoken.value);
        }
    }).exps = true;


    prefix('~', function () {
        if (option.bitwise) {
            warning("Unexpected '{a}'.", this, '~');
        }
        parse(150);
        return this;
    });
    prefix('!', 'not');
    prefix('typeof', 'typeof');
    prefix('new', function () {
        var c = parse(155), i;
        if (c) {
            if (c.identifier) {
                c['new'] = true;
                switch (c.value) {
                case 'Object':
                    warning("Use the object literal notation {}.", token);
                    break;
                case 'Array':
                    warning("Use the array literal notation [].", token);
                    break;
                case 'Number':
                case 'String':
                case 'Boolean':
                case 'Math':
                    warning("Do not use the {a} function as a constructor.",
                            token, c.value);
                    break;
                case 'Function':
                    if (!option.evil) {
                        warning("The Function constructor is eval.");
                    }
                    break;
                case 'Date':
                case 'RegExp':
                    break;
                default:
                    if (c.id !== 'function') {
                        i = c.value.substr(0, 1);
                        if (i < 'A' || i > 'Z') {
                            warning("A constructor name should start with an uppercase letter.", token);
                        }
                    }
                }
            } else {
                if (c.id !== '.' && c.id !== '[' && c.id !== '(') {
                    warning("Bad constructor.", token);
                }
            }
        } else {
            warning("Weird construction. Delete 'new'.", this);
        }
        adjacent(token, nexttoken);
        if (nexttoken.id === '(') {
            advance('(');
            nospace();
            if (nexttoken.id !== ')') {
                for (;;) {
                    parse(10);
                    if (nexttoken.id !== ',') {
                        break;
                    }
                    advance(',');
                }
            }
            advance(')');
            nospace(prevtoken, token);
        } else {
            warning("Missing '()' invoking a constructor.");
        }
        return syntax['function'];
    });
    syntax['new'].exps = true;

    infix('.', function (left) {
        adjacent(prevtoken, token);
        var m = identifier();
        if (typeof m === 'string') {
            countMember(m);
        }
        if (option.adsafe && adsafe[m] === true) {
            warning("ADsafe restricted word '{a}'.", this, m);
        }
        if (!option.evil && left && left.value === 'document' &&
                (m === 'write' || m === 'writeln')) {
            warning("document.write can be a form of eval.", left);
        }
        this.left = left;
        this.right = m;
        return this;
    }, 160);

    infix('(', function (left) {
        // printd("left = " + objDump(left) + "\n");
        adjacent(prevtoken, token);
        nospace();
        // printd("prevtoken = " + objDump(prevtoken) + "\n");
        // printd("token = " + objDump(token) + "\n");
        // printd("nexttoken = " + objDump(nexttoken) + "\n\n");
        var n = 0;
        var p = [];
        if (left && left.type === '(identifier)') {
            if (left.value.match(/^[A-Z]([A-Z0-9_$]*[a-z][A-Za-z0-9_$]*)?$/)) {
                if (left.value !== 'Number' && left.value !== 'String' &&
                        left.value !== 'Boolean' && left.value !== 'Date') {
                    if (left.value === 'Math') {
                        warning("Math is not a function.", left);
                    } else {
                        // *** commented out by Marty to avoid Scriptaculous errors
                        notice("Possibly missing 'new' prefix when invoking a constructor.  (Or else you have created a method whose name begins with an uppercase letter, which you probably should not do.)", left);
                    }
                }
            } else if (left.value === "setTimeout" || left.value === "setInterval") {
                // *** added by Marty; checks for accidental () on setTimeout handler
                funct['(inSetTimeout)']  = true;
                var __THIS_IN_SETTIMEOUT = true;
            }
        }

        if (option.prototype && left && left.right && left.right === "observe" && nexttoken && nexttoken.value) {
            funct['(inObserve)'] = true;
            var __THIS_OBSERVE_STATEMENT = true;

            if (eventNames[nexttoken.value]) {
                warning("Shouldn't use the \"on\" prefix when observing a Prototype-style event.  Instead of \"" + nexttoken.value + "\", use \"" + eventNamesToBareMap[nexttoken.value] + "\".", left);
            }
            else if (nexttoken.value.match(/^on/)) {
                warning("Shouldn't use the \"on\" prefix when observing a Prototype-style event.", left);
            }
            else if (!eventNamesBare[nexttoken.value]) {
                warning("Unrecognized Prototype event: \"" + nexttoken.value + "\"", left);
            }
        }

        if (nexttoken.id !== ')') {
            for (;;) {
                p[p.length] = parse(10);
                n += 1;
                if (nexttoken.id !== ',') {
                    break;
                }
                advance(',');
                nonadjacent(token, nexttoken);
            }
        }
        advance(')');
        nospace(prevtoken, token);

        // printd("prevtoken2 = " + objDump(prevtoken) + "\n");
        // printd("token2 = " + objDump(token) + "\n\n\n");

        if (left && left.value && left.value !== "." && left.value !== "setTimeout" && left.value !== "setInterval"
                && (!prevtoken || prevtoken.value !== "}")) {
            /*if (funct['(inSetTimeout)']) {
                // BUGBUG: This does not work properly when the () are used on the
                // SECOND parameter to setTimeout, which should be allowed but currently isn't
                // -- Marty
                warning("Shouldn't write parentheses () or parameters when setting a timer.  To pass a function as a parameter, write just the function's name, " + left.value + ".", left);
                funct['(inSetTimeout)'] = false;
            } else*/ if (funct['(inObserve)']) {
                if (option.prototype) {
                    warning("Shouldn't write parentheses () or parameters when attaching a Prototype event handler.  To attach a function as an event handler, write just the function's name, " + left.value + ".", left);
                }
                funct['(inObserve)'] = false;
            }
        }

        if (typeof left === 'object') {
            if (left.value === 'parseInt' && n === 1) {
                // *** commented out by Marty; silly thing to check for
                notice("The parseInt function works best when you pass it a radix parameter (e.g. parseInt(x, 10) for base-10), to avoid bugs such as automatically parsing '012' as an octal number.", left);
            }
            if (!option.evil) {
                if (left.value === 'eval' || left.value === 'Function') {
                    warning("eval is evil.", left);
                } else if (p[0] && p[0].id === '(string)' &&
                       (left.value === 'setTimeout' ||
                        left.value === 'setInterval')) {
                    warning(
    "You should pass a function to setTimeout/Interval, instead of a string.", left);
                }
            }
            if (!left.identifier && left.id !== '.' && left.id !== '[' &&
                    left.id !== '(' && left.id !== '&&' && left.id !== '||' &&
                    left.id !== '?') {
                warning("Bad invocation.", left);
            }

        }

        if (__THIS_IN_SETTIMEOUT) {
            __THIS_IN_SETTIMEOUT = false;
            funct['(inSetTimeout)'] = false;
        }

        if (__THIS_OBSERVE_STATEMENT) {
            __THIS_OBSERVE_STATEMENT = false;
            funct['(inObserve)'] = false;
        }

        return syntax['function'];
    }, 155).exps = true;

    prefix('(', function () {
        nospace();
        var v = parse(0);
        advance(')', this);
        nospace(prevtoken, token);
        return v;
    });

    infix('[', function (left) {
        nospace();
        var e = parse(0), s;
        if (e && e.type === '(string)') {
            if (option.adsafe && adsafe[e.value] === true) {
                warning("ADsafe restricted word '{a}'.", this, e.value);
            }
            countMember(e.value);
            if (ix.test(e.value)) {
                s = syntax[e.value];
                if (!s || !s.reserved) {
                    // commenting out because this warning is stupid
//                    warning("['{a}'] is better written in dot notation.",
//                            e, e.value);
                }
            }
        } else if (!e || e.type !== '(number)') {
            if (option.adsafe) {
                warning('ADsafe subscripting.');
            }
        }
        advance(']', this);
        nospace(prevtoken, token);
        this.left = left;
        this.right = e;
        return this;
    }, 160);

    prefix('[', function () {
        if (nexttoken.id === ']') {
            advance(']');
            return;
        }
        var b = token.line !== nexttoken.line;
        if (b) {
            indent += 4;
            if (nexttoken.from === indent + 4) {
                indent += 4;
            }
        }
        for (;;) {
            if (b && token.line !== nexttoken.line) {
                indentation();
            }
            parse(10);
            if (nexttoken.id === ',') {
                adjacent(token, nexttoken);
                advance(',');
                if (nexttoken.id === ',' || nexttoken.id === ']') {
                    warning("Extra comma.", token);
                }
                nonadjacent(token, nexttoken);
            } else {
                if (b) {
                    indent -= 4;
                    indentation();
                }
                advance(']', this);
                return;
            }
        }
    }, 160);

    (function (x) {
        x.nud = function () {
            var i, s;
            if (nexttoken.id === '}') {
                advance('}');
                return;
            }
            var b = token.line !== nexttoken.line;
            if (b) {
                indent += 4;
                if (nexttoken.from === indent + 4) {
                    indent += 4;
                }
            }
            for (;;) {
                if (b) {
                    indentation();
                }
                i = optionalidentifier(true);
                if (!i) {
                    if (nexttoken.id === '(string)') {
                        i = nexttoken.value;
                        if (ix.test(i)) {
                            s = syntax[i];
                        }
                        advance();
                    } else if (nexttoken.id === '(number)') {
                        i = nexttoken.value.toString();
                        advance();
                    } else {
                        error("Expected '{a}' and instead saw '{b}'.",
                                nexttoken, '}', nexttoken.value);
                    }
                }
                countMember(i);
                advance(':');
                nonadjacent(token, nexttoken);
                parse(10);
                if (nexttoken.id === ',') {
                    adjacent(token, nexttoken);
                    advance(',');
                    if (nexttoken.id === ',' || nexttoken.id === '}') {
                        warning("Extra comma.", token);
                    }
                    nonadjacent(token, nexttoken);
                } else {
                    if (b) {
                        indent -= 4;
                        indentation();
                    }
                    advance('}', this);
                    return;
                }
            }
        };
        x.fud = function () {
            error("Expected to see a statement and instead saw a block.", token);
        };
    })(delim('{'));
    
    function processVariable(prefix) {
        if (funct['(global)'] && option.glovar) {
            warning("Global var. Use /*global */ instead.", token);
        }
        for (;;) {
            nonadjacent(token, nexttoken);
            addlabel(identifier(), 'unused');
            if (prefix) {
                return;
            }
            if (nexttoken.id === '=') {
                nonadjacent(token, nexttoken);
                advance('=');
                nonadjacent(token, nexttoken);
                if (peek(0).id === '=') {
                    error("Variable {a} was not declared correctly.",
                            nexttoken, nexttoken.value);
                }
                parse(20);
            }
            if (nexttoken.id !== ',') {
                return;
            }
            adjacent(token, nexttoken);
            advance(',');
            nonadjacent(token, nexttoken);
        }
    }


    function varstatement(prefix) {
// JavaScript does not have block scope. It only has function scope. So,
// declaring a variable in a block can have unexpected consequences.
        if (option.cse154) {
            warning("Var detected! Use the new and shiny let instead.", token);
        }
        processVariable(prefix);
    }


    stmt('var', varstatement);
    
    function letstatement(prefix) {
        processVariable(prefix);
    }
    
    stmt('let', letstatement);
    
    function conststatement(prefix) {
        processVariable(prefix);
    }
    
    stmt('const', conststatement);

    stmt('new', function () {
        // *** added by Marty; allows Prototype's Ajax.Request
        //if (!option.prototype) {
        //    error("'new' should not be used as a statement.");
        //}
        parse(20);
    });


    function functionparams() {
        var i, t = nexttoken, p = [];
        advance('(');
        nospace();
        if (nexttoken.id === ')') {
            advance(')');
            nospace(prevtoken, token);
            return;
        }
        for (;;) {
            i = identifier();
            p.push(i);
            addlabel(i, 'parameter');
            if (nexttoken.id === ',') {
                advance(',');
                nonadjacent(token, nexttoken);
            } else {
                advance(')', t);
                nospace(prevtoken, token);
                return p.join(', ');
            }
        }
    }

    function doFunction(i) {
        var s = scope;
        scope = Object.beget(s);
        funct = {
            '(name)'    : i || '"' + anonname + '"',
            '(line)'    : nexttoken.line + 1,
            '(context)' : funct,
            '(breakage)': 0,
            '(scope)'   : scope,
            '(functionsNeededLocal)' : []
        };
        functions.push(funct);
        if (i) {
            addlabel(i, 'function');
        }
        funct['(params)'] = functionparams();

        block(false);

        // *** Marty: Check for any forward declarations
        // (if they are not found here, they must be found in an outer scope)
        for (var i = 0; i < funct['(functionsNeededLocal)'].length; i++) {
            var err = funct['(functionsNeededLocal)'][i];
            if (!funct[err.name] || (funct[err.name] === "global" && !builtin(err.name))) {
                // function was not found in this scope; hand to outer scope or show error
                if (funct['(global)']) {
                    warning("Undeclared variable or function: " + err.name, err.token, err.line);
                } else if (funct['(context)']) {
                    funct['(context)']['(functionsNeededLocal)'].push(err);
                }
            }
        }

        scope = s;
        funct = funct['(context)'];
    }


    blockstmt('function', function () {
        if (inblock) {
            warning(
"Function statements cannot be placed in blocks. Use a function expression or move the statement to the top of the outer function.", token);

        }
        var i = identifier();
        adjacent(token, nexttoken);
        addlabel(i, 'unused');
        doFunction(i);
        if (nexttoken.id === '(' && nexttoken.line === token.line) {
            error(
"Function statements are not invocable. Wrap the function expression in parens.");
        }
    });

    prefix('function', function () {
        var i = optionalidentifier();
        if (i) {
            adjacent(token, nexttoken);
        } else {
            nonadjacent(token, nexttoken);
        }
        doFunction(i);
    });

    blockstmt('if', function () {
        var t = nexttoken;
        advance('(');
        nonadjacent(this, t);
        nospace();
        parse(20);
        if (nexttoken.id === '=') {
            warning("Expected a conditional expression and instead saw an assignment.");
            advance('=');
            parse(20);
        }
        advance(')', t);
        nospace(prevtoken, token);
        block(true);
        if (nexttoken.id === 'else') {
            nonadjacent(token, nexttoken);
            advance('else');
            if (nexttoken.id === 'if' || nexttoken.id === 'switch') {
                statement(true);
            } else {
                block(true);
            }
        }
        return this;
    });

    blockstmt('try', function () {
        var b, e, s;
        block(false);
        if (nexttoken.id === 'catch') {
            advance('catch');
            nonadjacent(token, nexttoken);
            advance('(');
            s = scope;
            scope = Object.beget(s);
            e = nexttoken.value;
            if (nexttoken.type !== '(identifier)') {
                warning("Expected an identifier and instead saw '{a}'.",
                    nexttoken, e);
            } else {
                addlabel(e, 'unused');
            }
            advance();
            advance(')');
            block(false);
            b = true;
            scope = s;
        }
        if (nexttoken.id === 'finally') {
            advance('finally');
            block(false);
            return;
        } else if (!b) {
            error("Expected '{a}' and instead saw '{b}'.",
                    nexttoken, 'catch', nexttoken.value);
        }
    });

    blockstmt('while', function () {
        var t = nexttoken;
        funct['(breakage)'] += 1;
        advance('(');
        nonadjacent(this, t);
        nospace();
        parse(20);
        if (nexttoken.id === '=') {
            warning("Expected a conditional expression and instead saw an assignment.");
            advance('=');
            parse(20);
        }
        advance(')', t);
        nospace(prevtoken, token);
        block(true);
        funct['(breakage)'] -= 1;
    }).labelled = true;

    reserve('with');

    blockstmt('switch', function () {
        var t = nexttoken;
        var g = false;
        funct['(breakage)'] += 1;
        advance('(');
        nonadjacent(this, t);
        nospace();
        this.condition = parse(20);
        advance(')', t);
        nospace(prevtoken, token);
        nonadjacent(token, nexttoken);
        t = nexttoken;
        advance('{');
        nonadjacent(token, nexttoken);
        indent += 4;
        this.cases = [];
        for (;;) {
            switch (nexttoken.id) {
            case 'case':
                switch (funct['(verb)']) {
                case 'break':
                case 'case':
                case 'continue':
                case 'return':
                case 'switch':
                case 'throw':
                    break;
                default:
                    warning(
                        "Expected a 'break' statement before 'case'.",
                        token);
                }
                indentation(-4);
                advance('case');
                this.cases.push(parse(20));
                g = true;
                advance(':');
                funct['(verb)'] = 'case';
                break;
            case 'default':
                switch (funct['(verb)']) {
                case 'break':
                case 'continue':
                case 'return':
                case 'throw':
                    break;
                default:
                    warning(
                        "Expected a 'break' statement before 'default'.",
                        token);
                }
                indentation(-4);
                advance('default');
                g = true;
                advance(':');
                break;
            case '}':
                indent -= 4;
                indentation();
                advance('}', t);
                if (this.cases.length === 1 || this.condition.id === 'true' ||
                        this.condition.id === 'false') {
                    warning("This 'switch' should be an 'if'.", this);
                }
                funct['(breakage)'] -= 1;
                return;
            case '(end)':
                error("Missing '{a}'.", nexttoken, '}');
                return;
            default:
                if (g) {
                    switch (token.id) {
                    case ',':
                        error("Each value should have its own case label.");
                        return;
                    case ':':
                        statements();
                        break;
                    default:
                        error("Missing ':' on a case clause.", token);
                    }
                } else {
                    error("Expected '{a}' and instead saw '{b}'.",
                        nexttoken, 'case', nexttoken.value);
                }
            }
        }
    }).labelled = true;

    stmt('debugger', function () {
        if (!option.debug) {
            warning("All 'debugger' statements should be removed.");
        }
    });

    stmt('do', function () {
        funct['(breakage)'] += 1;
        block(true);
        advance('while');
        var t = nexttoken;
        nonadjacent(token, t);
        advance('(');
        nospace();
        parse(20);
        if (nexttoken.id === '=') {
            warning("Expected a conditional expression and instead saw an assignment.");
            advance('=');
            parse(20);
        }
        advance(')', t);
        nospace(prevtoken, token);
        funct['(breakage)'] -= 1;
    }).labelled = true;

    blockstmt('for', function () {
        var s, t = nexttoken;
        funct['(breakage)'] += 1;
        advance('(');
        nonadjacent(this, t);
        nospace();
        if (peek(nexttoken.id === 'var' ? 1 : 0).id === 'in') {
            if (nexttoken.id === 'var') {
                advance('var');
                varstatement(true);
            } else {
                advance();
            }
            advance('in');
            parse(20);
            advance(')', t);
            if (nexttoken.id === 'if') {
                nolinebreak(token);
                statement(true);
            } else {
                s = block(true);
                if (!option.forin && (s.length > 1 || typeof s[0] !== 'object' ||
                        s[0].value !== 'if')) {
                    warning("The body of a for in should be wrapped in an if statement to filter unwanted properties from the prototype.", this);
                }
            }
            funct['(breakage)'] -= 1;
            return this;
        } else {
            if (nexttoken.id !== ';') {
                if (nexttoken.id === 'var') {
                    advance('var');
                    varstatement();
                } else if (nexttoken.id === "let") {
                    advance('let');
                    letstatement();
                } else {
                    for (;;) {
                        parse(0, 'for');
                        if (nexttoken.id !== ',') {
                            break;
                        }
                        advance(',');
                    }
                }
            }
            advance(';');
            if (nexttoken.id !== ';') {
                parse(20);
                if (nexttoken.id === '=') {
                    warning("Expected a conditional expression and instead saw an assignment.");
                    advance('=');
                    parse(20);
                }
            }
            advance(';');
            if (nexttoken.id === ';') {
                error("Expected '{a}' and instead saw '{b}'.",
                        nexttoken, ')', ';');
            }
            if (nexttoken.id !== ')') {
                for (;;) {
                    parse(0, 'for');
                    if (nexttoken.id !== ',') {
                        break;
                    }
                    advance(',');
                }
            }
            advance(')', t);
            nospace(prevtoken, token);
            block(true);
            funct['(breakage)'] += 1;
        }
    }).labelled = true;


    stmt('break', function () {
        var v = nexttoken.value;
        if (funct['(breakage)'] === 0) {
            warning("Unexpected '{a}'.", nexttoken, this.value);
        }
        nolinebreak(this);
        if (nexttoken.id !== ';') {
            if (funct[v] !== 'label') {
                warning("'{a}' is not a statement label.", nexttoken, v);
            } else if (scope[v] !== funct) {
                warning("'{a}' is out of scope.", nexttoken, v);
            }
            advance();
        }
        reachable('break');
    });


    stmt('continue', function () {
        var v = nexttoken.value;
        nolinebreak(this);
        if (nexttoken.id !== ';') {
            if (funct[v] !== 'label') {
                warning("'{a}' is not a statement label.", nexttoken, v);
            } else if (scope[v] !== funct) {
                warning("'{a}' is out of scope.", nexttoken, v);
            }
            advance();
        }
        reachable('continue');
    });


    stmt('return', function () {
        nolinebreak(this);
        if (nexttoken.id !== ';' && !nexttoken.reach) {
            nonadjacent(token, nexttoken);
            parse(20);
        }
        reachable('return');
    });


    stmt('throw', function () {
        nolinebreak(this);
        nonadjacent(token, nexttoken);
        parse(20);
        reachable('throw');
    });


//  Superfluous reserved words

//  reserve('abstract');
//  reserve('boolean');
//  reserve('byte');
//  reserve('char');
    reserve('class');
    reserve('const');
//  reserve('double');
    reserve('enum');
    reserve('export');
    reserve('extends');
//  reserve('final');
//  reserve('float');
    reserve('goto');
//  reserve('implements');
    reserve('import');
//  reserve('int');
//  reserve('interface');
//  reserve('long');
//  reserve('native');
//  reserve('package');
//  reserve('private');
//  reserve('protected');
//  reserve('public');
//  reserve('short');
//  reserve('static');
    reserve('super');
//  reserve('synchronized');
//  reserve('throws');
//  reserve('transient');
    reserve('void');
//  reserve('volatile');


    function jsonValue() {

        function jsonObject() {
            var t = nexttoken;
            advance('{');
            if (nexttoken.id !== '}') {
                for (;;) {
                    if (nexttoken.id === '(end)') {
                        error("Missing '}' to match '{' from line {a}.",
                                nexttoken, t.line + 1);
                    } else if (nexttoken.id === '}') {
                        warning("Unexpected comma.", token);
                        break;
                    } else if (nexttoken.id === ',') {
                        error("Unexpected comma.", nexttoken);
                    } else if (nexttoken.id !== '(string)') {
                        warning("Expected a string and instead saw {a}.",
                                nexttoken, nexttoken.value);
                    }
                    advance();
                    advance(':');
                    jsonValue();
                    if (nexttoken.id !== ',') {
                        break;
                    }
                    advance(',');
                }
            }
            advance('}');
        }

        function jsonArray() {
            var t = nexttoken;
            advance('[');
            if (nexttoken.id !== ']') {
                for (;;) {
                    if (nexttoken.id === '(end)') {
                        error("Missing ']' to match '[' from line {a}.",
                                nexttoken, t.line + 1);
                    } else if (nexttoken.id === ']') {
                        warning("Unexpected comma.", token);
                        break;
                    } else if (nexttoken.id === ',') {
                        error("Unexpected comma.", nexttoken);
                    }
                    jsonValue();
                    if (nexttoken.id !== ',') {
                        break;
                    }
                    advance(',');
                }
            }
            advance(']');
        }

        switch (nexttoken.id) {
        case '{':
            jsonObject();
            break;
        case '[':
            jsonArray();
            break;
        case 'true':
        case 'false':
        case 'null':
        case '(number)':
        case '(string)':
            advance();
            break;
        case '-':
            advance('-');
            if (token.character !== nexttoken.from) {
                warning("Unexpected space after '-'.", token);
            }
            adjacent(token, nexttoken);
            advance('(number)');
            break;
        default:
            error("Expected a JSON value.", nexttoken);
        }
    }


// The actual JSLINT function itself.

    var itself = function (s, o, a) {
        if (o) {
            if (o.adsafe) {
                o.browser = false;
                o.debug   = false;
                o.eqeqeq  = true;
                o.evil    = false;
                o.forin   = false;
                o.glovar  = true;
                o.nomen   = true;
                o.on      = false;
                o.rhino   = false;
                o.sidebar = false;
                o.undef   = true;
                o.widget  = false;
            }
            option = o;
        } else {
            option = {};
        }
        adsafe_allow = a || {
            ADSAFE: true
        };
        globals = Object.beget(standard);
        if (option.adsafe) {
            globals['eval'] = false;
            globals.Function = false;
        }
        JSLINT.errors = [];
        JSLINT.notices = [];
        JSLINT.seenUseStrict = false;
        global = Object.beget(globals);
        scope = global;
        funct = {'(global)': true, '(name)': '(global)', '(scope)': scope, '(functionsNeededLocal)': []};
        functions = [];
        src = false;
        xmode = false;
        xtype = '';
        stack = null;
        member = {};
        membersOnly = null;
        implied = {};
        inblock = false;
        lookahead = [];
        indent = 0;
        jsonmode = false;
        warnings = 0;
        lex.init(s);
        prereg = true;

        prevtoken = token = nexttoken = syntax['(begin)'];
        populateGlobals();

        try {
            advance();
            if (nexttoken.value.charAt(0) === '<') {
                xml();
            } else if (nexttoken.id === '{' || nexttoken.id === '[') {
                option.laxbreak = true;
                jsonmode = true;
                jsonValue();
            } else {
                statements();

                // ***
                // marty's hack to prevent spurious undefined variable errors
                // (have to save all possibly undefined vars and check at end)
                if (option.fwddecl) {
                    for (var i = 0; i < funct['(functionsNeededLocal)'].length; i++) {
                        var err = funct['(functionsNeededLocal)'][i];
                        if (!funct[err.name] || (funct[err.name] === "global" && !builtin(err.name))) {
                            // function was not found in this scope; hand to outer scope or show error
                            warning("Undeclared variable or function: " + err.name, err.token, err.line);
                        }
                    }
                }

                if (option.usestrict && !JSLINT.seenUseStrict) {
                    warning("You did not include a \"use strict\"; declaration at the top of your program.  You should include such a declaration to instruct the browser to perform strict syntax checking on your JavaScript code.", {id: "(begin)", line: 0, from: 0});
                }
            }
            advance('(end)');
        } catch (e) {
            if (e) {
                JSLINT.errors.push({
                    reason    : e.message,
                    line      : e.line || nexttoken.line,
                    character : e.character || nexttoken.from
                }, null);
            }
        }
        return JSLINT.errors.length === 0;
    };

    function to_array(o) {
        var a = [], k;
        for (k in o) {
            if (typeof(o.hasOwnProperty) === "function" && o.hasOwnProperty(k)) {
                a.push(k);
            }
        }
        return a;
    }

// Report generator.

    itself.report = function (option) {
        var a = [], c, e, f, i, k, l, m = '', n, o = [], s, v, cl, va, un, ou, gl, la;

        function detail(h, s) {
            if (s.length) {
                o.push('<div><i>' + h + '</i> ' +
                        s.sort().join(', ') + '</div>');
            }
        }

        s = to_array(implied);

        var MAX_LENGTH = 120;
        k = JSLINT.errors.length;
        if (JSLINT.errors.length > 0) {
            o.push('<div id=errors>');  // <i>Errors:</i>');
            o.push('<h2>Errors:</h2>');
            o.push('<p class="explanation">(These are items that JSLint doesn\'t like about your code.  You should correct these issues in your code and try again.)</p>');

            for (i = 0; i < k; i += 1) {
                c = JSLINT.errors[i];
                if (c) {
                    e = c.evidence || '';

                    // *** added by Marty; puts a caret under the offending character, if any
                    var caretStr = "";
                    if (isFinite(c.line) && c.character < MAX_LENGTH && e && e.length >= c.character) {
                        caretStr = "\n";
                        for (var charCnt = 0; charCnt < c.character; charCnt++) {
                            if (e.charAt(charCnt) == "\t") {
                                caretStr += "\t";
                            } else {
                                caretStr += " ";
                            }
                        }
                        caretStr += "^";
                    }

                    o.push('<p>' + (isFinite(c.line) ? ('<strong>line ' + (c.line + 1) + ":</strong> ") : "") +
                            // ' character ' + (c.character + 1) : '') + ': ' +
                            (c.isHTML ? c.reason : c.reason.entityify()) +
                            '</p><p class=evidence>' +
                            (e && (e.length > MAX_LENGTH ? e.slice(0, MAX_LENGTH - 3) + '...' : e).entityify()) +
                            caretStr + '</p>');
                }
            }

            o.push('</div>');
        } else {
            o.push("<div id='errors' class='noerrors'><h2>Errors:</h2><p>No errors found.  Good work!</p></div>");
        }

        // *** added by Marty; shows any 'notice' messages (like warnings; might be bad, might not)
        if (true || JSLINT.notices.length > 0 || s.length > 0) {
            o.push('<div id="notices">');
            o.push('<h2>Notices:</h2>');
            o.push('<p class="explanation">(These are other items and information that JSLint noticed about your code.  These are NOT errors, and you do not need to fix them.  Some of them might indicate possible problems or bugs.  You may want to look at these to make sure they are not bugs or mistakes in your code.)</p>');

            for (var i = 0; i < JSLINT.notices.length; i++) {
                var c = JSLINT.notices[i];
                e = c.evidence || '';

                // *** added by Marty; puts a caret under the offending character, if any
                var caretStr = "";
                if (isFinite(c.line) && c.character < MAX_LENGTH && e && e.length >= c.character) {
                    caretStr = "\n";
                    for (var charCnt = 0; charCnt < c.character; charCnt++) {
                        if (e.charAt(charCnt) == "\t") {
                            caretStr += "\t";
                        } else {
                            caretStr += " ";
                        }
                    }
                    caretStr += "^";
                }

                o.push('<p>' + (isFinite(c.line) ? ('<strong>line ' + (c.line + 1) + ":</strong> ") : "") +
                        // ' character ' + (c.character + 1) : '') + ': ' +
                        (c.isHTML ? c.reason : c.reason.entityify()) +
                        '</p><p class=evidence>' +
                        (e && (e.length > MAX_LENGTH ? e.slice(0, MAX_LENGTH - 3) + '...' :
                        e).entityify()) + caretStr + '</p>');
            }

            if (s.length > 0) {
                s.sort();
                for (i = 0; i < s.length; i += 1) {
                    s[i] = '<code>' + s[i] + '</code>&nbsp;<i>' +
                        implied[s[i]].join(' ') +
                        '</i>';
                }
                o.push('<p><i>Implied global:</i> ' + s.join(', ') + '</p>');
                c = true;
            }

            var shouldShowGlobals = true;
            if (shouldShowGlobals) {
                o.push('<div id=functions><!--<h2>Other code information:</h2>-->');

                s = to_array(scope);
                if (s.length === 0) {
                    if (jsonmode) {
                        if (k === 0) {
                            o.push('<p>JSON: good.</p>');
                        } else {
                            o.push('<p>JSON: bad.</p>');
                        }
                    } else {
                        o.push('<div><i>No new global variables introduced.  Good work!</i></div>');
                    }
                } else {
                    o.push('<div><i>Globals introduced:</i> ' + s.sort().join(', ') + ' <i>(You may want to try to minimize the number of global variables that you declare in your code.  Too many global variables can be bad style.)</i></div>');
                }

                for (i = 0; i < functions.length; i += 1) {
                    f = functions[i];
                    cl = [];
                    va = [];
                    un = [];
                    ou = [];
                    gl = [];
                    la = [];
                    for (k in f) if (f.hasOwnProperty(k)) {
                        v = f[k];
                        switch (v) {
                        case 'closure':
                            cl.push(k);
                            break;
                        case 'var':
                            va.push(k);
                            break;
                        case 'unused':
                            un.push(k);
                            break;
                        case 'label':
                            la.push(k);
                            break;
                        case 'outer':
                            ou.push(k);
                            break;
                        case true:
                            if (k !== '(context)') {
                                gl.push(k);
                            }
                            break;
                        }
                    }
                    o.push('<br><div class=function><i>' + f['(line)'] + '</i> ' +
                            (f['(name)'] || '') + '(' +
                            (f['(params)'] || '') + ')</div>');
                    detail('Closure', cl);
                    detail('Variable', va);
                    detail('Unused', un);
                    detail('Label', la);
                    detail('Outer', ou);
                    detail('Global', gl);
                }

                /*
                a = [];
                for (k in member) {
                    if (typeof member[k] === 'number') {
                        a.push(k);
                    }
                }
                if (a.length) {
                    a = a.sort();
                    m = '<br><pre>/ *members ';
                    l = 10;
                    for (i = 0; i < a.length; i += 1) {
                        k = a[i];
                        n = k.name();
                        if (l + n.length > 72) {
                            o.push(m + '<br>');
                            m = '    ';
                            l = 1;
                        }
                        l += n.length + 2;
                        if (member[k] === 1) {
                            n = '<i>' + n + '</i>';
                        }
                        if (i < a.length - 1) {
                            n += ', ';
                        }
                        m += n;
                    }
                    o.push(m + '<br>* /</pre>');
                }
                */
                o.push('</div>');
            }

            o.push('</div>');
        }

        // if (!c) {
        return o.join('');
        // }
    };

    return itself;

}();


if (!__RUNNING_IN_BROWSER) {
    // var textToCheck = "var x = 1 + 1;\nif (x == true) { alert('hi'); }";

    // main

    // read input file text as a string
    if (arguments.length == 0) {
        print("Usage: jslint.js FILENAME");
        quit();
    }

    var HTML_MODE = true;
    if (arguments[0] == "--text") {
        HTML_MODE = false;
        arguments.shift();
    }

    var filename = arguments[0];
    var textToCheck = readFile(filename);
    if (!textToCheck) {
        print("File not found or empty: " + filename);
        quit();
    }

    // run JSLint on the file's contents!
    var bestOptions = {
        // CSE 154 web dev options
        'browser' : 'browser',
        'undef' : 'undef',
        'styledom' : 'styledom',
        'eventfunc': 'eventfunc',
        'cse154' : 'cse154',
        'fwddecl' : 'fwddecl',
        'usestrict' : 'usestrict',
        'prototype' : 'prototype',
        'jquery' : 'jquery',
        // 'laxbreak' : 'laxbreak',

        // CSE 341 JS homework options
        // 'newcap' : 'newcap',
        // 'immed' : 'immed',
        // 'maxerr' : '50'
        'rhino' : 'rhino',
        'underscore' : 'underscore'
    };

    var success = JSLINT(textToCheck, bestOptions);
    if (success || !JSLINT.errors || JSLINT.errors.length == 0) {
        print("No errors found.");
        quit();
    }

    function htmlEncode(str, skipSpaces) {
        if (!str) { return ""; }
        str = str.replace(/&/g, "&amp;");
        str = str.replace(/</g, "&lt;");
        str = str.replace(/>/g, "&gt;");
        if (!skipSpaces) {
            str = str.replace(/ /g, "&nbsp;");
        }
        str = str.replace(/\"/g, "&quot;");
        return str;
    }

    // print syntax errors
    if (HTML_MODE) { print("<div class=\"jslinterrorcount\">\n<p>"); }
    print(JSLINT.errors.length + " error" + (JSLINT.errors.length == 1 ? "" : "s") + " found:\n");
    if (HTML_MODE) { print("</p>\n<ol>"); }

    for (var i = 0; i < JSLINT.errors.length; i++) {
        var err = JSLINT.errors[i];
        if (!err) {
            continue;
        }

        if (HTML_MODE) { print("<li><strong>"); }
        else           { print((i+1) + ". "); }

        print("line " + err.line + ", char " + err.character + ":");
        if (HTML_MODE) {
            print("</strong>");
            err.reason = (err.reason === null || err.reason === undefined) ? "" : (err.isHTML ? err.reason : htmlEncode(err.reason));
            err.evidence = (err.evidence === null || err.evidence === undefined) ? "" : htmlEncode(err.evidence);
        }

        if (err.reason) {
            print(err.reason);
        }

        if (err.evidence) {
            if (HTML_MODE) { print("\n<pre>"); }
            print(err.evidence);
            if (HTML_MODE) { print("</pre>"); }
        }

        // print(err.a + " " + err.b + " " + err.c + " " + err.d);

        // print(objDump(err));

        if (HTML_MODE) { print("</li>"); }
        print();
    }

    if (HTML_MODE) {
        print("</ol>\n</div>");
    }

    function objDump(obj, indent) {
        var SHOW_FUNCTIONS = false;
        var OMIT_PROPS = {
            "line" : true,
            "character" : true,
            "from" : true,
            "lbp" : true,
            "exps" : true,
            "identifier" : true
        };

        if (!indent) {
            indent = "";
        }
        if (obj === undefined) {
            return "undefined";
        } else if (obj === null) {
            return "null";
        } else if (typeof(obj) === "string") {
            // return "string{\"" + obj + "\"}";
            return "\"" + obj + "\"";
        } else if (typeof(obj) === "boolean") {
            // return "boolean{" + obj + "}";
            return obj;
        } else if (typeof(obj) === "number") {
            // return "number{" + obj + "}";
            return obj;
        }

        var dump = typeof(obj) + " {\n";
        if (obj !== null && obj !== undefined) {
            var len = 0;
            for (var prop in obj) {
                if (!SHOW_FUNCTIONS && typeof(obj[prop]) == "function") { continue; }
                if (OMIT_PROPS[prop]) { continue; }
                len = Math.max(len, prop.length);
            }

            for (var prop in obj) {
                if (!SHOW_FUNCTIONS && typeof(obj[prop]) == "function") { continue; }
                if (OMIT_PROPS[prop]) { continue; }

                dump += indent + "    " + prop;
                for (var i = prop.length; i < len; i++) {
                    dump += " ";
                }
                dump += " = ";

                if (typeof(obj[prop]) == "function") {
                    dump += "(function)";
                } else {
                    try {
                        dump += objDump(obj[prop], indent + "    ") + " ";
                    } catch (e) {
                        dump += "(error!)";
                    }
                }
                dump += "\n";
            }
        }
        dump += indent + "}";
        return dump;
    }

    function printd(obj) {
        if (__DEBUG) {
            print(obj);
        }
    }

    /*
    JSLINT.errors is an array of objects containing these members:
        line      : The line (relative to 0) at which the lint was found
        character : The character (relative to 0) at which the lint was found
        reason    : The problem
        evidence  : The text line in which the problem occurred
        raw       : The raw message before the details were inserted
        a         : The first detail
        b         : The second detail
        c         : The third detail
        d         : The fourth detail
    */
}