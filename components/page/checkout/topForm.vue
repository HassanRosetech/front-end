<template>
  <div class="row g-4">
    <div class="col-md-6">
      <label for="fname" class="form-label">First Name</label>
      <Field id="fname" placeholder="Enter First Name" v-model="information.firstName" class="form-control"
        name="firstname" :rules="schema.fields.firstName" />
      <ErrorMessage class="text-danger" name="firstname" />
    </div>
    <div class="col-md-6">
      <label for="lname" class="form-label">Last Name</label>
      <Field type="text" class="form-control" v-model="information.lastName" id="lname" placeholder="Enter Last Name"
        name="lastName" :rules="isRequired" />
      <ErrorMessage class="text-danger" name="lastName" />

    </div>
    <div class="col-md-6">
      <label for="lname" class="form-label">Username</label>
      <div class="input-group">
        <span class="input-group-text" id="basic-addon1">@</span>
        <Field type="text" class="form-control" v-model="information.userName" placeholder="Username" name="username"
          :rules="isRequired" />
      </div>
      <ErrorMessage class="text-danger" name="username" />
    </div>

    <div class="col-md-6">
      <label for="email" class="form-label">Email address</label>
      <Field type="email" class="form-control" v-model="information.emailAddress" id="email"
        placeholder="example@example.com" name="email" :rules="isRequired" />
      <ErrorMessage class="text-danger" name="email" />
    </div>

    <div class="col-md-6">
      <label for="address" class="form-label">Address</label>
      <Field type="text" class="form-control" v-model="information.address1" id="address" aria-describedby="emailHelp"
        placeholder="1234 Main St" name="address" :rules="isRequired" />
      <ErrorMessage class="text-danger" name="address" />

    </div>

    <div class="col-md-6">
      <label for="address2" class="form-label">Address 2</label>
      <Field type="text" class="form-control" v-model="information.address2" id="address2" aria-describedby="emailHelp"
        placeholder="1234 Main St" name="address2" :rules="isRequired" />
      <ErrorMessage class="text-danger" name="address2" />

    </div>

    <div class="col-md-5">
      <label for="validationCustom04" class="form-label">Country</label>
      <select class="form-select custome-form-select" id="validationCustom04" required v-model="information.country">
        <option selected disabled value="">{{ useRuntimeConfig().public.const.Choose }}</option>
        <option v-for="(country, index) in useRuntimeConfig().public.const.CountryArr" :key="index">
          {{ country }}
        </option>
      </select>
      <div class="invalid-feedback">Please select a valid country.</div>
    </div>
    <div class="col-md-4">
      <label for="validationCustom04" class="form-label">{{
        useRuntimeConfig().public.const.State
      }}</label>
      <select required class="form-select custome-form-select" v-model="information.state" id="validationCustom05">
        <option selected disabled value="">{{ useRuntimeConfig().public.const.Choose }}</option>
        <option v-for="(state, index) in useRuntimeConfig().public.const.StateArr" :key="'a' + index">
          {{ state }}
        </option>
      </select>
    </div>
    <div class="col-md-3">
      <label for="zip" class="form-label">Zip</label>
      <Field type="text" class="form-control" v-model="information.zipCode" id="zip" aria-describedby="emailHelp"
        placeholder="Enter zip code" name="zipcode" :rules="isRequired" />
      <ErrorMessage class="text-danger" name="zipcode" />
    </div>
  </div>
</template>

<script setup>
import * as yup from 'yup'
import { Field, Form, ErrorMessage, useForm } from 'vee-validate';
import { useCartStore } from "~~/store/cart";
let information = ref({
  firstName: "",
  lastName: "",
  emailAddress: "",
  address1: "",
  address2: "",
  country: "",
  state: "",
  zipCode: "",
  userName: "",
}), addressForm = ref(null);
const schema = yup.object({
  email: yup.string().required().email(),
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  emailAddress: yup.string().required(),
  address1: yup.string().required(),
  address2: yup.string().required(),
  country: yup.string().required(),
  state: yup.string().required(),
  zipCode: yup.string().required(),
  userName: yup.string().required(),
});
const { handleSubmit } = useForm();
let emit = defineEmits(['formSubmitted'])
const onSubmit = handleSubmit(values => {
  emit('formSubmitted', information.value)
}, onInvalidSubmit);
defineExpose({
  onSubmit
})
useForm({
  validationSchema: schema,
});
function isRequired(value) {
  if (value && value.trim()) {
    return true;
  }
  return 'This is required';
}

function onInvalidSubmit({ values, errors, results }) {
}
onMounted(() => {
  if (Object.keys(useCartStore().userInfo)?.length)
    information.value = useCartStore().userInfo;
})
onUpdated(() => {
  if (Object.keys(useCartStore().userInfo)?.length)
    information.value = useCartStore().userInfo;
})
</script>
