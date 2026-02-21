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
  <img
    v-else
    v-bind="attrs"
    src="/brand-assets/logo_thumbnail.svg"
  />
</template>
