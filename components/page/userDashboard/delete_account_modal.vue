<template>
  <div class="modal delete-account-modal fade" id="deleteModal">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
        <div class="modal-body pb-3 text-center mt-4">
          <h4>Are you sure you want to delete your account?</h4>
        </div>
        <div class="modal-footer d-block text-center mb-4">
          <button class="btn btn-solid-default btn-sm fw-bold rounded" data-bs-target="#doneModal"
            data-bs-toggle="modal" data-bs-dismiss="modal">
            Yes Delete account
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style>

</style>