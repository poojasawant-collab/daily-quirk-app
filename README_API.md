# Daily Quirks API Documentation

A RESTful API backend for the Daily Quirks application, serving daily doses of wisdom, humor, and motivation.

## 🚀 Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- npm (Node Package Manager)

### Installation

1. **Navigate to the project directory:**
   ```bash
   cd daily-quirk-app
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the server:**
   ```bash
   # Production mode
   npm start

   # Development mode (with auto-reload)
   npm run dev
   ```

4. **Server will be running at:**
   ```
   http://localhost:3000
   ```

---

## 📚 API Endpoints

### Base URL
```
http://localhost:3000/api
```

---

### 1. Get All Quirks
Retrieve all quirks, optionally filtered by category.

**Endpoint:** `GET /api/quirks`

**Query Parameters:**
| Parameter | Type   | Required | Description                              |
|-----------|--------|----------|------------------------------------------|
| category  | string | No       | Filter by category (wisdom, humor, motivation) |

**Example Request:**
```bash
curl http://localhost:3000/api/quirks
```

**Example Request with Filter:**
```bash
curl http://localhost:3000/api/quirks?category=humor
```

**Example Response:**
```json
{
  "success": true,
  "count": 15,
  "data": [
    {
      "id": 1,
      "text": "Today's vibe: Pretending to understand cryptocurrency while nodding confidently.",
      "category": "humor",
      "createdAt": "2024-01-01T00:00:00.000Z"
    }
  ]
}
```

---

### 2. Get Today's Quirk
Get the quirk of the day (rotates based on the current date).

**Endpoint:** `GET /api/quirks/today`

**Example Request:**
```bash
curl http://localhost:3000/api/quirks/today
```

**Example Response:**
```json
{
  "success": true,
  "data": {
    "id": 5,
    "text": "Your comfort zone is a beautiful place, but nothing ever grows there.",
    "category": "motivation",
    "createdAt": "2024-01-05T00:00:00.000Z"
  },
  "date": "2024-01-15"
}
```

---

### 3. Get Random Quirk
Get a randomly selected quirk.

**Endpoint:** `GET /api/quirks/random`

**Example Request:**
```bash
curl http://localhost:3000/api/quirks/random
```

**Example Response:**
```json
{
  "success": true,
  "data": {
    "id": 9,
    "text": "I'm not lazy, I'm on energy-saving mode.",
    "category": "humor",
    "createdAt": "2024-01-09T00:00:00.000Z"
  }
}
```

---

### 4. Get Quirk by ID
Retrieve a specific quirk by its ID.

**Endpoint:** `GET /api/quirks/:id`

**Path Parameters:**
| Parameter | Type   | Required | Description        |
|-----------|--------|----------|--------------------|
| id        | number | Yes      | The quirk's unique ID |

**Example Request:**
```bash
curl http://localhost:3000/api/quirks/1
```

**Example Response (Success):**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "text": "Today's vibe: Pretending to understand cryptocurrency while nodding confidently.",
    "category": "humor",
    "createdAt": "2024-01-01T00:00:00.000Z"
  }
}
```

**Example Response (Not Found):**
```json
{
  "success": false,
  "error": "Quirk not found"
}
```

---

### 5. Create a New Quirk
Add a new quirk to the collection.

**Endpoint:** `POST /api/quirks`

**Request Body:**
| Field    | Type   | Required | Description                                    |
|----------|--------|----------|------------------------------------------------|
| text     | string | Yes      | The quirk message                              |
| category | string | Yes      | Category: "wisdom", "humor", or "motivation"   |

**Example Request:**
```bash
curl -X POST http://localhost:3000/api/quirks \
  -H "Content-Type: application/json" \
  -d '{"text": "Life is like WiFi - the best connections are invisible.", "category": "wisdom"}'
```

**Example Response:**
```json
{
  "success": true,
  "data": {
    "id": 16,
    "text": "Life is like WiFi - the best connections are invisible.",
    "category": "wisdom",
    "createdAt": "2024-01-15T10:30:00.000Z"
  }
}
```

**Example Error Response:**
```json
{
  "success": false,
  "error": "Please provide both text and category"
}
```

---

### 6. Update a Quirk
Update an existing quirk's text or category.

**Endpoint:** `PUT /api/quirks/:id`

**Path Parameters:**
| Parameter | Type   | Required | Description        |
|-----------|--------|----------|--------------------|
| id        | number | Yes      | The quirk's unique ID |

**Request Body:**
| Field    | Type   | Required | Description                                    |
|----------|--------|----------|------------------------------------------------|
| text     | string | No       | Updated quirk message                          |
| category | string | No       | Updated category                               |

