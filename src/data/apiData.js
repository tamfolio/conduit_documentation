// src/data/apiData.js — Complete registry (7 APIs, all endpoints)

// ─── Company Access Tokens ───────────────────────────────────────────────────
export const companyAccessTokensAPI = {
  title: "Company Access Tokens API",
  description: "Create and manage long-lived access tokens for authenticating fintech integrations.",
  category: "Company APIs",

  authentication: {
    type: "Company Portal JWT",
    header: "Authorization: Bearer <company_jwt>",
    contentType: "application/json",
  },

  permissions: [
    { action: "payouts.create", description: "Create and revoke tokens" },
    { action: "payouts.view", description: "List tokens" },
  ],

  endpoints: [
    {
      id: "create-access-token",
      name: "Create Access Token",
      method: "POST",
      path: "/api/company/access-tokens",
      description: "Creates a new access token for fintech integrations. The token value is only returned once — store it securely.",

      requestBody: {
        name: { type: "string", required: true, description: "A label for the token", example: "Production Token" },
        expiresAt: { type: "string (ISO 8601)", required: false, description: "Expiry date. No expiry if omitted.", example: "2027-01-01T00:00:00Z" },
      },

      codeExamples: {
        curl: `curl -X POST "https://api.treegar.com/api/company/access-tokens" \\
  -H "Authorization: Bearer $TOKEN" \\
  -H "Content-Type: application/json" \\
  -d '{ "name": "Production Token" }'`,
        javascript: `const response = await fetch("https://api.treegar.com/api/company/access-tokens", {
  method: "POST",
  headers: {
    Authorization: \`Bearer \${TOKEN}\`,
    "Content-Type": "application/json",
  },
  body: JSON.stringify({ name: "Production Token" }),
});
const data = await response.json();`,
      },

      responses: {
        "201": {
          description: "Token created",
          example: `{
  "success": true,
  "message": "Access token created",
  "data": {
    "id": 5,
    "name": "Production Token",
    "token": "cat_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    "isActive": true,
    "expiresAt": null,
    "createdAt": "2026-04-15T10:00:00Z"
  },
  "errors": null,
  "timestamp": "2026-04-15T10:00:00Z"
}`,
        },
      },
      notes: ["The token value is only returned once at creation. Store it securely — it cannot be retrieved again."],
    },

    {
      id: "list-access-tokens",
      name: "List Access Tokens",
      method: "GET",
      path: "/api/company/access-tokens",
      description: "Retrieves all access tokens for the company. The raw token value is not included.",

      codeExamples: {
        curl: `curl -X GET "https://api.treegar.com/api/company/access-tokens" \\
  -H "Authorization: Bearer $TOKEN"`,
        javascript: `const response = await fetch("https://api.treegar.com/api/company/access-tokens", {
  headers: { Authorization: \`Bearer \${TOKEN}\` },
});
const data = await response.json();`,
      },

      responses: {
        "200": {
          description: "Tokens retrieved",
          example: `{
  "success": true,
  "message": "Access tokens retrieved",
  "data": [
    {
      "id": 5,
      "name": "Production Token",
      "token": null,
      "isActive": true,
      "expiresAt": null,
      "createdAt": "2026-04-15T10:00:00Z"
    }
  ],
  "errors": null,
  "timestamp": "2026-04-15T10:00:00Z"
}`,
        },
      },
    },

    {
      id: "revoke-access-token",
      name: "Revoke Access Token",
      method: "DELETE",
      path: "/api/company/access-tokens/{tokenId}",
      description: "Permanently deactivates a token. This action cannot be undone.",

      parameters: {
        tokenId: { type: "integer", location: "path", required: true, description: "ID of the token to revoke", example: 5 },
      },

      codeExamples: {
        curl: `curl -X DELETE "https://api.treegar.com/api/company/access-tokens/5" \\
  -H "Authorization: Bearer $TOKEN"`,
      },

      responses: {
        "200": {
          description: "Token revoked",
          example: `{
  "success": true,
  "message": "Access token revoked",
  "data": null,
  "errors": null,
  "timestamp": "2026-04-15T10:00:00Z"
}`,
        },
        "404": {
          description: "Token not found",
          example: `{
  "success": false,
  "message": "Access token not found",
  "data": null,
  "errors": null,
  "timestamp": "2026-04-15T10:00:00Z"
}`,
        },
      },
    },
  ],
};

