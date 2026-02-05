// src/data/apiData.js
// Complete API documentation data converted from your markdown files

export const companyAccessTokensAPI = {
    title: "Company Access Tokens API",
    description: "Company access token endpoints for authenticating fintech integrations",
    category: "Company APIs",
    
    authentication: {
      type: "Bearer Token",
      header: "Authorization: Bearer <company_token>",
      contentType: "application/json"
    },
    
    permissions: [
      { action: "payouts.create", description: "Create a token" },
      { action: "payouts.view", description: "List tokens" },
      { action: "payouts.manage", description: "Revoke a token" }
    ],
    
    endpoints: [
      {
        id: "create-access-token",
        name: "Create Access Token",
        method: "POST",
        path: "/api/company/access-tokens",
        description: "Creates a new access token for fintech integrations",
        
        requestBody: {
          name: { type: "string", required: true, description: "Name for the access token", example: "Fintech Payouts" },
          expiresInDays: { type: "number", required: true, description: "Token expiration in days", example: 90 }
        },
        
        codeExamples: {
          curl: `curl -X POST "$BASE_URL/api/company/access-tokens" \\
    -H "Authorization: Bearer $TOKEN" \\
    -H "Content-Type: application/json" \\
    -d '{ "name": "Fintech Payouts", "expiresInDays": 90 }'`,
          javascript: `const payload = { name: "Fintech Payouts", expiresInDays: 90 };
  const response = await fetch(\`\${BASE_URL}/api/company/access-tokens\`, {
    method: "POST",
    headers: {
      Authorization: \`Bearer \${TOKEN}\`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(payload)
  });
  const data = await response.json();`
        },
        
        responses: {
          "200": {
            description: "Success - Token created",
            example: `{
    "success": true,
    "message": "Access token created",
    "data": {
      "id": 12,
      "name": "Fintech Payouts",
      "isActive": true,
      "expiresAt": "2026-05-06T12:00:00Z",
      "lastUsedAt": null,
      "createdAt": "2026-02-05T12:00:00Z",
      "accessToken": "fp_live_..."
    },
    "errors": null,
    "timestamp": "2026-02-05T12:00:00Z"
  }`
          }
        },
        notes: ["accessToken is only returned at creation time. Store it securely."]
      },
      {
        id: "list-access-tokens",
        name: "List Access Tokens",
        method: "GET",
        path: "/api/company/access-tokens",
        description: "Retrieves all access tokens for the company",
        
        codeExamples: {
          curl: `curl -X GET "$BASE_URL/api/company/access-tokens" \\
    -H "Authorization: Bearer $TOKEN"`
        },
        
        responses: {
          "200": {
            description: "Success - Tokens retrieved",
            example: `{
    "success": true,
    "message": "Access tokens retrieved",
    "data": [
      {
        "id": 12,
        "name": "Fintech Payouts",
        "isActive": true,
        "expiresAt": "2026-05-06T12:00:00Z",
        "lastUsedAt": "2026-02-05T12:10:00Z",
        "createdAt": "2026-02-05T12:00:00Z",
        "accessToken": null
      }
    ]
  }`
          }
        }
      },
      {
        id: "revoke-access-token",
        name: "Revoke Access Token",
        method: "DELETE",
        path: "/api/company/access-tokens/{tokenId}",
        description: "Revokes (deactivates) an existing access token",
        
        parameters: {
          tokenId: { type: "number", location: "path", required: true, description: "ID of the token to revoke", example: 12 }
        },
        
        codeExamples: {
          curl: `curl -X DELETE "$BASE_URL/api/company/access-tokens/12" \\
    -H "Authorization: Bearer $TOKEN"`
        },
        
        responses: {
          "200": {
            description: "Success - Token revoked",
            example: `{
    "success": true,
    "message": "Access token revoked",
    "data": null
  }`
          }
        }
      }
    ]
  };
  
  export const outboundWebhooksAPI = {
    title: "Outbound Webhooks API",
    description: "Configure and manage outbound webhook deliveries for event notifications",
    category: "Integration APIs",
    
    authentication: {
      type: "Bearer Token + API Key",
      header: "Authorization: Bearer <admin_or_company_token>",
      apiKey: "X-API-Key: <api_key>",
      contentType: "application/json"
    },
    
    webhookAuthTypes: ["Bearer", "ApiKey", "Basic", "hmac", "hmac-sha256", "hmac-sha512", "signature-sha512"],
    
    endpoints: [
      {
        id: "create-webhook",
        name: "Create Webhook Configuration",
        method: "POST",
        path: "/api/outboundwebhook",
        description: "Creates a new webhook configuration for event delivery",
        
        requestBody: {
          name: { type: "string", required: true, description: "Webhook name", example: "Fintech Payouts" },
          endpointUrl: { type: "string", required: true, description: "Target webhook URL", example: "https://client.example.com/webhooks/payouts" },
          httpMethod: { type: "string", required: true, description: "HTTP method", example: "POST" },
          headers: { type: "object", required: false, description: "Custom headers", example: { "X-Customer-Id": "12345" } },
          authType: { type: "string", required: true, description: "Authentication type", example: "hmac-sha256" },
          authValue: { type: "string", required: true, description: "Authentication secret", example: "your-signing-secret" },
          authHeader: { type: "string", required: false, description: "Auth header name", example: "X-Treegar-Signature" },
          isActive: { type: "boolean", required: false, description: "Enable webhook", example: true },
          maxRetries: { type: "number", required: false, description: "Max retry attempts", example: 3 },
          timeoutSeconds: { type: "number", required: false, description: "Request timeout", example: 30 },
          description: { type: "string", required: false, description: "Webhook description", example: "Payout status updates" },
          eventType: { type: "string", required: true, description: "Event type to listen for", example: "payout.completed" }
        },
        
        codeExamples: {
          curl: `curl -X POST "$BASE_URL/api/outboundwebhook" \\
    -H "Authorization: Bearer $TOKEN" \\
    -H "X-API-Key: $API_KEY" \\
    -H "Content-Type: application/json" \\
    -d '{
      "name": "Fintech Payouts",
      "endpointUrl": "https://client.example.com/webhooks/payouts",
      "httpMethod": "POST",
      "authType": "hmac-sha256",
      "authValue": "your-signing-secret",
      "isActive": true,
      "eventType": "payout.completed"
    }'`,
          javascript: `const payload = {
    name: "Fintech Payouts",
    endpointUrl: "https://client.example.com/webhooks/payouts",
    httpMethod: "POST",
    authType: "hmac-sha256",
    authValue: "your-signing-secret",
    isActive: true,
    eventType: "payout.completed"
  };
  const response = await fetch(\`\${BASE_URL}/api/outboundwebhook\`, {
    method: "POST",
    headers: {
      Authorization: \`Bearer \${TOKEN}\`,
      "X-API-Key": API_KEY,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(payload)
  });`
        },
        
        responses: {
          "200": {
            description: "Success - Webhook created",
            example: `{
    "success": true,
    "message": "Webhook configuration created successfully",
    "data": {
      "id": 77,
      "name": "Fintech Payouts",
      "endpointUrl": "https://client.example.com/webhooks/payouts",
      "isActive": true,
      "eventType": "payout.completed"
    }
  }`
          }
        }
      },
      {
        id: "list-webhooks",
        name: "List Webhook Configurations",
        method: "GET",
        path: "/api/outboundwebhook",
        description: "Retrieves all webhook configurations",
        
        codeExamples: {
          curl: `curl -X GET "$BASE_URL/api/outboundwebhook" \\
    -H "Authorization: Bearer $TOKEN" \\
    -H "X-API-Key: $API_KEY"`
        }
      },
      {
        id: "webhook-stats",
        name: "Webhook Delivery Stats",
        method: "GET",
        path: "/api/outboundwebhook/stats",
        description: "Get delivery statistics for webhooks",
        
        parameters: {
          eventType: { type: "string", location: "query", required: false, description: "Filter by event type", example: "payout.completed" }
        },
        
        codeExamples: {
          curl: `curl -X GET "$BASE_URL/api/outboundwebhook/stats?eventType=payout.completed" \\
    -H "Authorization: Bearer $TOKEN" \\
    -H "X-API-Key: $API_KEY"`
        },
        
        responses: {
          "200": {
            description: "Success - Stats retrieved",
            example: `{
    "success": true,
    "data": {
      "totalDeliveries": 12,
      "successfulDeliveries": 10,
      "failedDeliveries": 2,
      "pendingDeliveries": 0
    }
  }`
          }
        }
      }
    ]
  };
  
  export const fintechAccountsAPI = {
    title: "Fintech Accounts API",
    description: "Create and retrieve virtual accounts using fintech access tokens",
    category: "Fintech APIs",
    
    authentication: {
      type: "Fintech Access Token",
      header: "Authorization: Bearer <fintech_access_token>",
      contentType: "application/json"
    },
    
    endpoints: [
      {
        id: "create-virtual-account",
        name: "Create Virtual Account",
        method: "POST",
        path: "/api/fintech-accounts",
        description: "Creates a new virtual account for a customer",
        
        requestBody: {
          firstName: { type: "string", required: true, description: "Customer first name", example: "Ada" },
          lastName: { type: "string", required: true, description: "Customer last name", example: "Lovelace" },
          email: { type: "string", required: true, description: "Customer email", example: "ada@example.com" },
          phoneNumber: { type: "string", required: true, description: "Customer phone number", example: "+2348012345678" }
        },
        
        codeExamples: {
          curl: `curl -X POST "$BASE_URL/api/fintech-accounts" \\
    -H "Authorization: Bearer $TOKEN" \\
    -H "Content-Type: application/json" \\
    -d '{
      "firstName": "Ada",
      "lastName": "Lovelace",
      "email": "ada@example.com",
      "phoneNumber": "+2348012345678"
    }'`,
          javascript: `const payload = {
    firstName: "Ada",
    lastName: "Lovelace",
    email: "ada@example.com",
    phoneNumber: "+2348012345678"
  };
  const response = await fetch(\`\${BASE_URL}/api/fintech-accounts\`, {
    method: "POST",
    headers: {
      Authorization: \`Bearer \${TOKEN}\`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(payload)
  });`
        },
        
        responses: {
          "200": {
            description: "Success - Account created",
            example: `{
    "success": true,
    "message": "Account created",
    "data": {
      "accountId": 123,
      "accountNumber": "1020304050",
      "accountName": "Ada Lovelace",
      "customerCode": "CUST-8899",
      "currentBalance": 0,
      "currencyCode": "NGN",
      "status": "Active"
    }
  }`
          }
        }
      },
      {
        id: "list-fintech-accounts",
        name: "List Accounts",
        method: "GET",
        path: "/api/fintech-accounts",
        description: "Retrieves all virtual accounts for the fintech integration",
        
        parameters: {
          page: { type: "number", location: "query", required: false, description: "Page number", example: 1 },
          pageSize: { type: "number", location: "query", required: false, description: "Items per page", example: 20 }
        },
        
        codeExamples: {
          curl: `curl -X GET "$BASE_URL/api/fintech-accounts?page=1&pageSize=20" \\
    -H "Authorization: Bearer $TOKEN"`
        },
        
        responses: {
          "200": {
            description: "Success - Accounts retrieved",
            example: `{
    "success": true,
    "data": {
      "items": [
        {
          "accountId": 123,
          "accountNumber": "1020304050",
          "accountName": "Ada Lovelace",
          "currentBalance": 0,
          "status": "Active"
        }
      ],
      "totalCount": 1,
      "pageNumber": 1
    }
  }`
          }
        }
      },
      {
        id: "get-fintech-account",
        name: "Get Account by ID",
        method: "GET",
        path: "/api/fintech-accounts/{id}",
        description: "Retrieves a specific account by ID",
        
        parameters: {
          id: { type: "number", location: "path", required: true, description: "Account ID", example: 123 }
        },
        
        codeExamples: {
          curl: `curl -X GET "$BASE_URL/api/fintech-accounts/123" \\
    -H "Authorization: Bearer $TOKEN"`
        }
      }
    ]
  };
  
  export const companyBusinessPayoutsAPI = {
    title: "Company Business Payouts API",
    description: "Create and manage business payouts using company accounts",
    category: "Company APIs",
    
    authentication: {
      type: "Company Bearer Token",
      header: "Authorization: Bearer <company_token>",
      contentType: "application/json"
    },
    
    endpoints: [
      {
        id: "list-banks",
        name: "List Banks",
        method: "GET",
        path: "/api/company/business-payouts/banks",
        description: "Retrieves available banks for payouts",
        
        codeExamples: {
          curl: `curl -X GET "$BASE_URL/api/company/business-payouts/banks" \\
    -H "Authorization: Bearer $TOKEN"`
        },
        
        responses: {
          "200": {
            description: "Success - Banks retrieved",
            example: `{
    "success": true,
    "data": [
      { "bankId": 12, "bankName": "Example Bank", "country": "NG" },
      { "bankId": 27, "bankName": "Sandbox Bank", "country": "NG" }
    ]
  }`
          }
        }
      },
      {
        id: "resolve-account",
        name: "Resolve Account",
        method: "POST",
        path: "/api/company/business-payouts/resolve-account",
        description: "Validates and resolves a bank account",
        
        requestBody: {
          bankId: { type: "number", required: true, description: "Bank ID", example: 12 },
          accountNumber: { type: "string", required: true, description: "Account number", example: "0123456789" }
        },
        
        codeExamples: {
          curl: `curl -X POST "$BASE_URL/api/company/business-payouts/resolve-account" \\
    -H "Authorization: Bearer $TOKEN" \\
    -H "Content-Type: application/json" \\
    -d '{ "bankId": 12, "accountNumber": "0123456789" }'`,
          javascript: `const payload = { bankId: 12, accountNumber: "0123456789" };
  const response = await fetch(\`\${BASE_URL}/api/company/business-payouts/resolve-account\`, {
    method: "POST",
    headers: {
      Authorization: \`Bearer \${TOKEN}\`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(payload)
  });`
        },
        
        responses: {
          "200": {
            description: "Success - Account resolved",
            example: `{
    "success": true,
    "data": {
      "accountNumber": "0123456789",
      "accountName": "Ada Lovelace",
      "isSuccessful": true
    }
  }`
          }
        }
      },
      {
        id: "create-payout",
        name: "Create Payout",
        method: "POST",
        path: "/api/company/business-payouts",
        description: "Creates a new business payout",
        
        requestBody: {
          amount: { type: "number", required: true, description: "Payout amount in kobo/cents", example: 150000 },
          bankId: { type: "number", required: true, description: "Bank ID", example: 12 },
          beneficiaryAccountNumber: { type: "string", required: true, description: "Recipient account number", example: "0123456789" },
          beneficiaryAccountName: { type: "string", required: true, description: "Recipient account name", example: "Ada Lovelace" },
          clientReference: { type: "string", required: true, description: "Your unique reference", example: "PAYOUT-2026-0001" },
          narration: { type: "string", required: false, description: "Transaction description", example: "Vendor settlement" }
        },
        
        codeExamples: {
          curl: `curl -X POST "$BASE_URL/api/company/business-payouts" \\
    -H "Authorization: Bearer $TOKEN" \\
    -H "Content-Type: application/json" \\
    -d '{
      "amount": 150000,
      "bankId": 12,
      "beneficiaryAccountNumber": "0123456789",
      "beneficiaryAccountName": "Ada Lovelace",
      "clientReference": "PAYOUT-2026-0001",
      "narration": "Vendor settlement"
    }'`,
          javascript: `const payload = {
    amount: 150000,
    bankId: 12,
    beneficiaryAccountNumber: "0123456789",
    beneficiaryAccountName: "Ada Lovelace",
    clientReference: "PAYOUT-2026-0001",
    narration: "Vendor settlement"
  };
  const response = await fetch(\`\${BASE_URL}/api/company/business-payouts\`, {
    method: "POST",
    headers: {
      Authorization: \`Bearer \${TOKEN}\`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(payload)
  });`
        },
        
        responses: {
          "200": {
            description: "Success - Payout created",
            example: `{
    "success": true,
    "message": "Payout created",
    "data": {
      "id": 98765,
      "amount": 150000,
      "currency": "NGN",
      "status": "Processing",
      "clientReference": "PAYOUT-2026-0001",
      "transactionReference": "BPAY-ABC123"
    }
  }`
          }
        }
      },
      {
        id: "get-wallet-balance",
        name: "Get Wallet Balance",
        method: "GET",
        path: "/api/company/business-payouts/balance",
        description: "Retrieves current wallet balance",
        
        parameters: {
          currencyCode: { type: "string", location: "query", required: false, description: "Currency code", example: "NGN" }
        },
        
        codeExamples: {
          curl: `curl -X GET "$BASE_URL/api/company/business-payouts/balance?currencyCode=NGN" \\
    -H "Authorization: Bearer $TOKEN"`
        },
        
        responses: {
          "200": {
            description: "Success - Balance retrieved",
            example: `{
    "success": true,
    "data": {
      "walletId": 101,
      "currencyCode": "NGN",
      "currentBalance": 1250000,
      "status": "Active"
    }
  }`
          }
        }
      }
    ]
  };
  
  export const companyAccountsAPI = {
    title: "Company Accounts API",
    description: "Manage company virtual accounts and view balances/statements",
    category: "Company APIs",
    
    authentication: {
      type: "Company Bearer Token",
      header: "Authorization: Bearer <company_token>",
      contentType: "application/json"
    },
    
    permissions: [
      { action: "accounts.create", description: "Create accounts" },
      { action: "accounts.view", description: "View accounts and balances" },
      { action: "transactions.view", description: "View statements" }
    ],
    
    endpoints: [
      {
        id: "create-company-account",
        name: "Create Virtual Account",
        method: "POST",
        path: "/api/company/accounts",
        description: "Creates a new virtual account",
        
        requestBody: {
          firstName: { type: "string", required: true, description: "Customer first name", example: "Ada" },
          lastName: { type: "string", required: true, description: "Customer last name", example: "Lovelace" },
          email: { type: "string", required: true, description: "Customer email", example: "ada@example.com" },
          phoneNumber: { type: "string", required: true, description: "Customer phone number", example: "+2348012345678" }
        },
        
        codeExamples: {
          curl: `curl -X POST "$BASE_URL/api/company/accounts" \\
    -H "Authorization: Bearer $TOKEN" \\
    -H "Content-Type: application/json" \\
    -d '{
      "firstName": "Ada",
      "lastName": "Lovelace",
      "email": "ada@example.com",
      "phoneNumber": "+2348012345678"
    }'`
        },
        
        responses: {
          "200": {
            description: "Success - Account created",
            example: `{
    "success": true,
    "message": "Account created",
    "data": {
      "accountId": 123,
      "accountNumber": "1020304050",
      "accountName": "Ada Lovelace",
      "status": "Active"
    }
  }`
          }
        }
      },
      {
        id: "list-company-accounts",
        name: "List Accounts",
        method: "GET",
        path: "/api/company/accounts",
        description: "Retrieves all company accounts",
        
        parameters: {
          page: { type: "number", location: "query", required: false, description: "Page number", example: 1 },
          pageSize: { type: "number", location: "query", required: false, description: "Items per page", example: 20 }
        },
        
        codeExamples: {
          curl: `curl -X GET "$BASE_URL/api/company/accounts?page=1&pageSize=20" \\
    -H "Authorization: Bearer $TOKEN"`
        }
      },
      {
        id: "get-account-balance",
        name: "Get Account Balance",
        method: "GET",
        path: "/api/company/accounts/{accountNumber}/balance",
        description: "Retrieves current account balance",
        
        parameters: {
          accountNumber: { type: "string", location: "path", required: true, description: "Account number", example: "1020304050" }
        },
        
        codeExamples: {
          curl: `curl -X GET "$BASE_URL/api/company/accounts/1020304050/balance" \\
    -H "Authorization: Bearer $TOKEN"`
        },
        
        responses: {
          "200": {
            description: "Success - Balance retrieved",
            example: `{
    "success": true,
    "data": {
      "accountNumber": "1020304050",
      "availableBalance": 5000,
      "currency": "NGN",
      "accountStatus": "ACTIVE"
    }
  }`
          }
        }
      },
      {
        id: "get-account-statement",
        name: "Get Account Statement",
        method: "GET",
        path: "/api/company/accounts/{accountNumber}/statement",
        description: "Retrieves account transaction history",
        
        parameters: {
          accountNumber: { type: "string", location: "path", required: true, description: "Account number", example: "1020304050" },
          startDate: { type: "string", location: "query", required: false, description: "Start date (YYYY-MM-DD)", example: "2026-01-01" },
          endDate: { type: "string", location: "query", required: false, description: "End date (YYYY-MM-DD)", example: "2026-01-31" }
        },
        
        codeExamples: {
          curl: `curl -X GET "$BASE_URL/api/company/accounts/1020304050/statement?startDate=2026-01-01&endDate=2026-01-31" \\
    -H "Authorization: Bearer $TOKEN"`
        },
        
        responses: {
          "200": {
            description: "Success - Statement retrieved",
            example: `{
    "success": true,
    "data": {
      "accountNumber": "1020304050",
      "openingBalance": 0,
      "closingBalance": 5000,
      "statementList": [
        {
          "transactionReference": "TXN-1001",
          "transactionAmount": 5000,
          "transactionType": "CREDIT",
          "transactionDate": "2026-01-10T09:15:00Z"
        }
      ]
    }
  }`
          }
        }
      }
    ]
  };
  
  // Main API registry
  export const allAPIs = {
    "company-access-tokens": companyAccessTokensAPI,
    "outbound-webhooks": outboundWebhooksAPI,
    "fintech-accounts": fintechAccountsAPI,
    "company-business-payouts": companyBusinessPayoutsAPI,
    "company-accounts": companyAccountsAPI
  };
  
  // Get API categories for sidebar organization
  export const getAPICategories = () => {
    const categories = {};
    
    Object.values(allAPIs).forEach(api => {
      const category = api.category || "Other";
      if (!categories[category]) {
        categories[category] = [];
      }
      categories[category].push(api);
    });
    
    return categories;
  };