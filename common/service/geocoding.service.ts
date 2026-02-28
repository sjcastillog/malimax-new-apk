import axios from "axios";

const OPENCAGE_API_KEY =
  process.env.EXPO_PUBLIC_OPENCAGE_API_KEY ?? "TU_API_KEY_AQUI";

export interface GeocodeResult {
  city: string;
  country: string;
  countryCode: string;
  state?: string;
  formattedAddress: string;
}

export const getLocationFromCoordinates = async (
  latitude: number,
  longitude: number,
): Promise<GeocodeResult | null> => {
  try {
    const response = await axios.get(
      `https://api.opencagedata.com/geocode/v1/json`,
      {
        params: {
          q: `${latitude},${longitude}`,
          key: OPENCAGE_API_KEY,
          language: "es",
          no_annotations: 1,
        },
      },
    );

    if (response.data.results && response.data.results.length > 0) {
      const result = response.data.results[0];
      const components = result.components;

      return {
        city:
          components.city ||
          components.town ||
          components.village ||
          components.county ||
          "Ciudad desconocida",
        country: components.country || "País desconocido",
        countryCode: components.country_code?.toUpperCase() || "",
        state: components.state || components.region,
        formattedAddress: result.formatted,
      };
    }

    return null;
  } catch (error) {
    console.error("Error en geocoding con OpenCage:", error);
    throw error;
  }
};
