import process from 'node:process';globalThis._importMeta_={url:import.meta.url,env:process.env};import { mkdirSync } from 'node:fs';
import { Server } from 'node:http';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { parentPort, threadId } from 'node:worker_threads';
import { getRequestHeader, splitCookiesString, setResponseStatus, setResponseHeader, send, getRequestHeaders, defineEventHandler, handleCacheHeaders, createEvent, fetchWithEvent, isEvent, eventHandler, getResponseStatus, setResponseHeaders, setHeaders, sendRedirect, proxyRequest, createError, getHeader, getCookie, createApp, createRouter as createRouter$1, toNodeListener, lazyEventHandler, getRouterParam, readBody, getQuery as getQuery$1, sendError, getResponseStatusText } from 'file://C:/Users/DELL/Desktop/fronend/node_modules/h3/dist/index.mjs';
import { neon } from 'file://C:/Users/DELL/Desktop/fronend/node_modules/@neondatabase/serverless/index.mjs';
import { getRequestDependencies, getPreloadLinks, getPrefetchLinks, createRenderer } from 'file://C:/Users/DELL/Desktop/fronend/node_modules/vue-bundle-renderer/dist/runtime.mjs';
import { stringify, uneval } from 'file://C:/Users/DELL/Desktop/fronend/node_modules/devalue/index.js';
import destr from 'file://C:/Users/DELL/Desktop/fronend/node_modules/destr/dist/index.mjs';
import { withQuery, joinURL, withTrailingSlash, parseURL, withoutBase, getQuery, joinRelativeURL } from 'file://C:/Users/DELL/Desktop/fronend/node_modules/ufo/dist/index.mjs';
import { propsToString, renderSSRHead } from 'file://C:/Users/DELL/Desktop/fronend/node_modules/@unhead/ssr/dist/index.mjs';
import { createServerHead as createServerHead$1, CapoPlugin } from 'file://C:/Users/DELL/Desktop/fronend/node_modules/unhead/dist/index.mjs';
import { klona } from 'file://C:/Users/DELL/Desktop/fronend/node_modules/klona/dist/index.mjs';
import defu, { defuFn } from 'file://C:/Users/DELL/Desktop/fronend/node_modules/defu/dist/defu.mjs';
import { snakeCase } from 'file://C:/Users/DELL/Desktop/fronend/node_modules/scule/dist/index.mjs';
import { createHooks } from 'file://C:/Users/DELL/Desktop/fronend/node_modules/hookable/dist/index.mjs';
import { createFetch as createFetch$1, Headers as Headers$1 } from 'file://C:/Users/DELL/Desktop/fronend/node_modules/ofetch/dist/node.mjs';
import { createCall, createFetch } from 'file://C:/Users/DELL/Desktop/fronend/node_modules/unenv/runtime/fetch/index.mjs';
import { AsyncLocalStorage } from 'node:async_hooks';
import { consola } from 'file://C:/Users/DELL/Desktop/fronend/node_modules/consola/dist/index.mjs';
import { getContext } from 'file://C:/Users/DELL/Desktop/fronend/node_modules/unctx/dist/index.mjs';
import { captureRawStackTrace, parseRawStackTrace } from 'file://C:/Users/DELL/Desktop/fronend/node_modules/errx/dist/index.js';
import { isVNode, unref, version as version$2 } from 'file://C:/Users/DELL/Desktop/fronend/node_modules/vue/index.mjs';
import { createRemoteJWKSet, jwtVerify } from 'file://C:/Users/DELL/Desktop/fronend/node_modules/jose/dist/node/esm/index.js';
import { hash } from 'file://C:/Users/DELL/Desktop/fronend/node_modules/ohash/dist/index.mjs';
import { createStorage, prefixStorage } from 'file://C:/Users/DELL/Desktop/fronend/node_modules/unstorage/dist/index.mjs';
import unstorage_47drivers_47fs from 'file://C:/Users/DELL/Desktop/fronend/node_modules/unstorage/drivers/fs.mjs';
import { toRouteMatcher, createRouter } from 'file://C:/Users/DELL/Desktop/fronend/node_modules/radix3/dist/index.mjs';
import { defineHeadPlugin } from 'file://C:/Users/DELL/Desktop/fronend/node_modules/@unhead/shared/dist/index.mjs';

function hasReqHeader(event, name, includes) {
  const value = getRequestHeader(event, name);
  return value && typeof value === "string" && value.toLowerCase().includes(includes);
}
function isJsonRequest(event) {
  if (hasReqHeader(event, "accept", "text/html")) {
    return false;
  }
  return hasReqHeader(event, "accept", "application/json") || hasReqHeader(event, "user-agent", "curl/") || hasReqHeader(event, "user-agent", "httpie/") || hasReqHeader(event, "sec-fetch-mode", "cors") || event.path.startsWith("/api/") || event.path.endsWith(".json");
}
function normalizeError(error, isDev) {
  const cwd = typeof process.cwd === "function" ? process.cwd() : "/";
  const stack = (error.unhandled || error.fatal) ? [] : (error.stack || "").split("\n").splice(1).filter((line) => line.includes("at ")).map((line) => {
    const text = line.replace(cwd + "/", "./").replace("webpack:/", "").replace("file://", "").trim();
    return {
      text,
      internal: line.includes("node_modules") && !line.includes(".cache") || line.includes("internal") || line.includes("new Promise")
    };
  });
  const statusCode = error.statusCode || 500;
  const statusMessage = error.statusMessage ?? (statusCode === 404 ? "Not Found" : "");
  const message = error.unhandled ? "internal server error" : error.message || error.toString();
  return {
    stack,
    statusCode,
    statusMessage,
    message
  };
}
function _captureError(error, type) {
  console.error(`[nitro] [${type}]`, error);
  useNitroApp().captureError(error, { tags: [type] });
}
function trapUnhandledNodeErrors() {
  process.on(
    "unhandledRejection",
    (error) => _captureError(error, "unhandledRejection")
  );
  process.on(
    "uncaughtException",
    (error) => _captureError(error, "uncaughtException")
  );
}
function joinHeaders(value) {
  return Array.isArray(value) ? value.join(", ") : String(value);
}
function normalizeFetchResponse(response) {
  if (!response.headers.has("set-cookie")) {
    return response;
  }
  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers: normalizeCookieHeaders(response.headers)
  });
}
function normalizeCookieHeader(header = "") {
  return splitCookiesString(joinHeaders(header));
}
function normalizeCookieHeaders(headers) {
  const outgoingHeaders = new Headers();
  for (const [name, header] of headers) {
    if (name === "set-cookie") {
      for (const cookie of normalizeCookieHeader(header)) {
        outgoingHeaders.append("set-cookie", cookie);
      }
    } else {
      outgoingHeaders.set(name, joinHeaders(header));
    }
  }
  return outgoingHeaders;
}

const errorHandler = (async function errorhandler(error, event) {
  const { stack, statusCode, statusMessage, message } = normalizeError(error);
  const errorObject = {
    url: event.path,
    statusCode,
    statusMessage,
    message,
    stack: statusCode !== 404 ? `<pre>${stack.map((i) => `<span class="stack${i.internal ? " internal" : ""}">${i.text}</span>`).join("\n")}</pre>` : "",
    // TODO: check and validate error.data for serialisation into query
    data: error.data
  };
  if (error.unhandled || error.fatal) {
    const tags = [
      "[nuxt]",
      "[request error]",
      error.unhandled && "[unhandled]",
      error.fatal && "[fatal]",
      Number(errorObject.statusCode) !== 200 && `[${errorObject.statusCode}]`
    ].filter(Boolean).join(" ");
    console.error(tags, (error.message || error.toString() || "internal server error") + "\n" + stack.map((l) => "  " + l.text).join("  \n"));
  }
  if (event.handled) {
    return;
  }
  setResponseStatus(event, errorObject.statusCode !== 200 && errorObject.statusCode || 500, errorObject.statusMessage);
  if (isJsonRequest(event)) {
    setResponseHeader(event, "Content-Type", "application/json");
    return send(event, JSON.stringify(errorObject));
  }
  const reqHeaders = getRequestHeaders(event);
  const isRenderingError = event.path.startsWith("/__nuxt_error") || !!reqHeaders["x-nuxt-error"];
  const res = isRenderingError ? null : await useNitroApp().localFetch(
    withQuery(joinURL(useRuntimeConfig(event).app.baseURL, "/__nuxt_error"), errorObject),
    {
      headers: { ...reqHeaders, "x-nuxt-error": "true" },
      redirect: "manual"
    }
  ).catch(() => null);
  if (!res) {
    const { template } = await Promise.resolve().then(function () { return errorDev; }) ;
    {
      errorObject.description = errorObject.message;
    }
    if (event.handled) {
      return;
    }
    setResponseHeader(event, "Content-Type", "text/html;charset=UTF-8");
    return send(event, template(errorObject));
  }
  const html = await res.text();
  if (event.handled) {
    return;
  }
  for (const [header, value] of res.headers.entries()) {
    setResponseHeader(event, header, value);
  }
  setResponseStatus(event, res.status && res.status !== 200 ? res.status : void 0, res.statusText);
  return send(event, html);
});

const script = `
if (!window.__NUXT_DEVTOOLS_TIME_METRIC__) {
  Object.defineProperty(window, '__NUXT_DEVTOOLS_TIME_METRIC__', {
    value: {},
    enumerable: false,
    configurable: true,
  })
}
window.__NUXT_DEVTOOLS_TIME_METRIC__.appInit = Date.now()
`;

const _7X6pGm0JcE = (function(nitro) {
  nitro.hooks.hook("render:html", (htmlContext) => {
    htmlContext.head.push(`<script>${script}<\/script>`);
  });
});

const rootDir = "C:/Users/DELL/Desktop/fronend";

const appHead = {"meta":[{"charset":"utf-8"},{"name":"viewport","content":"width=device-width, initial-scale=1"},{"hid":"description","name":"description","content":"Buy VOXO - eCommerce VueJs Nuxt + Admin + Email  + Invoice Template by PixelStrap on ThemeForest.  VOXO - Multi-Purpose Responsive Ecommerce VueJs Nuxt Theme VOXO Ecommerce Theme with Multipurpose demos. "},{"name":"format-detection","content":"telephone=no"}],"link":[{"rel":"icon","type":"image/x-icon","href":"/favicon.png"},{"rel":"preconnect","href":"https://fonts.googleapis.com"},{"rel":"preconnect","href":"https://fonts.gstatic.com"},{"rel":"stylesheet","href":"https://fonts.googleapis.com/css2?family=Rubik:wght@400;500;600;700&display=swap"},{"rel":"stylesheet","id":"bootstrap-link","href":"/css/bootstrap.min.css"}],"style":[],"script":[{"src":"https://checkout.stripe.com/checkout.js"},{"src":"https://www.paypal.com/sdk/js?client-id=test&currency=USD"},{"src":"https://cdn.scaleflex.it/plugins/js-cloudimage-360-view/3.0.3/js-cloudimage-360-view.min.js"}],"noscript":[]};

const appRootTag = "div";

const appRootAttrs = {"id":"__nuxt"};

const appTeleportTag = "div";

const appTeleportAttrs = {"id":"teleports"};

const appId = "nuxt-app";

