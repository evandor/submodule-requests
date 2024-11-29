import {defineStore} from 'pinia';
import {computed, ref, watchEffect} from "vue";

import * as cheerio from 'cheerio';
import {CheerioAPI} from 'cheerio';
import {TabReference, TabReferenceType} from "src/content/models/TabReference";
import {uid} from "quasar";
import {Readability} from '@mozilla/readability'

/**
 * this request store is meant to track transient state of the currently opened tab's request.
 *
 */
export const useRequestsStore = defineStore('requests', () => {

  const currentTabRequest = ref< chrome.webRequest.WebResponseHeadersDetails | undefined>(undefined)

  const setCurrentTabRequest = (details:  chrome.webRequest.WebResponseHeadersDetails) => {
    currentTabRequest.value = details
  }

  const getCurrentTabRequest = computed((): chrome.webRequest.WebResponseHeadersDetails | undefined  => {
    return currentTabRequest.value
  })

  return {
    setCurrentTabRequest,
    getCurrentTabRequest
  }
})
