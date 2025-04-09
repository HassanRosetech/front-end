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
            <span class="font-light">May 14 2024</span>
            <h2 class="card-title">
              Xiaoflasher - Uppgradering &amp; Trimmning
            </h2>
            <p class="font-light first-latter">
              I DENNA AVSNITT GÅR VI IGENOM HUR MAN MED HJÄLP AV APPLIKATIONEN
              XIAOFLASHER KAN SK. UPPGRADERA OCH PERSONIFIERA DIN FORDON . Obs!
              Partshop.se tar inget ansvar över mjukvara-hårdvarafel som kan
              uppstå med den typ av fel som kan orsaka att fordonet inte
              fungerar, går sönder eller garantin hävs. Denna avsnitt kräver
              förkunskaper!
              <br />
              1. Starta applikationen Xiaoflasher i din telefon
              <br />
              <img
                class="alignnone size-full wp-image-45549"
                src="https://partshop.se/wp-content/uploads/Xiaoflasher_1_240x240.avif"
                alt=""
                width="111"
                height="240"
              />
              <br />
              2. Välj din fordon och scrolla ner till " Premium CFW Toolkit"
              Klicka på knappen "Open Premium CFW Toolkit"
              <br />
              <img
                class="alignnone size-full wp-image-45550"
                src="https://partshop.se/wp-content/uploads/Screenshot_2021-08-26-14-38-48-697_eScooter.m365Info_240x240.avif"
                alt=""
                width="111"
                height="240"
              />
              <br />
              För Nybörjare : Välj någon av betalmetoden du tycker är värd för
              att komma vidare till CFW Tools . Du kan i denna vyn ställa in
              allt och lite till med användarvänlig gränssnitt . Inställning av
              Motor effekt : Hur snabbt det ska accelerera , hur mycket kraft
              som ska föras till motorn. Hur snabbt km/h man vill köra. Anpassa
              dem olika körlägen ( E,Drive , Sport ) När du med hjälp av
              rekommendationer i CFW läget ställt vad du vill ha, så trycker du
              på processa / tillämpa och laddar ner Zip-filen till telefonen för
              att sedan ladda upp den till din fordon. Hur öppnar man Zip-filer?
              Klicka på " Flash Selected zip file " , bläddra bland mappar där
              zip-filen ligger i din telefon ( oftast hamnar zip-filen under
              mappen " Downloads" ) och sedan trycker man på OK och låter
              mjukvaran ladda in i scootern. Känner ni att ni gjort fel eller
              vill ändra så kommer denna version vara sparad i Appen då du redan
              betalat 1 gång och kan ändra det obegränsad antal gånger . För
              Avancerade : Här kommer några länkar där man själv kan göra allt
              och lite till för att sedan spara och flytta över till en telefon.

              <a href="https://m365.botox.bz/" target="_blank" rel="noopener"
                >https://m365.botox.bz/</a
              >

              <a href="https://pro.cfw.sh/#" target="_blank" rel="noopener"
                >https://pro.cfw.sh/#</a
              >
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
