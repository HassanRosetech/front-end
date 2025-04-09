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
            <span class="font-light">September 06 2022</span>
            <h2 class="card-title">
              Xiaomi / Segway Felkod 11/12/13 (Error Code 11/12/13 )
            </h2>
            <p class="font-light first-latter">

              <img src="https://cdn.shopify.com/s/files/1/0572/4009/2821/files/PRO-2B_3_500x_c8d6fbd3-4600-430d-8658-f2c2b0e04dcf_480x480.jpg?v=1642336557" alt="" />

I detta avsnitt ska vi titta närmare på problemet felkod 11/12/13 och hur man kan lösa felet för att fortsätta åka på sin elscooter.
<h5>ANLEDNING OCH KONTROLL PUNKTER</h5>
Felkod 11/12/13 är sällan förekommande och orsakas oftast (9/10 fall) att fukt tränger och orsakar korrosion.
<br>
Felkod 11 = Kontakt A (Blå)
<br>
Felkod 12 = Kontakt B (Brun/Svart)
<br>
Felkod 13 = Kontakt C (Gul)
<br>
Dessa kontakter kommer direkt från motorn och kan inte ersättas styckvis!

<em>Obs! Var försiktig när du pillar på komponenter , det är strömförande. Börja med att koppla bort batterikontakten som sitter i moderkortet med gul-hatt innan du fortsätter felsökningen.</em>
<br>
Steg 1 : Börja med att koppla bort strömtillföring från batteriet till moderkortet. Använd en tång för att dra bort A/B/C kontakterna i tur ordning. Kontrollera att det inte bildats korrosion. (<strong>Om Ja?</strong> = Ersätt med ett nytt moderkort).
<br>
Steg 2 : Om det är skada på någon av kontakterna så finns det lösning!
<br>
<strong>1.Att laga med hjälp av lödning</strong> ( förr eller senare kommer det att släppa ifall det inte görs på rätt sätt då höga spänningar medför värme som påfrestar lödningsområdet.
<br>
<strong>2. Att köpa ny motorkabel</strong> ( OBS! kräver kunskaper i elektroteknik och lödning!) , plocka isär motorn och dra om hela kabeln. Ett billigt alternativ för den kunniga!
<br>
<strong>3. Köpa en ny motor</strong>
<h5><strong>LÖSNING</strong></h5>
Vid korrosion i moderkort /kortslutning i moderkort = Nytt moderkort

Skadade A/B/C kontakter = 1. Lödning , 2.Motorkabel , 3.Ny motor

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