// ─── Fintech Accounts ────────────────────────────────────────────────────────
export const fintechAccountsAPI = {
  title: "Fintech Accounts API",
  description: "Create and manage virtual bank accounts for your customers. BVN verification is required via QoreID.",
  category: "Fintech APIs",

  authentication: {
    type: "Fintech Access Token",
    header: "Authorization: Bearer <access_token>",
    contentType: "application/json",
  },

  endpoints: [
    {
      id: "list-providers",
      name: "List Providers",
      method: "GET",
      path: "/api/fintech-accounts/providers",
      description: "Returns the virtual account providers assigned to your company. Use the providerId when creating accounts.",

      codeExamples: {
        curl: `curl -X GET "https://api.treegar.com/api/fintech-accounts/providers" \\
  -H "Authorization: Bearer $TOKEN"`,
        javascript: `const response = await fetch("https://api.treegar.com/api/fintech-accounts/providers", {
  headers: { Authorization: \`Bearer \${TOKEN}\` },
});
const data = await response.json();`,
      },

      responses: {
        "200": {
          description: "Providers retrieved",
          example: `{
  "success": true,
  "message": "Providers retrieved",
  "data": [
    { "providerId": 1, "displayName": "Polaris", "service": "account-number" },
    { "providerId": 2, "displayName": "VFD", "service": "account-number" }
  ],
  "errors": null,
  "timestamp": "2026-04-15T10:00:00Z"
}`,
        },
      },
    },

    {
      id: "create-virtual-account",
      name: "Create Virtual Account",
      method: "POST",
      path: "/api/fintech-accounts",
      description: "Creates a permanent virtual account for a customer. BVN is verified against QoreID — name and date of birth must match BVN records.",

      requestBody: {
        bvn: { type: "string", required: true, description: "11-digit Bank Verification Number", example: "22442343954" },
        firstName: { type: "string", required: true, description: "Customer first name — must match BVN records", example: "Oluwatobiloba" },
        lastName: { type: "string", required: true, description: "Customer last name — must match BVN records", example: "Fakorede" },
        email: { type: "string", required: true, description: "Customer email. Sub-addressing (+) not allowed.", example: "tobiloba@treegar.com" },
        dateOfBirth: { type: "string", required: true, description: "Date of birth in dd-MM-yyyy format. Must match BVN records.", example: "11-06-1999" },
        providerId: { type: "integer", required: false, description: "Provider to use. Defaults to company's active provider. Call /providers to see options.", example: 2 },
      },

      codeExamples: {
        curl: `curl -X POST "https://api.treegar.com/api/fintech-accounts" \\
  -H "Authorization: Bearer $TOKEN" \\
  -H "Content-Type: application/json" \\
  -d '{
    "bvn": "22442343954",
    "firstName": "Oluwatobiloba",
    "lastName": "Fakorede",
    "email": "tobiloba@treegar.com",
    "dateOfBirth": "11-06-1999",
    "providerId": 2
  }'`,
        javascript: `const response = await fetch("https://api.treegar.com/api/fintech-accounts", {
  method: "POST",
  headers: {
    Authorization: \`Bearer \${TOKEN}\`,
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    bvn: "22442343954",
    firstName: "Oluwatobiloba",
    lastName: "Fakorede",
    email: "tobiloba@treegar.com",
    dateOfBirth: "11-06-1999",
    providerId: 2,
  }),
});
const data = await response.json();`,
        php: `$payload = json_encode([
  "bvn" => "22442343954",
  "firstName" => "Oluwatobiloba",
  "lastName" => "Fakorede",
  "email" => "tobiloba@treegar.com",
  "dateOfBirth" => "11-06-1999",
  "providerId" => 2,
]);
$ch = curl_init("https://api.treegar.com/api/fintech-accounts");
curl_setopt_array($ch, [
  CURLOPT_RETURNTRANSFER => true,
  CURLOPT_POST => true,
  CURLOPT_HTTPHEADER => [
    "Authorization: Bearer $TOKEN",
    "Content-Type: application/json",
  ],
  CURLOPT_POSTFIELDS => $payload,
]);
$response = curl_exec($ch);`,
      },

      responses: {
        "201": {
          description: "Account created",
          example: `{
  "success": true,
  "message": "Account created",
  "data": {
    "accountId": 2138,
    "companyId": 14,
    "accountNumber": "1047215416",
    "accountName": "Treegar X Corp - OLUWATOBILOBA FAKOREDE",
    "customerCode": "CUSTT8KOU42H",
    "currentBalance": 0,
    "availableBalance": 0,
    "currencyCode": "NGN",
    "status": "Active",
    "accountType": "virtual",
    "createdAt": "2026-04-13T20:53:29Z"
  },
  "errors": null,
  "timestamp": "2026-04-13T20:53:30Z"
}`,
        },
        "400": {
          description: "Validation error",
          example: `{
  "success": false,
  "message": "BVN verification failed: Name mismatch",
  "data": null,
  "errors": null,
  "timestamp": "2026-04-15T10:00:00Z"
}`,
        },
      },
      notes: [
        "BVN verification is performed via QoreID on every account creation.",
        "If the same BVN is submitted with a different providerId, the existing customer is reused and a new account is created on the new provider.",
        "Email sub-addressing (+ aliases) is not allowed.",
      ],
    },

    {
      id: "create-temporary-account",
      name: "Create Temporary Account",
      method: "POST",
      path: "/api/fintech-accounts/temporary",
      description: "Creates a one-time expiring virtual account for collecting a specific payment. Currently only available for companies using the VFD provider.",

      requestBody: {
        amount: { type: "string", required: true, description: "Expected payment amount", example: "5000" },
        merchantName: { type: "string", required: true, description: "Name of the payer or customer", example: "John Doe" },
        merchantId: { type: "string", required: true, description: "Your unique identifier for the merchant", example: "M0123444" },
        reference: { type: "string", required: false, description: "Unique transaction reference. Auto-generated if omitted.", example: "MY-REF-001" },
        validityTime: { type: "integer", required: false, description: "Minutes until expiry. Default 4320 (3 days). Max 4320.", example: 2400 },
        amountValidation: { type: "string", required: false, description: "A3 = any amount accepted. A4 = exact amount only. Default A4.", example: "A3" },
      },

      codeExamples: {
        curl: `curl -X POST "https://api.treegar.com/api/fintech-accounts/temporary" \\
  -H "Authorization: Bearer $TOKEN" \\
  -H "Content-Type: application/json" \\
  -d '{
    "amount": "5000",
    "merchantName": "John Doe",
    "merchantId": "M0123444",
    "validityTime": 2400,
    "amountValidation": "A3"
  }'`,
        javascript: `const response = await fetch("https://api.treegar.com/api/fintech-accounts/temporary", {
  method: "POST",
  headers: {
    Authorization: \`Bearer \${TOKEN}\`,
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    amount: "5000",
    merchantName: "John Doe",
    merchantId: "M0123444",
    validityTime: 2400,
    amountValidation: "A3",
  }),
});
const data = await response.json();`,
      },

      responses: {
        "201": {
          description: "Temporary account created",
          example: `{
  "success": true,
  "message": "Temporary account created",
  "data": {
    "accountNumber": "4600070017",
    "reference": "TREEGAR-20260410160912440"
  },
  "errors": null,
  "timestamp": "2026-04-10T16:09:13Z"
}`,
        },
      },
      notes: ["Currently only available for companies using the VFD provider."],
    },

    {
      id: "list-fintech-accounts",
      name: "List Accounts",
      method: "GET",
      path: "/api/fintech-accounts",
      description: "Returns a paginated list of all virtual accounts under your company.",

      parameters: {
        page: { type: "integer", location: "query", required: false, description: "Page number", example: 1 },
        pageSize: { type: "integer", location: "query", required: false, description: "Results per page. Max 100.", example: 20 },
      },

      codeExamples: {
        curl: `curl -X GET "https://api.treegar.com/api/fintech-accounts?page=1&pageSize=20" \\
  -H "Authorization: Bearer $TOKEN"`,
        javascript: `const response = await fetch("https://api.treegar.com/api/fintech-accounts?page=1&pageSize=20", {
  headers: { Authorization: \`Bearer \${TOKEN}\` },
});
const data = await response.json();`,
      },

      responses: {
        "200": {
          description: "Accounts retrieved",
          example: `{
  "success": true,
  "message": "Accounts retrieved",
  "data": {
    "items": [
      {
        "accountId": 2138,
        "companyId": 14,
        "accountNumber": "1047215416",
        "accountName": "Treegar X Corp - OLUWATOBILOBA FAKOREDE",
        "customerId": 101,
        "customerCode": "CUSTT8KOU42H",
        "customerName": "Oluwatobiloba Fakorede",
        "currentBalance": 5000.00,
        "availableBalance": 5000.00,
        "currencyCode": "NGN",
        "status": "Active",
        "accountType": "virtual",
        "createdAt": "2026-04-13T20:53:29Z",
        "lastTransactionDate": "2026-04-15T09:22:00Z"
      }
    ],
    "pageNumber": 1,
    "pageSize": 20,
    "totalCount": 87
  },
  "errors": null,
  "timestamp": "2026-04-15T10:00:00Z"
}`,
        },
      },
    },

    {
      id: "get-fintech-account",
      name: "Get Account by ID",
      method: "GET",
      path: "/api/fintech-accounts/{id}",
      description: "Retrieves a specific virtual account by its ID.",

      parameters: {
        id: { type: "integer", location: "path", required: true, description: "The account ID", example: 2138 },
      },

      codeExamples: {
        curl: `curl -X GET "https://api.treegar.com/api/fintech-accounts/2138" \\
  -H "Authorization: Bearer $TOKEN"`,
      },

      responses: {
        "200": {
          description: "Account retrieved",
          example: `{
  "success": true,
  "message": "Account retrieved",
  "data": {
    "accountId": 2138,
    "companyId": 14,
    "accountNumber": "1047215416",
    "accountName": "Treegar X Corp - OLUWATOBILOBA FAKOREDE",
    "customerId": 101,
    "customerCode": "CUSTT8KOU42H",
    "customerName": "Oluwatobiloba Fakorede",
    "currentBalance": 5000.00,
    "availableBalance": 5000.00,
    "currencyCode": "NGN",
    "status": "Active",
    "accountType": "virtual",
    "createdAt": "2026-04-13T20:53:29Z",
    "lastTransactionDate": "2026-04-15T09:22:00Z"
  },
  "errors": null,
  "timestamp": "2026-04-15T10:00:00Z"
}`,
        },
        "404": {
          description: "Account not found",
          example: `{
  "success": false,
  "message": "Account not found",
  "data": null,
  "errors": null,
  "timestamp": "2026-04-15T10:00:00Z"
}`,
        },
      },
    },

    {
      id: "get-fintech-account-by-number",
      name: "Get Account by Number",
      method: "GET",
      path: "/api/fintech-accounts/number/{accountNumber}",
      description: "Retrieves a specific virtual account by its account number.",

      parameters: {
        accountNumber: { type: "string", location: "path", required: true, description: "The virtual account number", example: "1047215416" },
      },

      codeExamples: {
        curl: `curl -X GET "https://api.treegar.com/api/fintech-accounts/number/1047215416" \\
  -H "Authorization: Bearer $TOKEN"`,
      },
    },
  ],
};

