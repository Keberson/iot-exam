import i18next from "i18next";
import { z } from "zod";
import { makeZodI18nMap } from "zod-i18n-map";
import translation from "zod-i18n-map/locales/ru/zod.json" with { type: "json" };

await i18next.init({
    lng: "ru",
    resources: {
        ru: {
            zod: translation,
        },
    },
});

z.setErrorMap(makeZodI18nMap({ t: i18next.t }));

export { z };
