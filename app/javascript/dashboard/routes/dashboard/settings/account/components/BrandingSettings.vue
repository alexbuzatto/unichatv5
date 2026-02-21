<script setup>
import { computed } from 'vue';
import SectionLayout from './SectionLayout.vue';
import WithLabel from 'v3/components/Form/WithLabel.vue';
import NextInput from 'next/input/Input.vue';

const props = defineProps({
  modelValue: {
    type: Object,
    default: () => ({
      logo_main: '',
      logo_dark: '',
      logo_light: '',
      favicon: '',
      logo_email: '',
      logo_super_admin: '',
    }),
  },
});

const emit = defineEmits(['update:modelValue']);

const config = computed({
  get: () => props.modelValue || {
    logo_main: '',
    logo_dark: '',
    logo_light: '',
    favicon: '',
    logo_email: '',
    logo_super_admin: '',
  },
  set: val => emit('update:modelValue', val),
});

const updateField = (field, value) => {
  const newConfig = { ...config.value };
  newConfig[field] = value;
  config.value = newConfig;
};
</script>

<template>
  <SectionLayout
    :title="$t('GENERAL_SETTINGS.FORM.BRANDING_CONFIG.TITLE')"
    :description="$t('GENERAL_SETTINGS.FORM.BRANDING_CONFIG.DESCRIPTION')"
    with-border
  >
    <div class="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-10 py-6">
      
      <!-- Logo Principal -->
      <div class="flex flex-col gap-4 group h-full">
        <WithLabel
          name="logo_main"
          :label="$t('GENERAL_SETTINGS.FORM.BRANDING_CONFIG.LOGO_MAIN.LABEL')"
          icon="image"
        >
          <NextInput
            :model-value="config.logo_main"
            type="url"
            class="w-full"
            :placeholder="$t('GENERAL_SETTINGS.FORM.BRANDING_CONFIG.LOGO_MAIN.PLACEHOLDER')"
            @update:model-value="updateField('logo_main', $event)"
          />
          <template #help>
            {{ $t('GENERAL_SETTINGS.FORM.BRANDING_CONFIG.LOGO_MAIN.HELP') }}
          </template>
        </WithLabel>
        <div class="relative h-24 flex mt-auto items-center justify-center bg-slate-50 rounded-[24px] border border-n-weak overflow-hidden group-hover:border-emerald-500/30 transition-all duration-300 shadow-sm group-hover:shadow-md">
          <div v-if="config.logo_main" class="p-4">
            <img :src="config.logo_main" class="max-h-16 object-contain" alt="Logo Preview" />
          </div>
          <div v-else class="text-slate-300 flex flex-col items-center gap-1 font-medium text-[10px] uppercase tracking-widest">
            <fluent-icon icon="image-off" size="20" class="opacity-20 mb-1" />
            Vazio
          </div>
        </div>
      </div>

      <!-- Logo Dark -->
      <div class="flex flex-col gap-4 group h-full">
        <WithLabel
          name="logo_dark"
          :label="$t('GENERAL_SETTINGS.FORM.BRANDING_CONFIG.LOGO_DARK.LABEL')"
          icon="weather-moon"
        >
          <NextInput
            :model-value="config.logo_dark"
            type="url"
            class="w-full"
            :placeholder="$t('GENERAL_SETTINGS.FORM.BRANDING_CONFIG.LOGO_DARK.PLACEHOLDER')"
            @update:model-value="updateField('logo_dark', $event)"
          />
          <template #help>
            {{ $t('GENERAL_SETTINGS.FORM.BRANDING_CONFIG.LOGO_DARK.HELP') }}
          </template>
        </WithLabel>
        <div class="relative h-24 flex mt-auto items-center justify-center bg-slate-900 rounded-[24px] border border-n-weak overflow-hidden group-hover:border-emerald-500/30 transition-all duration-300 shadow-sm group-hover:shadow-md">
          <div v-if="config.logo_dark" class="p-4">
            <img :src="config.logo_dark" class="max-h-16 object-contain" alt="Dark Logo Preview" />
          </div>
          <div v-else class="text-slate-600 flex flex-col items-center gap-1 font-medium text-[10px] uppercase tracking-widest">
             <fluent-icon icon="weather-moon" size="20" class="opacity-20 mb-1" />
             Vazio
          </div>
        </div>
      </div>

      <!-- Logo Light -->
      <div class="flex flex-col gap-4 group h-full">
        <WithLabel
          name="logo_light"
          :label="$t('GENERAL_SETTINGS.FORM.BRANDING_CONFIG.LOGO_LIGHT.LABEL')"
          icon="weather-sunny"
        >
          <NextInput
            :model-value="config.logo_light"
            type="url"
            class="w-full"
            :placeholder="$t('GENERAL_SETTINGS.FORM.BRANDING_CONFIG.LOGO_LIGHT.PLACEHOLDER')"
            @update:model-value="updateField('logo_light', $event)"
          />
          <template #help>
            {{ $t('GENERAL_SETTINGS.FORM.BRANDING_CONFIG.LOGO_LIGHT.HELP') }}
          </template>
        </WithLabel>
        <div class="relative h-24 flex mt-auto items-center justify-center bg-white rounded-[24px] border border-n-weak overflow-hidden group-hover:border-emerald-500/30 transition-all duration-300 shadow-sm group-hover:shadow-md">
          <div v-if="config.logo_light" class="p-4">
            <img :src="config.logo_light" class="max-h-16 object-contain" alt="Light Logo Preview" />
          </div>
          <div v-else class="text-slate-300 flex flex-col items-center gap-1 font-medium text-[10px] uppercase tracking-widest">
             <fluent-icon icon="weather-sunny" size="20" class="opacity-20 mb-1" />
             Vazio
          </div>
        </div>
      </div>

      <!-- Favicon -->
      <div class="flex flex-col gap-4 group h-full">
        <WithLabel
          name="favicon"
          :label="$t('GENERAL_SETTINGS.FORM.BRANDING_CONFIG.FAVICON.LABEL')"
          icon="window-new"
        >
          <NextInput
            :model-value="config.favicon"
            type="url"
            class="w-full"
            :placeholder="$t('GENERAL_SETTINGS.FORM.BRANDING_CONFIG.FAVICON.PLACEHOLDER')"
            @update:model-value="updateField('favicon', $event)"
          />
          <template #help>
            {{ $t('GENERAL_SETTINGS.FORM.BRANDING_CONFIG.FAVICON.HELP') }}
          </template>
        </WithLabel>
        <div class="relative h-24 flex mt-auto items-center justify-center bg-white rounded-[24px] border border-n-weak overflow-hidden group-hover:border-emerald-500/30 transition-all duration-300 shadow-sm group-hover:shadow-md">
          <div v-if="config.favicon" class="p-4">
            <img :src="config.favicon" class="w-8 h-8 object-contain" alt="Favicon Preview" />
          </div>
          <div v-else class="text-slate-300 flex flex-col items-center gap-1 font-medium text-[10px] uppercase tracking-widest">
             <fluent-icon icon="window-new" size="20" class="opacity-20 mb-1" />
             Vazio
          </div>
        </div>
      </div>

      <!-- Logo Email -->
      <div class="flex flex-col gap-4 group h-full">
        <WithLabel
          name="logo_email"
          :label="$t('GENERAL_SETTINGS.FORM.BRANDING_CONFIG.LOGO_EMAIL.LABEL')"
          icon="mail"
        >
          <NextInput
            :model-value="config.logo_email"
            type="url"
            class="w-full"
            :placeholder="$t('GENERAL_SETTINGS.FORM.BRANDING_CONFIG.LOGO_EMAIL.PLACEHOLDER')"
            @update:model-value="updateField('logo_email', $event)"
          />
          <template #help>
            {{ $t('GENERAL_SETTINGS.FORM.BRANDING_CONFIG.LOGO_EMAIL.HELP') }}
          </template>
        </WithLabel>
        <div class="relative h-24 flex mt-auto items-center justify-center bg-slate-50 rounded-[24px] border border-n-weak overflow-hidden group-hover:border-emerald-500/30 transition-all duration-300 shadow-sm group-hover:shadow-md">
          <div v-if="config.logo_email" class="p-4">
            <img :src="config.logo_email" class="max-h-16 object-contain" alt="Email Logo Preview" />
          </div>
          <div v-else class="text-slate-300 flex flex-col items-center gap-1 font-medium text-[10px] uppercase tracking-widest">
             <fluent-icon icon="mail" size="20" class="opacity-20 mb-1" />
             Vazio
          </div>
        </div>
      </div>

      <!-- Logo Super Admin -->
      <div class="flex flex-col gap-4 group h-full">
        <WithLabel
          name="logo_super_admin"
          :label="$t('GENERAL_SETTINGS.FORM.BRANDING_CONFIG.LOGO_SUPER_ADMIN.LABEL')"
          icon="settings"
        >
          <NextInput
            :model-value="config.logo_super_admin"
            type="url"
            class="w-full"
            :placeholder="$t('GENERAL_SETTINGS.FORM.BRANDING_CONFIG.LOGO_SUPER_ADMIN.PLACEHOLDER')"
            @update:model-value="updateField('logo_super_admin', $event)"
          />
          <template #help>
            {{ $t('GENERAL_SETTINGS.FORM.BRANDING_CONFIG.LOGO_SUPER_ADMIN.HELP') }}
          </template>
        </WithLabel>
        <div class="relative h-24 flex mt-auto items-center justify-center bg-slate-50 rounded-[24px] border border-n-weak overflow-hidden group-hover:border-emerald-500/30 transition-all duration-300 shadow-sm group-hover:shadow-md">
          <div v-if="config.logo_super_admin" class="p-4">
            <img :src="config.logo_super_admin" class="max-h-16 object-contain" alt="Super Admin Logo Preview" />
          </div>
          <div v-else class="text-slate-300 flex flex-col items-center gap-1 font-medium text-[10px] uppercase tracking-widest">
             <fluent-icon icon="settings" size="20" class="opacity-20 mb-1" />
             Vazio
          </div>
        </div>
      </div>

    </div>
  </SectionLayout>
</template>