const devReducers = {
  VNode: (data) => isVNode(data) ? { type: data.type, props: data.props } : void 0,
  URL: (data) => data instanceof URL ? data.toString() : void 0
};
const asyncContext = getContext("nuxt-dev", { asyncContext: true, AsyncLocalStorage });
const _qYMLjw2LVA = (nitroApp) => {
  const handler = nitroApp.h3App.handler;
  nitroApp.h3App.handler = (event) => {
    return asyncContext.callAsync({ logs: [], event }, () => handler(event));
  };
  onConsoleLog((_log) => {
    const ctx = asyncContext.tryUse();
    if (!ctx) {
      return;
    }
    const rawStack = captureRawStackTrace();
    if (!rawStack || rawStack.includes("runtime/vite-node.mjs")) {
      return;
    }
    const trace = [];
    let filename = "";
    for (const entry of parseRawStackTrace(rawStack)) {
      if (entry.source === globalThis._importMeta_.url) {
        continue;
      }
      if (EXCLUDE_TRACE_RE.test(entry.source)) {
        continue;
      }
      filename ||= entry.source.replace(withTrailingSlash(rootDir), "");
      trace.push({
        ...entry,
        source: entry.source.startsWith("file://") ? entry.source.replace("file://", "") : entry.source
      });
    }
    const log = {
      ..._log,
      // Pass along filename to allow the client to display more info about where log comes from
      filename,
      // Clean up file names in stack trace
      stack: trace
    };
    ctx.logs.push(log);
  });
  nitroApp.hooks.hook("afterResponse", () => {
    const ctx = asyncContext.tryUse();
    if (!ctx) {
      return;
    }
    return nitroApp.hooks.callHook("dev:ssr-logs", { logs: ctx.logs, path: ctx.event.path });
  });
  nitroApp.hooks.hook("render:html", (htmlContext) => {
    const ctx = asyncContext.tryUse();
    if (!ctx) {
      return;
    }
    try {
      const reducers = Object.assign(/* @__PURE__ */ Object.create(null), devReducers, ctx.event.context._payloadReducers);
      htmlContext.bodyAppend.unshift(`<script type="application/json" data-nuxt-logs="${appId}">${stringify(ctx.logs, reducers)}<\/script>`);
    } catch (e) {
      const shortError = e instanceof Error && "toString" in e ? ` Received \`${e.toString()}\`.` : "";
      console.warn(`[nuxt] Failed to stringify dev server logs.${shortError} You can define your own reducer/reviver for rich types following the instructions in https://nuxt.com/docs/api/composables/use-nuxt-app#payload.`);
    }
  });
};
const EXCLUDE_TRACE_RE = /\/node_modules\/(?:.*\/)?(?:nuxt|nuxt-nightly|nuxt-edge|nuxt3|consola|@vue)\/|core\/runtime\/nitro/;
function onConsoleLog(callback) {
  consola.addReporter({
    log(logObj) {
      callback(logObj);
    }
  });
  consola.wrapConsole();
}

const plugins = [
  _7X6pGm0JcE,
_qYMLjw2LVA
];

const inlineAppConfig = {
  "hanko": {
    "redirects": {
      "login": "/login",
      "home": "/",
      "success": "/",
      "followRedirect": true
    }
  },
  "nuxt": {}
};



const appConfig = defuFn(inlineAppConfig);

function getEnv(key, opts) {
  const envKey = snakeCase(key).toUpperCase();
  return destr(
    process.env[opts.prefix + envKey] ?? process.env[opts.altPrefix + envKey]
  );
}
function _isObject(input) {
  return typeof input === "object" && !Array.isArray(input);
}
function applyEnv(obj, opts, parentKey = "") {
  for (const key in obj) {
    const subKey = parentKey ? `${parentKey}_${key}` : key;
    const envValue = getEnv(subKey, opts);
    if (_isObject(obj[key])) {
      if (_isObject(envValue)) {
        obj[key] = { ...obj[key], ...envValue };
        applyEnv(obj[key], opts, subKey);
      } else if (envValue === void 0) {
        applyEnv(obj[key], opts, subKey);
      } else {
        obj[key] = envValue ?? obj[key];
      }
    } else {
      obj[key] = envValue ?? obj[key];
    }
    if (opts.envExpansion && typeof obj[key] === "string") {
      obj[key] = _expandFromEnv(obj[key]);
    }
  }
  return obj;
}
const envExpandRx = /{{(.*?)}}/g;
function _expandFromEnv(value) {
  return value.replace(envExpandRx, (match, key) => {
    return process.env[key] || match;
  });
}

const _inlineRuntimeConfig = {
  "app": {
    "baseURL": "/",
    "buildId": "dev",
    "buildAssetsDir": "/_nuxt/",
    "cdnURL": ""
  },
  "nitro": {
    "envPrefix": "NUXT_",
    "routeRules": {
      "/__nuxt_error": {
        "cache": false
      },
      "/_nuxt/builds/meta/**": {
        "headers": {
          "cache-control": "public, max-age=31536000, immutable"
        }
      },
      "/_nuxt/builds/**": {
        "headers": {
          "cache-control": "public, max-age=1, immutable"
        }
      }
    }
  },
  "public": {
    "hanko": {
      "apiURL": "https://853c03b6-dcc5-444b-9ac2-042530b388a0.hanko.io",
      "cookieName": "hanko",
      "cookieSameSite": "",
      "cookieDomain": "",
      "components": {}
    },
    "const": {
      "comparePagePath": "/page/compare",
      "cartPagePath": "/page/cart",
      "wishlistPagePath": "/page/wishlist",
      "CommonImagePath": "@/assets/images/",
      "RawHamColorblockTshirt": "Raw Ham Colorblock T-shirt",
      "Review": "5040 Review",
      "Price": "$49.55",
      "Size": "Size",
      "Sizes": [
        "S",
        "M",
        "L",
        "XL",
        "XXL"
      ],
      "Color": "Color",
      "Black": "Black",
      "White": "White",
      "Blue": "Blue",
      "Gray": "Gray",
      "Qty": "Qty",
      "Quantity": [
        1,
        2,
        3,
        4
      ],
      "Addtocart": "Add to cart",
      "AddedToBag": "Added To Bag",
      "sharewith": "Share With",
      "Sale": "Sale",
      "NewTrandingFashion": "New Tranding Fashion",
      "BUYONEGETONE": "BUY ONE GET ONE",
      "FREE": "FREE",
      "Discover": "Discover",
      "OurCollection": "Our Collection",
      "OurCategory": "Our Category",
      "NewArrival": "New Arrival",
      "Newoffers": "New Offers",
      "JustForYou": "Just For You",
      "InstagramShop": "Instagram Shop",
      "NewCollection": "New Collection",
      "LatestProduct": "Latest Product",
      "OurProduct": "Our Product",
      "Mostpopularss": "Most Popular",
      "OurUpdate": "Our News & Update",
      "OurBlog": "Our Blog",
      "Buttons": "Button",
      "SubscribeOurNews": "Subscribe Our News",
      "SubscribeDescription": "Subscribe and receive our newsletters to follow the news about our fresh and fantastic Shoes Products.",
      "ShopNow": "Shop Now",
      "NEW": "New",
      "OFF": "Off",
      "Next": "Next",
      "Prev": "Prev",
      "HurryUp": "Hurry up!",
      "SpecialOffer": "Special Offer",
      "Showdetails": "Show details",
      "LearnMore": "Learn more",
      "VRCollection": "VR Collection",
      "Share": "Share",
      "BUYNOW": "BUY NOW",
      "Discount": "Discount",
      "FreshFruits": "Fresh Fruits",
      "OurNewsUpdate": "Our News & Update",
      "ReadMore": "Read More",
      "Allcategories": "All categories",
      "CategoryList": "Category List",
      "pagenotfound": "page not found",
      "pagedescription": "The page you are looking for doesn't exist or an other error occurred. Go back, or head over to choose a new direction.",
      "BackHomePage": "Back Home Page",
      "Logins": "Login",
      "Username": "Username",
      "Pleasefillthename": "Please fill the name",
      "Password": "Password",
      "Forgotyourpassword": "Forgot your password?",
      "LogIn": "Log In",
      "Orsigninwith": "Or sign in with",
      "Facebook": "Facebook",
      "Google": "Google",
      "Notamember": "Not a member?",
      "Signupnow": "Sign up now",
      "Registers": "Register",
      "Name": "Name",
      "EmailAddress": "Email Address",
      "ConfirmPassword": "Confirm Password",
      "SignUp": "Sign Up",
      "Orsignupwith": "Or sign up with",
      "Alreadyhaveanaccount": "Already have an account?",
      "ForgotPassword": "Forgot Password",
      "EnterEmailAddress": "Enter Email Address",
      "Send": "Send",
      "cartDescription": "Your cart will be expired in",
      "minutes": "minutes !",
      "CheckOut": "Check Out",
      "clearallitems": "clear all items",
      "ContinueShopping": "Continue Shopping",
      "ApplyCoupon": "Apply Coupon",
      "CartTotals": "Cart Totals",
      "TotalMRP": "Total MRP",
      "CouponDiscount": "Coupon Discount",
      "ConvenienceFee": "Convenience Fee",
      "ProcessCheckout": "Process Checkout",
      "Promocode": "Promocode",
      "EXAMPLECODE": "EXAMPLECODE",
      "TotalUSD": "Total (USD)",
      "Yourcart": "Your cart",
      "Country": "Country",
      "CountryArr": [
        "United States",
        "India",
        "America",
        "South America",
        "Dubai",
        "Hong Kong",
        "Indonesia",
        "Pakistan",
        "Saudi Arabia",
        "China"
      ],
      "Choose": "Choose...",
      "State": "State",
      "StateArr": [
        "Gujarat",
        "Maharashtra",
        "Goa",
        "Dehli",
        "Madya Pradesh",
        "Uttar Pradesh",
        "Himacal Pradesh",
        "Rajesthan"
      ],
      "Payment": "Payment",
      "FirstName": "First Name",
      "LastName": "Last Name",
      "SaveInfo": "Save this information for next time",
      "Creditcard": "Credit card",
      "Debitcard": "Debit card",
      "PayPal": "PayPal",
      "Nameoncard": "Name on card",
      "Fullname": "Full name as displayed on card",
      "Creditnumber": "Credit card number",
      "Creditnumberrequired": "Credit card number is required",
      "Expiration": "Expiration",
      "CVV": "CVV",
      "Continuecheckout": "Continue to checkout",
      "Wearecomingsoon": "We are coming soon",
      "ComingDescription": "we are almost there! if you want to get notified when the website goes live, subscribe to our mailing list!",
      "NotifyMe": "Notify Me!",
      "Address": "Address :",
      "ActualAddress": " Riv1418erwood Drive, Suite 3245 Cottonwood, CA 96052, United States",
      "PhoneNumber": "Phone Number :",
      "num1": "+ 185659635",
      "num2": "+ 658651167",
      "ThemeEmail": "voxo123@gmail.com",
      "ThemeEmail2": "voxo158@gmail.com",
      "LetTouch": "Let's get in touch",
      "SuggestionDesc": "We're open for any suggestion or just to have a chat",
      "Submit": "Submit",
      "ConfirmEmail": "Confirm Email",
      "Comment": "Comment",
      "Email": "Email",
      "EmailRequired": "Your email address will not be published. Required fields are marked *",
      "Contactus": "Contact Us",
      "Howhelp": "How can we help you?",
      "OrderSuccess": "Order Success",
      "PaymentDescription": "Payment Is Successfully Processsed And Your Order Is On The Way",
      "TransactionID": "Transaction ID:267676GHERT105467",
      "OrderDetail": "Order Details",
      "summery": "summery",
      "OrderID": "Order ID: 5563853658932",
      "OrderDate": "Order Date: October 22, 2018",
      "OrderTotal": "Order Total: $907.28",
      "shippingaddress": "shipping address",
      "Add1": "Gerg Harvell",
      "Add2": "568, Suite Ave.",
      "Add3": "Austrlia, 235153 Contact No. 48465465465",
      "paymentmethod": "payment method",
      "PayonDelivery": "Pay on Delivery (Cash/Card). Cash on delivery (COD) available. Card/Net banking acceptance subject to device availability.",
      "expecteddate": "expected date of delivery:",
      "fulldate": "october 22, 2018",
      "trackorder": "track order",
      "SearchForProducts": "Search For Products",
      "ShowMenu": "Show Menu",
      "Category": "Category",
      "PopularPosts": "Popular Posts",
      "Johnwick": "John wick",
      "date": "15 Aug 2021",
      "LeaveComments": "Leave Comments",
      "Comments": "Comments",
      "Blogtitle": "Just a Standard Format Post.",
      "BlogDesp1": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, Lorem Ipsum has been the industry'sstandard dummy text ever since the 1500s.looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage.",
      "BlogDesp2": "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latinprofessor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classicalliterature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of de Finibus Bonorum et Malorum (The Extremes of Good and Evil) by Cicero, written in 45BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, Lorem ipsum dolor sit amet.., comes from a line in section 1.10.32.The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from de Finibus Bonorum et Malorum by Cicero are also reproducedin their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.",
      "BlogDesp3": "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normaldistribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum astheir default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes onpurpose injected humour and the like.",
      "loadmore": "Load more",
      "NoProduct": "No More Product",
      "ElementButton": "Element Button",
      "ButtontextSizes": "Button text Sizes",
      "Bootstrapbutton": "Bootstrap button",
      "ButtonOutlines": "Button Outline",
      "Blocklevelbutton": "Block level button",
      "Buttonblock": "Button block",
      "Activelink": "Active link",
      "Links": "Link",
      "Buttongroups": "Button group",
      "Category1": "Category Style 1",
      "Category2": "Category Style 2",
      "Category3": "Category Style 3",
      "Collection1": "Collection Banner 1",
      "Collection2": "Collection Banner 2",
      "Collection3": "Collection Banner 3",
      "Collection4": "Collection Banner 4",
      "Collection5": "Collection Banner 5",
      "Collection6": "Collection Banner 6",
      "Collection7": "Collection Banner 7",
      "Deal1": "Deal Banner 1",
      "Deal2": "Deal Banner 2",
      "Deal3": "Deal Banner 3",
      "Deal4": "Deal Banner 4",
      "Product1": "Product Style 1",
      "Product2": "Product Style 2",
      "Product3": "Product Style 3",
      "Product4": "Product Style 4",
      "Product5": "Product Style 5",
      "Product6": "Product Style 6",
      "All": "All",
      "App": "App",
      "Card": "Card",
      "Web": "Web",
      "ShopTheLatestTrends": "Shop The Latest Trends",
      "shopdescription": "Shop the latest clothing trends with our weekly edit of what's new in online at Voxo. From out latest woman collection.",
      "bannerdescription": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
      "Filter": "Filter",
      "Close": "Close",
      "HideFilter": "Hide Filter",
      "ShowFilter": "Show Filter",
      "Latestfilter": "Latest filter",
      "Brand": "Brand",
      "SpecifyDescription": "The Model is wearing a white blouse from our stylist's collection, see the image for a mock-up of what the actual blouse would look like.it has text written on it in a black cursive language which looks great on a white color.",
      "ProductDescription1": "Nor again is there anyone who loves or pursues or desires to obtain pain of itself, because it is pain, but because occasionally circumstances occur in which toil and pain can procure him          some great pleasure. To take a trivial example, which of us ever undertakes laborious physical exercise, except to obtain some advantage from it? But who has any right to find fault with a man who chooses to enjoy a pleasure that has no annoying consequences, or one who avoids a pain that produces no resultant pleasure.",
      "ProductQuestion1": "Give you a complete account of the system",
      "fabric": "fabric",
      "ProductDescription2": "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab, autem nemo? Tempora vitae assumenda laudantium unde magni, soluta repudiandae quam, neque voluptate deleniti consequatur            laboriosam veritatis? Tempore dolor molestias voluptatum! Minima possimus, pariatur sed, quasi provident dolorum unde molestias, assumenda consequuntur odit magni blanditiis obcaecati? Eacorporis odit dolorem fuga, fugiat soluta consequuntur magni.",
      "ProductDescription3": "Art silk is manufactured by synthetic fibres like rayon. It's light in weight and is soft on the skin for comfort in summers.Art silk is manufactured by synthetic fibres like rayon. It's light in weight and is soft on the skin for comfort in summers.",
      "ProductDescription4": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
      "Customerreviews": "Customer Reviews",
      "numRatings": "82 Ratings",
      "Rating": "Rating",
      "CustomersAlsoBoughtThese": "Customers Also Bought These",
      "LTR": "LTR",
      "RTL": "RTL",
      "Prices": "Price",
      "DiscountRange": "Discount Range",
      "VoxoPlus": "VOXO PLUS",
      "EnjoyExperience": "Enjoy app-like experience",
      "EnjoyExperienceDescription": "With this Screen option you can use Website like an App.",
      "ADDTOHOMESCREEN": "ADD TO HOMESCREEN",
      "wishlist": "Wishlist",
      "VIEWCART": "VIEW CART",
      "English": "English",
      "Franch": "Franch",
      "Spanish": "Spanish",
      "ProceedTOPayment": "Proceed to payment",
      "Total": "Total",
      "SuccessAddtocart": " successfullyadded to you cart.",
      "TOTAL": "TOTAL",
      "orderIn": " orders in last 24 hours",
      "activeView": "active view this",
      "ProductName": "Brand New t-Shirt",
      "BestSeller": "#1 Best seller",
      "infashion": "in fashion",
      "selectsize": "select size",
      "sizechart": "size chart",
      "pleaseselectsize": "please select size",
      "quentityname": "quantity",
      "Days": "Days",
      "Hour": "Hour",
      "Min": "Min",
      "Sec": "Sec",
      "productdetail": "product details",
      "Tags": "Tags",
      "Viewdetails": "View details",
      "CustomerRating": "Customer Rating",
      "GenericName": "Generic Name",
      "Department": "Department",
      "Manufacturer": "Manufacturer",
      "DateFirstAvailable": "Date First Available",
      "image": "image",
      "productname": "product name",
      "price": "price",
      "availability": "availability",
      "action": "action",
      "whoAreWe": "WHO ARE WE",
      "largerFashion": "largest Online fashion destination",
      "aboutUsDesc": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam,\n    culpa! Asperiores labore amet nemo ullam odit atque adipisci,\n    hic, aliquid animi fugiat praesentium quidem. Perspiciatis,\n    expedita!",
      "aboutUsDesc2": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam,\n    culpa! Asperiores labore amet nemo ullam odit atque adipisci,\n    hic, aliquid animi fugiat praesentium quidem. Perspiciatis,\n    expedita!",
      "meetOurTeam": "Meet Our Team",
      "teamDesc": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero assumenda hic porro odio voluptas qui quod sed."
    }
  },
  "SWEDBANK_ACCESS_TOKEN": "c446d494390c638604600ca6908277c9f854c261723adc38900cf2eccdd8d0e8",
  "SWEDBANK_PAYEE_ID": "6794ffe1-dc1f-4b4b-a885-952611f649b4",
  "databaseUrl": "postgresql://PartsShopDB_owner:npg_7LgQKJba5xoI@ep-hidden-shape-abqldvat-pooler.eu-west-2.aws.neon.tech/PartsShopDB?sslmode=require"
};
const envOptions = {
  prefix: "NITRO_",
  altPrefix: _inlineRuntimeConfig.nitro.envPrefix ?? process.env.NITRO_ENV_PREFIX ?? "_",
  envExpansion: _inlineRuntimeConfig.nitro.envExpansion ?? process.env.NITRO_ENV_EXPANSION ?? false
};
const _sharedRuntimeConfig = _deepFreeze(
  applyEnv(klona(_inlineRuntimeConfig), envOptions)
);
function useRuntimeConfig(event) {
  if (!event) {
    return _sharedRuntimeConfig;
  }
  if (event.context.nitro.runtimeConfig) {
    return event.context.nitro.runtimeConfig;
  }
  const runtimeConfig = klona(_inlineRuntimeConfig);
  applyEnv(runtimeConfig, envOptions);
  event.context.nitro.runtimeConfig = runtimeConfig;
  return runtimeConfig;
}
_deepFreeze(klona(appConfig));
function _deepFreeze(object) {
  const propNames = Object.getOwnPropertyNames(object);
  for (const name of propNames) {
    const value = object[name];
    if (value && typeof value === "object") {
      _deepFreeze(value);
    }
  }
  return Object.freeze(object);
}
new Proxy(/* @__PURE__ */ Object.create(null), {
  get: (_, prop) => {
    console.warn(
      "Please use `useRuntimeConfig()` instead of accessing config directly."
    );
    const runtimeConfig = useRuntimeConfig();
    if (prop in runtimeConfig) {
      return runtimeConfig[prop];
    }
    return void 0;
  }
});

