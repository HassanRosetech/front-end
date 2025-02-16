import { NuxtModule, RuntimeConfig } from '@nuxt/schema'
declare module '@nuxt/schema' {
  interface NuxtOptions {
    /**
     * Configuration for `@pinia/nuxt`
     */
    ["pinia"]: typeof import("@pinia/nuxt").default extends NuxtModule<infer O> ? O : Record<string, any>
    /**
     * Configuration for `@nuxt/devtools`
     */
    ["devtools"]: typeof import("@nuxt/devtools").default extends NuxtModule<infer O> ? O : Record<string, any>
    /**
     * Configuration for `@nuxt/telemetry`
     */
    ["telemetry"]: typeof import("@nuxt/telemetry").default extends NuxtModule<infer O> ? O : Record<string, any>
  }
  interface NuxtConfig {
    /**
     * Configuration for `@pinia/nuxt`
     */
    ["pinia"]?: typeof import("@pinia/nuxt").default extends NuxtModule<infer O> ? Partial<O> : Record<string, any>
    /**
     * Configuration for `@nuxt/devtools`
     */
    ["devtools"]?: typeof import("@nuxt/devtools").default extends NuxtModule<infer O> ? Partial<O> : Record<string, any>
    /**
     * Configuration for `@nuxt/telemetry`
     */
    ["telemetry"]?: typeof import("@nuxt/telemetry").default extends NuxtModule<infer O> ? Partial<O> : Record<string, any>
    modules?: (undefined | null | false | NuxtModule<any> | string | [NuxtModule | string, Record<string, any>] | ["@pinia/nuxt", Exclude<NuxtConfig["pinia"], boolean>] | ["@nuxt/devtools", Exclude<NuxtConfig["devtools"], boolean>] | ["@nuxt/telemetry", Exclude<NuxtConfig["telemetry"], boolean>])[],
  }
}
declare module 'nuxt/schema' {
  interface NuxtOptions {
    /**
     * Configuration for `@pinia/nuxt`
     * @see https://www.npmjs.com/package/@pinia/nuxt
     */
    ["pinia"]: typeof import("@pinia/nuxt").default extends NuxtModule<infer O> ? O : Record<string, any>
    /**
     * Configuration for `@nuxt/devtools`
     * @see https://www.npmjs.com/package/@nuxt/devtools
     */
    ["devtools"]: typeof import("@nuxt/devtools").default extends NuxtModule<infer O> ? O : Record<string, any>
    /**
     * Configuration for `@nuxt/telemetry`
     * @see https://www.npmjs.com/package/@nuxt/telemetry
     */
    ["telemetry"]: typeof import("@nuxt/telemetry").default extends NuxtModule<infer O> ? O : Record<string, any>
  }
  interface NuxtConfig {
    /**
     * Configuration for `@pinia/nuxt`
     * @see https://www.npmjs.com/package/@pinia/nuxt
     */
    ["pinia"]?: typeof import("@pinia/nuxt").default extends NuxtModule<infer O> ? Partial<O> : Record<string, any>
    /**
     * Configuration for `@nuxt/devtools`
     * @see https://www.npmjs.com/package/@nuxt/devtools
     */
    ["devtools"]?: typeof import("@nuxt/devtools").default extends NuxtModule<infer O> ? Partial<O> : Record<string, any>
    /**
     * Configuration for `@nuxt/telemetry`
     * @see https://www.npmjs.com/package/@nuxt/telemetry
     */
    ["telemetry"]?: typeof import("@nuxt/telemetry").default extends NuxtModule<infer O> ? Partial<O> : Record<string, any>
    modules?: (undefined | null | false | NuxtModule<any> | string | [NuxtModule | string, Record<string, any>] | ["@pinia/nuxt", Exclude<NuxtConfig["pinia"], boolean>] | ["@nuxt/devtools", Exclude<NuxtConfig["devtools"], boolean>] | ["@nuxt/telemetry", Exclude<NuxtConfig["telemetry"], boolean>])[],
  }
  interface RuntimeConfig {
   app: {
      buildId: string,

      baseURL: string,

      buildAssetsDir: string,

      cdnURL: string,
   },

