#!/usr/bin/env python3
"""
Backend API Testing Suite for Sociact AI
Tests all backend endpoints and functionality
"""

import requests
import json
import time
from datetime import datetime
import uuid

# Load backend URL from frontend .env
def get_backend_url():
    try:
        with open('/app/frontend/.env', 'r') as f:
            for line in f:
                if line.startswith('REACT_APP_BACKEND_URL='):
                    return line.split('=', 1)[1].strip()
    except Exception as e:
        print(f"Error reading frontend .env: {e}")
        return None

BACKEND_URL = get_backend_url()
if not BACKEND_URL:
    print("ERROR: Could not find REACT_APP_BACKEND_URL in frontend/.env")
    exit(1)

API_BASE = f"{BACKEND_URL}/api"

print(f"Testing backend at: {API_BASE}")
print("=" * 60)

def test_root_endpoint():
    """Test GET /api/ endpoint"""
    print("Testing GET /api/ (root endpoint)...")
    try:
        response = requests.get(f"{API_BASE}/", timeout=10)
        print(f"Status Code: {response.status_code}")
        print(f"Response: {response.json()}")
        
        if response.status_code == 200:
            data = response.json()
            if "message" in data and data["message"] == "Hello World":
                print("✅ Root endpoint working correctly")
                return True
            else:
                print("❌ Root endpoint returned unexpected response")
                return False
        else:
            print(f"❌ Root endpoint failed with status {response.status_code}")
            return False
    except requests.exceptions.RequestException as e:
        print(f"❌ Root endpoint request failed: {e}")
        return False
    except Exception as e:
        print(f"❌ Root endpoint test failed: {e}")
        return False

def test_cors_configuration():
    """Test CORS configuration"""
    print("\nTesting CORS configuration...")
    try:
        # Test preflight request
        headers = {
            'Origin': 'http://localhost:3000',
            'Access-Control-Request-Method': 'POST',
            'Access-Control-Request-Headers': 'Content-Type'
        }
        response = requests.options(f"{API_BASE}/status", headers=headers, timeout=10)
        print(f"OPTIONS Status Code: {response.status_code}")
        
        # Check CORS headers
        cors_headers = {
            'Access-Control-Allow-Origin': response.headers.get('Access-Control-Allow-Origin'),
            'Access-Control-Allow-Methods': response.headers.get('Access-Control-Allow-Methods'),
            'Access-Control-Allow-Headers': response.headers.get('Access-Control-Allow-Headers')
        }
        print(f"CORS Headers: {cors_headers}")
        
        if response.status_code in [200, 204] and cors_headers['Access-Control-Allow-Origin']:
            print("✅ CORS configuration working")
            return True
        else:
            print("❌ CORS configuration may have issues")
            return False
    except Exception as e:
        print(f"❌ CORS test failed: {e}")
        return False

def test_get_status_checks():
    """Test GET /api/status endpoint"""
    print("\nTesting GET /api/status (get status checks)...")
    try:
        response = requests.get(f"{API_BASE}/status", timeout=10)
        print(f"Status Code: {response.status_code}")
        
        if response.status_code == 200:
            data = response.json()
            print(f"Response type: {type(data)}")
            print(f"Number of status checks: {len(data) if isinstance(data, list) else 'Not a list'}")
            
            if isinstance(data, list):
                print("✅ GET status checks working correctly")
                return True, data
            else:
                print("❌ GET status checks returned non-list response")
                return False, None
        else:
            print(f"❌ GET status checks failed with status {response.status_code}")
            print(f"Response: {response.text}")
            return False, None
    except Exception as e:
        print(f"❌ GET status checks test failed: {e}")
        return False, None