const serverAssets = [{"baseName":"server","dir":"C:/Users/DELL/Desktop/fronend/server/assets"}];

const assets = createStorage();

for (const asset of serverAssets) {
  assets.mount(asset.baseName, unstorage_47drivers_47fs({ base: asset.dir, ignore: (asset?.ignore || []) }));
}

const storage = createStorage({});

storage.mount('/assets', assets);

storage.mount('root', unstorage_47drivers_47fs({"driver":"fs","readOnly":true,"base":"C:\\Users\\DELL\\Desktop\\fronend","ignore":["**/node_modules/**","**/.git/**"]}));
storage.mount('src', unstorage_47drivers_47fs({"driver":"fs","readOnly":true,"base":"C:\\Users\\DELL\\Desktop\\fronend\\server","ignore":["**/node_modules/**","**/.git/**"]}));
storage.mount('build', unstorage_47drivers_47fs({"driver":"fs","readOnly":false,"base":"C:\\Users\\DELL\\Desktop\\fronend\\.nuxt","ignore":["**/node_modules/**","**/.git/**"]}));
storage.mount('cache', unstorage_47drivers_47fs({"driver":"fs","readOnly":false,"base":"C:\\Users\\DELL\\Desktop\\fronend\\.nuxt\\cache","ignore":["**/node_modules/**","**/.git/**"]}));
storage.mount('data', unstorage_47drivers_47fs({"driver":"fs","base":"C:\\Users\\DELL\\Desktop\\fronend\\.data\\kv","ignore":["**/node_modules/**","**/.git/**"]}));

function useStorage(base = "") {
  return base ? prefixStorage(storage, base) : storage;
}

