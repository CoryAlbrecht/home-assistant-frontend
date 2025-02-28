import { mdiViewDashboard } from "@mdi/js";
import { customElement, property } from "lit/decorators";
import type { RouterOptions } from "../../../layouts/hass-router-page";
import { HassRouterPage } from "../../../layouts/hass-router-page";
import type { HomeAssistant } from "../../../types";

export const lovelaceTabs = [
  {
    path: "/config/lovelace/dashboards",
    translationKey: "ui.panel.config.lovelace.dashboards.caption",
    iconPath: mdiViewDashboard,
  },
];

export const lovelaceResourcesTabs = [
  {
    path: "/config/lovelace/resources",
    translationKey: "ui.panel.config.lovelace.resources.caption",
    iconPath: mdiViewDashboard,
  },
];

@customElement("ha-config-lovelace")
class HaConfigLovelace extends HassRouterPage {
  @property({ attribute: false }) public hass!: HomeAssistant;

  @property({ type: Boolean }) public narrow = false;

  @property({ attribute: "is-wide", type: Boolean }) public isWide = false;

  protected routerOptions: RouterOptions = {
    defaultPage: "dashboards",
    routes: {
      dashboards: {
        tag: "ha-config-lovelace-dashboards",
        load: () => import("./dashboards/ha-config-lovelace-dashboards"),
        cache: true,
      },
      resources: {
        tag: "ha-config-lovelace-resources",
        load: () => import("./resources/ha-config-lovelace-resources"),
      },
    },
  };

  protected updatePageEl(pageEl) {
    pageEl.hass = this.hass;
    pageEl.narrow = this.narrow;
    pageEl.isWide = this.isWide;
    pageEl.route = this.routeTail;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "ha-config-lovelace": HaConfigLovelace;
  }
}