// ─── Fintech Customers ───────────────────────────────────────────────────────
export const fintechCustomersAPI = {
  title: "Fintech Customers API",
  description: "Customers are created automatically when a virtual account is created. Use these endpoints to query customers and their linked accounts.",
  category: "Fintech APIs",

  authentication: {
    type: "Fintech Access Token",
    header: "Authorization: Bearer <access_token>",
    contentType: "application/json",
  },

  endpoints: [
    {
      id: "list-customers",
      name: "List Customers",
      method: "GET",
      path: "/api/fintech-customers",
      description: "Returns a paginated list of all customers under your company.",

      parameters: {
        page: { type: "integer", location: "query", required: false, description: "Page number", example: 1 },
        pageSize: { type: "integer", location: "query", required: false, description: "Results per page. Max 100.", example: 20 },
      },

      codeExamples: {
        curl: `curl -X GET "https://api.treegar.com/api/fintech-customers?page=1&pageSize=20" \\
  -H "Authorization: Bearer $TOKEN"`,
        javascript: `const response = await fetch("https://api.treegar.com/api/fintech-customers?page=1&pageSize=20", {
  headers: { Authorization: \`Bearer \${TOKEN}\` },
});
const data = await response.json();`,
      },

      responses: {
        "200": {
          description: "Customers retrieved",
          example: `{
  "success": true,
  "message": "Customers retrieved",
  "data": {
    "items": [
      {
        "customerId": 101,
        "customerCode": "CUSTT8KOU42H",
        "firstName": "Oluwatobiloba",
        "lastName": "Fakorede",
        "email": "tobiloba@treegar.com",
        "phoneNumber": "08178455067",
        "status": "Active",
        "kycStatus": "Verified",
        "createdAt": "2026-04-13T20:53:29Z"
      }
    ],
    "pageNumber": 1,
    "pageSize": 20,
    "totalCount": 45
  },
  "errors": null,
  "timestamp": "2026-04-15T10:00:00Z"
}`,
        },
      },
    },

    {
      id: "get-customer",
      name: "Get Customer by ID",
      method: "GET",
      path: "/api/fintech-customers/{id}",
      description: "Returns full customer details including BVN info and all linked virtual accounts.",

      parameters: {
        id: { type: "integer", location: "path", required: true, description: "The customer ID", example: 101 },
      },

      codeExamples: {
        curl: `curl -X GET "https://api.treegar.com/api/fintech-customers/101" \\
  -H "Authorization: Bearer $TOKEN"`,
        javascript: `const response = await fetch("https://api.treegar.com/api/fintech-customers/101", {
  headers: { Authorization: \`Bearer \${TOKEN}\` },
});
const data = await response.json();`,
      },

      responses: {
        "200": {
          description: "Customer retrieved",
          example: `{
  "success": true,
  "message": "Customer retrieved",
  "data": {
    "customerId": 101,
    "customerCode": "CUSTT8KOU42H",
    "firstName": "Oluwatobiloba",
    "lastName": "Fakorede",
    "email": "tobiloba@treegar.com",
    "phoneNumber": "08178455067",
    "status": "Active",
    "kycStatus": "Verified",
    "tag": "OluwatobilobaFakorede",
    "onboardingStatus": "Approved",
    "createdAt": "2026-04-13T20:53:29Z",
    "updatedAt": "2026-04-13T20:53:29Z",
    "bvn": "22442343954",
    "dob": "11-06-1999",
    "gender": "Male",
    "verificationReference": "qoreid-ref-xxxxxxxx",
    "accounts": [
      {
        "accountId": 2138,
        "accountNumber": "1047215416",
        "accountName": "Treegar X Corp - OLUWATOBILOBA FAKOREDE",
        "accountType": "virtual",
        "currencyCode": "NGN",
        "status": "Active",
        "createdAt": "2026-04-13T20:53:29Z"
      }
    ]
  },
  "errors": null,
  "timestamp": "2026-04-15T10:00:00Z"
}`,
        },
        "404": {
          description: "Customer not found",
          example: `{
  "success": false,
  "message": "Customer not found",
  "data": null,
  "errors": null,
  "timestamp": "2026-04-15T10:00:00Z"
}`,
        },
      },
    },
  ],
};

