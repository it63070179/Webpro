<template>
  <div>
    <div>
      <NavBar />
    </div>

    <section class="hero is-fullheight">
      <section class="container">
        <div class="columns is-multiline">
          <div class="column register">
            <div class="columns">
              <div class="column left">
                <center><h1 class="title is-1">Sign up Employee</h1></center>
                <br />
                <form>
                  <div class="field">
                    <label class="label">First Name</label>
                    <div class="control has-icons-left has-icons-right">
                      <input
                        v-model="$v.fname.$model"
                        :class="{ 'is-danger': $v.fname.$error }"
                        class="input"
                        type="text"
                      />
                    </div>
                    <template v-if="$v.fname.$error">
                      <!-- เช็ค v-if ว่ามีค่า error หรือป่าวถ้ามี error จะแสดงขึ้นมา-->
                      <p class="help is-danger" v-if="!$v.fname.required">
                        This field is requried
                      </p>
                      <p class="help is-danger" v-if="!$v.fname.minLength">
                        First Name must more than 5 letters
                      </p>

                      <!-- ถ้าใส่ค่า First Name น้อยกว่า 5 ตัว จะขึ้น error-->

                      <!-- ถ้าไม่ใส่ค่าอะไรเลยจะขึ้น error มา-->
                      <p class="help is-danger" v-if="!$v.fname.maxLength">
                        First Name must not more than 50 letters
                      </p>
                      <!-- ถ้าใส่ค่า First Name เกิน50 ตัว จะขึ้น error-->
                    </template>
                  </div>

                  <div class="field">
                    <label class="label">Last Name</label>
                    <div class="control has-icons-left has-icons-right">
                      <input
                        v-model="$v.lname.$model"
                        :class="{ 'is-danger': $v.lname.$error }"
                        class="input"
                        type="text"
                      />
                    </div>
                    <template v-if="$v.lname.$error">
                      <!-- เช็ค v-if ว่ามีค่า error หรือป่าวถ้ามี error จะแสดงขึ้นมา-->
                      <p class="help is-danger" v-if="!$v.lname.required">
                        This field is requried
                      </p>
                      <!-- ถ้าไม่ใส่ค่าอะไรเลยจะขึ้น error มา-->
                      <p class="help is-danger" v-if="!$v.lname.minLength">
                        Last Name must more than 5 letters
                      </p>

                      <!-- ถ้าใส่ค่า Last Name น้อยกว่า 5 ตัว จะขึ้น error-->
                      <p class="help is-danger" v-if="!$v.lname.maxLength">
                        Last Name must not more than 50 letters
                      </p>
                      <!-- ถ้าใส่ค่า Last Name เกิน50 ตัว จะขึ้น error-->
                    </template>
                  </div>

                  <div class="field">
                    <label class="label">Age</label>
                    <div class="control has-icons-left has-icons-right">
                      <input
                        v-model="$v.age.$model"
                        :class="{ 'is-danger': $v.age.$error }"
                        class="input"
                        type="number"
                      />
                      <span class="icon is-small is-left">
                        <i class="fas fa-child"></i>
                      </span>
                    </div>
                    <template v-if="$v.age.$error">
                      <!-- เช็ค v-if ว่ามีค่า error หรือป่าวถ้ามี error จะแสดงขึ้นมา -->
                      <p class="help is-danger" v-if="!$v.age.required">
                        This field is requried
                      </p>
                      <!-- ถ้าไม่ใส่ค่าอะไรเลยจะขึ้น error มา -->
                      <p class="help is-danger" v-if="!$v.age.between">
                        Must be between 15 and 80
                      </p>
                      <!-- ถ้าใส่ค่า address ต่ำกว่า15 มากกว่า80 จะ error -->
                    </template>
                  </div>

                  <div class="field">
                    <label class="label">Phone Number</label>
                    <div class="control has-icons-left has-icons-right">
                      <input
                        v-model="$v.phone.$model"
                        :class="{ 'is-danger': $v.phone.$error }"
                        class="input"
                        type="text"
                      />
                      <span class="icon is-small is-left">
                        <i class="fas fa-mobile"></i>
                      </span>
                    </div>
                    <template v-if="$v.phone.$error">
                      <!-- เช็ค v-if ว่ามีค่า error หรือป่าวถ้ามี error จะแสดงขึ้นมา-->
                      <p class="help is-danger" v-if="!$v.phone.required">
                        This field is requried
                      </p>
                      <!-- ถ้าไม่ใส่ค่าอะไรเลยจะขึ้น error มา-->
                      <p
                        class="help is-danger"
                        v-if="!$v.phone.phone.maxLength"
                      >
                        This phone number format is incorrect
                      </p>
                      <!-- ถ้าใส่ค่า phone number ผิดจะขึ้น error และค่าต้องไม่เกิน10ตัวอักษร-->
                    </template>
                  </div>
                </form>
              </div>

              <div class="column right">
                <form>
                  <div class="field">
                    <label class="label">Address</label>
                    <div class="control has-icons-left has-icons-right">
                      <input
                        v-model="$v.address.$model"
                        :class="{ 'is-danger': $v.address.$error }"
                        class="input"
                        type="text"
                      />
                      <!-- $v จะ validate ข้อมูลก่อน $model กรอกอะไรมาค่าจะเปลี่ยนตามที่กรอก -->
                      <span class="icon is-small is-left">
                        <i class="fas fa-address-card"></i>
                      </span>
                    </div>
                    <template v-if="$v.address.$error">
                      <!-- เช็ค v-if ว่ามีค่า error หรือป่าวถ้ามี error จะแสดงขึ้นมา -->
                      <p class="help is-danger" v-if="!$v.address.required">
                        This field is requried
                      </p>
                      <!-- ถ้าไม่ใส่ค่าอะไรเลยจะขึ้น error มา -->
                    </template>
                  </div>

                  <div class="field">
                    <label class="label">Username</label>
                    <div class="control has-icons-left">
                      <input
                        v-model="$v.user_login.$model"
                        :class="{ 'is-danger': $v.user_login.$error }"
                        class="input"
                        type="text"
                      />
                      <span class="icon is-small is-left">
                        <i class="fas fa-user"></i>
                      </span>
                    </div>
                    <template v-if="$v.user_login.$error">
                      <!-- เช็ค v-if ว่ามีค่า error หรือป่าวถ้ามี error จะแสดงขึ้นมา-->

                      <p class="help is-danger" v-if="!$v.user_login.required">
                        This field is requried
                      </p>
                      <!-- ถ้าไม่ใส่ค่าอะไรเลยจะขึ้น error มา-->

                      <p class="help is-danger" v-if="!$v.user_login.minLength">
                        Username must be at least 4 letters
                      </p>
                      <!-- ถ้าใส่ค่า username ไม่ถึง5 ตัว จะขึ้น error-->

                      <p class="help is-danger" v-if="!$v.user_login.maxLength">
                        Username must not more than 20 letters
                      </p>
                      <!-- ถ้าใส่ค่า username เกิน 20 ตัว จะขึ้น error-->
                    </template>
                  </div>

                  <div class="field">
                    <label class="label">Password</label>
                    <div class="control has-icons-left has-icons-right">
                      <input
                        v-model="$v.user_password.$model"
                        :class="{ 'is-danger': $v.user_password.$error }"
                        class="input"
                        type="password"
                      />
                      <span class="icon is-small is-left">
                        <i class="fas fa-lock"></i>
                      </span>
                    </div>
                    <template v-if="$v.user_password.$error">
                      <!-- เช็ค v-if ว่ามีค่า error หรือป่าวถ้ามี error จะแสดงขึ้นมา-->

                      <p
                        class="help is-danger"
                        v-if="!$v.user_password.required"
                      >
                        This field is requried
                      </p>
                      <!-- ถ้าไม่ใส่ค่าอะไรเลยจะขึ้น error มา-->

                      <p
                        class="help is-danger"
                        v-if="!$v.user_password.minLength"
                      >
                        Password must be at least 8 letters
                      </p>
                      <!-- ถ้าใส่ค่า password ไม่ถึง8 ตัว จะขึ้น error-->

                      <p
                        class="help is-danger"
                        v-if="!$v.user_password.complexPassword"
                      >
                        Password must be harder
                      </p>
                      <!-- ถ้าใส่ค่า password ไม่ถึง8 ตัว จะขึ้น error-->
                    </template>
                  </div>

                  <div class="field">
                    <label class="label">Confirm Password</label>
                    <div class="control has-icons-left has-icons-right">
                      <input
                        v-model="$v.confirm_password.$model"
                        :class="{ 'is-danger': $v.confirm_password.$error }"
                        class="input"
                        type="password"
                      />
                      <span class="icon is-small is-left">
                        <i class="fas fa-lock"></i>
                      </span>
                    </div>
                    <template v-if="$v.confirm_password.$error">
                      <!-- เช็ค v-if ว่ามีค่า error หรือป่าวถ้ามี error จะแสดงขึ้นมา-->

                      <p
                        class="help is-danger"
                        v-if="!$v.confirm_password.sameAs"
                      >
                        Password do not match
                      </p>
                      <!-- ถ้าค่าไม่ตรงกับ password จะขึ้น error -->
                    </template>
                  </div>

                  <br />
                  <br />
                  <center>
                    <button
                      :disabled="
                        user_login == '' ||
                        user_password == '' ||
                        fname == '' ||
                        lname == '' ||
                        age == 0 ||
                        phone == '' ||
                        address == ''
                      "
                      class="button is-block is-primary is-medium"
                      @click="submit()"
                    >
                      Register
                    </button>
                  </center>
                  <br />
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </section>
  </div>
