// Available models for the chooser (Web platform supported models only)
export const AVAILABLE_MODELS = [
  { value: 'meta/llama3.2-1b/instruct-q4', label: 'Llama 3.2 1B (Q4) - Fast' },
  {
    value: 'meta/llama3.2-1b/instruct-fp16',
    label: 'Llama 3.2 1B (FP16) - Fast',
  },
  {
    value: 'meta/llama3.2-3b/instruct-q4',
    label: 'Llama 3.2 3B (Q4) - Balanced',
  },
  {
    value: 'meta/llama3.1-8b/instruct-q4',
    label: 'Llama 3.1 8B (Q4) - Quality',
  },
  {
    value: 'huggingface/smollm2-135m/instruct-fp16',
    label: 'SmolLM2 135M (FP16) - Ultra Fast',
  },
  {
    value: 'huggingface/smollm2-360m/instruct-q4',
    label: 'SmolLM2 360M (Q4) - Very Fast',
  },
  {
    value: 'huggingface/smollm2-360m/instruct-fp16',
    label: 'SmolLM2 360M (FP16) - Very Fast',
  },
  {
    value: 'huggingface/smollm2-1.7b/instruct-q4',
    label: 'SmolLM2 1.7B (Q4) - Fast',
  },
  {
    value: 'deepseek/r1-distill-llama-8b/q4',
    label: 'DeepSeek R1 Distill 8B (Q4) - Quality',
  },
]
