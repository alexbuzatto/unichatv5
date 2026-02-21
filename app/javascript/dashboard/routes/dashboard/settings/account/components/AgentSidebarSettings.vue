<script setup>
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import SectionLayout from './SectionLayout.vue';
import NextSwitch from 'dashboard/components-next/switch/Switch.vue';

const props = defineProps({
  modelValue: {
    type: Object,
    default: () => ({
      main_sidebar: {},
      right_sidebar: {},
    }),
  },
});

const emit = defineEmits(['update:modelValue']);

const config = computed({
  get: () => props.modelValue || { main_sidebar: {}, right_sidebar: {} },
  set: val => emit('update:modelValue', val),
});

const mainSidebarItems = [
  { key: 'Companies', label: 'SIDEBAR.COMPANIES' },
  { key: 'Reports', label: 'SIDEBAR.REPORTS' },
  { key: 'Settings', label: 'SIDEBAR.SETTINGS' },
];

const rightSidebarItems = [
  {
    key: 'contact_info',
    label: 'CONVERSATION_SIDEBAR.ACCORDION.CONTACT_DETAILS',
  },
  {
    key: 'conversation_actions',
    label: 'CONVERSATION_SIDEBAR.ACCORDION.CONVERSATION_ACTIONS',
  },
  {
    key: 'conversation_participants',
    label: 'CONVERSATION_PARTICIPANTS.SIDEBAR_TITLE',
  },
  {
    key: 'conversation_info',
    label: 'CONVERSATION_SIDEBAR.ACCORDION.CONVERSATION_INFO',
  },
  {
    key: 'contact_attributes',
    label: 'CONVERSATION_SIDEBAR.ACCORDION.CONTACT_ATTRIBUTES',
  },
  {
    key: 'previous_conversation',
    label: 'CONVERSATION_SIDEBAR.ACCORDION.PREVIOUS_CONVERSATION',
  },
  { key: 'macros', label: 'CONVERSATION_SIDEBAR.ACCORDION.MACROS' },
  {
    key: 'contact_notes',
    label: 'CONVERSATION_SIDEBAR.ACCORDION.CONTACT_NOTES',
  },
  {
    key: 'conversation_labels',
    label: 'CONVERSATION_SIDEBAR.ACCORDION.CONVERSATION_LABELS',
  },
];

const isVisible = (section, key) => {
  if (config.value[section]?.[key] !== undefined) {
    return config.value[section][key];
  }
  if (section === 'main_sidebar') {
    return ['Inbox', 'Conversation', 'Contacts'].includes(key);
  }
  if (section === 'right_sidebar') {
    return [
      'conversation_actions',
      'previous_conversation',
      'conversation_participants',
    ].includes(key);
  }
  return true;
};

const toggle = (section, key) => {
  const newConfig = JSON.parse(JSON.stringify(config.value));
  if (!newConfig[section]) newConfig[section] = {};
  newConfig[section][key] = !isVisible(section, key);
  config.value = newConfig;
};
</script>

<template>
  <SectionLayout
    :title="$t('GENERAL_SETTINGS.FORM.AGENT_SIDEBAR_CONFIG.TITLE')"
    :description="$t('GENERAL_SETTINGS.FORM.AGENT_SIDEBAR_CONFIG.DESCRIPTION')"
  >
    <div class="flex flex-col gap-6">
      <div>
        <h4 class="text-sm font-medium mb-3 text-n-slate-12">
          {{ $t('GENERAL_SETTINGS.FORM.AGENT_SIDEBAR_CONFIG.MAIN_SIDEBAR') }}
        </h4>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div
            v-for="item in mainSidebarItems"
            :key="item.key"
            class="flex items-center justify-between p-3 border border-n-weak rounded-xl bg-n-alpha-1"
          >
            <span class="text-sm text-n-slate-11">{{ $t(item.label) }}</span>
            <NextSwitch
              :model-value="isVisible('main_sidebar', item.key)"
              @change="toggle('main_sidebar', item.key)"
            />
          </div>
        </div>
      </div>

      <div>
        <h4 class="text-sm font-medium mb-3 text-n-slate-12">
          {{ $t('GENERAL_SETTINGS.FORM.AGENT_SIDEBAR_CONFIG.RIGHT_SIDEBAR') }}
        </h4>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div
            v-for="item in rightSidebarItems"
            :key="item.key"
            class="flex items-center justify-between p-3 border border-n-weak rounded-xl bg-n-alpha-1"
          >
            <span class="text-sm text-n-slate-11">{{ $t(item.label) }}</span>
            <NextSwitch
              :model-value="isVisible('right_sidebar', item.key)"
              @change="toggle('right_sidebar', item.key)"
            />
          </div>
        </div>
      </div>
    </div>
  </SectionLayout>
</template>