function defaultCacheOptions() {
  return {
    name: "_",
    base: "/cache",
    swr: true,
    maxAge: 1
  };
}
function defineCachedFunction(fn, opts = {}) {
  opts = { ...defaultCacheOptions(), ...opts };
  const pending = {};
  const group = opts.group || "nitro/functions";
  const name = opts.name || fn.name || "_";
  const integrity = opts.integrity || hash([fn, opts]);
  const validate = opts.validate || ((entry) => entry.value !== void 0);
  async function get(key, resolver, shouldInvalidateCache, event) {
    const cacheKey = [opts.base, group, name, key + ".json"].filter(Boolean).join(":").replace(/:\/$/, ":index");
    let entry = await useStorage().getItem(cacheKey).catch((error) => {
      console.error(`[nitro] [cache] Cache read error.`, error);
      useNitroApp().captureError(error, { event, tags: ["cache"] });
    }) || {};
    if (typeof entry !== "object") {
      entry = {};
      const error = new Error("Malformed data read from cache.");
      console.error("[nitro] [cache]", error);
      useNitroApp().captureError(error, { event, tags: ["cache"] });
    }
    const ttl = (opts.maxAge ?? 0) * 1e3;
    if (ttl) {
      entry.expires = Date.now() + ttl;
    }
    const expired = shouldInvalidateCache || entry.integrity !== integrity || ttl && Date.now() - (entry.mtime || 0) > ttl || validate(entry) === false;
    const _resolve = async () => {
      const isPending = pending[key];
      if (!isPending) {
        if (entry.value !== void 0 && (opts.staleMaxAge || 0) >= 0 && opts.swr === false) {
          entry.value = void 0;
          entry.integrity = void 0;
          entry.mtime = void 0;
          entry.expires = void 0;
        }
        pending[key] = Promise.resolve(resolver());
      }
      try {
        entry.value = await pending[key];
      } catch (error) {
        if (!isPending) {
          delete pending[key];
        }
        throw error;
      }
      if (!isPending) {
        entry.mtime = Date.now();
        entry.integrity = integrity;
        delete pending[key];
        if (validate(entry) !== false) {
          let setOpts;
          if (opts.maxAge && !opts.swr) {
            setOpts = { ttl: opts.maxAge };
          }
          const promise = useStorage().setItem(cacheKey, entry, setOpts).catch((error) => {
            console.error(`[nitro] [cache] Cache write error.`, error);
            useNitroApp().captureError(error, { event, tags: ["cache"] });
          });
          if (event?.waitUntil) {
            event.waitUntil(promise);
          }
        }
      }
    };
    const _resolvePromise = expired ? _resolve() : Promise.resolve();
    if (entry.value === void 0) {
      await _resolvePromise;
    } else if (expired && event && event.waitUntil) {
      event.waitUntil(_resolvePromise);
    }
    if (opts.swr && validate(entry) !== false) {
      _resolvePromise.catch((error) => {
        console.error(`[nitro] [cache] SWR handler error.`, error);
        useNitroApp().captureError(error, { event, tags: ["cache"] });
      });
      return entry;
    }
    return _resolvePromise.then(() => entry);
  }
  return async (...args) => {
    const shouldBypassCache = await opts.shouldBypassCache?.(...args);
    if (shouldBypassCache) {
      return fn(...args);
    }
    const key = await (opts.getKey || getKey)(...args);
    const shouldInvalidateCache = await opts.shouldInvalidateCache?.(...args);
    const entry = await get(
      key,
      () => fn(...args),
      shouldInvalidateCache,
      args[0] && isEvent(args[0]) ? args[0] : void 0
    );
    let value = entry.value;
    if (opts.transform) {
      value = await opts.transform(entry, ...args) || value;
    }
    return value;
  };
}
function cachedFunction(fn, opts = {}) {
  return defineCachedFunction(fn, opts);
}
function getKey(...args) {
  return args.length > 0 ? hash(args, {}) : "";
}
function escapeKey(key) {
  return String(key).replace(/\W/g, "");
}
function defineCachedEventHandler(handler, opts = defaultCacheOptions()) {
  const variableHeaderNames = (opts.varies || []).filter(Boolean).map((h) => h.toLowerCase()).sort();
  const _opts = {
    ...opts,
    getKey: async (event) => {
      const customKey = await opts.getKey?.(event);
      if (customKey) {
        return escapeKey(customKey);
      }
      const _path = event.node.req.originalUrl || event.node.req.url || event.path;
      let _pathname;
      try {
        _pathname = escapeKey(decodeURI(parseURL(_path).pathname)).slice(0, 16) || "index";
      } catch {
        _pathname = "-";
      }
      const _hashedPath = `${_pathname}.${hash(_path)}`;
      const _headers = variableHeaderNames.map((header) => [header, event.node.req.headers[header]]).map(([name, value]) => `${escapeKey(name)}.${hash(value)}`);
      return [_hashedPath, ..._headers].join(":");
    },
    validate: (entry) => {
      if (!entry.value) {
        return false;
      }
      if (entry.value.code >= 400) {
        return false;
      }
      if (entry.value.body === void 0) {
        return false;
      }
      if (entry.value.headers.etag === "undefined" || entry.value.headers["last-modified"] === "undefined") {
        return false;
      }
      return true;
    },
    group: opts.group || "nitro/handlers",
    integrity: opts.integrity || hash([handler, opts])
  };
  const _cachedHandler = cachedFunction(
    async (incomingEvent) => {
      const variableHeaders = {};
      for (const header of variableHeaderNames) {
        const value = incomingEvent.node.req.headers[header];
        if (value !== void 0) {
          variableHeaders[header] = value;
        }
      }
      const reqProxy = cloneWithProxy(incomingEvent.node.req, {
        headers: variableHeaders
      });
      const resHeaders = {};
      let _resSendBody;
      const resProxy = cloneWithProxy(incomingEvent.node.res, {
        statusCode: 200,
        writableEnded: false,
        writableFinished: false,
        headersSent: false,
        closed: false,
        getHeader(name) {
          return resHeaders[name];
        },
        setHeader(name, value) {
          resHeaders[name] = value;
          return this;
        },
        getHeaderNames() {
          return Object.keys(resHeaders);
        },
        hasHeader(name) {
          return name in resHeaders;
        },
        removeHeader(name) {
          delete resHeaders[name];
        },
        getHeaders() {
          return resHeaders;
        },
        end(chunk, arg2, arg3) {
          if (typeof chunk === "string") {
            _resSendBody = chunk;
          }
          if (typeof arg2 === "function") {
            arg2();
          }
          if (typeof arg3 === "function") {
            arg3();
          }
          return this;
        },
        write(chunk, arg2, arg3) {
          if (typeof chunk === "string") {
            _resSendBody = chunk;
          }
          if (typeof arg2 === "function") {
            arg2(void 0);
          }
          if (typeof arg3 === "function") {
            arg3();
          }
          return true;
        },
        writeHead(statusCode, headers2) {
          this.statusCode = statusCode;
          if (headers2) {
            if (Array.isArray(headers2) || typeof headers2 === "string") {
              throw new TypeError("Raw headers  is not supported.");
            }
            for (const header in headers2) {
              const value = headers2[header];
              if (value !== void 0) {
                this.setHeader(
                  header,
                  value
                );
              }
            }
          }
          return this;
        }
      });
      const event = createEvent(reqProxy, resProxy);
      event.fetch = (url, fetchOptions) => fetchWithEvent(event, url, fetchOptions, {
        fetch: useNitroApp().localFetch
      });
      event.$fetch = (url, fetchOptions) => fetchWithEvent(event, url, fetchOptions, {
        fetch: globalThis.$fetch
      });
      event.context = incomingEvent.context;
      event.context.cache = {
        options: _opts
      };
      const body = await handler(event) || _resSendBody;
      const headers = event.node.res.getHeaders();
      headers.etag = String(
        headers.Etag || headers.etag || `W/"${hash(body)}"`
      );
      headers["last-modified"] = String(
        headers["Last-Modified"] || headers["last-modified"] || (/* @__PURE__ */ new Date()).toUTCString()
      );
      const cacheControl = [];
      if (opts.swr) {
        if (opts.maxAge) {
          cacheControl.push(`s-maxage=${opts.maxAge}`);
        }
        if (opts.staleMaxAge) {
          cacheControl.push(`stale-while-revalidate=${opts.staleMaxAge}`);
        } else {
          cacheControl.push("stale-while-revalidate");
        }
      } else if (opts.maxAge) {
        cacheControl.push(`max-age=${opts.maxAge}`);
      }
      if (cacheControl.length > 0) {
        headers["cache-control"] = cacheControl.join(", ");
      }
      const cacheEntry = {
        code: event.node.res.statusCode,
        headers,
        body
      };
      return cacheEntry;
    },
    _opts
  );
  return defineEventHandler(async (event) => {
    if (opts.headersOnly) {
      if (handleCacheHeaders(event, { maxAge: opts.maxAge })) {
        return;
      }
      return handler(event);
    }
    const response = await _cachedHandler(
      event
    );
    if (event.node.res.headersSent || event.node.res.writableEnded) {
      return response.body;
    }
    if (handleCacheHeaders(event, {
      modifiedTime: new Date(response.headers["last-modified"]),
      etag: response.headers.etag,
      maxAge: opts.maxAge
    })) {
      return;
    }
    event.node.res.statusCode = response.code;
    for (const name in response.headers) {
      const value = response.headers[name];
      if (name === "set-cookie") {
        event.node.res.appendHeader(
          name,
          splitCookiesString(value)
        );
      } else {
        if (value !== void 0) {
          event.node.res.setHeader(name, value);
        }
      }
    }
    return response.body;
  });
}
function cloneWithProxy(obj, overrides) {
  return new Proxy(obj, {
    get(target, property, receiver) {
      if (property in overrides) {
        return overrides[property];
      }
      return Reflect.get(target, property, receiver);
    },
    set(target, property, value, receiver) {
      if (property in overrides) {
        overrides[property] = value;
        return true;
      }
      return Reflect.set(target, property, value, receiver);
    }
  });
}
const cachedEventHandler = defineCachedEventHandler;

function defineRenderHandler(render) {
  const runtimeConfig = useRuntimeConfig();
  return eventHandler(async (event) => {
    const nitroApp = useNitroApp();
    const ctx = { event, render, response: void 0 };
    await nitroApp.hooks.callHook("render:before", ctx);
    if (!ctx.response) {
      if (event.path === `${runtimeConfig.app.baseURL}favicon.ico`) {
        setResponseHeader(event, "Content-Type", "image/x-icon");
        return send(
          event,
          "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"
        );
      }
      ctx.response = await ctx.render(event);
      if (!ctx.response) {
        const _currentStatus = getResponseStatus(event);
        setResponseStatus(event, _currentStatus === 200 ? 500 : _currentStatus);
        return send(
          event,
          "No response returned from render handler: " + event.path
        );
      }
    }
    await nitroApp.hooks.callHook("render:response", ctx.response, ctx);
    if (ctx.response.headers) {
      setResponseHeaders(event, ctx.response.headers);
    }
    if (ctx.response.statusCode || ctx.response.statusMessage) {
      setResponseStatus(
        event,
        ctx.response.statusCode,
        ctx.response.statusMessage
      );
    }
    return ctx.response.body;
  });
}

const config = useRuntimeConfig();
const _routeRulesMatcher = toRouteMatcher(
  createRouter({ routes: config.nitro.routeRules })
);
function createRouteRulesHandler(ctx) {
  return eventHandler((event) => {
    const routeRules = getRouteRules(event);
    if (routeRules.headers) {
      setHeaders(event, routeRules.headers);
    }
    if (routeRules.redirect) {
      let target = routeRules.redirect.to;
      if (target.endsWith("/**")) {
        let targetPath = event.path;
        const strpBase = routeRules.redirect._redirectStripBase;
        if (strpBase) {
          targetPath = withoutBase(targetPath, strpBase);
        }
        target = joinURL(target.slice(0, -3), targetPath);
      } else if (event.path.includes("?")) {
        const query = getQuery(event.path);
        target = withQuery(target, query);
      }
      return sendRedirect(event, target, routeRules.redirect.statusCode);
    }
    if (routeRules.proxy) {
      let target = routeRules.proxy.to;
      if (target.endsWith("/**")) {
        let targetPath = event.path;
        const strpBase = routeRules.proxy._proxyStripBase;
        if (strpBase) {
          targetPath = withoutBase(targetPath, strpBase);
        }
        target = joinURL(target.slice(0, -3), targetPath);
      } else if (event.path.includes("?")) {
        const query = getQuery(event.path);
        target = withQuery(target, query);
      }
      return proxyRequest(event, target, {
        fetch: ctx.localFetch,
        ...routeRules.proxy
      });
    }
  });
}
function getRouteRules(event) {
  event.context._nitro = event.context._nitro || {};
  if (!event.context._nitro.routeRules) {
    event.context._nitro.routeRules = getRouteRulesForPath(
      withoutBase(event.path.split("?")[0], useRuntimeConfig().app.baseURL)
    );
  }
  return event.context._nitro.routeRules;
}
function getRouteRulesForPath(path) {
  return defu({}, ..._routeRulesMatcher.matchAll(path).reverse());
}

