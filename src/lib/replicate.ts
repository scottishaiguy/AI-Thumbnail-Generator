const REPLICATE_API_URL = 'https://api.replicate.com/v1';

interface ReplicateConfig {
  apiToken: string;
  modelVersion: string;
}

export class ReplicateAPI {
  private config: ReplicateConfig;

  constructor(config: ReplicateConfig) {
    this.config = config;
  }

  async processImage(imageUrl: string, prompt: string) {
    try {
      const response = await fetch(`${REPLICATE_API_URL}/predictions`, {
        method: 'POST',
        headers: {
          'Authorization': `Token ${this.config.apiToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          version: this.config.modelVersion,
          input: {
            image: imageUrl,
            prompt: prompt,
          },
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to process image');
      }

      return await response.json();
    } catch (error) {
      console.error('Replicate API error:', error);
      throw error;
    }
  }

  async getStatus(predictionId: string) {
    try {
      const response = await fetch(
        `${REPLICATE_API_URL}/predictions/${predictionId}`,
        {
          headers: {
            'Authorization': `Token ${this.config.apiToken}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error('Failed to get prediction status');
      }

      return await response.json();
    } catch (error) {
      console.error('Replicate API error:', error);
      throw error;
    }
  }
}