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
        href="https://www.sandbox.paypal.com/bizsignup/partner/entry?referralToken=MzUxNzdmZmItYjU5ZS00MjU2LWIzNmYtZDM3ZjA2ODI1OTgya0xjVi9scUVtQ3AwV3BGb2hzQXNGRjRLVC9jTUM5Y1Z4bTAwNHJLRnhWND12Mg=="
        data-paypal-button="true">Sign up for PayPal</a>
    </div>

    <div>
      <a target="_blank" :data-paypal-onboard-complete="onboardedCallback" :href="dynamicUrl"
        data-paypal-button="true">Sign up for PayPal Dynamic</a>
    </div>

    <!-- <div>
      <a data-paypal-button="true"
        href="https://msmaster.qa.paypal.com/bizsignup/partner/entry?referralToken=NGE4MDRmZWYtNDEwNC00NjIzLThjNDEtY2ZmYWE5ZWU4MmE2NGltelRYbzFRY3ArY0FLZm9iTzYzRC94bWlKUmFCdUdDb2JpOFFZMzBkWT12Mg==&displayMode=minibrowser">
        Onboard to PayPal
      </a>

    </div> -->

    <!-- <div>
      <a target="_blank" :data-paypal-onboard-complete="onboardedCallback" href="https://www.bing.com"
        data-paypal-button="true">Minibrowser for bing.com</a>
    </div> -->
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { useClientSecretStore } from '@/stores/clientSecret';
const dynamicUrl = ref('<Action-URL>&displayMode=minibrowser');
const clientSecretStore = useClientSecretStore();


onMounted(() => {
  const script = document.createElement('script');
  script.src = "https://www.sandbox.paypal.com/webapps/merchantboarding/js/lib/lightbox/partner.js"
  script.onload = async () => {
    // 在这里执行脚本加载完成后的操作
    console.log('外部脚本加载完成');

    await getActionUrl();

  };

  // const scriptAdditional = document.createElement('script');
  // scriptAdditional.src = "https://www.paypal.com/webapps/merchantboarding/js/lib/lightbox/partner.js";
  // script.onload = async () => {
  
  //   console.log('额外onboarding script脚本加载完成');

  // };

  document.getElementById('externalScriptContainer').appendChild(script);
  // document.getElementById('externalScriptContainer').appendChild(scriptAdditional);
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
  dynamicUrl.value = link;
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