const r=Object.create(null),i=e=>globalThis.process?.env||globalThis._importMeta_.env||globalThis.Deno?.env.toObject()||globalThis.__env__||(e?r:globalThis),s=new Proxy(r,{get(e,o){return i()[o]??r[o]},has(e,o){const E=i();return o in E||o in r},set(e,o,E){const b=i(true);return b[o]=E,true},deleteProperty(e,o){if(!o)return  false;const E=i(true);return delete E[o],true},ownKeys(){const e=i(true);return Object.keys(e)}}),t=typeof process<"u"&&process.env&&"development"||"",B=[["APPVEYOR"],["AWS_AMPLIFY","AWS_APP_ID",{ci:true}],["AZURE_PIPELINES","SYSTEM_TEAMFOUNDATIONCOLLECTIONURI"],["AZURE_STATIC","INPUT_AZURE_STATIC_WEB_APPS_API_TOKEN"],["APPCIRCLE","AC_APPCIRCLE"],["BAMBOO","bamboo_planKey"],["BITBUCKET","BITBUCKET_COMMIT"],["BITRISE","BITRISE_IO"],["BUDDY","BUDDY_WORKSPACE_ID"],["BUILDKITE"],["CIRCLE","CIRCLECI"],["CIRRUS","CIRRUS_CI"],["CLOUDFLARE_PAGES","CF_PAGES",{ci:true}],["CODEBUILD","CODEBUILD_BUILD_ARN"],["CODEFRESH","CF_BUILD_ID"],["DRONE"],["DRONE","DRONE_BUILD_EVENT"],["DSARI"],["GITHUB_ACTIONS"],["GITLAB","GITLAB_CI"],["GITLAB","CI_MERGE_REQUEST_ID"],["GOCD","GO_PIPELINE_LABEL"],["LAYERCI"],["HUDSON","HUDSON_URL"],["JENKINS","JENKINS_URL"],["MAGNUM"],["NETLIFY"],["NETLIFY","NETLIFY_LOCAL",{ci:false}],["NEVERCODE"],["RENDER"],["SAIL","SAILCI"],["SEMAPHORE"],["SCREWDRIVER"],["SHIPPABLE"],["SOLANO","TDDIUM"],["STRIDER"],["TEAMCITY","TEAMCITY_VERSION"],["TRAVIS"],["VERCEL","NOW_BUILDER"],["VERCEL","VERCEL",{ci:false}],["VERCEL","VERCEL_ENV",{ci:false}],["APPCENTER","APPCENTER_BUILD_ID"],["CODESANDBOX","CODESANDBOX_SSE",{ci:false}],["STACKBLITZ"],["STORMKIT"],["CLEAVR"],["ZEABUR"],["CODESPHERE","CODESPHERE_APP_ID",{ci:true}],["RAILWAY","RAILWAY_PROJECT_ID"],["RAILWAY","RAILWAY_SERVICE_ID"],["DENO-DEPLOY","DENO_DEPLOYMENT_ID"],["FIREBASE_APP_HOSTING","FIREBASE_APP_HOSTING",{ci:true}]];function p(){if(globalThis.process?.env)for(const e of B){const o=e[1]||e[0];if(globalThis.process?.env[o])return {name:e[0].toLowerCase(),...e[2]}}return globalThis.process?.env?.SHELL==="/bin/jsh"&&globalThis.process?.versions?.webcontainer?{name:"stackblitz",ci:false}:{name:"",ci:false}}const l=p(),d=l.name;function n(e){return e?e!=="false":false}const I=globalThis.process?.platform||"",T=n(s.CI)||l.ci!==false,R=n(globalThis.process?.stdout&&globalThis.process?.stdout.isTTY);n(s.DEBUG);const A=t==="test"||n(s.TEST);n(s.MINIMAL)||T||A||!R;const _=/^win/i.test(I);!n(s.NO_COLOR)&&(n(s.FORCE_COLOR)||(R||_)&&s.TERM!=="dumb"||T);const C=(globalThis.process?.versions?.node||"").replace(/^v/,"")||null;Number(C?.split(".")[0])||null;const y=globalThis.process||Object.create(null),c={versions:{}};new Proxy(y,{get(e,o){if(o==="env")return s;if(o in e)return e[o];if(o in c)return c[o]}});const L=globalThis.process?.release?.name==="node",a=!!globalThis.Bun||!!globalThis.process?.versions?.bun,D=!!globalThis.Deno,O=!!globalThis.fastly,S=!!globalThis.Netlify,N=!!globalThis.EdgeRuntime,P=globalThis.navigator?.userAgent==="Cloudflare-Workers",F=[[S,"netlify"],[N,"edge-light"],[P,"workerd"],[O,"fastly"],[D,"deno"],[a,"bun"],[L,"node"]];function G(){const e=F.find(o=>o[0]);if(e)return {name:e[1]}}const u=G();u?.name||"";

const scheduledTasks = false;

const tasks = {
  
};

const __runningTasks__ = {};
async function runTask(name, {
  payload = {},
  context = {}
} = {}) {
  if (__runningTasks__[name]) {
    return __runningTasks__[name];
  }
  if (!(name in tasks)) {
    throw createError({
      message: `Task \`${name}\` is not available!`,
      statusCode: 404
    });
  }
  if (!tasks[name].resolve) {
    throw createError({
      message: `Task \`${name}\` is not implemented!`,
      statusCode: 501
    });
  }
  const handler = await tasks[name].resolve();
  const taskEvent = { name, payload, context };
  __runningTasks__[name] = handler.run(taskEvent);
  try {
    const res = await __runningTasks__[name];
    return res;
  } finally {
    delete __runningTasks__[name];
  }
}

function buildAssetsDir() {
  return useRuntimeConfig().app.buildAssetsDir;
}
function buildAssetsURL(...path) {
  return joinRelativeURL(publicAssetsURL(), buildAssetsDir(), ...path);
}
function publicAssetsURL(...path) {
  const app = useRuntimeConfig().app;
  const publicBase = app.cdnURL || app.baseURL;
  return path.length ? joinRelativeURL(publicBase, ...path) : publicBase;
}

async function verifyHankoEvent(event) {
  const hankoConfig = useRuntimeConfig().public.hanko;
  const jwksHost = hankoConfig.apiURL;
  const JWKS = createRemoteJWKSet(new URL(`${jwksHost}/.well-known/jwks.json`));
  const cookieName = hankoConfig.cookieName;
  const jwt = getHeader(event, "authorization")?.split(" ").pop() || getCookie(event, cookieName);
  if (!jwt) {
    throw createError({
      statusCode: 401
    });
  }
  return await jwtVerify(jwt, JWKS).then((r) => r.payload);
}

const _rtYxPZ = defineEventHandler(async (event) => {
  event.context.hanko = await verifyHankoEvent(event).catch(() => void 0);
});

const _lazy_jFCGUv = () => Promise.resolve().then(function () { return blogs_post$1; });
const _lazy_uL9iIk = () => Promise.resolve().then(function () { return blogs$1; });
const _lazy_xhWwUD = () => Promise.resolve().then(function () { return _id__put$1; });
const _lazy_7TzKwr = () => Promise.resolve().then(function () { return _id_$3; });
const _lazy_VFjeIg = () => Promise.resolve().then(function () { return _id_$1; });
const _lazy_2oS0wW = () => Promise.resolve().then(function () { return _slug_$1; });
const _lazy_CGSrwQ = () => Promise.resolve().then(function () { return contact_post$1; });
const _lazy_fjF3DR = () => Promise.resolve().then(function () { return initiatePayment$1; });
const _lazy_xpMbo6 = () => Promise.resolve().then(function () { return subscribe_post$1; });
const _lazy_4zF49U = () => Promise.resolve().then(function () { return unsubscribe_post$1; });
const _lazy_8e8y0C = () => Promise.resolve().then(function () { return callback$1; });
const _lazy_Bhq6c2 = () => Promise.resolve().then(function () { return payment$1; });
const _lazy_yeU3lG = () => Promise.resolve().then(function () { return version$1; });
const _lazy_3MsgpG = () => Promise.resolve().then(function () { return renderer$1; });

const handlers = [
  { route: '/api/blogs', handler: _lazy_jFCGUv, lazy: true, middleware: false, method: "post" },
  { route: '/api/blogs', handler: _lazy_uL9iIk, lazy: true, middleware: false, method: undefined },
  { route: '/api/blogs/:id', handler: _lazy_xhWwUD, lazy: true, middleware: false, method: "put" },
  { route: '/api/blogs/:id', handler: _lazy_7TzKwr, lazy: true, middleware: false, method: undefined },
  { route: '/api/blogs/delete/:id', handler: _lazy_VFjeIg, lazy: true, middleware: false, method: undefined },
  { route: '/api/blogs/slug/:slug', handler: _lazy_2oS0wW, lazy: true, middleware: false, method: undefined },
  { route: '/api/contactus/contact', handler: _lazy_CGSrwQ, lazy: true, middleware: false, method: "post" },
  { route: '/api/initiate-payment', handler: _lazy_fjF3DR, lazy: true, middleware: false, method: undefined },
  { route: '/api/newsletter/subscribe', handler: _lazy_xpMbo6, lazy: true, middleware: false, method: "post" },
  { route: '/api/newsletter/unsubscribe', handler: _lazy_4zF49U, lazy: true, middleware: false, method: "post" },
  { route: '/api/payment/callback', handler: _lazy_8e8y0C, lazy: true, middleware: false, method: undefined },
  { route: '/api/payment/payment', handler: _lazy_Bhq6c2, lazy: true, middleware: false, method: undefined },
  { route: '/api/version', handler: _lazy_yeU3lG, lazy: true, middleware: false, method: undefined },
  { route: '/__nuxt_error', handler: _lazy_3MsgpG, lazy: true, middleware: false, method: undefined },
  { route: '', handler: _rtYxPZ, lazy: false, middleware: true, method: undefined },
  { route: '/**', handler: _lazy_3MsgpG, lazy: true, middleware: false, method: undefined }
];

function createNitroApp() {
  const config = useRuntimeConfig();
  const hooks = createHooks();
  const captureError = (error, context = {}) => {
    const promise = hooks.callHookParallel("error", error, context).catch((error_) => {
      console.error("Error while capturing another error", error_);
    });
    if (context.event && isEvent(context.event)) {
      const errors = context.event.context.nitro?.errors;
      if (errors) {
        errors.push({ error, context });
      }
      if (context.event.waitUntil) {
        context.event.waitUntil(promise);
      }
    }
  };
  const h3App = createApp({
    debug: destr(true),
    onError: (error, event) => {
      captureError(error, { event, tags: ["request"] });
      return errorHandler(error, event);
    },
    onRequest: async (event) => {
      await nitroApp$1.hooks.callHook("request", event).catch((error) => {
        captureError(error, { event, tags: ["request"] });
      });
    },
    onBeforeResponse: async (event, response) => {
      await nitroApp$1.hooks.callHook("beforeResponse", event, response).catch((error) => {
        captureError(error, { event, tags: ["request", "response"] });
      });
    },
    onAfterResponse: async (event, response) => {
      await nitroApp$1.hooks.callHook("afterResponse", event, response).catch((error) => {
        captureError(error, { event, tags: ["request", "response"] });
      });
    }
  });
  const router = createRouter$1({
    preemptive: true
  });
  const localCall = createCall(toNodeListener(h3App));
  const _localFetch = createFetch(localCall, globalThis.fetch);
  const localFetch = (input, init) => _localFetch(input, init).then(
    (response) => normalizeFetchResponse(response)
  );
  const $fetch = createFetch$1({
    fetch: localFetch,
    Headers: Headers$1,
    defaults: { baseURL: config.app.baseURL }
  });
  globalThis.$fetch = $fetch;
  h3App.use(createRouteRulesHandler({ localFetch }));
  h3App.use(
    eventHandler((event) => {
      event.context.nitro = event.context.nitro || { errors: [] };
      const envContext = event.node.req?.__unenv__;
      if (envContext) {
        Object.assign(event.context, envContext);
      }
      event.fetch = (req, init) => fetchWithEvent(event, req, init, { fetch: localFetch });
      event.$fetch = (req, init) => fetchWithEvent(event, req, init, {
        fetch: $fetch
      });
      event.waitUntil = (promise) => {
        if (!event.context.nitro._waitUntilPromises) {
          event.context.nitro._waitUntilPromises = [];
        }
        event.context.nitro._waitUntilPromises.push(promise);
        if (envContext?.waitUntil) {
          envContext.waitUntil(promise);
        }
      };
      event.captureError = (error, context) => {
        captureError(error, { event, ...context });
      };
    })
  );
  for (const h of handlers) {
    let handler = h.lazy ? lazyEventHandler(h.handler) : h.handler;
    if (h.middleware || !h.route) {
      const middlewareBase = (config.app.baseURL + (h.route || "/")).replace(
        /\/+/g,
        "/"
      );
      h3App.use(middlewareBase, handler);
    } else {
      const routeRules = getRouteRulesForPath(
        h.route.replace(/:\w+|\*\*/g, "_")
      );
      if (routeRules.cache) {
        handler = cachedEventHandler(handler, {
          group: "nitro/routes",
          ...routeRules.cache
        });
      }
      router.use(h.route, handler, h.method);
    }
  }
  h3App.use(config.app.baseURL, router.handler);
  const app = {
    hooks,
    h3App,
    router,
    localCall,
    localFetch,
    captureError
  };
  return app;
}
function runNitroPlugins(nitroApp2) {
  for (const plugin of plugins) {
    try {
      plugin(nitroApp2);
    } catch (error) {
      nitroApp2.captureError(error, { tags: ["plugin"] });
      throw error;
    }
  }
}
const nitroApp$1 = createNitroApp();
function useNitroApp() {
  return nitroApp$1;
}
runNitroPlugins(nitroApp$1);

