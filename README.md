<h1 align="center" id="title">PawPass MY - Pet Rehome System</h1>

<p align="center"><img src="https://socialify.git.ci/zainolamzar/pawpass_pet_rehome/image?custom_description=&amp;custom_language=Next.js&amp;description=1&amp;font=Source+Code+Pro&amp;language=1&amp;name=1&amp;owner=1&amp;pattern=Brick+Wall&amp;theme=Light" alt="project-image"></p>

<p align="center"><img src="https://img.shields.io/badge/Next.js-15.5.2-black?logo=next.js&amp;logoColor=white" alt="shields"><img src="https://img.shields.io/badge/React-19.1.0-61DAFB?logo=react&amp;logoColor=black" alt="shields"><img src="https://img.shields.io/badge/Prisma-6.15.0-2D3748?logo=prisma&amp;logoColor=white" alt="shields"></p>

<br>
<p id="description">PawPass is a pet rehoming platform built in Malaysia to make the adoption and rehome process smoother safer and more compassionate. It connects pet owners who need to let go of their pets with responsible seekers who are looking for a new companion. Designed with the local community in mind PawPass helps reduce pet abandonment by offering a structured and supportive way to rehome pets responsibly.</p>

  
  
<h2>🧐 Features</h2>

Here're some of the project's best features:

*   🐾 Pet Listing by Owners – Pet owners can create detailed posts with pet info age health status and photos.
*   💕 Pet Discovery for Seekers – Pet lovers can browse filter and search pets by type breed or location.
*   🔄 Smooth Rehome Process – Simplifies the connection between current owners and future caretakers.
*   🔍 Advanced Search & Filters – Quickly find pets by category (dogs cats birds etc.) size or special needs.
*   📍 Location-Based Matching – Discover pets available near you.
*   🐕 Health & Care Details – Include vaccination status medical records and dietary needs.
*   📷 Photo Gallery – Multiple images per pet to help seekers understand the pet better.

<h2>🛠️ Installation Steps:</h2>

<p>1. Clone the repository:</p>

```
git clone https://github.com/zainolamzar/pawpass_pet_rehome
cd pet-rehome-system
```

<p>3. Install dependencies:</p>

```
npm install 
# or 
yarn install 
# or 
pnpm install
```

<p>4. Set up environment variables:</p>

```
DATABASE_URL="postgresql://<user>:<password>@<host>/<database>?sslmode=require"  
CLOUDINARY_CLOUD_NAME=<cloud-name>
CLOUDINARY_API_KEY=<api-key>
CLOUDINARY_API_SECRET=<api-secret>
```

<p>5. Initialize Prisma:</p>

```
npx prisma generate npx prisma migrate dev --name init
```

<p>6. Run the development server:</p>

```
npm run dev 
# or 
yarn dev 
# or 
pnpm dev
```

  
  
<h2>💻 Built with</h2>

Technologies used in the project:

*   Next.js
*   React
*   Typescript
*   Prisma
*   Vercel
*   Cloudinary
*   Shadcn/ui