   nitro: {
      envPrefix: string,
   },
  }
  interface PublicRuntimeConfig {
   const: {
      comparePagePath: string,

      cartPagePath: string,

      wishlistPagePath: string,

      CommonImagePath: string,

      RawHamColorblockTshirt: string,

      Review: string,

      Price: string,

      Size: string,

      Sizes: Array<string>,

      Color: string,

      Black: string,

      White: string,

      Blue: string,

      Gray: string,

      Qty: string,

      Quantity: Array<number>,

      Addtocart: string,

      AddedToBag: string,

      sharewith: string,

      Sale: string,

      NewTrandingFashion: string,

      BUYONEGETONE: string,

      FREE: string,

      Discover: string,

      OurCollection: string,

      OurCategory: string,

      NewArrival: string,

      Newoffers: string,

      JustForYou: string,

      InstagramShop: string,

      NewCollection: string,

      LatestProduct: string,

      OurProduct: string,

      Mostpopularss: string,

      OurUpdate: string,

      OurBlog: string,

      Buttons: string,

      SubscribeOurNews: string,

      SubscribeDescription: string,

      ShopNow: string,

      NEW: string,

      OFF: string,

      Next: string,

      Prev: string,

      HurryUp: string,

      SpecialOffer: string,

      Showdetails: string,

      LearnMore: string,

      VRCollection: string,

      Share: string,

      BUYNOW: string,

      Discount: string,

      FreshFruits: string,

      OurNewsUpdate: string,

      ReadMore: string,

      Allcategories: string,

      CategoryList: string,

      pagenotfound: string,

      pagedescription: string,

      BackHomePage: string,

      Logins: string,

      Username: string,

      Pleasefillthename: string,

      Password: string,

      Forgotyourpassword: string,

      LogIn: string,

      Orsigninwith: string,

      Facebook: string,

      Google: string,

      Notamember: string,

      Signupnow: string,

      Registers: string,

      Name: string,

      EmailAddress: string,

      ConfirmPassword: string,

      SignUp: string,

      Orsignupwith: string,

      Alreadyhaveanaccount: string,

      ForgotPassword: string,

      EnterEmailAddress: string,

      Send: string,

      cartDescription: string,

      minutes: string,

      CheckOut: string,

      clearallitems: string,

      ContinueShopping: string,

      ApplyCoupon: string,

      CartTotals: string,

      TotalMRP: string,

      CouponDiscount: string,

      ConvenienceFee: string,

      ProcessCheckout: string,

      Promocode: string,

      EXAMPLECODE: string,

      TotalUSD: string,

      Yourcart: string,

      Country: string,

      CountryArr: Array<string>,

      Choose: string,

      State: string,

      StateArr: Array<string>,

      Payment: string,

      FirstName: string,

      LastName: string,

      SaveInfo: string,

      Creditcard: string,

      Debitcard: string,

      PayPal: string,

      Nameoncard: string,

      Fullname: string,

      Creditnumber: string,

      Creditnumberrequired: string,

      Expiration: string,

      CVV: string,

      Continuecheckout: string,

      Wearecomingsoon: string,

      ComingDescription: string,

      NotifyMe: string,

      Address: string,

      ActualAddress: string,

      PhoneNumber: string,

      num1: string,

      num2: string,

      ThemeEmail: string,

      ThemeEmail2: string,

      LetTouch: string,

      SuggestionDesc: string,

      Submit: string,

      ConfirmEmail: string,

      Comment: string,

      Email: string,

      EmailRequired: string,

      Contactus: string,

      Howhelp: string,

      OrderSuccess: string,

      PaymentDescription: string,

      TransactionID: string,

      OrderDetail: string,

      summery: string,

      OrderID: string,

      OrderDate: string,

      OrderTotal: string,

      shippingaddress: string,

      Add1: string,

      Add2: string,

      Add3: string,

      paymentmethod: string,

      PayonDelivery: string,

      expecteddate: string,

      fulldate: string,

      trackorder: string,

      SearchForProducts: string,

      ShowMenu: string,

      Category: string,

      PopularPosts: string,

      Johnwick: string,

      date: string,

      LeaveComments: string,

      Comments: string,

      Blogtitle: string,

      BlogDesp1: string,

      BlogDesp2: string,

      BlogDesp3: string,

      loadmore: string,

      NoProduct: string,

      ElementButton: string,

      ButtontextSizes: string,

      Bootstrapbutton: string,

      ButtonOutlines: string,

      Blocklevelbutton: string,

      Buttonblock: string,

      Activelink: string,

      Links: string,

      Buttongroups: string,

      Category1: string,

      Category2: string,

      Category3: string,

      Collection1: string,

      Collection2: string,

      Collection3: string,

      Collection4: string,

      Collection5: string,

      Collection6: string,

      Collection7: string,

      Deal1: string,

      Deal2: string,

      Deal3: string,

      Deal4: string,

      Product1: string,

      Product2: string,

      Product3: string,

      Product4: string,

      Product5: string,

      Product6: string,

      All: string,

      App: string,

      Card: string,

      Web: string,

      ShopTheLatestTrends: string,

      shopdescription: string,

      bannerdescription: string,

      Filter: string,

      Close: string,

      HideFilter: string,

      ShowFilter: string,

      Latestfilter: string,

      Brand: string,

      SpecifyDescription: string,

      ProductDescription1: string,

      ProductQuestion1: string,

      fabric: string,

      ProductDescription2: string,

      ProductDescription3: string,

      ProductDescription4: string,

      Customerreviews: string,

      numRatings: string,

      Rating: string,

      CustomersAlsoBoughtThese: string,

      LTR: string,

      RTL: string,

      Prices: string,

      DiscountRange: string,

      VoxoPlus: string,

      EnjoyExperience: string,

      EnjoyExperienceDescription: string,

      ADDTOHOMESCREEN: string,

      wishlist: string,

      VIEWCART: string,

      English: string,

      Franch: string,

      Spanish: string,

      ProceedTOPayment: string,

      Total: string,

      SuccessAddtocart: string,

      TOTAL: string,

      orderIn: string,

      activeView: string,

      ProductName: string,

      BestSeller: string,

      infashion: string,

      selectsize: string,

      sizechart: string,

      pleaseselectsize: string,

      quentityname: string,

      Days: string,

      Hour: string,

      Min: string,

      Sec: string,

      productdetail: string,

      Tags: string,

      Viewdetails: string,

      CustomerRating: string,

      GenericName: string,

      Department: string,

      Manufacturer: string,

      DateFirstAvailable: string,

      image: string,

      productname: string,

      price: string,

      availability: string,

      action: string,

      whoAreWe: string,

      largerFashion: string,

      aboutUsDesc: string,

      aboutUsDesc2: string,

      meetOurTeam: string,

      teamDesc: string,
   },
  }
}
declare module 'vue' {
        interface ComponentCustomProperties {
          $config: RuntimeConfig
        }
      }