def test_post_status_check():
    """Test POST /api/status endpoint"""
    print("\nTesting POST /api/status (create status check)...")
    try:
        # Create test data with realistic client name
        test_data = {
            "client_name": "SociactAI_WebClient"
        }
        
        response = requests.post(
            f"{API_BASE}/status", 
            json=test_data,
            headers={'Content-Type': 'application/json'},
            timeout=10
        )
        print(f"Status Code: {response.status_code}")
        
        if response.status_code == 200:
            data = response.json()
            print(f"Created status check: {data}")
            
            # Validate response structure
            required_fields = ['id', 'client_name', 'timestamp']
            if all(field in data for field in required_fields):
                if data['client_name'] == test_data['client_name']:
                    print("✅ POST status check working correctly")
                    return True, data
                else:
                    print("❌ POST status check returned incorrect client_name")
                    return False, None
            else:
                print(f"❌ POST status check missing required fields: {required_fields}")
                return False, None
        else:
            print(f"❌ POST status check failed with status {response.status_code}")
            print(f"Response: {response.text}")
            return False, None
    except Exception as e:
        print(f"❌ POST status check test failed: {e}")
        return False, None

def test_mongodb_persistence():
    """Test MongoDB data persistence"""
    print("\nTesting MongoDB data persistence...")
    try:
        # Create a status check
        test_data = {
            "client_name": f"PersistenceTest_{int(time.time())}"
        }
        
        post_response = requests.post(
            f"{API_BASE}/status", 
            json=test_data,
            headers={'Content-Type': 'application/json'},
            timeout=10
        )
        
        if post_response.status_code != 200:
            print("❌ Failed to create test status check for persistence test")
            return False
        
        created_item = post_response.json()
        created_id = created_item['id']
        
        # Wait a moment then retrieve all status checks
        time.sleep(1)
        get_response = requests.get(f"{API_BASE}/status", timeout=10)
        
        if get_response.status_code != 200:
            print("❌ Failed to retrieve status checks for persistence test")
            return False
        
        all_items = get_response.json()
        
        # Check if our created item exists
        found_item = None
        for item in all_items:
            if item.get('id') == created_id:
                found_item = item
                break
        
        if found_item:
            print(f"✅ MongoDB persistence working - found created item: {found_item['client_name']}")
            return True
        else:
            print("❌ MongoDB persistence failed - created item not found")
            return False
            
    except Exception as e:
        print(f"❌ MongoDB persistence test failed: {e}")
        return False

def test_server_stability():
    """Test server stability with multiple requests"""
    print("\nTesting server stability...")
    try:
        success_count = 0
        total_requests = 5
        
        for i in range(total_requests):
            response = requests.get(f"{API_BASE}/", timeout=10)
            if response.status_code == 200:
                success_count += 1
            time.sleep(0.5)  # Small delay between requests
        
        success_rate = (success_count / total_requests) * 100
        print(f"Success rate: {success_rate}% ({success_count}/{total_requests})")
        
        if success_rate >= 80:
            print("✅ Server stability test passed")
            return True
        else:
            print("❌ Server stability test failed")
            return False
            
    except Exception as e:
        print(f"❌ Server stability test failed: {e}")
        return False

def run_all_tests():
    """Run all backend tests"""
    print("Starting Sociact AI Backend API Tests")
    print("=" * 60)
    
    test_results = {}
    
    # Test 1: Root endpoint
    test_results['root_endpoint'] = test_root_endpoint()
    
    # Test 2: CORS configuration
    test_results['cors_config'] = test_cors_configuration()
    
    # Test 3: GET status checks
    get_result, _ = test_get_status_checks()
    test_results['get_status'] = get_result
    
    # Test 4: POST status check
    post_result, _ = test_post_status_check()
    test_results['post_status'] = post_result
    
    # Test 5: MongoDB persistence
    test_results['mongodb_persistence'] = test_mongodb_persistence()
    
    # Test 6: Server stability
    test_results['server_stability'] = test_server_stability()
    
    # Summary
    print("\n" + "=" * 60)
    print("TEST SUMMARY")
    print("=" * 60)
    
    passed_tests = 0
    total_tests = len(test_results)
    
    for test_name, result in test_results.items():
        status = "✅ PASS" if result else "❌ FAIL"
        print(f"{test_name.replace('_', ' ').title()}: {status}")
        if result:
            passed_tests += 1
    
    print(f"\nOverall: {passed_tests}/{total_tests} tests passed")
    
    if passed_tests == total_tests:
        print("🎉 All backend tests PASSED! Backend is working correctly.")
        return True
    else:
        print("⚠️  Some backend tests FAILED. Check the details above.")
        return False

if __name__ == "__main__":
    success = run_all_tests()
    exit(0 if success else 1)