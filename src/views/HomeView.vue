<template>
  <div>
    <h1>This is HomeView.vue</h1>
    <p>On board your PayPal Account Here</p>
    <div>
      <!-- 外部脚本将被加载到这里 -->
      <div id="externalScriptContainer"></div>
    </div>
    <div>

      <a target="_blank" :data-paypal-onboard-complete="onboardedCallback"
        href="https://www.sandbox.paypal.com/bizsignup/partner/entry?referralToken=NzRhYTMwODMtZDZiNC00MDc1LTkxZDUtYjdhNGViMjA3OGI1alNaSDZDSTNjRzcyc2Yrc1FqNHdQYVp1NzJaVWhyaGsyMjc5bDUwTWRRQT12Mg==&displayMode=minibrowser"
        data-paypal-button="true">Sign up for PayPal</a>
    </div>

    <div>
      <a target="_blank" :data-paypal-onboard-complete="onboardedCallback" :href="dynamicUrl"
        data-paypal-button="true">Sign up for PayPal Dynamic</a>
    </div>


  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { useClientSecretStore } from '@/stores/clientSecret';
const dynamicUrl = ref('<Action-URL>&displayMode=minibrowser');
const clientSecretStore = useClientSecretStore();


onMounted(() => {
  console.log("onMounted is trigged!")
  // setTimeout( () => {
   
  // }, 2000)

  console.log("现在开始加载外部脚本")
    const script = document.createElement('script');
    script.src = "https://www.sandbox.paypal.com/webapps/merchantboarding/js/lib/lightbox/partner.js"
    script.onload = async () => {
      // 在这里执行脚本加载完成后的操作
      console.log('外部脚本加载完成');
      await getActionUrl();
    };
    document.getElementById('externalScriptContainer').appendChild(script);

});

const getActionUrl = async () => {
  const clientID = clientSecretStore.clientID;
  const secret = clientSecretStore.secretKey;
  const auth = btoa(clientID + ':' + secret);

  const requestBody = {
    "email": "petro-test01-us-bs@cctest.com",
    "tracking_id": "001002003",
    "partner_config_override": {
      // "return_url": "http://localhost:5173",      
      "return_url": "https://www.google.com",
      "show_add_credit_card": true
    },
    "operations": [{
      "operation": "API_INTEGRATION",
      "api_integration_preference": {
        "rest_api_integration": {
          "integration_method": "PAYPAL",
          "integration_type": "THIRD_PARTY",
          "third_party_details": {
            "features": ["PAYMENT", "REFUND", "ACCESS_MERCHANT_INFORMATION"]
          }
        }
      }
    }],
    "products": ["PAYMENT_METHODS"],
    "capabilities": ["APPLE_PAY"],
    "legal_consents": [{
      "type": "SHARE_DATA_CONSENT",
      "granted": true
    }]
  }

  // debugger;
  const response = await fetch('https://api-m.sandbox.paypal.com/v2/customer/partner-referrals', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Basic ${auth}`
    },
    body: JSON.stringify(requestBody)
  });
  const data = await response.json();
  const link = data.links[1].href;
  alert("Onboard Link is created: " + link);
  console.log("Onboard Link is created: " + link)
  dynamicUrl.value = `${link}&displayMode=minibrowser`;
}



function onboardedCallback() {
  alert("onboardedCallback");
  // fetch('/seller-server/login-seller', {
  //     method: 'POST',
  //     headers: {
  //       'content-type': 'application/json'
  //     },
  //     body: JSON.stringify({
  //       authCode: authCode,
  //       sharedId: sharedId
  //     })
  //   }).then(function(res) {
  //     if (!res.ok) {
  //       alert("Something went wrong!");
  //     }
  //   });
}
</script>

<style scoped>
/* 这里可以添加组件的样式 */
</style>