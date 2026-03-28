import { reactive, readonly } from "vue";

const state = reactive({
  locale: "zh" as "zh" | "en",
  communityId: "tongzilin",
  userId: "user_001"
});

export const useAppStore = () => {
  const setLocale = (locale: "zh" | "en") => {
    state.locale = locale;
  };

  return {
    state: readonly(state),
    setLocale
  };
};

export const pickLocalized = (
  locale: "zh" | "en",
  zhText: string,
  enText: string
) => (locale === "zh" ? zhText : enText);
