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
            <span class="font-light">May 29 2024</span>
            <h2 class="card-title">
              Vad säger transportstyrelsen om elsparkcykeln
            </h2>
            <p class="font-light first-latter">

              <div class="content user-select-text" tabindex="0" role="heading" aria-level="6" aria-description="">
<div class="ac-container ac-adaptiveCard">
<div class="ac-textBlock">

<h3>Regler för Elsparkcyklar i Sverige</h3>
Elsparkcyklar har blivit allt vanligare i våra städer, och det är viktigt att känna till de regler som gäller för deras användning. Här är en översikt över vad du bör tänka på när du kör en elsparkcykel:
<ol>
 	<li><strong>Vilken typ av fordon är det?</strong> För att förstå vilka regler som gäller behöver du veta vilken fordonsklass elsparkcykeln tillhör. <a class="tooltip-target" href="https://www.transportstyrelsen.se/sv/vagtrafik/Fordon/Fordonsregler/elsparkcykel/" data-citationid="b0bb295f-7356-1ef2-081b-d04b1988d42c-9-group">En elsparkcykel kan klassas som en cykel om den inte går fortare än 20 km/tim och har en kontinuerlig märkeffekt på högst 250 watt</a><a class="ac-anchor sup-target" href="https://www.transportstyrelsen.se/sv/vagtrafik/Fordon/Fordonsregler/elsparkcykel/" target="_blank" rel="noopener" data-citationid="b0bb295f-7356-1ef2-081b-d04b1988d42c-9" aria-label="1: Vilken typ av fordon är det?"><sup class="citation-sup">1</sup></a>. Om den uppfyller dessa krav gäller följande:</li>
 	<li><strong>Körning och utrustning:</strong>
<ul>
 	<li>Elsparkcyklar ska köras på samma sätt som andra cyklar. Det innebär att du kan köra på cykelvägar och i viss utsträckning även på bilvägar.</li>
 	<li>Elsparkcykeln måste ha bromsar och en ringklocka (det finns inga krav på hur klockan ska se ut eller låta).</li>
 	<li>Vid mörkerkörning ska elsparkcykeln ha fram- och baklyse samt vara utrustad med reflexer.</li>
 	<li>Om du är yngre än 15 år krävs hjälm, men vi rekommenderar att alla som cyklar använder ett huvudskydd.</li>
</ul>
</li>
 	<li><strong>Trafikregler för elsparkcyklar:</strong>
<ul>
 	<li>Kör försiktigt när du passerar medtrafikanter. Sänk hastigheten och håll avståndet.</li>
 	<li>Det är inte tillåtet att köra en elsparkcykel på en trottoar eller gångbana.</li>
 	<li>Parkera inte elsparkcykeln på gång- eller cykelbanor om det inte finns en uppställningsplats.</li>
 	<li>Tänk på äldre, barn och personer med rörelsehinder när du parkerar.</li>
</ul>
</li>
 	<li><strong>Om elsparkcykeln inte uppfyller cykelkraven:</strong>
<ul>
 	<li>Om elsparkcykeln går snabbare än 20 km/tim eller har en högre kontinuerlig märkeffekt än 250 watt, klassas den inte längre som en cykel. <a class="tooltip-target" href="https://www.transportstyrelsen.se/sv/vagtrafik/Fordon/Fordonsregler/elsparkcykel/" target="_blank" rel="noopener" data-citationid="b0bb295f-7356-1ef2-081b-d04b1988d42c-32-group">Då kan den istället klassas som en moped med andra krav och förutsättningar för att få användas i trafik</a><a class="ac-anchor sup-target" href="https://www.transportstyrelsen.se/sv/vagtrafik/Fordon/Fordonsregler/elsparkcykel/" target="_blank" rel="noopener" data-citationid="b0bb295f-7356-1ef2-081b-d04b1988d42c-32" aria-label="1: "><sup class="citation-sup">1</sup></a>.</li>
</ul>
</li>
</ol>
Sammanfattningsvis är det viktigt att följa trafikreglerna och använda elsparkcyklar ansvarsfullt. Ha kul och kör säkert! 🛴

<hr />

<em>Observera att reglerna kan ändras över tid, så det är alltid bra att hålla sig uppdaterad.</em> 😊

</div>
</div>
</div>
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