</template>
<style>
body {
  --background: rgb(247, 247, 247);
}

.left {
  border-right: 5px solid var(--background);
}

.register {
  margin-top: 150px;
  background: white;
  border-radius: 70px;
  width: 5000px;
}

.left,
.right {
  padding: 90px;
}

.left .title {
  font-weight: 800;
}

.right .title {
  font-weight: 800;
}
</style>

<script>
import axios from "axios";
import NavBar from "../components/NavBar";
import {
  required,
  maxLength,
  minLength,
  sameAs,
  between,
} from "vuelidate/lib/validators";

function phone(value) {
  return !!value.match(/0[0-9]{9}/);
}

function complexPassword(value) {
  if (!(value.match(/[a-z]/) && value.match(/[A-Z]/) && value.match(/[0-9]/))) {
    return false;
  }
  return true;
}

export default {
  components: {
    NavBar,
  },
  data() {
    return {
      user_login: "",
      user_password: "",
      confirm_password: "",
      phone: "",
      fname: "",
      lname: "",
      age: 0,
      address: "",
    };
  },
  validations: {
    phone: {
      required, //เรียก custom validater ของ phone บรรทัด147
      phone,
      maxLength: maxLength(10),
    },
    user_password: {
      required,
      minLength: minLength(8),
      complexPassword,
    },
    confirm_password: {
      sameAs: sameAs("user_password"),
    },
    user_login: {
      required,
      minLength: minLength(4),
      maxLength: maxLength(20),
    },
    fname: {
      required,
      minLength: minLength(5),
      maxLength: maxLength(50),
    },
    lname: {
      required,
      minLength: minLength(5),
      maxLength: maxLength(50),
    },
    age: {
      required,
      between: between(15, 80),
    },
    address: {
      required,
    },
  },

  methods: {
    submit() {
      // Validate all fields เสร็จแล้วจะปรับค่า invalid บรรทัดที่347
      this.$v.$touch();

      // เช็คว่าในฟอร์มไม่มี error
      if (!this.$v.$invalid) {
        //ถ้าค่า invalid เป็น true หมายความว่ามีค่าตัวใดตัวนึงใน form ที่มีปัญหาอยู่ ถ้าเป็น false จะผ่านหมด
        let data = {
          user_login: this.user_login,
          user_password: this.user_password,
          confirm_password: this.confirm_password,
          phone: this.phone,
          fname: this.fname,
          lname: this.lname,
          age: this.age,
          address: this.address,
        };

        axios //post ข้อมูลไปฝั่ง backend
          .post("http://localhost:3000/signupemp", data)
          .then((res) => {
            alert("Sign up Success");
            console.log(res);
          })
          .catch((err) => {
            alert(err.response.data.details.message);
          });
      }
    },
  },
};
</script>