const nitroApp = useNitroApp();
const server = new Server(toNodeListener(nitroApp.h3App));
function getAddress() {
  if (d === "stackblitz" || process.env.NITRO_NO_UNIX_SOCKET || process.versions.bun) {
    return 0;
  }
  const socketName = `worker-${process.pid}-${threadId}.sock`;
  if (_) {
    return join(String.raw`\\.\pipe\nitro`, socketName);
  }
  const socketDir = join(tmpdir(), "nitro");
  mkdirSync(socketDir, { recursive: true });
  return join(socketDir, socketName);
}
const listenAddress = getAddress();
server.listen(listenAddress, () => {
  const _address = server.address();
  parentPort?.postMessage({
    event: "listen",
    address: typeof _address === "string" ? { socketPath: _address } : { host: "localhost", port: _address?.port }
  });
});
nitroApp.router.get(
  "/_nitro/tasks",
  defineEventHandler(async (event) => {
    const _tasks = await Promise.all(
      Object.entries(tasks).map(async ([name, task]) => {
        const _task = await task.resolve?.();
        return [name, { description: _task?.meta?.description }];
      })
    );
    return {
      tasks: Object.fromEntries(_tasks),
      scheduledTasks
    };
  })
);
nitroApp.router.use(
  "/_nitro/tasks/:name",
  defineEventHandler(async (event) => {
    const name = getRouterParam(event, "name");
    const payload = {
      ...getQuery$1(event),
      ...await readBody(event).then((r) => r?.payload).catch(() => ({}))
    };
    return await runTask(name, { payload });
  })
);
trapUnhandledNodeErrors();
async function onShutdown(signal) {
  await nitroApp.hooks.callHook("close");
}
parentPort?.on("message", async (msg) => {
  if (msg && msg.event === "shutdown") {
    await onShutdown();
    parentPort?.postMessage({ event: "exit" });
  }
});

const _messages = { "appName": "Nuxt", "version": "", "statusCode": 500, "statusMessage": "Server error", "description": "An error occurred in the application and the page could not be served. If you are the application owner, check your server logs for details.", "stack": "" };
const template$1 = (messages) => {
  messages = { ..._messages, ...messages };
  return '<!DOCTYPE html><html lang="en"><head><title>' + messages.statusCode + " - " + messages.statusMessage + " | " + messages.appName + `</title><meta charset="utf-8"><meta content="width=device-width,initial-scale=1.0,minimum-scale=1.0" name="viewport"><style>.spotlight{background:linear-gradient(45deg,#00dc82,#36e4da 50%,#0047e1);bottom:-40vh;filter:blur(30vh);height:60vh;opacity:.8}*,:after,:before{border-color:var(--un-default-border-color,#e5e7eb);border-style:solid;border-width:0;box-sizing:border-box}:after,:before{--un-content:""}html{line-height:1.5;-webkit-text-size-adjust:100%;font-family:ui-sans-serif,system-ui,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji;font-feature-settings:normal;font-variation-settings:normal;-moz-tab-size:4;tab-size:4;-webkit-tap-highlight-color:transparent}body{line-height:inherit;margin:0}h1{font-size:inherit;font-weight:inherit}pre{font-family:ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,Liberation Mono,Courier New,monospace;font-feature-settings:normal;font-size:1em;font-variation-settings:normal}h1,p,pre{margin:0}*,:after,:before{--un-rotate:0;--un-rotate-x:0;--un-rotate-y:0;--un-rotate-z:0;--un-scale-x:1;--un-scale-y:1;--un-scale-z:1;--un-skew-x:0;--un-skew-y:0;--un-translate-x:0;--un-translate-y:0;--un-translate-z:0;--un-pan-x: ;--un-pan-y: ;--un-pinch-zoom: ;--un-scroll-snap-strictness:proximity;--un-ordinal: ;--un-slashed-zero: ;--un-numeric-figure: ;--un-numeric-spacing: ;--un-numeric-fraction: ;--un-border-spacing-x:0;--un-border-spacing-y:0;--un-ring-offset-shadow:0 0 transparent;--un-ring-shadow:0 0 transparent;--un-shadow-inset: ;--un-shadow:0 0 transparent;--un-ring-inset: ;--un-ring-offset-width:0px;--un-ring-offset-color:#fff;--un-ring-width:0px;--un-ring-color:rgba(147,197,253,.5);--un-blur: ;--un-brightness: ;--un-contrast: ;--un-drop-shadow: ;--un-grayscale: ;--un-hue-rotate: ;--un-invert: ;--un-saturate: ;--un-sepia: ;--un-backdrop-blur: ;--un-backdrop-brightness: ;--un-backdrop-contrast: ;--un-backdrop-grayscale: ;--un-backdrop-hue-rotate: ;--un-backdrop-invert: ;--un-backdrop-opacity: ;--un-backdrop-saturate: ;--un-backdrop-sepia: }.fixed{position:fixed}.left-0{left:0}.right-0{right:0}.z-10{z-index:10}.mb-6{margin-bottom:1.5rem}.mb-8{margin-bottom:2rem}.h-auto{height:auto}.min-h-screen{min-height:100vh}.flex{display:flex}.flex-1{flex:1 1 0%}.flex-col{flex-direction:column}.overflow-y-auto{overflow-y:auto}.rounded-t-md{border-top-left-radius:.375rem;border-top-right-radius:.375rem}.bg-black\\/5{background-color:#0000000d}.bg-white{--un-bg-opacity:1;background-color:rgb(255 255 255/var(--un-bg-opacity))}.p-8{padding:2rem}.px-10{padding-left:2.5rem;padding-right:2.5rem}.pt-14{padding-top:3.5rem}.text-6xl{font-size:3.75rem;line-height:1}.text-xl{font-size:1.25rem;line-height:1.75rem}.text-black{--un-text-opacity:1;color:rgb(0 0 0/var(--un-text-opacity))}.font-light{font-weight:300}.font-medium{font-weight:500}.leading-tight{line-height:1.25}.font-sans{font-family:ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji}.antialiased{-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale}@media (prefers-color-scheme:dark){.dark\\:bg-black{--un-bg-opacity:1;background-color:rgb(0 0 0/var(--un-bg-opacity))}.dark\\:bg-white\\/10{background-color:#ffffff1a}.dark\\:text-white{--un-text-opacity:1;color:rgb(255 255 255/var(--un-text-opacity))}}@media (min-width:640px){.sm\\:text-2xl{font-size:1.5rem;line-height:2rem}.sm\\:text-8xl{font-size:6rem;line-height:1}}</style><script>!function(){const e=document.createElement("link").relList;if(!(e&&e.supports&&e.supports("modulepreload"))){for(const e of document.querySelectorAll('link[rel="modulepreload"]'))r(e);new MutationObserver((e=>{for(const o of e)if("childList"===o.type)for(const e of o.addedNodes)"LINK"===e.tagName&&"modulepreload"===e.rel&&r(e)})).observe(document,{childList:!0,subtree:!0})}function r(e){if(e.ep)return;e.ep=!0;const r=function(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerPolicy&&(r.referrerPolicy=e.referrerPolicy),"use-credentials"===e.crossOrigin?r.credentials="include":"anonymous"===e.crossOrigin?r.credentials="omit":r.credentials="same-origin",r}(e);fetch(e.href,r)}}();<\/script></head><body class="antialiased bg-white dark:bg-black dark:text-white flex flex-col font-sans min-h-screen pt-14 px-10 text-black"><div class="fixed left-0 right-0 spotlight"></div><h1 class="font-medium mb-6 sm:text-8xl text-6xl">` + messages.statusCode + '</h1><p class="font-light leading-tight mb-8 sm:text-2xl text-xl">' + messages.description + '</p><div class="bg-black/5 bg-white dark:bg-white/10 flex-1 h-auto overflow-y-auto rounded-t-md"><pre class="font-light leading-tight p-8 text-xl z-10">' + messages.stack + "</pre></div></body></html>";
};

const errorDev = /*#__PURE__*/Object.freeze({
  __proto__: null,
  template: template$1
});

const blogs_post = defineEventHandler(async (event) => {
  const { databaseUrl } = useRuntimeConfig();
  const db = neon(databaseUrl);
  try {
    const body = await readBody(event);
    const {
      title,
      slug,
      content,
      author_name,
      published_at,
      is_published = false,
      seo_title,
      seo_description,
      seo_keywords,
      image
    } = body;
    const result = await db`
      INSERT INTO blogs (
        title, slug, content, author_name, published_at,
        is_published, seo_title, seo_description, seo_keywords , image
      )
      VALUES (
        ${title}, ${slug}, ${content}, ${author_name}, ${published_at},
        ${is_published}, ${seo_title}, ${seo_description}, ${seo_keywords}, ${image}
      )
      RETURNING *;
    `;
    return {
      message: "Blog created successfully",
      blog: result[0]
    };
  } catch (error) {
    console.error("\u{1F525} Blog creation error:", error);
    throw createError({
      statusCode: 500,
      statusMessage: "Failed to create blog: " + error.message
    });
  }
});

const blogs_post$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: blogs_post
});

const blogs = defineCachedEventHandler(
  async (event) => {
    const { databaseUrl } = useRuntimeConfig();
    const db = neon(databaseUrl);
    try {
      const result = await db`SELECT 
  id, 
  title, 
  slug, 
  content, 
  author_name, 
  TO_CHAR(published_at, 'Mon DD, YYYY') AS published_at,  -- Short date format
  is_published, 
  seo_title, 
  seo_description, 
  seo_keywords, 
  TO_CHAR(created_at, 'Mon DD, YYYY') AS created_at,   -- Short date format
  TO_CHAR(updated_at, 'Mon DD, YYYY') AS updated_at ,    -- Short date format
  image
FROM blogs
ORDER BY id DESC;
`;
      return result;
    } catch (error) {
      console.error("\u{1F525} Database query failed:", error);
      throw createError({
        statusCode: 500,
        statusMessage: "Database error: " + error.message
      });
    }
  },
  {
    maxAge: 1 * 1 * 1
    // Cache for 1 day
  }
);

const blogs$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: blogs
});

const _id__put = defineEventHandler(async (event) => {
  const { databaseUrl } = useRuntimeConfig();
  const db = neon(databaseUrl);
  const id = getRouterParam(event, "id");
  const body = await readBody(event);
  const {
    title,
    slug,
    content,
    author_name,
    is_published,
    seo_title,
    seo_description,
    seo_keywords,
    image
  } = body;
  try {
    const result = await db`
      UPDATE blogs
      SET
        title = ${title},
        slug = ${slug},
        content = ${content},
      
        author_name = ${author_name},
        is_published = ${is_published},
        seo_title = ${seo_title},
        seo_description = ${seo_description},
        seo_keywords = ${seo_keywords},
        image = ${image},
        updated_at = NOW()
      WHERE id = ${id}
      RETURNING *
    `;
    if (result.length === 0) {
      throw createError({
        statusCode: 404,
        statusMessage: "Blog not found"
      });
    }
    return result[0];
  } catch (error) {
    console.error("\u{1F525} Error updating blog:", error);
    throw createError({
      statusCode: 500,
      statusMessage: "Database error: " + error.message
    });
  }
});

const _id__put$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: _id__put
});

const _id_$2 = defineCachedEventHandler(
  async (event) => {
    const { databaseUrl } = useRuntimeConfig();
    const db = neon(databaseUrl);
    const id = getRouterParam(event, "id");
    if (!id) {
      throw createError({
        statusCode: 400,
        statusMessage: "Missing id parameter"
      });
    }
    try {
      const result = await db`
        SELECT 
          id,
          title,
          slug,
          content,
          author_name,
          TO_CHAR(published_at, 'Mon DD, YYYY') AS published_at,
          is_published,
          seo_title,
          seo_description,
          seo_keywords,
          TO_CHAR(created_at, 'Mon DD, YYYY') AS created_at,
          TO_CHAR(updated_at, 'Mon DD, YYYY') AS updated_at,
          image
        FROM blogs
        WHERE id = ${id}
        LIMIT 1
      `;
      if (result.length === 0) {
        throw createError({
          statusCode: 404,
          statusMessage: "Blog not found"
        });
      }
      return result[0];
    } catch (error) {
      console.error("\u{1F525} Error fetching blog by slug:", error);
      throw createError({
        statusCode: 500,
        statusMessage: "Database error: " + error.message
      });
    }
  },
  {
    maxAge: 1 * 1
    // Cache for 1 hour
  }
);

const _id_$3 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: _id_$2
});

const _id_ = defineCachedEventHandler(
  async (event) => {
    const { databaseUrl } = useRuntimeConfig();
    const db = neon(databaseUrl);
    const { id } = event.context.params || {};
    if (!id) {
      throw createError({ statusCode: 400, message: "ID is required" });
    }
    const result = await db`
      DELETE FROM blogs WHERE id = ${id} RETURNING *;  -- This will return the deleted row
    `;
    if (result.length === 0) {
      throw createError({ statusCode: 404, message: "Contact not found" });
    }
    return { message: "Blog deleted successfully", deletedContact: result[0] };
  },
  {
    maxAge: 60 * 60 * 24
    // Cache it for a day
  }
);

const _id_$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: _id_
});

