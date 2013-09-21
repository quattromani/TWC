var Twc = Twc || {};
function logOsd(c, b) {
  var a = $("#twcLog"), e = b ? "red" : "lime";
  0 === a.length && (logEl = $('<div id="twcLog"  style="z-index:5000;font-size: 11px;border-color: #dddddd; border-style: solid; border-width: 1px 1px 0 0; padding: 2px; position: fixed; bottom: 0; right: 0px;background: black !important; color: lime; font-size: 11px; font-family: arial;">\t\t           <div style="color: #aaaaaa !important; text-align: right;"><a style="font-size; 9px !important; color: #aaaaaa !important; " href="javascript:void(0)" onclick="$(\'#twcLog\').hide().find(\'.log-entry\').remove();return false;">clear</a></div>\t\t           <div id="twcLogContent" style="font-size: 11px; padding: 5px;"></div>\t\t         </div>'), 
  $("body").append(logEl), a = $("#twcLog"));
  a.find("#twcLogContent").append('<div style="color: ' + e + ';" class="log-entry">' + c + "</div>");
  a.show()
}
function log(c, b) {
  var a = b || Twc.Settings.forceLogOsd;
  try {
    console.log(c)
  }catch(e) {
  }
  a && logOsd(c, 0)
}
function error(c, b) {
  var a = b || Twc.Settings.forceErrorOsd;
  try {
    console.error(c)
  }catch(e) {
  }
  a && logOsd(c, 1)
}
function warn(c, b) {
  var a = b || Twc.Settings.forceErrorOsd;
  try {
    console.warn(c)
  }catch(e) {
  }
  a && logOsd(c, 1)
}
function dir(c) {
  try {
    console.dir(c)
  }catch(b) {
  }
}
if(Modernizr && Modernizr.addTest) {
  rv = -1;
  if("Microsoft Internet Explorer" == navigator.appName && (rv = document.documentMode, void 0 == rv || 0 == rv)) {
    var ua = navigator.userAgent, re = /MSIE ([0-9]{1,}[.0-9]{0,})/;
    null != re.exec(ua) && (rv = parseFloat(RegExp.$1))
  }
  -1 != rv && Modernizr.addTest("ie" + rv, function() {
    return!0
  })
}
Twc.Settings = function() {
  var c = $.trim($("meta[name=sessionid]").attr("content")) || "";
  return{ajaxUrls:{GetCartSummary:"/residential/buyflow/mergedprofile/session/" + c + "/", GetInstallationDates:"/residential/buyflow/installation/dates/session/" + c + "/", GetPackages:"/residential/buyflow/packages/session/" + c + "/"}, cq:{STORE_PICKUP_ID:"1-VZV5", MAIL_TO_HOME_ID:"1-VZUS", TECHNICIAN_VISIT_ID:"1-VZVI"}, sessionId:c, templateUrls:{shoppingCart:"/residential/buyflow/templates/shoppingCart.template"}, forceLogOsd:0, forceErrorOsd:0, runDevOnlyCode:/^twccheckout\./.test(window.location.hostname) || 
  0, breakpoint:{tablet:501, desktop:1100}, dateSelectionHideDelay:200, ModalAjaxTimeout:8E3, modalLoadingMessageDelay:2E3, modalFadeInDuration:400, modalFadeOutDuration:400, ajaxTimeout:3E3, topQuestionsSlideDuration:200, accordianSlideDuration:200, accordianSlideEasing:"linear", accordianFadeDuration:200, accordianFadeEasing:"swing", tabFadeInDuration:400, tabFadeInEasing:"swing", tabShrinkDuration:800, shoppingCartUpdateFadeDuration:300, tooltips:{fadeInDuration:200, fadeOutDuration:200, closeDelay:500}, 
  viewMore:{moreHtml:"View More", lessHtml:"View Less"}, sessionTimeoutEnabled:1, sessionTimeout:9E5, sessionTimeoutWarning:78E4, sessionModalWidth:"450px", sessionModalHeight:"250px", errorModalWidth:"600px", errorModalHeight:"280px", packageFilterCheckboxErrorDelay:2E3, packageFilterErrorSlideDuration:400, packageFilterErrorSlideEasing:"swing", packageLoadFadeDuration:400, packageNavButtonFadeDuration:400, packageSlideDuration:400, packageDetailsFadeInDuration:800, packageDetailsMoreHtml:"View More", 
  packageDetailsLessHtml:"View less", errorListScrollTopPadding:10, _END:null}
}();
Twc.Util = function() {
  var c = 0, b = 0;
  return{getUrl:function(a, b) {
    try {
      var c = null;
      $.ajax({async:!1, timeout:Twc.Settings.ajaxTimeout, url:a, dataType:b, success:function(a) {
        c = a
      }, error:function(a, b, e) {
        Twc.Util.catchError(e)
      }});
      return c
    }catch(d) {
      Twc.Util.catchError(d)
    }
  }, safeParseJson:function(a) {
    try {
      return"undefined" !== typeof a ? $.parseJSON(a) : {}
    }catch(b) {
      return error("Twc.Util.safeParseJson() - Could not parse: " + a), {}
    }
  }, closeOpenInteractives:function() {
    Twc.Tooltip.closeAll();
    Twc.Components.TopQuestions.close();
    Twc.ShoppingCart.close()
  }, initPage:function() {
    log("Util.initPage()");
    Twc.PageInit.global();
    var a = Twc.PageInit[$("body").attr("id")];
    "function" === typeof a && a();
    Twc.Analytics.dispatch($("body").attr("id"))
  }, getUrlParams:function() {
    for(var a = {}, b = location.search.substring(1), c = /([^&=]+)(=([^&]*))*/g, d = null;d = c.exec(b);) {
      var h = "undefined" !== typeof d[3] ? decodeURIComponent(d[3]) : "", d = decodeURIComponent(d[1]);
      a[d] = h
    }
    return a
  }, addClass:function(a, b) {
    a.hasClass(b) || a.addClass(b)
  }, removeClass:function(a, b) {
    a.hasClass(b) && a.removeClass(b)
  }, catchError:function(a) {
    console && console.group(a.name + ": " + a.message);
    error(a);
    error(a.stack);
    console && console.groupEnd()
  }, getDate:function(a) {
    try {
      var b = new String(a), c = b.substring(4, 6) + "/" + b.substring(6, 8) + "/" + b.substring(0, 4), d = new Date(c);
      if("undefined" === typeof d || isNaN(d.getTime())) {
        throw"Invalid Date from " + c;
      }
      return d
    }catch(h) {
      Twc.Util.catchError(h)
    }
  }, getDateInt:function(a) {
    return"undefined" === typeof a || !(a instanceof Date) ? -1 : 1E4 * a.getFullYear() + 100 * (a.getMonth() + 1) + a.getDate()
  }, getTimeString:function(a) {
    try {
      var b = a.split(":"), c = parseInt(b[0], 10), d = parseInt(b[1], 10);
      isNaN(c) && (c = "??");
      isNaN(d) && (d = "??");
      a = 12 <= c ? "pm" : "am";
      return(12 < c ? c - 12 : c) + (0 === d ? "" : ":" + d) + a
    }catch(h) {
      return""
    }
  }, getTimeRangeString:function(a, b) {
    var c = Twc.Util.getTimeString(a), d = Twc.Util.getTimeString(b);
    return"" === c || "" === d ? c + d : c + " to " + d
  }, getDateString:function(a) {
    try {
      return a.getMonth() + 1 + "/" + a.getDate() + "/" + a.getFullYear()
    }catch(b) {
      return Twc.Util.catchError(b), ""
    }
  }, showErrorMessage:function(a) {
    var b = {width:Twc.Settings.errorModalWidth, height:Twc.Settings.errorModalHeight};
    Twc.Modal.close();
    a = $('<div class="error-module" style="margin: 0 0 20px 0; line-height: 1.5em"><div class="error-wrap">ERROR: ' + a.message + '. <br />Please try your request agin.</div></div><div><div class="modal-action-wrapper"><a href="#" class="blue-button">OK</a></div></div>');
    a.find(".modal-action-wrapper").css({"text-align":"center"}).find("a").css({margin:"0 auto", width:"auto", display:"inline-block", clear:"left"}).click(function() {
      Twc.Modal.close();
      return!1
    });
    Twc.Modal.showContent("System Error", a, b)
  }, getNumberUnit:function(a) {
    var b = $.trim(a);
    a = parseInt(b, 10);
    b = b.match(/[^0-9^ ]+/g).join("");
    return[a, b]
  }, invokeAuthorMode:function() {
    log("Twc.Util.invokeAuthorMode()");
    c = !0;
    Twc.Settings.sessionTimeoutEnabled = 0;
    Twc.Session.disableTimeoutFeatures()
  }, invokeIframeMode:function() {
    log("Twc.Util.invokeIframeMode()");
    b = !0;
    Twc.Settings.sessionTimeoutEnabled = 0;
    Twc.Session.disableTimeoutFeatures()
  }, authorModeInvoked:function() {
    return c
  }, iframeModeInvoked:function() {
    return b
  }, getSessionId:function() {
    return Twc.Settings.sessionId
  }}
}();
Twc.Breakpoint = function() {
  function c() {
    var a = e.width();
    return a < Twc.Settings.breakpoint.tablet ? "mobile" : a < Twc.Settings.breakpoint.desktop ? "tablet" : "desktop"
  }
  function b(a) {
    for(var b = 0;b < a.length;b++) {
      var d = a[b];
      "function" === typeof d && d(c())
    }
  }
  var a = !1, e, g, d = [], h = [], f = [];
  return{init:function() {
    a ? warn("Twc.Breakpoint.init(): Already initialized.") : (e = $(window), g = c(), e.on("resize", function() {
      var a = c();
      a !== g && (b(d), "desktop" === g && "tablet" === a ? b(f) : "tablet" === g && "desktop" === a && b(h), g = a)
    }), a = !0)
  }, which:c, onChange:function(a) {
    d.push(a)
  }, onChangeToDesktop:function(a) {
    h.push(a)
  }, onChangeFromDesktop:function(a) {
    f.push(a)
  }}
}();
Twc.Analytics = function() {
  var c = {checkoutPageLoad:function(b, a, c, g) {
    s.pageName = "ebf > " + a;
    "undefined" != typeof c && (s.pageName += " > " + c);
    s.events = b;
    s.prop3 = s.eVar6 = "nyc";
    s.eVar19 = "ebf";
    void 0 != typeof g && (s.prop60 = "ebf:" + g);
    s.t()
  }, selectServiceAnalytics:function(b, a, e) {
    c.checkoutPageLoad(b, a, e, "select & customize");
    $(".checkout-plans .error-module p").each(function() {
      c.checkoutError($(this).text())
    });
    $(".fiveColumnCompareTable header ul").each(function() {
      var a = $(this).attr("data-name"), b = $(this).attr("data-id"), e = $(this).attr("data-enrichedName");
      c.productImpression(a, b, e)
    })
  }, cartAdd:function(b) {
    s.linkTrackVars = "events,products,eVar57,eVar59,eVar6,eVar19";
    s.linkTrackEvents = "scAdd";
    s.events = "scAdd";
    s.products = ";" + b;
    s.eVar57 = b;
    s.eVar59 = s.pageName;
    s.tl(!0, "o", "cart add");
    s.eVar57 = s.eVar59 = s.events = s.products = "";
    s.linkTrackVars = "None";
    s.linkTrackEvents = "None"
  }, checkoutError:function(b) {
    s.linkTrackVars = "eVar57,eVar59,eVar6";
    s.eVar57 = "warning/alert:1:1:" + b;
    s.eVar59 = s.pageName;
    s.tl(!0, "o", "checkout warning/alert");
    s.prop57 = s.eVar59 = ""
  }, rowExpanderOpened:function(b, a) {
    var c = a.find("> header ul"), g = c.attr("data-name"), d = c.attr("data-id"), c = c.attr("data-enrichedName");
    s.linkTrackVars = "events,products,eVar57,eVar59,contextData.ebf_prodid,contextData.ebf_enrichedprodname,eVar6,eVar19";
    s.linkTrackEvents = "prodView,event86";
    s.events = "prodView,event86";
    s.eVar59 = s.pageName;
    s.products = ";" + g;
    s.eVar57 = g;
    s.contextData.ebf_prodid = d;
    s.contextData.ebf_enrichedprodname = c;
    s.tl(!0, "o", "view offer");
    s.eVar57 = s.eVar59 = s.events = s.products = s.contextData.ebf_enrichedprodname = s.contextData.ebf_prodid = "";
    s.linkTrackVars = "None";
    s.linkTrackEvents = "None"
  }, productImpression:function(b, a, c) {
    s.lightTrackVars = "eVar57,eVar59,eVar6,contextData.ebf_prodid,contextData.ebf_enrichedprodname,eVar19";
    s.eVar57 = b;
    s.eVar59 = s.pageName;
    s.contextData.ebf_prodid = a;
    s.contextData.ebf_enrichedprodname = c;
    s.trackLight("imprsn");
    s.prop57 = s.eVar59 = s.contextData.ebf_enrichedprodname = s.contextData.ebf_prodid = ""
  }, topQuestionsClick:function(b, a) {
    s.linkTrackVars = "events,eVar59,eVar57,eVar6";
    s.linkTrackEvents = "event84";
    s.events = "event84";
    s.eVar57 = "checkout top questions:1:" + b + ":" + a.text();
    s.eVar59 = s.pageName;
    s.tl(!0, "o", "checkout top questions");
    s.eVar57 = s.events = s.eVar59 = "";
    s.linkTrackVars = "None";
    s.linkTrackEvents = "None"
  }, reviewOrderPageLoad:function(b) {
    var a = b ? "review order with options" : "review order", e = "event55:" + getAnalyticsSessionID() + "ebf";
    b && (e += ",event43:" + getAnalyticsSessionID() + "ebf");
    c.checkoutPageLoad(e, a)
  }, installationOptionImpression:function(b) {
    s.linkTrackVars = "events,eVar38,eVar6,eVar19";
    s.linkTrackEvents = "event84";
    s.events = "event84";
    s.eVar38 = b;
    s.tl(!0, "o", s.eVar38);
    s.events = s.eVar38 = "";
    s.linkTrackVars = "None";
    s.linkTrackEvents = "None"
  }, reviewOrderComplete:function(b) {
    s.linkTrackVars = "events,eVar38,eVar6,eVar19";
    s.linkTrackEvents = "event86";
    s.events = "event86";
    s.eVar38 = b;
    s.tl(!0, "o", s.eVar38);
    s.events = s.eVar38 = "";
    s.linkTrackVars = "None";
    s.linkTrackEvents = "None"
  }, order_review:function() {
    log("Analytics.order_review()");
    var b = 0 < $(".installation-options input[value='" + Twc.Settings.splitTechnicianVisitId + "']").length;
    c.reviewOrderPageLoad(b);
    1 > $(".installation-options input.radio.installation").length ? c.installationOptionImpression("no install") : $(".installation-options input.radio.installation").each(function() {
      c.installationOptionImpression($(this).attr("data-name"))
    })
  }, select_internet:function() {
    log("Analytics.select_internet()");
    c.selectServiceAnalytics("event28", "select services", "internet")
  }, select_phone:function() {
    log("Analytics.select_phone()");
    c.selectServiceAnalytics("event29", "select service", "digital phone")
  }, select_tv:function() {
    log("Analytics.select_service()");
    c.selectServiceAnalytics("event27", "select services", "digital cable")
  }, select_service:function() {
    log("Analytics.select_service()");
    c.selectServiceAnalytics("event27", "upgrade services", "digital cable")
  }, customize_phone:function() {
    log("Analytics.customize_phone()");
    var b = "configure services", a = "digital phone", b = $(".phone-customize-accordion .collapsible.active");
    1 < b.size() && (a += " > full view");
    switch(b.index()) {
      case 1:
        b = "select or transfer number";
        break;
      case 2:
        b = "installation details";
        break;
      case 3:
        b = "agreements";
        break;
      default:
        b = "configure services"
    }
    c.selectServiceAnalytics("event29", b, a)
  }};
  return{getAnalyticsSessionID:function() {
    var b = $.cookie("twc-analytics-session");
    if(b) {
      return b
    }
    $.ajax({type:"GET", async:!1, url:"/bin/services/generate/id", cache:!1, timeout:3E3, data:"maxIDLength=16&baseEncoding=32"}).done(function(a) {
      $.cookie("twc-analytics-session", a, {expires:null, path:"/"})
    }).fail(function(a, b, c) {
      /^twccheckout\./.test(window.location.hostname) && Twc.Util.catchError(c)
    });
    return $.cookie("twc-analytics-session")
  }, dispatch:function() {
    try {
      if("string" === !typeof arguments[0]) {
        error("Analytics.dispatch(): first argument must be event name")
      }else {
        var b = Array.prototype.slice.call(arguments), a = b.shift(), e = c[a];
        "function" === typeof e ? e.apply(e, b) : warn("Analytics.dispatch(): no function defined for: " + a)
      }
    }catch(g) {
      /^twccheckout\./.test(window.location.hostname) || Twc.Util.catchError(g)
    }
  }}
}();
Twc.DevOnly = function() {
  var c = null;
  Twc.Settings.runDevOnlyCode && (c = Twc.Util.getUrlParams(), "undefined" !== typeof c.qa_force_timeout ? (Twc.Settings.sessionTimeout = 0, Twc.Settings.sessionTimeoutWarning = -1) : "undefined" !== typeof c.qa_force_timeout_warning && (Twc.Settings.sessionTimeout = 9E5, Twc.Settings.sessionTimeoutWarning = 0), "undefined" !== typeof c.qa_force_unknown_error && $(document).ready(function() {
    Twc.Util.showErrorMessage(Error("This is an explicit error thrown for testing"))
  }), "undefined" !== typeof c.qa_force_js_disabled && $("body").addClass("no-js"), "undefined" !== typeof c.qa_force_outdated_browser && $("body").addClass("ie6"));
  return{prepPage:function() {
    if(Twc.Settings.runDevOnlyCode) {
      log("DevOnly.prepPage()");
      var b = c.qa_checkout_step;
      if(b) {
        var a = $(".checkout-steps"), b = a.find(".step-list > li").removeClass("active").eq(b - 1);
        b.addClass("active");
        var e = c.qa_checkout_substep;
        e && (a.addClass("show-sub-steps"), $subSteps = b.find(".sub-steps ul > li").removeClass("active"), $subSteps.eq(e - 1).addClass("active"))
      }
      $(".disclaimer").removeClass("active");
      $(".promo-code .applied-codes li").each(function() {
        var a = $(this);
        a.find(".remove").click(function() {
          a.fadeOut()
        })
      });
      $(".collapsible .button").click(function(a) {
        a.stopPropagation();
        alert("(modal popup to display)")
      });
      $(".collapsible a.toggle").click(function(a) {
        a.preventDefault()
      });
      $(".plans .collapsible, .internet-customize-accordion .collapsible").removeClass("active").find("section").hide();
      "undefined" != typeof c.qa_customize_phone_step && (a = parseInt(c.qa_customize_phone_step, 10) - 1, 0 <= a && 4 > a && ($(".phone-customize-accordion .collapsible").removeClass("active"), b = $(".phone-customize-accordion > .collapsible"), b.filter(":not(:eq(" + a + "))").addClass("disabled"), b.eq(a).addClass("active"), b.filter(":lt(" + a + ")").addClass("complete").removeClass("disabled"), $(".select-or-transfer-option input[type=radio]").eq(1).click(), $(".transfer-number fieldset, .customer-authorization label").removeClass("error"), 
      $(".transfer-number .error-module, .customer-authorization .error-module").hide().find("li").remove(), $(".phone-customize-accordion select").each(function() {
        var a = this.id || this.name;
        $(this).find("option").each(function(b) {
          $(this).attr("value", a + "_" + b)
        })
      }).slice(0, 3).prepend('<option value="" selected="selected">Please select</option>'), a = function(a) {
        a.find("option").each(function(a) {
          $(this).attr("value", 0 === a ? "" : a)
        })
      }, a($("#birth-month")), a($("#birth-day")), a($("#birth-year")), "undefined" != typeof c.qa_customize_tv_autocomplete && ($("#current-provider option").eq(1).prop("selected", !0), $("#current-provider-state option").eq(1).prop("selected", !0), $("#current-provider-state-billing option").eq(1).prop("selected", !0), $("#phone-number, #account-number, #account-name, #address, #city, #zip-code, #full-name1, #full-name2").attr("value", "AUTO-COMPLETED"), $("#choose-TWC").prop("checked", !0), $("#birth-month option").eq(1).prop("selected", 
      !0), $("#birth-day option").eq(1).prop("selected", !0), $("#birth-year option").eq(1).prop("selected", !0))));
      "undefined" != typeof c.qa_customize_tv_step && (a = parseInt(c.qa_customize_tv_step, 10) - 1, 0 <= a && 2 > a && ($(".tv-customize-accordion .collapsible:not(.tabs .collapsible)").removeClass("active"), b = $(".tv-customize-accordion > .collapsible"), b.eq(a).addClass("active")));
      $("#order_review .installation-options .collapsible").each(function(a) {
        if(0 === a) {
          return!0
        }
        $(this).removeClass("active")
      }).eq(0).find(".col a").click(function() {
        alert("A map should display, but we don't have a comp yet");
        return!1
      });
      "undefined" != typeof c.qa_one_installation && $("#order_review .num-visits, #order_review .option-details .date:eq(1)").remove();
      $(".installation-options header input[type=radio] :eq(0)").attr("value", Twc.Settings.cq.STORE_PICKUP_ID);
      $(".installation-options header input[type=radio] :eq(1)").attr("value", Twc.Settings.cq.MAIL_TO_HOME_ID);
      $(".installation-options header input[type=radio] :eq(2)").attr("value", Twc.Settings.cq.TECHNICIAN_VISIT_ID);
      "undefined" != typeof c.dev_calendar_position && $(document).ready(function() {
        var a = $(".installation-options > .collapsible:eq(2)");
        a.find("header").click();
        window.setTimeout(function() {
          a.find(".datepicker-link:eq(0)").click()
        }, 500)
      });
      "select_packages" === $("body").attr("id") && ($(".packages-slider").slice(1).remove(), $(".whats-included-wrap").hide(), $(".whats-included").slice(1, 3).remove(), $(".packages-list, .wrap .error-module").remove())
    }
  }}
}();
Twc.Session = function() {
  function c(a) {
    if(isNaN(a)) {
      return""
    }
    var b;
    1 > a / 1E3 / 60 ? (a /= 1E3, b = 1 != a ? " seconds" : " second") : (a = a / 1E3 / 60, b = 1 != a ? " minutes" : " minute");
    a = 0 == a % 1 ? a : a.toFixed(2);
    return a + " " + b
  }
  function b() {
    var a = "Your session has expired because of " + c(d) + " of inactivity. Please close this window and refresh the page.";
    log(a);
    Twc.Modal.showContent("Session Timeout", a, j)
  }
  function a() {
    Twc.Settings.sessionTimeoutEnabled && (0 <= d && (f = window.setTimeout(function() {
      Twc.Session.expireSession()
    }, d)), 0 <= h && (k = window.setTimeout(function() {
      var a = $("<div>Your session will expire in " + c(d - h) + '. Please click below if you wish to continue.<div class="modal-action-wrapper"><a href="#" class="blue-button">Continue My Session</a></div></div>');
      a.find(".modal-action-wrapper").css({margin:"20px 0 0 0", "text-align":"center"}).find("a").css({margin:"0 auto", width:"auto", display:"inline-block", clear:"left"}).click(function() {
        Twc.Modal.close();
        Twc.Session.resetTimeoutWarning();
        return!1
      });
      Twc.Modal.showContent("Session Timeout Warning", a, j)
    }, h)))
  }
  function e() {
    null != f && (window.clearTimeout(f), f = null);
    null != k && (window.clearTimeout(k), k = null)
  }
  var g = 0, d = Twc.Settings.sessionTimeout, h = Twc.Settings.sessionTimeoutWarning, f = null, k = null, j = {width:Twc.Settings.sessionModalWidth, height:Twc.Settings.sessionModalHeight};
  a();
  return{expireSession:function() {
    Twc.Settings.sessionTimeoutEnabled && (e(), g = !0, b())
  }, resetTimeoutWarning:function() {
    Twc.Settings.sessionTimeoutEnabled && (g ? (log("Session.resetTimeoutWarning(): already expired. Not resetting."), b()) : (log("Session.resetTimeoutWarning()"), e(), a()))
  }, disableTimeoutFeatures:function() {
    log("Twc.Session.disableTimeoutFeatures()");
    Twc.Settings.sessionTimeoutEnabled = 0;
    e()
  }}
}();
Twc.ServicePackages = function() {
  function c() {
    var c = [B.find(".package-header"), B.find(".package-services li:nth-child(1)"), B.find(".package-services li:nth-child(2)"), B.find(".package-services li:nth-child(3)"), B.find(".more-details ul")], d = a(), e = b();
    if(1 === e) {
      for(var q = 0;q < c.length;q++) {
        c[q].css({height:"auto"})
      }
    }else {
      for(var g = 0;g < d;g++) {
        for(q = 0;q < c.length;q++) {
          var f = c[q].slice(g * e, e * (g + 1)), t = 0;
          f.each(function() {
            var a = $(this).outerHeight(!0);
            a > t && (t = a)
          });
          f.css({height:t + "px"})
        }
      }
    }
  }
  function b() {
    return"desktop" === Twc.Breakpoint.which() ? 3 : 1
  }
  function a() {
    return Math.ceil(z.size() / b())
  }
  function e() {
    return"desktop" === Twc.Breakpoint.which() ? -z.eq(x * b()).position().left + "px" : 100 * -x + "%"
  }
  function g(b) {
    D.is(":animated") || (x == a() - 1 ? w.clearQueue().fadeOut(b ? 0 : Twc.Settings.packageNavButtonFadeDuration) : w.clearQueue().fadeIn(b ? 0 : Twc.Settings.packageNavButtonFadeDuration), 0 == x ? E.clearQueue().fadeOut(b ? 0 : Twc.Settings.packageNavButtonFadeDuration) : E.clearQueue().fadeIn(b ? 0 : Twc.Settings.packageNavButtonFadeDuration))
  }
  function d() {
    var a = b(), c = 0;
    z.slice(x * a, x * a + a).each(function() {
      var a = $(this).outerHeight(!0);
      a > c && (c = a)
    });
    D.css({height:c + "px"})
  }
  function h(b) {
    a();
    x = "desktop" === b ? Math.floor(x / 3) : 3 * x;
    0 < D.size() && D.stop(!0, !1).clearQueue().css({"margin-left":e()});
    c();
    d();
    g(!0);
    m()
  }
  function f(b) {
    b = b || !1;
    var c = a(), q;
    b ? (x++, x >= c && (x = c - 1, q = !0)) : (x--, 0 > x && (x = 0, q = !0));
    g();
    q || (j(), b = e(), d(), D.clearQueue().animate({"margin-left":b}, {queue:!1, duration:Twc.Settings.packageSlideDuration, complete:function() {
      g()
    }}))
  }
  function k() {
    var a;
    v.all.checked ? a = !1 : (a = 0, v.tv.checked || a++, v.internet.checked || a++, v.phone.checked || a++, a = 2 <= a);
    if(a) {
      !q && G.is(":not(:animated) :not(:visible)") && (q = !0, null != t && t.abort(), r(), u = C = null, window.clearTimeout(H), H = window.setTimeout(function() {
        G.slideDown(Twc.Settings.packageFilterErrorSlideDuration, Twc.Settings.packageFilterErrorSlideEasing, k)
      }, p))
    }else {
      if(window.clearTimeout(H), q = !1, G.is(":not(:animated) :visible") && G.slideUp(Twc.Settings.packageFilterErrorSlideDuration, Twc.Settings.packageFilterErrorSlideEasing, k), null != u) {
        if(!y.is(":animated")) {
          x = 0;
          var e = $("<div>").html(u);
          a = e.find(".packages-list");
          e = e.find(".js-details");
          M.empty().html(a);
          N.empty().html(e);
          D = B.find(".packages-list");
          z = B.find(".package");
          0 === D.size() && error("Twc.ServicePackages.showLoadedContent(): $packagesList is empty");
          0 === z.size() && error("Twc.ServicePackages.showLoadedContent(): $packages is empty");
          c();
          d(!0);
          I = Array(z.size());
          z.each(function(a) {
            var b = z.eq(a), c = Twc.Util.safeParseJson(b.attr("data-options"));
            I[a] = {viewMore:c.viewMore || O, viewLess:c.viewLess || P};
            b.find(".js-package-details-toggle").html(I[a].viewMore)
          });
          Twc.Modal.initLinks(B.find("a.modal"));
          Twc.Tooltip.init(B.find("a.tooltip"));
          K = e.hide();
          L = z.find(".js-package-details-toggle").each(function(a) {
            $(this).click(function() {
              var c = L.eq(a);
              z.eq(a);
              L.not(":eq(" + a + ")");
              var d = K.eq(a);
              c.is(".active") ? j() : (n(), c.addClass("active").html(I[a].viewLess), c = Q[a % b()], J.stop().clearQueue(), K.hide().stop(!0, !0), F.hasClass("active") ? (d.fadeIn(Twc.Settings.packageDetailsFadeInDuration, "swing"), J.animate({left:c}, Twc.Settings.packageDetailsFadeInDuration / 2, "swing")) : (d.show(), F.stop(!0, !0).slideDown(function() {
                F.addClass("active")
              }), J.css({left:c})), m());
              return!1
            })
          });
          1 > z.size() && (y.removeClass("js-page-desktop"), y.removeClass("js-page"));
          1 < z.size() && y.addClass("js-page");
          3 < z.size() && y.addClass("js-page-desktop");
          u = null;
          g(!0);
          y.stop().animate({opacity:"1"}, {complete:k, duration:Twc.Settings.packageLoadFadeDuration})
        }
      }else {
        if(null == t) {
          var f = Twc.Settings.ajaxUrls.GetPackages + "?show_tv=" + v.tv.checked + "&show_internet=" + v.internet.checked + "&show_phone=" + v.phone.checked + "&show_all=" + v.all.checked;
          f !== C && (null != t && t.abort(), r(), t = $.ajax({url:f, cache:!1, success:function(a) {
            u = a;
            C = f;
            k()
          }, complete:function() {
            t = null
          }}))
        }
      }
    }
  }
  function j() {
    F.stop(!0, !0).slideUp(function() {
      F.removeClass("active")
    });
    n()
  }
  function m() {
    var a = K.filter(":visible").find(".col"), b = "auto";
    if("desktop" === Twc.Breakpoint.which()) {
      var c = 0;
      a.each(function() {
        var a = $(this).height();
        a > c && (c = a)
      });
      b = c + "px"
    }
    a.height(b)
  }
  function n() {
    L.removeClass("active").each(function(a) {
      $(this).html(I[a].viewMore)
    })
  }
  function r() {
    y.stop().animate({opacity:"0"}, {complete:k, duration:Twc.Settings.packageLoadFadeDuration})
  }
  var l = !1, p = Twc.Settings.packageFilterCheckboxErrorDelay, t = null, u = null, q = !1, C = null, H = null, E = null, w = null, A, G, B, D, z, y, v = {}, x = 0, M, N, F, J, L, I, K, Q = ["15.8%", "50%", "84.2%"], P, O;
  return{init:function() {
    if(l) {
      error("Twc.ServicePackages.init(): Already initialized.")
    }else {
      y = $(".packages-slider").css({opacity:0}).removeClass("hidden invisible");
      B = $(".packages-slider-wrap");
      F = y.find(".whats-included-wrap").removeClass("active hidden").hide();
      M = y.find(".js-packages-wrap");
      N = y.find(".js-details-wrap");
      J = y.find(".arrow-indicator");
      G = $(".packages-error").hide().removeClass("hidden invisible");
      A = $(".filter-options input[type=checkbox]");
      E = y.find("a.prev").hide().removeClass("hidden invisible").click(function() {
        f(!1);
        return!1
      });
      w = y.find("a.next").hide().removeClass("hidden invisible").click(function() {
        f(!0);
        return!1
      });
      (1 !== y.size() || 1 !== B.size() || 1 !== F.size() || 1 !== M.size() || 1 !== N.size() || 1 !== J.size() || 1 !== G.size() || 4 !== A.size() || 1 !== E.size() || 1 !== w.size()) && error("Twc.ServicePackages.init(): could not instantiate. Required DOM elements not found.");
      var a = Twc.Util.safeParseJson(y.attr("data-options"));
      P = a.viewLess || Twc.Settings.packageDetailsLessHtml;
      O = a.viewMore || Twc.Settings.packageDetailsMoreHtml;
      B.find(".close").click(function() {
        j();
        return!1
      });
      v.tv = A.filter("[name=tv-filter]").attr("value", "tv")[0];
      v.internet = A.filter("[name=internet-filter]").attr("value", "internet")[0];
      v.phone = A.filter("[name=phone-filter]").attr("value", "phone")[0];
      v.all = A.filter("[name=show-all-filter]").attr("value", "all")[0];
      ("undefined" === typeof v.tv || "undefined" === typeof v.internet || "undefined" === typeof v.phone || "undefined" === typeof v.all || 0 == E.size() || 0 == w.size()) && error("Twc.ServicePackages.init(): could not instantiate. all checkboxes required.");
      A.filter("[name=show-all-filter]").click(function() {
        this.checked && (v.tv.checked = !1, v.internet.checked = !1, v.phone.checked = !1);
        k()
      });
      A.filter(":not([name=show-all-filter])").click(function() {
        this.checked && (v.all.checked = !1);
        k()
      });
      $(document).keyup(function(a) {
        a = a.which;
        37 == a ? f(!1) : 39 == a && f(!0)
      });
      l = !0;
      Twc.Breakpoint.init();
      Twc.Breakpoint.onChange(d);
      Twc.Breakpoint.onChangeFromDesktop(h);
      Twc.Breakpoint.onChangeToDesktop(h);
      k()
    }
  }}
}();
Twc.Templates = function() {
  var c = {};
  return{getRenderedOutput:function(b, a) {
    try {
      if(!c[b]) {
        var e = Twc.Util.getUrl(Twc.Settings.templateUrls[b], "text"), g = dust.compile(e, b);
        dust.loadSource(g);
        c[b] = 1
      }
      var d;
      dust.render(b, a, function(a, b) {
        d = b
      });
      return d
    }catch(h) {
      Twc.Util.catchError(h)
    }
  }}
}();
Twc.PageInit = {};
Twc.PageInit.global = function() {
  $(document).click(Twc.Util.closeOpenInteractives);
  Twc.Modal.initLinks($("a.modal"));
  Twc.Tooltip.init($("a.tooltip"));
  Twc.Components.TopQuestions.init();
  Twc.ShoppingCart.init();
  Twc.DevOnly.prepPage();
  Twc.Components.ViewMore.initObjects($(".disclaimer"))
};
Twc.PageInit.billing = function() {
  log("PageInit.billing()");
  $(window).on("message", function(c) {
    c = Twc.Util.safeParseJson(c.originalEvent.data);
    "undefined" !== typeof c.iFrameHeight && $(".billing-iframe").height(c.iFrameHeight);
    "iFrameDocumentClick" === c.event && $(document).click()
  })
};
Twc.PageInit.billing_pci = function() {
  log("PageInit.billing_pci()");
  Twc.PageInit.billing()
};
Twc.PageInit.billing_iframe = function() {
  function c() {
    var b = {iFrameHeight:$("#iframe-content").outerHeight(!0)};
    window.parent.postMessage(JSON.stringify(b), "*")
  }
  log("PageInit.billing_iframe()");
  $(window).on("resize", function() {
    c();
    var b = "width: " + $("#iframe-content").outerWidth(!0);
    log("IFRAME: " + b)
  }).click(function() {
    window.parent.postMessage(JSON.stringify({event:"iFrameDocumentClick"}), "*")
  });
  $(document).ready(function() {
    log("IFRAME: document.ready()");
    c()
  });
  $(window).on("load", function() {
    log("IFRAME: window.load()");
    c()
  })
};
Twc.PageInit.select_service = function() {
  log("PageInit.select_service()");
  Twc.Components.RowExpander.initRows($(".plans > .collapsible"));
  Twc.Components.RowExpander.initRows($(".cart-module .collapsible"));
  $(".plans > .collapsible li.last a").click(function() {
    var c = $(this).parents("ul").attr("data-name");
    Twc.Analytics.dispatch("cartAdd", c)
  })
};
Twc.PageInit.select_tv = function() {
  log("PageInit.select_tv()");
  Twc.PageInit.select_service()
};
Twc.PageInit.select_phone = function() {
  log("PageInit.select_phone()");
  Twc.PageInit.select_service()
};
Twc.PageInit.select_internet = function() {
  log("PageInit.select_internet()");
  Twc.PageInit.select_service()
};
Twc.PageInit.select_packages = function() {
  log("PageInit.select_packages()");
  Twc.ServicePackages.init()
};
Twc.PageInit.upgrade_internet = function() {
  log("PageInit.upgrade_internet()");
  Twc.Components.RowExpander.initRows($(".plans .collapsible, .internet-customize-accordion .collapsible"));
  Twc.Components.RowExpander.initRows($(".cart-module .collapsible"))
};
Twc.PageInit.customize_tv = function() {
  log("PageInit.customize_tv()");
  Twc.Components.RowExpander.initRows($(".cart-module .collapsible"));
  var c = $(".tv-customize-accordion > .collapsible");
  Twc.Components.RowExpander.initRows(c);
  Twc.Components.RowExpander.initRows(c.eq(0).find(".collapsible"));
  Twc.Components.Tabs.init($(".tv-customize-accordion .tabs"));
  Twc.Components.TableRowExpander.initTable($("table.premiums, table.sports, table.sports-pass"));
  Twc.Components.ViewMore.initObjects($(".js-view-more"));
  $(".quantity select").each(function() {
    var b = $(this), a = b.parent(".quantity"), c = a.find(".confirm");
    b.on("change", function() {
      isNaN(b[0].value) ? c.animate({opacity:0}) : 0 == c.length ? (c = $('<div class="confirm"><span>Cart Updated</span></div>').hide(), a.append(c), c.fadeIn()) : c.fadeOut(function() {
        c.css({opacity:1});
        c.html("<span>Cart Updated</span>");
        c.fadeIn()
      })
    })
  })
};
Twc.PageInit.customize_phone = function() {
  function c(a) {
    a ? n.removeClass("disabled") : n.addClass("disabled")
  }
  function b(a, b, c) {
    b = b.parent("fieldset").addClass("error");
    b = c || b.find("label").text();
    "" === c && (b = c);
    "" !== b && a.$errorList.append("<li>" + b + "</li>")
  }
  function a(a) {
    a = a.offset().top;
    var b = $(window).scrollTop();
    b > a && (b = a - Twc.Settings.errorListScrollTopPadding, $("html, body").animate({scrollTop:b}, Twc.Settings.errorListScrollToDuration, "linear"))
  }
  function e(b) {
    if(b.$errorList.find("li").size()) {
      var c = b.$errorDiv.find(".error-wrap"), d = c.outerHeight(!0);
      b.$errorDiv.is(":visible") ? (a(b.$errorDiv), b.$errorList.removeClass("invisible").hide().fadeIn(), b.$errorDiv.stop().animate({height:d + "px"}, {complete:function() {
        b.$errorList.removeClass("invisible")
      }})) : (b.$errorList.removeClass("invisible").show(), b.$errorDiv.slideDown(function() {
        d = c.outerHeight(!0);
        $(this).css({height:d + "px"})
      }), a(b.$errorDiv))
    }else {
      b.$errorDiv.slideUp()
    }
  }
  function g(a, b) {
    l[a].$errorLabels.removeClass("error");
    l[a].$errorList.empty().addClass("invisible");
    !0 === b && l[a].$errorDiv.hide()
  }
  function d(a) {
    try {
      var c = !1;
      switch(a) {
        case 0:
          return!0;
        case 1:
          var d = l[1];
          "new-number" === d.$newTransferNumber.filter(":checked").val() ? c = !0 : (g(1), "" === d.$currentProvider.val().trim() && b(d, d.$currentProvider), "" === d.$currentProviderState.val().trim() && b(d, d.$currentProviderState), "" === d.$phoneNumber.val().trim() && b(d, d.$phoneNumber), "" === d.$accountNumber.val().trim() && b(d, d.$accountNumber), "" === d.$accountName.val().trim() && b(d, d.$accountName), "" === d.$address1.val().trim() && b(d, d.$address1), "" === d.$city.val().trim() && 
          b(d, d.$city), "" === d.$billingState.val().trim() && b(d, d.$billingState), "" === d.$billingZip.val().trim() && b(d, d.$billingZip), c = 0 === d.$errorList.find("li").size());
          e(l[1]);
          return c;
        case 2:
          return!0;
        case 3:
          var f = l[3];
          g(3);
          var h = f.$fullName1.val().trim(), j = f.$fullName2.val().trim();
          f.$consentCheckbox.is(":checked") || b(f, f.$consentCheckbox, "Authorization checkbox");
          "" === h && b(f, f.$fullName1, "Full Name 1");
          (isNaN(parseInt(f.$birthMonth.val(), 10)) || isNaN(parseInt(f.$birthDay.val(), 10)) || isNaN(parseInt(f.$birthYear.val(), 10))) && b(f, f.$birthMonth, "Birth Date (Month, Day, Year)");
          "" === j && b(f, f.$fullName2, "Full Name 2");
          c = 0 === f.$errorList.find("li").size();
          e(l[3]);
          return c;
        default:
          return!1
      }
    }catch(k) {
      return Twc.Util.catchError(k), !1
    }
  }
  function h(a) {
    if(d(a)) {
      if(a <= r - 2) {
        var b = a + 1;
        f.slice(0, b).addClass("complete");
        f.eq(b).removeClass("disabled");
        k.eq(b).click();
        a === r - 2 && c(!0)
      }else {
        alert("[Page Validation Success. Would navigate to next page]")
      }
    }
  }
  log("PageInit.customize_phone()");
  Twc.Components.InputButton.init($(".blue-button"));
  Twc.Components.RowExpander.initRows($(".cart-module .collapsible"));
  var f = $(".phone-customize-accordion .collapsible:not(.inner-collapse)"), k = f.find("> header"), j = f.find(".collapsible"), m = f.find(".continue a"), n = $(".button-nav .blue-button"), r = f.size();
  c(!1);
  var l = [{}, {$newTransferNumber:$(".select-or-transfer-option input[type=radio]"), $errorLabels:f.eq(1).find(".transfer-number fieldset"), $errorDiv:f.eq(1).find(".transfer-number .error-module"), $errorList:f.eq(1).find(".transfer-number .error-module ul"), $currentProvider:$("#current-provider"), $currentProviderState:$("#current-provider-state"), $phoneNumber:$("#phone-number"), $accountNumber:$("#account-number"), $accountName:$("#account-name"), $securityCode:$("#security-code"), $address1:$("#address"), 
  $aptType:$("#apt-type"), $city:$("#city"), $billingState:$("#current-provider-state-billing"), $billingZip:$("#zip-code")}, {}, {$errorLabels:f.eq(3).find(".checkbox fieldset, .js-full-name1, .birthdate, .js-full-name2"), $errorDiv:f.eq(3).find(".error-module"), $errorList:f.eq(3).find(".error-module ul"), $consentCheckbox:$("#choose-TWC"), $fullName1:$("#full-name1"), $fullName2:$("#full-name2"), $birthDateFieldset:f.eq(3).find(".birthdate"), $birthMonth:$("#birth-month"), $birthDay:$("#birth-day"), 
  $birthYear:$("#birth-year")}];
  m.each(function(a) {
    $(this).click(function() {
      h(a);
      return!1
    })
  });
  n.click(function() {
    n.hasClass("disabled") || h(r - 1);
    return!1
  });
  k.each(function(a) {
    var b = $(this), d = f.eq(a);
    a === r - 1 && d.is(".active") && c(!0);
    b.click(function() {
      d.is(".complete") && (f.slice(a).removeClass("complete").addClass("disabled"), d.removeClass("disabled complete"), a !== r - 1 && c(!1))
    })
  });
  Twc.Components.RowExpander.initRows(f, !0);
  Twc.Components.RowExpander.initRows(j, !1);
  if(!Twc.Util.authorModeInvoked() && (j = $(".select-or-transfer-option input[type=radio]"), 2 === j.length)) {
    var p = $(".transfer-number").hide();
    j[1].checked && p.show();
    j.on("change", function() {
      p.stop(!0, !0);
      "transfer-number" === this.value ? (g(1, !0), e(l[1]), p.slideDown({duration:Twc.Settings.accordianSlideDuration, easing:Twc.Settings.accordianSlideEasing, step:Twc.ShoppingCart.evalPosition, complete:function() {
        e(l[1])
      }})) : p.slideUp({duration:Twc.Settings.accordianSlideDuration, easing:Twc.Settings.accordianSlideEasing, step:Twc.ShoppingCart.evalPosition})
    })
  }
};
Twc.PageInit.customize_internet = function() {
  function c() {
    b.toggleClass("disabled", !0);
    e.each(function() {
      if(this.checked) {
        return b.toggleClass("disabled", !1), !1
      }
    })
  }
  log("PageInit.customize_internet()");
  Twc.Components.InputButton.init($(".blue-button"));
  Twc.Components.RowExpander.initRows($(".cart-module .collapsible"));
  Twc.Components.RowExpander.initRows($(".internet-customize-accordion .collapsible"));
  var b = $(".js-next-button"), a = $("#js-main-form"), e = a.find("header input[type=radio]");
  (1 !== b.size() || 1 !== a.size() || 0 === e.size()) && error("PageInit.customize_internet(): required elements not found");
  e.change(function() {
    c()
  });
  b.click(function() {
    b.hasClass("disabled") || a[0].submit();
    return!1
  });
  c()
};
Twc.PageInit.order_review = function() {
  function c(a, b) {
    var c = Twc.Util.getDateInt(new Date(b)), e = d.installationDates.timesAvailable[c];
    k.eq(a).fadeOut(function() {
      var a = $(this);
      a.empty();
      for(var b = 0;b < e.length;b++) {
        var c = e[b], c = '<option value="TBD">' + Twc.Util.getTimeRangeString(c[0], c[1]) + "</option>";
        a.append(c)
      }
      a.fadeIn()
    })
  }
  function b() {
    n.toggleClass("disabled", !0);
    (l[0].checked || p[0].checked) && n.toggleClass("disabled", !1)
  }
  log("PageInit.order_review()");
  $(".solid-column").css({position:"relative"});
  var a = $(".installation-options > .collapsible");
  Twc.Components.RowExpander.initRows(a, !0);
  var e = $(".num-visits input"), a = $(".option-details .date"), g = a.eq(1);
  e.each(function(a) {
    var b = $(this);
    0 === a && this.checked && g.hide();
    b.click(function() {
      g.stop(!0, !0);
      0 === a ? g.slideUp(Twc.Settings.accordianSlideDuration, Twc.Settings.accordianSlideEasing) : g.slideDown(Twc.Settings.accordianSlideDuration, Twc.Settings.accordianSlideEasing)
    })
  });
  var d = Twc.Util.getUrl(Twc.Settings.ajaxUrls.GetInstallationDates);
  if("undefined" !== typeof d.installationDates) {
    var h = new Twc.Calendar.Options;
    h.dateToday = d.installationDates.dateToday;
    h.appendToSelector = ".solid-column";
    h.excludePreviousMonthNav = 1;
    h.restrictToDatesAvailable = 1;
    h.restrictToLastDateAvailable = 1;
    h.datesAvailable = {};
    var e = [], f;
    for(f in d.installationDates.timesAvailable) {
      0 < d.installationDates.timesAvailable[f].length && (h.datesAvailable[f] = 1, e.push(f))
    }
    e.sort();
    0 < e.length && (h.lastDateAvailable = e[e.length - 1]);
    var k = a.find("select"), j = a.find("input[type=text]");
    j.each(function(a) {
      var b = $(this);
      b.focus(function() {
        h.onDateSelect = function(b) {
          c(a, b)
        };
        Twc.Calendar.show($(this), h)
      }).click(function(a) {
        b.focus();
        a.preventDefault()
      })
    });
    a.find(".datepicker-link").each(function(a) {
      $(this).click(function() {
        j.eq(a).focus();
        return!1
      })
    });
    if(0 < e.length) {
      var m = Twc.Util.getDateString(Twc.Util.getDate(e[0]));
      j.each(function(a) {
        this.value = m;
        c(a, m)
      })
    }
  }else {
    warn("PageInit.order_review(): data.installationDates not found")
  }
  var n = $(".js-next-button"), r = $("#js-main-form");
  f = r.find("input[type=radio][name=installation]");
  var l = $("#pick-up"), p = $("#mail"), a = $("#technician");
  (1 !== n.size() || 1 !== r.size() || 1 !== l.size() || 1 !== p.size() || 1 !== a.size()) && error("PageInit.order_review(): required elements not found");
  f.change(function() {
    b()
  });
  n.click(function() {
    n.hasClass("disabled") || r[0].submit();
    return!1
  });
  b()
};
Twc.PageInit.order_summary = function() {
  log("PageInit.order_summary()")
};
Twc.PageInit.your_services = function() {
  function c() {
    b.toggleClass("disabled", !0);
    e.each(function() {
      if(this.checked) {
        return b.toggleClass("disabled", !1), !1
      }
    })
  }
  log("PageInit.your_services()");
  Twc.Components.InputButton.init($(".blue-button"));
  Twc.Components.ViewMore.initObjects($(".details"));
  var b = $(".js-next-button"), a = $("#js-main-form"), e = a.find("input[type=checkbox]");
  (1 !== a.size() || 0 === e.size()) && error("PageInit.your_services(): required elements not found");
  a.attr("action", b.attr("href"));
  e.change(function() {
    c()
  });
  b.click(function() {
    b.hasClass("disabled") || a[0].submit();
    return!1
  });
  c()
};
Twc.Modal = function() {
  function c() {
    window.clearTimeout(k);
    $(".modal-loading").remove()
  }
  function b(a) {
    if(a.width) {
      var b = Twc.Util.getNumberUnit(a.width);
      m.css({left:"50%", right:"auto", width:b[0] + b[1], marginLeft:-(b[0] / 2) + b[1]})
    }
    if(a.height) {
      b = Twc.Util.getNumberUnit(a.height);
      a = b[0] + b[1];
      var c = "50%", d = -b[0] / 2 + "px";
      "%" === b[1] && (c = (100 - b[0]) / 2 + "%", d = 0);
      m.css({bottom:"auto", height:a, top:c, marginTop:d})
    }
  }
  function a(a, c) {
    c = c || {};
    u = requestId = (new Date).getTime();
    t || ($(document).keyup(function(a) {
      27 === a.keyCode && p && Twc.Modal.close()
    }), t = !0);
    Twc.Modal.close();
    p = !0;
    a = a || "";
    $("body").append(d.clone().hide()).append(h.clone().hide());
    j = $(".modal-overlay-bkg").fadeIn(Twc.Settings.modalFadeInDuration);
    m = $(".modal-window");
    b(c);
    n = m.find(".modal-title");
    r = $(g);
    l = $(".modal-content-outer");
    n.html(a);
    return requestId
  }
  function e(a) {
    var b = p && a === u;
    b || log(a + " Current AJAX Request Expired.");
    return b
  }
  var g = ".modal-content", d = $('<div class="modal-overlay-bkg" onclick="Twc.Modal.close()"></div>'), h = $('<div class="modal-window"><div class="modal-title-wrapper"><div class="modal-title"></div><div class="modal-button-close" onclick="Twc.Modal.close();"></div></div><div class="modal-content-wrapper"><div class="modal-content-outer"><div class="modal-content"></div></div></div></div>'), f = $('<div class="modal-loading">Loading...<a href="#" class="modal-loading-close">cancel</a></div>'), 
  k;
  f.find(".modal-loading-close").click(function() {
    Twc.Modal.close();
    return!1
  });
  var j = null, m = null, n = null, r = null, l = null, p = !1, t = !1, u = null;
  return{initLinks:function(a) {
    try {
      "undefined" === typeof a || !(a instanceof jQuery) ? error("$o is not a jQuery object") : a.each(function() {
        var a = $(this);
        if(a.hasClass("js-modal-initialized")) {
          return error("Already initialized: js-modal-initialized"), !0
        }
        a.click(function() {
          var b = $.trim(a.attr("href")), c = a.attr("title") || a.text();
          Twc.Modal.openUrl(b, c);
          return!1
        });
        a.addClass("js-modal-initialized")
      })
    }catch(b) {
      Twc.Util.catchError(b)
    }
  }, openUrl:function(d, h) {
    try {
      var p = a(h);
      "#" !== d && (c(), j && (k = window.setTimeout(function() {
        j.append(f);
        var a = -f.outerWidth(!0) / 2;
        f.css({"margin-left":a})
      }, Twc.Settings.modalLoadingMessageDelay)), $.ajax({url:d, timeout:Twc.Settings.ModalAjaxTimeout, cache:!1, success:function(a) {
        try {
          if(e(p)) {
            c();
            var d = $("<div>").html(a).find(g);
            if(0 === d.length) {
              Twc.Util.showErrorMessage(Error("test"))
            }else {
              var f = Twc.Util.safeParseJson(d.attr("data-options"));
              b(f);
              l.html(d);
              r = l.find(g);
              "undefined" !== typeof f.title && m.find(".modal-title").html(unescape(f.title));
              if(f.id && "function" === typeof Twc.Modal.LoadInit[f.id]) {
                Twc.Modal.LoadInit[f.id](r)
              }
              m.fadeIn(Twc.Settings.modalFadeInDuration)
            }
          }
        }catch(h) {
          Twc.Util.catchError(h)
        }
      }, error:function(a, b) {
        e(p) && (c(), Twc.Util.showErrorMessage(Error("Content could not be loaded: " + b)))
      }}))
    }catch(n) {
      Twc.Util.catchError(n)
    }
  }, showContent:function(b, c, d) {
    d = d || {};
    a(b, d);
    r.html(c);
    m.fadeIn(Twc.Settings.modalFadeInDuration)
  }, close:function() {
    m && m.remove();
    j && j.remove();
    p = !1
  }}
}();
Twc.Tooltip = function() {
  var c = $('<style type="text/css" title="js-tooltips"></style>'), b = ".tooltip-popup.top .tooltip-content:before, .tooltip-popup.top .tooltip-wrap:before, .tooltip-popup.top .tooltip-wrap:after, .tooltip-popup.bottom .tooltip-content:before, .tooltip-popup.bottom .tooltip-wrap:before, .tooltip-popup.bottom .tooltip-wrap:after";
  return{init:function(a) {
    try {
      if("undefined" === typeof a || !(a instanceof jQuery)) {
        error("$rows is not a jQuery object")
      }else {
        var e = $(window);
        $("head").append(c);
        a.each(function() {
          function a() {
            n = window.setTimeout(function() {
              l.stop(!0, !0).fadeOut(Twc.Settings.tooltips.fadeOutDuration, function() {
                l.hide();
                j = !1
              })
            }, Twc.Settings.tooltips.closeDelay)
          }
          function g() {
            l.stop(!0, !0);
            Twc.Tooltip.closeAll();
            l.css("opacity", 1);
            e.height();
            var a = e.width();
            $(window).scrollTop();
            $("html").scrollTop();
            var d, h, k, r;
            d = f.outerHeight(!0);
            h = f.outerWidth(!0);
            k = f.offset().top;
            r = f.offset().left;
            var m, n;
            m = l.outerHeight(!0);
            n = l.outerWidth(!0);
            var w = e.height() + e.scrollTop(), A = k + d + m;
            d = A >= w ? k - m : k + d;
            l.removeClass("top bottom").addClass(A >= w ? "bottom" : "top");
            w = r - (n / 2 - h / 2);
            A = w + n;
            n > a || 0 > w ? (c.html(b + " {left: " + (r + h / 2) + "px;}"), w = 0) : A > a ? (w = a - n, c.html(b + " {left: " + (r + h / 2 - w) + "px;}"), w += "px") : c.empty();
            l.css({position:"absolute", top:d, left:w});
            l.fadeIn(Twc.Settings.tooltips.fadeInDuration, function() {
              $(this).hover()
            });
            j = !0
          }
          var f = $(this);
          if(f.hasClass("js-tooltip-initialized")) {
            return erorr("tooltip already initialized"), !0
          }
          var k = Twc.Util.safeParseJson(f.attr("data-tooltip"));
          if("undefined" === typeof k.body) {
            return error("Cound not instantiate tooltip"), !0
          }
          var j = !1, m = k.heading ? "<header>" + unescape(k.heading) + "</header>" : "", k = unescape(k.body) || "", n, r = !1, l = $('<div class="tooltip-popup top"><div class="tooltip-content"><div class="tooltip-wrap"><a href="" class="close">Close</a>' + m + k + "</div></div></div>").on("mouseover", function() {
            window.clearTimeout(n)
          }).on("mouseout", function() {
            a()
          }).click(function(a) {
            a.stopPropagation()
          });
          l.find(".close").click(function(a) {
            a.preventDefault();
            l.hide();
            j = !1
          });
          f.click(function(a) {
            a.stopPropagation();
            return!1
          }).on("click mouseover", function() {
            window.clearTimeout(n);
            j || (r ? g() : ($("body").append(l.css("opacity", 0).show()), r = !0, window.setTimeout(function() {
              g()
            }, 0)))
          }).on("mouseout", function() {
            a()
          });
          f.addClass("js-tooltip-initialized")
        })
      }
    }catch(g) {
      Twc.Util.catchError(g)
    }
  }, closeAll:function() {
    $(".tooltip-popup").hide()
  }}
}();
Twc.ShoppingCart = function() {
  function c() {
    a && e && (Twc.Util.removeClass(d, n), Twc.Util.removeClass(d, r), C = q = null, e = !1)
  }
  var b = $(window), a = !1, e = !1, g, d, h, f, k, j, m, n = "cart-float-top", r = "cart-fixed-bottom", l, p, t, u, q, C;
  return{init:function() {
    try {
      d = $(".cart-boundary-wrapper"), h = $(".cart-boundary-left"), f = $(".cart-boundary-right"), k = $(".cart-module-wrapper"), g = k.find(".new-services-cart-module"), j = $(".cart-module"), m = $(".user-options .cart"), 0 < d.length && (0 < k.length && 0 < g.length && 0 < j.length && 0 < m.length) && (m.find("a").click(function(a) {
        a.stopPropagation();
        0 < j.length && (m.hasClass("active") ? Twc.ShoppingCart.close() : (m.addClass("active"), j.addClass("active")));
        return!1
      }), j.click(function(a) {
        a.stopPropagation()
      }), l = g.offset().top, p = k.offset().top, d.offset(), a || b.scroll(function() {
        Twc.ShoppingCart.evalPosition(!0)
      }), a = !0)
    }catch(c) {
      Twc.Util.catchError(c)
    }
  }, evalPosition:function(j) {
    if(a) {
      if("relative" === d.css("position")) {
        if(u = b.scrollTop(), f.height() > h.height() || k.height() > h.height()) {
          c()
        }else {
          if(l <= u) {
            Twc.Util.addClass(d, n);
            e = !0;
            if(null == q || !j) {
              q = g.outerHeight(!0), C = d.height()
            }
            t = p + C - u;
            t <= q ? Twc.Util.addClass(d, r) : Twc.Util.removeClass(d, r)
          }else {
            c()
          }
        }
      }else {
        c()
      }
    }
  }, updateData:function() {
  }, close:function() {
    a && (m.removeClass("active"), j.removeClass("active"))
  }}
}();
Twc.Modal.LoadInit = function() {
  return{_exampleModalTest:function(c) {
    var b = $("<div>JavaScript Initialized for this modal content</div>").hide().css({border:"2px dashed green", padding:"20px", color:"green", "font-size":"1.5em", "font-weight":"bold", "text-align":"center", opacity:"0"});
    c.prepend(b);
    b.slideDown(500, function() {
      b.animate({opacity:1})
    })
  }, compareInternetEquipment:function(c) {
    c.find("a").filter(":not(#mcg-message a)").contents().unwrap();
    c.find("tr:nth-child(odd)").addClass("odd-row")
  }}
}();
Twc.Calendar = function() {
  function c(a, c) {
    var e = Twc.Util.getDate(c.dateToday);
    if("undefined" === typeof e || isNaN(e.getTime())) {
      e = new Date
    }
    a.find(".calendar-month").html(b[d.getMonth()] + " " + d.getFullYear());
    var f = a.find(".calendar-month-dates").html(""), g = new Date(d.getFullYear(), d.getMonth(), 1, 0, 0, 0, 0), l = g.getDay(), p = a.find(".calendar-button-prev");
    c.excludePreviousMonthNav && (g.getFullYear() < e.getFullYear() || g.getFullYear() === e.getFullYear() && g.getMonth() <= e.getMonth()) ? p.hide() : p.show();
    p = a.find(".calendar-button-next");
    if(c.restrictToLastDateAvailable && g.getFullYear() >= e.getFullYear() && g.getMonth() >= g.getMonth()) {
      p.hide();
      var t = Twc.Util.getDate(c.lastDateAvailable);
      "undefined" !== typeof t && (g.getFullYear() <= t.getFullYear() && g.getMonth() < t.getMonth()) && p.show()
    }else {
      p.show()
    }
    g.setDate(0 == l ? -6 : -l + 1);
    l = "";
    for(t = p = 0;42 > t && !(2 === p && 0 === g.getDay());t++) {
      1 === g.getDate() && p++;
      var u = "";
      d.getMonth() !== g.getMonth() && (u += " out");
      0 < t && 0 === g.getDay() && (u += " newline");
      c && c.restrictToDatesAvailable && (c.datesAvailable[Twc.Util.getDateInt(g)] || (u += " day-unavail"));
      null != h && (g.getFullYear() === h.getFullYear() && g.getMonth() === h.getMonth() && g.getDate() === h.getDate()) && (u += " day-selected");
      g.getFullYear() === e.getFullYear() && (g.getMonth() === e.getMonth() && g.getDate() === e.getDate()) && (u += " day-today");
      var q = g.getMonth() + 1 + "/" + g.getDate() + "/" + g.getFullYear(), l = l + ('<div rel="' + q + '" class="day' + u + '">' + g.getDate() + "</div>");
      g.setHours(24)
    }
    f.append(l)
  }
  var b = "January February March April May June July August September October November December".split(" "), a = !1, e = !1, g = null, d = null, h = null, f = Modernizr.ie7 || Modernizr.ie8 || Modernizr.ie9 ? {prev:"&#9668;", next:"&#9658;"} : {prev:"&#9664;", next:"&#9654;"};
  return{isActive:function() {
    return e
  }, show:function(b, j) {
    try {
      j = j || new Twc.Calendar.Options;
      var m = $(j.appendToSelector);
      if(0 === m.length) {
        error("Empty appendToSelector element: " + j.appendToSelector)
      }else {
        var n = m.offset().left, r = m.offset().top;
        Twc.Calendar.closeAll();
        a || ($(document).keyup(function(a) {
          27 === a.keyCode && e && Twc.Calendar.closeAll()
        }), a = !0);
        e = !0;
        g = $(b);
        var l = $.trim(g[0].value);
        d = new Date(l);
        if("undefined" === typeof d || isNaN(d.getTime())) {
          d = Twc.Util.getDate(j.dateToday)
        }
        if("undefined" === typeof d || isNaN(d.getTime())) {
          d = new Date
        }
        h = new Date(d);
        var p = $('<div class="calendar-overlay-bkg"></div>'), t = $('<div class="calendar clearfix"><div class="calendar-nav clearfix"><div class="calendar-button-month calendar-button-prev">' + f.prev + '</div><span class="calendar-month"></span><div class="calendar-button-month calendar-button-next">' + f.next + '</div><div class="calendar-day-labels clearfix"><div class="day">Sun</div><div class="day">Mon</div><div class="day">Tue</div><div class="day">Wed</div><div class="day">Thu</div><div class="day">Fri</div><div class="day">Sat</div></div></div><div class="calendar-month-dates clearfix"></div></div>'), 
        u = p.clone().click(function() {
          Twc.Calendar.closeAll()
        }), q = t.clone();
        q.find(".calendar-month-dates").click(function(a) {
          a.preventDefault();
          var b = j;
          a = $(a.target);
          if(!a.is(".day-unavail")) {
            var c = a.attr("rel");
            $(".calendar-month-dates .day").removeClass("day-selected");
            a.addClass("day-selected");
            window.setTimeout(function() {
              g[0].value = c;
              Twc.Calendar.closeAll();
              if("function" === typeof b.onDateSelect) {
                b.onDateSelect(c)
              }
            }, Twc.Settings.dateSelectionHideDelay)
          }
        });
        var C = g.offset().left, H = g.offset().top + g.outerHeight(!0) + j.topPadding;
        q.css({position:"absolute", left:C - n + "px", top:H - r + "px", margin:0});
        q.find(".calendar-button-prev").click(function(a) {
          a.preventDefault();
          a.stopPropagation();
          d.setDate(0);
          c(q, j)
        });
        q.find(".calendar-button-next").click(function(a) {
          a.preventDefault();
          a.stopPropagation();
          d.setDate(32);
          c(q, j)
        });
        m.eq(0).append(u).append(q);
        c(q, j)
      }
    }catch(E) {
      Twc.Util.catchError(E)
    }
  }, closeAll:function() {
    $(".calendar").remove();
    $(".calendar-overlay-bkg").remove();
    e = !1;
    h = d = g = null
  }}
}();
Twc.Calendar.Options = function() {
  return{dateToday:Twc.Util.getDateInt(new Date), excludePreviousMonthNav:0, restrictToDatesAvailable:0, datesAvailable:{}, restrictToLastDateAvailable:0, lastDateAvailable:null, onDateSelect:null, topPadding:2, appendToSelector:"body"}
};
Twc.Components = {};
Twc.Components.InputButton = function() {
  function c(a, b) {
    b ? a.addClass("checked") : a.removeClass("checked")
  }
  var b = {};
  return{init:function(a) {
    try {
      "undefined" === typeof a || !(a instanceof jQuery) ? error("$objects is not a jQuery object") : a.each(function() {
        var a = $(this);
        if(a.hasClass("js-inputButton-initialized")) {
          return error("Object already initialized: js-inputButton-initialized"), !0
        }
        var d = a.find("input[type=checkbox],input[type=radio]");
        if(1 != d.length) {
          return!0
        }
        if("radio" === d[0].type) {
          var e = d[0].name, f = b[e];
          b[e] = "undefined" === typeof f ? a : f.add(this)
        }
        d.on("change", function() {
          if("radio" === this.type) {
            var d = b[this.name];
            "undefined" !== typeof d && d.removeClass("checked")
          }
          this.checked ? c(a, !0) : c(a, !1)
        });
        d[0].checked ? c(a, !0) : c(a, !1);
        a.addClass("js-inputButton-initialized")
      })
    }catch(e) {
      Twc.Util.catchError(e)
    }
  }}
}();
Twc.Components.Checkbox = function() {
  return{init:function(c) {
    Twc.Components.InputButton.init(c)
  }}
}();
Twc.Components.RowExpander = function() {
  function c(a) {
    a.each(function(a) {
      var c = $(this), d = c.find("> section").stop(!0, !0);
      d.find("> div").stop(!0, !0).animate({opacity:0}, 0, function() {
        b();
        d.slideUp({duration:Twc.Settings.accordianSlideDuration, easing:Twc.Settings.accordianSlideEasing, step:Twc.ShoppingCart.evalPosition, complete:function() {
          c.removeClass("active");
          Twc.Analytics.dispatch("rowExpanderClosed", a, c)
        }})
      })
    })
  }
  function b() {
    var a = window.getSelection ? window.getSelection() : document.selection;
    a && (a.removeAllRanges ? a.removeAllRanges() : a.empty && a.empty())
  }
  return{initRows:function(a, e) {
    try {
      "undefined" === typeof a || !(a instanceof jQuery) ? error("$rows is not a jQuery object") : a.each(function() {
        var d = $(this);
        if(d.hasClass("js-expander-initialized")) {
          return error("Row already initialized: js-expander-initialized"), !0
        }
        d.find(".blue-button").click(function(a) {
          $me = $(this);
          d.hasClass("additional-form") || a.stopPropagation()
        });
        d.find("> header").each(function(g) {
          var f = $(this), k = d.find("> section").stop(!0, !0), j = k.find("> div").stop(!0, !0), m = f.find("input[type=radio]");
          f.find("a:not(.blue-button)").click(function(a) {
            a.preventDefault()
          });
          f.on("click", function(f) {
            if(!("INPUT" !== f.target.tagName && ("LABEL" === f.target.tagName || 0 < $(f.target).parents("label").size())) && !d.hasClass("disabled")) {
              d.hasClass("active") ? (0 === m.size() || m.parents("label").hasClass("js-inputButton-initialized")) && c(d) : (e && c(a.filter(".active")), j.css({opacity:0}), k.hide(), d.addClass("active"), b(), k.slideDown({duration:Twc.Settings.accordianSlideDuration, easing:Twc.Settings.accordianSlideEasing, step:Twc.ShoppingCart.evalPosition, complete:function() {
                j.animate({opacity:1}, Twc.Settings.accordianFadeDuration, Twc.Settings.accordianFadeEasing);
                Twc.Analytics.dispatch("rowExpanderOpened", g, d)
              }}))
            }
          })
        });
        d.addClass("js-expander-initialized")
      })
    }catch(g) {
      Twc.Util.catchError(g)
    }
  }}
}();
Twc.Components.TableRowExpander = function() {
  return{initTable:function(c) {
    try {
      "undefined" === typeof c || !(c instanceof jQuery) ? error("$tables is not a jQuery object") : c.each(function() {
        var a = $(this);
        if(a.hasClass("js-table-expander-initialized")) {
          return error("table already initialized: js-table-expander-initialized"), !0
        }
        var b = a.find("tbody > tr");
        b.each(function(a) {
          var c = $(this);
          if(0 < a && c.hasClass("details")) {
            var h = b.eq(a - 1);
            a = h.find(".toggle");
            0 < a.length && a.click(function() {
              var a = c.find("p");
              h.hasClass("active") ? a.slideUp({duration:Twc.Settings.accordianSlideDuration, step:Twc.ShoppingCart.evalPosition, complete:function() {
                h.removeClass("active")
              }}) : (a.hide(), h.addClass("active"), a.slideDown({duration:Twc.Settings.accordianSlideDuration, step:Twc.ShoppingCart.evalPosition}));
              return!1
            })
          }
        });
        a.addClass("js-table-expander-initialized")
      })
    }catch(b) {
      Twc.Util.catchError(b)
    }
  }}
}();
Twc.Components.TopQuestions = function() {
  var c = null;
  return{init:function() {
    try {
      if(c = $(".questions"), 0 !== c.length) {
        if(c.hasClass("js-top-questions-initialized")) {
          error("Already initialized: js-top-questions-initialized")
        }else {
          var b = c.find(".question-list"), a = b.find(".addflyout"), e = b.find(".flyout"), g = b.find(".flyout a.close");
          c.click(function(a) {
            $(this).toggleClass("active");
            e.removeClass("active").css({left:"auto"});
            a.stopPropagation()
          });
          a.each(function(a) {
            var b = $(this);
            b.click(function(c) {
              e.stop(!0, !0);
              var d = $(this).parent().children(".flyout").css({left:"100%"});
              d.addClass("active");
              d.animate({left:"0"}, Twc.Settings.topQuestionsSlideDuration);
              c.stopPropagation();
              Twc.Analytics.dispatch("topQuestionsClick", a, b);
              return!1
            })
          });
          e.click(function(a) {
            a.stopPropagation()
          });
          g.click(function(a) {
            e.filter(".active").animate({left:"100%"}, Twc.Settings.topQuestionsSlideDuration, function() {
              $(this).removeClass("active")
            });
            a.stopPropagation();
            return!1
          });
          c.addClass("js-top-questions-initialized")
        }
      }
    }catch(d) {
      Twc.Util.catchError(d)
    }
  }, close:function() {
    try {
      0 < c.length && c.removeClass("active")
    }catch(b) {
      Twc.Util.catchError(b)
    }
  }}
}();
Twc.Components.Tabs = function() {
  function c(a) {
    e.removeClass("active").eq(a).addClass("active")
  }
  function b(a, b) {
    if(b || "desktop" !== Twc.Breakpoint.which()) {
      g.removeClass("active").eq(a).addClass("active"), Twc.ShoppingCart.evalPosition()
    }else {
      var c = g.filter(".active").find("section").outerHeight(), e = g.removeClass("active").eq(a), c = e.find("section").stop(!0, !1).css({"min-height":c + "px", opacity:0});
      e.addClass("active");
      c.animate({"min-height":0}, {queue:!1, duration:Twc.Settings.tabShrinkDuration, easing:"swing", step:Twc.ShoppingCart.evalPosition});
      c.animate({opacity:1}, Twc.Settings.tabFadeInDuration, Twc.Settings.tabFadeInEasing)
    }
  }
  function a() {
    var a = 0;
    g.each(function(b) {
      if(g.eq(b).hasClass("active")) {
        return a = b, !1
      }
    });
    c(a);
    b(a, !0)
  }
  var e, g;
  return{init:function(d) {
    try {
      "undefined" === typeof d || !(d instanceof jQuery) ? error("$o is not a jQuery object") : d.hasClass("js-tabs-initialized") ? error("Already initialized: js-tabs-initialized") : (e = d.find(".tab-nav li"), g = d.find(".collapsible"), e.size() !== g.size() || 0 === e.size() ? error("Tabs and tab sections must be equal and greater than zero") : (Twc.Components.RowExpander.initRows(g), e.each(function(a) {
        e.eq(a).find("a").click(function() {
          c(a);
          b(a, !1);
          return!1
        })
      }), Twc.Breakpoint.init(), Twc.Breakpoint.onChangeToDesktop(a), d.addClass("js-tabs-initialized")))
    }catch(h) {
      Twc.Util.catchError(h)
    }
  }}
}();
Twc.Components.ViewMore = function() {
  return{initObjects:function(c) {
    try {
      "undefined" === typeof c || !(c instanceof jQuery) ? error("$objects is not a jQuery object") : c.each(function() {
        var a = $(this);
        if(a.hasClass("js-viewMore-initialized")) {
          return error("Twc.Components.ViewMore.initObjects(): Object already initialized: js-viewMore-initialized"), !0
        }
        var b = a.find(".remaining-text, .js-view-more-content");
        0 === b.size() && (b = a.find("ul"));
        var c = a.find(".view-toggle, .js-view-more-toggle"), d = c;
        c.is("a") || (c = d.find("a"));
        if(1 !== b.size() || 1 !== c.size()) {
          return error("Twc.Components.ViewMore.initObjects(): Required elements not found"), !0
        }
        var h = Twc.Util.safeParseJson(a.attr("data-view-more")), f = h.viewMore || Twc.Settings.viewMore.moreHtml, k = h.viewLess || Twc.Settings.viewMore.lessHtml;
        a.hasClass("active") ? c.html(k) : c.html(f);
        d.click(function() {
          b.stop(!0, !0);
          a.hasClass("active") ? b.slideUp({duration:Twc.Settings.accordianSlideDuration, easing:Twc.Settings.accordianSlideEasing, step:Twc.ShoppingCart.evalPosition, complete:function() {
            a.removeClass("active");
            c.html(f)
          }}) : b.slideDown({duration:Twc.Settings.accordianSlideDuration, easing:Twc.Settings.accordianSlideEasing, step:Twc.ShoppingCart.evalPosition, complete:function() {
            a.addClass("active");
            c.html(k)
          }});
          return!1
        });
        a.addClass("js-viewMore-initialized")
      })
    }catch(b) {
      Twc.Util.catchError(b)
    }
  }}
}();