// ─── Fintech Payouts ─────────────────────────────────────────────────────────
export const fintechPayoutsAPI = {
  title: "Fintech Payouts API",
  description: "Send funds from your company wallet to any Nigerian bank account.",
  category: "Fintech APIs",

  authentication: {
    type: "Fintech Access Token",
    header: "Authorization: Bearer <access_token>",
    contentType: "application/json",
  },

  endpoints: [
    {
      id: "list-banks-fintech",
      name: "List Banks",
      method: "GET",
      path: "/api/fintech-payouts/banks",
      description: "Returns all banks supported by your company's active payout provider.",

      codeExamples: {
        curl: `curl -X GET "https://api.treegar.com/api/fintech-payouts/banks" \\
  -H "Authorization: Bearer $TOKEN"`,
        javascript: `const response = await fetch("https://api.treegar.com/api/fintech-payouts/banks", {
  headers: { Authorization: \`Bearer \${TOKEN}\` },
});
const data = await response.json();`,
        php: `$ch = curl_init("https://api.treegar.com/api/fintech-payouts/banks");
curl_setopt_array($ch, [
  CURLOPT_RETURNTRANSFER => true,
  CURLOPT_HTTPHEADER => ["Authorization: Bearer $TOKEN"],
]);
$response = curl_exec($ch);`,
        go: `req, _ := http.NewRequest("GET", "https://api.treegar.com/api/fintech-payouts/banks", nil)
req.Header.Set("Authorization", "Bearer "+token)
resp, _ := http.DefaultClient.Do(req)`,
      },

      responses: {
        "200": {
          description: "Banks retrieved",
          example: `{
  "success": true,
  "message": "Banks retrieved",
  "data": [
    { "bankCode": "058", "bankName": "Guaranty Trust Bank" },
    { "bankCode": "011", "bankName": "First Bank of Nigeria" },
    { "bankCode": "033", "bankName": "United Bank for Africa" }
  ],
  "errors": null,
  "timestamp": "2026-04-15T10:00:00Z"
}`,
        },
      },
    },

    {
      id: "resolve-account-fintech",
      name: "Resolve Account",
      method: "POST",
      path: "/api/fintech-payouts/resolve-account",
      description: "Verifies a beneficiary account number and returns the account holder name. Always call this before initiating a payout.",

      requestBody: {
        accountNumber: { type: "string", required: true, description: "Beneficiary's bank account number", example: "0123456789" },
        bankCode: { type: "string", required: true, description: "Beneficiary's bank code", example: "058" },
      },

      codeExamples: {
        curl: `curl -X POST "https://api.treegar.com/api/fintech-payouts/resolve-account" \\
  -H "Authorization: Bearer $TOKEN" \\
  -H "Content-Type: application/json" \\
  -d '{ "accountNumber": "0123456789", "bankCode": "058" }'`,
        javascript: `const response = await fetch("https://api.treegar.com/api/fintech-payouts/resolve-account", {
  method: "POST",
  headers: {
    Authorization: \`Bearer \${TOKEN}\`,
    "Content-Type": "application/json",
  },
  body: JSON.stringify({ accountNumber: "0123456789", bankCode: "058" }),
});
const data = await response.json();`,
      },

      responses: {
        "200": {
          description: "Account resolved",
          example: `{
  "success": true,
  "message": "Account resolved",
  "data": {
    "accountNumber": "0123456789",
    "accountName": "John Doe",
    "bankCode": "058",
    "bankName": "Guaranty Trust Bank"
  },
  "errors": null,
  "timestamp": "2026-04-15T10:00:00Z"
}`,
        },
      },
    },

    {
      id: "create-payout-fintech",
      name: "Create Payout",
      method: "POST",
      path: "/api/fintech-payouts/payouts",
      description: "Initiates a transfer from your company wallet to a bank account. Each payout requires a unique clientReference.",

      requestBody: {
        amount: { type: "number", required: true, description: "Amount in NGN", example: 5000.00 },
        currency: { type: "string", required: true, description: "Currency code", example: "NGN" },
        beneficiaryAccountNumber: { type: "string", required: true, description: "Recipient's bank account number", example: "0123456789" },
        beneficiaryBankCode: { type: "string", required: true, description: "Recipient's bank code", example: "058" },
        beneficiaryName: { type: "string", required: true, description: "Recipient's account name", example: "John Doe" },
        narration: { type: "string", required: true, description: "Transfer description", example: "Payment for services" },
        clientReference: { type: "string", required: true, description: "Your unique reference. Duplicate returns 409.", example: "MY-REF-001" },
      },

      codeExamples: {
        curl: `curl -X POST "https://api.treegar.com/api/fintech-payouts/payouts" \\
  -H "Authorization: Bearer $TOKEN" \\
  -H "Content-Type: application/json" \\
  -d '{
    "amount": 5000.00,
    "currency": "NGN",
    "beneficiaryAccountNumber": "0123456789",
    "beneficiaryBankCode": "058",
    "beneficiaryName": "John Doe",
    "narration": "Payment for services",
    "clientReference": "MY-REF-001"
  }'`,
        javascript: `const response = await fetch("https://api.treegar.com/api/fintech-payouts/payouts", {
  method: "POST",
  headers: {
    Authorization: \`Bearer \${TOKEN}\`,
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    amount: 5000.00,
    currency: "NGN",
    beneficiaryAccountNumber: "0123456789",
    beneficiaryBankCode: "058",
    beneficiaryName: "John Doe",
    narration: "Payment for services",
    clientReference: "MY-REF-001",
  }),
});
const data = await response.json();`,
        php: `$payload = json_encode([
  "amount" => 5000.00,
  "currency" => "NGN",
  "beneficiaryAccountNumber" => "0123456789",
  "beneficiaryBankCode" => "058",
  "beneficiaryName" => "John Doe",
  "narration" => "Payment for services",
  "clientReference" => "MY-REF-001",
]);
$ch = curl_init("https://api.treegar.com/api/fintech-payouts/payouts");
curl_setopt_array($ch, [
  CURLOPT_RETURNTRANSFER => true,
  CURLOPT_POST => true,
  CURLOPT_HTTPHEADER => [
    "Authorization: Bearer $TOKEN",
    "Content-Type: application/json",
  ],
  CURLOPT_POSTFIELDS => $payload,
]);
$response = curl_exec($ch);`,
      },

      responses: {
        "201": {
          description: "Payout created",
          example: `{
  "success": true,
  "message": "Payout created",
  "data": {
    "id": 881,
    "clientReference": "MY-REF-001",
    "amount": 5000.00,
    "currency": "NGN",
    "status": "Pending",
    "beneficiaryAccountNumber": "0123456789",
    "beneficiaryBankCode": "058",
    "beneficiaryName": "John Doe",
    "narration": "Payment for services",
    "createdAt": "2026-04-15T10:00:00Z"
  },
  "errors": null,
  "timestamp": "2026-04-15T10:00:00Z"
}`,
        },
        "409": {
          description: "Duplicate clientReference",
          example: `{
  "success": false,
  "message": "A payout with reference MY-REF-001 already exists.",
  "data": null,
  "errors": null,
  "timestamp": "2026-04-15T10:00:00Z"
}`,
        },
      },
      notes: [
        "clientReference must be unique per company. Duplicate values return 409.",
        "Payouts start in Pending state and transition to Completed or Failed.",
        "Insufficient balance returns a 400 error.",
      ],
    },

    {
      id: "list-payouts-fintech",
      name: "List Payouts",
      method: "GET",
      path: "/api/fintech-payouts/payouts",
      description: "Returns a paginated list of all payouts with optional filters.",

      parameters: {
        status: { type: "string", location: "query", required: false, description: "Filter by status: Pending, Completed, Failed", example: "Completed" },
        walletType: { type: "string", location: "query", required: false, description: "Filter by wallet type", example: "Disbursement" },
        page: { type: "integer", location: "query", required: false, description: "Page number", example: 1 },
        pageSize: { type: "integer", location: "query", required: false, description: "Results per page. Max 100.", example: 20 },
      },

      codeExamples: {
        curl: `curl -X GET "https://api.treegar.com/api/fintech-payouts/payouts?status=Completed&page=1&pageSize=20" \\
  -H "Authorization: Bearer $TOKEN"`,
      },

      responses: {
        "200": {
          description: "Payouts retrieved",
          example: `{
  "success": true,
  "message": "Payouts retrieved",
  "data": {
    "items": [
      {
        "id": 881,
        "clientReference": "MY-REF-001",
        "amount": 5000.00,
        "currency": "NGN",
        "status": "Completed",
        "beneficiaryAccountNumber": "0123456789",
        "beneficiaryBankCode": "058",
        "beneficiaryName": "John Doe",
        "narration": "Payment for services",
        "createdAt": "2026-04-15T10:00:00Z"
      }
    ],
    "pageNumber": 1,
    "pageSize": 20,
    "totalCount": 132
  },
  "errors": null,
  "timestamp": "2026-04-15T10:00:00Z"
}`,
        },
      },
    },

    {
      id: "get-payout-by-id",
      name: "Get Payout by ID",
      method: "GET",
      path: "/api/fintech-payouts/payouts/{payoutId}",
      description: "Retrieves a specific payout by its ID.",

      parameters: {
        payoutId: { type: "integer", location: "path", required: true, description: "The payout ID", example: 881 },
      },

      codeExamples: {
        curl: `curl -X GET "https://api.treegar.com/api/fintech-payouts/payouts/881" \\
  -H "Authorization: Bearer $TOKEN"`,
      },

      responses: {
        "404": {
          description: "Payout not found",
          example: `{
  "success": false,
  "message": "Payout not found",
  "data": null,
  "errors": null,
  "timestamp": "2026-04-15T10:00:00Z"
}`,
        },
      },
    },

    {
      id: "get-payout-by-reference",
      name: "Get Payout by Client Reference",
      method: "GET",
      path: "/api/fintech-payouts/payouts/reference/{clientReference}",
      description: "Retrieves a payout using your unique client reference.",

      parameters: {
        clientReference: { type: "string", location: "path", required: true, description: "Your unique client reference", example: "MY-REF-001" },
      },

      codeExamples: {
        curl: `curl -X GET "https://api.treegar.com/api/fintech-payouts/payouts/reference/MY-REF-001" \\
  -H "Authorization: Bearer $TOKEN"`,
      },
    },

    {
      id: "list-wallets",
      name: "Get Wallet Balances",
      method: "GET",
      path: "/api/fintech-payouts/wallets",
      description: "Returns all wallets for the company with current and ledger balances.",

      parameters: {
        currencyCode: { type: "string", location: "query", required: false, description: "Filter by currency. Returns all if omitted.", example: "NGN" },
      },

      codeExamples: {
        curl: `curl -X GET "https://api.treegar.com/api/fintech-payouts/wallets?currencyCode=NGN" \\
  -H "Authorization: Bearer $TOKEN"`,
      },

      responses: {
        "200": {
          description: "Wallets retrieved",
          example: `{
  "success": true,
  "message": "Wallets retrieved",
  "data": [
    {
      "walletId": 8,
      "currencyCode": "NGN",
      "walletType": "Collection",
      "currentBalance": 99.60,
      "ledgerBalance": 99.60,
      "status": "Active"
    },
    {
      "walletId": 9,
      "currencyCode": "NGN",
      "walletType": "Disbursement",
      "currentBalance": 250000.00,
      "ledgerBalance": 250000.00,
      "status": "Active"
    }
  ],
  "errors": null,
  "timestamp": "2026-04-15T10:00:00Z"
}`,
        },
      },
    },

    {
      id: "create-or-get-wallet",
      name: "Create or Get Wallet",
      method: "POST",
      path: "/api/fintech-payouts/wallets",
      description: "Idempotent — returns the existing wallet if one already exists for the given currency and type.",

      requestBody: {
        currencyCode: { type: "string", required: true, description: "Currency code", example: "NGN" },
        walletType: { type: "string", required: true, description: "Collection or Disbursement", example: "Collection" },
      },

      codeExamples: {
        curl: `curl -X POST "https://api.treegar.com/api/fintech-payouts/wallets" \\
  -H "Authorization: Bearer $TOKEN" \\
  -H "Content-Type: application/json" \\
  -d '{ "currencyCode": "NGN", "walletType": "Collection" }'`,
      },
    },

    {
      id: "list-webhook-deliveries-fintech",
      name: "List Webhook Deliveries",
      method: "GET",
      path: "/api/fintech-payouts/webhooks/deliveries",
      description: "View the history of outbound webhook notifications for payout events.",

      parameters: {
        eventType: { type: "string", location: "query", required: false, description: "Filter by event type: payout.created, payout.completed, payout.failed", example: "payout.completed" },
        status: { type: "string", location: "query", required: false, description: "Filter by delivery status: Pending, Delivered, Failed", example: "Failed" },
        pageNumber: { type: "integer", location: "query", required: false, description: "Page number", example: 1 },
        pageSize: { type: "integer", location: "query", required: false, description: "Results per page. Max 200.", example: 50 },
      },

      codeExamples: {
        curl: `curl -X GET "https://api.treegar.com/api/fintech-payouts/webhooks/deliveries?status=Failed&eventType=payout.failed&pageNumber=1&pageSize=50" \\
  -H "Authorization: Bearer $TOKEN"`,
      },

      responses: {
        "200": {
          description: "Webhook deliveries retrieved",
          example: `{
  "success": true,
  "message": "Webhook deliveries retrieved",
  "data": [
    {
      "id": 44,
      "eventType": "payout.completed",
      "status": "Delivered",
      "endpointUrl": "https://your-server.com/webhook",
      "httpStatusCode": 200,
      "attemptCount": 1,
      "createdAt": "2026-04-15T10:00:00Z",
      "deliveredAt": "2026-04-15T10:00:01Z"
    }
  ],
  "errors": null,
  "timestamp": "2026-04-15T10:00:00Z"
}`,
        },
      },
    },

    {
      id: "resend-webhook-delivery-fintech",
      name: "Resend Webhook Delivery",
      method: "POST",
      path: "/api/fintech-payouts/webhooks/deliveries/{id}/resend",
      description: "Re-triggers a single webhook delivery. Useful when your server was down or returned a non-2xx response.",

      parameters: {
        id: { type: "integer", location: "path", required: true, description: "The webhook delivery ID to resend", example: 44 },
      },

      codeExamples: {
        curl: `curl -X POST "https://api.treegar.com/api/fintech-payouts/webhooks/deliveries/44/resend" \\
  -H "Authorization: Bearer $TOKEN"`,
      },

      responses: {
        "200": {
          description: "Webhook delivery re-triggered",
          example: `{
  "success": true,
  "message": "Webhook delivery re-triggered",
  "data": {
    "id": 44,
    "eventType": "payout.completed",
    "status": "Delivered",
    "httpStatusCode": 200,
    "attemptCount": 2,
    "deliveredAt": "2026-04-15T10:05:30Z"
  },
  "errors": null,
  "timestamp": "2026-04-15T10:05:30Z"
}`,
        },
        "404": {
          description: "Webhook delivery not found",
          example: `{
  "success": false,
  "message": "Webhook delivery not found",
  "data": null,
  "errors": null,
  "timestamp": "2026-04-15T10:00:00Z"
}`,
        },
      },
    },
  ],
};