const _slug_ = defineCachedEventHandler(
  async (event) => {
    const { databaseUrl } = useRuntimeConfig();
    const db = neon(databaseUrl);
    const slug = getRouterParam(event, "slug");
    console.log(slug);
    if (!slug) {
      throw createError({
        statusCode: 400,
        statusMessage: "Missing slug parameter"
      });
    }
    try {
      const result = await db`
        SELECT 
          id,
          title,
          slug,
          content,
          author_name,
          TO_CHAR(published_at, 'Mon DD, YYYY') AS published_at,
          is_published,
          seo_title,
          seo_description,
          seo_keywords,
          TO_CHAR(created_at, 'Mon DD, YYYY') AS created_at,
          TO_CHAR(updated_at, 'Mon DD, YYYY') AS updated_at
        FROM blogs
        WHERE slug = ${slug}
        LIMIT 1
      `;
      if (result.length === 0) {
        throw createError({
          statusCode: 404,
          statusMessage: "Blog not found"
        });
      }
      return result[0];
    } catch (error) {
      console.error("\u{1F525} Error fetching blog by slug:", error);
      throw createError({
        statusCode: 500,
        statusMessage: "Database error: " + error.message
      });
    }
  },
  {
    maxAge: 1 * 1
    // Cache for 1 hour
  }
);

const _slug_$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: _slug_
});

const contact_post = defineEventHandler(async (event) => {
  const { databaseUrl } = useRuntimeConfig();
  const db = neon(databaseUrl);
  try {
    const body = await readBody(event);
    const {
      firstName,
      lastName,
      email,
      subject,
      comment
    } = body;
    const result = await db`
      INSERT INTO contact_us (
       first_name , last_name ,email , subject , comment  
      )
      VALUES (
        ${firstName}, ${lastName}, ${email}, ${subject}, ${comment}
      )
      RETURNING *;
    `;
    return {
      message: "Contact is created successfully",
      blog: result[0]
    };
  } catch (error) {
    console.error("\u{1F525} Contact creation error:", error);
    throw createError({
      statusCode: 500,
      statusMessage: "Failed to create Contact: " + error.message
    });
  }
});

const contact_post$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: contact_post
});

const initiatePayment = defineEventHandler(async (event) => {
  const userAgent = getHeader(event, "user-agent") || "NuxtApp";
  const payload = {
    payment: {
      operation: "Purchase",
      intent: "Authorization",
      currency: "SEK",
      prices: [{ type: "Visa", amount: 1e4, vatAmount: 2500 }],
      description: "Order #123",
      userAgent,
      language: "sv-SE",
      urls: {
        completeUrl: "https://www.partsshop.se/payment/complete",
        cancelUrl: "https://www.partsshop.se/payment/cancel",
        callbackUrl: "https://www.partsshop.se/api/payment/callback"
      }
    }
  };
  try {
    const response = await $fetch(
      "https://api.externalintegration.payex.com/psp/paymentorders",
      {
        method: "POST",
        body: payload,
        headers: {
          Authorization: "Bearer 98eed80d-748d-4d45-abd4-5618efa7a95d",
          "Content-Type": "application/json"
        }
      }
    );
    return response;
  } catch (err) {
    console.error("Swedbank error:", err.data || err.message);
    return {
      statusCode: 500,
      body: {
        error: err.data || err.message
      }
    };
  }
});

const initiatePayment$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: initiatePayment
});

const subscribe_post = defineEventHandler(async (event) => {
  const { databaseUrl } = useRuntimeConfig();
  const db = neon(databaseUrl);
  const body = await readBody(event);
  if (!body.email) {
    return sendError(event, createError({ statusCode: 400, statusMessage: "Email is required" }));
  }
  try {
    const result = await db.query(
      "INSERT INTO newsletter_subscribers (email) VALUES ($1) ON CONFLICT (email) DO NOTHING RETURNING *",
      [body.email]
    );
    return { success: true, data: result.rows[0] || null };
  } catch (err) {
    console.error(err);
    return sendError(event, createError({ statusCode: 500, statusMessage: "Database error" }));
  }
});

const subscribe_post$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: subscribe_post
});

const unsubscribe_post = defineEventHandler(async (event) => {
  const { databaseUrl } = useRuntimeConfig();
  const db = neon(databaseUrl);
  const body = await readBody(event);
  if (!body.email) {
    return sendError(event, createError({ statusCode: 400, statusMessage: "Email is required" }));
  }
  try {
    const result = await db.query(
      `UPDATE newsletter_subscribers
       SET subscribed = FALSE, unsubscribed_date = CURRENT_TIMESTAMP
       WHERE email = $1 RETURNING *`,
      [body.email]
    );
    if (result.rowCount === 0) {
      return sendError(event, createError({ statusCode: 404, statusMessage: "Email not found" }));
    }
    return { success: true, data: result.rows[0] };
  } catch (err) {
    console.error(err);
    return sendError(event, createError({ statusCode: 500, statusMessage: "Database error" }));
  }
});

const unsubscribe_post$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: unsubscribe_post
});

const callback = defineEventHandler(async (event) => {
  var _a;
  const body = await readBody(event);
  console.log("Swedbank callback received:", body);
  const signature = getHeader(event, "x-signature");
  if (signature && !isValidSignature(signature, body)) {
    console.warn("Invalid signature!");
    return { statusCode: 403, body: "Invalid signature" };
  }
  const orderId = (_a = body.payment) == null ? void 0 : _a.orderReference;
  if (orderId) {
    console.log("Updating order:", orderId);
  } else {
    console.warn("No order reference found in callback body");
  }
  return { status: "ok" };
});

const callback$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: callback
});

const payment = defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  try {
    console.log("Swedbank Access Token:", config.SWEDBANK_ACCESS_TOKEN);
    const res = await fetch("https://api.externalintegration.payex.com/psp/paymentorders", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${config.SWEDBANK_ACCESS_TOKEN}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        payment: {
          operation: "Purchase",
          intent: "Authorization",
          currency: "SEK",
          prices: [{ type: "Card", amount: 1500, vatAmount: 0 }],
          // "Card" is correct
          description: "Test purchase",
          payerReference: "user123",
          userAgent: "Mozilla/5.0",
          language: "sv-SE",
          urls: {
            hostUrls: ["https://www.partsshop.se/"],
            completeUrl: "https://www.partsshop.se/payment/complete",
            cancelUrl: "https://www.partsshop.se/payment/cancel",
            callbackUrl: "https://www.partsshop.se/payment/callback"
          },
          payeeInfo: {
            payeeId: config.SWEDBANK_PAYEE_ID,
            payeeReference: `ref-${Date.now()}`
          }
        }
      })
    });
    const contentType = res.headers.get("content-type") || "";
    let data;
    if (contentType.includes("application/json")) {
      data = await res.json();
    } else {
      const text = await res.text();
      console.error("Non-JSON response:", text);
      return {
        statusCode: res.status,
        body: text || "No content in response"
      };
    }
    if (!res.ok) {
      console.error("Swedbank API Error:", JSON.stringify(data, null, 2));
      return {
        statusCode: res.status,
        body: data
      };
    }
    return data;
  } catch (error) {
    console.error("Internal Server Error:", error);
    return {
      statusCode: 500,
      body: error instanceof Error ? error.message : String(error)
    };
  }
});

const payment$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: payment
});

const version = defineCachedEventHandler(
  async (event) => {
    const { databaseUrl } = useRuntimeConfig();
    const db = neon(databaseUrl);
    const result = await db`SELECT version()`;
    return result;
  },
  {
    maxAge: 60 * 60 * 24
    // cache it for a day
  }
);

const version$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: version
});

const Vue3 = version$2[0] === "3";

function resolveUnref(r) {
  return typeof r === "function" ? r() : unref(r);
}
function resolveUnrefHeadInput(ref) {
  if (ref instanceof Promise || ref instanceof Date || ref instanceof RegExp)
    return ref;
  const root = resolveUnref(ref);
  if (!ref || !root)
    return root;
  if (Array.isArray(root))
    return root.map((r) => resolveUnrefHeadInput(r));
  if (typeof root === "object") {
    const resolved = {};
    for (const k in root) {
      if (!Object.prototype.hasOwnProperty.call(root, k)) {
        continue;
      }
      if (k === "titleTemplate" || k[0] === "o" && k[1] === "n") {
        resolved[k] = unref(root[k]);
        continue;
      }
      resolved[k] = resolveUnrefHeadInput(root[k]);
    }
    return resolved;
  }
  return root;
}

const VueReactivityPlugin = defineHeadPlugin({
  hooks: {
    "entries:resolve": (ctx) => {
      for (const entry of ctx.entries)
        entry.resolvedInput = resolveUnrefHeadInput(entry.input);
    }
  }
});

const headSymbol = "usehead";
function vueInstall(head) {
  const plugin = {
    install(app) {
      if (Vue3) {
        app.config.globalProperties.$unhead = head;
        app.config.globalProperties.$head = head;
        app.provide(headSymbol, head);
      }
    }
  };
  return plugin.install;
}
function createServerHead(options = {}) {
  const head = createServerHead$1(options);
  head.use(VueReactivityPlugin);
  head.install = vueInstall(head);
  return head;
}

const unheadPlugins = true ? [CapoPlugin({ track: true })] : [];

const renderSSRHeadOptions = {"omitLineBreaks":false};

