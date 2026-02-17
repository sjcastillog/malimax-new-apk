import { CatalogueI, ServiceResponseI } from "@/common/interface";
import { puceApi } from "@/core/api/puceApi";

export const getAllCatalogueChildrenbyParentCode = async (
  code: string,
): Promise<CatalogueI[] | null> => {
  try {
    const { data } = await puceApi.get<ServiceResponseI<CatalogueI[]>>(
      `/catalogue/all-children-by-parent-code`,
      { params: { code } },
    );
    return data?.data ?? [];
  } catch (error) {
    return null;
  }
};
