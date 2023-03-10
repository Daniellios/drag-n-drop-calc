import { IDragableItem } from "../types/components";

export function removeShadowed(id: string): string {
  return id.replace("shadowed-", "");
}

export function addShadowed(items: IDragableItem[]) {
  return items.map((el) => {
    return {
      ...el,
      id: `shadowed-${el.id}`,
    };
  });
}
