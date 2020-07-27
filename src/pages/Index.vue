<template>
  <q-page padding class="column items-center justify-start">
    <div class="q-pa-md">
      <div class="text-center">
        <p v-show="daysLeft">נותרו {{ daysLeft }} ימים לסיום תשלום מרוכז זה</p>
      </div>
      <q-stepper v-model="step" ref="stepper" color="primary" animated>
        <!-- step 1 city -->

        <q-step :name="1" title="בחרו עיר" icon="settings" :done="step > 1">
          בחרו את עיר המגורים שלכם

          <div class="row items-center justify-center stepper-content">
            <q-select
              filled
              use-input
              hide-selected
              fill-input
              input-debounce="0"
              @filter="filterCities"
              v-model="city"
              :options="citiesOptions"
              hint="עיר מגורים"
              style="padding-bottom: 32px"
            >
              <template v-slot:no-option>
                <q-item>
                  <q-item-section class="text-grey">
                    No results
                  </q-item-section>
                </q-item>
              </template>
            </q-select>
          </div>
        </q-step>

        <!-- step 2 school -->

        <q-step
          :name="2"
          title="בחרו מוסד לימודים"
          icon="add_comment"
          :done="step > 2"
        >
          בחרו את בית הספר או הקונסרבטוריון בו בנכם/בתכם לומדים לנגן

          <div class="row items-center justify-center stepper-content">
            <q-select
              filled
              use-input
              hide-selected
              fill-input
              input-debounce="0"
              @filter="filterSchoolNames"
              style="padding-bottom: 32px"
              v-model="schoolName"
              :options="schoolNamesOptions"
              hint="מוסד לימודים"
            >
              <template v-slot:no-option>
                <q-item>
                  <q-item-section class="text-grey">
                    No results
                  </q-item-section>
                </q-item>
              </template>
            </q-select>
          </div>
        </q-step>

        <!-- step 3 product -->

        <q-step :name="3" title="בחרו מוצר" icon="add_comment" :done="step > 3">
          בחרו את המוצרים שתרצו לרכוש ברכישה מרוכזת זו. המוצרים יגיעו לבית הספר
          ויחולקו על ידי המורים לתלמידים.

          <div class="q-pa-md">
            <q-option-group
              :options="products"
              label="Notifications"
              type="radio"
              v-model="product"
            />
          </div>
        </q-step>

        <!-- step 4 data -->

        <q-step
          :name="4"
          title="הזינו את הנתונים"
          icon="add_comment"
          :done="step > 4"
        >
          בחרתם במוצר: "{{ curProduct }}" ברכישה מרוכזת של בית ספר
          {{ schoolName }}. מלאו את הפרטים בטופס זה ולאחר מכן עברו לתשלום.

          <div class="column justify-center stepper-content">
            <q-input
              class="q-mt-lg q-mx-xl"
              filled
              v-model="parentName"
              label="שמכם המלא"
              hint="שם ושם משפחה"
              type="text"
              lazy-rules
              :rules="[
                val => (val && val.length > 0) || 'יש להזין כאן את שמכם'
              ]"
            />
            <q-input
              class="q-mt-lg q-mx-xl"
              filled
              v-model="email"
              label="דוא״ל"
              hint="המייל שלכם"
              type="email"
              lazy-rules
              :rules="[
                val => (val && val.length > 0) || 'יש להזין כאן את המייל שלכם'
              ]"
            />
            <q-input
              class="q-mt-lg q-mx-xl"
              filled
              v-model="phone"
              label="טלפון"
              hint="טלפון נייד"
              type="text"
              lazy-rules
              :rules="[
                val =>
                  (val && val.length > 0) || 'יש להזין כאן את מספר הטלפון הנייד'
              ]"
            />
            <q-input
              class="q-mt-lg q-mx-xl"
              filled
              v-model="studentName"
              label="שם התלמיד"
              hint="שמו המלא של התלמיד או התלמידה"
              type="text"
              lazy-rules
              :rules="[
                val =>
                  (val && val.length > 0) ||
                  'יש להזין כאן שמו המלא של התלמיד או התלמידה'
              ]"
            />
            <q-select
              class="q-mt-lg q-mx-xl"
              filled
              v-model="schoolClass"
              :options="classList"
              hint="כיתה"
              style="width: 250px; padding-bottom: 32px"
            >
              <template v-slot:no-option>
                <q-item>
                  <q-item-section class="text-grey">
                    No results
                  </q-item-section>
                </q-item>
              </template>
            </q-select>
          </div>
        </q-step>

        <!-- step 5 payment -->

        <q-step :name="5" title="תשלום" icon="add_comment" :done="step > 5">
          להלן הפרטים שמולאו, לאחר לחיצה על כפתור התשלום תועברו לתשלום בכרטיס
          אשראי. בסיום התשלום תשלח לכם חשבונית מס קבלה ומייל עם כל פרטי הרכישה.
          <ul v-for="detail in details">
            <li>{{ detail.desc }} : {{ detail.value }}</li>
          </ul>
          <div class="text-center">
            <a :href="curProductLink" target="_self">
              <q-btn
                class="q-ma-lg"
                size="xl"
                color="positive"
                label="מעבר לתשלום"
                @click="paymentClick"
              />
            </a>
          </div>
        </q-step>

        <template v-slot:navigation>
          <q-stepper-navigation class="text-center" v-show="step < 5">
            <q-btn @click="nextStep" color="primary" label="המשיכו" />
            <q-btn
              v-if="step > 1"
              flat
              color="primary"
              @click="$refs.stepper.previous()"
              label="חזרה"
              class="q-ml-sm"
            />
          </q-stepper-navigation>
        </template>
      </q-stepper>
    </div>
  </q-page>
