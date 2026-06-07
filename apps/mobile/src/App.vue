<script lang="ts">
import { mobileEnv } from "@/config/env";

declare const wx:
  | {
      cloud?: {
        init?: (input: { env: string; traceUser?: boolean }) => void;
      };
    }
  | undefined;

export default {
  onLaunch() {
    if (
      mobileEnv.apiMode === "cloudbase-function" &&
      typeof wx !== "undefined" &&
      typeof wx.cloud?.init === "function"
    ) {
      wx.cloud.init({
        env: mobileEnv.cloudbaseEnvId,
        traceUser: true
      });
    }

    console.log("Community map mobile app launched.");
  }
};
</script>

<style>
page {
  background: #f3f4f6;
  color: #111827;
  font-family:
    "PingFang SC",
    "Microsoft YaHei",
    sans-serif;
}
</style>
