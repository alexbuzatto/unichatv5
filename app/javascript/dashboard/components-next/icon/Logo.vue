<script setup>
import { computed, useAttrs } from 'vue';
import { useMapGetter } from 'dashboard/composables/store';
import { useAccount } from 'dashboard/composables/useAccount';

import { useUISettings } from 'dashboard/composables/useUISettings';

const attrs = useAttrs();
const globalConfig = useMapGetter('globalConfig/get');
const { accountId } = useAccount();
const account = useMapGetter('accounts/getAccount');
const { uiSettings } = useUISettings();

const isDarkMode = computed(() => {
  const { theme } = uiSettings.value;
  if (theme === 'system') {
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  }
  return theme === 'dark';
});

const logoSrc = computed(() => {
  const currentAccount = account.value(accountId.value);
  const brandingConfig = currentAccount?.branding_config;

  if (isDarkMode.value) {
    if (brandingConfig?.logo_dark) return brandingConfig.logo_dark;
    if (brandingConfig?.logo_main) return brandingConfig.logo_main;
    return globalConfig.value.logoDark || globalConfig.value.logoThumbnail;
  }

  if (brandingConfig?.logo_light) return brandingConfig.logo_light;
  if (brandingConfig?.logo_main) return brandingConfig.logo_main;
  return globalConfig.value.logoLight || globalConfig.value.logoThumbnail;
});
</script>

<template>
  <img
    v-if="logoSrc"
    v-bind="attrs"
    :src="logoSrc"
  />
  <svg
    v-else
    v-once
    v-bind="attrs"
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g clip-path="url(#woot-logo-clip-2342424e23u32098)">
      <path
        d="M8 16C12.4183 16 16 12.4183 16 8C16 3.58172 12.4183 0 8 0C3.58172 0 0 3.58172 0 8C0 12.4183 3.58172 16 8 16Z"
        fill="#2781F6"
      />
      <path
        d="M11.4172 11.4172H7.70831C5.66383 11.4172 4 9.75328 4 7.70828C4 5.66394 5.66383 4 7.70835 4C9.75339 4 11.4172 5.66394 11.4172 7.70828V11.4172Z"
        fill="white"
        stroke="white"
        stroke-width="0.1875"
      />
    </g>
    <defs>
      <clipPath id="woot-logo-clip-2342424e23u32098">
        <rect width="16" height="16" fill="white" />
      </clipPath>
    </defs>
  </svg>
</template>
