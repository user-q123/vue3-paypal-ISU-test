import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useClientSecretStore = defineStore('clientSecret', () => {
  // US client
  const clientID = ref("AaB-X2CM2jf9k-DU-sWSaNbpfKnHeRLHa84MppXHdBpv36uWUqGui9ldOk6SeET9Os5Hc4J5puUTetXo")

  const secretKey = ref("EAwyCjl9UrSmRqV4h6E_xoZdt3CVdJof6P9_1c8IY-jUca_m7g9oCAuMiw5vJ-MyhJzopPiRwbTaqUYy")
    ;
  return { clientID, secretKey }
})
