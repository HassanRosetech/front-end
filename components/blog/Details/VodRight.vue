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
            <span class="font-light">June 04 2024</span>
            <h2 class="card-title">Olika Klasser av Elsparkcyklar</h2>
            <p class="font-light first-latter">
              Regler för Elsparkcyklar i Sverige
              <br />
              Elsparkcyklar har blivit allt vanligare i våra städer, och det är
              viktigt att känna till de regler som gäller för deras användning.
              Här är en översikt över vad du bör tänka på när du kör en
              elsparkcykel:
              <br />
              Vilken typ av fordon är det? För att förstå vilka regler som
              gäller behöver du veta vilken fordonsklass elsparkcykeln tillhör.
              En elsparkcykel kan klassas som en cykel om den inte går fortare
              än 20 km/tim och har en kontinuerlig märkeffekt på högst 250
              watt1. Om den uppfyller dessa krav gäller följande: Körning och
              utrustning:
              <br />
              Elsparkcyklar ska köras på samma sätt som andra cyklar. Det
              innebär att du kan köra på cykelvägar och i viss utsträckning även
              på bilvägar. Elsparkcykeln måste ha bromsar och en ringklocka (det
              finns inga krav på hur klockan ska se ut eller låta). Vid
              mörkerkörning ska elsparkcykeln ha fram- och baklyse samt vara
              utrustad med reflexer. Om du är yngre än 15 år krävs hjälm, men vi
              rekommenderar att alla som cyklar använder ett huvudskydd.
              Trafikregler för elsparkcyklar:
              <br />
              Kör försiktigt när du passerar medtrafikanter. Sänk hastigheten
              och håll avståndet. Det är inte tillåtet att köra en elsparkcykel
              på en trottoar eller gångbana. Parkera inte elsparkcykeln på gång-
              eller cykelbanor om det inte finns en uppställningsplats. Tänk på
              äldre, barn och personer med rörelsehinder när du parkerar. Om
              elsparkcykeln inte uppfyller cykelkraven:
              <br />
              Om elsparkcykeln går snabbare än 20 km/tim eller har en högre
              kontinuerlig märkeffekt än 250 watt, klassas den inte längre som
              en cykel. Då kan den istället klassas som en moped med andra krav
              och förutsättningar för att få användas i trafik1.
              <br />
              Sammanfattningsvis är det viktigt att följa trafikreglerna och
              använda elsparkcyklar ansvarsfullt. Ha kul och kör säkert! 🛴
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
