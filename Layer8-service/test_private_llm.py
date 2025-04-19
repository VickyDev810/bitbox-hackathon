#!/usr/bin/env python3
"""
Test script for private LLM anonymization functionality.
This script demonstrates how to use the various endpoints for private LLM anonymization.
"""

import argparse
import json
import requests
import sys
from typing import Dict, List, Any

def print_json(data: Any) -> None:
    """Print formatted JSON data."""
    print(json.dumps(data, indent=2))

def test_private_anonymize(base_url: str, text: str) -> Dict:
    """Test the private-anonymize endpoint."""
    print("\n=== Testing Private LLM Anonymization ===")
    endpoint = f"{base_url}/private-anonymize"
    
    response = requests.post(
        endpoint,
        json={"text": text}
    )
    
    if response.status_code == 200:
        result = response.json()
        print("Original query:", result["original_query"])
        print("Anonymized query:", result["anonymized_query"])
        print("\nSensitivity report:")
        print(result["formatted_report"])
        
        print("\nPlaceholder mapping:")
        for category, items in result["placeholder_mapping"].items():
            print(f"  {category.upper()}:")
            for item in items:
                print(f"    {item['placeholder']} -> {item['original_value']}")
        
        return result
    else:
        print(f"Error: {response.status_code}")
        print(response.text)
        return {}

def test_private_query(base_url: str, query: str) -> Dict:
    """Test the private-query endpoint."""
    print("\n=== Testing Full Query Pipeline with Private LLM ===")
    endpoint = f"{base_url}/private-query"
    
    response = requests.post(
        endpoint,
        json={"query": query}
    )
    
    if response.status_code == 200:
        result = response.json()
        print("Original query:", result["original_query"])
        print("Anonymized query:", result["anonymized_query"])
        
        print("\nSensitivity report:")
        print(result["formatted_report"])
        
        print("\nLLM Response (anonymized):")
        print(result["llm_response"])
        
        print("\nDeanonymized Response:")
        print(result["deanonymized_response"])
        
        return result
    else:
        print(f"Error: {response.status_code}")
        print(response.text)
        return {}

def test_stream_raw(base_url: str, prompt: str) -> None:
    """Test the stream-raw endpoint."""
    print("\n=== Testing Raw Streaming from Private LLM ===")
    endpoint = f"{base_url}/stream-raw"
    
    # Make a streaming request
    response = requests.get(
        endpoint,
        params={"prompt": prompt},
        stream=True
    )
    
    if response.status_code == 200:
        print("Streaming response:")
        # Process the stream
        accumulated_response = ""
        for line in response.iter_lines():
            if line:
                # Decode the line and parse as JSON
                json_str = line.decode('utf-8')
                print(json_str)
                
                try:
                    chunk = json.loads(json_str)
                    if 'response' in chunk:
                        accumulated_response += chunk['response']
                except json.JSONDecodeError:
                    print(f"Error parsing JSON: {json_str}")
        
        print("\nFull response:")
        print(accumulated_response)
    else:
        print(f"Error: {response.status_code}")
        print(response.text)

def main():
    parser = argparse.ArgumentParser(description="Test Private LLM Anonymization")
    parser.add_argument("--url", default="http://localhost:8000", help="API base URL")
    parser.add_argument("--test", choices=["anonymize", "query", "stream", "all"], default="all", help="Test to run")
    args = parser.parse_args()
    
    # Sample text with sensitive information
    sample_text = """
    My name is John Smith and I work at Acme Corporation.
    You can reach me at john.smith@acmecorp.com or call 555-123-4567.
    I live at 123 Main Street, New York, NY 10001.
    Our project code is XZ-9876 and we're working on Project Horizon.
    The meeting is scheduled for December 15, 2023 at 3:00 PM.
    """
    
    # Simple prompt for streaming test
    stream_prompt = "Explain why the sky appears blue in simple terms."
    
    # Run the selected test
    if args.test == "anonymize" or args.test == "all":
        test_private_anonymize(args.url, sample_text)
    
    if args.test == "query" or args.test == "all":
        test_private_query(args.url, sample_text + "\n\nCan you summarize this information in a professional manner?")
    
    if args.test == "stream" or args.test == "all":
        test_stream_raw(args.url, stream_prompt)

if __name__ == "__main__":
    main() 