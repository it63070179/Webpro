<template>
  <div>
    <div>
      <NavBar />
    </div>

    <section class="hero is-fullheight">
      <div class="hero-body">
        <div class="container has-text-centered">
          <div class="column is-4 is-offset-4">
            <div class="box has-background-hsl(0, 0%, 4%)">
              <form>
                <div class="field">
                  <div class="control content">
                    <p><strong>หลักฐานการชำระเงิน</strong></p>
                    <div class="file is-centered my-3">
                      <label class="file-label">
                        <input class="file-input" type="file" name="resume" />
                        <span class="file-cta">
                          <span class="file-icon">
                            <i class="fas fa-upload"></i>
                          </span>
                          <span class="file-label"> Choose a file… </span>
                        </span>
                      </label>
                    </div>
                  </div>
                </div>

                <b-field label="วัน-เวลาที่โอนตามหลักฐานการชำระเงิน">
                  <b-datetimepicker
                    v-model="datetime"
                    placeholder="Click to select..."
                  >
                    <template #left>
                      <b-button
                        label="Now"
                        icon-left="clock"
                        @click="datetime = new Date()"
                        style="background-color: #b08968; color: white"
                      />
                    </template>

                    <template #right>
                      <b-button
                        label="Clear"
                        type="is-danger"
                        icon-left="close"
                        outlined
                        @click="datetime = null"
                      />
                    </template>
                  </b-datetimepicker>
                </b-field>

                <p><strong>โอนจากธนาคาร</strong></p>
                <div class="select my-3">
                  <select>
                    <option>Select Bank</option>
                    <option v-for="(pm, i) in payment" :key="i" name="pm.bank">
                      {{ pm.bank }}
                    </option>
                  </select>
                </div>

                <div class="field">
                  <div class="control">
                    <p><strong>จำนวนเงิน</strong></p>
                    <input
                      class="input my-3"
                      type="amount"
                      placeholder="Amount"
                    />
                  </div>
                </div>

                <div class="columns mt-6">
                  <button
                    class="button is-block is-info is-large is-fullwidth"
                    style="background-color: #633f38; color: #f8dec7"
                  >
                    ยืนยัน
                  </button>
                  <button
                    class="button is-block is-info is-large is-fullwidth ml-4"
                    style="background-color: #633f38; color: #f8dec7"
                  >
                    ยกเลิก
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
<style>
</style>

<script>
import NavBar from "../components/NavBar";

export default {
  components: {
    NavBar,
  },
  data() {
    return {
      datetime: new Date(),
      payment: [
        {
          id: 1,
          bank: "SCB",
        },
        {
          id: 2,
          bank: "K-BANK",
        },
        {
          id: 3,
          bank: "TMB",
        },
      ],
    };
  },
};
</script>
