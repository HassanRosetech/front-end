<template>
  <div class="col-xl-9 col-lg-8 order-lg-1 ratio_square">
    <div class="row g-4">
      <div class="col-12">
        <div class="blog-details">
          <!-- <div class="blog-image-box">
                    <img
                      src="/images/inner-page/product/10.jpg"
                      alt=""
                      class="card-img-top"
                    />
                    <div class="blog-title">
                      <div>
                        <div class="social-media media-center">
                          <a href="https://www.facebook.com/" target="new">
                            <div class="social-icon-box social-color">
                              <i class="fab fa-facebook-f"></i>
                            </div>
                          </a>
                          <a href="https://twitter.com/" target="new">
                            <div class="social-icon-box social-color">
                              <i class="fab fa-twitter"></i>
                            </div>
                          </a>
                          <a href="https://in.pinterest.com/" target="new">
                            <div class="social-icon-box social-color">
                              <i class="fab fa-pinterest-p"></i>
                            </div>
                          </a>
                        </div>
                      </div>
                    </div> 
                  </div>-->
          <div class="blog-detail-contain">
            <span class="font-light">September 22 2023</span>
            <h2 class="card-title">
              Xiaomi / Segway Felkod 10 (Error Code 10 )
            </h2>
            <p class="font-light first-latter">

              <img src="https://cdn.shopify.com/s/files/1/0572/4009/2821/files/erorr_10_480x480.jpg?v=1642336362" alt="" />

I denna avsnitt ska vi titta närmare på problemet felkod 10 och hur man kan lösa felet för att fortsätta åka på sin elscooter.
<h5>Anledning och kontroll punkter</h5>
Den främsta orsaken till att det uppstår Felkod 10 är pga att kommunikationskabel mellan display och moderkort glappar.

Steg 1 : Det är bra att kontrollera först kontakten i styret så att den sitter i rätt och inte är lös. Dra isär kontakten, blås med luft och koppla ihop den igen.

<em>När du första gången packade upp din scooter så var styret lös och du fick själv sätta i kontakten. Tänk på att kontakterna är ömtåliga och att stiften i kontakterna kan komma att skadas , så var försiktig</em>.

Stöter du på hinder i Steg 1 : " Att stiftet i kontakterna är böjda/skadade  "  - Försök rätta till det med en sil eller tunn mejsel. Har stiftet gått av så måste du köpa ett nytt <a href="https://online-store-web.shopifyapps.com/articles/(%20https://www.partshop.se/products/oem-kretskort-display-xiaomi-scooter-m365?_pos=1&amp;_sid=1a6e2ec6e&amp;_ss=r%20)">dashboard /displaykort</a>

Steg 2 : Blocka bort underdel batteriskyddet under scootern med Torx (T15) bits. Obs! Var försiktig när du pillar på komponenter , det är strömförande. Börja med att koppla bort batterikontakten som sitter i moderkortet med gul-hatt innan du fortsätter felsökningen.  På moderkortet sitter det 3 färgade kablar, dem behöver du inte röra. Börja med att koppla bort alla kontakter med vit-pluggkontakt som sitter på moderkortet och blås luft. Sedan sätter du tillbaka allt och sist batterikontakten. Starta scootern.

Kvar står problemet?
<h5>Lösning</h5>
Problem vid STEG 1 : Om stiftet är av = Ny displaykort ( sällan att det uppstår)

Oftast ligger felet i självaste kommunikationskabeln då den utsätts för slitage i vecken , då är det bara att ersätta med en ny <a href="https://online-store-web.shopifyapps.com/articles/(%20https://www.partshop.se/products/xiaomi-kommunikations-kabel?_pos=1&amp;_sid=9239fdc08&amp;_ss=r%20)">kommunikationskabel</a>.  8 av 10 fall är lösningen att ersätta kommunikationskabel.

&nbsp;

&nbsp;

&nbsp;

&nbsp;
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { useBlogDataStore } from "~~/store/blogData";
export default {
  computed: {
    blogData() {
      return useBlogDataStore().data;
    },
  },
};
</script>
