import { Generation, GenerationListItem, GenerationData } from '@/types/generation';
import { AppConfig } from '@/config';
import { GenerationFactory } from '@/factory/generationFactory';

class GenerationAdapter {
  async getById(id: string | number): Promise<Generation> {
    const response = await fetch(`${AppConfig.localApiUrl}/generations/${id}`);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    const result = await response.json();
    return GenerationFactory.createGeneration(result.data);
  }
  async getAll(): Promise<Generation[]> {
    const response = await fetch(`${AppConfig.localApiUrl}/generations`);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    const json = await response.json();
    const result = json.data.map((item: any) => GenerationFactory.createGeneration(item));
    return result;
  }
}

export const generationAdapter = new GenerationAdapter();