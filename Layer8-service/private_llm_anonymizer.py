import json
import uuid
import requests
from typing import Dict, List, Any, Tuple

class PrivateLLMAnonymizer:
    """
    Class to handle anonymization using a private LLM instance through Ollama API
    """
    
    def __init__(self, llm_endpoint: str = "http://172.23.75.38:11434", model: str = "llama3.2"):
        """
        Initialize the private LLM anonymizer.
        
        Args:
            llm_endpoint: URL of the Ollama API endpoint
            model: Model name to use for anonymization
        """
        self.llm_endpoint = llm_endpoint
        self.model = model
        self.generate_endpoint = f"{llm_endpoint}/api/generate"
        
    def anonymize_with_llm(self, text: str) -> Tuple[str, Dict[str, List[str]], Dict[str, str]]:
        """
        Send text to private LLM for anonymization and receive the anonymized text and mapping.
        
        Args:
            text: Original text to anonymize
            
        Returns:
            Tuple containing (anonymized_text, sensitivity_report, placeholder_mapping)
        """
        # System prompt to instruct the LLM how to anonymize the data
        system_prompt = """
You will anonymize sensitive data in the text provided. Follow these strict rules:

1. Identify sensitive information category

2. For each sensitive item found:
   - Generate a unique placeholder using the format: ___CATEGORY_UNIQUEID___
   - UNIQUEID should be the first 8 characters of a UUID
   - Example: ___NAME_a1b2c3d4___

3. Return your response in this exact JSON format:
{
  "original_text": "the complete original text",
  "anonymized_text": "text with all sensitive data replaced by placeholders",
  "sensitivity_report": {
    "CREDIT_CARD": ["1234-5678-9012-3456"],
    ...
  },
  "placeholder_mapping": {
    "___PII_a1b2c3d4___": "John Doe",
    "___PII_e5f6g7h8___": "john.doe@example.com",
    ...
  }
}

4. Be thorough and consistent in identifying all sensitive information.
5. Preserve the original meaning and structure of the text.
"""

        # Prepare the prompt for the LLM
        prompt = f"{system_prompt}\n\nText to anonymize: {text}"
        
        # Prepare the request payload
        payload = {
            "model": self.model,
            "prompt": prompt,
            "stream": False  # Set to False to get complete response at once
        }
        
        try:
            # Send request to Ollama API
            response = requests.post(self.generate_endpoint, json=payload)
            response.raise_for_status()
            
            # Parse the response
            # For non-streaming, we expect a single JSON response with the 'response' field
            result = response.json()
            
            if 'response' not in result:
                raise ValueError(f"Unexpected response format: {result}")
            
            # Parse the JSON from the LLM's response
            llm_response = result['response']
            try:
                # Extract the JSON part from the response if needed
                if not llm_response.strip().startswith('{'):
                    # Find JSON in the response (looking for first '{' and last '}')
                    start_idx = llm_response.find('{')
                    end_idx = llm_response.rfind('}') + 1
                    if start_idx < 0 or end_idx <= 0:
                        raise ValueError("No valid JSON found in the response")
                    llm_response = llm_response[start_idx:end_idx]
                
                anonymization_result = json.loads(llm_response)
                
                # Validate the required fields
                required_fields = ['original_text', 'anonymized_text', 'sensitivity_report', 'placeholder_mapping']
                for field in required_fields:
                    if field not in anonymization_result:
                        raise ValueError(f"Missing required field '{field}' in LLM response")
                
                return (
                    anonymization_result['anonymized_text'],
                    anonymization_result['sensitivity_report'],
                    anonymization_result['placeholder_mapping']
                )
            except json.JSONDecodeError:
                # If LLM didn't return valid JSON, we'll fallback to a default format
                return self._create_fallback_anonymization(text)
        
        except requests.RequestException as e:
            # Handle request errors
            raise ConnectionError(f"Error connecting to private LLM API: {str(e)}")
        except Exception as e:
            # Handle other errors
            raise RuntimeError(f"Error processing LLM anonymization: {str(e)}")
    
    def _create_fallback_anonymization(self, text: str) -> Tuple[str, Dict[str, List[str]], Dict[str, str]]:
        """
        Fallback method if the LLM doesn't return proper JSON.
        Simply returns the original text with empty reports.
        
        In a production system, you might want to implement a basic rule-based
        fallback here or retry with a different prompt.
        """
        return text, {}, {}
    
    def stream_generate(self, prompt: str) -> List[Dict[str, Any]]:
        """
        Send a prompt to the LLM and stream the response tokens.
        
        Args:
            prompt: The prompt to send to the LLM
            
        Returns:
            List of response chunks
        """
        # Prepare the request payload
        payload = {
            "model": self.model,
            "prompt": prompt,
            "stream": True  # Enable streaming
        }
        
        response_chunks = []
        
        try:
            # Send request to Ollama API with streaming
            with requests.post(self.generate_endpoint, json=payload, stream=True) as response:
                response.raise_for_status()
                
                # Process the streaming response
                for line in response.iter_lines():
                    if line:
                        # Decode the line and parse as JSON
                        json_str = line.decode('utf-8')
                        chunk = json.loads(json_str)
                        response_chunks.append(chunk)
                        
            return response_chunks
        
        except requests.RequestException as e:
            # Handle request errors
            raise ConnectionError(f"Error connecting to private LLM API: {str(e)}")
        except Exception as e:
            # Handle other errors
            raise RuntimeError(f"Error streaming from LLM: {str(e)}")
    
    def deanonymize(self, text: str, placeholder_mapping: Dict[str, str]) -> str:
        """
        Restore anonymized data in the text using the provided mapping.
        
        Args:
            text: Text with anonymized placeholders
            placeholder_mapping: Mapping from placeholders to original values
            
        Returns:
            Original text with sensitive data restored
        """
        deanonymized_text = text
        for placeholder, original in placeholder_mapping.items():
            deanonymized_text = deanonymized_text.replace(placeholder, original)
        return deanonymized_text 