# MongoDB Integration Guide

## Current Status

✅ **MongoDB Integration Ready**: The application is already built with MongoDB support
✅ **Fallback Storage**: Works without MongoDB using in-memory storage
✅ **Zero Code Changes**: Just set environment variables when ready

## Integration Options

### Option 1: MongoDB Atlas (Recommended for Production)

1. **Create Account**
   - Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
   - Sign up for free account
   - Create a new project

2. **Create Cluster**
   - Choose "Build a Database"
   - Select "M0 Sandbox" (Free tier)
   - Choose your preferred region
   - Click "Create Cluster"

3. **Set up Database Access**
   - Go to "Database Access" in left sidebar
   - Click "Add New Database User"
   - Choose "Password" authentication
   - Create username and password
   - Set role to "Read and write to any database"

4. **Configure Network Access**
   - Go to "Network Access" in left sidebar
   - Click "Add IP Address"
   - Choose "Allow Access from Anywhere" (0.0.0.0/0) for development
   - Or add your specific IP address

5. **Get Connection String**
   - Go to "Database" in left sidebar
   - Click "Connect" on your cluster
   - Choose "Connect your application"
   - Copy the connection string
   - Replace `<password>` with your database user password

6. **Update Environment Variables**
   ```bash
   # In .env.local
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/resumable?retryWrites=true&w=majority
   ```

### Option 2: Local MongoDB

#### Ubuntu/Debian
```bash
# Import MongoDB GPG key
wget -qO - https://www.mongodb.org/static/pgp/server-6.0.asc | sudo apt-key add -

# Add MongoDB repository
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/6.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-6.0.list

# Update package list
sudo apt-get update

# Install MongoDB
sudo apt-get install -y mongodb-org

# Start MongoDB
sudo systemctl start mongod
sudo systemctl enable mongod

# Update .env.local
MONGODB_URI=mongodb://localhost:27017/resumable
```

#### macOS
```bash
# Install using Homebrew
brew tap mongodb/brew
brew install mongodb-community

# Start MongoDB
brew services start mongodb-community

# Update .env.local
MONGODB_URI=mongodb://localhost:27017/resumable
```

#### Windows
```bash
# Download MongoDB Community Server from:
# https://www.mongodb.com/try/download/community

# Install and start MongoDB service
# Update .env.local
MONGODB_URI=mongodb://localhost:27017/resumable
```

### Option 3: Docker MongoDB

```bash
# Run MongoDB in Docker
docker run -d \
  --name mongodb \
  -p 27017:27017 \
  -e MONGO_INITDB_ROOT_USERNAME=admin \
  -e MONGO_INITDB_ROOT_PASSWORD=password \
  mongo:latest

# Update .env.local
MONGODB_URI=mongodb://admin:password@localhost:27017/resumable?authSource=admin
```

## Testing MongoDB Integration

1. **Set Environment Variable**
   ```bash
   # In .env.local
   MONGODB_URI=your-mongodb-connection-string
   ```

2. **Restart Development Server**
   ```bash
   npm run dev
   ```

3. **Test API**
   ```bash
   # Create a resume
   curl -X POST http://localhost:3000/api/resumes \
     -H "Content-Type: application/json" \
     -d '{"title":"MongoDB Test","template":"modern","sections":[]}'

   # Check if it was saved to MongoDB
   curl http://localhost:3000/api/resumes
   ```

4. **Check Console**
   - If MongoDB is working: No warnings in console
   - If fallback is used: "MongoDB not available, using in-memory storage"

## Database Schema

The application will automatically create collections in MongoDB:

### `resumes` Collection
```javascript
{
  _id: ObjectId,
  title: String,
  template: String,
  sections: [
    {
      id: String,
      sectionId: String,
      order: Number,
      data: Object
    }
  ],
  userId: String (optional),
  createdAt: Date,
  updatedAt: Date
}
```

## Migration from In-Memory to MongoDB

When you switch to MongoDB, existing in-memory data will be lost. To preserve data:

1. **Export Current Data** (if needed)
   ```bash
   curl http://localhost:3000/api/resumes > backup.json
   ```

2. **Set Up MongoDB**
   Follow one of the options above

3. **Import Data** (if needed)
   Use the API to recreate resumes from backup

## Monitoring and Maintenance

### MongoDB Atlas
- Monitor usage in Atlas dashboard
- Set up alerts for storage/bandwidth limits
- Backup is automatic

### Local MongoDB
- Monitor disk usage
- Set up regular backups:
  ```bash
  mongodump --db resumable --out /backup/path
  ```

## Production Considerations

1. **Security**
   - Use strong passwords
   - Restrict network access
   - Enable authentication
   - Use SSL/TLS connections

2. **Performance**
   - Create indexes for frequently queried fields
   - Monitor query performance
   - Consider connection pooling

3. **Backup**
   - Set up automated backups
   - Test restore procedures
   - Store backups securely

## Troubleshooting

### Common Issues

1. **Connection Timeout**
   - Check network access settings
   - Verify connection string
   - Check firewall settings

2. **Authentication Failed**
   - Verify username/password
   - Check user permissions
   - Ensure correct database name

3. **IP Not Whitelisted**
   - Add your IP to Network Access
   - Or use 0.0.0.0/0 for development

### Debug Commands

```bash
# Test MongoDB connection
mongosh "your-connection-string"

# Check database
use resumable
db.resumes.find()

# Check logs
tail -f /var/log/mongodb/mongod.log
```

## Environment Variables Reference

```bash
# Required for MongoDB
MONGODB_URI=mongodb://localhost:27017/resumable

# Optional
NEXTAUTH_SECRET=your-secret-key-here
NEXTAUTH_URL=http://localhost:3000
NODE_ENV=development
```

## Next Steps After MongoDB Integration

1. **Add Indexes** for better performance
2. **Implement User Authentication** for multi-user support
3. **Add Data Validation** at database level
4. **Set up Monitoring** for production
5. **Configure Backups** for data safety

The application is designed to work seamlessly with or without MongoDB, so you can integrate it whenever you're ready!