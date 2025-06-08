import { BufferMemory } from "langchain/memory";

const memoryMap = new Map<string, BufferMemory>();
export function getUserMemory(userId: string) {
  if (!memoryMap.has(userId)) {
    memoryMap.set(userId, new BufferMemory());
  }
  return memoryMap.get(userId);
}

export const resetMemory = (userId:string) => {
  if (memoryMap.get(userId)) {
    memoryMap.delete(userId);
  }
};
