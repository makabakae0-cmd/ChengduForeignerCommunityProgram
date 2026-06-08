import { ref } from "vue";

export const usePlaceAsyncState = () => {
  const loading = ref(false);
  const error = ref("");

  const setError = (message: string) => {
    error.value = message;
    loading.value = false;
  };

  const run = async <TResult>(
    task: () => Promise<TResult>,
    fallbackMessage: string
  ): Promise<TResult | null> => {
    loading.value = true;
    error.value = "";

    try {
      return await task();
    } catch (taskError) {
      error.value =
        taskError instanceof Error ? taskError.message : fallbackMessage;
      return null;
    } finally {
      loading.value = false;
    }
  };

  return {
    loading,
    error,
    run,
    setError
  };
};