// ─── Outbound Webhooks (kept from original) ──────────────────────────────────
export const outboundWebhooksAPI = {
  title: "Outbound Webhooks API",
  description: "Configure and manage outbound webhook deliveries for event notifications",
  category: "Integration APIs",

  authentication: {
    type: "Bearer Token + API Key",
    header: "Authorization: Bearer <admin_or_company_token>",
    apiKey: "X-API-Key: <api_key>",
    contentType: "application/json",
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
        eventType: { type: "string", required: true, description: "Event type to listen for", example: "payout.completed" },
      },

      codeExamples: {
        curl: `curl -X POST "https://api.treegar.com/api/outboundwebhook" \\
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
        javascript: `const response = await fetch("https://api.treegar.com/api/outboundwebhook", {
  method: "POST",
  headers: {
    Authorization: \`Bearer \${TOKEN}\`,
    "X-API-Key": API_KEY,
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    name: "Fintech Payouts",
    endpointUrl: "https://client.example.com/webhooks/payouts",
    httpMethod: "POST",
    authType: "hmac-sha256",
    authValue: "your-signing-secret",
    isActive: true,
    eventType: "payout.completed",
  }),
});`,
      },

      responses: {
        "200": {
          description: "Webhook created",
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
}`,
        },
      },
    },

    {
      id: "list-webhooks",
      name: "List Webhook Configurations",
      method: "GET",
      path: "/api/outboundwebhook",
      description: "Retrieves all webhook configurations",
      codeExamples: {
        curl: `curl -X GET "https://api.treegar.com/api/outboundwebhook" \\
  -H "Authorization: Bearer $TOKEN" \\
  -H "X-API-Key: $API_KEY"`,
      },
    },

    {
      id: "update-webhook",
      name: "Update Webhook Configuration",
      method: "PUT",
      path: "/api/outboundwebhook/{id}",
      description: "Updates an existing webhook configuration",

      parameters: {
        id: { type: "number", location: "path", required: true, description: "Webhook configuration ID", example: 77 },
      },

      requestBody: {
        isActive: { type: "boolean", required: false, description: "Enable/disable webhook", example: false },
        timeoutSeconds: { type: "number", required: false, description: "Request timeout", example: 60 },
      },

      codeExamples: {
        curl: `curl -X PUT "https://api.treegar.com/api/outboundwebhook/77" \\
  -H "Authorization: Bearer $TOKEN" \\
  -H "X-API-Key: $API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{ "isActive": false, "timeoutSeconds": 60 }'`,
      },
    },

    {
      id: "delete-webhook",
      name: "Delete Webhook Configuration",
      method: "DELETE",
      path: "/api/outboundwebhook/{id}",
      description: "Deletes a webhook configuration",

      parameters: {
        id: { type: "number", location: "path", required: true, description: "Webhook configuration ID", example: 77 },
      },

      codeExamples: {
        curl: `curl -X DELETE "https://api.treegar.com/api/outboundwebhook/77" \\
  -H "Authorization: Bearer $TOKEN" \\
  -H "X-API-Key: $API_KEY"`,
      },
    },

    {
      id: "webhook-stats",
      name: "Webhook Delivery Stats",
      method: "GET",
      path: "/api/outboundwebhook/stats",
      description: "Get delivery statistics for webhooks",

      parameters: {
        eventType: { type: "string", location: "query", required: false, description: "Filter by event type", example: "payout.completed" },
      },

      codeExamples: {
        curl: `curl -X GET "https://api.treegar.com/api/outboundwebhook/stats?eventType=payout.completed" \\
  -H "Authorization: Bearer $TOKEN" \\
  -H "X-API-Key: $API_KEY"`,
      },

      responses: {
        "200": {
          description: "Stats retrieved",
          example: `{
  "success": true,
  "data": {
    "totalDeliveries": 12,
    "successfulDeliveries": 10,
    "failedDeliveries": 2,
    "pendingDeliveries": 0
  }
}`,
        },
      },
    },

    {
      id: "list-webhook-deliveries",
      name: "List Webhook Deliveries",
      method: "GET",
      path: "/api/outboundwebhook/deliveries",
      description: "Retrieves webhook delivery history",

      parameters: {
        status: { type: "string", location: "query", required: false, description: "Filter by status", example: "FAILED" },
        configurationId: { type: "number", location: "query", required: false, description: "Filter by webhook config ID", example: 77 },
        pageNumber: { type: "number", location: "query", required: false, description: "Page number", example: 1 },
        pageSize: { type: "number", location: "query", required: false, description: "Items per page", example: 50 },
      },

      codeExamples: {
        curl: `curl -X GET "https://api.treegar.com/api/outboundwebhook/deliveries?status=FAILED&configurationId=77&pageNumber=1&pageSize=50" \\
  -H "Authorization: Bearer $TOKEN" \\
  -H "X-API-Key: $API_KEY"`,
      },
    },

    {
      id: "retry-webhook-delivery",
      name: "Retry Webhook Delivery",
      method: "POST",
      path: "/api/outboundwebhook/deliveries/{id}/retry",
      description: "Retries a failed webhook delivery",

      parameters: {
        id: { type: "number", location: "path", required: true, description: "Delivery ID", example: 9001 },
      },

      codeExamples: {
        curl: `curl -X POST "https://api.treegar.com/api/outboundwebhook/deliveries/9001/retry" \\
  -H "Authorization: Bearer $TOKEN" \\
  -H "X-API-Key: $API_KEY"`,
      },
    },
  ],
};

// ─── Company Business Payouts (kept from original) ───────────────────────────
export const companyBusinessPayoutsAPI = {
  title: "Company Business Payouts API",
  description: "Create and manage business payouts using company accounts",
  category: "Company APIs",

  authentication: {
    type: "Company Bearer Token",
    header: "Authorization: Bearer <company_token>",
    contentType: "application/json",
  },

  endpoints: [
    {
      id: "list-banks-company",
      name: "List Banks",
      method: "GET",
      path: "/api/company/business-payouts/banks",
      description: "Retrieves available banks for payouts",
      codeExamples: {
        curl: `curl -X GET "https://api.treegar.com/api/company/business-payouts/banks" \\
  -H "Authorization: Bearer $TOKEN"`,
      },
      responses: {
        "200": {
          description: "Banks retrieved",
          example: `{
  "success": true,
  "data": [
    { "bankId": 12, "bankName": "Example Bank", "country": "NG" }
  ]
}`,
        },
      },
    },
    {
      id: "resolve-account-company",
      name: "Resolve Account",
      method: "POST",
      path: "/api/company/business-payouts/resolve-account",
      description: "Validates and resolves a bank account",
      requestBody: {
        bankId: { type: "number", required: true, description: "Bank ID", example: 12 },
        accountNumber: { type: "string", required: true, description: "Account number", example: "0123456789" },
      },
      codeExamples: {
        curl: `curl -X POST "https://api.treegar.com/api/company/business-payouts/resolve-account" \\
  -H "Authorization: Bearer $TOKEN" \\
  -H "Content-Type: application/json" \\
  -d '{ "bankId": 12, "accountNumber": "0123456789" }'`,
      },
      responses: {
        "200": {
          description: "Account resolved",
          example: `{
  "success": true,
  "data": {
    "accountNumber": "0123456789",
    "accountName": "John Doe",
    "isSuccessful": true
  }
}`,
        },
      },
    },
    {
      id: "create-business-payout",
      name: "Create Payout",
      method: "POST",
      path: "/api/company/business-payouts",
      description: "Creates a new business payout",
      requestBody: {
        amount: { type: "number", required: true, description: "Payout amount in kobo/cents", example: 150000 },
        bankId: { type: "number", required: true, description: "Bank ID", example: 12 },
        beneficiaryAccountNumber: { type: "string", required: true, description: "Recipient account number", example: "0123456789" },
        beneficiaryAccountName: { type: "string", required: true, description: "Recipient account name", example: "John Doe" },
        clientReference: { type: "string", required: true, description: "Your unique reference", example: "PAYOUT-2026-0001" },
        narration: { type: "string", required: false, description: "Transaction description", example: "Vendor settlement" },
      },
      codeExamples: {
        curl: `curl -X POST "https://api.treegar.com/api/company/business-payouts" \\
  -H "Authorization: Bearer $TOKEN" \\
  -H "Content-Type: application/json" \\
  -d '{
    "amount": 150000,
    "bankId": 12,
    "beneficiaryAccountNumber": "0123456789",
    "beneficiaryAccountName": "John Doe",
    "clientReference": "PAYOUT-2026-0001",
    "narration": "Vendor settlement"
  }'`,
      },
      responses: {
        "200": {
          description: "Payout created",
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
}`,
        },
      },
    },
    {
      id: "list-business-payouts",
      name: "List Payouts",
      method: "GET",
      path: "/api/company/business-payouts",
      description: "Retrieves paginated list of business payouts",
      parameters: {
        status: { type: "string", location: "query", required: false, description: "Filter by status", example: "Completed" },
        page: { type: "number", location: "query", required: false, description: "Page number", example: 1 },
        pageSize: { type: "number", location: "query", required: false, description: "Items per page", example: 20 },
      },
      codeExamples: {
        curl: `curl -X GET "https://api.treegar.com/api/company/business-payouts?status=Completed&page=1&pageSize=20" \\
  -H "Authorization: Bearer $TOKEN"`,
      },
    },
    {
      id: "get-business-payout",
      name: "Get Payout by ID",
      method: "GET",
      path: "/api/company/business-payouts/{payoutId}",
      description: "Retrieves a specific business payout",
      parameters: {
        payoutId: { type: "number", location: "path", required: true, description: "Payout ID", example: 98765 },
      },
      codeExamples: {
        curl: `curl -X GET "https://api.treegar.com/api/company/business-payouts/98765" \\
  -H "Authorization: Bearer $TOKEN"`,
      },
    },
    {
      id: "get-business-payout-by-ref",
      name: "Get Payout by Client Reference",
      method: "GET",
      path: "/api/company/business-payouts/reference/{clientReference}",
      description: "Retrieves a payout by client reference",
      parameters: {
        clientReference: { type: "string", location: "path", required: true, description: "Client reference", example: "PAYOUT-2026-0001" },
      },
      codeExamples: {
        curl: `curl -X GET "https://api.treegar.com/api/company/business-payouts/reference/PAYOUT-2026-0001" \\
  -H "Authorization: Bearer $TOKEN"`,
      },
    },
    {
      id: "get-wallet-balance",
      name: "Get Wallet Balance",
      method: "GET",
      path: "/api/company/business-payouts/balance",
      description: "Retrieves current wallet balance",
      parameters: {
        currencyCode: { type: "string", location: "query", required: false, description: "Currency code", example: "NGN" },
      },
      codeExamples: {
        curl: `curl -X GET "https://api.treegar.com/api/company/business-payouts/balance?currencyCode=NGN" \\
  -H "Authorization: Bearer $TOKEN"`,
      },
      responses: {
        "200": {
          description: "Balance retrieved",
          example: `{
  "success": true,
  "data": {
    "walletId": 101,
    "currencyCode": "NGN",
    "currentBalance": 1250000,
    "status": "Active"
  }
}`,
        },
      },
    },
  ],
};

// ─── Company Accounts (kept from original) ───────────────────────────────────
export const companyAccountsAPI = {
  title: "Company Accounts API",
  description: "Manage company virtual accounts and view balances and statements",
  category: "Company APIs",

  authentication: {
    type: "Company Bearer Token",
    header: "Authorization: Bearer <company_token>",
    contentType: "application/json",
  },

  permissions: [
    { action: "accounts.create", description: "Create accounts" },
    { action: "accounts.view", description: "View accounts and balances" },
    { action: "transactions.view", description: "View statements" },
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
        phoneNumber: { type: "string", required: true, description: "Customer phone number", example: "+2348012345678" },
      },
      codeExamples: {
        curl: `curl -X POST "https://api.treegar.com/api/company/accounts" \\
  -H "Authorization: Bearer $TOKEN" \\
  -H "Content-Type: application/json" \\
  -d '{
    "firstName": "Ada",
    "lastName": "Lovelace",
    "email": "ada@example.com",
    "phoneNumber": "+2348012345678"
  }'`,
      },
      responses: {
        "200": {
          description: "Account created",
          example: `{
  "success": true,
  "message": "Account created",
  "data": {
    "accountId": 123,
    "accountNumber": "1020304050",
    "accountName": "Ada Lovelace",
    "status": "Active"
  }
}`,
        },
      },
    },
    {
      id: "list-company-accounts",
      name: "List Accounts",
      method: "GET",
      path: "/api/company/accounts",
      description: "Retrieves all company accounts",
      parameters: {
        page: { type: "number", location: "query", required: false, description: "Page number", example: 1 },
        pageSize: { type: "number", location: "query", required: false, description: "Items per page", example: 20 },
      },
      codeExamples: {
        curl: `curl -X GET "https://api.treegar.com/api/company/accounts?page=1&pageSize=20" \\
  -H "Authorization: Bearer $TOKEN"`,
      },
    },
    {
      id: "get-company-account",
      name: "Get Account by ID",
      method: "GET",
      path: "/api/company/accounts/{id}",
      description: "Retrieves a specific company account",
      parameters: {
        id: { type: "number", location: "path", required: true, description: "Account ID", example: 123 },
      },
      codeExamples: {
        curl: `curl -X GET "https://api.treegar.com/api/company/accounts/123" \\
  -H "Authorization: Bearer $TOKEN"`,
      },
    },
    {
      id: "get-account-balance",
      name: "Get Account Balance",
      method: "GET",
      path: "/api/company/accounts/{accountNumber}/balance",
      description: "Retrieves current account balance",
      parameters: {
        accountNumber: { type: "string", location: "path", required: true, description: "Account number", example: "1020304050" },
      },
      codeExamples: {
        curl: `curl -X GET "https://api.treegar.com/api/company/accounts/1020304050/balance" \\
  -H "Authorization: Bearer $TOKEN"`,
      },
      responses: {
        "200": {
          description: "Balance retrieved",
          example: `{
  "success": true,
  "data": {
    "accountNumber": "1020304050",
    "availableBalance": 5000,
    "currency": "NGN",
    "accountStatus": "ACTIVE"
  }
}`,
        },
      },
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
        endDate: { type: "string", location: "query", required: false, description: "End date (YYYY-MM-DD)", example: "2026-01-31" },
      },
      codeExamples: {
        curl: `curl -X GET "https://api.treegar.com/api/company/accounts/1020304050/statement?startDate=2026-01-01&endDate=2026-01-31" \\
  -H "Authorization: Bearer $TOKEN"`,
      },
      responses: {
        "200": {
          description: "Statement retrieved",
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
}`,
        },
      },
    },
  ],
};

// ─── Registry ────────────────────────────────────────────────────────────────
export const allAPIs = {
  "company-access-tokens": companyAccessTokensAPI,
  "fintech-accounts": fintechAccountsAPI,
  "fintech-customers": fintechCustomersAPI,
  "fintech-payouts": fintechPayoutsAPI,
  "outbound-webhooks": outboundWebhooksAPI,
  "company-business-payouts": companyBusinessPayoutsAPI,
  "company-accounts": companyAccountsAPI,
};

export const getAPICategories = () => {
  const categories = {};
  Object.values(allAPIs).forEach(api => {
    const cat = api.category || "Other";
    if (!categories[cat]) categories[cat] = [];
    categories[cat].push(api);
  });
  return categories;
};