**Example Request:**
```bash
curl -X PUT http://localhost:3000/api/quirks/1 \
  -H "Content-Type: application/json" \
  -d '{"text": "Updated quirk text here", "category": "motivation"}'
```

**Example Response:**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "text": "Updated quirk text here",
    "category": "motivation",
    "createdAt": "2024-01-01T00:00:00.000Z"
  }
}
```

---

### 7. Delete a Quirk
Remove a quirk from the collection.

**Endpoint:** `DELETE /api/quirks/:id`

**Path Parameters:**
| Parameter | Type   | Required | Description        |
|-----------|--------|----------|--------------------|
| id        | number | Yes      | The quirk's unique ID |

**Example Request:**
```bash
curl -X DELETE http://localhost:3000/api/quirks/1
```

**Example Response:**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "text": "Today's vibe: Pretending to understand cryptocurrency while nodding confidently.",
    "category": "humor",
    "createdAt": "2024-01-01T00:00:00.000Z"
  },
  "message": "Quirk deleted successfully"
}
```

---

## 🔗 Frontend Integration

### Updating the Frontend to Use the API

Modify your `app.js` to fetch quirks from the API instead of using hardcoded data:

```javascript
// Configuration
const API_BASE_URL = 'http://localhost:3000/api';

// Fetch today's quirk
async function fetchTodaysQuirk() {
  try {
    const response = await fetch(`${API_BASE_URL}/quirks/today`);
    const result = await response.json();
    
    if (result.success) {
      displayQuirk(result.data);
    }
  } catch (error) {
    console.error('Error fetching quirk:', error);
    // Fallback to local data if API is unavailable
  }
}

// Fetch a random quirk
async function fetchRandomQuirk() {
  try {
    const response = await fetch(`${API_BASE_URL}/quirks/random`);
    const result = await response.json();
    
    if (result.success) {
      displayQuirk(result.data);
    }
  } catch (error) {
    console.error('Error fetching random quirk:', error);
  }
}

// Fetch all quirks
async function fetchAllQuirks() {
  try {
    const response = await fetch(`${API_BASE_URL}/quirks`);
    const result = await response.json();
    
    if (result.success) {
      return result.data;
    }
  } catch (error) {
    console.error('Error fetching quirks:', error);
    return [];
  }
}

// Fetch quirks by category
async function fetchQuirksByCategory(category) {
  try {
    const response = await fetch(`${API_BASE_URL}/quirks?category=${category}`);
    const result = await response.json();
    
    if (result.success) {
      return result.data;
    }
  } catch (error) {
    console.error('Error fetching quirks:', error);
    return [];
  }
}

// Display quirk in the UI
function displayQuirk(quirk) {
  const quirkElement = document.getElementById('quirk-text');
  const categoryElement = document.getElementById('quirk-category');
  
  if (quirkElement) {
    quirkElement.textContent = quirk.text;
  }
  if (categoryElement) {
    categoryElement.textContent = quirk.category;
  }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', fetchTodaysQuirk);
```

### CORS Configuration

The API is configured with CORS enabled, allowing requests from any origin. For production, you may want to restrict this:

```javascript
// In server.js, replace app.use(cors()) with:
app.use(cors({
  origin: 'http://localhost:5500', // Your frontend URL
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type']
}));
```

---

## 📊 Data Structure

Each quirk object has the following structure:

```typescript
{
  id: number,          // Unique identifier
  text: string,        // The quirk message
  category: string,    // "wisdom" | "humor" | "motivation"
  createdAt: string    // ISO 8601 timestamp
}
```

---

## 🛠️ Error Handling

All API responses follow a consistent format:

**Success Response:**
```json
{
  "success": true,
  "data": { ... }
}
```

**Error Response:**
```json
{
  "success": false,
  "error": "Error message here"
}
```

### HTTP Status Codes

| Code | Description                          |
|------|--------------------------------------|
| 200  | Success                              |
| 201  | Created (new resource)               |
| 400  | Bad Request (validation error)       |
| 404  | Not Found                            |
| 500  | Internal Server Error                |

---

## 🧪 Testing with Postman

Import the provided Postman collection to test all API endpoints. The collection includes:
- Pre-configured requests for all endpoints
- Example request bodies
- Saved example responses

---

## 📝 Notes

- Data is stored in-memory and will reset when the server restarts
- For production use, consider adding a database (MongoDB, PostgreSQL, etc.)
- The "today's quirk" rotates based on the day of the year
