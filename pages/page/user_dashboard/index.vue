<template>
  <Head>
    <Title>User Dashboard</Title>
  </Head>
  <layout5 pageName="User Dashboard" parent="User Dashboard">
    <section class="section-b-space">
      <div class="container">
        <div class="row">
          <div class="col-lg-3">
            <ul class="nav nav-tabs custom-nav-tabs flex-column category-option" id="myTab"
              :class="{ show: dashboardLinks }">
              <li class="nav-item mb-2" v-for="(link, index) in allLinks" :key="index">
                <button class="nav-link font-light" :class="activeTab[link.link] ? 'active' : ''"
                  @click="setActiveTab(link.link)" id="tab" data-bs-toggle="tab" data-bs-target="#dash">
                  <i class="fas fa-angle-right"></i>{{ link.name }}
                </button>
              </li>
            </ul>
          </div>

          <div class="col-lg-9">
            <div class="filter-button dash-filter dashboard">
              <button class="btn btn-solid-default btn-sm fw-bold filter-btn" @click.prevent="toggleDashboardLinks">
                {{ useRuntimeConfig().public.const.ShowMenu }}
              </button>
            </div>

            <div class="tab-content" id="myTabContent">
              <PageUserDashboardMyDashboard v-if="activeTab['myDashboard']" />
              <PageUserDashboardOrders v-else-if="activeTab['orders']" />
              <PageUserDashboardWishilist v-else-if="activeTab['wishlist']" />
              <PageUserDashboardSavedAddress v-else-if="activeTab['savedAddress']" />
              <PageUserDashboardPayment v-else-if="activeTab['payment']" />
              <PageUserDashboardProfile v-else-if="activeTab['profile']" />
              <PageUserDashboardSecurity v-else-if="activeTab['security']" />
            </div>
          </div>
        </div>
      </div>
    </section>
    <PageUserDashboardAddAddressModal />
    <PageUserDashboardPaymentModal />
    <PageUserDashboardDeleteAccountModal />
    <PageUserDashboardConfirmDeleteAccountModal />
    <PageUserDashboardEditProfileModal />
  </layout5>
</template>

<script>
import { mapState } from "pinia";
import layout5 from "~/layout/layouts/layout5.vue";
import { useClickStore } from "~~/store/clickEvents";
export default {
  components: {
    layout5,
  },
  head() {
    return {
      title: "User dashboard",
    };
  },
  data() {
    return {
      activeTab: { myDashboard: true },
      allLinks: [
        { name: "Dashboard", link: "myDashboard" },
        { name: "Orders", link: "orders" },
        { name: "Wishlist", link: "wishlist" },
        { name: "Saved Address", link: "savedAddress" },
        { name: "Payment", link: "payment" },
        { name: "Profile", link: "profile" },
        { name: "Security", link: "security" },
      ],
    };
  },
  computed: {
    ...mapState(useClickStore, ['dashboardLinks', 'showAddAddressModal', 'showPaymentModal', 'showDeleteAccountModal', 'showConfirmDeleteAccount', 'showEditProfileModal'])
  },
  methods: {
    toggleDashboardLinks() {
      useClickStore().toggleDashboardLinks()
    },
    setActiveTab(tab) {
      this.activeTab = {};
      this.activeTab[tab] = true;
    },
  },
};
</script>
