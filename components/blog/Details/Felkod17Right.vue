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
            <span class="font-light">March 27 2022</span>
            <h2 class="card-title">
              Xiaomi / Segway Felkod 17 ( Error code 17)
            </h2>
            <p class="font-light first-latter">

              I denna avsnitt ska vi titta närmare på problemet felkod 17 och hur man kan lösa felet för att fortsätta åka på sin elscooter.
<h5><strong>ANLEDNING OCH KONTROLL PUNKTER</strong></h5>
Felkod 17 är den mest vanligast förekommande fel som alla Segway ES4 scooter förare råkar ut för. <strong>Felaktig MOS Batteriladdning av externt batteri</strong>! (Segway)
<br>
<strong>För SEGWAY</strong>
<br>
Steg 1: Börja med att koppla bort externa batteriet (se bild på batteri)
<br>
<img src="https://cdn.shopify.com/s/files/1/0572/4009/2821/files/segway_batteri_480x480.jpg?v=1655243290" alt="Segway ES4 batteri" />
<br>
Starta om scootern och se om felet kvarstår ?
<br>

Om <strong>Nej</strong> ( Felet ligger i kontakten mellan externa batteriet och scootern- se till att det inte är kortslutet . ) Åtgärd : (Avancerad) Omlödning av batteriport . (Basic) byte av extern batteri.
<br>
Om <strong>Ja</strong> ( Kontrollera moderkort ) Oftast behöver man byta moderkort.
<br>
Tips : Viktigt att alltid skruva åt ordentligt vid eftermontering av externbatteri. Vid långtidskörning skevar / lossnar skruvar som i sin tur påverkar kontakten mellan externbatteri och scooter som enkelt kortsluter ut systemet.
<br>
OBS! Felkod 17 (Error code 17) är vanligt förekommande fel.

&nbsp;
<br>
<br>
<strong>För XIAOMI Scooter :</strong>
<br>
Steg 1 : Felet ligger i BMS på batteripacket - Kontrollera så att lösningspunkter på BMS är stabila.
<br>
Orsak : Denna fel är ovanligt förekommande hos Xiaomi e-scooter. Orsakas oftast av trimmad scooter där värmesensor slutat fungera som i sin tur inte slår av vid överhettning som leder till att lödningspunkter lossnar.
<br>
Åtgärd : (Avancerad) Omlödning av lösa punkter , (Basic) Köpa nytt batteri
<br>
Har du funderingar eller tvärstopp! Hör av dig till oss på <a href="mailto: support@partshop.se" rel="noopener noreferrer" data-sanitized-target="_blank">support@partshop.se</a>
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
