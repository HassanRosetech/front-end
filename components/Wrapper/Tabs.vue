<template>
    <div class="tab-wrap">
        <ul class="nav nav-tabs" id="myTab">
            <li class="nav-item" v-for="(tab, index) in tabs" :key="'a' + index">
                <button class="nav-link" :class="[{ 'active': index == 0 }]" :id="`${tab.id}-tab`" data-bs-toggle="tab"
                    :data-bs-target="`#${tab.id}`" type="button">{{ tab.name }}</button>
            </li>
        </ul>
        <div class="tab-content" id="myTabContent">
            <div class="tab-pane fade" :class="[{ 'show active': index == 0 }]" :id="tab.id" role="tabpanel"
                v-for="(tab, index) in tabs" :key="'tab' + index">
                <slot :name="tab.id" />
            </div>

        </div>
    </div>
</template>
<script>
export default{
    props:['tabs']
}
</script>
  