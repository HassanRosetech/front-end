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
            <span class="font-light">April 11 2022</span>
            <h2 class="card-title">Xiaomi Felkod 16 (Error code 16 )</h2>
            <p class="font-light first-latter">

              I detta avsnitt ska vi titta närmare på problemet felkod 16 och hur man kan lösa felet för att fortsätta åka på sin elscooter.
<h5>ANLEDNING OCH KONTROLL PUNKTER</h5>
Felkod 16 är ovanligt och förekommer endast vid handhavande fel som alla Xiaomi Electric scooter förare kan råkar ut för vid -&gt; <strong>Felaktig </strong><b>trimning</b>!
<br>
<br>
1. Kontrollera batteristatus med hjälp av din laddare. ( Koppla in den och kolla vilken färg som lyser med fastsken) Lyser det grönt direkt så är det batterier felet ligger på. ( Du behöver då återställa batterier genom att hålla piggen i BMS intryckt i 3-4 sekunder så batteriet startar om - Done! )
<br>
<br>
2. Om det lyser rött i laddaren -&gt;

Öppna skyddskåpan undertill och kolla vilka färger som lyser på moderkortet - Lyser det fast röttsken ? Då har någon skada skett i moderkortet, oftast är det någon säkring under moderkortet som brunit av. Koppla bort batteri från moderkort innan du meckar med moderkortet. ( Enklast är att köpa en ny moderkort och koppla in - presentera scooterns chassi &amp; serienummer - <strong>Done!</strong> Följ anvisningar i avsnittet Felkod 35 ) .
<br>
<br>
3. Du upplever att det är motstånd när du leder scooter ( gående) - Då ligger felet i motorn - troligtvis har det skett någon kortslutning i kretskort i motorn - felet ligger i moderkort (oftast lyser det fast röttsken ) .

Lösning: Byt moderkort

Mycket ovanligt : Motor haveri ( Behöver lödas i kretskort i motor) .

Har du funderingar eller tvärstopp! Hör av dig till oss på <a href="mailto: support@partshop.se" rel="noopener noreferrer" data-sanitized-target="_blank">support@partshop.se</a>

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