</template>

<script>
import { calculateDaysLeft } from "assets/js/timeUtils";

const classList = ["א", "ב", "ג", "ד", "ה", "ו"].reduce((acc, opt) => {
  for (let i = 1; i <= 4; i++) {
    acc.push(opt + " " + i);
  }
  return acc;
}, []);

import { date } from "quasar";
import validateInput from "../assets/js/validateInput";

export default {
  data() {
    return {
      step: 1,

      productSetId: null,
      paymentId: null,

      // city
      city: null,
      cities: [],
      citiesOptions: [],

      // school
      schoolName: null,
      schoolNames: [],
      schoolNamesOptions: [],

      // product
      products: [],
      product: null,

      parentName: null,
      email: null,
      phone: null,
      studentName: null,
      classList: classList,
      schoolClass: null,
      paid: false,

      expireDate: null,
      daysLeft: 0,
      productSet: String,

      color: "cyan"
    };
  },
  mounted() {},
  methods: {
    errorHandler(e) {
      this.$q.dialog({
        title: "תקלה",
        message: e.hasOwnProperty("message") ? e.message : e
      });
      console.error(e);
    },
    setCity(val) {
      this.city = val;
    },
    filterCities(val, update, abort) {
      update(() => {
        const needle = val.toLowerCase();
        this.citiesOptions = this.cities.filter(
          v => v.toLowerCase().indexOf(needle) > -1
        );
      });
    },
    setSchool(val) {
      this.schoolName = val;
    },
    filterSchoolNames(val, update, abort) {
      update(() => {
        const needle = val.toLowerCase();
        this.schoolNamesOptions = this.schoolNames.filter(
          v => v.toLowerCase().indexOf(needle) > -1
        );
      });
    },
    paymentClick() {
      // save id in localstorage
      localStorage.setItem("paymentId", this.paymentId);
      // save click on server
      this.$axios
        .post(`/api/click_payment`, { _id: this.paymentId })
        .catch(this.errorHandler);
    },
    /**
     * Next step start after pressing "next"
     * Here we prepare the data for steps
     */

    nextStep() {
      // step 1 - get school by the chosen city
      if (this.city && this.step === 1) {
        this.$axios
          .get(`/api/schools`, { params: { city: this.city } })
          .then(response => {
            this.schoolNamesOptions = this.schoolNames = response.data.map(
              obj => {
                return obj.schoolName;
              }
            );
          })
          .catch(this.errorHandler);
      }

      // step 2 - set product by school and city (ObjectId)
      if (this.schoolName && this.step === 2) {
        this.$axios
          .get(`/api/products`, {
            params: { city: this.city, schoolName: this.schoolName }
          })
          .then(response => {
            console.log(response.data);
            this.products = response.data.products;
            this.productSetId = response.data._id;
            this.expireDate = response.data.expireDate;
            this.products = this.products.map((p, i) => {
              return { label: p.label, value: i, url: p.url };
            });
            this.daysLeft = calculateDaysLeft(this.expireDate);
            if (this.daysLeft <= 0) {
              this.$router.push({ path: "/endOfPayment" });
            }
          })
          .catch(this.errorHandler);
      }

      // step 4 - send parent data to server
      if (this.step === 4) {
        const validate = validateInput(
          this.parentName,
          this.email,
          this.phone,
          this.studentName,
          this.schoolClass
        );
        if (validate) {
          this.errorHandler(validate);
          return;
        }

        this.$axios
          .post(`/api/set_parent_details`, {
            parentName: this.parentName,
            email: this.email,
            phone: this.phone,
            studentName: this.studentName,
            schoolClass: this.schoolClass,
            product: this.curProduct,
            productSet: this.productSetId,
            paid: false
          })
          .then(response => {
            this.paymentId = response.data._id;
          })
          .catch(this.errorHandler);
      }

      // continue
      this.$refs.stepper.next();
    }
  },
  computed: {
    curProduct() {
      return this.products[this.product]
        ? this.products[this.product].label
        : "מוצר לא נבחר";
    },
    curProductLink() {
      return this.products[this.product]
        ? this.products[this.product].url
        : "מוצר לא נבחר";
    },
    details() {
      return [
        { desc: "עיר", value: this.city },
        { desc: "בית ספר", value: this.schoolName },
        { desc: "שם ההורה", value: this.parentName },
        { desc: "דואר אלקטרוני", value: this.email },
        { desc: "טלפון", value: this.phone },
        { desc: "שם התלמיד", value: this.studentName },
        { desc: "כיתה", value: this.schoolClass }
      ];
    }
  },
  created() {
    // get cities

    this.$axios
      .get(`/api/cities`)
      .then(response => {
        this.citiesOptions = this.cities = response.data.map(obj => {
          return obj.city;
        });
        this.cities = [...new Set(this.cities)];
      })
      .catch(this.errorHandler);
  }
};
</script>
<style lang="scss">
.stepper-content {
  margin-top: 60px;
}
a {
  text-decoration: none;
}
</style>
