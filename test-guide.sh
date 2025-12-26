#!/bin/bash

# Personal Finance Dashboard - Quick Start Test Script

echo "🚀 Personal Finance Dashboard - Starting Services"
echo "=================================================="
echo ""

# Colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Get the project directory
PROJECT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

echo -e "${BLUE}📍 Project Directory: $PROJECT_DIR${NC}"
echo ""

# Function to check if port is in use
check_port() {
    lsof -i :$1 > /dev/null 2>&1
    return $?
}

# Check if services are already running
if check_port 8080; then
    echo -e "${YELLOW}⚠️  Backend already running on port 8080${NC}"
else
    echo -e "${GREEN}✓ Port 8080 available for backend${NC}"
fi

if check_port 3000; then
    echo -e "${YELLOW}⚠️  Frontend already running on port 3000${NC}"
else
    echo -e "${GREEN}✓ Port 3000 available for frontend${NC}"
fi

echo ""
echo "=================================================="
echo "🔧 MANUAL SETUP REQUIRED"
echo "=================================================="
echo ""
echo "Terminal 1 - Backend:"
echo "  cd backend"
echo "  mvn clean install"
echo "  mvn spring-boot:run"
echo ""
echo "Terminal 2 - Frontend:"
echo "  cd frontend"
echo "  npm install"
echo "  npm start"
echo ""
echo "=================================================="
echo "🧪 TEST CHECKLIST"
echo "=================================================="
echo ""
echo "✅ 1. Sign up and login"
echo "✅ 2. Income Tracker - Add salary and freelance income"
echo "✅ 3. Savings Goals - Create goals and contribute"
echo "✅ 4. Bill Reminders - Add bills and mark as paid"
echo "✅ 5. Debt Tracker - Add debts and make payments"
echo "✅ 6. Financial Reports - View summary/monthly/yearly"
echo "✅ 7. Dashboard - Verify summary cards update"
echo "✅ 8. Budget Settings - Set budgets for categories"
echo ""
echo "=================================================="
echo "📊 EXPECTED ENDPOINTS"
echo "=================================================="
echo ""
echo "Backend API:  http://localhost:8080"
echo "Frontend App: http://localhost:3000"
echo ""
echo "API Endpoints:"
echo "  - POST   /api/auth/signup"
echo "  - POST   /api/auth/login"
echo "  - GET    /api/income"
echo "  - POST   /api/income"
echo "  - GET    /api/savings-goals"
echo "  - POST   /api/savings-goals"
echo "  - GET    /api/bill-reminders"
echo "  - POST   /api/bill-reminders"
echo "  - GET    /api/debts"
echo "  - POST   /api/debts"
echo "  - GET    /api/reports/summary"
echo "  - GET    /api/reports/monthly?year=2025&month=12"
echo "  - GET    /api/reports/yearly?year=2025"
echo ""
echo "=================================================="
echo "📝 QUICK TEST DATA"
echo "=================================================="
echo ""
echo "Income:"
echo "  - Salary: $5000 (Recurring: Monthly)"
echo "  - Freelance: $1200"
echo ""
echo "Savings Goal:"
echo "  - Emergency Fund: Target $10,000, Current $2,000"
echo ""
echo "Bill Reminder:"
echo "  - Electric Bill: $150 (Recurring: Monthly)"
echo ""
echo "Debt:"
echo "  - Credit Card: $3,500 remaining, 18% APR"
echo ""
echo "=================================================="
echo "🐛 TROUBLESHOOTING"
echo "=================================================="
echo ""
echo "If backend fails to start:"
echo "  - Check Java version: java -version (need Java 17+)"
echo "  - Check Maven: mvn -version"
echo "  - Check database connection in application.properties"
echo ""
echo "If frontend fails to start:"
echo "  - Check Node version: node -v (need Node 14+)"
echo "  - Clear npm cache: npm cache clean --force"
echo "  - Delete node_modules: rm -rf node_modules && npm install"
echo ""
echo "If CORS errors occur:"
echo "  - Verify backend CORS config allows http://localhost:3000"
echo "  - Check browser console for specific errors"
echo ""
echo "=================================================="
echo "✨ Ready to test!"
echo "=================================================="