globalThis.__buildAssetsURL = buildAssetsURL;
globalThis.__publicAssetsURL = publicAssetsURL;
const getClientManifest = () => import('file://C:/Users/DELL/Desktop/fronend/.nuxt/dist/server/client.manifest.mjs').then((r) => r.default || r).then((r) => typeof r === "function" ? r() : r);
const getSSRStyles = lazyCachedFunction(() => Promise.resolve().then(function () { return styles$1; }).then((r) => r.default || r));
const getSPARenderer = lazyCachedFunction(async () => {
  const manifest = await getClientManifest();
  const spaTemplate = await Promise.resolve().then(function () { return _virtual__spaTemplate; }).then((r) => r.template).catch(() => "").then((r) => {
    {
      return APP_ROOT_OPEN_TAG + r + APP_ROOT_CLOSE_TAG;
    }
  });
  const options = {
    manifest,
    renderToString: () => spaTemplate,
    buildAssetsURL
  };
  const renderer = createRenderer(() => () => {
  }, options);
  const result = await renderer.renderToString({});
  const renderToString = (ssrContext) => {
    const config = useRuntimeConfig(ssrContext.event);
    ssrContext.modules = ssrContext.modules || /* @__PURE__ */ new Set();
    ssrContext.payload.serverRendered = false;
    ssrContext.config = {
      public: config.public,
      app: config.app
    };
    return Promise.resolve(result);
  };
  return {
    rendererContext: renderer.rendererContext,
    renderToString
  };
});
const ISLAND_SUFFIX_RE = /\.json(\?.*)?$/;
async function getIslandContext(event) {
  let url = event.path || "";
  const componentParts = url.substring("/__nuxt_island".length + 1).replace(ISLAND_SUFFIX_RE, "").split("_");
  const hashId = componentParts.length > 1 ? componentParts.pop() : void 0;
  const componentName = componentParts.join("_");
  const context = event.method === "GET" ? getQuery$1(event) : await readBody(event);
  const ctx = {
    url: "/",
    ...context,
    id: hashId,
    name: componentName,
    props: destr(context.props) || {},
    slots: {},
    components: {}
  };
  return ctx;
}
const HAS_APP_TELEPORTS = !!(appTeleportAttrs.id);
const APP_TELEPORT_OPEN_TAG = HAS_APP_TELEPORTS ? `<${appTeleportTag}${propsToString(appTeleportAttrs)}>` : "";
const APP_TELEPORT_CLOSE_TAG = HAS_APP_TELEPORTS ? `</${appTeleportTag}>` : "";
const APP_ROOT_OPEN_TAG = `<${appRootTag}${propsToString(appRootAttrs)}>`;
const APP_ROOT_CLOSE_TAG = `</${appRootTag}>`;
const PAYLOAD_URL_RE = /\/_payload.json(\?.*)?$/ ;
const ROOT_NODE_REGEX = new RegExp(`^<${appRootTag}[^>]*>([\\s\\S]*)<\\/${appRootTag}>$`);
const renderer = defineRenderHandler(async (event) => {
  const nitroApp = useNitroApp();
  const ssrError = event.path.startsWith("/__nuxt_error") ? getQuery$1(event) : null;
  if (ssrError && ssrError.statusCode) {
    ssrError.statusCode = Number.parseInt(ssrError.statusCode);
  }
  if (ssrError && !("__unenv__" in event.node.req)) {
    throw createError({
      statusCode: 404,
      statusMessage: "Page Not Found: /__nuxt_error"
    });
  }
  const isRenderingIsland = event.path.startsWith("/__nuxt_island");
  const islandContext = isRenderingIsland ? await getIslandContext(event) : void 0;
  let url = ssrError?.url || islandContext?.url || event.path;
  const isRenderingPayload = PAYLOAD_URL_RE.test(url) && !isRenderingIsland;
  if (isRenderingPayload) {
    url = url.substring(0, url.lastIndexOf("/")) || "/";
    event._path = url;
    event.node.req.url = url;
  }
  const routeOptions = getRouteRules(event);
  const head = createServerHead({
    plugins: unheadPlugins
  });
  const headEntryOptions = { mode: "server" };
  if (!isRenderingIsland) {
    head.push(appHead, headEntryOptions);
  }
  const ssrContext = {
    url,
    event,
    runtimeConfig: useRuntimeConfig(event),
    noSSR: true,
    head,
    error: !!ssrError,
    nuxt: void 0,
    /* NuxtApp */
    payload: ssrError ? { error: ssrError } : {},
    _payloadReducers: /* @__PURE__ */ Object.create(null),
    modules: /* @__PURE__ */ new Set(),
    islandContext
  };
  const renderer = await getSPARenderer() ;
  const _rendered = await renderer.renderToString(ssrContext).catch(async (error) => {
    if (ssrContext._renderResponse && error.message === "skipping render") {
      return {};
    }
    const _err = !ssrError && ssrContext.payload?.error || error;
    await ssrContext.nuxt?.hooks.callHook("app:error", _err);
    throw _err;
  });
  await ssrContext.nuxt?.hooks.callHook("app:rendered", { ssrContext, renderResult: _rendered });
  if (ssrContext._renderResponse) {
    return ssrContext._renderResponse;
  }
  if (ssrContext.payload?.error && !ssrError) {
    throw ssrContext.payload.error;
  }
  if (isRenderingPayload) {
    const response2 = renderPayloadResponse(ssrContext);
    return response2;
  }
  const inlinedStyles = isRenderingIsland ? await renderInlineStyles(ssrContext.modules ?? []) : [];
  const NO_SCRIPTS = routeOptions.experimentalNoScripts;
  const { styles, scripts } = getRequestDependencies(ssrContext, renderer.rendererContext);
  if (ssrContext._preloadManifest) {
    head.push({
      link: [
        { rel: "preload", as: "fetch", fetchpriority: "low", crossorigin: "anonymous", href: buildAssetsURL(`builds/meta/${ssrContext.runtimeConfig.app.buildId}.json`) }
      ]
    }, { ...headEntryOptions, tagPriority: "low" });
  }
  if (inlinedStyles.length) {
    head.push({ style: inlinedStyles });
  }
  {
    const link = [];
    for (const resource of Object.values(styles)) {
      if ("inline" in getQuery(resource.file)) {
        continue;
      }
      if (!isRenderingIsland || resource.file.includes("scoped") && !resource.file.includes("pages/")) {
        link.push({ rel: "stylesheet", href: renderer.rendererContext.buildAssetsURL(resource.file), crossorigin: "" });
      }
    }
    if (link.length) {
      head.push({ link }, headEntryOptions);
    }
  }
  if (!NO_SCRIPTS && !isRenderingIsland) {
    head.push({
      link: getPreloadLinks(ssrContext, renderer.rendererContext)
    }, headEntryOptions);
    head.push({
      link: getPrefetchLinks(ssrContext, renderer.rendererContext)
    }, headEntryOptions);
    head.push({
      script: renderPayloadJsonScript({ ssrContext, data: ssrContext.payload }) 
    }, {
      ...headEntryOptions,
      // this should come before another end of body scripts
      tagPosition: "bodyClose",
      tagPriority: "high"
    });
  }
  if (!routeOptions.experimentalNoScripts && !isRenderingIsland) {
    head.push({
      script: Object.values(scripts).map((resource) => ({
        type: resource.module ? "module" : null,
        src: renderer.rendererContext.buildAssetsURL(resource.file),
        defer: resource.module ? null : true,
        // if we are rendering script tag payloads that import an async payload
        // we need to ensure this resolves before executing the Nuxt entry
        tagPosition: "head",
        crossorigin: ""
      }))
    }, headEntryOptions);
  }
  const { headTags, bodyTags, bodyTagsOpen, htmlAttrs, bodyAttrs } = await renderSSRHead(head, renderSSRHeadOptions);
  const htmlContext = {
    island: isRenderingIsland,
    htmlAttrs: htmlAttrs ? [htmlAttrs] : [],
    head: normalizeChunks([headTags]),
    bodyAttrs: bodyAttrs ? [bodyAttrs] : [],
    bodyPrepend: normalizeChunks([bodyTagsOpen, ssrContext.teleports?.body]),
    body: [
      replaceIslandTeleports(ssrContext, _rendered.html) ,
      APP_TELEPORT_OPEN_TAG + (HAS_APP_TELEPORTS ? joinTags([ssrContext.teleports?.[`#${appTeleportAttrs.id}`]]) : "") + APP_TELEPORT_CLOSE_TAG
    ],
    bodyAppend: [bodyTags]
  };
  await nitroApp.hooks.callHook("render:html", htmlContext, { event });
  if (isRenderingIsland && islandContext) {
    const islandHead = {};
    for (const entry of head.headEntries()) {
      for (const [key, value] of Object.entries(resolveUnrefHeadInput(entry.input))) {
        const currentValue = islandHead[key];
        if (Array.isArray(currentValue)) {
          currentValue.push(...value);
        }
        islandHead[key] = value;
      }
    }
    islandHead.link ||= [];
    islandHead.style ||= [];
    const islandResponse = {
      id: islandContext.id,
      head: islandHead,
      html: getServerComponentHTML(htmlContext.body),
      components: getClientIslandResponse(ssrContext),
      slots: getSlotIslandResponse(ssrContext)
    };
    await nitroApp.hooks.callHook("render:island", islandResponse, { event, islandContext });
    const response2 = {
      body: JSON.stringify(islandResponse, null, 2),
      statusCode: getResponseStatus(event),
      statusMessage: getResponseStatusText(event),
      headers: {
        "content-type": "application/json;charset=utf-8",
        "x-powered-by": "Nuxt"
      }
    };
    return response2;
  }
  const response = {
    body: renderHTMLDocument(htmlContext),
    statusCode: getResponseStatus(event),
    statusMessage: getResponseStatusText(event),
    headers: {
      "content-type": "text/html;charset=utf-8",
      "x-powered-by": "Nuxt"
    }
  };
  return response;
});
function lazyCachedFunction(fn) {
  let res = null;
  return () => {
    if (res === null) {
      res = fn().catch((err) => {
        res = null;
        throw err;
      });
    }
    return res;
  };
}
function normalizeChunks(chunks) {
  return chunks.filter(Boolean).map((i) => i.trim());
}
function joinTags(tags) {
  return tags.join("");
}
function joinAttrs(chunks) {
  if (chunks.length === 0) {
    return "";
  }
  return " " + chunks.join(" ");
}
function renderHTMLDocument(html) {
  return `<!DOCTYPE html><html${joinAttrs(html.htmlAttrs)}><head>${joinTags(html.head)}</head><body${joinAttrs(html.bodyAttrs)}>${joinTags(html.bodyPrepend)}${joinTags(html.body)}${joinTags(html.bodyAppend)}</body></html>`;
}
async function renderInlineStyles(usedModules) {
  const styleMap = await getSSRStyles();
  const inlinedStyles = /* @__PURE__ */ new Set();
  for (const mod of usedModules) {
    if (mod in styleMap && styleMap[mod]) {
      for (const style of await styleMap[mod]()) {
        inlinedStyles.add(style);
      }
    }
  }
  return Array.from(inlinedStyles).map((style) => ({ innerHTML: style }));
}
function renderPayloadResponse(ssrContext) {
  return {
    body: stringify(splitPayload(ssrContext).payload, ssrContext._payloadReducers) ,
    statusCode: getResponseStatus(ssrContext.event),
    statusMessage: getResponseStatusText(ssrContext.event),
    headers: {
      "content-type": "application/json;charset=utf-8" ,
      "x-powered-by": "Nuxt"
    }
  };
}
function renderPayloadJsonScript(opts) {
  const contents = opts.data ? stringify(opts.data, opts.ssrContext._payloadReducers) : "";
  const payload = {
    "type": "application/json",
    "innerHTML": contents,
    "data-nuxt-data": appId,
    "data-ssr": false
  };
  {
    payload.id = "__NUXT_DATA__";
  }
  if (opts.src) {
    payload["data-src"] = opts.src;
  }
  const config = uneval(opts.ssrContext.config);
  return [
    payload,
    {
      innerHTML: `window.__NUXT__={};window.__NUXT__.config=${config}`
    }
  ];
}
function splitPayload(ssrContext) {
  const { data, prerenderedAt, ...initial } = ssrContext.payload;
  return {
    initial: { ...initial, prerenderedAt },
    payload: { data, prerenderedAt }
  };
}
function getServerComponentHTML(body) {
  const match = body[0].match(ROOT_NODE_REGEX);
  return match?.[1] || body[0];
}
const SSR_SLOT_TELEPORT_MARKER = /^uid=([^;]*);slot=(.*)$/;
const SSR_CLIENT_TELEPORT_MARKER = /^uid=([^;]*);client=(.*)$/;
const SSR_CLIENT_SLOT_MARKER = /^island-slot=[^;]*;(.*)$/;
function getSlotIslandResponse(ssrContext) {
  if (!ssrContext.islandContext || !Object.keys(ssrContext.islandContext.slots).length) {
    return void 0;
  }
  const response = {};
  for (const [name, slot] of Object.entries(ssrContext.islandContext.slots)) {
    response[name] = {
      ...slot,
      fallback: ssrContext.teleports?.[`island-fallback=${name}`]
    };
  }
  return response;
}
function getClientIslandResponse(ssrContext) {
  if (!ssrContext.islandContext || !Object.keys(ssrContext.islandContext.components).length) {
    return void 0;
  }
  const response = {};
  for (const [clientUid, component] of Object.entries(ssrContext.islandContext.components)) {
    const html = ssrContext.teleports?.[clientUid]?.replaceAll("<!--teleport start anchor-->", "") || "";
    response[clientUid] = {
      ...component,
      html,
      slots: getComponentSlotTeleport(ssrContext.teleports ?? {})
    };
  }
  return response;
}
function getComponentSlotTeleport(teleports) {
  const entries = Object.entries(teleports);
  const slots = {};
  for (const [key, value] of entries) {
    const match = key.match(SSR_CLIENT_SLOT_MARKER);
    if (match) {
      const [, slot] = match;
      if (!slot) {
        continue;
      }
      slots[slot] = value;
    }
  }
  return slots;
}
function replaceIslandTeleports(ssrContext, html) {
  const { teleports, islandContext } = ssrContext;
  if (islandContext || !teleports) {
    return html;
  }
  for (const key in teleports) {
    const matchClientComp = key.match(SSR_CLIENT_TELEPORT_MARKER);
    if (matchClientComp) {
      const [, uid, clientId] = matchClientComp;
      if (!uid || !clientId) {
        continue;
      }
      html = html.replace(new RegExp(` data-island-uid="${uid}" data-island-component="${clientId}"[^>]*>`), (full) => {
        return full + teleports[key];
      });
      continue;
    }
    const matchSlot = key.match(SSR_SLOT_TELEPORT_MARKER);
    if (matchSlot) {
      const [, uid, slot] = matchSlot;
      if (!uid || !slot) {
        continue;
      }
      html = html.replace(new RegExp(` data-island-uid="${uid}" data-island-slot="${slot}"[^>]*>`), (full) => {
        return full + teleports[key];
      });
    }
  }
  return html;
}

const renderer$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: renderer
});

const styles = {};

const styles$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: styles
});

const template = "";

const _virtual__spaTemplate = /*#__PURE__*/Object.freeze({
  __proto__: null,
  template: template
});
//# sourceMappingURL=index.mjs.map
