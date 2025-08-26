# Image Gallery App

## Project Structure
my-project/
|-- frontend/   # Angular application
|-- backend/    # Node.js/Express server
|-- README.md

## Follow these steps to set up and run the project locally.

1. Clone the Repository
```bash
git clone https://github.com/parthtejani27/image-gallery-app.git
cd my-project
```

2. Create a .env file inside the backend/ folder

PORT=3000
NODE_ENV=development

AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=
AWS_REGION=us-east-2
AWS_S3_BUCKET=

3. For Angular
```bash
cd frontend
npm install
ng s
```

4. For Node.js
```bash
cd backend
npm install    
npm run dev
```

